"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Clock, Award, Star, CheckCircle, Sparkles, Heart } from "lucide-react";
import { FEATURES } from "@/lib/features";

const vorteile = [
    {
        icon: Sparkles,
        title: "Kollagen Stimulation",
        description: "Aktiviert natürliche Kollagenproduktion für straffere und glattere Haut",
        stat: "300%",
        statLabel: "Mehr Kollagen"
    },
    {
        icon: Heart,
        title: "Narben & Poren",
        description: "Reduziert Aknenarben und verfeinert das Hautbild nachhaltig",
        stat: "85%",
        statLabel: "Verbesserung"
    },
    {
        icon: Star,
        title: "Anti-Aging Effekt",
        description: "Minimiert Falten und verbessert Hautstruktur ohne Ausfallzeiten",
        stat: "6 Mon.",
        statLabel: "Langzeiteffekt"
    },
    {
        icon: CheckCircle,
        title: "Alle Hauttypen",
        description: "Sicher und effektiv für alle Hauttypen und Hautfarben",
        stat: "100%",
        statLabel: "Sicher"
    }
];

const behandlungsablauf = [
    // Hautanalyse temporär ausgeblendet - wird später aktiviert wenn Gerät verfügbar
    ...(FEATURES.HAUTANALYSE_ENABLED ? [{
        step: "01",
        title: "Hautanalyse",
        description: "Gründliche Untersuchung Ihres Hauttyps und Ihrer Bedürfnisse"
    }] : []),
    {
        step: FEATURES.HAUTANALYSE_ENABLED ? "02" : "01",
        title: "Vorbereitung",
        description: "Sanfte Reinigung und Betäubungscreme für maximalen Komfort"
    },
    {
        step: FEATURES.HAUTANALYSE_ENABLED ? "03" : "02",
        title: "Microneedling",
        description: "Präzise Behandlung mit sterilen Mikronadeln in verschiedenen Tiefen"
    },
    {
        step: FEATURES.HAUTANALYSE_ENABLED ? "04" : "03",
        title: "Serum-Infusion",
        description: "Einarbeitung hochwirksamer Seren für optimale Regeneration"
    },
    {
        step: FEATURES.HAUTANALYSE_ENABLED ? "05" : "04",
        title: "Nachbehandlung",
        description: "Beruhigende Maske und Pflegeberatung für die Heimanwendung"
    }
];

const faq = [
    {
        frage: "Wie schmerzhaft ist Microneedling?",
        antwort: "Durch die Betäubungscreme ist die Behandlung sehr gut verträglich. Die meisten Klienten empfinden nur ein leichtes Kribbeln."
    },
    {
        frage: "Wie viele Sitzungen sind nötig?",
        antwort: "Für optimale Ergebnisse empfehlen wir 3-6 Sitzungen im Abstand von 4-6 Wochen, je nach Hautbeschaffenheit."
    },
    {
        frage: "Wann sind erste Ergebnisse sichtbar?",
        antwort: "Bereits nach der ersten Behandlung ist die Haut strahlender. Die volle Wirkung entwickelt sich über 4-6 Wochen."
    },
    {
        frage: "Gibt es Ausfallzeiten?",
        antwort: "Minimal. Die Haut kann 24-48 Stunden leicht gerötet sein, danach können Sie Ihren normalen Alltag fortsetzen."
    },
    {
        frage: "Für wen ist Microneedling geeignet?",
        antwort: "Für alle Hauttypen ab 18 Jahren. Besonders empfehlenswert bei Aknenarben, Falten, großen Poren und Pigmentflecken."
    }
];

