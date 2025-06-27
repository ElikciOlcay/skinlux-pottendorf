import { jsPDF } from 'jspdf';
import { VoucherEmailData } from './email';

export class PDFGenerator {
    // Generate a clean, centered PDF voucher using jsPDF
    static async generateVoucherPDF(data: VoucherEmailData): Promise<Uint8Array> {
        console.log('🖨️ Starting clean jsPDF generation for voucher:', data.voucherCode);

        try {
            return await this.generateCleanPDF(data);
        } catch (error) {
            console.error('❌ jsPDF generation failed:', error);
            throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // Cleanes, zentriertes PDF-Design
    private static async generateCleanPDF(data: VoucherEmailData): Promise<Uint8Array> {
        console.log('🎨 Generating clean centered PDF for voucher:', data.voucherCode);

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [210, 148] // A5 landscape
        });

        const recipientName = data.recipientName || data.senderName;
        const isGift = !!(data.recipientName && data.recipientName !== data.senderName);

        // Design-Konstanten
        const centerX = 105; // Mitte der Seite (210mm / 2)
        const primaryColor = [26, 26, 26] as [number, number, number]; // #1a1a1a
        const accentColor = [102, 102, 102] as [number, number, number]; // #666666
        const lightGray = [229, 229, 229] as [number, number, number]; // #e5e5e5

        // === LOGO/HEADER BEREICH ===
        let currentY = 25;

        // SKINLUX Logo - groß und zentriert
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(32);
        doc.setTextColor(...primaryColor);
        doc.text('SKINLUX', centerX, currentY, { align: 'center' });

        currentY += 12;

        // Subtitle
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.setTextColor(...accentColor);
        if (isGift) {
            doc.text(`Geschenk für ${recipientName}`, centerX, currentY, { align: 'center' });
            currentY += 6;
            doc.setFontSize(12);
            doc.text(`Von ${data.senderName}`, centerX, currentY, { align: 'center' });
        } else {
            doc.text('Wertgutschein', centerX, currentY, { align: 'center' });
        }

        currentY += 20;

        // === HAUPTINHALT - BETRAG UND CODE ===

        // "WERTGUTSCHEIN" Label
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...primaryColor);
        doc.text('WERTGUTSCHEIN', centerX, currentY, { align: 'center' });

        currentY += 15;

        // Betrag - ohne Euro-Zeichen, sehr groß
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(64);
        doc.setTextColor(...primaryColor);
        doc.text(data.amount.toString(), centerX, currentY, { align: 'center' });

        // Euro-Zeichen separat, kleiner
        const amountWidth = doc.getTextWidth(data.amount.toString());
        doc.setFontSize(24);
        doc.text('€', centerX - (amountWidth / 2) - 8, currentY - 25);

        currentY += 20;

        // Gutscheincode - mit elegantem Rahmen
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(...primaryColor);

        const codeText = data.voucherCode;
        const codeWidth = doc.getTextWidth(codeText) + 16;
        const codeHeight = 12;
        const codeX = centerX - (codeWidth / 2);
        const codeY = currentY - 8;

        // Eleganter Code-Rahmen
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(1);
        doc.roundedRect(codeX, codeY, codeWidth, codeHeight, 2, 2, 'FD');

        // Code Text
        doc.text(codeText, centerX, currentY, { align: 'center' });

        currentY += 20;

        // Gültigkeit
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(...accentColor);
        doc.text(`Gültig bis ${new Date(data.expiresAt).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`, centerX, currentY, { align: 'center' });

        // === PERSÖNLICHE NACHRICHT (wenn vorhanden) ===
        if (data.message) {
            currentY += 20;

            // Message Box - zentriert und elegant
            const messageBoxWidth = 140;
            const messageBoxHeight = 20;
            const messageBoxX = centerX - (messageBoxWidth / 2);
            const messageBoxY = currentY - 15;

            doc.setFillColor(248, 248, 248);
            doc.setDrawColor(...lightGray);
            doc.setLineWidth(0.5);
            doc.roundedRect(messageBoxX, messageBoxY, messageBoxWidth, messageBoxHeight, 3, 3, 'FD');

            // "NACHRICHT" Label
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(...accentColor);
            doc.text('NACHRICHT', centerX, currentY - 8, { align: 'center' });

            // Message Text
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(11);
            doc.setTextColor(51, 51, 51);
            const messageLines = doc.splitTextToSize(`"${data.message}"`, messageBoxWidth - 10);
            doc.text(messageLines, centerX, currentY - 2, { align: 'center' });

            if (isGift) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(...accentColor);
                doc.text(`— ${data.senderName}`, centerX, currentY + 8, { align: 'center' });
            }

            currentY += 25;
        }

        // === FOOTER - KONTAKTINFORMATIONEN ===

        // Trennlinie
        const footerStartY = 120;
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.5);
        doc.line(30, footerStartY, 180, footerStartY);

        let footerY = footerStartY + 8;

        // Firmenname
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...primaryColor);
        doc.text('Skinlux Bischofshofen', centerX, footerY, { align: 'center' });

        footerY += 6;

        // Adresse
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...accentColor);
        doc.text('Salzburger Straße 45, 5500 Bischofshofen', centerX, footerY, { align: 'center' });

        footerY += 4;

        // Kontakt
        doc.text('Tel. +43 123 456 789 • hello@skinlux.at • skinlux.at', centerX, footerY, { align: 'center' });

        // Gutschein-ID - ganz unten, klein
        doc.setFontSize(7);
        doc.setTextColor(153, 153, 153);
        const footerId = `Gutschein-ID: ${data.orderNumber} • ${new Date().toLocaleDateString('de-DE')}`;
        doc.text(footerId, centerX, 142, { align: 'center' });

        const pdfBytes = new Uint8Array(doc.output('arraybuffer'));

        console.log('✅ Clean PDF generated successfully, size:', pdfBytes.length, 'bytes');

        return pdfBytes;
    }
}
