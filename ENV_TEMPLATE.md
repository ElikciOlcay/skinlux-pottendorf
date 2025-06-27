# 🔧 Environment Variables Configuration

Diese Datei zeigt alle notwendigen Umgebungsvariablen für das Skinlux-System.

## 📁 .env.local (Development)

```env
# ========== SUPABASE CONFIGURATION ==========
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ========== E-MAIL CONFIGURATION ==========
# Resend API Key für E-Mail-Versendung
RESEND_API_KEY=re_your_resend_api_key

# Admin E-Mail für Benachrichtigungen
ADMIN_EMAIL=hello@skinlux.at

# ========== SITE CONFIGURATION ==========
# Für Links in E-Mails
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ========== DEVELOPMENT OVERRIDES ==========
NODE_ENV=development
```

## 🚀 Production Environment (.env.production)

```env
# ========== SUPABASE CONFIGURATION ==========
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# ========== E-MAIL CONFIGURATION ==========
# Resend API Key
RESEND_API_KEY=re_your_production_resend_api_key

# Admin E-Mail
ADMIN_EMAIL=hello@skinlux.at

# ========== SITE CONFIGURATION ==========
NEXT_PUBLIC_SITE_URL=https://skinlux.at

# ========== PRODUCTION SETTINGS ==========
NODE_ENV=production

# ========== DOMAIN CONFIGURATION ==========
NEXT_PUBLIC_DOMAIN=yourdomain.com
```

## 📧 E-Mail Service Setup (Resend)

### 1. Resend Account erstellen
1. Gehe zu [https://resend.com](https://resend.com)
2. Erstelle einen Account
3. Verifiziere deine Domain (`skinlux.at`)
4. Erstelle einen API Key

### 2. Domain Verification
```bash
# DNS Records für skinlux.at hinzufügen:
# TXT Record: v=DKIM1; k=rsa; p=your_public_key
# CNAME Record: resend._domainkey.skinlux.at -> resend.com
```

### 3. API Key Configuration
```env
# Development (kann mit einer verifizierten E-Mail senden)
RESEND_API_KEY=re_dev_key_starts_with_re_

# Production (kann an beliebige E-Mails senden)
RESEND_API_KEY=re_prod_key_starts_with_re_
```

## 🧪 Testing Email System

### Development Mode
- E-Mails werden nur an verifizierte E-Mail-Adressen gesendet
- Verwende deine eigene E-Mail für Tests
- Check Resend Dashboard für Logs

### Production Mode
- E-Mails können an alle Adressen gesendet werden
- Monitor Delivery-Rates im Resend Dashboard
- Setup Webhooks für Bounce/Complaint handling

## 🔐 Security Notes

1. **Service Role Key**: Niemals im Frontend verwenden!
2. **API Keys**: In Umgebungsvariablen speichern, nicht im Code
3. **E-Mail Rate Limits**: Resend hat Standard-Limits (check your plan)
4. **Domain Reputation**: Warmup für bessere Delivery

## 📋 Checklist für Production

- [ ] Alle Environment Variables gesetzt
- [ ] Resend Domain verifiziert
- [ ] E-Mail Templates getestet
- [ ] Admin-E-Mail erreichbar
- [ ] Rate Limits verstanden
- [ ] Monitoring eingerichtet

## 🆘 Troubleshooting

### E-Mails kommen nicht an
1. Check Resend Dashboard für Fehler
2. Verify Domain-Status
3. Check Spam-Ordner
4. Monitor API Rate Limits

### Environment Variables
```bash
# Check if variables are loaded
npm run build
# Should show no warnings about missing vars
```

### Testing Commands
```bash
# Test E-Mail-Service (create test endpoint)
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
``` 