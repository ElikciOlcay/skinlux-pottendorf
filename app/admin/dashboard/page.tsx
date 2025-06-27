"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gift, Euro, Clock, CheckCircle, LogOut, Search, Download, Settings, RefreshCw, Eye } from "lucide-react";
import { AuthService, AuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

// Order Interface definieren
interface Order {
    id: string;
    orderNumber: string;
    voucherCode: string;
    amount: number;
    senderName: string;
    senderEmail: string;
    paymentStatus: "pending" | "completed" | "cancelled";
    paymentMethod: string;
    createdAt: string;
    bankReference: string | null;
    deliveryMethod: string;
    recipientName?: string;
}

// Voucher Interface für API Response
interface VoucherResponse {
    id: string;
    code: string;
    amount: string;
    sender_name: string;
    sender_email: string;
    payment_status: string;
    created_at: string;
    payment_reference?: string | null;
    order_number?: string | null;
    delivery_method: string;
    recipient_name?: string | null;
}

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [, setCurrentUser] = useState<AuthUser | null>(null);
    const router = useRouter();

    // Bestellungen über API-Route laden
    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            // API-Route verwenden um RLS zu umgehen
            const response = await fetch('/api/vouchers');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Fehler beim Laden der Daten');
            }

            // Daten transformieren für die UI
            const transformedOrders: Order[] = result.vouchers?.map((voucher: VoucherResponse) => ({
                id: voucher.id,
                orderNumber: voucher.order_number || voucher.payment_reference || `VOC-${voucher.code}`,
                voucherCode: voucher.code,
                amount: parseFloat(voucher.amount),
                senderName: voucher.sender_name,
                senderEmail: voucher.sender_email,
                paymentStatus: voucher.payment_status as "pending" | "completed" | "cancelled",
                paymentMethod: 'bank_transfer', // Default
                createdAt: voucher.created_at,
                bankReference: voucher.payment_reference,
                deliveryMethod: voucher.delivery_method,
                recipientName: voucher.recipient_name
            })) || [];

            setOrders(transformedOrders);
        } catch (err: unknown) {
            console.error('Fehler beim Laden der Bestellungen:', err);
            setError('Fehler beim Laden der Bestellungen. Bitte versuchen Sie es erneut.');
        } finally {
            setLoading(false);
        }
    };

    // Auth Check
    useEffect(() => {
        const checkAuth = () => {
            try {
                const user = AuthService.getCurrentUser();

                if (!user) {
                    router.push('/admin');
                    return;
                }

                if (!AuthService.isAdmin()) {
                    router.push('/admin');
                    return;
                }

                setCurrentUser(user);
                setIsAuthenticated(true);
                setAuthLoading(false);

                // Fetch orders after auth is confirmed
                fetchOrders();
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/admin');
            }
        };

        checkAuth();

        // Listen to auth changes
        const { data: { subscription } } = AuthService.onAuthStateChange((authenticated, user) => {
            if (!authenticated) {
                router.push('/admin');
            } else {
                setCurrentUser(user);
                setIsAuthenticated(authenticated);
            }
        });

        return () => subscription?.unsubscribe();
    }, [router]);

    // Logout Function
    const handleLogout = () => {
        AuthService.logout();
        router.push('/admin');
    };

    const stats = {
        totalOrders: orders.length,
        totalRevenue: orders.filter(o => o.paymentStatus === "completed").reduce((sum, o) => sum + o.amount, 0),
        pendingOrders: orders.filter(o => o.paymentStatus === "pending").length,
        completedOrders: orders.filter(o => o.paymentStatus === "completed").length
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.voucherCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.senderEmail?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === "all" || order.paymentStatus === filterStatus;

        return matchesSearch && matchesFilter;
    });

    // Show loading screen while checking authentication
    if (authLoading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Authentifizierung wird überprüft...</p>
                </div>
            </main>
        );
    }

    // Redirect to login if not authenticated (this shouldn't show as we redirect earlier)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div>
                                <h1 className="text-3xl font-light text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Skinlux CMS
                                </h1>
                                <p className="text-sm text-gray-500 font-light tracking-wider mt-1">
                                    GUTSCHEIN BESTELLUNGEN
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={fetchOrders}
                                disabled={loading}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                title="Aktualisieren"
                            >
                                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                            <Link
                                href="/gutscheine"
                                className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white text-sm font-medium tracking-wide rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Gutschein bestellen
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Abmelden"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            <section className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="group bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Gift className="w-7 h-7 text-white" strokeWidth={1.5} />
                            </div>
                            <span className="text-3xl font-light text-gray-900">{stats.totalOrders}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600 tracking-wide uppercase">Bestellungen Gesamt</h3>
                        <p className="text-xs text-gray-400 mt-2">Alle Gutschein-Bestellungen</p>
                    </div>

                    <div className="group bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Euro className="w-7 h-7 text-white" strokeWidth={1.5} />
                            </div>
                            <span className="text-3xl font-light text-gray-900">€{stats.totalRevenue}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600 tracking-wide uppercase">Bestätigter Umsatz</h3>
                        <p className="text-xs text-gray-400 mt-2">Bezahlte Bestellungen</p>
                    </div>

                    <div className="group bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Clock className="w-7 h-7 text-white" strokeWidth={1.5} />
                            </div>
                            <span className="text-3xl font-light text-gray-900">{stats.pendingOrders}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600 tracking-wide uppercase">Ausstehende Zahlungen</h3>
                        <p className="text-xs text-gray-400 mt-2">Bearbeitung erforderlich</p>
                    </div>

                    <div className="group bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-7 h-7 text-white" strokeWidth={1.5} />
                            </div>
                            <span className="text-3xl font-light text-gray-900">{stats.completedOrders}</span>
                        </div>
                        <h3 className="text-sm font-medium text-gray-600 tracking-wide uppercase">Abgeschlossene Bestellungen</h3>
                        <p className="text-xs text-gray-400 mt-2">Erfolgreich bezahlt</p>
                    </div>
                </div>
            </section>

            {/* Order List */}
            <section className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                    {/* Section Header */}
                    <div className="p-8 border-b border-gray-200/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Gutschein Bestellungen
                                </h2>
                                <p className="text-gray-500 text-sm">Übersicht aller Gutschein-Bestellungen und deren Zahlungsstatus</p>
                            </div>
                            {orders.length > 0 && (
                                <div className="text-sm text-gray-500">
                                    {filteredOrders.length} von {orders.length} Bestellungen
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-6 border-b border-red-200 bg-red-50">
                            <div className="flex items-center justify-between">
                                <p className="text-red-700">{error}</p>
                                <button
                                    onClick={fetchOrders}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                    Erneut versuchen
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Filters */}
                    {!loading && !error && (
                        <div className="p-6 border-b border-gray-200/50">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Suche nach Bestellnummer, Gutschein-Code oder Kunde..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900"
                                    >
                                        <option value="all">Alle Status</option>
                                        <option value="pending">Ausstehend</option>
                                        <option value="completed">Abgeschlossen</option>
                                        <option value="cancelled">Storniert</option>
                                    </select>
                                    <button className="px-6 py-3 bg-gray-50/80 border border-gray-200 rounded-xl hover:bg-gray-100/80 transition-all duration-300 flex items-center gap-2 text-gray-700">
                                        <Download className="w-4 h-4" />
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="p-12 text-center">
                            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-500">Bestellungen werden geladen...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && orders.length === 0 && (
                        <div className="p-12 text-center">
                            <Gift className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-xl font-light text-gray-600 mb-2">Noch keine Bestellungen</h3>
                            <p className="text-gray-500 mb-6">Sobald die ersten Gutscheine bestellt werden, erscheinen sie hier.</p>
                            <Link
                                href="/gutscheine"
                                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                <Gift className="w-4 h-4 mr-2" />
                                Ersten Gutschein bestellen
                            </Link>
                        </div>
                    )}

                    {/* Table */}
                    {!loading && !error && filteredOrders.length > 0 && (
                        <div className="overflow-x-auto">
                            <div className="space-y-4">
                                {filteredOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 hover:bg-white/90 transition-all duration-300 cursor-pointer"
                                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                    Bestellung #{order.orderNumber}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {order.senderName} • {order.senderEmail}
                                                </p>
                                                {order.deliveryMethod === 'post' && order.recipientName && (
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        Lieferung an: {order.recipientName}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-light text-gray-900">
                                                    €{order.amount}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${order.paymentStatus === 'completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {order.paymentStatus === 'completed' ? 'Bezahlt' : 'Ausstehend'}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${order.deliveryMethod === 'email'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-purple-100 text-purple-700'
                                                        }`}>
                                                        {order.deliveryMethod === 'email' ? 'E-Mail' : 'Post'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-sm text-gray-500">
                                            <span>
                                                {new Date(order.createdAt).toLocaleDateString('de-DE', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1 text-gray-700">
                                                <Eye className="w-4 h-4" />
                                                Details anzeigen
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && !error && orders.length > 0 && filteredOrders.length === 0 && (
                        <div className="p-12 text-center">
                            <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-xl font-light text-gray-600 mb-2">Keine Ergebnisse gefunden</h3>
                            <p className="text-gray-500">Versuchen Sie andere Suchbegriffe oder Filter.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
} 