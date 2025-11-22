"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "../context/ToastContext";
import Providers from "../providers";
import {
  generateOrganizationSchema,
  generateSoftwareProductSchema,
} from "@/lib/seo";

const organizationSchema = generateOrganizationSchema();
const productSchema = generateSoftwareProductSchema();

// Combine schemas using Graph
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, productSchema],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="format-detection" content="telephone=no" />

        {/* Google Site Verification - Add your verification code here if needed */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Performance optimization styles */}
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
        <GoogleAnalytics />
        <Providers>
          <ThemeProvider
            enableSystem={true}
            attribute="class"
            defaultTheme="system"
          >
            <Header />
            <ToasterContext />
            {children}
            <Footer />
            <Chatbot />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
