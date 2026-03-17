import { Metadata } from "next";
import SkinPenPrecisionContent from "./SkinPenPrecisionContent";

export const metadata: Metadata = {
    title: "SkinPen Microneedling Pottendorf | Baden, Mödling",
    description: "SkinPen Precision Microneedling in Pottendorf. FDA-zugelassen, natürliche Hautregeneration, reduziert Narben und Falten. Jetzt Termin buchen.",
    alternates: {
        canonical: "https://skinlux-pottendorf.at/behandlungen/skinpen-precision",
    },
    openGraph: {
        title: "SkinPen Microneedling Pottendorf | Baden, Mödling",
        description: "SkinPen Precision Microneedling in Pottendorf. FDA-zugelassen, natürliche Hautregeneration, reduziert Narben und Falten.",
        url: "https://skinlux-pottendorf.at/behandlungen/skinpen-precision",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "SkinPen Microneedling Pottendorf | Baden, Mödling",
        description: "SkinPen Precision Microneedling in Pottendorf. FDA-zugelassen, natürliche Hautregeneration, reduziert Narben und Falten.",
    },
};

const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "SkinPen Precision Microneedling",
    alternateName: "Microneedling Hautregeneration",
    description: "Professionelle SkinPen Precision Microneedling-Behandlung in Pottendorf, Niederösterreich. FDA-zugelassen, natürliche Hautregeneration für Aknenarben, Falten und Hautverfeinerung.",
    procedureType: "Microneedling-Behandlung",
    howPerformed: "Erzeugt temporäre mikroskopische Kanäle in der Haut durch sterile Nadeln. Aktiviert die natürliche Kollagen- und Elastinproduktion.",
    preparation: "Kostenlose Erstberatung mit Hauttyp-Bestimmung und individueller Behandlungsplanung.",
    followup: "Nachsorge und Pflegetipps. Behandlungen im Abstand von 4-6 Wochen.",
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
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "SkinPen Precision Microneedling",
    name: "SkinPen Precision Microneedling",
    provider: {
        "@id": "https://skinlux-pottendorf.at/#business",
    },
    areaServed: ["Pottendorf", "Baden", "Mödling", "Wiener Neustadt", "Niederösterreich"],
    offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Was macht diese Behandlung so besonders?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wir aktivieren die natürliche Regeneration Ihrer Haut. Keine künstlichen Füllstoffe, sondern Ihre eigene Haut arbeitet für Sie und wird strahlender, glatter und jünger.",
            },
        },
        {
            "@type": "Question",
            name: "Funktioniert das bei meiner Haut?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ja, diese Behandlung ist für alle Hauttypen und Hautfarben geeignet. Wir passen die Behandlung individuell an Ihre Bedürfnisse an.",
            },
        },
        {
            "@type": "Question",
            name: "Wie oft muss ich kommen?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Für langfristige, sichtbare Ergebnisse empfehlen wir 3-6 Behandlungen im Abstand von 4-6 Wochen. Erste Verbesserungen sind oft schon nach der ersten Behandlung sichtbar.",
            },
        },
        {
            "@type": "Question",
            name: "Muss ich danach zuhause bleiben?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Nein. Sie können direkt wieder Ihrem Alltag nachgehen. Die Haut kann 1-2 Tage leicht gerötet sein, was eine normale Reaktion ist.",
            },
        },
        {
            "@type": "Question",
            name: "Was kostet Microneedling mit SkinPen?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Bei Skinlux Pottendorf starten die Preise für eine SkinPen Precision Behandlung ab 199 Euro pro Sitzung. Für optimale Ergebnisse bieten wir auch Kurpakete an.",
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
            name: "Behandlungen",
            item: "https://skinlux-pottendorf.at/#treatments",
        },
        {
            "@type": "ListItem",
            position: 3,
            name: "SkinPen Precision",
            item: "https://skinlux-pottendorf.at/behandlungen/skinpen-precision",
        },
    ],
};

export default function SkinPenPrecisionPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
            />
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
            <SkinPenPrecisionContent />
        </>
    );
}
