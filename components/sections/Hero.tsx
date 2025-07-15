"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Hintergrund-Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/videos/hydrafacial-hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                poster="/public/images/about/studio/interior.jpg"
            />

            {/* Dunkleres Overlay für bessere Lesbarkeit */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            <div className="container relative z-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Hero Title */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-8 leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
                        <span className="block" style={{ color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
                            Medical
                        </span>
                        <span className="block mt-2" style={{ color: 'var(--color-secondary)', textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
                            Beauty
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-100 mb-12 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                        Professionelle Laser-Haarentfernung und innovative Kosmetikbehandlungen für Ihre natürliche Schönheit im Pongau.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                        >
                            Termin vereinbaren
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <Link
                            href="#treatments"
                            className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-gray-300 text-gray-100 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
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