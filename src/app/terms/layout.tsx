import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "철연 CHEOLYEON 서비스 이용약관. 중장비 배차·계약·정산 통합 플랫폼의 이용 조건과 권리·의무를 규정한다.",
  alternates: {
    canonical: "https://cheolyeon.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
