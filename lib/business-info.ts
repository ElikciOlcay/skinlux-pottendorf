export const GOOGLE_RATING = {
    value: "5.0",
    reviewCount: 183,
} as const;

export const GOOGLE_RATING_LABEL = `${GOOGLE_RATING.reviewCount} Google Bewertungen`;

export const GOOGLE_REVIEWS_URL = "https://g.page/r/CZXEP1GJQRbVEBM/review";

export const GOOGLE_AGGREGATE_RATING_SCHEMA = {
    "@type": "AggregateRating",
    ratingValue: GOOGLE_RATING.value,
    ratingCount: String(GOOGLE_RATING.reviewCount),
    bestRating: "5",
    worstRating: "1",
};

export type OpeningHourDayKey =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

export interface OpeningHourEntry {
    key: OpeningHourDayKey;
    label: string;
    display: string;
    closed?: boolean;
}

export const OPENING_HOURS: OpeningHourEntry[] = [
    { key: "monday", label: "Montag", display: "09:00 - 21:30" },
    { key: "tuesday", label: "Dienstag", display: "09:00 - 21:30" },
    { key: "wednesday", label: "Mittwoch", display: "09:00 - 21:30" },
    { key: "thursday", label: "Donnerstag", display: "09:00 - 21:30" },
    { key: "friday", label: "Freitag", display: "09:00 - 21:30" },
    { key: "saturday", label: "Samstag", display: "07:00 - 12:00" },
    { key: "sunday", label: "Sonntag", display: "Geschlossen", closed: true },
];

export const OPENING_HOURS_SUMMARY = [
    "Montag - Freitag: 09:00 - 21:30",
    "Samstag: 07:00 - 12:00",
    "Sonntag: Geschlossen",
] as const;

export const OPENING_HOURS_CHAT_TEXT =
    "Mo-Fr: 09:00 - 21:30\nSa: 07:00 - 12:00\nSo: Geschlossen";

export const OPENING_HOURS_BY_DAY = Object.fromEntries(
    OPENING_HOURS.map(({ key, display, closed }) => [
        key,
        closed ? "Geschlossen" : display,
    ])
) as Record<OpeningHourDayKey, string>;

export const OPENING_HOURS_SCHEMA = [
    {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "21:30",
    },
    {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "07:00",
        closes: "12:00",
    },
];
