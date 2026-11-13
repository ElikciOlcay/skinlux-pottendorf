import type { Metadata } from "next";
import CampaignChrome from "@/components/campaign/CampaignChrome";
import HydraScalpLanding from "@/components/campaign/HydraScalpLanding";
import {
    buildHydraScalpBookingUrl,
    HYDRASCALP_CONTENT_NAME,
    HYDRASCALP_CONVERSION_SOURCE,
    HYDRASCALP_LANDING_PATH,
} from "@/lib/campaigns/hydrascalp";
import { SITE_URL } from "@/lib/site";

const title = "HydraScalp™ mit Keravive in Pottendorf | Skinlux";
const description =
    "Neu bei Skinlux in Pottendorf: HydraScalp by HydraFacial – Kopfhautreinigung, Exfoliation und Keravive Peptide Complex inkl. Heimpflege. Ab € 280. Jetzt Termin online buchen.";
const pageUrl = `${SITE_URL}${HYDRASCALP_LANDING_PATH}`;
const ogImage = "/images/hydrascalp/hydrascalp-behandlung.jpg";

export const metadata: Metadata = {
    title: { absolute: title },
    description,
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title,
        description,
        url: pageUrl,
        type: "website",
        locale: "de_AT",
        images: [
            {
                url: ogImage,
                width: 900,
                height: 1600,
                alt: "HydraScalp Kopfhautbehandlung bei Skinlux Pottendorf",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
    },
};

type PageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HydraScalpLandingPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const bookingUrl = buildHydraScalpBookingUrl(params);

    return (
        <CampaignChrome
            bookingUrl={bookingUrl}
            contentName={HYDRASCALP_CONTENT_NAME}
            stickyNote="HydraScalp™ · ab € 280 inkl. Heimpflege"
            conversionSource={HYDRASCALP_CONVERSION_SOURCE}
        >
            <HydraScalpLanding bookingUrl={bookingUrl} />
        </CampaignChrome>
    );
}
