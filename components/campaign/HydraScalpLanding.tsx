import Image from "next/image";
import Link from "next/link";
import {
    Check,
    ChevronDown,
    Clock,
    Droplets,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
    Sparkles,
    Star,
} from "lucide-react";
import BookingButton from "@/components/campaign/BookingButton";
import { HYDRASCALP_CONVERSION_SOURCE, HYDRASCALP_PREISE } from "@/lib/campaigns/hydrascalp";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/lib/business-info";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/booking";
import { GOOGLE_REVIEWS } from "@/lib/reviews";

const GEEIGNET_BEI = [
    "Trockener, juckender oder schuppiger Kopfhaut",
    "Fettiger Kopfhaut und übermäßiger Talgproduktion",
    "Vermehrtem Haarausfall – als ergänzende Kopfhautpflege",
    "Feinem, dünnem oder kraftlosem Haar",
    "Ablagerungen durch Styling- und Pflegeprodukte",
    "Dem Wunsch nach einer intensiv gepflegten Kopfhaut",
] as const;

const VORTEILE = [
    "Intensive Reinigung und Exfoliation der Kopfhaut",
    "Entfernt Talg und Produktablagerungen",
    "Feuchtigkeit für trockene Kopfhaut",
    "Unterstützt ein ausgeglichenes Kopfhautmilieu",
    "Heimpflege mit Keravive Peptide Complex inklusive",
    "Sanft, nichtinvasiv, ohne reguläre Ausfallzeit",
] as const;

const ERGEBNISSE = [
    {
        label: "Kopfhaut & Haaransatz",
        vorher: { src: "/images/hydrascalp/vorher-kopfhaut-frau.jpg", width: 1280, height: 850 },
        nachher: { src: "/images/hydrascalp/nachher-kopfhaut-frau.jpg", width: 1280, height: 851 },
    },
    {
        label: "Oberkopf",
        vorher: { src: "/images/hydrascalp/vorher-kopfhaut-mann.jpg", width: 1280, height: 1240 },
        nachher: { src: "/images/hydrascalp/nachher-kopfhaut-mann.jpg", width: 1280, height: 1230 },
    },
] as const;

const ABLAUF = [
    {
        number: "01",
        title: "Tiefenreinigung & Exfoliation",
        text: "Mit der HydraFacial-Technologie wird die Kopfhaut sanft von überschüssigem Talg, abgestorbenen Hautzellen und Ablagerungen befreit.",
    },
    {
        number: "02",
        title: "Keravive Peptide Complex",
        text: "Die gereinigte Kopfhaut wird mit dem Keravive Peptide Complex versorgt – für Feuchtigkeit und ein ausgeglichenes Kopfhautmilieu.",
    },
    {
        number: "03",
        title: "Heimpflege inklusive",
        text: "Du bekommst den Keravive Peptide Complex für zu Hause mit – er unterstützt die Pflege zwischen den Terminen.",
    },
] as const;

const FAQ = [
    {
        question: "Ist HydraScalp schmerzhaft?",
        answer: "Nein. Die Behandlung ist sanft, nichtinvasiv und wird in der Regel als angenehm empfunden.",
    },
    {
        question: "Wie viele Behandlungen werden empfohlen?",
        answer: "Wir empfehlen mindestens drei Behandlungen im Abstand von jeweils vier Wochen. Schon eine einzelne Behandlung sorgt für eine spürbar gereinigte, erfrischte Kopfhaut – die Kur macht den Unterschied.",
    },
    {
        question: "Ist die Heimpflege im Preis enthalten?",
        answer: "Ja. Der Keravive Peptide Complex zur ergänzenden Anwendung zu Hause ist im Behandlungspreis enthalten.",
    },
    {
        question: "Kann HydraScalp bei Haarausfall helfen?",
        answer: "HydraScalp reinigt die Kopfhaut, versorgt sie mit Feuchtigkeit und unterstützt ihre Pflege. Die Behandlung ist jedoch keine medizinische Therapie gegen Haarausfall und kann das Nachwachsen von Haaren nicht garantieren. Bei starkem oder anhaltendem Haarausfall empfehlen wir eine dermatologische Abklärung.",
    },
    {
        question: "Was ist der Unterschied zwischen Teil- und Komplettbehandlung?",
        answer: "Bei der Teilbehandlung wird ein ausgewählter Kopfhautbereich behandelt. Die Komplettbehandlung umfasst die gesamte Kopfhaut.",
    },
    {
        question: "Gibt es eine Ausfallzeit?",
        answer: "In der Regel nicht. Gewohnte Alltagsaktivitäten kannst du direkt nach der Behandlung wieder aufnehmen.",
    },
] as const;

