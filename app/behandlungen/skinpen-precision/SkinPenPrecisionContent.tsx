"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    Award,
    Shield,
    Sparkles,
    Heart,
    CheckCircle,
    Clock,
    Info,
} from "lucide-react";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";
import { SKINPEN_COMING_SOON_LABEL } from "@/lib/skinpen-badge";

const eignetSichBesonders = [
    "Aknenarben und anderen Narben",
    "feinen Linien und Falten",
    "chirurgischen Narben und Dehnungsstreifen",
    "vergrößerten Poren",
    "Pigmentstörungen (Dyschromie)",
];

const eigenschaftenVorteile = [
    {
        icon: Shield,
        title: "Höchster Sicherheitsstandard",
        description: "FDA-zertifiziert für medizinisches Microneedling.",
    },
    {
        icon: Award,
        title: "Präzise Nadeln",
        description: "Hochwertiger japanischer Stahl für kontrollierte, sterile Anwendung.",
    },
    {
        icon: Sparkles,
        title: "Intensive Zellneubildung",
        description: "Sichtbare Anregung der Hautregeneration in kurzer Zeit.",
    },
    {
        icon: Heart,
        title: "Kollagen & Elastin",
        description: "Stimuliert die natürliche Kollagen- und Elastinproduktion Ihrer Haut.",
    },
];

const sichtbarVerbessertesHautbild = [
    "Narben & Aknenarben",
    "Falten & feinen Linien",
    "Pigmentflecken",
    "vergrößerten Poren",
    "unebener Hautstruktur",
];

const warumMedizinischesMicroneedling = [
    "Baut Narbengewebe gezielt und kontrolliert mechanisch ab.",
    "Aktiviert zelluläre Enzyme (Matrix-Metalloproteinasen / MMPs), die für den natürlichen Hautumbau verantwortlich sind.",
    "Fördert die strukturierte Neubildung von Kollagen und Elastin und unterstützt so die Remodellierung des Gewebes.",
    "Verbessert rötliche und violette Verfärbungen (z. B. bei Aknenarben) durch eine gesteigerte Durchblutung.",
    "Reduziert braune Verfärbungen und postinflammatorische Hyperpigmentierung (PIH) durch die Aktivierung natürlicher Wachstumsfaktoren der Haut.",
];

const behandlungsablauf = [
    {
        step: "01",
        title: "Wir lernen dich kennen",
        description:
            "In einem persönlichen Gespräch besprechen wir deine Wünsche und Ziele. Gemeinsam finden wir die beste Lösung für dich.",
    },
    {
        step: "02",
        title: "Entspannte Vorbereitung",
        description:
            "Wir bereiten deine Haut sanft vor und sorgen dafür, dass du dich während der Behandlung rundum wohlfühlst.",
    },
    {
        step: "03",
        title: "Die Behandlung",
        description:
            "Während der Behandlung spürst du ein leichtes Kribbeln. Wir arbeiten präzise und individuell auf dein Hautbild abgestimmt.",
    },
    {
        step: "04",
        title: "Wirkstoffe für deine Haut",
        description:
            "Wir geben deiner Haut genau die Pflege, die sie braucht – abgestimmt auf dein Hautziel.",
    },
    {
        step: "05",
        title: "Alles für zuhause",
        description:
            "Wir erklären dir genau, wie du deine Haut zuhause pflegen kannst, damit die Ergebnisse lange halten.",
    },
];

