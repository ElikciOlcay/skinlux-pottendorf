import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || '';
const ACCESS_TOKEN = process.env.META_CONVERSION_API_TOKEN || '';
const API_VERSION = 'v21.0';

// Hash function für sensible Daten
function hashData(data: string): string {
    return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { eventName, eventData, userData } = body;

        if (!PIXEL_ID || !ACCESS_TOKEN) {
            return NextResponse.json(
                { error: 'Meta Pixel ID oder Access Token nicht konfiguriert' },
                { status: 500 }
            );
        }

        // Event-Zeit in Unix-Timestamp
        const eventTime = Math.floor(Date.now() / 1000);

        // User-Daten hashen
        const hashedUserData: Record<string, unknown> = {};

        if (userData?.email) {
            hashedUserData.em = [hashData(userData.email)];
        }
        if (userData?.phone) {
            hashedUserData.ph = [hashData(userData.phone)];
        }
        if (userData?.firstName) {
            hashedUserData.fn = [hashData(userData.firstName)];
        }
        if (userData?.lastName) {
            hashedUserData.ln = [hashData(userData.lastName)];
        }
        if (userData?.city) {
            hashedUserData.ct = [hashData(userData.city)];
        }
        if (userData?.state) {
            hashedUserData.st = [hashData(userData.state)];
        }
        if (userData?.zipCode) {
            hashedUserData.zp = [hashData(userData.zipCode)];
        }
        if (userData?.country) {
            hashedUserData.country = [hashData(userData.country)];
        }

        // Client-Informationen (nicht gehasht)
        const headers = request.headers;
        hashedUserData.client_ip_address = headers.get('x-forwarded-for') || headers.get('x-real-ip') || '';
        hashedUserData.client_user_agent = headers.get('user-agent') || '';

        // FBC und FBP Cookies
        const cookies = headers.get('cookie') || '';
        const fbcMatch = cookies.match(/_fbc=([^;]+)/);
        const fbpMatch = cookies.match(/_fbp=([^;]+)/);

        if (fbcMatch) {
            hashedUserData.fbc = fbcMatch[1];
        }
        if (fbpMatch) {
            hashedUserData.fbp = fbpMatch[1];
        }

        // Event-ID für Deduplizierung
        const eventId = crypto.randomBytes(16).toString('hex');

        // Payload erstellen
        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: eventTime,
                    event_source_url: eventData?.sourceUrl || request.headers.get('referer') || '',
                    action_source: 'website',
                    event_id: eventId,
                    user_data: hashedUserData,
                    custom_data: eventData?.customData || {}
                }
            ]
        };

        // An Meta Conversions API senden
        const response = await fetch(
            `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...payload,
                    access_token: ACCESS_TOKEN
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error('Meta Conversions API Error:', result);
            return NextResponse.json(
                { error: 'Fehler beim Senden an Meta', details: result },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            eventId,
            result
        });

    } catch (error) {
        console.error('Meta Conversions API Error:', error);
        return NextResponse.json(
            { error: 'Interner Server-Fehler' },
            { status: 500 }
        );
    }
}

