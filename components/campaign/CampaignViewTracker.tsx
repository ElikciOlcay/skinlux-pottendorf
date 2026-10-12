"use client";

import { useEffect } from "react";
import {
    hasMarketingConsent,
    subscribeToCookiebotConsent,
} from "@/lib/cookie-consent";
import { trackPageView } from "@/lib/meta-tracking";

export default function CampaignViewTracker({ contentName }: { contentName: string }) {
    useEffect(() => {
        let sent = false;

        return subscribeToCookiebotConsent(() => {
            if (sent || !hasMarketingConsent()) return;
            sent = true;
            void trackPageView(contentName);
        });
    }, [contentName]);

    return null;
}
