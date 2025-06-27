"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center">
            {/* Clean Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50" />

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Hero Title */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-8 leading-tight">
                        <span className="block" style={{ color: 'var(--color-primary)' }}>
                            Professional
                        </span>
                        <span className="block mt-2" style={{ color: 'var(--color-secondary)' }}>
                            Beauty
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                        Professionelle Laser-Haarentfernung und innovative Kosmetikbehandlungen für Ihre natürliche Schönheit im Pongau.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800"
                        >
                            Termin vereinbaren
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <Link
                            href="#treatments"
                            className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-gray-300 text-gray-700 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400 hover:text-gray-900"
                        >
                            Behandlungen entdecken
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 