import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Skinlux Admin - Dashboard",
    description: "Administrationsbereich für Skinlux Gutschein-Verwaltung",
    robots: "noindex, nofollow", // Admin-Bereich soll nicht indexiert werden
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-gray-50">
            {/* Admin-spezifisches Layout ohne Website-Navigation */}
            {children}
        </div>
    );
} 