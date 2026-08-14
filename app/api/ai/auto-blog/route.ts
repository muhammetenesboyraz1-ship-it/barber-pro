import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const MODEL = "google/gemini-3.7-flash";

const CATEGORIES = [
  "Gündem",
  "Ekonomi",
  "Yapay Zeka",
  "Teknoloji",
  "Otomotiv",
  "Spor",
  "Dünya",
  "Eğitim",
  "Dijital Yaşam",
  "Erkek Bakım ve Berberlik",
];

function cleanJsonText(text: string) {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function createSlug(title: string) {
  const map: Record<string, string> = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
  };

  return title
    .split("")
    .map((char) => map[char] ?? char)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeCategory(category: string) {
  const value = category?.trim().toLowerCase();

  const categories: Record<string, string> = {
    gündem: "Gündem",
    ekonomi: "Ekonomi",
    "yapay zeka": "Yapay Zeka",
    yapayzeka: "Yapay Zeka",
    teknoloji: "Teknoloji",
    otomotiv: "Otomotiv",
    spor: "Spor",
    dünya: "Dünya",
    dunya: "Dünya",
    eğitim: "Eğitim",
    egitim: "Eğitim",
    "dijital yaşam": "Dijital Yaşam",
    "dijital hayat": "Dijital Yaşam",
    "erkek bakım": "Erkek Bakım ve Berberlik",
    "erkek bakım ve berberlik": "Erkek Bakım ve Berberlik",
    berberlik: "Erkek Bakım ve Berberlik",
  };

  return categories[value] ?? "Gündem";
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "OPENROUTER_API_KEY bulunamadı.",
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 1. Son yayınlanan blogları al
    // ---------------------------------------------------------

    const { data: recentBlogs, error: recentBlogsError } =
      await supabaseAdmin
        .from("blog_posts")
        .select(
          "id,title,slug,excerpt,keywords,status,created_at"
        )
        .order("created_at", { ascending: false })
        .limit(15);

    if (recentBlogsError) {
      console.error(
        "Supabase recent blogs error:",
        recentBlogsError
      );
    }

    const previousTitles =
      recentBlogs?.map((blog) => blog.title).filter(Boolean) ?? [];

    // ---------------------------------------------------------
    // 2. Kullanıcıdan gelen opsiyonel bilgiler
    // ---------------------------------------------------------

    let body: any = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const requestedTopic =
      typeof body?.topic === "string"
        ? body.topic.trim()
        : "";

    const providedHeadlines = Array.isArray(body?.headlines)
      ? body.headlines
      : [];

    // ---------------------------------------------------------
    // 3. Son yazıların kategorilerini tahmin et
    // ---------------------------------------------------------
    // Eski tabloda category kolonu olmayabilir.
    // Bu yüzden başlıklardan kategori çıkarma işini modele bırakacağız.
    // Son 5 başlığı modele özellikle göndereceğiz.

    const recentTitlesForPrompt = previousTitles
      .slice(0, 10)
      .map((title, index) => `${index + 1}. ${title}`)
      .join("\n");

    // ---------------------------------------------------------
    // 4. Haber başlıkları
    // ---------------------------------------------------------

    const headlines =
      providedHeadlines.length > 0
        ? providedHeadlines
            .map((item: any) => {
              if (typeof item === "string") return item;

              return (
                item?.title ||
                item?.name ||
                item?.headline ||
                ""
              );
            })
            .filter(Boolean)
            .slice(0, 30)
        : [];

    const headlineText =
      headlines.length > 0
        ? headlines.map((h: string) => `- ${h}`).join("\n")
        : "Haber başlığı verilmedi. Güncel ve doğrulanabilir bir konu seç.";

    // ---------------------------------------------------------
    // 5. Ana AI prompt
    // ---------------------------------------------------------

    const prompt = `
Sen Barber Pro / PoySoftware platformunun profesyonel içerik editörüsün.

Görevin güncel, özgün, SEO uyumlu ve gerçekten okunabilir bir blog yazısı oluşturmaktır.

ÇOK ÖNEMLİ:

1. Sürekli MEB veya eğitim konusu seçme.
2. Kategorileri dengeli şekilde dağıt.
3. Son yazılarda aynı kategori ağırlıklıysa başka kategori seç.
4. Daha önce yayınlanan yazılara çok benzeyen konu seçme.
5. Aynı haberi farklı başlıkla tekrar yazma.
6. Sansasyonel veya clickbait başlık kullanma.
7. Gerçek olmayan bilgi uydurma.
8. Emin olmadığın sayı, tarih, oran, kişi veya açıklamayı kesin gerçek gibi yazma.
9. Haber başlıklarını birebir kopyalama.
10. Özgün bir haber/analiz metni oluştur.
11. Türkçe yaz.
12. İçerik yaklaşık 700-1000 kelime olsun.
13. İçerikte H2 ve gerektiğinde H3 başlıkları kullan.
14. Anahtar kelimeleri doğal şekilde kullan.
15. Barber Pro markasını gereksiz şekilde tekrar etme.
16. Kullanıcıya fayda sağlayan, doğal ve profesyonel bir yazı oluştur.
17. Konu gerçekten haber değeri taşımalı.
18. Eski yazılarla aynı veya çok benzer konu seçme.

--------------------------------------------------
KATEGORİLER
--------------------------------------------------

Aşağıdaki kategoriler arasında dengeli dağılım yap:

- Gündem
- Ekonomi
- Yapay Zeka
- Teknoloji
- Otomotiv
- Spor
- Dünya
- Eğitim
- Dijital Yaşam
- Erkek Bakım ve Berberlik

ÖNEMLİ:

Eğitim/MEB kategorisini sürekli seçmek YASAK.

Son yazılarda eğitim/MEB ağırlığı varsa:

Yapay Zeka, Teknoloji, Otomotiv, Ekonomi, Spor, Dünya, Gündem veya Dijital Yaşam kategorilerinden uygun olanı tercih et.

Kategori seçerken sadece haber başlığına değil, çeşitliliğe de dikkat et.

--------------------------------------------------
MEVCUT HABER BAŞLIKLARI
--------------------------------------------------

${headlineText}

--------------------------------------------------
DAHA ÖNCE YAYINLANAN YAZILAR
--------------------------------------------------

${recentTitlesForPrompt || "Henüz önceki yazı yok."}

Bu listedeki yazılarla aynı veya çok benzer konu seçme.

--------------------------------------------------
KULLANICININ ÖZEL KONUSU
--------------------------------------------------

${requestedTopic || "Özel konu verilmedi. Haber başlıklarından en uygun konuyu kendin seç."}

--------------------------------------------------
KONU SEÇİM KURALLARI
--------------------------------------------------

Önce kendi içinde şu sırayla karar ver:

1. Haber değeri var mı?
2. Güncel mi?
3. Daha önce yazılmış mı?
4. Önceki yazılarla çok benzer mi?
5. Kategori çeşitliliğini bozuyor mu?
6. Kullanıcı için faydalı mı?
7. SEO açısından aranabilir mi?

Bu kontrollerden sonra TEK BİR konu seç.

Aynı anda birden fazla konu yazma.

--------------------------------------------------
İÇERİK
--------------------------------------------------

Başlık doğal ve profesyonel olsun.

Örnek kötü başlık:

"ŞOK! HERKES BUNU KONUŞUYOR!"

Örnek iyi başlık:

"Yapay Zeka Araçlarının Günlük İş Akışına Etkisi: Kullanıcılar Nelere Dikkat Etmeli?"

Başlık haberin gerçek içeriğini yansıtmalı.

İçerik:

- Giriş
- Konunun arka planı
- Güncel gelişme
- Kullanıcıya/okuyucuya etkisi
- Uzman görüşü gerekiyorsa sadece doğrulanabilir genel değerlendirme
- Gelecekte ne olabilir
- Sonuç

Kesin olmayan bilgileri kesin gerçek olarak yazma.

--------------------------------------------------
JSON
--------------------------------------------------

SADECE geçerli JSON döndür.

Markdown kullanma.

Şu formatı birebir kullan:

{
  "category": "Kategori",
  "title": "Başlık",
  "excerpt": "Kısa özet",
  "content": "<p>İçerik...</p><h2>Alt Başlık</h2><p>...</p>",
  "seo_title": "SEO başlığı",
  "seo_description": "SEO açıklaması",
  "keywords": ["kelime1", "kelime2", "kelime3", "kelime4", "kelime5"],
  "selected_news": ["seçilen haber başlığı"]
}

--------------------------------------------------
SON KONTROL
--------------------------------------------------

JSON dışında hiçbir şey yazma.

"Here is the JSON" gibi açıklamalar yazma.

Thinking/reasoning yazma.

Kod bloğu kullanma.

Sadece JSON döndür.
`;

    // ---------------------------------------------------------
    // 6. OpenRouter
    // ---------------------------------------------------------

    const aiResponse = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Barber Pro",
      },
      body: JSON.stringify({
        model: MODEL,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.8,
        max_tokens: 4000,

        response_format: {
          type: "json_object",
        },
      }),
    });

    // ---------------------------------------------------------
    // 7. OpenRouter hata kontrolü
    // ---------------------------------------------------------

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();

      console.error("OpenRouter error:", errorText);

      return NextResponse.json(
        {
          error: "AI isteği başarısız.",
          details: errorText,
        },
        { status: aiResponse.status }
      );
    }

    const aiData = await aiResponse.json();

    const rawContent =
      aiData?.choices?.[0]?.message?.content;

    if (!rawContent) {
      return NextResponse.json(
        {
          error: "AI boş cevap döndürdü.",
          details: aiData,
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 8. JSON temizleme
    // ---------------------------------------------------------

    let parsed;

    try {
      const cleaned = cleanJsonText(rawContent);

      parsed = JSON.parse(cleaned);
    } catch (error) {
      console.error(
        "AI JSON parse error:",
        error
      );

      console.error(
        "Raw AI content:",
        rawContent
      );

      return NextResponse.json(
        {
          error: "AI geçerli JSON döndürmedi.",
          details: rawContent,
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 9. Alanları güvenli hale getir
    // ---------------------------------------------------------

    const title =
      typeof parsed.title === "string"
        ? parsed.title.trim()
        : "";

    const excerpt =
      typeof parsed.excerpt === "string"
        ? parsed.excerpt.trim()
        : "";

    const content =
      typeof parsed.content === "string"
        ? parsed.content.trim()
        : "";

    const seoTitle =
      typeof parsed.seo_title === "string"
        ? parsed.seo_title.trim()
        : title;

    const seoDescription =
      typeof parsed.seo_description === "string"
        ? parsed.seo_description.trim()
        : excerpt;

    const category = normalizeCategory(
      parsed.category
    );

    const keywords = Array.isArray(parsed.keywords)
      ? parsed.keywords
          .filter(
            (keyword: any) =>
              typeof keyword === "string"
          )
          .map((keyword: string) =>
            keyword.trim()
          )
          .filter(Boolean)
          .slice(0, 10)
      : [];

    const selectedNews = Array.isArray(
      parsed.selected_news
    )
      ? parsed.selected_news
          .filter(
            (item: any) =>
              typeof item === "string"
          )
          .slice(0, 5)
      : [];

    // ---------------------------------------------------------
    // 10. Zorunlu alan kontrolü
    // ---------------------------------------------------------

    if (!title || !content) {
      return NextResponse.json(
        {
          error:
            "AI gerekli içerik alanlarını üretmedi.",
          details: parsed,
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 11. Slug oluştur
    // ---------------------------------------------------------

    let slug = createSlug(title);

    if (!slug) {
      slug = `blog-${Date.now()}`;
    }

    // Aynı slug varsa timestamp ekle
    const { data: existingSlug } = await supabaseAdmin
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    // ---------------------------------------------------------
    // 12. Supabase'e kaydet
    // ---------------------------------------------------------

    const { data: insertedBlog, error: insertError } =
  await supabaseAdmin
    .from("blog_posts")
    .insert({
      title,
      slug,
      excerpt,
      content,
      seo_title: seoTitle,
      seo_description: seoDescription,
      keywords,
      status: "published",
      published_at: new Date().toISOString(),
    })
        .select()
        .single();

    if (insertError) {
      console.error(
        "Supabase insert error:",
        insertError
      );

      return NextResponse.json(
        {
          error:
            "Blog Supabase'e kaydedilemedi.",
          details: insertError,
        },
        { status: 500 }
      );
    }

    // ---------------------------------------------------------
    // 13. Başarılı
    // ---------------------------------------------------------

    return NextResponse.json({
      success: true,

      message:
        "Güncel AI blog başarıyla oluşturuldu ve yayınlandı.",

      blog: insertedBlog,

      category,

      selected_news: selectedNews,

      model: MODEL,
    });
  } catch (error: any) {
    console.error(
      "AUTO BLOG ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Otomatik blog işlemi başarısız.",
        details:
          error?.message ||
          String(error),
      },
      { status: 500 }
    );
  }
}