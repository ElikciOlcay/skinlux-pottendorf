"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    ExternalLink,
    Navigation,
    Star,
    Clock,
    Award,
} from "lucide-react";

const studios = [
    {
        id: "pottendorf",
        name: "Skinlux Pottendorf",
        address: {
            street: "Marktplatz 14",
            zip: "2486",
            city: "Pottendorf",
        },
        contact: {
            phone: "0664 / 91 88 632",
            email: "hey@skinlux.at",
        },
        image: "/images/about/studio/interior.jpg",
        website: "https://pottendorf.skinlux.at",
        rating: 5.0,
        reviews: 184,
        isCurrent: true,
        features: ["Hauptstandort", "Abendtermine", "Volles Behandlungsangebot"],
    },
    {
        id: "bischofshofen",
        name: "Skinlux Bischofshofen",
        address: {
            street: "Bahnhofstraße 17",
            zip: "5500",
            city: "Bischofshofen",
        },
        contact: {
            phone: "0660 / 57 21 403",
            email: "hello@skinlux.at",
        },
        image: "/images/about/studio/interior.jpg",
        website: "https://bischofshofen.skinlux.at",
        rating: 5.0,
        reviews: 229,
        features: ["Pongau", "Größtes Studio", "Ratgeber & Guides"],
    },
    {
        id: "pinzgau",
        name: "Skinlux Pinzgau",
        address: {
            street: "Leoganger Straße 12/Top 1c",
            zip: "5760",
            city: "Saalfelden",
        },
        contact: {
            phone: "0664 / 45 68 454",
            email: "pinzgau@skinlux.at",
        },
        image: "/images/about/studio/interior.jpg",
        website: "https://pinzgau.skinlux.at",
        rating: 5.0,
        reviews: 46,
        features: ["Pinzgau", "DIVINIA Eclibs", "HydraFacial"],
    },
];

export default function StandorteContent() {
    const [hoveredStudio, setHoveredStudio] = useState<string | null>(null);

    const formatPhone = (phone: string) => phone.replace(/\s/g, "").replace(/\//g, "");

    const getGoogleMapsUrl = (address: typeof studios[0]["address"]) => {
        const fullAddress = `${address.street}, ${address.zip} ${address.city}`;
        return `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-pink-50/30" />
                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-light mb-6 text-black">
                            Unsere <span style={{ color: "var(--color-secondary)" }}>Standorte</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
                            Skinlux betreibt drei Studios in Österreich. Wählen Sie den Standort,
                            der für Sie am besten erreichbar ist – alle mit Online-Terminbuchung.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {studios.map((studio, index) => (
                            <motion.article
                                key={studio.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredStudio(studio.id)}
                                onMouseLeave={() => setHoveredStudio(null)}
                                className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                                    studio.isCurrent ? "border-2 border-secondary/20" : "border border-gray-200"
                                }`}
                            >
                                <div className="relative h-64 md:h-72 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                                    <Image
                                        src={studio.image}
                                        alt={`${studio.name} – Skinlux Studio`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    {studio.isCurrent && (
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-light tracking-wide">
                                                Ihr Studio
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 md:p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-light mb-2 text-black">
                                                {studio.name}
                                            </h2>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm font-light">
                                                    {studio.address.street}, {studio.address.zip} {studio.address.city}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">{studio.rating}</span>
                                            <span className="text-xs text-gray-500">({studio.reviews})</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {studio.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-light"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Phone className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <a
                                                href={`tel:${formatPhone(studio.contact.phone)}`}
                                                className="text-gray-700 hover:text-secondary transition-colors font-light"
                                            >
                                                {studio.contact.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Mail className="w-4 h-4 text-gray-600" />
                                            </div>
                                            <a
                                                href={`mailto:${studio.contact.email}`}
                                                className="text-gray-700 hover:text-secondary transition-colors font-light"
                                            >
                                                {studio.contact.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <a
                                            href={studio.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {studio.isCurrent ? "Zur Startseite" : "Zur Website"}
                                        </a>
                                        <a
                                            href={getGoogleMapsUrl(studio.address)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-outline inline-flex items-center justify-center w-12 h-12"
                                            aria-label={`Route zu ${studio.name} anzeigen`}
                                        >
                                            <Navigation className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredStudio === studio.id ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-gradient-to-t from-secondary/10 to-transparent pointer-events-none"
                                />
                            </motion.article>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mt-16"
                    >
                        <div className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-lg border border-gray-200">
                            <div className="mb-6">
                                <Award className="w-12 h-12 mx-auto mb-4 text-secondary" />
                                <h3 className="text-2xl md:text-3xl font-light mb-4 text-black">
                                    Übersicht auf skinlux.at
                                </h3>
                                <p className="text-gray-600 font-light leading-relaxed mb-4">
                                    Alle Standorte, Behandlungen und Ratgeber finden Sie auch auf unserer
                                    zentralen Website.
                                </p>
                                <a
                                    href="https://www.skinlux.at/standorte"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-500 hover:text-black transition-colors"
                                >
                                    www.skinlux.at/standorte
                                </a>
                            </div>
                            <Link href="/beratung" className="btn-primary inline-flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Kostenlose Beratung buchen
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
