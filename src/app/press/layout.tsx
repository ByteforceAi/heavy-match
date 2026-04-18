import type { Metadata } from "next";

/**
 * /press 전용 서버 레이아웃 — metadata 제공.
 * 루트 layout.tsx의 title template(`%s · 철연 CHEOLYEON`)과 결합된다.
 *
 * 언론·IR·제휴 검토용 공식 자료실.
 */

export const metadata: Metadata = {
  title: "프레스킷",
  description:
    "철연 CHEOLYEON 공식 보도 자료 · 로고 · 브랜드 컬러 · 스크린샷.",
  openGraph: {
    type: "website",
    title: "프레스킷 — 철연 CHEOLYEON",
    description:
      "철연 CHEOLYEON 공식 보도 자료 · 로고 · 브랜드 컬러 · 스크린샷.",
    url: "https://cheolyeon.com/press",
    siteName: "철연 CHEOLYEON",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "철연 CHEOLYEON 프레스킷",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "프레스킷 — 철연 CHEOLYEON",
    description: "기사 작성·IR·제휴 검토용 공식 자료.",
  },
  alternates: {
    canonical: "https://cheolyeon.com/press",
  },
};

export default function PressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
