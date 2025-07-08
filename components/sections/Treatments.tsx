"use client";

import {
    Zap,
    Droplets,
    Sparkles,
    ArrowRight,
    Camera,
    Heart
} from "lucide-react";
import { FEATURES } from "@/lib/features";

const treatments = [
    {
        id: 'laser',
        title: "Laser Haarentfernung",
        description: "Dauerhafte Haarentfernung mit modernster Diodenlaser-Technologie.",
        icon: Zap,
        href: '/behandlungen/laser-haarentfernung'
    },
    {
        id: 'hydra-facial',
        title: "HydraFacial®",
        description: "3-in-1 Premium Behandlung für sofort sichtbare Ergebnisse.",
        icon: Droplets,
        href: '/behandlungen/hydra-facial',
        isNew: true
    },
    {
        id: 'premium-facials',
        title: "Premium Facials",
        description: "Exklusive 90-Minuten Gesichtsbehandlungen mit Circadia Professional.",
        icon: Heart,
        href: '/behandlungen/signature-facials'
    },
    // Microneedling temporär ausgeblendet - wird später aktiviert
    ...(FEATURES.MICRONEEDLING_ENABLED ? [{
        id: 'microneedling',
        title: "Microneedling",
        description: "Innovative Behandlung zur Kollagenproduktion für straffere Haut.",
        icon: Sparkles,
        href: '/behandlungen/microneedling',
        isNew: true
    }] : []),
    // Hautanalyse temporär ausgeblendet - wird später aktiviert wenn Gerät verfügbar
    ...(FEATURES.HAUTANALYSE_ENABLED ? [{
        id: 'hautanalyse',
        title: "Hautanalyse",
        description: "Professionelle Hautdiagnose mit modernster Technologie.",
        icon: Camera,
        href: '/behandlungen/hautanalyse',
        isNew: true
    }] : []),
];

export default function Treatments() {
    return (
        <section id="treatments" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Behandlungen
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6" style={{ color: 'var(--color-primary)' }}>
                        Unsere <span style={{ color: 'var(--color-secondary)' }}>Expertise</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Modernste Technologien für Ihre Schönheit
                    </p>
                </div>

                {/* Simplified Treatments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {treatments.map((treatment) => {
                        const IconComponent = treatment.icon;
                        return (
                            <div
                                key={treatment.id}
                                className="group bg-gray-50 p-6 md:p-8 hover:bg-gray-100 transition-colors duration-300"
                            >
                                <div className="flex items-start gap-4 md:gap-6">
                                    {/* Icon */}
                                    <div className="flex-shrink-0">
                                        <IconComponent
                                            className="w-8 h-8 md:w-10 md:h-10"
                                            style={{ color: 'var(--color-secondary)' }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-lg md:text-xl font-light" style={{ color: 'var(--color-primary)' }}>
                                                {treatment.title}
                                            </h3>
                                            {treatment.isNew && (
                                                <span className="text-xs font-light tracking-widest uppercase px-2 py-1 bg-secondary text-white">
                                                    NEU
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-600 font-light text-sm md:text-base mb-4">
                                            {treatment.description}
                                        </p>

                                        <a
                                            href={treatment.href}
                                            className="text-xs font-light tracking-widest uppercase text-secondary hover:text-secondary-dark transition-colors inline-flex items-center gap-2"
                                        >
                                            Mehr erfahren
                                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 md:mt-16 text-center">
                    <a
                        href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
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