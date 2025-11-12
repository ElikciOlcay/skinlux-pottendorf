"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";
import { Zap, Shield, Clock, Heart, CheckCircle, ArrowRight, Sparkles, Award, Star, Quote } from "lucide-react";

const benefits = [
    {
        icon: Zap,
        title: "50% Rabatt",
        description: "Spare die Hälfte bei deinen ersten beiden Laser-Haarentfernung Behandlungen"
    },
    {
        icon: Shield,
        title: "Sicher & schmerzarm",
        description: "Modernste Diodenlaser-Technologie für sanfte und effektive Behandlungen"
    },
    {
        icon: Clock,
        title: "Dauerhafte Ergebnisse",
        description: "Nach 6-8 Behandlungen bis zu 90% weniger Haare - für immer"
    },
    {
        icon: Heart,
        title: "Alle Hauttypen",
        description: "Geeignet für alle Haut- und Haartypen, das ganze Jahr über"
    }
];

const features = [
    "Modernste Diodenlaser-Technologie",
    "Schmerzarme Behandlung mit Kühlung",
    "Schnelle Behandlungsdauer",
    "Keine Ausfallzeit",
    "Professionelle Beratung inklusive",
    "Kostenlose Probebehandlung möglich"
];

const popularAreas = [
    { name: "Achseln", duration: "10 Min.", price: "ab 30€" },
    { name: "Bikinizone", duration: "15 Min.", price: "ab 40€" },
    { name: "Beine komplett", duration: "45 Min.", price: "ab 120€" },
    { name: "Rücken", duration: "30 Min.", price: "ab 80€" }
];

const faq = [
    {
        frage: "Wie funktioniert die Aktion?",
        antwort: "Buche einfach deinen Termin online oder telefonisch. Der 50% Rabatt wird automatisch an der Kasse abgezogen - keine Gutscheincodes nötig!"
    },
    {
        frage: "Für welche Bereiche gilt die Aktion?",
        antwort: "Die Aktion gilt für alle Körperbereiche. Du kannst bei deinen ersten beiden Behandlungen jede beliebige Zone wählen."
    },
    {
        frage: "Wie viele Behandlungen brauche ich insgesamt?",
        antwort: "Für optimale Ergebnisse empfehlen wir 6-8 Behandlungen. Mit dieser Aktion sparst du bei den ersten beiden - der perfekte Start!"
    },
    {
        frage: "Ist die Behandlung schmerzhaft?",
        antwort: "Du spürst während der Behandlung ein leichtes Ziehen oder Prickeln - das ist völlig normal. Unser moderner Diodenlaser verfügt über eine integrierte Kühlung, die das Gefühl angenehmer macht. Die meisten Kunden empfinden es als gut aushaltbar."
    },
    {
        frage: "Wie lange ist die Aktion gültig?",
        antwort: "Die Aktion ist bis Ende Dezember 2025 gültig. Sichere dir jetzt deinen Termin und spare 50% bei deinen ersten beiden Behandlungen!"
    }
];

// Schema.org für die Aktion
const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "50% Rabatt auf Laser-Haarentfernung - Erste 2 Behandlungen",
    "description": "Exklusive Aktion: Spare 50% bei deinen ersten beiden Laser-Haarentfernung Behandlungen in Pottendorf. Dauerhafte Haarfreiheit zum halben Preis.",
    "url": "https://pottendorf.skinlux.at/laser-aktion",
    "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "50",
        "priceCurrency": "PERCENT_OFF"
    },
    "availableAtOrFrom": {
        "@type": "Place",
        "name": "Skinlux Pottendorf",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Marktplatz 14",
            "addressLocality": "Pottendorf",
            "postalCode": "2486",
            "addressRegion": "Niederösterreich",
            "addressCountry": "AT"
        }
    },
    "validFrom": "2024-11-01",
    "validThrough": "2025-12-31",
    "availability": "https://schema.org/InStock"
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.frage,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.antwort
        }
    }))
};

