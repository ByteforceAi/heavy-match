import type { MetadataRoute } from "next";

/**
 * 철연 CHEOLYEON — robots.txt 자동 생성
 *
 * 공개 마케팅 표면은 전체 인덱싱 허용. 인증 필요 대시보드 +
 * API 엔드포인트 + 내부 페이지는 차단.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://cheolyeon.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/story",
          "/demo",
          "/demo/simulation",
          "/demo/field-manager",
          "/demo/executive",
        ],
        disallow: [
          "/api/",
          "/login",
          "/register",
          "/requester/",
          "/owner/",
          "/operator/",
          "/callcenter/",
          "/salesperson/",
          "/admin/",
          "/call/",
        ],
      },
      // GoogleBot은 풀 인덱싱 허용, 민감 경로만 차단
      {
        userAgent: "Googlebot",
        allow: ["/", "/demo"],
        disallow: ["/api/", "/*?*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
