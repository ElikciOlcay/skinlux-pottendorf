/** Premium Facials (Circadia): einzige Quelle für Behandlungsseite, Schema und Chat. */
export interface PremiumFacial {
    id: string;
    name: string;
    claim: string;
    price: number;
    priceNote?: string;
    tags: readonly string[];
    suitableIntro: string;
    suitableFor: readonly string[];
    effect: string;
    about: string;
    need: string;
    chatBenefits: readonly string[];
}

export const PREMIUM_FACIALS: readonly PremiumFacial[] = [
    {
        id: "luxelift",
        name: "LuxeLift Facial",
        claim: "Straffung & Anti-Aging",
        price: 175,
        tags: ["Firming", "Lifting", "Anti-Aging"],
        suitableIntro: "Ideal für anspruchsvolle Haut mit ersten oder fortgeschrittenen Zeichen der Hautalterung, insbesondere bei:",
        suitableFor: [
            "Feinen Linien und Fältchen",
            "Nachlassender Hautelastizität und Spannkraft",
            "Müder, fahler und erschlaffter Haut",
            "Dem Wunsch nach einem sofortigen Frische- und Straffungseffekt",
        ],
        effect: "Das LuxeLift Facial sorgt für ein sichtbar strafferes, glatteres und frischeres Hautbild. Hochwirksame Peptide unterstützen die Hautfestigkeit, während feuchtigkeitsspendende und antioxidative Wirkstoffe die Haut pflegen und ihre Schutzbarriere stärken.",
        about: "Eine luxuriöse, nicht-invasive Anti-Aging-Gesichtsbehandlung von Circadia. Sie kombiniert ein sanftes Himbeer-Enzympeeling mit einer intensiv straffenden Peptidmaske und regenerierender Abschlusspflege. Das Ergebnis ist ein sofort frischeres, praller und gefestigter wirkendes Hautbild – ohne übliche Ausfallzeit.",
        need: "Straffung, Falten, Lifting-Effekt",
        chatBenefits: ["Straffung", "Peptidmaske", "Frischeres Hautbild"],
    },
    {
        id: "c2o2",
        name: "C2O2 Facial",
        claim: "Klärung & Sauerstoffaktivierung",
        price: 175,
        tags: ["Acne Care", "Purifying", "Oxygen"],
        suitableIntro: "Besonders geeignet für unreine, ölige und zu Akne neigende Haut, insbesondere bei:",
        suitableFor: [
            "Pickeln und entzündlichen Unreinheiten",
            "Verstopften Poren und Mitessern",
            "Übermäßiger Talgproduktion",
            "Fahlem, müdem und belastetem Hautbild",
        ],
        effect: "Das C2O2 Facial unterstützt die Klärung unreiner Haut, hilft überschüssigen Talg zu entfernen und lässt die Poren sauberer erscheinen. Die Haut wirkt nach der Behandlung frischer, ausgeglichener und revitalisiert.",
        about: "Eine professionelle, zweiphasige Gesichtsbehandlung von Circadia, die reinigende Aktivkohle mit einer sauerstoffaktivierenden Behandlung kombiniert. Sie wurde speziell für unreine und zu Akne neigende Haut entwickelt und verbindet intensive Reinigung mit revitalisierender Hautpflege.",
        need: "Akne, Pickel, ölige Haut",
        chatBenefits: ["Klärung", "Sauberere Poren", "Aktivkohle & Sauerstoff"],
    },
    {
        id: "calming",
        name: "Calming Facial",
        claim: "Beruhigung & Hautbalance",
        price: 175,
        tags: ["Sensitive Skin", "Calming", "Barrier Care"],
        suitableIntro: "Ideal für empfindliche, reaktive und zu Rötungen neigende Haut, insbesondere bei:",
        suitableFor: [
            "Rosazea und Couperose",
            "Empfindlicher oder gereizter Haut",
            "Geschwächter Hautschutzbarriere",
            "Spannungsgefühlen und Trockenheit",
            "Entzündlich wirkenden Hautzuständen",
        ],
        effect: "Die Calming-Behandlung hilft, Rötungen und Irritationen optisch zu mildern, spendet intensive Feuchtigkeit und unterstützt die natürliche Hautbarriere. Die Haut fühlt sich beruhigt, geschmeidiger und ausgeglichener an.",
        about: "Eine besonders sanfte, hautberuhigende Gesichtsbehandlung von Circadia, die auf die Bedürfnisse sensibler und gestresster Haut abgestimmt ist. Ausgewählte beruhigende und feuchtigkeitsspendende Wirkstoffe unterstützen die Hautregeneration und sorgen für ein angenehmes, entspanntes Hautgefühl.",
        need: "Rosazea, Rötungen, sensible Haut",
        chatBenefits: ["Beruhigung", "Intensive Feuchtigkeit", "Barrierepflege"],
    },
    {
        id: "radiance-4c",
        name: "Radiance 4C Facial",
        claim: "Vitamin C & Glow",
        price: 175,
        tags: ["Brightening", "Vitamin C", "Radiance"],
        suitableIntro: "Ideal für fahle Haut, Pigmentunregelmäßigkeiten und einen ungleichmäßigen Teint, insbesondere bei:",
        suitableFor: [
            "Pigmentflecken und sonnengeschädigt wirkender Haut",
            "Ungleichmäßigem Hautton",
            "Müder, glanzloser Haut",
            "Ersten feinen Linien",
            "Dem Wunsch nach mehr Leuchtkraft und einem ebenmäßigeren Hautbild",
        ],
        effect: "Vier verschiedene Vitamin-C-Formen unterstützen einen strahlenderen, ebenmäßigeren Teint. Antioxidative Wirkstoffe helfen, die Haut vor oxidativem Stress zu schützen, während die Haut frischer, glatter und vitaler erscheint.",
        about: "Eine intensive, antioxidative Vitamin-C-Gesichtsbehandlung von Circadia. Die Kombination aus vier hochwirksamen Vitamin-C-Formen und ergänzenden Pflegewirkstoffen wurde entwickelt, um fahler Haut neue Leuchtkraft zu verleihen und das Erscheinungsbild von Pigmentunregelmäßigkeiten und feinen Linien zu verbessern.",
        need: "Pigmentflecken, fahle Haut, Glow",
        chatBenefits: ["Vier Vitamin-C-Formen", "Ebenmäßiger Teint", "Glow"],
    },
    {
        id: "switch",
        name: "SWiCH™ Treatment",
        claim: "Intensive Hautregeneration",
        price: 649,
        priceNote: "3er-Kur inkl. Nachbehandlung",
        tags: ["Skin Rejuvenation", "Regeneration", "Age Management"],
        suitableIntro: "Besonders geeignet für reife und anspruchsvolle Haut, häufig ab etwa 35 Jahren, insbesondere bei:",
        suitableFor: [
            "Sichtbaren Zeichen der Hautalterung",
            "Feinen Linien und Falten",
            "Nachlassender Elastizität und Spannkraft",
            "Fahler und müder Haut",
            "Pigmentunregelmäßigkeiten",
        ],
        effect: "SWiCH™ unterstützt die natürlichen Regenerationsprozesse der Haut und zielt darauf ab, ihre Vitalität und ihr Erscheinungsbild langfristig zu verbessern. Die Haut kann bei wiederholter Anwendung glatter, frischer und ebenmäßiger wirken.",
        about: "Eine innovative, professionelle Hautverjüngungsbehandlung von Circadia, die als Alternative zu klassischen chemischen Peelings entwickelt wurde. Anstatt auf eine starke oberflächliche Abschälung zu setzen, nutzt das Behandlungskonzept die natürlichen Reparatur- und Erneuerungsmechanismen der Haut. Die Behandlung eignet sich besonders als gezielte Kur für anspruchsvolle Haut. Eine individuelle Hautbeurteilung und die passende Vor- und Nachpflege sind dabei wichtig.",
        need: "Reife Haut, intensive Regeneration",
        chatBenefits: ["Intensive Regeneration", "Alternative zum chemischen Peeling", "Für reife Haut"],
    },
];

export const PREMIUM_FACIALS_PRICE_FROM = Math.min(...PREMIUM_FACIALS.map((f) => f.price));

export const PREMIUM_FACIALS_PRICE_TEXT = PREMIUM_FACIALS.map(
    (f) => `${f.name} ${f.price} €${f.priceNote ? ` (${f.priceNote})` : ""}`
).join(", ");

export const PREMIUM_FACIALS_OFFERS = PREMIUM_FACIALS.map((f) => ({
    "@type": "Offer",
    name: f.priceNote ? `${f.name} – ${f.priceNote}` : f.name,
    description: f.effect,
    price: String(f.price),
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
}));
