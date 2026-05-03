import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Clock,
    Gift,
    Heart,
    MapPin,
    MessageCircle,
    Phone,
    Sparkles,
} from "lucide-react";

import {
    MOTHERS_DAY_PROMO,
    MOTHERS_DAY_THEME,
    isMothersDayPromoActive,
} from "@/lib/promotions";

export const metadata: Metadata = {
    title: `Muttertags-Aktion · ${MOTHERS_DAY_PROMO.discountPercent}% auf Gutscheine | ${MOTHERS_DAY_PROMO.studio.name}`,
    description: `Im ganzen Mai: ${MOTHERS_DAY_PROMO.discountPercent}% Rabatt auf Gutscheine für ${MOTHERS_DAY_PROMO.treatments.join(
        " & "
    )}. ${MOTHERS_DAY_PROMO.availability} bei ${MOTHERS_DAY_PROMO.studio.name}.`,
    openGraph: {
        title: `Muttertags-Aktion · ${MOTHERS_DAY_PROMO.discountPercent}% auf Gutscheine`,
        description: `Schenke Pflege, die wirkt. ${MOTHERS_DAY_PROMO.discountPercent}% Rabatt auf Gutscheine für ${MOTHERS_DAY_PROMO.treatments.join(
            " & "
        )} – im ganzen Mai bei ${MOTHERS_DAY_PROMO.studio.name}.`,
        type: "website",
        locale: "de_AT",
    },
};

