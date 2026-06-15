import { Metadata } from "next";
import ImpressumContent from "./ImpressumContent";

export const metadata: Metadata = {
    title: "Impressum | Skinlux Pottendorf",
    description: "Impressum von Skinlux Pottendorf. Informationspflicht laut §5 E-Commerce Gesetz. Kontaktdaten, Unternehmensdaten und rechtliche Informationen.",
    alternates: {
        canonical: "https://pottendorf.skinlux.at/impressum",
    },
    robots: {
        index: false,
        follow: true,
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
            item: "https://pottendorf.skinlux.at",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Impressum",
            item: "https://pottendorf.skinlux.at/impressum",
        },
    ],
};

export default function ImpressumPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ImpressumContent />
        </>
    );
}
