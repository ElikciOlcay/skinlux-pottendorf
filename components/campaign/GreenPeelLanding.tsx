import Image from "next/image";
import Link from "next/link";
import {
    Check,
    ChevronDown,
    Clock,
    Leaf,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
    Sparkles,
    Star,
} from "lucide-react";
import BookingButton from "@/components/campaign/BookingButton";
import { methoden } from "@/app/behandlungen/green-peel/data";
import { GREEN_PEEL_CONVERSION_SOURCE } from "@/lib/campaigns/green-peel";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/lib/business-info";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/booking";
import { GOOGLE_REVIEWS } from "@/lib/reviews";

/** Kurzfassung je Methode für die Landingpage – die Seite unter /behandlungen/green-peel hat die Langfassung. */
const METHODEN_KURZ: Record<string, { fuer: string; punkte: string[] }> = {
    "fresh-up": {
        fuer: "Für müde, fahle Haut",
        punkte: ["Sanfter Frischekick", "Kein beabsichtigtes Schälen", "In der Regel ohne Ausfallzeit"],
    },
    energy: {
        fuer: "Für Unreinheiten & Pigmentflecken",
        punkte: ["Verfeinert das Hautbild", "Keine ausgeprägte Schälung", "Inkl. Pflegeset für zu Hause"],
    },
    classic: {
        fuer: "Für Narben & intensive Erneuerung",
        punkte: ["Intensivste Methode", "Sichtbare Schälung möglich", "Inkl. Pflegeset & Nachbehandlung"],
    },
};

const HAUTZIELE = [
    { ziel: "Mehr Frische & Glow", methode: "Fresh Up" },
    { ziel: "Unreinheiten & große Poren", methode: "Energy" },
    { ziel: "Pigmentflecken", methode: "Energy oder Classic" },
    { ziel: "Narben & Aknenarben", methode: "Classic" },
] as const;

const ERGEBNISSE = [
    {
        src: "/images/green-peel/vorher-nachher-unreinheiten.jpg",
        alt: "GREEN PEEL® Vorher-Nachher bei Unreinheiten",
        label: "Unreinheiten",
        width: 1280,
        height: 937,
    },
    {
        src: "/images/green-peel/vorher-nachher-pigmentierung.jpg",
        alt: "GREEN PEEL® Vorher-Nachher bei Hyperpigmentierung",
        label: "Pigmentierung",
        width: 1280,
        height: 1280,
    },
    {
        src: "/images/green-peel/vorher-nachher-hautbild.jpg",
        alt: "GREEN PEEL® Vorher-Nachher: ebenmäßigeres Hautbild",
        label: "Hautbild",
        width: 1280,
        height: 711,
    },
] as const;

const ABLAUF = [
    {
        number: "01",
        title: "Hautcheck & Beratung",
        text: "Wir schauen uns deine Haut an, klären mögliche Gegenanzeigen und wählen gemeinsam die passende Methode.",
    },
    {
        number: "02",
        title: "Die Kräutermassage",
        text: "Die Kräutermischung wird in die Haut einmassiert. Ein Kribbeln oder Wärmegefühl ist dabei normal.",
    },
    {
        number: "03",
        title: "Pflege für zu Hause",
        text: "Du bekommst genaue Pflegehinweise – bei Energy und Classic inklusive abgestimmtem Pflegeset.",
    },
] as const;

const FAQ = [
    {
        question: "Schält sich meine Haut danach?",
        answer:
            "Bei Fresh Up ist keine sichtbare Schälung vorgesehen, auch bei Energy ist sie nicht das Ziel. Bei Classic kann es über mehrere Tage zu einer sichtbaren Schälung kommen – wie stark, ist individuell unterschiedlich.",
    },
    {
        question: "Tut GREEN PEEL® weh?",
        answer:
            "Während der Kräutermassage kann ein Kribbeln, Prickeln oder Wärmegefühl auftreten. Bei Classic ist die Behandlung deutlicher spürbar.",
    },
    {
        question: "Wie lange brauche ich zur Regeneration?",
        answer:
            "Bei Fresh Up normalerweise keine längere Ausfallzeit. Bei Energy können vorübergehende Hautreaktionen auftreten. Für Classic solltest du mehrere Tage einplanen.",
    },
    {
        question: "Welche Methode passt zu mir?",
        answer:
            "Das entscheiden wir gemeinsam vor der Behandlung. Wir beurteilen deinen Hautzustand, prüfen mögliche Gegenanzeigen und wählen dann die passende Methode aus.",
    },
    {
        question: "Wann ist GREEN PEEL® nicht geeignet?",
        answer:
            "Unter anderem bei aktiven Hauterkrankungen oder -infektionen, Sonnenbrand, Rosacea, sehr empfindlicher Haut, in der Schwangerschaft und Stillzeit. Fresh Up kann bei Rosacea teilweise infrage kommen – das klären wir vorab individuell.",
    },
] as const;

