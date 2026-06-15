import { getWwwGuidesForService } from "@/lib/seo/wwwLinks";

export type ServiceDefinition = {
  slug: string;
  label: string;
  mainUrl: string;
};

export type LocalPageLink = {
  city: string;
  cityLabel: string;
  url: string;
};

export type GuideLink = {
  slug: string;
  label: string;
  url: string;
  external?: boolean;
};

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "laser-haarentfernung",
    label: "Laser Haarentfernung",
    mainUrl: "/behandlungen/laser-haarentfernung",
  },
  {
    slug: "hydra-facial",
    label: "HydraFacial",
    mainUrl: "/behandlungen/hydra-facial",
  },
  {
    slug: "skinpen-precision",
    label: "SkinPen Precision",
    mainUrl: "/behandlungen/skinpen-precision",
  },
  {
    slug: "signature-facials",
    label: "Signature Facials",
    mainUrl: "/behandlungen/signature-facials",
  },
  {
    slug: "hautanalyse",
    label: "Hautanalyse",
    mainUrl: "/behandlungen/hautanalyse",
  },
];

export type CityDefinition = {
  slug: string;
  label: string;
  services: string[];
};

export const CITIES: CityDefinition[] = [
  {
    slug: "pottendorf",
    label: "Pottendorf",
    services: [
      "laser-haarentfernung",
      "hydra-facial",
      "skinpen-precision",
      "signature-facials",
      "hautanalyse",
    ],
  },
  {
    slug: "wien",
    label: "Wien",
    services: ["laser-haarentfernung", "hydra-facial"],
  },
  {
    slug: "wiener-neustadt",
    label: "Wiener Neustadt",
    services: ["laser-haarentfernung", "hydra-facial"],
  },
  {
    slug: "baden-bei-wien",
    label: "Baden bei Wien",
    services: ["laser-haarentfernung", "hydra-facial"],
  },
  {
    slug: "moedling",
    label: "Mödling",
    services: ["laser-haarentfernung"],
  },
  {
    slug: "ebreichsdorf",
    label: "Ebreichsdorf",
    services: ["laser-haarentfernung"],
  },
  {
    slug: "traiskirchen",
    label: "Traiskirchen",
    services: ["laser-haarentfernung"],
  },
  {
    slug: "eisenstadt",
    label: "Eisenstadt",
    services: ["laser-haarentfernung"],
  },
  {
    slug: "bad-voeslau",
    label: "Bad Vöslau",
    services: ["laser-haarentfernung"],
  },
  {
    slug: "leobersdorf",
    label: "Leobersdorf",
    services: ["laser-haarentfernung"],
  },
  {
    slug: "gumpoldskirchen",
    label: "Gumpoldskirchen",
    services: ["laser-haarentfernung"],
  },
  {
    slug: "neunkirchen",
    label: "Neunkirchen",
    services: ["laser-haarentfernung"],
  },
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getCityBySlug(slug: string): CityDefinition | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getLocalPageUrl(citySlug: string, serviceSlug: string): string {
  return `/${citySlug}/${serviceSlug}`;
}

export function getOtherCitiesForService(
  serviceSlug: string,
  currentCity: string
): LocalPageLink[] {
  return getCitiesForService(serviceSlug, {
    excludeCity: currentCity,
    limit: 6,
  });
}

export function getCitiesForService(
  serviceSlug: string,
  options?: { excludeCity?: string; limit?: number }
): LocalPageLink[] {
  const exclude = options?.excludeCity;

  return CITIES.filter((c) => c.services.includes(serviceSlug))
    .filter((c) => c.slug !== exclude)
    .slice(0, options?.limit ?? 12)
    .map((c) => ({
      city: c.slug,
      cityLabel: c.label,
      url: getLocalPageUrl(c.slug, serviceSlug),
    }));
}

export function getGuidesForService(
  serviceSlug: string,
  limit = 4
): GuideLink[] {
  return getWwwGuidesForService(serviceSlug, limit).map((guide, index) => ({
    slug: `www-${index}`,
    label: guide.label,
    url: guide.url,
    external: true,
  }));
}

export function getOtherServicesForCity(
  citySlug: string,
  currentService: string
): Array<{ slug: string; label: string; url: string }> {
  const city = getCityBySlug(citySlug);
  if (!city) return [];

  return city.services
    .filter((s) => s !== currentService)
    .map((s) => {
      const service = getServiceBySlug(s);
      if (!service) return null;
      return {
        slug: s,
        label: service.label,
        url: getLocalPageUrl(citySlug, s),
      };
    })
    .filter((s): s is { slug: string; label: string; url: string } => s !== null);
}
