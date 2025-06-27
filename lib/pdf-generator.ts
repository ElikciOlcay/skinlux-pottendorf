import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium';
import { VoucherEmailData } from './email';

export class PDFGenerator {
    // Generate a PDF voucher from HTML
    static async generateVoucherPDF(data: VoucherEmailData): Promise<Uint8Array> {
        console.log('🖨️ Starting PDF generation for voucher:', data.voucherCode);

        // Erster Versuch: Puppeteer mit Chromium
        try {
            return await this.generatePDFWithPuppeteer(data);
        } catch (puppeteerError) {
            console.warn('⚠️ Puppeteer PDF generation failed:', puppeteerError);

            // Zweiter Versuch: Fallback zu alternativer Methode
            try {
                return await this.generatePDFWithFallback(data);
            } catch (fallbackError) {
                console.error('❌ All PDF generation methods failed:', fallbackError);
                throw new Error(`PDF generation completely failed. Puppeteer: ${puppeteerError instanceof Error ? puppeteerError.message : 'Unknown error'}. Fallback: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`);
            }
        }
    }

    // Puppeteer-basierte PDF-Generierung
    private static async generatePDFWithPuppeteer(data: VoucherEmailData): Promise<Uint8Array> {
        let browser;

        try {
            console.log('🖨️ Attempting PDF generation with Puppeteer for voucher:', data.voucherCode);

            // Launch browser in headless mode (optimized for Vercel/serverless)
            const isProduction = process.env.NODE_ENV === 'production';
            const isVercel = process.env.VERCEL === '1';

            let launchOptions: any = {
                headless: true,
                timeout: 60000,
            };

            if (isProduction && isVercel) {
                // Vercel-optimierte Konfiguration mit verbesserter Fehlerbehandlung
                console.log('🌐 Vercel production environment detected');

                try {
                    // Versuche @sparticuz/chromium zu verwenden
                    console.log('📦 Attempting to configure @sparticuz/chromium...');

                    // Setze wichtige Flags für @sparticuz/chromium
                    await chromium.font('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                    const executablePath = await chromium.executablePath();
                    console.log('✅ Chromium executable found at:', executablePath);

                    launchOptions = {
                        headless: 'new' as const,
                        executablePath,
                        args: [
                            ...chromium.args,
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--disable-dev-shm-usage',
                            '--disable-accelerated-2d-canvas',
                            '--no-first-run',
                            '--no-zygote',
                            '--single-process',
                            '--disable-gpu',
                            '--disable-web-security',
                            '--disable-features=VizDisplayCompositor',
                            '--disable-extensions',
                            '--disable-default-apps',
                            '--disable-background-timer-throttling',
                            '--disable-backgrounding-occluded-windows',
                            '--disable-renderer-backgrounding',
                            '--disable-field-trial-config',
                            '--disable-ipc-flooding-protection'
                        ],
                        defaultViewport: { width: 1200, height: 1600 },
                        timeout: 60000,
                    };

                    console.log('📋 Using @sparticuz/chromium configuration with', launchOptions.args.length, 'arguments');

                } catch (chromiumError) {
                    console.warn('⚠️ @sparticuz/chromium failed, trying fallback:', chromiumError);

                    // Fallback-Konfiguration ohne @sparticuz/chromium
                    launchOptions = {
                        headless: true,
                        args: [
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--disable-dev-shm-usage',
                            '--disable-accelerated-2d-canvas',
                            '--no-first-run',
                            '--no-zygote',
                            '--single-process',
                            '--disable-gpu',
                            '--disable-web-security',
                            '--disable-features=VizDisplayCompositor',
                            '--disable-extensions',
                            '--disable-default-apps',
                            '--disable-background-timer-throttling',
                            '--disable-backgrounding-occluded-windows',
                            '--disable-renderer-backgrounding',
                            '--disable-field-trial-config',
                            '--disable-ipc-flooding-protection',
                            '--memory-pressure-off',
                            '--max_old_space_size=4096'
                        ],
                        timeout: 60000,
                    };
                    console.log('🔄 Using fallback configuration with', launchOptions.args.length, 'arguments');
                }
            } else {
                // Lokale Entwicklung
                console.log('🏠 Local development environment detected');
                launchOptions = {
                    headless: true,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-gpu',
                        '--disable-web-security',
                        '--disable-features=VizDisplayCompositor'
                    ],
                    timeout: 30000,
                };
            }

            console.log('🚀 Launching browser with configuration...');
            browser = await puppeteer.launch(launchOptions);
            console.log('✅ Browser launched successfully');

            const page = await browser.newPage();

            // Set page size for print - optimiert für bessere Performance
            await page.setViewport({ width: 1200, height: 1600 });

            // Setze User-Agent für bessere Kompatibilität
            await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

            // Generate the print-optimized HTML
            const htmlContent = this.generatePrintVoucherHTML(data);

            console.log('📄 Setting page content...');
            // Set content and wait for fonts and images to load - reduziertes Timeout für bessere Performance
            await page.setContent(htmlContent, {
                waitUntil: ['domcontentloaded'],
                timeout: 30000
            });

            // Warte kurz damit Fonts geladen werden
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('📋 Generating PDF...');
            // Generate PDF with A5 landscape settings
            const pdfBuffer = await page.pdf({
                width: '210mm',   // A5 landscape width
                height: '148mm',  // A5 landscape height
                margin: {
                    top: '10mm',
                    right: '12mm',
                    bottom: '10mm',
                    left: '12mm'
                },
                printBackground: true,
                preferCSSPageSize: true,
                timeout: 30000
            });

            console.log('✅ PDF generated successfully with Puppeteer, size:', pdfBuffer.length, 'bytes');

            return pdfBuffer;

        } catch (error) {
            console.error('❌ Puppeteer PDF generation failed:', error);

            // Detaillierte Fehlerberichterstattung
            if (error instanceof Error) {
                console.error('Error name:', error.name);
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
            }

            throw error;
        } finally {
            if (browser) {
                try {
                    await browser.close();
                    console.log('🔒 Browser closed successfully');
                } catch (closeError) {
                    console.warn('⚠️ Warning: Browser close failed:', closeError);
                }
            }
        }
    }

