export const COOKIE_CONSENT_KEY = "skinlux-cookie-consent";
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

let gaLoaded = false;

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

export function loadGoogleAnalytics(): void {
    if (typeof window === "undefined" || gaLoaded) return;

    const gtag = ensureGtag();
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);

    if (document.getElementById("google-analytics-script")) {
        gaLoaded = true;
        return;
    }

    const script = document.createElement("script");
    script.id = "google-analytics-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    gaLoaded = true;
}

export function updateConsentState(preferences: CookiePreferences): void {
    if (typeof window === "undefined") return;

    const gtag = ensureGtag();
    gtag("consent", "update", {
        analytics_storage: preferences.analytics ? "granted" : "denied",
        ad_storage: preferences.marketing ? "granted" : "denied",
        ad_user_data: preferences.marketing ? "granted" : "denied",
        ad_personalization: preferences.marketing ? "granted" : "denied",
    });

    if (preferences.analytics) {
        loadGoogleAnalytics();
    }
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
