"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import NewsWidget from "@/components/ui/NewsWidget";
import CookieBanner from "@/components/ui/CookieBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ConversionTracker from "@/components/analytics/ConversionTracker";

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/admin');

    if (isAdminRoute) {
        // Admin-Bereich: Keine Navigation, Footer oder Popups
        return (
            <div className="min-h-screen">
                {children}
            </div>
        );
    }

    // Normale Website: Mit Header, Footer
    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <NewsWidget />
            <ChatWidget />
            <CookieBanner />
            <GoogleAnalytics />
            <ConversionTracker />
        </>
    );
} 