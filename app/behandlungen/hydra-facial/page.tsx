"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, Clock, Shield, Heart, X, Star, Sparkles, Users, Droplets, TrendingUp } from "lucide-react";
import { useState, useRef } from "react";

const vorteile = [
    {
        icon: Sparkles,
        title: "Sofortige Ergebnisse",
        description: "Sichtbare Verbesserung bereits nach der ersten Behandlung",
        stat: "95%",
        statLabel: "Zufriedenheit"
    },
    {
        icon: Droplets,
        title: "Intensive Hydration",
        description: "Bis zu 28 Tage lang verbesserte Hautfeuchtigkeit",
        stat: "+200%",
        statLabel: "Hydration"
    },
    {
        icon: Shield,
        title: "Keine Ausfallzeit",
        description: "Sofort gesellschaftsfähig nach der Behandlung",
        stat: "0",
        statLabel: "Tage Recovery"
    },
    {
        icon: Heart,
        title: "Für alle Hauttypen",
        description: "Sanft genug für empfindliche Haut, effektiv für alle Bedürfnisse",
        stat: "100%",
        statLabel: "Verträglich"
    }
];

const behandlungsablauf = [
    {
        step: "01",
        title: "Cleanse + Peel",
        description: "Sanfte Reinigung und Peeling öffnen die Poren für optimale Vorbereitung"
    },
    {
        step: "02",
        title: "Extract + Hydrate",
        description: "Schmerzlose Extraktion von Unreinheiten mit Antioxidantien-Infusion"
    },
    {
        step: "03",
        title: "Fuse + Protect",
        description: "Intensive Versorgung mit Peptiden und Hyaluronsäure"
    },
    {
        step: "04",
        title: "Booster Auswahl",
        description: "Individueller Booster für spezifische Hautbedürfnisse (optional)"
    },
    {
        step: "05",
        title: "LED-Therapie",
        description: "Abschließende LED-Behandlung für maximale Regeneration"
    }
];

const faq = [
    {
        frage: "Ist HydraFacial® schmerzhaft?",
        antwort: "Nein, HydraFacial® ist völlig schmerzfrei und entspannend. Viele Kunden empfinden die Behandlung als sehr angenehm."
    },
    {
        frage: "Wie oft sollte man HydraFacial® machen?",
        antwort: "Für optimale Ergebnisse empfehlen wir monatliche Behandlungen. Bei problematischer Haut anfangs alle 2 Wochen."
    },
    {
        frage: "Wann sehe ich erste Ergebnisse?",
        antwort: "Sofort nach der ersten Behandlung ist Ihre Haut strahlender und hydratisierter. Die Effekte halten 4-6 Wochen an."
    },
    {
        frage: "Kann ich nach der Behandlung Make-up tragen?",
        antwort: "Ja, Sie können sofort nach der Behandlung Make-up tragen. Ihre Haut wird sogar als bessere Basis fungieren."
    },
    {
        frage: "Für welche Hautprobleme ist HydraFacial® geeignet?",
        antwort: "HydraFacial® hilft bei fahler Haut, großen Poren, Mitessern, feinen Linien, Hyperpigmentierung und Dehydrierung."
    },
    {
        frage: "Was sind HydraFacial® Booster und wofür sind sie da?",
        antwort: "Booster sind spezialisierte Seren, die Ihre HydraFacial-Behandlung individualisieren. Vitamin C Brightening für strahlende Haut, Growth Factor für Anti-Aging, Clarifying für unreine Haut und Hydrating für intensive Feuchtigkeit. Sie werden gezielt auf Ihre Hautbedürfnisse abgestimmt."
    }
];

