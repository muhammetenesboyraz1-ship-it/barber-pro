"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRKodOlusturucu() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Ücretsiz QR Kod Oluşturucu | PoySoftware";
  }, []);

  const createQRCode = async () => {
    if (!text.trim()) {
      setError("Lütfen bir link veya metin gir.");
      setQrCode("");
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(text.trim(), {
        width: 500,
        margin: 2,
        errorCorrectionLevel: "M",
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });

      setQrCode(dataUrl);
      setError("");
    } catch {
      setError("QR kod oluşturulurken bir hata oluştu.");
      setQrCode("");
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "poysoftware-qr-kod.png";
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            Poy<span className="text-yellow-500">Software</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            <a
              href="/"
              className="transition hover:text-yellow-400"
            >
              Ana Sayfa
            </a>

            <a
              href="/tools"
              className="text-yellow-400"
            >
              Ücretsiz Araçlar
            </a>

            <a
              href="/#blog"
              className="transition hover:text-yellow-400"
            >
              Blog
            </a>

            <a
              href="/#iletisim"
              className="transition hover:text-yellow-400"
            >
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
      <section className="px-6 pb-10 pt-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-400">
            PoySoftware • Ücretsiz Araç
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Ücretsiz QR Kod
            <span className="block text-yellow-500">
              Oluşturucu
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Link, metin veya herhangi bir bilgiyi saniyeler içinde
            ücretsiz QR koda dönüştür. Kayıt gerekmez.
          </p>
        </div>
      </section>

      {/* TOOL */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-yellow-500/20 bg-[#0b0b0b] p-6 shadow-2xl md:p-10">

            <label className="mb-3 block text-sm font-bold text-gray-300">
              Link veya metin
            </label>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Örn: https://poysoftware.com"
              rows={4}
              className="w-full resize-none rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
            />

            <button
              onClick={createQRCode}
              className="mt-5 w-full rounded-2xl bg-yellow-500 px-6 py-4 font-black text-black transition hover:bg-yellow-400"
            >
              QR Kod Oluştur
            </button>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
                {error}
              </div>
            )}

            {qrCode && (
              <div className="mt-10 flex flex-col items-center">

                <div className="rounded-3xl bg-white p-6 shadow-xl">
                  <img
                    src={qrCode}
                    alt="Oluşturulan QR kod"
                    className="h-64 w-64 md:h-80 md:w-80"
                  />
                </div>

                <p className="mt-5 max-w-xl break-all text-center text-sm text-gray-500">
                  {text}
                </p>

                <button
                  onClick={downloadQRCode}
                  className="mt-6 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 px-8 py-4 font-bold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
                >
                  PNG Olarak İndir
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-black md:text-4xl">
            QR kod ne için kullanılır?
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
              <div className="text-3xl">🌐</div>
              <h3 className="mt-4 text-xl font-bold">
                Web Siteleri
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Web sitenize veya herhangi bir bağlantıya hızlı
                erişim sağlayın.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
              <div className="text-3xl">📱</div>
              <h3 className="mt-4 text-xl font-bold">
                Sosyal Medya
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Instagram, YouTube veya diğer sosyal medya
                profillerinizi paylaşın.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
              <div className="text-3xl">🍽️</div>
              <h3 className="mt-4 text-xl font-bold">
                Menü ve İşletmeler
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Menü, iletişim bilgileri ve işletme bağlantılarını
                kolayca paylaşın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
          <div className="text-xl font-black">
            Poy<span className="text-yellow-500">Software</span>
          </div>

          <div className="text-sm text-gray-500">
            © 2026 PoySoftware. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </main>
  );
}