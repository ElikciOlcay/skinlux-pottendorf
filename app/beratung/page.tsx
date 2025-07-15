"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, Users, Zap, Phone, Calendar, Shield, Star, Award, Heart } from "lucide-react";

const benefits = [
    {
        icon: Zap,
        title: "Kostenlose Probebehandlung",
        description: "Testen Sie unsere Laser-Technologie völlig unverbindlich"
    },
    {
        icon: Clock,
        title: "30 Minuten",
        description: "Ausführliche Beratung inkl. Hauttyp-Bestimmung und Testbehandlung"
    },
    {
        icon: Shield,
        title: "FDA-zertifiziert",
        description: "Modernste Diodenlaser-Technologie für sichere Ergebnisse"
    }
];

const consultationSteps = [
    {
        step: "01",
        title: "Hauttyp-Bestimmung",
        description: "Bestimmung Ihres Hauttyps und Haartyps für optimale Behandlung"
    },
    {
        step: "02",
        title: "Aufklärung",
        description: "Detaillierte Erklärung der Laser-Technologie und des Behandlungsablaufs"
    },
    {
        step: "03",
        title: "Probebehandlung",
        description: "Kostenlose Testbehandlung an einer kleinen Hautstelle"
    },
    {
        step: "04",
        title: "Behandlungsplan",
        description: "Individueller Plan mit Anzahl der Sitzungen und transparenten Preisen"
    }
];

const faq = [
    {
        question: "Ist die Laser-Haarentfernung schmerzhaft?",
        answer: "Dank unseres integrierten Kühlsystems ist die Behandlung deutlich angenehmer als herkömmliche Methoden. Viele Kunden beschreiben es als leichtes Kribbeln."
    },
    {
        question: "Wie viele Behandlungen brauche ich?",
        answer: "In der Regel 6-8 Sitzungen für optimale Ergebnisse, abhängig von Hauttyp, Haarfarbe und Körperregion. Wir erstellen einen individuellen Plan."
    },
    {
        question: "Für welche Hauttypen ist es geeignet?",
        answer: "Unsere moderne Diodenlaser-Technologie ist für alle Hauttypen geeignet, auch für dunklere Haut und helle Härchen."
    },
    {
        question: "Was kostet die Laser-Haarentfernung?",
        answer: "Die Preise variieren je nach Körperregion. Genaue Preise erfahren Sie in der kostenlosen Beratung - transparent und ohne versteckte Kosten."
    }
];

