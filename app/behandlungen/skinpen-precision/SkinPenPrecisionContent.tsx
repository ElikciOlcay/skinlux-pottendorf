"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Award, Shield, Sparkles, Heart, CheckCircle, Clock } from "lucide-react";
import FaqAccordion from "@/components/ui/FaqAccordion";

const vorteile = [
    {
        icon: Heart,
        title: "Für dich gemacht",
        description: "Endlich wieder selbstbewusst in den Spiegel schauen. Unsere Behandlung hilft dir dabei, dich wieder wohl in deiner Haut zu fühlen.",
        stat: "100%",
        statLabel: "Individuell"
    },
    {
        icon: Sparkles,
        title: "Natürliche Schönheit",
        description: "Deine Haut wird strahlender, glatter und jünger. Wir aktivieren deine natürliche Hautregeneration.",
        stat: "Natürlich",
        statLabel: "& Sanft"
    },
    {
        icon: Shield,
        title: "Sicher & bewährt",
        description: "Bewährtes System für sichere und effektive Ergebnisse. Du kannst dich in unseren erfahrenen Händen sicher fühlen.",
        stat: "Sicher",
        statLabel: "& Bewährt"
    },
    {
        icon: Award,
        title: "Sofort sichtbar",
        description: "Bereits nach der ersten Behandlung siehst du erste Ergebnisse. Mit jeder weiteren Sitzung wird deine Haut strahlender und glatter.",
        stat: "Sofort",
        statLabel: "Wirkung"
    }
];

const indikationen = [
    {
        title: "Aknenarben loswerden",
        description: "Lass uns gemeinsam deine Aknenarben reduzieren. Viele Kundinnen und Kunden sehen schon nach wenigen Behandlungen deutliche Verbesserungen."
    },
    {
        title: "Pigmentflecken ausgleichen",
        description: "Ungleichmäßige Hautfarbe? Wir helfen dir dabei, deine Haut wieder gleichmäßig strahlen zu lassen."
    },
    {
        title: "Narben verblassen lassen",
        description: "Ob Operationsnarben oder alte Narben – wir können sie aufhellen und glätten, damit sie weniger auffallen."
    },
    {
        title: "Dehnungsstreifen reduzieren",
        description: "Dehnungsstreifen müssen nicht für immer bleiben. Wir können sie sichtbar verbessern."
    },
    {
        title: "Falten glätten",
        description: "Weniger Falten, strahlendere Haut – erlebe, wie viel frischer deine Haut nach der Behandlung aussieht."
    },
    {
        title: "Poren verfeinern",
        description: "Große Poren können das Hautbild stören. Mit unserer Behandlung wird deine Haut feiner und glatter."
    }
];

const behandlungsablauf = [
    {
        step: "01",
        title: "Wir lernen dich kennen",
        description: "In einem persönlichen Gespräch besprechen wir deine Wünsche und Ziele. Gemeinsam finden wir die beste Lösung für dich."
    },
    {
        step: "02",
        title: "Entspannte Vorbereitung",
        description: "Wir bereiten deine Haut sanft vor und sorgen dafür, dass du dich während der Behandlung rundum wohlfühlst."
    },
    {
        step: "03",
        title: "Die Behandlung",
        description: "Während der Behandlung spürst du ein leichtes Kribbeln. Wir arbeiten präzise und individuell auf dein Hautbild abgestimmt."
    },
    {
        step: "04",
        title: "Wirkstoffe für deine Haut",
        description: "Wir geben deiner Haut genau die Pflege, die sie braucht – abgestimmt auf dein Hautziel."
    },
    {
        step: "05",
        title: "Alles für zuhause",
        description: "Wir erklären dir genau, wie du deine Haut zuhause pflegen kannst, damit die Ergebnisse lange halten."
    }
];

