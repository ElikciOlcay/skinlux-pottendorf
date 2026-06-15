export const WWW_BASE = "https://www.skinlux.at";

const SERVICE_TO_WWW_TREATMENT: Record<string, string> = {
  "laser-haarentfernung": "laser-haarentfernung",
  "hydra-facial": "hydrafacial",
  "skinpen-precision": "microneedling",
};

const CORE_WWW_TREATMENTS = new Set([
  "laser-haarentfernung",
  "hydrafacial",
  "microneedling",
]);

export function getWwwLocationUrl(
  citySlug: string,
  serviceSlug: string
): string | null {
  const treatment = SERVICE_TO_WWW_TREATMENT[serviceSlug];
  if (!treatment || !CORE_WWW_TREATMENTS.has(treatment)) {
    return null;
  }
  return `${WWW_BASE}/${treatment}/${citySlug}`;
}

export function getWwwHubUrl(): string {
  return WWW_BASE;
}

export type WwwGuideLink = {
  label: string;
  url: string;
};

const WWW_GUIDES_BY_SERVICE: Record<string, WwwGuideLink[]> = {
  "laser-haarentfernung": [
    {
      label: "Laser Haarentfernung Kosten",
      url: `${WWW_BASE}/laser-haarentfernung/laser-haarentfernung-kosten`,
    },
    {
      label: "Laser vs IPL",
      url: `${WWW_BASE}/laser-haarentfernung/laser-vs-ipl`,
    },
    {
      label: "Laser Haarentfernung für Frauen",
      url: `${WWW_BASE}/laser-haarentfernung/laser-haarentfernung-frauen`,
    },
  ],
  "hydra-facial": [
    {
      label: "HydraFacial Preis",
      url: `${WWW_BASE}/hydrafacial/hydrafacial-preis`,
    },
    {
      label: "HydraFacial vs Microneedling",
      url: `${WWW_BASE}/hydrafacial/hydrafacial-vs-microneedling`,
    },
    {
      label: "HydraFacial bei Unreinheiten",
      url: `${WWW_BASE}/hydrafacial/hydrafacial-unreinheiten`,
    },
  ],
  "skinpen-precision": [
    {
      label: "Microneedling bei Akne",
      url: `${WWW_BASE}/microneedling/microneedling-akne`,
    },
    {
      label: "Microneedling Kosten",
      url: `${WWW_BASE}/microneedling/microneedling-kosten`,
    },
    {
      label: "Microneedling vs HydraFacial",
      url: `${WWW_BASE}/microneedling/microneedling-vs-hydrafacial`,
    },
  ],
  "signature-facials": [
    {
      label: "HydraFacial Anti Aging",
      url: `${WWW_BASE}/hydrafacial/hydrafacial-anti-aging`,
    },
  ],
  hautanalyse: [
    {
      label: "Anti-Aging Behandlungen",
      url: `${WWW_BASE}/ratgeber/anti-aging-behandlungen`,
    },
  ],
  "divinia-eclibs": [
    {
      label: "Anti-Aging Behandlungen",
      url: `${WWW_BASE}/ratgeber/anti-aging-behandlungen`,
    },
  ],
};

export function getWwwGuidesForService(
  serviceSlug: string,
  limit = 4
): WwwGuideLink[] {
  return (WWW_GUIDES_BY_SERVICE[serviceSlug] ?? []).slice(0, limit);
}
