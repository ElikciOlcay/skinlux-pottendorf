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
    Package
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
    }, [router, voucherId]);

    const loadVoucherDetail = useCallback(async () => {
        try {
            setLoading(true);

            // API-Aufruf für Voucher-Details
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

            // Edit-Daten initialisieren
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
    }, []);

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

            await loadVoucherDetail(); // Neu laden
            setIsEditing(false);

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

            // Formular zurücksetzen
            setRedemptionAmount("");
            setRedemptionDescription("");
            setShowRedemptionForm(false);

            // Voucher neu laden
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
        } catch (error) {
            setError(error instanceof Error ? error.message : "Fehler beim Status-Update");
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
            case 'active':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'redeemed':
                return <Gift className="w-5 h-5 text-blue-500" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <AlertTriangle className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            'paid': 'bg-green-100 text-green-800',
            'active': 'bg-green-100 text-green-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'redeemed': 'bg-blue-100 text-blue-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return statusMap[status as keyof typeof statusMap] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!voucher) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-medium text-gray-900 mb-2">Gutschein nicht gefunden</h2>
                    <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
                        ← Zurück zum Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const remainingAmount = voucher.remaining_amount ?? voucher.amount;
    const isFullyRedeemed = remainingAmount <= 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <div className="text-gray-300">|</div>
                            <h1 className="text-lg font-medium text-gray-900">
                                Gutschein {voucher.code}
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Bearbeiten
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleSaveChanges}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        {isSaving ? "Speichere..." : "Speichern"}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
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
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        {error}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Hauptbereich */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Gutschein-Übersicht */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Gift className="w-8 h-8 text-blue-500" />
                                    <div>
                                        <h2 className="text-2xl font-light text-gray-900">{voucher.code}</h2>
                                        <p className="text-gray-500">Bestellung #{voucher.order_number}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-3xl font-light text-gray-900">
                                        €{remainingAmount.toFixed(0)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        von €{voucher.amount} verbleibend
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                {getStatusIcon(voucher.payment_status)}
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(voucher.payment_status)}`}>
                                    {voucher.payment_status}
                                </span>

                                {voucher.status !== voucher.payment_status && (
                                    <>
                                        <div className="text-gray-300">•</div>
                                        {getStatusIcon(voucher.status)}
                                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(voucher.status)}`}>
                                            {voucher.status}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Status-Aktionen */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {voucher.payment_status === 'pending' && (
                                    <button
                                        onClick={() => updateVoucherStatus('paid')}
                                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                                    >
                                        Als bezahlt markieren
                                    </button>
                                )}

                                {voucher.status === 'pending' && voucher.payment_status === 'paid' && (
                                    <button
                                        onClick={() => updateVoucherStatus('active')}
                                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                                    >
                                        Aktivieren
                                    </button>
                                )}
                            </div>

                            {/* Einlösung */}
                            {voucher.status === 'active' && !isFullyRedeemed && (
                                <div className="border-t pt-6">
                                    {!showRedemptionForm ? (
                                        <button
                                            onClick={() => setShowRedemptionForm(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <Euro className="w-4 h-4" />
                                            Betrag einlösen
                                        </button>
                                    ) : (
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-900 mb-4">Gutschein einlösen</h3>

                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Betrag (max. €{remainingAmount.toFixed(0)})
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={redemptionAmount}
                                                        onChange={(e) => setRedemptionAmount(e.target.value)}
                                                        max={remainingAmount}
                                                        min="1"
                                                        step="1"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="Betrag eingeben"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Beschreibung
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={redemptionDescription}
                                                        onChange={(e) => setRedemptionDescription(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="z.B. HydraFacial"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={handleRedemption}
                                                    disabled={isRedeeming || !redemptionAmount}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                                >
                                                    {isRedeeming ? "Löse ein..." : "Einlösen"}
                                                </button>
                                                <button
                                                    onClick={() => setShowRedemptionForm(false)}
                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                                >
                                                    Abbrechen
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Käufer-Informationen */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Käufer-Informationen</h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <User className="w-4 h-4 inline mr-2" />
                                        Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.sender_name}
                                            onChange={(e) => setEditData({ ...editData, sender_name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{voucher.sender_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="w-4 h-4 inline mr-2" />
                                        E-Mail
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editData.sender_email}
                                            onChange={(e) => setEditData({ ...editData, sender_email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{voucher.sender_email}</p>
                                    )}
                                </div>

                                {(voucher.sender_phone || isEditing) && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Telefon
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={editData.sender_phone}
                                                onChange={(e) => setEditData({ ...editData, sender_phone: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{voucher.sender_phone || "-"}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Empfänger-Informationen (falls Post-Versand) */}
                        {(voucher.delivery_method === 'post' || voucher.recipient_name) && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    <Package className="w-5 h-5 inline mr-2" />
                                    Empfänger-Informationen (Post-Versand)
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.recipient_name}
                                                onChange={(e) => setEditData({ ...editData, recipient_name: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{voucher.recipient_name || "-"}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="w-4 h-4 inline mr-2" />
                                            Adresse
                                        </label>
                                        {isEditing ? (
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    value={editData.recipient_address}
                                                    onChange={(e) => setEditData({ ...editData, recipient_address: e.target.value })}
                                                    placeholder="Straße und Hausnummer"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        type="text"
                                                        value={editData.recipient_postal_code}
                                                        onChange={(e) => setEditData({ ...editData, recipient_postal_code: e.target.value })}
                                                        placeholder="PLZ"
                                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={editData.recipient_city}
                                                        onChange={(e) => setEditData({ ...editData, recipient_city: e.target.value })}
                                                        placeholder="Stadt"
                                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-gray-900">
                                                {voucher.recipient_address && (
                                                    <div>
                                                        <p>{voucher.recipient_address}</p>
                                                        <p>
                                                            {voucher.recipient_postal_code} {voucher.recipient_city}
                                                        </p>
                                                    </div>
                                                )}
                                                {!voucher.recipient_address && <p>-</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Nachricht */}
                        {(voucher.message || isEditing) && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Persönliche Nachricht</h3>
                                {isEditing ? (
                                    <textarea
                                        value={editData.message}
                                        onChange={(e) => setEditData({ ...editData, message: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Persönliche Nachricht..."
                                    />
                                ) : (
                                    <div className="bg-gray-50 p-4 rounded-lg italic">
                                        &quot;{voucher.message || "Keine Nachricht"}&quot;
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Gutschein-Details */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Ursprungsbetrag:</span>
                                    <span className="font-medium">€{voucher.amount}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Verbleibendes Guthaben:</span>
                                    <span className="font-medium text-green-600">€{remainingAmount.toFixed(0)}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Erstellt:</span>
                                    <span className="font-medium">
                                        {new Date(voucher.created_at).toLocaleDateString('de-DE')}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Gültig bis:</span>
                                    <span className="font-medium">
                                        {new Date(voucher.expires_at).toLocaleDateString('de-DE')}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Versandart:</span>
                                    <span className="font-medium">
                                        {voucher.delivery_method === 'email' ? 'E-Mail' : 'Post'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Einlösungshistorie */}
                        {voucher.redemptions && voucher.redemptions.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    <Receipt className="w-5 h-5 inline mr-2" />
                                    Einlösungshistorie
                                </h3>

                                <div className="space-y-3">
                                    {voucher.redemptions.map((redemption) => (
                                        <div key={redemption.id} className="border-l-4 border-blue-200 pl-4 py-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium">€{redemption.amount}</p>
                                                    <p className="text-sm text-gray-600">{redemption.description}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(redemption.redeemed_at).toLocaleDateString('de-DE')}
                                                    </p>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Verbleibend: €{redemption.remaining_after}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
} 