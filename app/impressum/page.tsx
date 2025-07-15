"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Mail, Scale, Shield, Globe } from 'lucide-react';
import { useRef } from 'react';

export default function ImpressumPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section ref={containerRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
                {/* Background Pattern */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 opacity-5"
                >
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(26, 26, 26, 0.1) 35px, rgba(26, 26, 26, 0.1) 70px)`
                    }} />
                </motion.div>

                <div className="container relative z-10 pt-20 md:pt-24">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-6 md:mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
                            <Scale className="w-4 h-4 md:w-5 md:h-5" style={{ color: 'var(--color-secondary)' }} />
                            <span className="text-xs md:text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                Rechtliche Informationen
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6" style={{ color: 'var(--color-primary)' }}>
                            Impressum
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl px-4">
                            Informationspflicht laut §5 E-Commerce Gesetz, §14 Unternehmensgesetzbuch,
                            §63 Gewerbeordnung und Offenlegungspflicht laut §25 Mediengesetz.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 md:py-32 lg:py-40 xl:py-48">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid gap-12 md:gap-16">

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="card"
                            >
                                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-light mb-6 md:mb-8" style={{ color: 'var(--color-primary)' }}>
                                            Kontaktdaten
                                        </h2>

                                        <div className="space-y-4 md:space-y-6">
                                            <div className="flex items-start gap-3 md:gap-4">
                                                <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-1" style={{ color: 'var(--color-secondary)' }} />
                                                <div className="font-light text-gray-600 text-sm md:text-base">
                                                    <p className="font-medium text-black mb-1">Skinlux</p>
                                                    <p>Gökce Elikci</p>
                                                    <p>Dr. Heinz-Fischer-Straße 3/2</p>
                                                    <p>2486 Pottendorf</p>
                                                    <p>Österreich</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 md:gap-4">
                                                <Phone className="w-4 h-4 md:w-5 md:h-5" style={{ color: 'var(--color-secondary)' }} />
                                                <a href="tel:+436649188632" className="font-light text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                                                    +43 664 91 88 632
                                                </a>
                                            </div>

                                            <div className="flex items-center gap-3 md:gap-4">
                                                <Mail className="w-4 h-4 md:w-5 md:h-5" style={{ color: 'var(--color-secondary)' }} />
                                                <a href="mailto:hey@skinlux.at" className="font-light text-gray-600 hover:text-black transition-colors text-sm md:text-base">
                                                    hey@skinlux.at
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg md:text-xl font-light mb-4 md:mb-6" style={{ color: 'var(--color-primary)' }}>
                                            Unternehmensdaten
                                        </h3>
                                        <div className="space-y-2 md:space-y-3 font-light text-gray-600 text-sm md:text-base">
                                            <p><strong className="text-black">Unternehmensgegenstand:</strong> Kosmetik (Laserhaarentfernung)</p>
                                            <p><strong className="text-black">UID-Nr:</strong> ATU 67694907</p>
                                            <p><strong className="text-black">Mitglied bei:</strong> WKO, Landesinnung, etc.</p>
                                            <p><strong className="text-black">Berufsbezeichnung:</strong> Spezialist für dauerhafte Haarentfernung</p>
                                            <p><strong className="text-black">Verleihungsstaat:</strong> Österreich</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Legal Sections */}
                            {[
                                {
                                    icon: Globe,
                                    title: "EU-Streitschlichtung",
                                    content: (
                                        <>
                                            <p className="mb-4">
                                                Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung)
                                                möchten wir Sie über die Online-Streitbeilegungsplattform (OS-Plattform) informieren.
                                            </p>
                                            <p className="mb-4">
                                                Verbraucher haben die Möglichkeit, Beschwerden an die Online Streitbeilegungsplattform der
                                                Europäischen Kommission unter{' '}
                                                <a href="http://ec.europa.eu/odr" target="_blank" rel="noopener noreferrer"
                                                    className="text-black hover:opacity-70 transition-opacity underline">
                                                    http://ec.europa.eu/odr
                                                </a>{' '}
                                                zu richten.
                                            </p>
                                            <p>
                                                Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind,
                                                an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                                            </p>
                                        </>
                                    )
                                },
                                {
                                    icon: Shield,
                                    title: "Haftung für Inhalte",
                                    content: (
                                        <>
                                            <p className="mb-4">
                                                Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen uns korrekte und
                                                aktuelle Informationen bereitzustellen. Leider können wir keine Haftung für die Korrektheit
                                                aller Inhalte auf dieser Webseite übernehmen, speziell für jene die seitens Dritter
                                                bereitgestellt wurden.
                                            </p>
                                            <p>
                                                Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, bitten wir Sie uns
                                                umgehend zu kontaktieren.
                                            </p>
                                        </>
                                    )
                                }
                            ].map((section, index) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="card"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="feature-icon">
                                            <section.icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                                {section.title}
                                            </h2>
                                            <div className="font-light text-gray-600 leading-relaxed">
                                                {section.content}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Copyright & Legal */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="card"
                            >
                                <div className="text-center">
                                    <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                        Urheberrecht
                                    </h2>
                                    <p className="font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                        Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos) unterliegen dem Urheberrecht.
                                        Falls notwendig, werden wir die unerlaubte Nutzung von Teilen der Inhalte unserer Seite
                                        rechtlich verfolgen.
                                    </p>
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-center pt-8"
                            >
                                <Link href="/" className="btn-primary">
                                    Zurück zur Startseite
                                </Link>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 