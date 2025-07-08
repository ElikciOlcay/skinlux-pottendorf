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
        location: "Bischofshofen, Pongau, Salzburg",
        address: "Bahnhofstraße 17, 5500 Bischofshofen",
        phone: "+43 660 57 21 403",
        email: "info@skinlux.at",
        website: "www.skinlux.at",
        founded: "2020",
        team: [
            { name: "Gökce", role: "Gründerin & Leiterin", expertise: "Über 10 Jahre Erfahrung in der Beauty-Branche" },
            { name: "Olcay", role: "Marketing & Digitalisierung", expertise: "Spezialist für digitale Prozesse" },
            { name: "Thereza", role: "Laser Expertin", expertise: "Zertifizierte Lasertherapeutin" },
            { name: "Petra", role: "Laser Expertin", expertise: "Spezialisiert auf Hautanalyse und Laserbehandlungen" }
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
                    wangen: { dauer: "15 Min", preis: "35€" },
                    kinn: { dauer: "15 Min", preis: "35€" },
                    oberlippe: { dauer: "15 Min", preis: "35€" },
                    hals: { dauer: "15 Min", preis: "45€" },
                    gesicht_komplett: { dauer: "30 Min", preis: "99€" }
                },
                arme: {
                    achseln: { dauer: "30 Min", preis: "55€" },
                    oberarme: { dauer: "30 Min", preis: "45€" },
                    unterarme: { dauer: "30 Min", preis: "55€" },
                    arme_komplett: { dauer: "1 Std", preis: "80€" }
                },
                intimbereich: {
                    bikini_zone: { dauer: "20 Min", preis: "60€" },
                    intim_komplett: { dauer: "30 Min", preis: "80€" },
                    intim_bikini_pofalte: { dauer: "30 Min", preis: "100€" },
                    po: { dauer: "30 Min", preis: "60€" },
                    pofalte: { dauer: "15 Min", preis: "35€" }
                },
                beine: {
                    oberschenkel: { dauer: "30 Min", preis: "95€" },
                    unterschenkel: { dauer: "1 Std", preis: "95€" },
                    beine_komplett: { dauer: "1 Std", preis: "180€" }
                },
                koerper: {
                    bauch: { dauer: "30 Min", preis: "65€" },
                    ruecken: { dauer: "35 Min", preis: "95€" }
                }
            },
            pakete: {
                small: {
                    name: "Paket Small",
                    preis: "200€",
                    inhalt: ["Achseln", "Unterschenkel", "Intim + Bikini inkl. Pofalte"]
                },
                medium: {
                    name: "Paket Medium",
                    preis: "270€",
                    inhalt: ["Achseln", "Beine komplett", "Intim + Bikini inkl. Pofalte"],
                    beliebt: true
                },
                large: {
                    name: "Paket Large",
                    preis: "390€",
                    inhalt: ["Achseln", "Beine komplett", "Gesicht komplett", "Unterarme", "Intim + Bikini inkl. Pofalte"]
                }
            },
            herrenPreise: {
                gesicht: {
                    hals: { dauer: "15 Min", preis: "45€" },
                    bartkontur: { dauer: "30 Min", preis: "50€" },
                    nacken: { dauer: "20 Min", preis: "50€" }
                },
                arme: {
                    achseln: { dauer: "20 Min", preis: "55€" },
                    oberarme: { dauer: "30 Min", preis: "50€" },
                    unterarme: { dauer: "30 Min", preis: "65€" },
                    arme_komplett: { dauer: "1 Std", preis: "95€" }
                },
                koerper: {
                    bauch: { dauer: "30 Min", preis: "65€" },
                    brust: { dauer: "30 Min", preis: "80€" },
                    schultern: { dauer: "30 Min", preis: "50€" },
                    ruecken_komplett: { dauer: "45 Min", preis: "95€" },
                    po_gesamt: { dauer: "30 Min", preis: "85€" }
                },
                beine: {
                    oberschenkel: { dauer: "1 Std", preis: "120€" },
                    unterschenkel: { dauer: "1 Std", preis: "120€" },
                    beine_komplett: { dauer: "1 Std 15 Min", preis: "230€" },
                    fuesse: { dauer: "20 Min", preis: "40€" }
                }
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
            "Zentrale Lage in Bischofshofen",
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
    }
};

export const LISA_SYSTEM_PROMPT = `
Du bist Lisa, die persönliche KI-Beauty-Beraterin von SkinLux in Bischofshofen.

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