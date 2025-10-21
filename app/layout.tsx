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
    default:
      "Dental Tourism | Full-Stack Development, AI, and Digital Solutions",
    template: "%s | Dental Tourism",
  },
  description:
    "Dental Tourism specializes in crafting scalable software and digital products for startups and enterprises. We offer full-stack development (Next.js, MERN), UI/UX design, AI integration, and growth-focused digital marketing to help your business innovate and grow.",
  keywords: ["marketing", "SEO services", "startup tech partner"],
  authors: [{ name: "Dental Tourism Team" }],
  openGraph: {
    title: "Dental Tourism | Full-Stack Development, AI, and Digital Solutions",
    description:
      "Dental Tourism specializes in crafting scalable software and digital products for startups and enterprises. We offer full-stack development (Next.js, MERN), UI/UX design, AI integration, and growth-focused digital marketing.",
    url: "https://www.dentaltourism.com",
    siteName: "Dental Tourism",
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
    site: "@dentaltourismHQ", // if you have a Twitter handle
    creator: "@dentaltourismHQ",
    title: "Dental Tourism | Full-Stack Development, AI, and Digital Solutions",
    description:
      "Dental Tourism specializes in crafting scalable software and digital products for startups and enterprises. We offer full-stack development (Next.js, MERN), UI/UX design, AI integration, and growth-focused digital marketing.",
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
    "@type": "Organization",
    name: "Dental Tourism",
    url: "https://www.dentaltourism.com",
    logo: "https://www.dentaltourism.com/images/logo.png",
    sameAs: [
      "https://twitter.com/dentaltourismHQ", // Replace with your social profiles
      "https://www.linkedin.com/company/dentaltourism",
      // ... more social links
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-555-5555", // Replace with your phone number
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "en",
    },
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
          </RouteTransitionWrapper>
        </ClientProvider>
      </body>
    </html>
  );
}
