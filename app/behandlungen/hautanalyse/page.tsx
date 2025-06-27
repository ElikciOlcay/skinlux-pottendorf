"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Microscope, Monitor, CheckCircle, Clock, Award, ArrowRight, Eye, ArrowLeft } from "lucide-react";

const analysevorteile = [
    {
        icon: Camera,
        title: "HD-Hautanalyse",
        description: "Modernste Kameratechnologie erfasst jedes Detail Ihrer Haut in höchster Auflösung für präzise Diagnosen.",
        stat: "4K",
        statLabel: "Auflösung"
    },
    {
        icon: Microscope,
        title: "Tiefenanalyse",
        description: "Professionelle Geräte analysieren Hautschichten, Poren, Pigmentierung und Feuchtigkeit wissenschaftlich genau.",
        stat: "7",
        statLabel: "Parameter"
    },
    {
        icon: Monitor,
        title: "Digitale Auswertung",
        description: "Sofortige computergestützte Analyse mit detailliertem Bericht und visueller Darstellung Ihrer Hautsituation.",
        stat: "100%",
        statLabel: "Digital"
    },
    {
        icon: Eye,
        title: "Expertenberatung",
        description: "Persönliche Beratung durch unsere Hautexperten mit individuellen Behandlungsempfehlungen.",
        stat: "15+",
        statLabel: "Jahre Erfahrung"
    }
];

const analyseparameter = [
    {
        name: "Hautfeuchtigkeit",
        description: "Messung des Hydratationslevels in verschiedenen Gesichtszonen"
    },
    {
        name: "Poren & Textur",
        description: "Analyse der Porengröße und Oberflächenstruktur"
    },
    {
        name: "Pigmentierung",
        description: "Erkennung von Pigmentflecken und Hyperpigmentierung"
    },
    {
        name: "Elastizität",
        description: "Bewertung der Hautspannung und Elastizität"
    },
    {
        name: "Rötungen",
        description: "Identifikation von Entzündungen und Irritationen"
    },
    {
        name: "UV-Schäden",
        description: "Analyse von Sonnenschäden und Photoaging"
    },
    {
        name: "Falten & Linien",
        description: "Dokumentation feiner Linien und Faltentiefe"
    }
];

const ablauf = [
    {
        step: "1",
        title: "Vorbereitung",
        description: "Gründliche Reinigung der Haut und Vorbereitung für die Analyse in entspannter Atmosphäre."
    },
    {
        step: "2",
        title: "HD-Aufnahmen",
        description: "Professionelle Hautbilder aus verschiedenen Winkeln mit spezieller UV- und Standardbeleuchtung."
    },
    {
        step: "3",
        title: "Digitale Analyse",
        description: "Computergestützte Auswertung aller Parameter mit sofortiger visueller Darstellung der Ergebnisse."
    },
    {
        step: "4",
        title: "Beratungsgespräch",
        description: "Ausführliche Besprechung der Ergebnisse mit individuellen Behandlungsempfehlungen."
    },
    {
        step: "5",
        title: "Behandlungsplan",
        description: "Erstellung eines maßgeschneiderten Pflegeplans mit zeitlicher Planung und Zielsetzung."
    }
];

