export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-yellow-500/20 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-3xl font-bold text-yellow-500">
              BARBER PRO
            </h2>

            <p className="text-gray-400 mt-4">
              Premium erkek bakım deneyimi.
              Modern tasarım ve online randevu sistemi.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              Hızlı Menü
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Ana Sayfa</li>
              <li>Hizmetler</li>
              <li>Galeri</li>
              <li>İletişim</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              İletişim
            </h3>

            <p className="text-gray-400">
              📍 İstanbul
            </p>

            <p className="text-gray-400 mt-2">
              📞 +90 555 123 45 67
            </p>

            <p className="text-gray-400 mt-2">
              ✉ info@barberpro.com
            </p>

          </div>

        </div>

        <div className="border-t border-yellow-500/20 mt-10 pt-8 text-center text-gray-500">

          © 2026 Barber Pro. Tüm hakları saklıdır.

        </div>

      </div>
    </footer>
  );
}