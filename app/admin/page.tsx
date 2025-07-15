"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { AdminAuth } from "@/lib/supabase-auth";
import { Inter } from "next/font/google";

// Inter Font konfigurieren
const inter = Inter({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter'
});

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Prüfen ob User bereits eingeloggt ist
    useEffect(() => {
        const checkAuth = async () => {
            const { isAdmin } = await AdminAuth.isAdmin();
            if (isAdmin) {
                router.push("/admin/dashboard");
            }
        };
        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await AdminAuth.signIn(email, password);

            if (result.success) {
                router.push("/admin/dashboard");
            } else {
                setError(result.error || "Login fehlgeschlagen");
            }
        } catch (error: unknown) {
            setError(`Unerwarteter Fehler: ${error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden ${inter.variable}`} style={{ fontFamily: 'var(--font-inter)' }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-pink-200 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Card */}
                <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-10">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <LogIn className="w-10 h-10 text-white" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                            Skinlux Admin
                        </h1>
                        <p className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-inter)' }}>
                            Melden Sie sich mit Ihrem Supabase-Account an
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-inter)' }}>
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter)' }}>
                                E-Mail
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                                style={{ fontFamily: 'var(--font-inter)' }}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="hey@skinlux.at"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'var(--font-inter)' }}>
                                Passwort
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 pr-12"
                                    style={{ fontFamily: 'var(--font-inter)' }}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Ihr Passwort"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-inter)' }}>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Anmeldung läuft...
                                </div>
                            ) : (
                                "Anmelden"
                            )}
                        </button>
                    </form>

                    {/* Info Box */}
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1.5"></div>
                            </div>
                            <div className="text-sm text-blue-700" style={{ fontFamily: 'var(--font-inter)' }}>
                                <p className="font-medium mb-1" style={{ fontFamily: 'var(--font-inter)' }}>Neues Supabase Auth System</p>
                                <p style={{ fontFamily: 'var(--font-inter)' }}>Verwenden Sie Ihre Supabase Auth-Anmeldedaten. Admin-Berechtigung erforderlich.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 