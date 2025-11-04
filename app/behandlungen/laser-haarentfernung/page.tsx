"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Check, Shield, Heart, Star, ArrowRight } from "lucide-react";
import { FEATURES } from "@/lib/features";
import Script from "next/script";
import { useEffect } from "react";

export default function LaserHaarentfernung() {
    // SEO Meta-Tags für Client Component
    useEffect(() => {
        document.title = "Laser Haarentfernung Pottendorf | Dauerhafte Haarfreiheit | Skinlux Pottendorf";

        // Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 'Professionelle Laser-Haarentfernung in Pottendorf, Baden, Mödling. Modernste Diodenlaser-Technologie für alle Hauttypen. FDA-zertifiziert, schmerzarm, dauerhaft. Kostenlose Probebehandlung. Über 2000 zufriedene Kunden.');

        // Keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', 'Laser Haarentfernung Pottendorf, Laser Haarentfernung Baden, Laser Haarentfernung Mödling, dauerhafte Haarentfernung, Diodenlaser, Laser Haarentfernung Niederösterreich, Laser Behandlung Pottendorf, Haarentfernung Pottendorf, professionelle Laser Haarentfernung');

        // Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
        if (!ogTitle.getAttribute('property')) ogTitle.setAttribute('property', 'og:title');
        ogTitle.setAttribute('content', 'Laser Haarentfernung Pottendorf | Dauerhafte Haarfreiheit');
        if (!document.querySelector('meta[property="og:title"]')) document.head.appendChild(ogTitle);

        const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
        if (!ogDescription.getAttribute('property')) ogDescription.setAttribute('property', 'og:description');
        ogDescription.setAttribute('content', 'Professionelle Laser-Haarentfernung mit modernster Diodenlaser-Technologie. Kostenlose Probebehandlung. Für alle Hauttypen geeignet.');
        if (!document.querySelector('meta[property="og:description"]')) document.head.appendChild(ogDescription);
    }, []);
    const vorteile = [
        {
            icon: Zap,
            title: "Modernste Technologie",
            description: "Diodenlaser der neuesten Generation für optimale Ergebnisse"
        },
        {
            icon: Shield,
            title: "Sicher & Schmerzarm",
            description: "FDA-zertifizierte Technologie mit integriertem Kühlsystem"
        },
        {
            icon: Heart,
            title: "Für alle Hauttypen",
            description: "Geeignet für alle Hauttypen und Hauttöne"
        }
    ];

    const ablauf = [
        {
            step: "01",
            title: "Beratung & Analyse",
            description: FEATURES.HAUTANALYSE_ENABLED
                ? "Kostenlose Erstberatung und professionelle Hautanalyse"
                : "Kostenlose Erstberatung und Hauttyp-Bestimmung"
        },
        {
            step: "02",
            title: "Behandlungsplan",
            description: "Individueller Behandlungsplan für optimale Ergebnisse"
        },
        {
            step: "03",
            title: "Laserbehandlung",
            description: "Schmerzarme Laserbehandlung mit modernster Diodentechnologie"
        },
        {
            step: "04",
            title: "Nachsorge",
            description: "Nachsorge und individuelle Pflegetipps für optimale Ergebnisse"
        }
    ];

    // Strukturierte Daten für KI-Suchmaschinen
    const medicalProcedureSchema = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "Laser Haarentfernung",
        "description": "Dauerhafte Haarentfernung mit modernster Diodenlaser-Technologie. FDA-zertifizierte Technologie für alle Hauttypen. Schmerzarme Behandlung mit integriertem Kühlsystem.",
        "medicalSpecialty": "Dermatologie",
        "procedureType": "Laser-Behandlung",
        "howPerformed": "Die Behandlung wird mit einem modernen Diodenlaser durchgeführt, der gezielt Haarfollikel zerstört. Ein integriertes Kühlsystem sorgt für maximalen Komfort.",
        "preparation": "Vor der Behandlung erfolgt eine kostenlose Erstberatung mit Hauttyp-Bestimmung und individueller Behandlungsplanung.",
        "followup": "Nachsorge und individuelle Pflegetipps für optimale Ergebnisse. Behandlungen finden im Abstand von 4-6 Wochen statt.",
        "provider": {
            "@type": "MedicalBusiness",
            "name": "Skinlux Pottendorf",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Marktplatz 14",
                "addressLocality": "Pottendorf",
                "postalCode": "2486",
                "addressRegion": "Niederösterreich",
                "addressCountry": "AT"
            },
            "telephone": "+43 664 91 88 632",
            "email": "hey@skinlux.at"
        },
        "areaServed": [
            { "@type": "City", "name": "Pottendorf" },
            { "@type": "City", "name": "Baden" },
            { "@type": "City", "name": "Mödling" },
            { "@type": "AdministrativeArea", "name": "Niederösterreich" }
        ],
        "priceRange": "ab 30€",
        "offers": {
            "@type": "Offer",
            "description": "Kostenlose Erstberatung inklusive Probebehandlung",
            "price": "0",
            "priceCurrency": "EUR"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Wie viele Behandlungen sind notwendig?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Die Anzahl der Behandlungen ist individuell und hängt von Hauttyp, Haarfarbe und behandelter Zone ab. Behandlungen finden im Abstand von 4-6 Wochen statt. Bei der kostenlosen Beratung erhalten Sie eine individuelle Einschätzung."
                }
            },
            {
                "@type": "Question",
                "name": "Ist die Behandlung schmerzhaft?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dank unseres integrierten Kühlsystems ist die Behandlung nahezu schmerzfrei. Die meisten Kunden beschreiben es als leichtes Kribbeln. Die moderne Diodenlaser-Technologie ist sehr angenehm."
                }
            },
            {
                "@type": "Question",
                "name": "Für welche Körperbereiche ist die Behandlung geeignet?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Die Laser-Haarentfernung kann an fast allen Körperstellen durchgeführt werden, einschließlich Gesicht, Achseln, Bikinizone, Beine und Rücken. In der kostenlosen Beratung besprechen wir alle Optionen."
                }
            }
        ]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Startseite",
                "item": "https://skinlux-pottendorf.at"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Behandlungen",
                "item": "https://skinlux-pottendorf.at/#treatments"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Laser Haarentfernung",
                "item": "https://skinlux-pottendorf.at/behandlungen/laser-haarentfernung"
            }
        ]
    };

    return (
        <>
            {/* Strukturierte Daten für KI-Suchmaschinen */}
            <Script
                id="medical-procedure-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
            />
            <Script
                id="faq-schema-laser"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <main className="min-h-screen bg-white" itemScope itemType="https://schema.org/MedicalProcedure">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32">
                    <div className="container">
                        <Link
                            href="/#treatments"
                            className="inline-flex items-center gap-2 text-sm font-light text-gray-600 hover:text-black transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Zurück
                        </Link>

                        <div className="max-w-4xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Left Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--color-secondary)' }} />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600 font-light">
                                            Über 2000 zufriedene Kunden
                                        </span>
                                    </div>

                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight text-black" itemProp="name">
                                        Dauerhafte<br />
                                        <span style={{ color: 'var(--color-secondary)' }}>Haarfreiheit</span>
                                    </h1>

                                    <p className="text-lg md:text-xl text-gray-600 font-light mb-8 leading-relaxed" itemProp="description">
                                        Modernste Diodenlaser-Technologie für effektive und schmerzarme
                                        Haarentfernung. Erleben Sie glatte Haut ohne tägliches Rasieren.
                                        Professionelle Laser-Haarentfernung in Pottendorf, Baden und Mödling.
                                        Unsere FDA-zertifizierte Technologie ist für alle Hauttypen geeignet
                                        und bietet dauerhafte Ergebnisse ohne tägliches Rasieren.
                                    </p>

                                    {/* Quick Benefits */}
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        {[
                                            { icon: Check, text: "FDA-zertifiziert" },
                                            { icon: Check, text: "Alle Hauttypen" },
                                            { icon: Check, text: "Schmerzarm" }
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <item.icon className="w-4 h-4" style={{ color: 'var(--color-secondary)' }} />
                                                <span className="text-sm text-gray-700 font-light">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a
                                            href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary inline-flex items-center justify-center"
                                        >
                                            Kostenlose Probebehandlung
                                        </a>
                                        <Link
                                            href="/preise/laser"
                                            className="btn-secondary inline-flex items-center justify-center"
                                        >
                                            Preise ansehen
                                        </Link>
                                    </div>
                                </motion.div>

                                {/* Right Content - Video */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="relative"
                                >
                                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg">
                                        <video
                                            src="/videos/laser-hero.mp4"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover"
                                            poster="/images/gallery/treatment-laser.jpg"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vorteile */}
                <section className="py-16 md:py-20 bg-gray-50">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">
                                    Ihre <span style={{ color: 'var(--color-secondary)' }}>Vorteile</span>
                                </h2>
                            </motion.div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {vorteile.map((vorteil, index) => (
                                    <motion.div
                                        key={vorteil.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-secondary/10">
                                            <vorteil.icon
                                                className="w-8 h-8"
                                                style={{ color: 'var(--color-secondary)' }}
                                            />
                                        </div>
                                        <h3 className="text-xl font-light mb-3 text-black">
                                            {vorteil.title}
                                        </h3>
                                        <p className="text-gray-600 font-light text-sm">
                                            {vorteil.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Behandlungsablauf */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">
                                    Der <span style={{ color: 'var(--color-secondary)' }}>Behandlungsablauf</span>
                                </h2>
                            </motion.div>

                            <div className="space-y-8">
                                {ablauf.map((schritt, index) => (
                                    <motion.div
                                        key={schritt.step}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="flex items-start gap-6"
                                    >
                                        <div
                                            className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-lg font-light rounded-full"
                                            style={{
                                                backgroundColor: 'var(--color-secondary)',
                                                color: 'white'
                                            }}
                                        >
                                            {schritt.step}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <h3 className="text-lg font-light mb-2 text-black">
                                                {schritt.title}
                                            </h3>
                                            <p className="text-gray-600 font-light text-sm">
                                                {schritt.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing CTA */}
                <section className="py-16 md:py-20 bg-gray-50">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">
                                    Preise & <span style={{ color: 'var(--color-secondary)' }}>Pakete</span>
                                </h2>
                                <p className="text-gray-600 font-light mb-8">
                                    Transparente Preise für alle Körperzonen. Kostenloses Erstgespräch inklusive Probebehandlung.
                                </p>
                                <Link
                                    href="/preise/laser"
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    Alle Preise ansehen
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 md:py-20 bg-white" itemScope itemType="https://schema.org/FAQPage">
                    <div className="container max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-light mb-6 text-black">
                                Häufige <span style={{ color: 'var(--color-secondary)' }}>Fragen</span>
                            </h2>
                        </motion.div>

                        <div className="space-y-6" itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
                            {[
                                {
                                    frage: "Wie viele Behandlungen sind notwendig?",
                                    antwort: "Die Anzahl der Behandlungen ist individuell und hängt von Hauttyp, Haarfarbe und behandelter Zone ab. Behandlungen finden im Abstand von 4-6 Wochen statt."
                                },
                                {
                                    frage: "Ist die Behandlung schmerzhaft?",
                                    antwort: "Dank unseres integrierten Kühlsystems ist die Behandlung nahezu schmerzfrei. Die meisten Kunden beschreiben es als leichtes Kribbeln."
                                },
                                {
                                    frage: "Für welche Körperbereiche ist die Behandlung geeignet?",
                                    antwort: "Die Laser-Haarentfernung kann an fast allen Körperstellen durchgeführt werden, einschließlich Gesicht, Achseln, Bikinizone, Beine und Rücken."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="p-6 border-b border-gray-200"
                                    itemScope
                                    itemType="https://schema.org/Question"
                                >
                                    <h3 className="text-lg font-light mb-3 text-black" itemProp="name">
                                        {item.frage}
                                    </h3>
                                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                                        <p className="text-gray-600 font-light text-sm" itemProp="text">
                                            {item.antwort}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-16 md:py-20 bg-black text-white">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-light mb-6">
                                    Starten Sie Ihre Reise zu<br />
                                    <span style={{ color: 'var(--color-secondary)' }}>dauerhafter Haarfreiheit</span>
                                </h2>
                                <p className="text-lg font-light text-gray-300 mb-8">
                                    Kostenlose Erstberatung inklusive Probebehandlung
                                </p>
                                <a
                                    href="https://connect.shore.com/bookings/dc2d0fdc-7b2a-4fa4-b3a5-8305737b8f1e/services?hl=de-AT&gei=Iwh2aM38Auy69u8Pmae0aQ&rwg_token=ACgRB3dRZMVhLtkIuF0fRbzv9GM0kGSjP3rM39ofuuwZDTydcvoXAWib3y3tuvKM2MJqsNcKA5PRZKvTFP_MXcHXA8uv6aoP0g%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-10 py-4 bg-white text-black text-base font-light hover:bg-gray-100 transition-colors"
                                >
                                    Jetzt Termin buchen
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
} 