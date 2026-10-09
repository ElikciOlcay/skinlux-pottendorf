import Image from "next/image";
import Link from "next/link";
import {
    BadgePercent,
    CalendarCheck,
    Check,
    ChevronDown,
    Clock,
    MapPin,
    Phone,
    ShieldCheck,
    Snowflake,
    Star,
    Sun,
} from "lucide-react";
import BookingButton from "@/components/campaign/BookingButton";
import {
    formatLaserOktoberEuro,
    laserOktoberOfferEuro,
    LASER_OKTOBER_FEATURED_ZONES,
} from "@/lib/campaigns/laser-oktober-prices";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/lib/business-info";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/booking";
import { GOOGLE_REVIEWS } from "@/lib/reviews";

const LASER_IMAGES = [
    {
        src: "/images/about/gallery/technologie.jpg",
        alt: "Diodenlaser-Handstück im Skinlux Studio in Pottendorf",
        width: 1280,
        height: 1920,
    },
    {
        src: "/images/gallery/treatment-laser.jpg",
        alt: "Laser-Haarentfernung im Skinlux Studio in Pottendorf",
        width: 1920,
        height: 1280,
    },
    {
        src: "/images/about/gallery/behandlungsraum.jpg",
        alt: "Behandlungsraum von Skinlux in Pottendorf",
        width: 1280,
        height: 1920,
    },
] as const;

const TIMELINE = [
    { label: "Okt", highlight: false },
    { label: "Nov", highlight: false },
    { label: "Dez", highlight: false },
    { label: "Feb", highlight: false },
    { label: "Mär", highlight: false },
    { label: "Apr", highlight: false },
    { label: "Sommer", highlight: true },
] as const;

const BENEFITS = [
    {
        icon: Snowflake,
        title: "Fast schmerzfrei",
        text: "Das integrierte Kühlsystem macht die Behandlung besonders angenehm.",
    },
    {
        icon: ShieldCheck,
        title: "Alle Hauttypen",
        text: "Der moderne Diodenlaser lässt sich individuell auf deine Haut abstimmen.",
    },
    {
        icon: CalendarCheck,
        title: "Sicher entscheiden",
        text: "Kostenlose Erstberatung inklusive Probebehandlung vor deinem Start.",
    },
] as const;

const PROCESS_STEPS = [
    {
        number: "01",
        title: "Kostenlos kennenlernen",
        text: "Wir besprechen deine Wünsche, bestimmen Haut- und Haartyp und testen eine kleine Stelle.",
        image: LASER_IMAGES[0],
    },
    {
        number: "02",
        title: "Entspannt behandeln",
        text: "Der Diodenlaser behandelt die gewählte Zone präzise und wird dabei angenehm gekühlt.",
        image: LASER_IMAGES[1],
    },
    {
        number: "03",
        title: "Dranbleiben",
        text: "Die Sitzungen finden meist alle 6 Wochen statt – abgestimmt auf deine persönliche Behandlung.",
        image: LASER_IMAGES[2],
    },
] as const;

const FAQ = [
    {
        question: "Wie funktioniert die 50-%-Aktion?",
        answer:
            "Die ersten zwei Behandlungen sind um 50 % reduziert. Der Rabatt gilt bis 31. Oktober 2026 für Einzelzonen und wird vor Ort abgezogen. Pakete sind ausgenommen.",
    },
    {
        question: "Wie viele Behandlungen sind notwendig?",
        answer:
            "Für ein gutes Ergebnis braucht es meist rund 10 Sitzungen im Abstand von 6 Wochen. Die genaue Anzahl hängt von Hauttyp, Haarfarbe und Zone ab und wird in der kostenlosen Erstberatung festgelegt.",
    },
    {
        question: "Ist die Behandlung schmerzhaft?",
        answer:
            "Dank unseres integrierten Kühlsystems ist die Behandlung nahezu schmerzfrei. Die meisten Kunden beschreiben es als leichtes Kribbeln.",
    },
    {
        question: "Für welche Körperbereiche ist die Behandlung geeignet?",
        answer:
            "Die Laser-Haarentfernung kann an fast allen Körperstellen durchgeführt werden, einschließlich Gesicht, Achseln, Bikinizone, Beine und Rücken.",
    },
    {
        question: "Wie lange hält das Ergebnis?",
        answer:
            "Nach Abschluss der Behandlungsserie kannst du dich über Jahre hinweg über glatte Haut freuen. Gelegentliche Auffrischungen können notwendig sein.",
    },
] as const;

