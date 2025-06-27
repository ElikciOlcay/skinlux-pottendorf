import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Server-side Supabase client mit Service Role Key
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

export async function GET(request: NextRequest) {
    try {
        console.log('Fetching vouchers for admin dashboard...');

        // Alle Vouchers laden - server-side, umgeht RLS
        const { data, error } = await supabase
            .from('vouchers')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json(
                { error: 'Fehler beim Laden der Vouchers', details: error.message },
                { status: 500 }
            );
        }

        console.log(`Successfully fetched ${data?.length || 0} vouchers`);

        return NextResponse.json({
            vouchers: data || [],
            success: true
        });

    } catch (error: any) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Server-Fehler beim Laden der Vouchers', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        console.log('🚀 API Route: Starting voucher creation...');

        const voucherData = await request.json();
        console.log('📝 API Route: Received voucher data:', voucherData);

        // Validierung
        if (!voucherData.amount || voucherData.amount < 25) {
            return NextResponse.json(
                { error: 'Ungültiger Betrag (mindestens €25)' },
                { status: 400 }
            );
        }

        if (!voucherData.sender_name || !voucherData.sender_email) {
            return NextResponse.json(
                { error: 'Name und E-Mail sind erforderlich' },
                { status: 400 }
            );
        }

        // Studio-ID basierend auf Subdomain ermitteln
        const host = request.headers.get('host') || '';
        let subdomain = host.split('.')[0];

        // Fallback: Verwende Subdomain vom Client, falls Host-Header nicht hilfreich ist
        if (!subdomain || subdomain === 'localhost' || subdomain.includes('3000')) {
            subdomain = voucherData.subdomain || '';
            console.log('🏢 Using client subdomain as fallback:', subdomain);
        }

        console.log('🏢 Detecting studio from host:', host, 'final subdomain:', subdomain);

        let studioId = null;

        if (subdomain && subdomain !== 'localhost') {
            // Studio-ID aus Datenbank holen
            const { data: studio, error: studioError } = await supabaseAdmin
                .from('studios')
                .select('id, name')
                .eq('subdomain', subdomain)
                .single();

            if (!studioError && studio) {
                studioId = studio.id;
                console.log('🏢 Found studio:', studio.name, 'ID:', studio.id, 'for subdomain:', subdomain);
            } else {
                console.log('⚠️ Studio nicht gefunden für Subdomain:', subdomain, 'Error:', studioError?.message);
            }
        }

        // Fallback: Erstes verfügbares Studio verwenden
        if (!studioId) {
            console.log('⚠️ Verwende Standard-Studio als Fallback');
            const { data: defaultStudio } = await supabaseAdmin
                .from('studios')
                .select('id, name')
                .limit(1)
                .single();

            if (defaultStudio) {
                studioId = defaultStudio.id;
                console.log('🏢 Using default studio:', defaultStudio.name, 'ID:', defaultStudio.id);
            }
        }

        voucherData.studio_id = studioId;

        // Entferne Subdomain aus voucherData (wird nicht in DB gespeichert)
        delete voucherData.subdomain;

        // Einfügung in die Datenbank mit Admin-Client (umgeht RLS)
        console.log('💾 API Route: Inserting into Supabase with admin client...');
        const { data: voucher, error } = await supabaseAdmin
            .from('vouchers')
            .insert(voucherData)
            .select()
            .single();

        if (error) {
            console.error('❌ API Route: Supabase error:', error);
            return NextResponse.json(
                { error: `Datenbankfehler: ${error.message}` },
                { status: 500 }
            );
        }

        console.log('✅ API Route: Voucher created successfully:', voucher);

        return NextResponse.json({ voucher }, { status: 201 });

    } catch (err: any) {
        console.error('💥 API Route: Error:', err);
        return NextResponse.json(
            { error: err.message || 'Ein Fehler ist aufgetreten' },
            { status: 500 }
        );
    }
} 