export const COOKIE_CONSENT_KEY = "skinlux-cookie-consent";
export const GTM_ID = "GTM-WF7B8JVD";
/** GA4 läuft über GTM – ID nur als Referenz / für gtag-Events */
export const GA_MEASUREMENT_ID = "G-N76BWEKEH9";

export interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

export interface CookieConsentData {
    timestamp: string;
    preferences: CookiePreferences;
}

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function getStoredConsent(): CookieConsentData | null {
    if (typeof window === "undefined") return null;

    try {
        const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as CookieConsentData;
    } catch {
        return null;
    }
}

function ensureGtag(): (...args: unknown[]) => void {
    window.dataLayer = window.dataLayer || [];

    if (!window.gtag) {
        window.gtag = (...args: unknown[]) => {
            window.dataLayer!.push(args);
        };
    }

    return window.gtag;
}

export function updateConsentState(preferences: CookiePreferences): void {
    if (typeof window === "undefined") return;

    const analytics = preferences.analytics ? "granted" : "denied";
    const marketing = preferences.marketing ? "granted" : "denied";

    const gtag = ensureGtag();
    gtag("consent", "update", {
        analytics_storage: analytics,
        ad_storage: marketing,
        ad_user_data: marketing,
        ad_personalization: marketing,
    });

    // Explizites Event für GTM-Trigger (Consent Mode + Custom Trigger)
    window.dataLayer!.push({
        event: "cookie_consent_update",
        analytics_storage: analytics,
        ad_storage: marketing,
        ad_user_data: marketing,
        ad_personalization: marketing,
    });
}

export function saveCookieConsent(preferences: CookiePreferences): void {
    localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({
            timestamp: new Date().toISOString(),
            preferences,
        })
    );

    updateConsentState(preferences);
}
