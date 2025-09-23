"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Droplets, Clock, Zap, Leaf, Gift, Star, TrendingUp, ArrowRight } from "lucide-react";
import { useRef } from "react";

const hydrafacialAngebote = [
    {
        name: "HydraFacial® Signature",
        originalPrice: 169,
        salePrice: 119,
        duration: "1 Stunde",
        description: "Die klassische HydraFacial-Behandlung mit Reinigung, Peeling, Extraktion und Hydration.",
        features: ["Cleanse + Peel", "Extract + Hydrate", "Fuse + Protect"],
        popular: false
    },
    {
        name: "HydraFacial® Signature + LED",
        originalPrice: 189,
        salePrice: 139,
        duration: "1 Std. 15 Min.",
        description: "Signature-Behandlung plus antibakterielle LED-Therapie für problematische Haut.",
        features: ["Alles aus Signature", "LED-Lichttherapie", "Antibakteriell"],
        popular: true
    },
    {
        name: "HydraFacial® Deluxe",
        originalPrice: 259,
        salePrice: 199,
        duration: "1 Std. 15 Min.",
        description: "Premium-Behandlung mit individueller Wirkstoff-Infusion und LED-Therapie.",
        features: ["Individuelle Wirkstoff-Infusion", "LED-Therapie", "Premium Experience"],
        popular: false
    },
    {
        name: "HydraFacial® Platinum",
        originalPrice: 289,
        salePrice: 219,
        duration: "2 Stunden",
        description: "Das ultimative Luxus-Erlebnis mit Lymphdrainage und allen Premium-Features.",
        features: ["Entspannende Lymphdrainage", "Alles aus Deluxe", "Maximale Regeneration"],
        popular: false
    }
];

const laserPakete = [
    {
        name: "Paket Small",
        originalPrice: 200,
        salePrice: 170,
        duration: "1 Std. 40 Min.",
        description: "Perfekt für den Einstieg in die dauerhafte Haarentfernung.",
        includes: ["Achseln", "Unterschenkel", "Intim + Bikini inkl. Pofalte"],
        popular: false
    },
    {
        name: "Paket Medium",
        originalPrice: 250,
        salePrice: 220,
        duration: "2 Std.",
        description: "Unser beliebtestes Paket für umfassende Haarentfernung.",
        includes: ["Achseln", "Beine komplett", "Intim + Bikini inkl. Pofalte"],
        popular: true
    },
    {
        name: "Paket Large",
        originalPrice: 350,
        salePrice: 320,
        duration: "2 Std. 30 Min.",
        description: "Das Komplettpaket für maximale Haarentfernung.",
        includes: ["Achseln", "Beine komplett", "Gesicht komplett", "Unterarme", "Intim + Bikini inkl. Pofalte"],
        popular: false
    }
];

