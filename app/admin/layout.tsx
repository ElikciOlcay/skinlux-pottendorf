"use client";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
            {children}
        </div>
    );
} 