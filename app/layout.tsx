import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // 👈 Import Script component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RouteTransitionWrapper from "./components/RouteTransitionWrapper";

import ClientProvider from "./ClientProvider";
import OffersStrip from "./components/OffersStrip";
import ToasterProvider from "./providers/ToastProvider";
import FloatingSocialButtons from "./components/FloatingSocialButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dental Tourism India | Find Top Dental Clinics & Dentists",
    template: "%s | Dental Tourism India",
  },
  description:
    "Find and book top-rated dental clinics and dentists in India. Get affordable, world-class dental care, including implants, braces, and cosmetic dentistry. Plan your dental tourism journey with us.",
  keywords: [
    "dental tourism india",
    "dental clinics in india",
    "best dentists in india",
    "affordable dental care india",
    "dental implants india",
    "cosmetic dentistry india",
  ],
  authors: [{ name: "Dental Tourism India Team" }],
  openGraph: {
    title: "Dental Tourism India | Find Top Dental Clinics & Dentists",
    description:
      "Find and book top-rated dental clinics and dentists in India. Get affordable, world-class dental care, including implants, braces, and cosmetic dentistry. Plan your dental tourism journey with us.",
    url: "https://www.dentaltourism.com",
    siteName: "Dental Tourism India",
    images: [
      {
        url: "https://www.dentaltourism.com/images/og-image.jpg", // A visually appealing image,image display when somebody share link on social media
        width: 1200,
        height: 630,
        alt: "Dental Tourism | Igniting Innovation with Scalable Code",
      },
      {
        url: "https://www.dentaltourism.com/images/og-image-alt.jpg",
        width: 1080,
        height: 1080,
        alt: "Dental Tourism - Building the Future of Web",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dentaltourismIN",
    creator: "@dentaltourismIN",
    title: "Dental Tourism India | Find Top Dental Clinics & Dentists",
    description:
      "Find and book top-rated dental clinics and dentists in India. Get affordable, world-class dental care, including implants, braces, and cosmetic dentistry. Plan your dental tourism journey with us.",
    images: ["https://www.dentaltourism.com/images/twitter-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Dental Tourism India",
    url: "https://www.dentaltourism.com",
    logo: "https://www.dentaltourism.com/images/logo.png",
    description:
      "Connecting international patients with top-rated dental clinics and dentists in India for affordable, high-quality dental care.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Dental Street",
      addressLocality: "Mumbai",
      addressRegion: "MH",
      postalCode: "400001",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-123-456-7890",
      contactType: "customer support",
      areaServed: "Worldwide",
      availableLanguage: ["en", "hi"],
    },
    sameAs: [
      "https://twitter.com/dentaltourismIN",
      "https://www.linkedin.com/company/dentaltourismindia",
    ],
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white dark:bg-black">
        <ClientProvider>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          <RouteTransitionWrapper>
            <ToasterProvider />
            <Navbar />
            <OffersStrip />
            {children}
            <Footer />
            <FloatingSocialButtons />
          </RouteTransitionWrapper>
        </ClientProvider>
      </body>
    </html>
  );
}
