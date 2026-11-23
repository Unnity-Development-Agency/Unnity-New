import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "./site";
import Header from "./components/header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: { default: site.title, template: "%s | Unnity Media" },
  description: site.description,
  applicationName: site.name,
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } } : {}),
  robots: { index: !site.noindex, follow: true, googleBot: { index: !site.noindex, follow: true, "max-image-preview": "large" } },
  openGraph: { type: "website", locale: "en_US", siteName: site.name, title: site.title, description: site.description, ...(site.url ? { url: site.url } : {}) },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, ...(site.url ? { images: [`${site.url}/opengraph-image`] } : {}) },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><Header />{children}</body>
    </html>
  );
}
