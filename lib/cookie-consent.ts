export const COOKIE_CONSENT_KEY = "skinlux-cookie-consent";
export const COOKIE_SETTINGS_EVENT = "skinlux:open-cookie-settings";
export const GTM_ID = "GTM-WF7B8JVD";
/** GA4 Measurement ID – Tracking läuft über GTM; ID nur als Referenz */
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

export type ConsentSignal = "granted" | "denied";

export interface GoogleConsentSignals {
    analytics_storage: ConsentSignal;
    ad_storage: ConsentSignal;
    ad_user_data: ConsentSignal;
    ad_personalization: ConsentSignal;
}

export const DEFAULT_DENIED_PREFERENCES: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
};

export const ACCEPTED_ALL_PREFERENCES: CookiePreferences = {
    necessary: true,
    analytics: true,
    marketing: true,
};

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

function isBoolean(value: unknown): value is boolean {
    return value === true || value === false;
}

/**
 * Zentrale Abbildung Banner-Kategorien → Google Consent Mode V2.
 * analytics → analytics_storage
 * marketing → ad_storage, ad_user_data, ad_personalization
 */
export function mapPreferencesToGoogleConsent(
    preferences: CookiePreferences
): GoogleConsentSignals {
    const analytics: ConsentSignal = preferences.analytics ? "granted" : "denied";
    const marketing: ConsentSignal = preferences.marketing ? "granted" : "denied";

    return {
        analytics_storage: analytics,
        ad_storage: marketing,
        ad_user_data: marketing,
        ad_personalization: marketing,
    };
}

/** Validiert gespeicherte Werte; bei Fehlern → null (behandelt als denied). */
export function normalizePreferences(input: unknown): CookiePreferences | null {
    if (!input || typeof input !== "object") return null;

    const prefs = input as Record<string, unknown>;
    if (!isBoolean(prefs.analytics) || !isBoolean(prefs.marketing)) {
        return null;
    }

    return {
        necessary: true,
        analytics: prefs.analytics,
        marketing: prefs.marketing,
    };
}

export function parseStoredConsentRaw(raw: string | null): CookieConsentData | null {
    if (!raw) return null;

    try {
        const data = JSON.parse(raw) as unknown;
        if (!data || typeof data !== "object") return null;

        const record = data as Record<string, unknown>;
        const preferences = normalizePreferences(record.preferences);
        if (!preferences) return null;

        return {
            timestamp:
                typeof record.timestamp === "string"
                    ? record.timestamp
                    : new Date().toISOString(),
            preferences,
        };
    } catch {
        return null;
    }
}

export function getStoredConsent(): CookieConsentData | null {
    if (typeof window === "undefined") return null;
    return parseStoredConsentRaw(localStorage.getItem(COOKIE_CONSENT_KEY));
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

export function applyGoogleConsentUpdate(
    preferences: CookiePreferences,
    options?: { emitDataLayerEvent?: boolean }
): void {
    if (typeof window === "undefined") return;

    const signals = mapPreferencesToGoogleConsent(preferences);
    const gtag = ensureGtag();

    gtag("consent", "update", signals);

    if (options?.emitDataLayerEvent) {
        window.dataLayer!.push({
            event: "cookie_consent_update",
            ...signals,
        });
    }
}

/** @deprecated Alias – nutzt applyGoogleConsentUpdate ohne DataLayer-Event */
export function updateConsentState(preferences: CookiePreferences): void {
    applyGoogleConsentUpdate(preferences, { emitDataLayerEvent: false });
}

export function saveCookieConsent(preferences: CookiePreferences): void {
    const normalized = normalizePreferences(preferences) ?? DEFAULT_DENIED_PREFERENCES;

    localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({
            timestamp: new Date().toISOString(),
            preferences: normalized,
        } satisfies CookieConsentData)
    );

    applyGoogleConsentUpdate(normalized, { emitDataLayerEvent: true });
}

export function revokeCookieConsent(): void {
    saveCookieConsent(DEFAULT_DENIED_PREFERENCES);
}

export function openCookieSettings(): void {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT));
}

/**
 * Inline-Script für Root-Layout: Default denied + frühe Restore VOR GTM.
 * Logik gespiegelt zu normalizePreferences / mapPreferencesToGoogleConsent.
 */
export function getConsentBootstrapInlineScript(consentKey: string): string {
    return `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  var raw = localStorage.getItem('${consentKey}');
  if (raw) {
    var data = JSON.parse(raw);
    var prefs = data && data.preferences;
    if (prefs && (prefs.analytics === true || prefs.analytics === false) && (prefs.marketing === true || prefs.marketing === false)) {
      gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'ad_storage': prefs.marketing ? 'granted' : 'denied',
        'ad_user_data': prefs.marketing ? 'granted' : 'denied',
        'ad_personalization': prefs.marketing ? 'granted' : 'denied'
      });
    }
  }
} catch (e) {}
`.trim();
}
