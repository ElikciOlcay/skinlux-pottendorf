import { Metadata } from "next";
import StandorteContent from "./StandorteContent";

export const metadata: Metadata = {
    title: "Standorte | Skinlux Studios",
    description: "Alle Skinlux Studios auf einen Blick. Professionelle Laser Haarentfernung in Pottendorf, Saalfelden & Mattsee. Studio in Ihrer Nähe finden.",
    alternates: {
        canonical: "https://skinlux-pottendorf.at/standorte",
    },
    openGraph: {
        title: "Standorte | Skinlux Studios",
        description: "Alle Skinlux Studios auf einen Blick. Professionelle Laser Haarentfernung in Pottendorf, Saalfelden, Mattsee und mehr.",
        url: "https://skinlux-pottendorf.at/standorte",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Standorte | Skinlux Studios",
        description: "Alle Skinlux Studios auf einen Blick. Professionelle Laser Haarentfernung in Pottendorf, Saalfelden, Mattsee und mehr.",
    },
};

const localBusinessPottendorf = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://skinlux-pottendorf.at/#business",
    name: "Skinlux Pottendorf",
    image: "/images/about/studio/interior.jpg",
    telephone: "+436649188632",
    email: "hey@skinlux.at",
    url: "https://skinlux-pottendorf.at",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Marktplatz 14",
        addressLocality: "Pottendorf",
        postalCode: "2486",
        addressRegion: "Niederösterreich",
        addressCountry: "AT",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 47.8667,
        longitude: 16.2833,
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "120",
        bestRating: "5",
        worstRating: "1",
    },
};

const localBusinessSaalfelden = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Skinlux Saalfelden",
    image: "/images/about/studio/interior.jpg",
    telephone: "+436644568454",
    email: "pinzgau@skinlux.at",
    url: "https://www.skinlux.at/pinzgau/",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Birkengasse 3b Top 9",
        addressLocality: "Saalfelden am Steinernen Meer",
        postalCode: "5760",
        addressRegion: "Salzburg",
        addressCountry: "AT",
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "120",
        bestRating: "5",
        worstRating: "1",
    },
};

const localBusinessMattsee = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Skinlux Mattsee",
    image: "/images/about/studio/interior.jpg",
    telephone: "+436608580766",
    email: "mattsee@skinlux.at",
    url: "https://www.skinlux.at/mattsee/",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Ramooser Straße 5",
        addressLocality: "Mattsee",
        postalCode: "5163",
        addressRegion: "Salzburg",
        addressCountry: "AT",
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "120",
        bestRating: "5",
        worstRating: "1",
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
            name: "Standorte",
            item: "https://skinlux-pottendorf.at/standorte",
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSaalfelden) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessMattsee) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <StandorteContent />
        </>
    );
}
