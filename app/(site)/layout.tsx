"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "../context/ToastContext";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MonkDB",
  applicationCategory: "Database",
  operatingSystem: "All",
  description:
    "MonkDB is an AI-Native Unified Database that supports Vector, Time-Series, Geo-Spatial, Blob Store, Document, Full-Text Search, and Streaming SQL capabilities.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  provider: {
    "@type": "Organization",
    name: "Movibase",
    url: "https://Movibase.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Add preconnect for third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/critical-styles.css" as="style" />
        {/* Add this style to fix animation performance */}
        <style jsx global>{`
          .use-gpu {
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </head>
      <body
        className={`bg-gradient-to-b from-white via-[#F6F9FC] to-[#EDF2F7] dark:bg-gradient-to-b dark:from-[#041521] dark:to-[#02080D] ${inter.className}`}
        suppressHydrationWarning
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          defaultTheme="system"
        >
          <Header />
          <ToasterContext />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
