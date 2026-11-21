/**
 * Weihnachts-Aktion: festliche Elemente + Hervorhebung des Gutscheinverkaufs.
 * Alles schaltet sich nach Heiligabend automatisch wieder ab.
 */

export const CHRISTMAS_START = new Date("2026-11-20T00:00:00+01:00");
export const CHRISTMAS_END = new Date("2026-12-25T00:00:00+01:00");
const CHRISTMAS_EVE = new Date("2026-12-24T00:00:00+01:00");

export const CHRISTMAS_VOUCHER_URL = "/gutscheine";

export const CHRISTMAS_THEME = {
    pine: "#1E3A2F",
    pineDeep: "#152A22",
    gold: "#C8A96A",
    goldSoft: "#E6D3A3",
    cream: "#F7F3EA",
    berry: "#9E2B2B",
} as const;

export function isChristmasActive(now: Date = new Date()): boolean {
    return now >= CHRISTMAS_START && now < CHRISTMAS_END;
}

/** Ganze Tage bis Heiligabend (0 = heute ist Heiligabend). */
export function daysUntilChristmasEve(now: Date = new Date()): number {
    const diff = CHRISTMAS_EVE.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / 86_400_000));
}

export function christmasCountdownLabel(now: Date = new Date()): string {
    const days = daysUntilChristmasEve(now);
    if (days === 0) return "Heute ist Heiligabend";
    if (days === 1) return "Morgen ist Heiligabend";
    return `Noch ${days} Tage bis Heiligabend`;
}
