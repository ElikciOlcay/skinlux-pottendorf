"use client";

import { useEffect, useId, useState } from "react";

import { isChristmasActive } from "@/lib/campaigns/weihnachten";

/*
 * Weihnachtsmütze, die auf dem „s“ des Skinlux-Logos sitzt.
 * Wird als Geschwister des Logo-<Image> in einen `relative` Container gelegt;
 * alle Maße sind relativ zur Logo-Grafik (800 × 300), skaliert also mit.
 */

// Platzierung in Logo-Koordinaten (identisch zu den Instagram-PNGs)
const HAT_WIDTH = 144; // von 800
const HAT_SCALE = HAT_WIDTH / 140;
const BRIM_X = 73; // Fellrand-Mitte in der Mützen-viewBox (140 × 120)
const BRIM_Y = 97;
const LEFT = ((105 - BRIM_X * HAT_SCALE) / 800) * 100;
const TOP = ((88 - BRIM_Y * HAT_SCALE) / 300) * 100;

interface LogoSantaHatProps {
    /** Ohne Datumsprüfung anzeigen (z. B. auf Weihnachts-Elementen, die selbst schon zeitgesteuert sind). */
    always?: boolean;
    /** Schwingen + Pompon-Animation. */
    animated?: boolean;
}

export default function LogoSantaHat({ always = false, animated = true }: LogoSantaHatProps) {
    const [show, setShow] = useState(always);
    const id = useId().replace(/:/g, "");

    useEffect(() => {
        if (!always) setShow(isChristmasActive());
    }, [always]);

    if (!show) {
        return null;
    }

    return (
        <span
            aria-hidden="true"
            className={`skinlux-hat pointer-events-none absolute block ${animated ? "skinlux-hat--animated" : ""}`}
            style={{
                left: `${LEFT}%`,
                top: `${TOP}%`,
                width: `${(HAT_WIDTH / 800) * 100}%`,
                transformOrigin: `${(BRIM_X / 140) * 100}% ${(BRIM_Y / 120) * 100}%`,
            }}
        >
            <style>{`
                .skinlux-hat { transform: rotate(-10deg); animation: skinlux-hat-in 0.7s cubic-bezier(.34,1.56,.64,1) both; }
                .skinlux-hat--animated { animation: skinlux-hat-in 0.7s cubic-bezier(.34,1.56,.64,1) both, skinlux-hat-sway 3.6s ease-in-out 0.7s infinite; }
                .skinlux-hat--animated .skinlux-hat-pompom { transform-box: fill-box; transform-origin: 80% 0%; animation: skinlux-hat-pompom 3.6s ease-in-out 0.7s infinite; }
                a:hover .skinlux-hat--animated { animation: skinlux-hat-wiggle 0.6s ease-in-out; }
                @keyframes skinlux-hat-in { 0% { opacity: 0; transform: translateY(-60%) rotate(-30deg); } 100% { opacity: 1; transform: translateY(0) rotate(-10deg); } }
                @keyframes skinlux-hat-sway { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(-4deg); } }
                @keyframes skinlux-hat-pompom { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-14deg); } }
                @keyframes skinlux-hat-wiggle { 0%, 100% { transform: rotate(-10deg); } 25% { transform: rotate(-18deg); } 50% { transform: rotate(-2deg); } 75% { transform: rotate(-13deg); } }
                @media (prefers-reduced-motion: reduce) {
                    .skinlux-hat, .skinlux-hat--animated, .skinlux-hat--animated .skinlux-hat-pompom { animation: none !important; }
                }
            `}</style>
            <svg viewBox="0 0 140 120" className="block h-auto w-full overflow-visible">
                <defs>
                    <linearGradient id={`hatRed-${id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#D33A3A" />
                        <stop offset="0.6" stopColor="#B42626" />
                        <stop offset="1" stopColor="#8E1C1C" />
                    </linearGradient>
                    <radialGradient id={`hatFluff-${id}`} cx="0.4" cy="0.35" r="0.75">
                        <stop offset="0" stopColor="#FFFFFF" />
                        <stop offset="0.7" stopColor="#F4F1EC" />
                        <stop offset="1" stopColor="#DCD6CC" />
                    </radialGradient>
                </defs>
                <path
                    d="M30 92 C 34 62, 48 34, 74 22 C 92 14, 112 22, 116 44 C 119 60, 118 78, 116 92 Z"
                    fill={`url(#hatRed-${id})`}
                />
                <g className="skinlux-hat-pompom">
                    <path
                        d="M76 24 C 60 22, 42 26, 30 38 C 24 44, 20 50, 18 56 L 28 60 C 32 50, 42 40, 56 36 C 64 34, 72 34, 80 36 Z"
                        fill={`url(#hatRed-${id})`}
                    />
                    <circle cx="20" cy="62" r="13" fill={`url(#hatFluff-${id})`} />
                </g>
                <path
                    d="M92 30 C 102 32, 108 44, 108 60"
                    stroke="#FFFFFF"
                    strokeOpacity="0.25"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                />
                <rect x="22" y="88" width="102" height="18" rx="9" fill={`url(#hatFluff-${id})`} />
                <circle cx="30" cy="97" r="9" fill="#FFFFFF" fillOpacity="0.5" />
                <circle cx="58" cy="94" r="6" fill="#FFFFFF" fillOpacity="0.5" />
                <circle cx="92" cy="95" r="7" fill="#FFFFFF" fillOpacity="0.5" />
            </svg>
        </span>
    );
}
