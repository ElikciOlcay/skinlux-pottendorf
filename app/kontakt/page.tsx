import { Metadata } from "next";
import KontaktContent from "./KontaktContent";

export const metadata: Metadata = {
    title: "Kontakt | Skinlux Pottendorf",
    description: "Kontaktieren Sie Skinlux Pottendorf für Laser Haarentfernung & Kosmetik in Pottendorf. Per Telefon, E-Mail, WhatsApp oder online buchen.",
    alternates: {
        canonical: "https://skinlux-pottendorf.at/kontakt",
    },
    openGraph: {
        title: "Kontakt | Skinlux Pottendorf",
        description: "Kontaktieren Sie Skinlux Pottendorf für Laser Haarentfernung und Kosmetikbehandlungen. Telefon, E-Mail, WhatsApp oder online buchen.",
        url: "https://skinlux-pottendorf.at/kontakt",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kontakt | Skinlux Pottendorf",
        description: "Kontaktieren Sie Skinlux Pottendorf für Laser Haarentfernung und Kosmetikbehandlungen. Telefon, E-Mail, WhatsApp oder online buchen.",
    },
};

const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontakt - Skinlux Pottendorf",
    description: "Kontaktieren Sie Skinlux Pottendorf für Termine und Beratung.",
    url: "https://skinlux-pottendorf.at/kontakt",
    mainEntity: {
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
            name: "Kontakt",
            item: "https://skinlux-pottendorf.at/kontakt",
        },
    ],
};

export default function KontaktPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <KontaktContent />
        </>
    );
}
