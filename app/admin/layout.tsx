"use client";

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de" className={inter.className}>
            <head>
                <title>Skinlux Admin</title>
                <meta name="description" content="Skinlux Admin Dashboard" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
                <div className="min-h-screen">
                    {children}
                </div>
            </body>
        </html>
    );
} 