"use client";

import Link from "next/link";

export default function Hero() {
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
                    {/* Content */}
                    <div>
                        {/* Badge */}
                        <div className="mb-8 md:mb-16">
                            <div className="badge text-xs md:text-sm" style={{
                                color: 'var(--color-secondary)'
                            }}>
                                Medical Beauty
                            </div>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 md:mb-8 leading-tight" style={{ color: 'var(--color-primary)' }}>
                            Timeless<br />
                            <span style={{ color: 'var(--color-secondary)' }}>Beauty</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-light">
                            Professionelle Laser-Haarentfernung und innovative Kosmetikbehandlungen für Ihre Schönheit im Pongau.
                        </p>

                        {/* Google Reviews Trust Signal */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-3 h-3 md:w-4 md:h-4 fill-current text-yellow-400"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs md:text-sm text-gray-600 font-light">
                                    180+ Google Bewertungen
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></span>
                                <span className="text-xs md:text-sm text-gray-600 font-light">
                                    Über 2000 zufriedene Kunden
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-4 md:gap-6 justify-center">
                        <a
                            href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center justify-center w-full sm:w-auto"
                        >
                            Termin vereinbaren
                        </a>
                        <Link href="#treatments" className="btn-secondary inline-flex items-center justify-center w-full sm:w-auto">
                            Behandlungen
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 