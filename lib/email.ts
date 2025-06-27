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
}

export class EmailService {

    // Send confirmation email to customer
    static async sendCustomerConfirmation(data: VoucherEmailData) {
        try {
            if (!process.env.RESEND_API_KEY) {
                console.warn('RESEND_API_KEY not configured, skipping customer email');
                return { success: false, error: 'Email service not configured' };
            }

            const emailContent = this.generateCustomerConfirmationHTML(data);

            // Use verified email for development, production domain for production
            const fromEmail = process.env.NODE_ENV === 'production'
                ? 'Skinlux Bischofshofen <noreply@skinlux.at>'
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

            const emailContent = this.generatePaymentConfirmationHTML(data);

            // Use verified email for development, production domain for production
            const fromEmail = process.env.NODE_ENV === 'production'
                ? 'Skinlux Bischofshofen <noreply@skinlux.at>'
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

    // Generate customer confirmation email HTML
    private static generateCustomerConfirmationHTML(data: VoucherEmailData): string {
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
                .voucher-box { background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 16px; padding: 30px; margin: 30px 0; text-align: center; }
                .voucher-code { font-size: 28px; font-weight: bold; color: #1f2937; letter-spacing: 2px; margin: 15px 0; }
                .amount { font-size: 36px; font-weight: bold; color: #059669; margin: 10px 0; }
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
                    
                    <div class="voucher-box">
                        <h2>Ihr Gutschein</h2>
                        <div class="voucher-code">${data.voucherCode}</div>
                        <div class="amount">€${data.amount}</div>
                        <p>Gültig bis: ${new Date(data.expiresAt).toLocaleDateString('de-DE')}</p>
                    </div>
                    
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
                    </div>
                    
                    <div class="important">
                        <h4>💳 Zahlungsinformationen</h4>
                        <p><strong>Status:</strong> Zahlung ausstehend</p>
                        <p>Sie erhalten in Kürze eine separate E-Mail mit den Zahlungsdetails und der Rechnung.</p>
                        <p><strong>Nach Zahlungseingang wird Ihr Gutschein automatisch aktiviert.</strong></p>
                    </div>
                    
                    <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung!</p>
                    
                    <a href="https://connect.shore.com/bookings/skinlux" class="button">Termin buchen</a>
                </div>
                
                <div class="footer">
                    <p><strong>Skinlux Bischofshofen</strong><br>
                    Salzburger Straße 45, 5500 Bischofshofen<br>
                    Tel: +43 123 456 789<br>
                    E-Mail: hello@skinlux.at</p>
                    
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
    private static generatePaymentConfirmationHTML(data: VoucherEmailData): string {
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
                    <p><strong>Skinlux Bischofshofen</strong><br>
                    Salzburger Straße 45, 5500 Bischofshofen<br>
                    Tel: +43 123 456 789<br>
                    E-Mail: hello@skinlux.at<br>
                    Web: <a href="https://skinlux.at" style="color: #059669;">skinlux.at</a></p>
                    
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