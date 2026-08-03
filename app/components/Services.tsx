export default function Services() {
  const services = [
    {
      title: "Premium Saç Kesimi",
      price: "650 ₺",
      time: "40 Dakika",
      icon: "✂️",
    },
    {
      title: "Sakal Tasarımı",
      price: "350 ₺",
      time: "25 Dakika",
      icon: "🧔",
    },
    {
      title: "Saç + Sakal",
      price: "900 ₺",
      time: "60 Dakika",
      icon: "🔥",
    },
  ];

  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-yellow-500 uppercase tracking-[6px]">
            Hizmetlerimiz
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Premium Hizmetler
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Profesyonel ekip ve kaliteli ürünlerle sizlere en iyi deneyimi sunuyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-[#111] border border-yellow-500/20 rounded-3xl p-8 hover:border-yellow-500 transition duration-300 hover:-translate-y-2"
            >

              <div className="text-6xl">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {service.title}
              </h3>

              <p className="text-gray-400 mt-3">
                Süre: {service.time}
              </p>

              <p className="text-yellow-500 text-3xl font-bold mt-6">
                {service.price}
              </p>

              <button className="mt-8 w-full bg-yellow-500 text-black py-3 rounded-full font-bold hover:bg-yellow-400 transition">
                Randevu Al
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}