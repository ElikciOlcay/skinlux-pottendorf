import { jsPDF } from 'jspdf';
import { VoucherEmailData, BankDetails } from './email';

export class PDFGenerator {

    // Generate a PDF voucher using jsPDF (reliable and fast)
    static async generateVoucherPDF(data: VoucherEmailData): Promise<Uint8Array> {
        console.log('🖨️ Starting jsPDF generation for voucher:', data.voucherCode);

        try {
            // Load bank details (including address) from API
            const { EmailService } = await import('./email');
            const bankDetails = await EmailService.getBankDetailsPublic();
            return await this.generatePDFWithJsPDF(data, bankDetails);
        } catch (error) {
            console.error('❌ jsPDF generation failed:', error);
            throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // jsPDF-basierte PDF-Generierung mit komplett neuem Design
    private static async generatePDFWithJsPDF(data: VoucherEmailData, bankDetails: BankDetails): Promise<Uint8Array> {
        console.log('🔄 Generating clean minimalist PDF for voucher:', data.voucherCode);

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const recipientName = data.recipientName || data.senderName;
        const isGift = !!(data.recipientName && data.recipientName !== data.senderName);

        // === MODERNE FARBEN ===
        const black = [0, 0, 0] as [number, number, number];
        const darkGray = [60, 60, 60] as [number, number, number];
        const lightGray = [120, 120, 120] as [number, number, number];
        const accent = [240, 163, 188] as [number, number, number]; // Skinlux Rosa
        const veryLightGray = [240, 240, 240] as [number, number, number];

        // === KOMPLETT NEUES LAYOUT ===
        await this.renderCleanLayout(doc, data, bankDetails, recipientName, isGift, black, darkGray, lightGray, accent, veryLightGray);

        const pdfBytes = new Uint8Array(doc.output('arraybuffer'));
        console.log('✅ Clean PDF generation completed successfully, size:', pdfBytes.length, 'bytes');

        return pdfBytes;
    }

    private static async renderCleanLayout(
        doc: jsPDF,
        data: VoucherEmailData,
        bankDetails: BankDetails,
        recipientName: string,
        isGift: boolean,
        black: [number, number, number],
        darkGray: [number, number, number],
        lightGray: [number, number, number],
        accent: [number, number, number],
        veryLightGray: [number, number, number]
    ) {
        const pageWidth = 210; // A4 width
        const pageHeight = 297; // A4 height
        const centerX = pageWidth / 2;
        const margin = 20;

        // === HEADER: SKINLUX BRANDING ===
        let currentY = 40;

        // Skinlux Hauptlogo - elegant als Text
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(...black);
        const brandText = 'SKINLUX';
        const brandWidth = doc.getTextWidth(brandText);
        doc.text(brandText, centerX - brandWidth / 2, currentY);

        // Untertitel
        currentY += 10;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...lightGray);
        const subText = 'MEDICAL BEAUTY';
        const subWidth = doc.getTextWidth(subText);
        doc.text(subText, centerX - subWidth / 2, currentY);

        // Dezente Linie unter dem Branding
        currentY += 15;
        doc.setDrawColor(...veryLightGray);
        doc.setLineWidth(0.5);
        doc.line(margin, currentY, pageWidth - margin, currentY);

        // === GUTSCHEIN HEADER ===
        currentY += 15;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.setTextColor(...darkGray);
        const headerText = 'G U T S C H E I N';
        const headerWidth = doc.getTextWidth(headerText);
        doc.text(headerText, centerX - headerWidth / 2, currentY);

        // Gutschein-Nummer diskret
        currentY += 2;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...lightGray);
        const codeText = data.voucherCode;
        const codeWidth = doc.getTextWidth(codeText);
        doc.text(codeText, centerX - codeWidth / 2, currentY);

        // === HAUPTINHALT ===
        currentY += 10;

        // Geschenk-Information entfernt (auf Wunsch des Nutzers)

        // === PERSÖNLICHE NACHRICHT (vor dem Betrag) ===
        if (data.message) {
            // Sanfte Trennlinie
            doc.setDrawColor(...veryLightGray);
            doc.setLineWidth(0.5);
            doc.line(margin + 20, currentY, pageWidth - margin - 20, currentY);

            currentY += 20;

            // Nachricht-Titel
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(...lightGray);
            const msgTitleText = 'PERSÖNLICHE NACHRICHT';
            const msgTitleWidth = doc.getTextWidth(msgTitleText);
            doc.text(msgTitleText, centerX - msgTitleWidth / 2, currentY);

            currentY += 15;

            // Nachricht selbst - elegant formatiert
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(12);
            doc.setTextColor(...darkGray);

            const messageLines = doc.splitTextToSize(`"${data.message}"`, 120);
            messageLines.forEach((line: string, index: number) => {
                const lineWidth = doc.getTextWidth(line);
                doc.text(line, centerX - lineWidth / 2, currentY + (index * 6));
            });

            currentY += messageLines.length * 6;

            // Unterschrift entfernt (da keine Geschenk-Information mehr angezeigt wird)

            currentY += 30;
        }

        // === WERT-SEKTION (nach der Nachricht) ===
        // Leichter Hintergrund für Wert-Bereich
        const valueBoxHeight = 65;
        doc.setFillColor(...veryLightGray);
        doc.rect(margin, currentY - 10, pageWidth - (2 * margin), valueBoxHeight, 'F');

        currentY += 12;

        // Euro-Symbol und Betrag - perfekt zentriert
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(52);
        doc.setTextColor(...black);
        const amountText = `€ ${data.amount}`;
        const amountWidth = doc.getTextWidth(amountText);
        doc.text(amountText, centerX - amountWidth / 2, currentY + 20);

        // Betrag in Worten - für Sicherheit
        currentY += 35;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(...darkGray);
        const writtenAmount = this.numberToGermanWords(data.amount);
        const writtenWidth = doc.getTextWidth(writtenAmount);
        doc.text(writtenAmount, centerX - writtenWidth / 2, currentY);

        currentY += 35;

        // === GÜLTIGKEIT ===
        currentY += 30;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...lightGray);
        const expiryText = `Gültig bis ${new Date(data.expiresAt).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })}`;
        const expiryWidth = doc.getTextWidth(expiryText);
        doc.text(expiryText, centerX - expiryWidth / 2, currentY);

