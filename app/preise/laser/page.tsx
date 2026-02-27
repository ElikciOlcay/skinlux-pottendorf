import { Metadata } from "next";
import LaserPreiseContent from "./LaserPreiseContent";

export const metadata: Metadata = {
    title: "Laser Preise | Skinlux Pottendorf",
    description: "Laser Haarentfernung Preise bei Skinlux Pottendorf. Transparente Preisliste für Damen & Herren. Vorteilspakete ab 220€. Jetzt buchen.",
    alternates: {
        canonical: "https://skinlux-pottendorf.at/preise/laser",
    },
    openGraph: {
        title: "Laser Preise | Skinlux Pottendorf",
        description: "Preise für dauerhafte Laser Haarentfernung bei Skinlux Pottendorf. Transparente Preisliste für Damen und Herren. Vorteilspakete ab 220€.",
        url: "https://skinlux-pottendorf.at/preise/laser",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Laser Preise | Skinlux Pottendorf",
        description: "Preise für dauerhafte Laser Haarentfernung bei Skinlux Pottendorf. Transparente Preisliste für Damen und Herren.",
    },
};

const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Laser Haarentfernung Preisliste - Skinlux Pottendorf",
    description: "Preise für dauerhafte Laser Haarentfernung bei Skinlux Pottendorf für Damen und Herren.",
    url: "https://skinlux-pottendorf.at/preise/laser",
    provider: {
        "@id": "https://skinlux-pottendorf.at/#business",
    },
    itemListElement: [
        {
            "@type": "OfferCatalog",
            name: "Damen Preise",
            itemListElement: [
                { "@type": "Offer", name: "Oberlippe", price: "35", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Gesicht komplett", price: "110", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Achseln", price: "55", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Arme komplett", price: "100", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Bikinizone", price: "60", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Intim komplett inkl. Bikini + Pofalte", price: "110", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Beine komplett", price: "190", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Paket Small (Achseln + Unterschenkeln + Intim)", price: "220", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Paket Medium (Achseln + Beine + Intim)", price: "280", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Paket Large (Achseln + Beine + Gesicht + Unterarme + Intim)", price: "390", priceCurrency: "EUR" },
            ],
        },
        {
            "@type": "OfferCatalog",
            name: "Herren Preise",
            itemListElement: [
                { "@type": "Offer", name: "Brust", price: "80", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Rücken", price: "90", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Beine komplett", price: "180", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Bartkontur", price: "40", priceCurrency: "EUR" },
                { "@type": "Offer", name: "Gesicht komplett", price: "100", priceCurrency: "EUR" },
            ],
        },
    ],
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
            name: "Laser Preise",
            item: "https://skinlux-pottendorf.at/preise/laser",
        },
    ],
};

export default function LaserPreisePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <LaserPreiseContent />
        </>
    );
}
