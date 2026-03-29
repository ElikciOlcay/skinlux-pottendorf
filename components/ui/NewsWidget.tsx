"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";

export default function NewsWidget() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => window.clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible ? (
                <motion.aside
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 z-30 w-[300px] max-w-[calc(100vw-2rem)]"
                    aria-label="Aktuelle Neuigkeit"
                >
                    <div className="rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                            <span className="text-[11px] tracking-[0.15em] uppercase text-white/70 font-light">
                                Aktuelles
                            </span>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label="Neuigkeit schließen"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <div className="p-3 flex items-center gap-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src="https://bischofshofen.skinlux.at/images/microneedling/treatment-microneedling.png"
                                    alt="SkinPen Neuigkeit"
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-white text-sm font-light leading-tight truncate">
                                    Neu bei Skinlux
                                </p>
                                <p className="text-white/80 text-[13px] font-light truncate">
                                    SkinPen Precision
                                </p>
                                <p className="text-white/60 text-xs font-light mt-1">
                                    Präzises Microneedling für Narben, Poren und Hautstruktur.
                                </p>
                            </div>
                        </div>

                        <div className="px-3 pb-3">
                            <Link
                                href="/behandlungen/skinpen-precision"
                                onClick={() => setIsVisible(false)}
                                className="inline-flex items-center gap-2 text-xs font-light tracking-[0.12em] uppercase text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Mehr erfahren
                            </Link>
                        </div>
                    </div>
                </motion.aside>
            ) : null}
        </AnimatePresence>
    );
}
