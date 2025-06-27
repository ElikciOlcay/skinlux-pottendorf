import puppeteer from 'puppeteer';
import { VoucherEmailData } from './email';

export class PDFGenerator {
    // Generate a PDF voucher from HTML
    static async generateVoucherPDF(data: VoucherEmailData): Promise<Uint8Array> {
        let browser;

        try {
            console.log('🖨️ Starting PDF generation for voucher:', data.voucherCode);

            // Launch browser in headless mode
            browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu'
                ]
            });

            const page = await browser.newPage();

            // Set page size for print
            await page.setViewport({ width: 1200, height: 1600 });

            // Generate the print-optimized HTML
            const htmlContent = this.generatePrintVoucherHTML(data);

            // Set content and wait for fonts and images to load
            await page.setContent(htmlContent, {
                waitUntil: ['networkidle0', 'domcontentloaded']
            });

            // Generate PDF with print-optimized settings
            const pdfBuffer = await page.pdf({
                format: 'A4',
                margin: {
                    top: '20mm',
                    right: '15mm',
                    bottom: '20mm',
                    left: '15mm'
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

    // Generate print-optimized HTML for PDF - simplified version for now
    private static generatePrintVoucherHTML(data: VoucherEmailData): string {
        const recipientName = data.recipientName || data.senderName;
        const isGift = data.recipientName && data.recipientName !== data.senderName;

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Skinlux Gutschein - ${data.voucherCode}</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background: white;
                    color: #1f2937;
                    margin: 0;
                    padding: 20px;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .voucher-container {
                    max-width: 600px;
                    margin: 0 auto;
                    border: 2px solid #059669;
                    border-radius: 15px;
                    overflow: hidden;
                }
                
                .header {
                    background: #1f2937;
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                
                .logo {
                    font-size: 36px;
                    font-weight: bold;
                    letter-spacing: 3px;
                    margin-bottom: 10px;
                }
                
                .voucher-main {
                    background: #059669;
                    color: white;
                    padding: 40px;
                    text-align: center;
                }
                
                .voucher-amount {
                    font-size: 60px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                
                .voucher-code {
                    font-size: 24px;
                    font-weight: bold;
                    font-family: monospace;
                    background: rgba(255,255,255,0.2);
                    padding: 15px;
                    border-radius: 8px;
                    margin: 20px 0;
                    letter-spacing: 2px;
                }
                
                .info-section {
                    padding: 30px;
                    background: #f8fafc;
                }
                
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin: 20px 0;
                }
                
                .info-item {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    border: 1px solid #e5e7eb;
                }
                
                .instructions {
                    background: #eff6ff;
                    border: 2px solid #3b82f6;
                    border-radius: 10px;
                    padding: 20px;
                    margin: 20px 0;
                }
                
                .contact-section {
                    background: white;
                    padding: 30px;
                    text-align: center;
                    border-top: 1px solid #e5e7eb;
                }
            </style>
        </head>
        <body>
            <div class="voucher-container">
                <div class="header">
                    <div class="logo">SKINLUX</div>
                    <h2>${isGift ? `Geschenk für ${recipientName}` : 'Ihr Gutschein'}</h2>
                    <p>${isGift ? `Von ${data.senderName}` : 'Für strahlend schöne Haut'}</p>
                </div>
                
                <div class="voucher-main">
                    <h2>Skinlux Gutschein</h2>
                    <div class="voucher-amount">€${data.amount}</div>
                    <div class="voucher-code">${data.voucherCode}</div>
                    <p>Gültig bis: ${new Date(data.expiresAt).toLocaleDateString('de-DE')}</p>
                </div>
                
                <div class="info-section">
                    <h3>Gutschein-Details</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <strong>Inhaber</strong><br>
                            ${recipientName}
                        </div>
                        <div class="info-item">
                            <strong>Wert</strong><br>
                            €${data.amount}
                        </div>
                        <div class="info-item">
                            <strong>Code</strong><br>
                            ${data.voucherCode}
                        </div>
                        <div class="info-item">
                            <strong>Gültig bis</strong><br>
                            ${new Date(data.expiresAt).toLocaleDateString('de-DE')}
                        </div>
                    </div>
                    
                    ${data.message ? `
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
                        <h4>Persönliche Nachricht:</h4>
                        <p style="font-style: italic;">"${data.message}"</p>
                        ${isGift ? `<p style="text-align: right;">— ${data.senderName}</p>` : ''}
                    </div>
                    ` : ''}
                </div>
                
                <div class="instructions">
                    <h3>So lösen Sie Ihren Gutschein ein:</h3>
                    <ol>
                        <li>Termin buchen: Rufen Sie uns an oder besuchen Sie unsere Website</li>
                        <li>Behandlung auswählen: Wählen Sie Ihre gewünschte Behandlung</li>
                        <li>Gutschein vorzeigen: Bringen Sie diesen Gutschein mit</li>
                        <li>Genießen: Freuen Sie sich auf Ihre Behandlung!</li>
                    </ol>
                </div>
                
                <div class="contact-section">
                    <h3>Kontakt & Terminbuchung</h3>
                    <p><strong>Skinlux Bischofshofen</strong><br>
                    Salzburger Straße 45, 5500 Bischofshofen<br>
                    Telefon: +43 123 456 789<br>
                    E-Mail: hello@skinlux.at<br>
                    Website: skinlux.at</p>
                    
                    <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                        <h4>Wichtige Hinweise:</h4>
                        <ul style="text-align: left; display: inline-block;">
                            <li>Nicht mit anderen Aktionen kombinierbar</li>
                            <li>Keine Barauszahlung möglich</li>
                            <li>Bei Verlust nicht ersetzbar</li>
                            <li>Terminabsagen bis 24h vorher kostenfrei</li>
                        </ul>
                    </div>
                    
                    <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
                        Gutschein-ID: ${data.orderNumber} | Erstellt: ${new Date().toLocaleDateString('de-DE')}
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}
