# Skinlux Admin - Scripts

## 🚀 deploy-migration.sh

Dieses Script führt die Produktions-Migration für das Auth-System aus.

### Voraussetzungen

- Supabase CLI installiert
- `.env.production` Datei mit DATABASE_URL
- Zugriff auf die Produktions-Datenbank

### Verwendung

```bash
# Script ausführbar machen (einmalig)
chmod +x scripts/deploy-migration.sh

# Migration ausführen
./scripts/deploy-migration.sh
```

### Was macht das Script?

1. Prüft ob alle Voraussetzungen erfüllt sind
2. Zeigt eine Übersicht der Migrationen
3. Fragt nach Bestätigung
4. Führt die Migration aus
5. Zeigt nächste Schritte an

### Wichtige Hinweise

⚠️ **ACHTUNG**: Dieses Script arbeitet mit der PRODUKTIONS-Datenbank!

- Erstellen Sie IMMER ein Backup vor der Migration
- Testen Sie die Migration zuerst in einer Staging-Umgebung
- Das Initial-Passwort (ChangeMe123!) muss sofort geändert werden

### Fehlerbehebung

**"Supabase CLI ist nicht installiert"**
```bash
# macOS
brew install supabase/tap/supabase

# Linux/WSL
curl -fsSL https://raw.githubusercontent.com/supabase/cli/main/install.sh | sh
```

**".env.production nicht gefunden"**
- Erstellen Sie die Datei basierend auf `ENV_TEMPLATE.md`
- Stellen Sie sicher, dass DATABASE_URL gesetzt ist

**"Migration fehlgeschlagen"**
- Überprüfen Sie die Datenbank-Verbindung
- Prüfen Sie ob die Tabellen bereits existieren
- Schauen Sie in die Supabase Logs 