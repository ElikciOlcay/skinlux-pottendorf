import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client mit Service Role Key
function createSupabaseAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        console.warn('Missing Supabase environment variables');
        return null;
    }

    return createClient(url, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}

// GET - Einzelnen Gutschein laden
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const voucherId = params.id;

        if (!voucherId) {
            return NextResponse.json(
                { error: 'Gutschein-ID fehlt' },
                { status: 400 }
            );
        }

        const supabaseAdmin = createSupabaseAdmin();
        if (!supabaseAdmin) {
            return NextResponse.json(
                { error: 'Datenbankverbindung nicht verfügbar' },
                { status: 500 }
            );
        }

        // Studio-ID ermitteln basierend auf Host/Subdomain für Sicherheit
        const host = request.headers.get('host') || '';
        let subdomain = host.split('.')[0];

        // Fallback für localhost/Development
        if (!subdomain || subdomain === 'localhost' || subdomain.includes('3000') || subdomain.includes('3001')) {
            subdomain = 'pottendorf';
        }

        // Studio-ID aus Datenbank holen
        const { data: studio, error: studioError } = await supabaseAdmin
            .from('studios')
            .select('id')
            .eq('subdomain', subdomain)
            .single();

        if (studioError || !studio) {
            console.error('Studio nicht gefunden für Subdomain:', subdomain, 'Error:', studioError?.message);
            return NextResponse.json(
                { error: `Studio nicht gefunden für Subdomain: ${subdomain}` },
                { status: 404 }
            );
        }

        // Gutschein mit Einlösungshistorie laden - MIT Studio-Isolierung
        const { data: voucher, error: voucherError } = await supabaseAdmin
            .from('vouchers')
            .select(`
                *,
                redemptions:voucher_redemptions(*)
            `)
            .eq('id', voucherId)
            .eq('studio_id', studio.id)  // 🔒 SICHERHEIT: Nur Vouchers des eigenen Studios
            .single();

        if (voucherError) {
            console.error('Database error:', voucherError);
            return NextResponse.json(
                { error: 'Gutschein nicht gefunden oder nicht zugänglich' },
                { status: 404 }
            );
        }

        // Verbleibendes Guthaben berechnen
        const totalRedeemed = voucher.redemptions?.reduce((sum: number, redemption: { amount: number }) => sum + redemption.amount, 0) || 0;
        const remainingAmount = voucher.amount - totalRedeemed;

        const voucherWithRemaining = {
            ...voucher,
            remaining_amount: remainingAmount,
            redemptions: voucher.redemptions || []
        };

        return NextResponse.json({
            success: true,
            voucher: voucherWithRemaining
        });

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Server-Fehler beim Laden des Gutscheins' },
            { status: 500 }
        );
    }
}

// PATCH - Gutschein bearbeiten oder einlösen
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const voucherId = params.id;
        const body = await request.json();
        const { action } = body;

        if (!voucherId) {
            return NextResponse.json(
                { error: 'Gutschein-ID fehlt' },
                { status: 400 }
            );
        }

        const supabaseAdmin = createSupabaseAdmin();
        if (!supabaseAdmin) {
            return NextResponse.json(
                { error: 'Datenbankverbindung nicht verfügbar' },
                { status: 500 }
            );
        }

        // Je nach Action verschiedene Operationen
        switch (action) {
            case 'update_details':
                return await updateVoucherDetails(supabaseAdmin, voucherId, body.data, request);

            case 'update_status':
                return await updateVoucherStatus(supabaseAdmin, voucherId, body.status, request);

            case 'redeem':
                return await redeemVoucher(supabaseAdmin, voucherId, body.amount, body.description, request);

            default:
                return NextResponse.json(
                    { error: 'Ungültige Aktion' },
                    { status: 400 }
                );
        }

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Server-Fehler beim Bearbeiten des Gutscheins' },
            { status: 500 }
        );
    }
}

// Helper functions für verschiedene Update-Operationen

// Gutschein-Details aktualisieren
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateVoucherDetails(supabaseAdmin: any, voucherId: string, updateData: any, request: NextRequest) {
    // Studio-ID ermitteln für Sicherheitsprüfung
    const host = request.headers.get('host') || '';
    let subdomain = host.split('.')[0];

    // Fallback für localhost/Development
    if (!subdomain || subdomain === 'localhost' || subdomain.includes('3000') || subdomain.includes('3001')) {
        subdomain = 'pottendorf';
    }

    // Studio-ID aus Datenbank holen
    const { data: studio, error: studioError } = await supabaseAdmin
        .from('studios')
        .select('id')
        .eq('subdomain', subdomain)
        .single();

    if (studioError || !studio) {
        console.error('Studio nicht gefunden für Subdomain:', subdomain, 'Error:', studioError?.message);
        return NextResponse.json(
            { error: `Studio nicht gefunden für Subdomain: ${subdomain}` },
            { status: 404 }
        );
    }

    const { data, error } = await supabaseAdmin
        .from('vouchers')
        .update(updateData)
        .eq('id', voucherId)
        .eq('studio_id', studio.id)  // 🔒 SICHERHEIT: Nur eigene Studio-Vouchers
        .select()
        .single();

    if (error) {
        console.error('Update error:', error);
        return NextResponse.json(
            { error: 'Fehler beim Aktualisieren des Gutscheins' },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        message: 'Gutschein erfolgreich aktualisiert',
        voucher: data
    });
}

