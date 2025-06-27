"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    LogOut,
    RefreshCw,
    Gift,
    CheckCircle,
    Clock,
    XCircle,
    Eye,
    User,
    Calendar,
    Euro,
    AlertTriangle
} from "lucide-react";
import { AdminAuth, AdminVouchers, type AdminAccess } from "@/lib/supabase-auth";
import { Voucher } from "@/lib/supabase";

export default function AdminDashboard() {
    const router = useRouter();
    const [adminData, setAdminData] = useState<AdminAccess | null>(null);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

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

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadVouchers();
        setRefreshing(false);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full"></div>
            </div>
        );
    }

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
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                                Aktualisieren
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
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <Gift className="w-8 h-8 text-blue-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Gesamt Vouchers</p>
                                <p className="text-2xl font-light text-gray-900">{vouchers.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Bezahlt</p>
                                <p className="text-2xl font-light text-gray-900">
                                    {vouchers.filter(v => v.payment_status === 'paid').length}
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
                                    {vouchers.filter(v => v.payment_status === 'pending').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <Euro className="w-8 h-8 text-purple-500" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Gesamtwert</p>
                                <p className="text-2xl font-light text-gray-900">
                                    €{vouchers.reduce((sum, v) => sum + Number(v.amount), 0).toFixed(0)}
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