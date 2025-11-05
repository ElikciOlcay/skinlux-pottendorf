"use client";

import { motion } from "framer-motion";
import { Zap, Tag, ArrowRight } from "lucide-react";

const offers = [
    {
        id: 'laser',
        title: "Laser Haarentfernung",
        subtitle: "",
        description: "50% Rabatt auf die ersten 2 Laser-Haarentfernung Behandlungen. Dauerhafte Haarfreiheit zum halben Preis. Buche einfach deinen Termin, der Rabatt wird an der Kasse abgezogen.",
        price: "50%",
        originalPrice: null,
        discount: "Rabatt",
        limit: "Auf die ersten 2 Behandlungen",
        icon: Zap,
        href: '/behandlungen/laser-haarentfernung',
        color: 'var(--color-secondary)',
        badge: "NEU"
    }
];

export default function SpecialOffers() {
    return (
        <section id="angebote" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
                <div className="grid md:grid-cols-1 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {offers.map((offer, index) => {
                        const IconComponent = offer.icon;
                        return (
                            <motion.div
                                key={offer.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative bg-white border-2 border-gray-200 hover:border-secondary/50 transition-all duration-300 group overflow-hidden"
                            >
                                {/* Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span
                                        className="text-xs font-light tracking-widest uppercase px-3 py-1 text-white"
                                        style={{ backgroundColor: offer.color }}
                                    >
                                        {offer.badge}
                                    </span>
                                </div>

                                {/* Content */}
                                <a
                                    href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6 md:p-8"
                                >
                                    <div className="flex items-start gap-4 md:gap-6 mb-6">
                                        <div
                                            className="w-16 h-16 flex-shrink-0 flex items-center justify-center"
                                            style={{ backgroundColor: `${offer.color}15` }}
                                        >
                                            <IconComponent
                                                className="w-8 h-8"
                                                style={{ color: offer.color }}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl md:text-2xl font-light mb-1 text-black">
                                                {offer.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 font-light mb-6 leading-relaxed">
                                        {offer.description}
                                    </p>

                                    <div className="flex items-baseline gap-3 mb-4">
                                        <span className="text-3xl md:text-4xl font-light" style={{ color: offer.color }}>
                                            {offer.price}
                                        </span>
                                        <span className="text-lg font-light text-gray-600">
                                            {offer.discount}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm font-light text-gray-600 mb-6">
                                        <span>{offer.limit}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-base md:text-lg font-light tracking-widest uppercase py-3 px-6 border-2 transition-all duration-300 hover:bg-gray-50" style={{ color: offer.color, borderColor: offer.color }}>
                                        <span>Jetzt buchen</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>

                                <div
                                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ backgroundColor: offer.color }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