export default function Hautanalyse() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container">
                    <Link
                        href="/#treatments"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-6 md:mb-8"
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
                            {/* Badge */}
                            <div className="flex items-center gap-6 mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10">
                                    <Camera className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                    <span className="text-sm font-light tracking-wider uppercase" style={{ color: 'var(--color-secondary)' }}>
                                        Professionelle Analyse
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600 font-light">
                                    Wissenschaftlich fundiert
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight" style={{ color: 'var(--color-primary)' }}>
                                Haut<br />
                                <span style={{ color: 'var(--color-secondary)' }}>Analyse</span>
                            </h1>

                            <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed">
                                Professionelle Hautanalyse mit modernster Technologie. Erfahren Sie alles über
                                Ihren Hauttyp und erhalten Sie individuelle Behandlungsempfehlungen.
                            </p>

                            {/* Quick Benefits */}
                            <div className="grid grid-cols-3 gap-4 mb-10">
                                {[
                                    { icon: CheckCircle, text: "Schmerzfrei" },
                                    { icon: CheckCircle, text: "30 Minuten" },
                                    { icon: CheckCircle, text: "Sofortergebnis" }
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
                                    href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Hautanalyse buchen
                                </a>
                                <a
                                    href="#preise"
                                    className="btn-secondary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Preise ansehen
                                </a>
                            </div>

                            {/* Professional Badge */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="mt-6 text-sm text-gray-600 font-light"
                            >
                                <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-2"></span>
                                Medizinische Hautanalyse-Technologie
                            </motion.p>
                        </motion.div>

                        {/* Right Content - Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: "url('/images/treatments/hautanalyse.jpg')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundColor: '#f5f5f5'
                                    }}
                                />
                                <div className="absolute -inset-4 border-2 border-secondary opacity-20" />
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2">
                                    <p className="text-sm font-light">HD-Technologie</p>
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
                            { number: "7", label: "Analyseparameter", icon: Microscope },
                            { number: "30", label: "Minuten Dauer", icon: Clock },
                            { number: "4K", label: "HD-Auflösung", icon: Camera },
                            { number: "100%", label: "Wissenschaftlich", icon: Award }
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
                            Warum Hautanalyse
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Ihre <span style={{ color: 'var(--color-secondary)' }}>Vorteile</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {analysevorteile.map((vorteil, index) => (
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

            {/* Analyseparameter */}
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
                            Was wir analysieren
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Analyse<span style={{ color: 'var(--color-secondary)' }}>parameter</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {analyseparameter.map((parameter, index) => (
                            <motion.div
                                key={parameter.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-6 border border-gray-100 hover:border-secondary/30 transition-colors group"
                            >
                                <h3 className="text-lg font-light mb-3" style={{ color: 'var(--color-primary)' }}>
                                    {parameter.name}
                                </h3>
                                <p className="text-gray-600 font-light text-sm">
                                    {parameter.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Behandlungsablauf */}
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
                            So läuft es ab
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Der <span style={{ color: 'var(--color-secondary)' }}>Ablauf</span>
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
                            Hautanalyse <span style={{ color: 'var(--color-secondary)' }}>Preise</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 border border-gray-200 hover:border-secondary/30 transition-colors"
                        >
                            <div className="text-center">
                                <h3 className="text-2xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                                    Professionelle Hautanalyse
                                </h3>
                                <div className="text-5xl font-light mb-4" style={{ color: 'var(--color-secondary)' }}>
                                    €49
                                </div>
                                <p className="text-gray-600 font-light mb-6">
                                    Komplette Analyse mit Beratung
                                </p>

                                <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
                                    {[
                                        "HD-Hautaufnahmen",
                                        "7 Analyseparameter",
                                        "Digitaler Hautreport",
                                        "Persönliche Beratung",
                                        "Behandlungsempfehlungen",
                                        "Pflegeplan"
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                            <span className="text-sm font-light text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center justify-center w-full"
                                >
                                    Hautanalyse buchen
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Info Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <p className="text-gray-600 font-light max-w-2xl mx-auto">
                            <strong>Kostenlose Hautanalyse</strong> bei Buchung einer anschließenden Behandlung oder Produkten im Wert von mindestens €150.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-black text-white">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'white' }}>
                            Bereit für Ihre <span style={{ color: 'var(--color-secondary)' }}>Hautanalyse</span>?
                        </h2>
                        <p className="text-xl text-gray-300 font-light mb-10 leading-relaxed">
                            Entdecken Sie die Geheimnisse Ihrer Haut und erhalten Sie einen
                            maßgeschneiderten Behandlungsplan für optimale Hautgesundheit.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center justify-center text-lg px-8 py-4"
                            >
                                Jetzt Termin buchen
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                            <a
                                href="tel:+436605721403"
                                className="btn-secondary-inverted inline-flex items-center justify-center text-lg px-8 py-4"
                            >
                                Telefonische Beratung
                            </a>
                        </div>

                        <div className="mt-8 text-sm text-gray-400 font-light">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Termine innerhalb von 48 Stunden verfügbar
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
} 