import { Metadata } from "next";
import { SHORE_BOOKING_URL } from "@/lib/booking";
import HydraFacialContent from "./HydraFacialContent";

export const metadata: Metadata = {
    title: "HydraFacial Pottendorf | Gesichtsbehandlung Baden, Mödling",
    description: "HydraFacial® Behandlung in Pottendorf. Tiefenreinigung, Extraktion & Hydration für sofort sichtbare Ergebnisse. Für alle Hauttypen geeignet.",
    alternates: {
        canonical: "https://pottendorf.skinlux.at/behandlungen/hydra-facial",
    },
    openGraph: {
        title: "HydraFacial Pottendorf | Gesichtsbehandlung Baden, Mödling",
        description: "HydraFacial® Behandlung in Pottendorf. Tiefenreinigung, Extraktion und Hydration für sofort sichtbare Ergebnisse. Für alle Hauttypen.",
        url: "https://pottendorf.skinlux.at/behandlungen/hydra-facial",
        type: "website",
        locale: "de_AT",
        siteName: "Skinlux Pottendorf",
    },
    twitter: {
        card: "summary_large_image",
        title: "HydraFacial Pottendorf | Gesichtsbehandlung Baden, Mödling",
        description: "HydraFacial® Behandlung in Pottendorf. Tiefenreinigung, Extraktion und Hydration für sofort sichtbare Ergebnisse.",
    },
};

const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "HydraFacial®",
    description: "Revolutionäre 3-in-1 Gesichtsbehandlung mit Tiefenreinigung, Extraktion und Hydration in Pottendorf, Niederösterreich. Sofort sichtbare Ergebnisse für alle Hauttypen.",
    procedureType: "Gesichtsbehandlung",
    howPerformed: "Dreistufige Behandlung: Cleanse + Peel, Extract + Hydrate, Fuse + Protect. Optional mit Booster-Seren und LED-Therapie.",
    preparation: "Keine spezielle Vorbereitung notwendig. Beratungsgespräch vor der ersten Behandlung.",
    followup: "Sofort gesellschaftsfähig. Für optimale Ergebnisse monatliche Behandlungen empfohlen.",
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
    serviceType: "HydraFacial®",
    name: "HydraFacial® Gesichtsbehandlung",
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
            name: "Ist HydraFacial® schmerzhaft?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Nein, HydraFacial® ist völlig schmerzfrei und entspannend. Viele Kunden empfinden die Behandlung als sehr angenehm.",
            },
        },
        {
            "@type": "Question",
            name: "Wie oft sollte man HydraFacial® machen?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Für optimale Ergebnisse empfehlen wir monatliche Behandlungen. Bei problematischer Haut anfangs alle 2 Wochen.",
            },
        },
        {
            "@type": "Question",
            name: "Wann sehe ich erste Ergebnisse?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Sofort nach der ersten Behandlung ist Ihre Haut strahlender und hydratisierter. Die Effekte halten 4-6 Wochen an.",
            },
        },
        {
            "@type": "Question",
            name: "Kann ich nach der Behandlung Make-up tragen?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ja, Sie können sofort nach der Behandlung Make-up tragen. Ihre Haut wird sogar als bessere Basis fungieren.",
            },
        },
        {
            "@type": "Question",
            name: "Für welche Hautprobleme ist HydraFacial® geeignet?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "HydraFacial® hilft bei fahler Haut, großen Poren, Mitessern, feinen Linien, Hyperpigmentierung und Dehydrierung.",
            },
        },
        {
            "@type": "Question",
            name: "Was sind HydraFacial® Booster und wofür sind sie da?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Booster sind spezialisierte Seren, die Ihre HydraFacial-Behandlung individualisieren. Vitamin C Brightening für strahlende Haut, Growth Factor für Anti-Aging, Clarifying für unreine Haut und Hydrating für intensive Feuchtigkeit. Sie werden gezielt auf Ihre Hautbedürfnisse abgestimmt.",
            },
        },
        {
            "@type": "Question",
            name: "Was kostet HydraFacial in Pottendorf?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Bei Skinlux Pottendorf bieten wir verschiedene HydraFacial-Pakete an. Die genauen Preise erfahren Sie bei der Terminvereinbarung oder in einem kostenlosen Beratungsgespräch. Jede Behandlung wird individuell auf Ihre Haut abgestimmt.",
            },
        },
        {
            "@type": "Question",
            name: "Für wen ist HydraFacial geeignet?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "HydraFacial eignet sich für nahezu alle Hauttypen und Altersgruppen. Besonders empfehlenswert ist die Behandlung bei fahler Haut, verstopften Poren, Akne, trockener Haut, Sonnenschäden und ersten Alterungszeichen.",
            },
        },
        {
            "@type": "Question",
            name: "Wie lange hält der HydraFacial-Effekt?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Der sofortige Glow-Effekt hält etwa 5-7 Tage an. Die tiefergehenden Effekte wie verbesserte Hydration und verfeinerte Poren halten 4-6 Wochen. Für langfristig strahlende Haut empfehlen wir monatliche Behandlungen.",
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
            name: "HydraFacial®",
            item: "https://pottendorf.skinlux.at/behandlungen/hydra-facial",
        },
    ],
};

export default function HydraFacialPage() {
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
            <HydraFacialContent />
        </>
    );
}
