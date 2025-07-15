export const LISA_KNOWLEDGE = {
    identity: {
        name: "Lisa",
        role: "Ihre persönliche KI-Beauty-Beraterin bei SkinLux",
        personality: "Freundlich, kompetent, einfühlsam und professionell",
        language: "Deutsch (Sie-Form)",
    },

    studio: {
        name: "SkinLux",
        slogan: "Medical Beauty Studio",
        location: "Pottendorf, Niederösterreich",
        address: "Dr. Heinz-Fischer-Straße 3/2, 2486 Pottendorf",
        phone: "+43 664 91 88 632",
        email: "hey@skinlux.at",
        website: "www.skinlux.at",
        founded: "2020",
        team: [
            { name: "Ebru Bicer", role: "Inhaberin", expertise: "Erfahrene Unternehmerin und Beauty-Expertin" },
            { name: "Can Bicer", role: "Technik & Marketing", expertise: "Spezialist für Technologie und digitale Lösungen" },
            { name: "Lucia", role: "Laser Spezialistin", expertise: "Zertifizierte Expertin für Laserbehandlungen" }
        ],
        philosophy: "Wir kombinieren modernste Technologie mit persönlicher Betreuung für optimale Ergebnisse",
        certifications: [
            "Zertifiziertes Medical Beauty Studio",
            "FDA-zugelassene Laser-Technologie",
            "Regelmäßige Schulungen und Weiterbildungen",
            "Höchste Hygienestandards"
        ],
        specialFeatures: [
            "Kostenlose Erstberatung",
            "Kostenlose Laser-Probebehandlung",
            "Individuelle Behandlungspläne",
            "Modernste Diodenlaser-Technologie",
            "Schmerzarme Behandlungen",
            "Flexible Terminvereinbarung",
            "Zentrale Lage mit Parkmöglichkeiten"
        ]
    },

    treatments: {
        laserHaarentfernung: {
            name: "Laser-Haarentfernung",
            description: "Dauerhafte Haarentfernung mit modernster Diodenlaser-Technologie. Alle Preise verstehen sich pro Behandlung.",
            benefits: [
                "Dauerhaft glatte Haut",
                "Für alle Hauttypen geeignet",
                "Schmerzarm und effektiv",
                "FDA-zugelassen",
                "Kostenlose Erstberatung und Probebehandlung"
            ],
            sessions: "6-8 Behandlungen im Abstand von 4-6 Wochen",
            damenPreise: {
                gesicht: {
                    oberlippe: { dauer: "-", preis: "30€" },
                    kinn: { dauer: "-", preis: "30€" },
                    wangen: { dauer: "-", preis: "30€" },
                    stirn: { dauer: "-", preis: "30€" },
                    gesicht_komplett: { dauer: "-", preis: "85€" }
                },
                hals: { dauer: "-", preis: "30€" },
                achseln: { dauer: "-", preis: "50€" },
                unterarme: { dauer: "-", preis: "55€" },
                oberarme: { dauer: "-", preis: "55€" },
                arme_komplett: { dauer: "-", preis: "80€" },
                bauch: { dauer: "-", preis: "55€" },
                ruecken: { dauer: "-", preis: "85€" },
                bikinizone: { dauer: "-", preis: "55€" },
                intim_komplett: { dauer: "-", preis: "80€" },
                intim_komplett_bikini_pofalte: { dauer: "-", preis: "95€" },
                pofalte: { dauer: "-", preis: "35€" },
                po: { dauer: "-", preis: "60€" },
                unterschenkel: { dauer: "-", preis: "95€" },
                oberschenkel: { dauer: "-", preis: "95€" },
                beine_komplett: { dauer: "-", preis: "150€" },
                haende: { dauer: "-", preis: "30€" },
                dekollete: { dauer: "-", preis: "35€" },
                fuesse: { dauer: "-", preis: "30€" },
                bauchstreifen: { dauer: "-", preis: "30€" },
                pobacken: { dauer: "-", preis: "45€" },
                nacken: { dauer: "-", preis: "30€" },
            },
            pakete: {
                small: {
                    name: "Paket Small",
                    preis: "200€",
                    inhalt: ["Achseln", "Unterschenkel", "Intim + Bikini inkl. Pofalte"]
                },
                medium: {
                    name: "Paket Medium",
                    preis: "250€",
                    inhalt: ["Achseln", "Beine komplett", "Intim + Bikini inkl. Pofalte"],
                    beliebt: true
                },
                large: {
                    name: "Paket Large",
                    preis: "350€",
                    inhalt: ["Achseln", "Beine komplett", "Gesicht komplett", "Unterarme", "Intim + Bikini inkl. Pofalte"]
                }
            },
            herrenPreise: {
                hals: { dauer: "-", preis: "40€" },
                achseln: { dauer: "-", preis: "55€" },
                unterarme: { dauer: "-", preis: "60€" },
                oberarme: { dauer: "-", preis: "60€" },
                arme_komplett: { dauer: "-", preis: "90€" },
                brust: { dauer: "-", preis: "80€" },
                bauch: { dauer: "-", preis: "60€" },
                schultern: { dauer: "-", preis: "50€" },
                ruecken: { dauer: "-", preis: "90€" },
                unterschenkel: { dauer: "-", preis: "120€" },
                oberschenkel: { dauer: "-", preis: "120€" },
                beine_komplett: { dauer: "-", preis: "180€" },
                bartkontur: { dauer: "-", preis: "40€" },
                nacken: { dauer: "-", preis: "40€" },
                po: { dauer: "-", preis: "65€" },
                fuesse: { dauer: "-", preis: "40€" },
                gesicht_komplett: { dauer: "-", preis: "100€" }
            }
        },

        hydraFacial: {
            name: "HydraFacial®",
            description: "Die weltweit führende 3-in-1 Gesichtsbehandlung",
            types: [
                {
                    name: "HydraFacial® Signature",
                    duration: "30 Minuten",
                    price: "169€",
                    description: "Basis-Behandlung - Sanfte, aber effektive Behandlung zur porentiefen Reinigung, Entfernung abgestorbener Hautzellen und Versorgung mit Feuchtigkeit.",
                    steps: ["Cleanse + Peel", "Extract + Hydrate", "Fuse + Protect"]
                },
                {
                    name: "HydraFacial® Signature + LED",
                    duration: "50 Minuten",
                    price: "189€",
                    description: "Mit LED-Therapie - Die klassische HydraFacial-Tiefenreinigung kombiniert mit beruhigendem Blaulicht – ideal bei unreiner, gestresster Haut.",
                    includes: ["Alles aus Signature", "LED-Lichttherapie", "Antibakteriell"]
                },
                {
                    name: "HydraFacial® Deluxe",
                    duration: "50 Minuten",
                    price: "259€",
                    description: "Premium Experience - Diese erweiterte HydraFacial-Behandlung kombiniert intensive Reinigung mit einer auf Ihre Hautbedürfnisse abgestimmten Wirkstoff-Infusion.",
                    includes: ["Alles aus Signature", "Individuelle Wirkstoff-Infusion", "LED-Lichttherapie"],
                    popular: true
                },
                {
                    name: "HydraFacial® Platinum",
                    duration: "60 Minuten",
                    price: "289€",
                    description: "Luxus-Experience - Das ultimative HydraFacial-Erlebnis für maximale Ergebnisse."
                }
            ],
            benefits: [
                "Sofort sichtbare Ergebnisse",
                "Keine Ausfallzeit",
                "Für alle Hauttypen",
                "Tiefenreinigung und Hydration"
            ]
        },

        premiumFacials: {
            name: "Premium Facials",
            description: "Exklusive Gesichtsbehandlungen mit Circadia Professional",
            types: [
                {
                    name: "Anti-Aging Facial",
                    duration: "75 Min",
                    price: "129€",
                    benefits: ["Faltenreduktion", "Straffung", "Regeneration"]
                },
                {
                    name: "Hydrating Facial",
                    duration: "60 Min",
                    price: "99€",
                    benefits: ["Intensive Feuchtigkeit", "Beruhigung", "Glow-Effekt"]
                },
                {
                    name: "Purifying Facial",
                    duration: "60 Min",
                    price: "99€",
                    benefits: ["Tiefenreinigung", "Porenverfeinerung", "Klärung"]
                }
            ]
        }
    },

    faqs: [
        {
            question: "Ist die Laser-Haarentfernung schmerzhaft?",
            answer: "Die moderne Diodenlaser-Technologie ist sehr schmerzarm. Die meisten Kunden beschreiben es als leichtes Kribbeln oder Wärmegefühl. Die integrierte Kühlung macht die Behandlung sehr angenehm."
        },
        {
            question: "Wie viele Behandlungen brauche ich?",
            answer: "Für dauerhafte Ergebnisse sind normalerweise 6-8 Behandlungen im Abstand von 4-6 Wochen nötig. Die genaue Anzahl hängt von Hauttyp, Haarfarbe und behandelter Zone ab."
        },
        {
            question: "Kann ich eine kostenlose Probebehandlung machen?",
            answer: "Ja! Wir bieten eine kostenlose Laser-Probebehandlung an. So können Sie die Technologie unverbindlich testen."
        },
        {
            question: "Wie bereite ich mich auf die Behandlung vor?",
            answer: "24 Stunden vor der Behandlung rasieren, nicht epilieren oder wachsen. Keine Selbstbräuner verwenden und direkte Sonne 2 Wochen vorher meiden."
        },
        {
            question: "Gibt es Nebenwirkungen?",
            answer: "Leichte Rötungen oder Schwellungen können auftreten, verschwinden aber innerhalb weniger Stunden. Unsere Experten beraten Sie ausführlich."
        },
        {
            question: "Für welche Hauttypen ist die Behandlung geeignet?",
            answer: "Unsere moderne Diodenlaser-Technologie ist für alle Hauttypen geeignet. In der kostenlosen Erstberatung analysieren wir Ihren Hauttyp genau."
        },
        {
            question: "Wie lange hält das Ergebnis?",
            answer: "Nach Abschluss der Behandlungsserie ist das Ergebnis dauerhaft. Vereinzelt können nach Jahren einzelne Härchen nachwachsen, diese können mit Auffrischungsbehandlungen entfernt werden."
        },
        {
            question: "Kann ich zwischen den Behandlungen rasieren?",
            answer: "Ja, das Rasieren zwischen den Behandlungen ist sogar erwünscht. Nur Epilieren, Wachsen oder Zupfen sollten Sie vermeiden."
        }
    ],

    additionalInfo: {
        whyChooseSkinLux: [
            "Über 3 Jahre Erfahrung mit zufriedenen Kunden",
            "Modernste FDA-zugelassene Technologie",
            "Individuell angepasste Behandlungspläne",
            "Transparente Preise ohne versteckte Kosten",
            "Zentrale Lage in Pottendorf",
            "Flexible Terminvereinbarung auch am Samstag",
            "Höchste Hygienestandards",
            "Regelmäßige Fortbildungen des Teams"
        ],
        treatmentProcess: {
            laser: [
                "1. Kostenlose Erstberatung mit Hautanalyse",
                "2. Individuelle Behandlungsplanung",
                "3. Kostenlose Probebehandlung",
                "4. Start der Behandlungsserie",
                "5. Regelmäßige Fortschrittskontrolle",
                "6. Nachsorge und Pflegetipps"
            ],
            hydrafacial: [
                "1. Hautanalyse und Beratung",
                "2. Tiefenreinigung und Peeling",
                "3. Sanfte Extraktion",
                "4. Intensive Hydration",
                "5. Wirkstoff-Infusion",
                "6. LED-Therapie (bei Deluxe/Platinum)"
            ]
        },
        paymentOptions: [
            "Barzahlung",
            "Bankomatkarte",
            "Ratenzahlung möglich",
            "Geschenkgutscheine verfügbar"
        ],
        parkingInfo: "Kostenlose Parkplätze direkt vor dem Studio verfügbar. Auch mit öffentlichen Verkehrsmitteln gut erreichbar.",
        covidMeasures: "Wir achten auf höchste Hygienestandards mit regelmäßiger Desinfektion, Luftreinigung und individuellen Behandlungszeiten."
    },

    booking: {
        online: "https://connect.shore.com/bookings/skinlux/services?locale=de&origin=standalone",
        phone: "+43 660 57 21 403",
        hours: {
            monday: "Geschlossen",
            tuesday: "09:00 - 18:00",
            wednesday: "09:00 - 18:00",
            thursday: "09:00 - 18:00",
            friday: "09:00 - 18:00",
            saturday: "09:00 - 14:00",
            sunday: "Geschlossen"
        }
    },

    // Intelligentes Hautanalyse-Quiz System
    skinAnalysisQuiz: {
        introduction: "Lassen Sie uns Ihre perfekte Behandlung finden! Mit wenigen Fragen erstelle ich Ihnen eine personalisierte Empfehlung.",

        questions: [
            {
                id: "skin_concern",
                question: "Was beschreibt Ihr Hauptanliegen am besten?",
                type: "single_choice",
                options: [
                    { value: "acne", label: "Unreine Haut & Mitesser", keywords: ["unrein", "pickel", "mitesser", "akne"] },
                    { value: "aging", label: "Falten & Anti-Aging", keywords: ["falten", "aging", "alter", "straffen"] },
                    { value: "dryness", label: "Trockene & dehydrierte Haut", keywords: ["trocken", "dehydriert", "feuchtigkeit"] },
                    { value: "pigmentation", label: "Pigmentflecken & ungleichmäßiger Teint", keywords: ["pigment", "flecken", "teint"] },
                    { value: "scars", label: "Aknenarben & Hautstruktur", keywords: ["narben", "struktur", "unebenheit"] },
                    { value: "hair_removal", label: "Unerwünschte Körperbehaarung", keywords: ["haare", "haarentfernung", "laser"] },
                    { value: "general", label: "Allgemeine Hautpflege & Prävention", keywords: ["pflege", "prävention", "gesund"] }
                ]
            },
            {
                id: "skin_type",
                question: "Wie würden Sie Ihren Hauttyp beschreiben?",
                type: "single_choice",
                options: [
                    { value: "oily", label: "Fettige Haut (glänzt schnell)", keywords: ["fettig", "ölig", "glänzend"] },
                    { value: "dry", label: "Trockene Haut (spannt oft)", keywords: ["trocken", "spannt", "rau"] },
                    { value: "combination", label: "Mischhaut (T-Zone fettig, Wangen trocken)", keywords: ["misch", "kombination"] },
                    { value: "sensitive", label: "Empfindliche Haut (reagiert schnell)", keywords: ["empfindlich", "sensibel", "reaktiv"] },
                    { value: "normal", label: "Normale Haut (ausgeglichen)", keywords: ["normal", "ausgeglichen"] },
                    { value: "unsure", label: "Ich bin mir nicht sicher", keywords: ["unsicher", "weiß nicht"] }
                ]
            },
            {
                id: "treatment_goal",
                question: "Was ist Ihr wichtigstes Behandlungsziel?",
                type: "single_choice",
                options: [
                    { value: "immediate", label: "Sofortige sichtbare Ergebnisse", keywords: ["sofort", "schnell", "event"] },
                    { value: "long_term", label: "Langfristige Hautverbesserung", keywords: ["langfristig", "dauerhaft", "nachhaltg"] },
                    { value: "maintenance", label: "Hautpflege & Erhaltung", keywords: ["pflege", "erhaltung", "maintenance"] },
                    { value: "specific", label: "Spezifisches Problem lösen", keywords: ["problem", "spezifisch", "gezielt"] },
                    { value: "relaxation", label: "Entspannung & Wellness", keywords: ["entspannung", "wellness", "relax"] }
                ]
            },
            {
                id: "time_budget",
                question: "Wie viel Zeit können Sie für eine Behandlung einplanen?",
                type: "single_choice",
                options: [
                    { value: "30min", label: "30 Minuten - kurz und effektiv", keywords: ["kurz", "schnell", "30"] },
                    { value: "60min", label: "60 Minuten - ausgewogene Behandlung", keywords: ["60", "eine stunde"] },
                    { value: "90min", label: "90+ Minuten - intensive Behandlung", keywords: ["90", "ausführlich", "intensiv"] },
                    { value: "flexible", label: "Flexibel - das Beste für meine Haut", keywords: ["flexibel", "egal", "optimal"] }
                ]
            },
            {
                id: "budget_range",
                question: "In welchem Preisbereich dürfen wir Ihnen Behandlungen vorschlagen?",
                type: "single_choice",
                options: [
                    { value: "budget", label: "Bis 150€ - bewusste Auswahl", keywords: ["günstig", "budget", "150"] },
                    { value: "standard", label: "150€ - 250€ - beliebte Behandlungen", keywords: ["mittel", "standard", "200"] },
                    { value: "premium", label: "250€+ - Premium Erlebnis", keywords: ["premium", "luxus", "teuer"] },
                    { value: "no_limit", label: "Preis spielt keine Rolle - nur das Beste", keywords: ["egal", "bestes", "luxury"] }
                ]
            }
        ],

        // Intelligente Behandlungsempfehlungen basierend auf Quiz-Antworten
        recommendations: {
            // Budget-bewusste Empfehlungen (höchste Priorität)
            budget_conscious: {
                condition: (answers: Record<string, string>) => answers.budget_range === "budget",
                priority: 1,
                treatments: [
                    {
                        name: "Kostenlose Hautanalyse",
                        subtitle: "Der perfekte Start für Ihre Hautreise",
                        description: "Professionelle Hautanalyse und individuelle Beratung - kostenfrei und unverbindlich. Ideal um herauszufinden, welche Behandlung perfekt zu Ihnen passt.",
                        benefits: ["Professionelle Analyse", "Kostenlos", "Individuelle Beratung", "Unverbindlich"],
                        price: "kostenlos",
                        duration: "30 Min",
                        bookingAction: "consultation"
                    },
                    {
                        name: "Hydrating Facial",
                        subtitle: "Intensive Feuchtigkeitspflege",
                        description: "60 Minuten entspannende Gesichtsbehandlung mit Circadia Professional. Perfekt für alle Hauttypen und im Budget.",
                        benefits: ["Intensive Feuchtigkeit", "Beruhigung", "Glow-Effekt", "Entspannung"],
                        price: "99€",
                        duration: "60 Min",
                        bookingAction: "facial"
                    },
                    {
                        name: "Anti-Aging Facial",
                        subtitle: "Premium Anti-Aging im Budget",
                        description: "75 Minuten Anti-Aging Behandlung mit hochwertigen Wirkstoffen. Das beste Preis-Leistungs-Verhältnis für sichtbare Ergebnisse.",
                        benefits: ["Faltenreduktion", "Straffung", "75 Min Luxus", "Exzellentes Preis-Leistungs-Verhältnis"],
                        price: "129€",
                        duration: "75 Min",
                        bookingAction: "facial"
                    }
                ]
            },

            // Laser-Haarentfernung
            hair_removal: {
                condition: (answers: Record<string, string>) => answers.skin_concern === "hair_removal",
                priority: 2,
                treatments: [
                    {
                        name: "Laser-Haarentfernung",
                        subtitle: "Dauerhafte Lösung für unerwünschte Haare",
                        description: "Modernste Diodenlaser-Technologie für alle Hauttypen. Schmerzarm und dauerhaft effektiv.",
                        benefits: ["Dauerhafte Ergebnisse", "Für alle Hauttypen", "Kostenlose Probebehandlung"],
                        price: "ab 35€",
                        duration: "15-60 Min je nach Zone",
                        bookingAction: "laser"
                    }
                ]
            },

            // HydraFacial Empfehlungen (nur wenn Budget erlaubt)
            immediate_results: {
                condition: (answers: Record<string, string>) =>
                    (answers.treatment_goal === "immediate" || answers.skin_concern === "acne" || answers.skin_concern === "general")
                    && answers.budget_range !== "budget",
                priority: 3,
                treatments: [
                    {
                        name: "HydraFacial® Signature",
                        subtitle: "Sofort strahlende Haut",
                        description: "Die beliebteste Behandlung für sofortige Ergebnisse. Reinigung, Extraktion und Hydration in einem.",
                        benefits: ["Sofort sichtbar", "Keine Ausfallzeit", "Für alle Hauttypen"],
                        price: "169€",
                        duration: "30 Min",
                        bookingAction: "hydrafacial"
                    },
                    {
                        name: "HydraFacial® Signature + LED",
                        subtitle: "Mit antibakterieller LED-Therapie",
                        description: "Perfekt bei unreiner Haut. Mit beruhigendem LED-Licht gegen Bakterien und Entzündungen.",
                        benefits: ["Anti-bakteriell", "Beruhigend", "Sofort besser"],
                        price: "189€",
                        duration: "50 Min",
                        bookingAction: "hydrafacial"
                    }
                ]
            },

            // Premium Facials
            anti_aging: {
                condition: (answers: Record<string, string>) =>
                    answers.skin_concern === "aging" || (answers.time_budget === "90min" && answers.treatment_goal === "long_term"),
                priority: 4,
                treatments: [
                    {
                        name: "Anti-Aging Facial",
                        subtitle: "Intensive Faltenreduktion",
                        description: "75 Minuten pure Anti-Aging Pflege mit Circadia Professional. Für straffere und jünger wirkende Haut.",
                        benefits: ["Faltenreduktion", "Straffung", "Regeneration"],
                        price: "129€",
                        duration: "75 Min",
                        bookingAction: "facial"
                    },
                    {
                        name: "HydraFacial® Deluxe",
                        subtitle: "Premium Anti-Aging Experience",
                        description: "Mit individueller Wirkstoff-Infusion speziell für Anti-Aging. Das Beste aus beiden Welten.",
                        benefits: ["Individuelle Wirkstoffe", "LED-Therapie", "Premium Erlebnis"],
                        price: "259€",
                        duration: "50 Min",
                        bookingAction: "hydrafacial"
                    }
                ]
            },

            // Hydrating Treatments
            dry_skin: {
                condition: (answers: Record<string, string>) => answers.skin_concern === "dryness" || answers.skin_type === "dry",
                priority: 5,
                treatments: [
                    {
                        name: "Hydrating Facial",
                        subtitle: "Intensive Feuchtigkeitspflege",
                        description: "60 Minuten pure Hydration für trockene und dehydrierte Haut. Mit beruhigenden Wirkstoffen.",
                        benefits: ["Intensive Feuchtigkeit", "Beruhigung", "Glow-Effekt"],
                        price: "99€",
                        duration: "60 Min",
                        bookingAction: "facial"
                    },
                    {
                        name: "HydraFacial® Signature",
                        subtitle: "Hydration auf höchstem Niveau",
                        description: "Perfekt für dehydrierte Haut. Bis zu 28 Tage verbesserte Hautfeuchtigkeit garantiert.",
                        benefits: ["+200% Hydration", "Sofort spürbar", "Langanhaltend"],
                        price: "169€",
                        duration: "30 Min",
                        bookingAction: "hydrafacial"
                    }
                ]
            },

            // Purifying Treatments
            acne_skin: {
                condition: (answers: Record<string, string>) => answers.skin_concern === "acne" || answers.skin_type === "oily",
                priority: 6,
                treatments: [
                    {
                        name: "Purifying Facial",
                        subtitle: "Tiefenreinigung für unreine Haut",
                        description: "Spezielle Behandlung für unreine und fettige Haut. Porenverfeinerung und Klärung des Hautbildes.",
                        benefits: ["Tiefenreinigung", "Porenverfeinerung", "Klärung"],
                        price: "99€",
                        duration: "60 Min",
                        bookingAction: "facial"
                    },
                    {
                        name: "HydraFacial® Signature + LED",
                        subtitle: "Mit antibakterieller Therapie",
                        description: "Ideal bei unreiner Haut. LED-Therapie wirkt antibakteriell und beruhigend.",
                        benefits: ["Extraktion ohne Schmerz", "Antibakteriell", "Beruhigend"],
                        price: "189€",
                        duration: "50 Min",
                        bookingAction: "hydrafacial"
                    }
                ]
            },

            // Microneedling für Narben
            acne_scars: {
                condition: (answers: Record<string, string>) => answers.skin_concern === "scars",
                priority: 7,
                treatments: [
                    {
                        name: "Microneedling",
                        subtitle: "Kollagen-Induktions-Therapie",
                        description: "Effektive Behandlung von Aknenarben und Hautunregelmäßigkeiten. Aktiviert natürliche Kollagenproduktion.",
                        benefits: ["300% mehr Kollagen", "Narbenreduktion", "Langzeiteffekt"],
                        price: "auf Anfrage",
                        duration: "60 Min",
                        bookingAction: "consultation"
                    }
                ]
            },

            // Pigmentflecken
            pigmentation: {
                condition: (answers: Record<string, string>) => answers.skin_concern === "pigmentation",
                priority: 8,
                treatments: [
                    {
                        name: "HydraFacial® Deluxe",
                        subtitle: "Mit aufhellenden Wirkstoffen",
                        description: "Spezielle Wirkstoff-Infusion gegen Pigmentflecken. Für einen gleichmäßigeren Teint.",
                        benefits: ["Individuelle Wirkstoffe", "Teint-Verbesserung", "LED-Therapie"],
                        price: "259€",
                        duration: "50 Min",
                        bookingAction: "hydrafacial"
                    }
                ]
            },

            // Premium Empfehlungen für hohes Budget
            premium_experience: {
                condition: (answers: Record<string, string>) => answers.budget_range === "premium" || answers.budget_range === "no_limit",
                priority: 9,
                treatments: [
                    {
                        name: "HydraFacial® Platinum",
                        subtitle: "Das ultimative Luxury-Erlebnis",
                        description: "60 Minuten Luxus mit Lymphdrainage und allen Premium-Features. Das Beste was wir anbieten.",
                        benefits: ["Lymphdrainage", "Maximale Regeneration", "Luxus-Erlebnis"],
                        price: "289€",
                        duration: "60 Min",
                        bookingAction: "hydrafacial"
                    }
                ]
            }
        },

        // Fallback für unklare Fälle
        defaultRecommendation: {
            name: "Kostenlose Hautanalyse",
            subtitle: "Der perfekte Start für Ihre Hautreise",
            description: "Lassen Sie uns in einer kostenlosen Beratung Ihre Haut analysieren und den perfekten Behandlungsplan erstellen.",
            benefits: ["Professionelle Analyse", "Kostenlos", "Individuelle Beratung"],
            price: "kostenlos",
            duration: "30 Min",
            bookingAction: "consultation"
        }
    }
};

