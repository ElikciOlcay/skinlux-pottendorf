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
    Euro,
    Mail,
    Plus,
    ArrowLeft,
    Sun,
    Moon
} from "lucide-react";
import { AdminAuth, AdminVouchers, type AdminAccess } from "@/lib/supabase-auth";
import { Voucher } from "@/lib/supabase";
import { Inter } from "next/font/google";

// Inter Font konfigurieren
const inter = Inter({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter'
});

interface BankDetails {
    bankName: string;
    accountHolder: string;
    iban: string;
    bic: string;
    reference: string;
    voucherValidityMonths: number;
    sendVoucherAsPDF: boolean;
    // Address fields for vouchers and emails
    businessName: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
    phone?: string;
    email: string;
    website: string;
}

export default function VouchersPage() {
    const router = useRouter();
    const [adminData, setAdminData] = useState<AdminAccess | null>(null);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showBankSettings, setShowBankSettings] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const [bankDetails, setBankDetails] = useState<BankDetails>({
        bankName: '',
        accountHolder: '',
        iban: '',
        bic: '',
        reference: 'Gutschein-Bestellung',
        voucherValidityMonths: 12,
        sendVoucherAsPDF: false,
        // Default address values
        businessName: 'Skinlux Bischofshofen',
        streetAddress: 'Salzburger Straße 45',
        postalCode: '5500',
        city: 'Bischofshofen',
        country: 'Österreich',
        phone: '+43 660 3001449',
        email: 'hello@skinlux.at',
        website: 'www.skinlux.at'
    });
    const [savingBankDetails, setSavingBankDetails] = useState(false);

    // Filter und Search States
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [refreshing, setRefreshing] = useState(false);

    // Loading States für Status-Updates
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    // Gutschein-Verkauf States
    const [showVoucherForm, setShowVoucherForm] = useState(false);
    const [creatingVoucher, setCreatingVoucher] = useState(false);
    const [voucherForm, setVoucherForm] = useState({
        amount: "",
        senderName: "",
        senderEmail: "",
        senderPhone: "",
        voucherCode: ""
    });

    // Theme aus localStorage laden
    useEffect(() => {
        const savedTheme = localStorage.getItem('skinlux-dashboard-theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);

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
            setUpdatingStatus(voucherId);
            setError(""); // Clear any previous errors

            const result = await AdminVouchers.updateVoucherStatus(voucherId, newStatus);
            if (result.success) {
                await loadVouchers();
            } else {
                setError(result.error || "Fehler beim Aktualisieren");
            }
        } catch (error) {
            setError("Fehler beim Aktualisieren des Voucher-Status");
            console.error("Update error:", error);
        } finally {
            setUpdatingStatus(null);
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('skinlux-dashboard-theme', newTheme);
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
            'paid': theme === 'dark' ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-green-50 text-green-700 border-green-200',
            'active': theme === 'dark' ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-green-50 text-green-700 border-green-200',
            'pending': theme === 'dark' ? 'bg-amber-900/30 text-amber-400 border-amber-800' : 'bg-amber-50 text-amber-700 border-amber-200',
            'cancelled': theme === 'dark' ? 'bg-red-900/30 text-red-400 border-red-800' : 'bg-red-50 text-red-700 border-red-200'
        };
        return statusMap[status as keyof typeof statusMap] || (theme === 'dark' ? 'bg-gray-900/30 text-gray-400 border-gray-800' : 'bg-gray-50 text-gray-700 border-gray-200');
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

    // Gutscheinnummer generieren (einheitliches Format: SLX1234)
    const generateVoucherCode = () => {
        const randomNum = Math.floor(Math.random() * 10000);
        return `SLX${randomNum.toString().padStart(4, '0')}`;
    };

    const handleCreateVoucher = async () => {
        try {
            setCreatingVoucher(true);
            setError("");

            // Validierung
            if (!voucherForm.amount || !voucherForm.senderName) {
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
                    sender_email: voucherForm.senderEmail || null, // E-Mail ist optional für Admin-Gutscheine
                    sender_phone: voucherForm.senderPhone || null,
                    message: null,
                    code: voucherForm.voucherCode,
                    admin_created: true // API erkennt Admin-Gutscheine und setzt korrekte Werte
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
                voucherCode: ""
            });

            setShowVoucherForm(false);
            await loadVouchers(); // Gutscheine neu laden

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unbekannter Fehler');
        } finally {
            setCreatingVoucher(false);
        }
    };

    // Gutscheinnummer generieren, wenn Form geöffnet wird
    const handleOpenVoucherForm = () => {
        const newCode = generateVoucherCode();
        setVoucherForm(prev => ({ ...prev, voucherCode: newCode }));
        setShowVoucherForm(true);
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-50'} flex items-center justify-center ${inter.variable}`} style={{ fontFamily: 'var(--font-inter)' }}>
                <div className="text-center">
                    <div className="relative">
                        <div className={`w-20 h-20 border-4 ${theme === 'dark' ? 'border-purple-500/20' : 'border-purple-300/30'} rounded-full`}></div>
                        <div className={`absolute top-0 w-20 h-20 border-4 ${theme === 'dark' ? 'border-purple-500' : 'border-purple-400'} rounded-full animate-spin border-t-transparent`}></div>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} mt-4 font-medium tracking-tight`} style={{ fontFamily: 'var(--font-inter)' }}>Lade Gutscheine...</p>
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
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-50'} ${inter.variable} transition-colors duration-300`} style={{ fontFamily: 'var(--font-inter)' }}>
            {/* Modern Gradient Background */}
            {theme === 'dark' && (
                <>
                    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 pointer-events-none" />
                    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
                </>
            )}

            {/* Modern Header */}
            <header className={`relative ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800/50' : 'bg-white/80 border-gray-200'} backdrop-blur-xl border-b sticky top-0 z-50 transition-colors duration-300`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <a
                                href="/admin/dashboard"
                                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${theme === 'dark'
                                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Dashboard
                            </a>
                            <div className={`h-6 w-px ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                                    <Gift className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} tracking-tight`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Gutschein-Verwaltung
                                    </h1>
                                    {adminData && (
                                        <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                            {adminData.role === 'super_admin' ? '👑 Super Admin' : '👤 Admin'}
                                            {adminData.studio && ` • ${adminData.studio.name}`}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${theme === 'dark'
                                    ? 'text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800'
                                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                                    }`}
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                                Aktualisieren
                            </button>

                            <button
                                onClick={handleOpenVoucherForm}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-500/25"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Gutschein verkaufen
                            </button>

                            <button
                                onClick={() => setShowBankSettings(!showBankSettings)}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Einstellungen
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-all duration-200 ${theme === 'dark'
                                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                title={theme === 'dark' ? 'Hell-Modus aktivieren' : 'Dunkel-Modus aktivieren'}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={handleLogout}
                                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${theme === 'dark'
                                    ? 'text-white bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-lg shadow-slate-500/25'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Abmelden
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Bank Settings Modal */}
                {showBankSettings && (
                    <div className={`mb-8 ${theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-200'} backdrop-blur-xl rounded-2xl shadow-xl border p-8 transition-colors duration-300`}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl">
                                    <Banknote className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-inter)' }}>Bankdaten & Einstellungen</h2>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} style={{ fontFamily: 'var(--font-inter)' }}>Konfiguration für Überweisungen und Gutscheine</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowBankSettings(false)}
                                className={`${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.bankName}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${theme === 'dark'
                                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                        } border`}
                                    placeholder="z.B. Sparkasse Pongau"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                    Kontoinhaber
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.accountHolder}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountHolder: e.target.value }))}
                                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${theme === 'dark'
                                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                        } border`}
                                    placeholder="z.B. Skinlux Bischofshofen"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                    IBAN
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.iban}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, iban: e.target.value }))}
                                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${theme === 'dark'
                                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                        } border`}
                                    placeholder="AT00 0000 0000 0000 0000"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                    BIC
                                </label>
                                <input
                                    type="text"
                                    value={bankDetails.bic}
                                    onChange={(e) => setBankDetails(prev => ({ ...prev, bic: e.target.value }))}
                                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${theme === 'dark'
                                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                        } border`}
                                    placeholder="z.B. SPALAT2G"
                                />
                            </div>
                        </div>

                        {/* Geschäftsadresse Sektion */}
                        <div className="mb-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
                                    <Settings className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-inter)' }}>Geschäftsadresse</h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} style={{ fontFamily: 'var(--font-inter)' }}>Wird auf Gutscheinen und in E-Mails angezeigt</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Firmenname
                                    </label>
                                    <input
                                        type="text"
                                        value={bankDetails.businessName}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, businessName: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="z.B. Skinlux Bischofshofen"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Straße & Hausnummer
                                    </label>
                                    <input
                                        type="text"
                                        value={bankDetails.streetAddress}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, streetAddress: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="z.B. Salzburger Straße 45"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Postleitzahl
                                    </label>
                                    <input
                                        type="text"
                                        value={bankDetails.postalCode}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, postalCode: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="z.B. 5500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Stadt
                                    </label>
                                    <input
                                        type="text"
                                        value={bankDetails.city}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, city: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="z.B. Bischofshofen"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Land
                                    </label>
                                    <input
                                        type="text"
                                        value={bankDetails.country}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, country: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="z.B. Österreich"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Telefon
                                    </label>
                                    <input
                                        type="text"
                                        value={bankDetails.phone || ''}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, phone: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="z.B. +43 123 456 789"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        E-Mail
                                    </label>
                                    <input
                                        type="email"
                                        value={bankDetails.email}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, email: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="z.B. hello@skinlux.at"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        value={bankDetails.website}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, website: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="z.B. skinlux.at"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gutschein-Einstellungen */}
                        <div className="mb-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                                    <Gift className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-inter)' }}>Gutschein-Einstellungen</h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} style={{ fontFamily: 'var(--font-inter)' }}>Konfiguration für Gutschein-Verhalten</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Verwendungszweck-Vorlage
                                    </label>
                                    <input
                                        type="text"
                                        value={bankDetails.reference}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, reference: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="z.B. Gutschein-Bestellung"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Gültigkeit (Monate)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="36"
                                        value={bankDetails.voucherValidityMonths}
                                        onChange={(e) => setBankDetails(prev => ({ ...prev, voucherValidityMonths: parseInt(e.target.value) || 12 }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="12"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="sendVoucherAsPDF"
                                            checked={bankDetails.sendVoucherAsPDF}
                                            onChange={(e) => setBankDetails(prev => ({ ...prev, sendVoucherAsPDF: e.target.checked }))}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <label htmlFor="sendVoucherAsPDF" className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} style={{ fontFamily: 'var(--font-inter)' }}>
                                            Gutscheine automatisch als PDF versenden
                                        </label>
                                    </div>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} mt-1 ml-7`} style={{ fontFamily: 'var(--font-inter)' }}>
                                        Wenn aktiviert, wird der Gutschein automatisch als PDF an die E-Mail-Adresse gesendet
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowBankSettings(false)}
                                className={`px-6 py-3 text-sm font-medium rounded-xl transition-colors ${theme === 'dark'
                                    ? 'text-slate-300 bg-slate-800 hover:bg-slate-700'
                                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                                    }`}
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
                    <div className={`mb-8 ${theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-200'} backdrop-blur-xl rounded-2xl shadow-xl border p-8 transition-colors duration-300`}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl">
                                    <Gift className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Gutschein verkaufen</h2>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>Vor-Ort-Verkauf mit sofortiger Bezahlung</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowVoucherForm(false)}
                                className={`${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="max-w-md mx-auto space-y-6">
                            {/* Gutschein-Code Display */}
                            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Gutschein-Code</h3>
                                <div className="text-2xl font-bold text-green-900 dark:text-green-200 font-mono tracking-wider">
                                    {voucherForm.voucherCode}
                                </div>
                                <p className="text-sm text-green-700 dark:text-green-400 mt-2">Dieser Code wird auf dem Gutschein gedruckt</p>
                            </div>

                            {/* Käufer-Informationen */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                                        <User className="w-5 h-5 mr-2 text-blue-600" />
                                        Käufer-Informationen
                                    </h3>
                                </div>

                                <div>
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={voucherForm.senderName}
                                        onChange={(e) => setVoucherForm(prev => ({ ...prev, senderName: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="Vor- und Nachname"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
                                        E-Mail
                                    </label>
                                    <input
                                        type="email"
                                        value={voucherForm.senderEmail}
                                        onChange={(e) => setVoucherForm(prev => ({ ...prev, senderEmail: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="kunde@email.com (optional)"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        value={voucherForm.senderPhone}
                                        onChange={(e) => setVoucherForm(prev => ({ ...prev, senderPhone: e.target.value }))}
                                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                        placeholder="+43 123 456 789"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
                                        Gutscheinwert * (€)
                                    </label>
                                    <div className="relative">
                                        <Euro className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-400'}`} />
                                        <input
                                            type="number"
                                            value={voucherForm.amount}
                                            onChange={(e) => setVoucherForm(prev => ({ ...prev, amount: e.target.value }))}
                                            className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${theme === 'dark'
                                                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                                } border`}
                                            placeholder="50"
                                            min="10"
                                            max="1000"
                                            required
                                        />
                                    </div>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} mt-1`}>Zwischen €10 und €1000</p>
                                </div>
                            </div>

                            {/* Info-Box */}
                            <div className={`${theme === 'dark' ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4`}>
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-900'}`}>Vor-Ort-Verkauf</span>
                                </div>
                                <ul className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'} space-y-1`}>
                                    <li>• Sofortige Barzahlung</li>
                                    <li>• Gutschein wird ausgedruckt</li>
                                    <li>• Status: Bezahlt & Aktiv</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`flex justify-end space-x-3 mt-8 pt-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
                            <button
                                onClick={() => setShowVoucherForm(false)}
                                className={`px-6 py-3 text-sm font-medium rounded-xl transition-colors ${theme === 'dark'
                                    ? 'text-slate-300 bg-slate-800 hover:bg-slate-700'
                                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={handleCreateVoucher}
                                disabled={creatingVoucher || !voucherForm.amount || !voucherForm.senderName}
                                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-500/25 disabled:opacity-50"
                            >
                                {creatingVoucher ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                ) : (
                                    <Gift className="w-4 h-4 mr-2" />
                                )}
                                {creatingVoucher ? "Erstelle Gutschein..." : "Gutschein verkaufen"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className={`mb-6 ${theme === 'dark' ? 'bg-red-900/30 border-red-800 text-red-400' : 'bg-red-50 border-red-200 text-red-700'} border px-6 py-4 rounded-xl flex items-center space-x-3`}>
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className={`${theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-200'} backdrop-blur-xl p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wide`}>Gesamt</p>
                                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-1`}>{stats.total}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-600'} mt-1`}>Gutscheine</p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                <Gift className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className={`${theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-200'} backdrop-blur-xl p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wide`}>Bezahlt</p>
                                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-1`}>{stats.paid}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-600'} mt-1`}>Aktive Gutscheine</p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className={`${theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-200'} backdrop-blur-xl p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wide`}>Ausstehend</p>
                                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-1`}>{stats.pending}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-600'} mt-1`}>Zu bearbeiten</p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className={`${theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-200'} backdrop-blur-xl p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wide`}>Umsatz</p>
                                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-1`}>€{stats.revenue.toLocaleString()}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-600'} mt-1`}>Gesamtwert</p>
                            </div>
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                                <Euro className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Vouchers Table */}
                <div className={`${theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-200'} backdrop-blur-xl rounded-2xl shadow-xl border overflow-hidden`}>
                    {/* Table Header */}
                    <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-gray-200 bg-gray-50/50'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div>
                                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Gutschein-Übersicht</h2>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} mt-1`}>{filteredVouchers.length} von {vouchers.length} Gutscheinen</p>
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                {/* Search */}
                                <div className="relative">
                                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-400'}`} />
                                    <input
                                        type="text"
                                        placeholder="Suchen..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className={`pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                                            } border`}
                                    />
                                </div>

                                {/* Status Filter */}
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${theme === 'dark'
                                        ? 'bg-slate-800 border-slate-700 text-white'
                                        : 'bg-white border-gray-200 text-gray-900'
                                        } border`}
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
                        <table className="min-w-full divide-y divide-slate-800">
                            <thead className={theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50/50'}>
                                <tr>
                                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Gutschein
                                    </th>
                                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Käufer
                                    </th>
                                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Betrag
                                    </th>
                                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Status
                                    </th>
                                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Erstellt
                                    </th>
                                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                        Aktionen
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`${theme === 'dark' ? 'bg-slate-900 divide-slate-800' : 'bg-white divide-gray-100'} divide-y`}>
                                {filteredVouchers.map((voucher) => (
                                    <tr key={voucher.id} className={`${theme === 'dark' ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50/50'} transition-colors`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <div className={`flex items-center justify-center w-8 h-8 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-lg`}>
                                                    <Gift className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                        {voucher.code}
                                                    </div>
                                                    <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                                                        {voucher.payment_reference || voucher.id.slice(0, 8)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                <div className={`flex items-center justify-center w-8 h-8 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'} rounded-lg`}>
                                                    <User className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`} />
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                        {voucher.sender_name}
                                                    </div>
                                                    <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} flex items-center space-x-1`}>
                                                        <Mail className="w-3 h-3" />
                                                        <span>{voucher.sender_email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
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
                                            <div className={`flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(voucher.created_at).toLocaleDateString('de-DE')}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                {voucher.payment_status === 'pending' && (
                                                    <button
                                                        onClick={() => updateVoucherStatus(voucher.id, 'paid')}
                                                        disabled={updatingStatus === voucher.id}
                                                        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark'
                                                            ? 'text-green-400 bg-green-900/30 border border-green-800 hover:bg-green-900/50'
                                                            : 'text-green-700 bg-green-50 border border-green-200 hover:bg-green-100'
                                                            }`}
                                                    >
                                                        {updatingStatus === voucher.id ? (
                                                            <>
                                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-600 mr-1"></div>
                                                                Wird aktualisiert...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                                Als bezahlt markieren
                                                            </>
                                                        )}
                                                    </button>
                                                )}
                                                <a
                                                    href={`/admin/orders/${voucher.id}`}
                                                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${theme === 'dark'
                                                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                                        }`}
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
                            <div className={`flex items-center justify-center w-16 h-16 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'} rounded-2xl mx-auto mb-4`}>
                                <Gift className={`w-8 h-8 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-400'}`} />
                            </div>
                            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                                {searchTerm || statusFilter !== 'all' ? 'Keine Ergebnisse gefunden' : 'Keine Gutscheine vorhanden'}
                            </h3>
                            <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} max-w-sm mx-auto`}>
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