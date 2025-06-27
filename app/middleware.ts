import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const host = request.headers.get('host') || '';
    // Entferne Port, falls vorhanden (z.B. localhost:3000)
    const cleanHost = host.split(':')[0];
    // Subdomain extrahieren (z.B. bischofshofen.skinlux.at)
    const parts = cleanHost.split('.');
    let subdomain = '';
    if (parts.length > 2) {
        subdomain = parts[0];
    }

    // Admin-Routen Schutz (vereinfacht - echte Auth-Prüfung erfolgt client-seitig)
    if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.endsWith('/admin')) {
        // Session-Cookie prüfen
        const sessionCookie = request.cookies.get('skinlux_admin_session')?.value;
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    // Header setzen
    const response = NextResponse.next();
    response.headers.set('x-studio-subdomain', subdomain);
    return response;
}

export const config = {
    matcher: [
        /* alle Seiten außer statische Assets */
        '/((?!_next|favicon.ico|images|api|public).*)',
    ],
}; 