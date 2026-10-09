import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CampaignChrome from "@/components/campaign/CampaignChrome";
import LaserOktoberLanding from "@/components/campaign/LaserOktoberLanding";
import {
    buildLaserOktoberBookingUrl,
    buildLaserOktoberUtmQuery,
    isLaserOktoberCampaignEnded,
    LASER_OKTOBER_CONTENT_NAME,
    LASER_OKTOBER_PRICES_PATH,
    LASER_OKTOBER_REDIRECT_PATH,
} from "@/lib/campaigns/laser-oktober";
import { OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

const title = "50 % auf die ersten 2 Laser-Behandlungen | Skinlux Pottendorf";
const description =
    "Herbstaktion bei Skinlux in Pottendorf: 50 % auf die ersten 2 Behandlungen der Laser-Haarentfernung. Termin online sichern. Aktion bis 31. Oktober 2026.";
const pageUrl = `${SITE_URL}/aktion/laser-oktober`;

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
                url: OG_IMAGE_PATH,
                width: 1200,
                height: 630,
                alt: "Skinlux Pottendorf",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [OG_IMAGE_PATH],
    },
};

type PageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LaserOktoberPage({ searchParams }: PageProps) {
    if (isLaserOktoberCampaignEnded()) {
        redirect(LASER_OKTOBER_REDIRECT_PATH);
    }

    const params = await searchParams;
    const bookingUrl = buildLaserOktoberBookingUrl(params);
    const pricesHref = `${LASER_OKTOBER_PRICES_PATH}${buildLaserOktoberUtmQuery(params)}`;

    return (
        <CampaignChrome bookingUrl={bookingUrl} contentName={LASER_OKTOBER_CONTENT_NAME}>
            <LaserOktoberLanding bookingUrl={bookingUrl} pricesHref={pricesHref} />
        </CampaignChrome>
    );
}
