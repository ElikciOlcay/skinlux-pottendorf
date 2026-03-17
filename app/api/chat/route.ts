import { NextRequest, NextResponse } from "next/server";
import { LISA_SYSTEM_PROMPT, LISA_KNOWLEDGE } from "@/lib/chat/knowledge-base";

const ENHANCED_SYSTEM_PROMPT = `
${LISA_SYSTEM_PROMPT}

WICHTIGE DETAILS ÜBER SKINLUX:
${JSON.stringify(LISA_KNOWLEDGE, null, 2)}

ANTWORT-RICHTLINIEN:
- Verwende Emojis sparsam aber passend (z.B. für Behandlungen, für Ergebnisse)
- Strukturiere längere Antworten mit Aufzählungspunkten
- Stelle Rückfragen, um die beste Behandlung zu empfehlen
- Erwähne immer die kostenlose Erstberatung bei Unsicherheit
- Betone die Expertise des Teams
- Verwende einen warmen, einladenden Ton

BEISPIEL-ANTWORTEN:
- "Das freut mich, dass Sie sich für unsere Behandlungen interessieren!"
- "Gerne erkläre ich Ihnen..."
- "Für Ihre individuellen Bedürfnisse empfehle ich..."
`;

const FALLBACK_RESPONSES = {
    greeting: [
        "Hallo! Willkommen bei SkinLux Pottendorf. Ich bin Lisa, Ihre Beauty-Beraterin. Wie kann ich Ihnen helfen?",
        "Guten Tag! Ich bin Lisa von SkinLux Pottendorf. Womit kann ich Ihnen heute behilflich sein?"
    ],
    behandlung: [
        "Bei SkinLux Pottendorf bieten wir verschiedene Behandlungen an:\n\n• Laser-Haarentfernung Damen & Herren (ab 30€)\n• HydraFacial® (ab 169€)\n• Premium Facials (ab 150€)\n\nKostenlose Erstberatung und Probebehandlung! Rufen Sie uns an: +43 664 91 88 632",
        "Unsere beliebtesten Behandlungen sind:\n\n• Dauerhafte Laser-Haarentfernung für Damen & Herren\n• HydraFacial® für sofort strahlende Haut\n• Premium Facials mit Circadia Professional\n\nSparen Sie mit unseren Paketen! Kostenlose Beratung möglich."
    ],
    preis: [
        "Laser-Haarentfernung Damen:\n\n• Achseln: 55€\n• Bikini Zone: 60€\n• Beine komplett: 190€\n• Gesicht komplett: 110€\n\nPakete: Small 220€ | Medium 280€ | Large 390€\n\nKostenlose Erstberatung!",
        "Laser-Haarentfernung Herren:\n\n• Bartkontur: 50€\n• Brust: 80€\n• Rücken: 95€\n• Beine komplett: 230€\n\nKostenlose Erstberatung! Rufen Sie uns an: +43 664 91 88 632",
        "HydraFacial® Preise:\n\n• Signature (1 Std.): 169€\n• Signature+LED (1 Std. 15 Min.): 189€\n• Deluxe (1 Std. 15 Min.): 199€\n• Platinum (2 Std.): 249€\n• Po-Behandlung: 169€\n• Rücken: 189€\n\nKostenlose Beratung möglich!"
    ],
    termin: [
        "Terminvereinbarung ist ganz einfach:\n\nOnline: Über unsere Website\nTelefonisch: +43 664 91 88 632\n\nÖffnungszeiten:\nDi-Fr: 09:00 - 18:00\nSa: 09:00 - 14:00",
        "Sie können jederzeit einen Termin vereinbaren:\n\n• Online-Buchung rund um die Uhr\n• Telefonisch während der Geschäftszeiten\n• Kostenlose Erstberatung möglich\n\nWir freuen uns auf Sie!"
    ],
    default: [
        "Vielen Dank für Ihre Nachricht! Für detaillierte Informationen kontaktieren Sie uns gerne:\n\n+43 664 91 88 632\nhey@skinlux.at\nMarktplatz 14, 2486 Pottendorf",
        "Ich helfe Ihnen gerne weiter! Bei spezifischen Fragen erreichen Sie uns:\n\n• Telefon: +43 664 91 88 632\n• Online-Terminbuchung auf unserer Website\n• Persönliche Beratung im Studio"
    ]
};

function getSimpleResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("hallo") || lowerMessage.includes("hi") || lowerMessage.includes("guten")) {
        const responses = FALLBACK_RESPONSES.greeting;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (lowerMessage.includes("behandlung") || lowerMessage.includes("was bieten") || lowerMessage.includes("angebot")) {
        const responses = FALLBACK_RESPONSES.behandlung;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (lowerMessage.includes("preis") || lowerMessage.includes("kostet") || lowerMessage.includes("kosten")) {
        const responses = FALLBACK_RESPONSES.preis;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    if (lowerMessage.includes("termin") || lowerMessage.includes("buchen") || lowerMessage.includes("zeit")) {
        const responses = FALLBACK_RESPONSES.termin;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    const responses = FALLBACK_RESPONSES.default;
    return responses[Math.floor(Math.random() * responses.length)];
}

interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}
let conversationHistory: ChatMessage[] = [];

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey || apiKey === "sk-YOUR-API-KEY-HERE" || !apiKey.startsWith("sk-")) {
            const response = getSimpleResponse(message);
            return NextResponse.json({ message: response });
        }

        try {
            conversationHistory.push({ role: "user", content: message });

            if (conversationHistory.length > 10) {
                conversationHistory = conversationHistory.slice(-10);
            }

            const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: ENHANCED_SYSTEM_PROMPT },
                        ...conversationHistory
                    ],
                    temperature: 0.8,
                    max_tokens: 600,
                    presence_penalty: 0.6,
                    frequency_penalty: 0.3
                })
            });

            if (!openaiResponse.ok) {
                const error = await openaiResponse.json();
                throw new Error(error?.error?.message || "OpenAI API error");
            }

            const data = await openaiResponse.json();
            const aiMessage = data.choices[0].message.content;

            conversationHistory.push({ role: "assistant", content: aiMessage });

            return NextResponse.json({ message: aiMessage });
        } catch {
            const response = getSimpleResponse(message);
            return NextResponse.json({
                message: response + "\n\n(Hinweis: Ich verwende momentan vordefinierte Antworten. Für eine persönliche Beratung kontaktieren Sie uns gerne direkt.)"
            });
        }
    } catch {
        return NextResponse.json({
            message: "Entschuldigung, es gab einen technischen Fehler. Bitte kontaktieren Sie uns direkt unter +43 664 91 88 632."
        });
    }
}
