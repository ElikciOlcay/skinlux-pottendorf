export type GreenPeelMethode = {
    id: string;
    name: string;
    preis: number;
    claim: string;
    untertitel: string;
    beschreibung: string[];
    geeignetBei: string[];
    inklusive?: string;
    hinweis?: string;
};

export const methoden: GreenPeelMethode[] = [
    {
        id: "fresh-up",
        name: "Fresh Up",
        preis: 129,
        claim: "The Natural Glow.",
        untertitel: "Der sanfte Frischekick für deine Haut.",
        beschreibung: [
            "GREEN PEEL® Fresh Up ist die sanfteste der drei Methoden und eignet sich ideal, um müde wirkende Haut zu revitalisieren und ihr neue Frische zu verleihen.",
            "Die Kräuterbehandlung unterstützt ein strahlendes, vitales Hautbild – ohne beabsichtigten sichtbaren Schälprozess und in der Regel ohne Ausfallzeit.",
        ],
        geeignetBei: [
            "Müder, blasser Haut",
            "Fahlem Teint",
            "Ersten Anzeichen der Hautalterung",
            "Trockenheitsfältchen",
        ],
    },
    {
        id: "energy",
        name: "Energy",
        preis: 199,
        claim: "Recharge your Skin.",
        untertitel: "Neue Energie für deine Haut.",
        beschreibung: [
            "GREEN PEEL® Energy ist die intensivere Methode zur gezielten Unterstützung der natürlichen Hautregeneration.",
            "Die Behandlung kann dazu beitragen, das Hautbild zu verfeinern, Unebenmäßigkeiten optisch zu reduzieren und die Haut frischer und vitaler erscheinen zu lassen. Eine ausgeprägte Schälung ist dabei nicht das Behandlungsziel.",
        ],
        geeignetBei: [
            "Unreinheiten",
            "Hyperpigmentierungen",
            "Zur Vorbeugung vorzeitiger Hautalterung",
            "Falten und Fältchen",
            "Unebenmäßiger Hautstruktur",
            "Vergrößerten Poren",
            "Narben",
        ],
        inklusive: "Inklusive abgestimmtem Pflegeset für zu Hause.",
    },
    {
        id: "classic",
        name: "Classic",
        preis: 329,
        claim: "The Intensive Skin Renewal.",
        untertitel: "Intensive Hauterneuerung für anspruchsvolle Hautbedürfnisse.",
        beschreibung: [
            "GREEN PEEL® Classic ist die intensivste der drei Methoden und wurde für eine gezielte, intensive Hauterneuerung entwickelt.",
            "Durch die spezielle Kräutermassage werden die natürlichen Regenerationsprozesse der Haut angeregt. In den darauffolgenden Tagen kann es zu einer sichtbaren Schälung kommen.",
            "Die Methode kann dazu beitragen, das Erscheinungsbild von Hautunregelmäßigkeiten, Narben und Zeichen der Hautalterung zu verbessern.",
        ],
        geeignetBei: [
            "Unreiner Haut",
            "Großporiger Haut",
            "Vorzeitig gealterter Haut",
            "Falten",
            "Sonnengeschädigter Haut",
            "Narben und Aknenarben",
            "Hyperpigmentierungen",
            "Dehnungsstreifen",
        ],
        inklusive: "Inklusive abgestimmtem Pflegeset und professioneller Nachbehandlung.",
        hinweis:
            "Die Behandlung erfordert eine spezielle Heimpflege sowie mehrere Tage Regenerationszeit. Die tatsächliche Schälung kann individuell unterschiedlich ausfallen.",
    },
];

export const kontraindikationen = [
    "Hauterkrankungen, insbesondere im aktiven Stadium",
    "Bakterielle, eitrige oder virale Hautinfektionen",
    "Allergische oder sehr empfindliche Haut",
    "Aktinische Keratose",
    "Dünne Haut mit Teleangiektasien (sichtbar erweiterten Äderchen)",
    "Rosacea",
    "Sonnenbrand",
    "Schwangerschaft",
    "Stillzeit",
];

export const faq = [
    {
        frage: "Was ist das Besondere an der Original GREEN PEEL® Kräuterschälkur?",
        antwort:
            "GREEN PEEL® ist eine seit 1958 etablierte, dermatologisch entwickelte Kräuterschälkur nach Dr. med. Christine Schrammek. Im Mittelpunkt steht eine spezielle Kräutermischung, die in unterschiedlichen Intensitäten angewendet wird. So kann die Behandlung auf verschiedene Hautbedürfnisse abgestimmt werden.",
    },
    {
        frage: "Schält sich die Haut nach jeder GREEN PEEL® Behandlung?",
        antwort:
            "Nein. Bei Fresh Up ist keine sichtbare Schälung vorgesehen. Auch bei Energy ist eine ausgeprägte Schälung nicht das Ziel. Bei Classic kann es dagegen im Verlauf mehrerer Tage zu einer sichtbaren Hautschälung kommen. Wie stark sich die Haut tatsächlich schält, ist individuell unterschiedlich.",
    },
    {
        frage: "Ist GREEN PEEL® schmerzhaft?",
        antwort:
            "Während der Kräutermassage kann ein Kribbeln, Prickeln oder Wärmegefühl auftreten. Besonders bei der intensiven Classic-Methode kann die Behandlung deutlicher spürbar sein. Die Wahrnehmung unterscheidet sich von Person zu Person.",
    },
    {
        frage: "Wie lange dauert die Regeneration?",
        antwort:
            "Die Regenerationszeit hängt von der gewählten Methode und deiner individuellen Hautreaktion ab. Bei Fresh Up ist normalerweise keine längere Ausfallzeit vorgesehen. Bei Energy können vorübergehende Hautreaktionen auftreten. Bei Classic solltest du mehrere Tage für die Regeneration einplanen und die empfohlenen Pflegehinweise konsequent beachten.",
    },
    {
        frage: "Kann ich nach GREEN PEEL® Make-up tragen?",
        antwort:
            "Das hängt von der Behandlungsmethode und dem Zustand deiner Haut ab. Insbesondere nach Classic gelten spezielle Pflege- und Verhaltensregeln. Wir erklären dir nach deiner Behandlung genau, welche Produkte du verwenden darfst und worauf du vorübergehend verzichten solltest.",
    },
    {
        frage: "Darf ich nach GREEN PEEL® in die Sonne?",
        antwort:
            "Nach einer GREEN PEEL® Behandlung kann die Haut empfindlicher auf UV-Strahlung reagieren. Konsequenter Sonnenschutz und das Vermeiden intensiver Sonnenbestrahlung sind besonders wichtig. Je nach Behandlungsmethode gelten zusätzliche Einschränkungen, über die wir dich persönlich informieren.",
    },
    {
        frage: "Wie viele Behandlungen sind notwendig?",
        antwort:
            "Das hängt von deinem Hautzustand, deinen Zielen und der gewählten GREEN PEEL® Methode ab. Während manche Kundinnen eine einzelne Behandlung zur Auffrischung wählen, kann bei bestimmten Hautbedürfnissen eine individuell geplante Behandlungsserie sinnvoll sein.",
    },
    {
        frage: "Ist GREEN PEEL® für jeden Hauttyp geeignet?",
        antwort:
            "GREEN PEEL® bietet unterschiedliche Behandlungsmethoden für verschiedene Hautbedürfnisse. Dennoch ist nicht jede Methode für jeden Hautzustand geeignet. Deshalb prüfen wir vorab mögliche Kontraindikationen und wählen die Behandlung individuell aus.",
    },
];
