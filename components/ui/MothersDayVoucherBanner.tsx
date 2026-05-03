"use client";

import { useEffect, useState } from "react";
import { Gift, Heart } from "lucide-react";

import {
    MOTHERS_DAY_PROMO,
    MOTHERS_DAY_THEME,
    isMothersDayPromoActive,
} from "@/lib/promotions";

export default function MothersDayVoucherBanner() {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(isMothersDayPromoActive());
    }, []);

    if (!isActive) {
        return null;
    }

    return (
        <section aria-label="Muttertags-Aktion" className="container px-4 mt-2 mb-2">
            <div className="max-w-4xl mx-auto">
                <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                        backgroundColor: MOTHERS_DAY_THEME.bg,
                        color: MOTHERS_DAY_THEME.text,
                        border: `1px solid ${MOTHERS_DAY_THEME.border}`,
                    }}
                >
                    <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
                        <Heart
                            className="w-40 h-40"
                            style={{ color: MOTHERS_DAY_THEME.text }}
                            strokeWidth={1}
                        />
                    </div>

                    <div className="relative grid md:grid-cols-[auto_1fr] items-center gap-5 md:gap-6 p-5 md:p-7">
                        <div
                            className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center shrink-0 rounded-xl"
                            style={{ backgroundColor: MOTHERS_DAY_THEME.surface }}
                        >
                            <Gift
                                className="w-7 h-7 md:w-8 md:h-8"
                                style={{ color: MOTHERS_DAY_THEME.text }}
                                strokeWidth={1.5}
                            />
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
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
                                    className="text-[0.65rem] md:text-xs font-light tracking-widest uppercase"
                                    style={{ color: MOTHERS_DAY_THEME.textMuted }}
                                >
                                    Im ganzen Mai
                                </span>
                            </div>
                            <h2
                                className="text-xl md:text-2xl font-light leading-snug mb-1"
                                style={{ color: MOTHERS_DAY_THEME.text }}
                            >
                                {MOTHERS_DAY_PROMO.discountPercent}% Rabatt auf alle Gutscheine
                            </h2>
                            <p
                                className="text-sm md:text-base font-light leading-relaxed"
                                style={{ color: MOTHERS_DAY_THEME.textMuted }}
                            >
                                Aktion gültig für{" "}
                                <span className="font-normal" style={{ color: MOTHERS_DAY_THEME.text }}>
                                    {MOTHERS_DAY_PROMO.treatments.join(" & ")}
                                </span>
                                . {MOTHERS_DAY_PROMO.availability} – frag uns einfach im Studio nach deinem Muttertags-Gutschein.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
