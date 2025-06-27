// Auth-System für Skinlux Admin - Produktionsversion
import { supabase } from './supabase';

export interface AuthUser {
    id: string;
    email: string;
    role: 'admin' | 'super_admin';
    studioId: string;
}

export class AuthService {
    private static readonly SESSION_KEY = 'skinlux_admin_session';
    private static readonly IS_PRODUCTION = process.env.NODE_ENV === 'production';

    // Demo-Credentials nur für Entwicklung
    private static readonly DEMO_USERS: Record<string, {
        password: string;
        id: string;
        role: 'admin' | 'super_admin';
        studioId: string;
    }> = {
            'hello@skinlux.at': {
                password: 'admin123',
                id: 'demo-user-1',
                role: 'admin',
                studioId: 'c8fbbef9-a94b-43b7-a280-90320f3ae29a'
            },
            'admin@skinlux.at': {
                password: 'SkinluxAdmin2024!',
                id: 'demo-user-2',
                role: 'super_admin',
                studioId: 'c8fbbef9-a94b-43b7-a280-90320f3ae29a'
            }
        };

    // Login
    static async login(email: string, password: string): Promise<{ user?: AuthUser; error?: string }> {
        try {
            // In Produktion: Nur DB-Authentifizierung
            if (this.IS_PRODUCTION) {
                return await this.productionLogin(email, password);
            }

            // In Entwicklung: Erst Demo-Users, dann DB
            const demoUser = this.DEMO_USERS[email];
            if (demoUser && demoUser.password === password) {
                const user: AuthUser = {
                    id: demoUser.id,
                    email,
                    role: demoUser.role,
                    studioId: demoUser.studioId
                };

                this.saveSession(user);
                return { user };
            }

            // Fallback zu DB-Login
            return await this.productionLogin(email, password);

        } catch (error: unknown) {
            return { error: `Login fehlgeschlagen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}` };
        }
    }

    // Produktions-Login mit Datenbank
    private static async productionLogin(email: string, password: string): Promise<{ user?: AuthUser; error?: string }> {
        try {
            // Verwende die admin_users Tabelle wenn Migration angewendet wurde
            const { data: adminUser, error: adminError } = await supabase
                .from('admin_users')
                .select('id, email, password_hash, role, studio_id')
                .eq('email', email.toLowerCase())
                .single();

            if (!adminError && adminUser) {
                // TODO: Implementiere sichere Passwort-Validierung
                // Für jetzt: Direkte Passwort-Überprüfung (NICHT für Produktion!)
                if (!this.IS_PRODUCTION && password === 'ChangeMe123!') {
                    const user: AuthUser = {
                        id: adminUser.id,
                        email: adminUser.email,
                        role: adminUser.role,
                        studioId: adminUser.studio_id
                    };

                    this.saveSession(user);
                    return { user };
                }
            }

            // Fallback: Alte admin_profiles Tabelle
            const { data: profile } = await supabase
                .from('admin_profiles')
                .select('id, user_id, role, studio_id')
                .eq('user_id', email === 'hello@skinlux.at' ? 'bd081afa-dc4b-4784-a8b5-dc949137d252' : 'admin-user')
                .single();

            if (profile && !this.IS_PRODUCTION) {
                const user: AuthUser = {
                    id: profile.user_id,
                    email,
                    role: profile.role,
                    studioId: profile.studio_id
                };

                this.saveSession(user);
                return { user };
            }

            return { error: 'Ungültige Anmeldedaten' };

        } catch (error: unknown) {
            console.error('Production login error:', error);
            return { error: 'Authentifizierung fehlgeschlagen' };
        }
    }

