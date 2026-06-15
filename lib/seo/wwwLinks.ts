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
