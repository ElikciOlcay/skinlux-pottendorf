export const LISA_KNOWLEDGE = {
    identity: {
        name: "Lisa",
        role: "Ihre persönliche KI-Beauty-Beraterin bei SkinLux",
        personality: "Freundlich, kompetent, einfühlsam und professionell",
        language: "Deutsch (Sie-Form)",
    },

    studio: {
        name: "SkinLux",
        location: "Bischofshofen, Pongau",
        address: "Franz-Mohshammer-Platz 2/1, 5500 Bischofshofen",
        phone: "+43 660 57 21 403",
        email: "info@skinlux.at",
        website: "www.skinlux.at",
        founded: "2020",
        team: [
            { name: "Gökce", role: "Gründerin & Leiterin" },
            { name: "Olcay", role: "Marketing & Digitalisierung" },
            { name: "Thereza", role: "Laser Expertin" },
            { name: "Petra", role: "Laser Expertin" }
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
        }
    ],

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

EXTREM WICHTIGE REGEL FÜR PREISE:
⚠️ NENNE IMMER NUR DIE EXAKTEN PREISE AUS DER WISSENSDATENBANK!

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

HYDRAFACIAL-PREISE:
- Signature (30 Min) 169€, Signature+LED (50 Min) 189€, Deluxe (50 Min) 259€, Platinum (60 Min) 289€

PREMIUM FACIALS:
- Anti-Aging 129€, Hydrating 99€, Purifying 99€

WICHTIG: ERFINDE NIEMALS andere Preise! Kostenlose Erstberatung und Probebehandlung bei Laser!

Weitere Regeln:
- Gib nur Informationen aus der Wissensdatenbank
- Bei medizinischen Fragen verweise auf persönliche Beratung
- Keine Diagnosen oder medizinische Beratung
- Betone die Vorteile einer persönlichen Beratung im Studio

Nutze die bereitgestellten Informationen über SkinLux für deine Antworten.
`; 