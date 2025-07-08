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

        // Für Admin-erstellte Gutscheine ist E-Mail optional
        if (!voucherData.sender_name) {
            return NextResponse.json(
                { error: 'Name ist erforderlich' },
                { status: 400 }
            );
        }

        // Für öffentliche Gutscheine ist E-Mail erforderlich
        // Wenn kein admin_created Flag vorhanden ist, prüfen wir anhand der sender_email
        const isAdminCreated = voucherData.admin_created === true;
        if (!isAdminCreated && !voucherData.sender_email) {
            return NextResponse.json(
                { error: 'E-Mail ist erforderlich' },
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

        // Generiere einheitlichen Gutschein-Code falls nicht vorhanden
        if (!voucherData.code) {
            const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            voucherData.code = `SLX${randomNum}`;
            console.log('🔢 Generated voucher code:', voucherData.code);
        }

        // Hole Bankdaten für Gültigkeitsdauer mit robuster Methode
        try {
            console.log('🕒 Getting bank details for voucher validity period...');
            const bankDetails = await EmailService.getBankDetailsPublic();
            const validityMonths = bankDetails.voucherValidityMonths || 12;

            // Berechne Ablaufdatum basierend auf konfigurierten Monaten
            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + validityMonths);

            voucherData.expires_at = expiryDate.toISOString();
            voucherData.valid_until = expiryDate.toISOString();

            console.log(`🕒 Voucher expires in ${validityMonths} months:`, expiryDate.toLocaleDateString('de-DE'));
        } catch (error) {
            console.error('Error fetching bank details, using default validity:', error);
            // Fallback: 12 Monate
            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 12);
            voucherData.expires_at = expiryDate.toISOString();
            voucherData.valid_until = expiryDate.toISOString();
        }

        // Erstelle ein sauberes Voucher-Objekt mit nur den erforderlichen Feldern
        const cleanVoucherData = {
            code: voucherData.code,
            amount: voucherData.amount,
            sender_name: voucherData.sender_name,
            sender_email: voucherData.sender_email || null,
            sender_phone: voucherData.sender_phone || null,
            recipient_name: voucherData.recipient_name || null,
            recipient_address: voucherData.recipient_address || null,
            recipient_postal_code: voucherData.recipient_postal_code || null,
            recipient_city: voucherData.recipient_city || null,
            message: voucherData.message || null,
            studio_id: voucherData.studio_id,
            expires_at: voucherData.expires_at,
            valid_until: voucherData.valid_until,
            // Standard-Werte für Constraint-Felder setzen
            payment_status: isAdminCreated ? 'paid' : 'pending',  // Admin-Gutscheine sind sofort bezahlt
            delivery_method: voucherData.delivery_method || 'email',   // Constraint: ['email', 'post'] - 'print' ist nicht erlaubt
            status: isAdminCreated ? 'active' : 'pending',        // Admin-Gutscheine sind sofort aktiv
            admin_created: isAdminCreated,                        // Markiere Admin-erstellte Gutscheine
            is_used: false,
            remaining_amount: voucherData.amount  // Initial gleich dem Vollbetrag
        };

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
            .insert(cleanVoucherData)
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
        // Für Admin-erstellte Gutscheine keine E-Mails versenden (Vor-Ort-Verkauf)
        let customerEmailSuccess = false;
        let adminEmailSuccess = false;

        // Generate order number for response
        const orderNumber = `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

        if (!isAdminCreated) {
            console.log('📧 Starting email notifications for online voucher...');

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
                expiresAt: voucher.expires_at,
                deliveryMethod: voucher.delivery_method
            };

            // Send emails (both in parallel) - nur wenn E-Mail vorhanden
            const emailPromises = [];

            if (voucher.sender_email) {
                emailPromises.push(EmailService.sendCustomerConfirmation(emailData));
            }

            // Admin-E-Mail nur bei Online-Bestellungen senden
            emailPromises.push(EmailService.sendAdminNotification(emailData));

            const emailResults = await Promise.allSettled(emailPromises);

            // Log email results
            if (voucher.sender_email && emailResults.length > 1) {
                // Kunden-E-Mail wurde gesendet
                const customerResult = emailResults[0];
                if (customerResult.status === 'fulfilled') {
                    customerEmailSuccess = customerResult.value.success;
                    console.log('✅ Customer email:', customerResult.value.success ? 'sent' : 'failed', customerResult.value);
                } else {
                    console.error('❌ Customer email error:', customerResult.reason);
                }

                // Admin-E-Mail ist die zweite
                const adminResult = emailResults[1];
                if (adminResult.status === 'fulfilled') {
                    adminEmailSuccess = adminResult.value.success;
                    console.log('✅ Admin email:', adminResult.value.success ? 'sent' : 'failed', adminResult.value);
                } else {
                    console.error('❌ Admin email error:', adminResult.reason);
                }
            } else {
                // Nur Admin-E-Mail wurde gesendet
                console.log('ℹ️ No customer email sent (no email address provided)');
                const adminResult = emailResults[0];
                if (adminResult.status === 'fulfilled') {
                    adminEmailSuccess = adminResult.value.success;
                    console.log('✅ Admin email:', adminResult.value.success ? 'sent' : 'failed', adminResult.value);
                } else {
                    console.error('❌ Admin email error:', adminResult.reason);
                }
            }
        } else {
            console.log('ℹ️ Admin voucher - no emails sent (in-person sale)');
        }

        return NextResponse.json({
            success: true,
            voucher,
            orderNumber,
            emailStatus: {
                customer: customerEmailSuccess,
                admin: adminEmailSuccess
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
                    expiresAt: data.expires_at,
                    deliveryMethod: data.delivery_method
                };

                // Send payment confirmation email
                const paymentEmailResult = await EmailService.sendPaymentConfirmation(emailData);

                console.log('📧 Payment confirmation email result:', paymentEmailResult);

                // ========== GUTSCHEIN-VERSAND PER E-MAIL ==========
                let voucherEmailResult: { success: boolean; error: string | null } = { success: true, error: null };

                // Wenn der Gutschein per E-Mail versendet werden soll, dann sende jetzt den digitalen Gutschein
                if (data.delivery_method === 'email') {
                    // Hole Bankdaten-Einstellungen für PDF-Format mit robuster Methode
                    let sendAsPDF = false;
                    try {
                        console.log('📧 Getting bank details for PDF setting...');
                        // Verwende die robuste getBankDetails Methode aus EmailService
                        const bankDetails = await EmailService.getBankDetailsPublic();
                        sendAsPDF = bankDetails.sendVoucherAsPDF || false;
                        console.log(`📧 Voucher format setting loaded: ${sendAsPDF ? 'PDF' : 'HTML'}`);
                        console.log(`📧 Bank details loaded:`, bankDetails);
                    } catch (error) {
                        console.error('❌ Could not fetch PDF setting:', error);
                        sendAsPDF = false;
                    }

                    console.log(`📧 Sending digital voucher via email (Format: ${sendAsPDF ? 'PDF' : 'HTML'})...`);
                    console.log(`📧 EmailService.sendVoucherByEmail called with sendAsPDF: ${sendAsPDF}`);


                    const emailResult = await EmailService.sendVoucherByEmail(emailData, sendAsPDF);
                    voucherEmailResult = {
                        success: emailResult.success,
                        error: emailResult.success ? null : (emailResult.error || 'Unknown error')
                    };
                    console.log('📧 Voucher email result:', voucherEmailResult);

                    if (!emailResult.success) {
                        console.error('❌ Voucher email failed:', emailResult.error);
                    }
                }

                return NextResponse.json({
                    success: true,
                    voucher: data,
                    paymentEmailSent: paymentEmailResult.success,
                    paymentEmailError: paymentEmailResult.success ? null : paymentEmailResult.error,
                    voucherEmailSent: voucherEmailResult.success,
                    voucherEmailError: voucherEmailResult.success ? null : voucherEmailResult.error
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