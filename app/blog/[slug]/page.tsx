import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      seo_description,
      content,
      created_at,
      published_at,
      status
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    console.error("Blog yazısı alınamadı:", error);
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            Poy<span className="text-yellow-500">Software</span>
          </Link>

          <Link
            href="/blog"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-bold text-gray-300 transition hover:border-yellow-500/40 hover:text-yellow-400"
          >
            ← Bloga Dön
          </Link>

        </div>
      </nav>

      {/* ARTICLE */}
      <article className="mx-auto max-w-4xl px-6 py-20 md:py-28">

        {/* META */}
        <div className="mb-8 flex flex-wrap items-center gap-3">

          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-bold text-yellow-400">
            Gündem
          </span>

          <span className="text-sm text-gray-500">
            {new Date(post.published_at || post.created_at).toLocaleDateString(
              "tr-TR"
            )}
          </span>

        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
          {post.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-7 text-lg leading-8 text-gray-400 md:text-xl">
          {post.excerpt || post.seo_description}
        </p>

        {/* CONTENT */}
        <div className="mt-12 border-t border-white/10 pt-12">

          <div className="mt-12 border-t border-white/10 pt-12">

  <div
    className="
      max-w-none
      text-gray-300

      [&_h1]:mb-6
      [&_h1]:mt-10
      [&_h1]:text-4xl
      [&_h1]:font-black
      [&_h1]:text-white

      [&_h2]:mb-5
      [&_h2]:mt-10
      [&_h2]:text-2xl
      [&_h2]:font-black
      [&_h2]:text-white

      [&_h3]:mb-4
      [&_h3]:mt-8
      [&_h3]:text-xl
      [&_h3]:font-bold
      [&_h3]:text-white

      [&_p]:mb-6
      [&_p]:text-lg
      [&_p]:leading-8
      [&_p]:text-gray-300

      [&_ul]:mb-6
      [&_ul]:list-disc
      [&_ul]:pl-6

      [&_ol]:mb-6
      [&_ol]:list-decimal
      [&_ol]:pl-6

      [&_li]:mb-2
      [&_li]:text-lg
      [&_li]:leading-8

      [&_strong]:font-bold
      [&_strong]:text-white

      [&_a]:text-yellow-400
      [&_a]:underline
    "
  >
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {post.content || ""}
    </ReactMarkdown>
  </div>

</div>

        </div>

        {/* BACK */}
        <div className="mt-16 border-t border-white/10 pt-8">

          <Link
            href="/blog"
            className="inline-flex rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
          >
            ← Tüm Yazılara Dön
          </Link>

        </div>

      </article>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-5xl px-6 py-10 text-center">

          <div className="text-xl font-black">
            Poy<span className="text-yellow-500">Software</span>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Modern yazılımlar, ücretsiz araçlar ve teknoloji içerikleri.
          </p>

          <p className="mt-6 text-xs text-gray-700">
            © {new Date().getFullYear()} PoySoftware
          </p>

        </div>

      </footer>

    </main>
  );
}