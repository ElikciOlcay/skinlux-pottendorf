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
    // Address fields for vouchers and emails
    businessName: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
    phone?: string;
    email: string;
    website: string;
}

// Default bank details (fallback)
const DEFAULT_BANK_DETAILS: BankDetails = {
    bankName: 'Sparkasse Baden',
    accountHolder: 'Skinlux Pottendorf',
    iban: 'AT00 0000 0000 0000 0000',
    bic: 'SPALAT2G',
    reference: 'Gutschein-Bestellung',
    voucherValidityMonths: 12,
    sendVoucherAsPDF: false, // Standard: HTML-E-Mail
    // Default address values
    businessName: 'Skinlux Pottendorf',
    streetAddress: 'Dr. Heinz-Fischer-Straße 3/2',
    postalCode: '2486',
    city: 'Pottendorf',
    country: 'Österreich',
    phone: '+43 664 91 88 632',
    email: 'hey@skinlux.at',
    website: 'skinlux.at'
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
export async function GET(request: NextRequest) {
    try {
        const supabaseAdmin = createSupabaseAdmin();

        if (!supabaseAdmin) {
            console.warn('Supabase not configured, using default bank details');
            return NextResponse.json({
                success: true,
                bankDetails: DEFAULT_BANK_DETAILS
            });
        }

        // Studio-ID ermitteln basierend auf Host/Subdomain
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
            console.warn('Studio nicht gefunden für Subdomain:', subdomain, 'Error:', studioError?.message);
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
        const apiFormat: BankDetails = {
            bankName: bankDetailsData.bank_name,
            accountHolder: bankDetailsData.account_holder,
            iban: bankDetailsData.iban,
            bic: bankDetailsData.bic,
            reference: bankDetailsData.reference_template,
            voucherValidityMonths: bankDetailsData.voucher_validity_months,
            sendVoucherAsPDF: bankDetailsData.send_voucher_as_pdf,
            // Address fields
            businessName: bankDetailsData.business_name,
            streetAddress: bankDetailsData.street_address,
            postalCode: bankDetailsData.postal_code,
            city: bankDetailsData.city,
            country: bankDetailsData.country,
            phone: bankDetailsData.phone,
            email: bankDetailsData.email,
            website: bankDetailsData.website
        };

        console.log('Bank details retrieved from database for studio:', studio.id);
        return NextResponse.json({
            success: true,
            bankDetails: apiFormat
        });

    } catch (error) {
        console.error('Failed to get bank details:', error);
        return NextResponse.json({
            success: true,
            bankDetails: DEFAULT_BANK_DETAILS
        });
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

        // Studio-ID ermitteln basierend auf Host/Subdomain
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

        // Convert API format to database format
        const dbBankDetails = {
            studio_id: studio.id,
            bank_name: bankDetails.bankName,
            account_holder: bankDetails.accountHolder,
            iban: bankDetails.iban,
            bic: bankDetails.bic,
            reference_template: bankDetails.reference,
            voucher_validity_months: bankDetails.voucherValidityMonths,
            send_voucher_as_pdf: bankDetails.sendVoucherAsPDF,
            // Address fields
            business_name: bankDetails.businessName,
            street_address: bankDetails.streetAddress,
            postal_code: bankDetails.postalCode,
            city: bankDetails.city,
            country: bankDetails.country,
            phone: bankDetails.phone,
            email: bankDetails.email,
            website: bankDetails.website
        };

        // Try to update existing bank details first
        const { error: updateError } = await supabaseAdmin
            .from('bank_details')
            .update(dbBankDetails)
            .eq('studio_id', studio.id);

        if (updateError && updateError.code === 'PGRST116') {
            // No existing record, create new one
            const { error: insertError } = await supabaseAdmin
                .from('bank_details')
                .insert(dbBankDetails);

            if (insertError) {
                console.error('Database insert error:', insertError);
                return NextResponse.json(
                    { error: 'Fehler beim Speichern der Bankdaten' },
                    { status: 500 }
                );
            }
        } else if (updateError) {
            console.error('Database update error:', updateError);
            return NextResponse.json(
                { error: 'Fehler beim Aktualisieren der Bankdaten' },
                { status: 500 }
            );
        }

        console.log('Bank details saved successfully for studio:', studio.id);
        return NextResponse.json({
            success: true,
            message: 'Bankdaten erfolgreich gespeichert'
        });

    } catch (error) {
        console.error('Failed to save bank details:', error);
        return NextResponse.json(
            { error: 'Server-Fehler beim Speichern der Bankdaten' },
            { status: 500 }
        );
    }
} 