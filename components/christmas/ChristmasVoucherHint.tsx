"use client";

import { useEffect, useState } from "react";
import { Gift } from "lucide-react";

import {
    CHRISTMAS_THEME,
    christmasCountdownLabel,
    isChristmasActive,
} from "@/lib/campaigns/weihnachten";

/** Festlicher Hinweis im Kopf der Gutschein-Seite (nur im Advent). */
export default function ChristmasVoucherHint() {
    const [countdown, setCountdown] = useState<string | null>(null);

    useEffect(() => {
        if (isChristmasActive()) {
            setCountdown(christmasCountdownLabel());
        }
    }, []);

    if (!countdown) {
        return null;
    }

    return (
        <div
            className="mx-auto mb-2 flex max-w-2xl flex-col items-center gap-2 rounded-2xl px-5 py-4 text-center sm:flex-row sm:text-left"
            style={{
                backgroundColor: CHRISTMAS_THEME.pine,
                color: CHRISTMAS_THEME.cream,
                border: `1px solid ${CHRISTMAS_THEME.gold}66`,
            }}
        >
            <Gift className="h-6 w-6 shrink-0" style={{ color: CHRISTMAS_THEME.gold }} strokeWidth={1.5} />
            <p className="text-sm font-light leading-relaxed">
                <span className="font-normal" style={{ color: CHRISTMAS_THEME.goldSoft }}>
                    {countdown}.
                </span>{" "}
                Der Gutschein ist das perfekte Weihnachtsgeschenk. Tipp: Für den Postversand
                rechtzeitig bestellen – per E-Mail geht es am schnellsten.
            </p>
        </div>
    );
}
