import { Resend } from 'resend';

// Lazy initialize Resend to avoid build-time errors
function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error('RESEND_API_KEY environment variable is required');
    }
    return new Resend(apiKey);
}

export interface VoucherEmailData {
    voucherCode: string;
    amount: number;
    senderName: string;
    senderEmail: string;
    senderPhone?: string;
    recipientName?: string;
    message?: string;
    orderNumber: string;
    expiresAt: string;
    deliveryMethod?: string; // 'email' or 'post'
}

export interface BankDetails {
    bankName: string;
    accountHolder: string;
    iban: string;
    bic: string;
    reference: string;
    voucherValidityMonths: number;
    sendVoucherAsPDF: boolean;
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

export class EmailService {

    // Send confirmation email to customer
    static async sendCustomerConfirmation(data: VoucherEmailData) {
        try {
            if (!process.env.RESEND_API_KEY) {
                console.warn('RESEND_API_KEY not configured, skipping customer email');
                return { success: false, error: 'Email service not configured' };
            }

            // Load bank details (in production, you might want to get this from database)
            const bankDetails = await this.getBankDetails();
            const emailContent = this.generateCustomerConfirmationHTML(data, bankDetails);

            // Use verified email for development, production domain for production
            const fromEmail = process.env.NODE_ENV === 'production'
                ? 'Skinlux Pottendorf <noreply@skinlux.at>'
                : 'Skinlux <onboarding@resend.dev>'; // Resend verified domain for development

            const resend = getResendClient();
            const result = await resend.emails.send({
                from: fromEmail,
                to: [data.senderEmail],
                subject: `Gutschein-Bestellung bestätigt - ${data.voucherCode}`,
                html: emailContent,
            });

            // Check for Resend errors
            if (result.error) {
                console.error('❌ Resend error for customer email:', result.error);
                return {
                    success: false,
                    error: `Resend error: ${result.error.message || result.error}`
                };
            }

            console.log('✅ Customer confirmation email sent:', result);
            return { success: true, messageId: result.data?.id };

        } catch (error) {
            console.error('❌ Failed to send customer confirmation:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Send payment confirmation email to customer
    static async sendPaymentConfirmation(data: VoucherEmailData) {
        try {
            if (!process.env.RESEND_API_KEY) {
                console.warn('RESEND_API_KEY not configured, skipping payment confirmation email');
                return { success: false, error: 'Email service not configured' };
            }

            // Load bank details to get studio-specific contact information
            const bankDetails = await this.getBankDetails();
            const emailContent = this.generatePaymentConfirmationHTML(data, bankDetails);

            // Use verified email for development, production domain for production
            const fromEmail = process.env.NODE_ENV === 'production'
                ? `Skinlux <${bankDetails.email}>`
                : 'Skinlux <onboarding@resend.dev>'; // Resend verified domain for development

            const resend = getResendClient();
            const result = await resend.emails.send({
                from: fromEmail,
                to: [data.senderEmail],
                subject: `Gutschein aktiviert - ${data.voucherCode} ist jetzt gültig!`,
                html: emailContent,
            });

            // Check for Resend errors
            if (result.error) {
                console.error('❌ Resend error for payment confirmation email:', result.error);
                return {
                    success: false,
                    error: `Resend error: ${result.error.message || result.error}`
                };
            }

            console.log('✅ Payment confirmation email sent:', result);
            return { success: true, messageId: result.data?.id };

        } catch (error) {
            console.error('❌ Failed to send payment confirmation:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Send voucher by email with PDF option
    static async sendVoucherByEmail(data: VoucherEmailData, sendAsPDF: boolean = false) {
        try {
            if (!process.env.RESEND_API_KEY) {
                console.warn('RESEND_API_KEY not configured, skipping voucher email');
                return { success: false, error: 'Email service not configured' };
            }

            // Load bank details for studio-specific contact information
            const bankDetails = await this.getBankDetailsPublic();

            // Determine recipient
            const recipient = data.recipientName && data.recipientName !== data.senderName
                ? data.recipientName
                : data.senderName;

            // Use verified email for development, production domain for production
            const toEmail = process.env.NODE_ENV === 'development'
                ? 'elikciolcay87@gmail.com'  // Development: nur verifizierte E-Mail
                : data.senderEmail;         // Production: echte E-Mail

            const fromEmail = process.env.NODE_ENV === 'production'
                ? `Skinlux <${bankDetails.email}>`
                : 'Skinlux <onboarding@resend.dev>';

            console.log(`📧 Sending voucher ${sendAsPDF ? 'PDF' : 'HTML'} email to: ${toEmail} (Recipient: ${recipient})`);
            console.log(`📧 sendAsPDF parameter received: ${sendAsPDF} (type: ${typeof sendAsPDF})`);

            const resend = getResendClient();

            let result;

            if (sendAsPDF) {
                console.log('📄 Starting PDF generation process...');
                try {
                    // Generate PDF and send as attachment
                    console.log('🖨️ Loading PDF generator...');
                    const { PDFGenerator } = await import('./pdf-generator');
                    console.log('🖨️ PDF generator loaded, starting generation...');

                    const pdfUint8Array = await PDFGenerator.generateVoucherPDF(data);
                    console.log(`🖨️ PDF generated, size: ${pdfUint8Array.length} bytes`);

                    const pdfBuffer = Buffer.from(pdfUint8Array);
                    console.log(`🖨️ Buffer created, size: ${pdfBuffer.length} bytes`);

                    console.log('📧 Sending email with PDF attachment...');
                    result = await resend.emails.send({
                        from: fromEmail,
                        to: [toEmail],
                        subject: `🎁 Ihr Skinlux PDF-Gutschein ist da! Code: ${data.voucherCode}`,
                        html: this.generatePDFEmailHTML(data, bankDetails),
                        attachments: [
                            {
                                filename: `Skinlux-Gutschein-${data.voucherCode}.pdf`,
                                content: pdfBuffer
                            }
                        ]
                    });

                    console.log('✅ PDF email sent successfully');
                } catch (pdfError) {
                    console.error('❌ PDF generation failed:', pdfError);
                    throw new Error(`PDF generation failed: ${pdfError instanceof Error ? pdfError.message : 'Unknown PDF error'}`);
                }
            } else {
                console.log('📧 Sending HTML email...');
                // Send HTML email
                result = await resend.emails.send({
                    from: fromEmail,
                    to: [toEmail],
                    subject: `🎁 Ihr Skinlux Gutschein ist da! Code: ${data.voucherCode}`,
                    html: this.generateVoucherEmailHTML(data, bankDetails)
                });
                console.log('✅ HTML email sent successfully');
            }

            // Check for Resend errors
            if (result.error) {
                console.error('❌ Resend error for voucher email:', result.error);
                return {
                    success: false,
                    error: `Resend error: ${result.error.message || result.error}`
                };
            }

            console.log('✅ Voucher email sent successfully:', result);
            return { success: true, messageId: result.data?.id };

        } catch (error) {
            console.error('❌ Error sending voucher email:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Send notification email to admin
    static async sendAdminNotification(data: VoucherEmailData) {
        try {
            if (!process.env.RESEND_API_KEY) {
                console.warn('RESEND_API_KEY not configured, skipping admin email');
                return { success: false, error: 'Email service not configured' };
            }

            // Use verified email for development testing
            const adminEmail = process.env.NODE_ENV === 'production'
                ? (process.env.ADMIN_EMAIL || 'hello@skinlux.at')
                : 'elikciolcay87@gmail.com'; // Your verified Resend email for development
            const emailContent = this.generateAdminNotificationHTML(data);

            // Use verified email for development, production domain for production
            const fromEmail = process.env.NODE_ENV === 'production'
                ? 'Skinlux System <noreply@skinlux.at>'
                : 'Skinlux System <onboarding@resend.dev>'; // Resend verified domain for development

            const resend = getResendClient();
            const result = await resend.emails.send({
                from: fromEmail,
                to: [adminEmail],
                subject: `Neue Gutschein-Bestellung - €${data.amount}`,
                html: emailContent,
            });

            // Check for Resend errors
            if (result.error) {
                console.error('❌ Resend error for admin notification:', result.error);
                return {
                    success: false,
                    error: `Resend error: ${result.error.message || result.error}`
                };
            }

            console.log('✅ Admin notification email sent:', result);
            return { success: true, messageId: result.data?.id };

        } catch (error) {
            console.error('❌ Failed to send admin notification:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    // Public method to get bank details (used by other modules)
    public static async getBankDetailsPublic(): Promise<BankDetails> {
        return this.getBankDetails();
    }

    // Get bank details from API with retry logic
    private static async getBankDetails(): Promise<BankDetails> {
        // Try API first with retry logic
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                let siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

                // Stelle sicher, dass die URL ein Protokoll hat
                if (siteUrl && !siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
                    siteUrl = `https://${siteUrl}`;
                }

                console.log(`🏦 Fetching bank details (attempt ${attempt}/3) from: ${siteUrl}/api/bank-details`);

                const response = await fetch(`${siteUrl}/api/bank-details`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Skinlux-EmailService/1.0'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('✅ Bank details loaded from API:', result.bankDetails);
                    return result.bankDetails;
                } else {
                    console.warn(`⚠️ Bank details API failed (attempt ${attempt}): ${response.status} ${response.statusText}`);
                    if (attempt < 3) {
                        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Progressive delay
                    }
                }
            } catch (error) {
                console.warn(`⚠️ Bank details API error (attempt ${attempt}):`, error);
                if (attempt < 3) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Progressive delay
                }
            }
        }

        // Fallback to database if API fails
        console.log('🔄 API failed, trying direct database access...');
        try {
            const { createClient } = await import('@supabase/supabase-js');

            const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

            if (!url || !key) {
                console.warn('Supabase not configured, using default bank details');
                return this.getDefaultBankDetails();
            }

            const supabaseAdmin = createClient(url, key, {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            });

            // Get first available studio
            const { data: studio } = await supabaseAdmin
                .from('studios')
                .select('id')
                .limit(1)
                .single();

            if (!studio) {
                console.warn('No studio found, using default bank details');
                return this.getDefaultBankDetails();
            }

            // Get bank details from database
            const { data: bankDetailsData, error } = await supabaseAdmin
                .from('bank_details')
                .select('*')
                .eq('studio_id', studio.id)
                .single();

            if (error || !bankDetailsData) {
                console.warn('No bank details found in database, using defaults:', error?.message);
                return this.getDefaultBankDetails();
            }

            // Convert database format to API format
            const bankDetails = {
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

            console.log('✅ Bank details loaded from database:', bankDetails);
            return bankDetails;

        } catch (error) {
            console.warn('Error fetching bank details from database, using defaults:', error);
            return this.getDefaultBankDetails();
        }
    }

    // Default bank details (fallback)
    private static getDefaultBankDetails(): BankDetails {
        return {
            bankName: 'Sparkasse Pottendorf',
            accountHolder: 'Skinlux Pottendorf',
            iban: 'AT00 0000 0000 0000 0000',
            bic: 'SPALAT2G',
            reference: 'Gutschein-Bestellung',
            voucherValidityMonths: 12,
            sendVoucherAsPDF: false,
            // Default address values
            businessName: 'Skinlux Pottendorf',
            streetAddress: 'Dr. Heinz-Fischer-Straße 3/2',
            postalCode: '2486',
            city: 'Pottendorf',
            country: 'Österreich',
            phone: '0664 91 88 632',
            email: 'hey@skinlux.at',
            website: 'skinlux.at'
        };
    }

    // Generate customer confirmation email HTML
    private static generateCustomerConfirmationHTML(data: VoucherEmailData, bankDetails: BankDetails): string {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Gutschein-Bestellung bestätigt</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; }
                .header { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 40px 30px; text-align: center; }
                .logo { font-size: 32px; font-weight: 300; margin-bottom: 10px; }
                .content { padding: 40px 30px; }
                .details { background-color: #f9fafb; border-radius: 12px; padding: 25px; margin: 25px 0; }
                .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
                .detail-label { font-weight: 600; color: #6b7280; }
                .detail-value { color: #1f2937; }
                .important { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
                .footer { background-color: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
                .button { display: inline-block; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">SKINLUX</div>
                    <p>Ihre Gutschein-Bestellung wurde erfolgreich eingegangen!</p>
                </div>
                
                <div class="content">
                    <h1>Vielen Dank für Ihre Bestellung!</h1>
                    <p>Liebe/r ${data.senderName},</p>
                    <p>Ihre Gutschein-Bestellung wurde erfolgreich bei uns eingegangen und wird bearbeitet.</p>
                    
                    <div class="details">
                        <h3>Bestelldetails</h3>
                        <div class="detail-row">
                            <span class="detail-label">Bestellnummer:</span>
                            <span class="detail-value">${data.orderNumber}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Käufer:</span>
                            <span class="detail-value">${data.senderName}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">E-Mail:</span>
                            <span class="detail-value">${data.senderEmail}</span>
                        </div>
                        ${data.senderPhone ? `
                        <div class="detail-row">
                            <span class="detail-label">Telefon:</span>
                            <span class="detail-value">${data.senderPhone}</span>
                        </div>
                        ` : ''}
                        ${data.recipientName ? `
                        <div class="detail-row">
                            <span class="detail-label">Empfänger:</span>
                            <span class="detail-value">${data.recipientName}</span>
                        </div>
                        ` : ''}
                        ${data.message ? `
                        <div class="detail-row">
                            <span class="detail-label">Nachricht:</span>
                            <span class="detail-value">${data.message}</span>
                        </div>
                        ` : ''}
                        <div class="detail-row">
                            <span class="detail-label">Betrag:</span>
                            <span class="detail-value">€${data.amount}</span>
                        </div>
                    </div>
                    
                    <div class="important">
                        <h4>💳 Zahlungsinformationen</h4>
                        <p><strong>Status:</strong> Zahlung ausstehend</p>
                        <p><strong>Bitte überweisen Sie den Betrag von €${data.amount} auf folgendes Konto:</strong></p>
                        
                        <div style="background-color: white; border-radius: 8px; padding: 20px; margin: 15px 0; border: 1px solid #e5e7eb;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #6b7280; width: 40%;">Bank:</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937;">${bankDetails.bankName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #6b7280;">Kontoinhaber:</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937;">${bankDetails.accountHolder}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #6b7280;">IBAN:</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-family: monospace; font-weight: 600;">${bankDetails.iban}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #6b7280;">BIC:</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-family: monospace; font-weight: 600;">${bankDetails.bic}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: 600; color: #6b7280;">Verwendungszweck:</td>
                                    <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${bankDetails.reference} ${data.orderNumber}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="background-color: #dcfce7; border-radius: 8px; padding: 15px; margin: 15px 0;">
                            <p style="margin: 0; color: #166534; font-weight: 600;">
                                ⚡ <strong>Wichtig:</strong> Bitte verwenden Sie unbedingt den angegebenen Verwendungszweck, damit wir Ihre Zahlung zuordnen können!
                            </p>
                        </div>
                        
                        <p><strong>${data.deliveryMethod === 'post'
                ? 'Nach Zahlungseingang wird Ihr Gutschein gedruckt und per Post an die angegebene Adresse versendet.'
                : 'Nach Zahlungseingang wird Ihr Gutschein automatisch aktiviert und Sie erhalten eine Bestätigungs-E-Mail mit dem Gutschein-Code.'}</strong></p>
                    </div>
                    
                    <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung!</p>
                    
                    <a href="https://connect.shore.com/bookings/skinlux" class="button">Termin buchen</a>
                </div>
                
                <div class="footer">
                    <p><strong>Skinlux Pottendorf</strong><br>
                    Dr. Heinz-Fischer-Straße 3/2, 2486 Pottendorf<br>
                    Tel: 0664 91 88 632<br>
                    E-Mail: hey@skinlux.at</p>
                    
                    <p style="margin-top: 20px; font-size: 12px;">
                    Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese Nachricht.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    // Generate admin notification email HTML
    private static generateAdminNotificationHTML(data: VoucherEmailData): string {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Neue Gutschein-Bestellung</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; }
                .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; }
                .alert-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
                .voucher-details { background-color: #f9fafb; border-radius: 12px; padding: 25px; margin: 25px 0; }
                .amount { font-size: 32px; font-weight: bold; color: #059669; text-align: center; margin: 15px 0; }
                .voucher-code { font-size: 24px; font-weight: bold; color: #1f2937; letter-spacing: 1px; text-align: center; margin: 15px 0; }
                .detail-row { display: flex; justify-content: space-between; margin: 8px 0; padding: 5px 0; border-bottom: 1px solid #e5e7eb; }
                .detail-label { font-weight: 600; color: #6b7280; }
                .detail-value { color: #1f2937; }
                .button { display: inline-block; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 15px 0; }
                .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🛍️ Neue Gutschein-Bestellung</h1>
                    <p>Eine neue Bestellung ist eingegangen</p>
                </div>
                
                <div class="content">
                    <div class="alert-box">
                        <h3>⚡ Aktion erforderlich</h3>
                        <p>Eine neue Gutschein-Bestellung wurde aufgegeben und wartet auf Ihre Bearbeitung.</p>
                    </div>
                    
                    <div class="voucher-details">
                        <h3>Bestellinformationen</h3>
                        
                        <div class="amount">€${data.amount}</div>
                        <div class="voucher-code">${data.voucherCode}</div>
                        
                        <div class="detail-row">
                            <span class="detail-label">Bestellnummer:</span>
                            <span class="detail-value">${data.orderNumber}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Käufer:</span>
                            <span class="detail-value">${data.senderName}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">E-Mail:</span>
                            <span class="detail-value">${data.senderEmail}</span>
                        </div>
                        ${data.senderPhone ? `
                        <div class="detail-row">
                            <span class="detail-label">Telefon:</span>
                            <span class="detail-value">${data.senderPhone}</span>
                        </div>
                        ` : ''}
                        ${data.recipientName ? `
                        <div class="detail-row">
                            <span class="detail-label">Empfänger:</span>
                            <span class="detail-value">${data.recipientName}</span>
                        </div>
                        ` : ''}
                        <div class="detail-row">
                            <span class="detail-label">Status:</span>
                            <span class="detail-value">⏳ Zahlung ausstehend</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Gültig bis:</span>
                            <span class="detail-value">${new Date(data.expiresAt).toLocaleDateString('de-DE')}</span>
                        </div>
                        
                        ${data.message ? `
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                            <div class="detail-label">Nachricht vom Käufer:</div>
                            <div style="background-color: white; padding: 15px; border-radius: 8px; margin-top: 10px; font-style: italic;">
                                "${data.message}"
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://skinlux.at'}/admin/dashboard" class="button">
                            Admin-Dashboard öffnen
                        </a>
                    </div>
                    
                    <p><strong>Nächste Schritte:</strong></p>
                    <ol>
                        <li>Zahlungseingang prüfen</li>
                        <li>Gutschein im Admin-Dashboard als "bezahlt" markieren</li>
                        <li>Kunde erhält automatische Aktivierungsbestätigung</li>
                    </ol>
                </div>
                
                <div class="footer">
                    <p>Skinlux Admin-System<br>
                    Automatische Benachrichtigung</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    // Generate payment confirmation email HTML
    private static generatePaymentConfirmationHTML(data: VoucherEmailData, bankDetails: BankDetails): string {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Gutschein aktiviert</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; }
                .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 40px 30px; text-align: center; }
                .logo { font-size: 32px; font-weight: 300; margin-bottom: 10px; }
                .success-icon { font-size: 48px; margin: 20px 0; }
                .content { padding: 40px 30px; }
                .voucher-box { background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-radius: 16px; padding: 30px; margin: 30px 0; text-align: center; border: 2px solid #059669; }
                .voucher-code { font-size: 32px; font-weight: bold; color: #047857; letter-spacing: 2px; margin: 15px 0; }
                .amount { font-size: 40px; font-weight: bold; color: #047857; margin: 10px 0; }
                .status-badge { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 12px 24px; border-radius: 25px; font-weight: bold; display: inline-block; margin: 15px 0; }
                .details { background-color: #f9fafb; border-radius: 12px; padding: 25px; margin: 25px 0; }
                .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
                .detail-label { font-weight: 600; color: #6b7280; }
                .detail-value { color: #1f2937; }
                .highlight-box { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left: 4px solid #3b82f6; padding: 25px; margin: 25px 0; border-radius: 0 12px 12px 0; }
                .footer { background-color: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
                .button { display: inline-block; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 12px; font-weight: 600; margin: 20px 0; font-size: 16px; }
                .button:hover { transform: translateY(-2px); transition: all 0.3s ease; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">SKINLUX</div>
                    <div class="success-icon">🎉</div>
                    <h1>Zahlung erhalten!</h1>
                    <p>Ihr Gutschein ist jetzt aktiviert und einsatzbereit!</p>
                </div>
                
                <div class="content">
                    <div class="status-badge">✅ AKTIVIERT</div>
                    
                    <h2>Liebe/r ${data.senderName},</h2>
                    <p>Großartige Neuigkeiten! Wir haben Ihre Zahlung erhalten und Ihr Gutschein wurde erfolgreich aktiviert.</p>
                    
                    <div class="voucher-box">
                        <h2>Ihr aktivierter Gutschein</h2>
                        <div class="voucher-code">${data.voucherCode}</div>
                        <div class="amount">€${data.amount}</div>
                        <p><strong>Status:</strong> ✅ Aktiviert & einsatzbereit</p>
                        <p><strong>Gültig bis:</strong> ${new Date(data.expiresAt).toLocaleDateString('de-DE')}</p>
                    </div>
                    
                    <div class="highlight-box">
                        <h3>🎯 So verwenden Sie Ihren Gutschein:</h3>
                        <ol style="margin: 15px 0; padding-left: 20px;">
                            <li><strong>Termin buchen:</strong> Klicken Sie unten auf "Jetzt Termin buchen"</li>
                            <li><strong>Behandlung wählen:</strong> Wählen Sie Ihre gewünschte Behandlung</li>
                            <li><strong>Gutschein einlösen:</strong> Geben Sie bei der Buchung den Code <strong>${data.voucherCode}</strong> an</li>
                            <li><strong>Genießen:</strong> Freuen Sie sich auf Ihre Behandlung! ✨</li>
                        </ol>
                    </div>
                    
                    <div class="details">
                        <h3>Gutschein-Details</h3>
                        <div class="detail-row">
                            <span class="detail-label">Gutschein-Code:</span>
                            <span class="detail-value"><strong>${data.voucherCode}</strong></span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Wert:</span>
                            <span class="detail-value"><strong>€${data.amount}</strong></span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Inhaber:</span>
                            <span class="detail-value">${data.recipientName || data.senderName}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Gültig bis:</span>
                            <span class="detail-value">${new Date(data.expiresAt).toLocaleDateString('de-DE')}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Bestellnummer:</span>
                            <span class="detail-value">${data.orderNumber}</span>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin: 40px 0;">
                        <a href="https://connect.shore.com/bookings/skinlux" class="button">
                            🗓️ Jetzt Termin buchen
                        </a>
                    </div>
                    
                    <div class="highlight-box">
                        <h4>💡 Wichtige Hinweise:</h4>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li>Dieser Gutschein ist <strong>nicht</strong> mit anderen Aktionen kombinierbar</li>
                            <li>Eine Barauszahlung ist nicht möglich</li>
                            <li>Bei Verlust kann der Gutschein nicht ersetzt werden - Code gut aufbewahren! 🔒</li>
                            <li>Terminabsagen bis 24h vorher kostenfrei</li>
                        </ul>
                    </div>
                    
                    <p>Wir freuen uns darauf, Sie bald bei uns begrüßen zu dürfen! Bei Fragen stehen wir Ihnen jederzeit zur Verfügung.</p>
                    
                    <p style="margin-top: 30px;">
                        <strong>Ihr Skinlux-Team</strong><br>
                        ✨ Für strahlend schöne Haut ✨
                    </p>
                </div>
                
                <div class="footer">
                    <p><strong>${bankDetails.businessName}</strong><br>
                    ${bankDetails.streetAddress}, ${bankDetails.postalCode} ${bankDetails.city}<br>
                    Tel: ${bankDetails.phone}<br>
                    E-Mail: ${bankDetails.email}<br>
                    Web: <a href="https://${bankDetails.website}" style="color: #059669;">${bankDetails.website}</a></p>
                    
                    <p style="margin-top: 20px; font-size: 12px;">
                    Diese E-Mail wurde automatisch generiert. Bei Fragen antworten Sie einfach auf diese E-Mail.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    // Generate voucher email HTML (the actual digital voucher)
    private static generateVoucherEmailHTML(data: VoucherEmailData, bankDetails: BankDetails): string {
        const recipientName = data.recipientName || data.senderName;
        const isGift = data.recipientName && data.recipientName !== data.senderName;

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Ihr Skinlux Gutschein</title>
            <style>
                body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                    margin: 0; 
                    padding: 0; 
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    line-height: 1.6;
                }
                .container { 
                    max-width: 700px; 
                    margin: 20px auto; 
                    background-color: white; 
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
                }
                .header { 
                    background: linear-gradient(135deg, #1f2937 0%, #374151 100%); 
                    color: white; 
                    padding: 40px 30px; 
                    text-align: center; 
                    position: relative;
                }
                .header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" patternUnits="userSpaceOnUse" width="20" height="20"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>');
                    opacity: 0.3;
                }
                .logo { 
                    font-size: 36px; 
                    font-weight: 300; 
                    margin-bottom: 10px; 
                    letter-spacing: 2px;
                    position: relative;
                    z-index: 1;
                }
                .gift-icon {
                    font-size: 48px;
                    margin: 20px 0;
                    position: relative;
                    z-index: 1;
                }
                .content { 
                    padding: 0; 
                }
                
                /* Hauptgutschein */
                .voucher-main {
                    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                    color: white;
                    padding: 50px 40px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .voucher-main::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
                    animation: shimmer 3s ease-in-out infinite;
                }
                @keyframes shimmer {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(180deg); }
                }
                .voucher-title {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    position: relative;
                    z-index: 1;
                }
                .voucher-amount {
                    font-size: 72px;
                    font-weight: bold;
                    margin: 20px 0;
                    text-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    position: relative;
                    z-index: 1;
                }
                .voucher-code-section {
                    background: rgba(255,255,255,0.15);
                    border-radius: 15px;
                    padding: 25px;
                    margin: 30px 0;
                    backdrop-filter: blur(10px);
                    position: relative;
                    z-index: 1;
                }
                .voucher-code {
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 3px;
                    font-family: 'Courier New', monospace;
                    margin: 10px 0;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                .code-label {
                    font-size: 14px;
                    opacity: 0.9;
                    margin-bottom: 10px;
                }
                
                /* Info-Sektion */
                .voucher-info {
                    padding: 40px;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    margin: 30px 0;
                }
                .info-item {
                    background: white;
                    padding: 25px;
                    border-radius: 15px;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    border: 1px solid #e2e8f0;
                }
                .info-icon {
                    font-size: 32px;
                    margin-bottom: 15px;
                }
                .info-title {
                    font-weight: bold;
                    color: #1f2937;
                    margin-bottom: 8px;
                }
                .info-text {
                    color: #6b7280;
                    font-size: 14px;
                }
                
                /* Anweisungen */
                .instructions {
                    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                    border: 2px solid #3b82f6;
                    border-radius: 15px;
                    padding: 30px;
                    margin: 30px 0;
                }
                .instructions h3 {
                    color: #1e40af;
                    margin-top: 0;
                    font-size: 20px;
                }
                .instructions ol {
                    color: #1e40af;
                    padding-left: 20px;
                }
                .instructions li {
                    margin: 12px 0;
                    font-weight: 500;
                }
                
                /* CTA Button */
                .cta-section {
                    text-align: center;
                    padding: 40px;
                    background: white;
                }
                .cta-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
                    color: white;
                    padding: 20px 40px;
                    text-decoration: none;
                    border-radius: 15px;
                    font-weight: bold;
                    font-size: 18px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                    margin: 20px 0;
                }
                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 35px rgba(0,0,0,0.3);
                }
                
                /* Footer */
                .footer {
                    background: #f9fafb;
                    padding: 40px 30px;
                    text-align: center;
                    color: #6b7280;
                    font-size: 14px;
                    border-top: 1px solid #e5e7eb;
                }
                .footer-logo {
                    font-size: 24px;
                    font-weight: bold;
                    color: #1f2937;
                    margin-bottom: 15px;
                }
                
                /* Mobile Responsive */
                @media (max-width: 600px) {
                    .container { margin: 10px; border-radius: 15px; }
                    .voucher-main { padding: 30px 20px; }
                    .voucher-amount { font-size: 56px; }
                    .voucher-code { font-size: 24px; letter-spacing: 2px; }
                    .info-grid { grid-template-columns: 1fr; gap: 20px; }
                    .instructions { padding: 20px; }
                    .cta-section { padding: 30px 20px; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">SKINLUX</div>
                    <div class="gift-icon">🎁</div>
                    <h1>${isGift ? `Ein Geschenk für ${recipientName}!` : `Ihr Gutschein ist da!`}</h1>
                    <p>${isGift ? `Von ${data.senderName} mit ❤️` : 'Bereit zum Einlösen!'}</p>
                </div>
                
                <div class="content">
                    <!-- Hauptgutschein -->
                    <div class="voucher-main">
                        <div class="voucher-title">Skinlux Gutschein</div>
                        <div class="voucher-amount">€${data.amount}</div>
                        
                        <div class="voucher-code-section">
                            <div class="code-label">Gutschein-Code:</div>
                            <div class="voucher-code">${data.voucherCode}</div>
                            <div style="font-size: 12px; opacity: 0.8; margin-top: 10px;">
                                Gültig bis: ${new Date(data.expiresAt).toLocaleDateString('de-DE')}
                            </div>
                        </div>
                        
                        <div style="font-size: 18px; font-weight: 500; margin-top: 30px; position: relative; z-index: 1;">
                            ✨ Für strahlend schöne Haut ✨
                        </div>
                    </div>
                    
                    <!-- Informations-Grid -->
                    <div class="voucher-info">
                        <h2 style="text-align: center; color: #1f2937; margin-bottom: 30px;">Ihr Gutschein im Detail</h2>
                        
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-icon">👤</div>
                                <div class="info-title">Inhaber</div>
                                <div class="info-text">${recipientName}</div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">📅</div>
                                <div class="info-title">Gültig bis</div>
                                <div class="info-text">${new Date(data.expiresAt).toLocaleDateString('de-DE')}</div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">🎯</div>
                                <div class="info-title">Wert</div>
                                <div class="info-text">€${data.amount}</div>
                            </div>
                            
                            <div class="info-item">
                                <div class="info-icon">🔒</div>
                                <div class="info-title">Code</div>
                                <div class="info-text" style="font-family: monospace; font-weight: bold;">${data.voucherCode}</div>
                            </div>
                        </div>
                        
                        ${data.message ? `
                        <div style="background: white; border-radius: 15px; padding: 25px; margin: 30px 0; border-left: 4px solid #059669;">
                            <h4 style="color: #059669; margin: 0 0 15px 0; font-size: 16px;">💌 Persönliche Nachricht:</h4>
                            <p style="margin: 0; font-style: italic; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                "${data.message}"
                            </p>
                            ${isGift ? `<p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;">— ${data.senderName}</p>` : ''}
                        </div>
                        ` : ''}
                    </div>
                    
                    <!-- Einlöse-Anweisungen -->
                    <div class="instructions">
                        <h3>🎯 So lösen Sie Ihren Gutschein ein:</h3>
                        <ol>
                            <li><strong>Termin buchen:</strong> Klicken Sie unten auf "Jetzt Termin buchen"</li>
                            <li><strong>Behandlung auswählen:</strong> Wählen Sie Ihre gewünschte Behandlung</li>
                            <li><strong>Gutschein angeben:</strong> Nennen Sie den Code <strong>${data.voucherCode}</strong></li>
                            <li><strong>Genießen:</strong> Freuen Sie sich auf Ihre Behandlung! ✨</li>
                        </ol>
                        
                        <div style="background: rgba(59, 130, 246, 0.1); border-radius: 10px; padding: 20px; margin: 20px 0;">
                            <p style="margin: 0; color: #1e40af; font-weight: 600; text-align: center;">
                                💡 <strong>Tipp:</strong> Speichern Sie diese E-Mail oder machen Sie einen Screenshot vom Gutschein-Code!
                            </p>
                        </div>
                    </div>
                    
                    <!-- Call-to-Action -->
                    <div class="cta-section">
                        <h3 style="color: #1f2937; margin-bottom: 20px;">Bereit für Ihre Schönheitsbehandlung?</h3>
                        <a href="https://connect.shore.com/bookings/skinlux" class="cta-button">
                            🗓️ Jetzt Termin buchen
                        </a>
                        
                        <div style="margin-top: 30px; padding: 25px; background: #f9fafb; border-radius: 15px;">
                            <h4 style="color: #374151; margin-bottom: 15px;">📞 Oder rufen Sie uns an:</h4>
                            <p style="margin: 0; color: #6b7280;">
                                <strong>Telefon:</strong> ${bankDetails.phone}<br>
                                <strong>E-Mail:</strong> ${bankDetails.email}<br>
                                <strong>Adresse:</strong> ${bankDetails.streetAddress}, ${bankDetails.postalCode} ${bankDetails.city}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <div class="footer-logo">SKINLUX</div>
                    <p><strong>${bankDetails.streetAddress}, ${bankDetails.postalCode} ${bankDetails.city}</strong><br>
                    Tel: ${bankDetails.phone} | E-Mail: ${bankDetails.email}<br>
                    Web: <a href="https://${bankDetails.website}" style="color: #059669;">${bankDetails.website}</a></p>
                    
                    <div style="margin: 25px 0; padding: 20px; background: #f3f4f6; border-radius: 10px;">
                        <h4 style="color: #374151; margin-bottom: 10px;">🔒 Wichtige Hinweise:</h4>
                        <ul style="text-align: left; display: inline-block; margin: 0; padding-left: 20px; color: #6b7280;">
                            <li>Gutschein ist nicht mit anderen Aktionen kombinierbar</li>
                            <li>Keine Barauszahlung möglich</li>
                            <li>Bei Verlust kann der Gutschein nicht ersetzt werden</li>
                            <li>Terminabsagen bis 24h vorher kostenfrei</li>
                        </ul>
                    </div>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">
                        Diese E-Mail wurde automatisch generiert. Bei Fragen antworten Sie einfach auf diese E-Mail.<br>
                        Gutschein-ID: ${data.orderNumber} | Erstellt: ${new Date().toLocaleDateString('de-DE')}
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    // Generate simple email HTML for PDF attachment
    private static generatePDFEmailHTML(data: VoucherEmailData, bankDetails: BankDetails): string {
        const recipientName = data.recipientName || data.senderName;
        const isGift = data.recipientName && data.recipientName !== data.senderName;

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Ihr Skinlux Gutschein als PDF</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; }
                .header { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 40px 30px; text-align: center; }
                .logo { font-size: 32px; font-weight: 300; margin-bottom: 10px; }
                .content { padding: 40px 30px; }
                .attachment-box { background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 16px; padding: 30px; margin: 30px 0; text-align: center; border: 2px dashed #d1d5db; }
                .pdf-icon { font-size: 48px; margin: 20px 0; }
                .amount { font-size: 36px; font-weight: bold; color: #059669; margin: 10px 0; }
                .voucher-code { font-size: 24px; font-weight: bold; color: #1f2937; letter-spacing: 2px; margin: 15px 0; font-family: monospace; }
                .footer { background-color: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
                .button { display: inline-block; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">SKINLUX</div>
                    <h1>🎁 Ihr Gutschein ist da!</h1>
                    <p>${isGift ? `Ein Geschenk für ${recipientName} von ${data.senderName}` : `Liebe/r ${recipientName}`}</p>
                </div>
                
                <div class="content">
                    <h2>Ihr Gutschein als PDF im Anhang</h2>
                    <p>Großartige Neuigkeiten! Ihr Skinlux-Gutschein wurde aktiviert und ist als PDF-Datei im Anhang dieser E-Mail zu finden.</p>
                    
                    <div class="attachment-box">
                        <div class="pdf-icon">📄</div>
                        <h3>PDF-Gutschein</h3>
                        <div class="voucher-code">${data.voucherCode}</div>
                        <div class="amount">€${data.amount}</div>
                        <p style="color: #6b7280; margin-top: 20px;">
                            <strong>Dateiname:</strong> Skinlux-Gutschein-${data.voucherCode}.pdf<br>
                            <strong>Gültig bis:</strong> ${new Date(data.expiresAt).toLocaleDateString('de-DE')}
                        </p>
                    </div>
                    
                    ${data.message ? `
                    <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                        <h4 style="color: #0369a1; margin: 0 0 10px 0;">💌 Persönliche Nachricht:</h4>
                        <p style="margin: 0; font-style: italic; color: #1e40af;">
                            "${data.message}"
                        </p>
                        ${isGift ? `<p style="margin: 10px 0 0 0; color: #64748b; text-align: right;">— ${data.senderName}</p>` : ''}
                    </div>
                    ` : ''}
                    
                    <div style="background: #dcfce7; border-radius: 12px; padding: 25px; margin: 25px 0;">
                        <h3 style="color: #166534; margin-top: 0;">🎯 So verwenden Sie Ihren PDF-Gutschein:</h3>
                        <ol style="color: #15803d; margin: 15px 0; padding-left: 20px;">
                            <li><strong>PDF herunterladen:</strong> Speichern Sie die PDF-Datei aus dem Anhang</li>
                            <li><strong>Ausdrucken (optional):</strong> Sie können den Gutschein ausdrucken oder digital vorzeigen</li>
                            <li><strong>Termin buchen:</strong> Rufen Sie uns an oder besuchen Sie unsere Website</li>
                            <li><strong>Gutschein einlösen:</strong> Zeigen Sie den Gutschein vor oder nennen Sie den Code</li>
                        </ol>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="https://connect.shore.com/bookings/skinlux" class="button">
                            🗓️ Jetzt Termin buchen
                        </a>
                    </div>
                    
                    <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 25px 0;">
                        <p style="margin: 0; color: #92400e; font-weight: 600; text-align: center;">
                            💡 <strong>Tipp:</strong> Speichern Sie die PDF-Datei auf Ihrem Smartphone für den einfachen Zugriff!
                        </p>
                    </div>
                    
                    <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung. Wir freuen uns darauf, Sie bald bei uns begrüßen zu dürfen!</p>
                </div>
                
                <div class="footer">
                    <p><strong>${bankDetails.businessName}</strong><br>
                    ${bankDetails.streetAddress}, ${bankDetails.postalCode} ${bankDetails.city}<br>
                    Tel: ${bankDetails.phone}<br>
                    E-Mail: ${bankDetails.email}<br>
                    Web: <a href="https://${bankDetails.website}" style="color: #059669;">${bankDetails.website}</a></p>
                    
                    <p style="margin-top: 20px; font-size: 12px;">
                    Diese E-Mail wurde automatisch generiert. Bei Fragen antworten Sie einfach auf diese E-Mail.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
} 