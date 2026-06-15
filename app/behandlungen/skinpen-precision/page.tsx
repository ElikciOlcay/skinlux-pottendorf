import { Metadata } from "next";
import { SHORE_BOOKING_URL } from "@/lib/booking";
import SkinPenPrecisionContent from "./SkinPenPrecisionContent";

export const metadata: Metadata = {
    title: "SkinPen Precision Elite | Medizinisches Microneedling Pottendorf",
    description:
        "Medizinisches Microneedling mit SkinPen Precision Elite in Pottendorf. FDA-zertifiziert, Kollagen & Elastin, Narben, Falten, Pigmentierung. Ab € 199.",
    alternates: {
        canonical: "https://pottendorf.skinlux.at/behandlungen/skinpen-precision",
    },
    openGraph: {
        title: "SkinPen Precision Elite | Medizinisches Microneedling Pottendorf",
        description:
            "Medizinisches Microneedling mit SkinPen Precision Elite. FDA-zertifiziert für Aknenarben, Falten, Poren und Pigmentstörungen.",
        url: "https://pottendorf.skinlux.at/behandlungen/skinpen-precision",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "SkinPen Precision Elite | Medizinisches Microneedling Pottendorf",
        description:
            "FDA-zertifiziertes Microneedling in Pottendorf – Hautregeneration, Kollagen & Elastin.",
    },
};

const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "SkinPen Precision Elite Microneedling",
    alternateName: "Medizinisches Microneedling SkinPen",
    description:
        "Medizinisches Microneedling mit SkinPen Precision Elite in Pottendorf, Niederösterreich. FDA-zertifiziert. Aktiviert Wundheilung und Kollagen-/Elastin-Neubildung bei Narben, Falten, Poren und Pigmentstörungen.",
    procedureType: "Microneedling-Behandlung",
    howPerformed:
        "Kontrollierte mikroskopische Kanäle mit medizinischem SkinPen Precision Elite; Regulation der Pigmentierungsaktivität und Stimulation der Hautregeneration.",
    preparation: "Kostenlose Erstberatung mit Hautanalyse und individueller Planung.",
    followup: "Nachsorge und Pflegetipps. Behandlungen typischerweise im Abstand von 4–6 Wochen.",
    provider: {
        "@id": "https://pottendorf.skinlux.at/#business",
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
    serviceType: "SkinPen Precision Elite Microneedling",
    name: "SkinPen Precision Elite Microneedling",
    provider: {
        "@id": "https://pottendorf.skinlux.at/#business",
    },
    areaServed: ["Pottendorf", "Baden", "Mödling", "Wiener Neustadt", "Niederösterreich"],
    url: "https://pottendorf.skinlux.at/behandlungen/skinpen-precision",
    offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: SHORE_BOOKING_URL,
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Was ist SkinPen Precision Elite?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "SkinPen Precision Elite ist ein medizinisches Microneedling-Gerät, das den natürlichen Wundheilungsprozess der Haut aktiviert, die Hautregeneration stimuliert und die Neubildung von Kollagen und Elastin anregt.",
            },
        },
        {
            "@type": "Question",
            name: "Was macht diese Behandlung so besonders?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wir arbeiten mit einem FDA-zertifizierten System und kontrollierter Stimulation. Die Haut reguliert dabei unter anderem die Pigmentierungsaktivität – für ein verfeinertes, ebenmäßigeres Hautbild.",
            },
        },
        {
            "@type": "Question",
            name: "Funktioniert das bei meiner Haut?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "In der Beratung prüfen wir Hauttyp, Beschwerdebild und Kontraindikationen und passen die Behandlung individuell an.",
            },
        },
        {
            "@type": "Question",
            name: "Wie oft muss ich kommen?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Für langfristige Ergebnisse empfehlen wir in der Regel 3–6 Behandlungen im Abstand von 4–6 Wochen. Erste Veränderungen sind oft bereits nach der ersten Sitzung sichtbar.",
            },
        },
        {
            "@type": "Question",
            name: "Gibt es eine Ausfallzeit?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Es kann zu 1–2 Tagen kommen, in denen die Haut gerötet oder leicht empfindlich ist.",
            },
        },
        {
            "@type": "Question",
            name: "Muss ich danach zuhause bleiben?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Nein. Sie müssen nicht zuhause bleiben. Mit der kurzen Phase von Rötung und Empfindlichkeit sollten Sie vorsichtig mit Sonne, Sport und reizenden Produkten umgehen – das besprechen wir im Studio.",
            },
        },
        {
            "@type": "Question",
            name: "Wann darf ich nicht behandelt werden?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Bei Schwangerschaft und Stillzeit, aktiven Fieberblasen, Blutverdünnung, Keloid-Narbenbildung, Erkältungssymptomen oder akuten Krankheiten ist die Behandlung nicht möglich.",
            },
        },
        {
            "@type": "Question",
            name: "Tut das weh?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Die meisten empfinden die Behandlung als gut verträglich. Auf Wunsch nutzen wir eine Betäubungscreme.",
            },
        },
        {
            "@type": "Question",
            name: "Was kostet Microneedling mit SkinPen?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Bei Skinlux Pottendorf kostet eine SkinPen Precision Elite Einzelbehandlung (60 Min.) € 199. Mit der 3er Kur sparen Sie und zahlen nur € 499. In der kostenlosen Beratung erstellen wir Ihren individuellen Behandlungsplan.",
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
            name: "SkinPen Precision Elite",
            item: "https://pottendorf.skinlux.at/behandlungen/skinpen-precision",
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