export default function Microneedling() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-24 pb-20 bg-white">
                <div className="container">
                    {/* Back Button */}
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
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 mb-6">
                                <Zap className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
                                <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                    Anti-Aging Treatment
                                </span>
                                <span className="text-xs font-light tracking-widest uppercase px-3 py-1"
                                    style={{
                                        backgroundColor: 'var(--color-secondary)',
                                        color: 'white'
                                    }}>
                                    BELIEBT
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                Micro<span style={{ color: 'var(--color-secondary)' }}>needling</span>
                            </h1>

                            <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed">
                                Innovative Kollagen-Induktions-Therapie für natürliche Hauterneuerung.
                                Reduziert Falten, Narben und verfeinert Poren für ein strahlendes Hautbild.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="text-2xl font-light mb-1" style={{ color: 'var(--color-secondary)' }}>€ 189</div>
                                    <div className="text-sm font-light text-gray-600">60 Minuten</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-light mb-1" style={{ color: 'var(--color-primary)' }}>3er Paket</div>
                                    <div className="text-sm font-light text-gray-600">€ 510 (10% sparen)</div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
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

                            {/* Treatment Stats */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="mt-6 text-sm text-gray-600 font-light"
                            >
                                <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-2"></span>
                                Modernste Pen-Technologie für präzise Ergebnisse
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
                                        backgroundImage: "url('/images/treatments/microneedling.jpg')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundColor: '#f5f5f5'
                                    }}
                                />
                                <div className="absolute -inset-4 border-2 border-secondary opacity-20" />
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2">
                                    <p className="text-sm font-light">Professional Pen</p>
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
                            { number: "0.5-2.5", label: "mm Nadeltiefe", icon: Zap },
                            { number: "60", label: "Minuten Treatment", icon: Clock },
                            { number: "300%", label: "Mehr Kollagen", icon: Award },
                            { number: "48h", label: "Regenerationszeit", icon: Star }
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
                            Warum Microneedling
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
                            Microneedling <span style={{ color: 'var(--color-secondary)' }}>Preise</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 border border-gray-200 bg-white"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        Einzelbehandlung
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        60 Minuten intensive Microneedling-Behandlung
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                        € 189
                                    </div>
                                    <div className="text-sm text-gray-500 font-light">
                                        60 Min.
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-8 border border-secondary bg-secondary/5"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        3er Paket
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        Optimale Ergebnisse durch Behandlungsserie
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-light" style={{ color: 'var(--color-secondary)' }}>
                                        € 510
                                    </div>
                                    <div className="text-sm text-gray-500 font-light">
                                        10% Ersparnis
                                    </div>
                                </div>
                            </div>
                            <div className="bg-secondary/10 p-3 border border-secondary/20">
                                <p className="text-sm font-light text-gray-700">
                                    <strong>Empfohlen:</strong> Für nachhaltige Ergebnisse bei Aknenarben und Anti-Aging
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-4xl mx-auto mt-12 p-8 bg-gray-50 border border-gray-200"
                    >
                        <h3 className="text-lg font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                            Zusatzleistungen
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="font-light mb-2" style={{ color: 'var(--color-secondary)' }}>
                                    Vitamin C Booster: + € 39
                                </p>
                                <p className="text-sm font-light text-gray-600">
                                    Hochdosiertes Vitamin C für extra Glow
                                </p>
                            </div>
                            <div>
                                <p className="font-light mb-2" style={{ color: 'var(--color-secondary)' }}>
                                    Hyaluron Serum: + € 49
                                </p>
                                <p className="text-sm font-light text-gray-600">
                                    Intensive Feuchtigkeitsversorgung
                                </p>
                            </div>
                        </div>
                    </motion.div>
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
                            Alles über <span style={{ color: 'var(--color-secondary)' }}>Microneedling</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {faq.map((item, index) => (
                            <motion.div
                                key={item.frage}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-8 border border-gray-200"
                            >
                                <h3 className="text-lg font-light mb-4" style={{ color: 'var(--color-primary)' }}>
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

            {/* CTA Section */}
            <section className="py-20 bg-black text-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-light mb-6">
                            Bereit für strahlende <span style={{ color: 'var(--color-secondary)' }}>Haut?</span>
                        </h2>
                        <p className="text-xl font-light text-gray-300 mb-8">
                            Vereinbaren Sie Ihren Microneedling-Termin und erleben Sie die transformative Kraft der Kollagen-Induktions-Therapie.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center justify-center"
                            >
                                Termin buchen
                            </a>
                            <Link
                                href="/#consultation"
                                className="btn-secondary bg-white text-black hover:bg-gray-100 inline-flex items-center justify-center"
                            >
                                Kostenlose Beratung
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}