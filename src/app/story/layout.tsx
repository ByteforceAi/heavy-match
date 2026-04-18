import type { Metadata } from "next";

/**
 * /story 전용 서버 레이아웃 — metadata 제공.
 * 루트 layout.tsx의 title template(`%s · 철연 CHEOLYEON`)과 결합되어
 * 최종 `철연 이야기 — 1998년 부산의 기록 · 철연 CHEOLYEON` 으로 렌더.
 *
 * heritage-v1.md §5 L3 노출 — 외부 공유 링크로 사용 가능.
 */

export const metadata: Metadata = {
  title: "철연 이야기 — 1998년 부산의 기록",
  description:
    "1998년 2월, 대한건설기계협회 부산지회 기종분과회 위원장 나철연이 부산일보에 실린다. 그의 요구는 제도로 응답받지 못한 채 28년이 지났다. 철연은 그의 이름을 따른다.",
  openGraph: {
    type: "article",
    title: "철연 이야기 — 1998년 부산의 기록",
    description:
      "1998년 부산일보 보도 · 기종분과회 위원장 나철연 · 사재 처분 · 28년 후 시스템으로.",
    url: "https://cheolyeon.com/story",
    siteName: "철연 CHEOLYEON",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "철연 CHEOLYEON — 1998년 부산의 기록",
      },
    ],
    publishedTime: "2026-04-18T00:00:00+09:00",
    authors: ["BYTEFORCE"],
  },
  twitter: {
    card: "summary_large_image",
    title: "철연 이야기 — 1998년 부산의 기록",
    description: "1998 → 2026. 28년 후 시스템으로.",
  },
  alternates: {
    canonical: "https://cheolyeon.com/story",
  },
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
