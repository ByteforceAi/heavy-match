"use client";

/**
 * 철연 CHEOLYEON — Blog Index (/blog)
 *
 * heritage-v1.md §3 금지 / §4 허용 구조 준수.
 * 설문형 헤드라인은 §3.2.5 예외(기자 톤)로 포스트 제목 한정 허용된다.
 * 본문·카드 summary·author 라인은 판결문 어미 기준이다.
 *
 * 구조:
 *   1. Nav (landing 동일 패턴)
 *   2. Hero — "BLOG · 기록" 라벨 + H1 + sub
 *   3. Category filter pills (All + 4 카테고리)
 *   4. Featured post (최근 1건 대형 카드)
 *   5. Grid of remaining posts (3열 desktop / 1열 mobile)
 *   6. Newsletter stub
 *   7. Footer
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
  blogCategories,
  getSortedBlogPosts,
  type BlogCategory,
  type BlogCategoryMeta,
  type BlogPost,
} from "@/content/blog-posts";

type FilterValue = "all" | BlogCategory;

export default function BlogIndexPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily:
          "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <BlogNav />
      <BlogHero />
      <BlogList />
      <NewsletterStub />
      <BlogFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function BlogNav() {
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
// HERO
// ═══════════════════════════════════════
function BlogHero() {
  return (
    <section
      className="relative border-b border-[#E3E8EF]"
      style={{
        background: `
          radial-gradient(ellipse at 82% 18%, rgba(0,170,210,0.08) 0%, transparent 52%),
          radial-gradient(ellipse at 0% 80%, rgba(0,44,95,0.05) 0%, transparent 50%),
          linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 100%)
        `,
      }}
    >
      <div className="max-w-[1080px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <Reveal delay={0.05}>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.28em] mb-5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            BLOG · 기록
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="font-[900] text-[#0A1628] mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.035em",
            }}
          >
            철연의 기록
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-[16px] md:text-[18px] text-[#3A4A5F] leading-[1.7] max-w-[640px]"
            style={{
              fontFamily:
                "var(--font-plex-kr), 'IBM Plex Sans KR', Pretendard, sans-serif",
            }}
          >
            업계 동향·도입 가이드·기술 바닥을 공개한다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// BLOG LIST (filter + featured + grid)
// ═══════════════════════════════════════
function BlogList() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const allPosts = useMemo(() => getSortedBlogPosts(), []);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? allPosts
        : allPosts.filter((p) => p.category === filter),
    [filter, allPosts],
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <section className="py-14 md:py-20 border-b border-[#E3E8EF]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <CategoryFilter filter={filter} setFilter={setFilter} />

        {featured && (
          <div className="mt-10 md:mt-12">
            <Reveal>
              <FeaturedCard post={featured} />
            </Reveal>
          </div>
        )}

        {rest.length > 0 ? (
          <StaggerContainer className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : null}

        {!featured && (
          <p className="mt-10 text-[14px] text-[#6B7B8F] text-center py-16">
            해당 카테고리에 기록된 포스트가 존재하지 않는다.
          </p>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// CATEGORY FILTER PILLS
// ═══════════════════════════════════════
function CategoryFilter({
  filter,
  setFilter,
}: {
  filter: FilterValue;
  setFilter: (v: FilterValue) => void;
}) {
  const pills: { value: FilterValue; label: string }[] = [
    { value: "all", label: "전체" },
    ...blogCategories.map((c) => ({ value: c.id, label: c.label })),
  ];

  return (
    <Reveal>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="카테고리 필터"
      >
        {pills.map((p) => {
          const active = p.value === filter;
          return (
            <button
              key={p.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(p.value)}
              className={`inline-flex items-center px-4 py-2 text-[13px] font-semibold rounded-full border transition-colors min-h-0 ${
                active
                  ? "bg-[#002C5F] text-white border-[#002C5F]"
                  : "bg-white text-[#3A4A5F] border-[#E3E8EF] hover:border-[#002C5F] hover:text-[#002C5F]"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </Reveal>
  );
}

// ═══════════════════════════════════════
// FEATURED CARD (최근 1건)
// ═══════════════════════════════════════
function FeaturedCard({ post }: { post: BlogPost }) {
  const meta = blogCategories.find((c) => c.id === post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group"
      aria-label={`최신 글 · ${post.title}`}
    >
      <article
        className="grid md:grid-cols-[1.1fr_1fr] gap-0 overflow-hidden bg-white border border-[#E3E8EF] rounded-2xl transition-shadow hover:shadow-[0_16px_40px_rgba(0,44,95,0.10),0_0_0_1px_rgba(0,44,95,0.05)]"
        style={{ boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)" }}
      >
        {/* 좌측 — 장식 그라데이션 히어로 */}
        <div
          className="relative min-h-[240px] md:min-h-[320px] flex flex-col justify-between p-8 md:p-10 text-white"
          style={{
            background:
              "linear-gradient(135deg, #002C5F 0%, #0046A4 55%, #00AAD2 100%)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 text-white text-[10px] font-bold rounded-md tracking-[0.08em] border border-white/20"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              <span aria-hidden="true">★</span>
              LATEST
            </span>
            {meta && (
              <span
                className="inline-block px-2.5 py-1 bg-white/12 text-white text-[10px] font-bold rounded-md tracking-[0.08em] border border-white/15"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                {meta.label.toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p
              className="text-[11px] text-white/70 tracking-[0.2em] mb-3"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {post.publishedAt} · {post.readingTime}분 읽기
            </p>
            <p
              className="text-[18px] md:text-[20px] leading-[1.55] text-white/90"
              style={{
                fontFamily:
                  "var(--font-plex-kr), 'IBM Plex Sans KR', sans-serif",
              }}
            >
              {post.summary}
            </p>
          </div>
        </div>

        {/* 우측 — 텍스트 */}
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2
              className="text-[22px] md:text-[28px] font-[900] text-[#0A1628] mb-4 leading-[1.25] group-hover:text-[#002C5F] transition-colors"
              style={{ letterSpacing: "-0.025em" }}
            >
              {post.title}
            </h2>
            <p
              className="text-[14px] md:text-[15px] text-[#3A4A5F] leading-[1.75] mb-6"
              style={{
                fontFamily:
                  "var(--font-plex-kr), 'IBM Plex Sans KR', sans-serif",
              }}
            >
              {post.summary}
            </p>
          </div>
          <AuthorLine post={post} />
        </div>
      </article>
    </Link>
  );
}

// ═══════════════════════════════════════
// POST CARD
// ═══════════════════════════════════════
function PostCard({ post }: { post: BlogPost }) {
  const meta = blogCategories.find((c) => c.id === post.category);
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <MotionCard className="p-6 h-full flex flex-col">
        {meta && <CategoryBadge meta={meta} />}
        <h3
          className="text-[17px] md:text-[18px] font-[800] text-[#0A1628] leading-[1.4] mb-2 group-hover:text-[#002C5F] transition-colors"
          style={{ letterSpacing: "-0.02em" }}
        >
          {post.title}
        </h3>
        <p
          className="text-[13px] text-[#3A4A5F] leading-[1.7] mb-5 line-clamp-3 flex-1"
          style={{
            fontFamily: "var(--font-plex-kr), 'IBM Plex Sans KR', sans-serif",
          }}
        >
          {post.summary}
        </p>
        <AuthorLine post={post} compact />
      </MotionCard>
    </Link>
  );
}

// ═══════════════════════════════════════
// CATEGORY BADGE
// ═══════════════════════════════════════
function CategoryBadge({ meta }: { meta: BlogCategoryMeta }) {
  return (
    <span
      className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-md mb-3 tracking-[0.08em]"
      style={{
        backgroundColor: meta.badgeBg,
        color: meta.badgeText,
      }}
    >
      {meta.label.toUpperCase()}
    </span>
  );
}

// ═══════════════════════════════════════
// AUTHOR LINE
// ═══════════════════════════════════════
function AuthorLine({
  post,
  compact = false,
}: {
  post: BlogPost;
  compact?: boolean;
}) {
  const initial = post.author.name.charAt(0);
  return (
    <div className="flex items-center gap-3 pt-4 border-t border-[#E3E8EF]">
      <div
        aria-hidden="true"
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[13px] font-bold"
        style={{
          background: "linear-gradient(135deg, #002C5F 0%, #00AAD2 100%)",
        }}
      >
        {initial}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`font-semibold text-[#0A1628] truncate ${compact ? "text-[12px]" : "text-[13px]"}`}
        >
          {post.author.name}
        </p>
        <p
          className="text-[10px] text-[#6B7B8F] tabular-nums truncate"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {post.publishedAt} · {post.readingTime}분
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// NEWSLETTER STUB
// ═══════════════════════════════════════
function NewsletterStub() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[720px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.28em] mb-4"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            NEWSLETTER · 구독
          </p>
          <h2
            className="text-[22px] md:text-[28px] font-[800] text-[#0A1628] mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            월간 업계 리포트
          </h2>
          <p
            className="text-[14px] md:text-[15px] text-[#3A4A5F] leading-[1.75] mb-8 max-w-[520px] mx-auto"
            style={{
              fontFamily:
                "var(--font-plex-kr), 'IBM Plex Sans KR', sans-serif",
            }}
          >
            매월 첫째 주, 중장비 임대 시장 지표와 도입 현장 기록이 이메일로 발송된다.
          </p>
          <span
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#E3E8EF] text-[#3A4A5F] text-[13px] font-semibold rounded-full cursor-not-allowed opacity-70"
            aria-disabled="true"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16 }}
              aria-hidden="true"
            >
              mail
            </span>
            월간 업계 리포트 · 읽기
            <span
              className="ml-1 px-1.5 py-0.5 text-[9px] font-bold bg-[#EEF1F5] text-[#6B7B8F] rounded tracking-[0.1em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              SOON
            </span>
          </span>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function BlogFooter() {
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