export default function MothersDayActionPage() {
    const promoActive = isMothersDayPromoActive();
    const { studio } = MOTHERS_DAY_PROMO;

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section
                className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
                style={{
                    backgroundColor: MOTHERS_DAY_THEME.bg,
                    color: MOTHERS_DAY_THEME.text,
                }}
            >
                <div className="absolute -top-20 -right-20 opacity-[0.07] pointer-events-none">
                    <Heart
                        className="w-[420px] h-[420px]"
                        style={{ color: MOTHERS_DAY_THEME.text }}
                        strokeWidth={1}
                    />
                </div>

                <div className="container mx-auto px-4 relative">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-light transition-colors mb-8 hover:opacity-100"
                        style={{ color: MOTHERS_DAY_THEME.textMuted }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück zur Startseite
                    </Link>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span
                                className="text-[0.65rem] md:text-xs font-light tracking-widest uppercase px-3 py-1.5 rounded-full"
                                style={{
                                    backgroundColor: MOTHERS_DAY_THEME.text,
                                    color: MOTHERS_DAY_THEME.bg,
                                }}
                            >
                                Muttertag
                            </span>
                            <span
                                className="text-xs font-light tracking-widest uppercase"
                                style={{ color: MOTHERS_DAY_THEME.textMuted }}
                            >
                                Im ganzen Mai 2026
                            </span>
                        </div>

                        <h1
                            className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-6"
                            style={{ color: MOTHERS_DAY_THEME.text }}
                        >
                            <span className="block">Schenke Pflege,</span>
                            <span className="block font-normal">die wirkt.</span>
                        </h1>

                        <p
                            className="text-lg md:text-2xl font-light leading-relaxed mb-2"
                            style={{ color: MOTHERS_DAY_THEME.textMuted }}
                        >
                            <span className="font-normal" style={{ color: MOTHERS_DAY_THEME.text }}>
                                {MOTHERS_DAY_PROMO.discountPercent}% Rabatt
                            </span>{" "}
                            auf alle Gutscheine im Wert deiner Lieblingsbehandlung.
                        </p>
                        <p
                            className="text-base md:text-lg font-light"
                            style={{ color: MOTHERS_DAY_THEME.textMuted }}
                        >
                            Gültig für{" "}
                            <span className="font-normal" style={{ color: MOTHERS_DAY_THEME.text }}>
                                {MOTHERS_DAY_PROMO.treatments.join(" & ")}
                            </span>
                            . {MOTHERS_DAY_PROMO.availability}.
                        </p>
                    </div>
                </div>
            </section>

            {!promoActive ? (
                <section className="container mx-auto px-4 py-12">
                    <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-200 p-6 md:p-8 text-center rounded-2xl">
                        <p className="text-base font-light text-black mb-2">
                            Diese Aktion ist aktuell nicht aktiv.
                        </p>
                        <p className="text-sm font-light text-gray-600 mb-4">
                            Schau bei unseren Gutscheinen vorbei – wir freuen uns auf deinen
                            Besuch.
                        </p>
                        <Link
                            href="/gutscheine"
                            className="inline-flex items-center gap-2 text-xs font-light tracking-widest uppercase bg-black text-white px-5 py-3 hover:bg-black/85 transition-colors rounded-full"
                        >
                            Zu den Gutscheinen
                            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </Link>
                    </div>
                </section>
            ) : null}

            {/* Was ist enthalten */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                                Aktion im Detail
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4">
                                Was deine Mama bekommt
                            </h2>
                            <p className="text-base md:text-lg font-light text-gray-600 max-w-2xl mx-auto">
                                Der Gutschein ist gültig für unsere zwei effektivsten
                                Behandlungen für sichtbar gepflegte Haut.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {MOTHERS_DAY_PROMO.treatments.map((treatment) => (
                                <div
                                    key={treatment}
                                    className="border border-gray-200 p-6 md:p-8 transition-all duration-300 hover:border-gray-300 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] rounded-2xl"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div
                                            className="flex h-12 w-12 items-center justify-center shrink-0 rounded-xl"
                                            style={{ backgroundColor: MOTHERS_DAY_THEME.bg }}
                                        >
                                            <Sparkles
                                                className="w-5 h-5"
                                                style={{ color: MOTHERS_DAY_THEME.text }}
                                                strokeWidth={1.5}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[0.65rem] font-light tracking-widest uppercase text-gray-500 mb-1">
                                                Behandlung
                                            </p>
                                            <h3 className="text-xl md:text-2xl font-light text-black">
                                                {treatment}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="text-sm md:text-base font-light text-gray-600 leading-relaxed">
                                        {MOTHERS_DAY_PROMO.discountPercent}% Rabatt auf
                                        Gutscheine für diese Behandlung.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* So bekommst du den Gutschein */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                                So einfach geht&apos;s
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4">
                                Gutschein im Studio holen
                            </h2>
                            <p className="text-base md:text-lg font-light text-gray-600 max-w-2xl mx-auto">
                                Komm einfach in unserem Studio vorbei oder ruf vorab an –
                                wir bereiten deinen Gutschein gerne persönlich vor.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                            {[
                                {
                                    step: "01",
                                    title: "Anrufen oder vorbeikommen",
                                    text: `Erreichbar unter ${studio.phoneDisplay} oder direkt im Studio.`,
                                },
                                {
                                    step: "02",
                                    title: "Wert & Behandlung wählen",
                                    text: `Wir beraten dich gerne, ob ${MOTHERS_DAY_PROMO.treatments.join(
                                        " oder "
                                    )} besser zu Mama passt.`,
                                },
                                {
                                    step: "03",
                                    title: "Geschenk mitnehmen",
                                    text: `${MOTHERS_DAY_PROMO.discountPercent}% Rabatt wird automatisch abgezogen – fertig zum Verschenken.`,
                                },
                            ].map((item) => (
                                <div key={item.step} className="bg-white p-6 md:p-7 rounded-2xl">
                                    <p
                                        className="text-3xl md:text-4xl font-light mb-3"
                                        style={{ color: MOTHERS_DAY_THEME.bg, opacity: 0.35 }}
                                    >
                                        {item.step}
                                    </p>
                                    <h3 className="text-lg md:text-xl font-light text-black mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap justify-center gap-3">
                            <a
                                href={`tel:${studio.phoneE164}`}
                                className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase px-6 py-3.5 transition-colors hover:opacity-90 rounded-full"
                                style={{
                                    backgroundColor: MOTHERS_DAY_THEME.bg,
                                    color: MOTHERS_DAY_THEME.text,
                                }}
                            >
                                <Phone className="w-4 h-4" strokeWidth={1.5} />
                                {studio.phoneDisplay}
                            </a>
                            {studio.whatsappE164 ? (
                                <a
                                    href={`https://wa.me/${studio.whatsappE164}?text=Hallo%20Skinlux!%20Ich%20interessiere%20mich%20f%C3%BCr%20die%20Muttertags-Aktion.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase border px-6 py-3.5 transition-colors hover:text-white rounded-full"
                                    style={{
                                        borderColor: MOTHERS_DAY_THEME.bg,
                                        color: MOTHERS_DAY_THEME.bg,
                                    }}
                                >
                                    <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                                    WhatsApp
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>

            {/* Studio-Info & Öffnungszeiten */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-xs md:text-sm font-light tracking-widest uppercase text-gray-500 mb-4 block">
                                Besuche uns
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4">
                                {studio.name}
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {/* Standort */}
                            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 shrink-0 rounded-xl">
                                        <MapPin
                                            className="w-5 h-5"
                                            style={{ color: MOTHERS_DAY_THEME.bg }}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-light mb-2 text-black">
                                            Standort
                                        </h3>
                                        <address className="not-italic text-gray-600 font-light leading-relaxed">
                                            {studio.addressLines.map((line, idx) => (
                                                <span key={idx} className="block">
                                                    {line}
                                                </span>
                                            ))}
                                        </address>
                                    </div>
                                </div>

                                <div className="relative h-56 md:h-64 bg-gray-100 overflow-hidden rounded-xl">
                                    <iframe
                                        title={`Karte ${studio.name}`}
                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                            studio.mapsQuery
                                        )}&output=embed`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>

                            {/* Öffnungszeiten */}
                            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 shrink-0 rounded-xl">
                                        <Clock
                                            className="w-5 h-5"
                                            style={{ color: MOTHERS_DAY_THEME.bg }}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-light mb-4 text-black">
                                            Öffnungszeiten
                                        </h3>
                                        <dl className="divide-y divide-gray-100">
                                            {studio.openingHours.map((entry) => (
                                                <div
                                                    key={entry.day}
                                                    className="flex justify-between items-center py-2.5"
                                                >
                                                    <dt className="text-gray-600 font-light">
                                                        {entry.day}
                                                    </dt>
                                                    <dd
                                                        className={`font-light ${
                                                            entry.closed
                                                                ? "text-gray-400"
                                                                : "text-black"
                                                        }`}
                                                    >
                                                        {entry.hours}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>

                                        <p className="mt-6 text-sm text-gray-500 font-light italic">
                                            Termine nach Vereinbarung auch außerhalb der
                                            Öffnungszeiten möglich.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section
                className="py-16 md:py-20"
                style={{
                    backgroundColor: MOTHERS_DAY_THEME.bgDeep,
                    color: MOTHERS_DAY_THEME.text,
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Gift
                            className="w-10 h-10 mx-auto mb-6"
                            style={{ color: MOTHERS_DAY_THEME.accent }}
                            strokeWidth={1.5}
                        />
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-light mb-4"
                            style={{ color: MOTHERS_DAY_THEME.text }}
                        >
                            Bereit, Mama zu überraschen?
                        </h2>
                        <p
                            className="text-base md:text-lg font-light mb-8 leading-relaxed"
                            style={{ color: MOTHERS_DAY_THEME.textMuted }}
                        >
                            {MOTHERS_DAY_PROMO.discountPercent}% Rabatt auf alle Gutscheine
                            – nur im Mai 2026, {MOTHERS_DAY_PROMO.availability.toLowerCase()}.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            <a
                                href={`tel:${studio.phoneE164}`}
                                className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase px-6 py-3.5 transition-colors hover:opacity-90 rounded-full"
                                style={{
                                    backgroundColor: MOTHERS_DAY_THEME.text,
                                    color: MOTHERS_DAY_THEME.bg,
                                }}
                            >
                                <Phone className="w-4 h-4" strokeWidth={1.5} />
                                Jetzt anrufen
                            </a>
                            <Link
                                href="/gutscheine"
                                className="inline-flex items-center gap-2 text-sm font-light tracking-widest uppercase border px-6 py-3.5 transition-colors hover:bg-white/10 rounded-full"
                                style={{
                                    borderColor: MOTHERS_DAY_THEME.border,
                                    color: MOTHERS_DAY_THEME.text,
                                }}
                            >
                                Online bestellen
                                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                            </Link>
                        </div>

                        <ul
                            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-light"
                            style={{ color: MOTHERS_DAY_THEME.textSubtle }}
                        >
                            <li className="inline-flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                                Sofort verfügbar
                            </li>
                            <li className="inline-flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                                Persönliche Beratung
                            </li>
                            <li className="inline-flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                                Hochwertige Verpackung
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}
