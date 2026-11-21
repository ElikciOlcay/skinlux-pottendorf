"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Gift, X } from "lucide-react";

import {
    CHRISTMAS_THEME,
    CHRISTMAS_VOUCHER_URL,
    christmasCountdownLabel,
    isChristmasActive,
} from "@/lib/campaigns/weihnachten";

const STORAGE_KEY = "christmasBannerDismissed";
const HEIGHT_CSS_VAR = "--promo-banner-height";

/** Schmale Weihnachtsleiste über der Navigation, verlinkt auf die Gutscheine. */
export default function ChristmasBanner() {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [countdown, setCountdown] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
        setCountdown(christmasCountdownLabel());
        try {
            setIsDismissed(window.sessionStorage.getItem(STORAGE_KEY) === "true");
        } catch {
            setIsDismissed(false);
        }
    }, []);

    const isActive = isMounted && !isDismissed && isChristmasActive();

    useEffect(() => {
        const root = document.documentElement;

        if (!isActive || !wrapperRef.current) {
            root.style.setProperty(HEIGHT_CSS_VAR, "0px");
            return;
        }

        const updateHeight = () => {
            root.style.setProperty(HEIGHT_CSS_VAR, `${wrapperRef.current?.offsetHeight ?? 0}px`);
        };

        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(wrapperRef.current);

        return () => {
            observer.disconnect();
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

    const isOnVoucherPage = pathname?.startsWith(CHRISTMAS_VOUCHER_URL);

    return (
        <div
            ref={wrapperRef}
            role="region"
            aria-label="Weihnachtsgutscheine"
            className="fixed top-0 left-0 right-0 z-50 w-full shadow-md"
            style={{
                background: `linear-gradient(90deg, ${CHRISTMAS_THEME.pineDeep}, ${CHRISTMAS_THEME.pine}, ${CHRISTMAS_THEME.pineDeep})`,
                color: CHRISTMAS_THEME.cream,
                borderBottom: `1px solid ${CHRISTMAS_THEME.gold}55`,
                paddingTop: "env(safe-area-inset-top)",
            }}
        >
            <div className="container mx-auto px-4 py-2.5">
                <div className="flex items-center justify-between gap-3">
                    <Link
                        href={CHRISTMAS_VOUCHER_URL}
                        className="group flex flex-1 items-center justify-center gap-2 md:gap-3 min-w-0"
                    >
                        <Gift
                            className="w-4 h-4 shrink-0"
                            style={{ color: CHRISTMAS_THEME.gold }}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        <p className="text-[12px] md:text-sm font-light leading-tight truncate">
                            <span
                                className="tracking-[0.18em] uppercase font-normal"
                                style={{ color: CHRISTMAS_THEME.goldSoft }}
                            >
                                <span className="sm:hidden">Geschenkidee</span>
                                <span className="hidden sm:inline">Weihnachtsgeschenk gesucht?</span>
                            </span>
                            <span className="hidden sm:inline">
                                {" · "}Verschenken Sie einen Skinlux Gutschein
                            </span>
                            {countdown ? (
                                <span className="hidden lg:inline opacity-70">{" · "}{countdown}</span>
                            ) : null}
                        </p>
                        {!isOnVoucherPage ? (
                            <span
                                className="inline-flex items-center gap-1 shrink-0 text-[11px] md:text-xs tracking-widest uppercase px-3 py-1 rounded-full transition-transform group-hover:translate-x-0.5"
                                style={{ backgroundColor: CHRISTMAS_THEME.gold, color: CHRISTMAS_THEME.pineDeep }}
                            >
                                <span className="sm:hidden">Gutscheine</span>
                                <span className="hidden sm:inline">Gutschein schenken</span>
                                <ArrowRight className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
                            </span>
                        ) : null}
                    </Link>
                    <button
                        type="button"
                        onClick={handleDismiss}
                        aria-label="Weihnachtsleiste schließen"
                        className="shrink-0 p-1 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
