export default function PoySoftwareHome() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-black tracking-tight">
            Poy<span className="text-yellow-500">Software</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            <a href="#urunler" className="transition hover:text-yellow-400">
              Ürünler
            </a>
            <a href="#araclar" className="transition hover:text-yellow-400">
              Ücretsiz Araçlar
            </a>
            <a href="#blog" className="transition hover:text-yellow-400">
              Blog
            </a>
            <a href="#iletisim" className="transition hover:text-yellow-400">
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
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-28 md:pb-36 md:pt-36">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-400">
              Modern teknoloji • Akıllı araçlar • Yazılımlar
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
              Dijital dünyayı
              <span className="block text-yellow-500">
                daha kolay hale getiriyoruz.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
              PoySoftware; işletmeler için yazılımlar, herkes için ücretsiz
              internet araçları ve teknoloji içerikleri geliştirir.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#araclar"
                className="rounded-xl bg-yellow-500 px-7 py-4 text-center font-bold text-black transition hover:bg-yellow-400"
              >
                Ücretsiz Araçları Keşfet
              </a>

              <a
                href="#urunler"
                className="rounded-xl border border-white/15 px-7 py-4 text-center font-bold text-white transition hover:border-yellow-500/40 hover:bg-white/5"
              >
                Ürünlerimizi İncele
              </a>
            </div>
          </div>

          {/* HERO STATS */}
          <div className="mt-20 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 md:grid-cols-4">
            <div>
              <p className="text-3xl font-black text-yellow-500">01</p>
              <p className="mt-2 text-sm text-gray-500">Aktif SaaS ürün</p>
            </div>

            <div>
              <p className="text-3xl font-black text-yellow-500">∞</p>
              <p className="mt-2 text-sm text-gray-500">Geliştirilecek araç</p>
            </div>

            <div>
              <p className="text-3xl font-black text-yellow-500">24/7</p>
              <p className="mt-2 text-sm text-gray-500">Online erişim</p>
            </div>

            <div>
              <p className="text-3xl font-black text-yellow-500">V1</p>
              <p className="mt-2 text-sm text-gray-500">Yeni başlangıç</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="urunler" className="border-t border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
              Ürünler
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              İşletmeler için
              <span className="text-yellow-500"> güçlü yazılımlar.</span>
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Gerçek problemlere odaklanan, kullanımı kolay ve modern
              yazılımlar geliştiriyoruz.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* BARBER PRO */}
            <div className="group rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-8 transition hover:border-yellow-500/50">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500 text-2xl">
                  ✂️
                </div>

                <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                  AKTİF
                </span>
              </div>

              <h3 className="mt-8 text-3xl font-black">Barber Pro</h3>

              <p className="mt-4 max-w-xl leading-7 text-gray-400">
                Berberler için online randevu ve işletme yönetim sistemi.
                Müşteriler online randevu oluşturabilir, işletme sahibi
                randevularını kolayca yönetebilir.
              </p>

              <a
                href="/barber-pro"
                className="mt-8 inline-flex rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
              >
                Barber Pro'yu İncele →
              </a>
            </div>

            {/* FUTURE PRODUCT */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                ⚡
              </div>

              <h3 className="mt-8 text-3xl font-black">
                Yeni ürünler geliyor
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                PoySoftware çatısı altında farklı işletmeler ve kullanıcılar
                için yeni SaaS ürünleri geliştiriyoruz.
              </p>

              <span className="mt-8 inline-block rounded-xl border border-white/10 px-6 py-3 font-bold text-gray-400">
                Yakında
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FREE TOOLS */}
      <section id="araclar">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
                Ücretsiz Araçlar
              </p>

              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                Günlük işlerin için
                <span className="text-yellow-500"> pratik araçlar.</span>
              </h2>

              <p className="mt-5 leading-7 text-gray-400">
                Dosyalarını, görsellerini ve metinlerini hızlıca düzenlemek
                için ücretsiz online araçlar.
              </p>
            </div>

            <span className="w-fit rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-400">
              Yakında aktif
            </span>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🖼️",
                title: "Fotoğraf Sıkıştır",
                text: "Görsellerin boyutunu kaliteyi koruyarak küçült.",
              },
              {
                icon: "📐",
                title: "Fotoğraf Boyutlandır",
                text: "Görsellerini istediğin ölçülere hızlıca getir.",
              },
              {
                icon: "🔄",
                title: "Görsel Dönüştür",
                text: "PNG, JPG, WebP gibi formatlar arasında dönüştür.",
              },
              {
                icon: "🔳",
                title: "QR Kod Oluştur",
                text: "Linklerin için hızlı ve kolay QR kodlar oluştur.",
              },
              {
                icon: "📄",
                title: "PDF Araçları",
                text: "PDF dosyaları üzerinde pratik işlemler yap.",
              },
              {
                icon: "✍️",
                title: "Metin Araçları",
                text: "Metinlerini dönüştür, düzenle ve analiz et.",
              },
            ].map((tool) => (
              <div
                key={tool.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:-translate-y-1 hover:border-yellow-500/30 hover:bg-yellow-500/[0.03]"
              >
                <div className="text-3xl">{tool.icon}</div>

                <h3 className="mt-5 text-xl font-bold">{tool.title}</h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {tool.text}
                </p>

                <span className="mt-6 inline-block text-sm font-bold text-yellow-500">
                  Çok yakında →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="border-y border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
                Blog
              </p>

              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                Teknoloji hakkında
                <span className="text-yellow-500"> gerçek içerikler.</span>
              </h2>
            </div>

            <span className="text-sm text-gray-500">
              Blog sistemi V1.1'de
            </span>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              "Yapay zeka hayatımızı nasıl değiştiriyor?",
              "İnternette daha güvenli olmak için 10 yöntem",
              "Küçük işletmeler neden dijitalleşmeli?",
            ].map((title, index) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-black p-7"
              >
                <span className="text-sm text-yellow-500">
                  0{index + 1} • PoySoftware
                </span>

                <h3 className="mt-5 text-xl font-bold leading-8">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-gray-500">
                  Yakında PoySoftware blogunda yayınlanacak kaliteli
                  teknoloji içerikleri.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-28 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
            PoySoftware
          </p>

          <h2 className="mt-5 text-4xl font-black md:text-6xl">
            Teknolojiyi
            <span className="text-yellow-500"> herkes için</span> daha
            kullanışlı yapıyoruz.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-400">
            Ücretsiz araçlardan profesyonel yazılımlara kadar dijital
            dünyadaki günlük problemleri çözmeye devam ediyoruz.
          </p>

          <a
            href="#araclar"
            className="mt-9 inline-block rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400"
          >
            Araçları Keşfet
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="iletisim" className="border-t border-white/10 bg-black">
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
              <a href="#urunler" className="hover:text-white">
                Ürünler
              </a>

              <a href="#araclar" className="hover:text-white">
                Araçlar
              </a>

              <a href="#blog" className="hover:text-white">
                Blog
              </a>

              <a href="#iletisim" className="hover:text-white">
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