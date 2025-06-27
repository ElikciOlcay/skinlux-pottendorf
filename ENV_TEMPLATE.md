# Environment Variables Template

Erstellen Sie eine `.env.local` Datei für Entwicklung oder `.env.production` für Produktion mit folgenden Variablen:

## Supabase Configuration
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database URL (für Migrationen)
```env
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```

## Application
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000  # oder https://admin.skinlux.at für Produktion
NODE_ENV=development  # oder production
```

## E-Mail Service (Produktion)

### Option 1: SendGrid
```env
SENDGRID_API_KEY=your-sendgrid-api-key
```

### Option 2: Resend
```env
RESEND_API_KEY=your-resend-api-key
```

## E-Mail Settings
```env
EMAIL_FROM=noreply@skinlux.at
EMAIL_REPLY_TO=support@skinlux.at
```

## Security (Produktion)
```env
SESSION_SECRET=generate-a-secure-random-string
JWT_SECRET=generate-another-secure-random-string
```

## Optional: Monitoring (Produktion)
```env
SENTRY_DSN=your-sentry-dsn
LOGROCKET_APP_ID=your-logrocket-app-id
```

## Generierung sicherer Secrets

Verwenden Sie folgenden Befehl um sichere Secrets zu generieren:
```bash
openssl rand -hex 32
``` 