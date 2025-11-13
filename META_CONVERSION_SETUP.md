# Meta Conversions API Setup - Pottendorf

## Umgebungsvariablen

Füge folgende Variablen in deine `.env.local` Datei ein:

```bash
# Meta Conversions API
META_PIXEL_ID="DEINE_PIXEL_ID"
META_CONVERSION_API_TOKEN="EAAhf3oWEUEQBP4wpuZB5giyWxXvKvFLd5ZAcNK0K9TG9SbkMp8ikCATD60VhfNZBT12EJNI52XwUFwLxjZBZAJ3BEi8YS1UgPflsPXwFGoObmyCSDrQsDllRuGONInN65rz31qb8v5WQracZAQvklths6ZCe3B968xqun1EA8cwClqv3XojxclWdPVf5vKcNwZDZD"
```

**Hinweis:** Ersetze `DEINE_PIXEL_ID` mit deiner tatsächlichen Meta Pixel ID.

## Implementierte Features

### 1. API-Route
- **Pfad:** `/api/meta-conversion`
- **Methode:** POST
- Verarbeitet Events und sendet sie an Meta
- Hasht automatisch sensible Nutzerdaten (GDPR-konform)
- Deduplizierung mit Event-IDs

### 2. Tracking-Helper (`lib/meta-tracking.ts`)
Fertige Funktionen zum Tracken von Events:

```typescript
import { trackTerminBuchung, trackLaserAktionView, trackPageView, trackLead } from '@/lib/meta-tracking';

// Terminbuchung tracken
trackTerminBuchung({
    email: 'kunde@example.com',
    phone: '+43664...',
    firstName: 'Max',
    lastName: 'Mustermann'
});

// Laser-Aktion Seitenaufruf tracken
trackLaserAktionView();

// Allgemeiner Seitenaufruf
trackPageView('Homepage');

// Lead tracken
trackLead({ email: 'lead@example.com' });
```

### 3. Getrackte Events

**Standard-Events:**
- `Schedule` - Terminbuchung
- `ViewContent` - Seitenaufruf
- `Lead` - Lead-Generierung
- `Contact` - Kontaktaufnahme

**Custom Events:**
- `LaserAktionView` - Laser-Aktion Landingpage Aufruf

## Integration Beispiele

### Laser-Aktion Landingpage

```typescript
"use client";

import { useEffect } from 'react';
import { trackLaserAktionView } from '@/lib/meta-tracking';

export default function LaserAktion() {
    useEffect(() => {
        // Track Page View
        trackLaserAktionView();
    }, []);
    
    // ...
}
```

### Termin-Buchung Button

```typescript
<a
    href="https://connect.shore.com/..."
    onClick={() => {
        trackTerminBuchung({
            // Optional: Nutzer-Daten wenn verfügbar
        });
    }}
>
    Jetzt buchen
</a>
```

## Vercel Deployment

Füge die Umgebungsvariablen in Vercel ein:
1. Gehe zu deinem Projekt in Vercel
2. Settings → Environment Variables
3. Füge hinzu:
   - `META_PIXEL_ID`
   - `META_CONVERSION_API_TOKEN`
4. Redeploy

## Überwachung

Die Events kannst du im Meta Events Manager überwachen:
- Event-Abgleichsqualität
- Deduplizierungsrate
- Datenaktualität

## Datenschutz

✅ GDPR-konform:
- Alle sensiblen Daten werden gehasht (SHA-256)
- E-Mail, Telefon, Name werden vor dem Senden verschlüsselt
- Client-IP und User-Agent werden mitgesendet (nicht gehasht)
- Cookies (_fbc, _fbp) für Deduplizierung

## Weitere Schritte

1. Umgebungsvariablen in `.env.local` eintragen
2. In Vercel Umgebungsvariablen hinzufügen
3. Tracking in Komponenten einbauen (optional)
4. Events im Meta Events Manager überwachen

