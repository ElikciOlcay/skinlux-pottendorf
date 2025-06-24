"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Aktuelle Preise basierend auf Ihrer Preisliste
const damenPreise = [
    { zone: "Wangen", preis: "€ 35", dauer: "15 Min." },
    { zone: "Kinn", preis: "€ 35", dauer: "15 Min." },
    { zone: "Oberlippe", preis: "€ 35", dauer: "15 Min." },
    { zone: "Hals", preis: "€ 45", dauer: "15 Min." },
    { zone: "Gesicht komplett", preis: "€ 99", dauer: "30 Min." },
    { zone: "Achseln", preis: "€ 55", dauer: "30 Min." },
    { zone: "Oberarme", preis: "€ 45", dauer: "30 Min." },
    { zone: "Unterarme", preis: "€ 55", dauer: "30 Min." },
    { zone: "Arme komplett", preis: "€ 80", dauer: "1 Std." },
    { zone: "Bikini Zone", preis: "€ 60", dauer: "20 Min." },
    { zone: "Intim komplett", preis: "€ 80", dauer: "30 Min." },
    { zone: "Intim + Bikini inkl. Pofalte", preis: "€ 100", dauer: "30 Min." },
    { zone: "Po", preis: "€ 60", dauer: "30 Min." },
    { zone: "Pofalte", preis: "€ 35", dauer: "15 Min." },
    { zone: "Oberschenkel", preis: "€ 95", dauer: "30 Min." },
    { zone: "Unterschenkel", preis: "€ 95", dauer: "1 Std." },
    { zone: "Beine komplett", preis: "€ 180", dauer: "1 Std." },
    { zone: "Bauch", preis: "€ 65", dauer: "30 Min." },
    { zone: "Rücken", preis: "€ 95", dauer: "35 Min." },
];

const herrenPreise = [
    { zone: "Hals", preis: "€ 45", dauer: "15 Min." },
    { zone: "Bartkontur", preis: "€ 50", dauer: "30 Min." },
    { zone: "Nacken", preis: "€ 50", dauer: "20 Min." },
    { zone: "Achseln", preis: "€ 55", dauer: "20 Min." },
    { zone: "Oberarme", preis: "€ 50", dauer: "30 Min." },
    { zone: "Unterarme", preis: "€ 65", dauer: "30 Min." },
    { zone: "Arme komplett", preis: "€ 95", dauer: "1 Std." },
    { zone: "Bauch", preis: "€ 65", dauer: "30 Min." },
    { zone: "Brust", preis: "€ 80", dauer: "30 Min." },
    { zone: "Schultern", preis: "€ 50", dauer: "30 Min." },
    { zone: "Rücken komplett", preis: "€ 95", dauer: "45 Min." },
    { zone: "Po gesamt", preis: "€ 85", dauer: "30 Min." },
    { zone: "Oberschenkel", preis: "€ 120", dauer: "1 Std." },
    { zone: "Unterschenkel", preis: "€ 120", dauer: "1 Std." },
    { zone: "Beine komplett", preis: "€ 230", dauer: "1 Std. 15 Min." },
    { zone: "Füße", preis: "€ 40", dauer: "20 Min." },
];

