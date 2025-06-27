import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export interface BankDetails {
    bankName: string;
    accountHolder: string;
    iban: string;
    bic: string;
    reference: string;
    voucherValidityMonths: number;
    sendVoucherAsPDF: boolean; // Neue Option für PDF-Versand
}

// Default bank details (fallback)
const DEFAULT_BANK_DETAILS: BankDetails = {
    bankName: 'Sparkasse Pongau',
    accountHolder: 'Skinlux Bischofshofen',
    iban: 'AT00 0000 0000 0000 0000',
    bic: 'SPALAT2G',
    reference: 'Gutschein-Bestellung',
    voucherValidityMonths: 12,
    sendVoucherAsPDF: false // Standard: HTML-E-Mail
};

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

// GET - Retrieve bank details from database
export async function GET() {
    try {
        const supabaseAdmin = createSupabaseAdmin();

        if (!supabaseAdmin) {
            console.warn('Supabase not configured, using default bank details');
            return NextResponse.json({
                success: true,
                bankDetails: DEFAULT_BANK_DETAILS
            });
        }

        // Get first available studio (or you could get by subdomain later)
        const { data: studio } = await supabaseAdmin
            .from('studios')
            .select('id')
            .limit(1)
            .single();

        if (!studio) {
            console.warn('No studio found, using default bank details');
            return NextResponse.json({
                success: true,
                bankDetails: DEFAULT_BANK_DETAILS
            });
        }

        // Try to get bank details from database
        const { data: bankDetailsData, error } = await supabaseAdmin
            .from('bank_details')
            .select('*')
            .eq('studio_id', studio.id)
            .single();

        if (error || !bankDetailsData) {
            console.warn('No bank details found in database, using defaults:', error?.message);
            return NextResponse.json({
                success: true,
                bankDetails: DEFAULT_BANK_DETAILS
            });
        }

        // Convert database format to API format
        const bankDetails: BankDetails = {
            bankName: bankDetailsData.bank_name,
            accountHolder: bankDetailsData.account_holder,
            iban: bankDetailsData.iban,
            bic: bankDetailsData.bic,
            reference: bankDetailsData.reference_template,
            voucherValidityMonths: bankDetailsData.voucher_validity_months,
            sendVoucherAsPDF: bankDetailsData.send_voucher_as_pdf
        };

        return NextResponse.json({
            success: true,
            bankDetails: bankDetails
        });

    } catch (error) {
        console.error('Error getting bank details:', error);
        return NextResponse.json(
            { error: 'Fehler beim Laden der Bankdaten' },
            { status: 500 }
        );
    }
}

// POST - Save bank details to database
export async function POST(request: NextRequest) {
    try {
        const bankDetails: BankDetails = await request.json();

        // Validate the bank details
        if (!bankDetails.bankName || !bankDetails.accountHolder || !bankDetails.iban) {
            return NextResponse.json(
                { error: 'Unvollständige Bankdaten' },
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

        // Get first available studio (or you could get by subdomain later)
        const { data: studio } = await supabaseAdmin
            .from('studios')
            .select('id')
            .limit(1)
            .single();

        if (!studio) {
            return NextResponse.json(
                { error: 'Kein Studio gefunden' },
                { status: 500 }
            );
        }

        // Convert API format to database format
        const dbBankDetails = {
            studio_id: studio.id,
            bank_name: bankDetails.bankName,
            account_holder: bankDetails.accountHolder,
            iban: bankDetails.iban,
            bic: bankDetails.bic,
            reference_template: bankDetails.reference,
            voucher_validity_months: bankDetails.voucherValidityMonths,
            send_voucher_as_pdf: bankDetails.sendVoucherAsPDF
        };

        // Try to update existing bank details first
        const { error: updateError } = await supabaseAdmin
            .from('bank_details')
            .update(dbBankDetails)
            .eq('studio_id', studio.id);

        // If update fails (no existing record), insert new one
        if (updateError) {
            const { error: insertError } = await supabaseAdmin
                .from('bank_details')
                .insert(dbBankDetails);

            if (insertError) {
                console.error('Error inserting bank details:', insertError);
                return NextResponse.json(
                    { error: 'Fehler beim Speichern der Bankdaten' },
                    { status: 500 }
                );
            }
        }

        console.log('✅ Bank details saved to database:', bankDetails);

        return NextResponse.json({
            success: true,
            message: 'Bankdaten erfolgreich gespeichert'
        });

    } catch (error) {
        console.error('Error saving bank details:', error);
        return NextResponse.json(
            { error: 'Fehler beim Speichern der Bankdaten' },
            { status: 500 }
        );
    }
} 