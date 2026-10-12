"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
    hasMarketingConsent,
    subscribeToCookiebotConsent,
} from "@/lib/cookie-consent";
import { META_PIXEL_ID, MetaEvents, trackMetaPixelEvent } from "@/lib/meta-tracking";

export default function MetaPixel() {
    const pathname = usePathname();
    const [enabled, setEnabled] = useState(false);
    const skipNextPageView = useRef(true);

    useEffect(() => {
        return subscribeToCookiebotConsent(() => {
            setEnabled(hasMarketingConsent());
        });
    }, []);

    useEffect(() => {
        if (!enabled) {
            skipNextPageView.current = true;
            return;
        }

        if (skipNextPageView.current) {
            skipNextPageView.current = false;
            return;
        }

        trackMetaPixelEvent(MetaEvents.PAGE_VIEW);
    }, [enabled, pathname]);

    if (!enabled) return null;

    return (
        <Script id="meta-pixel" strategy="afterInteractive">
            {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
            `}
        </Script>
    );
}
