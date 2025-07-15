"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OfferPopup from "@/components/ui/OfferPopup";
import CookieBanner from "@/components/ui/CookieBanner";
import ChatWidget from "@/components/chat/ChatWidget";
import ColorPicker from "@/components/ui/ColorPicker";

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

    // Normale Website: Mit Header, Footer, Popups
    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <OfferPopup />
            <CookieBanner />
            <ChatWidget />
            <ColorPicker />
        </>
    );
} 