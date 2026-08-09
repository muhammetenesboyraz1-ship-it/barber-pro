export default function Gallery() {
  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
  ];

  return (
    <section
  id="galeri"
  className="bg-black py-24 text-white"
>
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-yellow-500 uppercase tracking-[6px]">
            Galeri
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Son Çalışmalarımız
          </h2>

          <p className="text-gray-400 mt-6">
            Kalitemizi yapılan işlerden görün.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {images.map((image, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-3xl"
            >

              <img
                src={image}
                className="w-full h-80 object-cover hover:scale-110 transition duration-500"
              />

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}