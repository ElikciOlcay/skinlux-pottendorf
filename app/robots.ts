import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://skinlux-pottendorf.at';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    '/*.json$',
                    '/*?*',
                    '/admin/*',
                    '/api/*',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                ],
                crawlDelay: 0,
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                ],
                crawlDelay: 1,
            },
            {
                userAgent: 'AhrefsBot',
                disallow: '/',
            },
            {
                userAgent: 'SemrushBot',
                disallow: '/',
            },
            {
                userAgent: 'DotBot',
                disallow: '/',
            },
            {
                userAgent: 'MJ12bot',
                disallow: '/',
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,
            `${baseUrl}/sitemap-ai.xml`,
        ],
        host: baseUrl,
    };
}
