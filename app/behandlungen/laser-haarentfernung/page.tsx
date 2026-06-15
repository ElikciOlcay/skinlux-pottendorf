import { Metadata } from "next";
import { SHORE_BOOKING_URL } from "@/lib/booking";
import LaserHaarentfernungContent from "./LaserHaarentfernungContent";
import TreatmentSeoLinks from "@/components/seo/TreatmentSeoLinks";

export const metadata: Metadata = {
    title: "Laser Haarentfernung Pottendorf | Baden, Mödling",
    description: "Dauerhafte Laser Haarentfernung in Pottendorf. Modernste Diodenlaser-Technologie, schmerzarm, für alle Hauttypen. Kostenlose Probebehandlung buchen.",
    alternates: {
        canonical: "https://pottendorf.skinlux.at/behandlungen/laser-haarentfernung",
    },
    openGraph: {
        title: "Laser Haarentfernung Pottendorf | Baden, Mödling",
        description: "Dauerhafte Laser Haarentfernung in Pottendorf. Modernste Diodenlaser-Technologie, schmerzarm, für alle Hauttypen. Kostenlose Probebehandlung.",
        url: "https://pottendorf.skinlux.at/behandlungen/laser-haarentfernung",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Laser Haarentfernung Pottendorf | Baden, Mödling",
        description: "Dauerhafte Laser Haarentfernung in Pottendorf. Modernste Diodenlaser-Technologie, schmerzarm, für alle Hauttypen.",
    },
};

const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Laser Haarentfernung",
    description: "Dauerhafte Haarentfernung mit modernster Diodenlaser-Technologie in Pottendorf, Niederösterreich. FDA-zertifiziert, schmerzarm, für alle Hauttypen.",
    procedureType: "Laser-Behandlung",
    howPerformed: "Behandlung mit modernem Diodenlaser, der gezielt Haarfollikel zerstört. Integriertes Kühlsystem für maximalen Komfort.",
    preparation: "Kostenlose Erstberatung mit Hauttyp-Bestimmung und individueller Behandlungsplanung.",
    followup: "Nachsorge und Pflegetipps. Behandlungen im Abstand von 4-6 Wochen.",
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
    serviceType: "Laser Haarentfernung",
    name: "Laser Haarentfernung",
    provider: {
        "@id": "https://pottendorf.skinlux.at/#business",
    },
    areaServed: ["Pottendorf", "Baden", "Mödling", "Wiener Neustadt", "Niederösterreich"],
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
            name: "Wie viele Behandlungen sind notwendig?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Die Anzahl der Behandlungen ist individuell und hängt von Hauttyp, Haarfarbe und behandelter Zone ab. Behandlungen finden im Abstand von 4-6 Wochen statt.",
            },
        },
        {
            "@type": "Question",
            name: "Ist die Behandlung schmerzhaft?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Dank unseres integrierten Kühlsystems ist die Behandlung nahezu schmerzfrei. Die meisten Kunden beschreiben es als leichtes Kribbeln.",
            },
        },
        {
            "@type": "Question",
            name: "Für welche Körperbereiche ist die Behandlung geeignet?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Die Laser-Haarentfernung kann an fast allen Körperstellen durchgeführt werden, einschließlich Gesicht, Achseln, Bikinizone, Beine und Rücken.",
            },
        },
        {
            "@type": "Question",
            name: "Wie lange hält das Ergebnis?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Nach Abschluss der Behandlungsserie können Sie sich über Jahre hinweg über glatte Haut freuen. Gelegentliche Auffrischungen können notwendig sein.",
            },
        },
        {
            "@type": "Question",
            name: "Was kostet Laser Haarentfernung in Pottendorf?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Die Preise bei Skinlux beginnen ab 35 Euro für kleine Zonen wie Oberlippe oder Kinn. Größere Bereiche wie Beine komplett kosten 180 Euro. Wir bieten auch Pakete mit Ersparnis an. Die kostenlose Erstberatung ist unverbindlich.",
            },
        },
        {
            "@type": "Question",
            name: "Wie funktioniert Laser Haarentfernung?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Der Diodenlaser sendet gezieltes Licht, das vom Melanin im Haarfollikel absorbiert wird. Die entstehende Wärme zerstört die Haarwurzel dauerhaft, während das umliegende Gewebe unversehrt bleibt. Unser integriertes Kühlsystem sorgt dabei für maximalen Komfort.",
            },
        },
        {
            "@type": "Question",
            name: "Ist Laser Haarentfernung dauerhaft?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ja, nach einer vollständigen Behandlungsserie von 6-8 Sitzungen ist eine dauerhafte Reduktion von bis zu 90% der Haare möglich. Vereinzelt können feine Haare nachwachsen, die mit einer Auffrischungsbehandlung einfach entfernt werden.",
            },
        },
        {
            "@type": "Question",
            name: "Welche Risiken hat Laser Haarentfernung?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Bei professioneller Durchführung ist die Behandlung sehr sicher. Vorübergehende Rötungen oder leichte Schwellungen können auftreten und klingen innerhalb weniger Stunden ab. Dank unserer FDA-zertifizierten Technologie sind ernsthafte Nebenwirkungen äußerst selten.",
            },
        },
        {
            "@type": "Question",
            name: "Wie lange dauert eine Laser-Sitzung?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Die Dauer hängt von der behandelten Zone ab: Kleine Bereiche wie Oberlippe dauern ca. 15 Minuten, größere Flächen wie Beine komplett etwa 60 Minuten. In der kostenlosen Beratung erstellen wir Ihren individuellen Behandlungsplan.",
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
            name: "Laser Haarentfernung",
            item: "https://pottendorf.skinlux.at/behandlungen/laser-haarentfernung",
        },
    ],
};

export default function LaserHaarentfernungPage() {
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
            <LaserHaarentfernungContent />
            <TreatmentSeoLinks serviceSlug="laser-haarentfernung" />
        </>
    );
}
