import type { Metadata } from "next";

/**
 * 철연 CHEOLYEON — 내부 쇼케이스 라우트
 *
 * 이 트리 하위 페이지는 검색 엔진 노출을 차단한다.
 * robots.index: false 로 색인을 막고, 사이트맵에도 등재하지 않는다.
 * 접근은 개발자 내부 링크로만 이뤄진다.
 */
export const metadata: Metadata = {
  title: "Internal Showcase",
  robots: { index: false, follow: false },
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
