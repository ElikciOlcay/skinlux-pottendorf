"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Check, Clock, Shield, Heart, Star, TrendingUp, Users, Award } from "lucide-react";
import { useRef } from "react";

export default function LaserHaarentfernung() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const vorteile = [
        {
            icon: Zap,
            title: "Modernste Technologie",
            description: "Diodenlaser der neuesten Generation für optimale Ergebnisse",
            stat: "99%",
            statLabel: "Zufriedenheit"
        },
        {
            icon: Shield,
            title: "Sicher & Schmerzarm",
            description: "FDA-zertifizierte Technologie mit integriertem Kühlsystem",
            stat: "100%",
            statLabel: "Sicherheit"
        },
        {
            icon: Clock,
            title: "Zeitsparend",
            description: "Schnelle Behandlung mit langanhaltenden Ergebnissen",
            stat: "6-8",
            statLabel: "Sitzungen"
        },
        {
            icon: Heart,
            title: "Für alle Hauttypen",
            description: "Geeignet für alle Hauttypen und Hauttöne",
            stat: "Alle",
            statLabel: "Hauttypen"
        }
    ];

    const ablauf = [
        {
            step: "01",
            title: "Beratung & Analyse",
            description: "Kostenlose Erstberatung und professionelle Hautanalyse"
        },
        {
            step: "02",
            title: "Behandlungsplan",
            description: "Individueller Behandlungsplan für optimale Ergebnisse"
        },
        {
            step: "03",
            title: "Hautvorbereitung",
            description: "Professionelle Vorbereitung der Haut für die Behandlung"
        },
        {
            step: "04",
            title: "Laserbehandlung",
            description: "Schmerzarme Laserbehandlung mit modernster Diodentechnologie"
        },
        {
            step: "05",
            title: "Nachsorge",
            description: "Nachsorge und individuelle Pflegetipps für optimale Ergebnisse"
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
                                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" style={{ color: 'var(--color-secondary)' }} />
                                    ))}
                                </div>
                                <span className="text-xs md:text-sm text-gray-600 font-light">
                                    Über 2000 zufriedene Kunden
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 md:mb-8 leading-tight" style={{ color: 'var(--color-primary)' }}>
                                Dauerhafte<br />
                                <span style={{ color: 'var(--color-secondary)' }}>Haarfreiheit</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 font-light mb-6 md:mb-8 leading-relaxed">
                                Modernste Diodenlaser-Technologie für effektive und schmerzarme
                                Haarentfernung. Erleben Sie glatte Haut ohne tägliches Rasieren.
                            </p>

                            {/* Quick Benefits */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
                                {[
                                    { icon: Check, text: "FDA-zertifiziert" },
                                    { icon: Check, text: "Alle Hauttypen" },
                                    { icon: Check, text: "Schmerzarm" }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                                        className="flex items-center gap-2"
                                    >
                                        <item.icon className="w-3 h-3 md:w-4 md:h-4" style={{ color: 'var(--color-secondary)' }} />
                                        <span className="text-xs md:text-sm text-gray-700 font-light">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                <a
                                    href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center justify-center text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto"
                                >
                                    Kostenlose Probebehandlung
                                </a>
                                <Link
                                    href="/preise/laser"
                                    className="btn-secondary inline-flex items-center justify-center text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto"
                                >
                                    Preise ansehen
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Content - Video */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-xl shadow-lg">
                                <video
                                    src="/videos/laser-hero.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                    poster="/images/gallery/treatment-laser.jpg"
                                />
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
                            { number: "2000+", label: "Zufriedene Kunden", icon: Users },
                            { number: "99%", label: "Erfolgsquote", icon: TrendingUp },
                            { number: "6-8", label: "Behandlungen", icon: Zap },
                            { number: "5★", label: "Bewertungen", icon: Star }
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
                            Warum Skinlux
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Ihre <span style={{ color: 'var(--color-secondary)' }}>Vorteile</span>
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
                            Jetzt Erstberatung buchen
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Pricing */}
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
                            Investition
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Beliebte <span style={{ color: 'var(--color-secondary)' }}>Zonen</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 border border-secondary bg-secondary/5"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        Damen Beine komplett
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        Einzelbehandlung - Ober- und Unterschenkel
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                        € 180
                                    </div>
                                    <div className="text-sm text-gray-500 font-light">
                                        1 Std.
                                    </div>
                                </div>
                            </div>
                            <div className="bg-secondary/10 p-3 border border-secondary/20">
                                <p className="text-sm font-light text-gray-700">
                                    <strong>Beliebt:</strong> Komplette Behandlung für glatte Beine
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-8 border border-gray-200 bg-white"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        Herren Rücken komplett
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        Einzelbehandlung - kompletter Rücken
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                        € 95
                                    </div>
                                    <div className="text-sm text-gray-500 font-light">
                                        45 Min.
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="p-8 border border-gray-200 bg-white"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        Damen Bikini Zone
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        Einzelbehandlung - klassischer Bikinibereich
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                        € 60
                                    </div>
                                    <div className="text-sm text-gray-500 font-light">
                                        20 Min.
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="p-8 border border-gray-200 bg-white"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        Damen Achseln
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        Einzelbehandlung - beide Achseln
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                        € 55
                                    </div>
                                    <div className="text-sm text-gray-500 font-light">
                                        30 Min.
                                    </div>
                                </div>
                            </div>
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
                            Hinweise
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="font-light mb-2" style={{ color: 'var(--color-secondary)' }}>
                                    Kostenloses Erstgespräch
                                </p>
                                <p className="text-sm font-light text-gray-600">
                                    Inklusive Probebehandlung und Behandlungsplan
                                </p>
                            </div>
                            <div>
                                <p className="font-light mb-2" style={{ color: 'var(--color-secondary)' }}>
                                    Vollständige Preisliste
                                </p>
                                <p className="text-sm font-light text-gray-600">
                                    Alle Körperzonen und Pakete in der Preisübersicht
                                </p>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <Link
                                href="/preise/laser"
                                className="btn-secondary inline-flex items-center justify-center"
                            >
                                Alle Preise ansehen
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                            Häufige <span style={{ color: 'var(--color-secondary)' }}>Fragen</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            {
                                frage: "Wie viele Behandlungen sind notwendig?",
                                antwort: "In der Regel sind 6-8 Behandlungen im Abstand von 4-6 Wochen notwendig, um optimale Ergebnisse zu erzielen."
                            },
                            {
                                frage: "Ist die Behandlung schmerzhaft?",
                                antwort: "Dank unseres integrierten Kühlsystems ist die Behandlung nahezu schmerzfrei. Die meisten Kunden beschreiben es als leichtes Kribbeln."
                            },
                            {
                                frage: "Für welche Körperbereiche ist die Behandlung geeignet?",
                                antwort: "Die Laser-Haarentfernung kann an fast allen Körperstellen durchgeführt werden, einschließlich Gesicht, Achseln, Bikinizone, Beine und Rücken."
                            },
                            {
                                frage: "Wie lange hält das Ergebnis?",
                                antwort: "Nach Abschluss der Behandlungsserie können Sie sich über Jahre hinweg über glatte Haut freuen. Gelegentliche Auffrischungen können notwendig sein."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-8 border border-gray-200"
                            >
                                <h3 className="text-lg font-light mb-3" style={{ color: 'var(--color-primary)' }}>
                                    {item.frage}
                                </h3>
                                <p className="text-gray-600 font-light">
                                    {item.antwort}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-32 bg-gradient-to-b from-white to-gray-50">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-black text-white p-12 md:p-16 relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-secondary) 0%, transparent 50%),
                                                     radial-gradient(circle at 80% 80%, var(--color-secondary) 0%, transparent 50%)`
                                }} />
                            </div>

                            <div className="relative z-10 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="mb-8"
                                >
                                    <Award className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--color-secondary)' }} />
                                    <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: '#fff' }}>
                                        Starten Sie Ihre Reise zu<br />
                                        <span style={{ color: 'var(--color-secondary)' }}>dauerhafter Haarfreiheit</span>
                                    </h2>
                                    <p className="text-xl font-light text-gray-300 max-w-2xl mx-auto mb-8">
                                        Schließen Sie sich über 2000 zufriedenen Kunden an und
                                        erleben Sie die Freiheit glatter Haut.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="space-y-4"
                                >
                                    <a
                                        href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-12 py-4 bg-white text-black text-lg font-light hover:bg-gray-100 transition-colors"
                                    >
                                        Jetzt Termin sichern
                                    </a>
                                    <p className="text-sm font-light text-gray-400">
                                        Keine versteckten Kosten • Unverbindliche Beratung
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
} 