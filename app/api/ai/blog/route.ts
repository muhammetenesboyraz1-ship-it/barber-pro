import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    // Blog konusu kontrolü
    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "Blog konusu gerekli." },
        { status: 400 }
      );
    }

    // OpenRouter API key kontrolü
    const openrouterKey = process.env.OPENROUTER_API_KEY;

    if (!openrouterKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY bulunamadı." },
        { status: 500 }
      );
    }

    // AI prompt
    const prompt = `
Sen Barber Pro adlı profesyonel berber/randevu platformunun içerik yazarı ve SEO uzmanısın.

Konu:
${topic}

Türkçe, doğal ve profesyonel bir blog yazısı oluştur.

Kurallar:
- Gerçek bir insan yazmış gibi doğal olsun.
- Barber Pro markasını gereksiz şekilde tekrar etme.
- SEO açısından faydalı olsun.
- Kullanıcıya gerçekten bilgi versin.
- Başlık dikkat çekici olsun.
- İçerik yaklaşık 700-1000 kelime olsun.
- H2/H3 başlıkları kullan.
- Abartılı veya doğrulanmamış sağlık iddiaları yapma.
- Anahtar kelimeleri doğal şekilde kullan.

Sadece geçerli JSON döndür.

JSON formatı:

{
  "title": "Blog başlığı",
  "excerpt": "Kısa açıklama",
  "content": "Blog içeriği",
  "seo_title": "SEO başlığı",
  "seo_description": "SEO açıklaması",
  "keywords": [
    "anahtar kelime 1",
    "anahtar kelime 2",
    "anahtar kelime 3"
  ]
}
`;

    // OpenRouter AI isteği
    const openrouterResponse = await fetch(
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
  model: "openrouter/free",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature: 0.7,
  max_tokens: 2500,
}),
      }
    );

    // OpenRouter hata kontrolü
    if (!openrouterResponse.ok) {
      const errorText = await openrouterResponse.text();

      console.error("OpenRouter error:", errorText);

      return NextResponse.json(
        {
          error: "AI isteği başarısız.",
          details: errorText,
        },
        { status: 500 }
      );
    }

    const aiData = await openrouterResponse.json();

    // AI cevabını al
    let outputText =
      aiData.choices?.[0]?.message?.content?.trim() || "";

    if (!outputText) {
      return NextResponse.json(
        { error: "AI cevap üretmedi." },
        { status: 500 }
      );
    }

    // Markdown code block varsa temizle
    outputText = outputText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // JSON parse
    let blog;

    try {
      blog = JSON.parse(outputText);
    } catch (parseError) {
      console.error("AI JSON parse hatası:", outputText);

      return NextResponse.json(
        {
          error: "AI geçerli JSON döndürmedi.",
          details: outputText,
        },
        { status: 500 }
      );
    }

    // Blog verilerinin temel kontrolü
    if (
      !blog.title ||
      !blog.excerpt ||
      !blog.content ||
      !blog.seo_title ||
      !blog.seo_description ||
      !Array.isArray(blog.keywords)
    ) {
      return NextResponse.json(
        {
          error: "AI eksik blog verisi döndürdü.",
        },
        { status: 500 }
      );
    }

    // Türkçe karakterleri URL uyumlu hale getir
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

    // Supabase'e kaydet
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
        status: "draft",
      })
      .select()
      .single();

    // Supabase hata kontrolü
    if (error) {
      console.error("Supabase blog kayıt hatası:", error);

      return NextResponse.json(
        {
          error: "Blog Supabase'e kaydedilemedi.",
          details: error.message,
        },
        { status: 500 }
      );
    }

    // Başarılı
    return NextResponse.json({
      success: true,
      message: "AI blog başarıyla oluşturuldu.",
      blog: data,
    });
  } catch (error) {
    console.error("AI blog error:", error);

    return NextResponse.json(
      {
        error: "Beklenmeyen bir hata oluştu.",
      },
      { status: 500 }
    );
  }
}