"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
    hasMarketingConsent,
    subscribeToCookiebotConsent,
} from "@/lib/cookie-consent";
import { MetaEvents, trackMetaPixelEvent } from "@/lib/meta-tracking";

function applyMetaConsent(granted: boolean): void {
    if (typeof window === "undefined" || typeof window.fbq !== "function") return;
    window.fbq("consent", granted ? "grant" : "revoke");
}

export default function MetaPixel() {
    const pathname = usePathname();
    const grantedRef = useRef(false);
    const pageViewSentRef = useRef(false);
    const isFirstPath = useRef(true);

    useEffect(() => {
        return subscribeToCookiebotConsent(() => {
            const granted = hasMarketingConsent();
            applyMetaConsent(granted);

            if (granted && !pageViewSentRef.current) {
                pageViewSentRef.current = true;
                trackMetaPixelEvent(MetaEvents.PAGE_VIEW);
            }

            if (!granted) {
                pageViewSentRef.current = false;
            }

            grantedRef.current = granted;
        });
    }, []);

    useEffect(() => {
        if (isFirstPath.current) {
            isFirstPath.current = false;
            return;
        }

        if (!grantedRef.current) return;
        trackMetaPixelEvent(MetaEvents.PAGE_VIEW);
    }, [pathname]);

    return null;
}
