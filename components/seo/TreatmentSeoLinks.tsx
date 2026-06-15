import Link from "next/link";
import {
  getCitiesForService,
  getGuidesForService,
  getServiceBySlug,
} from "@/lib/seo/internalLinks";
import { getWwwHubUrl } from "@/lib/seo/wwwLinks";

type Props = {
  serviceSlug: string;
  excludeCitySlug?: string;
};

export default function TreatmentSeoLinks({
  serviceSlug,
  excludeCitySlug,
}: Props) {
  const service = getServiceBySlug(serviceSlug);
  const cities = getCitiesForService(serviceSlug, {
    excludeCity: excludeCitySlug,
    limit: 12,
  });
  const guides = getGuidesForService(serviceSlug, 4);

  if (!service || (cities.length === 0 && guides.length === 0)) {
    return null;
  }

  return (
    <>
      {cities.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-3">
              {service.label} in Ihrer Region
            </h2>
            <p className="text-gray-600 font-light mb-8 max-w-2xl">
              Skinlux in Pottendorf ist für Kundinnen und Kunden aus Niederösterreich
              und Wien-Umland gut erreichbar.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {cities.map((city) => (
                <Link
                  key={city.url}
                  href={city.url}
                  className="group p-4 bg-white border border-gray-200 hover:border-gray-400 transition-colors"
                >
                  <span className="text-sm font-light text-black group-hover:text-gray-700">
                    {service.label} {city.cityLabel}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="py-16 md:py-20 bg-white border-t border-gray-100">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-3">
              Hintergrundwissen zu {service.label}
            </h2>
            <p className="text-gray-600 font-light mb-8 max-w-2xl">
              Ausführliche Ratgeber und Vergleiche finden Sie auf skinlux.at.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((guide) => (
                <a
                  key={guide.url}
                  href={guide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 border border-gray-200 hover:border-gray-400 transition-colors"
                >
                  <span className="text-base font-light text-black group-hover:text-gray-700">
                    {guide.label}
                  </span>
                </a>
              ))}
              <a
                href={getWwwHubUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 border border-gray-200 hover:border-gray-400 transition-colors flex items-center"
              >
                <span className="text-base font-light text-gray-600 group-hover:text-black">
                  Mehr auf skinlux.at
                </span>
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
