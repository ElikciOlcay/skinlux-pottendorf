import {
    buildCampaignBookingUrl,
    CAMPAIGN_BOOKING_BASE_URL,
    type SearchParamsInput,
} from "@/lib/campaigns/booking-url";

/** Basis-URL der Shore-Buchung für die GREEN PEEL Landingpage. */
export const GREEN_PEEL_BOOKING_BASE_URL = CAMPAIGN_BOOKING_BASE_URL;

export const GREEN_PEEL_LANDING_PATH = "/aktion/green-peel";

export const GREEN_PEEL_CONTENT_NAME = "GREEN PEEL Landingpage";

export const GREEN_PEEL_CONVERSION_SOURCE = "green-peel";

/** Shore-Buchungslink mit den UTM-Parametern der Anzeige (oder Fallback für Meta). */
export function buildGreenPeelBookingUrl(params: SearchParamsInput): string {
    return buildCampaignBookingUrl(params, "green_peel");
}
