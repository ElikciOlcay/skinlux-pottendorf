"use client";

import { Leaf, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SpecialOffer() {
    return (
        <section className="relative overflow-hidden">
            {/* Background - exakt wie Hero der Herbstaktion */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" />

            {/* Simplified Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        animate={{
                            y: [-15, 15, -15],
                            rotate: [0, 180],
                        }}
                        transition={{
                            duration: 6 + i * 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 2
                        }}
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${25 + (i % 2) * 40}%`,
                        }}
                    >
                        <div className="text-3xl md:text-4xl opacity-15">
                            {['🍂', '🎃', '🍁'][i]}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Content */}
            <div className="container relative z-30 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-6">
                        <Leaf className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-light tracking-[0.3em] uppercase text-orange-600">
                            Herbst Special 2025
                        </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
                        <span className="block">Herbst</span>
                        <span className="block mt-2 text-orange-500">
                            Aktion
                        </span>
                    </h2>

                    {/* Discount Display */}
                    <div className="flex items-baseline justify-center gap-3 mb-6">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative">
                                {/* Background Text */}
                                <div
                                    className="absolute -top-20 -left-10 text-[120px] md:text-[160px] font-bold opacity-5 text-gray-900 select-none"
                                    aria-hidden="true"
                                >
                                    -70€
                                </div>

                                {/* Main Content */}
                                <div className="relative">
                                    <span className="text-4xl md:text-6xl font-light text-orange-500">
                                        bis -70€
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                        <span className="text-xl font-light text-orange-600">
                            sparen
                        </span>
                    </div>

                    {/* Simple Description */}
                    <p className="text-lg font-light text-gray-600 mb-8">
                        Exklusive Herbst-Angebote – bis zu 70€ sparen
                    </p>

                    {/* CTA Button */}
                    <div className="mb-6 relative z-20">
                        <a
                            href="/herbstaktion"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = '/herbstaktion';
                            }}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl rounded-full cursor-pointer relative z-20 select-none"
                            role="button"
                            tabIndex={0}
                        >
                            Alle Angebote entdecken
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Simple Footer Note */}
                    <p className="text-sm text-orange-600">
                        Gültig bis 15.10.2025
                    </p>
                </div>
            </div>
        </section>
    );
}