import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium';
import { VoucherEmailData } from './email';

export class PDFGenerator {
    // Generate a PDF voucher from HTML
    static async generateVoucherPDF(data: VoucherEmailData): Promise<Uint8Array> {
        let browser;

        try {
            console.log('🖨️ Starting PDF generation for voucher:', data.voucherCode);

            // Launch browser in headless mode (optimized for Vercel/serverless)
            const isProduction = process.env.NODE_ENV === 'production';
            const isVercel = process.env.VERCEL === '1';

            let executablePath;
            let args;

            if (isProduction && isVercel) {
                // Vercel-optimierte Konfiguration
                console.log('🌐 Vercel production environment detected');
                try {
                    console.log('📦 Attempting to get chromium executable path...');
                    executablePath = await chromium.executablePath();
                    console.log('✅ Chromium executable found:', executablePath);
                    args = [
                        ...chromium.args,
                        '--single-process',
                        '--no-zygote',
                        '--disable-dev-shm-usage'
                    ];
                    console.log('📋 Using chromium args:', args.length, 'arguments');
                } catch (error) {
                    console.warn('⚠️ Chromium setup failed, using fallback:', error);
                    // Fallback auf Standard Chrome/Chromium
                    executablePath = undefined;
                    args = [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-gpu',
                        '--disable-web-security',
                        '--disable-features=VizDisplayCompositor',
                        '--no-first-run',
                        '--no-zygote',
                        '--single-process',
                        '--disable-extensions',
                        '--disable-default-apps'
                    ];
                    console.log('🔄 Using fallback args:', args.length, 'arguments');
                }
            } else {
                // Lokale Entwicklung
                executablePath = undefined;
                args = [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-extensions',
                    '--disable-default-apps'
                ];
            }

            browser = await puppeteer.launch({
                headless: true,
                executablePath,
                args
            });

            console.log('🖨️ Browser launched successfully');

            const page = await browser.newPage();

            // Set page size for print
            await page.setViewport({ width: 1200, height: 1600 });

            // Generate the print-optimized HTML
            const htmlContent = this.generatePrintVoucherHTML(data);

            // Set content and wait for fonts and images to load
            await page.setContent(htmlContent, {
                waitUntil: ['networkidle0', 'domcontentloaded']
            });

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
                preferCSSPageSize: true
            });

            console.log('✅ PDF generated successfully, size:', pdfBuffer.length, 'bytes');

            return pdfBuffer;

        } catch (error) {
            console.error('❌ PDF generation failed:', error);
            throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            if (browser) {
                await browser.close();
            }
        }
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
