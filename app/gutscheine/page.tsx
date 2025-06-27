"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Gift, Check, AlertCircle, Loader, Mail, MapPin, User, CreditCard } from "lucide-react";
import { getCurrentSubdomain } from "@/lib/supabase";

const voucherAmounts = [50, 100, 150, 200, 250, 300];

type Step = 1 | 2 | 3 | 4 | 5;

interface OrderData {
    orderNumber: string;
    amount: number;
    senderName: string;
    senderEmail: string;
    deliveryMethod: string;
}

export default function Gutscheine() {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState<"email" | "post">("email");
    const [formData, setFormData] = useState({
        senderName: "",
        senderEmail: "",
        senderPhone: "",
        message: "",
        // Für Postversand
        recipientName: "",
        recipientAddress: "",
        recipientPostalCode: "",
        recipientCity: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [error, setError] = useState("");

    const getAmount = () => selectedAmount || parseInt(customAmount) || 0;

    const canProceedToStep = (step: Step): boolean => {
        switch (step) {
            case 2:
                return getAmount() >= 25;
            case 3:
                return true; // Liefermethode ist immer gewählt (default: email)
            case 4:
                return !!(formData.senderName && formData.senderEmail && formData.senderPhone);
            case 5:
                if (deliveryMethod === 'post') {
                    return !!(formData.recipientName && formData.recipientAddress &&
                        formData.recipientPostalCode && formData.recipientCity);
                }
                return true;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (deliveryMethod === 'email' && currentStep === 3) {
            // Bei E-Mail überspringen wir Schritt 4 (Lieferadresse)
            setCurrentStep(5);
        } else if (currentStep < 5) {
            setCurrentStep((prev) => (prev + 1) as Step);
        }
    };

    const prevStep = () => {
        if (deliveryMethod === 'email' && currentStep === 5) {
            // Bei E-Mail gehen wir direkt von Schritt 5 zu Schritt 3
            setCurrentStep(3);
        } else if (currentStep > 1) {
            setCurrentStep((prev) => (prev - 1) as Step);
        }
    };

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        setError("");

        try {
            console.log('🚀 Starting voucher creation...');

            const amount = getAmount();
            if (!amount || amount < 25) {
                throw new Error("Bitte wählen Sie einen gültigen Betrag (mindestens €25)");
            }

            console.log('💰 Amount validated:', amount);
            console.log('📦 Delivery method:', deliveryMethod);
            console.log('👤 Form data:', formData);

            // Generiere einzigartige Order Number
            const orderNumber = `VOU-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
            console.log('🏷️ Generated order number:', orderNumber);

            // Generiere Gutschein-Code
            const voucherCode = `SKIN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
            console.log('🎫 Generated voucher code:', voucherCode);

            // Aktuelle Subdomain für Studio-Zuordnung ermitteln
            const currentSubdomain = getCurrentSubdomain();
            console.log('🏢 Current subdomain from client:', currentSubdomain);

            // Erstelle Voucher Data Object (mit allen benötigten Spalten)
            const voucherData = {
                code: voucherCode,
                order_number: orderNumber,
                amount: amount,
                sender_name: formData.senderName,
                sender_email: formData.senderEmail,
                sender_phone: formData.senderPhone,
                message: formData.message || null,
                payment_status: 'pending',
                payment_reference: orderNumber,
                status: 'pending',
                is_used: false,
                created_at: new Date().toISOString(),
                // expires_at wird von der API basierend auf den konfigurierten Gültigkeitsmonaten gesetzt
                delivery_method: deliveryMethod,
                recipient_name: deliveryMethod === 'post' ? formData.recipientName : null,
                recipient_address: deliveryMethod === 'post' ? formData.recipientAddress : null,
                recipient_postal_code: deliveryMethod === 'post' ? formData.recipientPostalCode : null,
                recipient_city: deliveryMethod === 'post' ? formData.recipientCity : null,
                subdomain: currentSubdomain // Sende Subdomain mit für Fallback
                // studio_id wird von der API automatisch gesetzt basierend auf der Subdomain
            };

            console.log('📝 Voucher data to insert:', voucherData);

            // Verwende API Route für sichere Server-side Erstellung
            console.log('💾 Sending request to API route...');

            const response = await fetch('/api/vouchers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(voucherData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ API Error:', errorData);
                throw new Error(errorData.error || 'Fehler beim Erstellen des Gutscheins');
            }

            const result = await response.json();
            const voucher = result.voucher;
            console.log('✅ Voucher created successfully via API:', voucher);

            // Erfolg - Bestätigungsseite anzeigen
            const orderData = {
                orderNumber: voucher.order_number,
                amount: voucher.amount,
                senderName: voucher.sender_name,
                senderEmail: voucher.sender_email,
                deliveryMethod: voucher.delivery_method
            };

            console.log('🎉 Setting success data:', orderData);
            setOrderData(orderData);
            setOrderSuccess(true);

        } catch (err: unknown) {
            console.error('💥 Error in handleFinalSubmit:', err);
            if (err instanceof Error) {
                console.error('💥 Error name:', err.name);
                console.error('💥 Error message:', err.message);
                console.error('💥 Error stack:', err.stack);
                setError(err.message);
            } else {
                setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Erfolgs-Seite
    if (orderSuccess && orderData) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-20">
                <div className="container">
                    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-light mb-4" style={{ color: 'var(--color-primary)' }}>
                            Bestellung <span style={{ color: 'var(--color-secondary)' }}>erfolgreich</span>
                        </h1>

                        <p className="text-xl text-gray-600 font-light mb-8">
                            Vielen Dank für Ihre Bestellung, {orderData.senderName}!
                        </p>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <h2 className="text-lg font-medium mb-4" style={{ color: 'var(--color-primary)' }}>
                                Ihre Bestelldetails
                            </h2>
                            <div className="space-y-3 text-left">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Bestellnummer:</span>
                                    <span className="font-medium">{orderData.orderNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Gutschein-Wert:</span>
                                    <span className="font-medium text-xl">€{orderData.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Versandart:</span>
                                    <span className="font-medium flex items-center gap-2">
                                        {orderData.deliveryMethod === 'email' ? (
                                            <>
                                                <Mail className="w-4 h-4" />
                                                E-Mail
                                            </>
                                        ) : (
                                            <>
                                                <MapPin className="w-4 h-4" />
                                                Postversand
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">E-Mail:</span>
                                    <span className="font-medium">{orderData.senderEmail}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--color-primary)' }}>
                                Nächste Schritte
                            </h3>
                            <div className="text-left space-y-2 text-gray-700">
                                <p>• Sie erhalten in Kürze eine E-Mail mit den Überweisungsdaten</p>
                                {orderData.deliveryMethod === 'email' ? (
                                    <p>• Nach Zahlungseingang senden wir Ihnen den Gutschein per E-Mail zu</p>
                                ) : (
                                    <p>• Nach Zahlungseingang versenden wir den Gutschein per Post an die angegebene Adresse</p>
                                )}
                                <p>• Der Gutschein ist 1 Jahr gültig</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                Zur Startseite
                            </Link>
                            <Link
                                href="/kontakt"
                                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Fragen? Kontakt
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="relative pt-32 pb-6 bg-gradient-to-br from-white to-gray-50">
                <div className="container">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück zur Startseite
                    </Link>

                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Gift className="w-6 h-6" style={{ color: 'var(--color-secondary)' }} />
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                Geschenkgutscheine
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-light mb-4">
                            <span className="block" style={{ color: 'var(--color-primary)' }}>
                                Schönheit
                            </span>
                            <span className="block mt-1" style={{ color: 'var(--color-secondary)' }}>
                                verschenken
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-6 font-light leading-relaxed max-w-2xl mx-auto">
                            Überraschen Sie Ihre Liebsten mit einem Gutschein für unvergessliche Beauty-Momente
                        </p>
                    </div>
                </div>
            </section>



            {/* Step Content */}
            <section className="py-8">
                <div className="container">
                    <div className="max-w-4xl mx-auto">

                        {/* Schritt 1: Betrag wählen */}
                        {currentStep === 1 && (
                            <div className="text-center">
                                <h2 className="text-2xl md:text-3xl font-light mb-8" style={{ color: 'var(--color-primary)' }}>
                                    Wählen Sie einen <span style={{ color: 'var(--color-secondary)' }}>Betrag</span>
                                </h2>

                                {/* Preset Amounts */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                                    {voucherAmounts.map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => {
                                                setSelectedAmount(amount);
                                                setCustomAmount("");
                                            }}
                                            className={`p-8 border-2 rounded-xl transition-all ${selectedAmount === amount
                                                ? 'border-pink-300 bg-pink-50 scale-105'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-3xl font-light mb-2" style={{
                                                color: selectedAmount === amount ? 'var(--color-secondary)' : 'var(--color-primary)'
                                            }}>
                                                €{amount}
                                            </div>
                                            <p className="text-sm text-gray-600 font-light">Gutschein</p>
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Amount */}
                                <div className="text-center mb-8">
                                    <p className="text-gray-600 font-light mb-4">oder einen individuellen Betrag wählen:</p>
                                    <div className="max-w-xs mx-auto">
                                        <input
                                            type="number"
                                            min="25"
                                            step="5"
                                            placeholder="Betrag in €"
                                            value={customAmount}
                                            onChange={(e) => {
                                                setCustomAmount(e.target.value);
                                                setSelectedAmount(null);
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-300 focus:outline-none transition-colors text-center text-lg"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Mindestbetrag: €25</p>
                                </div>
                            </div>
                        )}

                        {/* Schritt 2: Liefermethode */}
                        {currentStep === 2 && (
                            <div>
                                <h2 className="text-2xl md:text-3xl font-light text-center mb-8" style={{ color: 'var(--color-primary)' }}>
                                    Wie möchten Sie den <span style={{ color: 'var(--color-secondary)' }}>Gutschein erhalten?</span>
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    {/* E-Mail Option */}
                                    <button
                                        onClick={() => setDeliveryMethod("email")}
                                        className={`p-8 border-2 rounded-xl transition-all text-left ${deliveryMethod === "email"
                                            ? 'border-pink-300 bg-pink-50 scale-105'
                                            : 'border-gray-200 hover:border-gray-300 bg-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${deliveryMethod === "email" ? 'bg-pink-200' : 'bg-gray-100'
                                                }`}>
                                                <Mail className={`w-6 h-6 ${deliveryMethod === "email" ? 'text-pink-600' : 'text-gray-500'
                                                    }`} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-medium" style={{
                                                    color: deliveryMethod === "email" ? 'var(--color-secondary)' : 'var(--color-primary)'
                                                }}>
                                                    Per E-Mail
                                                </h3>
                                                <p className="text-sm text-gray-600">Sofortiger Versand nach Zahlungseingang</p>
                                            </div>
                                        </div>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Kostenloser Versand</li>
                                            <li>• Sofort verfügbar</li>
                                            <li>• Umweltfreundlich</li>
                                        </ul>
                                    </button>

                                    {/* Post Option */}
                                    <button
                                        onClick={() => setDeliveryMethod("post")}
                                        className={`p-8 border-2 rounded-xl transition-all text-left ${deliveryMethod === "post"
                                            ? 'border-pink-300 bg-pink-50 scale-105'
                                            : 'border-gray-200 hover:border-gray-300 bg-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${deliveryMethod === "post" ? 'bg-pink-200' : 'bg-gray-100'
                                                }`}>
                                                <MapPin className={`w-6 h-6 ${deliveryMethod === "post" ? 'text-pink-600' : 'text-gray-500'
                                                    }`} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-medium" style={{
                                                    color: deliveryMethod === "post" ? 'var(--color-secondary)' : 'var(--color-primary)'
                                                }}>
                                                    Per Post
                                                </h3>
                                                <p className="text-sm text-gray-600">Elegante Geschenkkarte per Briefpost</p>
                                            </div>
                                        </div>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• Hochwertige Geschenkkarte</li>
                                            <li>• Versand in 2-3 Werktagen</li>
                                            <li>• Persönlicher Touch</li>
                                        </ul>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Schritt 3: Kontaktdaten */}
                        {currentStep === 3 && (
                            <div>
                                <h2 className="text-2xl md:text-3xl font-light text-center mb-8" style={{ color: 'var(--color-primary)' }}>
                                    Ihre <span style={{ color: 'var(--color-secondary)' }}>Kontaktdaten</span>
                                </h2>

                                <div className="max-w-md mx-auto space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <User className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-600 font-medium">Käufer-Informationen</span>
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Ihr Name"
                                        required
                                        value={formData.senderName}
                                        onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-300 focus:outline-none transition-colors"
                                    />

                                    <input
                                        type="email"
                                        placeholder="Ihre E-Mail"
                                        required
                                        value={formData.senderEmail}
                                        onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-300 focus:outline-none transition-colors"
                                    />

                                    <input
                                        type="tel"
                                        placeholder="Ihre Telefonnummer"
                                        required
                                        value={formData.senderPhone}
                                        onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-300 focus:outline-none transition-colors"
                                    />

                                    <textarea
                                        placeholder="Persönliche Nachricht (optional)"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-300 focus:outline-none transition-colors h-24 resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Schritt 4: Lieferadresse (nur bei Post) */}
                        {currentStep === 4 && deliveryMethod === 'post' && (
                            <div>
                                <h2 className="text-2xl md:text-3xl font-light text-center mb-8" style={{ color: 'var(--color-primary)' }}>
                                    <span style={{ color: 'var(--color-secondary)' }}>Lieferadresse</span>
                                </h2>

                                <div className="max-w-md mx-auto space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-600 font-medium">Empfänger-Adresse</span>
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Name des Empfängers"
                                        required
                                        value={formData.recipientName}
                                        onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-300 focus:outline-none transition-colors"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Straße und Hausnummer"
                                        required
                                        value={formData.recipientAddress}
                                        onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-300 focus:outline-none transition-colors"
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="PLZ"
                                            required
                                            value={formData.recipientPostalCode}
                                            onChange={(e) => setFormData({ ...formData, recipientPostalCode: e.target.value })}
                                            className="px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-300 focus:outline-none transition-colors"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Ort"
                                            required
                                            value={formData.recipientCity}
                                            onChange={(e) => setFormData({ ...formData, recipientCity: e.target.value })}
                                            className="px-4 py-3 border border-gray-300 rounded-xl focus:border-pink-300 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Schritt 5: Bestätigung */}
                        {currentStep === 5 && (
                            <div>
                                <h2 className="text-2xl md:text-3xl font-light text-center mb-8" style={{ color: 'var(--color-primary)' }}>
                                    <span style={{ color: 'var(--color-secondary)' }}>Bestätigung</span>
                                </h2>

                                <div className="max-w-2xl mx-auto">
                                    {/* Error Message */}
                                    {error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                            <p className="text-red-700 text-sm">{error}</p>
                                        </div>
                                    )}

                                    {/* Bestellübersicht */}
                                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                                        <h3 className="text-lg font-medium mb-4 text-gray-900">Ihre Bestellung</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Gutschein-Wert:</span>
                                                <span className="font-medium text-xl">€{getAmount()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Liefermethode:</span>
                                                <span className="font-medium flex items-center gap-2">
                                                    {deliveryMethod === 'email' ? (
                                                        <>
                                                            <Mail className="w-4 h-4" />
                                                            E-Mail
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MapPin className="w-4 h-4" />
                                                            Postversand
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Besteller:</span>
                                                <span className="font-medium">{formData.senderName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">E-Mail:</span>
                                                <span className="font-medium">{formData.senderEmail}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Telefon:</span>
                                                <span className="font-medium">{formData.senderPhone}</span>
                                            </div>
                                            {deliveryMethod === 'post' && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Lieferung an:</span>
                                                    <span className="font-medium">{formData.recipientName}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Zahlungshinweis */}
                                    <div className="bg-blue-50 rounded-xl p-6 mb-8">
                                        <div className="flex items-start gap-3">
                                            <CreditCard className="w-5 h-5 mt-0.5 text-blue-500" />
                                            <div>
                                                <h3 className="text-lg font-medium mb-2 text-blue-900">Zahlung per Überweisung</h3>
                                                <p className="text-blue-700 mb-2">
                                                    Nach Ihrer Bestellung erhalten Sie eine E-Mail mit den Überweisungsdaten.
                                                </p>
                                                <p className="text-sm text-blue-600">
                                                    {deliveryMethod === "email"
                                                        ? "Der Gutschein wird nach Zahlungseingang per E-Mail versendet."
                                                        : "Der Gutschein wird nach Zahlungseingang per Post an die angegebene Adresse versendet."
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Zurück
                            </button>

                            {currentStep < 5 ? (
                                <button
                                    onClick={nextStep}
                                    disabled={!canProceedToStep(currentStep + 1 as Step)}
                                    className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Weiter
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleFinalSubmit}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin" />
                                            Wird bearbeitet...
                                        </>
                                    ) : (
                                        <>
                                            <Gift className="w-4 h-4" />
                                            Gutschein bestellen
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 