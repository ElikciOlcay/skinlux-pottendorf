"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    LogOut,
    Gift,
    Calendar,
    ShoppingCart,
    Heart,
    ExternalLink,
    User,
    Clock,
    Sparkles,
    Activity,
    Zap
} from "lucide-react";
import { AdminAuth, type AdminAccess } from "@/lib/supabase-auth";
import { Inter } from "next/font/google";

// Inter Font konfigurieren
const inter = Inter({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter'
});

interface DashboardTile {
    id: string;
    title: string;
    description: string;
    url: string;
    icon: React.ReactNode;
    color: string;
    gradient: string;
    bgPattern?: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [adminData, setAdminData] = useState<AdminAccess | null>(null);
    const [loading, setLoading] = useState(true);
    const [hoveredTile, setHoveredTile] = useState<string | null>(null);

    // Dashboard Kacheln mit modernerem Design
    const dashboardTiles: DashboardTile[] = [
        {
            id: "shore",
            title: "Buchungen Shore",
            description: "Terminplanung und Kundenverwaltung",
            url: "https://my.shore.com/calendar/week",
            icon: <Calendar className="w-9 h-9" />,
            color: "blue",
            gradient: "from-blue-500 to-indigo-600",
            bgPattern: "bg-gradient-to-br from-blue-500/20 to-indigo-600/20"
        },
        {
            id: "pocketbill",
            title: "Kasse",
            description: "PocketBill Kassensystem",
            url: "https://app.pocketbill.at/cashRegisters/sell",
            icon: <ShoppingCart className="w-9 h-9" />,
            color: "emerald",
            gradient: "from-emerald-500 to-teal-600",
            bgPattern: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20"
        },
        {
            id: "treatflow",
            title: "Treatflow",
            description: "Behandlungsdokumentation",
            url: "https://my.treatflow.io/",
            icon: <Heart className="w-9 h-9" />,
            color: "pink",
            gradient: "from-pink-500 to-rose-600",
            bgPattern: "bg-gradient-to-br from-pink-500/20 to-rose-600/20"
        },
        {
            id: "vouchers",
            title: "Gutscheine",
            description: "Gutschein-Management",
            url: "/gutscheine",
            icon: <Gift className="w-9 h-9" />,
            color: "purple",
            gradient: "from-purple-500 to-violet-600",
            bgPattern: "bg-gradient-to-br from-purple-500/20 to-violet-600/20"
        }
    ];

    // Auth-Check beim Component-Mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { isAdmin } = await AdminAuth.isAdmin();

                if (!isAdmin) {
                    router.push("/admin");
                    return;
                }

