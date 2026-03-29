'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Briefcase,
    Users,
    Heart,
    Stethoscope,
    FileText,
    Mail,
    MessageCircle,
    CheckCircle,
    Sparkles,
    ShieldCheck
} from 'lucide-react';

export default function KarriereContent() {
    const [isApplicationSent, setIsApplicationSent] = useState(false);

    return (
        <main className="min-h-screen bg-white">
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
                        <div className="inline-flex items-center gap-2 mb-6">
                            <Briefcase className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                Karriere bei Skinlux
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-light mb-6 text-black">
                            Werde Teil unseres Teams
                        </h1>

                        <div className="bg-white/80 backdrop-blur-sm p-8 shadow-sm max-w-3xl mx-auto">
                            <p className="text-lg text-gray-600 font-light leading-relaxed">
                                Skinlux Pottendorf ist ein modernes Premium Kosmetikstudio mit Fokus auf apparative Behandlungen und sichtbare Ergebnisse.
                                Wir suchen eine ausgebildete Kosmetikerin zur Verstärkung unseres Teams.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white border border-gray-100 shadow-sm p-8 md:p-10">
                            <div className="mb-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <h2 className="text-3xl font-light text-black">Kosmetikerin (m/w/d)</h2>
                                    <span
                                        className="text-[0.55rem] font-light tracking-widest uppercase px-2 py-0.5 text-white shrink-0"
                                        style={{ backgroundColor: 'var(--color-secondary)' }}
                                    >
                                        Gesucht
                                    </span>
                                </div>
                                <p className="text-lg text-gray-600 font-light leading-relaxed">
                                    Du arbeitest in einem hochwertigen Studio-Umfeld mit Fokus auf moderne Ästhetik und präzise Behandlungsergebnisse.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="p-6 bg-gray-50 border border-gray-100">
                                    <h3 className="text-lg font-light text-black mb-4">Deine Aufgaben</h3>
                                    <div className="grid gap-3">
                                        {[
                                            { icon: Sparkles, text: "Durchführung von Laser Haarentfernung, Hydrafacial und Microneedling (SkinPen)." },
                                            { icon: Users, text: "Kundenberatung vor, während und nach der Behandlung." },
                                            { icon: Stethoscope, text: "Präzise Hautanalysen und individuelle Empfehlungen." },
                                            { icon: FileText, text: "Dokumentation und Sicherstellung eines hochwertigen Kundenerlebnisses." }
                                        ].map((item) => (
                                            <div key={item.text} className="flex items-start gap-3">
                                                <item.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} />
                                                <p className="text-gray-600 font-light">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50 border border-gray-100">
                                    <h3 className="text-lg font-light text-black mb-4">Das bringst du mit</h3>
                                    <div className="grid gap-3">
                                        {[
                                            "Abgeschlossene Kosmetikausbildung.",
                                            "Erfahrung in apparativer Kosmetik von Vorteil.",
                                            "Gepflegtes, professionelles Auftreten.",
                                            "Zuverlässigkeit und eigenständige Arbeitsweise."
                                        ].map((item) => (
                                            <div key={item} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} />
                                                <p className="text-gray-600 font-light">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-5 mb-8">
                                {[
                                    { icon: Sparkles, title: 'Premium Studio', text: 'Moderne Ästhetik und hochwertige Prozesse.' },
                                    { icon: ShieldCheck, title: 'Weiterbildung', text: 'Klare Standards und laufende Schulungen.' },
                                    { icon: Heart, title: 'Vergütung', text: 'Attraktive Bezahlung plus Bonusmöglichkeiten.' }
                                ].map((item) => (
                                    <div key={item.title} className="p-5 border border-gray-100 bg-white">
                                        <item.icon className="w-5 h-5 mb-3" style={{ color: 'var(--color-secondary)' }} />
                                        <h4 className="text-black font-light mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-600 font-light">{item.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <p className="text-gray-600 font-light mb-5">Bewerbung per WhatsApp oder E-Mail:</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="https://wa.me/436649188632"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary inline-flex items-center justify-center gap-3"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Bewerbung per WhatsApp
                                    </a>
                                    <a
                                        href={`mailto:hey@skinlux.at?subject=${encodeURIComponent('Bewerbung: Kosmetikerin (m/w/d) - Pottendorf')}&body=${encodeURIComponent('Hallo,\r\n\r\nIch interessiere mich für die Stelle als Kosmetikerin (m/w/d) in Pottendorf.\r\n\r\nAnbei finden Sie meinen Lebenslauf und eine kurze Motivation.\r\n\r\nVielen Dank für Ihre Zeit!\r\n\r\nMit freundlichen Grüßen')}`}
                                        onClick={() => setIsApplicationSent(true)}
                                        className="btn-primary inline-flex items-center justify-center gap-3"
                                    >
                                        <Mail className="w-4 h-4" />
                                        hey@skinlux.at
                                    </a>
                                </div>

                                {isApplicationSent && (
                                    <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
                                        <div className="flex items-center justify-center gap-2 text-gray-600">
                                            <CheckCircle className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
                                            <span className="font-light">E-Mail-Client geöffnet. Viel Erfolg bei deiner Bewerbung.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-8 text-sm text-gray-500 font-light">
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                <span>Premium Brand</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                <span>Moderne Ästhetik</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                <span>Schneller Bewerbungsprozess</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
