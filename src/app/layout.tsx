import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  themeColor: "#1E40AF",
  viewportFit: "cover", // Safe Area 지원 — env() 사용 가능하게
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="min-h-full flex flex-col overscroll-none">{children}</body>
    </html>
  );
}
