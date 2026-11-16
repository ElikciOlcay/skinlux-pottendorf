import { Metadata } from "next";
import KarriereContent from "./KarriereContent";
import { jobDescriptionHtml, jobs } from "./data";

const description =
    "Karriere bei skinlux MEDICAL BEAUTY in Pottendorf: Kosmetikerin (m/w/d), Laserspezialistin für dauerhafte Haarentfernung (m/w/d) und Fachärztin / Facharzt für Dermatologie (m/w/d) gesucht.";

export const metadata: Metadata = {
    title: "Karriere | Skinlux Pottendorf",
    description,
    alternates: {
        canonical: "https://pottendorf.skinlux.at/karriere",
    },
    openGraph: {
        title: "Karriere | Skinlux Pottendorf",
        description,
        url: "https://pottendorf.skinlux.at/karriere",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Medical Beauty Studio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Karriere | Skinlux Pottendorf",
        description,
    },
};

const jobPostingSchemas = jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: jobDescriptionHtml(job),
    datePosted: job.datePosted,
    employmentType: job.employmentType,
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
    url: `https://pottendorf.skinlux.at/karriere#${job.slug}`,
    responsibilities: job.tasks.join(". "),
    qualifications: job.profile.join(". "),
    industry: "Beauty & Medical Beauty",
    directApply: true,
}));

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
            {jobPostingSchemas.map((schema) => (
                <script
                    key={schema.title}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <KarriereContent />
        </>
    );
}
