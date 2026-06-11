import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_KR, Roboto_Mono } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@/components/analytics/Analytics";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";

// ═══════════════════════════════════════
// Fonts — next/font 자동 preload + FOIT 방지
// v3: Pretendard Variable (공식 동적 서브셋 CDN, head <link>)
//     + IBM Plex Sans KR + Roboto Mono (next/font)
//
// Pretendard는 Google Fonts 미제공. 구 noonfonts CDN은 800/900이 404라
// 디스플레이 웨이트가 한 번도 렌더되지 않았다 — 공식 Variable(45~920)로 교체.
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
  // 확대 허용 — WCAG 1.4.4. 40~60대 현장 사용자가 핵심 타깃이므로
  // 핀치 줌을 막지 않는다 (입력 자동 줌은 globals.css의 16px 규칙으로 방지).
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
        {/* Pretendard Variable — 동적 서브셋 (한글 2,574자 분할 로딩, weight 45~920) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* id="main-content"는 각 레이아웃의 <main>에 둔다 — SkipLink가 nav를 실제로 건너뛰도록 */}
      <body className="min-h-full flex flex-col overscroll-none">
        {children}
        {/* Analytics — GA4 · Naver · PostHog 3중 스택.
            각 스크립트는 NEXT_PUBLIC_*_ID 환경 변수가 설정된 경우에만 로드된다. */}
        <Analytics />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <ConsentBanner />
        <Script id="sw-register" strategy="afterInteractive">
          {`if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`}
        </Script>
      </body>
    </html>
  );
}
