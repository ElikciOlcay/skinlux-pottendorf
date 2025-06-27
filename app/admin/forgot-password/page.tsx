"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { AuthService } from "@/lib/auth";
import Link from "next/link";

export default function ForgotPassword() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await AuthService.requestPasswordReset(email);

            if (result.error) {
                setError(result.error);
            } else if (result.success) {
                setSuccess(true);
            }
        } catch (error: unknown) {
            setError(`Unerwarteter Fehler: ${error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten'}`);
        } finally {
            setLoading(false);
        }
    };

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
                                E-Mail versendet!
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Wir haben Ihnen eine E-Mail mit Anweisungen zum Zurücksetzen Ihres Passworts gesendet.
                            </p>
                            <p className="text-sm text-gray-500 mb-8">
                                (Demo-Modus: Der Reset-Link wurde in einem Alert angezeigt)
                            </p>
                            <Link
                                href="/admin"
                                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Zurück zum Login
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
                            <Mail className="w-10 h-10 text-white" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-3xl font-light text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Passwort vergessen?
                        </h1>
                        <p className="text-sm text-gray-500">
                            Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                E-Mail Adresse
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-4 bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="admin@skinlux.at"
                                required
                            />
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
                                    Wird gesendet...
                                </div>
                            ) : (
                                "Reset-Link senden"
                            )}
                        </button>

                        {/* Back to Login */}
                        <div className="text-center">
                            <Link
                                href="/admin"
                                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Zurück zum Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
} 