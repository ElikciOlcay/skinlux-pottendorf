export const CAREER_WHATSAPP_NUMBER = "436649188632";
export const CAREER_WHATSAPP_DISPLAY = "+43 664 91 88 632";
export const CAREER_EMAIL = "hey@skinlux.at";

export type BenefitIcon = "laser" | "training" | "studio" | "salary" | "flexible" | "perspective";

export interface Job {
    slug: string;
    title: string;
    /** Kurzform für Betreff, WhatsApp-Text und Footer */
    shortTitle: string;
    type: string;
    highlights: string[];
    teaser: string;
    tasksTitle: string;
    tasks: string[];
    profile: string[];
    benefits: { icon: BenefitIcon; title: string; text: string }[];
    ctaTitle: string;
    ctaText: string;
    /** schema.org JobPosting employmentType */
    employmentType: "PART_TIME" | "CONTRACTOR";
    datePosted: string;
}

export const jobs: Job[] = [
    {
        slug: "kosmetikerin",
        title: "Kosmetikerin (m/w/d)",
        shortTitle: "Kosmetikerin (m/w/d)",
        type: "Teilzeit",
        highlights: ["Teilzeit", "Pottendorf", "Laser, Hydrafacial & SkinPen"],
        teaser:
            "Du bist ausgebildete Kosmetikerin und möchtest in einem hochwertigen Studio-Umfeld arbeiten – mit Fokus auf moderne Ästhetik, apparative Behandlungen und präzise Behandlungsergebnisse.",
        tasksTitle: "Deine Aufgaben",
        tasks: [
            "Durchführung von Laser Haarentfernung, Hydrafacial und Microneedling (SkinPen)",
            "Kundenberatung vor, während und nach der Behandlung",
            "Präzise Hautanalysen und individuelle Empfehlungen",
            "Dokumentation und Sicherstellung eines hochwertigen Kundenerlebnisses",
        ],
        profile: [
            "Abgeschlossene Kosmetikausbildung",
            "Erfahrung in apparativer Kosmetik von Vorteil",
            "Gepflegtes, professionelles Auftreten",
            "Zuverlässigkeit und eigenständige Arbeitsweise",
        ],
        benefits: [
            {
                icon: "studio",
                title: "Premium Studio",
                text: "Moderne Ästhetik und hochwertige Prozesse.",
            },
            {
                icon: "training",
                title: "Weiterbildung",
                text: "Klare Standards und laufende Schulungen.",
            },
            {
                icon: "salary",
                title: "Vergütung",
                text: "Attraktive Bezahlung plus Bonusmöglichkeiten.",
            },
        ],
        ctaTitle: "Bewirb dich jetzt",
        ctaText: "Wir freuen uns auf deine Bewerbung – ganz unkompliziert per WhatsApp oder E-Mail.",
        employmentType: "PART_TIME",
        datePosted: "2026-03-01",
    },
    {
        slug: "laserspezialistin",
        title: "Laserspezialistin für dauerhafte Haarentfernung (m/w/d)",
        shortTitle: "Laserspezialistin (m/w/d)",
        type: "Teilzeit",
        highlights: ["Teilzeit", "Pottendorf", "Einstieg auch ohne Lasererfahrung"],
        teaser:
            "Du begeisterst dich für moderne Beauty-Technologien, arbeitest gerne mit Menschen und legst Wert auf Präzision und Qualität? Dann spezialisiere dich bei uns auf professionelle Laser-Haarentfernung – wir schulen dich ein.",
        tasksTitle: "Deine Aufgaben",
        tasks: [
            "Laser-Haarentfernung nach Einschulung und entsprechender Qualifikation",
            "Beratung und Betreuung unserer Kundinnen und Kunden",
            "Beurteilung der Behandlungsvoraussetzungen im Rahmen deiner Qualifikation",
            "Sorgfältige Dokumentation von Behandlungen und Ergebnissen",
            "Einhaltung unserer Hygiene-, Sicherheits- und Qualitätsstandards",
        ],
        profile: [
            "Interesse an apparativer Kosmetik und Laser-Technologie",
            "Passende fachliche Qualifikation – oder die Bereitschaft, sie zu erwerben",
            "Lasererfahrung ist von Vorteil, aber keine Voraussetzung",
            "Gepflegtes, freundliches Auftreten und Freude am Umgang mit Menschen",
            "Zuverlässigkeit, Genauigkeit und Lust, Neues zu lernen",
        ],
        benefits: [
            {
                icon: "laser",
                title: "Modernste Technologie",
                text: "Du arbeitest mit hochwertigen Lasersystemen wie dem Mediostar Diodenlaser.",
            },
            {
                icon: "training",
                title: "Professionelle Einschulung",
                text: "Strukturierte Einarbeitung, fachliche Begleitung und Raum für Weiterentwicklung.",
            },
            {
                icon: "studio",
                title: "Premium-Umfeld",
                text: "Ein modernes, stilvolles Studio mit hohem Qualitätsanspruch und tollem Team.",
            },
            {
                icon: "salary",
                title: "Faire Vergütung",
                text: "Nach Kollektivvertrag – mit Bereitschaft zur Überzahlung je nach Qualifikation und Erfahrung.",
            },
        ],
        ctaTitle: "Werde Teil von skinlux",
        ctaText: "Wir freuen uns auf deine Bewerbung – ganz unkompliziert per WhatsApp oder E-Mail.",
        employmentType: "PART_TIME",
        datePosted: "2026-11-16",
    },
    {
        slug: "dermatologie",
        title: "Fachärztin / Facharzt für Dermatologie (m/w/d)",
        shortTitle: "Fachärztin / Facharzt für Dermatologie (m/w/d)",
        type: "Selbstständige Kooperation",
        highlights: ["Selbstständige Kooperation", "Pottendorf", "Start Ende 2027 / Anfang 2028"],
        teaser:
            "Du möchtest deine dermatologische Expertise in einem modernen, hochwertigen Medical-Beauty-Umfeld einbringen? Bei uns übst du deine ärztliche Tätigkeit eigenständig im Rahmen einer selbstständigen Kooperation aus.",
        tasksTitle: "Deine Möglichkeiten",
        tasks: [
            "Eigenständige dermatologische Untersuchungen und Beratungen",
            "Diagnostik und medizinische Betreuung bei unterschiedlichen Hautproblemen",
            "Ästhetisch-medizinische Behandlungen wie Botulinumtoxin und Hyaluronsäure-Filler im Rahmen deiner Qualifikation",
            "Entwicklung individueller medizinischer Behandlungskonzepte",
            "Aufbau deiner dermatologischen Tätigkeit in unserem Medical-Beauty-Konzept",
        ],
        profile: [
            "Abgeschlossene Facharztausbildung für Haut- und Geschlechtskrankheiten mit Berufsberechtigung in Österreich",
            "Idealerweise Erfahrung in der ästhetischen Dermatologie",
            "Hoher Qualitätsanspruch und patientenorientierte Arbeitsweise",
            "Eigenverantwortung und Freude an interdisziplinärer Zusammenarbeit",
        ],
        benefits: [
            {
                icon: "studio",
                title: "Exklusives Umfeld",
                text: "Ein hochwertiges Medical-Beauty-Studio mit moderner Ausstattung und stilvollem Ambiente.",
            },
            {
                icon: "flexible",
                title: "Flexible Zusammenarbeit",
                text: "Individuell vereinbarte Kooperation an mehreren Tagen pro Woche.",
            },
            {
                icon: "perspective",
                title: "Gemeinsame Perspektiven",
                text: "Dermatologie und ästhetische Medizin in einem etablierten Beauty-Umfeld vereinen.",
            },
        ],
        ctaTitle: "Interesse an einer Zusammenarbeit?",
        ctaText: "Wir freuen uns darauf, dich kennenzulernen und die Möglichkeiten einer Kooperation persönlich zu besprechen.",
        employmentType: "CONTRACTOR",
        datePosted: "2026-11-16",
    },
];

