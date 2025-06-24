"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, Check } from "lucide-react";

interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('skinlux-cookie-consent');
        if (!cookieConsent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setShowBanner(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptAll = () => {
        const allPreferences = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        savePreferences(allPreferences);
    };

    const acceptSelected = () => {
        savePreferences(preferences);
    };

    const rejectAll = () => {
        const minimalPreferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        savePreferences(minimalPreferences);
    };

    const savePreferences = (prefs: CookiePreferences) => {
        localStorage.setItem('skinlux-cookie-consent', JSON.stringify({
            timestamp: new Date().toISOString(),
            preferences: prefs
        }));

        // Here you would typically integrate with your analytics/marketing tools
        // Example: Google Analytics, Facebook Pixel, etc.

        setShowBanner(false);
        setShowSettings(false);
    };

    const togglePreference = (key: keyof CookiePreferences) => {
        if (key === 'necessary') return; // Necessary cookies can't be disabled
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl"
                >
                    <div className="container py-6">
                        {!showSettings ? (
                            // Main Cookie Banner
                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                                <div className="flex items-start gap-4 flex-1">
                                    <Cookie className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} />
                                    <div>
                                        <h3 className="text-lg font-light mb-2" style={{ color: 'var(--color-primary)' }}>
                                            Cookie-Einstellungen
                                        </h3>
                                        <p className="text-sm text-gray-600 font-light leading-relaxed">
                                            Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten.
                                            Notwendige Cookies sind für die Grundfunktionen der Website erforderlich.
                                            Sie können auch optionale Cookies für Analytics und Marketing akzeptieren.
                                        </p>
                                        <button
                                            onClick={() => setShowSettings(true)}
                                            className="mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors underline"
                                        >
                                            Cookie-Einstellungen anpassen
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                    <button
                                        onClick={rejectAll}
                                        className="px-6 py-2 text-sm font-light border border-gray-300 hover:border-gray-400 transition-colors"
                                    >
                                        Nur notwendige
                                    </button>
                                    <button
                                        onClick={acceptAll}
                                        className="px-6 py-2 text-sm font-light text-white hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: 'var(--color-secondary)' }}
                                    >
                                        Alle akzeptieren
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Cookie Settings Panel
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-light" style={{ color: 'var(--color-primary)' }}>
                                        Cookie-Einstellungen
                                    </h3>
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="p-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Necessary Cookies */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
                                                Notwendige Cookies
                                            </h4>
                                            <p className="text-xs text-gray-600 font-light">
                                                Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                                            </p>
                                        </div>
                                        <div className="ml-4 flex items-center">
                                            <Check className="w-4 h-4 text-green-500" />
                                            <span className="ml-2 text-xs text-gray-500">Immer aktiv</span>
                                        </div>
                                    </div>

                                    {/* Analytics Cookies */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
                                                Analytics Cookies
                                            </h4>
                                            <p className="text-xs text-gray-600 font-light">
                                                Helfen uns zu verstehen, wie Besucher die Website nutzen, um die Benutzererfahrung zu verbessern.
                                            </p>
                                        </div>
                                        <label className="ml-4 relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={preferences.analytics}
                                                onChange={() => togglePreference('analytics')}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    {/* Marketing Cookies */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
                                                Marketing Cookies
                                            </h4>
                                            <p className="text-xs text-gray-600 font-light">
                                                Ermöglichen es uns, relevante Werbung anzuzeigen und die Effektivität unserer Kampagnen zu messen.
                                            </p>
                                        </div>
                                        <label className="ml-4 relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={preferences.marketing}
                                                onChange={() => togglePreference('marketing')}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                    <button
                                        onClick={rejectAll}
                                        className="px-6 py-2 text-sm font-light border border-gray-300 hover:border-gray-400 transition-colors"
                                    >
                                        Nur notwendige
                                    </button>
                                    <button
                                        onClick={acceptSelected}
                                        className="px-6 py-2 text-sm font-light text-white hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: 'var(--color-secondary)' }}
                                    >
                                        Auswahl speichern
                                    </button>
                                    <button
                                        onClick={acceptAll}
                                        className="px-6 py-2 text-sm font-light border hover:bg-gray-50 transition-colors"
                                        style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
                                    >
                                        Alle akzeptieren
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 