import {
  CITIES,
  getServiceBySlug,
  type CityDefinition,
} from "@/lib/seo/internalLinks";

export type LocalLandingPageEntry = {
  city: string;
  cityLabel: string;
  service: string;
  serviceLabel: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  faq: Array<{ question: string; answer: string }>;
};

const STUDIO_LABEL = "Skinlux Pottendorf";
const STUDIO_ADDRESS = "Marktplatz 14, 2486 Pottendorf";

function buildFaq(
  serviceSlug: string,
  cityLabel: string
): Array<{ question: string; answer: string }> {
  const priceHint =
    "Aktuelle Preise und Pakete finden Sie auf unserer Preisseite oder in der kostenlosen Erstberatung.";

  switch (serviceSlug) {
    case "laser-haarentfernung":
      return [
        {
          question: `Wie viele Sitzungen brauche ich für Laser Haarentfernung aus ${cityLabel}?`,
          answer:
            "In der Regel 6 bis 8 Sitzungen im Abstand von 4 bis 6 Wochen. Den genauen Plan erstellen wir nach Haut- und Haaranalyse in Pottendorf.",
        },
        {
          question: "Ist die Behandlung schmerzhaft?",
          answer:
            "Dank integriertem Kühlsystem ist die Behandlung sehr gut verträglich. Viele empfinden nur ein leichtes Kribbeln.",
        },
        {
          question: `Was kostet Laser Haarentfernung für Kundinnen aus ${cityLabel}?`,
          answer: priceHint,
        },
        {
          question: "Gibt es eine kostenlose Erstberatung?",
          answer:
            "Ja, inklusive Hautanalyse und Probebehandlung an einer kleinen Stelle – unverbindlich in unserem Studio in Pottendorf.",
        },
        {
          question: `Lohnt sich die Anfahrt aus ${cityLabel}?`,
          answer: `Ja, viele Kundinnen und Kunden aus ${cityLabel} und Umgebung schätzen unsere Spezialisierung und persönliche Betreuung in Pottendorf.`,
        },
      ];
    case "hydra-facial":
      return [
        {
          question: `Für wen ist HydraFacial aus ${cityLabel} geeignet?`,
          answer:
            "Für viele Hauttypen – besonders bei fahler, trockener oder unreiner Haut. Wir passen Seren individuell an.",
        },
        {
          question: "Gibt es Ausfallzeiten?",
          answer:
            "In der Regel nicht. Sie sind meist direkt nach der Behandlung wieder gesellschaftsfähig.",
        },
        {
          question: "Was kostet HydraFacial?",
          answer: priceHint,
        },
        {
          question: "Wie oft sollte ich HydraFacial machen?",
          answer:
            "Für dauerhaft gesunde Haut empfehlen wir alle 4 bis 6 Wochen. Vor Events reicht oft eine einzelne Sitzung.",
        },
        {
          question: "Wie buche ich einen Termin?",
          answer:
            "Direkt online über unsere Buchungsseite oder telefonisch – wir freuen uns auf Ihren Besuch in Pottendorf.",
        },
      ];
    case "skinpen-precision":
      return [
        {
          question: `Hilft SkinPen Precision bei Aknenarben – auch für Kundinnen aus ${cityLabel}?`,
          answer:
            "Ja, Microneedling mit dem FDA-zugelassenen SkinPen ist eine der wirksamsten Methoden gegen Aknenarben und große Poren.",
        },
        {
          question: "Tut Microneedling weh?",
          answer:
            "Vor der Behandlung wird eine Betäubungscreme aufgetragen. Die meisten beschreiben das Gefühl als leichtes Kribbeln.",
        },
        {
          question: "Was kostet SkinPen Precision?",
          answer: priceHint,
        },
        {
          question: "Wie viele Sitzungen sind nötig?",
          answer:
            "Für optimale Ergebnisse planen wir 3 bis 6 Sitzungen im Abstand von 4 bis 6 Wochen.",
        },
        {
          question: "Wie lange dauert die Heilung?",
          answer:
            "Leichte Rötungen klingen in 24 bis 48 Stunden ab. Sonnenschutz ist in den folgenden Tagen besonders wichtig.",
        },
      ];
    case "signature-facials":
      return [
        {
          question: `Welche Signature Facials bietet Skinlux in Pottendorf an?`,
          answer:
            "90-Minuten Premium-Behandlungen mit Circadia Professional – individuell abgestimmt auf Ihr Hautbild.",
        },
        {
          question: "Für wen sind Signature Facials geeignet?",
          answer:
            "Für alle, die eine intensive Gesichtsbehandlung mit Beratung und sichtbarem Ergebnis wünschen.",
        },
        {
          question: "Was kosten Signature Facials?",
          answer: priceHint,
        },
        {
          question: "Gibt es Paketrabatte?",
          answer:
            "Ja, bei mehreren Behandlungen. Details finden Sie auf unserer Preisseite oder in der Beratung.",
        },
        {
          question: "Wie buche ich einen Termin?",
          answer: "Online über unsere Buchungsseite oder per Telefon – wir beraten Sie gerne persönlich.",
        },
      ];
    case "hautanalyse":
      return [
        {
          question: "Was wird bei der Hautanalyse gemessen?",
          answer:
            "Unter anderem Feuchtigkeit, Porenbild, Pigmentierung und sichtbare Hautstruktur – mit HD/4K-Technologie.",
        },
        {
          question: "Wie lange dauert die Analyse?",
          answer: "In der Regel rund 30 Minuten inklusive Besprechung und Empfehlung.",
        },
        {
          question: "Was kostet die Hautanalyse?",
          answer: priceHint,
        },
        {
          question: "Bekomme ich sofort eine Empfehlung?",
          answer:
            "Ja, Sie erhalten direkt im Anschluss einen individuellen Behandlungs- und Pflegeplan.",
        },
        {
          question: "Kann ich danach direkt eine Behandlung starten?",
          answer:
            "Ja, abhängig von Ziel und Verfügbarkeit planen oder starten wir direkt im Anschluss.",
        },
      ];
    default:
      return [];
  }
}

