import { getWwwLocationUrl, getWwwHubUrl } from "@/lib/seo/wwwLinks";

interface WwwResearchLinkProps {
  citySlug: string;
  cityLabel: string;
  serviceSlug: string;
  serviceLabel: string;
}

export default function WwwResearchLink({
  citySlug,
  cityLabel,
  serviceSlug,
  serviceLabel,
}: WwwResearchLinkProps) {
  const locationUrl = getWwwLocationUrl(citySlug, serviceSlug);

  if (!locationUrl) {
    return (
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container max-w-4xl text-center">
          <p className="text-sm text-gray-500 font-light">
            Übersicht aller Skinlux Standorte und Behandlungen auf{" "}
            <a
              href={getWwwHubUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline"
            >
              skinlux.at
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="container max-w-4xl text-center">
        <p className="text-sm text-gray-500 font-light">
          Mehr Hintergrundwissen, Ratgeber und Einzugsgebiet-Infos:{" "}
          <a
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline"
          >
            {serviceLabel} {cityLabel} auf skinlux.at
          </a>
        </p>
      </div>
    </section>
  );
}
