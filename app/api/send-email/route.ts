import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { to, subject, template, data } = body;

        // In Produktion: Verwenden Sie einen E-Mail-Service wie SendGrid, Resend, etc.
        // Beispiel mit SendGrid:
        /*
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const msg = {
          to,
          from: 'noreply@skinlux.at',
          subject,
          html: generateEmailTemplate(template, data),
        };
        
        await sgMail.send(msg);
        */

        // Für jetzt: Log die E-Mail (in Produktion entfernen!)
        console.log('E-Mail würde gesendet werden:', {
            to,
            subject,
            template,
            data
        });

        // Simuliere E-Mail-Versand
        if (template === 'password-reset') {
            console.log(`
        ========================================
        PASSWORT-RESET E-MAIL
        ========================================
        An: ${to}
        Betreff: ${subject}
        
        Hallo ${data.email},
        
        Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt.
        
        Klicken Sie auf den folgenden Link, um Ihr Passwort zurückzusetzen:
        ${data.resetLink}
        
        Der Link ist 30 Minuten gültig.
        
        Falls Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail.
        
        Mit freundlichen Grüßen,
        Ihr Skinlux Team
        ========================================
      `);
        }

        return NextResponse.json({
            success: true,
            message: 'E-Mail wurde gesendet (Simulation in Entwicklung)'
        });

    } catch (error: any) {
        console.error('E-Mail Fehler:', error);
        return NextResponse.json(
            { error: 'Fehler beim Senden der E-Mail' },
            { status: 500 }
        );
    }
}

// E-Mail-Template Generator (in Produktion ausbauen)
function generateEmailTemplate(template: string, data: any): string {
    switch (template) {
        case 'password-reset':
            return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f4f4f4; }
            .button { display: inline-block; padding: 12px 24px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Skinlux Admin</h1>
            </div>
            <div class="content">
              <h2>Passwort zurücksetzen</h2>
              <p>Hallo ${data.email},</p>
              <p>Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt.</p>
              <p>Klicken Sie auf den folgenden Button, um Ihr Passwort zurückzusetzen:</p>
              <a href="${data.resetLink}" class="button">Passwort zurücksetzen</a>
              <p>Oder kopieren Sie diesen Link in Ihren Browser:</p>
              <p style="word-break: break-all;">${data.resetLink}</p>
              <p><strong>Dieser Link ist 30 Minuten gültig.</strong></p>
              <p>Falls Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail bitte.</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Skinlux. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
        </html>
      `;

        default:
            return '';
    }
} 