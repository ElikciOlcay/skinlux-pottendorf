import { Metadata } from "next";
import DatenschutzContent from "./DatenschutzContent";

export const metadata: Metadata = {
    title: "Datenschutz | Skinlux Pottendorf",
    description: "Datenschutzerklärung von Skinlux Pottendorf. Informationen zur Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten gemäß DSGVO.",
    alternates: {
        canonical: "https://skinlux-pottendorf.at/datenschutz",
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
            item: "https://skinlux-pottendorf.at",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Datenschutz",
            item: "https://skinlux-pottendorf.at/datenschutz",
        },
    ],
};

export default function DatenschutzPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <DatenschutzContent />
        </>
    );
}
