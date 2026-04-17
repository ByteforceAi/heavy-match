import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ═══════════════════════════════════════
// Fonts — next/font로 FOIT/FOUT 방지, 자동 preload
// ═══════════════════════════════════════
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Heavy Match — 중장비 배차 매칭",
  description: "중장비를 요청하는 건설사와 중장비를 임대하는 업체를 실시간으로 매칭하는 B2B 중개 플랫폼",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Heavy Match",
  },
  formatDetection: {
    telephone: true, // 전화번호 자동 링크 허용
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0059b9",
  viewportFit: "cover", // Safe Area 지원 — env() 사용 가능하게
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col overscroll-none" id="main-content">
        {children}
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}` }} />
      </body>
    </html>
  );
}
