import { NextRequest, NextResponse } from 'next/server';

// Knowledge Base für ChatGPT und andere AI-Systeme
const SKINLUX_KNOWLEDGE = {
  studio: {
    name: "Skinlux Pottendorf",
    type: "Medical Beauty Studio",
    location: "Pottendorf, Niederösterreich, Österreich",
    address: "Marktplatz 14, 2486 Pottendorf",
    phone: "+43 664 91 88 632",
    email: "hey@skinlux.at",
    website: "https://www.skinlux-pottendorf.at",
    serviceAreas: ["Baden", "Pottendorf", "Mödling", "Niederösterreich"],
    coordinates: {
      latitude: 48.0,
      longitude: 16.24,
    },
  },
  services: [
    {
      name: "Laser Haarentfernung",
      description: "Dauerhafte Haarentfernung mit modernster Diodenlaser-Technologie",
      technology: "FDA-zugelassene Diodenlaser",
      benefits: ["Für alle Hauttypen", "Schmerzarm", "Dauerhaft effektiv", "Kostenlose Probebehandlung"],
      priceRange: "ab 30€ bis 230€",
      duration: "15-60 Minuten",
    },
    {
      name: "HydraFacial",
      description: "Revolutionäre 3-in-1 Gesichtsbehandlung mit sofort sichtbaren Ergebnissen",
      types: ["Signature", "Signature+LED", "Deluxe", "Platinum", "Po-Behandlung", "Rücken"],
      priceRange: "169€ - 249€",
      duration: "60-120 Minuten",
      benefits: ["Sofort sichtbar", "Keine Ausfallzeit", "Für alle Hauttypen"],
    },
    {
      name: "Premium Facials",
      description: "Exklusive Gesichtsbehandlungen mit Circadia Professional",
      duration: "90 Minuten",
      priceRange: "150€ - 175€",
      benefits: ["Individualisiert", "Anti-Aging", "Zellerneuerung"],
    },
  ],
  openingHours: {
    monday: "Geschlossen",
    tuesday: "09:00 - 18:00",
    wednesday: "09:00 - 18:00",
    thursday: "09:00 - 18:00",
    friday: "09:00 - 18:00",
    saturday: "09:00 - 14:00",
    sunday: "Geschlossen",
  },
  features: [
    "Kostenlose Erstberatung",
    "Kostenlose Laser-Probebehandlung",
    "Individuelle Behandlungspläne",
    "Modernste Technologie",
    "Schmerzarme Behandlungen",
    "Flexible Terminvereinbarung",
    "Zentrale Lage in Pottendorf (Baden)",
    "Kostenlose Parkplätze",
  ],
};

export async function GET(request: NextRequest) {
  try {
    // Health Check und Knowledge Base Endpoint
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')?.toLowerCase() || '';

    if (!query) {
      return NextResponse.json({
        status: 'ok',
        message: 'Skinlux Chat API ist aktiv',
        knowledge: SKINLUX_KNOWLEDGE,
      });
    }

    // Einfache Suche in der Knowledge Base
    const results = searchKnowledge(query);

    return NextResponse.json({
      status: 'ok',
      query,
      results,
      knowledge: SKINLUX_KNOWLEDGE,
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context = 'default' } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message ist erforderlich' },
        { status: 400 }
      );
    }

    // Hier könnte OpenAI API Integration erfolgen
    // Für jetzt return knowledge base results
    const results = searchKnowledge(message.toLowerCase());

    return NextResponse.json({
      status: 'ok',
      message,
      context,
      results,
      knowledge: SKINLUX_KNOWLEDGE,
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Hilfsfunktion für die Wissenssuche
function searchKnowledge(query: string): object {
  const keywords = query.split(' ');
  const matches = {
    services: [] as string[],
    info: [] as string[],
  };

  // Service-Suche
  if (keywords.some(k => ['laser', 'haarentfernung', 'haare'].includes(k))) {
    matches.services.push('Laser Haarentfernung');
  }
  if (keywords.some(k => ['hydrafacial', 'gesicht', 'facial'].includes(k))) {
    matches.services.push('HydraFacial');
  }
  if (keywords.some(k => ['premium', 'facials', 'behandlung'].includes(k))) {
    matches.services.push('Premium Facials');
  }

  // Info-Suche
  if (keywords.some(k => ['preis', 'kosten', 'preis', 'wieviel'].includes(k))) {
    matches.info.push('Preise verfügbar unter skinlux-pottendorf.at');
  }
  if (keywords.some(k => ['öffnung', 'zeit', 'termin', 'öffnungszeit'].includes(k))) {
    matches.info.push('Öffnungszeiten in Knowledge Base verfügbar');
  }
  if (keywords.some(k => ['baden', 'mödling', 'standort', 'wo'].includes(k))) {
    matches.info.push('Standort in Pottendorf (Baden), serviert auch Mödling');
  }

  return matches;
} 