const faq = [
    {
        frage: "Was ist SkinPen® Precision Elite?",
        antwort:
            "SkinPen® Precision Elite ist ein medizinisches Microneedling-Gerät, das den natürlichen Wundheilungsprozess der Haut aktiviert, die Hautregeneration stimuliert und die Neubildung von Kollagen und Elastin anregt.",
    },
    {
        frage: "Was macht diese Behandlung so besonders?",
        antwort:
            "Wir arbeiten mit einem FDA-zertifizierten System und kontrollierter Stimulation. Ihre Haut reguliert dabei unter anderem die Pigmentierungsaktivität – für ein verfeinertes, ebenmäßigeres Hautbild.",
    },
    {
        frage: "Funktioniert das bei meiner Haut?",
        antwort:
            "In der Beratung prüfen wir Hauttyp, Beschwerdebild und eventuelle Kontraindikationen. So passen wir die Behandlung sicher und individuell an.",
    },
    {
        frage: "Wie oft muss ich kommen?",
        antwort:
            "Für langfristige Ergebnisse empfehlen wir in der Regel 3–6 Behandlungen im Abstand von 4–6 Wochen. Erste Veränderungen sind oft bereits nach der ersten Sitzung sichtbar.",
    },
    {
        frage: "Gibt es eine Ausfallzeit?",
        antwort:
            "Es kann zu 1–2 Tagen kommen, in denen die Haut gerötet oder leicht empfindlich ist. Planen Sie in dieser Zeit ggf. etwas mehr Ruhe für die Haut ein.",
    },
    {
        frage: "Muss ich danach zuhause bleiben?",
        antwort:
            "Nein. Sie müssen nicht zuhause bleiben. Mit der kurzen Ausfallzeit (Rötung, Empfindlichkeit) sollten Sie im Alltag jedoch vorsichtig mit Sonne, Sport und reizenden Produkten umgehen – das besprechen wir mit Ihnen im Studio.",
    },
    {
        frage: "Tut das weh?",
        antwort:
            "Die meisten Kundinnen und Kunden empfinden die Behandlung als gut verträglich. Auf Wunsch nutzen wir eine Betäubungscreme.",
    },
    {
        frage: "Wann darf ich nicht behandelt werden?",
        antwort:
            "Behandlungen sind bei Schwangerschaft und Stillzeit, aktiven Fieberblasen, Blutverdünnung, ausgeprägter Keloid-Narbenbildung, Erkältungssymptomen oder akuten Krankheiten nicht möglich. Bei Unsicherheit fragen Sie bitte vorab in der Beratung nach.",
    },
    {
        frage: "Was kostet Microneedling mit SkinPen®? Wann kann ich buchen?",
        antwort:
            "Preise und Online-Buchung für SkinPen® Precision Elite folgen in Kürze. Bis dahin erreichen Sie uns gern telefonisch oder über die Kontaktseite – wir informieren Sie, sobald es losgeht.",
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

export default function SkinPenPrecisionContent() {
    return (
        <main className="min-h-screen bg-white" itemScope itemType="https://schema.org/MedicalProcedure">
            <section className="pt-24 pb-20 bg-white" itemScope itemProp="about">
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
                                <Award className="w-5 h-5" style={{ color: "var(--color-secondary)" }} />
                                <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                    Medizinisches Microneedling
                                </span>
                                <span
                                    className="text-xs font-light tracking-widest uppercase px-3 py-1"
                                    style={{
                                        backgroundColor: "var(--color-secondary)",
                                        color: "white",
                                    }}
                                >
                                    FDA-zertifiziert
                                </span>
                                <ComingSoonBadge size="md" />
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black leading-tight">
                                SkinPen<sup className="text-2xl md:text-3xl align-super">®</sup> Precision Elite
                            </h1>

                            <p className="text-xl text-gray-600 font-light mb-6 leading-relaxed">
                                Der SkinPen<sup>®</sup> Precision Elite ist ein medizinisches Microneedling-Gerät, das gezielt den
                                natürlichen Wundheilungsprozess der Haut aktiviert. Dadurch wird die Hautregeneration stimuliert und
                                die Neubildung von Kollagen und Elastin angeregt.
                            </p>

                            <div className="mb-8">
                                <p className="text-sm font-light tracking-[0.2em] uppercase text-gray-500 mb-4">
                                    Die Behandlung eignet sich besonders zur Verbesserung von
                                </p>
                                <BulletList items={eignetSichBesonders} />
                            </div>

                            <p className="text-lg text-gray-600 font-light mb-8 leading-relaxed">
                                Durch die kontrollierte Stimulation wird die Pigmentierungsaktivität der Haut reguliert und das
                                Hautbild sichtbar verfeinert und ebenmäßiger.
                            </p>

                            <p className="text-sm font-light text-gray-500 mb-8 border-l-2 border-gray-200 pl-4">
                                Buchung und Preise für diese Behandlung folgen in Kürze ({SKINPEN_COMING_SOON_LABEL}). Bei Fragen
                                erreichen Sie uns jederzeit.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/kontakt"
                                    className="btn-primary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Kontakt
                                </Link>
                                <Link
                                    href="/#consultation"
                                    className="btn-secondary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Kostenlose Beratung
                                </Link>
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
                                    src="https://bischofshofen.skinlux.at/images/microneedling/treatment-microneedling.png"
                                    alt="SkinPen Precision Elite Behandlung in Pottendorf"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    loading="lazy"
                                />
                                <div className="absolute -inset-4 border-2 border-secondary opacity-20" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-black text-white">
                <div className="container">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { number: "4-6", label: "Wochen Abstand", icon: Clock },
                            { number: "FDA", label: "Zertifiziert", icon: Shield },
                            { number: "Kurz", label: "Regenerationsphase", icon: Sparkles },
                            { number: "Für Sie", label: "Individuell geplant", icon: Heart },
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
                                <div className="text-4xl font-light mb-2">{stat.number}</div>
                                <div className="text-sm font-light text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Technologie
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                            Eigenschaften & <span className="text-black">Vorteile</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {eigenschaftenVorteile.map((vorteil, index) => (
                            <motion.div
                                key={vorteil.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex gap-6 p-8 border border-gray-100 hover:border-secondary/30 transition-colors group"
                            >
                                <div
                                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center"
                                    style={{ backgroundColor: "rgba(240, 163, 188, 0.1)" }}
                                >
                                    <vorteil.icon
                                        className="w-8 h-8"
                                        style={{ color: "var(--color-secondary)" }}
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-light mb-2 text-black">{vorteil.title}</h3>
                                    <p className="text-gray-600 font-light">{vorteil.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Indikationen
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                            Für ein sichtbar verbessertes <span className="text-black">Hautbild</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-8 md:p-10 bg-white border border-gray-100"
                    >
                        <BulletList items={sichtbarVerbessertesHautbild} />
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Wirkprinzip
                        </span>
                        <h2 className="text-3xl md:text-4xl font-light text-black leading-snug">
                            Warum medizinisches Microneedling mit SkinPen<sup>®</sup> Precision Elite?
                        </h2>
                    </motion.div>
                    <ol className="space-y-6 font-light text-gray-700">
                        {warumMedizinischesMicroneedling.map((text, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="flex gap-4"
                            >
                                <span
                                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-light text-white"
                                    style={{ backgroundColor: "var(--color-secondary)" }}
                                >
                                    {index + 1}
                                </span>
                                <span className="pt-1">{text}</span>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            So läuft es ab
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                            Der <span className="text-black">Behandlungsablauf</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {behandlungsablauf.map((schritt, index) => (
                            <motion.div
                                key={schritt.step}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex items-start gap-8 mb-12 last:mb-0"
                            >
                                <div
                                    className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-2xl font-light"
                                    style={{
                                        backgroundColor: "var(--color-secondary)",
                                        color: "white",
                                    }}
                                >
                                    {schritt.step}
                                </div>
                                <div className="flex-1 pt-2">
                                    <h3 className="text-xl font-light mb-2 text-black">{schritt.title}</h3>
                                    <p className="text-gray-600 font-light">{schritt.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="container max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex gap-4 p-6 md:p-8 border border-gray-200 bg-gray-50"
                    >
                        <Info className="w-6 h-6 flex-shrink-0 text-gray-600" aria-hidden />
                        <div className="space-y-4 text-sm md:text-base font-light text-gray-700">
                            <p>
                                <strong className="font-normal text-black">Hinweise:</strong> Es kann zu 1–2 Tagen Ausfallzeit
                                kommen, in denen die Haut gerötet oder leicht empfindlich sein kann.
                            </p>
                            <p>
                                <strong className="font-normal text-black">Bitte beachten:</strong> Behandlungen können bei
                                Schwangerschaft &amp; Stillzeit, aktiven Fieberblasen, Blutverdünnung, Keloid-Narbenbildung,
                                Erkältungssymptomen oder akuten Krankheiten nicht durchgeführt werden.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Deine Fragen
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                            Alles was du <span className="text-black">wissen möchtest</span>
                        </h2>
                    </motion.div>

                    <FaqAccordion items={faq} />
                </div>
            </section>

            <section className="py-20 bg-black text-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
                            Bereit für ein verfeinertes <span className="text-white">Hautbild?</span>
                        </h2>
                        <p className="text-xl font-light text-gray-300 mb-4">
                            Interesse an SkinPen<sup>®</sup> Precision Elite in Pottendorf? Buchung und Preise folgen in Kürze.
                        </p>
                        <div className="flex justify-center mb-8">
                            <ComingSoonBadge size="md" className="ring-white/10" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/kontakt" className="btn-primary inline-flex items-center justify-center">
                                Kontakt
                            </Link>
                            <Link
                                href="/#consultation"
                                className="btn-secondary bg-white text-black hover:bg-gray-100 inline-flex items-center justify-center"
                            >
                                Kostenlose Beratung
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-light text-black mb-3">Weitere Behandlungen</h2>
                        <p className="text-gray-600 font-light">Entdecken Sie unser Behandlungsangebot</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
                        <Link href="/behandlungen/hydra-facial" className="group p-6 bg-white hover:bg-gray-100 transition-colors">
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">HydraFacial</h3>
                            <p className="text-sm text-gray-500 font-light">
                                3-in-1 Behandlung für sichtbare Ergebnisse
                            </p>
                        </Link>
                        <Link
                            href="/behandlungen/signature-facials"
                            className="group p-6 bg-white hover:bg-gray-100 transition-colors"
                        >
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">Premium Facials</h3>
                            <p className="text-sm text-gray-500 font-light">Signature Treatments mit Circadia Professional</p>
                        </Link>
                        <Link href="/behandlungen/hautanalyse" className="group p-6 bg-white hover:bg-gray-100 transition-colors">
                            <h3 className="text-lg font-light text-black mb-2 group-hover:text-gray-700">Hautanalyse</h3>
                            <p className="text-sm text-gray-500 font-light">Professionelle Analyse mit moderner Technologie</p>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