export function whatsappLink(job: Job) {
    const text = `Hallo skinlux-Team, ich interessiere mich für die Stelle als ${job.title}.`;
    return `https://wa.me/${CAREER_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function mailLink(job: Job) {
    const subject = `Bewerbung: ${job.shortTitle} – Pottendorf`;
    const body = [
        "Hallo skinlux-Team,",
        "",
        `ich interessiere mich für die Stelle als ${job.title} in Pottendorf.`,
        "",
        "Im Anhang findet ihr meinen Lebenslauf und ein kurzes Motivationsschreiben.",
        "",
        "Liebe Grüße",
    ].join("\r\n");
    return `mailto:${CAREER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Volltext als HTML für das JobPosting-Schema (Google verlangt die komplette Beschreibung). */
export function jobDescriptionHtml(job: Job) {
    const list = (items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    return [
        `<p>${job.teaser}</p>`,
        `<h3>${job.tasksTitle}</h3>`,
        list(job.tasks),
        "<h3>Das bringst du mit</h3>",
        list(job.profile),
        "<h3>Das erwartet dich</h3>",
        list(job.benefits.map((b) => `${b.title}: ${b.text}`)),
        `<p>Bewerbung per WhatsApp (${CAREER_WHATSAPP_DISPLAY}) oder E-Mail (${CAREER_EMAIL}).</p>`,
    ].join("");
}
