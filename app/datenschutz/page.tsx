"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Users, Database, Clock, Mail } from 'lucide-react';
import { useRef } from 'react';

export default function DatenschutzPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const datenschutzSections = [
        {
            icon: Database,
            title: "Automatische Datenspeicherung",
            content: (
                <>
                    <p className="mb-4">
                        Wenn Sie unsere Website besuchen, werden automatisch Informationen allgemeiner Natur erfasst.
                        Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete
                        Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches.
                    </p>
                    <p className="mb-4">Diese werden insbesondere zu folgenden Zwecken verarbeitet:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                        <li>Gewährleistung eines problemlosen Verbindungsaufbaus der Website</li>
                        <li>Gewährleistung einer reibungslosen Nutzung unserer Website</li>
                        <li>Auswertung der Systemsicherheit und -stabilität</li>
                        <li>Zur Optimierung unserer Website</li>
                    </ul>
                    <p>
                        Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Informationen
                        dieser Art werden von uns statistisch ausgewertet, um unseren Internetauftritt und die
                        dahinterstehende Technik zu optimieren.
                    </p>
                </>
            )
        },
        {
            icon: Eye,
            title: "Cookies",
            content: (
                <>
                    <p className="mb-4">
                        Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf
                        Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher,
                        effektiver und sicherer zu machen.
                    </p>
                    <p className="mb-4">
                        Einige Cookies sind &quot;Session-Cookies.&quot; Solche Cookies werden nach Ende Ihrer Browser-Sitzung
                        von selbst gelöscht. Hingegen bleiben andere Cookies auf Ihrem Endgerät bestehen, bis Sie
                        diese selbst löschen.
                    </p>
                    <p>
                        Mit einem modernen Webbrowser können Sie das Setzen von Cookies überwachen, einschränken
                        oder unterbinden. Weitere Informationen finden Sie in unserer{' '}
                        <Link href="/cookie-richtlinie" className="text-black hover:opacity-70 transition-opacity underline">
                            Cookie-Richtlinie
                        </Link>.
                    </p>
                </>
            )
        },
        {
            icon: Mail,
            title: "Kontaktformular & Terminbuchung",
            content: (
                <>
                    <p className="mb-4">
                        Treten Sie bzgl. Fragen jeder Art per E-Mail oder Kontaktformular mit uns in Kontakt,
                        erteilen Sie uns zum Zwecke der Kontaktaufnahme Ihre freiwillige Einwilligung.
                    </p>
                    <p className="mb-4">
                        Für die Terminbuchung erheben wir folgende personenbezogenen Daten:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2 mb-4">
                        <li>Vor- und Nachname</li>
                        <li>E-Mail-Adresse</li>
                        <li>Telefonnummer</li>
                        <li>Gewünschte Behandlung</li>
                        <li>Wunschtermin</li>
                    </ul>
                    <p>
                        Diese Daten werden ausschließlich zur Terminkoordination und Durchführung der Behandlung
                        verwendet. Eine Weitergabe an Dritte erfolgt nicht.
                    </p>
                </>
            )
        },
        {
            icon: Users,
            title: "Ihre Rechte",
            content: (
                <>
                    <p className="mb-4">
                        Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf
                        Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und
                        Widerspruch zu.
                    </p>
                    <p>
                        Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt
                        oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind,
                        können Sie sich bei uns (hey@skinlux.at) oder der Datenschutzbehörde beschweren.
                    </p>
                </>
            )
        },
        {
            icon: Lock,
            title: "SSL-Verschlüsselung",
            content: (
                <>
                    <p className="mb-4">
                        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
                        Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber
                        senden, eine SSL-bzw. TLS-Verschlüsselung.
                    </p>
                    <p>
                        Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von
                        &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                    </p>
                </>
            )
        },
        {
            icon: Clock,
            title: "Speicherdauer",
            content: (
                <>
                    <p className="mb-4">
                        Wir speichern personenbezogene Daten nur so lange, wie dies zur Erfüllung der verfolgten
                        Zwecke erforderlich ist oder sofern gesetzliche Aufbewahrungsfristen bestehen.
                    </p>
                    <p>
                        Kontaktdaten aus dem Kontaktformular werden nach Bearbeitung Ihrer Anfrage gelöscht,
                        sofern keine gesetzlichen Aufbewahrungsfristen bestehen.
                    </p>
                </>
            )
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section ref={containerRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
                {/* Background Pattern */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 opacity-5"
                >
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(26, 26, 26, 0.1) 35px, rgba(26, 26, 26, 0.1) 70px)`
                    }} />
                </motion.div>

                <div className="container relative z-10 pt-24">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-6">
                            <Shield className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                Datenschutz & Privatsphäre
                            </span>
                        </div>

                        <h1 className="section-title" style={{ color: 'var(--color-primary)' }}>
                            Datenschutzerklärung
                        </h1>

                        <p className="section-subtitle max-w-2xl">
                            Wir haben diese Datenschutzerklärung (Fassung 01.12.2024) verfasst, um Ihnen gemäß der
                            Vorgaben der Datenschutz-Grundverordnung (EU) 2016/679 zu erklären, welche Informationen
                            wir sammeln und wie wir Daten verwenden.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section-spacing">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid gap-16">

                            {/* Responsible Party */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="card"
                            >
                                <div className="text-center">
                                    <h2 className="text-2xl font-light mb-8" style={{ color: 'var(--color-primary)' }}>
                                        Verantwortliche Stelle
                                    </h2>

                                    <div className="inline-block text-left">
                                        <div className="space-y-2 font-light text-gray-600">
                                            <p className="font-medium text-black">Skinlux</p>
                                            <p>Gökce Elikci</p>
                                            <p>Dr. Heinz-Fischer-Straße 3/2</p>
                                            <p>2486 Pottendorf, Österreich</p>
                                            <p className="pt-2">
                                                <strong className="text-black">E-Mail:</strong> hey@skinlux.at
                                            </p>
                                            <p>
                                                <strong className="text-black">Tel.:</strong> 0664 91 88 632
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Data Protection Sections */}
                            {datenschutzSections.map((section, index) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="card"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="feature-icon">
                                            <section.icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                                {section.title}
                                            </h2>
                                            <div className="font-light text-gray-600 leading-relaxed">
                                                {section.content}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Changes */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="card"
                            >
                                <div className="text-center">
                                    <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                        Änderungen
                                    </h2>
                                    <p className="font-light text-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
                                        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
                                        rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der
                                        Datenschutzerklärung umzusetzen.
                                    </p>
                                    <p className="font-light text-gray-600">
                                        Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                                    </p>
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-center pt-8"
                            >
                                <Link href="/" className="btn-primary">
                                    Zurück zur Startseite
                                </Link>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 