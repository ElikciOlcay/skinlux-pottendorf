import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { EmailService, VoucherEmailData } from '@/lib/email';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    try {
        console.log('Fetching vouchers for admin dashboard...');

        // Verwende Admin-Client um RLS zu umgehen
        const supabaseAdmin = createSupabaseAdmin();
        if (!supabaseAdmin) {
            return NextResponse.json(
                { error: 'Datenbankverbindung nicht verfügbar' },
                { status: 500 }
            );
        }

        // Alle Vouchers laden - server-side, umgeht RLS
        const { data, error } = await supabaseAdmin
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

    } catch (error: unknown) {
        console.error('Server error:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: 'Server-Fehler beim Laden der Vouchers', details: error instanceof Error ? error.message : 'Unbekannter Fehler' },
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
            const supabaseAdmin = createSupabaseAdmin();
            if (!supabaseAdmin) {
                return NextResponse.json(
                    { error: 'Datenbankverbindung nicht verfügbar' },
                    { status: 500 }
                );
            }

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
            const supabaseAdmin = createSupabaseAdmin();
            if (!supabaseAdmin) {
                return NextResponse.json(
                    { error: 'Datenbankverbindung nicht verfügbar' },
                    { status: 500 }
                );
            }

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
        const supabaseAdmin = createSupabaseAdmin();
        if (!supabaseAdmin) {
            return NextResponse.json(
                { error: 'Datenbankverbindung nicht verfügbar' },
                { status: 500 }
            );
        }

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

        // ========== E-MAIL-VERSENDUNG ==========
        console.log('📧 Starting email notifications...');

        // Generate order number for emails
        const orderNumber = `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

        // Prepare email data
        const emailData: VoucherEmailData = {
            voucherCode: voucher.code,
            amount: voucher.amount,
            senderName: voucher.sender_name,
            senderEmail: voucher.sender_email,
            senderPhone: voucher.sender_phone,
            recipientName: voucher.recipient_name,
            message: voucher.message,
            orderNumber: orderNumber,
            expiresAt: voucher.expires_at
        };

        // Send emails (both in parallel)
        const [customerResult, adminResult] = await Promise.allSettled([
            EmailService.sendCustomerConfirmation(emailData),
            EmailService.sendAdminNotification(emailData)
        ]);

        // Log email results
        if (customerResult.status === 'fulfilled') {
            console.log('✅ Customer email:', customerResult.value.success ? 'sent' : 'failed', customerResult.value);
        } else {
            console.error('❌ Customer email error:', customerResult.reason);
        }

        if (adminResult.status === 'fulfilled') {
            console.log('✅ Admin email:', adminResult.value.success ? 'sent' : 'failed', adminResult.value);
        } else {
            console.error('❌ Admin email error:', adminResult.reason);
        }

        return NextResponse.json({
            voucher,
            orderNumber,
            emailStatus: {
                customer: customerResult.status === 'fulfilled' ? customerResult.value.success : false,
                admin: adminResult.status === 'fulfilled' ? adminResult.value.success : false
            }
        }, { status: 201 });

    } catch (err: unknown) {
        console.error('💥 API Route: Error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten' },
            { status: 500 }
        );
    }
}

// PATCH endpoint for updating voucher status
export async function PATCH(request: NextRequest) {
    try {
        console.log('🔄 API Route: Updating voucher status...');

        // Debug: Log environment variables
        console.log('🔍 Environment check:', {
            hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
        });

        const body = await request.json();
        console.log('📝 Request body:', body);

        const { voucherId, status } = body;

        if (!voucherId || !status) {
            console.log('❌ Missing required fields:', { voucherId, status });
            return NextResponse.json(
                { error: 'voucherId und status sind erforderlich' },
                { status: 400 }
            );
        }

        // Verwende Admin-Client um RLS zu umgehen
        const supabaseAdmin = createSupabaseAdmin();
        if (!supabaseAdmin) {
            console.log('❌ Supabase admin client creation failed');
            return NextResponse.json(
                { error: 'Datenbankverbindung nicht verfügbar' },
                { status: 500 }
            );
        }

        console.log('✅ Supabase admin client created, attempting update...');

        const { data, error } = await supabaseAdmin
            .from('vouchers')
            .update({
                payment_status: status === 'paid' ? 'paid' : status
            })
            .eq('id', voucherId)
            .select()
            .single();

        if (error) {
            console.error('❌ Database error:', error);
            return NextResponse.json(
                { error: `Datenbankfehler: ${error.message}` },
                { status: 500 }
            );
        }

        console.log('✅ Voucher updated successfully:', data);

        // ========== E-MAIL BEI ZAHLUNGSBESTÄTIGUNG ==========
        if (status === 'paid') {
            console.log('📧 Sending payment confirmation email...');

            try {
                // Generate order number for email
                const orderNumber = `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

                // Prepare email data
                const emailData: VoucherEmailData = {
                    voucherCode: data.code,
                    amount: data.amount,
                    senderName: data.sender_name,
                    senderEmail: data.sender_email,
                    senderPhone: data.sender_phone,
                    recipientName: data.recipient_name,
                    message: data.message,
                    orderNumber: orderNumber,
                    expiresAt: data.expires_at
                };

                // Send payment confirmation email
                const paymentEmailResult = await EmailService.sendPaymentConfirmation(emailData);

                console.log('📧 Payment confirmation email result:', paymentEmailResult);

                return NextResponse.json({
                    success: true,
                    voucher: data,
                    emailSent: paymentEmailResult.success,
                    emailError: paymentEmailResult.success ? null : paymentEmailResult.error
                });

            } catch (emailError) {
                console.error('❌ Email error during payment confirmation:', emailError);

                // Return success for voucher update but note email failure
                return NextResponse.json({
                    success: true,
                    voucher: data,
                    emailSent: false,
                    emailError: emailError instanceof Error ? emailError.message : 'Unknown email error'
                });
            }
        }

        return NextResponse.json({
            success: true,
            voucher: data
        });

    } catch (err: unknown) {
        console.error('💥 Unexpected error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten' },
            { status: 500 }
        );
    }
} 