"use client";

import { FormEvent, useState } from "react";

export default function IletisimPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-black tracking-tight">
            Poy<span className="text-yellow-500">Software</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            <a href="/" className="transition hover:text-yellow-400">
              Ana Sayfa
            </a>

            <a href="/#urunler" className="transition hover:text-yellow-400">
              Ürünler
            </a>

            <a href="/tools" className="transition hover:text-yellow-400">
              Ücretsiz Araçlar
            </a>

            <a href="/blog" className="transition hover:text-yellow-400">
              Blog
            </a>

            <a href="/iletisim" className="text-yellow-400">
              İletişim
            </a>
          </div>

          <a
            href="/barber-pro"
            className="rounded-full border border-yellow-500/40 px-5 py-2.5 text-sm font-bold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
          >
            Barber Pro
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
              İletişim
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Bizimle
              <span className="text-yellow-500"> iletişime geç.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400">
              PoySoftware hakkında soruların, önerilerin veya iş birlikleri
              için bizimle iletişime geçebilirsin.
            </p>
          </div>

          {/* CONTACT AREA */}
          <div className="mt-16 grid gap-8 md:grid-cols-5">

            {/* LEFT */}
            <div className="md:col-span-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-500">
                  PoySoftware
                </p>

                <h2 className="mt-5 text-3xl font-black">
                  Bir fikrin mi var?
                </h2>

                <p className="mt-4 leading-7 text-gray-400">
                  Yeni bir proje, iş birliği, geri bildirim veya herhangi bir
                  konuda bize ulaşabilirsin.
                </p>

                <div className="mt-10 space-y-6">
                  <div>
                    <p className="text-sm text-gray-500">E-posta</p>
                    <p className="mt-1 font-bold text-white">
                      info@poysoftware.com
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Yanıt süresi</p>
                    <p className="mt-1 font-bold text-white">
                      En kısa sürede
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="md:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10"
              >
                <div className="grid gap-6 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-300">
                      Ad Soyad
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="Adınız Soyadınız"
                      className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500/50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-300">
                      E-posta
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="ornek@mail.com"
                      className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500/50"
                    />
                  </div>

                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-bold text-gray-300">
                    Konu
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Mesajınızın konusu"
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500/50"
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-bold text-gray-300">
                    Mesaj
                  </label>

                  <textarea
                    required
                    rows={7}
                    placeholder="Mesajınızı buraya yazın..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500/50"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-yellow-500 px-7 py-4 font-bold text-black transition hover:bg-yellow-400"
                >
                  Mesaj Gönder →
                </button>

                {sent && (
                  <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-center text-sm font-bold text-green-400">
                    Mesajın alındı. Teşekkürler!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <a href="/" className="text-2xl font-black">
                Poy<span className="text-yellow-500">Software</span>
              </a>

              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                Modern yazılımlar, ücretsiz araçlar ve teknoloji içerikleri.
              </p>
            </div>

            <div className="flex gap-8 text-sm text-gray-500">
              <a href="/#urunler" className="hover:text-white">
                Ürünler
              </a>

              <a href="/tools" className="hover:text-white">
                Araçlar
              </a>

              <a href="/blog" className="hover:text-white">
                Blog
              </a>

              <a href="/iletisim" className="hover:text-white">
                İletişim
              </a>
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