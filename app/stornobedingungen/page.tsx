import { Metadata } from 'next';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Stornobedingungen | Skinlux Pottendorf',
    description: 'Unsere Stornobedingungen für Termine bei Skinlux Pottendorf. Informieren Sie sich über Absagefristen und Gebühren.',
};

export default function StornobedingungPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Clock className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
                            <h1 className="text-4xl md:text-5xl font-light" style={{ color: 'var(--color-primary)' }}>
                                Stornobedingungen
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
                            Transparente und faire Regelungen für Terminabsagen bei Skinlux Pottendorf
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">

                        {/* Introduction */}
                        <div className="mb-12 p-8 bg-blue-50 rounded-2xl border border-blue-100">
                            <h2 className="text-2xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                                Wichtige Informationen
                            </h2>
                            <p className="text-gray-700 font-light leading-relaxed">
                                Um eine optimale Terminplanung zu gewährleisten und allen Kunden faire Behandlungszeiten zu ermöglichen,
                                gelten bei Skinlux Pottendorf folgende Stornobedingungen. Wir bitten um Ihr Verständnis für diese Regelungen.
                            </p>
                        </div>

                        {/* Storno Conditions */}
                        <div className="grid gap-8 mb-12">

                            {/* Kostenlose Stornierung */}
                            <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-8 h-8 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-2xl font-light mb-4 text-green-800">
                                            Kostenlose Terminabsage
                                        </h3>
                                        <p className="text-green-700 font-light text-lg leading-relaxed">
                                            <strong>Bis zu 24 Stunden im Voraus</strong> können Sie Ihren Termin kostenfrei absagen.
                                            Kontaktieren Sie uns einfach telefonisch oder per E-Mail.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Verspätete Absagen */}
                            <div className="bg-yellow-50 p-8 rounded-2xl border border-yellow-100">
                                <div className="flex items-start gap-4">
                                    <AlertTriangle className="w-8 h-8 text-yellow-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-2xl font-light mb-4 text-yellow-800">
                                            Verspätete Absagen
                                        </h3>
                                        <div className="space-y-3 text-yellow-700 font-light text-lg">
                                            <p>
                                                <strong>Unter 24 Stunden:</strong> 25% des Behandlungspreises
                                            </p>
                                            <p>
                                                <strong>Unter 12 Stunden:</strong> 50% des Behandlungspreises
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Nicht-Erscheinen */}
                            <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                                <div className="flex items-start gap-4">
                                    <XCircle className="w-8 h-8 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-2xl font-light mb-4 text-red-800">
                                            Nicht-Erscheinen
                                        </h3>
                                        <p className="text-red-700 font-light text-lg leading-relaxed">
                                            Bei Nichterscheinen ohne Absage wird der <strong>vollständige Behandlungspreis</strong> in Rechnung gestellt.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Erstgespräch & Probebehandlung */}
                            <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-1 flex-shrink-0">
                                        €
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-light mb-4 text-purple-800">
                                            Erstgespräch & Probebehandlung
                                        </h3>
                                        <p className="text-purple-700 font-light text-lg leading-relaxed mb-3">
                                            Unser kostenloses Erstgespräch und die Probebehandlung haben einen <strong>Gegenwert von 50 Euro</strong>.
                                        </p>
                                        <p className="text-purple-700 font-light text-lg leading-relaxed">
                                            Bei Stornierung oder Nichterscheinen gelten die oben genannten Bedingungen entsprechend.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-50 p-8 rounded-2xl">
                            <h3 className="text-2xl font-light mb-6" style={{ color: 'var(--color-primary)' }}>
                                Terminabsage & Kontakt
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Telefon</h4>
                                    <p className="text-gray-600 font-light">0664 / 45 68 454</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">E-Mail</h4>
                                    <p className="text-gray-600 font-light">hey@skinlux.at</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Öffnungszeiten</h4>
                                    <p className="text-gray-600 font-light">
                                        Montag - Freitag: 9:00 - 21:30<br />
                                        Samstag - Sonntag: Geschlossen
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Adresse</h4>
                                    <p className="text-gray-600 font-light">
                                        Marktplatz 14<br />
                                        2486 Pottendorf<br />
                                        Österreich
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-blue-700 font-light text-center">
                                <strong>Hinweis:</strong> Diese Stornobedingungen dienen der fairen Terminplanung und ermöglichen es uns,
                                allen Kunden optimale Behandlungszeiten anzubieten. Vielen Dank für Ihr Verständnis!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
