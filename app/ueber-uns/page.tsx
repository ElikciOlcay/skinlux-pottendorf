import { Metadata } from "next";
import UeberUnsContent from "./UeberUnsContent";
import { GOOGLE_AGGREGATE_RATING_SCHEMA } from "@/lib/business-info";

export const metadata: Metadata = {
    title: "Über uns | Skinlux Pottendorf",
    description: "Lernen Sie das Skinlux Team in Pottendorf kennen. Seit 2020 Ihr Partner für Laser Haarentfernung & Premium Beauty-Behandlungen in der Region.",
    alternates: {
        canonical: "https://pottendorf.skinlux.at/ueber-uns",
    },
    openGraph: {
        title: "Über uns | Skinlux Pottendorf",
        description: "Lernen Sie das Skinlux Team in Pottendorf kennen. Seit 2020 Ihr Partner für professionelle Laser Haarentfernung und Beauty-Behandlungen.",
        url: "https://pottendorf.skinlux.at/ueber-uns",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Über uns | Skinlux Pottendorf",
        description: "Lernen Sie das Skinlux Team in Pottendorf kennen. Seit 2020 Ihr Partner für professionelle Laser Haarentfernung und Beauty-Behandlungen.",
    },
};

const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Über uns - Skinlux Pottendorf",
    description: "Lernen Sie das Skinlux Team in Pottendorf kennen.",
    url: "https://pottendorf.skinlux.at/ueber-uns",
    mainEntity: {
        "@type": "Organization",
        "@id": "https://pottendorf.skinlux.at/#business",
        name: "Skinlux Pottendorf",
        description: "Medical Beauty Studio für professionelle Laser Haarentfernung und Kosmetikbehandlungen in Pottendorf, Niederösterreich.",
        foundingDate: "2020",
        url: "https://pottendorf.skinlux.at",
        telephone: "+436649188632",
        email: "hey@skinlux.at",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Marktplatz 14",
            addressLocality: "Pottendorf",
            postalCode: "2486",
            addressRegion: "Niederösterreich",
            addressCountry: "AT",
        },
        aggregateRating: GOOGLE_AGGREGATE_RATING_SCHEMA,
        member: [
            {
                "@type": "Person",
                name: "Ebru Bicer",
                jobTitle: "Inhaberin",
            },
            {
                "@type": "Person",
                name: "Can Bicer",
                jobTitle: "Technik & Marketing",
            },
        ],
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
            name: "Über uns",
            item: "https://pottendorf.skinlux.at/ueber-uns",
        },
    ],
};

export default function UeberUnsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <UeberUnsContent />
        </>
    );
}
