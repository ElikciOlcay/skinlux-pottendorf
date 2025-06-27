#!/bin/bash

# Skinlux Admin - Produktions-Migration Deployment Script
# Verwendung: ./scripts/deploy-migration.sh

echo "🚀 Skinlux Admin - Produktions-Migration"
echo "========================================"

# Prüfe ob Supabase CLI installiert ist
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI ist nicht installiert!"
    echo "Installieren Sie es mit: brew install supabase/tap/supabase"
    exit 1
fi

# Prüfe ob .env.production existiert
if [ ! -f ".env.production" ]; then
    echo "❌ .env.production nicht gefunden!"
    echo "Erstellen Sie die Datei mit den notwendigen Umgebungsvariablen."
    exit 1
fi

# Lade Umgebungsvariablen
source .env.production

echo ""
echo "📋 Migrations-Übersicht:"
echo "- admin_users Tabelle"
echo "- password_reset_tokens Tabelle"
echo "- admin_sessions Tabelle"
echo "- Initial Admin User (admin@skinlux.at)"
echo ""

read -p "⚠️  Möchten Sie die Migration auf PRODUKTION ausführen? (ja/nein): " confirm

if [ "$confirm" != "ja" ]; then
    echo "❌ Migration abgebrochen."
    exit 0
fi

echo ""
echo "🔄 Führe Migration aus..."

# Führe Migration aus
supabase db push --db-url "${DATABASE_URL}" ./supabase/migrations/20250627093916_add_admin_users_auth.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration erfolgreich ausgeführt!"
    echo ""
    echo "📝 Nächste Schritte:"
    echo "1. Loggen Sie sich mit admin@skinlux.at ein"
    echo "2. Ändern Sie sofort das Initial-Passwort (ChangeMe123!)"
    echo "3. Erstellen Sie weitere Admin-Benutzer nach Bedarf"
    echo "4. Testen Sie den E-Mail-Versand für Passwort-Reset"
else
    echo "❌ Migration fehlgeschlagen!"
    echo "Prüfen Sie die Fehlermeldungen und versuchen Sie es erneut."
    exit 1
fi

echo ""
echo "🎉 Deployment abgeschlossen!" 