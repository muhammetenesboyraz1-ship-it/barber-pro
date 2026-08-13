"use client";

import { useRef, useState } from "react";
import QRCode from "qrcode";

type Tool = "compress" | "resize" | "convert" | "qr";

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool>("compress");

  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [format, setFormat] = useState("image/webp");

  const [qrText, setQrText] = useState("");
  const [qrSize, setQrSize] = useState(500);
  const [qrDataUrl, setQrDataUrl] = useState("");

  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFile(null);
    setWidth("");
    setHeight("");
    setQrText("");
    setQrDataUrl("");
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  function getOutputExtension(mime: string) {
    if (mime === "image/jpeg") return "jpg";
    if (mime === "image/png") return "png";
    return "webp";
  }

  async function processImage() {
    if (!file) {
      setMessage("Önce bir görsel seç.");
      return;
    }

    setProcessing(true);
    setMessage("");

    try {
      const imageUrl = URL.createObjectURL(file);

      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Görsel okunamadı."));
        img.src = imageUrl;
      });

      let targetWidth = img.width;
      let targetHeight = img.height;

      if (activeTool === "resize") {
        if (width) {
          targetWidth = Number(width);
        }

        if (height) {
          targetHeight = Number(height);
        }

        if (width && !height) {
          targetHeight = Math.round(
            img.height * (targetWidth / img.width)
          );
        }

        if (height && !width) {
          targetWidth = Math.round(
            img.width * (targetHeight / img.height)
          );
        }

        if (targetWidth <= 0 || targetHeight <= 0) {
          throw new Error("Geçerli bir boyut gir.");
        }
      }

      const canvas = document.createElement("canvas");

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas desteklenmiyor.");
      }

      ctx.drawImage(
        img,
        0,
        0,
        targetWidth,
        targetHeight
      );

      let outputMime = format;

      if (activeTool === "compress") {
        outputMime = file.type || "image/webp";
      }

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
          resolve,
          outputMime,
          quality
        );
      });

      URL.revokeObjectURL(imageUrl);

      if (!blob) {
        throw new Error("Görsel oluşturulamadı.");
      }

      const extension = getOutputExtension(outputMime);

      const originalName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/\s+/g, "-");

      downloadBlob(
        blob,
        `${originalName}-poysoftware.${extension}`
      );

      const oldSize = (file.size / 1024).toFixed(1);
      const newSize = (blob.size / 1024).toFixed(1);

      setMessage(
        `İşlem tamamlandı. ${oldSize} KB → ${newSize} KB`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Bir hata oluştu."
      );
    } finally {
      setProcessing(false);
    }
  }

  async function generateQR() {
    if (!qrText.trim()) {
      setMessage("QR kod için bir metin veya bağlantı gir.");
      return;
    }

    setProcessing(true);
    setMessage("");

    try {
      const dataUrl = await QRCode.toDataURL(
        qrText,
        {
          width: qrSize,
          margin: 2,
          errorCorrectionLevel: "M",
        }
      );

      setQrDataUrl(dataUrl);
      setMessage("QR kod hazır.");
    } catch {
      setMessage("QR kod oluşturulamadı.");
    } finally {
      setProcessing(false);
    }
  }

  function downloadQR() {
    if (!qrDataUrl) return;

    const a = document.createElement("a");

    a.href = qrDataUrl;
    a.download = "poysoftware-qr.png";

    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  const tools = [
    {
      id: "compress" as Tool,
      title: "Fotoğraf Sıkıştır",
      description: "Görsel dosya boyutunu küçült.",
      icon: "📦",
    },
    {
      id: "resize" as Tool,
      title: "Fotoğraf Boyutlandır",
      description: "Görselin genişlik ve yüksekliğini değiştir.",
      icon: "📐",
    },
    {
      id: "convert" as Tool,
      title: "Format Dönüştür",
      description: "JPG, PNG ve WEBP arasında dönüştür.",
      icon: "🔄",
    },
    {
      id: "qr" as Tool,
      title: "QR Kod Oluştur",
      description: "Metin veya bağlantıdan QR kod oluştur.",
      icon: "▦",
    },
  ];

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
              href="/#urunler"
              className="transition hover:text-yellow-400"
            >
              Ürünler
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

      {/* HEADER */}
      <section className="px-6 pb-12 pt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-400">
            PoySoftware • Ücretsiz Araçlar
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Günlük işlerini
            <span className="block text-yellow-500">
              daha kolay yap.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400 md:text-lg">
            Fotoğraflarını sıkıştır, boyutlandır, formatını değiştir
            veya saniyeler içinde QR kod oluştur.
          </p>
        </div>
      </section>

      {/* TOOL SELECTOR */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id);
                setMessage("");
              }}
              className={`rounded-2xl border p-6 text-left transition ${
                activeTool === tool.id
                  ? "border-yellow-500 bg-yellow-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-yellow-500/40"
              }`}
            >
              <div className="mb-4 text-3xl">
                {tool.icon}
              </div>

              <h2 className="font-bold">
                {tool.title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {tool.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* TOOL AREA */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl border border-yellow-500/20 bg-[#0a0a0a] p-6 shadow-2xl md:p-10">

          {/* IMAGE TOOLS */}
          {activeTool !== "qr" && (
            <>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-2xl border border-dashed border-white/20 bg-black/30 p-12 text-center transition hover:border-yellow-500/50"
              >
                <div className="text-5xl">
                  📁
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {file
                    ? file.name
                    : "Görselini seç"}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Dosya cihazında işlenir. Sunucuya yüklenmez.
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
                >
                  Fotoğraf Seç
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0] || null;
                    setFile(selected);
                    setMessage("");
                  }}
                />
              </div>

              {/* COMPRESS */}
              {activeTool === "compress" && (
                <div className="mt-8">
                  <div className="flex justify-between text-sm">
                    <span>Kalite</span>
                    <span className="font-bold text-yellow-500">
                      {Math.round(quality * 100)}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) =>
                      setQuality(Number(e.target.value))
                    }
                    className="mt-4 w-full accent-yellow-500"
                  />
                </div>
              )}

              {/* RESIZE */}
              {activeTool === "resize" && (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-gray-400">
                      Genişlik (px)
                    </label>

                    <input
                      value={width}
                      onChange={(e) =>
                        setWidth(e.target.value)
                      }
                      type="number"
                      placeholder="Örn: 1200"
                      className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-400">
                      Yükseklik (px)
                    </label>

                    <input
                      value={height}
                      onChange={(e) =>
                        setHeight(e.target.value)
                      }
                      type="number"
                      placeholder="Örn: 800"
                      className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              )}

              {/* CONVERT */}
              {activeTool === "convert" && (
                <div className="mt-8">
                  <label className="mb-2 block text-sm text-gray-400">
                    Çıktı formatı
                  </label>

                  <select
                    value={format}
                    onChange={(e) =>
                      setFormat(e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-yellow-500"
                  >
                    <option value="image/webp">
                      WEBP
                    </option>

                    <option value="image/jpeg">
                      JPG
                    </option>

                    <option value="image/png">
                      PNG
                    </option>
                  </select>
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <button
                  onClick={processImage}
                  disabled={processing}
                  className="flex-1 rounded-xl bg-yellow-500 px-6 py-4 font-black text-black transition hover:bg-yellow-400 disabled:opacity-50"
                >
                  {processing
                    ? "İşleniyor..."
                    : activeTool === "compress"
                    ? "Fotoğrafı Sıkıştır"
                    : activeTool === "resize"
                    ? "Fotoğrafı Boyutlandır"
                    : "Formatı Dönüştür"}
                </button>

                <button
                  onClick={reset}
                  className="rounded-xl border border-white/10 px-6 py-4 font-bold transition hover:bg-white/5"
                >
                  Temizle
                </button>
              </div>
            </>
          )}

          {/* QR */}
          {activeTool === "qr" && (
            <>
              <div>
                <div className="mb-3 text-4xl">
                  ▦
                </div>

                <h2 className="text-3xl font-black">
                  QR Kod Oluşturucu
                </h2>

                <p className="mt-2 text-gray-500">
                  Link, telefon numarası, Wi-Fi bilgisi veya
                  istediğin herhangi bir metni QR koda dönüştür.
                </p>
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-sm text-gray-400">
                  Metin veya bağlantı
                </label>

                <textarea
                  value={qrText}
                  onChange={(e) =>
                    setQrText(e.target.value)
                  }
                  placeholder="https://poysoftware.com"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-4 outline-none focus:border-yellow-500"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm text-gray-400">
                  QR boyutu
                </label>

                <select
                  value={qrSize}
                  onChange={(e) =>
                    setQrSize(Number(e.target.value))
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-yellow-500"
                >
                  <option value={300}>
                    300 × 300
                  </option>

                  <option value={500}>
                    500 × 500
                  </option>

                  <option value={800}>
                    800 × 800
                  </option>

                  <option value={1200}>
                    1200 × 1200
                  </option>
                </select>
              </div>

              <button
                onClick={generateQR}
                disabled={processing}
                className="mt-6 w-full rounded-xl bg-yellow-500 px-6 py-4 font-black text-black transition hover:bg-yellow-400 disabled:opacity-50"
              >
                {processing
                  ? "Oluşturuluyor..."
                  : "QR Kod Oluştur"}
              </button>

              {qrDataUrl && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white p-8 text-center">
                  <img
                    src={qrDataUrl}
                    alt="QR Kod"
                    className="mx-auto max-w-full"
                  />

                  <button
                    onClick={downloadQR}
                    className="mt-6 rounded-xl bg-black px-8 py-3 font-bold text-white transition hover:bg-gray-900"
                  >
                    QR Kodu İndir
                  </button>
                </div>
              )}

              <button
                onClick={reset}
                className="mt-4 w-full rounded-xl border border-white/10 px-6 py-3 font-bold transition hover:bg-white/5"
              >
                Temizle
              </button>
            </>
          )}

          {/* MESSAGE */}
          {message && (
            <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center text-sm text-yellow-400">
              {message}
            </div>
          )}
        </div>
      </section>

      {/* INFO */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 p-6">
            <div className="text-2xl">🔒</div>
            <h3 className="mt-3 font-bold">
              Gizlilik
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Görseller doğrudan cihazında işlenir.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <div className="text-2xl">⚡</div>
            <h3 className="mt-3 font-bold">
              Hızlı
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              İşlemler tarayıcı üzerinde gerçekleşir.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <div className="text-2xl">💰</div>
            <h3 className="mt-3 font-bold">
              Ücretsiz
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Temel araçları ücretsiz kullanabilirsin.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-8 text-sm text-gray-500 md:flex-row">
          <div>
            © 2026 PoySoftware
          </div>

          <div className="flex gap-6">
            <a
              href="/"
              className="transition hover:text-white"
            >
              Ana Sayfa
            </a>

            <a
              href="/barber-pro"
              className="transition hover:text-white"
            >
              Barber Pro
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}