const bookingButtonClass =
    "inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[var(--color-primary)] px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] sm:w-auto sm:min-w-72 md:px-8 md:text-sm";

const heroButtonClass =
    "inline-flex min-h-14 w-full items-center justify-center gap-3 bg-white px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-gray-100)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-72 md:px-8 md:text-sm";

const textLinkClass =
    "underline decoration-[var(--color-gray-300)] underline-offset-4 transition-colors hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]";

type LaserOktoberLandingProps = {
    bookingUrl: string;
    pricesHref: string;
};

export default function LaserOktoberLanding({ bookingUrl, pricesHref }: LaserOktoberLandingProps) {
    const ratingLabel = `${GOOGLE_RATING.value.replace(".", ",")} bei ${GOOGLE_RATING.reviewCount} Google-Bewertungen`;

    return (
        <main>
            <section className="overflow-hidden bg-[var(--color-primary)] text-white">
                <div className="container">
                    <div className="grid min-h-[calc(100svh-4rem)] items-stretch lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="flex flex-col justify-center py-10 text-center lg:py-16 lg:pr-14 lg:text-left">
                            <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
                                <BadgePercent className="h-5 w-5" aria-hidden="true" />
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white">
                                    Herbstaktion · nur bis 31.10.2026
                                </p>
                            </div>
                            <h1 className="text-4xl font-light leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                                Jetzt starten.
                                <span className="mt-2 block">Im Sommer glatter.</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg lg:mx-0">
                                Starte im Herbst und nutze die sonnenarmen Monate für deine Laserbehandlung.
                                Bis zum Sommer hast du bereits einen großen Teil deiner Sitzungen geschafft.
                            </p>

                            <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm font-light text-white lg:mx-0">
                                {[
                                    "50 % auf die ersten 2 Behandlungen",
                                    "Kostenlose Erstberatung",
                                    "Probebehandlung inklusive",
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
                                <BookingButton href={bookingUrl} className={heroButtonClass}>
                                    Jetzt Termin buchen
                                </BookingButton>
                                <p className="mt-3 text-xs font-light text-white/80">
                                    Direkt online Termin auswählen
                                </p>
                            </div>

                            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
                                <span className="flex items-center gap-0.5" aria-hidden="true">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Star
                                            key={index}
                                            className="h-4 w-4 fill-white text-white"
                                            strokeWidth={1}
                                        />
                                    ))}
                                </span>
                                <span className="text-sm font-light text-white">{ratingLabel}</span>
                            </div>
                        </div>

                        <div className="relative min-h-[420px] lg:min-h-full">
                            <Image
                                src="/images/gallery/treatment-laser.jpg"
                                alt="Laser-Haarentfernung im Skinlux Studio in Pottendorf"
                                fill
                                priority
                                sizes="(min-width: 1024px) 48vw, 100vw"
                                className="object-cover object-[center_30%]"
                            />
                            <div className="absolute bottom-5 left-5 right-5 bg-white p-5 text-left text-black sm:left-auto sm:w-72">
                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]">
                                    Dein Herbst-Vorteil
                                </p>
                                <p className="mt-2 text-3xl font-light text-black">50 %</p>
                                <p className="mt-1 text-sm font-light text-[var(--color-gray-700)]">
                                    auf die ersten 2 Behandlungen
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-[var(--color-gray-300)] bg-white" aria-label="Aktionsvorteile">
                <div className="container grid grid-cols-3 divide-x divide-[var(--color-gray-300)] py-5">
                    {[
                        { value: "50 %", label: "2 Behandlungen" },
                        { value: "31.10.", label: "Aktionsende" },
                        { value: "5,0", label: "Google-Rating" },
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

            <section className="bg-[var(--color-gray-100)] py-14 md:py-20" aria-labelledby="preise-heading">
                <div className="container">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-9 text-center">
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                Weniger zahlen. Jetzt starten.
                            </p>
                            <h2 id="preise-heading" className="text-3xl font-light leading-tight text-black md:text-5xl">
                                Beliebte Zonen mit 50 %
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base font-light text-[var(--color-gray-700)]">
                                Der Rabatt gilt für die ersten zwei Behandlungen. Hier siehst du vier Beispiele.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {LASER_OKTOBER_FEATURED_ZONES.map((zone) => (
                                <article
                                    key={zone.name}
                                    className="relative border border-[var(--color-gray-300)] bg-white p-5 md:p-6"
                                >
                                    <div className="flex items-start justify-between gap-5">
                                        <div>
                                            <h3 className="text-lg font-light text-black">{zone.name}</h3>
                                            <p className="mt-1 text-sm font-light text-[var(--color-gray-700)]">
                                                pro Behandlung
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-light text-[var(--color-gray-700)]">
                                                <span className="sr-only">Statt </span>
                                                <span className="line-through">
                                                    {formatLaserOktoberEuro(zone.regularEuro)}
                                                </span>
                                            </p>
                                            <p className="mt-1 text-3xl font-medium leading-none text-[var(--color-primary)]">
                                                <span className="sr-only">Jetzt </span>
                                                {formatLaserOktoberEuro(laserOktoberOfferEuro(zone.regularEuro))}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="absolute bottom-0 left-0 h-1 w-full bg-[var(--color-primary)]" aria-hidden="true" />
                                </article>
                            ))}
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <Link
                                href={pricesHref}
                                className="inline-flex min-h-16 w-full flex-col items-center justify-center gap-1 border border-[var(--color-primary)] bg-white px-6 py-4 text-center text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                            >
                                <span className="text-sm font-medium uppercase tracking-[0.18em]">
                                    Alle Zonen und Preise
                                </span>
                                <span className="text-xs font-light normal-case tracking-normal">
                                    50 % auf die ersten 2 Behandlungen
                                </span>
                            </Link>
                            <BookingButton href={bookingUrl} className={`${bookingButtonClass} sm:w-full sm:min-w-0`}>
                                Jetzt Termin buchen
                            </BookingButton>
                        </div>

                        <p className="mt-5 text-center text-xs font-light leading-relaxed text-[var(--color-gray-700)]">
                            Aktionspreis für die ersten zwei Einzelbehandlungen. Danach gilt der reguläre Preis.
                            Aktion gültig bis 31.10.2026, Pakete ausgenommen. Der Rabatt wird vor Ort abgezogen.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-20" aria-labelledby="zeitstrahl-heading">
                <div className="container">
                    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div className="mx-auto max-w-sm text-center md:max-w-2xl lg:mx-0 lg:max-w-none lg:text-left">
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                Der richtige Zeitpunkt
                            </p>
                            <h2 id="zeitstrahl-heading" className="text-balance text-3xl font-light leading-tight text-black md:text-5xl">
                                Warum du im Herbst starten solltest
                            </h2>
                            <p className="mt-5 text-pretty text-base font-light leading-relaxed text-[var(--color-gray-700)]">
                                Weniger Sonne auf der Haut schafft gute Voraussetzungen für deine Laserbehandlung.
                                Wenn du jetzt beginnst, hast du bis zum Sommer bereits sechs Sitzungen absolviert.
                            </p>
                            <p className="mt-3 text-pretty text-sm font-light leading-relaxed text-[var(--color-gray-700)]">
                                Meist sind rund 10 Sitzungen im Abstand von 6 Wochen sinnvoll. Die genaue Anzahl
                                hängt von Hauttyp, Haarfarbe und Zone ab.
                            </p>
                            <div className="mt-7">
                                <BookingButton href={bookingUrl} className={bookingButtonClass}>
                                    Kostenlose Beratung buchen
                                </BookingButton>
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-2xl border border-[var(--color-gray-300)] bg-[var(--color-gray-100)] p-6 sm:p-8 lg:max-w-none">
                            <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gray-700)]">
                                Dein möglicher Start bis Sommer
                            </p>
                            <div className="overflow-x-auto pb-2">
                                <ol className="flex min-w-[28rem] items-start sm:min-w-0">
                                    {TIMELINE.map((step, index) => (
                                        <li key={step.label} className="relative flex flex-1 flex-col items-center gap-3">
                                            {index < TIMELINE.length - 1 ? (
                                                <span
                                                    className="absolute left-1/2 top-4 h-px w-full bg-[var(--color-primary)]"
                                                    aria-hidden="true"
                                                />
                                            ) : null}
                                            <span
                                                className={`relative z-10 flex h-8 w-8 items-center justify-center ${
                                                    step.highlight
                                                        ? "bg-[var(--color-primary)] text-white"
                                                        : "border border-[var(--color-primary)] bg-white"
                                                }`}
                                            >
                                                {step.highlight ? (
                                                    <Sun className="h-4 w-4" aria-hidden="true" />
                                                ) : (
                                                    <span className="h-2 w-2 bg-[var(--color-primary)]" aria-hidden="true" />
                                                )}
                                            </span>
                                            <span className="text-xs font-light text-[var(--color-gray-700)]">
                                                {step.label}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div className="mt-8 border-t border-[var(--color-gray-300)] pt-5 text-center">
                                <p className="text-2xl font-light text-black">6 Sitzungen</p>
                                <p className="mt-1 text-sm font-light text-[var(--color-gray-700)]">
                                    bis zum Sommer bereits geschafft
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-black py-14 text-white md:py-20" aria-labelledby="studio-heading">
                <div className="container">
                    <div className="mb-9 text-center">
                        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-gray-300">
                            Persönlich. Modern. Angenehm.
                        </p>
                        <h2 id="studio-heading" className="text-3xl font-light text-white md:text-5xl">
                            So läuft deine Behandlung
                        </h2>
                    </div>

                    <ol className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:overflow-visible">
                        {PROCESS_STEPS.map((step) => (
                            <li key={step.number} className="min-w-[84%] snap-start bg-white text-black sm:min-w-[60%] md:min-w-0">
                                <div className="relative h-64 overflow-hidden md:h-72">
                                    <Image
                                        src={step.image.src}
                                        alt={step.image.alt}
                                        fill
                                        sizes="(min-width: 768px) 30vw, 84vw"
                                        className="object-cover object-center"
                                    />
                                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center bg-[var(--color-primary)] text-sm font-medium text-white">
                                        {step.number}
                                    </span>
                                </div>
                                <div className="p-5 md:p-6">
                                    <h3 className="text-xl font-light text-black">{step.title}</h3>
                                    <p className="mt-3 text-sm font-light leading-relaxed text-[var(--color-gray-700)]">
                                        {step.text}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="bg-[var(--color-gray-100)] py-14 md:py-20" aria-labelledby="vorteile-heading">
                <div className="container">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-9 text-center">
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-primary)]">
                                Darauf kannst du dich verlassen
                            </p>
                            <h2 id="vorteile-heading" className="text-3xl font-light text-black md:text-5xl">
                                Deine Vorteile bei Skinlux
                            </h2>
                        </div>
                        <ul className="grid gap-px bg-[var(--color-gray-300)] md:grid-cols-3">
                            {BENEFITS.map((benefit) => {
                                const Icon = benefit.icon;
                                return (
                                    <li key={benefit.title} className="bg-white p-6 md:p-8">
                                        <div className="mb-5 flex h-12 w-12 items-center justify-center bg-[var(--color-primary)]">
                                            <Icon
                                                className="h-5 w-5 text-white"
                                                strokeWidth={1.5}
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <h3 className="text-xl font-light text-black">{benefit.title}</h3>
                                        <p className="mt-3 text-sm font-light leading-relaxed text-[var(--color-gray-700)]">
                                            {benefit.text}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-20" aria-labelledby="bewertungen-heading">
                <div className="container">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-9 text-center">
                            <div className="mb-4 flex items-center justify-center gap-2">
                                <span className="flex items-center gap-0.5" aria-hidden="true">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Star
                                            key={index}
                                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                            strokeWidth={1}
                                        />
                                    ))}
                                </span>
                                <span className="text-sm font-medium text-black">{ratingLabel}</span>
                            </div>
                            <h2 id="bewertungen-heading" className="text-3xl font-light text-black md:text-5xl">
                                Echte Erfahrungen aus Pottendorf
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {GOOGLE_REVIEWS.map((review, index) => (
                                <article
                                    key={review.author}
                                    className={`flex h-full flex-col border p-6 md:p-7 ${
                                        index === 1
                                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                                            : "border-[var(--color-gray-300)] bg-white"
                                    }`}
                                >
                                    <div className="mb-5 flex items-center gap-0.5" aria-hidden="true">
                                        {Array.from({ length: 5 }, (_, starIndex) => (
                                            <Star
                                                key={starIndex}
                                                className={`h-3.5 w-3.5 fill-current ${
                                                    index === 1 ? "text-white" : "text-yellow-400"
                                                }`}
                                                strokeWidth={1}
                                            />
                                        ))}
                                    </div>
                                    <blockquote
                                        className={`flex-1 text-sm font-light leading-relaxed ${
                                            index === 1 ? "text-white" : "text-[var(--color-gray-700)]"
                                        }`}
                                    >
                                        „{review.text}“
                                    </blockquote>
                                    <p
                                        className={`mt-6 border-t pt-4 text-sm font-medium ${
                                            index === 1
                                                ? "border-white/30 text-white"
                                                : "border-[var(--color-gray-300)] text-black"
                                        }`}
                                    >
                                        {review.author}
                                    </p>
                                </article>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-6 text-center">
                            <a
                                href={GOOGLE_REVIEWS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={textLinkClass}
                            >
                                Alle Google-Bewertungen ansehen
                                <span className="sr-only"> (öffnet in neuem Tab)</span>
                            </a>
                            <BookingButton href={bookingUrl} className={bookingButtonClass}>
                                Jetzt Termin buchen
                            </BookingButton>
                        </div>
                    </div>
                </div>
            </section>

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
                                Noch unsicher? In der kostenlosen Erstberatung schauen wir gemeinsam,
                                ob die Behandlung zu dir passt.
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

            <section className="bg-[var(--color-primary)] py-14 text-white md:py-20" aria-labelledby="abschluss-heading">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <BadgePercent className="mx-auto h-10 w-10 text-white" strokeWidth={1.25} aria-hidden="true" />
                        <p className="mt-5 text-xs font-medium uppercase tracking-[0.24em] text-white">
                            Aktion endet am 31. Oktober
                        </p>
                        <h2 id="abschluss-heading" className="mt-4 text-3xl font-light leading-tight text-white md:text-5xl">
                            Bereit für deinen ersten Schritt?
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-white/90">
                            Buche jetzt deine kostenlose Erstberatung inklusive Probebehandlung
                            und sichere dir 50 % auf deine ersten 2 Behandlungen.
                        </p>
                        <div className="mt-8">
                            <BookingButton href={bookingUrl} className={heroButtonClass}>
                                Jetzt Termin buchen
                            </BookingButton>
                            <p className="mt-3 text-xs font-light text-white/80">
                                Der Rabatt wird vor Ort abgezogen
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
                                <a href={PHONE_TEL} className="inline-flex items-center gap-2 underline decoration-white/40 underline-offset-4 hover:decoration-white">
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
