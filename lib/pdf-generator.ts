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

    // jsPDF-basierte PDF-Generierung
    private static async generatePDFWithJsPDF(data: VoucherEmailData, bankDetails: BankDetails): Promise<Uint8Array> {
        console.log('🔄 Generating modern minimalist PDF with jsPDF for voucher:', data.voucherCode);

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const recipientName = data.recipientName || data.senderName;
        const isGift = !!(data.recipientName && data.recipientName !== data.senderName);

        // === MODERN DESIGN SETUP ===
        const primaryColor = [0, 0, 0] as [number, number, number]; // Pure black
        const accentColor = [240, 163, 188] as [number, number, number]; // Skinlux pink
        const lightGray = [245, 245, 245] as [number, number, number]; // Very light gray
        const textGray = [100, 100, 100] as [number, number, number]; // Medium gray

        // === MINIMALIST SINGLE-PAGE LAYOUT ===
        this.renderModernLayout(doc, data, bankDetails, recipientName, isGift, primaryColor, accentColor, lightGray, textGray);

        const pdfBytes = new Uint8Array(doc.output('arraybuffer'));

        console.log('✅ Modern PDF generation completed successfully, size:', pdfBytes.length, 'bytes');

        return pdfBytes;
    }

    private static renderModernLayout(
        doc: jsPDF,
        data: VoucherEmailData,
        bankDetails: BankDetails,
        recipientName: string,
        isGift: boolean,
        primaryColor: [number, number, number],
        accentColor: [number, number, number],
        lightGray: [number, number, number],
        textGray: [number, number, number]
    ) {
        const pageWidth = 210; // A4 width
        const pageHeight = 297; // A4 height
        const centerX = pageWidth / 2;

        // === HEADER SECTION ===
        let currentY = 60;

        // Minimalist brand
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        doc.setTextColor(...textGray);
        const brandText = 'SKINLUX';
        const brandWidth = doc.getTextWidth(brandText);
        doc.text(brandText, centerX - brandWidth / 2, currentY);

        // Subtle line under brand
        currentY += 8;
        doc.setDrawColor(...lightGray);
        doc.setLineWidth(0.5);
        doc.line(centerX - 30, currentY, centerX + 30, currentY);

        // === MAIN CONTENT ===
        currentY += 50;

        // Gift indicator (if applicable)
        if (isGift) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(14);
            doc.setTextColor(...textGray);
            const giftText = `Geschenk für ${recipientName}`;
            const giftWidth = doc.getTextWidth(giftText);
            doc.text(giftText, centerX - giftWidth / 2, currentY);

            doc.setFontSize(11);
            doc.setTextColor(...textGray);
            const fromText = `von ${data.senderName}`;
            const fromWidth = doc.getTextWidth(fromText);
            doc.text(fromText, centerX - fromWidth / 2, currentY + 8);

            currentY += 30;
        }

        // Main voucher text - very clean
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(18);
        doc.setTextColor(...primaryColor);
        const voucherText = 'GUTSCHEIN';
        const voucherWidth = doc.getTextWidth(voucherText);
        doc.text(voucherText, centerX - voucherWidth / 2, currentY);

        // Amount - large and prominent with modern font
        currentY += 40;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(84);
        doc.setTextColor(...primaryColor);

        // Euro symbol and amount with spacing
        const euroSymbol = '€';
        const amountNumber = ` ${data.amount}`;
        const euroWidth = doc.getTextWidth(euroSymbol);
        const numberWidth = doc.getTextWidth(amountNumber);
        const totalWidth = euroWidth + numberWidth;

        // Render € symbol and amount separately with proper spacing
        const startX = centerX - totalWidth / 2;
        doc.text(euroSymbol, startX, currentY);
        doc.text(amountNumber, startX + euroWidth, currentY);

        // Written amount for security (smaller, below)
        currentY += 20;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.setTextColor(...textGray);
        const writtenAmount = this.numberToGermanWords(data.amount);
        const writtenWidth = doc.getTextWidth(writtenAmount);
        doc.text(writtenAmount, centerX - writtenWidth / 2, currentY);

        // === PERSÖNLICHE NACHRICHT (direkt nach dem Betrag) ===
        if (data.message) {
            currentY += 35;

            // Elegant message section with accent color
            const messageBoxWidth = 160;
            const messageBoxX = centerX - messageBoxWidth / 2;

            // Title "Persönliche Nachricht" mit Icon
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(...textGray);
            const titleText = '💌 Persönliche Nachricht';
            const titleWidth = doc.getTextWidth(titleText);
            doc.text(titleText, centerX - titleWidth / 2, currentY);

            currentY += 15;

            // Message text with better formatting
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(11);
            doc.setTextColor(...primaryColor);

            const messageLines = doc.splitTextToSize(`"${data.message}"`, 140);
            const messageHeight = messageLines.length * 5;

            // Beautiful background with accent border
            doc.setFillColor(255, 250, 252); // Very light pink tint
            doc.setDrawColor(...accentColor);
            doc.setLineWidth(1);
            doc.roundedRect(messageBoxX, currentY - 10, messageBoxWidth, messageHeight + 20, 8, 8, 'FD');

            // Message text centered with proper spacing
            messageLines.forEach((line: string, index: number) => {
                const lineWidth = doc.getTextWidth(line);
                doc.text(line, centerX - lineWidth / 2, currentY + 2 + (index * 5));
            });

            // Signature line if it's a gift
            if (isGift) {
                currentY += messageHeight + 12;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
                doc.setTextColor(...textGray);
                const signatureText = `— ${data.senderName}`;
                const signatureWidth = doc.getTextWidth(signatureText);
                doc.text(signatureText, centerX + 50 - signatureWidth, currentY);
            }

            currentY += messageHeight + 30; // Mehr Abstand nach der Nachricht
        }

        // === CODE SECTION ===
        currentY += 30;

        // Code in elegant box
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        doc.setTextColor(...primaryColor);
        const codeText = data.voucherCode;
        const codeWidth = doc.getTextWidth(codeText);
        const boxWidth = codeWidth + 40;
        const boxHeight = 15;
        const boxX = centerX - boxWidth / 2;

        // Subtle background box
        doc.setFillColor(...lightGray);
        doc.roundedRect(boxX, currentY - 10, boxWidth, boxHeight, 3, 3, 'F');

        // Code text
        doc.text(codeText, centerX - codeWidth / 2, currentY);

        // === EXPIRY ===
        currentY += 35;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(...textGray);
        const expiryText = `Gültig bis ${new Date(data.expiresAt).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`;
        const expiryWidth = doc.getTextWidth(expiryText);
        doc.text(expiryText, centerX - expiryWidth / 2, currentY);

        // === FOOTER ===
        // Berechne verfügbaren Platz für Footer - mehr Platz lassen wenn Nachricht vorhanden
        const footerSpaceNeeded = data.message ? 80 : 50; // Mehr Platz für Nachrichten
        const minFooterSpace = pageHeight - footerSpaceNeeded;



        // Wenn der Content zu lang ist, positioniere Footer am unteren Rand
        if (currentY + 30 > minFooterSpace) {
            console.log('📄 Content too long, positioning footer at bottom of page');
            // Footer fest am unteren Rand positionieren - mehr Platz für Nachrichten
            const footerY = data.message ? pageHeight - 55 : pageHeight - 45;

            // Simple contact - using data from bankDetails
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9); // Kleinere Schrift für kompakten Footer
            doc.setTextColor(...textGray);

            const contactLines = [
                bankDetails.businessName || 'Skinlux Bischofshofen',
                `${bankDetails.streetAddress || 'Salzburger Straße 45'}, ${bankDetails.postalCode || '5500'} ${bankDetails.city || 'Bischofshofen'}`,
                `Tel: ${bankDetails.phone || '+43 123 456 789'} • ${bankDetails.email || 'hello@skinlux.at'}`
            ];

            contactLines.forEach((line, index) => {
                const lineWidth = doc.getTextWidth(line);
                doc.text(line, centerX - lineWidth / 2, footerY + (index * 4));
            });

            // Voucher ID at very bottom
            doc.setFontSize(7);
            doc.setTextColor(180, 180, 180);
            const voucherId = `ORD-${data.orderNumber}`;
            const idWidth = doc.getTextWidth(voucherId);
            doc.text(voucherId, centerX - idWidth / 2, pageHeight - 8);
        } else {
            // Normaler Footer mit Abstand zum Content
            currentY += 30;
            const footerY = currentY;

            // Simple contact - using data from bankDetails
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(...textGray);

            const contactLines = [
                bankDetails.businessName || 'Skinlux Bischofshofen',
                `${bankDetails.streetAddress || 'Salzburger Straße 45'}, ${bankDetails.postalCode || '5500'} ${bankDetails.city || 'Bischofshofen'}`,
                `Tel: ${bankDetails.phone || '+43 123 456 789'}`,
                `${bankDetails.email || 'hello@skinlux.at'} • ${bankDetails.website || 'skinlux.at'}`
            ];

            contactLines.forEach((line, index) => {
                const lineWidth = doc.getTextWidth(line);
                doc.text(line, centerX - lineWidth / 2, footerY + (index * 5));
            });

            // Voucher ID at very bottom
            doc.setFontSize(8);
            doc.setTextColor(180, 180, 180);
            const voucherId = `ORD-${data.orderNumber}`;
            const idWidth = doc.getTextWidth(voucherId);
            doc.text(voucherId, centerX - idWidth / 2, footerY + 25);
        }
    }

    // Helper function to convert numbers to German words
    private static numberToGermanWords(amount: number): string {
        // Handle common voucher amounts
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

        // Return known amount or fallback to numeric
        return commonAmounts[amount] || `${amount} Euro`;
    }
}
