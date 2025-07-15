"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Heart, Check, Clock, Shield, Star, Award } from "lucide-react";
import { useRef } from "react";
import { FEATURES } from "@/lib/features";

export default function PremiumFacials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const vorteile = [
        {
            icon: Sparkles,
            title: "Circadia Professional",
            description: "Exklusive Kosmetik-Linie mit wissenschaftlich bewährten Wirkstoffen",
            stat: "100%",
            statLabel: "Premium Qualität"
        },
        {
            icon: Heart,
            title: "Individuelle Erfahrung",
            description: "Jede Behandlung ist ein einzigartiges Erlebnis für Ihre Haut",
            stat: "100%",
            statLabel: "Individuell"
        },
        {
            icon: Clock,
            title: "Premium Zeit",
            description: "90 Minuten pure Entspannung und intensive Hautrevitalisierung",
            stat: "1:30",
            statLabel: "Stunden"
        },
        {
            icon: Shield,
            title: "Bewährte Ergebnisse",
            description: "Bewährte Methoden für sichtbare und langanhaltende Ergebnisse",
            stat: "98%",
            statLabel: "Zufriedenheit"
        }
    ];

    const ablauf = [
        // Hautanalyse temporär ausgeblendet - wird später aktiviert wenn Gerät verfügbar
        ...(FEATURES.HAUTANALYSE_ENABLED ? [{
            step: "01",
            title: "Hautanalyse",
            description: "Detaillierte Hautanalyse und Auswahl der passenden Circadia-Produkte"
        }] : []),
        {
            step: FEATURES.HAUTANALYSE_ENABLED ? "02" : "01",
            title: "Reinigung",
            description: "Professionelle Hautreinigung mit speziellen Circadia-Reinigungsprodukten"
        },
        {
            step: FEATURES.HAUTANALYSE_ENABLED ? "03" : "02",
            title: "Peeling",
            description: "Sanftes Enzym-Peeling oder Gel-Peeling für optimale Hautpflege"
        },
        {
            step: FEATURES.HAUTANALYSE_ENABLED ? "04" : "03",
            title: "Ausreinigung",
            description: "Manuelle Ausreinigung und Behandlung problematischer Hautpartien"
        },
        {
            step: FEATURES.HAUTANALYSE_ENABLED ? "05" : "04",
            title: "Massage & Maske",
            description: "Entspannende Gesichtsmassage und individuell abgestimmte Maske"
        },
        {
            step: FEATURES.HAUTANALYSE_ENABLED ? "06" : "05",
            title: "Abschlusspflege",
            description: "Finale Pflege mit hochwertigen Circadia-Produkten für langanhaltende Ergebnisse"
        }
    ];

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
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(240, 163, 188, 0.3) 35px, rgba(240, 163, 188, 0.3) 70px)`
                    }} />
                </motion.div>

                <div className="container relative z-10 pt-24">
                    <Link
                        href="/#treatments"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-6 mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2">
                                    <Sparkles className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                    <span className="text-sm font-light tracking-wider uppercase text-gray-600">
                                        Exklusive Kollektion
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600 font-light">
                                    Circadia Professional
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight" style={{ color: 'var(--color-primary)' }}>
                                Premium<br />
                                <span style={{ color: 'var(--color-secondary)' }}>Facials</span>
                            </h1>

                            <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed">
                                Erleben Sie unsere exklusiven Premium Treatments.
                                Jede Behandlung ist ein maßgeschneidertes 90-Minuten Erlebnis für Ihre Haut.
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-10">
                                {[
                                    { icon: Check, text: "90 Minuten" },
                                    { icon: Check, text: "Individuell" },
                                    { icon: Check, text: "Luxuriös" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <item.icon className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                        <span className="text-sm text-gray-700 font-light">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Termin buchen
                                </a>
                                <a
                                    href="#preise"
                                    className="btn-secondary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Preise ansehen
                                </a>
                            </div>

                            {/* Exclusive Badge */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="mt-6 text-sm text-gray-600 font-light"
                            >
                                <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-2"></span>
                                Exklusive Circadia Professional Treatments
                            </motion.p>
                        </motion.div>

                        {/* Right Content - Video */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-xl shadow-lg">
                                <video
                                    src="/videos/signature-hero.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                    poster="/images/treatments/signature-facials.jpg"
                                />
                                <div className="absolute -inset-4 border-2 border-secondary opacity-20 rounded-xl" />
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                                    <p className="text-sm font-light">Premium Kollektion</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-black text-white">
                <div className="container">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { number: "3", label: "Premium Behandlungen", icon: Heart },
                            { number: "90", label: "Minuten Luxus", icon: Clock },
                            { number: "5★", label: "Premium Service", icon: Award },
                            { number: "100%", label: "Individuell", icon: Star }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-4" style={{ color: 'var(--color-secondary)' }} />
                                <div className="text-4xl font-light mb-2">{stat.number}</div>
                                <div className="text-sm font-light text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vorteile */}
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
                            Warum Premium
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Der <span style={{ color: 'var(--color-secondary)' }}>Unterschied</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {vorteile.map((vorteil, index) => (
                            <motion.div
                                key={vorteil.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex gap-6 p-8 border border-gray-100 hover:border-secondary/30 transition-colors group"
                            >
                                <div
                                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(240, 163, 188, 0.1)' }}
                                >
                                    <vorteil.icon
                                        className="w-8 h-8"
                                        style={{ color: 'var(--color-secondary)' }}
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-light" style={{ color: 'var(--color-primary)' }}>
                                            {vorteil.title}
                                        </h3>
                                        <div className="text-right">
                                            <div className="text-2xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                                {vorteil.stat}
                                            </div>
                                            <div className="text-xs text-gray-500 font-light">
                                                {vorteil.statLabel}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 font-light">
                                        {vorteil.description}
                                    </p>
                                </div>
                            </motion.div>
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
                            Der <span style={{ color: 'var(--color-secondary)' }}>Behandlungsablauf</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {ablauf.map((schritt, index) => (
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
                                        backgroundColor: 'var(--color-secondary)',
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
                </div>
            </section>

            {/* Pricing */}
            <section id="preise" className="py-20 bg-white">
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
                            Premium <span style={{ color: 'var(--color-secondary)' }}>Preise</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-6 border border-gray-200 bg-white hover:border-secondary/30 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        Circadia Customized Facial
                                    </h3>
                                    <p className="text-sm text-gray-600 font-light mb-2">
                                        1 Std. 30 Min.
                                    </p>
                                    <p className="text-gray-600 font-light">
                                        Hier stimmen wir das vorbereitende Peeling sowie die Auswahl der Wirkstoffe individuell auf deine Haut ab. Ein individueller Mixology Prozess für deine Hautbedürfnisse.
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                        € 150
                                    </div>
                                </div>
                            </div>
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-secondary text-center py-3"
                            >
                                Jetzt buchen
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-6 border border-secondary bg-secondary/5 relative"
                        >
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <span className="bg-secondary text-white px-3 py-1 text-xs font-light tracking-wider uppercase rounded">
                                    Beliebt
                                </span>
                            </div>
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        Firming Peptide Mask Treatment
                                    </h3>
                                    <p className="text-sm text-gray-600 font-light mb-2">
                                        1 Std. 30 Min.
                                    </p>
                                    <p className="text-gray-600 font-light">
                                        erneuert und revitalisiert die Haut mit Anti-Aging-Peptiden, Stammzellen und einer straffenden Maske für sichtbar festere und jugendlichere Haut.
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                        € 175
                                    </div>
                                </div>
                            </div>
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-primary text-center py-3"
                            >
                                Jetzt buchen
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-6 border border-gray-200 bg-white hover:border-secondary/30 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        Oxygen RX Facial mit Cocoa-Enzyme
                                    </h3>
                                    <p className="text-sm text-gray-600 font-light mb-2">
                                        1 Std. 30 Min.
                                    </p>
                                    <p className="text-gray-600 font-light">
                                        Spezialbehandlung für Akne, Rosacea. Reduziert Rötungen, beruhigt die Haut und fördert die Heilung – für einen ausgeglichenen, klaren Teint.
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                        € 175
                                    </div>
                                </div>
                            </div>
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-secondary text-center py-3"
                            >
                                Jetzt buchen
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="max-w-4xl mx-auto mt-12 p-8 bg-gray-50 border border-gray-200"
                    >
                        <h3 className="text-lg font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                            Paket-Angebote
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="font-light mb-2" style={{ color: 'var(--color-secondary)' }}>
                                    3er Paket: 5% Rabatt
                                </p>
                                <p className="text-sm font-light text-gray-600">
                                    Bei Buchung von 3 Behandlungen
                                </p>
                            </div>
                            <div>
                                <p className="font-light mb-2" style={{ color: 'var(--color-secondary)' }}>
                                    5er Paket: 10% Rabatt
                                </p>
                                <p className="text-sm font-light text-gray-600">
                                    Bei Buchung von 5 Behandlungen
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* Final CTA */}
            <section className="py-20 bg-black text-white text-center">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Award className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--color-secondary)' }} />
                        <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">
                            Erleben Sie den Premium Unterschied
                        </h2>
                        <p className="text-lg font-light text-gray-400 mb-8 max-w-2xl mx-auto">
                            Professionelle Expertise in <span style={{ color: 'var(--color-secondary)' }}>exklusiven Gesichtsbehandlungen</span> mit Circadia Professional.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center justify-center"
                            >
                                <span style={{ color: 'var(--color-secondary)' }}>Exklusive</span> Beratung buchen
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
} 