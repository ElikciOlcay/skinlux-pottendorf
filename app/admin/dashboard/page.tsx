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
    Banknote,
    Settings,
    Save,
    Search,
    RefreshCw,
    BarChart3,
    Euro,
    Mail,
    Plus,
    MapPin,
    MessageSquare
} from "lucide-react";
import { AdminAuth, AdminVouchers, type AdminAccess } from "@/lib/supabase-auth";
import { Voucher } from "@/lib/supabase";

interface BankDetails {
    bankName: string;
    accountHolder: string;
    iban: string;
    bic: string;
    reference: string;
    voucherValidityMonths: number;
    sendVoucherAsPDF: boolean;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [adminData, setAdminData] = useState<AdminAccess | null>(null);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showBankSettings, setShowBankSettings] = useState(false);
    const [bankDetails, setBankDetails] = useState<BankDetails>({
        bankName: '',
        accountHolder: '',
        iban: '',
        bic: '',
        reference: 'Gutschein-Bestellung',
        voucherValidityMonths: 12,
        sendVoucherAsPDF: false
    });
    const [savingBankDetails, setSavingBankDetails] = useState(false);

    // Filter und Search States
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [refreshing, setRefreshing] = useState(false);

    // Gutschein-Verkauf States
    const [showVoucherForm, setShowVoucherForm] = useState(false);
    const [creatingVoucher, setCreatingVoucher] = useState(false);
    const [voucherForm, setVoucherForm] = useState({
        amount: "",
        senderName: "",
        senderEmail: "",
        senderPhone: "",
        recipientName: "",
        recipientEmail: "",
        recipientPhone: "",
        recipientAddress: "",
        recipientPostalCode: "",
        recipientCity: "",
        message: "",
        deliveryMethod: "email",
        paymentMethod: "cash"
    });

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

    // Filter vouchers when search or filter changes
    useEffect(() => {
        let filtered = vouchers;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(voucher =>
                voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                voucher.sender_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                voucher.sender_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                voucher.payment_reference?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(voucher => voucher.payment_status === statusFilter);
        }

        setFilteredVouchers(filtered);
    }, [vouchers, searchTerm, statusFilter]);

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
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadVouchers();
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
                await loadVouchers();
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
                return <Clock className="w-4 h-4 text-amber-500" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <AlertTriangle className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            'paid': 'bg-green-50 text-green-700 border-green-200',
            'active': 'bg-green-50 text-green-700 border-green-200',
            'pending': 'bg-amber-50 text-amber-700 border-amber-200',
            'cancelled': 'bg-red-50 text-red-700 border-red-200'
        };
        return statusMap[status as keyof typeof statusMap] || 'bg-gray-50 text-gray-700 border-gray-200';
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
            setBankDetails({
                bankName: 'Sparkasse Pongau',
                accountHolder: 'Skinlux Bischofshofen',
                iban: 'AT00 0000 0000 0000 0000',
                bic: 'SPALAT2G',
                reference: 'Gutschein-Bestellung',
                voucherValidityMonths: 12,
                sendVoucherAsPDF: false
            });
        }
    };

    const saveBankDetails = async () => {
        setSavingBankDetails(true);
        try {
            const response = await fetch('/api/bank-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bankDetails)
            });

            if (response.ok) {
                localStorage.setItem('skinlux_bank_details', JSON.stringify(bankDetails));
                setError("");
                setShowBankSettings(false);
            } else {
                const error = await response.json();
                setError(`Fehler beim Speichern: ${error.error}`);
            }
        } catch (error) {
            console.error('Error saving bank details:', error);
            setError('Fehler beim Speichern der Bankdaten');
        } finally {
            setSavingBankDetails(false);
        }
    };

    const handleCreateVoucher = async () => {
        try {
            setCreatingVoucher(true);
            setError("");

            // Validierung
            if (!voucherForm.amount || !voucherForm.senderName || !voucherForm.senderEmail) {
                throw new Error("Bitte füllen Sie alle Pflichtfelder aus");
            }

            const amount = parseFloat(voucherForm.amount);
            if (amount < 10 || amount > 1000) {
                throw new Error("Gutscheinwert muss zwischen €10 und €1000 liegen");
            }

            // API-Aufruf zum Erstellen des Gutscheins
            const response = await fetch('/api/vouchers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    sender_name: voucherForm.senderName,
                    sender_email: voucherForm.senderEmail,
                    sender_phone: voucherForm.senderPhone || null,
                    recipient_name: voucherForm.recipientName || null,
                    recipient_email: voucherForm.recipientEmail || null,
                    recipient_phone: voucherForm.recipientPhone || null,
                    recipient_address: voucherForm.recipientAddress || null,
                    recipient_postal_code: voucherForm.recipientPostalCode || null,
                    recipient_city: voucherForm.recipientCity || null,
                    message: voucherForm.message || null,
                    delivery_method: voucherForm.deliveryMethod,
                    payment_method: voucherForm.paymentMethod,
                    payment_status: voucherForm.paymentMethod === 'cash' ? 'paid' : 'pending',
                    admin_created: true
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Fehler beim Erstellen des Gutscheins');
            }

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Fehler beim Erstellen des Gutscheins');
            }

            // Formular zurücksetzen
            setVoucherForm({
                amount: "",
                senderName: "",
                senderEmail: "",
                senderPhone: "",
                recipientName: "",
                recipientEmail: "",
                recipientPhone: "",
                recipientAddress: "",
                recipientPostalCode: "",
                recipientCity: "",
                message: "",
                deliveryMethod: "email",
                paymentMethod: "cash"
            });

            setShowVoucherForm(false);
            await loadVouchers(); // Gutscheine neu laden

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unbekannter Fehler');
        } finally {
            setCreatingVoucher(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                        <div className="animate-spin w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full"></div>
                    </div>
                    <p className="text-slate-600 font-medium">Lade Dashboard...</p>
                </div>
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Modern Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl">
                                <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                    Skinlux Admin
                                </h1>
                                {adminData && (
                                    <p className="text-sm text-slate-500">
                                        {adminData.role === 'super_admin' ? '👑 Super Admin' : '👤 Admin'}
                                        {adminData.studio && ` • ${adminData.studio.name}`}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                                Aktualisieren
                            </button>

                            <button
                                onClick={() => setShowVoucherForm(true)}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-500/25"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Gutschein verkaufen
                            </button>

                            <button
                                onClick={() => setShowBankSettings(!showBankSettings)}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25"
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Einstellungen
                            </button>

                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg hover:from-slate-900 hover:to-black transition-all duration-200 shadow-lg shadow-slate-500/25"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
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
                    <div className="mb-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl">
                                    <Banknote className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Bankdaten & Einstellungen</h2>
                                    <p className="text-sm text-slate-500">Konfiguration für Überweisungen und Gutscheine</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowBankSettings(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.bankName}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="z.B. Sparkasse Pongau"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Kontoinhaber
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.accountHolder}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountHolder: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="z.B. Skinlux Bischofshofen"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">
                                    IBAN
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.iban}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, iban: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="AT00 0000 0000 0000 0000"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">
                                    BIC
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.bic}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, bic: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="z.B. SPALAT2G"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Verwendungszweck-Vorlage
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.reference}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, reference: e.target.value }))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="z.B. Gutschein-Bestellung"
                                />
                                <p className="text-xs text-slate-500">
                                    Diese Vorlage wird in E-Mails verwendet. Die Bestellnummer wird automatisch hinzugefügt.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Gutschein-Gültigkeitsdauer (Monate)
                                </label>
                                <select
                                    value={bankDetails.voucherValidityMonths}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, voucherValidityMonths: Number(e.target.value) }))}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value={6}>6 Monate</option>
                                    <option value={12}>12 Monate (Standard)</option>
                                    <option value={18}>18 Monate</option>
                                    <option value={24}>24 Monate</option>
                                    <option value={36}>36 Monate</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 space-y-3">
                                <label className="block text-sm font-semibold text-slate-700">
                                    E-Mail-Gutschein Format
                                </label>
                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="voucherFormat"
                                            checked={!bankDetails.sendVoucherAsPDF}
                                            onChange={() => setBankDetails(prev => ({ ...prev, sendVoucherAsPDF: false }))}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                        />
                                        <span className="text-sm font-medium text-slate-700">📧 HTML-E-Mail (interaktiv)</span>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="voucherFormat"
                                            checked={bankDetails.sendVoucherAsPDF}
                                            onChange={() => setBankDetails(prev => ({ ...prev, sendVoucherAsPDF: true }))}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                                        />
                                        <span className="text-sm font-medium text-slate-700">📄 PDF-Anhang (ausdruckbar)</span>
                                    </label>
                                </div>
                                <p className="text-xs text-slate-500">
                                    {bankDetails.sendVoucherAsPDF
                                        ? "Gutscheine werden als PDF-Datei im E-Mail-Anhang versendet"
                                        : "Gutscheine werden als schöne HTML-E-Mail versendet"
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowBankSettings(false)}
                                className="px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={saveBankDetails}
                                disabled={savingBankDetails}
                                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50"
                            >
                                {savingBankDetails ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                ) : (
                                    <Save className="w-4 h-4 mr-2" />
                                )}
                                Speichern
                            </button>
                        </div>
                    </div>
                )}

                {/* Gutschein-Verkauf Modal */}
                {showVoucherForm && (
                    <div className="mb-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl">
                                    <Gift className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Neuen Gutschein verkaufen</h2>
                                    <p className="text-sm text-slate-500">Erstellen Sie einen Gutschein für einen Kunden</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowVoucherForm(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Linke Spalte - Käufer */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-blue-600" />
                                        Käufer-Informationen
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={voucherForm.senderName}
                                                onChange={(e) => setVoucherForm(prev => ({ ...prev, senderName: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="Vor- und Nachname"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                E-Mail *
                                            </label>
                                            <input
                                                type="email"
                                                value={voucherForm.senderEmail}
                                                onChange={(e) => setVoucherForm(prev => ({ ...prev, senderEmail: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="kunde@email.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Telefon
                                            </label>
                                            <input
                                                type="tel"
                                                value={voucherForm.senderPhone}
                                                onChange={(e) => setVoucherForm(prev => ({ ...prev, senderPhone: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="+43 123 456 789"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Gutscheinwert *
                                            </label>
                                            <div className="relative">
                                                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="number"
                                                    value={voucherForm.amount}
                                                    onChange={(e) => setVoucherForm(prev => ({ ...prev, amount: e.target.value }))}
                                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                    placeholder="50"
                                                    min="10"
                                                    max="1000"
                                                    required
                                                />
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">Zwischen €10 und €1000</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                        <Settings className="w-5 h-5 mr-2 text-purple-600" />
                                        Zahlungs- & Versandart
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Zahlungsart
                                            </label>
                                            <select
                                                value={voucherForm.paymentMethod}
                                                onChange={(e) => setVoucherForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            >
                                                <option value="cash">💰 Barzahlung (sofort bezahlt)</option>
                                                <option value="card">💳 Kartenzahlung (sofort bezahlt)</option>
                                                <option value="transfer">🏦 Überweisung (ausstehend)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Versandart
                                            </label>
                                            <select
                                                value={voucherForm.deliveryMethod}
                                                onChange={(e) => setVoucherForm(prev => ({ ...prev, deliveryMethod: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            >
                                                <option value="email">📧 E-Mail (kostenlos)</option>
                                                <option value="print">🖨️ Ausdrucken (vor Ort)</option>
                                                <option value="post">📮 Post (gegen Aufpreis)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rechte Spalte - Empfänger & Nachricht */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                        <Gift className="w-5 h-5 mr-2 text-green-600" />
                                        Empfänger (optional für Geschenk)
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Name des Beschenkten
                                            </label>
                                            <input
                                                type="text"
                                                value={voucherForm.recipientName}
                                                onChange={(e) => setVoucherForm(prev => ({ ...prev, recipientName: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="Name des Empfängers"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                E-Mail des Empfängers
                                            </label>
                                            <input
                                                type="email"
                                                value={voucherForm.recipientEmail}
                                                onChange={(e) => setVoucherForm(prev => ({ ...prev, recipientEmail: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="empfaenger@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Telefon des Empfängers
                                            </label>
                                            <input
                                                type="tel"
                                                value={voucherForm.recipientPhone}
                                                onChange={(e) => setVoucherForm(prev => ({ ...prev, recipientPhone: e.target.value }))}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="+43 123 456 789"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {voucherForm.deliveryMethod === 'post' && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                            <MapPin className="w-5 h-5 mr-2 text-red-600" />
                                            Postadresse
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Adresse
                                                </label>
                                                <input
                                                    type="text"
                                                    value={voucherForm.recipientAddress}
                                                    onChange={(e) => setVoucherForm(prev => ({ ...prev, recipientAddress: e.target.value }))}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                    placeholder="Straße und Hausnummer"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        PLZ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={voucherForm.recipientPostalCode}
                                                        onChange={(e) => setVoucherForm(prev => ({ ...prev, recipientPostalCode: e.target.value }))}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                        placeholder="5500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Stadt
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={voucherForm.recipientCity}
                                                        onChange={(e) => setVoucherForm(prev => ({ ...prev, recipientCity: e.target.value }))}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                        placeholder="Bischofshofen"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                        <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                                        Persönliche Nachricht
                                    </h3>

                                    <textarea
                                        value={voucherForm.message}
                                        onChange={(e) => setVoucherForm(prev => ({ ...prev, message: e.target.value }))}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        rows={4}
                                        placeholder="Herzlichen Glückwunsch! Genieße deine Auszeit bei Skinlux..."
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Diese Nachricht wird auf dem Gutschein angezeigt</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-slate-200">
                            <button
                                onClick={() => setShowVoucherForm(false)}
                                className="px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={handleCreateVoucher}
                                disabled={creatingVoucher || !voucherForm.amount || !voucherForm.senderName || !voucherForm.senderEmail}
                                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50"
                            >
                                {creatingVoucher ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                ) : (
                                    <Gift className="w-4 h-4 mr-2" />
                                )}
                                {creatingVoucher ? "Erstelle Gutschein..." : "Gutschein erstellen"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Gesamt</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
                                <p className="text-sm text-slate-600 mt-1">Gutscheine</p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                <Gift className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Bezahlt</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.paid}</p>
                                <p className="text-sm text-slate-600 mt-1">Aktive Gutscheine</p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Ausstehend</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.pending}</p>
                                <p className="text-sm text-slate-600 mt-1">Zu bearbeiten</p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Umsatz</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">€{stats.revenue.toLocaleString()}</p>
                                <p className="text-sm text-slate-600 mt-1">Gesamtwert</p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                                <Euro className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Vouchers Table */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    {/* Table Header */}
                    <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Gutschein-Übersicht</h2>
                                <p className="text-sm text-slate-500 mt-1">{filteredVouchers.length} von {vouchers.length} Gutscheinen</p>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Suchen..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    />
                                </div>

                                {/* Status Filter */}
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                >
                                    <option value="all">Alle Status</option>
                                    <option value="pending">Ausstehend</option>
                                    <option value="paid">Bezahlt</option>
                                    <option value="cancelled">Storniert</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Gutschein
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Käufer
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Betrag
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Erstellt
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Aktionen
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {filteredVouchers.map((voucher) => (
                                    <tr key={voucher.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                                                    <Gift className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-900">
                                                        {voucher.code}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {voucher.payment_reference || voucher.id.slice(0, 8)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg">
                                                    <User className="w-4 h-4 text-slate-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">
                                                        {voucher.sender_name}
                                                    </div>
                                                    <div className="text-xs text-slate-500 flex items-center space-x-1">
                                                        <Mail className="w-3 h-3" />
                                                        <span>{voucher.sender_email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-lg font-bold text-slate-900">
                                                €{Number(voucher.amount).toFixed(0)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(voucher.payment_status)}
                                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(voucher.payment_status)}`}>
                                                    {voucher.payment_status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2 text-sm text-slate-500">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(voucher.created_at).toLocaleDateString('de-DE')}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                {voucher.payment_status === 'pending' && (
                                                    <button
                                                        onClick={() => updateVoucherStatus(voucher.id, 'paid')}
                                                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                                                    >
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                        Als bezahlt markieren
                                                    </button>
                                                )}
                                                <a
                                                    href={`/admin/orders/${voucher.id}`}
                                                    className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Details anzeigen"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredVouchers.length === 0 && !loading && (
                        <div className="text-center py-16">
                            <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mx-auto mb-4">
                                <Gift className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                {searchTerm || statusFilter !== 'all' ? 'Keine Ergebnisse gefunden' : 'Keine Gutscheine vorhanden'}
                            </h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'Versuchen Sie andere Suchbegriffe oder Filter.'
                                    : 'Es wurden noch keine Gutscheine erstellt.'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
} 