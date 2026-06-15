const SHORE_BOOKING_ID = "dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e";
const SHORE_BOOKING_BASE = `https://connect.shore.com/bookings/${SHORE_BOOKING_ID}/services`;

export function getShoreBookingUrl(medium = "website"): string {
    const params = new URLSearchParams({
        hl: "de-AT",
        utm_source: "pottendorf.skinlux.at",
        utm_medium: medium,
        utm_campaign: "terminbuchung",
    });

    return `${SHORE_BOOKING_BASE}?${params.toString()}`;
}

export const SHORE_BOOKING_URL = getShoreBookingUrl();

export const WHATSAPP_BOOKING_URL =
    "https://wa.me/436649188632?text=Hallo%20Skinlux!%20Ich%20m%C3%B6chte%20gerne%20einen%20Termin%20vereinbaren.";

export const PHONE_E164 = "+436649188632";
