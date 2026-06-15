import dynamic from 'next/dynamic';
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import { GOOGLE_REVIEWS_SCHEMA } from "@/lib/reviews";

const Treatments = dynamic(() => import("@/components/sections/Treatments"), {
  loading: () => <div className="py-20 bg-white" />
});

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <div className="py-20 bg-gray-100" />
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="py-20 bg-gray-50" />
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

const SpecialOffers = dynamic(() => import("@/components/sections/SpecialOffers"), {
  loading: () => <div className="py-20 bg-gray-50" />
});

export const metadata: Metadata = {
  title: "Skinlux Pottendorf | Laser Haarentfernung & HydraFacial | Baden, Mödling",
  description: "Laser Haarentfernung & HydraFacial in Pottendorf. Modernste Diodenlaser-Technologie, kostenlose Probebehandlung. Für Baden, Mödling & NÖ.",
  alternates: {
    canonical: "https://pottendorf.skinlux.at",
  },
  openGraph: {
    title: "Skinlux Pottendorf | Laser Haarentfernung & HydraFacial | Baden, Mödling",
    description: "Laser Haarentfernung & HydraFacial in Pottendorf. Modernste Diodenlaser-Technologie, kostenlose Probebehandlung. Für Baden, Mödling & NÖ.",
    url: "https://pottendorf.skinlux.at",
    type: "website",
    locale: "de_AT",
    siteName: "Skinlux Pottendorf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skinlux Pottendorf | Laser Haarentfernung Baden, Mödling",
    description: "Laser Haarentfernung & HydraFacial in Pottendorf. Kostenlose Probebehandlung. Für Baden, Mödling & NÖ.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Skinlux Pottendorf",
  "description": "Laser Haarentfernung & HydraFacial in Pottendorf. Modernste Diodenlaser-Technologie, kostenlose Probebehandlung.",
  "url": "https://pottendorf.skinlux.at",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pottendorf",
    "addressRegion": "Niederösterreich",
    "addressCountry": "AT",
  },
  "areaServed": [
    { "@type": "City", "name": "Pottendorf" },
    { "@type": "City", "name": "Baden" },
    { "@type": "City", "name": "Mödling" },
  ],
  "serviceType": ["Laser Haarentfernung", "HydraFacial"],
  "priceRange": "$$",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(GOOGLE_REVIEWS_SCHEMA) }}
      />
      <Hero />
      <Treatments />
      <SpecialOffers />
      <About />
      <Testimonials />
      <Consultation />
      <Gallery />
      <Contact />
    </>
  );
}
