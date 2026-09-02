import { hasAnalyticsConsent } from "@/lib/cookie-consent";

export const ConversionEvents = {
    BOOKING_CLICK: "booking_click",
    WHATSAPP_CLICK: "whatsapp_click",
    PHONE_CLICK: "phone_click",
    VOUCHER_PURCHASE: "voucher_purchase",
} as const;

type ConversionEventName =
    (typeof ConversionEvents)[keyof typeof ConversionEvents];

/**
 * Custom Conversion-Events an dataLayer/gtag.
 * Nur bei Analytics-Consent – Ads-Conversions laufen über GTM Consent Mode.
 */
export function trackConversionEvent(
    eventName: ConversionEventName,
    params?: Record<string, string | number | undefined>
): void {
    if (typeof window === "undefined") return;

    if (!hasAnalyticsConsent()) return;
    if (typeof window.gtag !== "function") return;

    window.gtag("event", eventName, {
        event_category: "conversion",
        ...params,
    });
}
