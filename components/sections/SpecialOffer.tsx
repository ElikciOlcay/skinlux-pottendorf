"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function SpecialOffer() {
    return (
        <section className="relative overflow-hidden bg-black">
            {/* Modern Gradient Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 20% 50%, rgba(0, 169, 217, 0.15) 0%, transparent 50%)',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 80% 50%, rgba(0, 169, 217, 0.1) 0%, transparent 50%)',
                    }}
                />
            </div>

            {/* Content */}
            <div className="container relative z-10 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-6">
                        <Sparkles className="w-4 h-4" style={{ color: '#00A9D9' }} />
                        <span className="text-xs font-light tracking-[0.3em] uppercase text-gray-400">
                            Limited Edition
                        </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="text-4xl md:text-6xl font-light text-white mb-4">
                        <span className="block">HydraFacial®</span>
                        <span className="block mt-2" style={{ color: '#00A9D9' }}>
                            Special
                        </span>
                    </h2>

                    {/* Discount */}
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
                                    className="absolute -top-20 -left-10 text-[120px] md:text-[160px] font-bold opacity-5 text-white select-none"
                                    aria-hidden="true"
                                >
                                    10%
                                </div>

                                {/* Main Content */}
                                <div className="relative">
                                    <span className="text-5xl md:text-7xl font-light" style={{ color: '#00A9D9' }}>
                                        10%
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                        <span className="text-xl font-light text-gray-400">
                            Rabatt
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-base md:text-lg font-light text-gray-400 mb-8 max-w-2xl mx-auto">
                        Erleben Sie die Revolution der Hautpflege.
                        Gültig für alle HydraFacial® Behandlungen bis 31. Juli 2025.
                    </p>

                    {/* CTA Button */}
                    <a
                        href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3 text-white font-light tracking-widest uppercase text-sm transition-colors"
                        style={{ backgroundColor: '#00A9D9' }}
                    >
                        Jetzt buchen
                    </a>

                    {/* Features */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                        {[
                            { icon: "✨", label: "Sofort-Effekt" },
                            { icon: "💧", label: "Tiefenreinigung" },
                            { icon: "🌟", label: "Sanfte Behandlung" },
                            { icon: "⚡", label: "Keine Ausfallzeit" }
                        ].map((feature) => (
                            <div key={feature.label} className="flex flex-col items-center gap-2">
                                <span className="text-xl">{feature.icon}</span>
                                <span className="text-xs font-light text-gray-400 text-center">
                                    {feature.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <p className="text-xs font-light text-gray-500">
                            * Einführungsangebot gültig bis 31. Juli 2025
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
} 