export default function LaserAktion() {
    useEffect(() => {
        document.title = "50% Rabatt Laser-Haarentfernung Pottendorf | Limitierte Aktion | Skinlux";
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 'Jetzt 50% sparen! Exklusive Laser-Haarentfernung Aktion in Pottendorf. Erste 2 Behandlungen zum halben Preis. Dauerhafte Haarfreiheit mit modernster Diodenlaser-Technologie. Buche jetzt deinen Termin!');

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', 'https://pottendorf.skinlux.at/laser-aktion');
    }, []);

    return (
        <>
            <Script
                id="offer-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-secondary) 0%, transparent 50%),
                                             radial-gradient(circle at 80% 80%, var(--color-accent) 0%, transparent 50%)`
                        }} />
                    </div>

                    <div className="container relative z-10">
                        <div className="max-w-5xl mx-auto">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex justify-center mb-8"
                            >
                                <span className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-light tracking-widest uppercase rounded-full shadow-lg">
                                    <Sparkles className="w-4 h-4" />
                                    Limitierte Aktion
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl md:text-7xl font-light text-center mb-6 text-black"
                            >
                                50% Rabatt auf
                                <br />
                                <span className="text-black">Laser-Haarentfernung</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-2xl md:text-3xl text-center text-gray-600 font-light mb-12 leading-relaxed"
                            >
                                Spare bei deinen ersten 2 Behandlungen.<br />
                                Dauerhafte Haarfreiheit zum halben Preis.
                            </motion.p>

                            {/* Discount Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="flex justify-center mb-12"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl" />
                                    <div className="relative bg-white rounded-full p-12 shadow-2xl border-4 border-secondary">
                                        <div className="text-8xl font-light text-secondary">50%</div>
                                        <div className="text-2xl font-light text-gray-700 text-center mt-2">Rabatt</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                            >
                                <a
                                    href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-12 py-6 bg-black text-white text-lg font-light tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:scale-105"
                                >
                                    Jetzt Termin buchen
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </a>
                                <a
                                    href="tel:06649188632"
                                    className="inline-flex items-center gap-3 px-12 py-6 border-2 border-black text-black text-lg font-light tracking-widest uppercase transition-all duration-300 hover:bg-black hover:text-white"
                                >
                                    0664 / 91 88 632
                                </a>
                            </motion.div>

                            {/* Trust Indicators */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500"
                            >
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-secondary" />
                                    <span>Keine versteckten Kosten</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-secondary" />
                                    <span>Rabatt automatisch abgezogen</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-secondary" />
                                    <span>Alle Hauttypen</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-white">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                                Warum <span className="text-black">Laser-Haarentfernung?</span>
                            </h2>
                            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
                                Die moderne Alternative zu Rasieren und Waxing
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="text-center p-6 border border-gray-100 hover:border-secondary/30 transition-colors"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 mb-6">
                                        <benefit.icon className="w-8 h-8 text-secondary" />
                                    </div>
                                    <h3 className="text-xl font-light mb-3 text-black">{benefit.title}</h3>
                                    <p className="text-gray-600 font-light">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Popular Areas */}
                <section className="py-20 bg-gray-50">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                                Beliebte <span className="text-black">Behandlungszonen</span>
                            </h2>
                            <p className="text-xl text-gray-600 font-light">
                                Mit 50% Rabatt auf deine ersten 2 Behandlungen
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {popularAreas.map((area, index) => (
                                <motion.div
                                    key={area.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white p-6 hover:shadow-lg transition-shadow"
                                >
                                    <h3 className="text-xl font-light mb-4 text-black">{area.name}</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm font-light">{area.duration}</span>
                                        </div>
                                        <div className="text-2xl font-light text-secondary">{area.price}</div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="text-sm font-light text-gray-500">
                                            Jetzt mit <span className="text-secondary font-normal">50% Rabatt</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link
                                href="/preise/laser"
                                className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark transition-colors"
                            >
                                Alle Preise ansehen
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20 bg-black text-white">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
                                    Was dich <span className="text-white">erwartet</span>
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                                        <span className="font-light">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Google Reviews Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-light tracking-widest uppercase text-gray-500">
                                    Google Bewertungen
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-light mb-3 text-black">
                                Das sagen unsere <span className="text-black">Kunden</span>
                            </h2>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>
                            <p className="text-lg font-light text-gray-600">
                                5.0 Sterne auf Google
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {/* Review 1 - Mayar Kazzaz */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all relative"
                            >
                                <div className="absolute top-4 right-4">
                                    <span className="text-xs font-light tracking-widest uppercase px-2 py-1 bg-secondary text-white rounded">
                                        NEU
                                    </span>
                                </div>
                                <Quote className="w-8 h-8 text-secondary/20 mb-4" />
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-gray-700 font-light mb-6 leading-relaxed">
                                    &ldquo;Ich hatte bereits drei Termine und bin sehr zufrieden! Schon nach dem ersten Termin konnte ich erste Ergebnisse sehen. Das Team ist super freundlich und das Studio sehr sauber und angenehm.&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                        <span className="text-sm font-light text-secondary">MK</span>
                                    </div>
                                    <div>
                                        <p className="font-light text-sm text-gray-900">Mayar Kazzaz</p>
                                        <p className="text-xs font-light text-gray-500">vor 1 Tag</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Review 2 - Sarah Kollwentz */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                            >
                                <Quote className="w-8 h-8 text-secondary/20 mb-4" />
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-gray-700 font-light mb-6 leading-relaxed">
                                    &ldquo;Ich bin wirklich begeistert! Schon nach der ersten Behandlung habe ich einen deutlichen Unterschied gemerkt. Das Team ist super freundlich und sorgt dafür, dass man sich sofort wohlfühlt.&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                        <span className="text-sm font-light text-secondary">SK</span>
                                    </div>
                                    <div>
                                        <p className="font-light text-sm text-gray-900">Sarah Kollwentz</p>
                                        <p className="text-xs font-light text-gray-500">vor einem Monat</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Review 3 - Silvana Wo */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                            >
                                <Quote className="w-8 h-8 text-secondary/20 mb-4" />
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-gray-700 font-light mb-6 leading-relaxed">
                                    &ldquo;Tolle und informative Beratung, einfühlsame Behandlung und ein sehr sauberes Studio. Bereits nach der ersten Sitzung sehe ich schon super Ergebnisse.&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                        <span className="text-sm font-light text-secondary">SW</span>
                                    </div>
                                    <div>
                                        <p className="font-light text-sm text-gray-900">Silvana Wo</p>
                                        <p className="text-xs font-light text-gray-500">vor 4 Monaten</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Google Reviews Link */}
                        <div className="text-center mt-12">
                            <a 
                                href="https://www.google.com/search?hl=de&q=skinlux+pottendorf+rezensionen" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-base font-light text-gray-600 hover:text-secondary transition-colors"
                            >
                                Alle Bewertungen auf Google ansehen
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-white">
                    <div className="container">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                                Häufige <span className="text-black">Fragen</span>
                            </h2>
                        </div>

                        <div className="max-w-3xl mx-auto space-y-6">
                            {faq.map((item, index) => (
                                <motion.div
                                    key={item.frage}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-gray-50 p-8"
                                >
                                    <h3 className="text-xl font-light mb-4 text-black">{item.frage}</h3>
                                    <p className="text-gray-600 font-light leading-relaxed">{item.antwort}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <Award className="w-16 h-16 mx-auto mb-8 text-secondary" />
                            <h2 className="text-4xl md:text-5xl font-light mb-6 text-black">
                                Bereit für dauerhafte <span className="text-black">Haarfreiheit?</span>
                            </h2>
                            <p className="text-xl text-gray-600 font-light mb-12">
                                Sichere dir jetzt 50% Rabatt auf deine ersten 2 Behandlungen.<br />
                                Der Rabatt wird automatisch an der Kasse abgezogen.
                            </p>
                            <a
                                href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 px-12 py-6 bg-black text-white text-lg font-light tracking-widest uppercase transition-all duration-300 hover:bg-gray-800 hover:shadow-2xl hover:scale-105"
                            >
                                Jetzt 50% sichern
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </a>
                            <p className="mt-8 text-sm text-gray-500">
                                Oder ruf uns an: <a href="tel:06649188632" className="text-secondary hover:underline">0664 / 91 88 632</a>
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
}

