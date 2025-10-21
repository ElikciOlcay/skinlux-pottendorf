import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalLayout from "../components/layout/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skinlux - Laser Haarentfernung & Kosmetik in Pottendorf",
  description: "Professionelle Laser-Haarentfernung und innovative Kosmetikbehandlungen in Pottendorf. HydraFacial®, Premium Facials und mehr.",
  keywords: "Laser Haarentfernung, Pottendorf, Baden, Niederösterreich, dauerhafte Haarentfernung, Skinlux",
  openGraph: {
    title: "Skinlux - Laser Haarentfernung in Pottendorf",
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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N76BWEKEH9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N76BWEKEH9');
          `}
        </Script>

        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
