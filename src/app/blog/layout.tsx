import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그",
  description: "철연 CHEOLYEON 업계 동향·도입 가이드·기술 바닥 기록.",
  alternates: { canonical: "https://cheolyeon.com/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
