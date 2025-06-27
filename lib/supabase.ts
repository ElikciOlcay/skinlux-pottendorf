import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel environment variables.'
    )
}

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