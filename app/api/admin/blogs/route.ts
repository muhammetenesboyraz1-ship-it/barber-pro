import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// BLOG LİSTESİ
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .select(
        "id,title,slug,excerpt,seo_title,seo_description,keywords,status,published_at,created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin blog GET error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      blogs: data || [],
    });
  } catch (error: any) {
    console.error("Admin blog GET exception:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Bilinmeyen hata",
      },
      { status: 500 }
    );
  }
}


// BLOG SİL
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog ID gerekli.",
        },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Admin blog DELETE error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog silindi.",
    });
  } catch (error: any) {
    console.error("Admin blog DELETE exception:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Bilinmeyen hata",
      },
      { status: 500 }
    );
  }
}


// BLOG DURUMU DEĞİŞTİR
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const id = body?.id;
    const status = body?.status;

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          error: "ID ve status gerekli.",
        },
        { status: 400 }
      );
    }

    if (!["published", "draft"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Geçersiz status.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .update({
        status,
        published_at:
          status === "published"
            ? new Date().toISOString()
            : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Admin blog PATCH error:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      blog: data,
    });
  } catch (error: any) {
    console.error("Admin blog PATCH exception:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Bilinmeyen hata",
      },
      { status: 500 }
    );
  }
}