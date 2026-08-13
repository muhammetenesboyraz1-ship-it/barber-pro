import Link from "next/link";

const posts = [
  {
    slug: "yapay-zeka",
    category: "Yapay Zeka",
    title: "Yapay zeka hayatımızı nasıl değiştiriyor?",
    description:
      "Yapay zekanın günlük hayatımızı, çalışma şeklimizi ve gelecekteki teknoloji kullanımımızı nasıl değiştirdiğine göz atıyoruz.",
    date: "13 Ağustos 2026",
    readTime: "5 dk",
  },
  {
    slug: "siber-guvenlik",
    category: "Siber Güvenlik",
    title: "İnternette daha güvenli olmak için 10 yöntem",
    description:
      "Hesaplarını ve kişisel bilgilerini internette daha güvenli tutmak için uygulayabileceğin temel güvenlik yöntemleri.",
    date: "13 Ağustos 2026",
    readTime: "6 dk",
  },
  {
    slug: "dijitallesme",
    category: "Dijitalleşme",
    title: "Küçük işletmeler neden dijitalleşmeli?",
    description:
      "Küçük işletmelerin dijital araçlardan nasıl faydalanabileceğini ve işlerini nasıl daha verimli hale getirebileceğini anlatıyoruz.",
    date: "13 Ağustos 2026",
    readTime: "4 dk",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            Poy<span className="text-yellow-500">Software</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">

            <Link
              href="/"
              className="transition hover:text-yellow-400"
            >
              Ürünler
            </Link>

            <Link
              href="/tools"
              className="transition hover:text-yellow-400"
            >
              Ücretsiz Araçlar
            </Link>

            <Link
              href="/blog"
              className="text-yellow-400"
            >
              Blog
            </Link>

            <Link
              href="/#iletisim"
              className="transition hover:text-yellow-400"
            >
              İletişim
            </Link>

          </div>

          <Link
            href="/barber-pro"
            className="rounded-full border border-yellow-500/40 px-5 py-2.5 text-sm font-bold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
          >
            Barber Pro
          </Link>

        </div>
      </nav>

      {/* HEADER */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
            BLOG
          </p>

          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              Teknoloji hakkında{" "}
              <span className="text-yellow-500">
                gerçek içerikler.
              </span>
            </h1>

            <span className="text-sm text-gray-500">
              {posts.length} yazı
            </span>

          </div>

        </div>
      </section>

      {/* POSTS */}
      <section className="pb-28">

        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">

          {posts.map((post) => (

            <article
              key={post.slug}
              className="rounded-3xl border border-white/10 bg-black p-7 transition hover:-translate-y-1 hover:border-yellow-500/30"
            >

              <div className="flex items-center justify-between gap-3">

                <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400">
                  {post.category}
                </span>

                <span className="text-xs text-gray-600">
                  {post.readTime}
                </span>

              </div>

              <h2 className="mt-7 text-2xl font-black leading-8">
                {post.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                {post.description}
              </p>

              <div className="mt-7 border-t border-white/10 pt-5">

                <p className="text-xs text-gray-600">
                  {post.date}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-bold text-yellow-500 transition hover:text-yellow-400"
                >
                  Yazıyı Oku →
                </Link>

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-7xl px-6 py-12">

          <div className="flex flex-col justify-between gap-8 md:flex-row">

            <div>

              <div className="text-2xl font-black">
                Poy<span className="text-yellow-500">Software</span>
              </div>

              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                Modern yazılımlar, ücretsiz araçlar ve teknoloji içerikleri.
              </p>

            </div>

            <div className="flex gap-8 text-sm text-gray-500">

              <Link
                href="/"
                className="hover:text-white"
              >
                Ürünler
              </Link>

              <Link
                href="/tools"
                className="hover:text-white"
              >
                Araçlar
              </Link>

              <Link
                href="/blog"
                className="hover:text-white"
              >
                Blog
              </Link>

              <Link
                href="/#iletisim"
                className="hover:text-white"
              >
                İletişim
              </Link>

            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-600">
            © {new Date().getFullYear()} PoySoftware. Tüm hakları saklıdır.
          </div>

        </div>

      </footer>

    </main>
  );
}