        // === FOOTER ===
        const footerY = pageHeight - 40;

        // Trennlinie vor Footer
        doc.setDrawColor(...veryLightGray);
        doc.setLineWidth(0.5);
        doc.line(margin, footerY - 15, pageWidth - margin, footerY - 15);

        // Kontakt-Information
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...lightGray);

        const contactInfo = [
            'Skinlux Bischofshofen',
            'Bahnhofstrasse 17, 5500 Bischofshofen',
            'Tel: 0660 57 21 403 • hello@skinlux.at'
        ];

        contactInfo.forEach((line, index) => {
            const lineWidth = doc.getTextWidth(line);
            doc.text(line, centerX - lineWidth / 2, footerY + (index * 4));
        });

        // Order-ID ganz unten
        doc.setFontSize(7);
        doc.setTextColor(200, 200, 200);
        const orderId = `ORD-${data.orderNumber}`;
        const orderIdWidth = doc.getTextWidth(orderId);
        doc.text(orderId, centerX - orderIdWidth / 2, pageHeight - 10);
    }

    // Helper function to convert numbers to German words
    private static numberToGermanWords(amount: number): string {
        const commonAmounts: { [key: number]: string } = {
            10: 'zehn Euro',
            15: 'fünfzehn Euro',
            20: 'zwanzig Euro',
            25: 'fünfundzwanzig Euro',
            30: 'dreißig Euro',
            40: 'vierzig Euro',
            50: 'fünfzig Euro',
            60: 'sechzig Euro',
            75: 'fünfundsiebzig Euro',
            100: 'einhundert Euro',
            150: 'einhundertfünfzig Euro',
            200: 'zweihundert Euro',
            250: 'zweihundertfünfzig Euro',
            300: 'dreihundert Euro',
            500: 'fünfhundert Euro'
        };

        return commonAmounts[amount] || `${amount} Euro`;
    }
}
