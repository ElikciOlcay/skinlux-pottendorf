# 📧 Skinlux E-Mail-System Dokumentation

## 🎯 Überblick

Das E-Mail-System versendet automatisch professionelle E-Mails für den gesamten Gutschein-Workflow:

### **E-Mail-Typen:**
1. **🛍️ Bestellbestätigung** → An Kunden nach Gutschein-Bestellung
2. **🔔 Admin-Benachrichtigung** → An Admin bei neuer Bestellung
3. **✅ Zahlungsbestätigung** → An Kunden nach Zahlungseingang

---

## 🚀 Schnell-Setup

### 1. Resend Account erstellen
```bash
# 1. Gehe zu: https://resend.com
# 2. Account erstellen
# 3. Domain verifizieren (skinlux.at)
# 4. API Key generieren
```

### 2. Environment Variables setzen
```env
# .env.local
RESEND_API_KEY=re_your_resend_api_key
ADMIN_EMAIL=hello@skinlux.at
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Testen
```bash
# E-Mail-System testen
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'

# System-Status prüfen
curl http://localhost:3000/api/test-email
```

---

## 📬 E-Mail-Workflow

### **Schritt 1: Gutschein bestellen**
```
Kunde füllt Gutschein-Formular aus
     ↓
Gutschein wird in DB gespeichert
     ↓
🅰️ Bestellbestätigung → Kunde
🅱️ Admin-Benachrichtigung → Admin
```

### **Schritt 2: Zahlung bestätigen**
```
Admin markiert Gutschein als "bezahlt"
     ↓
Gutschein-Status wird aktualisiert
     ↓
🆚 Zahlungsbestätigung → Kunde
```

---

## 🎨 E-Mail-Templates

### 🅰️ **Bestellbestätigung (Kunde)**
- **Betreff:** `Gutschein-Bestellung bestätigt - [CODE]`
- **Inhalt:** 
  - Bestätigung der Bestellung
  - Gutschein-Details
  - Zahlungshinweise
  - "Termin buchen"-Button

### 🅱️ **Admin-Benachrichtigung**
- **Betreff:** `Neue Gutschein-Bestellung - €[BETRAG]`
- **Inhalt:**
  - Neue Bestellung Alert
  - Vollständige Bestelldetails
  - Link zum Admin-Dashboard
  - Nächste Schritte

### 🆚 **Zahlungsbestätigung (Kunde)**
- **Betreff:** `Gutschein aktiviert - [CODE] ist jetzt gültig!`
- **Inhalt:**
  - Erfolgs-Bestätigung
  - Aktivierter Gutschein
  - Verwendungsanweisungen
  - "Jetzt Termin buchen"-Button

---

## 🛠️ Technische Details

### **EmailService Klasse**
```typescript
import { EmailService } from '@/lib/email';

// Bestellbestätigung senden
await EmailService.sendCustomerConfirmation(emailData);

// Admin benachrichtigen
await EmailService.sendAdminNotification(emailData);

// Zahlungsbestätigung senden
await EmailService.sendPaymentConfirmation(emailData);
```

### **VoucherEmailData Interface**
```typescript
interface VoucherEmailData {
    voucherCode: string;      // SKIN-ABCD1234-EFGH
    amount: number;           // 100
    senderName: string;       // "Max Mustermann"
    senderEmail: string;      // "max@example.com"
    senderPhone?: string;     // "+43 123 456 789"
    recipientName?: string;   // "Lisa Musterfrau"
    message?: string;         // "Frohe Weihnachten!"
    orderNumber: string;      // "ORD-ABC123EF"
    expiresAt: string;        // ISO Date String
}
```

---

## 🔧 Konfiguration

### **Environment Variables**
```env
# Erforderlich
RESEND_API_KEY=re_your_api_key          # Resend API Schlüssel
ADMIN_EMAIL=hello@skinlux.at            # Admin E-Mail

# Optional
NEXT_PUBLIC_SITE_URL=https://skinlux.at # Für Links in E-Mails
NODE_ENV=production                     # Umgebung
```

### **Resend Domain Setup**
```bash
# DNS Records für skinlux.at:
# TXT Record:
v=DKIM1; k=rsa; p=[YOUR_PUBLIC_KEY]

# CNAME Record:
resend._domainkey.skinlux.at → resend.com
```

---

## 🧪 Testing & Debugging

### **Test-Endpoint verwenden**
```bash
# Status prüfen
curl http://localhost:3000/api/test-email

# Test-E-Mail senden
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

### **Logs überwachen**
```bash
# Development
npm run dev
# Schau in der Konsole nach E-Mail-Logs

# Production (Vercel)
# Gehe zu Vercel Dashboard → Functions → Logs
```

