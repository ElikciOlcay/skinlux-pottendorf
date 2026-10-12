"use client";

import { useEffect } from "react";
import { trackConversionEvent, ConversionEvents } from "@/lib/analytics";
import { trackContact, trackTerminBuchung } from "@/lib/meta-tracking";

function getClickSource(anchor: HTMLAnchorElement): string {
    return (
        anchor.getAttribute("data-conversion-source") ||
        window.location.pathname ||
        "unknown"
    );
}

export default function ConversionTracker() {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const anchor = (event.target as Element | null)?.closest("a");
            if (!anchor?.href) return;

            const href = anchor.href;
            const source = getClickSource(anchor);

            if (href.includes("connect.shore.com")) {
                trackConversionEvent(ConversionEvents.BOOKING_CLICK, {
                    event_label: source,
                });
                void trackTerminBuchung();
                return;
            }

            if (href.includes("wa.me")) {
                trackConversionEvent(ConversionEvents.WHATSAPP_CLICK, {
                    event_label: source,
                });
                void trackContact();
                return;
            }

            if (href.startsWith("tel:")) {
                trackConversionEvent(ConversionEvents.PHONE_CLICK, {
                    event_label: source,
                });
                void trackContact();
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return null;
}
