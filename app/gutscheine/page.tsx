import { Metadata } from "next";
import GutscheineContent from "./GutscheineContent";

export const metadata: Metadata = {
    title: "Gutscheine | Skinlux Pottendorf",
    description: "Verschenken Sie Schönheit mit einem Skinlux Gutschein. Geschenkgutscheine für Laser Haarentfernung & Beauty-Behandlungen in Pottendorf. Ab 25€.",
    alternates: {
        canonical: "https://skinlux-pottendorf.at/gutscheine",
    },
    openGraph: {
        title: "Gutscheine | Skinlux Pottendorf",
        description: "Verschenken Sie Schönheit mit einem Skinlux Gutschein. Geschenkgutscheine für Laser Haarentfernung und Beauty-Behandlungen in Pottendorf.",
        url: "https://skinlux-pottendorf.at/gutscheine",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gutscheine | Skinlux Pottendorf",
        description: "Verschenken Sie Schönheit mit einem Skinlux Gutschein. Geschenkgutscheine für Laser Haarentfernung und Beauty-Behandlungen in Pottendorf.",
    },
};

const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Skinlux Geschenkgutschein",
    description: "Geschenkgutschein für professionelle Beauty-Behandlungen und Laser Haarentfernung bei Skinlux Pottendorf.",
    brand: {
        "@type": "Brand",
        name: "Skinlux",
    },
    offers: {
        "@type": "AggregateOffer",
        lowPrice: "25",
        highPrice: "300",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://skinlux-pottendorf.at/gutscheine",
    },
    seller: {
        "@id": "https://skinlux-pottendorf.at/#business",
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: "https://skinlux-pottendorf.at",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Gutscheine",
            item: "https://skinlux-pottendorf.at/gutscheine",
        },
    ],
};

export default function GutscheinePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <GutscheineContent />
        </>
    );
}