                const adminInfo = await AdminAuth.getAdminData();
                setAdminData(adminInfo);
            } catch (error) {
                console.error("Auth check failed:", error);
                router.push("/admin");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        const result = await AdminAuth.signOut();
        if (result.success) {
            router.push("/admin");
        }
    };

    const handleTileClick = (tile: DashboardTile) => {
        if (tile.id === "vouchers") {
            // Interne Navigation für Gutscheine
            router.push(tile.url);
        } else {
            // Externe Links in neuem Tab öffnen
            window.open(tile.url, '_blank', 'noopener,noreferrer');
        }
    };

    const getCurrentTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Guten Morgen";
        if (hour < 18) return "Guten Tag";
        return "Guten Abend";
    };

    if (loading) {
        return (
            <div className={`min-h-screen bg-slate-950 flex items-center justify-center ${inter.variable}`} style={{ fontFamily: 'var(--font-inter)' }}>
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-purple-500/20 rounded-full"></div>
                        <div className="absolute top-0 w-20 h-20 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
                    </div>
                    <p className="text-slate-400 mt-4 font-medium tracking-tight">Dashboard wird geladen...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-slate-950 ${inter.variable}`} style={{ fontFamily: 'var(--font-inter)' }}>
            {/* Modern Gradient Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 pointer-events-none" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />

            {/* Header */}
            <header className="relative bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50"></div>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>Skinlux Partner</h1>
                                    <p className="text-xs text-slate-400 font-medium" style={{ fontFamily: 'var(--font-inter)' }}>Dashboard</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-slate-400">
                                {adminData && (
                                    <span className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                                            <User className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <span className="hidden sm:inline font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{adminData.role === 'super_admin' ? 'Super Admin' : 'Admin'}</span>
                                        {adminData.studio && <span className="hidden sm:inline font-normal" style={{ fontFamily: 'var(--font-inter)' }}>• {adminData.studio.name}</span>}
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Abmelden</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-10">
                    <h2 className="text-4xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
                        {getCurrentTimeGreeting()}!
                    </h2>
                    <p className="text-slate-400 text-lg font-light" style={{ fontFamily: 'var(--font-inter)' }}>
                        Willkommen in Ihrem Partner Dashboard. Wählen Sie eine Anwendung aus:
                    </p>
                </div>

                {/* Dashboard Tiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {dashboardTiles.map((tile) => (
                        <div
                            key={tile.id}
                            onClick={() => handleTileClick(tile)}
                            onMouseEnter={() => setHoveredTile(tile.id)}
                            onMouseLeave={() => setHoveredTile(null)}
                            className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105"
                        >
                            {/* Background Glow Effect */}
                            <div className={`absolute inset-0 ${tile.bgPattern} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                            <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all duration-300">
                                {/* Animated Background Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `radial-gradient(circle at 20% 50%, ${tile.color} 0%, transparent 50%)`,
                                        transform: hoveredTile === tile.id ? 'scale(2)' : 'scale(1)',
                                        transition: 'transform 0.5s ease'
                                    }}></div>
                                </div>

                                {/* Gradient Header */}
                                <div className={`h-32 bg-gradient-to-br ${tile.gradient} flex items-center justify-center relative overflow-hidden`}>
                                    {/* Animated background elements */}
                                    <div className="absolute inset-0">
                                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                                    </div>

                                    <div className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300">
                                        {tile.icon}
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-all duration-300" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
                                        {tile.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light" style={{ fontFamily: 'var(--font-inter)' }}>
                                        {tile.description}
                                    </p>

                                    {/* Hover indicator */}
                                    <div className="mt-4 flex items-center text-xs font-medium text-slate-500 group-hover:text-slate-300 transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
                                        <span>Öffnen</span>
                                        <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modern Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Live Time Card */}
                    <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-800 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-slate-400" style={{ fontFamily: 'var(--font-inter)' }}>Live Zeit</h3>
                                <Clock className="w-4 h-4 text-slate-500" />
                            </div>
                            <div className="text-3xl font-bold text-white tracking-tighter" style={{ fontFamily: 'var(--font-inter)' }}>
                                {new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-sm text-slate-500 mt-1 font-light" style={{ fontFamily: 'var(--font-inter)' }}>
                                {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </div>
                        </div>
                    </div>

                    {/* System Status Card */}
                    <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-800 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-slate-400" style={{ fontFamily: 'var(--font-inter)' }}>System Status</h3>
                                <Activity className="w-4 h-4 text-slate-500" />
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                                </div>
                                <span className="text-2xl font-semibold text-white" style={{ fontFamily: 'var(--font-inter)' }}>Alles Online</span>
                            </div>
                            <div className="text-sm text-slate-500 mt-1 font-light" style={{ fontFamily: 'var(--font-inter)' }}>Alle Systeme funktionieren einwandfrei</div>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-slate-800 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-slate-400" style={{ fontFamily: 'var(--font-inter)' }}>Schnellzugriff</h3>
                                <Zap className="w-4 h-4 text-slate-500" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-medium rounded-lg" style={{ fontFamily: 'var(--font-inter)' }}>Alt + 1 Shore</span>
                                <span className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-medium rounded-lg" style={{ fontFamily: 'var(--font-inter)' }}>Alt + 2 Kasse</span>
                                <span className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-medium rounded-lg" style={{ fontFamily: 'var(--font-inter)' }}>Alt + 3 Treatflow</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-slate-800/50">
                    <p className="text-sm text-slate-500 font-light" style={{ fontFamily: 'var(--font-inter)' }}>
                        Skinlux Partner Dashboard • Alle Ihre Anwendungen an einem Ort
                    </p>
                    <p className="text-xs text-slate-600 mt-1 font-light" style={{ fontFamily: 'var(--font-inter)' }}>
                        © 2024 Skinlux. Alle Rechte vorbehalten.
                    </p>
                </div>
            </main>
        </div>
    );
} 