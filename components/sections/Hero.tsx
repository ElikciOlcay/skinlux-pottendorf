"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
// Removed unused imports

const heroContent = [
    {
        badge: "Laser Haarentfernung",
        title: "Dauerhafte",
        titleHighlight: "Haarfreiheit",
        subtitle: "Professionelle Laser-Haarentfernung mit modernster Diodenlaser-Technologie. Schmerzfrei, sicher und effektiv.",
    },
    {
        badge: "NEU: HydraFacial®",
        title: "Strahlende",
        titleHighlight: "Hautverjüngung",
        subtitle: "Revolutionäre Gesichtsbehandlung für sofortige Hydration und ein strahlendes Hautbild. Tiefenreinigung mit Sofort-Effekt.",
    }
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
        }, 6000); // Wechsel alle 6 Sekunden

        return () => clearInterval(interval);
    }, []);

    const current = heroContent[currentIndex];

    return (
        <section className="relative min-h-screen flex items-center hero-gradient">
            {/* Static Background - Optional */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/images/hero-background.jpg')", // OPTIONAL: Ein statisches Bild
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.05 // Sehr subtil
                }}
            />

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Navigation Dots */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-3">
                        {heroContent.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className="w-2 h-2 rounded-full transition-all duration-300"
                                style={{
                                    backgroundColor: index === currentIndex ? 'var(--color-secondary)' : 'var(--color-gray-300)',
                                    width: index === currentIndex ? '24px' : '8px'
                                }}
                            />
                        ))}
                    </div>

                    {/* Animated Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Badge */}
                            <div className="mb-16">
                                <div className="badge" style={{
                                    color: current.badge.includes('NEU') ? 'var(--color-secondary)' : 'var(--color-text-secondary)'
                                }}>
                                    {current.badge}
                                </div>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8" style={{ color: 'var(--color-primary)' }}>
                                {current.title}
                                <br />
                                <span style={{ color: 'var(--color-secondary)' }}>{current.titleHighlight}</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-light">
                                {current.subtitle}
                            </p>

                            {/* Google Reviews Trust Signal */}
                            <div className="flex items-center justify-center gap-6 mb-16">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-4 h-4 fill-current text-yellow-400"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 font-light">
                                        180+ Google Bewertungen
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-sm text-gray-600 font-light">
                                        Über 2000 zufriedene Kunden
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <a
                            href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center justify-center"
                        >
                            Termin vereinbaren
                        </a>
                        <Link href="#treatments" className="btn-secondary inline-flex items-center justify-center">
                            Behandlungen
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 