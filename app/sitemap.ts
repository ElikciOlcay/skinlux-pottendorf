import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://skinlux-pottendorf.at',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://skinlux-pottendorf.at/behandlungen/laser-haarentfernung',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.95,
        },
        {
            url: 'https://skinlux-pottendorf.at/behandlungen/hydra-facial',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://skinlux-pottendorf.at/behandlungen/signature-facials',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://skinlux-pottendorf.at/kontakt',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.85,
        },
        {
            url: 'https://skinlux-pottendorf.at/standorte',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://skinlux-pottendorf.at/beratung',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.75,
        },
        {
            url: 'https://skinlux-pottendorf.at/gutscheine',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://skinlux-pottendorf.at/ueber-uns',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        {
            url: 'https://skinlux-pottendorf.at/datenschutz',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://skinlux-pottendorf.at/impressum',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://skinlux-pottendorf.at/preise/laser',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
    ];
}