// Gutschein-Status aktualisieren
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function updateVoucherStatus(supabaseAdmin: any, voucherId: string, status: string, request: NextRequest) {
    // Studio-ID ermitteln für Sicherheitsprüfung
    const host = request.headers.get('host') || '';
    let subdomain = host.split('.')[0];

    // Fallback für localhost/Development
    if (!subdomain || subdomain === 'localhost' || subdomain.includes('3000') || subdomain.includes('3001')) {
        subdomain = 'pottendorf';
    }

    // Studio-ID aus Datenbank holen
    const { data: studio, error: studioError } = await supabaseAdmin
        .from('studios')
        .select('id')
        .eq('subdomain', subdomain)
        .single();

    if (studioError || !studio) {
        console.error('Studio nicht gefunden für Subdomain:', subdomain, 'Error:', studioError?.message);
        return NextResponse.json(
            { error: `Studio nicht gefunden für Subdomain: ${subdomain}` },
            { status: 404 }
        );
    }

    const { data, error } = await supabaseAdmin
        .from('vouchers')
        .update({ status })
        .eq('id', voucherId)
        .eq('studio_id', studio.id)  // 🔒 SICHERHEIT: Nur eigene Studio-Vouchers
        .select()
        .single();

    if (error) {
        console.error('Status update error:', error);
        return NextResponse.json(
            { error: 'Fehler beim Aktualisieren des Status' },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        message: 'Status erfolgreich aktualisiert',
        voucher: data
    });
}

// Gutschein einlösen
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function redeemVoucher(supabaseAdmin: any, voucherId: string, amount: number, description: string, request: NextRequest) {
    // Studio-ID ermitteln für Sicherheitsprüfung
    const host = request.headers.get('host') || '';
    let subdomain = host.split('.')[0];

    // Fallback für localhost/Development
    if (!subdomain || subdomain === 'localhost' || subdomain.includes('3000') || subdomain.includes('3001')) {
        subdomain = 'pottendorf';
    }

    // Studio-ID aus Datenbank holen
    const { data: studio, error: studioError } = await supabaseAdmin
        .from('studios')
        .select('id')
        .eq('subdomain', subdomain)
        .single();

    if (studioError || !studio) {
        console.error('Studio nicht gefunden für Subdomain:', subdomain, 'Error:', studioError?.message);
        return NextResponse.json(
            { error: `Studio nicht gefunden für Subdomain: ${subdomain}` },
            { status: 404 }
        );
    }

    // Zuerst aktuellen Gutschein laden - MIT Studio-Isolierung
    const { data: voucher, error: voucherError } = await supabaseAdmin
        .from('vouchers')
        .select(`
            *,
            redemptions:voucher_redemptions(amount)
        `)
        .eq('id', voucherId)
        .eq('studio_id', studio.id)  // 🔒 SICHERHEIT: Nur Vouchers des eigenen Studios
        .single();

    if (voucherError) {
        return NextResponse.json(
            { error: 'Gutschein nicht gefunden oder nicht zugänglich' },
            { status: 404 }
        );
    }

    // Verbleibendes Guthaben berechnen
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalRedeemed = voucher.redemptions?.reduce((sum: number, redemption: any) => sum + redemption.amount, 0) || 0;
    const remainingAmount = voucher.amount - totalRedeemed;

    if (amount > remainingAmount) {
        return NextResponse.json(
            { error: 'Betrag überschreitet das verfügbare Guthaben' },
            { status: 400 }
        );
    }

    if (amount <= 0) {
        return NextResponse.json(
            { error: 'Betrag muss größer als 0 sein' },
            { status: 400 }
        );
    }

    // Neue Einlösung erstellen
    const { error: redemptionError } = await supabaseAdmin
        .from('voucher_redemptions')
        .insert({
            voucher_id: voucherId,
            amount: amount,
            description: description,
            redeemed_at: new Date().toISOString(),
            remaining_after: remainingAmount - amount
        });

    if (redemptionError) {
        console.error('Redemption error:', redemptionError);
        return NextResponse.json(
            { error: 'Fehler bei der Einlösung' },
            { status: 500 }
        );
    }

    // Gutschein-Status aktualisieren falls komplett eingelöst - MIT Studio-Isolierung
    const newRemainingAmount = remainingAmount - amount;
    if (newRemainingAmount <= 0) {
        await supabaseAdmin
            .from('vouchers')
            .update({
                status: 'redeemed',
                is_used: true
            })
            .eq('id', voucherId)
            .eq('studio_id', studio.id);  // 🔒 SICHERHEIT: Nur eigene Studio-Vouchers
    }

    return NextResponse.json({
        success: true,
        message: 'Gutschein erfolgreich eingelöst',
        remaining_amount: newRemainingAmount
    });
} 