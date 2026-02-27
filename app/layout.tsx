import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalLayout from "../components/layout/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://skinlux-pottendorf.at'),
  title: {
    default: "Skinlux Pottendorf | Laser Haarentfernung & Premium Kosmetik | Baden, Mödling",
    template: "%s | Skinlux Pottendorf",
  },
  description: "Laser Haarentfernung & HydraFacial in Pottendorf. Modernste Diodenlaser-Technologie, kostenlose Probebehandlung. Für Baden, Mödling & Niederösterreich.",
  alternates: {
    canonical: 'https://skinlux-pottendorf.at',
  },
  openGraph: {
    title: "Skinlux Pottendorf | Laser Haarentfernung & Premium Kosmetik | Baden, Mödling",
    description: "Laser Haarentfernung & HydraFacial in Pottendorf. Modernste Diodenlaser-Technologie, kostenlose Probebehandlung. Für Baden, Mödling & Niederösterreich.",
    images: ["https://skinlux-pottendorf.at/og-image.jpg"],
    locale: "de_AT",
    type: "website",
    siteName: "Skinlux Pottendorf",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skinlux Pottendorf | Laser Haarentfernung Baden, Mödling",
    description: "Laser Haarentfernung & HydraFacial in Pottendorf. Modernste Diodenlaser-Technologie. Kostenlose Probebehandlung.",
    images: ["https://skinlux-pottendorf.at/og-image.jpg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            "@id": "https://skinlux-pottendorf.at/#business",
            "name": "Skinlux Pottendorf",
            "alternateName": "Skinlux Medical Beauty Studio Pottendorf",
            "image": "https://skinlux-pottendorf.at/images/logo/skinlux-logo.png",
            "logo": "https://skinlux-pottendorf.at/images/logo/skinlux-logo.png",
            "description": "Professionelle Laser-Haarentfernung und Premium Kosmetikbehandlungen in Pottendorf, Niederösterreich. Modernste Diodenlaser-Technologie, HydraFacial und Signature Facials.",
            "url": "https://skinlux-pottendorf.at",
            "telephone": "+436649188632",
            "email": "hey@skinlux.at",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Marktplatz 14",
              "addressLocality": "Pottendorf",
              "postalCode": "2486",
              "addressRegion": "Niederösterreich",
              "addressCountry": "AT"
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
              "https://www.instagram.com/skinlux"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "120",
              "bestRating": "5",
              "worstRating": "1"
            },
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
                        "provider": { "@id": "https://skinlux-pottendorf.at/#business" }
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
                        "provider": { "@id": "https://skinlux-pottendorf.at/#business" }
                      }
                    }
                  ]
                }
              ]
            }
          })}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://skinlux-pottendorf.at/#website",
            "name": "Skinlux Pottendorf",
            "url": "https://skinlux-pottendorf.at",
            "publisher": { "@id": "https://skinlux-pottendorf.at/#organization" }
          })}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://skinlux-pottendorf.at/#organization",
            "name": "Skinlux Medical Beauty Studio",
            "alternateName": "Skinlux Pottendorf",
            "url": "https://skinlux-pottendorf.at",
            "logo": {
              "@type": "ImageObject",
              "url": "https://skinlux-pottendorf.at/images/logo/skinlux-logo.png"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+436649188632",
              "contactType": "customer service",
              "email": "hey@skinlux.at",
              "availableLanguage": ["German", "English"]
            },
            "sameAs": ["https://www.instagram.com/skinlux"]
          })}}
        />

        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
