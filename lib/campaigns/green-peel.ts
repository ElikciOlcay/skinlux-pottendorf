import { SHORE_BOOKING_HOST } from "@/lib/booking";

const SHORE_BOOKING_ID = "dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e";

/** Basis-URL der Shore-Buchung für die GREEN PEEL Landingpage. */
export const GREEN_PEEL_BOOKING_BASE_URL =
    `https://${SHORE_BOOKING_HOST}/bookings/${SHORE_BOOKING_ID}/services`;

export const GREEN_PEEL_LANDING_PATH = "/aktion/green-peel";

export const GREEN_PEEL_CONTENT_NAME = "GREEN PEEL Landingpage";

export const GREEN_PEEL_CONVERSION_SOURCE = "green-peel";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

const FALLBACK_UTM = {
    utm_source: "meta",
    utm_medium: "paid",
    utm_campaign: "green_peel",
} as const;

type SearchParamsInput =
    | URLSearchParams
    | Record<string, string | string[] | undefined>;

function readParam(params: SearchParamsInput, key: string): string | null {
    const value =
        params instanceof URLSearchParams ? params.get(key) : params[key];

    if (Array.isArray(value)) {
        const first = value[0]?.trim();
        return first ? first : null;
    }

    const trimmed = value?.trim();
    return trimmed ? trimmed : null;
}

/** Shore-Buchungslink mit den UTM-Parametern der Anzeige (oder Fallback für Meta). */
export function buildGreenPeelBookingUrl(params: SearchParamsInput): string {
    const url = new URL(GREEN_PEEL_BOOKING_BASE_URL);
    url.searchParams.set("hl", "de-AT");
    let hasUtm = false;

    for (const key of UTM_KEYS) {
        const value = readParam(params, key);
        if (!value) continue;
        url.searchParams.set(key, value);
        hasUtm = true;
    }

    if (!hasUtm) {
        for (const [key, value] of Object.entries(FALLBACK_UTM)) {
            url.searchParams.set(key, value);
        }
    }

    return url.toString();
}
