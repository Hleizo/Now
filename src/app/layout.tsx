import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Now - Shop Smarter, Live Better",
  description: "Your one-stop destination for electronics, fashion, home goods, and more. Fast delivery, great prices, and amazing deals every day.",
  keywords: ["ecommerce", "online shopping", "electronics", "fashion", "deals", "free delivery"],
  authors: [{ name: "Now" }],
  openGraph: {
    title: "Now - Shop Smarter, Live Better",
    description: "Your one-stop destination for electronics, fashion, home goods, and more.",
    type: "website",
    locale: "en_US",
    siteName: "Now",
  },
  twitter: {
    card: "summary_large_image",
    title: "Now - Shop Smarter, Live Better",
    description: "Your one-stop destination for electronics, fashion, home goods, and more.",
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
  themeColor: "#FF6B35",
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
      <body className="antialiased min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
