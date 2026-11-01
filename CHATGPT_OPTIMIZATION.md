# Sichtbarkeit in ChatGPT, Claude & Co. (GEO)

Wie pottendorf.skinlux.at für KI-Assistenten (ChatGPT, Claude, Perplexity, Gemini, Copilot) und klassische Suchmaschinen aufbereitet ist – und was davon im Code liegt.

## Wie KI-Assistenten an Informationen kommen

- **ChatGPT-Suche** nutzt eigene Crawler (`OAI-SearchBot`, `ChatGPT-User`) und den **Bing-Index**.
- **Claude** nutzt eigene Crawler (`Claude-SearchBot`, `Claude-User`, `ClaudeBot`) und eine Websuche.
- **Perplexity, Gemini, Copilot** nutzen eigene Crawler bzw. Google- und Bing-Index.
- Die KI-Crawler von OpenAI und Anthropic **führen kein JavaScript aus**. Was nicht im Server-HTML steht, sehen sie nicht.
- Empfohlen wird, was oft und übereinstimmend genannt wird: Website, Google-Unternehmensprofil, Bewertungen, Branchenverzeichnisse, Presse. Die Website ist nur ein Teil davon – eine Garantie für Platz 1 gibt es nicht.

## Im Code umgesetzt

| Was | Wo |
|---|---|
| KI-Crawler ausdrücklich erlaubt (OpenAI, Anthropic, Perplexity, Google-Extended, Applebot) | `app/robots.ts` |
| Eine Sitemap mit allen öffentlichen Seiten | `app/sitemap.ts` → `/sitemap.xml` |
| `/llms.txt`: Faktenübersicht (Adresse, Zeiten, Bewertung, alle Behandlungen mit Preisen, FAQ) – aus denselben Daten wie die Website erzeugt | `app/llms.txt/route.ts` |
| Firmendaten als Schema.org (Adresse, Geo, Öffnungszeiten, Google-Rating, alle Behandlungen, Fachgebiete) | `app/layout.tsx` |
| FAQ auf der Startseite (sichtbar + `FAQPage`-Schema), formuliert wie typische KI-Fragen | `lib/seo/homeFaq.ts`, `components/sections/HomeFaq.tsx` |
| FAQ-Antworten stehen immer im HTML (nur optisch eingeklappt) | `components/ui/FaqAccordion.tsx` |
| Behandlungsseiten mit `Service`-, `FAQPage`- und `BreadcrumbList`-Schema | `app/behandlungen/*/page.tsx` |
| Lokale Landingpages (Stadt × Behandlung) | `app/[city]/…`, `lib/seo/` |
| IndexNow: Seiten direkt an Bing melden | `scripts/indexnow.mjs`, Schlüsseldatei in `public/` |

## Nach jedem Deployment mit neuen oder geänderten Seiten

```bash
npm run indexnow
```

## Pflege

- **Preise ändern:** Laser in `lib/laser-prices.ts`, GREEN PEEL in `app/behandlungen/green-peel/data.ts` – beides fließt automatisch in `/llms.txt` und die Startseiten-FAQ. HydraFacial-, SkinPen- und Facial-Preise stehen zusätzlich in `app/llms.txt/route.ts` und `lib/seo/homeFaq.ts` und müssen dort mit angepasst werden.
- **Google-Bewertung:** `lib/business-info.ts` (`GOOGLE_RATING`) regelmäßig auf den aktuellen Stand bringen.
- **Neue Behandlung:** Seite anlegen, in `app/sitemap.ts`, `TREATMENTS` in `app/layout.tsx` und `app/llms.txt/route.ts` eintragen.

## Außerhalb des Codes (wichtig für KI-Empfehlungen)

- Google-Unternehmensprofil vollständig pflegen: alle Behandlungen als Leistungen, Preise, Fotos, Beiträge.
- **Bing Places for Business** anlegen bzw. aus Google importieren – Grundlage für ChatGPT und Copilot.
- **Bing Webmaster Tools** und **Google Search Console**: Sitemap einreichen, Indexierung prüfen.
- Apple Business Connect (Apple Karten / Siri).
- Bewertungen aktiv sammeln und beantworten – auch mit Behandlungsnamen im Text („HydraFacial“, „Laser“).
- Einträge in Branchenverzeichnissen (Herold, Treatwell, Wer-kennt-den-Besten …) mit identischem Namen, Adresse und Telefonnummer.
- Erwähnungen in regionalen Medien, Blogs, Gemeinde-Websites.

## Testen

- `https://pottendorf.skinlux.at/llms.txt` und `/robots.txt` aufrufen
- Schema: https://validator.schema.org und https://search.google.com/test/rich-results
- In ChatGPT (mit Suche) und Claude (mit Websuche) regelmäßig fragen, z. B. „Wo kann ich in der Nähe von Baden Laser-Haarentfernung machen?“
