import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Voucher {
    id: string
    code: string
    amount: number
    sender_name: string
    sender_email: string
    payment_status: 'pending' | 'paid' | 'cancelled'
    payment_reference?: string
    is_used: boolean
    used_at?: string
    created_at: string
    expires_at: string
}

export interface Studio {
    id: string
    name: string
    address?: string
    subdomain?: string
    created_at: string
}

export function getCurrentSubdomain() {
    if (typeof window === 'undefined') return '';
    const host = window.location.host;
    const parts = host.split('.');
    if (parts.length > 2) {
        return parts[0];
    }
    return '';
} 