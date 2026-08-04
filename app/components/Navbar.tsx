import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <h1 className="text-2xl font-bold text-yellow-500">
          BARBER PRO
        </h1>

        <ul className="hidden md:flex gap-8 text-white">
          <li>
            <a
              href="#anasayfa"
              className="hover:text-yellow-500 transition"
            >
              Ana Sayfa
            </a>
          </li>

          <li>
            <a
              href="#hizmetler"
              className="hover:text-yellow-500 transition"
            >
              Hizmetler
            </a>
          </li>

          <li>
            <a
              href="#galeri"
              className="hover:text-yellow-500 transition"
            >
              Galeri
            </a>
          </li>

          <li>
            <a
              href="#iletisim"
              className="hover:text-yellow-500 transition"
            >
              İletişim
            </a>
          </li>
        </ul>

        <Link
          href="/booking"
          className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition"
        >
          Randevu Al
        </Link>
      </div>
    </nav>
  );
}