    // Logout
    static logout(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.SESSION_KEY);
            sessionStorage.removeItem(this.SESSION_KEY);
        }
    }

    // Aktuelle Session abrufen
    static getCurrentUser(): AuthUser | null {
        if (typeof window === 'undefined') return null;

        try {
            const sessionData = localStorage.getItem(this.SESSION_KEY);

            if (!sessionData) return null;

            const user = JSON.parse(sessionData);

            // Überprüfe ob Session noch gültig ist (24 Stunden)
            if (user.expires && Date.now() > user.expires) {
                this.logout();
                return null;
            }

            return user;
        } catch {
            return null;
        }
    }

    // Session überprüfen
    static isAuthenticated(): boolean {
        return this.getCurrentUser() !== null;
    }

    // Admin-Rechte überprüfen
    static isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user?.role === 'admin' || user?.role === 'super_admin';
    }

    // Session speichern
    private static saveSession(user: AuthUser): void {
        if (typeof window === 'undefined') return;

        const sessionData = {
            ...user,
            expires: Date.now() + (24 * 60 * 60 * 1000) // 24 Stunden
        };

        localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    }

    // Auth State Change Listener (für Kompatibilität)
    static onAuthStateChange(callback: (authenticated: boolean, user: AuthUser | null) => void) {
        // Überprüfe initial
        const user = this.getCurrentUser();
        callback(!!user, user);

        // Listen auf Storage-Änderungen
        if (typeof window !== 'undefined') {
            const handleStorageChange = () => {
                const user = this.getCurrentUser();
                callback(!!user, user);
            };

            window.addEventListener('storage', handleStorageChange);

            return {
                data: {
                    subscription: {
                        unsubscribe: () => {
                            window.removeEventListener('storage', handleStorageChange);
                        }
                    }
                }
            };
        }

        return {
            data: {
                subscription: {
                    unsubscribe: () => { }
                }
            }
        };
    }

    // Passwort-Reset anfordern
    static async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
        try {
            // In Produktion: Verwende die password_reset_tokens Tabelle
            if (this.IS_PRODUCTION) {
                const { data: user } = await supabase
                    .from('admin_users')
                    .select('id')
                    .eq('email', email.toLowerCase())
                    .single();

                if (user) {
                    // Generiere Token und speichere in DB
                    const token = this.generateToken();
                    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

                    await supabase
                        .from('password_reset_tokens')
                        .insert({
                            user_id: user.id,
                            token_hash: token, // In Produktion: Hash verwenden!
                            expires_at: expiresAt.toISOString()
                        });

                    // Sende E-Mail über API
                    const resetLink = `${window.location.origin}/admin/reset-password?token=${token}`;

                    await fetch('/api/send-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            to: email,
                            subject: 'Passwort zurücksetzen - Skinlux Admin',
                            template: 'password-reset',
                            data: { resetLink, email }
                        })
                    });
                }

                // Aus Sicherheitsgründen immer success
                return { success: true };
            }

            // Demo-Modus
            if (!this.DEMO_USERS[email]) {
                return { success: false, error: 'Diese E-Mail-Adresse ist nicht registriert.' };
            }

            const token = this.generateToken();
            const resetLink = `${window.location.origin}/admin/reset-password?token=${token}`;

            // In Demo: Zeige Link in Alert
            alert(`Demo: Ihr Reset-Link lautet:\n${resetLink}\n\n(In Produktion würde dies per E-Mail versendet)`);

            // Speichere Token temporär im sessionStorage
            if (typeof window !== 'undefined') {
                sessionStorage.setItem(`reset_${token}`, JSON.stringify({
                    email,
                    expires: Date.now() + 30 * 60 * 1000
                }));
            }

            return { success: true };
        } catch (error: unknown) {
            return { success: false, error: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten' };
        }
    }

    // Reset-Token validieren
    static validateResetToken(token: string): { valid: boolean; email?: string } {
        if (this.IS_PRODUCTION) {
            // TODO: Implementiere DB-basierte Token-Validierung
            return { valid: false };
        }

        // Demo-Modus
        if (typeof window === 'undefined') return { valid: false };

        const data = sessionStorage.getItem(`reset_${token}`);
        if (!data) return { valid: false };

        try {
            const parsed = JSON.parse(data);
            if (Date.now() > parsed.expires) {
                sessionStorage.removeItem(`reset_${token}`);
                return { valid: false };
            }
            return { valid: true, email: parsed.email };
        } catch {
            return { valid: false };
        }
    }

    // Passwort zurücksetzen
    static async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
        try {
            // Validiere Passwort
            if (newPassword.length < 8) {
                return { success: false, error: 'Das Passwort muss mindestens 8 Zeichen lang sein.' };
            }

            if (this.IS_PRODUCTION) {
                // TODO: Implementiere DB-basiertes Passwort-Reset
                return { success: false, error: 'Passwort-Reset in Produktion noch nicht implementiert.' };
            }

            // Demo-Modus
            const validation = this.validateResetToken(token);
            if (!validation.valid || !validation.email) {
                return { success: false, error: 'Ungültiger oder abgelaufener Reset-Link.' };
            }

            // Update Demo-Passwort
            const demoUser = this.DEMO_USERS[validation.email];
            if (demoUser) {
                demoUser.password = newPassword;
                sessionStorage.removeItem(`reset_${token}`);
                return { success: true };
            }

            return { success: false, error: 'Benutzer nicht gefunden.' };
        } catch (error: unknown) {
            return { success: false, error: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten' };
        }
    }

    // Token generieren
    private static generateToken(): string {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
} 