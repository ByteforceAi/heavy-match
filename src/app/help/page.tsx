"use client";

/**
 * 철연 CHEOLYEON — Help Center 인덱스 (/help)
 *
 * heritage-v1.md §3 금지 카피 · §4 허용 구조 준수.
 * 내러티브 본문은 판결문 어미(~한다/~된다). 인터랙션 라벨은 존댓말 허용.
 *
 * 구조:
 *   1. Nav (landing 동일 패턴)
 *   2. Hero + 문서 검색 (client-side filter)
 *   3. 6-category grid
 *   4. Recent/Popular 아티클 카드
 *   5. Contact support CTA
 *   6. Footer
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  MotionCard,
} from "@/components/motion/MotionPrimitives";
import * as copy from "@/content/copy";
import {
  helpCategories,
  helpArticles,
  getArticlesByCategory,
  type HelpCategoryMeta,
  type HelpArticle,
} from "@/content/help-articles";

export default function HelpCenterPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily:
          "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <HelpNav />
      <HelpHero />
      <CategoryGrid />
      <PopularArticles />
      <ContactSupport />
      <HelpFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// NAV (landing 동일 패턴)
// ═══════════════════════════════════════
function HelpNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6 md:gap-12"
      style={{ backdropFilter: "blur(12px) saturate(180%)" }}
    >
      <Link
        href="/"
        className="flex items-baseline gap-2.5"
        aria-label="철연 홈"
      >
        <span
          className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif",
          }}
        >
          {copy.nav.brand.ko}
        </span>
        <span
          className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {copy.nav.brand.en}
        </span>
      </Link>

      <ul className="hidden md:flex gap-7 flex-1 list-none m-0 p-0">
        {copy.nav.menu.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[14px] font-medium text-[#3A4A5F] hover:text-[#002C5F] transition-colors py-1"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex gap-2.5 ml-auto">
        <Link
          href="/login"
          className="hidden sm:inline-flex items-center px-4 py-2 text-[13px] font-medium text-[#3A4A5F] bg-transparent border border-[#E3E8EF] rounded-lg hover:bg-[#F4F6FA] transition-colors min-h-0"
        >
          {copy.nav.cta.secondary}
        </Link>
        <Link
          href="/demo"
          className="inline-flex items-center px-4 md:px-5 py-2 text-[13px] font-semibold text-white bg-[#002C5F] hover:bg-[#0046A4] rounded-lg transition-colors min-h-0"
        >
          {copy.nav.cta.primary}
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// HERO + 검색
// ═══════════════════════════════════════
function HelpHero() {
  const [query, setQuery] = useState("");

  const results = useMemo<HelpArticle[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return helpArticles
      .filter((a) => {
        return (
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.categoryLabel.toLowerCase().includes(q)
        );
      })
      .slice(0, 6);
  }, [query]);

  return (
    <section
      className="relative border-b border-[#E3E8EF]"
      style={{
        background: `
          radial-gradient(ellipse at 80% 20%, rgba(0,170,210,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 0% 80%, rgba(0,44,95,0.04) 0%, transparent 50%),
          linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 100%)
        `,
      }}
    >
      <div className="max-w-[960px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <Reveal delay={0.05}>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            HELP CENTER · 지원 센터
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="font-[900] text-[#0A1628] mb-4"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            철연 사용 가이드
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[15px] md:text-[16px] text-[#3A4A5F] leading-[1.75] mb-8 max-w-[640px]">
            역할별 기능 설명, 문제 해결, 결제·정산 문서를 한 곳에서 확인한다.
          </p>
        </Reveal>

        {/* 검색 박스 */}
        <Reveal delay={0.3}>
          <div className="relative max-w-[560px]">
            <span
              className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7B8F] pointer-events-none"
              style={{ fontSize: 20 }}
              aria-hidden="true"
            >
              search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="문서 검색... (cmd+K)"
              aria-label="문서 검색"
              className="w-full h-12 pl-11 pr-4 text-[14px] bg-white border border-[#E3E8EF] rounded-xl text-[#0A1628] placeholder:text-[#9AA8B8] outline-none transition-colors focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/10"
              style={{
                boxShadow: "0 2px 8px rgba(0, 44, 95, 0.04)",
              }}
            />

            {/* 검색 결과 드롭다운 */}
            {query.trim() && (
              <div
                className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-[#E3E8EF] rounded-xl overflow-hidden z-10"
                style={{ boxShadow: "0 12px 36px rgba(0, 44, 95, 0.12)" }}
              >
                {results.length === 0 ? (
                  <div className="px-4 py-6 text-[13px] text-[#6B7B8F] text-center">
                    일치하는 문서가 존재하지 않는다.
                  </div>
                ) : (
                  <ul className="list-none m-0 p-0 divide-y divide-[#E3E8EF]">
                    {results.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/help/${a.slug}`}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-[#F4F6FA] transition-colors"
                        >
                          <span
                            className="material-symbols-outlined text-[#002C5F] mt-0.5"
                            style={{ fontSize: 18 }}
                            aria-hidden="true"
                          >
                            article
                          </span>
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-[#0A1628] truncate">
                              {a.title}
                            </p>
                            <p className="text-[11px] text-[#6B7B8F] mt-0.5">
                              {a.categoryLabel} · {a.summary}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// CATEGORY GRID (6 categories, 2x3 / 3x2)
// ═══════════════════════════════════════
function CategoryGrid() {
  return (
    <section className="py-16 md:py-20 border-b border-[#E3E8EF]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <p
            className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            Categories
          </p>
          <h2 className="text-[24px] md:text-[32px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2">
            카테고리별 가이드
          </h2>
          <p className="text-[14px] text-[#6B7B8F] mb-10 max-w-xl">
            필요한 주제의 카드에서 바로 이동한다. 각 카테고리는 2~3개의 실무 문서로 구성된다.
          </p>
        </Reveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {helpCategories.map((cat) => (
            <StaggerItem key={cat.id}>
              <CategoryCard meta={cat} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function CategoryCard({ meta }: { meta: HelpCategoryMeta }) {
  const articles = getArticlesByCategory(meta.id);
  const firstSlug = articles[0]?.slug;

  return (
    <MotionCard className="p-6 h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-[46px] h-[46px] bg-[#E8F1FB] rounded-[12px] flex items-center justify-center flex-shrink-0">
          <span
            className="material-symbols-outlined text-[#002C5F]"
            style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            {meta.icon}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-[17px] font-bold text-[#0A1628] mb-1">
            {meta.label}
          </h3>
          <p className="text-[12px] text-[#6B7B8F] leading-[1.55]">{meta.sub}</p>
        </div>
      </div>

      <ul className="list-none m-0 p-0 space-y-1.5 mb-4">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/help/${a.slug}`}
              className="flex items-center gap-2 text-[13px] text-[#3A4A5F] hover:text-[#002C5F] transition-colors py-1"
            >
              <span
                className="material-symbols-outlined text-[#9AA8B8]"
                style={{ fontSize: 14 }}
                aria-hidden="true"
              >
                chevron_right
              </span>
              {a.title}
            </Link>
          </li>
        ))}
      </ul>

      {firstSlug && (
        <Link
          href={`/help/${firstSlug}`}
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#002C5F] hover:text-[#0046A4] transition-colors"
        >
          전체 보기
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 14 }}
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </Link>
      )}
    </MotionCard>
  );
}

