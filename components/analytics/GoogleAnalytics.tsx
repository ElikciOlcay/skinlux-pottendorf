"use client";

import { useEffect } from "react";
import { getStoredConsent, updateConsentState } from "@/lib/cookie-consent";

export default function GoogleAnalytics() {
    useEffect(() => {
        const stored = getStoredConsent();
        if (stored?.preferences) {
            updateConsentState(stored.preferences);
        }
    }, []);

    return null;
}
