import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalLayout from "../components/layout/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skinlux Pottendorf - Laser Haarentfernung & Premium Kosmetik | Baden, NÖ",
  description: "Skinlux Pottendorf: Professionelle Laser-Haarentfernung, HydraFacial®, und Premium Kosmetikbehandlungen in Baden, Niederösterreich. Moderne Diodenlaser-Technologie für dauerhafte Haarfreiheit.",
  keywords: "Laser Haarentfernung Pottendorf, Laser Haarentfernung Baden, Kosmetik Niederösterreich, HydraFacial Pottendorf, Laser Behandlung Baden, dauerhafte Haarentfernung, Beauty Studio Pottendorf, Skinlux",
  openGraph: {
    title: "Skinlux Pottendorf - Laser Haarentfernung & Kosmetik in Baden",
    description: "Professionelle Laser-Haarentfernung und innovative Kosmetikbehandlungen in Pottendorf, Baden. Erleben Sie moderne Beauty-Treatments.",
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
            "description": "Professionelle Laser-Haarentfernung und Premium Kosmetikbehandlungen in Pottendorf, Baden, Niederösterreich",
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
                "description": "Dauerhafte Haarentfernung mit moderner Diodenlaser-Technologie"
              },
              {
                "@type": "Service",
                "name": "HydraFacial",
                "description": "Revolutionäre 3-in-1 Gesichtsbehandlung"
              },
              {
                "@type": "Service",
                "name": "Premium Facials",
                "description": "Luxuriöse Gesichtspflege Behandlungen"
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
