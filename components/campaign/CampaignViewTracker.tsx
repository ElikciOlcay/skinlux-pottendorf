"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/meta-tracking";

export default function CampaignViewTracker({ contentName }: { contentName: string }) {
    useEffect(() => {
        void trackPageView(contentName);
    }, [contentName]);

    return null;
}
