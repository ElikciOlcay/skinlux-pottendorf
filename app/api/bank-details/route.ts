import { NextRequest, NextResponse } from 'next/server';

export interface BankDetails {
    bankName: string;
    accountHolder: string;
    iban: string;
    bic: string;
    reference: string;
    voucherValidityMonths: number;
    sendVoucherAsPDF: boolean; // Neue Option für PDF-Versand
}

// Default bank details (you should update these)
const DEFAULT_BANK_DETAILS: BankDetails = {
    bankName: 'Sparkasse Pongau',
    accountHolder: 'Skinlux Bischofshofen',
    iban: 'AT00 0000 0000 0000 0000',
    bic: 'SPALAT2G',
    reference: 'Gutschein-Bestellung',
    voucherValidityMonths: 12,
    sendVoucherAsPDF: false // Standard: HTML-E-Mail
};

// In a real application, you would store this in a database
// For now, we'll use a simple in-memory store with file system fallback
let bankDetailsCache: BankDetails | null = null;

// GET - Retrieve bank details
export async function GET() {
    try {
        // For now, return default bank details
        // In production, you would fetch from database
        const bankDetails = bankDetailsCache || DEFAULT_BANK_DETAILS;

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

// POST - Save bank details
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

        // Store in cache (in production, save to database)
        bankDetailsCache = bankDetails;

        console.log('✅ Bank details updated:', bankDetails);

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