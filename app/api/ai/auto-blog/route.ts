import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const openrouterKey = process.env.OPENROUTER_API_KEY;

    if (!openrouterKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY bulunamadı." },
        { status: 500 }
      );
    }
// Güncel Türkiye gündemini Google News RSS üzerinden çek
const newsResponse = await fetch(
  "https://news.google.com/rss/search?q=Türkiye+gündem+MEB+siyaset+ekonomi+son+dakika&hl=tr&gl=TR&ceid=TR:tr",
  {
    cache: "no-store",
  }
);

if (!newsResponse.ok) {
  return NextResponse.json(
    { error: "Güncel haberler alınamadı." },
    { status: 500 }
  );
}

const newsXml = await newsResponse.text();

// RSS içindeki haber başlıklarını çıkar
const titles = [...newsXml.matchAll(/<item>[\s\S]*?<title>(.*?)<\/title>/gi)]
  .map((match) =>
    match[1]
      .replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim()
  )
  .filter(Boolean)
  .slice(0, 15);

if (titles.length === 0) {
  return NextResponse.json(
    { error: "Güncel haber başlığı bulunamadı." },
    { status: 500 }
  );
}

console.log("Güncel haberler:", titles);
    


    // Daha önce yayınlanan blogları al
    const { data: existingBlogs, error: blogError } = await supabase
      .from("blog_posts")
      .select("title, slug")
      .order("created_at", { ascending: false })
      .limit(30);

    if (blogError) {
      return NextResponse.json(
        {
          error: "Mevcut bloglar alınamadı.",
          details: blogError.message,
        },
        { status: 500 }
      );
    }

    const existingTitles =
      existingBlogs?.map((blog) => blog.title).join("\n") || "Henüz blog yok.";

    const prompt = `
Sen Barber Pro'nun otomatik gündem editörüsün.

Bugünün tarihi: ${new Date().toLocaleDateString("tr-TR")}

Aşağıdaki güncel haber başlıklarını incele:

${titles.join("\n")}

Görevin:
- Türkiye ve dünyadaki güncel gündemden ilgi çekici bir konu seç.
- MEB, eğitim, sınav, siyaset, ekonomi, spor, teknoloji, yapay zeka, otomobil, dünya gündemi gibi alanları değerlendirebilirsin.
- Sadece gerçekten haber değeri olan bir konu seç.
- Daha önce yayınlanan bloglarla aynı veya çok benzer konuyu seçme.
- Sansasyonel başlık üretme.
- Gerçek olmayan bilgi uydurma.
- Haber kaynaklarındaki bilgileri kopyalama.
- Özgün bir haber/analiz metni oluştur.
- Güncel bilgi kullanıldığı için kesin olmayan iddiaları gerçekmiş gibi yazma.

Daha önce yayınlanan bloglar:

${existingTitles}

Yeni blog yaklaşık 700-1000 kelime olsun.

Sadece şu JSON formatında cevap ver:

{
  "title": "Başlık",
  "excerpt": "Kısa açıklama",
  "content": "Blog içeriği",
  "seo_title": "SEO başlığı",
  "seo_description": "SEO açıklaması",
  "keywords": ["kelime1", "kelime2", "kelime3"]
}
`;

    // OpenRouter
    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openrouterKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Barber Pro",
        },
        body: JSON.stringify({
         model: "google/gemini-3.7-flash",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 3000,
          response_format: {
  type: "json_object",
},

reasoning: {
  enabled: true,
},
        }),
      }
    );

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();

      console.error("OpenRouter error:", errorText);

      return NextResponse.json(
        {
          error: "AI isteği başarısız.",
          details: errorText,
        },
        { status: 500 }
      );
    }

    const aiData = await aiResponse.json();

    let outputText =
      aiData.choices?.[0]?.message?.content?.trim() || "";

    if (!outputText) {
      return NextResponse.json(
        { error: "AI cevap üretmedi." },
        { status: 500 }
      );
    }

    outputText = outputText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let blog;

    try {
      blog = JSON.parse(outputText);
    } catch {
      console.error("JSON parse hatası:", outputText);

      return NextResponse.json(
        {
          error: "AI geçerli JSON döndürmedi.",
          details: outputText,
        },
        { status: 500 }
      );
    }

    if (
      !blog.title ||
      !blog.excerpt ||
      !blog.content ||
      !blog.seo_title ||
      !blog.seo_description ||
      !Array.isArray(blog.keywords)
    ) {
      return NextResponse.json(
        { error: "AI eksik blog verisi döndürdü." },
        { status: 500 }
      );
    }

    const slug = blog.title
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Otomatik yayınla
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        title: blog.title,
        slug,
        excerpt: blog.excerpt,
        content: blog.content,
        seo_title: blog.seo_title,
        seo_description: blog.seo_description,
        keywords: blog.keywords,
        status: "published",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase kayıt hatası:", error);

      return NextResponse.json(
        {
          error: "Blog Supabase'e kaydedilemedi.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Güncel AI blog başarıyla oluşturuldu ve yayınlandı.",
      blog: data,
      selectedNews: titles,
    });
  } catch (error) {
    console.error("Auto blog error:", error);

    return NextResponse.json(
      { error: "Beklenmeyen bir hata oluştu." },
      { status: 500 }
    );
  }
}
export async function GET() {
  return POST();
}