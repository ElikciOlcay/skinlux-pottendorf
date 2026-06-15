import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SHORE_BOOKING_URL } from "@/lib/booking";
import { SITE_URL } from "@/lib/site";
import {
  LOCAL_LANDING_PAGES,
  LOCAL_LANDING_PATHS,
} from "@/lib/seo/localLandingData";
import {
  getOtherCitiesForService,
  getOtherServicesForCity,
  getServiceBySlug,
} from "@/lib/seo/internalLinks";

type Props = {
  params: Promise<{ city: string; service: string }>;
};

export async function generateStaticParams() {
  return LOCAL_LANDING_PATHS;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, service } = await params;
  const entry = LOCAL_LANDING_PAGES[`${city}/${service}`];

  if (!entry) {
    return {};
  }

  const url = `${SITE_URL}/${city}/${service}`;
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      type: "website",
      locale: "de_AT",
      siteName: "Skinlux Medical Beauty Studio Pottendorf",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}

export default async function LocalLandingPage({ params }: Props) {
  const { city, service } = await params;
  const entry = LOCAL_LANDING_PAGES[`${city}/${service}`];

  if (!entry) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/${entry.city}/${entry.service}`;
  const serviceDefinition = getServiceBySlug(entry.service);
  const otherCities = getOtherCitiesForService(entry.service, entry.city);
  const otherServices = getOtherServicesForCity(entry.city, entry.service);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: entry.serviceLabel,
        item: serviceDefinition
          ? `${SITE_URL}${serviceDefinition.mainUrl}`
          : pageUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: entry.cityLabel,
        item: pageUrl,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: entry.serviceLabel,
    name: `${entry.serviceLabel} in ${entry.cityLabel}`,
    areaServed: {
      "@type": "City",
      name: entry.cityLabel,
    },
    provider: {
      "@id": `${SITE_URL}/#business`,
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container max-w-4xl">
          <nav className="mb-6 text-sm text-gray-500 font-light">
            <Link href="/" className="hover:text-black transition-colors">
              Startseite
            </Link>
            <span className="mx-2">/</span>
            {serviceDefinition && (
              <>
                <Link
                  href={serviceDefinition.mainUrl}
                  className="hover:text-black transition-colors"
                >
                  {entry.serviceLabel}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-black">{entry.cityLabel}</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-light text-black mb-6">
            {entry.h1}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8">
            {entry.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={SHORE_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-800"
            >
              Termin online buchen
            </a>
            <Link
              href="/beratung"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400"
            >
              Kostenlose Beratung
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
            Häufige Fragen zu {entry.serviceLabel} in {entry.cityLabel}
          </h2>
          <div className="space-y-4">
            {entry.faq.map((item) => (
              <article
                key={item.question}
                className="bg-white border border-gray-200 p-6"
              >
                <h3 className="text-xl font-light text-black mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {otherCities.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              {entry.serviceLabel} in anderen Regionen
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {otherCities.map((c) => (
                <Link
                  key={c.city}
                  href={c.url}
                  className="group p-4 bg-white border border-gray-200 hover:border-gray-400 transition-colors"
                >
                  <span className="text-base font-light text-black group-hover:text-gray-700">
                    {entry.serviceLabel} {c.cityLabel}
                  </span>
                </Link>
              ))}
              {serviceDefinition && (
                <Link
                  href={serviceDefinition.mainUrl}
                  className="group p-4 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <span className="text-base font-light">
                    Alle Infos zu {entry.serviceLabel}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {otherServices.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-8">
              Weitere Behandlungen in {entry.cityLabel}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={s.url}
                  className="group p-6 bg-white border border-gray-200 hover:border-gray-400 transition-colors"
                >
                  <h3 className="text-lg font-light text-black mb-1 group-hover:text-gray-700">
                    {s.label}
                  </h3>
                  <span className="text-sm text-gray-500 font-light">
                    in {entry.cityLabel}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20 bg-black text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="text-gray-300 font-light mb-8">
            Buchen Sie jetzt Ihren Termin oder starten Sie mit einer
            unverbindlichen Beratung in Pottendorf.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={SHORE_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-light tracking-widest uppercase text-sm transition-all duration-300 hover:bg-gray-100"
            >
              Termin buchen
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-gray-300 font-light tracking-widest uppercase text-sm transition-all duration-300 hover:border-gray-400 hover:text-white"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
