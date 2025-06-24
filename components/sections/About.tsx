"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "15+", label: "Jahre Erfahrung" },
    { value: "1000+", label: "Zufriedene Kunden" },
    { value: "98%", label: "Erfolgsquote" },
    { value: "5.0", label: "Google Bewertung" },
];

export default function About() {
    return (
        <section id="about" className="section-spacing bg-white">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="order-2 lg:order-1"
                    >
                        <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                            Über uns
                        </span>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 md:mb-8" style={{ color: 'var(--color-primary)' }}>
                            Ihr Partner für
                            <br />
                            <span style={{ color: 'var(--color-secondary)' }}>dauerhafte Schönheit</span>
                        </h2>

                        <div className="space-y-4 md:space-y-6 text-gray-600 font-light leading-relaxed text-sm md:text-base">
                            <p>
                                Skinlux steht seit über 15 Jahren für professionelle
                                Laser-Haarentfernung und innovative Kosmetikbehandlungen
                                in Bischofshofen.
                            </p>

                            <p>
                                Unser erfahrenes Team setzt auf modernste Technologie
                                und individuelle Beratung, um Ihnen die bestmöglichen
                                Ergebnisse zu garantieren.
                            </p>

                            <p>
                                Mit unserer neuen HydraFacial® Behandlung und professioneller
                                Hautanalyse erweitern wir kontinuierlich unser Angebot,
                                um Ihren Bedürfnissen gerecht zu werden.
                            </p>
                        </div>

                        <div className="divider mt-8 md:mt-12 ml-0" />
                    </motion.div>

                    {/* Right Content - Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="order-1 lg:order-2"
                    >
                        {/* ABOUT IMAGE - Füge hier dein Bild ein */}
                        <div className="relative aspect-[4/5] lg:aspect-[3/4]">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: "url('/images/about-team.jpg')", // TEAM BILD HIER
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundColor: '#f5f5f5' // Fallback wenn kein Bild
                                }}
                            >
                                {/* Overlay für bessere Textlesbarkeit */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                            </div>

                            {/* Stats overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
                                <div className="grid grid-cols-2 gap-6 md:gap-8">
                                    {stats.slice(0, 2).map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.05 }}
                                            className="text-center lg:text-left"
                                        >
                                            <div
                                                className="text-2xl md:text-3xl lg:text-4xl font-light mb-1"
                                                style={{ color: 'var(--color-secondary)' }}
                                            >
                                                {stat.value}
                                            </div>
                                            <div className="text-xs font-light tracking-widest uppercase text-gray-700">
                                                {stat.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-20 md:mt-32 text-center"
                >
                    <div className="max-w-3xl mx-auto px-4">
                        <p className="text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed text-gray-700">
                            &quot;Wir glauben daran, dass jeder Mensch sich in seiner Haut
                            wohlfühlen sollte. Unser Ziel ist es, Ihnen dabei zu helfen.&quot;
                        </p>
                        <div className="divider mt-6 md:mt-8" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 