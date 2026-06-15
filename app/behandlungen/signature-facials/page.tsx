import { Metadata } from "next";
import SignatureFacialsContent from "./SignatureFacialsContent";

export const metadata: Metadata = {
    title: "Premium Facials Pottendorf | Circadia Kosmetik Baden",
    description: "Exklusive Premium Facials mit Circadia Professional in Pottendorf. Maßgeschneiderte 90-Minuten Gesichtsbehandlungen. Jetzt Termin buchen.",
    alternates: {
        canonical: "https://pottendorf.skinlux.at/behandlungen/signature-facials",
    },
    openGraph: {
        title: "Premium Facials Pottendorf | Circadia Kosmetik Baden",
        description: "Exklusive Premium Facials mit Circadia Professional in Pottendorf. Maßgeschneiderte 90-Minuten Gesichtsbehandlungen.",
        url: "https://pottendorf.skinlux.at/behandlungen/signature-facials",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Premium Facials Pottendorf | Circadia Kosmetik Baden",
        description: "Exklusive Premium Facials mit Circadia Professional in Pottendorf. Maßgeschneiderte 90-Minuten Gesichtsbehandlungen.",
    },
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Premium Facials",
    name: "Signature Facials mit Circadia Professional",
    description: "Exklusive Premium Gesichtsbehandlungen mit Circadia Professional Produkten in Pottendorf. Maßgeschneiderte 90-Minuten Erlebnisse für individuelle Hautbedürfnisse.",
    provider: {
        "@id": "https://pottendorf.skinlux.at/#business",
    },
    areaServed: ["Pottendorf", "Baden", "Mödling", "Wiener Neustadt", "Niederösterreich"],
    offers: [
        {
            "@type": "Offer",
            name: "Circadia Customized Facial",
            price: "150",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
        },
        {
            "@type": "Offer",
            name: "Firming Peptide Mask Treatment",
            price: "175",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
        },
        {
            "@type": "Offer",
            name: "Oxygen RX Facial mit Cocoa-Enzyme",
            price: "175",
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
            name: "Premium Facials",
            item: "https://pottendorf.skinlux.at/behandlungen/signature-facials",
        },
    ],
};

export default function SignatureFacialsPage() {
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
            <SignatureFacialsContent />
        </>
    );
}
