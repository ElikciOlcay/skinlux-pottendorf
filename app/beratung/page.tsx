"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, Users, Sparkles, Phone, Calendar } from "lucide-react";

const benefits = [
    {
        icon: Clock,
        title: "30 Minuten",
        description: "Ausführliche Beratung ohne Zeitdruck"
    },
    {
        icon: Users,
        title: "Persönlich",
        description: "Individuelle Analyse Ihrer Bedürfnisse"
    },
    {
        icon: Sparkles,
        title: "Unverbindlich",
        description: "Keine Verpflichtung, nur ehrliche Beratung"
    }
];

const consultationSteps = [
    {
        step: "01",
        title: "Anamnese",
        description: "Wir besprechen Ihre Hautziele und bisherige Erfahrungen"
    },
    {
        step: "02",
        title: "Hautanalyse",
        description: "Professionelle Analyse mit modernster Technologie"
    },
    {
        step: "03",
        title: "Behandlungsplan",
        description: "Individuelle Empfehlung basierend auf Ihrem Hauttyp"
    },
    {
        step: "04",
        title: "Preisübersicht",
        description: "Transparente Kostenaufstellung ohne versteckte Gebühren"
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

                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-light mb-6">
                            <span className="block" style={{ color: 'var(--color-primary)' }}>
                                Kostenlose
                            </span>
                            <span className="block mt-2" style={{ color: 'var(--color-secondary)' }}>
                                Beratung
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                            Beginnen Sie Ihre Verwandlung mit einer kostenlosen, unverbindlichen Beratung.
                            Wir analysieren Ihre Haut und erstellen einen individuellen Behandlungsplan.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800"
                            >
                                <Calendar className="w-4 h-4" />
                                Online Termin buchen
                            </a>
                            <a
                                href="tel:+436605721403"
                                className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-gray-300 text-gray-700 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400 hover:text-gray-900"
                            >
                                <Phone className="w-4 h-4" />
                                Anrufen: +43 660 57 21 403
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="text-center">
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
                            So läuft Ihre Beratung ab
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12">
                            {consultationSteps.map((step) => (
                                <div key={step.step} className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-sm font-light">
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

            {/* What's Included */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-light text-center mb-12" style={{ color: 'var(--color-primary)' }}>
                            Was ist in der Beratung inbegriffen
                        </h2>

                        <div className="space-y-6">
                            {[
                                "Professionelle Hautanalyse mit modernster Technologie",
                                "Individuelle Behandlungsempfehlung basierend auf Ihrem Hauttyp",
                                "Transparente Preisübersicht und Behandlungsplan",
                                "Beantwortung all Ihrer Fragen zu unseren Behandlungen",
                                "Keine versteckten Kosten oder Überraschungen",
                                "Persönliche Betreuung durch erfahrene Experten"
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

            {/* CTA Section */}
            <section className="py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                            Bereit für Ihre <span style={{ color: 'var(--color-secondary)' }}>Verwandlung</span>?
                        </h2>
                        <p className="text-xl text-gray-600 font-light mb-10">
                            Vereinbaren Sie noch heute Ihre kostenlose Beratung und machen Sie den ersten Schritt
                            zu der Haut, die Sie sich schon immer gewünscht haben.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800"
                            >
                                <Calendar className="w-4 h-4" />
                                Online Termin buchen
                            </a>
                            <a
                                href="tel:+436605721403"
                                className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-gray-300 text-gray-700 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400 hover:text-gray-900"
                            >
                                <Phone className="w-4 h-4" />
                                Anrufen: +43 660 57 21 403
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 