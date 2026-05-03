"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, X } from "lucide-react";

import {
    MOTHERS_DAY_PROMO,
    MOTHERS_DAY_THEME,
    isMothersDayPromoActive,
} from "@/lib/promotions";

const STORAGE_KEY = "mothersDayBannerDismissed";
const HEIGHT_CSS_VAR = "--promo-banner-height";

export default function MothersDayBanner() {
    const [isMounted, setIsMounted] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
        try {
            setIsDismissed(window.sessionStorage.getItem(STORAGE_KEY) === "true");
        } catch {
            setIsDismissed(false);
        }
    }, []);

    const isActive = isMounted && !isDismissed && isMothersDayPromoActive();

    useEffect(() => {
        const root = document.documentElement;

        if (!isActive || !wrapperRef.current) {
            root.style.setProperty(HEIGHT_CSS_VAR, "0px");
            return;
        }

        const updateHeight = () => {
            const height = wrapperRef.current?.offsetHeight ?? 0;
            root.style.setProperty(HEIGHT_CSS_VAR, `${height}px`);
        };

        updateHeight();

        const observer = new ResizeObserver(updateHeight);
        observer.observe(wrapperRef.current);
        window.addEventListener("resize", updateHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateHeight);
            root.style.setProperty(HEIGHT_CSS_VAR, "0px");
        };
    }, [isActive]);

    const handleDismiss = () => {
        setIsDismissed(true);
        try {
            window.sessionStorage.setItem(STORAGE_KEY, "true");
        } catch {
            // sessionStorage nicht verfügbar (Privacy Mode) – stiller Fallback
        }
    };

    if (!isActive) {
        return null;
    }

    return (
        <div
            ref={wrapperRef}
            role="region"
            aria-label="Muttertags-Aktion"
            className="fixed top-0 left-0 right-0 z-50 w-full shadow-md"
            style={{
                backgroundColor: MOTHERS_DAY_THEME.bg,
                color: MOTHERS_DAY_THEME.text,
                borderBottom: `1px solid ${MOTHERS_DAY_THEME.border}`,
            }}
        >
            <div className="container mx-auto px-4 py-2.5 md:py-3">
                <div className="flex items-center justify-between gap-3">
                    <Link
                        href={MOTHERS_DAY_PROMO.detailUrl}
                        className="flex flex-1 items-center gap-2 md:gap-3 group min-w-0"
                    >
                        <Heart
                            className="hidden sm:block w-4 h-4 shrink-0"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        <p className="text-[12px] md:text-sm font-light leading-tight truncate">
                            <span className="tracking-[0.18em] uppercase font-normal">
                                Muttertag
                            </span>
                            <span className="hidden sm:inline">
                                {" · "}
                                {MOTHERS_DAY_PROMO.discountPercent}% Rabatt auf Gutscheine im
                                ganzen Mai
                            </span>
                            <span className="sm:hidden">
                                {" · "}
                                {MOTHERS_DAY_PROMO.discountPercent}% auf Gutscheine
                            </span>
                            <span
                                className="hidden md:inline"
                                style={{ color: MOTHERS_DAY_THEME.textMuted }}
                            >
                                {" · "}
                                Gültig für {MOTHERS_DAY_PROMO.treatments.join(" & ")} ·{" "}
                                {MOTHERS_DAY_PROMO.availability}
                            </span>
                        </p>
                        <span className="hidden md:inline-flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase font-light shrink-0 transition-transform group-hover:translate-x-0.5">
                            Mehr erfahren
                            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleDismiss}
                        className="p-1.5 -mr-1.5 rounded-md transition-colors shrink-0 hover:bg-white/10"
                        style={{ color: MOTHERS_DAY_THEME.textMuted }}
                        aria-label="Muttertags-Hinweis schließen"
                    >
                        <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
