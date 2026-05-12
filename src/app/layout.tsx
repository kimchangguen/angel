import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FloatingMenu from "@/components/FloatingMenu";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "유진천사620 | 유품정리 전문",
  description: "따뜻하고 신속한 유품정리 서비스, 유진천사620",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-noto-sans-kr)]">
        <Header />
        <main className="flex-1">{children}</main>
        <FloatingMenu />
      </body>
    </html>
  );
}
