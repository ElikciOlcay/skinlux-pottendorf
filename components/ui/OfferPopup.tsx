"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, Clock } from "lucide-react";

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
                                    <div className="flex items-center justify-center gap-2 mb-6">
                                        <Droplets
                                            className="w-8 h-8"
                                            style={{ color: 'var(--color-secondary)' }}
                                            strokeWidth={1.5}
                                        />
                                        <h3 className="text-2xl font-light" style={{ color: 'var(--color-primary)' }}>
                                            HydraFacial® Special
                                        </h3>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-5xl md:text-6xl font-light mb-2" style={{ color: 'var(--color-secondary)' }}>
                                            10%
                                        </p>
                                        <p className="text-xl font-light text-gray-700">
                                            Rabatt auf alle Behandlungen
                                        </p>
                                    </div>

                                    <p className="text-gray-600 font-light mb-6 max-w-sm mx-auto">
                                        Entdecken Sie die revolutionäre HydraFacial® Behandlung und profitieren Sie
                                        von 10% Rabatt auf alle HydraFacial® Behandlungen.
                                    </p>

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
                                            180+ Google Bewertungen
                                        </a>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
                                        <Clock className="w-4 h-4" strokeWidth={1.5} />
                                        <p className="text-xs font-light tracking-widest uppercase">
                                            Gültig bis 31. Juli 2025
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a
                                            href="https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone"
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