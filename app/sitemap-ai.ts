import { MetadataRoute } from 'next';

export default function sitemapAI(): MetadataRoute.Sitemap {
    return [
        // Hauptseite - höchste Priorität für AI
        {
            url: 'https://skinlux-pottendorf.at',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        // Hauptbehandlungen
        {
            url: 'https://skinlux-pottendorf.at/behandlungen/laser-haarentfernung',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://skinlux-pottendorf.at/behandlungen/hydra-facial',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        {
            url: 'https://skinlux-pottendorf.at/preise/laser',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.95,
        },
        // Lokale Informationen (wichtig für AI-Empfehlungen)
        {
            url: 'https://skinlux-pottendorf.at/kontakt',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://skinlux-pottendorf.at/ueber-uns',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        {
            url: 'https://skinlux-pottendorf.at/standorte',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        // Sekundäre Behandlungen
        {
            url: 'https://skinlux-pottendorf.at/behandlungen/signature-facials',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://skinlux-pottendorf.at/behandlungen/hautanalyse',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: 'https://skinlux-pottendorf.at/behandlungen/microneedling',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        // Info-Seiten
        {
            url: 'https://skinlux-pottendorf.at/beratung',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://skinlux-pottendorf.at/gutscheine',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];
}
