import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import ConditionalLayout from "../components/layout/ConditionalLayout";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/site";
import { GOOGLE_AGGREGATE_RATING_SCHEMA, GOOGLE_REVIEWS_URL, OPENING_HOURS_SCHEMA } from "@/lib/business-info";
import {
  GTM_ID,
  getConsentBootstrapInlineScript,
} from "@/lib/cookie-consent";
import { getMetaPixelBootstrapInlineScript } from "@/lib/meta-tracking";

const TREATMENTS = [
  {
    name: "Laser Haarentfernung",
    url: "/behandlungen/laser-haarentfernung",
    description: "Dauerhafte Haarentfernung mit Diodenlaser und integrierter Kühlung für alle Hauttypen. Kostenloses Erstgespräch mit Probebehandlung.",
  },
  {
    name: "HydraFacial",
    url: "/behandlungen/hydra-facial",
    description: "Original HydraFacial – 3-in-1-Gesichtsbehandlung aus Reinigung, Peeling und Feuchtigkeit.",
  },
  {
    name: "SkinPen Precision Elite Microneedling",
    url: "/behandlungen/skinpen-precision",
    description: "FDA-zertifiziertes medizinisches Microneedling bei Aknenarben, Falten, Poren und Pigmentstörungen.",
  },
  {
    name: "GREEN PEEL Kräuterschälkur",
    url: "/behandlungen/green-peel",
    description: "Original GREEN PEEL Kräuterschälkur nach Dr. med. Christine Schrammek – Fresh Up, Energy und Classic.",
  },
  {
    name: "HydraScalp mit Keravive",
    url: "/behandlungen/hydrascalp",
    description: "Kopfhautbehandlung by HydraFacial – Reinigung, Exfoliation und Keravive Peptide Complex inklusive Heimpflege.",
  },
  {
    name: "Premium Facials mit Circadia",
    url: "/behandlungen/signature-facials",
    description: "Gesichtsbehandlungen mit Circadia Professional, individuell auf die Haut abgestimmt.",
  },
];

const plusJakartaSans = localFont({
    src: "./fonts/plus-jakarta-sans-latin.woff2",
    weight: "300 800",
    style: "normal",
    display: "swap",
    variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Skinlux Pottendorf | Laser Haarentfernung & Premium Kosmetik | Baden, Mödling",
    template: "%s | Skinlux Pottendorf",
  },
  description: "Laser Haarentfernung, HydraFacial, SkinPen Microneedling & GREEN PEEL in Pottendorf. Kostenlose Probebehandlung, 5,0 ★ bei Google. Für Baden, Mödling & NÖ.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Skinlux Pottendorf | Laser Haarentfernung & Premium Kosmetik | Baden, Mödling",
    description: "Laser Haarentfernung, HydraFacial, SkinPen Microneedling & GREEN PEEL in Pottendorf. Kostenlose Probebehandlung, 5,0 ★ bei Google. Für Baden, Mödling & NÖ.",
    images: [OG_IMAGE_URL],
    locale: "de_AT",
    type: "website",
    siteName: "Skinlux Pottendorf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skinlux Pottendorf | Laser Haarentfernung Baden, Mödling",
    description: "Laser Haarentfernung & HydraFacial in Pottendorf. Modernste Diodenlaser-Technologie. Kostenlose Probebehandlung.",
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        className={`${plusJakartaSans.variable} ${plusJakartaSans.className} antialiased`}
      >
        {/* Consent Mode V2 default denied – Cookiebot (GTM) aktualisiert nach Consent */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {getConsentBootstrapInlineScript()}
        </Script>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {getMetaPixelBootstrapInlineScript()}
        </Script>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "@id": "https://pottendorf.skinlux.at/#business",
              "name": "Skinlux Pottendorf",
              "alternateName": "Skinlux Medical Beauty Studio Pottendorf",
              "image": "https://pottendorf.skinlux.at/images/logo/skinlux-logo.png",
              "logo": "https://pottendorf.skinlux.at/images/logo/skinlux-logo.png",
              "description": "Skinlux Medical Beauty Studio in Pottendorf – Spezialist für dauerhafte Laser Haarentfernung, HydraFacial, SkinPen Microneedling, GREEN PEEL Kräuterschälkur, HydraScalp Kopfhautbehandlung und Premium Facials mit Circadia in Niederösterreich. Kostenlose Erstberatung mit Probebehandlung. Für Kundinnen und Kunden aus Pottendorf, Baden, Mödling, Wiener Neustadt und ganz Niederösterreich.",
              "url": "https://pottendorf.skinlux.at",
              "telephone": "+436649188632",
              "email": "hey@skinlux.at",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Marktplatz 14",
                "addressLocality": "Pottendorf",
                "postalCode": "2486",
                "addressRegion": "Niederösterreich",
                "addressCountry": {
                  "@type": "Country",
                  "name": "AT"
                }
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "47.9147",
                "longitude": "16.3917"
              },
              "areaServed": [
                { "@type": "City", "name": "Pottendorf" },
                { "@type": "City", "name": "Baden" },
                { "@type": "City", "name": "Mödling" },
                { "@type": "City", "name": "Wiener Neustadt" },
                { "@type": "State", "name": "Niederösterreich" }
              ],
              "priceRange": "$$",
              "openingHoursSpecification": OPENING_HOURS_SCHEMA,
              "sameAs": [
                "https://www.instagram.com/skinlux",
                GOOGLE_REVIEWS_URL
              ],
              "brand": { "@type": "Brand", "name": "Skinlux", "url": "https://www.skinlux.at" },
              "knowsAbout": [
                "Laser Haarentfernung",
                "Diodenlaser",
                "HydraFacial",
                "Microneedling",
                "SkinPen",
                "GREEN PEEL",
                "Kräuterschälkur",
                "HydraScalp",
                "Keravive",
                "Kopfhautbehandlung",
                "Circadia",
                "Gesichtsbehandlung",
                "Hautanalyse"
              ],
              "aggregateRating": GOOGLE_AGGREGATE_RATING_SCHEMA,
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Behandlungen",
                "itemListElement": TREATMENTS.map((treatment) => ({
                  "@type": "Offer",
                  "url": `${SITE_URL}${treatment.url}`,
                  "itemOffered": {
                    "@type": "Service",
                    "name": treatment.name,
                    "description": treatment.description,
                    "url": `${SITE_URL}${treatment.url}`,
                    "provider": { "@id": "https://pottendorf.skinlux.at/#business" }
                  }
                }))
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://pottendorf.skinlux.at/#website",
              "name": "Skinlux Pottendorf",
              "url": "https://pottendorf.skinlux.at",
              "publisher": { "@id": "https://pottendorf.skinlux.at/#organization" }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://pottendorf.skinlux.at/#organization",
              "name": "Skinlux Medical Beauty Studio",
              "alternateName": "Skinlux Pottendorf",
              "url": "https://pottendorf.skinlux.at",
              "logo": {
                "@type": "ImageObject",
                "url": "https://pottendorf.skinlux.at/images/logo/skinlux-logo.png"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+436649188632",
                "contactType": "customer service",
                "email": "hey@skinlux.at",
                "availableLanguage": ["German", "English"]
              },
              "sameAs": ["https://www.instagram.com/skinlux"]
            })
          }}
        />

        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
