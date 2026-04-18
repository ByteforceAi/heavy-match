import type { MetadataRoute } from "next";

/**
 * 철연 CHEOLYEON — sitemap.xml 자동 생성
 *
 * Next.js 16 App Router 파일 컨벤션. 빌드 시 `/sitemap.xml`로 노출.
 * 도메인이 `cheolyeon.com`으로 교체되면 layout.tsx의 `metadataBase`가
 * 여기 URL에 prefix로 자동 결합된다.
 *
 * 공개 라우트만 포함 — 인증 필요 대시보드(`/(dashboard)/*`, `/(auth)/*`)는 제외.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cheolyeon.com";
  const now = new Date();

  return [
    // ── 핵심 랜딩 ──
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // ── 철연 이야기 (L3 Heritage) ──
    {
      url: `${baseUrl}/story`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    // ── 데모 인트로 ──
    {
      url: `${baseUrl}/demo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/simulation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // ── 모바일 쇼케이스 ──
    {
      url: `${baseUrl}/demo/field-manager`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/demo/executive`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // ── 6역할 데모 ──
    ...["requester", "owner", "operator", "callcenter", "salesperson", "admin"].map(
      (role) => ({
        url: `${baseUrl}/demo/${role}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })
    ),
  ];
}
