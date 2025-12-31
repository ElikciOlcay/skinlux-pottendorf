export type LaserPriceItem = {
  zone: string;
  priceEuro: number;
  duration?: string;
};

export type GenderType = "damen" | "herren";

export const damenPrices: LaserPriceItem[] = [
  { zone: "Kostenloses Erstgespräch mit Probebehandlung", priceEuro: 0 },
  { zone: "Oberlippe", priceEuro: 35 },
  { zone: "Kinn", priceEuro: 35 },
  { zone: "Wangen", priceEuro: 35 },
  { zone: "Stirn", priceEuro: 30 },
  { zone: "Gesicht komplett", priceEuro: 110 },
  { zone: "Hals", priceEuro: 45 },
  { zone: "Koteletten", priceEuro: 35 },
  { zone: "Nacken", priceEuro: 50 },
  { zone: "Dekollete", priceEuro: 55 },
  { zone: "Brustwarzen", priceEuro: 40 },
  { zone: "Brüste", priceEuro: 55 },
  { zone: "Achseln", priceEuro: 55 },
  { zone: "Unterarme", priceEuro: 55 },
  { zone: "Oberarme", priceEuro: 60 },
  { zone: "Arme komplett", priceEuro: 100 },
  { zone: "Bauch", priceEuro: 65 },
  { zone: "Bauchstreifen", priceEuro: 35 },
  { zone: "Rücken", priceEuro: 100 },
  { zone: "Bikinizone", priceEuro: 60 },
  { zone: "Intim komplett", priceEuro: 90 },
  { zone: "Intim komplett inkl. Bikini + Pofalte", priceEuro: 110 },
  { zone: "Pofalte", priceEuro: 35 },
  { zone: "Pobacken", priceEuro: 65 },
  { zone: "Unterschenkel", priceEuro: 95 },
  { zone: "Oberschenkel", priceEuro: 100 },
  { zone: "Beine komplett", priceEuro: 190 },
  { zone: "Füße", priceEuro: 45 },
  { zone: "Hände", priceEuro: 30 },
];

export const herrenPrices: LaserPriceItem[] = [
  { zone: "Kostenloses Erstgespräch mit Probebehandlung", priceEuro: 0 },
  { zone: "Hals", priceEuro: 40 },
  { zone: "Achseln", priceEuro: 55 },
  { zone: "Unterarme", priceEuro: 60 },
  { zone: "Oberarme", priceEuro: 60 },
  { zone: "Arme komplett", priceEuro: 90 },
  { zone: "Brust", priceEuro: 80 },
  { zone: "Bauch", priceEuro: 60 },
  { zone: "Schultern", priceEuro: 50 },
  { zone: "Rücken", priceEuro: 90 },
  { zone: "Unterschenkel", priceEuro: 120 },
  { zone: "Oberschenkel", priceEuro: 120 },
  { zone: "Beine komplett", priceEuro: 180 },
  { zone: "Bartkontur", priceEuro: 40 },
  { zone: "Nacken", priceEuro: 40 },
  { zone: "Po", priceEuro: 65 },
  { zone: "Füße", priceEuro: 40 },
  { zone: "Gesicht komplett", priceEuro: 100 },
];

export function getPricesByGender(gender: GenderType): LaserPriceItem[] {
  return gender === "damen" ? damenPrices : herrenPrices;
}

export function euro(n: number): string {
  return `${n.toFixed(0)}€`;
}

export function discounted(price: number, discountPercent: number): number {
  return Math.round(price * (1 - discountPercent / 100));
}

// Packages (derzeit nur Damen laut Preisliste)
export type LaserPackageItem = {
  name: string;
  priceEuro: number;
  details?: string[];
};

export const damenPackages: LaserPackageItem[] = [
  {
    name: "Paket Small",
    priceEuro: 220,
    details: ["Achseln", "Unterschenkel", "Intim + Bikini inkl. Pofalte"],
  },
  {
    name: "Paket Medium",
    priceEuro: 280,
    details: ["Achseln", "Beine komplett", "Intim + Bikini inkl. Pofalte"],
  },
  {
    name: "Paket Large",
    priceEuro: 390,
    details: ["Achseln", "Beine komplett", "Gesicht komplett", "Unterarme", "Intim + Bikini inkl. Pofalte"],
  },
];

export function getPackagesByGender(gender: GenderType): LaserPackageItem[] {
  return gender === "damen" ? damenPackages : [];
}

