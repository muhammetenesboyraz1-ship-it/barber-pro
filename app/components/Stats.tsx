export default function Stats() {
  const stats = [
    {
      number: "12.000+",
      title: "Mutlu Müşteri",
    },
    {
      number: "20+",
      title: "Yıllık Deneyim",
    },
    {
      number: "4.9★",
      title: "Google Puanı",
    },
    {
      number: "7/24",
      title: "Online Randevu",
    },
  ];

  return (
    <section className="bg-[#0b0b0b] py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[#151515] rounded-3xl p-10 text-center border border-yellow-500/20 hover:border-yellow-500 transition duration-300 hover:-translate-y-2"
            >
              <h2 className="text-5xl font-bold text-yellow-500">
                {item.number}
              </h2>

              <p className="mt-4 text-gray-300 text-lg">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}