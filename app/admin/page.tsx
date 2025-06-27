"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import { AuthService } from "@/lib/auth";
import Link from "next/link";

export default function AdminLogin() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await AuthService.login(credentials.email, credentials.password);

            if (result.error) {
                setError(result.error);
            } else if (result.user) {
                console.log('Login erfolgreich:', result.user);
                router.push("/admin/dashboard");
            }
        } catch (error: any) {
            setError(`Unerwarteter Fehler: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-pink-200 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-10">
                    {/* Logo & Title */}
                    <div className="text-center mb-10">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <Lock className="w-10 h-10 text-white" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl font-light text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Skinlux CMS
                        </h1>
                        <p className="text-sm text-gray-500 font-light tracking-wider uppercase">
                            Administration
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-xs text-blue-700 font-medium mb-2">Demo Anmeldedaten:</p>
                        <p className="text-xs text-blue-600">Email: hello@skinlux.at</p>
                        <p className="text-xs text-blue-600">Passwort: admin123</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                E-Mail Adresse
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                                value={credentials.email}
                                onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                                placeholder="admin@skinlux.at"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Passwort
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 pr-12"
                                    value={credentials.password}
                                    onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                    placeholder="••••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Anmeldung läuft...
                                </div>
                            ) : (
                                "Anmelden"
                            )}
                        </button>

                        {/* Forgot Password Link */}
                        <div className="text-center">
                            <Link
                                href="/admin/forgot-password"
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Passwort vergessen?
                            </Link>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400 font-light">
                            © 2024 Skinlux. Alle Rechte vorbehalten.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
} 