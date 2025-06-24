import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OfferPopup from "@/components/ui/OfferPopup";
import CookieBanner from "@/components/ui/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skinlux - Laser Haarentfernung & Kosmetik in Bischofshofen",
  description: "Professionelle Laser-Haarentfernung und innovative Kosmetikbehandlungen in Bischofshofen. HydraFacial®, Hautanalyse und mehr.",
  keywords: "Laser Haarentfernung, Bischofshofen, Pongau, dauerhafte Haarentfernung, Skinlux",
  openGraph: {
    title: "Skinlux - Laser Haarentfernung in Bischofshofen",
    description: "Professionelle Laser-Haarentfernung für dauerhafte Haarfreiheit",
    images: ["/og-image.jpg"],
    locale: "de_AT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${inter.className} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <OfferPopup />
        <CookieBanner />
      </body>
    </html>
  );
}
