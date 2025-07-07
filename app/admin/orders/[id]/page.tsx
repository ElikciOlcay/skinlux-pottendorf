"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Gift,
    User,
    Mail,
    Phone,
    MapPin,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    Edit3,
    Save,
    X,
    Euro,
    Receipt,
    Calendar,
    History,
    MessageSquare,
    Copy,
    Check
} from "lucide-react";
import { AdminAuth } from "@/lib/supabase-auth";

interface VoucherDetail {
    id: string;
    code: string;
    order_number: string;
    amount: number;
    remaining_amount?: number;
    sender_name: string;
    sender_email: string;
    sender_phone?: string;
    recipient_name?: string;
    recipient_address?: string;
    recipient_postal_code?: string;
    recipient_city?: string;
    message?: string;
    payment_status: string;
    status: string;
    is_used: boolean;
    created_at: string;
    expires_at: string;
    delivery_method: string;
    redemptions?: RedemptionRecord[];
}

interface RedemptionRecord {
    id: string;
    amount: number;
    description: string;
    redeemed_at: string;
    remaining_after: number;
}

export default function VoucherDetailPage() {
    const router = useRouter();
    const params = useParams();
    const voucherId = params.id as string;

    const [voucher, setVoucher] = useState<VoucherDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setSaving] = useState(false);
    const [copied, setCopied] = useState(false);

    // Einlösung State
    const [showRedemptionForm, setShowRedemptionForm] = useState(false);
    const [redemptionAmount, setRedemptionAmount] = useState("");
    const [redemptionDescription, setRedemptionDescription] = useState("");
    const [isRedeeming, setIsRedeeming] = useState(false);

    // Bearbeitbare Felder
    const [editData, setEditData] = useState({
        sender_name: "",
        sender_email: "",
        sender_phone: "",
        recipient_name: "",
        recipient_address: "",
        recipient_postal_code: "",
        recipient_city: "",
        message: "",
        amount: 0
    });

    const loadVoucherDetail = useCallback(async () => {
        try {
            setLoading(true);

            const response = await fetch(`/api/vouchers/${voucherId}`);

            if (!response.ok) {
                throw new Error("Gutschein nicht gefunden");
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || "Fehler beim Laden");
            }

            const voucherData = result.voucher;
            setVoucher(voucherData);

            setEditData({
                sender_name: voucherData.sender_name || "",
                sender_email: voucherData.sender_email || "",
                sender_phone: voucherData.sender_phone || "",
                recipient_name: voucherData.recipient_name || "",
                recipient_address: voucherData.recipient_address || "",
                recipient_postal_code: voucherData.recipient_postal_code || "",
                recipient_city: voucherData.recipient_city || "",
                message: voucherData.message || "",
                amount: voucherData.amount || 0
            });

        } catch (error) {
            console.error("Error loading voucher:", error);
            setError(error instanceof Error ? error.message : "Fehler beim Laden");
        } finally {
            setLoading(false);
        }
    }, [voucherId]);

    useEffect(() => {
        const checkAuthAndLoadVoucher = async () => {
            try {
                const { isAdmin } = await AdminAuth.isAdmin();
                if (!isAdmin) {
                    router.push("/admin");
                    return;
                }

                await loadVoucherDetail();
            } catch (error) {
                console.error("Auth check failed:", error);
                router.push("/admin");
            }
        };

        checkAuthAndLoadVoucher();
    }, [router, voucherId, loadVoucherDetail]);

    const handleSaveChanges = async () => {
        try {
            setSaving(true);

            const response = await fetch(`/api/vouchers/${voucherId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "update_details",
                    data: editData
                })
            });

            if (!response.ok) {
                throw new Error("Fehler beim Speichern");
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || "Fehler beim Speichern");
            }

            await loadVoucherDetail();
            setIsEditing(false);
            setError("");

        } catch (error) {
            setError(error instanceof Error ? error.message : "Fehler beim Speichern");
        } finally {
            setSaving(false);
        }
    };

    const handleRedemption = async () => {
        try {
            setIsRedeeming(true);

            const amount = parseFloat(redemptionAmount);
            const currentRemaining = voucher?.remaining_amount ?? voucher?.amount ?? 0;

            if (amount <= 0 || amount > currentRemaining) {
                throw new Error("Ungültiger Betrag");
            }

            const response = await fetch(`/api/vouchers/${voucherId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "redeem",
                    amount: amount,
                    description: redemptionDescription || "Behandlung"
                })
            });

            if (!response.ok) {
                throw new Error("Fehler bei der Einlösung");
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || "Fehler bei der Einlösung");
            }

            setRedemptionAmount("");
            setRedemptionDescription("");
            setShowRedemptionForm(false);
            setError("");

            await loadVoucherDetail();

        } catch (error) {
            setError(error instanceof Error ? error.message : "Fehler bei der Einlösung");
        } finally {
            setIsRedeeming(false);
        }
    };

    const updateVoucherStatus = async (newStatus: string) => {
        try {
            const response = await fetch(`/api/vouchers/${voucherId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "update_status",
                    status: newStatus
                })
            });

            if (!response.ok) {
                throw new Error("Fehler beim Status-Update");
            }

            await loadVoucherDetail();
            setError("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Fehler beim Status-Update");
        }
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
            case 'active':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-amber-500" />;
            case 'redeemed':
                return <Gift className="w-5 h-5 text-blue-500" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <AlertTriangle className="w-5 h-5 text-slate-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            'paid': 'bg-green-50 text-green-700 border-green-200',
            'active': 'bg-green-50 text-green-700 border-green-200',
            'pending': 'bg-amber-50 text-amber-700 border-amber-200',
            'redeemed': 'bg-blue-50 text-blue-700 border-blue-200',
            'cancelled': 'bg-red-50 text-red-700 border-red-200'
        };
        return statusMap[status as keyof typeof statusMap] || 'bg-slate-50 text-slate-700 border-slate-200';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                        <div className="animate-spin w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full"></div>
                    </div>
                    <p className="text-slate-600 font-medium">Lade Gutschein-Details...</p>
                </div>
            </div>
        );
    }

    if (!voucher) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                        <Gift className="w-8 h-8 text-slate-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">Gutschein nicht gefunden</h2>
                    <p className="text-slate-500 mb-6">Der angeforderte Gutschein konnte nicht geladen werden.</p>
                    <Link
                        href="/admin/dashboard"
                        className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück zum Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const remainingAmount = voucher.remaining_amount ?? voucher.amount;
    const isFullyRedeemed = remainingAmount <= 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Modern Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/admin/dashboard"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Dashboard
                            </Link>
                            <div className="h-6 w-px bg-slate-200"></div>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                                    <Gift className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-slate-900">{voucher.code}</h1>
                                    <p className="text-xs text-slate-500">Gutschein-Details</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Bearbeiten
                                </button>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={handleSaveChanges}
                                        disabled={isSaving}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {isSaving ? "Speichere..." : "Speichern"}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Abbrechen
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Hauptbereich */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Gutschein-Übersicht */}
                        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                            {/* Header Gradient */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                                            <Gift className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{voucher.code}</h2>
                                            <p className="text-blue-100">Bestellung #{voucher.order_number}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(voucher.code)}
                                        className="inline-flex items-center px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                    >
                                        {copied ? (
                                            <Check className="w-4 h-4 mr-2" />
                                        ) : (
                                            <Copy className="w-4 h-4 mr-2" />
                                        )}
                                        {copied ? 'Kopiert!' : 'Code kopieren'}
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Wert und Status */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="text-4xl font-bold text-slate-900 mb-1">
                                            €{remainingAmount.toFixed(2).replace('.00', '')}
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            von €{voucher.amount} verbleibend
                                        </div>
                                        {voucher.amount !== remainingAmount && (
                                            <div className="text-xs text-blue-600 mt-1">
                                                €{(voucher.amount - remainingAmount).toFixed(2).replace('.00', '')} bereits eingelöst
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-right space-y-2">
                                        <div className="flex items-center justify-end space-x-2">
                                            {getStatusIcon(voucher.payment_status)}
                                            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusBadge(voucher.payment_status)}`}>
                                                {voucher.payment_status}
                                            </span>
                                        </div>

                                        {voucher.status !== voucher.payment_status && (
                                            <div className="flex items-center justify-end space-x-2">
                                                {getStatusIcon(voucher.status)}
                                                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusBadge(voucher.status)}`}>
                                                    {voucher.status}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Datum-Informationen */}
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                        <Calendar className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Erstellt</p>
                                            <p className="text-sm text-slate-500">
                                                {new Date(voucher.created_at).toLocaleDateString('de-DE', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                        <Calendar className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Gültig bis</p>
                                            <p className="text-sm text-slate-500">
                                                {new Date(voucher.expires_at).toLocaleDateString('de-DE', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status-Aktionen */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {voucher.payment_status === 'pending' && (
                                        <button
                                            onClick={() => updateVoucherStatus('paid')}
                                            className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Als bezahlt markieren
                                        </button>
                                    )}

                                    {voucher.status === 'pending' && voucher.payment_status === 'paid' && (
                                        <button
                                            onClick={() => updateVoucherStatus('active')}
                                            className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                                        >
                                            <Gift className="w-4 h-4 mr-2" />
                                            Aktivieren
                                        </button>
                                    )}
                                </div>

                                {/* Einlösung */}
                                {voucher.status === 'active' && !isFullyRedeemed && (
                                    <div className="border-t border-slate-200 pt-6">
                                        {!showRedemptionForm ? (
                                            <button
                                                onClick={() => setShowRedemptionForm(true)}
                                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25"
                                            >
                                                <Euro className="w-5 h-5 mr-2" />
                                                Betrag einlösen
                                            </button>
                                        ) : (
                                            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                                                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                                    <Euro className="w-5 h-5 mr-2 text-blue-600" />
                                                    Gutschein einlösen
                                                </h3>

                                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                            Betrag (max. €{remainingAmount.toFixed(2).replace('.00', '')})
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={redemptionAmount}
                                                            onChange={(e) => setRedemptionAmount(e.target.value)}
                                                            max={remainingAmount}
                                                            min="0.01"
                                                            step="0.01"
                                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                            placeholder="Betrag eingeben"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                            Beschreibung
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={redemptionDescription}
                                                            onChange={(e) => setRedemptionDescription(e.target.value)}
                                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                            placeholder="z.B. HydraFacial Signature"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={handleRedemption}
                                                        disabled={isRedeeming || !redemptionAmount}
                                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50"
                                                    >
                                                        {isRedeeming ? (
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        ) : (
                                                            <Euro className="w-4 h-4 mr-2" />
                                                        )}
                                                        {isRedeeming ? "Löse ein..." : "Einlösen"}
                                                    </button>
                                                    <button
                                                        onClick={() => setShowRedemptionForm(false)}
                                                        className="px-6 py-3 text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                                                    >
                                                        Abbrechen
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Käufer-Informationen */}
                        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                                <User className="w-5 h-5 mr-2 text-blue-600" />
                                Käufer-Informationen
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.sender_name}
                                            onChange={(e) => setEditData(prev => ({ ...prev, sender_name: e.target.value }))}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                            <User className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">{voucher.sender_name}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        E-Mail
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editData.sender_email}
                                            onChange={(e) => setEditData(prev => ({ ...prev, sender_email: e.target.value }))}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">{voucher.sender_email}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Telefon
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editData.sender_phone}
                                            onChange={(e) => setEditData(prev => ({ ...prev, sender_phone: e.target.value }))}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Optional"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">{voucher.sender_phone || "Nicht angegeben"}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Gutscheinwert
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={editData.amount}
                                            onChange={(e) => setEditData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            min="1"
                                        />
                                    ) : (
                                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                            <Euro className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">€{voucher.amount}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Empfänger-Informationen (falls Geschenk) */}
                        {(voucher.recipient_name || isEditing) && (
                            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                                    <Gift className="w-5 h-5 mr-2 text-green-600" />
                                    Empfänger-Informationen
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Name des Empfängers
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.recipient_name}
                                                onChange={(e) => setEditData(prev => ({ ...prev, recipient_name: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Optional"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                                <User className="w-4 h-4 text-slate-400" />
                                                <span className="text-slate-900">{voucher.recipient_name || "Nicht angegeben"}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Stadt
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.recipient_city}
                                                onChange={(e) => setEditData(prev => ({ ...prev, recipient_city: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Optional"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                <span className="text-slate-900">{voucher.recipient_city || "Nicht angegeben"}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Adresse
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                value={editData.recipient_address}
                                                onChange={(e) => setEditData(prev => ({ ...prev, recipient_address: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                rows={2}
                                                placeholder="Optional"
                                            />
                                        ) : (
                                            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                                                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                                                <span className="text-slate-900">{voucher.recipient_address || "Nicht angegeben"}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Persönliche Nachricht */}
                        {(voucher.message || isEditing) && (
                            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                                    <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                                    Persönliche Nachricht
                                </h3>

                                {isEditing ? (
                                    <textarea
                                        value={editData.message}
                                        onChange={(e) => setEditData(prev => ({ ...prev, message: e.target.value }))}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        rows={4}
                                        placeholder="Optional"
                                    />
                                ) : (
                                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                                        <p className="text-slate-900 italic">
                                            &quot;{voucher.message || "Keine Nachricht hinterlassen"}&quot;
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Einlösungs-Historie */}
                        {voucher.redemptions && voucher.redemptions.length > 0 && (
                            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                                    <History className="w-5 h-5 mr-2 text-blue-600" />
                                    Einlösungs-Historie
                                </h3>

                                <div className="space-y-4">
                                    {voucher.redemptions.map((redemption) => (
                                        <div key={redemption.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-slate-900">
                                                    €{redemption.amount.toFixed(2).replace('.00', '')}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {new Date(redemption.redeemed_at).toLocaleDateString('de-DE')}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">{redemption.description}</p>
                                            <p className="text-xs text-slate-500">
                                                Verbleibend: €{redemption.remaining_after.toFixed(2).replace('.00', '')}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Stats */}
                        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                                <Receipt className="w-5 h-5 mr-2 text-green-600" />
                                Übersicht
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-sm text-slate-600">Ursprungswert</span>
                                    <span className="font-semibold text-slate-900">€{voucher.amount}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                    <span className="text-sm text-slate-600">Eingelöst</span>
                                    <span className="font-semibold text-slate-900">
                                        €{(voucher.amount - remainingAmount).toFixed(2).replace('.00', '')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm text-slate-600">Verbleibend</span>
                                    <span className="font-semibold text-blue-600">
                                        €{remainingAmount.toFixed(2).replace('.00', '')}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-slate-500">Einlösung</span>
                                    <span className="text-xs text-slate-500">
                                        {Math.round(((voucher.amount - remainingAmount) / voucher.amount) * 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${((voucher.amount - remainingAmount) / voucher.amount) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 