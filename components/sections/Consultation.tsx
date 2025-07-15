"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Consultation() {
    return (
        <section id="consultation" className="py-20 bg-gray-50">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Section Header */}
                    <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                        Kostenlose <span style={{ color: 'var(--color-secondary)' }}>Beratung</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 font-light">
                        Beginnen Sie Ihre Verwandlung mit einer kostenlosen, unverbindlichen Beratung
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href="/beratung"
                            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800"
                        >
                            Mehr erfahren
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-gray-300 text-gray-700 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400 hover:text-gray-900"
                        >
                            Termin buchen
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
} 