export default function HydraFacial() {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Pattern */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 opacity-5"
                >
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0, 169, 217, 0.3) 35px, rgba(0, 169, 217, 0.3) 70px)`
                    }} />
                </motion.div>

                <div className="container relative z-10 pt-20 md:pt-24">
                    <Link
                        href="/#treatments"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-6 md:mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Trust Badges */}
                            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current text-blue-500" />
                                    ))}
                                </div>
                                <span className="text-xs md:text-sm text-gray-600 font-light">
                                    Über 180 zufriedene Kunden
                                </span>
                            </div>

                            <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
                                <Droplets className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#00A9D9' }} />
                                <span className="text-xs md:text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                    Hydrating Treatment
                                </span>
                                <span className="text-xs font-light tracking-widest uppercase px-2 md:px-3 py-1"
                                    style={{
                                        backgroundColor: '#00A9D9',
                                        color: 'white'
                                    }}>
                                    ORIGINAL
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6" style={{ color: 'var(--color-primary)' }}>
                                <span style={{ color: '#00A9D9' }}>HydraFacial®</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 font-light mb-6 md:mb-8 leading-relaxed">
                                Die revolutionäre 3-in-1 Behandlung für sofort sichtbare Ergebnisse.
                                Tiefenreinigung, Extraktion und Hydration in nur einer Sitzung.
                            </p>

                            {/* Simplified Special Offer */}
                            <div className="mb-6 md:mb-8 p-4 bg-blue-50 border-l-4 border-blue-300">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">✨</span>
                                    <div>
                                        <h3 className="text-base font-light mb-1" style={{ color: 'var(--color-primary)' }}>
                                            Willkommen-Special
                                        </h3>
                                        <p className="text-sm text-gray-600 font-light">
                                            10% Rabatt auf Ihre erste Behandlung
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <a
                                    href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center justify-center text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto"
                                >
                                    Termin buchen
                                </a>
                                <a
                                    href="#preise"
                                    className="btn-secondary inline-flex items-center justify-center text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto"
                                >
                                    Preise ansehen
                                </a>
                            </div>
                        </motion.div>

                        {/* Right Content - Video/Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center"
                                    style={{
                                        backgroundImage: "url('/images/treatments/hydrafacial.jpg')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundColor: '#f5f5f5'
                                    }}
                                />
                                <div className="absolute -inset-4 border-2 border-blue-300 opacity-20" />
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2">
                                    <p className="text-sm font-light">Original Technologie</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-20 bg-black text-white">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {[
                            { number: "180+", label: "Zufriedene Kunden", icon: Users },
                            { number: "95%", label: "Sofort-Ergebnisse", icon: TrendingUp },
                            { number: "45-75", label: "Minuten Treatment", icon: Clock },
                            { number: "5★", label: "Bewertungen", icon: Star }
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="text-center"
                            >
                                <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 md:mb-4" style={{ color: '#00A9D9' }} />
                                <div className="text-2xl md:text-4xl font-light mb-1 md:mb-2">{stat.number}</div>
                                <div className="text-xs md:text-sm font-light text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vorteile Section */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Warum HydraFacial®
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Ihre <span style={{ color: '#00A9D9' }}>Vorteile</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                        {vorteile.map((vorteil) => (
                            <div
                                key={vorteil.title}
                                className="flex gap-4 md:gap-6 p-6 md:p-8 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div
                                    className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(0, 169, 217, 0.1)' }}
                                >
                                    <vorteil.icon
                                        className="w-6 h-6 md:w-8 md:h-8"
                                        style={{ color: '#00A9D9' }}
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg md:text-xl font-light" style={{ color: 'var(--color-primary)' }}>
                                            {vorteil.title}
                                        </h3>
                                        <div className="text-right">
                                            <div className="text-xl md:text-2xl font-light" style={{ color: '#00A9D9' }}>
                                                {vorteil.stat}
                                            </div>
                                            <div className="text-xs text-gray-500 font-light">
                                                {vorteil.statLabel}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 font-light text-sm md:text-base">
                                        {vorteil.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Behandlungsablauf */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            So läuft es ab
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Der <span style={{ color: '#00A9D9' }}>Behandlungsablauf</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {behandlungsablauf.map((schritt, index) => (
                            <motion.div
                                key={schritt.step}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex items-start gap-8 mb-12 last:mb-0"
                            >
                                <div
                                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-2xl font-light"
                                    style={{
                                        backgroundColor: '#00A9D9',
                                        color: 'white'
                                    }}
                                >
                                    {schritt.step}
                                </div>
                                <div className="flex-1 pt-2">
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        {schritt.title}
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        {schritt.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mt-16"
                    >
                        <a
                            href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center justify-center"
                        >
                            Jetzt HydraFacial® buchen
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Pricing */}
            <section id="preise" className="py-20 bg-gray-50">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Investition
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            HydraFacial® <span style={{ color: '#00A9D9' }}>Pakete</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* HydraFacial® Signature */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 border border-gray-200 bg-white hover:border-blue-300 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        HydraFacial® Signature
                                    </h3>
                                    <p className="text-sm text-gray-600 font-light">
                                        30 Minuten • Basis-Behandlung
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-light" style={{ color: '#00A9D9' }}>€ 169</div>
                                </div>
                            </div>
                            <p className="text-gray-600 font-light mb-6 leading-relaxed">
                                Sanfte, aber effektive Behandlung zur porentiefen Reinigung, Entfernung abgestorbener Hautzellen und Versorgung mit Feuchtigkeit.
                            </p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Cleanse + Peel
                                </li>
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Extract + Hydrate
                                </li>
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Fuse + Protect
                                </li>
                            </ul>
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-secondary text-center py-3"
                            >
                                Signature buchen
                            </a>
                        </motion.div>

                        {/* HydraFacial® Signature + LED */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-8 border border-gray-200 bg-white hover:border-blue-300 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        HydraFacial® Signature + LED
                                    </h3>
                                    <p className="text-sm text-gray-600 font-light">
                                        50 Minuten • Mit LED-Therapie
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-light" style={{ color: '#00A9D9' }}>€ 189</div>
                                </div>
                            </div>
                            <p className="text-gray-600 font-light mb-6 leading-relaxed">
                                Die klassische HydraFacial-Tiefenreinigung kombiniert mit beruhigendem Blaulicht – ideal bei unreiner, gestresster Haut.
                            </p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Alles aus Signature
                                </li>
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    LED-Lichttherapie
                                </li>
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Antibakteriell
                                </li>
                            </ul>
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-secondary text-center py-3"
                            >
                                Signature + LED buchen
                            </a>
                        </motion.div>

                        {/* HydraFacial® Deluxe */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-8 border border-blue-300 bg-blue-50 hover:border-blue-400 transition-colors"
                        >
                            <div className="text-center mb-4">
                                <span className="bg-blue-500 text-white px-3 py-1 text-xs font-light tracking-wider uppercase">
                                    Beliebt
                                </span>
                            </div>
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        HydraFacial® Deluxe
                                    </h3>
                                    <p className="text-sm text-gray-600 font-light">
                                        50 Minuten • Premium Experience
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-light" style={{ color: '#00A9D9' }}>€ 259</div>
                                </div>
                            </div>
                            <p className="text-gray-600 font-light mb-6 leading-relaxed">
                                Diese erweiterte HydraFacial-Behandlung kombiniert intensive Reinigung mit einer auf Ihre Hautbedürfnisse abgestimmten Wirkstoff-Infusion.
                            </p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Alles aus Signature
                                </li>
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Individuelle Wirkstoff-Infusion
                                </li>
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    LED-Lichttherapie
                                </li>
                            </ul>
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-primary text-center py-3"
                            >
                                Deluxe buchen
                            </a>
                        </motion.div>

                        {/* HydraFacial® Platinium */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="p-8 border border-gray-200 bg-white hover:border-blue-300 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        HydraFacial® Platinium
                                    </h3>
                                    <p className="text-sm text-gray-600 font-light">
                                        1 Stunde • Luxus-Experience
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-light" style={{ color: '#00A9D9' }}>€ 289</div>
                                </div>
                            </div>
                            <p className="text-gray-600 font-light mb-6 leading-relaxed">
                                Die exklusivste HydraFacial-Variante beginnt mit einer entspannenden Lymphdrainage zur Entgiftung und Förderung der Durchblutung.
                            </p>
                            <ul className="space-y-2 mb-8">
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Entspannende Lymphdrainage
                                </li>
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Alles aus Deluxe
                                </li>
                                <li className="flex items-center gap-2 text-gray-600 font-light">
                                    <Check className="w-4 h-4" style={{ color: '#00A9D9' }} />
                                    Maximale Regeneration
                                </li>
                            </ul>
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-secondary text-center py-3"
                            >
                                Platinium buchen
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Booster */}
            <section className="py-20 bg-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Individualisierung
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            HydraFacial® <span style={{ color: '#00A9D9' }}>Booster</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                name: "Vitamin C Brightening",
                                description: "Aufhellend und antioxidativ für strahlende Haut",
                                price: "+ € 25",
                                ideal: "Für müde, stumpfe Haut",
                                icon: Sparkles
                            },
                            {
                                name: "Growth Factor",
                                description: "Anti-Aging und regenerierend für reife Haut",
                                price: "+ € 35",
                                ideal: "Für reife Haut",
                                popular: true,
                                icon: Heart
                            },
                            {
                                name: "Clarifying",
                                description: "Klärend bei unreiner und fettiger Haut",
                                price: "+ € 30",
                                ideal: "Für ölige, unreine Haut",
                                icon: Shield
                            },
                            {
                                name: "Hydrating",
                                description: "Intensive Feuchtigkeitsversorgung",
                                price: "+ € 20",
                                ideal: "Für trockene Haut",
                                icon: Droplets
                            }
                        ].map((booster, index) => (
                            <motion.div
                                key={booster.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`p-8 border transition-colors ${booster.popular
                                    ? 'border-blue-300 bg-blue-50'
                                    : 'border-gray-100 hover:border-blue-300'
                                    }`}
                            >
                                {booster.popular && (
                                    <div className="text-center mb-4">
                                        <span className="bg-blue-500 text-white px-3 py-1 text-xs font-light tracking-wider uppercase">
                                            Beliebt
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                            {booster.name}
                                        </h3>
                                        <p className="text-gray-600 font-light mb-4">
                                            {booster.description}
                                        </p>
                                    </div>
                                    <div
                                        className="w-12 h-12 flex-shrink-0 flex items-center justify-center ml-4"
                                        style={{ backgroundColor: 'rgba(0, 169, 217, 0.1)' }}
                                    >
                                        <booster.icon
                                            className="w-6 h-6"
                                            style={{ color: '#00A9D9' }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-light" style={{ color: '#00A9D9' }}>
                                        {booster.price}
                                    </span>
                                    <span className="text-xs font-light text-gray-500 uppercase tracking-wider">
                                        Optional
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Häufige Fragen
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            FAQ zu <span style={{ color: '#00A9D9' }}>HydraFacial®</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {faq.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="p-6 border border-gray-100 hover:border-blue-300 transition-colors"
                            >
                                <h3 className="text-lg font-light mb-3" style={{ color: 'var(--color-primary)' }}>
                                    {item.frage}
                                </h3>
                                <p className="text-gray-600 font-light leading-relaxed">
                                    {item.antwort}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {isVideoModalOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    <div className="relative max-w-4xl w-full aspect-video bg-black">
                        <button
                            onClick={() => setIsVideoModalOpen(false)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="w-full h-full flex items-center justify-center text-white">
                            <p className="text-xl font-light">HydraFacial® Video wird geladen...</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
} 