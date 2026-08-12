import Footer from "@/app/components/Footer";
import Contact from "@/app/components/Contact";
import Testimonials from "@/app/components/Testimonials";
import Gallery from "@/app/components/Gallery";
import Stats from "@/app/components/Stats";
import Services from "@/app/components/Services";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";

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