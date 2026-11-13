import { Metadata } from "next";
import { SHORE_BOOKING_URL } from "@/lib/booking";
import HydraScalpContent from "./HydraScalpContent";
import { faq, pakete } from "./data";
import TreatmentSeoLinks from "@/components/seo/TreatmentSeoLinks";

const PAGE_URL = "https://pottendorf.skinlux.at/behandlungen/hydrascalp";

export const metadata: Metadata = {
    title: { absolute: "HydraScalp™ Pottendorf – Kopfhautbehandlung mit Keravive | Skinlux" },
    description:
        "HydraScalp by HydraFacial bei skinlux in Pottendorf: Kopfhautreinigung, Exfoliation und Keravive Peptide Complex inkl. Heimpflege. Ab € 280, 3er-Kur ab € 800.",
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: "HydraScalp™ Pottendorf – Kopfhautbehandlung mit Keravive | skinlux",
        description:
            "Gesunde Kopfhaut, die Basis für schönes Haar: HydraScalp by HydraFacial mit Keravive Peptide Complex bei skinlux in Pottendorf.",
        url: PAGE_URL,
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
        images: [
            {
                url: "https://pottendorf.skinlux.at/images/hydrascalp/hydrascalp-behandlung.jpg",
                width: 900,
                height: 1600,
                alt: "HydraScalp Kopfhautbehandlung bei skinlux Pottendorf",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "HydraScalp™ Pottendorf – Kopfhautbehandlung mit Keravive | skinlux",
        description:
            "Kopfhautreinigung, Exfoliation und Keravive Peptide Complex inkl. Heimpflege – HydraScalp bei skinlux in Pottendorf.",
    },
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Kopfhautbehandlung",
    name: "HydraScalp™ mit Keravive",
    description:
        "HydraScalp by HydraFacial in Pottendorf – intensive Kopfhautreinigung, sanfte Exfoliation und Pflege mit dem Keravive Peptide Complex, inklusive Heimpflege.",
    provider: {
        "@id": "https://pottendorf.skinlux.at/#business",
    },
    areaServed: ["Pottendorf", "Baden", "Mödling", "Wiener Neustadt", "Niederösterreich"],
    url: PAGE_URL,
    offers: pakete.flatMap((paket) => [
        {
            "@type": "Offer",
            name: `HydraScalp ${paket.name}`,
            price: String(paket.einzel),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: SHORE_BOOKING_URL,
        },
        {
            "@type": "Offer",
            name: `HydraScalp ${paket.name} 3er-Kur`,
            price: String(paket.kur),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: SHORE_BOOKING_URL,
        },
    ]),
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
            name: "HydraScalp™",
            item: PAGE_URL,
        },
    ],
};

export default function HydraScalpPage() {
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
            <HydraScalpContent />
            <TreatmentSeoLinks serviceSlug="hydrascalp" />
        </>
    );
}
