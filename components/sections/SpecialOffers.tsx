"use client";

import { motion } from "framer-motion";
import { Tag, ArrowRight, Sparkles } from "lucide-react";

const offers: never[] = [];

export default function SpecialOffers() {
    if (offers.length === 0) {
        return null;
    }

    return (
        <section id="angebote" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Tag className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
                        <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500">
                            Aktuelle Angebote
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 text-black">
                        Spezial Angebote
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Exklusive Behandlungen für deine natürliche Schönheit
                    </p>
                </motion.div>

                {/* Offers Grid */}
                <div className="max-w-5xl mx-auto">
                    {offers.map((offer, index) => {
                        const IconComponent = offer.icon;
                        return (
                            <motion.div
                                key={offer.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-100"
                            >
                                {/* Decorative Background Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-secondary) 0%, transparent 50%),
                                                         radial-gradient(circle at 80% 80%, var(--color-secondary) 0%, transparent 50%)`
                                    }} />
                                </div>

                                {/* Badge */}
                                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
                                    <span
                                        className="text-[0.625rem] md:text-xs font-light tracking-widest uppercase px-3 py-1.5 md:px-4 md:py-2 text-white rounded-full shadow-lg"
                                        style={{ backgroundColor: offer.color }}
                                    >
                                        {offer.badge}
                                    </span>
                                </div>

                                <a
                                    href={offer.href}
                                    className="block p-8 md:p-12 relative z-10"
                                >
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        {/* Left Side - Content */}
                                        <div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div
                                                    className="w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-2xl shadow-lg"
                                                    style={{ backgroundColor: offer.color }}
                                                >
                                                    <IconComponent
                                                        className="w-10 h-10 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl md:text-3xl font-light mb-2 text-black">
                                                        {offer.title}
                                                    </h3>
                                                    <p className="text-sm font-light text-gray-500 uppercase tracking-wider">
                                                        {offer.subtitle}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 font-light mb-8 leading-relaxed text-lg">
                                                {offer.description}
                                            </p>

                                            <div className="flex items-center gap-2 text-sm font-light text-gray-600 mb-8 pb-8 border-b border-gray-200">
                                                <Sparkles className="w-4 h-4" />
                                                <span>{offer.limit}</span>
                                            </div>

                                            <div className="flex items-center gap-3 text-base md:text-lg font-light tracking-widest uppercase py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg group-hover:scale-105" style={{ color: 'white', backgroundColor: 'var(--color-secondary)' }}>
                                                <span>Weitere Infos</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Right Side - Price Highlight */}
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="text-center p-8 rounded-2xl" style={{ backgroundColor: 'rgba(184, 176, 169, 0.1)' }}>
                                                <div className="text-6xl md:text-7xl font-light mb-2" style={{ color: offer.color }}>
                                                    {offer.price}
                                                </div>
                                                <div className="text-xl md:text-2xl font-light text-gray-700 mb-4">
                                                    {offer.discount}
                                                </div>
                                                <div className="text-sm font-light text-gray-500 uppercase tracking-wider">
                                                    Auf die ersten 2 Behandlungen
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                {/* Hover Effect Border */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `linear-gradient(90deg, var(--color-secondary) 0%, transparent 100%)`
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
