# Umgebungsvariablen Setup

## 1. Erstellen Sie eine `.env.local` Datei

Erstellen Sie im Root-Verzeichnis des Projekts eine Datei namens `.env.local` mit folgendem Inhalt:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For server-side operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Email Configuration (for sending vouchers)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Bank Details (for payment instructions)
BANK_NAME=Ihre Bank
BANK_IBAN=AT00 0000 0000 0000 0000
BANK_BIC=XXXXATXX
BANK_ACCOUNT_HOLDER=Skinlux GmbH

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@skinlux.at
ADMIN_INITIAL_PASSWORD=change-this-password-immediately

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Studio-spezifische Konfiguration
NEXT_PUBLIC_STUDIO_ID=deine-studio-id-hier
```

## 2. Supabase-Konfiguration

1. Gehen Sie zu [supabase.com](https://supabase.com) und erstellen Sie ein neues Projekt
2. Nach der Erstellung finden Sie Ihre Credentials unter:
   - **Settings → API**
   - `NEXT_PUBLIC_SUPABASE_URL`: Ihre Projekt-URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Der "anon public" Schlüssel
   - `SUPABASE_SERVICE_ROLE_KEY`: Der "service_role" Schlüssel (nur für Server-Side)

## 3. Datenbank-Setup

Führen Sie das SQL-Schema aus `supabase/schema.sql` in Ihrem Supabase-Projekt aus:
1. Gehen Sie zu **SQL Editor** in Ihrem Supabase Dashboard
2. Kopieren Sie den Inhalt von `supabase/schema.sql`
3. Führen Sie das SQL aus

## 4. Email-Konfiguration (Optional)

Für den Versand von Gutscheinen per Email:
- Verwenden Sie einen SMTP-Service (z.B. Gmail, SendGrid, etc.)
- Bei Gmail: Erstellen Sie ein App-Passwort unter Ihren Google-Kontoeinstellungen

## 5. Bankdaten

Ersetzen Sie die Platzhalter mit Ihren echten Bankdaten für die Überweisungsinformationen.

## 6. Admin-Zugang

Nach dem ersten Start können Sie sich mit den konfigurierten Admin-Credentials einloggen.
**Wichtig**: Ändern Sie das Passwort sofort nach dem ersten Login!

## Sicherheitshinweise

- Die `.env.local` Datei sollte **niemals** in Git committed werden
- Verwenden Sie sichere, zufällig generierte Passwörter
- Beschränken Sie den Zugriff auf die Service Role Keys
- Aktivieren Sie Row Level Security (RLS) in Supabase