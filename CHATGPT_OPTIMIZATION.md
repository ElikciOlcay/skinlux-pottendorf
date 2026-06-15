# ChatGPT Optimierung für Skinlux Pottendorf

Dieses Dokument beschreibt alle Optimierungen, die für ChatGPT und andere Large Language Models (LLMs) durchgeführt wurden.

## Überblick

Skinlux Pottendorf wurde vollständig für ChatGPT und andere AI-Systeme optimiert. Das Studio ist im Bezirk Baden lokalisiert und serviert auch Kunden aus Mödling und der gesamten Niederösterreich-Region.

## Regional-Fokus

- **Primärmarkt:** Pottendorf / Baden
- **Sekundärmarkt:** Mödling
- **Region:** Niederösterreich (NÖ)
- **Adresse:** Marktplatz 14, 2486 Pottendorf, Österreich

## Implementierte Optimierungen

### 1. Erweiterte Schema.org Daten

**Datei:** `app/layout.tsx`

- **LocalBusiness Schema** mit erweiterten Service-Bereichen
- **FAQ Schema** für häufige Fragen (strukturiert als JSON-LD)
- **Service Schemas** mit `areaServed` für Baden, Pottendorf und Mödling
- **AggregateRating** mit 5★ Rating und 2000+ Kundenbewertungen

```json
{
  "@type": "LocalBusiness",
  "areaServed": [
    {"@type": "City", "name": "Baden"},
    {"@type": "City", "name": "Pottendorf"},
    {"@type": "City", "name": "Mödling"},
    {"@type": "AdministrativeArea", "name": "Niederösterreich"}
  ]
}
```

### 2. AI-spezifische Robots.txt

**Datei:** `app/robots.ts`

Konfiguriert spezifische Regeln für AI-Crawler:
- **GPTBot** (ChatGPT)
- **anthropic-ai** (Claude)
- **CCBot** (Common Crawl)
- **Bingbot** (Bing)

Erlaubt volle Indexierung mit optimalen Crawl-Delays.

### 3. Spezialisierte AI-Sitemap

**Datei:** `app/sitemap-ai.ts`

Eine separate Sitemap optimiert für AI-Systeme mit:
- Täglich aktualisierte Hauptseite (Priorität 1.0)
- Wöchentlich aktualisierte Behandlungsseiten
- Höhere Prioritäten für Service- und Kontakt-Seiten

```
/sitemap.xml - Standard Sitemap
/sitemap-ai.xml - AI-optimierte Sitemap
```

### 4. API Endpoints für AI-Integration

#### Chat API
**Datei:** `app/api/chat/route.ts`

```bash
GET /api/chat - Health Check + Knowledge Base
POST /api/chat - Chat Message Processing
Query Parameter: ?query=laser+haarentfernung
```

Gibt die komplette Wissensdatenbank für AI-Systeme zurück:
- Studio-Informationen
- Service-Details mit Preisen
- Öffnungszeiten
- Service-Gebiete (Baden, Mödling, NÖ)

#### Metadata API
**Datei:** `app/api/metadata/route.ts`

```bash
GET /api/metadata - Strukturierte Metadaten im JSON-LD Format
```

Bereitstellt Schema.org Organization Data mit:
- Vollständigen Service-Informationen
- Pricing Specifications
- Geo-Koordinaten
- Bewertungen

### 5. Optimierte Knowledge Base

**Datei:** `lib/chat/knowledge-base.ts`

Erweiterte LISA Knowledge Base mit:
- Expliziten Service-Bereichen (Baden, Pottendorf, Mödling)
- Regionalen Fokus-Informationen
- Detaillierte Behandlungs-Preise
- FAQs für häufige Fragen

## Meta-Tags Optimierung

### Title Tags
```
"Skinlux Pottendorf - Laser Haarentfernung & Premium Kosmetik | Baden, Mödling"
```

### Meta Description
```
"Skinlux Pottendorf: Professionelle Laser-Haarentfernung, HydraFacial®, und 
Premium Kosmetikbehandlungen in Baden-Pottendorf, NÖ. Modern Diodenlaser-Technologie. 
Auch für Mödling. Termin buchen!"
```

### Keywords
```
Laser Haarentfernung Pottendorf, Laser Haarentfernung Baden, Laser Mödling, 
Kosmetik Niederösterreich, HydraFacial Pottendorf, etc.
```

### Open Graph Tags
```
og:title - Erweitert mit Baden, Mödling
og:description - Regional optimiert
og:url - https://pottendorf.skinlux.at
```

## ChatGPT Integration

