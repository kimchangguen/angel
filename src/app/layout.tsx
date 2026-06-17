import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingMenu from "@/components/FloatingMenu";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const BASE_URL = "https://www.eugeneangel.com";

export const metadata: Metadata = {
  // ── 기본 메타 ──
  metadataBase: new URL(BASE_URL),
  title: {
    default: "유진천사620 | 유품정리·특수청소 전문",
    template: "%s | 유진천사620",
  },
  description:
    "유품정리·특수청소 전문 유진천사620. 고인의 마지막을 정성껏 정리하고, 남겨진 분들의 마음까지 헤아립니다. 24시간 상담, 전국 출장 서비스.",
  keywords: [
    "유품정리",
    "특수청소",
    "유진천사620",
    "유품정리 전문",
    "고인 유품",
    "쓰레기집 청소",
    "특수청소 업체",
    "유품정리 업체",
    "유품 처리",
    "폐기물 처리",
    "24시간 유품정리",
  ],
  authors: [{ name: "유진천사620" }],
  creator: "유진천사620",
  publisher: "유진천사620",

  // ── Canonical URL ──
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": `${BASE_URL}/rss.xml`,
    },
  },

  // ── Open Graph ──
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "유진천사620",
    title: "유진천사620 | 유품정리·특수청소 전문",
    description:
      "고인의 마지막을 정성껏 정리하고, 남겨진 분들의 마음까지 헤아립니다. 유품정리·특수청소 전문 유진천사620.",
    images: [
      {
        url: `${BASE_URL}/image/hero%20(1).png`,
        width: 1200,
        height: 630,
        alt: "유진천사620 - 유품정리·특수청소 전문",
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: "summary_large_image",
    title: "유진천사620 | 유품정리·특수청소 전문",
    description:
      "고인의 마지막을 정성껏 정리하고, 남겨진 분들의 마음까지 헤아립니다. 유품정리·특수청소 전문 유진천사620.",
    images: [`${BASE_URL}/image/hero%20(1).png`],
  },

  // ── Robots ──
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

  // ── 기타 ──
  verification: {},
  category: "유품정리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="유진천사620 블로그 RSS"
          href="/rss.xml"
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-noto-sans-kr)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingMenu />
      </body>
    </html>
  );
}
