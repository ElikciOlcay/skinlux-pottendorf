// Meta Conversions API Tracking Helper

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
    try {
        const response = await fetch('/api/meta-conversion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventName,
                eventData: {
                    sourceUrl: window.location.href,
                    customData
                },
                userData
            })
        });

        if (!response.ok) {
            console.error('Meta Tracking Error:', await response.text());
            return false;
        }

        const result = await response.json();
        console.log('Meta Event tracked:', eventName, result);
        return true;

    } catch (error) {
        console.error('Meta Tracking Error:', error);
        return false;
    }
};

// Standard-Events
export const MetaEvents = {
    // Terminbuchung
    SCHEDULE: 'Schedule',
    
    // Seitenaufrufe
    VIEW_CONTENT: 'ViewContent',
    
    // Lead-Generierung
    LEAD: 'Lead',
    
    // Kontaktaufnahme
    CONTACT: 'Contact',
    
};

// Tracking-Funktionen für spezifische Events
export const trackTerminBuchung = (userData?: Record<string, unknown>) => {
    return trackMetaEvent(MetaEvents.SCHEDULE, userData, {
        content_name: 'Laser-Haarentfernung Termin',
        content_category: 'Terminbuchung'
    });
};

export const trackPageView = (pageName: string) => {
    return trackMetaEvent(MetaEvents.VIEW_CONTENT, undefined, {
        content_name: pageName
    });
};

export const trackLead = (userData?: Record<string, unknown>) => {
    return trackMetaEvent(MetaEvents.LEAD, userData, {
        content_name: 'Lead Generierung',
        content_category: 'Lead'
    });
};