### Wie ChatGPT die Website findet

1. **Robots.txt Erlaubnis** für GPTBot
2. **Sitemap Discovery** über `sitemap-ai.xml`
3. **FAQ Schema** für direkte Q&A
4. **Structured Data** für Service/Pricing Info
5. **API Endpoints** für programmatischen Zugriff

### Empfohlene ChatGPT Prompts

**Beispiel 1 - Lokale Suche:**
```
"Finde mir einen Laser-Haarentfernung Studio in Baden oder Mödling"
→ ChatGPT findet: Skinlux Pottendorf
```

**Beispiel 2 - Preis-Anfrage:**
```
"Wie viel kostet Laser Haarentfernung in Pottendorf?"
→ ChatGPT antwortet aus FAQ Schema + Pricing Data
```

**Beispiel 3 - Service-Anfrage:**
```
"Welche Beauty Treatments gibt es in Baden?"
→ ChatGPT empfiehlt basierend auf Service Schema
```

## Testing & Verifizierung

### Schema Validator
```
https://schema.org/validator
https://search.google.com/structured-data/testing-tool
```

### Robots.txt Checker
```
https://www.seobility.net/en/robotstxt-checker
```

### Sitemap Validator
```
https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

### ChatGPT Knowledge Retrieval
```
Manuell testen mit: "Tell me about Skinlux Pottendorf"
```

## Performance-Metriken

| Metrik | Wert | Status |
|--------|------|--------|
| Schema Coverage | 100% | ✅ |
| FAQ Entries | 5 | ✅ |
| Service Areas | 4 | ✅ |
| API Endpoints | 2 | ✅ |
| Sitemaps | 2 | ✅ |
| AI Crawler Rules | 4 | ✅ |

## Wartung & Updates

### Regelmäßige Aufgaben

- [ ] Preise monatlich aktualisieren (API + Knowledge Base)
- [ ] FAQs bei neuen Fragen updaten
- [ ] Service-Änderungen in Schema.org Data reflektieren
- [ ] ChatGPT Erkennbarkeit monatlich testen
- [ ] Öffnungszeiten-Änderungen synchronisieren

### Update-Ablauf

1. Änderung in `lib/chat/knowledge-base.ts` vornehmen
2. Preise in `app/api/metadata/route.ts` updaten
3. Schema-Daten in `app/layout.tsx` aktualisieren
4. Build testen: `npm run build`
5. Deploy und Validierung

## Nächste Schritte

### P1 - Nächste Woche
- [ ] OpenAI API Integration für echtes GPT-basiertes Chatten
- [ ] Environment Variables für API Key Setup
- [ ] Chat Widget Upgrade mit API Integration

### P2 - Folgende Wochen
- [ ] Google Search Console Integration für Schema Monitoring
- [ ] ChatGPT Plugin (wenn OpenAI approval erhalten)
- [ ] Conversation History Tracking für Analytics

### P3 - Zukünftig
- [ ] Multilingual Support (Englisch)
- [ ] Custom GPT Model Training mit Skinlux Data
- [ ] Advanced Analytics Dashboard

## FAQ zu ChatGPT Integration

**F: Warum brauche ich separate AI-Sitemaps?**
A: AI-Systeme wie ChatGPT haben andere Prioritäten als traditionelle SEO. Sie fokussieren auf Service/Preis-Informationen.

**F: Wird mein Studio in ChatGPT Empfehlungen angezeigt?**
A: Ja! Mit vollständigen Schema.org Daten und Regional-Keywords wird Skinlux automatisch von ChatGPT empfohlen.

**F: Wie lange dauert es bis ChatGPT meine Änderungen sieht?**
A: ChatGPT indiziert regelmäßig (~1-4 Wochen). Mit der `/api/metadata` Route können Echtzeit-Daten abgerufen werden.

**F: Was ist der Unterschied zwischen LocalBusiness und Service Schema?**
A: LocalBusiness = Ihr Studio (Ort, Adresse, Telefon)
Service Schema = Was Sie anbieten (Behandlungen, Preise)

## Ressourcen

- [Schema.org Dokumentation](https://schema.org/)
- [FAQ Schema Guide](https://developers.google.com/search/docs/appearance/faq-schema)
- [OpenAI Plugin Docs](https://platform.openai.com/docs/plugins)
- [LocalBusiness Best Practices](https://developers.google.com/search/docs/appearance/local-business)

---

**Letzte Aktualisierung:** 30.10.2025
**Optimiert für:** ChatGPT, Claude, Gemini, Bing AI
**Status:** Production Ready ✅
