import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "도입 요금",
  description:
    "철연 CHEOLYEON 중장비 배차 플랫폼의 3-tier 요금제·국가별 가격·ROI 계산기.",
  alternates: { canonical: "https://cheolyeon.com/pricing" },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
