"use client";

import { motion } from "framer-motion";
import {
    Zap,
    Droplets,
    Sparkles,
    ArrowRight,
    Camera
} from "lucide-react";

const treatments = [
    {
        id: 'laser',
        category: 'Laser',
        title: "Laser Haarentfernung",
        description: "Modernste Technologie für dauerhafte Haarentfernung. Sanft, effektiv und für alle Hauttypen geeignet.",
        icon: Zap,
        features: ["Dauerhaft", "Schmerzarm", "FDA-zertifiziert"],
        image: "/images/treatments/laser-hair-removal.jpg",
    },
    {
        id: 'hydra-facial',
        category: 'Facial',
        title: "HydraFacial®",
        description: "3-in-1 Premium Behandlung für sofort sichtbare Ergebnisse. Reinigung, Peeling und Hydration.",
        icon: Droplets,
        features: ["Tiefenreinigung", "Hydration", "Sofort-Glow"],
        isNew: true,
        image: "/images/treatments/hydra-facial.jpg",
    },
    {
        id: 'circadia',
        category: 'Facial',
        title: "Klassische Gesichtsbehandlung",
        description: "Luxuriöse Behandlung mit hochwertigen Circadia-Produkten für regenerierte Haut.",
        icon: Sparkles,
        features: ["Individuell", "Entspannend", "Regeneration"],
        image: "/images/treatments/circadia.jpg",
    },
    {
        id: 'microneedling',
        category: 'Facial',
        title: "Microneedling",
        description: "Innovative Behandlung zur Kollagenproduktion für feinere Poren und straffere Haut.",
        icon: Sparkles,
        features: ["Kollagen-Boost", "Anti-Aging", "Narbenreduktion"],
        isNew: true,
        image: "/images/treatments/microneedling.jpg",
    },
    {
        id: 'hautanalyse',
        category: 'Analyse',
        title: "Hautanalyse",
        description: "Professionelle Hautdiagnose mit modernster Technologie für Ihre perfekte Behandlung.",
        icon: Camera,
        features: ["HD-Aufnahmen", "7 Parameter", "Behandlungsplan"],
        isNew: true,
        image: "/images/treatments/skin-analysis.jpg",
    },
];

export default function Treatments() {
    return (
        <section id="treatments" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Behandlungen
                    </span>
                    <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                        Unsere <span style={{ color: 'var(--color-secondary)' }}>Expertise</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                        Modernste Technologien und bewährte Methoden für Ihre Schönheit
                    </p>
                </motion.div>

                {/* Treatments Grid */}
                <div className="grid lg:grid-cols-3 gap-1">
                    {treatments.map((treatment, index) => {
                        const IconComponent = treatment.icon;
                        return (
                            <motion.div
                                key={treatment.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className={`group relative overflow-hidden ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                                    }`}
                            >
                                <div className="relative h-full min-h-[400px] lg:min-h-[500px] bg-gray-50 p-8 lg:p-12 flex flex-col">
                                    {/* Background Image with Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                                        style={{
                                            backgroundImage: `url('${treatment.image}')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Category & New Badge */}
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-xs font-light tracking-widest uppercase text-gray-500">
                                                {treatment.category}
                                            </span>
                                            {treatment.isNew && (
                                                <span className="text-xs font-light tracking-widest uppercase px-3 py-1"
                                                    style={{
                                                        backgroundColor: 'var(--color-secondary)',
                                                        color: 'white'
                                                    }}>
                                                    NEU
                                                </span>
                                            )}
                                        </div>

                                        {/* Icon */}
                                        <div className="mb-6">
                                            <IconComponent
                                                className={`${index === 0 ? 'w-12 h-12' : 'w-8 h-8'}`}
                                                style={{ color: 'var(--color-primary)' }}
                                            />
                                        </div>

                                        {/* Title */}
                                        <h3 className={`font-light mb-4 ${index === 0 ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'
                                            }`} style={{ color: 'var(--color-primary)' }}>
                                            {treatment.title}
                                        </h3>

                                        {/* Description */}
                                        <p className={`text-gray-600 font-light mb-6 ${index === 0 ? 'text-lg leading-relaxed' : 'text-base'
                                            }`}>
                                            {treatment.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-auto">
                                            {treatment.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="text-xs font-light px-3 py-1 border border-gray-300 text-gray-600"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-8">
                                            <a
                                                href={
                                                    treatment.category === 'Laser' ? '/preise/laser' :
                                                        treatment.id === 'microneedling' ? '/behandlungen/microneedling' :
                                                            treatment.id === 'circadia' ? '/behandlungen/signature-facials' :
                                                                treatment.id === 'hautanalyse' ? '/behandlungen/hautanalyse' :
                                                                    '/behandlungen/hydra-facial'
                                                }
                                                className="text-xs font-light tracking-widest uppercase text-secondary hover:text-secondary-dark transition-colors group inline-flex items-center gap-2"
                                            >
                                                {treatment.id === 'hautanalyse' ? 'Mehr erfahren' : 'Preise ansehen'}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Hover Border */}
                                    <div
                                        className="absolute inset-x-0 bottom-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                                        style={{ backgroundColor: 'var(--color-secondary)' }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-4">
                        <span className="text-lg font-light text-gray-600">
                            Haben Sie Fragen zu unseren Behandlungen?
                        </span>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-light tracking-widest uppercase transition-all hover:bg-gray-900"
                        >
                            Beratung buchen
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 