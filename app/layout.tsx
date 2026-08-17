import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalLayout from "../components/layout/ConditionalLayout";
import { SITE_URL, OG_IMAGE_URL } from "@/lib/site";
import { GOOGLE_AGGREGATE_RATING_SCHEMA, OPENING_HOURS_SCHEMA } from "@/lib/business-info";
import { COOKIE_CONSENT_KEY, GTM_ID } from "@/lib/cookie-consent";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Skinlux Pottendorf | Laser Haarentfernung & Premium Kosmetik | Baden, Mödling",
    template: "%s | Skinlux Pottendorf",
  },
  description: "Laser Haarentfernung & HydraFacial in Pottendorf. Modernste Diodenlaser-Technologie, kostenlose Probebehandlung. Für Baden, Mödling & Niederösterreich.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Skinlux Pottendorf | Laser Haarentfernung & Premium Kosmetik | Baden, Mödling",
    description: "Laser Haarentfernung & HydraFacial in Pottendorf. Modernste Diodenlaser-Technologie, kostenlose Probebehandlung. Für Baden, Mödling & Niederösterreich.",
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
        {/* Consent Mode default + gespeicherte Zustimmung VOR GTM */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            try {
              var stored = localStorage.getItem('${COOKIE_CONSENT_KEY}');
              if (stored) {
                var data = JSON.parse(stored);
                var prefs = data.preferences || {};
                gtag('consent', 'update', {
                  'analytics_storage': prefs.analytics ? 'granted' : 'denied',
                  'ad_storage': prefs.marketing ? 'granted' : 'denied',
                  'ad_user_data': prefs.marketing ? 'granted' : 'denied',
                  'ad_personalization': prefs.marketing ? 'granted' : 'denied'
                });
              }
            } catch (e) {}
          `}
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
              "description": "Skinlux Medical Beauty Studio in Pottendorf -- Ihr Spezialist für dauerhafte Laser Haarentfernung, HydraFacial und Signature Facials in Niederösterreich. Modernste Diodenlaser-Technologie, kostenlose Probebehandlung. Für Kunden aus Pottendorf, Baden, Mödling, Wiener Neustadt und ganz Niederösterreich.",
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
                "https://www.instagram.com/skinlux"
              ],
              "aggregateRating": GOOGLE_AGGREGATE_RATING_SCHEMA,
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Behandlungen",
                "itemListElement": [
                  {
                    "@type": "OfferCatalog",
                    "name": "Laser Haarentfernung",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Laser Haarentfernung",
                          "description": "Dauerhafte Haarentfernung mit modernster Diodenlaser-Technologie für alle Hauttypen",
                          "provider": { "@id": "https://pottendorf.skinlux.at/#business" }
                        }
                      }
                    ]
                  },
                  {
                    "@type": "OfferCatalog",
                    "name": "HydraFacial",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "HydraFacial",
                          "description": "Revolutionäre 3-in-1 Gesichtsbehandlung mit sofort sichtbaren Ergebnissen",
                          "provider": { "@id": "https://pottendorf.skinlux.at/#business" }
                        }
                      }
                    ]
                  }
                ]
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
