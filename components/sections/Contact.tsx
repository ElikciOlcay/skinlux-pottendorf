"use client";

import { motion } from 'framer-motion';
import { MessageCircle, Calendar, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <section id="kontakt" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Kontakt
                    </span>
                    <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                        Jetzt <span style={{ color: 'var(--color-secondary)' }}>Termin</span> vereinbaren
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                        Wählen Sie Ihre bevorzugte Buchungsmethode
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    {/* Booking Options */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Online Booking */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-10 text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(167, 139, 250, 0.1)' }}>
                                <Calendar className="w-8 h-8" style={{ color: 'var(--color-secondary)' }} />
                            </div>
                            <h3 className="text-2xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                                Online Buchung
                            </h3>
                            <p className="text-gray-600 font-light mb-8">
                                Buchen Sie Ihren Wunschtermin direkt online. Wählen Sie Behandlung, Datum und Uhrzeit - ganz einfach und bequem.
                            </p>

                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 text-white text-sm font-light tracking-widest uppercase transition-all"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                            >
                                <Calendar className="w-4 h-4" />
                                Online buchen
                            </a>

                            <p className="mt-4 text-sm text-gray-500 font-light">
                                24/7 verfügbar
                            </p>
                        </motion.div>

                        {/* WhatsApp Booking */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-10 text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-green-50">
                                <MessageCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                                WhatsApp Buchung
                            </h3>
                            <p className="text-gray-600 font-light mb-8">
                                Schreiben Sie uns direkt auf WhatsApp. Wir antworten schnellstmöglich und vereinbaren gerne einen Termin mit Ihnen.
                            </p>

                            <a
                                href="https://wa.me/436649188632?text=Hallo%20Skinlux!%20Ich%20möchte%20gerne%20einen%20Termin%20vereinbaren."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 text-white text-sm font-light tracking-widest uppercase transition-all hover:bg-green-700"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Via WhatsApp
                            </a>

                            <p className="mt-4 text-sm text-gray-500 font-light">
                                +43 664 91 88 632
                            </p>
                        </motion.div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-10"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-100">
                                    <MapPin className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        Standort
                                    </h4>
                                    <p className="text-gray-600 font-light">
                                        Dr. Heinz-Fischer-Straße 3/2<br />
                                        2486 Pottendorf<br />
                                        Österreich
                                    </p>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
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
                        </motion.div>

                        {/* Opening Hours */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-10"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-100">
                                    <Clock className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                                        Öffnungszeiten
                                    </h4>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Montag</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 18:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Dienstag</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 18:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Mittwoch</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 18:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Donnerstag</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 17:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Freitag</span>
                                            <span className="font-light" style={{ color: 'var(--color-primary)' }}>
                                                9:00 - 17:00
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-gray-600 font-light">Samstag</span>
                                            <span className="text-gray-400 font-light">Geschlossen</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600 font-light">Sonntag</span>
                                            <span className="text-gray-400 font-light">Geschlossen</span>
                                        </div>
                                    </div>

                                    <p className="mt-6 text-sm text-gray-500 font-light italic">
                                        Termine nach Vereinbarung auch außerhalb der Öffnungszeiten möglich
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Note */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mt-12"
                    >
                        <p className="text-sm text-gray-500 font-light">
                            Haben Sie Fragen? Rufen Sie uns gerne an:
                            <a href="tel:+436649188632" className="ml-2 underline" style={{ color: 'var(--color-primary)' }}>
                                +43 664 91 88 632
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact; 