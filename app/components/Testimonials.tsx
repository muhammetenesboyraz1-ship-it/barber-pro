export default function Testimonials() {
  const comments = [
    {
      name: "Ahmet Yılmaz",
      text: "Hayatımda gittiğim en iyi berber. Hizmet gerçekten mükemmel.",
    },
    {
      name: "Mehmet Kaya",
      text: "Online randevu sistemi çok kolay. Kesinlikle tavsiye ederim.",
    },
    {
      name: "Burak Demir",
      text: "Salon çok temiz ve çalışanlar gerçekten profesyonel.",
    },
  ];

  return (
    <section className="bg-[#0d0d0d] py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-yellow-500 uppercase tracking-[6px]">
            Müşteri Yorumları
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Bizi Tercih Edenler
          </h2>

          <p className="text-gray-400 mt-6">
            Müşterilerimizin bizim hakkımızdaki düşünceleri.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {comments.map((item, index) => (
            <div
              key={index}
              className="bg-[#181818] rounded-3xl p-8 border border-yellow-500/20 hover:border-yellow-500 transition duration-300"
            >

              <div className="text-yellow-500 text-2xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-300 leading-8">
                "{item.text}"
              </p>

              <h3 className="mt-8 font-bold text-xl">
                {item.name}
              </h3>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}