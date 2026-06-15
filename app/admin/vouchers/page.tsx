"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
    Moon,
    MoreVertical,
    Trash2,
    RotateCcw,
    X,
    Crown,
    CreditCard,
    Printer,
    Building2,
    Package,
    ChevronLeft,
    ChevronRight,
    LayoutGrid
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
        businessName: 'Skinlux Pottendorf',
        streetAddress: 'Marktplatz 14',
        postalCode: '2486',
        city: 'Pottendorf',
        country: 'Österreich',
        phone: '+43 664 91 88 632',
        email: 'hey@skinlux.at',
        website: 'www.skinlux.at'
    });
    const [savingBankDetails, setSavingBankDetails] = useState(false);

    // Filter und Search States
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [refreshing, setRefreshing] = useState(false);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Papierkorb States
    const [currentTab, setCurrentTab] = useState<'active' | 'trash'>('active');
    const [deletedVouchers, setDeletedVouchers] = useState<Voucher[]>([]);

    // Loading States für Status-Updates
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    // Action Modal State
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [showActionModal, setShowActionModal] = useState(false);

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

    // Action Modal handlers
    const openActionModal = (voucher: Voucher) => {
        setSelectedVoucher(voucher);
        setShowActionModal(true);
    };

    const closeActionModal = () => {
        setSelectedVoucher(null);
        setShowActionModal(false);
    };

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

    // Filter basierend auf Tab und Suchkriterien
    const currentVouchers = currentTab === 'active' ? vouchers : deletedVouchers;

    const filteredVouchers = currentVouchers.filter(voucher => {
        const matchesSearch = searchTerm === "" ||
            voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            voucher.sender_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (voucher.sender_email && voucher.sender_email.toLowerCase().includes(searchTerm.toLowerCase()));

        const totalAmount = Number(voucher.amount);
        const remainingAmount = Number(voucher.remaining_amount ?? voucher.amount);

        const isDepleted = remainingAmount <= 0;
        const isPartiallyRedeemed = remainingAmount > 0 && remainingAmount < totalAmount;

        const matchesStatus = statusFilter === "all" ||
            voucher.payment_status === statusFilter ||
            (statusFilter === "partially_redeemed" && isPartiallyRedeemed) ||
            (statusFilter === "depleted" && isDepleted);

        return matchesSearch && matchesStatus;
    });

    // Pagination-Berechnungen
    const totalItems = filteredVouchers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedVouchers = filteredVouchers.slice(startIndex, endIndex);

    // Seite zurücksetzen, wenn Filter geändert werden
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, currentTab]);

    // Pagination-Funktionen
    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const loadVouchers = async () => {
        try {
            // Lade aktive Gutscheine
            const activeResponse = await fetch('/api/vouchers');
            const activeResult = await activeResponse.json();

            // Lade gelöschte Gutscheine
            const deletedResponse = await fetch('/api/vouchers?only_deleted=true');
            const deletedResult = await deletedResponse.json();

            if (activeResult.vouchers) {
                setVouchers(activeResult.vouchers);
                setError("");
            } else {
                setError("Fehler beim Laden der Vouchers");
            }

            if (deletedResult.vouchers) {
                setDeletedVouchers(deletedResult.vouchers);
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

    const getStatusLabel = (status: string): string => {
        const labels: Record<string, string> = {
            paid: 'Bezahlt',
            pending: 'Ausstehend',
            active: 'Aktiv',
            cancelled: 'Storniert',
            partially_redeemed: 'Teilweise eingelöst',
            depleted: 'Aufgebraucht'
        };
        return labels[status] || status;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
            case 'active':
                return <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-amber-500 shrink-0" />;
            case 'partially_redeemed':
                return <Banknote className="w-4 h-4 text-indigo-500 shrink-0" />;
            case 'depleted':
                return <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
            default:
                return <AlertTriangle className="w-4 h-4 text-gray-500 shrink-0" />;
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, string> = {
            paid: theme === 'dark' ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-green-50 text-green-700 border-green-200',
            active: theme === 'dark' ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-green-50 text-green-700 border-green-200',
            pending: theme === 'dark' ? 'bg-amber-900/30 text-amber-400 border-amber-800' : 'bg-amber-50 text-amber-700 border-amber-200',
            partially_redeemed: theme === 'dark' ? 'bg-indigo-900/30 text-indigo-400 border-indigo-800' : 'bg-indigo-50 text-indigo-700 border-indigo-200',
            depleted: theme === 'dark' ? 'bg-rose-900/30 text-rose-400 border-rose-800' : 'bg-rose-50 text-rose-700 border-rose-200',
            cancelled: theme === 'dark' ? 'bg-red-900/30 text-red-400 border-red-800' : 'bg-red-50 text-red-700 border-red-200'
        };
        return statusMap[status] || (theme === 'dark' ? 'bg-gray-900/30 text-gray-400 border-gray-800' : 'bg-gray-50 text-gray-700 border-gray-200');
    };

    // Prüfe ob es ein Admin-erstellter Gutschein ist (Vor-Ort-Verkauf)
    const isAdminVoucher = (voucher: Voucher) => {
        return voucher.admin_created === true;
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

    // Soft Delete Gutschein
    const handleDeleteVoucher = async (voucherId: string, permanent = false) => {
        try {
            setUpdatingStatus(voucherId);
            setError("");

            const adminName = 'Admin';

            const response = await fetch('/api/vouchers', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    voucherId,
                    adminName,
                    permanent
                })
            });

            const result = await response.json();

            if (result.success) {
                await loadVouchers(); // Gutscheine neu laden
            } else {
                setError(result.error || 'Fehler beim Löschen');
            }
        } catch (error) {
            setError('Fehler beim Löschen des Gutscheins');
            console.error('Delete error:', error);
        } finally {
            setUpdatingStatus(null);
        }
    };

    // Gutschein wiederherstellen
    const handleRestoreVoucher = async (voucherId: string) => {
        try {
            setUpdatingStatus(voucherId);
            setError("");

            const response = await fetch('/api/vouchers', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    voucherId,
                    action: 'restore'
                })
            });

            const result = await response.json();

            if (result.success) {
                await loadVouchers(); // Gutscheine neu laden
            } else {
                setError(result.error || 'Fehler beim Wiederherstellen');
            }
        } catch (error) {
            setError('Fehler beim Wiederherstellen des Gutscheins');
            console.error('Restore error:', error);
        } finally {
            setUpdatingStatus(null);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-gradient-to-b from-gray-50 to-gray-100/80'} flex items-center justify-center`}>
                <div className="text-center animate-fade-in">
                    <div className="relative inline-block">
                        <div className={`w-16 h-16 border-2 ${theme === 'dark' ? 'border-purple-500/20' : 'border-purple-300/40'} rounded-2xl`}></div>
                        <div className={`absolute inset-0 w-16 h-16 border-2 ${theme === 'dark' ? 'border-purple-400' : 'border-purple-500'} rounded-2xl animate-spin border-t-transparent border-r-transparent`}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Gift className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'} opacity-60`} />
                        </div>
                    </div>
                    <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} mt-5 font-medium tracking-tight`} >Lade Gutscheine...</p>
                    <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'} text-sm mt-1`}>Bitte einen Moment Geduld</p>
                </div>
            </div>
        );
    }

    const stats = {
        total: vouchers.length,
        pending: vouchers.filter(v => v.payment_status === 'pending').length,
        paid: vouchers.filter(v => v.payment_status === 'paid').length,
        partiallyRedeemed: vouchers.filter(v => {
            const totalAmount = Number(v.amount);
            const remainingAmount = Number(v.remaining_amount ?? v.amount);
            return remainingAmount > 0 && remainingAmount < totalAmount;
        }).length,
        depleted: vouchers.filter(v => Number(v.remaining_amount ?? v.amount) <= 0).length,
        revenue: vouchers
            .filter(v => v.payment_status === 'paid')
            .reduce((sum, v) => sum + Number(v.amount), 0)
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-gradient-to-b from-gray-50 to-gray-100/80'} transition-colors duration-300`}>
            {/* Modern Gradient Background */}
            {theme === 'dark' && (
                <>
                    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 pointer-events-none" />
                    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
                </>
            )}
            {theme === 'light' && (
                <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_#e0e7ff20,_transparent_50%)] pointer-events-none" />
            )}

            {/* Toolbar */}
            <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800/60 shadow-xl shadow-black/20 backdrop-blur-xl'
                : 'bg-white/95 border-gray-200/80 shadow-md backdrop-blur-xl'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 py-3 sm:py-4">
                        {/* Left: Back + Titel */}
                        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                            <Link
                                href="/admin/dashboard"
                                className={`shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${theme === 'dark'
                                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                            <div className={`shrink-0 w-px h-8 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`} />
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex shrink-0 items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/20 ring-2 ring-white/10">
                                    <Gift className="w-5 h-5 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <h1 className={`text-lg sm:text-xl font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} >
                                        Gutschein-Verwaltung
                                    </h1>
                                    {adminData && (
                                        <p className={`text-xs sm:text-sm flex items-center gap-2 truncate ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                                            {adminData.role === 'super_admin' ? (
                                                <span className="inline-flex items-center gap-1">
                                                    <Crown className="w-3 h-3 shrink-0" />
                                                    Super Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1">
                                                    <User className="w-3 h-3 shrink-0" />
                                                    Admin
                                                </span>
                                            )}
                                            {adminData.studio && (
                                                <>
                                                    <span className={`w-0.5 h-0.5 rounded-full shrink-0 ${theme === 'dark' ? 'bg-slate-500' : 'bg-gray-400'}`} />
                                                    <span className="truncate">{adminData.studio.name}</span>
                                                </>
                                            )}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Primary: Gutschein verkaufen */}
                            <button
                                onClick={handleOpenVoucherForm}
                                className="order-1 sm:order-1 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:from-green-600 hover:to-emerald-600 transition-all duration-200 active:scale-[0.98]"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">Gutschein verkaufen</span>
                            </button>

                            {/* Sekundär: Aktualisieren, Einstellungen */}
                            <div className={`flex items-center rounded-xl border ${theme === 'dark' ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-gray-50'}`}>
                                <button
                                    onClick={handleRefresh}
                                    disabled={refreshing}
                                    className={`inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2.5 text-sm font-medium rounded-l-xl transition-all disabled:opacity-50 ${theme === 'dark'
                                        ? 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                    title="Aktualisieren"
                                >
                                    <RefreshCw className={`w-4 h-4 shrink-0 ${refreshing ? 'animate-spin' : ''}`} />
                                    <span className="hidden md:inline">Aktualisieren</span>
                                </button>
                                <div className={`w-px h-5 ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-200'}`} />
                                <button
                                    onClick={() => setShowBankSettings(!showBankSettings)}
                                    className={`inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2.5 text-sm font-medium rounded-r-xl transition-all ${theme === 'dark'
                                        ? 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                    title="Einstellungen"
                                >
                                    <Settings className="w-4 h-4 shrink-0" />
                                    <span className="hidden md:inline">Einstellungen</span>
                                </button>
                            </div>

                            {/* Utility: Theme + Logout */}
                            <div className={`flex items-center gap-1 rounded-xl border ${theme === 'dark' ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-gray-50'}`}>
                                <button
                                    onClick={toggleTheme}
                                    className={`p-2.5 rounded-l-xl transition-all hover:scale-105 ${theme === 'dark'
                                        ? 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                    title={theme === 'dark' ? 'Hell-Modus' : 'Dunkel-Modus'}
                                >
                                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </button>
                                <div className={`w-px h-5 ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-200'}`} />
                                <button
                                    onClick={handleLogout}
                                    className={`p-2.5 rounded-r-xl transition-all hover:scale-105 ${theme === 'dark'
                                        ? 'text-slate-400 hover:text-red-400 hover:bg-slate-700/50'
                                        : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
                                        }`}
                                    title="Abmelden"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Bank Settings Modal */}
                {showBankSettings && (
                    <div className={`mb-8 ${theme === 'dark' ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white border-gray-200/80'} backdrop-blur-xl rounded-2xl shadow-xl border p-8 transition-all duration-300 animate-slide-up`}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl">
                                    <Banknote className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} >Bankdaten & Einstellungen</h2>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} >Konfiguration für Überweisungen und Gutscheine</p>
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
                                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} >Geschäftsadresse</h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} >Wird auf Gutscheinen und in E-Mails angezeigt</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} >Gutschein-Einstellungen</h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} >Konfiguration für Gutschein-Verhalten</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
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
                                        <label htmlFor="sendVoucherAsPDF" className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`} >
                                            Gutscheine automatisch als PDF versenden
                                        </label>
                                    </div>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} mt-1 ml-7`} >
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
                    <div className={`mb-8 ${theme === 'dark' ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white border-gray-200/80'} backdrop-blur-xl rounded-2xl shadow-xl border p-8 transition-all duration-300 animate-slide-up`}>
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
                            <div className={`${theme === 'dark'
                                ? 'bg-gradient-to-r from-green-900/40 to-green-800/40 border-green-800/50'
                                : 'bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700'
                                } border rounded-xl p-6 text-center shadow-lg`}>
                                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-green-300' : 'text-white'} mb-2`} >Gutschein-Code</h3>
                                <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-green-200' : 'text-white'} font-mono tracking-wider`} >
                                    {voucherForm.voucherCode}
                                </div>
                                <p className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-slate-300'} mt-2`} >Dieser Code wird auf dem Gutschein gedruckt</p>
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
                                <div className="flex items-center gap-2 mb-3">
                                    <Banknote className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-900'}`}>Vor-Ort-Verkauf</span>
                                </div>
                                <ul className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-800'} space-y-2`}>
                                    <li className="flex items-center gap-2">
                                        <CreditCard className="w-3.5 h-3.5 shrink-0" />
                                        Sofortige Barzahlung
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Printer className="w-3.5 h-3.5 shrink-0" />
                                        Gutschein wird ausgedruckt
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                                        Status: Bezahlt & Aktiv
                                    </li>
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
                    <div className={`mb-6 ${theme === 'dark' ? 'bg-red-900/30 border-red-800 text-red-400' : 'bg-red-50 border-red-200 text-red-700'} border px-6 py-4 rounded-2xl flex items-center space-x-3 shadow-lg animate-fade-in`}>
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div className={`group ${theme === 'dark' ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white border-gray-200/80'} backdrop-blur-xl p-6 rounded-2xl shadow-md border hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-300 ease-out`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>Gesamt</p>
                                <p className={`text-3xl font-bold tabular-nums ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-2`}>{stats.total}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-600'} mt-1`}>Gutscheine</p>
                            </div>
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Gift className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className={`group ${theme === 'dark' ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white border-gray-200/80'} backdrop-blur-xl p-6 rounded-2xl shadow-md border hover:shadow-xl hover:-translate-y-1 hover:border-green-500/30 transition-all duration-300 ease-out`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>Bezahlt</p>
                                <p className={`text-3xl font-bold tabular-nums ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-2`}>{stats.paid}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-600'} mt-1`}>Aktive Gutscheine</p>
                            </div>
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                                <CheckCircle className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className={`group ${theme === 'dark' ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white border-gray-200/80'} backdrop-blur-xl p-6 rounded-2xl shadow-md border hover:shadow-xl hover:-translate-y-1 hover:border-amber-500/30 transition-all duration-300 ease-out`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>Ausstehend</p>
                                <p className={`text-3xl font-bold tabular-nums ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-2`}>{stats.pending}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-600'} mt-1`}>Zu bearbeiten</p>
                            </div>
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Clock className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className={`group ${theme === 'dark' ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white border-gray-200/80'} backdrop-blur-xl p-6 rounded-2xl shadow-md border hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 ease-out`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>Umsatz</p>
                                <p className={`text-3xl font-bold tabular-nums ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mt-2`}>€{stats.revenue.toLocaleString()}</p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-600'} mt-1`}>Gesamtwert</p>
                            </div>
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Euro className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Vouchers Table */}
                <div className={`${theme === 'dark' ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white border-gray-200/80'} backdrop-blur-xl rounded-2xl shadow-lg border overflow-hidden`}>
                    {/* Tab Header */}
                    <div className={`px-6 py-5 border-b ${theme === 'dark' ? 'border-slate-700/50 bg-slate-800/30' : 'border-gray-200 bg-gray-50/80'}`}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Gutschein-Verwaltung</h2>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} mt-1`}>
                                    {currentTab === 'active'
                                        ? `${filteredVouchers.length} von ${vouchers.length} aktiven Gutscheinen`
                                        : `${deletedVouchers.length} gelöschte Gutscheine`
                                    }
                                </p>
                            </div>

                            {/* Tabs + Suche in einer Zeile */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex space-x-1">
                                    <button
                                        onClick={() => setCurrentTab('active')}
                                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${currentTab === 'active'
                                        ? theme === 'dark'
                                            ? 'bg-blue-900/50 text-blue-300 border border-blue-800'
                                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : theme === 'dark'
                                            ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Gift className="w-4 h-4" />
                                        <span>Aktive Gutscheine</span>
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {vouchers.length}
                                        </span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setCurrentTab('trash')}
                                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${currentTab === 'trash'
                                        ? theme === 'dark'
                                            ? 'bg-red-900/50 text-red-300 border border-red-800'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                        : theme === 'dark'
                                            ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Trash2 className="w-4 h-4" />
                                        <span>Papierkorb</span>
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {deletedVouchers.length}
                                        </span>
                                    </div>
                                </button>
                                </div>

                                {/* Suchfeld rechts */}
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <div className="relative w-full sm:w-64">
                                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-400'}`} />
                                        <input
                                            type="text"
                                            placeholder="Gutscheine durchsuchen..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent focus:border-transparent transition-all duration-200 ${theme === 'dark'
                                                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:bg-slate-700/50'
                                                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-300'
                                                } border`}
                                        />
                                        {searchTerm && (
                                            <button
                                                onClick={() => setSearchTerm('')}
                                                className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    {(searchTerm || statusFilter !== 'all') && (
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setStatusFilter('all');
                                            }}
                                            className={`shrink-0 inline-flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${theme === 'dark'
                                                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                                }`}
                                            title="Alle Filter zurücksetzen"
                                        >
                                            <RotateCcw className="w-4 h-4 sm:mr-1" />
                                            <span className="hidden sm:inline">Zurücksetzen</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Status Filter Buttons */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setStatusFilter('all')}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${statusFilter === 'all'
                                        ? theme === 'dark'
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-blue-600 text-white shadow-lg'
                                        : theme === 'dark'
                                            ? 'text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700'
                                            : 'text-gray-600 bg-white hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    <LayoutGrid className="w-4 h-4 mr-1" />
                                    Alle ({stats.total})
                                </button>

                                <button
                                    onClick={() => setStatusFilter('pending')}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${statusFilter === 'pending'
                                        ? theme === 'dark'
                                            ? 'bg-amber-600 text-white shadow-lg'
                                            : 'bg-amber-600 text-white shadow-lg'
                                        : theme === 'dark'
                                            ? 'text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700'
                                            : 'text-gray-600 bg-white hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    <Clock className="w-4 h-4 mr-1" />
                                    Ausstehend ({stats.pending})
                                </button>

                                <button
                                    onClick={() => setStatusFilter('paid')}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${statusFilter === 'paid'
                                        ? theme === 'dark'
                                            ? 'bg-green-600 text-white shadow-lg'
                                            : 'bg-green-600 text-white shadow-lg'
                                        : theme === 'dark'
                                            ? 'text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700'
                                            : 'text-gray-600 bg-white hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Bezahlt ({stats.paid})
                                </button>

                                <button
                                    onClick={() => setStatusFilter('partially_redeemed')}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${statusFilter === 'partially_redeemed'
                                        ? theme === 'dark'
                                            ? 'bg-indigo-600 text-white shadow-lg'
                                            : 'bg-indigo-600 text-white shadow-lg'
                                        : theme === 'dark'
                                            ? 'text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700'
                                            : 'text-gray-600 bg-white hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    <Banknote className="w-4 h-4 mr-1" />
                                    Teilweise eingelöst ({stats.partiallyRedeemed})
                                </button>

                                <button
                                    onClick={() => setStatusFilter('depleted')}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${statusFilter === 'depleted'
                                        ? theme === 'dark'
                                            ? 'bg-rose-600 text-white shadow-lg'
                                            : 'bg-rose-600 text-white shadow-lg'
                                        : theme === 'dark'
                                            ? 'text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700'
                                            : 'text-gray-600 bg-white hover:bg-gray-50 border border-gray-200'
                                        }`}
                                >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Aufgebraucht ({stats.depleted})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className={`${theme === 'dark' ? 'bg-slate-800/50' : 'bg-gray-50/80'} border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                            <tr>
                                <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                    Gutschein
                                </th>
                                <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                    Käufer
                                </th>
                                <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                    Betrag / Rest
                                </th>
                                <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'} uppercase tracking-wider`}>
                                    Versand
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
                        <tbody className={`${theme === 'dark' ? 'bg-slate-900/50 divide-slate-700/50' : 'bg-white divide-gray-100'} divide-y`}>
                            {paginatedVouchers.map((voucher) => (
                                <tr key={voucher.id} className={`${theme === 'dark' ? 'hover:bg-slate-800/60' : 'hover:bg-gray-50'} transition-colors duration-200`}>
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
                                        <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                                            Rest: €{Number(voucher.remaining_amount ?? voucher.amount).toFixed(0)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {isAdminVoucher(voucher) ? (
                                                <>
                                                    <Building2 className="w-4 h-4 text-purple-500 shrink-0" />
                                                    <span className={`text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>Studio</span>
                                                </>
                                            ) : voucher.delivery_method === 'post' ? (
                                                <>
                                                    <Package className="w-4 h-4 text-orange-500 shrink-0" />
                                                    <span className={`text-sm ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>Post</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Mail className="w-4 h-4 text-blue-500" />
                                                    <span className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>E-Mail</span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(voucher.payment_status)}
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(voucher.payment_status)}`}>
                                                {getStatusLabel(voucher.payment_status)}
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
                                        <button
                                            onClick={() => openActionModal(voucher)}
                                            className={`inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:scale-110 ${theme === 'dark'
                                                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                                }`}
                                            title="Aktionen"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={`${theme === 'dark'
                        ? 'bg-slate-800/30 border-slate-700/50'
                        : 'bg-gray-50/80 border-gray-200'
                        } border rounded-2xl mt-6 p-5`}>

                        {/* Pagination Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 mb-4">
                            <div className="flex items-center space-x-4">
                                <div className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                                    Zeige {startIndex + 1} bis {Math.min(endIndex, totalItems)} von {totalItems} Gutscheinen
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                                        Pro Seite:
                                    </span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        className={`px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${theme === 'dark'
                                            ? 'bg-slate-800 border-slate-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            } border`}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                                Seite {currentPage} von {totalPages}
                            </div>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">

                            {/* Previous/Next Buttons */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={goToPrevPage}
                                    disabled={currentPage === 1}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${theme === 'dark'
                                        ? 'text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900'
                                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 disabled:bg-gray-100'
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Zurück
                                </button>

                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${theme === 'dark'
                                        ? 'text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900'
                                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 disabled:bg-gray-100'
                                        }`}
                                >
                                    Weiter
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>

                            {/* Page Numbers */}
                            <div className="flex items-center space-x-1">
                                {/* Erste Seite */}
                                {currentPage > 3 && (
                                    <>
                                        <button
                                            onClick={() => goToPage(1)}
                                            className={`w-8 h-8 text-sm rounded-lg transition-colors ${theme === 'dark'
                                                ? 'text-slate-300 hover:bg-slate-800'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            1
                                        </button>
                                        {currentPage > 4 && (
                                            <span className={`px-2 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>...</span>
                                        )}
                                    </>
                                )}

                                {/* Aktuelle Seiten */}
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    if (pageNum < 1 || pageNum > totalPages) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => goToPage(pageNum)}
                                            className={`w-8 h-8 text-sm rounded-lg transition-colors ${pageNum === currentPage
                                                ? theme === 'dark'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-600 text-white'
                                                : theme === 'dark'
                                                    ? 'text-slate-300 hover:bg-slate-800'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                {/* Letzte Seite */}
                                {currentPage < totalPages - 2 && totalPages > 5 && (
                                    <>
                                        {currentPage < totalPages - 3 && (
                                            <span className={`px-2 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>...</span>
                                        )}
                                        <button
                                            onClick={() => goToPage(totalPages)}
                                            className={`w-8 h-8 text-sm rounded-lg transition-colors ${theme === 'dark'
                                                ? 'text-slate-300 hover:bg-slate-800'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Jump to Page */}
                            <div className="flex items-center space-x-2">
                                <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                                    Gehe zu:
                                </span>
                                <input
                                    type="number"
                                    min={1}
                                    max={totalPages}
                                    value={currentPage}
                                    onChange={(e) => {
                                        const page = parseInt(e.target.value);
                                        if (page >= 1 && page <= totalPages) {
                                            goToPage(page);
                                        }
                                    }}
                                    className={`w-16 px-2 py-1 text-sm text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark'
                                        ? 'bg-slate-800 border-slate-700 text-white'
                                        : 'bg-white border-gray-200 text-gray-900'
                                        } border`}
                                />
                            </div>
                        </div>
                    </div>
                )}

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

                {/* Action Modal */}
                {showActionModal && selectedVoucher && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div
                            className={`${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border rounded-2xl shadow-2xl max-w-md mx-4 w-full`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                            <Gift className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                Gutschein-Aktionen
                                            </h3>
                                            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                                                Code: {selectedVoucher.code}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeActionModal}
                                        className={`${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="px-6 py-4 space-y-2">
                                <Link
                                    href={`/admin/orders/${selectedVoucher.id}`}
                                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${theme === 'dark'
                                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    onClick={closeActionModal}
                                >
                                    <Eye className="w-5 h-5 mr-3" />
                                    Details anzeigen
                                </Link>

                                {/* Nur anzeigen wenn im aktiven Tab und Status pending */}
                                {currentTab === 'active' && selectedVoucher.payment_status === 'pending' && (
                                    <button
                                        onClick={() => {
                                            updateVoucherStatus(selectedVoucher.id, 'paid');
                                            closeActionModal();
                                        }}
                                        disabled={updatingStatus === selectedVoucher.id}
                                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark'
                                            ? 'text-green-400 hover:bg-slate-800'
                                            : 'text-green-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {updatingStatus === selectedVoucher.id ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600 mr-3"></div>
                                        ) : (
                                            <CheckCircle className="w-5 h-5 mr-3" />
                                        )}
                                        Als bezahlt markieren
                                    </button>
                                )}

                                {/* Nur anzeigen wenn im Papierkorb-Tab */}
                                {currentTab === 'trash' && (
                                    <button
                                        onClick={() => {
                                            handleRestoreVoucher(selectedVoucher.id);
                                            closeActionModal();
                                        }}
                                        disabled={updatingStatus === selectedVoucher.id}
                                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark'
                                            ? 'text-blue-400 hover:bg-slate-800'
                                            : 'text-blue-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {updatingStatus === selectedVoucher.id ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                                        ) : (
                                            <RotateCcw className="w-5 h-5 mr-3" />
                                        )}
                                        Wiederherstellen
                                    </button>
                                )}

                                <div className={`border-t ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'} my-2`}></div>

                                {/* Lösch-Aktionen je nach Tab */}
                                {currentTab === 'active' ? (
                                    <button
                                        onClick={() => {
                                            handleDeleteVoucher(selectedVoucher.id, false);
                                            closeActionModal();
                                        }}
                                        disabled={updatingStatus === selectedVoucher.id}
                                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark'
                                            ? 'text-red-400 hover:bg-slate-800'
                                            : 'text-red-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Trash2 className="w-5 h-5 mr-3" />
                                        Löschen
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            if (confirm('Sind Sie sicher, dass Sie diesen Gutschein ENDGÜLTIG löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden!')) {
                                                handleDeleteVoucher(selectedVoucher.id, true);
                                                closeActionModal();
                                            }
                                        }}
                                        disabled={updatingStatus === selectedVoucher.id}
                                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark'
                                            ? 'text-red-400 hover:bg-slate-800'
                                            : 'text-red-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <X className="w-5 h-5 mr-3" />
                                        Endgültig löschen
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Click outside to close */}
                        <div
                            className="absolute inset-0 -z-10"
                            onClick={closeActionModal}
                        ></div>
                    </div>
                )}
            </main>
        </div>
    );
} 