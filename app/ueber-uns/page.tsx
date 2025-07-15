"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Heart, Shield, Users, Award, Sparkles } from "lucide-react";

export default function UeberUns() {
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
                                Über uns
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
                            Ihr vertrauensvoller Partner für professionelle Beauty-Behandlungen im Pongau
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-light">
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                <span>Seit 2020</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                <span>2000+ zufriedene Kunden</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                <span>5.0 Google Bewertung</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section with Image */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <Sparkles className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                    <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                        Unsere Geschichte
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                    Willkommen bei <span style={{ color: 'var(--color-secondary)' }}>Skinlux</span>
                                </h2>

                                <p className="text-lg text-gray-600 font-light mb-6 leading-relaxed">
                                    Seit unserer Gründung widmen wir uns der Aufgabe, Ihnen dabei zu helfen,
                                    Ihre natürliche Schönheit zu entfalten und Ihr Selbstvertrauen zu stärken.
                                </p>

                                <p className="text-lg text-gray-600 font-light mb-6 leading-relaxed">
                                    Als Medical Beauty Studio im Herzen des Pongaus kombinieren wir
                                    modernste Technologie mit persönlicher Betreuung, um Ihnen
                                    die bestmöglichen Ergebnisse zu garantieren.
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
                                        <Heart className="w-6 h-6" style={{ color: 'var(--color-secondary)' }} />
                                    </div>
                                    <p className="text-sm text-gray-600 font-light italic">
                                        &quot;Ihre Schönheit ist unsere Leidenschaft&quot;
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Studio Interior Image */}
                                <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src="/images/about/studio/interior.jpg"
                                        alt="Skinlux Studio Interior"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-sm font-light">Unser modernes Studio</p>
                                    </div>
                                </div>

                                {/* Decorative Element */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full opacity-50" />
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-30" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                Unser <span style={{ color: 'var(--color-secondary)' }}>Team</span>
                            </h2>
                            <p className="text-xl text-gray-600 font-light">
                                Unser professionelles Team für Ihre Schönheit
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    name: "Ebru Bicer",
                                    role: "Inhaberin",
                                    image: "/images/about/team/ebru.jpg"
                                },
                                {
                                    name: "Can Bicer",
                                    role: "Technik & Marketing",
                                    image: "/images/about/team/can.jpg"
                                },
                                {
                                    name: "Lucia",
                                    role: "Laser Spezialistin",
                                    image: "/images/about/team/lucia.jpg"
                                }
                            ].map((member) => (
                                <div key={member.name} className="group">
                                    <div className="relative aspect-square rounded-lg overflow-hidden mb-6">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        {member.role}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section with Background Image */}
            <section className="py-20 relative">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/about/studio/background.jpg"
                        alt="Beauty Background"
                        fill
                        className="object-cover opacity-10"
                    />
                </div>

                <div className="container relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                Unsere <span style={{ color: 'var(--color-secondary)' }}>Werte</span>
                            </h2>
                            <p className="text-xl text-gray-600 font-light">
                                Was uns antreibt und leitet
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Heart,
                                    title: "Fürsorge",
                                    description: "Wir behandeln jeden Kunden mit der gleichen Sorgfalt und Aufmerksamkeit, die wir uns selbst wünschen würden."
                                },
                                {
                                    icon: Shield,
                                    title: "Qualität",
                                    description: "Wir verwenden nur die besten Produkte und neueste Technologien für optimale Ergebnisse."
                                },
                                {
                                    icon: Users,
                                    title: "Gemeinschaft",
                                    description: "Als Teil der Pongau-Gemeinschaft sind wir stolz darauf, Ihnen vor Ort zu dienen."
                                }
                            ].map((value) => (
                                <div key={value.title} className="bg-white p-8 text-center group hover:shadow-lg transition-all duration-300">
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50 group-hover:scale-110 transition-transform">
                                        <value.icon
                                            className="w-8 h-8"
                                            style={{ color: 'var(--color-secondary)' }}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <h3 className="text-xl font-light mb-3" style={{ color: 'var(--color-primary)' }}>
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                Einblicke in unser <span style={{ color: 'var(--color-secondary)' }}>Studio</span>
                            </h2>
                            <p className="text-xl text-gray-600 font-light">
                                Moderne Ausstattung für beste Ergebnisse
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                            {[
                                {
                                    image: "/images/about/gallery/behandlungsraum.jpg",
                                    alt: "Behandlungsraum"
                                },
                                {
                                    image: "/images/about/gallery/empfang.jpg",
                                    alt: "Empfangsbereich"
                                },
                                {
                                    image: "/images/about/gallery/technologie.jpg",
                                    alt: "Moderne Technologie"
                                },
                                {
                                    image: "/images/about/gallery/entspannung.jpg",
                                    alt: "Entspannungsbereich"
                                }
                            ].map((item, index) => (
                                <div key={index} className="relative h-64 rounded-lg overflow-hidden group">
                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <p className="text-sm font-light">{item.alt}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-900 to-black p-12 md:p-16 text-white rounded-lg">
                            <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
                                <span style={{ color: 'white' }}>Warum</span> <span style={{ color: 'var(--color-secondary)' }}>Skinlux</span><span style={{ color: 'white' }}>?</span>
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { number: "2000+", label: "Zufriedene Kunden" },
                                    { number: "5★", label: "Google Bewertung" },
                                    { number: "95%", label: "Zufriedenheit" },
                                    { number: "5", label: "Jahre Erfahrung" }
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className="text-4xl font-light mb-3" style={{ color: 'var(--color-secondary)' }}>
                                            {stat.number}
                                        </div>
                                        <p className="text-gray-300 font-light text-sm">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-12 border-t border-gray-800">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        {[
                                            "Modernste Laser-Technologie",
                                            "Persönliche Betreuung",
                                            "Transparente Preise",
                                            "Zentrale Lage in Pottendorf"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }} />
                                                <span className="text-gray-300 font-light">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            "Erfahrene Beauty-Experten",
                                            "Individuelle Behandlungspläne",
                                            "Keine versteckten Kosten",
                                            "Flexible Terminvereinbarung"
                                        ].map((item) => (
                                            <div key={item} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-secondary)' }} />
                                                <span className="text-gray-300 font-light">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-white to-gray-50">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Bereit für Ihre <span style={{ color: 'var(--color-secondary)' }}>Verwandlung</span>?
                        </h2>
                        <p className="text-xl text-gray-600 font-light mb-10">
                            Vereinbaren Sie noch heute Ihre kostenlose Beratung und lernen Sie uns persönlich kennen.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800"
                            >
                                Termin buchen
                            </a>
                            <Link
                                href="/kontakt"
                                className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-gray-300 text-gray-700 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400 hover:text-gray-900"
                            >
                                Kontakt aufnehmen
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 