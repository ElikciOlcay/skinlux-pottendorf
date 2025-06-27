# Skinlux Admin - Produktions-Setup

## 🚀 Übersicht

Diese Anleitung beschreibt die Schritte zum Deployment des Skinlux Admin Systems in Produktion.

## 📋 Voraussetzungen

- Node.js 18+ 
- PostgreSQL (über Supabase)
- E-Mail-Service (SendGrid, Resend, o.ä.)
- Hosting-Provider (Vercel, Netlify, o.ä.)

## 🔧 1. Datenbank-Setup

### Migration ausführen

Führen Sie die folgende Migration in Ihrem Supabase-Projekt aus:

```sql
-- Datei: supabase/migrations/20250627093916_add_admin_users_auth.sql
```

Diese erstellt:
- `admin_users` Tabelle für sichere Authentifizierung
- `password_reset_tokens` Tabelle für Passwort-Resets
- `admin_sessions` Tabelle für Session-Management

### Initial Admin User

Nach der Migration existiert ein initialer Admin-User:
- **Email**: admin@skinlux.at
- **Passwort**: ChangeMe123!

⚠️ **WICHTIG**: Ändern Sie dieses Passwort sofort nach dem ersten Login!

## 🔐 2. Environment-Variablen

Erstellen Sie eine `.env.production` Datei:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=ihre-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ihr-anon-key
SUPABASE_SERVICE_ROLE_KEY=ihr-service-role-key

# App
NEXT_PUBLIC_APP_URL=https://admin.skinlux.at
NODE_ENV=production

# E-Mail Service (Beispiel: SendGrid)
SENDGRID_API_KEY=ihr-sendgrid-api-key
EMAIL_FROM=noreply@skinlux.at

# Security
SESSION_SECRET=generieren-sie-ein-sicheres-secret
JWT_SECRET=generieren-sie-ein-sicheres-jwt-secret
```

## 📧 3. E-Mail-Service konfigurieren

### Option A: SendGrid

1. SendGrid Account erstellen
2. API-Key generieren
3. `app/api/send-email/route.ts` anpassen:

```typescript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

### Option B: Resend

1. Resend Account erstellen
2. API-Key generieren
3. Installation: `npm install resend`

## 🔒 4. Sicherheits-Updates

### Passwort-Hashing implementieren

Installieren Sie bcrypt:
```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### Rate-Limiting hinzufügen

Installieren Sie rate-limiter:
```bash
npm install express-rate-limit
```

## 🚀 5. Deployment

### Vercel (Empfohlen)

1. Repository mit Vercel verbinden
2. Environment-Variablen setzen
3. Build-Command: `npm run build`
4. Output Directory: `.next`

### Netlify

1. Repository verbinden
2. Build-Settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Environment-Variablen hinzufügen

## ✅ 6. Post-Deployment Checkliste

- [ ] Initial-Passwort geändert
- [ ] E-Mail-Versand getestet
- [ ] SSL-Zertifikat aktiv
- [ ] Backup-Strategie implementiert
- [ ] Monitoring eingerichtet
- [ ] Rate-Limiting aktiv
- [ ] CORS konfiguriert
- [ ] Security Headers gesetzt

## 🔧 7. Wartung

### Regelmäßige Aufgaben

1. **Session-Cleanup** (täglich):
```sql
SELECT cleanup_expired_auth_data();
```

2. **Backup** (täglich)
3. **Security-Updates** (wöchentlich)
4. **Log-Monitoring** (kontinuierlich)

## 📊 8. Monitoring

Empfohlene Services:
- **Sentry**: Fehler-Tracking
- **LogRocket**: Session-Recording
- **Datadog**: Performance-Monitoring

## 🆘 9. Troubleshooting

### Häufige Probleme

1. **"Invalid API key"**
   - Überprüfen Sie die Supabase-Keys
   - Stellen Sie sicher, dass NODE_ENV=production gesetzt ist

2. **E-Mails werden nicht versendet**
   - API-Keys überprüfen
   - Sender-Domain verifizieren
   - Spam-Filter prüfen

3. **Sessions laufen zu schnell ab**
   - SESSION_DURATION in auth.ts anpassen
   - Cookie-Settings überprüfen

## 📞 Support

Bei Fragen oder Problemen:
- Dokumentation: `/docs`
- Support: support@skinlux.at
- Notfall: +43 XXX XXXXXXX

## 🔐 Sicherheitshinweise

1. **Niemals** Produktions-Keys in Git committen
2. **Immer** HTTPS verwenden
3. **Regelmäßig** Dependencies updaten
4. **Backup** vor jedem Update
5. **Monitoring** für verdächtige Aktivitäten

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: Dezember 2024 