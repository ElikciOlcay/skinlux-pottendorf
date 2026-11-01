import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * KI-Crawler, die die Website lesen dürfen – für Suche und Antworten in ChatGPT,
 * Claude, Perplexity, Gemini, Copilot und Apple Intelligence.
 * Getrennt aufgeführt, damit die Freigabe unabhängig von der allgemeinen Regel ist.
 */
const AI_CRAWLERS = [
    // OpenAI / ChatGPT
    'OAI-SearchBot',
    'ChatGPT-User',
    'GPTBot',
    // Anthropic / Claude
    'Claude-SearchBot',
    'Claude-User',
    'ClaudeBot',
    // Perplexity
    'PerplexityBot',
    'Perplexity-User',
    // Google Gemini, Apple Intelligence
    'Google-Extended',
    'Applebot',
    'Applebot-Extended',
];

const PRIVATE_PATHS = ['/admin/', '/api/'];

export default function robots(): MetadataRoute.Robots {
    const baseUrl = SITE_URL;

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [...PRIVATE_PATHS, '/*.json$', '/*?*'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
            {
                // Bing-Index ist auch Grundlage für ChatGPT-Suche und Copilot
                userAgent: 'Bingbot',
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
            {
                userAgent: AI_CRAWLERS,
                allow: '/',
                disallow: PRIVATE_PATHS,
            },
            {
                userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot'],
                disallow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
