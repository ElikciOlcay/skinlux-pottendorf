/**
 * Zentrale Konfiguration für saisonale Aktionen.
 *
 * Wichtig: Alle Datums-/Promo-Komponenten lesen ausschließlich aus dieser Datei.
 * So lässt sich eine Aktion komplett über einen einzigen Punkt steuern.
 */

export interface OpeningHourEntry {
    day: string;
    hours: string;
    closed?: boolean;
}

export interface StudioInfo {
    name: string;
    addressLines: string[];
    mapsQuery: string;
    phoneDisplay: string;
    phoneE164: string;
    whatsappE164?: string;
    openingHours: OpeningHourEntry[];
}

export interface MothersDayPromoConfig {
    /** ISO 8601 Start (lokale Zeit Europa/Wien) */
    startDate: string;
    /** ISO 8601 Ende (lokale Zeit Europa/Wien) */
    endDate: string;
    /** Rabatt in Prozent */
    discountPercent: number;
    /** Behandlungen, für die der Gutschein gilt */
    treatments: string[];
    /** Wo der Gutschein erhältlich ist */
    availability: string;
    /** Optionale Detailseite */
    detailUrl: string;
    /** Standort-Bezeichnung (für Texte) */
    location: string;
    /** Studio-Daten für die Detailseite */
    studio: StudioInfo;
}

/**
 * Farb-Theme der Aktion. Wird in allen Promo-Komponenten zentral verwendet.
 * Tieferes Slate Blue als die Marke selbst – hebt die Aktion innerhalb der Markenfamilie ab.
 */
export const MOTHERS_DAY_THEME = {
    bg: "#2E3947",
    bgDeep: "#1F2730",
    text: "#FFFFFF",
    textMuted: "rgba(255, 255, 255, 0.78)",
    textSubtle: "rgba(255, 255, 255, 0.55)",
    border: "rgba(255, 255, 255, 0.18)",
    surface: "rgba(255, 255, 255, 0.10)",
    surfaceHover: "rgba(255, 255, 255, 0.18)",
    accent: "#D4DDE8",
} as const;

export const MOTHERS_DAY_PROMO: MothersDayPromoConfig = {
    startDate: "2026-05-01T00:00:00+02:00",
    endDate: "2026-05-31T23:59:59+02:00",
    discountPercent: 15,
    treatments: ["SkinPen", "HydraFacial"],
    availability: "Im Studio erhältlich",
    detailUrl: "/aktion/muttertag",
    location: "Skinlux Pottendorf",
    studio: {
        name: "Skinlux Pottendorf",
        addressLines: ["Marktplatz 14", "2486 Pottendorf", "Österreich"],
        mapsQuery: "Marktplatz 14, 2486 Pottendorf, Austria",
        phoneDisplay: "+43 664 91 88 632",
        phoneE164: "+436649188632",
        openingHours: [
            { day: "Montag", hours: "09:00 – 21:30" },
            { day: "Dienstag", hours: "09:00 – 21:30" },
            { day: "Mittwoch", hours: "09:00 – 21:30" },
            { day: "Donnerstag", hours: "09:00 – 21:30" },
            { day: "Freitag", hours: "09:00 – 21:30" },
            { day: "Samstag", hours: "07:00 – 12:00" },
            { day: "Sonntag", hours: "Geschlossen", closed: true },
        ],
    },
};

/**
 * Prüft, ob die Muttertags-Aktion zum gegebenen Zeitpunkt aktiv ist.
 * Standardmäßig wird der aktuelle Zeitpunkt verwendet.
 */
export function isMothersDayPromoActive(date: Date = new Date()): boolean {
    const start = new Date(MOTHERS_DAY_PROMO.startDate);
    const end = new Date(MOTHERS_DAY_PROMO.endDate);
    return date >= start && date <= end;
}

/**
 * Liefert eine kompakte Headline für Banner & Widgets.
 */
export function getMothersDayHeadline(): string {
    return `Muttertags-Aktion · ${MOTHERS_DAY_PROMO.discountPercent}% Rabatt auf Gutscheine`;
}

/**
 * Liefert einen Subtext mit Behandlungs-Geltungsbereich.
 */
export function getMothersDaySubline(): string {
    return `Gültig für ${MOTHERS_DAY_PROMO.treatments.join(" & ")} · ${MOTHERS_DAY_PROMO.availability}`;
}