const bookingButtonClass =
    "inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[var(--color-primary)] px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:w-auto sm:min-w-72 md:px-8 md:text-sm";

const heroButtonClass =
    "inline-flex min-h-14 w-full items-center justify-center gap-3 bg-white px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-gray-100)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-72 md:px-8 md:text-sm";

const textLinkClass =
    "underline decoration-[var(--color-gray-300)] underline-offset-4 transition-colors hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]";

function formatEuro(value: number) {
    return `€ ${value}`;
}

type GreenPeelLandingProps = {
    bookingUrl: string;
};

export default function GreenPeelLanding({ bookingUrl }: GreenPeelLandingProps) {
    const ratingLabel = `${GOOGLE_RATING.value.replace(".", ",")} bei ${GOOGLE_RATING.reviewCount} Google-Bewertungen`;
    const ab = Math.min(...methoden.map((methode) => methode.preis));
    const review = GOOGLE_REVIEWS.find((r) => r.author === "Tina Tinhof") ?? GOOGLE_REVIEWS[0];

    const Booking = ({ children, className }: { children: React.ReactNode; className: string }) => (
        <BookingButton href={bookingUrl} className={className} conversionSource={GREEN_PEEL_CONVERSION_SOURCE}>
            {children}
        </BookingButton>
    );

    return (
        <main>
            {/* Hero */}
            <section className="overflow-hidden bg-[var(--color-primary)] text-white">
                <div className="container">
                    <div className="grid min-h-[calc(100svh-4rem)] items-stretch lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="flex flex-col justify-center py-10 text-center lg:py-16 lg:pr-14 lg:text-left">
                            <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
                                <Leaf className="h-5 w-5" aria-hidden="true" />
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white">
                                    Neu in Pottendorf · GREEN PEEL®
                                </p>
                            </div>
                            <h1 className="text-4xl font-light leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                                Die Kraft der Kräuter.
                                <span className="mt-2 block">Für deinen Skin Reset.</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg lg:mx-0">
                                Die Original GREEN PEEL® Kräuterschälkur nach Dr. med. Christine Schrammek – natürliche
                                Hauterneuerung, abgestimmt auf deine Haut.
                            </p>

                            <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm font-light text-white lg:mx-0">
                                {[
                                    "Original-Methode seit 1958",
                                    "Ohne chemische Peelingsäuren",
                                    `3 Methoden ab ${formatEuro(ab)}`,
                                ].map((benefit) => (
                                    <li key={benefit} className="flex items-center gap-3">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-white text-[var(--color-primary)]">
                                            <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                                        </span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Booking className={heroButtonClass}>Jetzt Termin buchen</Booking>
                                <p className="mt-3 text-xs font-light text-white/80">Direkt online Termin auswählen</p>
                            </div>

                            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
                                <span className="flex items-center gap-0.5" aria-hidden="true">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Star key={index} className="h-4 w-4 fill-white text-white" strokeWidth={1} />
                                    ))}
                                </span>
                                <span className="text-sm font-light text-white">{ratingLabel}</span>
                            </div>
                        </div>

                        <div className="relative min-h-[420px] lg:min-h-full">
                            <Image
                                src="/images/green-peel/green-peel-behandlung.jpg"
                                alt="GREEN PEEL® Kräuterschälkur bei Skinlux in Pottendorf"
                                fill
                                priority
                                sizes="(min-width: 1024px) 48vw, 100vw"
                                className="object-cover object-[60%_center]"
                            />
                            <div className="absolute bottom-5 left-5 right-5 bg-white p-5 text-left text-black sm:left-auto sm:w-72">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]">
                                    GREEN PEEL® Fresh Up
                                </p>
                                <p className="mt-2 text-3xl font-light text-black">ab {formatEuro(ab)}</p>
                                <p className="mt-1 text-sm font-light text-[var(--color-gray-700)]">
                                    in der Regel ohne Ausfallzeit
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kennzahlen */}
            <section className="border-b border-[var(--color-gray-300)] bg-white" aria-label="Auf einen Blick">
                <div className="container grid grid-cols-3 divide-x divide-[var(--color-gray-300)] py-5">
                    {[
                        { value: "1958", label: "Original seit" },
                        { value: "3", label: "Methoden" },
                        { value: GOOGLE_RATING.value.replace(".", ","), label: "Google-Rating" },
                    ].map((item) => (
                        <div key={item.label} className="px-2 text-center sm:px-6">
                            <p className="text-xl font-light text-black sm:text-2xl">{item.value}</p>
                            <p className="mt-1 text-[10px] font-light uppercase tracking-[0.12em] text-[var(--color-gray-700)] sm:text-xs">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Methoden */}
            <section className="bg-[var(--color-gray-100)] py-14 md:py-20" aria-labelledby="methoden-heading">
                <div className="container">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-9 text-center">
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                Sanft bis intensiv
                            </p>
                            <h2 id="methoden-heading" className="text-3xl font-light leading-tight text-black md:text-5xl">
                                Drei Methoden. Eine für deine Haut.
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base font-light text-[var(--color-gray-700)]">
                                Von der sanften Auffrischung bis zur intensiven Hauterneuerung – welche Methode passt,
                                entscheiden wir gemeinsam vor der Behandlung.
                            </p>
                        </div>

                        <div className="grid gap-3 md:grid-cols-3">
                            {methoden.map((methode) => {
                                const kurz = METHODEN_KURZ[methode.id];
                                return (
                                    <article
                                        key={methode.id}
                                        className="relative flex flex-col border border-[var(--color-gray-300)] bg-white p-5 md:p-6"
                                    >
                                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]">
                                            {methode.claim}
                                        </p>
                                        <h3 className="mt-3 text-2xl font-light text-black">{methode.name}</h3>
                                        <p className="mt-1 text-sm font-light text-[var(--color-gray-700)]">{kurz?.fuer}</p>
                                        <p className="mt-5 text-3xl font-medium leading-none text-[var(--color-primary)]">
                                            {formatEuro(methode.preis)}
                                        </p>
                                        <ul className="mt-5 grid gap-2 text-sm font-light text-[var(--color-gray-700)]">
                                            {kurz?.punkte.map((punkt) => (
                                                <li key={punkt} className="flex items-start gap-2">
                                                    <Check
                                                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]"
                                                        strokeWidth={1.75}
                                                        aria-hidden="true"
                                                    />
                                                    {punkt}
                                                </li>
                                            ))}
                                        </ul>
                                        <span
                                            className="absolute bottom-0 left-0 h-1 w-full bg-[var(--color-primary)]"
                                            aria-hidden="true"
                                        />
                                    </article>
                                );
                            })}
                        </div>

                        <div className="mt-6 text-center">
                            <Booking className={bookingButtonClass}>Jetzt Termin buchen</Booking>
                        </div>
                    </div>
                </div>
            </section>

            {/* Welche Methode passt */}
            <section className="py-14 md:py-20" aria-labelledby="hautziel-heading">
                <div className="container">
                    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div className="mx-auto max-w-sm text-center md:max-w-2xl lg:mx-0 lg:max-w-none lg:text-left">
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                Your skin. Our expertise.
                            </p>
                            <h2 id="hautziel-heading" className="text-balance text-3xl font-light leading-tight text-black md:text-5xl">
                                Welche Methode passt zu dir?
                            </h2>
                            <p className="mt-5 text-pretty text-base font-light leading-relaxed text-[var(--color-gray-700)]">
                                Nicht jede Haut braucht dieselbe Behandlung. Die Übersicht gibt dir eine erste Orientierung
                                – die endgültige Wahl treffen wir gemeinsam nach dem Hautcheck.
                            </p>
                            <div className="mt-7">
                                <Booking className={bookingButtonClass}>Beratungstermin buchen</Booking>
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-2xl border border-[var(--color-gray-300)] bg-[var(--color-gray-100)] lg:max-w-none">
                            <p className="border-b border-[var(--color-gray-300)] px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gray-700)]">
                                Dein Hautziel → Empfehlung
                            </p>
                            <ul className="divide-y divide-[var(--color-gray-300)]">
                                {HAUTZIELE.map((eintrag) => (
                                    <li key={eintrag.ziel} className="flex items-center justify-between gap-4 bg-white px-6 py-4">
                                        <span className="text-sm font-light text-black">{eintrag.ziel}</span>
                                        <span className="text-right text-sm font-medium text-[var(--color-primary)]">
                                            {eintrag.methode}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vorher-Nachher */}
            <section className="bg-black py-14 text-white md:py-20" aria-labelledby="ergebnisse-heading">
                <div className="container">
                    <div className="mb-9 text-center">
                        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-gray-300">
                            Sichtbar erneuert
                        </p>
                        <h2 id="ergebnisse-heading" className="text-3xl font-light text-white md:text-5xl">
                            Vorher & Nachher
                        </h2>
                    </div>

                    <ul className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:overflow-visible">
                        {ERGEBNISSE.map((bild) => (
                            <li key={bild.src} className="min-w-[84%] snap-start bg-white text-black sm:min-w-[60%] md:min-w-0">
                                <Image
                                    src={bild.src}
                                    alt={bild.alt}
                                    width={bild.width}
                                    height={bild.height}
                                    sizes="(min-width: 768px) 30vw, 84vw"
                                    className="h-auto w-full"
                                />
                                <p className="px-5 py-4 text-sm font-light text-black">{bild.label}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-center text-xs font-light text-gray-400">
                        Bildquelle: Dr. med. Christine Schrammek Kosmetik. Ergebnisse können individuell unterschiedlich
                        ausfallen.
                    </p>
                </div>
            </section>

            {/* Kräuter + Ablauf */}
            <section className="bg-[var(--color-gray-100)] py-14 md:py-20" aria-labelledby="ablauf-heading">
                <div className="container">
                    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div className="relative aspect-square overflow-hidden bg-white">
                            <Image
                                src="/images/green-peel/green-peel-kraeutermischung.jpg"
                                alt="GREEN PEEL® Kräutermischung"
                                fill
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="object-cover"
                            />
                            <div className="absolute bottom-5 left-5 right-5 bg-white p-5 text-left">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]">
                                    Natürliche Kräuter
                                </p>
                                <p className="mt-2 text-sm font-light leading-relaxed text-[var(--color-gray-700)]">
                                    Unter anderem Ackerschachtelhalm, Ringelblume, Kamille, Aloe Vera und Spitzwegerich.
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                So einfach geht&apos;s
                            </p>
                            <h2 id="ablauf-heading" className="text-3xl font-light leading-tight text-black md:text-5xl">
                                Deine Behandlung in 3 Schritten
                            </h2>
                            <ol className="mt-8 grid gap-px bg-[var(--color-gray-300)]">
                                {ABLAUF.map((schritt) => (
                                    <li key={schritt.number} className="flex gap-5 bg-white p-5 md:p-6">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--color-primary)] text-sm font-medium text-white">
                                            {schritt.number}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-light text-black">{schritt.title}</h3>
                                            <p className="mt-2 text-sm font-light leading-relaxed text-[var(--color-gray-700)]">
                                                {schritt.text}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vertrauen */}
            <section className="py-14 md:py-20" aria-labelledby="vertrauen-heading">
                <div className="container">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-9 text-center">
                            <div className="mb-4 flex items-center justify-center gap-2">
                                <span className="flex items-center gap-0.5" aria-hidden="true">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" strokeWidth={1} />
                                    ))}
                                </span>
                                <span className="text-sm font-medium text-black">{ratingLabel}</span>
                            </div>
                            <h2 id="vertrauen-heading" className="text-3xl font-light text-black md:text-5xl">
                                Warum Skinlux Pottendorf
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                            <ul className="grid gap-px bg-[var(--color-gray-300)] sm:grid-cols-3 md:grid-cols-1">
                                {[
                                    {
                                        icon: ShieldCheck,
                                        title: "Sicher behandelt",
                                        text: "Vor jeder Behandlung prüfen wir mögliche Gegenanzeigen.",
                                    },
                                    {
                                        icon: Sparkles,
                                        title: "Individuell abgestimmt",
                                        text: "Methode und Intensität passend zu deinem Hautzustand.",
                                    },
                                    {
                                        icon: MessageCircle,
                                        title: "Begleitet bis danach",
                                        text: "Klare Pflegehinweise, damit sich deine Haut optimal erholt.",
                                    },
                                ].map((vorteil) => {
                                    const Icon = vorteil.icon;
                                    return (
                                        <li key={vorteil.title} className="flex gap-4 bg-white p-5">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--color-primary)]">
                                                <Icon className="h-5 w-5 text-white" strokeWidth={1.5} aria-hidden="true" />
                                            </span>
                                            <div>
                                                <h3 className="text-base font-light text-black">{vorteil.title}</h3>
                                                <p className="mt-1 text-sm font-light leading-relaxed text-[var(--color-gray-700)]">
                                                    {vorteil.text}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            <article className="flex flex-col border border-[var(--color-primary)] bg-[var(--color-primary)] p-6 text-white md:p-7">
                                <div className="mb-5 flex items-center gap-0.5" aria-hidden="true">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Star key={index} className="h-3.5 w-3.5 fill-current text-white" strokeWidth={1} />
                                    ))}
                                </div>
                                <blockquote className="flex-1 text-sm font-light leading-relaxed text-white">
                                    „{review.text}“
                                </blockquote>
                                <p className="mt-6 border-t border-white/30 pt-4 text-sm font-medium text-white">
                                    {review.author}
                                </p>
                            </article>
                        </div>

                        <p className="mt-6 text-center">
                            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={`text-sm font-light ${textLinkClass}`}>
                                Alle Google-Bewertungen ansehen
                                <span className="sr-only"> (öffnet in neuem Tab)</span>
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-[var(--color-gray-100)] py-14 md:py-20" aria-labelledby="faq-heading">
                <div className="container">
                    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
                        <div>
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                Gut zu wissen
                            </p>
                            <h2 id="faq-heading" className="text-3xl font-light leading-tight text-black md:text-5xl">
                                Deine Fragen, kurz beantwortet
                            </h2>
                            <p className="mt-5 text-sm font-light leading-relaxed text-[var(--color-gray-700)]">
                                Alle Details zu den drei Methoden findest du auf unserer{" "}
                                <Link href="/behandlungen/green-peel" className={textLinkClass}>
                                    GREEN PEEL® Seite
                                </Link>
                                .
                            </p>
                        </div>
                        <div className="border-t border-[var(--color-gray-300)]">
                            {FAQ.map((item) => (
                                <details key={item.question} className="group border-b border-[var(--color-gray-300)] bg-white">
                                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-light text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-primary)] [&::-webkit-details-marker]:hidden">
                                        {item.question}
                                        <ChevronDown
                                            className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                                            aria-hidden="true"
                                        />
                                    </summary>
                                    <p className="px-5 pb-5 text-sm font-light leading-relaxed text-[var(--color-gray-700)]">
                                        {item.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Abschluss */}
            <section className="bg-[var(--color-primary)] py-14 text-white md:py-20" aria-labelledby="abschluss-heading">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <Leaf className="mx-auto h-10 w-10 text-white" strokeWidth={1.25} aria-hidden="true" />
                        <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-white">
                            Ready for your skin reset?
                        </p>
                        <h2 id="abschluss-heading" className="mt-4 text-3xl font-light leading-tight text-white md:text-5xl">
                            Sichere dir deinen GREEN PEEL® Termin
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-white/90">
                            Von sanfter Revitalisierung bis zur intensiven Hauterneuerung – wir begleiten dich auf dem Weg
                            zu einem gepflegten, ebenmäßiger wirkenden Hautbild.
                        </p>
                        <div className="mt-8">
                            <Booking className={heroButtonClass}>Jetzt Termin buchen</Booking>
                            <p className="mt-3 text-xs font-light text-white/80">
                                Fresh Up {formatEuro(methoden[0].preis)} · Energy {formatEuro(methoden[1].preis)} · Classic{" "}
                                {formatEuro(methoden[2].preis)}
                            </p>
                        </div>
                        <address className="mt-10 grid gap-3 border-t border-white/30 pt-7 text-sm font-light not-italic text-white sm:grid-cols-3">
                            <p className="flex items-center justify-center gap-2">
                                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                                <span>Marktplatz 14, 2486 Pottendorf</span>
                            </p>
                            <p className="flex items-center justify-center gap-2">
                                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                                Mo–Fr 9–21:30, Sa 7–12
                            </p>
                            <p className="flex items-center justify-center">
                                <a
                                    href={PHONE_TEL}
                                    className="inline-flex items-center gap-2 underline decoration-white/40 underline-offset-4 hover:decoration-white"
                                >
                                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                                    {PHONE_DISPLAY}
                                </a>
                            </p>
                        </address>
                    </div>
                </div>
            </section>
        </main>
    );
}