export default function Beratung() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32">
                <div className="container">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück zur Startseite
                    </Link>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-secondary/10">
                                    <Zap className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                    <span className="text-sm font-light tracking-wider uppercase" style={{ color: 'var(--color-secondary)' }}>
                                        Kostenlose Probebehandlung
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-light mb-6">
                                    <span className="block" style={{ color: 'var(--color-primary)' }}>
                                        Laser-Haarentfernung
                                    </span>
                                    <span className="block mt-2" style={{ color: 'var(--color-secondary)' }}>
                                        Kostenlos testen
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                                    Überzeugen Sie sich selbst von unserer modernen Diodenlaser-Technologie.
                                    Kostenlose Beratung, Hauttyp-Bestimmung und Probebehandlung - völlig unverbindlich.
                                </p>

                                {/* Trust Badges */}
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--color-secondary)' }} />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 font-light">
                                        Über 2000 zufriedene Kunden
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        Probebehandlung buchen
                                    </a>
                                    <a
                                        href="tel:+436649188632"
                                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-gray-300 text-gray-700 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400 hover:text-gray-900"
                                    >
                                        <Phone className="w-4 h-4" />
                                        +43 664 91 88 632
                                    </a>
                                </div>

                                <p className="mt-6 text-sm text-gray-600 font-light">
                                    <span className="inline-block w-2 h-2 bg-secondary rounded-full mr-2"></span>
                                    100% kostenlos & unverbindlich
                                </p>
                            </div>

                            {/* Right Content - Image */}
                            <div className="relative">
                                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-xl shadow-lg">
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundImage: "url('/images/gallery/treatment-laser.jpg')",
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundColor: '#f5f5f5'
                                        }}
                                    />
                                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <p className="text-sm font-light">FDA-zertifiziert</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                            Warum <span style={{ color: 'var(--color-secondary)' }}>Skinlux</span>?
                        </h2>
                        <p className="text-xl text-gray-600 font-light">
                            Modernste Technologie trifft auf jahrelange Erfahrung
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="text-center bg-white p-8 rounded-lg shadow-sm">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: 'rgba(240, 163, 188, 0.1)' }}>
                                    <benefit.icon
                                        className="w-8 h-8"
                                        style={{ color: 'var(--color-secondary)' }}
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <h3 className="text-xl font-light mb-3" style={{ color: 'var(--color-primary)' }}>
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 font-light">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Consultation Process */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-light text-center mb-16" style={{ color: 'var(--color-primary)' }}>
                            So läuft Ihre <span style={{ color: 'var(--color-secondary)' }}>Probebehandlung</span> ab
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12">
                            {consultationSteps.map((step) => (
                                <div key={step.step} className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="w-12 h-12 rounded-full text-white flex items-center justify-center text-sm font-light"
                                            style={{ backgroundColor: 'var(--color-secondary)' }}
                                        >
                                            {step.step}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-light mb-3" style={{ color: 'var(--color-primary)' }}>
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 font-light">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-light text-center mb-12" style={{ color: 'var(--color-primary)' }}>
                            Häufige <span style={{ color: 'var(--color-secondary)' }}>Fragen</span>
                        </h2>

                        <div className="space-y-8">
                            {faq.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-light mb-3" style={{ color: 'var(--color-primary)' }}>
                                        {item.question}
                                    </h3>
                                    <p className="text-gray-600 font-light leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-light text-center mb-12" style={{ color: 'var(--color-primary)' }}>
                            Was ist <span style={{ color: 'var(--color-secondary)' }}>inbegriffen</span>
                        </h2>

                        <div className="space-y-6">
                            {[
                                "Professionelle Hauttyp- und Haartyp-Analyse",
                                "Kostenlose Probebehandlung an kleiner Hautstelle",
                                "Detaillierte Erklärung der Laser-Technologie",
                                "Individueller Behandlungsplan mit Zeitrahmen",
                                "Transparente Preisübersicht ohne versteckte Kosten",
                                "Beantwortung all Ihrer Fragen zur Laser-Haarentfernung"
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <CheckCircle
                                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                                        style={{ color: 'var(--color-secondary)' }}
                                        strokeWidth={1.5}
                                    />
                                    <p className="text-gray-600 font-light text-lg">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-black text-white">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
                            Unsere <span style={{ color: 'var(--color-secondary)' }}>Ergebnisse</span>
                        </h2>

                        <div className="grid md:grid-cols-4 gap-8 text-center">
                            {[
                                { number: "2000+", label: "Zufriedene Kunden", icon: Users },
                                { number: "99%", label: "Zufriedenheitsrate", icon: Heart },
                                { number: "5", label: "Jahre Erfahrung", icon: Award },
                                { number: "5.0", label: "Google Bewertung", icon: Star }
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <stat.icon className="w-8 h-8 mx-auto mb-4" style={{ color: 'var(--color-secondary)' }} />
                                    <div className="text-3xl font-light mb-2" style={{ color: 'var(--color-secondary)' }}>
                                        {stat.number}
                                    </div>
                                    <div className="text-sm font-light text-gray-400">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Bereit für <span style={{ color: 'var(--color-secondary)' }}>dauerhafte Haarfreiheit</span>?
                        </h2>
                        <p className="text-xl text-gray-600 font-light mb-10">
                            Vereinbaren Sie noch heute Ihre kostenlose Probebehandlung und überzeugen Sie sich selbst
                            von unserer modernen Laser-Technologie.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800"
                            >
                                <Calendar className="w-4 h-4" />
                                Kostenlose Probebehandlung buchen
                            </a>
                            <a
                                href="tel:+436649188632"
                                className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-gray-300 text-gray-700 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400 hover:text-gray-900"
                            >
                                <Phone className="w-4 h-4" />
                                Direkt anrufen
                            </a>
                        </div>

                        <p className="mt-8 text-sm text-gray-500 font-light">
                            100% kostenlos • Keine Verpflichtung • Individuelle Beratung
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
} 