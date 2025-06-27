"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    LogOut,
    Gift,
    CheckCircle,
    Clock,
    XCircle,
    Eye,
    User,
    Calendar,
    AlertTriangle,
    CreditCard,
    Banknote,
    Settings,
    Save
} from "lucide-react";
import { AdminAuth, AdminVouchers, type AdminAccess } from "@/lib/supabase-auth";
import { Voucher } from "@/lib/supabase";

interface BankDetails {
    bankName: string;
    accountHolder: string;
    iban: string;
    bic: string;
    reference: string;
    voucherValidityMonths: number; // Gültigkeit der Gutscheine in Monaten
}

export default function AdminDashboard() {
    const router = useRouter();
    const [adminData, setAdminData] = useState<AdminAccess | null>(null);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showBankSettings, setShowBankSettings] = useState(false);
    const [bankDetails, setBankDetails] = useState<BankDetails>({
        bankName: '',
        accountHolder: '',
        iban: '',
        bic: '',
        reference: 'Gutschein-Bestellung',
        voucherValidityMonths: 12
    });
    const [savingBankDetails, setSavingBankDetails] = useState(false);

    // Auth-Check und Daten laden
    useEffect(() => {
        const checkAuthAndLoadData = async () => {
            try {
                const { isAdmin } = await AdminAuth.isAdmin();

                if (!isAdmin) {
                    router.push("/admin");
                    return;
                }

                const adminInfo = await AdminAuth.getAdminData();
                setAdminData(adminInfo);

                await loadVouchers();
                await loadBankDetails();
            } catch (error) {
                console.error("Auth check failed:", error);
                router.push("/admin");
            }
        };

        checkAuthAndLoadData();
    }, [router]);

    const loadVouchers = async () => {
        try {
            const result = await AdminVouchers.getAllVouchers();
            if (result.success) {
                setVouchers(result.vouchers || []);
                setError("");
            } else {
                setError(result.error || "Fehler beim Laden der Vouchers");
            }
        } catch (error) {
            setError("Unerwarteter Fehler beim Laden der Vouchers");
            console.error("Load vouchers error:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleLogout = async () => {
        const result = await AdminAuth.signOut();
        if (result.success) {
            router.push("/admin");
        }
    };

    const updateVoucherStatus = async (voucherId: string, newStatus: string) => {
        try {
            const result = await AdminVouchers.updateVoucherStatus(voucherId, newStatus);
            if (result.success) {
                await loadVouchers(); // Neuladen der Daten
            } else {
                setError(result.error || "Fehler beim Aktualisieren");
            }
        } catch (error) {
            setError("Fehler beim Aktualisieren des Voucher-Status");
            console.error("Update error:", error);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
            case 'active':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <AlertTriangle className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            'paid': 'bg-green-100 text-green-800',
            'active': 'bg-green-100 text-green-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return statusMap[status as keyof typeof statusMap] || 'bg-gray-100 text-gray-800';
    };

    const loadBankDetails = async () => {
        try {
            const response = await fetch('/api/bank-details');
            if (response.ok) {
                const result = await response.json();
                setBankDetails(result.bankDetails);
            }
        } catch (error) {
            console.error('Error loading bank details:', error);
            // Set defaults on error
            setBankDetails({
                bankName: 'Sparkasse Pongau',
                accountHolder: 'Skinlux Bischofshofen',
                iban: 'AT00 0000 0000 0000 0000',
                bic: 'SPALAT2G',
                reference: 'Gutschein-Bestellung',
                voucherValidityMonths: 12
            });
        }
    };

    const saveBankDetails = async () => {
        setSavingBankDetails(true);
        try {
            // Save to API
            const response = await fetch('/api/bank-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bankDetails)
            });

            if (response.ok) {
                // Also save to localStorage for client-side access
                localStorage.setItem('skinlux_bank_details', JSON.stringify(bankDetails));
                alert('Bankdaten erfolgreich gespeichert!');
                setShowBankSettings(false);
            } else {
                const error = await response.json();
                alert(`Fehler beim Speichern: ${error.error}`);
            }
        } catch (error) {
            console.error('Error saving bank details:', error);
            alert('Fehler beim Speichern der Bankdaten');
        } finally {
            setSavingBankDetails(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const stats = {
        total: vouchers.length,
        pending: vouchers.filter(v => v.payment_status === 'pending').length,
        paid: vouchers.filter(v => v.payment_status === 'paid').length,
        revenue: vouchers
            .filter(v => v.payment_status === 'paid')
            .reduce((sum, v) => sum + Number(v.amount), 0)
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-light text-gray-900">
                                Admin Dashboard
                            </h1>
                            {adminData && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {adminData.role === 'super_admin' ? '👑 Super Admin' : '👤 Admin'}
                                    {adminData.studio && ` • ${adminData.studio.name}`}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowBankSettings(!showBankSettings)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Settings className="w-4 h-4" />
                                Bankdaten
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Abmelden
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Bank Settings Modal */}
                {showBankSettings && (
                    <div className="mb-8 bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Banknote className="w-5 h-5" />
                                Bankdaten für Überweisungen
                            </h2>
                            <button
                                onClick={() => setShowBankSettings(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.bankName}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="z.B. Sparkasse Pongau"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kontoinhaber
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.accountHolder}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountHolder: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="z.B. Skinlux Bischofshofen"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    IBAN
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.iban}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, iban: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="AT00 0000 0000 0000 0000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    BIC
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.bic}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, bic: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="z.B. SPALAT2G"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Verwendungszweck-Vorlage
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.reference}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, reference: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="z.B. Gutschein-Bestellung"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Diese Vorlage wird in E-Mails verwendet. Die Bestellnummer wird automatisch hinzugefügt.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gutschein-Gültigkeitsdauer (Monate)
                                </label>
                                <select
                                    value={bankDetails.voucherValidityMonths}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, voucherValidityMonths: Number(e.target.value) }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={6}>6 Monate</option>
                                    <option value={12}>12 Monate (Standard)</option>
                                    <option value={18}>18 Monate</option>
                                    <option value={24}>24 Monate</option>
                                    <option value={36}>36 Monate</option>
                                </select>
                                <p className="text-sm text-gray-500 mt-1">
                                    Neue Gutscheine sind für diese Dauer gültig.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={saveBankDetails}
                                disabled={savingBankDetails}
                                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                            >
                                {savingBankDetails ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                Speichern
                            </button>
                        </div>
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <CreditCard className="w-8 h-8 text-blue-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Gesamt Vouchers</p>
                                <p className="text-2xl font-light text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Bezahlt</p>
                                <p className="text-2xl font-light text-gray-900">
                                    {stats.paid}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <Clock className="w-8 h-8 text-yellow-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Ausstehend</p>
                                <p className="text-2xl font-light text-gray-900">
                                    {stats.pending}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <Banknote className="w-8 h-8 text-green-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Gesamtwert</p>
                                <p className="text-2xl font-light text-gray-900">
                                    €{stats.revenue.toFixed(0)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        {error}
                    </div>
                )}

                {/* Vouchers Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Voucher Übersicht</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Käufer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Betrag
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Erstellt
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gültig bis
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aktionen
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {vouchers.map((voucher) => (
                                    <tr key={voucher.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Gift className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {voucher.code}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 text-gray-400 mr-2" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {voucher.sender_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {voucher.sender_email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                €{Number(voucher.amount).toFixed(0)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(voucher.payment_status)}
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(voucher.payment_status)}`}>
                                                    {voucher.payment_status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {new Date(voucher.created_at).toLocaleDateString('de-DE')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {voucher.expires_at ? new Date(voucher.expires_at).toLocaleDateString('de-DE') : 'Nicht gesetzt'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {voucher.payment_status === 'pending' && (
                                                    <button
                                                        onClick={() => updateVoucherStatus(voucher.id, 'paid')}
                                                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                                                    >
                                                        Als bezahlt markieren
                                                    </button>
                                                )}
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {vouchers.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Vouchers gefunden</h3>
                            <p className="text-gray-500">Es wurden noch keine Vouchers erstellt.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
} 