import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}