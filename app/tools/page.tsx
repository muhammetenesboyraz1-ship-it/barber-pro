"use client";

import { useState } from "react";

type Tool = "compress" | "resize" | "convert";

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool>("compress");

  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [format, setFormat] = useState("image/webp");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  function reset() {
    setFile(null);
    setWidth("");
    setHeight("");
    setMessage("");
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

  async function processImage() {
    if (!file) {
      setMessage("Lütfen önce bir fotoğraf seç.");
      return;
    }

    setProcessing(true);
    setMessage("");

    try {
      const imageUrl = URL.createObjectURL(file);

      const image = new Image();

      image.onload = () => {
        let targetWidth = image.width;
        let targetHeight = image.height;

        if (activeTool === "resize") {
          if (!width && !height) {
            setMessage("Lütfen genişlik veya yükseklik gir.");
            URL.revokeObjectURL(imageUrl);
            setProcessing(false);
            return;
          }

          if (width && height) {
            targetWidth = Number(width);
            targetHeight = Number(height);
          } else if (width) {
            targetWidth = Number(width);
            targetHeight = Math.round(
              image.height * (targetWidth / image.width)
            );
          } else if (height) {
            targetHeight = Number(height);
            targetWidth = Math.round(
              image.width * (targetHeight / image.height)
            );
          }
        }

        const canvas = document.createElement("canvas");

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setMessage("Tarayıcı görseli işleyemedi.");
          URL.revokeObjectURL(imageUrl);
          setProcessing(false);
          return;
        }

        ctx.drawImage(
          image,
          0,
          0,
          targetWidth,
          targetHeight
        );

        let outputType = "image/jpeg";
        let extension = "jpg";

        if (activeTool === "convert") {
          outputType = format;

          if (format === "image/png") {
            extension = "png";
          }

          if (format === "image/webp") {
            extension = "webp";
          }
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setMessage("Görsel oluşturulamadı.");
              setProcessing(false);
              URL.revokeObjectURL(imageUrl);
              return;
            }

            const originalName = file.name
              .replace(/\.[^/.]+$/, "")
              .replace(/\s+/g, "-");

            let filename = `${originalName}-poysoftware`;

            if (activeTool === "compress") {
              filename += "-compressed.jpg";
            } else if (activeTool === "resize") {
              filename += `-${targetWidth}x${targetHeight}.jpg`;
            } else {
              filename += `.${extension}`;
            }

            downloadBlob(blob, filename);

            const originalKB = Math.round(file.size / 1024);
            const newKB = Math.round(blob.size / 1024);

            setMessage(
              `İşlem tamamlandı. ${originalKB} KB → ${newKB} KB`
            );

            setProcessing(false);
            URL.revokeObjectURL(imageUrl);
          },
          outputType,
          activeTool === "compress" ? quality : 0.9
        );
      };

      image.onerror = () => {
        setMessage("Bu dosya geçerli bir görsel değil.");
        setProcessing(false);
        URL.revokeObjectURL(imageUrl);
      };

      image.src = imageUrl;
    } catch {
      setMessage("Bir hata oluştu.");
      setProcessing(false);
    }
  }

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

          <div className="hidden gap-8 text-sm text-gray-300 md:flex">
            <a href="/#urunler" className="hover:text-yellow-400">
              Ürünler
            </a>

            <a href="/tools" className="text-yellow-400">
              Ücretsiz Araçlar
            </a>

            <a href="/#blog" className="hover:text-yellow-400">
              Blog
            </a>
          </div>

          <a
            href="/barber-pro"
            className="rounded-full border border-yellow-500/40 px-5 py-2.5 text-sm font-bold text-yellow-400 hover:bg-yellow-500 hover:text-black"
          >
            Barber Pro
          </a>
        </div>
      </nav>

      {/* HEADER */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">
            PoySoftware Tools
          </p>

          <h1 className="mt-5 text-5xl font-black md:text-7xl">
            Ücretsiz
            <span className="text-yellow-500"> araçlar.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Fotoğraflarını hızlıca sıkıştır, boyutlandır veya farklı
            formatlara dönüştür. Ücretsiz ve kolay.
          </p>
        </div>
      </section>

      {/* TOOL SELECTOR */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <button
            onClick={() => {
              setActiveTool("compress");
              reset();
            }}
            className={`rounded-2xl border p-6 text-left transition ${
              activeTool === "compress"
                ? "border-yellow-500 bg-yellow-500/10"
                : "border-white/10 bg-white/[0.02] hover:border-yellow-500/30"
            }`}
          >
            <div className="text-3xl">🖼️</div>

            <h2 className="mt-4 text-xl font-bold">
              Fotoğraf Sıkıştır
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Görsel dosya boyutunu küçült.
            </p>
          </button>

          <button
            onClick={() => {
              setActiveTool("resize");
              reset();
            }}
            className={`rounded-2xl border p-6 text-left transition ${
              activeTool === "resize"
                ? "border-yellow-500 bg-yellow-500/10"
                : "border-white/10 bg-white/[0.02] hover:border-yellow-500/30"
            }`}
          >
            <div className="text-3xl">📐</div>

            <h2 className="mt-4 text-xl font-bold">
              Fotoğraf Boyutlandır
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Görselin genişlik ve yüksekliğini değiştir.
            </p>
          </button>

          <button
            onClick={() => {
              setActiveTool("convert");
              reset();
            }}
            className={`rounded-2xl border p-6 text-left transition ${
              activeTool === "convert"
                ? "border-yellow-500 bg-yellow-500/10"
                : "border-white/10 bg-white/[0.02] hover:border-yellow-500/30"
            }`}
          >
            <div className="text-3xl">🔄</div>

            <h2 className="mt-4 text-xl font-bold">
              Görsel Dönüştür
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              JPG, PNG ve WebP arasında dönüştür.
            </p>
          </button>
        </div>

        {/* TOOL BOX */}
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-yellow-500/20 bg-[#0b0b0b] p-6 md:p-10">
          <div className="rounded-2xl border border-dashed border-white/20 p-8 text-center">
            <div className="text-5xl">📁</div>

            <h2 className="mt-5 text-2xl font-black">
              Görselini seç
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Dosyan cihazında işlenir. Sunucuya yüklenmez.
            </p>

            <label className="mt-7 inline-block cursor-pointer rounded-xl bg-yellow-500 px-7 py-4 font-bold text-black transition hover:bg-yellow-400">
              {file ? file.name : "Fotoğraf Seç"}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setMessage("");
                }}
              />
            </label>
          </div>

          {/* COMPRESS */}
          {activeTool === "compress" && (
            <div className="mt-8">
              <label className="text-sm font-bold">
                Kalite: {Math.round(quality * 100)}%
              </label>

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
                <label className="text-sm text-gray-400">
                  Genişlik
                </label>

                <input
                  type="number"
                  placeholder="Örn. 1200"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Yükseklik
                </label>

                <input
                  type="number"
                  placeholder="Örn. 800"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none focus:border-yellow-500"
                />
              </div>

              <p className="text-sm text-gray-500 md:col-span-2">
                Sadece genişlik veya yükseklik girersen diğer ölçü
                otomatik hesaplanır.
              </p>
            </div>
          )}

          {/* CONVERT */}
          {activeTool === "convert" && (
            <div className="mt-8">
              <label className="text-sm text-gray-400">
                Hedef format
              </label>

              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none focus:border-yellow-500"
              >
                <option value="image/webp">
                  WebP
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

          <button
            onClick={processImage}
            disabled={processing}
            className="mt-8 w-full rounded-xl bg-yellow-500 p-4 font-black text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing
              ? "İşleniyor..."
              : activeTool === "compress"
              ? "Fotoğrafı Sıkıştır"
              : activeTool === "resize"
              ? "Fotoğrafı Boyutlandır"
              : "Formatı Dönüştür"}
          </button>

          {message && (
            <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center text-sm text-yellow-400">
              {message}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-gray-600">
          © {new Date().getFullYear()} PoySoftware. Tüm hakları saklıdır.
        </div>
      </footer>
    </main>
  );
}