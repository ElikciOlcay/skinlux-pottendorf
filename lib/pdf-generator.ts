import { jsPDF } from 'jspdf';
import { VoucherEmailData } from './email';

export class PDFGenerator {
    // Generate a PDF voucher using jsPDF (reliable and fast)
    static async generateVoucherPDF(data: VoucherEmailData): Promise<Uint8Array> {
        console.log('🖨️ Starting jsPDF generation for voucher:', data.voucherCode);

        try {
            return await this.generatePDFWithJsPDF(data);
        } catch (error) {
            console.error('❌ jsPDF generation failed:', error);
            throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // jsPDF-basierte PDF-Generierung
    private static async generatePDFWithJsPDF(data: VoucherEmailData): Promise<Uint8Array> {
        console.log('🔄 Generating professional PDF with jsPDF for voucher:', data.voucherCode);

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [210, 148] // A5 landscape
        });

        const recipientName = data.recipientName || data.senderName;
        const isGift = !!(data.recipientName && data.recipientName !== data.senderName);

        // === DESIGN SETUP ===
        const primaryColor = [26, 26, 26] as [number, number, number]; // #1a1a1a
        const accentColor = [102, 102, 102] as [number, number, number]; // #666666
        const lightGray = [229, 229, 229] as [number, number, number]; // #e5e5e5
        const backgroundColor = [250, 250, 250] as [number, number, number]; // #fafafa

        // Hintergrund für rechte Seite
        doc.setFillColor(...backgroundColor);
        doc.rect(105, 0, 105, 148, 'F');

        // Vertikale Trennlinie
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.5);
        doc.line(105, 0, 105, 148);

        // === LINKE SEITE - HAUPTINHALT ===
        this.renderLeftSide(doc, data, recipientName, isGift, primaryColor, accentColor, lightGray);

        // === RECHTE SEITE - DETAILS ===
        this.renderRightSide(doc, data, recipientName, isGift, primaryColor, accentColor, lightGray);

        const pdfBytes = new Uint8Array(doc.output('arraybuffer'));

        console.log('✅ jsPDF generation completed successfully, size:', pdfBytes.length, 'bytes');

