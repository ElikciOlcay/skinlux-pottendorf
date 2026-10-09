import { SHORE_BOOKING_HOST } from "@/lib/booking";

const SHORE_BOOKING_ID = "dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e";

/** Basis-URL der Shore-Buchung für die Oktober-Aktion. */
export const LASER_OKTOBER_BOOKING_BASE_URL =
    `https://${SHORE_BOOKING_HOST}/bookings/${SHORE_BOOKING_ID}/services`;

/** Ab diesem Zeitpunkt (Europe/Vienna) ist die Aktion abgelaufen. */
export const LASER_OKTOBER_CAMPAIGN_END = "2026-11-01T00:00:00";

export const LASER_OKTOBER_TIME_ZONE = "Europe/Vienna";

export const LASER_OKTOBER_PATH = "/aktion/laser-oktober";

export const LASER_OKTOBER_PRICES_PATH = "/aktion/laser-oktober/preise";

export const LASER_OKTOBER_REDIRECT_PATH = "/behandlungen/laser-haarentfernung";

export const LASER_OKTOBER_CONTENT_NAME = "Laser Oktober Aktion";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

const FALLBACK_UTM = {
    utm_source: "meta",
    utm_medium: "paid",
    utm_campaign: "laser_okt26",
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

export function buildLaserOktoberBookingUrl(params: SearchParamsInput): string {
    const url = new URL(LASER_OKTOBER_BOOKING_BASE_URL);
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

export function buildLaserOktoberUtmQuery(params: SearchParamsInput): string {
    const search = new URLSearchParams();

    for (const key of UTM_KEYS) {
        const value = readParam(params, key);
        if (value) search.set(key, value);
    }

    const query = search.toString();
    return query ? `?${query}` : "";
}

function viennaLocalStamp(now: Date): string {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: LASER_OKTOBER_TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
    }).formatToParts(now);

    const value = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value ?? "00";

    return `${value("year")}-${value("month")}-${value("day")}T${value("hour")}:${value("minute")}:${value("second")}`;
}

export function isLaserOktoberCampaignEnded(now = new Date()): boolean {
    return viennaLocalStamp(now) >= LASER_OKTOBER_CAMPAIGN_END;
}
