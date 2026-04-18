/**
 * Schema.org JSON-LD structured data components.
 *
 * Google Rich Snippet + 지식그래프 연결용.
 * 검색 결과 CTR 30-40% 상승 기대치.
 *
 * 페이지별 사용:
 *   - / : <OrganizationSchema /> + <WebSiteSchema /> + <SoftwareApplicationSchema />
 *   - /story : <ArticleSchema />
 *   - /company : <OrganizationSchema detailed />
 *   - /blog/[...slug] : <BlogPostingSchema />
 *   - /pricing : <SoftwareApplicationSchema withOffers />
 *   - /cases/[a|b|c] : <ArticleSchema />
 *
 * 스펙: https://schema.org/
 * 검증: https://search.google.com/test/rich-results
 */

const BASE_URL = "https://cheolyeon.com";
const ORG_NAME = "BYTEFORCE";
const PRODUCT_NAME = "철연 CHEOLYEON";
const FOUNDER_NAME = "이한결";
const FOUNDED_YEAR = "2024";

// ═══════════════════════════════════════
// 기본 Organization 정보 (재사용)
// ═══════════════════════════════════════

const organizationBase = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: ORG_NAME,
  alternateName: "㈜바이트포스",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  foundingDate: FOUNDED_YEAR,
  founder: {
    "@type": "Person",
    name: FOUNDER_NAME,
    jobTitle: "Founder & CEO",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "오션타워 608호",
    addressLocality: "해운대구",
    addressRegion: "부산",
    addressCountry: "KR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "ceo@byteforce.ai.kr",
    contactType: "sales",
    availableLanguage: ["Korean", "English"],
  },
  sameAs: [
    `${BASE_URL}/company`,
    `${BASE_URL}/story`,
  ],
};

// ═══════════════════════════════════════
// Helper: JSON-LD script injection
// ═══════════════════════════════════════

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// ═══════════════════════════════════════
// 1. Organization
// ═══════════════════════════════════════

export function OrganizationSchema({ detailed = false }: { detailed?: boolean } = {}) {
  const data = detailed
    ? {
        "@context": "https://schema.org",
        ...organizationBase,
        description:
          "철연 CHEOLYEON은 ㈜바이트포스가 운영하는 중장비 배차·계약·정산 통합 플랫폼이다. 2024년 설립. 부산·울산·경남에서 파일럿 파트너 183사와 함께 운영 중.",
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 10,
        },
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: PRODUCT_NAME,
            applicationCategory: "BusinessApplication",
          },
        },
      }
    : {
        "@context": "https://schema.org",
        ...organizationBase,
      };

  return <JsonLd data={data} />;
}

// ═══════════════════════════════════════
// 2. WebSite (사이트 링크 Search Box 지원)
// ═══════════════════════════════════════

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: PRODUCT_NAME,
        description: "중장비 배차·계약·정산 통합 플랫폼",
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE_URL}/help?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
        inLanguage: "ko-KR",
      }}
    />
  );
}

// ═══════════════════════════════════════
// 3. SoftwareApplication (랜딩·Pricing 용)
// ═══════════════════════════════════════

export function SoftwareApplicationSchema({
  withOffers = false,
}: { withOffers?: boolean } = {}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/#software`,
    name: PRODUCT_NAME,
    alternateName: "철연",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web · iOS · Android",
    description:
      "중장비 배차·계약·정산 통합 플랫폼. 3단계 폴백 배차로 배차 실패를 없애고, 전자계약과 자동정산으로 현장의 대금을 지킨다.",
    url: BASE_URL,
    author: { "@id": `${BASE_URL}/#organization` },
    inLanguage: ["ko-KR", "en-US"],
    featureList: [
      "3단계 폴백 배차 (전용콜·콜센터·공유콜)",
      "전자계약 및 서명",
      "자동 정산 및 독촉",
      "6역할 대시보드",
      "실시간 수수료 분배",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "183",
      bestRating: "5",
    },
  };

  if (withOffers) {
    data.offers = [
      {
        "@type": "Offer",
        name: "Starter",
        price: "3900000",
        priceCurrency: "KRW",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "3900000",
          priceCurrency: "KRW",
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Growth",
        price: "7900000",
        priceCurrency: "KRW",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "7900000",
          priceCurrency: "KRW",
          unitText: "MONTH",
        },
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "80000000",
        priceCurrency: "KRW",
        availability: "https://schema.org/InStock",
      },
    ];
  }

  return <JsonLd data={data} />;
}

// ═══════════════════════════════════════
// 4. Article (heritage /story · cases)
// ═══════════════════════════════════════

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  urlPath: string; // "/story" or "/cases/a"
  datePublished: string; // ISO 8601
  dateModified?: string;
  imageUrl?: string;
  articleSection?: string;
}

export function ArticleSchema({
  headline,
  description,
  urlPath,
  datePublished,
  dateModified,
  imageUrl,
  articleSection,
}: ArticleSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        url: `${BASE_URL}${urlPath}`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}${urlPath}`,
        },
        image: imageUrl || `${BASE_URL}/og-image.png`,
        datePublished,
        dateModified: dateModified || datePublished,
        author: { "@id": `${BASE_URL}/#organization` },
        publisher: { "@id": `${BASE_URL}/#organization` },
        ...(articleSection && { articleSection }),
        inLanguage: "ko-KR",
      }}
    />
  );
}

// ═══════════════════════════════════════
// 5. BlogPosting (각 /blog/[...slug])
// ═══════════════════════════════════════

export interface BlogPostingSchemaProps {
  headline: string;
  description: string;
  urlPath: string;
  datePublished: string;
  dateModified?: string;
  author: { name: string; role?: string };
  readingTime?: number; // minutes
  keywords?: string[];
  articleSection?: string;
  imageUrl?: string;
}

export function BlogPostingSchema({
  headline,
  description,
  urlPath,
  datePublished,
  dateModified,
  author,
  readingTime,
  keywords,
  articleSection,
  imageUrl,
}: BlogPostingSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline,
        description,
        url: `${BASE_URL}${urlPath}`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}${urlPath}`,
        },
        image: imageUrl || `${BASE_URL}/og-image.png`,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          "@type": "Person",
          name: author.name,
          ...(author.role && { jobTitle: author.role }),
          worksFor: { "@id": `${BASE_URL}/#organization` },
        },
        publisher: { "@id": `${BASE_URL}/#organization` },
        ...(readingTime && {
          timeRequired: `PT${readingTime}M`,
        }),
        ...(keywords && keywords.length > 0 && {
          keywords: keywords.join(", "),
        }),
        ...(articleSection && { articleSection }),
        inLanguage: "ko-KR",
      }}
    />
  );
}

// ═══════════════════════════════════════
// 6. Breadcrumb (모든 심층 페이지)
// ═══════════════════════════════════════

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          item: `${BASE_URL}${item.href}`,
        })),
      }}
    />
  );
}

// ═══════════════════════════════════════
// 7. FAQPage (랜딩 FAQ 섹션)
// ═══════════════════════════════════════

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPageSchema({ items }: { items: FAQItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      }}
    />
  );
}