        return pdfBytes;
    }

    private static renderLeftSide(
        doc: jsPDF,
        data: VoucherEmailData,
        recipientName: string,
        isGift: boolean,
        primaryColor: [number, number, number],
        accentColor: [number, number, number],
        lightGray: [number, number, number]
    ) {
        // Logo/Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(...primaryColor);
        doc.text('SKINLUX', 20, 30);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(...accentColor);
        doc.text(isGift ? `Geschenk für ${recipientName}` : 'Gutschein', 20, 38);

        if (isGift) {
            doc.setFontSize(10);
            doc.text(`Von ${data.senderName}`, 20, 44);
        }

        // Hauptinhalt - Gutschein
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(...primaryColor);
        doc.text('WERTGUTSCHEIN', 20, 60);

        // Betrag - groß und prominent
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(42);
        doc.text(`€${data.amount}`, 20, 78);

        // Gutscheincode - mit Rahmen
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);

        const codeText = data.voucherCode;
        const codeWidth = doc.getTextWidth(codeText) + 8;
        const codeHeight = 8;
        const codeX = 20;
        const codeY = 85;

        // Code-Box
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.5);
        doc.roundedRect(codeX, codeY, codeWidth, codeHeight, 1, 1, 'FD');
        doc.text(codeText, codeX + 4, codeY + 5.5);

        // Gültigkeit
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...accentColor);
        doc.text(`Gültig bis ${new Date(data.expiresAt).toLocaleDateString('de-DE')}`, 20, 100);

        // Footer
        const footerY = 118;
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.3);
        doc.line(20, footerY - 3, 95, footerY - 3);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...primaryColor);
        doc.text('Skinlux Bischofshofen', 20, footerY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...accentColor);
        doc.text('Salzburger Straße 45, 5500 Bischofshofen', 20, footerY + 4);
        doc.text('Tel. +43 123 456 789 • hello@skinlux.at', 20, footerY + 8);
        doc.text('skinlux.at', 20, footerY + 12);

        // Footer ID
        doc.setFontSize(7);
        doc.setTextColor(153, 153, 153);
        const footerId = `Gutschein-ID: ${data.orderNumber} • ${new Date().toLocaleDateString('de-DE')}`;
        const footerIdWidth = doc.getTextWidth(footerId);
        doc.text(footerId, (105 - footerIdWidth) / 2, 142);
    }

    private static renderRightSide(
        doc: jsPDF,
        data: VoucherEmailData,
        recipientName: string,
        isGift: boolean,
        primaryColor: [number, number, number],
        accentColor: [number, number, number],
        lightGray: [number, number, number]
    ) {
        const rightX = 115;
        let currentY = 25;

        // Details Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(...primaryColor);
        doc.text('DETAILS', rightX, currentY);
        currentY += 15;

        // Detail Funktion
        const addDetail = (label: string, value: string) => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(...accentColor);
            doc.text(label.toUpperCase(), rightX, currentY);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(...primaryColor);
            const lines = doc.splitTextToSize(value, 80);
            doc.text(lines, rightX, currentY + 4);

            doc.setDrawColor(...lightGray);
            doc.setLineWidth(0.3);
            doc.line(rightX, currentY + 6, rightX + 80, currentY + 6);

            currentY += 15;
        };

        // Details hinzufügen
        addDetail('Begünstigter', recipientName);
        addDetail('Gutscheinwert', `€${data.amount}`);
        addDetail('Code', data.voucherCode);
        addDetail('Gültig bis', new Date(data.expiresAt).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));

        // Persönliche Nachricht
        if (data.message) {
            currentY += 5;

            const messageBoxY = currentY;
            const messageBoxHeight = 25;

            doc.setFillColor(255, 255, 255);
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(0.5);
            doc.roundedRect(rightX, messageBoxY, 80, messageBoxHeight, 2, 2, 'FD');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(...primaryColor);
            doc.text('NACHRICHT', rightX + 4, messageBoxY + 6);

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(8);
            doc.setTextColor(51, 51, 51);
            const messageLines = doc.splitTextToSize(`"${data.message}"`, 72);
            doc.text(messageLines, rightX + 4, messageBoxY + 12);

            if (isGift) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7);
                doc.setTextColor(...accentColor);
                doc.text(`— ${data.senderName}`, rightX + 60, messageBoxY + messageBoxHeight - 4);
            }

            currentY += messageBoxHeight + 8;
        }

        // Einlösung
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...primaryColor);
        doc.text('EINLÖSUNG', rightX, currentY);
        currentY += 8;

        const steps = ['Termin vereinbaren', 'Behandlung wählen', 'Gutschein vorzeigen', 'Entspannen & genießen'];

        steps.forEach((step, index) => {
            // Nummer Circle
            doc.setFillColor(...primaryColor);
            doc.circle(rightX + 3, currentY - 1, 2.5, 'F');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7);
            doc.setTextColor(255, 255, 255);
            doc.text((index + 1).toString(), rightX + 2.2, currentY + 0.8);

            // Step Text
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(51, 51, 51);
            doc.text(step, rightX + 8, currentY + 1);

            currentY += 6;
        });

        // Bedingungen
        currentY += 8;
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.3);
        doc.line(rightX, currentY - 3, rightX + 80, currentY - 3);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...primaryColor);
        doc.text('BEDINGUNGEN', rightX, currentY);
        currentY += 6;

        const terms = [
            'Nicht mit anderen Aktionen kombinierbar',
            'Keine Barauszahlung möglich',
            'Bei Verlust nicht ersetzbar',
            'Stornierung bis 24h vorher kostenfrei'
        ];

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...accentColor);

        terms.forEach(term => {
            doc.text('•', rightX, currentY);
            const termLines = doc.splitTextToSize(term, 75);
            doc.text(termLines, rightX + 3, currentY);
            currentY += 4;
        });
    }
}