function LaserPreiseContent() {
    const searchParams = useSearchParams();
    const [geschlecht, setGeschlecht] = useState<"damen" | "herren">("damen");
    const preise = geschlecht === "damen" ? damenPreise : herrenPreise;

    useEffect(() => {
        const geschlechtParam = searchParams.get("geschlecht");
        if (geschlechtParam === "herren" || geschlechtParam === "damen") {
            setGeschlecht(geschlechtParam);
        }
    }, [searchParams]);

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="container">
                {/* Back Button */}
                <Link
                    href="/#treatments"
                    className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Zurück
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                            Preisliste
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                        Laser <span style={{ color: 'var(--color-secondary)' }}>Haarentfernung</span>
                    </h1>

                    <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                        Dauerhafte Haarentfernung mit modernster Diodenlaser-Technologie.
                        Alle Preise verstehen sich pro Behandlung.
                    </p>
                </motion.div>

                {/* Gender Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex justify-center mb-12"
                >
                    <div className="inline-flex border border-gray-200">
                        <button
                            onClick={() => setGeschlecht("damen")}
                            className={`px-8 py-3 text-sm font-light tracking-widest uppercase transition-all duration-300 ${geschlecht === "damen"
                                ? "bg-black text-white"
                                : "bg-white text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            Damen
                        </button>
                        <button
                            onClick={() => setGeschlecht("herren")}
                            className={`px-8 py-3 text-sm font-light tracking-widest uppercase transition-all duration-300 ${geschlecht === "herren"
                                ? "bg-black text-white"
                                : "bg-white text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            Herren
                        </button>
                    </div>
                </motion.div>

                {/* Price Table */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-gray-50 p-8 md:p-12">
                        <div className="space-y-6">
                            {/* Table Header */}
                            <div className="grid grid-cols-3 gap-4 pb-6 border-b border-gray-200">
                                <div className="text-sm font-light tracking-widest uppercase text-gray-500">
                                    Zone
                                </div>
                                <div className="text-sm font-light tracking-widest uppercase text-gray-500 text-center">
                                    Dauer
                                </div>
                                <div className="text-sm font-light tracking-widest uppercase text-gray-500 text-right">
                                    Preis pro Behandlung
                                </div>
                            </div>

                            {/* Price Rows */}
                            {preise.map((item, index) => (
                                <motion.div
                                    key={item.zone}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="grid grid-cols-3 gap-4 py-4 border-b border-gray-100 last:border-0"
                                >
                                    <div className="font-light text-gray-800">
                                        {item.zone}
                                    </div>
                                    <div className="font-light text-center text-gray-600 text-sm">
                                        {item.dauer}
                                    </div>
                                    <div className="font-light text-right text-gray-800">
                                        {item.preis}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Info Box */}
                        <div className="mt-12 p-6 bg-white border border-gray-200">
                            <h3 className="text-lg font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                                Wichtige Informationen
                            </h3>
                            <ul className="space-y-2 text-sm font-light text-gray-600">
                                <li>• Kostenloses Erstgespräch und Probebehandlung inklusive</li>
                                <li>• Die Probebehandlung wird auf einer ca. handgroßen Fläche durchgeführt</li>
                                <li>• Individuelle Behandlungspläne möglich</li>
                                <li>• Paketpreise auf Anfrage verfügbar</li>
                            </ul>
                        </div>

                        {/* Pakete nur für Damen */}
                        {geschlecht === "damen" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mt-12"
                            >
                                <h3 className="text-2xl font-light mb-8 text-center" style={{ color: 'var(--color-primary)' }}>
                                    Unsere <span style={{ color: 'var(--color-secondary)' }}>Vorteilspakete</span>
                                </h3>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Small Paket */}
                                    <div className="bg-white border border-gray-200 p-6 text-center hover:border-secondary transition-colors">
                                        <h4 className="text-lg font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                            Paket Small
                                        </h4>
                                        <p className="text-3xl font-light mb-4" style={{ color: 'var(--color-secondary)' }}>
                                            € 200
                                        </p>
                                        <ul className="text-sm font-light text-gray-600 space-y-2 text-left">
                                            <li>✓ Achseln</li>
                                            <li>✓ Unterschenkel</li>
                                            <li>✓ Intim + Bikini inkl. Pofalte</li>
                                        </ul>
                                    </div>

                                    {/* Medium Paket */}
                                    <div className="bg-white border border-secondary p-6 text-center relative">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 text-xs font-light tracking-widest uppercase">
                                            Beliebt
                                        </div>
                                        <h4 className="text-lg font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                            Paket Medium
                                        </h4>
                                        <p className="text-3xl font-light mb-4" style={{ color: 'var(--color-secondary)' }}>
                                            € 270
                                        </p>
                                        <ul className="text-sm font-light text-gray-600 space-y-2 text-left">
                                            <li>✓ Achseln</li>
                                            <li>✓ Beine komplett</li>
                                            <li>✓ Intim + Bikini inkl. Pofalte</li>
                                        </ul>
                                    </div>

                                    {/* Large Paket */}
                                    <div className="bg-white border border-gray-200 p-6 text-center hover:border-secondary transition-colors">
                                        <h4 className="text-lg font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                            Paket Large
                                        </h4>
                                        <p className="text-3xl font-light mb-4" style={{ color: 'var(--color-secondary)' }}>
                                            € 390
                                        </p>
                                        <ul className="text-sm font-light text-gray-600 space-y-2 text-left">
                                            <li>✓ Achseln</li>
                                            <li>✓ Beine komplett</li>
                                            <li>✓ Gesicht komplett</li>
                                            <li>✓ Unterarme</li>
                                            <li>✓ Intim + Bikini inkl. Pofalte</li>
                                        </ul>
                                    </div>
                                </div>

                                <p className="text-center text-sm font-light text-gray-500 mt-6">
                                    Alle Paketpreise gelten pro Behandlung
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <a
                            href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center justify-center"
                        >
                            Kostenlose Beratung buchen
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}

export default function LaserPreise() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LaserPreiseContent />
        </Suspense>
    );
}