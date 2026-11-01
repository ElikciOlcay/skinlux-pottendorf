import { methoden as greenPeelMethoden } from "@/app/behandlungen/green-peel/data";
import { PHONE_DISPLAY } from "@/lib/booking";
import { GOOGLE_RATING, OPENING_HOURS_SUMMARY } from "@/lib/business-info";
import { damenPrices, herrenPrices } from "@/lib/laser-prices";

/**
 * Fragen, wie sie Menschen Suchmaschinen und KI-Assistenten stellen – mit kurzen,
 * zitierfähigen Antworten. Wird auf der Startseite (sichtbar + FAQPage-Schema)
 * und in /llms.txt verwendet.
 */

const laserAb = Math.min(
    ...[...damenPrices, ...herrenPrices].map((p) => p.priceEuro).filter((p) => p > 0)
);
const achseln = damenPrices.find((p) => p.zone === "Achseln")?.priceEuro;
const beine = damenPrices.find((p) => p.zone === "Beine komplett")?.priceEuro;
const greenPeelAb = Math.min(...greenPeelMethoden.map((m) => m.preis));
const rating = GOOGLE_RATING.value.replace(".", ",");

export const HOME_FAQ = [
    {
        frage: "Wo gibt es Laser-Haarentfernung in der Nähe von Baden und Mödling?",
        antwort: `Skinlux Medical Beauty am Marktplatz 14 in 2486 Pottendorf bietet dauerhafte Laser-Haarentfernung mit Diodenlaser für Damen und Herren. Das Studio ist von Baden, Ebreichsdorf, Traiskirchen, Mödling und Wiener Neustadt aus gut mit dem Auto erreichbar und mit ${rating} Sternen bei ${GOOGLE_RATING.reviewCount} Google-Bewertungen bewertet.`,
    },
    {
        frage: "Was kostet Laser-Haarentfernung bei Skinlux Pottendorf?",
        antwort: `Einzelzonen beginnen bei ${laserAb} €${achseln ? `, Achseln kosten ${achseln} €` : ""}${beine ? `, Beine komplett ${beine} €` : ""} pro Behandlung. Für ein gutes Ergebnis sind meist rund 10 Sitzungen im Abstand von etwa 6 Wochen nötig. Das Erstgespräch mit Probebehandlung ist kostenlos.`,
    },
    {
        frage: "Gibt es eine kostenlose Probebehandlung?",
        antwort:
            "Ja. Für die Laser-Haarentfernung gibt es ein kostenloses Erstgespräch inklusive Probebehandlung. Dabei werden Haut- und Haartyp bestimmt, eine kleine Stelle getestet und die Anzahl der Sitzungen geplant.",
    },
    {
        frage: "Welche Gesichtsbehandlungen bietet Skinlux Pottendorf an?",
        antwort: `Original HydraFacial® (ab 169 €), SkinPen® Precision Elite Microneedling (199 €, 3er-Kur 499 €), die GREEN PEEL® Kräuterschälkur in drei Intensitäten (ab ${greenPeelAb} €) sowie Premium Facials mit Circadia Professional (ab 150 €). Welche Behandlung passt, wird vorab in einer Hautberatung geklärt.`,
    },
    {
        frage: "Ist die Laser-Haarentfernung schmerzhaft?",
        antwort:
            "Der Diodenlaser hat ein integriertes Kühlsystem. Die meisten Kundinnen und Kunden beschreiben die Behandlung als leichtes Kribbeln und gut verträglich.",
    },
    {
        frage: "Wann hat Skinlux Pottendorf geöffnet und wie buche ich einen Termin?",
        antwort: `${OPENING_HOURS_SUMMARY.join(", ")}. Termine lassen sich rund um die Uhr online über pottendorf.skinlux.at buchen oder telefonisch unter ${PHONE_DISPLAY}.`,
    },
];

export const HOME_FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((eintrag) => ({
        "@type": "Question",
        name: eintrag.frage,
        acceptedAnswer: {
            "@type": "Answer",
            text: eintrag.antwort,
        },
    })),
};
