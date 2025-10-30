import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalLayout from "../components/layout/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skinlux Pottendorf - Laser Haarentfernung & Premium Kosmetik | Baden, M\u00f6dling",
  description: "Skinlux Pottendorf: Professionelle Laser-Haarentfernung, HydraFacial®, und Premium Kosmetikbehandlungen in Baden-Pottendorf, N\u00d6. Modern Diodenlaser-Technologie. Auch f\u00fcr M\u00f6dling. Termin buchen!",
  keywords: "Laser Haarentfernung Pottendorf, Laser Haarentfernung Baden, Laser M\u00f6dling, Kosmetik Niederösterreich, HydraFacial Pottendorf, Laser Behandlung Baden, dauerhafte Haarentfernung, Beauty Studio Pottendorf, Skinlux",
  openGraph: {
    title: "Skinlux Pottendorf - Laser Haarentfernung & Kosmetik in Baden, M\u00f6dling",
    description: "Professionelle Laser-Haarentfernung und innovative Kosmetikbehandlungen in Pottendorf, Baden. Auch Kunden aus M\u00f6dling. Erleben Sie moderne Beauty-Treatments.",
    images: ["/og-image.jpg"],
    locale: "de_AT",
    type: "website",
    url: "https://skinlux-pottendorf.at",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${inter.className} antialiased`}
      >
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N76BWEKEH9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N76BWEKEH9');
          `}
        </Script>
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://skinlux-pottendorf.at",
            "name": "Skinlux Pottendorf",
            "image": "/images/logo/skinlux-logo.png",
            "description": "Professionelle Laser-Haarentfernung und Premium Kosmetikbehandlungen in Pottendorf, Baden, Niederösterreich. Spezialist für dauerhafte Haarentfernung, HydraFacial und Premium Facials.",
            "url": "https://skinlux-pottendorf.at",
            "telephone": "+43 664 91 88 632",
            "email": "hey@skinlux.at",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Marktplatz 14",
              "addressLocality": "Pottendorf",
              "postalCode": "2486",
              "addressRegion": "Niederösterreich",
              "addressCountry": "AT"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Baden"
              },
              {
                "@type": "City",
                "name": "Pottendorf"
              },
              {
                "@type": "City",
                "name": "Mödling"
              },
              {
                "@type": "AdministrativeArea",
                "name": "Niederösterreich"
              }
            ],
            "priceRange": "$$",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "19:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "17:00"
              }
            ],
            "sameAs": [
              "https://www.facebook.com/skinlux",
              "https://www.instagram.com/skinlux"
            ],
            "services": [
              {
                "@type": "Service",
                "name": "Laser Haarentfernung",
                "description": "Dauerhafte Haarentfernung mit modernster Diodenlaser-Technologie für alle Hauttypen",
                "areaServed": ["Baden", "Pottendorf", "Mödling", "Niederösterreich"],
                "priceRange": "ab 30€"
              },
              {
                "@type": "Service",
                "name": "HydraFacial",
                "description": "Revolutionäre 3-in-1 Gesichtsbehandlung mit sofort sichtbaren Ergebnissen",
                "areaServed": ["Baden", "Pottendorf", "Mödling"],
                "priceRange": "169€ - 249€"
              },
              {
                "@type": "Service",
                "name": "Premium Facials",
                "description": "Luxuriöse Gesichtspflege Behandlungen mit professionellen Produkten",
                "areaServed": ["Baden", "Pottendorf", "Mödling"],
                "priceRange": "150€ - 175€"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "ratingCount": "2000",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </Script>

        {/* FAQ Schema */}
        <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Ist die Laser-Haarentfernung schmerzhaft?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die moderne Diodenlaser-Technologie ist sehr schmerzarm. Die meisten Kunden beschreiben es als leichtes Kribbeln oder Wärmegefühl. Die integrierte Kühlung macht die Behandlung sehr angenehm."
                }
              },
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
                "name": "Kann ich eine kostenlose Probebehandlung machen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ja! Wir bieten eine kostenlose Laser-Probebehandlung an. So können Sie die Technologie unverbindlich testen."
                }
              },
              {
                "@type": "Question",
                "name": "Für welche Hauttypen ist die Behandlung geeignet?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Unsere moderne Diodenlaser-Technologie ist für alle Hauttypen geeignet. In der kostenlosen Erstberatung analysieren wir Ihren Hauttyp genau."
                }
              },
              {
                "@type": "Question",
                "name": "Wie lange hält das Ergebnis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nach Abschluss der Behandlungsserie ist das Ergebnis dauerhaft. Vereinzelt können nach Jahren einzelne Härchen nachwachsen, diese können mit Auffrischungsbehandlungen entfernt werden."
                }
              }
            ]
          })}
        </Script>

        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
