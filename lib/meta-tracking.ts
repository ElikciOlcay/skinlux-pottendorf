import { getStoredConsent } from "@/lib/cookie-consent";

// Meta Conversions API Tracking Helper (server-side via API-Route)
// Client-Pixel wird bewusst NICHT geladen – nur CAPI nach Marketing-Consent.

export const trackMetaEvent = async (
    eventName: string,
    userData?: {
        email?: string;
        phone?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    },
    customData?: {
        currency?: string;
        value?: string | number;
        content_name?: string;
        content_category?: string;
        [key: string]: unknown;
    }
) => {
    if (typeof window === "undefined") return false;

    const consent = getStoredConsent();
    if (!consent?.preferences.marketing) {
        return false;
    }

    try {
        const response = await fetch("/api/meta-conversion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventName,
                eventData: {
                    sourceUrl: window.location.href,
                    customData,
                },
                userData,
            }),
        });

        if (!response.ok) {
            return false;
        }

        await response.json();
        return true;
    } catch {
        return false;
    }
};

export const MetaEvents = {
    SCHEDULE: "Schedule",
    VIEW_CONTENT: "ViewContent",
    LEAD: "Lead",
    CONTACT: "Contact",
};

export const trackTerminBuchung = (userData?: Record<string, unknown>) => {
    return trackMetaEvent(MetaEvents.SCHEDULE, userData, {
        content_name: "Laser-Haarentfernung Termin",
        content_category: "Terminbuchung",
    });
};

export const trackPageView = (pageName: string) => {
    return trackMetaEvent(MetaEvents.VIEW_CONTENT, undefined, {
        content_name: pageName,
    });
};

export const trackLead = (userData?: Record<string, unknown>) => {
    return trackMetaEvent(MetaEvents.LEAD, userData, {
        content_name: "Lead Generierung",
        content_category: "Lead",
    });
};
