import { methoden as greenPeelMethoden } from "@/app/behandlungen/green-peel/data";
import { pakete as hydraScalpPakete } from "@/app/behandlungen/hydrascalp/data";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/booking";
import { GOOGLE_RATING, OPENING_HOURS_SUMMARY } from "@/lib/business-info";
import { FEATURES } from "@/lib/features";
import { damenPrices, herrenPrices } from "@/lib/laser-prices";
import { SITE_URL } from "@/lib/site";
import { HOME_FAQ } from "@/lib/seo/homeFaq";

export const dynamic = "force-static";

/**
 * /llms.txt – kompakte Faktenübersicht für KI-Assistenten (ChatGPT, Claude, Perplexity …).
 * Format nach https://llmstxt.org. Preise und Öffnungszeiten kommen aus denselben
 * Quellen wie die Website; HydraFacial-, SkinPen- und Facial-Preise sind hier gepflegt
 * und müssen bei Preisänderungen auf den Behandlungsseiten mit angepasst werden.
 */

const euro = (value: number) => `${value} €`;

function laserAbPreis() {
    const preise = [...damenPrices, ...herrenPrices].map((p) => p.priceEuro).filter((p) => p > 0);
    return Math.min(...preise);
}

function laserBeispiele() {
    const zonen = ["Achseln", "Bikinizone", "Oberlippe", "Beine komplett", "Gesicht komplett"];
    return zonen
        .map((zone) => damenPrices.find((p) => p.zone === zone))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
        .map((p) => `${p.zone} ${euro(p.priceEuro)}`)
        .join(", ");
}

function buildLlmsTxt() {
    const rating = GOOGLE_RATING.value.replace(".", ",");
    const greenPeel = greenPeelMethoden.map((m) => `${m.name} ${euro(m.preis)}`).join(", ");
    const hydraScalp = hydraScalpPakete
        .map((p) => `${p.name} ${euro(p.einzel)} (3er-Kur ${euro(p.kur)})`)
        .join(", ");

    const behandlungen = [
        `- [Laser-Haarentfernung](${SITE_URL}/behandlungen/laser-haarentfernung): Dauerhafte Haarentfernung mit Diodenlaser und integrierter Kühlung, für alle Hauttypen, Damen und Herren. Kostenloses Erstgespräch mit Probebehandlung. Einzelzonen ab ${euro(laserAbPreis())}, z. B. ${laserBeispiele()}. Meist rund 10 Sitzungen im Abstand von etwa 6 Wochen.`,
        `- [Laser-Preise (alle Zonen)](${SITE_URL}/preise/laser): Vollständige Preisliste für Damen und Herren.`,
        `- [HydraFacial®](${SITE_URL}/behandlungen/hydra-facial): Original HydraFacial – 3-in-1-Behandlung aus Reinigung, Peeling und Feuchtigkeit. Signature 169 €, Signature + LED 189 €, Deluxe 199 €, Platinum 249 €.`,
        `- [SkinPen® Precision Elite Microneedling](${SITE_URL}/behandlungen/skinpen-precision): FDA-zertifiziertes medizinisches Microneedling bei Aknenarben, Falten, großen Poren und Pigmentstörungen. Einzelbehandlung (60 Min.) 199 €, 3er-Kur 499 €.`,
        `- [GREEN PEEL® Kräuterschälkur](${SITE_URL}/behandlungen/green-peel): Original-Kräuterschälkur nach Dr. med. Christine Schrammek, ohne chemische Peelingsäuren. Drei Methoden: ${greenPeel}.`,
        `- [HydraScalp™ mit Keravive](${SITE_URL}/behandlungen/hydrascalp): Kopfhautbehandlung by HydraFacial – Reinigung, Exfoliation und Keravive Peptide Complex, Heimpflege inklusive. ${hydraScalp}. Empfohlen: mindestens 3 Behandlungen im Abstand von 4 Wochen. Keine medizinische Therapie gegen Haarausfall.`,
        `- [Premium Facials mit Circadia](${SITE_URL}/behandlungen/signature-facials): Klassische Circadia Gesichtsbehandlung 150 €, Firming Peptide Mask 175 €, Oxygen RX Facial 175 €, Radiance 4C Facial 189 €, SWiCH 3er-Kur 649 €.`,
        ...(FEATURES.HAUTANALYSE_ENABLED
            ? [`- [Hautanalyse](${SITE_URL}/behandlungen/hautanalyse): Professionelle Hautanalyse mit HD-Aufnahmen und 7 Analyseparametern – kostenlos bei Buchung ab 150 € Behandlung/Produkte.`]
            : []),
    ];

    return `# Skinlux Pottendorf

> Skinlux Medical Beauty in Pottendorf (Bezirk Baden, Niederösterreich) ist ein Studio für Laser-Haarentfernung, HydraFacial®, SkinPen® Microneedling, GREEN PEEL®, HydraScalp™ und Premium Facials. ${rating} Sterne bei ${GOOGLE_RATING.reviewCount} Google-Bewertungen. Kostenlose Erstberatung mit Probebehandlung für Laser-Haarentfernung.

## Auf einen Blick

- Name: Skinlux Pottendorf (Skinlux Medical Beauty)
- Adresse: Marktplatz 14, 2486 Pottendorf, Niederösterreich, Österreich
- Telefon: ${PHONE_DISPLAY} (${PHONE_E164})
- E-Mail: hey@skinlux.at
- Öffnungszeiten: ${OPENING_HOURS_SUMMARY.join("; ")}
- Google-Bewertung: ${rating} von 5 (${GOOGLE_RATING.reviewCount} Bewertungen)
- Online-Terminbuchung: ${SITE_URL} (Button „Termin vereinbaren“)
- Gut erreichbar aus: Pottendorf, Ebreichsdorf, Baden bei Wien, Traiskirchen, Bad Vöslau, Leobersdorf, Gumpoldskirchen, Mödling, Wiener Neustadt, Neunkirchen, Eisenstadt und dem Süden von Wien

## Behandlungen und Preise

${behandlungen.join("\n")}

## Häufige Fragen

${HOME_FAQ.map((eintrag) => `### ${eintrag.frage}\n\n${eintrag.antwort}`).join("\n\n")}

## Mehr

- [Über uns](${SITE_URL}/ueber-uns): Team und Studio in Pottendorf
- [Kostenlose Beratung](${SITE_URL}/beratung)
- [Gutscheine](${SITE_URL}/gutscheine)
- [Kontakt und Anfahrt](${SITE_URL}/kontakt)
- [Standorte](${SITE_URL}/standorte)
`;
}

export function GET() {
    return new Response(buildLlmsTxt(), {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
