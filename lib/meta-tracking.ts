import { hasMarketingConsent } from "@/lib/cookie-consent";

export const META_PIXEL_ID = "9333160304544644";

export function getMetaPixelBootstrapInlineScript(): string {
    return `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('consent', 'revoke');
fbq('init', '${META_PIXEL_ID}');
`.trim();
}

type FbqFunction = {
    (...args: unknown[]): void;
    callMethod?: (...args: unknown[]) => void;
    queue?: unknown[];
    loaded?: boolean;
    version?: string;
    push?: (...args: unknown[]) => void;
};

declare global {
    interface Window {
        fbq?: FbqFunction;
        _fbq?: FbqFunction;
    }
}

export const MetaEvents = {
    PAGE_VIEW: "PageView",
    SCHEDULE: "Schedule",
    VIEW_CONTENT: "ViewContent",
    LEAD: "Lead",
    CONTACT: "Contact",
} as const;

type MetaEventName = (typeof MetaEvents)[keyof typeof MetaEvents];

type MetaUserData = {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
};

type MetaCustomData = {
    currency?: string;
    value?: string | number;
    content_name?: string;
    content_category?: string;
    [key: string]: unknown;
};

function createEventId(): string {
    return crypto.randomUUID();
}

export function trackMetaPixelEvent(
    eventName: MetaEventName,
    params?: Record<string, unknown>,
    eventId?: string
): void {
    if (typeof window === "undefined") return;
    if (typeof window.fbq !== "function") return;

    window.fbq("track", eventName, params ?? {}, eventId ? { eventID: eventId } : undefined);
}

export const trackMetaEvent = async (
    eventName: MetaEventName,
    userData?: MetaUserData,
    customData?: MetaCustomData
) => {
    if (typeof window === "undefined") return false;
    if (!hasMarketingConsent()) return false;

    const eventId = createEventId();
    trackMetaPixelEvent(eventName, customData, eventId);

    try {
        const response = await fetch("/api/meta-conversion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventName,
                eventId,
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

export const trackTerminBuchung = (userData?: MetaUserData) => {
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

export const trackLead = (userData?: MetaUserData) => {
    return trackMetaEvent(MetaEvents.LEAD, userData, {
        content_name: "Lead Generierung",
        content_category: "Lead",
    });
};

export const trackContact = () => {
    return trackMetaEvent(MetaEvents.CONTACT, undefined, {
        content_name: "Kontakt",
        content_category: "Kontakt",
    });
};