// ═══════════════════════════════════════
// POPULAR ARTICLES (전체 6건 최근 업데이트)
// ═══════════════════════════════════════
function PopularArticles() {
  const recent = [...helpArticles]
    .sort((a, b) => (a.lastUpdated < b.lastUpdated ? 1 : -1))
    .slice(0, 6);

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#E3E8EF]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <p
            className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            Popular
          </p>
          <h2 className="text-[24px] md:text-[32px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2">
            최근 업데이트 문서
          </h2>
          <p className="text-[14px] text-[#6B7B8F] mb-10">
            운영팀이 최근 갱신한 문서 6건이다.
          </p>
        </Reveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((a) => (
            <StaggerItem key={a.slug}>
              <Link href={`/help/${a.slug}`} className="block group">
                <MotionCard className="p-5 h-full">
                  <span className="inline-block px-2 py-0.5 bg-[#E8F1FB] text-[#002C5F] text-[10px] font-bold rounded-md mb-3 tracking-[0.05em]">
                    {a.categoryLabel}
                  </span>
                  <h3 className="text-[15px] font-bold text-[#0A1628] mb-1.5 leading-[1.4] group-hover:text-[#002C5F] transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-[12px] text-[#6B7B8F] leading-[1.6] mb-3 line-clamp-2">
                    {a.summary}
                  </p>
                  <p
                    className="text-[11px] text-[#9AA8B8] tabular-nums"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    UPDATED · {a.lastUpdated}
                  </p>
                </MotionCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// CONTACT SUPPORT CTA
// ═══════════════════════════════════════
function ContactSupport() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[960px] mx-auto px-6 md:px-12">
        <Reveal>
          <div
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{
              background:
                "linear-gradient(135deg, #002C5F 0%, #0046A4 60%, #00AAD2 100%)",
              boxShadow: "0 16px 48px rgba(0, 44, 95, 0.18)",
            }}
          >
            <p
              className="text-[11px] text-white/70 font-bold tracking-[0.25em] mb-4"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              SUPPORT · 지원 채널
            </p>
            <h2 className="text-[24px] md:text-[32px] font-[800] text-white tracking-[-0.02em] mb-3">
              문서에서 답을 찾지 못한 경우
            </h2>
            <p className="text-[14px] md:text-[15px] text-white/85 leading-[1.7] mb-8 max-w-[560px] mx-auto">
              BYTEFORCE 운영팀이 영업일 기준 24시간 이내에 회신한다. 긴급 배차 장애는 24시간 상담 라인으로 접수된다.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="mailto:contact@cheolyeon.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#F4F6FA] text-[#0A1628] text-[14px] font-bold rounded-lg transition-colors min-h-0"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18 }}
                  aria-hidden="true"
                >
                  mail
                </span>
                이메일 문의
              </a>
              <a
                href="tel:15880000"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-[14px] font-bold rounded-lg border border-white/25 transition-colors min-h-0"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18 }}
                  aria-hidden="true"
                >
                  support_agent
                </span>
                1588-0000 상담
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function HelpFooter() {
  return (
    <footer className="border-t border-[#E3E8EF] py-8 bg-[#EEF1F5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-baseline gap-2.5">
          <span
            className="text-[16px] font-black text-[#002C5F] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif",
            }}
          >
            {copy.footer.brand.ko}
          </span>
          <span
            className="text-[9px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {copy.footer.brand.en}
          </span>
          <span className="text-[11px] text-[#6B7B8F] ml-3 hidden md:inline">
            {copy.footer.description}
          </span>
        </div>
        <div className="flex gap-5">
          {copy.footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] text-[#6B7B8F] hover:text-[#3A4A5F] transition-colors min-h-0"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-[#9AA8B8]">
          {copy.footer.address} · {copy.footer.email}
        </p>
      </div>
      <p className="max-w-[1400px] mx-auto px-6 md:px-12 mt-3 text-[10px] text-[#9AA8B8]">
        {copy.footer.copyright}
      </p>
    </footer>
  );
}