export default function Herbstaktion() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background */}
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
                />

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            animate={{
                                y: [-20, 20, -20],
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 8 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 1.2
                            }}
                            style={{
                                left: `${15 + i * 15}%`,
                                top: `${20 + (i % 3) * 30}%`,
                            }}
                        >
                            <div className="text-4xl md:text-6xl opacity-20">
                                {['🍂', '🎃', '🌰', '🍁', '🌾', '🧡'][i]}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Content */}
                <div className="container relative z-10 text-center px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück zur Startseite
                    </Link>

                    <motion.div
                        style={{ y: textY }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <Leaf className="w-8 h-8 text-orange-500" />
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-orange-600">
                                Herbstaktion 2025
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6">
                            <span className="block text-gray-900">Herbst</span>
                            <span className="block text-orange-500 mt-2">Special</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-8 leading-relaxed">
                            Starten Sie perfekt gepflegt in die neue Jahreszeit mit unseren
                            exklusiven Herbst-Angeboten für HydraFacial® und Laser-Haarentfernung
                        </p>

                        <div className="flex items-center justify-center gap-2 text-orange-600 mb-8">
                            <Clock className="w-5 h-5" />
                            <p className="text-lg font-light">
                                Gültig vom 15.09. bis 15.10.2025
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <a
                                href="#hydrafacial-angebote"
                                className="px-8 py-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                HydraFacial® Angebote
                            </a>
                            <a
                                href="#laser-angebote"
                                className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105"
                            >
                                Laser Angebote
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-orange-400 rounded-full mt-2"></div>
                    </div>
                </motion.div>
            </section>

            {/* HydraFacial Angebote */}
            <section id="hydrafacial-angebote" className="py-20 bg-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Droplets className="w-6 h-6 text-blue-500" />
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-blue-600">
                                HydraFacial® Special
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                            Strahlende Haut für den <span className="text-blue-500">Herbst</span>
                        </h2>
                        <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                            Bereiten Sie Ihre Haut optimal auf die kältere Jahreszeit vor mit unseren
                            HydraFacial® Herbst-Angeboten
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {hydrafacialAngebote.map((angebot, index) => (
                            <motion.div
                                key={angebot.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative bg-white border-2 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${angebot.popular
                                    ? 'border-blue-500 shadow-xl scale-105'
                                    : 'border-gray-200 hover:border-blue-300'
                                    }`}
                            >
                                {angebot.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-current" />
                                            Beliebt
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                                        {angebot.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <span className="text-2xl text-gray-400 line-through">
                                            €{angebot.originalPrice}
                                        </span>
                                        <span className="text-4xl font-light text-blue-500">
                                            €{angebot.salePrice}
                                        </span>
                                    </div>
                                    <div className="inline-flex items-center gap-1 text-green-600 font-medium text-sm mb-3">
                                        <TrendingUp className="w-4 h-4" />
                                        Sie sparen €{angebot.originalPrice - angebot.salePrice}
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4">{angebot.duration}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {angebot.description}
                                    </p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {angebot.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            </div>
                                            <span className="text-sm text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    Jetzt buchen
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Laser Angebote */}
            <section id="laser-angebote" className="py-20 bg-gray-50">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Zap className="w-6 h-6 text-purple-500" />
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-purple-600">
                                Laser Special
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900">
                            Dauerhafte <span className="text-purple-500">Haarentfernung</span>
                        </h2>
                        <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                            Starten Sie jetzt in die haarfreie Zeit mit unseren exklusiven Laser-Paketen
                            zu Herbst-Sonderpreisen
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {laserPakete.map((paket, index) => (
                            <motion.div
                                key={paket.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative bg-white border-2 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${paket.popular
                                    ? 'border-purple-500 shadow-xl scale-105'
                                    : 'border-gray-200 hover:border-purple-300'
                                    }`}
                            >
                                {paket.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-current" />
                                            Beliebt
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-medium text-gray-900 mb-4">
                                        {paket.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-3 mb-3">
                                        <span className="text-2xl text-gray-400 line-through">
                                            €{paket.originalPrice}
                                        </span>
                                        <span className="text-5xl font-light text-purple-500">
                                            €{paket.salePrice}
                                        </span>
                                    </div>
                                    <div className="inline-flex items-center gap-1 text-green-600 font-medium mb-4">
                                        <TrendingUp className="w-4 h-4" />
                                        Sie sparen €{paket.originalPrice - paket.salePrice}
                                    </div>
                                    <p className="text-gray-500 mb-4">{paket.duration}</p>
                                    <p className="text-gray-600 leading-relaxed">
                                        {paket.description}
                                    </p>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <h4 className="font-medium text-gray-900 mb-3">Enthält:</h4>
                                    {paket.includes.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            </div>
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    Jetzt buchen
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    {/* Zusätzliche Infos */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
                            <h3 className="text-2xl font-light mb-4 text-gray-900">
                                Warum jetzt der perfekte <span className="text-orange-500">Zeitpunkt</span> ist
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">☀️</span>
                                    </div>
                                    <p><strong>Weniger Sonne:</strong> Optimaler Schutz für behandelte Haut</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">❄️</span>
                                    </div>
                                    <p><strong>Winter-Vorbereitung:</strong> Bis zum Sommer perfekt haarfrei</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <p><strong>Herbst-Special:</strong> Exklusive Rabatte nur jetzt</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-orange-500 to-purple-600 text-white">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Gift className="w-6 h-6" />
                            <span className="text-sm font-light tracking-[0.3em] uppercase">
                                Limitierte Aktion
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light mb-6">
                            Sichern Sie sich jetzt Ihre <span className="text-yellow-300">Herbst-Vorteile</span>
                        </h2>
                        <p className="text-xl font-light max-w-2xl mx-auto mb-8 opacity-90">
                            Nur noch wenige Termine verfügbar. Buchen Sie jetzt und sparen Sie bis zu €70
                            bei unseren Premium-Behandlungen.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-medium shadow-lg"
                            >
                                Jetzt Termin buchen
                            </a>
                            <a
                                href="/kontakt"
                                className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105"
                            >
                                Kostenlose Beratung
                            </a>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-yellow-300">
                            <Clock className="w-5 h-5" />
                            <p className="text-lg font-light">
                                Aktion gültig bis 15. Oktober 2025
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
