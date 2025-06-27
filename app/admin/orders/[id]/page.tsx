"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Mail, Phone, CreditCard, Calendar, CheckCircle, Clock, XCircle, Copy, Eye, EyeOff, AlertCircle, DollarSign, User, MapPin, Receipt } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Order Interface definieren
interface Order {
    id: string;
    orderNumber: string;
    voucherCode: string;
    amount: number;
    senderName: string;
    senderEmail: string;
    senderPhone: string;
    paymentStatus: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    bankReference: string | null;
    voucherUsed: boolean;
    voucherUsedAt: string | null;
    expiresAt: string;
    message?: string;
    delivery_method: string;
    recipient_name?: string;
    recipient_address?: string;
    recipient_postal_code?: string;
    recipient_city?: string;
}

export default function OrderDetails() {
    const params = useParams();
    const orderId = params.id as string;
    const [order, setOrder] = useState<Order | null>(null);
    const [showVoucherCode, setShowVoucherCode] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        // Daten direkt aus vouchers Tabelle laden
        const fetchOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const { data, error } = await supabase
                    .from('vouchers')
                    .select('*')
                    .eq('id', orderId)
                    .single();

                if (error) throw error;

                if (data) {
                    const transformedOrder: Order = {
                        id: data.id,
                        orderNumber: data.payment_reference || `VOC-${data.code}`,
                        voucherCode: data.code,
                        amount: data.amount,
                        senderName: data.sender_name,
                        senderEmail: data.sender_email,
                        senderPhone: '', // Nicht verfügbar in aktueller Struktur
                        paymentStatus: data.payment_status,
                        paymentMethod: 'bank_transfer', // Default
                        createdAt: data.created_at,
                        updatedAt: data.created_at, // Verwende created_at da updated_at nicht existiert
                        bankReference: data.payment_reference,
                        voucherUsed: data.is_used || false,
                        voucherUsedAt: data.used_at,
                        expiresAt: data.expires_at,
                        message: data.message,
                        delivery_method: data.delivery_method,
                        recipient_name: data.recipient_name,
                        recipient_address: data.recipient_address,
                        recipient_postal_code: data.recipient_postal_code,
                        recipient_city: data.recipient_city
                    };
                    setOrder(transformedOrder);
                }
            } catch (err: any) {
                console.error('Fehler beim Laden der Bestellung:', err);
                setError('Bestellung konnte nicht geladen werden.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Bestellung wird geladen...</p>
                </div>
            </main>
        );
    }

    if (error || !order) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
                    <h1 className="text-2xl font-light text-gray-900 mb-2">Bestellung nicht gefunden</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        href="/admin/dashboard"
                        className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Zurück zum Dashboard
                    </Link>
                </div>
            </main>
        );
    }

    const copyVoucherCode = async () => {
        await navigator.clipboard.writeText(order.voucherCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const updatePaymentStatus = async (newStatus: string) => {
        if (!order) return;

        try {
            setUpdating(true);
            const { error } = await supabase
                .from('vouchers')
                .update({ payment_status: newStatus })
                .eq('id', order.id);

            if (error) throw error;

            setOrder(prev => {
                if (!prev) return prev;
                return { ...prev, paymentStatus: newStatus, updatedAt: new Date().toISOString() };
            });
        } catch (err: any) {
            console.error('Fehler beim Aktualisieren des Zahlungsstatus:', err);
            alert('Fehler beim Aktualisieren des Zahlungsstatus');
        } finally {
            setUpdating(false);
        }
    };

    const markVoucherAsUsed = async () => {
        if (!order) return;

        try {
            const { error } = await supabase
                .from('vouchers')
                .update({
                    is_used: true,
                    used_at: new Date().toISOString()
                })
                .eq('id', order.id);

            if (error) throw error;

            setOrder(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    voucherUsed: true,
                    voucherUsedAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
            });
        } catch (err: any) {
            console.error('Fehler beim Markieren als eingelöst:', err);
            alert('Fehler beim Markieren als eingelöst');
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link
                                href="/admin/dashboard"
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-light text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Bestellung Details
                                </h1>
                                <p className="text-sm text-gray-500 font-light tracking-wider mt-1">
                                    {order.orderNumber}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="px-6 py-3 bg-gray-50/80 border border-gray-200 rounded-xl hover:bg-gray-100/80 transition-all duration-300 flex items-center gap-2 text-gray-700">
                                <Download className="w-4 h-4" />
                                PDF Export
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Hauptinformationen */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Bestellstatus */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-8">
                            <h2 className="text-2xl font-light text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Bestellstatus
                            </h2>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${order.paymentStatus === 'completed'
                                    ? 'bg-green-100'
                                    : order.paymentStatus === 'pending'
                                        ? 'bg-yellow-100'
                                        : 'bg-red-100'
                                    }`}>
                                    {order.paymentStatus === 'completed' ? (
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    ) : order.paymentStatus === 'pending' ? (
                                        <Clock className="w-8 h-8 text-yellow-600" />
                                    ) : (
                                        <XCircle className="w-8 h-8 text-red-600" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-gray-900">
                                        {order.paymentStatus === 'completed' ? 'Zahlung abgeschlossen' :
                                            order.paymentStatus === 'pending' ? 'Zahlung ausstehend' : 'Zahlung fehlgeschlagen'}
                                    </h3>
                                    <p className="text-gray-500">
                                        Erstellt: {new Date(order.createdAt).toLocaleDateString('de-DE', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {order.paymentStatus === 'pending' && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => updatePaymentStatus('completed')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                                    >
                                        Als bezahlt markieren
                                    </button>
                                    <button
                                        onClick={() => updatePaymentStatus('cancelled')}
                                        className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                                    >
                                        Stornieren
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Gutschein-Details */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-8">
                            <h2 className="text-2xl font-light text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Gutschein-Details
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Gutschein-Code</label>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 relative">
                                            <input
                                                type={showVoucherCode ? "text" : "password"}
                                                value={order.voucherCode}
                                                readOnly
                                                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl font-mono text-lg"
                                            />
                                            <button
                                                onClick={() => setShowVoucherCode(!showVoucherCode)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showVoucherCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <button
                                            onClick={copyVoucherCode}
                                            className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2"
                                        >
                                            <Copy className="w-4 h-4" />
                                            {copied ? 'Kopiert!' : 'Kopieren'}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Wert</label>
                                    <div className="text-3xl font-light text-gray-900">€{order.amount}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.voucherUsed
                                            ? 'bg-gray-100 text-gray-800'
                                            : 'bg-green-100 text-green-800'
                                            }`}>
                                            {order.voucherUsed ? 'Eingelöst' : 'Verfügbar'}
                                        </span>
                                        {!order.voucherUsed && order.paymentStatus === 'completed' && (
                                            <button
                                                onClick={markVoucherAsUsed}
                                                className="px-3 py-1 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm"
                                            >
                                                Als eingelöst markieren
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Gültig bis</label>
                                    <div className="text-gray-900">
                                        {new Date(order.expiresAt).toLocaleDateString('de-DE')}
                                    </div>
                                </div>
                            </div>

                            {order.voucherUsed && order.voucherUsedAt && (
                                <div className="mt-6 p-4 bg-gray-50/80 rounded-xl">
                                    <p className="text-sm text-gray-600">
                                        Eingelöst am: {new Date(order.voucherUsedAt).toLocaleDateString('de-DE', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Persönliche Nachricht */}
                        {order.message && (
                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-8">
                                <h2 className="text-2xl font-light text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Persönliche Nachricht
                                </h2>
                                <div className="bg-gray-50/80 rounded-xl p-6 italic text-gray-700">
                                    "{order.message}"
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Kundendaten */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-8">
                            <h2 className="text-xl font-light text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Kundendaten
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                                    <div className="text-gray-900">{order.senderName}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">E-Mail</label>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <a href={`mailto:${order.senderEmail}`} className="text-gray-900 hover:text-gray-600">
                                            {order.senderEmail}
                                        </a>
                                    </div>
                                </div>
                                {order.senderPhone && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Telefon</label>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <a href={`tel:${order.senderPhone}`} className="text-gray-900 hover:text-gray-600">
                                                {order.senderPhone}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Liefermethode</label>
                                    <div className="flex items-center gap-2">
                                        {order.delivery_method === 'email' ? (
                                            <Mail className="w-4 h-4 text-gray-400" />
                                        ) : (
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                        )}
                                        <span className={`px-2 py-1 rounded-full text-xs ${order.delivery_method === 'email'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            {order.delivery_method === 'email' ? 'E-Mail' : 'Postversand'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Zahlungsdetails */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-8">
                            <h2 className="text-xl font-light text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Zahlungsdetails
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Zahlungsmethode</label>
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-900">Banküberweisung</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Betrag</label>
                                    <div className="text-2xl font-semibold text-gray-900">€{order.amount}</div>
                                </div>
                                {order.bankReference && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Verwendungszweck</label>
                                        <div className="font-mono text-sm text-gray-900 bg-gray-50/80 px-3 py-2 rounded-lg">
                                            {order.bankReference}
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Letzte Aktualisierung</label>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(order.updatedAt).toLocaleDateString('de-DE', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lieferadresse (nur bei Postversand) */}
                        {order.delivery_method === 'post' && (
                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-8">
                                <h2 className="text-2xl font-light mb-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Lieferadresse
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-6 h-6 text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Empfänger</p>
                                            <p className="text-lg text-gray-900">{order.recipient_name}</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-2">Adresse</p>
                                        <div className="text-gray-900">
                                            <p>{order.recipient_address}</p>
                                            <p>{order.recipient_postal_code} {order.recipient_city}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
} 