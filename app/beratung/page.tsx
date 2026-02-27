import { Metadata } from "next";
import BeratungContent from "./BeratungContent";

export const metadata: Metadata = {
    title: "Kostenlose Beratung | Skinlux Pottendorf",
    description: "Kostenlose Beratung & Probebehandlung für Laser Haarentfernung bei Skinlux Pottendorf. Hauttyp-Bestimmung, FDA-zertifiziert. Jetzt testen.",
    alternates: {
        canonical: "https://skinlux-pottendorf.at/beratung",
    },
    openGraph: {
        title: "Kostenlose Beratung | Skinlux Pottendorf",
        description: "Kostenlose Beratung und Probebehandlung für Laser Haarentfernung bei Skinlux Pottendorf. Jetzt unverbindlich testen.",
        url: "https://skinlux-pottendorf.at/beratung",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kostenlose Beratung | Skinlux Pottendorf",
        description: "Kostenlose Beratung und Probebehandlung für Laser Haarentfernung bei Skinlux Pottendorf. Jetzt unverbindlich testen.",
    },
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Kostenlose Beratung & Probebehandlung",
    description: "Kostenlose Erstberatung mit Hauttyp-Bestimmung und Probebehandlung für Laser Haarentfernung bei Skinlux Pottendorf.",
    provider: {
        "@id": "https://skinlux-pottendorf.at/#business",
    },
    areaServed: [
        { "@type": "City", name: "Pottendorf" },
        { "@type": "City", name: "Baden" },
        { "@type": "City", name: "Mödling" },
        { "@type": "City", name: "Wiener Neustadt" },
        { "@type": "AdministrativeArea", name: "Niederösterreich" },
    ],
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        description: "Kostenlose Beratung und Probebehandlung",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Ist die Laser-Haarentfernung schmerzhaft?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Dank unseres integrierten Kühlsystems ist die Behandlung deutlich angenehmer als herkömmliche Methoden. Viele Kunden beschreiben es als leichtes Kribbeln.",
            },
        },
        {
            "@type": "Question",
            name: "Wie viele Behandlungen brauche ich?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Die Anzahl der Sitzungen ist individuell und abhängig von Hauttyp, Haarfarbe und Körperregion. Wir erstellen einen maßgeschneiderten Plan für Sie.",
            },
        },
        {
            "@type": "Question",
            name: "Für welche Hauttypen ist es geeignet?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Unsere moderne Diodenlaser-Technologie ist für alle Hauttypen geeignet, auch für dunklere Haut und helle Härchen.",
            },
        },
        {
            "@type": "Question",
            name: "Was kostet die Laser-Haarentfernung?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Die Preise variieren je nach Körperregion. Genaue Preise erfahren Sie in der kostenlosen Beratung - transparent und ohne versteckte Kosten.",
            },
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
            name: "Kostenlose Beratung",
            item: "https://skinlux-pottendorf.at/beratung",
        },
    ],
};

export default function BeratungPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <BeratungContent />
        </>
    );
}
