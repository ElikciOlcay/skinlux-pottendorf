// Feature Flags für Skinlux
// Hier können Features ein- und ausgeschaltet werden

export const FEATURES = {
    // Hautanalyse - ausgeschaltet bis Gerät verfügbar ist
    HAUTANALYSE_ENABLED: false,

    // Weitere Features können hier hinzugefügt werden
    // NEUE_FEATURE: true,
} as const;

export type FeatureFlag = keyof typeof FEATURES; 