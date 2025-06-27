"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { AuthService } from "@/lib/auth";
import Link from "next/link";

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    const [tokenChecked, setTokenChecked] = useState(false);

    useEffect(() => {
        if (token) {
            const validation = AuthService.validateResetToken(token);
            setIsValidToken(validation.valid);
            setTokenChecked(true);

            if (!validation.valid) {
                setError("Der Reset-Link ist ungültig oder abgelaufen.");
            }
        } else {
            setTokenChecked(true);
            setError("Kein Reset-Token vorhanden.");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validierung
        if (password !== confirmPassword) {
            setError("Die Passwörter stimmen nicht überein.");
            return;
        }

        if (password.length < 8) {
            setError("Das Passwort muss mindestens 8 Zeichen lang sein.");
            return;
        }

        setLoading(true);

        try {
            const result = await AuthService.resetPassword(token!, password);

            if (result.error) {
                setError(result.error);
            } else if (result.success) {
                setSuccess(true);
                // Nach 2 Sekunden zum Login weiterleiten
                setTimeout(() => {
                    router.push("/admin");
                }, 2000);
            }
        } catch (error: any) {
            setError(`Unerwarteter Fehler: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!tokenChecked) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full"></div>
            </main>
        );
    }

    if (success) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden">
                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-10">
                        <div className="text-center">
                            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <CheckCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
                            </div>
                            <h1 className="text-2xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Passwort erfolgreich geändert!
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Sie werden in Kürze zum Login weitergeleitet...
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!isValidToken) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden">
                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-10">
                        <div className="text-center">
                            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <AlertCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
                            </div>
                            <h1 className="text-2xl font-light text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Ungültiger Link
                            </h1>
                            <p className="text-gray-600 mb-8">
                                {error}
                            </p>
                            <Link
                                href="/admin/forgot-password"
                                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                Neuen Reset-Link anfordern
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden">
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
                            <Key className="w-10 h-10 text-white" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl font-light text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Neues Passwort festlegen
                        </h1>
                        <p className="text-sm text-gray-500">
                            Bitte geben Sie Ihr neues Passwort ein.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* New Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Neues Passwort
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 pr-12"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Mindestens 8 Zeichen"
                                    required
                                    minLength={8}
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

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Passwort bestätigen
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 pr-12"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Passwort wiederholen"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                                    Passwort wird geändert...
                                </div>
                            ) : (
                                "Passwort ändern"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
} 