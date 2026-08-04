import Link from "next/link";
export default function Hero() {
  return (
  <section
  id="anasayfa"
  className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/barber.jpg')",
      }}
    >
      {/* Siyah katman */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* İçerik */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-6xl md:text-8xl font-bold text-yellow-500">
            BARBER PRO
          </h2>

          <p className="text-white text-xl md:text-2xl mt-6">
            Modern Erkek Bakım Deneyimi
          </p>

          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Profesyonel saç kesimi, sakal tasarımı ve premium bakım hizmetleri.
          </p>

    <Link
  href="/booking"
  className="inline-block mt-8 bg-yellow-500 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition"
>
  Randevu Al
</Link>
          
        </div>
      </div>
    </section>
  );
}