function buildEntry(
  city: CityDefinition,
  serviceSlug: string
): LocalLandingPageEntry {
  const service = getServiceBySlug(serviceSlug);
  if (!service) {
    throw new Error(`Unknown service: ${serviceSlug}`);
  }

  const isStudioCity = city.slug === "pottendorf";
  const serviceKeyword = service.label.toLowerCase();
  const cityKeyword = city.label.toLowerCase();

  const description = isStudioCity
    ? `${service.label} in Pottendorf: ${STUDIO_LABEL} am ${STUDIO_ADDRESS}. Persönliche Beratung, moderne Technologie und Online-Terminbuchung.`
    : `${service.label} für Kundinnen und Kunden aus ${city.label}: ${STUDIO_LABEL} in Pottendorf ist bequem erreichbar. Kostenlose Erstberatung und Online-Buchung.`;

  return {
    city: city.slug,
    cityLabel: city.label,
    service: service.slug,
    serviceLabel: service.label,
    title: `${service.label} ${city.label} | ${STUDIO_LABEL}`,
    description,
    h1: isStudioCity
      ? `${service.label} in Pottendorf`
      : `${service.label} für ${city.label}`,
    primaryKeyword: `${serviceKeyword} ${cityKeyword}`,
    secondaryKeywords: [
      `${serviceKeyword} ${cityKeyword} termin`,
      `${serviceKeyword} in der nähe ${cityKeyword}`,
      `kosmetikstudio ${cityKeyword}`,
    ],
    faq: buildFaq(service.slug, city.label),
  };
}

const entries: LocalLandingPageEntry[] = CITIES.flatMap((city) =>
  city.services.map((serviceSlug) => buildEntry(city, serviceSlug))
);

export const LOCAL_LANDING_PAGES = Object.fromEntries(
  entries.map((entry) => [`${entry.city}/${entry.service}`, entry])
) as Record<string, LocalLandingPageEntry>;

export const LOCAL_LANDING_PATHS = entries.map((entry) => ({
  city: entry.city,
  service: entry.service,
}));
