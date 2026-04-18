import type { Metadata } from "next";

/**
 * /company 전용 서버 레이아웃 — metadata 제공.
 * 루트 layout.tsx의 title template(`%s · 철연 CHEOLYEON`)과 결합된다.
 *
 * BYTEFORCE 회사 소개 · 창업자 · 운영 원칙 · 연혁 공개 페이지.
 */

export const metadata: Metadata = {
  title: "회사 소개",
  description:
    "BYTEFORCE는 철연 CHEOLYEON을 운영하는 플랫폼 기업이다. 2024년 설립.",
  openGraph: {
    type: "website",
    title: "회사 소개 — BYTEFORCE",
    description:
      "BYTEFORCE는 철연 CHEOLYEON을 운영하는 플랫폼 기업이다. 2024년 설립.",
    url: "https://cheolyeon.com/company",
    siteName: "철연 CHEOLYEON",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BYTEFORCE — 철연 CHEOLYEON 운영사",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "회사 소개 — BYTEFORCE",
    description: "중장비 배차·계약·정산 통합 플랫폼 철연 CHEOLYEON 운영사.",
  },
  alternates: {
    canonical: "https://cheolyeon.com/company",
  },
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
