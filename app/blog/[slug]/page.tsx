import Link from "next/link";
import { notFound } from "next/navigation";

const posts = {
  "yapay-zeka": {
    category: "Yapay Zeka",
    title: "Yapay zeka hayatımızı nasıl değiştiriyor?",
    description:
      "Yapay zekanın günlük hayatımızı, çalışma şeklimizi ve gelecekteki teknoloji kullanımımızı nasıl değiştirdiğine göz atıyoruz.",
    date: "13 Ağustos 2026",
    readTime: "5 dk",
    content: [
      {
        heading: "Yapay zeka artık hayatımızın içinde",
        text: "Yapay zeka son yıllarda yalnızca teknoloji şirketlerinin kullandığı bir teknoloji olmaktan çıktı. Günlük kullandığımız uygulamalardan arama motorlarına, müşteri hizmetlerinden içerik üretimine kadar birçok alanda karşımıza çıkıyor.",
      },
      {
        heading: "Çalışma şeklimiz değişiyor",
        text: "Yapay zeka insanların yaptığı birçok tekrarlayan işi daha kısa sürede gerçekleştirmesine yardımcı oluyor. Metin oluşturma, veri analizi, görsel üretimi ve yazılım geliştirme gibi alanlarda önemli bir yardımcı haline geliyor.",
      },
      {
        heading: "Gelecekte bizi ne bekliyor?",
        text: "Önümüzdeki yıllarda yapay zekanın daha fazla günlük uygulamaya entegre olması bekleniyor. Buradaki en önemli nokta yapay zekayı insanın yerine geçen bir araçtan ziyade insanın yeteneklerini artıran bir yardımcı olarak değerlendirmek.",
      },
    ],
  },

  "siber-guvenlik": {
    category: "Siber Güvenlik",
    title: "İnternette daha güvenli olmak için 10 yöntem",
    description:
      "Hesaplarını ve kişisel bilgilerini internette daha güvenli tutmak için uygulayabileceğin temel güvenlik yöntemleri.",
    date: "13 Ağustos 2026",
    readTime: "6 dk",
    content: [
      {
        heading: "1. Güçlü ve benzersiz şifreler kullan",
        text: "Her hesapta aynı şifreyi kullanmak yerine farklı ve tahmin edilmesi zor şifreler tercih et. Özellikle e-posta ve banka hesapların için benzersiz şifreler kullan.",
      },
      {
        heading: "2. İki aşamalı doğrulamayı aç",
        text: "İki aşamalı doğrulama hesabına ekstra bir güvenlik katmanı ekler. Şifren ele geçirilse bile hesabına erişilmesini zorlaştırır.",
      },
      {
        heading: "3. Şüpheli bağlantılara dikkat et",
        text: "Tanımadığın kişilerden gelen bağlantıları açmadan önce dikkatlice kontrol et. Özellikle acil işlem yapmanı isteyen mesajlara karşı temkinli ol.",
      },
      {
        heading: "4. Güncellemeleri ihmal etme",
        text: "Telefon, bilgisayar ve kullandığın uygulamaların güncel olması güvenlik açıklarının kapatılması açısından önemlidir.",
      },
      {
        heading: "5. Herkese açık Wi-Fi ağlarında dikkatli ol",
        text: "Herkese açık ağlarda hassas işlemler gerçekleştirirken dikkatli davran. Mümkün olduğunda güvenilir bağlantılar kullan.",
      },
      {
        heading: "6. Kişisel bilgilerini gereksiz paylaşma",
        text: "İnternette paylaştığın bilgiler zamanla farklı amaçlarla kullanılabilir. Adres, telefon ve benzeri bilgileri herkese açık şekilde paylaşmamaya dikkat et.",
      },
      {
        heading: "7. Uygulamaların izinlerini kontrol et",
        text: "Telefonundaki uygulamaların kamera, mikrofon, konum ve dosya erişimi gibi izinlerini düzenli olarak kontrol et.",
      },
      {
        heading: "8. Yedekleme yap",
        text: "Önemli dosyalarının yedeğini almak cihaz arızası, yanlışlıkla silme veya benzeri durumlarda verilerini korumana yardımcı olur.",
      },
      {
        heading: "9. Hesap hareketlerini kontrol et",
        text: "Önemli hesaplarında tanımadığın giriş veya hareket olup olmadığını düzenli olarak kontrol et.",
      },
      {
        heading: "10. Bilmediğin dosyaları indirme",
        text: "Kaynağından emin olmadığın dosyaları indirmek cihazını güvenlik risklerine maruz bırakabilir.",
      },
    ],
  },

  dijitallesme: {
    category: "Dijitalleşme",
    title: "Küçük işletmeler neden dijitalleşmeli?",
    description:
      "Küçük işletmelerin dijital araçlardan nasıl faydalanabileceğini ve işlerini nasıl daha verimli hale getirebileceğini anlatıyoruz.",
    date: "13 Ağustos 2026",
    readTime: "4 dk",
    content: [
      {
        heading: "Dijitalleşme sadece büyük şirketler için değil",
        text: "Dijital araçlar artık küçük işletmeler için de ulaşılabilir durumda. Doğru araçların kullanılması işletmelerin zaman kazanmasına ve müşterilerine daha iyi hizmet vermesine yardımcı olabilir.",
      },
      {
        heading: "Randevu ve müşteri yönetimi",
        text: "Özellikle hizmet sektöründeki işletmeler için online randevu sistemleri önemli kolaylık sağlar. Müşteriler istedikleri zaman randevu oluşturabilir, işletme sahipleri ise randevularını daha düzenli takip edebilir.",
      },
      {
        heading: "Müşteri deneyimi önem kazanıyor",
        text: "Dijitalleşme yalnızca işletmenin iç işleyişini değil, müşterinin işletmeyle olan deneyimini de geliştirir. Daha hızlı iletişim ve kolay randevu süreçleri müşteri memnuniyetini artırabilir.",
      },
      {
        heading: "Doğru araçları seçmek",
        text: "Bir işletmenin onlarca farklı sisteme ihtiyacı olmak zorunda değil. Önemli olan işletmenin gerçek problemlerini belirlemek ve bu problemlere çözüm sağlayan araçları kullanmaktır.",
      },
    ],
  },
} as const;

type Slug = keyof typeof posts;

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in posts)) {
    notFound();
  }

  const post = posts[slug as Slug];

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

        <div className="mb-8 flex flex-wrap items-center gap-3">

          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-bold text-yellow-400">
            {post.category}
          </span>

          <span className="text-sm text-gray-500">
            {post.date} • {post.readTime}
          </span>

        </div>

        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
          {post.title}
        </h1>

        <p className="mt-7 text-lg leading-8 text-gray-400 md:text-xl">
          {post.description}
        </p>

        <div className="mt-12 border-t border-white/10 pt-12">

          {post.content.map((section) => (
            <section
              key={section.heading}
              className="mb-12"
            >

              <h2 className="text-2xl font-black md:text-3xl">
                {section.heading}
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                {section.text}
              </p>

            </section>
          ))}

        </div>

        {/* BACK BUTTON */}
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