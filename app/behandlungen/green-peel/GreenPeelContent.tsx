"use client";

import { SHORE_BOOKING_URL } from "@/lib/booking";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, Heart, Info, Leaf, Layers, Sparkles } from "lucide-react";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { faq, kontraindikationen, methoden } from "./data";

const kraeuter = ["Ackerschachtelhalm", "Ringelblume", "Kamille", "Aloe Vera", "Spitzwegerich"];

const ergebnisse = [
    {
        src: "/images/green-peel/vorher-nachher-unreinheiten.jpg",
        alt: "GREEN PEEL® Vorher-Nachher bei Unreinheiten",
        label: "Unreinheiten",
        width: 1280,
        height: 937,
    },
    {
        src: "/images/green-peel/vorher-nachher-hautbild.jpg",
        alt: "GREEN PEEL® Vorher-Nachher: ebenmäßigeres Hautbild",
        label: "Hautbild",
        width: 1280,
        height: 711,
    },
    {
        src: "/images/green-peel/vorher-nachher-pigmentierung.jpg",
        alt: "GREEN PEEL® Vorher-Nachher bei Hyperpigmentierung",
        label: "Pigmentierung",
        width: 1280,
        height: 1280,
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

export default function GreenPeelContent() {
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
                                <Leaf className="w-5 h-5" style={{ color: "var(--color-secondary)" }} />
                                <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                    The Power of Nature
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black leading-tight">
                                GREEN PEEL<sup className="text-2xl md:text-3xl align-super">®</sup> – Die Original
                                Kräuterschälkur
                            </h1>

                            <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed">
                                Natürliche Hauterneuerung mit der Kraft ausgewählter Kräuter.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="text-2xl font-light mb-1" style={{ color: "var(--color-secondary)" }}>
                                        ab € {methoden[0].preis}
                                    </div>
                                    <div className="text-sm font-light text-gray-600">GREEN PEEL® Fresh Up</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-light mb-1 text-black">3 Methoden</div>
                                    <div className="text-sm font-light text-gray-600">Fresh Up · Energy · Classic</div>
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
                                    href="#methoden"
                                    className="btn-secondary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Methoden & Preise
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
                                    src="/images/green-peel/green-peel-behandlung.jpg"
                                    alt="GREEN PEEL® Kräuterschälkur bei skinlux in Pottendorf"
                                    fill
                                    priority
                                    className="object-cover"
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
                            { number: "1958", label: "Original seit", icon: Clock },
                            { number: "3", label: "Behandlungsmethoden", icon: Layers },
                            { number: "Kräuter", label: "Ohne chemische Peelingsäuren", icon: Leaf },
                            { number: "Für dich", label: "Individuell abgestimmt", icon: Heart },
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

            {/* Was ist GREEN PEEL */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-square bg-gray-100 overflow-hidden order-2 lg:order-1"
                        >
                            <Image
                                src="/images/green-peel/green-peel-kraeuterschaelkur-produkt.jpg"
                                alt="Original GREEN PEEL® Kräuterschälkur von Dr. med. Christine Schrammek"
                                fill
                                className="object-cover"
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
                                Was ist GREEN PEEL<sup>®</sup>?
                            </h2>
                            <p className="text-lg font-light text-gray-500 mb-8">
                                Natürliche Kräuter. Dermatologische Expertise. Individuelle Hautpflege.
                            </p>
                            <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                                <p>
                                    Die Original GREEN PEEL<sup>®</sup> Kräuterschälkur nach Dr. med. Christine Schrammek ist
                                    eine dermatologisch entwickelte Behandlungsmethode, die seit 1958 für natürliche
                                    Hauterneuerung steht. Sie basiert auf einer speziellen Kräutermischung, kommt ohne
                                    chemische Peelingsäuren aus und unterstützt die natürlichen Regenerationsprozesse der Haut.
                                </p>
                                <p>
                                    GREEN PEEL<sup>®</sup> ist eine professionelle Kräuterschälkur, bei der eine spezielle
                                    Mischung ausgewählter Kräuter in die Haut einmassiert wird.
                                </p>
                                <p>
                                    Je nach Behandlungsmethode werden die Hautdurchblutung und die natürlichen
                                    Erneuerungsprozesse angeregt. Das Hautbild kann dadurch frischer, glatter und
                                    ebenmäßiger erscheinen.
                                </p>
                                <p>
                                    <strong className="font-normal text-black">Das Besondere:</strong> GREEN PEEL
                                    <sup>®</sup> bietet drei unterschiedliche Behandlungsintensitäten – von einer sanften
                                    Auffrischung bis hin zu einer intensiven Hauterneuerung.
                                </p>
                                <p>
                                    Ob frischer Glow, ein ebenmäßigeres Hautbild oder intensive Hauterneuerung – bei skinlux
                                    wählen wir die Methode individuell abgestimmt auf deine Haut und ihre Bedürfnisse. Dabei
                                    steht immer deine individuelle Hautsituation im Mittelpunkt.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Kräuter */}
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
                                Natur trifft auf dermatologische Expertise
                            </span>
                            <h2 className="text-4xl md:text-5xl font-light mb-8 text-black">
                                Die Kraft ausgewählter Kräuter
                            </h2>
                            <div className="space-y-4 text-gray-600 font-light leading-relaxed mb-8">
                                <p>
                                    Das Herzstück der Original GREEN PEEL<sup>®</sup> Kräuterschälkur ist eine sorgfältig
                                    zusammengestellte Mischung aus ausgewählten Kräutern und pflanzlichen Inhaltsstoffen.
                                    Dazu zählen unter anderem:
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {kraeuter.map((kraut) => (
                                    <span
                                        key={kraut}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-light text-gray-700"
                                    >
                                        <Leaf className="w-4 h-4" style={{ color: "var(--color-secondary)" }} aria-hidden />
                                        {kraut}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-600 font-light leading-relaxed mb-6">
                                Die Kräutermischung unterstützt je nach Behandlungsmethode die natürlichen
                                Regenerationsprozesse der Haut und kann zu einem frischeren und ebenmäßigeren Hautbild
                                beitragen.
                            </p>
                            <p className="text-sm font-light tracking-[0.15em] uppercase text-gray-500">
                                Natürliche Inhaltsstoffe. Individuelle Behandlung. Professionelle Hautpflege.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-square bg-gray-100 overflow-hidden"
                        >
                            <Image
                                src="/images/green-peel/green-peel-kraeutermischung.jpg"
                                alt="GREEN PEEL® Kräutermischung"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Methoden & Preise */}
            <section id="methoden" className="py-20 bg-white scroll-mt-24">
                <div className="container">
                    <SectionHeading eyebrow="Methoden & Preise">Drei Methoden. Individuell für deine Haut.</SectionHeading>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {methoden.map((methode, index) => (
                            <motion.div
                                key={methode.id}
                                id={methode.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col p-8 border border-gray-200 bg-white hover:border-secondary/40 transition-colors scroll-mt-28"
                            >
                                <div className="mb-6">
                                    <span className="text-xs font-light tracking-[0.3em] uppercase text-gray-500 block mb-3">
                                        {methode.claim}
                                    </span>
                                    <h3 className="font-light text-black mb-2">
                                        <span className="block text-sm tracking-[0.2em] uppercase text-gray-500">
                                            GREEN PEEL<sup>®</sup>
                                        </span>
                                        <span className="block text-3xl">{methode.name}</span>
                                    </h3>
                                    <div className="text-3xl font-light mb-4" style={{ color: "var(--color-secondary)" }}>
                                        € {methode.preis}
                                    </div>
                                    <p className="text-gray-700 font-light">{methode.untertitel}</p>
                                </div>

                                <div className="space-y-3 text-sm text-gray-600 font-light leading-relaxed mb-6">
                                    {methode.beschreibung.map((absatz) => (
                                        <p key={absatz}>{absatz}</p>
                                    ))}
                                </div>

                                <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-500 mb-4">
                                    Besonders geeignet bei
                                </p>
                                <div className="mb-6 text-sm">
                                    <BulletList items={methode.geeignetBei} />
                                </div>

                                <div className="mt-auto space-y-4">
                                    {methode.inklusive && (
                                        <div className="bg-secondary/10 p-3 border border-secondary/20">
                                            <p className="text-sm font-light text-gray-700">{methode.inklusive}</p>
                                        </div>
                                    )}
                                    {methode.hinweis && (
                                        <p className="flex gap-2 text-xs font-light text-gray-500 leading-relaxed">
                                            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden />
                                            {methode.hinweis}
                                        </p>
                                    )}
                                    <a
                                        href={SHORE_BOOKING_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary inline-flex items-center justify-center w-full"
                                    >
                                        {methode.name} buchen
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ergebnisse */}
            <section className="py-20 bg-gray-50">
                <div className="container">
                    <SectionHeading eyebrow="Ergebnisse">Vorher & Nachher</SectionHeading>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
                        {ergebnisse.map((bild, index) => (
                            <motion.figure
                                key={bild.src}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white border border-gray-100"
                            >
                                <Image
                                    src={bild.src}
                                    alt={bild.alt}
                                    width={bild.width}
                                    height={bild.height}
                                    className="w-full h-auto"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <figcaption className="px-4 py-3 text-sm font-light text-gray-600">{bild.label}</figcaption>
                            </motion.figure>
                        ))}
                    </div>
                    <p className="text-center text-xs font-light text-gray-500 mt-8 max-w-2xl mx-auto">
                        Bildquelle: Dr. med. Christine Schrammek Kosmetik. Ergebnisse können individuell unterschiedlich
                        ausfallen.
                    </p>
                </div>
            </section>

            {/* Beratung */}
            <section className="py-20 bg-white">
                <div className="container max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Your Skin. Our Expertise.
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-8 text-black">
                            Welche GREEN PEEL<sup>®</sup> Behandlung passt zu dir?
                        </h2>
                        <div className="space-y-4 text-lg text-gray-600 font-light leading-relaxed mb-10">
                            <p>Nicht jede Haut benötigt dieselbe Behandlung.</p>
                            <p>
                                Bei skinlux steht deshalb die individuelle Beratung im Mittelpunkt. Wir beurteilen deinen
                                aktuellen Hautzustand, berücksichtigen deine Hautbedürfnisse und besprechen gemeinsam deine
                                Behandlungsziele.
                            </p>
                            <p>So wählen wir die passende GREEN PEEL<sup>®</sup> Methode für dich aus.</p>
                        </div>
                        <Link href="/kontakt" className="btn-primary inline-flex items-center justify-center">
                            Jetzt Beratungstermin vereinbaren
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Kontraindikationen */}
            <section className="py-20 bg-gray-50">
                <div className="container max-w-3xl mx-auto">
                    <SectionHeading eyebrow="Deine Hautgesundheit zuerst">
                        Wann ist GREEN PEEL<sup>®</sup> nicht geeignet?
                    </SectionHeading>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-8 md:p-10 bg-white border border-gray-100 space-y-6"
                    >
                        <p className="text-gray-600 font-light leading-relaxed">
                            Auch wenn GREEN PEEL<sup>®</sup> auf natürlichen Kräutern basiert, ist die Behandlung nicht für
                            jeden Hautzustand und jede Lebenssituation geeignet. Bei folgenden Umständen ist eine Behandlung
                            nicht geeignet oder muss vorab individuell abgeklärt werden:
                        </p>
                        <BulletList items={kontraindikationen} />

                        <div className="flex gap-4 p-5 border border-gray-200 bg-gray-50">
                            <Info className="w-6 h-6 flex-shrink-0 text-gray-600" aria-hidden />
                            <div className="space-y-3 text-sm md:text-base font-light text-gray-700">
                                <p>
                                    <strong className="font-normal text-black">Besonderheit bei GREEN PEEL® Fresh Up:</strong>{" "}
                                    Die sanfte Fresh Up Methode kann auch bei Rosacea sowie dünner Haut mit Teleangiektasien
                                    infrage kommen, sofern der individuelle Hautzustand dies zulässt und keine anderen
                                    Gegenanzeigen vorliegen.
                                </p>
                                <p>
                                    <strong className="font-normal text-black">Wichtig:</strong> Nicht jede Gegenanzeige
                                    betrifft alle drei Methoden gleichermaßen. Vor jeder Behandlung prüfen wir mögliche
                                    Kontraindikationen und wählen die passende GREEN PEEL<sup>®</sup> Methode individuell aus.
                                </p>
                            </div>
                        </div>

                        <div className="text-center pt-2">
                            <p className="text-sm font-light tracking-[0.2em] uppercase text-gray-500 mb-4">
                                Du bist unsicher?
                            </p>
                            <Link href="/kontakt" className="btn-secondary inline-flex items-center justify-center">
                                Jetzt Beratungstermin vereinbaren
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="container">
                    <SectionHeading eyebrow="Deine Fragen">
                        Häufig gestellte Fragen zu GREEN PEEL<sup>®</sup>
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
                        <Sparkles className="w-8 h-8 mx-auto mb-6" style={{ color: "var(--color-secondary)" }} />
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">Ready for your Skin Reset?</h2>
                        <p className="text-xl font-light text-gray-300 mb-4">
                            Entdecke die Original GREEN PEEL<sup>®</sup> Kräuterschälkur bei skinlux Medical Beauty in
                            Pottendorf.
                        </p>
                        <p className="text-lg font-light text-gray-400 mb-10">
                            Von sanfter Revitalisierung bis zur intensiven Hauterneuerung – wir begleiten dich auf dem Weg
                            zu einem gepflegten, ebenmäßiger wirkenden Hautbild.
                        </p>
                        <a
                            href={SHORE_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center justify-center"
                        >
                            Jetzt GREEN PEEL® Termin buchen
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
                        <Link
                            href="/behandlungen/signature-facials"
                            className="group p-6 bg-white hover:bg-gray-100 transition-colors"
                        >
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">Premium Facials</h3>
                            <p className="text-sm text-gray-500 font-light">Signature Treatments mit Circadia Professional</p>
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
