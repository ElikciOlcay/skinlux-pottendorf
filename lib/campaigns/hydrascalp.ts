import { buildCampaignBookingUrl, type SearchParamsInput } from "@/lib/campaigns/booking-url";

export const HYDRASCALP_LANDING_PATH = "/aktion/hydrascalp";

export const HYDRASCALP_CONTENT_NAME = "HydraScalp Landingpage";

export const HYDRASCALP_CONVERSION_SOURCE = "hydrascalp";

/** Preise laut Behandlungsblatt (Stand November 2026). Heimpflege mit Keravive Peptide Complex ist jeweils inklusive. */
export const HYDRASCALP_PREISE = [
    {
        id: "teil",
        name: "Teilbehandlung",
        beschreibung: "Ein ausgewählter Bereich der Kopfhaut",
        einzel: 280,
        kur: 800,
    },
    {
        id: "komplett",
        name: "Komplettbehandlung",
        beschreibung: "Die gesamte Kopfhaut",
        einzel: 375,
        kur: 1000,
    },
] as const;

/** Shore-Buchungslink mit den UTM-Parametern der Anzeige (oder Fallback für Meta). */
export function buildHydraScalpBookingUrl(params: SearchParamsInput): string {
    return buildCampaignBookingUrl(params, "hydrascalp");
}
