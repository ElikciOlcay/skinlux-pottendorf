import { MetadataRoute } from "next";
import { LOCAL_LANDING_PATHS } from "@/lib/seo/localLandingData";
import { SITE_URL } from "@/lib/site";

export default function sitemapAi(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL;
    const currentDate = new Date("2026-02-26");

    const localPages: MetadataRoute.Sitemap = LOCAL_LANDING_PATHS.map(
        ({ city, service }) => ({
            url: `${baseUrl}/${city}/${service}`,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.85,
        })
    );

    const corePages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
        {
            url: `${baseUrl}/behandlungen/laser-haarentfernung`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.95,
        },
        {
            url: `${baseUrl}/behandlungen/hydra-facial`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/behandlungen/skinpen-precision`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/preise/laser`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/beratung`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/standorte`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];

    return [...corePages, ...localPages];
}
