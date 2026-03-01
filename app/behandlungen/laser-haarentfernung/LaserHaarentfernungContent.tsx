"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Check, Shield, Heart, Star, ArrowRight, TrendingUp } from "lucide-react";
import { FEATURES } from "@/lib/features";
import FaqAccordion from "@/components/ui/FaqAccordion";

const laserFaq = [
    {
        frage: "Wie viele Behandlungen sind notwendig?",
        antwort: "Die Anzahl der Behandlungen ist individuell und hängt von Hauttyp, Haarfarbe und behandelter Zone ab. Behandlungen finden im Abstand von 4-6 Wochen statt."
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
    },
    {
        frage: "Was kostet Laser Haarentfernung in Pottendorf?",
        antwort: "Die Preise bei Skinlux beginnen ab 35 Euro fuer kleine Zonen wie Oberlippe oder Kinn. Groessere Bereiche wie Beine komplett kosten 180 Euro. Wir bieten auch Pakete mit Ersparnis an. Die kostenlose Erstberatung ist unverbindlich."
    },
    {
        frage: "Wie funktioniert Laser Haarentfernung?",
        antwort: "Der Diodenlaser sendet gezieltes Licht, das vom Melanin im Haarfollikel absorbiert wird. Die entstehende Waerme zerstoert die Haarwurzel dauerhaft, waehrend das umliegende Gewebe unversehrt bleibt. Unser integriertes Kuehlsystem sorgt dabei fuer maximalen Komfort."
    },
    {
        frage: "Ist Laser Haarentfernung dauerhaft?",
        antwort: "Ja, nach einer vollstaendigen Behandlungsserie von 6-8 Sitzungen ist eine dauerhafte Reduktion von bis zu 90% der Haare moeglich. Vereinzelt koennen feine Haare nachwachsen, die mit einer Auffrischungsbehandlung einfach entfernt werden."
    },
    {
        frage: "Welche Risiken hat Laser Haarentfernung?",
        antwort: "Bei professioneller Durchfuehrung ist die Behandlung sehr sicher. Voruebergehende Roetungen oder leichte Schwellungen koennen auftreten und klingen innerhalb weniger Stunden ab. Dank unserer FDA-zertifizierten Technologie sind ernsthafte Nebenwirkungen aeusserst selten."
    },
    {
        frage: "Wie lange dauert eine Laser-Sitzung?",
        antwort: "Die Dauer haengt von der behandelten Zone ab: Kleine Bereiche wie Oberlippe dauern ca. 15 Minuten, groessere Flaechen wie Beine komplett etwa 60 Minuten. In der kostenlosen Beratung erstellen wir Ihren individuellen Behandlungsplan."
    }
];

