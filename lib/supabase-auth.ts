import { supabase } from './supabase'
import type { Session } from '@supabase/supabase-js'

// Auth Helper Functions für Admin-System
export class AdminAuth {

    // Prüft ob der aktuell eingeloggte User ein Admin ist
    static async isAdmin(): Promise<{ isAdmin: boolean; adminData?: AdminAccess | null }> {
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                return { isAdmin: false }
            }

            const { data: adminAccess, error } = await supabase
                .from('admin_access')
                .select('*')
                .eq('user_id', user.id)
                .eq('is_active', true)
                .single()

            if (error || !adminAccess) {
                return { isAdmin: false }
            }

            return { isAdmin: true, adminData: adminAccess }
        } catch (error) {
            console.error('Admin check failed:', error)
            return { isAdmin: false }
        }
    }

    // Holt Admin-Daten für den aktuellen User
    static async getAdminData(): Promise<AdminAccess | null> {
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) return null

            const { data, error } = await supabase
                .from('admin_access')
                .select(`
          *,
          studio:studios(*)
        `)
                .eq('user_id', user.id)
                .eq('is_active', true)
                .single()

            return error ? null : data
        } catch (error) {
            console.error('Failed to get admin data:', error)
            return null
        }
    }

    // Login mit E-Mail und Passwort
    static async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return { success: false, error: error.message }
        }

        // Prüfen ob User Admin-Rechte hat
        const { isAdmin, adminData } = await this.isAdmin()

        if (!isAdmin) {
            // User wieder ausloggen wenn er kein Admin ist
            await supabase.auth.signOut()
            return { success: false, error: 'Keine Admin-Berechtigung gefunden' }
        }

        return { success: true, user: data.user, adminData }
    }

    // Logout
    static async signOut() {
        const { error } = await supabase.auth.signOut()
        return { success: !error, error: error?.message }
    }

    // Aktueller User
    static async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser()
        return user
    }

    // Session State abonnieren
    static onAuthStateChange(callback: (event: string, session: Session | null) => void) {
        return supabase.auth.onAuthStateChange(callback)
    }
}

// TypeScript Interfaces
export interface AdminAccess {
    id: string
    user_id: string
    studio_id?: string
    role: 'admin' | 'super_admin'
    is_active: boolean
    created_at: string
    updated_at: string
    studio?: {
        id: string
        name: string
        address?: string
        subdomain?: string
        created_at: string
    }
}

// Voucher Funktionen für Admins
export class AdminVouchers {

    // Alle Vouchers laden (nur für Admins) - verwendet API Route um RLS zu umgehen
    static async getAllVouchers() {
        try {
            const { isAdmin } = await AdminAuth.isAdmin()

            if (!isAdmin) {
                throw new Error('Keine Admin-Berechtigung')
            }

            // Verwende API Route statt direkter Supabase-Abfrage (umgeht RLS)
            const response = await fetch('/api/vouchers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch vouchers')
            }

            return { success: true, vouchers: result.vouchers || [] }
        } catch (error: unknown) {
            console.error('Failed to load vouchers:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Fehler beim Laden der Vouchers'
            }
        }
    }

    // Voucher-Status ändern
    static async updateVoucherStatus(voucherId: string, status: string) {
        try {
            const { isAdmin } = await AdminAuth.isAdmin()

            if (!isAdmin) {
                throw new Error('Keine Admin-Berechtigung')
            }

            // Verwende API Route statt direkter Supabase-Abfrage (umgeht RLS)
            const response = await fetch('/api/vouchers', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    voucherId,
                    status
                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()

            if (!result.success) {
                throw new Error(result.error || 'Failed to update voucher')
            }

            return { success: true, voucher: result.voucher }
        } catch (error: unknown) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Fehler beim Aktualisieren des Vouchers'
            }
        }
    }
} 