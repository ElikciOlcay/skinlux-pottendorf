"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Users, Sparkles } from "lucide-react";

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

export default function Consultation() {
    return (
        <section id="consultation" className="section-spacing bg-gray-50">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Kostenlose Beratung
                    </span>
                    <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                        Ihr Weg zu <span style={{ color: 'var(--color-secondary)' }}>perfekter Haut</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                        Beginnen Sie Ihre Verwandlung mit einer kostenlosen, unverbindlichen Beratung
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-light mb-8" style={{ color: 'var(--color-primary)' }}>
                            Was Sie erwartet:
                        </h3>

                        <div className="space-y-6 mb-12">
                            {[
                                "Professionelle Hautanalyse mit modernster Technologie",
                                "Individuelle Behandlungsempfehlung basierend auf Ihrem Hauttyp",
                                "Transparente Preisübersicht und Behandlungsplan",
                                "Beantwortung all Ihrer Fragen zu unseren Behandlungen",
                                "Keine versteckten Kosten oder Überraschungen"
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle
                                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                                        style={{ color: 'var(--color-secondary)' }}
                                        strokeWidth={1.5}
                                    />
                                    <p className="text-gray-600 font-light">{item}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center justify-center"
                            >
                                Jetzt Termin vereinbaren
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid gap-8"
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-8 border border-gray-100"
                            >
                                <div className="flex items-start gap-6">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center"
                                        style={{ backgroundColor: 'rgba(240, 163, 188, 0.1)' }}
                                    >
                                        <benefit.icon
                                            className="w-6 h-6"
                                            style={{ color: 'var(--color-secondary)' }}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                            {benefit.title}
                                        </h4>
                                        <p className="text-gray-600 font-light">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-20"
                >
                    <div className="max-w-3xl mx-auto bg-white p-12 border border-gray-100">
                        <h3 className="text-2xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                            Bereit für Ihre <span style={{ color: 'var(--color-secondary)' }}>Verwandlung</span>?
                        </h3>
                        <p className="text-gray-600 font-light mb-8">
                            Vereinbaren Sie noch heute Ihre kostenlose Beratung und machen Sie den ersten Schritt
                            zu der Haut, die Sie sich schon immer gewünscht haben.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center justify-center"
                            >
                                Online buchen
                            </a>
                            <a
                                href="tel:+436605721403"
                                className="btn-secondary inline-flex items-center justify-center"
                            >
                                Anrufen: +43 660 57 21 403
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 