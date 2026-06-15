import { Metadata } from "next";
import KarriereContent from "./KarriereContent";

export const metadata: Metadata = {
    title: "Karriere | Skinlux Pottendorf",
    description: "Karriere bei Skinlux Pottendorf: Ausgebildete Kosmetikerin (m/w/d) gesucht für apparative Behandlungen in einem modernen Premium Studio.",
    alternates: {
        canonical: "https://pottendorf.skinlux.at/karriere",
    },
    openGraph: {
        title: "Karriere | Skinlux Pottendorf",
        description: "Karriere bei Skinlux Pottendorf: Ausgebildete Kosmetikerin (m/w/d) gesucht für apparative Behandlungen in einem modernen Premium Studio.",
        url: "https://pottendorf.skinlux.at/karriere",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Medical Beauty Studio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Karriere | Skinlux Pottendorf",
        description: "Karriere bei Skinlux Pottendorf: Ausgebildete Kosmetikerin (m/w/d) gesucht für apparative Behandlungen in einem modernen Premium Studio.",
    },
};

const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Kosmetikerin (m/w/d)",
    description: "Skinlux Pottendorf sucht eine ausgebildete Kosmetikerin für apparative Behandlungen wie Laser Haarentfernung, Hydrafacial und Microneedling (SkinPen). Fokus auf Kundenberatung, Hautanalyse und hochwertiges Kundenerlebnis im Premium Studio.",
    datePosted: "2026-03-01",
    validThrough: "2026-12-31",
    employmentType: "PART_TIME",
    hiringOrganization: {
        "@type": "Organization",
        name: "Skinlux Medical Beauty Studio",
        sameAs: "https://pottendorf.skinlux.at",
        logo: "https://pottendorf.skinlux.at/images/logo/skinlux-logo.png",
    },
    jobLocation: {
        "@type": "Place",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Marktplatz 14",
            addressLocality: "Pottendorf",
            postalCode: "2486",
            addressRegion: "Niederösterreich",
            addressCountry: "AT",
        },
    },
    jobLocationType: "ON_SITE",
    baseSalary: {
        "@type": "MonetaryAmount",
        currency: "EUR",
        value: {
            "@type": "QuantitativeValue",
            unitText: "MONTH",
        },
    },
    responsibilities: "Durchführung von Laser Haarentfernung, Hydrafacial und Microneedling (SkinPen), Kundenberatung, Hautanalysen und strukturierte Dokumentation.",
    qualifications: "Abgeschlossene Kosmetikausbildung, Erfahrung in apparativer Kosmetik von Vorteil, gepflegtes Auftreten, Zuverlässigkeit.",
    skills: "Laser Haarentfernung, Hydrafacial, Microneedling, Hautanalyse, Kundenberatung, apparative Kosmetik",
    industry: "Beauty & Kosmetik",
    directApply: true,
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
            name: "Karriere",
            item: "https://pottendorf.skinlux.at/karriere",
        },
    ],
};

export default function KarrierePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <KarriereContent />
        </>
    );
}
