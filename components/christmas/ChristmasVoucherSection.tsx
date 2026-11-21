"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gift, Mail, Sparkles, Star } from "lucide-react";

import {
    CHRISTMAS_THEME,
    CHRISTMAS_VOUCHER_URL,
    christmasCountdownLabel,
    isChristmasActive,
} from "@/lib/campaigns/weihnachten";

interface ChristmasVoucherSectionProps {
    /** z. B. "Bischofshofen" – erscheint auf dem Gutschein und im Text. */
    city: string;
}

const AMOUNTS = [50, 100, 150];

/** Startseiten-Abschnitt, der im Advent den Gutscheinverkauf in den Vordergrund stellt. */
export default function ChristmasVoucherSection({ city }: ChristmasVoucherSectionProps) {
    const [active, setActive] = useState(false);
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        setActive(isChristmasActive());
        setCountdown(christmasCountdownLabel());
    }, []);

    if (!active) {
        return null;
    }

    return (
        <section
            id="weihnachtsgutscheine"
            className="relative overflow-hidden py-16 md:py-24"
            style={{ backgroundColor: CHRISTMAS_THEME.cream }}
        >
            <Ornaments />

            <div className="container relative mx-auto px-4">
                <div
                    className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl shadow-xl"
                    style={{
                        background: `radial-gradient(120% 140% at 0% 0%, ${CHRISTMAS_THEME.pine} 0%, ${CHRISTMAS_THEME.pineDeep} 70%)`,
                        color: CHRISTMAS_THEME.cream,
                    }}
                >
                    <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:gap-12 md:p-14">
                        {/* Text */}
                        <div>
                            <div className="mb-5 flex flex-wrap items-center gap-3">
                                <span
                                    className="rounded-full px-3 py-1 text-[0.65rem] font-normal uppercase tracking-[0.25em]"
                                    style={{ backgroundColor: CHRISTMAS_THEME.gold, color: CHRISTMAS_THEME.pineDeep }}
                                >
                                    Weihnachten 2026
                                </span>
                                {countdown ? (
                                    <span
                                        className="text-xs font-light uppercase tracking-widest"
                                        style={{ color: CHRISTMAS_THEME.goldSoft }}
                                    >
                                        {countdown}
                                    </span>
                                ) : null}
                            </div>

                            <h2 className="mb-5 text-3xl font-light leading-tight md:text-5xl" style={{ color: CHRISTMAS_THEME.cream }}>
                                Das schönste Geschenk:{" "}
                                <span style={{ color: CHRISTMAS_THEME.goldSoft }}>Zeit für sich.</span>
                            </h2>

                            <p className="mb-8 max-w-lg text-base font-light leading-relaxed opacity-85 md:text-lg">
                                Ob Laser-Haarentfernung, HydraFacial oder Microneedling – mit einem
                                Skinlux Gutschein schenken Sie Ihren Liebsten Wohlfühlmomente in unserem
                                Studio in {city}. Betrag frei wählbar, schnell online bestellt.
                            </p>

                            <div className="mb-8 flex flex-wrap gap-3">
                                {AMOUNTS.map((amount) => (
                                    <Link
                                        key={amount}
                                        href={CHRISTMAS_VOUCHER_URL}
                                        className="rounded-full border px-5 py-2 text-sm font-light transition-colors hover:bg-white/10"
                                        style={{ borderColor: `${CHRISTMAS_THEME.gold}80` }}
                                    >
                                        € {amount}
                                    </Link>
                                ))}
                                <Link
                                    href={CHRISTMAS_VOUCHER_URL}
                                    className="rounded-full border px-5 py-2 text-sm font-light transition-colors hover:bg-white/10"
                                    style={{ borderColor: `${CHRISTMAS_THEME.gold}80` }}
                                >
                                    Wunschbetrag
                                </Link>
                            </div>

                            <ul className="mb-10 space-y-3 text-sm font-light opacity-90">
                                <li className="flex items-center gap-3">
                                    <Sparkles className="h-4 w-4 shrink-0" style={{ color: CHRISTMAS_THEME.gold }} strokeWidth={1.5} />
                                    Wunschbetrag ab € 25
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 shrink-0" style={{ color: CHRISTMAS_THEME.gold }} strokeWidth={1.5} />
                                    Per E-Mail oder liebevoll per Post
                                </li>
                                <li className="flex items-center gap-3">
                                    <Star className="h-4 w-4 shrink-0" style={{ color: CHRISTMAS_THEME.gold }} strokeWidth={1.5} />
                                    Einlösbar im Skinlux Studio {city}
                                </li>
                            </ul>

                            <Link
                                href={CHRISTMAS_VOUCHER_URL}
                                className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-normal uppercase tracking-widest shadow-lg transition-transform hover:-translate-y-0.5"
                                style={{ backgroundColor: CHRISTMAS_THEME.gold, color: CHRISTMAS_THEME.pineDeep }}
                            >
                                <Gift className="h-4 w-4" strokeWidth={1.75} />
                                Gutschein verschenken
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
                            </Link>
                        </div>

                        {/* Gutschein-Visual */}
                        <VoucherCard city={city} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function VoucherCard({ city }: { city: string }) {
    return (
        <div className="relative mx-auto w-full max-w-md" style={{ perspective: "1200px" }}>
            <div
                className="relative aspect-[1.6/1] w-full rotate-[-4deg] overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-0"
                style={{ backgroundColor: CHRISTMAS_THEME.cream, color: CHRISTMAS_THEME.pineDeep }}
            >
                {/* Schleife: vertikales + horizontales Band */}
                <div className="absolute inset-y-0 right-[22%] w-6" style={{ backgroundColor: CHRISTMAS_THEME.berry }} />
                <div className="absolute inset-x-0 top-[38%] h-6" style={{ backgroundColor: CHRISTMAS_THEME.berry }} />
                <Bow className="absolute right-[22%] top-[38%] h-20 w-20 -translate-y-1/2 translate-x-[calc(50%-12px)]" />

                <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
                    <Image
                        src="/images/logo/skinlux-logo.png"
                        alt="Skinlux"
                        width={120}
                        height={40}
                        className="h-7 w-auto self-start"
                    />
                    <div>
                        <p className="text-[0.6rem] uppercase tracking-[0.35em] opacity-60">Geschenkgutschein</p>
                        <p className="mt-1 text-4xl font-light md:text-5xl">€ 100</p>
                        <p className="mt-1 text-xs font-light opacity-60">Skinlux Studio {city}</p>
                    </div>
                </div>
            </div>
            <div
                className="absolute -bottom-4 left-6 right-10 -z-10 h-full rotate-[3deg] rounded-2xl opacity-40"
                style={{ backgroundColor: CHRISTMAS_THEME.gold }}
            />
        </div>
    );
}

function Bow({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
            <path d="M40 40 C 20 15, 2 22, 10 38 C 16 50, 32 46, 40 40 Z" fill={CHRISTMAS_THEME.berry} />
            <path d="M40 40 C 60 15, 78 22, 70 38 C 64 50, 48 46, 40 40 Z" fill={CHRISTMAS_THEME.berry} />
            <path d="M40 40 L 30 70 L 36 66 L 40 72 Z" fill="#7F2121" />
            <path d="M40 40 L 50 70 L 44 66 L 40 72 Z" fill="#7F2121" />
            <circle cx="40" cy="40" r="7" fill="#7F2121" />
        </svg>
    );
}

function Ornaments() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {[
                { left: "6%", top: "8%", size: 26, color: CHRISTMAS_THEME.berry, line: 50 },
                { left: "16%", top: "4%", size: 18, color: CHRISTMAS_THEME.gold, line: 30 },
                { left: "84%", top: "6%", size: 22, color: CHRISTMAS_THEME.gold, line: 44 },
                { left: "93%", top: "3%", size: 16, color: CHRISTMAS_THEME.pine, line: 24 },
            ].map((o, i) => (
                <div key={i} className="absolute flex flex-col items-center" style={{ left: o.left, top: 0 }}>
                    <span className="w-px" style={{ height: o.line, backgroundColor: `${CHRISTMAS_THEME.gold}99` }} />
                    <span
                        className="rounded-full shadow-md"
                        style={{
                            width: o.size,
                            height: o.size,
                            background: `radial-gradient(circle at 35% 30%, #ffffff88 0%, ${o.color} 45%)`,
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
