export default function Contact() {
  return (
    <section className="bg-black py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-yellow-500 uppercase tracking-[6px]">
            İletişim
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Bize Ulaşın
          </h2>

          <p className="text-gray-400 mt-6">
            Randevu almak veya bilgi edinmek için bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          <div className="space-y-8">

            <div>
              <h3 className="text-yellow-500 text-xl font-bold">📍 Adres</h3>
              <p className="text-gray-300 mt-2">
                Atatürk Caddesi No:25, İstanbul
              </p>
            </div>

            <div>
              <h3 className="text-yellow-500 text-xl font-bold">📞 Telefon</h3>
              <p className="text-gray-300 mt-2">
                +90 555 123 45 67
              </p>
            </div>

            <div>
              <h3 className="text-yellow-500 text-xl font-bold">📧 E-Posta</h3>
              <p className="text-gray-300 mt-2">
                info@barberpro.com
              </p>
            </div>

            <div>
              <h3 className="text-yellow-500 text-xl font-bold">🕒 Çalışma Saatleri</h3>
              <p className="text-gray-300 mt-2">
                Pazartesi - Cumartesi
                <br />
                09:00 - 21:00
              </p>
            </div>

          </div>

          <div className="rounded-3xl overflow-hidden border border-yellow-500/20">

            <iframe
              src="https://www.google.com/maps?q=Istanbul&output=embed"
              className="w-full h-[450px]"
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </div>
    </section>
  );
}