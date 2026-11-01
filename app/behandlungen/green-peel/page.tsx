import { Metadata } from "next";
import { SHORE_BOOKING_URL } from "@/lib/booking";
import GreenPeelContent from "./GreenPeelContent";
import { faq, methoden } from "./data";
import TreatmentSeoLinks from "@/components/seo/TreatmentSeoLinks";

const PAGE_URL = "https://pottendorf.skinlux.at/behandlungen/green-peel";

export const metadata: Metadata = {
    title: "GREEN PEEL® Pottendorf – Original Kräuterschälkur | skinlux",
    description:
        "Entdecke die Original GREEN PEEL® Kräuterschälkur bei skinlux in Pottendorf. Fresh Up, Energy & Classic für individuelle Hautbedürfnisse. Jetzt Termin buchen.",
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "GREEN PEEL® Pottendorf – Original Kräuterschälkur | skinlux",
        description:
            "Die Original GREEN PEEL® Kräuterschälkur nach Dr. med. Christine Schrammek – Fresh Up, Energy & Classic bei skinlux in Pottendorf.",
        url: PAGE_URL,
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
        images: [
            {
                url: "https://pottendorf.skinlux.at/images/green-peel/green-peel-behandlung.jpg",
                width: 1080,
                height: 1080,
                alt: "GREEN PEEL® Kräuterschälkur bei skinlux Pottendorf",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "GREEN PEEL® Pottendorf – Original Kräuterschälkur | skinlux",
        description:
            "Natürliche Hauterneuerung mit der Original GREEN PEEL® Kräuterschälkur – Fresh Up, Energy & Classic in Pottendorf.",
    },
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Kräuterschälkur",
    name: "GREEN PEEL® Kräuterschälkur",
    description:
        "Die Original GREEN PEEL® Kräuterschälkur nach Dr. med. Christine Schrammek in Pottendorf – drei Methoden von sanfter Auffrischung bis zur intensiven Hauterneuerung.",
    provider: {
        "@id": "https://pottendorf.skinlux.at/#business",
    },
    areaServed: ["Pottendorf", "Baden", "Mödling", "Wiener Neustadt", "Niederösterreich"],
    url: PAGE_URL,
    offers: methoden.map((methode) => ({
        "@type": "Offer",
        name: `GREEN PEEL® ${methode.name}`,
        price: String(methode.preis),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: SHORE_BOOKING_URL,
    })),
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((eintrag) => ({
        "@type": "Question",
        name: eintrag.frage,
        acceptedAnswer: {
            "@type": "Answer",
            text: eintrag.antwort,
        },
    })),
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
            name: "Behandlungen",
            item: "https://pottendorf.skinlux.at/#treatments",
        },
        {
            "@type": "ListItem",
            position: 3,
            name: "GREEN PEEL®",
            item: PAGE_URL,
        },
    ],
};

export default function GreenPeelPage() {
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
            <GreenPeelContent />
            <TreatmentSeoLinks serviceSlug="green-peel" />
        </>
    );
}