export default function LaserHaarentfernungContent() {
    const vorteile = [
        {
            icon: Zap,
            title: "Modernste Technologie",
            description: "Diodenlaser der neuesten Generation für optimale Ergebnisse"
        },
        {
            icon: Shield,
            title: "Sicher & Schmerzarm",
            description: "FDA-zertifizierte Technologie mit integriertem Kühlsystem"
        },
        {
            icon: Heart,
            title: "Für alle Hauttypen",
            description: "Geeignet für alle Hauttypen und Hauttöne"
        }
    ];

    const ablauf = [
        {
            step: "01",
            title: "Beratung & Analyse",
            description: FEATURES.HAUTANALYSE_ENABLED
                ? "Kostenlose Erstberatung und professionelle Hautanalyse"
                : "Kostenlose Erstberatung und Hauttyp-Bestimmung"
        },
        {
            step: "02",
            title: "Behandlungsplan",
            description: "Individueller Behandlungsplan für optimale Ergebnisse"
        },
        {
            step: "03",
            title: "Laserbehandlung",
            description: "Schmerzarme Laserbehandlung mit modernster Diodentechnologie"
        },
        {
            step: "04",
            title: "Nachsorge",
            description: "Nachsorge und individuelle Pflegetipps für optimale Ergebnisse"
        }
    ];

    return (
        <main className="min-h-screen bg-white" itemScope itemType="https://schema.org/MedicalProcedure">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32">
                <div className="container">
                    <Link
                        href="/#treatments"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-6 md:mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                    </Link>

                    {/* Kampagnen-Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 md:mb-10 bg-black text-white overflow-hidden relative"
                    >
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)" }}
                        />
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6">
                            <div>
                                <span className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-1.5 block">
                                    März-Kampagne &bull; 01.03. – 31.03.2026
                                </span>
                                <p className="text-lg md:text-xl font-light">
                                    <strong className="font-normal text-white">50% Rabatt</strong> auf die 1. und 8. Laser-Behandlung
                                </p>
                            </div>
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 bg-white text-black px-6 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors whitespace-nowrap inline-flex items-center gap-2"
                            >
                                Jetzt buchen
                                <TrendingUp className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--color-secondary)' }} />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 font-light">
                                        Über 2000 zufriedene Kunden
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight text-black" itemProp="name">
                                    Dauerhafte<br />
                                    <span style={{ color: 'var(--color-secondary)' }}>Haarfreiheit</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 font-light mb-8 leading-relaxed" itemProp="description">
                                    Modernste Diodenlaser-Technologie für effektive und schmerzarme
                                    Haarentfernung. Erleben Sie glatte Haut ohne tägliches Rasieren.
                                    Professionelle Laser-Haarentfernung in Pottendorf, Baden und Mödling.
                                    Unsere FDA-zertifizierte Technologie ist für alle Hauttypen geeignet
                                    und bietet dauerhafte Ergebnisse ohne tägliches Rasieren.
                                </p>

                                {/* Quick Benefits */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    {[
                                        { icon: Check, text: "FDA-zertifiziert" },
                                        { icon: Check, text: "Alle Hauttypen" },
                                        { icon: Check, text: "Schmerzarm" }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <item.icon className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                            <span className="text-sm text-gray-700 font-light">{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary inline-flex items-center justify-center"
                                    >
                                        Kostenlose Probebehandlung
                                    </a>
                                    <Link
                                        href="/preise/laser"
                                        className="btn-secondary inline-flex items-center justify-center"
                                    >
                                        Preise ansehen
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Right Content - Video */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg">
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
                </div>
            </section>

            {/* Vorteile */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">
                                Ihre <span style={{ color: 'var(--color-secondary)' }}>Vorteile</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {vorteile.map((vorteil, index) => (
                                <motion.div
                                    key={vorteil.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-secondary/10">
                                        <vorteil.icon
                                            className="w-8 h-8"
                                            style={{ color: 'var(--color-secondary)' }}
                                        />
                                    </div>
                                    <h3 className="text-xl font-light mb-3 text-black">
                                        {vorteil.title}
                                    </h3>
                                    <p className="text-gray-600 font-light text-sm">
                                        {vorteil.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Behandlungsablauf */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">
                                Der <span style={{ color: 'var(--color-secondary)' }}>Behandlungsablauf</span>
                            </h2>
                        </motion.div>

                        <div className="space-y-8">
                            {ablauf.map((schritt, index) => (
                                <motion.div
                                    key={schritt.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="flex items-start gap-6"
                                >
                                    <div
                                        className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-lg font-light rounded-full"
                                        style={{
                                            backgroundColor: 'var(--color-secondary)',
                                            color: 'white'
                                        }}
                                    >
                                        {schritt.step}
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <h3 className="text-lg font-light mb-2 text-black">
                                            {schritt.title}
                                        </h3>
                                        <p className="text-gray-600 font-light text-sm">
                                            {schritt.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Pricing CTA */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">
                                Preise & <span style={{ color: 'var(--color-secondary)' }}>Pakete</span>
                            </h2>
                            <p className="text-gray-600 font-light mb-8">
                                Transparente Preise für alle Körperzonen. Kostenloses Erstgespräch inklusive Probebehandlung.
                            </p>
                            <Link
                                href="/preise/laser"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                Alle Preise ansehen
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">
                            Häufige <span style={{ color: 'var(--color-secondary)' }}>Fragen</span>
                        </h2>
                    </motion.div>

                    <FaqAccordion items={laserFaq} />
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-20 bg-black text-white">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-light mb-6">
                                Starten Sie Ihre Reise zu<br />
                                <span style={{ color: 'var(--color-secondary)' }}>dauerhafter Haarfreiheit</span>
                            </h2>
                            <p className="text-lg font-light text-gray-300 mb-8">
                                Kostenlose Erstberatung inklusive Probebehandlung
                            </p>
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-10 py-4 bg-white text-black text-base font-light hover:bg-gray-100 transition-colors"
                            >
                                Jetzt Termin buchen
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Cross-Links zu verwandten Behandlungen */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-light text-black mb-3">
                            Weitere Behandlungen
                        </h2>
                        <p className="text-gray-600 font-light">
                            Entdecken Sie unser vollständiges Behandlungsangebot
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <Link href="/behandlungen/hydra-facial" className="group p-6 bg-white hover:bg-gray-100 transition-colors">
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">HydraFacial®</h3>
                            <p className="text-sm text-gray-500 font-light">Revolutionäre 3-in-1 Behandlung für sofort sichtbare Ergebnisse</p>
                        </Link>
                        <Link href="/behandlungen/hautanalyse" className="group p-6 bg-white hover:bg-gray-100 transition-colors">
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">Hautanalyse</h3>
                            <p className="text-sm text-gray-500 font-light">Professionelle Analyse mit modernster HD-Technologie</p>
                        </Link>
                        <Link href="/behandlungen/signature-facials" className="group p-6 bg-white hover:bg-gray-100 transition-colors">
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">Signature Facials</h3>
                            <p className="text-sm text-gray-500 font-light">Exklusive 90-Minuten Treatments mit Circadia Professional</p>
                        </Link>
                        <Link href="/preise/laser" className="group p-6 bg-white hover:bg-gray-100 transition-colors">
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">Laser Preise</h3>
                            <p className="text-sm text-gray-500 font-light">Aktuelle Preise für alle Laser-Behandlungszonen</p>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
