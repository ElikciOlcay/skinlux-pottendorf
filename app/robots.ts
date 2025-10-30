import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api/admin', '/api/internal'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                crawlDelay: 0,
            },
            // ChatGPT und andere AI-Crawler
            {
                userAgent: 'GPTBot',
                allow: '/',
                crawlDelay: 1,
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
                crawlDelay: 1,
            },
            {
                userAgent: 'CCBot',
                allow: '/',
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
            },
        ],
        sitemap: [
            'https://skinlux-pottendorf.at/sitemap.xml',
            'https://skinlux-pottendorf.at/sitemap-ai.xml',
        ],
    };
}

