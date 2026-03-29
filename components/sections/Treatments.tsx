"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FEATURES } from "@/lib/features";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";

const treatments = [
    {
        id: 'laser',
        title: "Laser Haarentfernung",
        description: "Dauerhafte Haarentfernung mit modernster Diodenlaser-Technologie.",
        image: "/images/gallery/treatment-laser.jpg",
        href: '/behandlungen/laser-haarentfernung'
    },
    {
        id: 'hydra-facial',
        title: "HydraFacial\u00AE",
        description: "3-in-1 Premium Behandlung für sofort sichtbare Ergebnisse.",
        image: "/images/gallery/treatment-hydrafacial.jpg",
        href: '/behandlungen/hydra-facial',
        isNew: true
    },
    {
        id: "skinpen-precision",
        title: "SkinPen\u00AE Microneedling",
        description: "Medizinisches Microneedling – FDA-zertifiziert, für verfeinertes Hautbild.",
        image: "/images/gallery/treatment-analysis.jpg",
        href: "/behandlungen/skinpen-precision",
        comingSoon: true,
    },
    {
        id: 'premium-facials',
        title: "Premium Facials",
        description: "Exklusive 90-Minuten Gesichtsbehandlungen mit Circadia Professional.",
        image: "/images/about/studio/interior.jpg",
        href: '/behandlungen/signature-facials'
    },
    ...(FEATURES.HAUTANALYSE_ENABLED ? [{
        id: 'hautanalyse',
        title: "Hautanalyse",
        description: "Professionelle Hautdiagnose mit modernster Technologie.",
        image: "/images/hautanalyse/hautanalyse.jpg",
        href: '/behandlungen/hautanalyse',
        isNew: true
    }] : []),
];

export default function Treatments() {
    return (
        <section id="treatments" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Behandlungen
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 text-black">
                        Unsere <span className="text-black">Expertise</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Modernste Technologien für Ihre Schönheit
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
                    {treatments.map((treatment) => {
                        const showComingSoon = "comingSoon" in treatment && treatment.comingSoon;
                        return (
                            <a
                                key={treatment.id}
                                href={treatment.href}
                                className="group relative flex items-start gap-5 border border-gray-200 bg-white p-5 md:p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
                            >
                                <div className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden">
                                    <Image
                                        src={treatment.image}
                                        alt={treatment.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="96px"
                                    />
                                </div>

                                <div className="flex-1 min-w-0 py-0.5">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                                        <h3 className="text-base md:text-lg font-light text-black leading-snug">
                                            {treatment.title}
                                        </h3>
                                        {showComingSoon ? (
                                            <ComingSoonBadge size="sm" className="shrink-0" />
                                        ) : (
                                            treatment.isNew && (
                                                <span
                                                    className="text-[0.55rem] font-light tracking-widest uppercase px-2 py-0.5 text-white shrink-0"
                                                    style={{ backgroundColor: 'var(--color-secondary)' }}
                                                >
                                                    NEU
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <p className="text-gray-600 font-light text-sm mb-3 leading-relaxed line-clamp-2">
                                        {treatment.description}
                                    </p>

                                    <span className="text-xs font-light tracking-widest uppercase inline-flex items-center gap-2 transition-colors" style={{ color: 'var(--color-primary)' }}>
                                        Mehr erfahren
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>

                <div className="mt-12 md:mt-16 text-center">
                    <a
                        href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center justify-center"
                    >
                        Termin vereinbaren
                    </a>
                </div>
            </div>
        </section>
    );
} 