const bookingButtonClass =
    "inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[var(--color-primary)] px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:w-auto sm:min-w-72 md:px-8 md:text-sm";

const heroButtonClass =
    "inline-flex min-h-14 w-full items-center justify-center gap-3 bg-white px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-gray-100)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-72 md:px-8 md:text-sm";

const textLinkClass =
    "underline decoration-[var(--color-gray-300)] underline-offset-4 transition-colors hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]";

function formatEuro(value: number) {
    // de-AT gruppiert vierstellige Zahlen nicht – Tausenderpunkt explizit setzen (€ 1.000).
    return `€ ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

type HydraScalpLandingProps = {
    bookingUrl: string;
};

export default function HydraScalpLanding({ bookingUrl }: HydraScalpLandingProps) {
    const ratingLabel = `${GOOGLE_RATING.value.replace(".", ",")} bei ${GOOGLE_RATING.reviewCount} Google-Bewertungen`;
    const ab = Math.min(...HYDRASCALP_PREISE.map((preis) => preis.einzel));
    const review = GOOGLE_REVIEWS.find((r) => r.author === "Tina Tinhof") ?? GOOGLE_REVIEWS[0];

    const Booking = ({ children, className }: { children: React.ReactNode; className: string }) => (
        <BookingButton href={bookingUrl} className={className} conversionSource={HYDRASCALP_CONVERSION_SOURCE}>
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
                                <Droplets className="h-5 w-5" aria-hidden="true" />
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white">
                                    Neu in Pottendorf · HydraScalp™ mit Keravive
                                </p>
                            </div>
                            <h1 className="text-4xl font-light leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                                Gesunde Kopfhaut.
                                <span className="mt-2 block">Die Basis für schönes Haar.</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg lg:mx-0">
                                HydraScalp by HydraFacial verbindet intensive Kopfhautreinigung, sanfte Exfoliation und
                                Pflege mit dem Keravive Peptide Complex.
                            </p>

                            <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm font-light text-white lg:mx-0">
                                {[
                                    "HydraFacial-Technologie für die Kopfhaut",
                                    "Heimpflege inklusive",
                                    "Sanft & ohne reguläre Ausfallzeit",
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

                        <div className="relative min-h-[460px] lg:min-h-full">
                            <Image
                                src="/images/hydrascalp/hydrascalp-behandlung.jpg"
                                alt="HydraScalp Kopfhautbehandlung bei Skinlux in Pottendorf"
                                fill
                                priority
                                sizes="(min-width: 1024px) 48vw, 100vw"
                                className="object-cover object-[center_35%]"
                            />
                            <div className="absolute bottom-5 left-5 right-5 bg-white p-5 text-left text-black sm:left-auto sm:w-72">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]">
                                    HydraScalp™ Teilbehandlung
                                </p>
                                <p className="mt-2 text-3xl font-light text-black">ab {formatEuro(ab)}</p>
                                <p className="mt-1 text-sm font-light text-[var(--color-gray-700)]">
                                    inkl. Keravive Heimpflege
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
                        { value: "3", label: "Behandlungen empfohlen" },
                        { value: "4 Wo.", label: "Abstand" },
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

            {/* Preise */}
            <section className="bg-[var(--color-gray-100)] py-14 md:py-20" aria-labelledby="preise-heading">
                <div className="container">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-9 text-center">
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                Einzeln oder als Kur
                            </p>
                            <h2 id="preise-heading" className="text-3xl font-light leading-tight text-black md:text-5xl">
                                Eine Behandlung ist ein guter Anfang.
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base font-light text-[var(--color-gray-700)]">
                                Die Kur macht den Unterschied: Wir empfehlen 3 Behandlungen im Abstand von jeweils
                                4 Wochen. Der Keravive Peptide Complex für zu Hause ist immer inklusive.
                            </p>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            {HYDRASCALP_PREISE.map((preis) => {
                                const ersparnis = preis.einzel * 3 - preis.kur;
                                return (
                                    <article
                                        key={preis.id}
                                        className="relative flex flex-col border border-[var(--color-gray-300)] bg-white p-5 md:p-7"
                                    >
                                        <h3 className="text-2xl font-light text-black">{preis.name}</h3>
                                        <p className="mt-1 text-sm font-light text-[var(--color-gray-700)]">
                                            {preis.beschreibung}
                                        </p>

                                        <dl className="mt-6 grid gap-px bg-[var(--color-gray-300)]">
                                            <div className="flex items-baseline justify-between gap-4 bg-white py-3">
                                                <dt className="text-sm font-light text-[var(--color-gray-700)]">Einzelbehandlung</dt>
                                                <dd className="text-2xl font-light text-black">{formatEuro(preis.einzel)}</dd>
                                            </div>
                                            <div className="flex items-baseline justify-between gap-4 bg-white py-3">
                                                <dt className="text-sm font-light text-black">
                                                    3er-Kur
                                                    <span className="ml-2 bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                                                        Empfohlen
                                                    </span>
                                                </dt>
                                                <dd className="text-3xl font-medium leading-none text-[var(--color-primary)]">
                                                    {formatEuro(preis.kur)}
                                                </dd>
                                            </div>
                                        </dl>
                                        <p className="mt-3 text-sm font-light text-[var(--color-gray-700)]">
                                            Du sparst {formatEuro(ersparnis)} gegenüber 3 Einzelbehandlungen.
                                        </p>
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

            {/* Für wen */}
            <section className="py-14 md:py-20" aria-labelledby="fuer-wen-heading">
                <div className="container">
                    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div className="mx-auto max-w-sm text-center md:max-w-2xl lg:mx-0 lg:max-w-none lg:text-left">
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                Your scalp. Our expertise.
                            </p>
                            <h2 id="fuer-wen-heading" className="text-balance text-3xl font-light leading-tight text-black md:text-5xl">
                                Für wen ist HydraScalp geeignet?
                            </h2>
                            <p className="mt-5 text-pretty text-base font-light leading-relaxed text-[var(--color-gray-700)]">
                                Für alle, die ihrer Kopfhaut etwas Gutes tun wollen – und besonders, wenn sie juckt,
                                schuppt, schnell fettet oder das Haar fein und kraftlos wirkt.
                            </p>
                            <div className="mt-7">
                                <Booking className={bookingButtonClass}>Beratungstermin buchen</Booking>
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-2xl border border-[var(--color-gray-300)] bg-[var(--color-gray-100)] lg:max-w-none">
                            <p className="border-b border-[var(--color-gray-300)] px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gray-700)]">
                                Besonders geeignet bei
                            </p>
                            <ul className="divide-y divide-[var(--color-gray-300)]">
                                {GEEIGNET_BEI.map((eintrag) => (
                                    <li key={eintrag} className="flex items-start gap-3 bg-white px-6 py-4">
                                        <Check
                                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]"
                                            strokeWidth={1.75}
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm font-light text-black">{eintrag}</span>
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
                            Gepflegte Kopfhaut
                        </p>
                        <h2 id="ergebnisse-heading" className="text-3xl font-light text-white md:text-5xl">
                            Vorher & Nachher
                        </h2>
                    </div>

                    <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
                        {ERGEBNISSE.map((ergebnis) => (
                            <li key={ergebnis.label} className="bg-white text-black">
                                <div className="grid grid-cols-2 gap-px bg-white">
                                    {(["vorher", "nachher"] as const).map((zeitpunkt) => {
                                        const bild = ergebnis[zeitpunkt];
                                        const label = zeitpunkt === "vorher" ? "Vorher" : "Nachher";
                                        return (
                                            <figure key={zeitpunkt} className="relative">
                                                <Image
                                                    src={bild.src}
                                                    alt={`HydraScalp ${label}: ${ergebnis.label}`}
                                                    width={bild.width}
                                                    height={bild.height}
                                                    sizes="(min-width: 768px) 24vw, 50vw"
                                                    className="aspect-square h-auto w-full object-cover"
                                                />
                                                <figcaption className="absolute left-2 top-2 bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-black">
                                                    {label}
                                                </figcaption>
                                            </figure>
                                        );
                                    })}
                                </div>
                                <p className="px-5 py-4 text-sm font-light text-black">{ergebnis.label}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mx-auto mt-6 max-w-2xl text-center text-xs font-light text-gray-400">
                        Ergebnisse können individuell unterschiedlich ausfallen. HydraScalp ist eine kosmetische
                        Kopfhautpflege und keine medizinische Therapie gegen Haarausfall.
                    </p>
                </div>
            </section>

            {/* Ablauf + Vorteile */}
            <section className="bg-[var(--color-gray-100)] py-14 md:py-20" aria-labelledby="ablauf-heading">
                <div className="container">
                    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                        <div>
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                So funktioniert&apos;s
                            </p>
                            <h2 id="ablauf-heading" className="text-3xl font-light leading-tight text-black md:text-5xl">
                                HydraScalp in 3 Schritten
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

                        <div className="border border-[var(--color-gray-300)] bg-white p-6 md:p-7 lg:mt-[7.5rem]">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]">
                                Die Vorteile
                            </p>
                            <ul className="mt-5 grid gap-3 text-sm font-light text-[var(--color-gray-700)]">
                                {VORTEILE.map((vorteil) => (
                                    <li key={vorteil} className="flex items-start gap-2">
                                        <Check
                                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]"
                                            strokeWidth={1.75}
                                            aria-hidden="true"
                                        />
                                        {vorteil}
                                    </li>
                                ))}
                            </ul>
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
                                        title: "Original HydraFacial-Technologie",
                                        text: "Professionelle Kopfhautpflege mit dem HydraScalp-System.",
                                    },
                                    {
                                        icon: Sparkles,
                                        title: "Individuell abgestimmt",
                                        text: "Teil- oder Komplettbehandlung – passend zu deiner Kopfhaut.",
                                    },
                                    {
                                        icon: MessageCircle,
                                        title: "Begleitet bis danach",
                                        text: "Heimpflege inklusive und klare Hinweise für die Zeit zwischen den Terminen.",
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
                                Mehr zur HydraFacial-Technologie findest du auf unserer{" "}
                                <Link href="/behandlungen/hydra-facial" className={textLinkClass}>
                                    HydraFacial Seite
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
                        <Droplets className="mx-auto h-10 w-10 text-white" strokeWidth={1.25} aria-hidden="true" />
                        <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-white">
                            Ready for your scalp reset?
                        </p>
                        <h2 id="abschluss-heading" className="mt-4 text-3xl font-light leading-tight text-white md:text-5xl">
                            Sichere dir deinen HydraScalp Termin
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-white/90">
                            Professionelle Kopfhautpflege für ein frisches, gepflegtes Kopfhautgefühl und gesund
                            aussehendes Haar.
                        </p>
                        <div className="mt-8">
                            <Booking className={heroButtonClass}>Jetzt Termin buchen</Booking>
                            <p className="mt-3 text-xs font-light text-white/80">
                                {HYDRASCALP_PREISE.map(
                                    (preis) => `${preis.name} ${formatEuro(preis.einzel)} · 3er-Kur ${formatEuro(preis.kur)}`,
                                ).join("  |  ")}
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
