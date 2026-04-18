import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "철연 CHEOLYEON 개인정보처리방침. 이용자의 개인정보 수집·이용·보관·파기 원칙과 정보주체의 권리를 규정한다.",
  alternates: {
    canonical: "https://cheolyeon.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
