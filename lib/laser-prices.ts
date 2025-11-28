export type LaserPriceItem = {
  zone: string;
  priceEuro: number;
  duration?: string;
};

export type GenderType = "damen" | "herren";

export const damenPrices: LaserPriceItem[] = [
  { zone: "Oberlippe", priceEuro: 30 },
  { zone: "Kinn", priceEuro: 30 },
  { zone: "Wangen", priceEuro: 30 },
  { zone: "Stirn", priceEuro: 30 },
  { zone: "Gesicht komplett", priceEuro: 85 },
  { zone: "Hals", priceEuro: 30 },
  { zone: "Achseln", priceEuro: 50 },
  { zone: "Unterarme", priceEuro: 55 },
  { zone: "Oberarme", priceEuro: 55 },
  { zone: "Arme komplett", priceEuro: 80 },
  { zone: "Bauch", priceEuro: 55 },
  { zone: "Rücken", priceEuro: 85 },
  { zone: "Bikinizone", priceEuro: 55 },
  { zone: "Intim komplett", priceEuro: 80 },
  { zone: "Intim komplett inkl. Bikini + Pofalte", priceEuro: 95 },
  { zone: "Pofalte", priceEuro: 35 },
  { zone: "Po", priceEuro: 60 },
  { zone: "Unterschenkel", priceEuro: 95 },
  { zone: "Oberschenkel", priceEuro: 95 },
  { zone: "Beine komplett", priceEuro: 150 },
  { zone: "Hände", priceEuro: 30 },
  { zone: "Dekollete", priceEuro: 35 },
  { zone: "Füße", priceEuro: 30 },
  { zone: "Bauchstreifen", priceEuro: 30 },
  { zone: "Pobacken", priceEuro: 45 },
  { zone: "Nacken", priceEuro: 30 },
];

export const herrenPrices: LaserPriceItem[] = [
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
