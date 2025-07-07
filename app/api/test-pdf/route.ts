import { NextRequest, NextResponse } from 'next/server';
import { PDFGenerator } from '@/lib/pdf-generator';
import { VoucherEmailData } from '@/lib/email';

// Direkter PDF-Test-Endpunkt
export async function GET() {
    try {
        console.log('🧪 Testing new PDF design directly...');

        // Test-Daten für das neue PDF-Design
        const testData: VoucherEmailData = {
            voucherCode: 'SLX2528',
            amount: 250,
            senderName: 'Julia Schmidt',
            senderEmail: 'julia@test.com',
            recipientName: 'Maria Muster',
            message: 'Alles Gute zum Geburtstag! Genieße deine Wellness-Auszeit.',
            orderNumber: 'TEST20250707',
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        };

        console.log('🔄 Generating PDF with new design...');
        const pdfBytes = await PDFGenerator.generateVoucherPDF(testData);

        console.log('✅ PDF generated successfully, size:', pdfBytes.length, 'bytes');

        // PDF als Download zurückgeben
        return new NextResponse(pdfBytes, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="test-gutschein-neu.pdf"',
                'Content-Length': pdfBytes.length.toString()
            }
        });

    } catch (error) {
        console.error('❌ PDF test error:', error);
        return NextResponse.json(
            {
                error: 'Fehler beim PDF-Test',
                details: error instanceof Error ? error.message : 'Unbekannter Fehler'
            },
            { status: 500 }
        );
    }
}

// POST endpoint for custom test data
export async function POST(request: NextRequest) {
    try {
        console.log('🧪 Testing PDF with custom data...');

        const customData = await request.json();

        // Merge with defaults
        const testData: VoucherEmailData = {
            voucherCode: customData.voucherCode || 'SLX9999',
            amount: customData.amount || 100,
            senderName: customData.senderName || 'Test Absender',
            senderEmail: customData.senderEmail || 'test@example.com',
            recipientName: customData.recipientName || 'Test Empfänger',
            message: customData.message || 'Dies ist eine Test-Nachricht.',
            orderNumber: customData.orderNumber || 'TEST12345',
            expiresAt: customData.expiresAt || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        };

        console.log('🔄 Generating PDF with custom data:', testData);
        const pdfBytes = await PDFGenerator.generateVoucherPDF(testData);

        console.log('✅ Custom PDF generated successfully, size:', pdfBytes.length, 'bytes');

        // PDF als Download zurückgeben
        return new NextResponse(pdfBytes, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="custom-gutschein-test.pdf"',
                'Content-Length': pdfBytes.length.toString()
            }
        });

    } catch (error) {
        console.error('❌ Custom PDF test error:', error);
        return NextResponse.json(
            {
                error: 'Fehler beim Custom PDF-Test',
                details: error instanceof Error ? error.message : 'Unbekannter Fehler'
            },
            { status: 500 }
        );
    }
} 