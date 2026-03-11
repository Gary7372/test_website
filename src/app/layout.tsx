import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { BrandingElements } from "@/components/BrandingElements";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GuluGulu Pics",
  description: "We click memories. Baby and family photography studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased font-sans`}
      >
        <SmoothScroll>
          <BrandingElements />
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
