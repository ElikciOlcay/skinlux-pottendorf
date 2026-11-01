import type { Metadata } from "next";
import CampaignChrome from "@/components/campaign/CampaignChrome";
import GreenPeelLanding from "@/components/campaign/GreenPeelLanding";
import {
    buildGreenPeelBookingUrl,
    GREEN_PEEL_CONTENT_NAME,
    GREEN_PEEL_CONVERSION_SOURCE,
    GREEN_PEEL_LANDING_PATH,
} from "@/lib/campaigns/green-peel";
import { SITE_URL } from "@/lib/site";

const title = "GREEN PEEL® Kräuterschälkur in Pottendorf | Skinlux";
const description =
    "Neu bei Skinlux in Pottendorf: die Original GREEN PEEL® Kräuterschälkur. Fresh Up, Energy & Classic ab € 129. Jetzt Termin online buchen.";
const pageUrl = `${SITE_URL}${GREEN_PEEL_LANDING_PATH}`;
const ogImage = "/images/green-peel/green-peel-behandlung.jpg";

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
                width: 1080,
                height: 1080,
                alt: "GREEN PEEL® Kräuterschälkur bei Skinlux Pottendorf",
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

export default async function GreenPeelLandingPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const bookingUrl = buildGreenPeelBookingUrl(params);

    return (
        <CampaignChrome
            bookingUrl={bookingUrl}
            contentName={GREEN_PEEL_CONTENT_NAME}
            stickyNote="GREEN PEEL® · 3 Methoden ab € 129"
            conversionSource={GREEN_PEEL_CONVERSION_SOURCE}
        >
            <GreenPeelLanding bookingUrl={bookingUrl} />
        </CampaignChrome>
    );
}