export const LISA_SYSTEM_PROMPT = `
Du bist Lisa, die persönliche KI-Beauty-Beraterin von SkinLux in Pottendorf.

Deine Eigenschaften:
- Freundlich, kompetent und einfühlsam
- Verwendest die Sie-Form
- Antwortest auf Deutsch
- Bist Expertin für Beauty-Behandlungen

Deine Aufgaben:
1. Berate Kunden zu passenden Behandlungen
2. Beantworte Fragen zu Preisen und Ablauf
3. Empfehle basierend auf Hauttyp und Bedürfnissen
4. Leite zur Terminbuchung weiter
5. Bleibe immer professionell und hilfsbereit

EXTREM WICHTIGE REGELN:
⚠️ ABSOLUTES VERBOT: NIEMALS Preise erfinden oder von anderen Behandlungen übernehmen!
⚠️ Wenn ein Preis NICHT in der Liste steht, sage KLAR: "Für diese Zone haben wir keine spezifischen Preise hinterlegt. Bitte kontaktieren Sie uns für ein individuelles Angebot."

LASER-PREISE DAMEN (Einzelbehandlung):
- Gesicht: Wangen 35€, Kinn 35€, Oberlippe 35€, Hals 45€, Gesicht komplett 99€
- Arme: Achseln 55€, Oberarme 45€, Unterarme 55€, Arme komplett 80€
- Intim: Bikini 60€, Intim komplett 80€, Intim+Bikini+Pofalte 100€, Po 60€, Pofalte 35€
- Beine: Oberschenkel 95€, Unterschenkel 95€, Beine komplett 180€
- Körper: Bauch 65€, Rücken 95€
- PAKETE: Small 200€, Medium 270€, Large 390€

LASER-PREISE HERREN (Einzelbehandlung):
- Gesicht: Hals 45€, Bartkontur 50€, Nacken 50€
- Arme: Achseln 55€, Oberarme 50€, Unterarme 65€, Arme komplett 95€
- Körper: Bauch 65€, Brust 80€, Schultern 50€, Rücken komplett 95€, Po gesamt 85€
- Beine: Oberschenkel 120€, Unterschenkel 120€, Beine komplett 230€, Füße 40€
- INTIMBEREICH HERREN: KEINE PREISE VERFÜGBAR - Individuelle Beratung erforderlich!

HYDRAFACIAL-PREISE:
- Signature (30 Min) 169€, Signature+LED (50 Min) 189€, Deluxe (50 Min) 259€, Platinum (60 Min) 289€


WICHTIG: Bei JEDER Preisanfrage für nicht gelistete Zonen: "Für diese spezielle Zone kontaktieren Sie uns bitte für ein individuelles Angebot."

Weitere STRIKTE Regeln:
- Gib nur Informationen aus der Wissensdatenbank
- Bei medizinischen Fragen verweise auf persönliche Beratung
- Keine Diagnosen oder medizinische Beratung
- Betone die Vorteile einer persönlichen Beratung im Studio
- NIEMALS Preise aus anderen Kategorien übernehmen (z.B. Damen-Preise für Herren verwenden)
- Bei Unsicherheit IMMER sagen: "Diese Information habe ich nicht vorliegen, bitte kontaktieren Sie uns direkt."

BEISPIELE FÜR KORREKTE ANTWORTEN:
- "Für den Intimbereich bei Herren haben wir keine standardisierten Preise. Bitte kontaktieren Sie uns für ein individuelles Angebot."
- "Diese spezielle Zone ist nicht in unserer Preisliste. Gerne erstellen wir Ihnen ein persönliches Angebot."
- "Für genaue Informationen zu dieser Behandlung rufen Sie uns bitte an: +43 660 57 21 403"

Nutze die bereitgestellten Informationen über SkinLux für deine Antworten.
`; 