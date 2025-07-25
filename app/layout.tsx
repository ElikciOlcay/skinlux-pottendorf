import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
