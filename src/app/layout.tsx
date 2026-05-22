import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Credex AI Spend Audit | Optimize your SaaS stack",
  description: "Identify redundant tools, underutilized seats, and hidden savings in your AI subscription stack. Get a free, actionable audit in seconds.",
  openGraph: {
    title: "Credex AI Spend Audit",
    description: "Identify redundant tools, underutilized seats, and hidden savings in your AI subscription stack.",
    url: "https://ai-spend-audit.credex.com",
    siteName: "Credex AI Spend Audit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credex AI Spend Audit",
    description: "Identify redundant tools, underutilized seats, and hidden savings in your AI subscription stack.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
