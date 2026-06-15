import { Metadata } from "next";
import StandorteContent from "./StandorteContent";
import { GOOGLE_AGGREGATE_RATING_SCHEMA } from "@/lib/business-info";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Standorte | Skinlux Studios",
    description:
        "Alle Skinlux Studios: Pottendorf, Bischofshofen und Pinzgau (Saalfelden). Online-Terminbuchung an allen Standorten.",
    alternates: {
        canonical: `${SITE_URL}/standorte`,
    },
    openGraph: {
        title: "Standorte | Skinlux Studios",
        description:
            "Skinlux Studios in Pottendorf, Bischofshofen und Saalfelden – professionelle Kosmetikbehandlungen mit Online-Buchung.",
        url: `${SITE_URL}/standorte`,
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
};

const localBusinessPottendorf = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Skinlux Pottendorf",
    telephone: "+436649188632",
    email: "hey@skinlux.at",
    url: SITE_URL,
    address: {
        "@type": "PostalAddress",
        streetAddress: "Marktplatz 14",
        addressLocality: "Pottendorf",
        postalCode: "2486",
        addressRegion: "Niederösterreich",
        addressCountry: "AT",
    },
    aggregateRating: GOOGLE_AGGREGATE_RATING_SCHEMA,
};

const localBusinessBischofshofen = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Skinlux Bischofshofen",
    telephone: "+436605721403",
    email: "hello@skinlux.at",
    url: "https://bischofshofen.skinlux.at",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Bahnhofstraße 17",
        addressLocality: "Bischofshofen",
        postalCode: "5500",
        addressRegion: "Salzburg",
        addressCountry: "AT",
    },
};

const localBusinessPinzgau = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Skinlux Pinzgau",
    telephone: "+436644568454",
    email: "pinzgau@skinlux.at",
    url: "https://pinzgau.skinlux.at",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Leoganger Straße 12/Top 1c",
        addressLocality: "Saalfelden",
        postalCode: "5760",
        addressRegion: "Salzburg",
        addressCountry: "AT",
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
            item: SITE_URL,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Standorte",
            item: `${SITE_URL}/standorte`,
        },
    ],
};

export default function StandortePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessPottendorf) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessBischofshofen) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessPinzgau) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <StandorteContent />
        </>
    );
}
