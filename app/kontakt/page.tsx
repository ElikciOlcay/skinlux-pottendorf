"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, Calendar, MapPin, Clock, Phone, Mail } from "lucide-react";

export default function Kontakt() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-white to-gray-50">
                <div className="container">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück zur Startseite
                    </Link>

                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-light mb-6">
                            <span className="block" style={{ color: 'var(--color-primary)' }}>
                                Kontakt
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light leading-relaxed max-w-3xl mx-auto">
                            Wir freuen uns auf Ihre Nachricht
                        </p>

                        <div className="inline-flex items-center gap-4 text-sm text-gray-500 font-light">
                            <Phone className="w-4 h-4" />
                            <span>+43 664 91 88 632</span>
                            <span className="text-gray-300">|</span>
                            <Mail className="w-4 h-4" />
                            <span>hey@skinlux.at</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Options */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-light text-center mb-16" style={{ color: 'var(--color-primary)' }}>
                            Wählen Sie Ihre bevorzugte <span style={{ color: 'var(--color-secondary)' }}>Kontaktmethode</span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Online Booking */}
                            <div className="group bg-white p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                                <div className="w-14 h-14 mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
                                    <Calendar className="w-7 h-7" style={{ color: 'var(--color-secondary)' }} />
                                </div>
                                <h3 className="text-xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                                    Online Termin
                                </h3>
                                <p className="text-gray-600 font-light mb-6 text-sm">
                                    24/7 verfügbar - Buchen Sie Ihren Wunschtermin direkt online
                                </p>
                                <a
                                    href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-light text-black hover:text-gray-600 transition-colors group"
                                >
                                    Jetzt buchen
                                    <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>

                            {/* WhatsApp */}
                            <div className="group bg-white p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                                <div className="w-14 h-14 mb-6 rounded-full flex items-center justify-center bg-green-50">
                                    <MessageCircle className="w-7 h-7 text-green-600" />
                                </div>
                                <h3 className="text-xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                                    WhatsApp
                                </h3>
                                <p className="text-gray-600 font-light mb-6 text-sm">
                                    Schnell & persönlich - Schreiben Sie uns direkt
                                </p>
                                <a
                                    href="https://wa.me/436649188632?text=Hallo%20Skinlux!%20Ich%20möchte%20gerne%20einen%20Termin%20vereinbaren."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-light text-green-600 hover:text-green-700 transition-colors group"
                                >
                                    WhatsApp öffnen
                                    <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>

                            {/* Phone */}
                            <div className="group bg-white p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                                <div className="w-14 h-14 mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                    <Phone className="w-7 h-7" style={{ color: 'var(--color-primary)' }} />
                                </div>
                                <h3 className="text-xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                                    Anruf
                                </h3>
                                <p className="text-gray-600 font-light mb-6 text-sm">
                                    Persönliche Beratung - Wir sind für Sie da
                                </p>
                                <a
                                    href="tel:+436649188632"
                                    className="inline-flex items-center gap-2 text-sm font-light text-black hover:text-gray-600 transition-colors group"
                                >
                                    +43 664 91 88 632
                                    <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location & Hours */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Location */}
                            <div>
                                <h3 className="text-2xl font-light mb-8" style={{ color: 'var(--color-primary)' }}>
                                    Besuchen Sie uns
                                </h3>
                                <div className="bg-white p-8 h-full">
                                    <div className="flex items-start gap-4 mb-6">
                                        <MapPin className="w-6 h-6 mt-1" style={{ color: 'var(--color-secondary)' }} />
                                        <div>
                                            <p className="text-lg font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                                Skinlux Medical Beauty
                                            </p>
                                            <p className="text-gray-600 font-light">
                                                Dr. Heinz-Fischer-Straße 3/2<br />
                                                2486 Pottendorf<br />
                                                Österreich
                                            </p>
                                        </div>
                                    </div>

                                    {/* Map */}
                                    <div className="relative h-64 bg-gray-100 overflow-hidden rounded-lg">
                                        <iframe
                                            src="https://maps.google.com/maps?q=Dr.%20Heinz-Fischer-Straße%203/2,%202486%20Pottendorf,%20Austria&output=embed"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>

                                    <p className="text-sm text-gray-500 font-light mt-4 italic">
                                        Kostenlose Parkplätze direkt vor dem Studio
                                    </p>
                                </div>
                            </div>

                            {/* Opening Hours */}
                            <div>
                                <h3 className="text-2xl font-light mb-8" style={{ color: 'var(--color-primary)' }}>
                                    Öffnungszeiten
                                </h3>
                                <div className="bg-white p-8 h-full">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Montag</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 18:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Dienstag</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 18:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Mittwoch</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 18:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Donnerstag</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 17:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Freitag</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 17:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Samstag</span>
                                            <span className="text-gray-400 font-light">Geschlossen</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-gray-600 font-light">Sonntag</span>
                                            <span className="text-gray-400 font-light">Geschlossen</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <Clock className="w-5 h-5 mt-0.5" style={{ color: 'var(--color-secondary)' }} />
                                            <div>
                                                <p className="text-sm font-light mb-1" style={{ color: 'var(--color-primary)' }}>
                                                    Flexible Termine
                                                </p>
                                                <p className="text-sm text-gray-600 font-light">
                                                    Termine nach Vereinbarung auch außerhalb der regulären Öffnungszeiten möglich
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Wir freuen uns auf <span style={{ color: 'var(--color-secondary)' }}>Sie</span>
                        </h2>
                        <p className="text-xl text-gray-600 font-light mb-10">
                            Haben Sie Fragen oder möchten Sie einen Termin vereinbaren?
                            Kontaktieren Sie uns - wir sind gerne für Sie da.
                        </p>
                        <a
                            href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800"
                        >
                            Jetzt Termin buchen
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
} 