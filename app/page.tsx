import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";
import SpecialOffer from "@/components/sections/SpecialOffer";

// Lazy load components for better performance
const Treatments = dynamic(() => import("@/components/sections/Treatments"), {
  loading: () => <div className="py-20 bg-white" />
});

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <div className="py-20 bg-gray-100" />
});

const Consultation = dynamic(() => import("@/components/sections/Consultation"), {
  loading: () => <div className="py-20 bg-white" />
});

const Gallery = dynamic(() => import("@/components/sections/Gallery"), {
  loading: () => <div className="py-20 bg-white" />
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="py-20 bg-gray-100" />
});

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
