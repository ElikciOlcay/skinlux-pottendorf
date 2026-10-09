import { damenPrices, herrenPrices, type LaserPriceItem } from "@/lib/laser-prices";

export type LaserOktoberZone = {
    name: string;
    regularEuro: number;
};

const FREE_CONSULTATION = "Kostenloses Erstgespräch mit Probebehandlung";

function billableZones(items: readonly LaserPriceItem[]): LaserOktoberZone[] {
    return items
        .filter((item) => item.zone !== FREE_CONSULTATION && item.priceEuro > 0)
        .map((item) => ({
            name: item.zone,
            regularEuro: item.priceEuro,
        }));
}

function requirePrice(items: readonly LaserPriceItem[], zone: string): number {
    const match = items.find((item) => item.zone === zone);
    if (!match) {
        throw new Error(`Laserpreis fehlt: ${zone}`);
    }
    return match.priceEuro;
}

/** Einzelzonen Damen, gleiche Beträge wie auf /preise/laser. */
export const LASER_OKTOBER_DAMEN_ZONES: readonly LaserOktoberZone[] = billableZones(damenPrices);

/** Einzelzonen Herren, gleiche Beträge wie auf /preise/laser. */
export const LASER_OKTOBER_HERREN_ZONES: readonly LaserOktoberZone[] = billableZones(herrenPrices);

export const LASER_OKTOBER_FEATURED_ZONES = [
    { name: "Achseln", regularEuro: requirePrice(damenPrices, "Achseln") },
    { name: "Bikinizone", regularEuro: requirePrice(damenPrices, "Bikinizone") },
    { name: "Herren Rücken", regularEuro: requirePrice(herrenPrices, "Rücken") },
    { name: "Beine komplett", regularEuro: requirePrice(damenPrices, "Beine komplett") },
] as const;

/** 50 % auf den regulären Einzelpreis. */
export function laserOktoberOfferEuro(regularEuro: number): number {
    return regularEuro / 2;
}

export function formatLaserOktoberEuro(amount: number): string {
    const cents = Math.round(amount * 100);
    const euros = Math.trunc(cents / 100);
    const rest = Math.abs(cents % 100);
    if (rest === 0) return `${euros} €`;
    return `${euros},${String(rest).padStart(2, "0")} €`;
}
