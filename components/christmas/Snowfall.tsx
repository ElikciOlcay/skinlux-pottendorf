"use client";

import { useEffect, useState } from "react";

import { isChristmasActive } from "@/lib/campaigns/weihnachten";

const FLAKE_COUNT = 36;

// Deterministische Verteilung statt Math.random, damit jede Ansicht gleich aussieht.
const FLAKES = Array.from({ length: FLAKE_COUNT }, (_, i) => {
    const seed = (i * 37) % 100;
    return {
        left: `${(i * 61) % 100}%`,
        size: 2 + (seed % 4),
        duration: 9 + (seed % 9),
        delay: -((i * 13) % 17),
        drift: ((i % 5) - 2) * 12,
        opacity: 0.35 + (seed % 5) * 0.12,
    };
});

/** Dezenter Schneefall als Overlay (nur im Aktionszeitraum, respektiert reduced motion). */
export default function Snowfall({ className = "" }: { className?: string }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setShow(isChristmasActive() && !reduceMotion);
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden z-[15] ${className}`}
        >
            <style>{`
                @keyframes skinlux-snow {
                    0% { transform: translate3d(0, -10vh, 0); }
                    100% { transform: translate3d(var(--drift), 105vh, 0); }
                }
            `}</style>
            {FLAKES.map((flake, i) => (
                <span
                    key={i}
                    className="absolute top-0 rounded-full bg-white"
                    style={{
                        left: flake.left,
                        width: flake.size,
                        height: flake.size,
                        opacity: flake.opacity,
                        filter: "blur(0.5px)",
                        ["--drift" as string]: `${flake.drift}px`,
                        animation: `skinlux-snow ${flake.duration}s linear ${flake.delay}s infinite`,
                    }}
                />
            ))}
        </div>
    );
}
