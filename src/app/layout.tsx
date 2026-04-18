import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_KR, Roboto_Mono } from "next/font/google";
import "./globals.css";

// ═══════════════════════════════════════
// Fonts — next/font 자동 preload + FOIT 방지
// v2: Pretendard (CDN @font-face in globals.css) + IBM Plex Sans KR + Roboto Mono
//
// Pretendard는 Google Fonts 미제공이라 globals.css의 @font-face로 CDN 로딩.
// IBM Plex와 Roboto Mono는 next/font로 최적화 preload.
// ═══════════════════════════════════════

const plexKr = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-kr",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
});

// ═══════════════════════════════════════
// SEO — 철연 CHEOLYEON 브랜드 표면
// heritage-v1.md §2.3 tagline 반영
// ═══════════════════════════════════════
export const metadata: Metadata = {
  metadataBase: new URL("https://cheolyeon.com"),
  title: {
    default: "철연 CHEOLYEON — 중장비 배차·계약·정산 통합 플랫폼",
    template: "%s · 철연 CHEOLYEON",
  },
  description:
    "전용콜부터 공유콜까지 3단계 폴백으로 배차 실패를 없애고, 전자계약과 자동정산으로 현장의 대금을 지킨다. 1998년 부산의 요구를 2026년의 시스템으로 이어받는다.",
  applicationName: "철연 CHEOLYEON",
  authors: [{ name: "BYTEFORCE", url: "https://cheolyeon.com" }],
  creator: "BYTEFORCE",
  publisher: "BYTEFORCE",
  keywords: [
    "중장비 배차",
    "건설기계 플랫폼",
    "전자계약",
    "자동정산",
    "철연",
    "CHEOLYEON",
    "BYTEFORCE",
    "3단계 폴백 배차",
    "전용콜",
    "공유콜",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "철연",
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://cheolyeon.com",
    siteName: "철연 CHEOLYEON",
    title: "철연 CHEOLYEON — 중장비 배차·계약·정산 통합 플랫폼",
    description:
      "1998년 부산의 요구를 2026년의 시스템으로 이어받는다. 3단계 폴백 배차 + 전자계약 + 자동정산.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "철연 CHEOLYEON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "철연 CHEOLYEON — 중장비 통합 플랫폼",
    description: "3단계 폴백 배차 · 전자계약 · 자동정산. 운영: BYTEFORCE.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#002C5F",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`h-full ${plexKr.variable} ${robotoMono.variable}`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col overscroll-none" id="main-content">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
      </body>
    </html>
  );
}
