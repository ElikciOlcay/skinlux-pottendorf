import { Metadata } from "next";
import MicroneedlingContent from "./MicroneedlingContent";

export const metadata: Metadata = {
    title: "Microneedling Pottendorf | Hautregeneration Baden, Mödling",
    description: "Professionelles Microneedling in Pottendorf. Kollagen-Induktions-Therapie für Hauterneuerung, Anti-Aging und Narbenreduktion. Jetzt Termin buchen.",
    alternates: {
        canonical: "https://skinlux-pottendorf.at/behandlungen/microneedling",
    },
    openGraph: {
        title: "Microneedling Pottendorf | Hautregeneration Baden, Mödling",
        description: "Professionelles Microneedling in Pottendorf. Kollagen-Induktions-Therapie für Hauterneuerung, Anti-Aging und Narbenreduktion.",
        url: "https://skinlux-pottendorf.at/behandlungen/microneedling",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Microneedling Pottendorf | Hautregeneration Baden, Mödling",
        description: "Professionelles Microneedling in Pottendorf. Kollagen-Induktions-Therapie für Hauterneuerung, Anti-Aging und Narbenreduktion.",
    },
};

const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Microneedling",
    description: "Innovative Kollagen-Induktions-Therapie für natürliche Hauterneuerung in Pottendorf, Niederösterreich. Reduziert Falten, Narben und verfeinert Poren.",
    procedureType: "Kollagen-Induktions-Therapie",
    howPerformed: "Präzise Behandlung mit sterilen Mikronadeln in verschiedenen Tiefen (0.5-2.5mm). Einarbeitung hochwirksamer Seren für optimale Regeneration.",
    preparation: "Sanfte Reinigung und Betäubungscreme für maximalen Komfort.",
    followup: "Beruhigende Maske und Pflegeberatung. Haut kann 24-48 Stunden leicht gerötet sein. 3-6 Sitzungen im Abstand von 4-6 Wochen empfohlen.",
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

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Wie schmerzhaft ist Microneedling?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Durch die Betäubungscreme ist die Behandlung sehr gut verträglich. Die meisten Klienten empfinden nur ein leichtes Kribbeln.",
            },
        },
        {
            "@type": "Question",
            name: "Wie viele Sitzungen sind nötig?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Für optimale Ergebnisse empfehlen wir 3-6 Sitzungen im Abstand von 4-6 Wochen, je nach Hautbeschaffenheit.",
            },
        },
        {
            "@type": "Question",
            name: "Wann sind erste Ergebnisse sichtbar?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Bereits nach der ersten Behandlung ist die Haut strahlender. Die volle Wirkung entwickelt sich über 4-6 Wochen.",
            },
        },
        {
            "@type": "Question",
            name: "Gibt es Ausfallzeiten?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Minimal. Die Haut kann 24-48 Stunden leicht gerötet sein, danach können Sie Ihren normalen Alltag fortsetzen.",
            },
        },
        {
            "@type": "Question",
            name: "Für wen ist Microneedling geeignet?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Für alle Hauttypen ab 18 Jahren. Besonders empfehlenswert bei Aknenarben, Falten, großen Poren und Pigmentflecken.",
            },
        },
        {
            "@type": "Question",
            name: "Wie viele Microneedling-Sitzungen brauche ich?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Für optimale Ergebnisse empfehlen wir 3-6 Sitzungen im Abstand von 4-6 Wochen. Die genaue Anzahl hängt von Ihrem Hautbild und Ihren Zielen ab. Bereits nach der ersten Sitzung sehen Sie eine Verbesserung.",
            },
        },
        {
            "@type": "Question",
            name: "Was kostet Microneedling in Pottendorf?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Eine Microneedling-Behandlung bei Skinlux kostet ab 149 Euro pro Sitzung. Wir bieten auch eine 3er-Kur für 499 Euro an (statt 539 Euro einzeln). Die kostenlose Erstberatung ist unverbindlich.",
            },
        },
        {
            "@type": "Question",
            name: "Ist Microneedling schmerzhaft?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Die Behandlung ist gut verträglich. Vor der Sitzung tragen wir eine betäubende Creme auf, sodass Sie während der Behandlung nur ein leichtes Kribbeln spüren. Die meisten Kunden empfinden es als angenehm.",
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
            name: "Microneedling",
            item: "https://skinlux-pottendorf.at/behandlungen/microneedling",
        },
    ],
};

export default function MicroneedlingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <MicroneedlingContent />
        </>
    );
}
