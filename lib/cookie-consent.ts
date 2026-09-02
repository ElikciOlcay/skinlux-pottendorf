export const GTM_ID = "GTM-WF7B8JVD";
/** GA4 Measurement ID – Tracking läuft über GTM; ID nur als Referenz */
export const GA_MEASUREMENT_ID = "G-N76BWEKEH9";

interface CookiebotConsent {
    necessary?: boolean;
    preferences?: boolean;
    statistics?: boolean;
    marketing?: boolean;
}

interface CookiebotAPI {
    consent?: CookiebotConsent;
    renew?: () => void;
}

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
        Cookiebot?: CookiebotAPI;
        CookieConsent?: CookiebotAPI;
    }
}

function getCookiebot(): CookiebotAPI | undefined {
    if (typeof window === "undefined") return undefined;
    return window.Cookiebot ?? window.CookieConsent;
}

export function hasAnalyticsConsent(): boolean {
    return getCookiebot()?.consent?.statistics === true;
}

export function hasMarketingConsent(): boolean {
    return getCookiebot()?.consent?.marketing === true;
}

export function openCookieSettings(): void {
    getCookiebot()?.renew?.();
}

/**
 * Consent Mode V2 Default denied VOR GTM.
 * Cookiebot (über GTM) aktualisiert die Signale nach der Nutzerentscheidung.
 */
export function getConsentBootstrapInlineScript(): string {
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
`.trim();
}
