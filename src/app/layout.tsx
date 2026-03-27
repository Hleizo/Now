import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Now - Jordan's Smart Marketplace",
  description: "Shop smarter with Now. Jordan's trusted marketplace for electronics, fashion, home goods, and more. Fast delivery, great prices, amazing deals.",
  keywords: ["ecommerce", "online shopping", "Jordan", "marketplace", "electronics", "fashion", "deals", "free delivery"],
  authors: [{ name: "Now" }],
  openGraph: {
    title: "Now - Jordan's Smart Marketplace",
    description: "Shop smarter with Now. Jordan's trusted marketplace for everything you need.",
    type: "website",
    locale: "en_US",
    siteName: "Now",
  },
  twitter: {
    card: "summary_large_image",
    title: "Now - Jordan's Smart Marketplace",
    description: "Shop smarter with Now. Jordan's trusted marketplace for everything you need.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1F3B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased min-h-screen bg-surface text-text-primary">
        {children}
      </body>
    </html>
  );
}
