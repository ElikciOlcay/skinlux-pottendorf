"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Gift } from "lucide-react";

export default function OfferPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if popup was already shown in this session
        const popupShown = sessionStorage.getItem("offerPopupShown");

        if (!popupShown) {
            // Show popup after 2 seconds
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem("offerPopupShown", "true");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 z-50"
                    />

                    {/* Popup Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-lg"
                        >
                            <div className="bg-white p-8 md:p-12 relative">
                                {/* Close Button */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
                                >
                                    <X className="w-6 h-6" strokeWidth={1.5} />
                                </button>

                                {/* Content */}
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-3 mb-6">
                                        <div className="text-3xl">🎃</div>
                                        <h3 className="text-2xl font-light" style={{ color: 'var(--color-primary)' }}>
                                            Pumpkin Enzyme Facial
                                        </h3>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-orange-600 mb-2 tracking-wider uppercase">
                                            Limited Fall Edition
                                        </p>
                                        <p className="text-gray-700 font-light mb-4">
                                            Unsere neue Signature-Herbstbehandlung vereint<br />
                                            Detox, Glow & Spa-Feeling
                                        </p>
                                    </div>

                                    {/* Treatment Features */}
                                    <div className="mb-6 text-left max-w-xs mx-auto">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg">🍫</span>
                                            <p className="text-sm text-gray-700">Cocoa Enzyme Peeling</p>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg">🎃</span>
                                            <p className="text-sm text-gray-700">Spiced Pumpkin Maske mit Bakuchiol</p>
                                        </div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-lg">🌿</span>
                                            <p className="text-sm text-gray-700">Antioxidantien + natürliche Enzyme</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 font-light mb-4 text-sm">
                                        Für ein verfeinertes Hautbild & regenerierte Hautbarriere,<br />
                                        perfekt nach dem Sommer!
                                    </p>

                                    {/* Special Gift */}
                                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg mb-6">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Gift className="w-5 h-5 text-orange-600" />
                                            <p className="text-sm font-medium text-orange-800">Special für dich</p>
                                        </div>
                                        <p className="text-xs text-orange-700">
                                            Nach jeder Behandlung erhältst du eine<br />
                                            <strong>Pumpkin Spice Lippenpflege von Circadia</strong><br />
                                            kostenlos dazu.
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-4">
                                        <p className="text-4xl font-light mb-1" style={{ color: 'var(--color-secondary)' }}>
                                            120€
                                        </p>
                                        <p className="text-sm font-light text-gray-600">
                                            inkl. kostenloser Lippenpflege
                                        </p>
                                    </div>

                                    {/* Google Reviews Trust Signal */}
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-3 h-3 fill-current text-yellow-400"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <a
                                            href="https://g.page/r/CQg7TXOu2H5XEAE/review"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-light text-gray-600 hover:text-secondary transition-colors"
                                        >
                                            150 Bewertungen
                                        </a>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
                                        <Clock className="w-4 h-4" strokeWidth={1.5} />
                                        <p className="text-xs font-light tracking-widest uppercase">
                                            Aktionszeitraum: 15.09. bis 15.11.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a
                                            href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={handleClose}
                                            className="btn-primary inline-flex items-center justify-center"
                                        >
                                            Jetzt Termin buchen
                                        </a>
                                        <button
                                            onClick={handleClose}
                                            className="btn-secondary inline-flex items-center justify-center"
                                        >
                                            Später
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
} 