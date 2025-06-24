"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
            <div className="container relative z-10 py-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side - Modern Typography */}
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
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        className="inline-flex items-center gap-2 mb-6"
                                    >
                                        <Sparkles className="w-5 h-5" style={{ color: '#00A9D9' }} />
                                        <span className="text-xs font-light tracking-[0.3em] uppercase text-gray-400">
                                            Limited Edition
                                        </span>
                                    </motion.div>

                                    <h2 className="text-5xl md:text-7xl font-light text-white mb-6 leading-none">
                                        <span className="block">HydraFacial®</span>
                                        <span className="block mt-2" style={{ color: '#00A9D9' }}>
                                            Special
                                        </span>
                                    </h2>

                                    <div className="flex items-baseline gap-4 mb-8">
                                        <span className="text-6xl md:text-8xl font-light" style={{ color: '#00A9D9' }}>
                                            10%
                                        </span>
                                        <span className="text-2xl font-light text-gray-400">
                                            Rabatt
                                        </span>
                                    </div>

                                    <p className="text-lg font-light text-gray-400 mb-12 max-w-md">
                                        Erleben Sie die Revolution der Hautpflege.
                                        Gültig für alle HydraFacial® Behandlungen bis 31. Juli 2025.
                                    </p>

                                    <motion.a
                                        href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex items-center gap-4 group"
                                    >
                                        <span
                                            className="inline-flex items-center justify-center px-12 py-4 text-white font-light tracking-widest uppercase text-sm"
                                            style={{ backgroundColor: '#00A9D9' }}
                                        >
                                            Jetzt buchen
                                        </span>
                                        <span className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-gray-500 transition-colors">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M6 10H14M14 10L10 6M14 10L10 14" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 group-hover:text-white transition-colors" />
                                            </svg>
                                        </span>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Minimal Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative"
                        >
                            <div className="space-y-8">
                                <div className="text-center lg:text-left">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-xs font-light tracking-[0.3em] uppercase text-gray-400">
                                            Neu eingetroffen
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-light text-white mb-4">
                                        Modernste Technologie
                                    </h3>
                                    <p className="text-gray-400 font-light leading-relaxed">
                                        Wir freuen uns, Ihnen ab sofort die revolutionäre HydraFacial®
                                        Behandlung anbieten zu können. Mit unserem brandneuen Gerät
                                        erleben Sie die neueste Generation der Hautpflege.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { icon: "✨", label: "Sofort-Effekt" },
                                        { icon: "💧", label: "Tiefenreinigung" },
                                        { icon: "🌟", label: "Sanfte Behandlung" },
                                        { icon: "⚡", label: "Keine Ausfallzeit" }
                                    ].map((feature, index) => (
                                        <motion.div
                                            key={feature.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="text-2xl">{feature.icon}</span>
                                            <span className="text-sm font-light text-gray-400">
                                                {feature.label}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-gray-800">
                                    <p className="text-xs font-light text-gray-500 italic">
                                        * Einführungsangebot gültig bis 31. Juli 2025
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-10 -right-10 w-40 h-40 opacity-10"
                            >
                                <div className="w-full h-full border border-gray-800 rounded-full" />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 