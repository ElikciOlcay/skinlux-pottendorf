import { Metadata } from "next";
import HautanalyseContent from "./HautanalyseContent";

export const metadata: Metadata = {
    title: "Hautanalyse Pottendorf | Professionelle Diagnose",
    description: "Professionelle Hautanalyse in Pottendorf mit HD-Technologie. 7 Analyseparameter, digitaler Hautreport & individuelle Behandlungsempfehlungen.",
    alternates: {
        canonical: "https://skinlux-pottendorf.at/behandlungen/hautanalyse",
    },
    openGraph: {
        title: "Hautanalyse Pottendorf | Professionelle Diagnose",
        description: "Professionelle Hautanalyse in Pottendorf mit modernster HD-Technologie. 7 Analyseparameter und individuelle Behandlungsempfehlungen.",
        url: "https://skinlux-pottendorf.at/behandlungen/hautanalyse",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hautanalyse Pottendorf | Professionelle Diagnose",
        description: "Professionelle Hautanalyse in Pottendorf mit modernster HD-Technologie. 7 Analyseparameter und individuelle Behandlungsempfehlungen.",
    },
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hautanalyse",
    name: "Professionelle Hautanalyse",
    description: "Professionelle Hautanalyse mit modernster HD-Technologie in Pottendorf. 7 Analyseparameter, digitaler Hautreport und individuelle Behandlungsempfehlungen.",
    provider: {
        "@id": "https://skinlux-pottendorf.at/#business",
    },
    areaServed: ["Pottendorf", "Baden", "Mödling", "Wiener Neustadt", "Niederösterreich"],
    offers: [
        {
            "@type": "Offer",
            name: "Standard Hautanalyse",
            price: "49",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
        },
        {
            "@type": "Offer",
            name: "Kostenlose Hautanalyse bei Buchung ab €150",
            price: "0",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
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
            name: "Behandlungen",
            item: "https://skinlux-pottendorf.at/#treatments",
        },
        {
            "@type": "ListItem",
            position: 3,
            name: "Hautanalyse",
            item: "https://skinlux-pottendorf.at/behandlungen/hautanalyse",
        },
    ],
};

export default function HautanalysePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <HautanalyseContent />
        </>
    );
}
