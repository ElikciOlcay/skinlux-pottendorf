import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CampaignChrome from "@/components/campaign/CampaignChrome";
import LaserOktoberPriceList from "@/components/campaign/LaserOktoberPriceList";
import {
    buildLaserOktoberBookingUrl,
    buildLaserOktoberUtmQuery,
    isLaserOktoberCampaignEnded,
    LASER_OKTOBER_PATH,
    LASER_OKTOBER_REDIRECT_PATH,
} from "@/lib/campaigns/laser-oktober";
import { OG_IMAGE_PATH, SITE_URL } from "@/lib/site";

const title = "50 % auf die ersten 2 Behandlungen | Laser Preise | Skinlux Pottendorf";
const description =
    "Alle Einzelzonen der Laser-Haarentfernung mit 50 % auf die ersten 2 Behandlungen bei Skinlux in Pottendorf.";
const pageUrl = `${SITE_URL}/aktion/laser-oktober/preise`;
const contentName = "Laser Oktober Aktion Preise";

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

export default async function LaserOktoberPricesPage({ searchParams }: PageProps) {
    if (isLaserOktoberCampaignEnded()) {
        redirect(LASER_OKTOBER_REDIRECT_PATH);
    }

    const params = await searchParams;
    const bookingUrl = buildLaserOktoberBookingUrl(params);
    const backHref = `${LASER_OKTOBER_PATH}${buildLaserOktoberUtmQuery(params)}`;

    return (
        <CampaignChrome bookingUrl={bookingUrl} contentName={contentName}>
            <LaserOktoberPriceList bookingUrl={bookingUrl} backHref={backHref} />
        </CampaignChrome>
    );
}
