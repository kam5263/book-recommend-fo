import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Book Recommendation",
  description: "AI Book Recommendation For BookClub",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AI Book Recommendation",
    description: "추천 알고리즘 기반의 북클럽용 AI 추천 서비스",
    url: "https://book-recommend-fo.vercel.app",
    siteName: "AI BookClub",
    images: [
      {
        url: "/og-image.jpg", // public에 넣으면 자동으로 제공됨
        width: 1200,
        height: 630,
        alt: "AI BookClub Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Book Recommendation",
    description: "AI 추천 기반 북클럽 콘텐츠",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