### **Resend Dashboard**
- **URL:** https://resend.com/dashboard
- **Monitoring:** Delivery rates, bounces, complaints
- **Logs:** Alle gesendeten E-Mails

---

## 📊 Monitoring & Analytics

### **E-Mail-Metriken**
| Metrik | Beschreibung | Ziel |
|--------|-------------|------|
| **Delivery Rate** | Erfolgreich zugestellt | >95% |
| **Open Rate** | E-Mails geöffnet | >25% |
| **Click Rate** | Links geklickt | >5% |
| **Bounce Rate** | Nicht zustellbar | <5% |

### **Logs auswerten**
```javascript
// Console-Logs suchen nach:
✅ Customer email: sent           // Erfolg
✅ Admin email: sent             // Erfolg
❌ Failed to send customer...    // Fehler
⚠️ RESEND_API_KEY not configured // Konfiguration
```

---

## 🚨 Troubleshooting

### **E-Mails kommen nicht an**
1. **Check Environment Variables**
   ```bash
   # .env.local prüfen
   echo $RESEND_API_KEY
   ```

2. **Domain Status prüfen**
   - Gehe zu Resend Dashboard
   - Verify Domain Status
   - Check DNS Records

3. **API Limits prüfen**
   - Development: 100 E-Mails/Tag
   - Production: Je nach Plan

4. **Spam-Filter**
   - Check Spam-Ordner
   - SPF/DKIM Records prüfen

### **Häufige Fehler**
```bash
# Fehler: "Invalid API key"
→ RESEND_API_KEY falsch oder abgelaufen

# Fehler: "Domain not verified"
→ DNS Records nicht korrekt gesetzt

# Fehler: "Rate limit exceeded"
→ Zu viele E-Mails in kurzer Zeit
```

---

## 🔐 Security & Best Practices

### **API Key Sicherheit**
- ✅ Nur in Environment Variables
- ✅ Niemals im Frontend-Code
- ✅ Separate Keys für Dev/Prod
- ❌ Niemals in Git committen

### **E-Mail-Sicherheit**
- ✅ SPF/DKIM/DMARC Records
- ✅ Domain-Reputation überwachen
- ✅ Unsubscribe-Links hinzufügen
- ✅ Spam-Filter vermeiden

### **Rate Limiting**
```javascript
// Implementiere Rate Limiting bei Bedarf
const rateLimit = {
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 5, // Max 5 E-Mails pro IP
};
```

---

## 🚀 Production Deployment

### **1. Environment Setup**
```env
# Production .env
RESEND_API_KEY=re_prod_key_here
ADMIN_EMAIL=hello@skinlux.at
NEXT_PUBLIC_SITE_URL=https://skinlux.at
NODE_ENV=production
```

### **2. Domain Verification**
```bash
# 1. Domain zu Resend hinzufügen
# 2. DNS Records setzen
# 3. Verification abwarten
# 4. Test-E-Mail senden
```

### **3. Monitoring einrichten**
- Resend Webhooks für Delivery-Status
- Vercel Logs für Error-Tracking
- Uptime-Monitoring für API

---

## 📈 Erweiterte Features

### **Zukünftige Erweiterungen**
- [ ] **E-Mail-Templates Editor** (Admin-Panel)
- [ ] **Unsubscribe Management**
- [ ] **E-Mail-Statistiken Dashboard**
- [ ] **Automatische Erinnerungen** (Gutschein läuft ab)
- [ ] **Webhook-Integration** (Delivery-Status)
- [ ] **A/B Testing** für E-Mail-Templates

### **Custom Templates**
```typescript
// Neue Template-Funktion hinzufügen
static generateReminderEmail(data: VoucherEmailData) {
    // Template für Ablauf-Erinnerung
}
```

---

## 📞 Support

Bei Problemen:
1. **Check Logs:** Console & Resend Dashboard
2. **Test Endpoint:** `/api/test-email`
3. **Environment:** Alle Variablen gesetzt?
4. **Resend Status:** https://status.resend.com

**Resend Dokumentation:** https://resend.com/docs

---

## ✅ Checkliste Production-Ready

- [ ] Resend Domain verifiziert
- [ ] Alle Environment Variables gesetzt
- [ ] Test-E-Mails erfolgreich versendet
- [ ] DNS Records korrekt konfiguriert
- [ ] Spam-Filter getestet
- [ ] Rate Limits verstanden
- [ ] Monitoring eingerichtet
- [ ] Backup-Strategie definiert

**🎉 System ist einsatzbereit!** 