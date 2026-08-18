"use client";

import { useEffect } from "react";
import { getStoredConsent, applyGoogleConsentUpdate } from "@/lib/cookie-consent";

/**
 * Stellt gespeicherten Consent clientseitig wieder her (Backup zum Inline-Bootstrap).
 * Kein DataLayer-Event – vermeidet doppelte GTM-Trigger beim Reload.
 */
export default function GoogleAnalytics() {
    useEffect(() => {
        const stored = getStoredConsent();
        if (stored?.preferences) {
            applyGoogleConsentUpdate(stored.preferences, {
                emitDataLayerEvent: false,
            });
        }
    }, []);

    return null;
}