    // Fallback PDF-Generierung ohne Puppeteer
    private static async generatePDFWithFallback(data: VoucherEmailData): Promise<Uint8Array> {
        console.log('🔄 Attempting fallback PDF generation for voucher:', data.voucherCode);

        // Einfache Text-basierte PDF-Generierung als letzter Ausweg
        const { jsPDF } = await import('jspdf');

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [210, 148] // A5 landscape
        });

        const recipientName = data.recipientName || data.senderName;
        const isGift = data.recipientName && data.recipientName !== data.senderName;

        // Header
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('SKINLUX', 20, 30);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(isGift ? `Geschenk für ${recipientName}` : 'Gutschein', 20, 40);
        if (isGift) {
            doc.text(`Von ${data.senderName}`, 20, 46);
        }

        // Voucher Information
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('WERTGUTSCHEIN', 20, 65);

        doc.setFontSize(36);
        doc.text(`€${data.amount}`, 20, 85);

        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(`Code: ${data.voucherCode}`, 20, 100);
        doc.text(`Gültig bis: ${new Date(data.expiresAt).toLocaleDateString('de-DE')}`, 20, 110);

        // Personal Message
        if (data.message) {
            doc.setFontSize(10);
            doc.text('Nachricht:', 120, 65);
            const splitMessage = doc.splitTextToSize(`"${data.message}"`, 80);
            doc.text(splitMessage, 120, 75);
            if (isGift) {
                doc.text(`— ${data.senderName}`, 120, 75 + (splitMessage.length * 5) + 5);
            }
        }

        // Details
        doc.text('Details:', 120, 95);
        doc.text(`Begünstigter: ${recipientName}`, 120, 105);
        doc.text(`Gutschein-ID: ${data.orderNumber}`, 120, 115);

        // Footer
        doc.setFontSize(8);
        doc.text('Skinlux Bischofshofen', 20, 130);
        doc.text('Salzburger Straße 45, 5500 Bischofshofen', 20, 135);
        doc.text('Tel. +43 123 456 789 • hello@skinlux.at • skinlux.at', 20, 140);

        const pdfBytes = new Uint8Array(doc.output('arraybuffer'));

        console.log('✅ Fallback PDF generated successfully, size:', pdfBytes.length, 'bytes');

        return pdfBytes;
    }

    // Generate clean minimalist A5 landscape PDF
    private static generatePrintVoucherHTML(data: VoucherEmailData): string {
        const recipientName = data.recipientName || data.senderName;
        const isGift = data.recipientName && data.recipientName !== data.senderName;

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Skinlux Gutschein - ${data.voucherCode}</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    background: white;
                    color: #1a1a1a;
                    line-height: 1.5;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    width: 210mm;
                    height: 148mm;
                    padding: 0;
                    margin: 0;
                    overflow: hidden;
                }
                
                .voucher-container {
                    width: 100%;
                    height: 100%;
                    background: white;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    position: relative;
                }
                
                /* Linke Seite - Hauptinhalt */
                .main-content {
                    padding: 20mm 15mm 20mm 20mm;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background: white;
                }
                
                /* Rechte Seite - Details */
                .details-content {
                    padding: 20mm 20mm 20mm 15mm;
                    background: #fafafa;
                    border-left: 1px solid #e5e5e5;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                
                /* Header */
                .header {
                    margin-bottom: 15mm;
                }
                
                .logo {
                    font-size: 28px;
                    font-weight: 700;
                    letter-spacing: 4px;
                    color: #1a1a1a;
                    margin-bottom: 5mm;
                }
                
                .header-subtitle {
                    font-size: 14px;
                    font-weight: 400;
                    color: #666;
                    margin-bottom: 2mm;
                }
                
                .header-tagline {
                    font-size: 12px;
                    color: #999;
                    font-weight: 300;
                }
                
                /* Voucher Main */
                .voucher-main {
                    text-align: left;
                    margin-bottom: 15mm;
                }
                
                .voucher-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin-bottom: 8mm;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .voucher-amount {
                    font-size: 48px;
                    font-weight: 300;
                    color: #1a1a1a;
                    margin-bottom: 6mm;
                    line-height: 1;
                }
                
                .voucher-code {
                    font-family: 'Inter', monospace;
                    font-size: 16px;
                    font-weight: 500;
                    color: #1a1a1a;
                    padding: 8px 12px;
                    border: 1px solid #e5e5e5;
                    background: white;
                    border-radius: 4px;
                    letter-spacing: 2px;
                    display: inline-block;
                    margin-bottom: 6mm;
                }
                
                .validity-info {
                    font-size: 12px;
                    color: #666;
                    font-weight: 400;
                }
                
                /* Footer */
                .footer {
                    border-top: 1px solid #e5e5e5;
                    padding-top: 8mm;
                }
                
                .contact-info {
                    font-size: 11px;
                    line-height: 1.6;
                    color: #666;
                }
                
                .contact-info strong {
                    color: #1a1a1a;
                    font-weight: 600;
                }
                
                /* Details Section */
                .details-header {
                    margin-bottom: 12mm;
                }
                
                .details-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin-bottom: 8mm;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .detail-item {
                    margin-bottom: 6mm;
                    padding-bottom: 6mm;
                    border-bottom: 1px solid #e5e5e5;
                }
                
                .detail-item:last-child {
                    border-bottom: none;
                }
                
                .detail-label {
                    font-size: 10px;
                    font-weight: 500;
                    color: #666;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 2mm;
                }
                
                .detail-value {
                    font-size: 13px;
                    font-weight: 400;
                    color: #1a1a1a;
                    line-height: 1.4;
                }
                
                /* Personal Message */
                .personal-message {
                    margin: 8mm 0;
                    padding: 6mm;
                    background: white;
                    border-left: 2px solid #1a1a1a;
                    border-radius: 0 4px 4px 0;
                }
                
                .message-title {
                    font-size: 12px;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin-bottom: 3mm;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .message-text {
                    font-size: 11px;
                    font-style: italic;
                    color: #333;
                    line-height: 1.5;
                    margin-bottom: 3mm;
                }
                
                .message-signature {
                    text-align: right;
                    font-size: 10px;
                    color: #666;
                    font-weight: 400;
                }
                
                /* Terms */
                .terms {
                    margin-top: 8mm;
                    padding-top: 6mm;
                    border-top: 1px solid #e5e5e5;
                }
                
                .terms-title {
                    font-size: 11px;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin-bottom: 4mm;
                }
                
                .terms-list {
                    font-size: 9px;
                    color: #666;
                    line-height: 1.4;
                }
                
                .terms-list li {
                    margin-bottom: 2mm;
                    padding-left: 0;
                    list-style: none;
                    position: relative;
                }
                
                .terms-list li::before {
                    content: '•';
                    color: #999;
                    position: absolute;
                    left: -6px;
                }
                
                /* Instructions */
                .instructions {
                    margin: 8mm 0;
                }
                
                .instructions-title {
                    font-size: 12px;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin-bottom: 4mm;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .instructions ol {
                    counter-reset: step-counter;
                    list-style: none;
                    padding: 0;
                }
                
                .instructions ol li {
                    counter-increment: step-counter;
                    margin-bottom: 3mm;
                    padding-left: 20px;
                    position: relative;
                    font-size: 10px;
                    line-height: 1.4;
                    color: #333;
                }
                
                .instructions ol li::before {
                    content: counter(step-counter);
                    position: absolute;
                    left: 0;
                    top: 0;
                    background: #1a1a1a;
                    color: white;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 500;
                    font-size: 8px;
                }
                
                /* Footer ID */
                .footer-id {
                    font-size: 8px;
                    color: #999;
                    text-align: center;
                    margin-top: 6mm;
                    padding-top: 4mm;
                    border-top: 1px solid #f0f0f0;
                }
            </style>
        </head>
        <body>
            <div class="voucher-container">
                <!-- Linke Seite - Hauptinhalt -->
                <div class="main-content">
                    <div>
                        <div class="header">
                            <div class="logo">SKINLUX</div>
                            <div class="header-subtitle">${isGift ? `Geschenk für ${recipientName}` : 'Gutschein'}</div>
                            <div class="header-tagline">${isGift ? `Von ${data.senderName}` : 'Für strahlend schöne Haut'}</div>
                        </div>
                        
                        <div class="voucher-main">
                            <div class="voucher-title">Wertgutschein</div>
                            <div class="voucher-amount">€${data.amount}</div>
                            <div class="voucher-code">${data.voucherCode}</div>
                            <div class="validity-info">Gültig bis ${new Date(data.expiresAt).toLocaleDateString('de-DE')}</div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <div class="contact-info">
                            <strong>Skinlux Bischofshofen</strong><br>
                            Salzburger Straße 45, 5500 Bischofshofen<br>
                            Tel. <strong>+43 123 456 789</strong> • <strong>hello@skinlux.at</strong><br>
                            <strong>skinlux.at</strong>
                        </div>
                        <div class="footer-id">
                            Gutschein-ID: ${data.orderNumber} • ${new Date().toLocaleDateString('de-DE')}
                        </div>
                    </div>
                </div>
                
                <!-- Rechte Seite - Details -->
                <div class="details-content">
                    <div>
                        <div class="details-header">
                            <div class="details-title">Details</div>
                        </div>
                        
                        <div class="detail-item">
                            <div class="detail-label">Begünstigter</div>
                            <div class="detail-value">${recipientName}</div>
                        </div>
                        
                        <div class="detail-item">
                            <div class="detail-label">Gutscheinwert</div>
                            <div class="detail-value">€${data.amount}</div>
                        </div>
                        
                        <div class="detail-item">
                            <div class="detail-label">Code</div>
                            <div class="detail-value">${data.voucherCode}</div>
                        </div>
                        
                        <div class="detail-item">
                            <div class="detail-label">Gültig bis</div>
                            <div class="detail-value">${new Date(data.expiresAt).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</div>
                        </div>
                        
                        ${data.message ? `
                        <div class="personal-message">
                            <div class="message-title">Nachricht</div>
                            <div class="message-text">"${data.message}"</div>
                            ${isGift ? `<div class="message-signature">— ${data.senderName}</div>` : ''}
                        </div>
                        ` : ''}
                        
                        <div class="instructions">
                            <div class="instructions-title">Einlösung</div>
                            <ol>
                                <li>Termin vereinbaren</li>
                                <li>Behandlung wählen</li>
                                <li>Gutschein vorzeigen</li>
                                <li>Entspannen & genießen</li>
                            </ol>
                        </div>
                    </div>
                    
                    <div class="terms">
                        <div class="terms-title">Bedingungen</div>
                        <ul class="terms-list">
                            <li>Nicht mit anderen Aktionen kombinierbar</li>
                            <li>Keine Barauszahlung möglich</li>
                            <li>Bei Verlust nicht ersetzbar</li>
                            <li>Stornierung bis 24h vorher kostenfrei</li>
                        </ul>
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}
