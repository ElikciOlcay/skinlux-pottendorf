// Feature Flags für Skinlux
// Hier können Features ein- und ausgeschaltet werden

export const FEATURES = {
    // Hautanalyse - jetzt aktiviert
    HAUTANALYSE_ENABLED: true,

    // Microneedling - ausgeschaltet bis verfügbar
    MICRONEEDLING_ENABLED: false,

    // Weitere Features können hier hinzugefügt werden
    // NEUE_FEATURE: true,
} as const;

export type FeatureFlag = keyof typeof FEATURES; 