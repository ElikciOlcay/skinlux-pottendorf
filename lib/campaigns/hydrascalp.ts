import { buildCampaignBookingUrl, type SearchParamsInput } from "@/lib/campaigns/booking-url";

export const HYDRASCALP_LANDING_PATH = "/aktion/hydrascalp";

export const HYDRASCALP_CONTENT_NAME = "HydraScalp Landingpage";

export const HYDRASCALP_CONVERSION_SOURCE = "hydrascalp";

/** Shore-Buchungslink mit den UTM-Parametern der Anzeige (oder Fallback für Meta). */
export function buildHydraScalpBookingUrl(params: SearchParamsInput): string {
    return buildCampaignBookingUrl(params, "hydrascalp");
}
