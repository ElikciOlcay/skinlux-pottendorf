import { NextResponse } from 'next/server';

// Strukturierte Metadaten für AI-Systeme
export async function GET() {
  const metadata = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Skinlux Pottendorf",
    "legalName": "Skinlux - Medical Beauty Studio",
    "url": "https://skinlux-pottendorf.at",
    "logo": "https://skinlux-pottendorf.at/images/logo/skinlux-logo.png",
    "description": "Professionelles Medical Beauty Studio in Pottendorf (Baden) mit modernem Laser und HydraFacial. Serviert Baden, Pottendorf und Mödling.",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+43 664 91 88 632",
      "contactType": "Customer Support",
      "email": "hey@skinlux.at"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Marktplatz 14",
      "addressLocality": "Pottendorf",
      "postalCode": "2486",
      "addressRegion": "Niederösterreich",
      "addressCountry": "AT"
    },
    "serviceArea": [
      "Baden",
      "Pottendorf",
      "Mödling",
      "Niederösterreich"
    ],
    "services": [
      {
        "@type": "Service",
        "name": "Laser Haarentfernung",
        "description": "Dauerhafte Haarentfernung mit FDA-zugelassener Diodenlaser-Technologie für alle Hauttypen",
        "areaServed": ["Baden", "Pottendorf", "Mödling"],
        "offers": {
          "@type": "PriceSpecification",
          "priceCurrency": "EUR",
          "price": "30-230",
          "priceValidFrom": new Date().toISOString().split('T')[0],
        },
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceType": "In Person"
        }
      },
      {
        "@type": "Service",
        "name": "HydraFacial",
        "description": "Revolutionäre 3-in-1 Gesichtsbehandlung mit sofort sichtbaren Ergebnissen",
        "areaServed": ["Baden", "Pottendorf", "Mödling"],
        "offers": {
          "@type": "PriceSpecification",
          "priceCurrency": "EUR",
          "price": "169-249",
          "priceValidFrom": new Date().toISOString().split('T')[0],
        }
      },
      {
        "@type": "Service",
        "name": "Premium Facials",
        "description": "Exklusive Gesichtsbehandlungen mit Circadia Professional",
        "areaServed": ["Baden", "Pottendorf", "Mödling"],
        "offers": {
          "@type": "PriceSpecification",
          "priceCurrency": "EUR",
          "price": "150-175",
          "priceValidFrom": new Date().toISOString().split('T')[0],
        }
      }
    ],
    "sameAs": [
      "https://www.facebook.com/skinlux",
      "https://www.instagram.com/skinlux"
    ],
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
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "00:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "2000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "location": {
      "@type": "Place",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.0,
        "longitude": 16.24
      }
    }
  };

  return NextResponse.json(metadata, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    }
  });
}
