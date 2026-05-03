"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Gift, Heart, LucideIcon } from "lucide-react";

import {
    MOTHERS_DAY_PROMO,
    MOTHERS_DAY_THEME,
    isMothersDayPromoActive,
} from "@/lib/promotions";

type Offer = {
    id: string;
    title: string;
    description: string;
    detail: string;
    icon: LucideIcon;
    href: string;
    color: string;
    badge: string;
};

const offers: Offer[] = [];

export default function SpecialOffers() {
    const [showMothersDay, setShowMothersDay] = useState(false);

    useEffect(() => {
        setShowMothersDay(isMothersDayPromoActive());
    }, []);

    if (offers.length === 0 && !showMothersDay) {
        return null;
    }

    return (
        <section id="angebote" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                        Aktuelle Angebote
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 text-black">
                        Spezial Angebote
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Exklusive Behandlungen für deine natürliche Schönheit
                    </p>
                </div>

                {showMothersDay ? <MothersDayCard /> : null}

                {offers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
                        {offers.map((offer) => {
                            const IconComponent = offer.icon;
                            return (
                                <a
                                    key={offer.id}
                                    href={offer.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-start gap-5 border border-gray-200 bg-white p-5 md:p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
                                >
                                    <div
                                        className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 flex items-center justify-center"
                                        style={{ backgroundColor: offer.color }}
                                    >
                                        <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                                    </div>

                                    <div className="flex-1 min-w-0 py-0.5">
                                        <div className="flex items-center gap-3 mb-1.5">
                                            <h3 className="text-base md:text-lg font-light text-black leading-snug">
                                                {offer.title}
                                            </h3>
                                            <span
                                                className="text-[0.55rem] font-light tracking-widest uppercase px-2 py-0.5 text-white shrink-0"
                                                style={{ backgroundColor: offer.color }}
                                            >
                                                {offer.badge}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 font-light text-sm mb-2 leading-relaxed line-clamp-2">
                                            {offer.description}
                                        </p>

                                        <p className="text-xs font-light text-gray-400 mb-3">
                                            {offer.detail}
                                        </p>

                                        <span className="text-xs font-light tracking-widest uppercase inline-flex items-center gap-2 transition-colors" style={{ color: offer.color }}>
                                            Jetzt buchen
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                ) : null}

                <div className="mt-10 text-center">
                    <p className="text-xs font-light text-gray-400">
                        Angebote gültig solange der Vorrat reicht. Keine Barauszahlung möglich.
                    </p>
                </div>
            </div>
        </section>
    );
}

function MothersDayCard() {
    return (
        <div className="max-w-4xl mx-auto mb-8 md:mb-10">
            <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                    backgroundColor: MOTHERS_DAY_THEME.bg,
                    color: MOTHERS_DAY_THEME.text,
                    border: `1px solid ${MOTHERS_DAY_THEME.border}`,
                }}
            >
                <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
                    <Heart
                        className="w-48 h-48"
                        style={{ color: MOTHERS_DAY_THEME.text }}
                        strokeWidth={1}
                    />
                </div>

                <div className="relative grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-8 p-6 md:p-8">
                    <div
                        className="flex h-16 w-16 md:h-20 md:w-20 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: MOTHERS_DAY_THEME.surface }}
                    >
                        <Gift
                            className="w-8 h-8 md:w-10 md:h-10"
                            style={{ color: MOTHERS_DAY_THEME.text }}
                            strokeWidth={1.5}
                        />
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <span
                                className="text-[0.55rem] md:text-[0.65rem] font-light tracking-widest uppercase px-2.5 py-1 rounded-full"
                                style={{
                                    backgroundColor: MOTHERS_DAY_THEME.text,
                                    color: MOTHERS_DAY_THEME.bg,
                                }}
                            >
                                Muttertag
                            </span>
                            <span
                                className="text-xs font-light tracking-widest uppercase"
                                style={{ color: MOTHERS_DAY_THEME.textMuted }}
                            >
                                Im ganzen Mai
                            </span>
                        </div>
                        <h3
                            className="text-2xl md:text-3xl font-light leading-snug mb-2"
                            style={{ color: MOTHERS_DAY_THEME.text }}
                        >
                            {MOTHERS_DAY_PROMO.discountPercent}% Rabatt auf alle Gutscheine
                        </h3>
                        <p
                            className="text-sm md:text-base font-light leading-relaxed"
                            style={{ color: MOTHERS_DAY_THEME.textMuted }}
                        >
                            Schenke Pflege, die wirkt. Gültig für{" "}
                            <span className="font-normal" style={{ color: MOTHERS_DAY_THEME.text }}>
                                {MOTHERS_DAY_PROMO.treatments.join(" & ")}
                            </span>
                            . {MOTHERS_DAY_PROMO.availability}.
                        </p>
                    </div>

                    <Link
                        href={MOTHERS_DAY_PROMO.detailUrl}
                        className="group inline-flex items-center gap-2 text-xs font-light tracking-widest uppercase px-5 py-3 transition-colors whitespace-nowrap self-start md:self-auto hover:opacity-90 rounded-full"
                        style={{
                            backgroundColor: MOTHERS_DAY_THEME.text,
                            color: MOTHERS_DAY_THEME.bg,
                        }}
                    >
                        Mehr erfahren
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
