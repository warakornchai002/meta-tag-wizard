import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Meta Tag Wizard",
    template: "%s | Meta Tag Wizard",
  },
  description:
    "A polished metadata editor for SEO tags, Open Graph previews, Twitter cards, and crawler directives.",
  applicationName: "Meta Tag Wizard",
  keywords: [
    "meta tags",
    "seo",
    "open graph",
    "twitter card",
    "metadata generator",
    "html preview",
  ],
  authors: [{ name: "Meta Tag Wizard" }],
  creator: "Meta Tag Wizard",
  publisher: "Meta Tag Wizard",
  category: "Developer Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Meta Tag Wizard",
    description:
      "A polished metadata editor for SEO tags, Open Graph previews, Twitter cards, and crawler directives.",
    siteName: "Meta Tag Wizard",
    url: "/",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta Tag Wizard",
    description:
      "A polished metadata editor for SEO tags, Open Graph previews, Twitter cards, and crawler directives.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#05070c] text-neutral-100 antialiased">{children}</body>
    </html>
  );
}