const faq = [
    {
        frage: "Was macht diese Behandlung so besonders?",
        antwort: "Wir aktivieren die natürliche Regeneration deiner Haut. Keine künstlichen Füllstoffe, sondern deine eigene Haut arbeitet für dich und wird strahlender, glatter und jünger."
    },
    {
        frage: "Funktioniert das bei meiner Haut?",
        antwort: "Ja. Diese Behandlung ist für alle Hauttypen und Hautfarben geeignet. Wir passen alles individuell an deine Haut an."
    },
    {
        frage: "Wie oft muss ich kommen?",
        antwort: "Für langfristige Ergebnisse empfehlen wir 3-6 Behandlungen im Abstand von 4-6 Wochen. Erste Veränderungen sind oft bereits nach der ersten Sitzung sichtbar."
    },
    {
        frage: "Muss ich danach zuhause bleiben?",
        antwort: "Nein. Du kannst direkt wieder deinem Alltag nachgehen. Deine Haut kann 1-2 Tage leicht gerötet sein."
    },
    {
        frage: "Tut das weh?",
        antwort: "Die meisten Kundinnen und Kunden empfinden die Behandlung als gut verträglich. Auf Wunsch nutzen wir eine Betäubungscreme."
    },
    {
        frage: "Was kostet Microneedling mit SkinPen?",
        antwort: "Bei Skinlux Pottendorf beginnen die Preise für eine SkinPen Precision Behandlung ab 199 Euro pro Sitzung. Für optimale Ergebnisse bieten wir auch Kurpakete an."
    }
];

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
                            <div className="inline-flex items-center gap-2 mb-6">
                                <Award className="w-5 h-5" style={{ color: "var(--color-secondary)" }} />
                                <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
                                    Hautremodellierung
                                </span>
                                <span
                                    className="text-xs font-light tracking-widest uppercase px-3 py-1"
                                    style={{
                                        backgroundColor: "var(--color-secondary)",
                                        color: "white"
                                    }}
                                >
                                    NEU
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-light mb-6 text-black">
                                Microneedling
                            </h1>

                            <p className="text-xl text-gray-600 font-light mb-8 leading-relaxed">
                                SkinPen Precision Microneedling ist eine natürliche Hautregeneration, die deine eigene Hautheilung aktiviert.
                                Das Ergebnis: strahlendere, glattere und jünger aussehende Haut. Geeignet für alle Hauttypen
                                und das ganze Jahr über.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="text-2xl font-light mb-1" style={{ color: "var(--color-secondary)" }}>€ 199</div>
                                    <div className="text-sm font-light text-gray-600">60 Minuten</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-light mb-1 text-black">3er Kur</div>
                                    <div className="text-sm font-light text-gray-600">€ 499</div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex items-center justify-center text-lg px-8 py-4"
                                >
                                    Termin buchen
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
                                    src="https://bischofshofen.skinlux.at/images/microneedling/treatment-microneedling.png"
                                    alt="SkinPen Precision Behandlung"
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
                            { number: "100%", label: "Natürlich & sicher", icon: Shield },
                            { number: "Sofort", label: "Erste Ergebnisse", icon: Sparkles },
                            { number: "Für dich", label: "Individuell angepasst", icon: Heart }
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
                            Warum wir
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                            Das macht uns <span className="text-black">besonders</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {vorteile.map((vorteil, index) => (
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
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-light text-black">
                                            {vorteil.title}
                                        </h3>
                                        <div className="text-right">
                                            <div className="text-2xl font-light" style={{ color: "var(--color-secondary)" }}>
                                                {vorteil.stat}
                                            </div>
                                            <div className="text-xs text-gray-500 font-light">
                                                {vorteil.statLabel}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 font-light">
                                        {vorteil.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
                            Wobei wir dir helfen können
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                            Für diese <span className="text-black">Hautprobleme</span>
                        </h2>
                        <p className="text-lg text-gray-600 font-light max-w-3xl mx-auto">
                            Gemeinsam finden wir die beste Lösung für deine Haut.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {indikationen.map((indikation, index) => (
                            <motion.div
                                key={indikation.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="p-6 bg-white border border-gray-100 hover:border-secondary/30 transition-colors"
                            >
                                <CheckCircle className="w-6 h-6 mb-4" style={{ color: "var(--color-secondary)" }} />
                                <h3 className="text-lg font-light mb-2 text-black">
                                    {indikation.title}
                                </h3>
                                <p className="text-sm text-gray-600 font-light">
                                    {indikation.description}
                                </p>
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
                                        color: "white"
                                    }}
                                >
                                    {schritt.step}
                                </div>
                                <div className="flex-1 pt-2">
                                    <h3 className="text-xl font-light mb-2 text-black">
                                        {schritt.title}
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        {schritt.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="preise" className="py-20 bg-gray-50">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 mb-4 block">
                            Investition
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                            Microneedling <span className="text-black">Preise</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 border border-gray-200 bg-white"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2 text-black">
                                        Einzelbehandlung
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        60 Minuten SkinPen Precision Behandlung
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-light" style={{ color: "var(--color-secondary)" }}>
                                        € 199
                                    </div>
                                    <div className="text-sm text-gray-500 font-light">
                                        60 Min.
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="p-8 border border-secondary bg-secondary/5"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-light mb-2 text-black">
                                        3er Kur
                                    </h3>
                                    <p className="text-gray-600 font-light">
                                        Optimale Ergebnisse durch Behandlungsserie
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-light" style={{ color: "var(--color-secondary)" }}>
                                        € 499
                                    </div>
                                    <div className="text-sm text-gray-500 font-light">
                                        Ersparnis
                                    </div>
                                </div>
                            </div>
                            <div className="bg-secondary/10 p-3 border border-secondary/20">
                                <p className="text-sm font-light text-gray-700">
                                    <strong>Unser Tipp:</strong> Für nachhaltige Ergebnisse bei Narben und Hautverfeinerung.
                                </p>
                            </div>
                        </motion.div>
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
                            Bereit für strahlende <span className="text-white">Haut?</span>
                        </h2>
                        <p className="text-xl font-light text-gray-300 mb-8">
                            Vereinbare deinen SkinPen Termin in Pottendorf und erlebe glattere, frischere Haut.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center justify-center"
                            >
                                Termin buchen
                            </a>
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
        </main>
    );
}
