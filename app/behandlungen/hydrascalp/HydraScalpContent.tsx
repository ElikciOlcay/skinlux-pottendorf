"use client";

import { SHORE_BOOKING_URL } from "@/lib/booking";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CalendarClock, CheckCircle, Droplets, Gift, Info, Repeat, Sparkles } from "lucide-react";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { abPreis, ablauf, faq, formatEuro, geeignetBei, pakete, vorteile } from "./data";

const ergebnisse = [
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
];

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3 font-light text-gray-700">
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <CheckCircle
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: "var(--color-secondary)" }}
                        aria-hidden
                    />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function SectionHeading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
        >
            <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">{eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">{children}</h2>
        </motion.div>
    );
}

export default function HydraScalpContent() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="pt-24 pb-20 bg-white">
                <div className="container">
                    <Link
                        href="/#treatments"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex flex-wrap items-center gap-2 mb-6">
                                <Droplets className="w-5 h-5" style={{ color: "var(--color-secondary)" }} />
                                <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                    HydraScalp™ by HydraFacial
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black leading-tight">
                                HydraScalp<sup className="text-2xl md:text-3xl align-super">™</sup> – Gesunde Kopfhaut
                            </h1>

                            <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed">
                                Die Basis für schönes Haar: intensive Kopfhautreinigung, sanfte Exfoliation und Pflege mit
                                dem Keravive Peptide Complex.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="text-2xl font-light mb-1" style={{ color: "var(--color-secondary)" }}>
                                        ab {formatEuro(abPreis)}
                                    </div>
                                    <div className="text-sm font-light text-gray-600">inkl. Keravive Heimpflege</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-light mb-1 text-black">3er-Kur</div>
                                    <div className="text-sm font-light text-gray-600">alle 4 Wochen empfohlen</div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={SHORE_BOOKING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Jetzt Termin buchen
                                </a>
                                <a
                                    href="#preise"
                                    className="btn-secondary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Preise ansehen
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                                <Image
                                    src="/images/hydrascalp/hydrascalp-behandlung.jpg"
                                    alt="HydraScalp Kopfhautbehandlung bei skinlux in Pottendorf"
                                    fill
                                    priority
                                    className="object-cover object-[center_40%]"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute -inset-4 border-2 border-secondary opacity-20" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Kennzahlen */}
            <section className="py-20 bg-black text-white">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "3", label: "Schritte pro Behandlung", icon: Sparkles },
                            { number: "3er-Kur", label: "Empfohlene Behandlungsserie", icon: Repeat },
                            { number: "4 Wochen", label: "Abstand zwischen den Terminen", icon: CalendarClock },
                            { number: "Inklusive", label: "Keravive Heimpflege", icon: Gift },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--color-secondary)" }} />
                                <div className="text-3xl md:text-4xl font-light mb-2">{stat.number}</div>
                                <div className="text-sm font-light text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Was ist HydraScalp */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/5] bg-gray-100 overflow-hidden order-2 lg:order-1"
                        >
                            <Image
                                src="/images/hydrascalp/hydrascalp-keravive-ampullen.jpg"
                                alt="HydraScalp Handstück mit Keravive Peptide Complex"
                                fill
                                className="object-cover object-[center_60%]"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2"
                        >
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                                Die Behandlung
                            </span>
                            <h2 className="text-4xl md:text-5xl font-light mb-4 text-black">
                                Was ist HydraScalp<sup>™</sup>?
                            </h2>
                            <p className="text-lg font-light text-gray-500 mb-8">
                                Schönes, vital aussehendes Haar beginnt mit einer gepflegten Kopfhaut.
                            </p>
                            <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                                <p>
                                    HydraScalp by HydraFacial kombiniert eine intensive Kopfhautreinigung mit sanfter
                                    Exfoliation und gezielter Wirkstoffpflege.
                                </p>
                                <p>
                                    Mithilfe der HydraFacial-Technologie werden überschüssiger Talg, abgestorbene Hautzellen
                                    und Produktablagerungen schonend entfernt. Anschließend wird die Kopfhaut mit dem speziell
                                    entwickelten Keravive Peptide Complex versorgt.
                                </p>
                                <p>
                                    Die ergänzende Heimpflege unterstützt die kontinuierliche Pflege der Kopfhaut zwischen
                                    den Behandlungen.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Für wen */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                                Für wen
                            </span>
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                                Für wen ist HydraScalp geeignet?
                            </h2>
                            <p className="text-gray-600 font-light leading-relaxed">
                                HydraScalp eignet sich für alle, die unter trockener, juckender oder schuppiger Kopfhaut,
                                übermäßigem Haarausfall oder feinem, kraftlosem Haar leiden – ebenso zur allgemeinen Pflege
                                einer gesunden Kopfhaut.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="p-8 bg-white border border-gray-100"
                        >
                            <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-500 mb-6">
                                Besonders geeignet bei
                            </p>
                            <BulletList items={geeignetBei} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Ablauf */}
            <section className="py-20 bg-white">
                <div className="container">
                    <SectionHeading eyebrow="So funktioniert's">HydraScalp in 3 Schritten</SectionHeading>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {ablauf.map((schritt, index) => (
                            <motion.div
                                key={schritt.nummer}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="p-8 border border-gray-200 bg-white"
                            >
                                <div className="text-4xl font-light mb-6" style={{ color: "var(--color-secondary)" }}>
                                    {schritt.nummer}
                                </div>
                                <h3 className="text-xl font-light text-black mb-3">{schritt.titel}</h3>
                                <p className="text-sm text-gray-600 font-light leading-relaxed">{schritt.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Preise */}
            <section id="preise" className="py-20 bg-gray-50 scroll-mt-24">
                <div className="container">
                    <SectionHeading eyebrow="Behandlungspreise">Eine Behandlung ist ein guter Anfang.</SectionHeading>
                    <p className="text-center text-lg text-gray-600 font-light max-w-2xl mx-auto -mt-8 mb-12">
                        Die Kur macht den Unterschied: Wir empfehlen mindestens 3 Behandlungen im Abstand von jeweils
                        4 Wochen.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {pakete.map((paket, index) => (
                            <motion.div
                                key={paket.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col p-8 border border-gray-200 bg-white hover:border-secondary/40 transition-colors"
                            >
                                <h3 className="font-light text-black mb-2">
                                    <span className="block text-sm tracking-[0.2em] uppercase text-gray-500">
                                        HydraScalp<sup>™</sup>
                                    </span>
                                    <span className="block text-3xl">{paket.name}</span>
                                </h3>
                                <p className="text-gray-700 font-light mb-6">{paket.beschreibung}</p>

                                <div className="divide-y divide-gray-100 border-y border-gray-100 mb-6">
                                    <div className="flex items-baseline justify-between py-4">
                                        <span className="text-sm font-light text-gray-600">Einzelbehandlung</span>
                                        <span className="text-2xl font-light text-black">{formatEuro(paket.einzel)}</span>
                                    </div>
                                    <div className="flex items-baseline justify-between py-4">
                                        <span className="text-sm font-light text-gray-600">3er-Kur</span>
                                        <span className="text-3xl font-light" style={{ color: "var(--color-secondary)" }}>
                                            {formatEuro(paket.kur)}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-auto space-y-4">
                                    <div className="bg-secondary/10 p-3 border border-secondary/20">
                                        <p className="text-sm font-light text-gray-700">{paket.inklusive}</p>
                                    </div>
                                    <a
                                        href={SHORE_BOOKING_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary inline-flex items-center justify-center w-full"
                                    >
                                        {paket.name} buchen
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ergebnisse */}
            <section className="py-20 bg-white">
                <div className="container">
                    <SectionHeading eyebrow="Ergebnisse">Vorher & Nachher</SectionHeading>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {ergebnisse.map((ergebnis, index) => (
                            <motion.figure
                                key={ergebnis.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white border border-gray-100"
                            >
                                <div className="grid grid-cols-2 gap-px bg-gray-100">
                                    {(["vorher", "nachher"] as const).map((zeitpunkt) => {
                                        const bild = ergebnis[zeitpunkt];
                                        const label = zeitpunkt === "vorher" ? "Vorher" : "Nachher";
                                        return (
                                            <div key={zeitpunkt} className="relative">
                                                <Image
                                                    src={bild.src}
                                                    alt={`HydraScalp ${label}: ${ergebnis.label}`}
                                                    width={bild.width}
                                                    height={bild.height}
                                                    className="aspect-square w-full h-auto object-cover"
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                />
                                                <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[10px] font-light tracking-[0.14em] uppercase text-black">
                                                    {label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <figcaption className="px-4 py-3 text-sm font-light text-gray-600">{ergebnis.label}</figcaption>
                            </motion.figure>
                        ))}
                    </div>
                    <p className="text-center text-xs font-light text-gray-500 mt-8 max-w-2xl mx-auto">
                        Ergebnisse können individuell unterschiedlich ausfallen. HydraScalp ist eine kosmetische
                        Kopfhautpflege und keine medizinische Therapie gegen Haarausfall.
                    </p>
                </div>
            </section>

            {/* Heimpflege & Vorteile */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                                Heimpflege inklusive
                            </span>
                            <h2 className="text-4xl md:text-5xl font-light mb-8 text-black">Die Vorteile von HydraScalp</h2>
                            <BulletList items={vorteile} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-square bg-[#f7f7f7] overflow-hidden"
                        >
                            <Image
                                src="/images/hydrascalp/hydrascalp-keravive-heimpflege.jpg"
                                alt="HydraScalp with Keravive Peptide Complex Spray für die Heimpflege"
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Hinweis Haarausfall */}
            <section className="py-20 bg-white">
                <div className="container max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex gap-4 p-6 md:p-8 border border-gray-200 bg-gray-50"
                    >
                        <Info className="w-6 h-6 flex-shrink-0 text-gray-600" aria-hidden />
                        <div className="space-y-3 font-light text-gray-700">
                            <p>
                                <strong className="font-normal text-black">Gut zu wissen:</strong> HydraScalp reinigt die
                                Kopfhaut, versorgt sie mit Feuchtigkeit und unterstützt ihre Pflege. Die Behandlung ist
                                keine medizinische Therapie gegen Haarausfall und kann das Nachwachsen von Haaren nicht
                                garantieren.
                            </p>
                            <p>Bei starkem oder anhaltendem Haarausfall empfehlen wir eine dermatologische Abklärung.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <SectionHeading eyebrow="Deine Fragen">
                        Häufig gestellte Fragen zu HydraScalp<sup>™</sup>
                    </SectionHeading>
                    <FaqAccordion items={faq} />
                </div>
            </section>

            {/* Abschluss-CTA */}
            <section className="py-20 bg-black text-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <Droplets className="w-8 h-8 mx-auto mb-6" style={{ color: "var(--color-secondary)" }} />
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
                            HydraScalp bei skinlux MEDICAL BEAUTY
                        </h2>
                        <p className="text-xl font-light text-gray-300 mb-10">
                            Professionelle Kopfhautpflege für ein frisches, gepflegtes Kopfhautgefühl und gesund
                            aussehendes Haar.
                        </p>
                        <a
                            href={SHORE_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center justify-center"
                        >
                            Jetzt HydraScalp Termin buchen
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Weitere Behandlungen */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-light text-black mb-3">Weitere Behandlungen</h2>
                        <p className="text-gray-600 font-light">Entdecken Sie unser Behandlungsangebot</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <Link href="/behandlungen/hydra-facial" className="group p-6 bg-white hover:bg-gray-100 transition-colors">
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">HydraFacial</h3>
                            <p className="text-sm text-gray-500 font-light">3-in-1 Behandlung für sichtbare Ergebnisse</p>
                        </Link>
                        <Link
                            href="/behandlungen/skinpen-precision"
                            className="group p-6 bg-white hover:bg-gray-100 transition-colors"
                        >
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">
                                SkinPen® Microneedling
                            </h3>
                            <p className="text-sm text-gray-500 font-light">Medizinisches Microneedling, FDA-zertifiziert</p>
                        </Link>
                        <Link href="/behandlungen/green-peel" className="group p-6 bg-white hover:bg-gray-100 transition-colors">
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">GREEN PEEL®</h3>
                            <p className="text-sm text-gray-500 font-light">Die Original Kräuterschälkur</p>
                        </Link>
                        <Link
                            href="/behandlungen/laser-haarentfernung"
                            className="group p-6 bg-white hover:bg-gray-100 transition-colors"
                        >
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">
                                Laser Haarentfernung
                            </h3>
                            <p className="text-sm text-gray-500 font-light">
                                Dauerhafte Haarentfernung mit Diodenlaser-Technologie
                            </p>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
