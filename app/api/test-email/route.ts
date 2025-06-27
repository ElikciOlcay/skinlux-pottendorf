import { NextRequest, NextResponse } from 'next/server';
import { EmailService, VoucherEmailData } from '@/lib/email';

// Test endpoint for email functionality
export async function POST(request: NextRequest) {
    try {
        console.log('🧪 Testing email functionality...');

        const { to } = await request.json();

        if (!to) {
            return NextResponse.json(
                { error: 'E-Mail-Adresse erforderlich' },
                { status: 400 }
            );
        }

        // Check if Resend is configured
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({
                success: false,
                message: 'E-Mail-System nicht konfiguriert',
                error: 'RESEND_API_KEY fehlt in Environment Variables'
            });
        }

        // Create test data
        const testEmailData: VoucherEmailData = {
            voucherCode: 'TEST-ABCD1234-EFGH',
            amount: 100,
            senderName: 'Max Testmann',
            senderEmail: to,
            senderPhone: '+43 123 456 789',
            recipientName: 'Lisa Musterfrau',
            message: 'Dies ist eine Test-Nachricht für den Gutschein.',
            orderNumber: 'TEST-ORDER-123',
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 Jahr ab jetzt
        };

        console.log('📧 Sending test emails to:', to);

        // Test all email types
        const [customerResult, adminResult, voucherHtmlResult, voucherPdfResult] = await Promise.allSettled([
            EmailService.sendCustomerConfirmation(testEmailData),
            EmailService.sendAdminNotification(testEmailData),
            EmailService.sendVoucherByEmail(testEmailData, false), // HTML Format
            EmailService.sendVoucherByEmail(testEmailData, true)   // PDF Format
        ]);

        const results = {
            customerEmail: {
                success: customerResult.status === 'fulfilled' ? customerResult.value.success : false,
                error: customerResult.status === 'rejected' ? customerResult.reason :
                    customerResult.status === 'fulfilled' && !customerResult.value.success ? customerResult.value.error : null
            },
            adminEmail: {
                success: adminResult.status === 'fulfilled' ? adminResult.value.success : false,
                error: adminResult.status === 'rejected' ? adminResult.reason :
                    adminResult.status === 'fulfilled' && !adminResult.value.success ? adminResult.value.error : null
            },
            voucherHtmlEmail: {
                success: voucherHtmlResult.status === 'fulfilled' ? voucherHtmlResult.value.success : false,
                error: voucherHtmlResult.status === 'rejected' ? voucherHtmlResult.reason :
                    voucherHtmlResult.status === 'fulfilled' && !voucherHtmlResult.value.success ? voucherHtmlResult.value.error : null
            },
            voucherPdfEmail: {
                success: voucherPdfResult.status === 'fulfilled' ? voucherPdfResult.value.success : false,
                error: voucherPdfResult.status === 'rejected' ? voucherPdfResult.reason :
                    voucherPdfResult.status === 'fulfilled' && !voucherPdfResult.value.success ? voucherPdfResult.value.error : null
            }
        };

        console.log('✅ Test email results:', results);

        const overallSuccess = results.customerEmail.success && results.adminEmail.success &&
            results.voucherHtmlEmail.success && results.voucherPdfEmail.success;

        return NextResponse.json({
            success: overallSuccess,
            message: overallSuccess ?
                '✅ Alle Test-E-Mails erfolgreich versendet!' :
                '⚠️ Einige E-Mails konnten nicht versendet werden',
            results: results,
            testData: testEmailData,
            emailTypes: [
                'Customer Confirmation (Bestellbestätigung)',
                'Admin Notification (Admin-Benachrichtigung)',
                'Digital Voucher HTML (Digitaler Gutschein) 📧',
                'Digital Voucher PDF (PDF-Gutschein) 📄'
            ]
        });

    } catch (error) {
        console.error('❌ Test email error:', error);
        return NextResponse.json(
            {
                error: 'Fehler beim Testen der E-Mail-Funktionalität',
                details: error instanceof Error ? error.message : 'Unbekannter Fehler'
            },
            { status: 500 }
        );
    }
}

// GET endpoint for system status
export async function GET() {
    try {
        console.log('🔍 Checking system status...');

        const envStatus = {
            resendApiKey: !!process.env.RESEND_API_KEY,
            adminEmail: !!process.env.ADMIN_EMAIL,
            supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            siteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
            nodeEnv: process.env.NODE_ENV || 'development'
        };

        console.log('Environment status:', envStatus);

        return NextResponse.json({
            status: 'E-Mail-System Status',
            environment: envStatus,
            ready: envStatus.resendApiKey && envStatus.adminEmail,
            message: envStatus.resendApiKey ?
                'E-Mail-System konfiguriert ✅' :
                'RESEND_API_KEY fehlt ❌',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Status check error:', error);
        return NextResponse.json(
            {
                error: 'Status-Check fehlgeschlagen',
                details: error instanceof Error ? error.message : 'Unbekannter Fehler'
            },
            { status: 500 }
        );
    }
} 