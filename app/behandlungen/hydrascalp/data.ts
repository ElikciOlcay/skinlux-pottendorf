/**
 * Inhalte und Preise laut Behandlungsblatt „HydraScalp“ (Stand November 2026).
 * Wird von /behandlungen/hydrascalp, der Kampagnenseite /aktion/hydrascalp,
 * der Startseiten-FAQ und /llms.txt verwendet.
 */

export type HydraScalpPaket = {
    id: string;
    name: string;
    beschreibung: string;
    inklusive: string;
    einzel: number;
    kur: number;
};

export const pakete: HydraScalpPaket[] = [
    {
        id: "teil",
        name: "Teilbehandlung",
        beschreibung: "Ein ausgewählter Bereich der Kopfhaut",
        inklusive: "Inklusive Keravive Peptide Complex (Heimpflege).",
        einzel: 280,
        kur: 800,
    },
    {
        id: "komplett",
        name: "Komplettbehandlung",
        beschreibung: "Die gesamte Kopfhaut",
        inklusive: "Inklusive Keravive Peptide Complex und Heimpflege.",
        einzel: 375,
        kur: 1000,
    },
];

export const abPreis = Math.min(...pakete.map((paket) => paket.einzel));

export const geeignetBei = [
    "Trockener, juckender oder schuppiger Kopfhaut",
    "Fettiger Kopfhaut und übermäßiger Talgproduktion",
    "Vermehrtem Haarausfall – als ergänzende Kopfhautpflege",
    "Feinem, dünnem oder kraftlosem Haar",
    "Ablagerungen durch Styling- und Pflegeprodukte",
    "Dem Wunsch nach einer gesunden und intensiv gepflegten Kopfhaut",
];

export const vorteile = [
    "Intensive Reinigung und Exfoliation der Kopfhaut",
    "Entfernung von Talg und Produktablagerungen",
    "Feuchtigkeitsversorgung trockener Kopfhaut",
    "Unterstützung eines ausgeglichenen Kopfhautmilieus",
    "Pflege mit dem Keravive Peptide Complex",
    "Ergänzende Heimpflege inklusive",
    "Sanfte, nichtinvasive Behandlung ohne reguläre Ausfallzeit",
];

export const ablauf = [
    {
        nummer: "01",
        titel: "Tiefenreinigung & Exfoliation",
        text: "Die Kopfhaut wird mithilfe der HydraFacial-Technologie sanft von überschüssigem Talg, abgestorbenen Hautzellen und Ablagerungen befreit.",
    },
    {
        nummer: "02",
        titel: "Versorgung mit dem Keravive Peptide Complex",
        text: "Die gereinigte Kopfhaut wird mit dem speziell entwickelten Keravive Peptide Complex versorgt. Die enthaltenen Pflegewirkstoffe unterstützen die Feuchtigkeitsversorgung und ein ausgeglichenes Kopfhautmilieu.",
    },
    {
        nummer: "03",
        titel: "Ergänzende Heimpflege",
        text: "Der Keravive Peptide Complex zur Anwendung zu Hause ist bereits im Behandlungspreis enthalten. Er ergänzt die professionelle Behandlung und unterstützt die kontinuierliche Kopfhautpflege zwischen den Terminen.",
    },
];

export const faq = [
    {
        frage: "Ist HydraScalp schmerzhaft?",
        antwort: "Nein. Die Behandlung ist sanft, nichtinvasiv und wird in der Regel als angenehm empfunden.",
    },
    {
        frage: "Wie viele Behandlungen werden empfohlen?",
        antwort:
            "Wir empfehlen mindestens drei Behandlungen im Abstand von jeweils vier Wochen. Bereits eine einzelne Behandlung kann für eine spürbar gereinigte und erfrischte Kopfhaut sorgen – für eine kontinuierliche Pflege ist die 3er-Kur ideal.",
    },
    {
        frage: "Ist die Heimpflege im Preis enthalten?",
        antwort:
            "Ja. Der Keravive Peptide Complex zur ergänzenden Anwendung zu Hause ist im Behandlungspreis enthalten.",
    },
    {
        frage: "Kann HydraScalp bei Haarausfall helfen?",
        antwort:
            "HydraScalp kann die Kopfhaut reinigen, mit Feuchtigkeit versorgen und ihre Pflege unterstützen. Die Behandlung ist jedoch keine medizinische Therapie gegen Haarausfall und kann das Nachwachsen von Haaren nicht garantieren. Bei starkem oder anhaltendem Haarausfall empfehlen wir eine dermatologische Abklärung.",
    },
    {
        frage: "Was ist der Unterschied zwischen Teil- und Komplettbehandlung?",
        antwort:
            "Bei der Teilbehandlung wird ein ausgewählter Kopfhautbereich behandelt. Die Komplettbehandlung umfasst die gesamte Kopfhaut.",
    },
    {
        frage: "Gibt es eine Ausfallzeit?",
        antwort:
            "In der Regel ist keine Ausfallzeit erforderlich. Gewohnte Alltagsaktivitäten können unmittelbar nach der Behandlung wieder aufgenommen werden.",
    },
];

/** "€ 1.000" – de-AT gruppiert vierstellige Zahlen sonst nicht. */
export function formatEuro(value: number) {
    return `€ ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}
