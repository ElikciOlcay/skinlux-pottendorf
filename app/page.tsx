import Hero from "@/components/sections/Hero";
import SpecialOffer from "@/components/sections/SpecialOffer";
import Treatments from "@/components/sections/Treatments";
import About from "@/components/sections/About";
import Consultation from "@/components/sections/Consultation";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SpecialOffer />
      <Treatments />
      <About />
      <Consultation />
      <Gallery />
      <Contact />
    </>
  );
}
