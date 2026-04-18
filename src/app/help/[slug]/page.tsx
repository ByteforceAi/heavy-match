"use client";

/**
 * 철연 CHEOLYEON — Help Article 페이지 (/help/[slug])
 *
 * heritage-v1.md §3 금지 · §4 허용 구조 준수.
 * 본문 블록 렌더링: heading / paragraph / list / code / callout / image.
 *
 * 구조:
 *   1. Breadcrumb (홈 / 지원 센터 / 카테고리 / 제목)
 *   2. Article header (category badge · H1 · lastUpdated mono)
 *   3. 2-column: 목차 sidebar + 본문(720px)
 *   4. 피드백 (Good/Bad)
 *   5. 관련 아티클
 *   6. Footer disclaimer
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Reveal,
  MotionCard,
} from "@/components/motion/MotionPrimitives";
import * as copy from "@/content/copy";
import {
  getArticleBySlug,
  getRelatedArticles,
  type HelpArticle,
  type HelpBlock,
} from "@/content/help-articles";

export default function HelpArticlePage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const article = getArticleBySlug(slug);

  if (!article) {
    return <ArticleNotFound slug={slug} />;
  }

  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily:
          "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <ArticleNav />
      <Breadcrumb article={article} />
      <ArticleBody article={article} />
      <ArticleFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function ArticleNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6"
      style={{ backdropFilter: "blur(12px) saturate(180%)" }}
    >
      <Link
        href="/"
        className="flex items-baseline gap-2.5"
        aria-label="철연 홈"
      >
        <span className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]">
          {copy.nav.brand.ko}
        </span>
        <span
          className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {copy.nav.brand.en}
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-3">
        <Link
          href="/help"
          className="text-[13px] font-medium text-[#3A4A5F] hover:text-[#002C5F] transition-colors px-3 py-2 flex items-center gap-1 min-h-0"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 18 }}
            aria-hidden="true"
          >
            arrow_back
          </span>
          지원 센터
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// BREADCRUMB
// ═══════════════════════════════════════
function Breadcrumb({ article }: { article: HelpArticle }) {
  return (
    <div className="bg-white border-b border-[#E3E8EF]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[12px] text-[#6B7B8F] flex-wrap"
        >
          <Link href="/" className="hover:text-[#002C5F] transition-colors">
            홈
          </Link>
          <Separator />
          <Link
            href="/help"
            className="hover:text-[#002C5F] transition-colors"
          >
            지원 센터
          </Link>
          <Separator />
          <span>{article.categoryLabel}</span>
          <Separator />
          <span className="text-[#0A1628] font-semibold truncate max-w-[320px]">
            {article.title}
          </span>
        </nav>
      </div>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="material-symbols-outlined text-[#9AA8B8]"
      style={{ fontSize: 14 }}
      aria-hidden="true"
    >
      chevron_right
    </span>
  );
}

// ═══════════════════════════════════════
// ARTICLE BODY (header + TOC + blocks + feedback + related)
// ═══════════════════════════════════════
function ArticleBody({ article }: { article: HelpArticle }) {
  const headings = useMemo(
    () =>
      article.body
        .filter((b): b is Extract<HelpBlock, { type: "heading" }> => b.type === "heading")
        .map((h) => ({
          id: slugifyHeading(h.text),
          text: h.text,
          level: h.level,
        })),
    [article],
  );

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_240px] gap-10">
        {/* LEFT: 본문 카드 */}
        <article>
          <Reveal>
            <div
              className="bg-white border border-[#E3E8EF] rounded-2xl p-6 md:p-10"
              style={{ boxShadow: "0 4px 16px rgba(0, 44, 95, 0.06)" }}
            >
              {/* Header */}
              <header className="mb-8 pb-6 border-b border-[#E3E8EF]">
                <span className="inline-block px-2.5 py-1 bg-[#E8F1FB] text-[#002C5F] text-[11px] font-bold rounded-md mb-4 tracking-[0.05em]">
                  {article.categoryLabel}
                </span>
                <h1
                  className="font-[900] text-[#0A1628] mb-4"
                  style={{
                    fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {article.title}
                </h1>
                <p
                  className="text-[12px] text-[#6B7B8F] tabular-nums"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  최종 업데이트 · {article.lastUpdated}
                </p>
              </header>

              {/* Body blocks */}
              <div
                className="max-w-[720px] mx-auto text-[15px] md:text-[16px] text-[#0A1628]"
                style={{
                  fontFamily:
                    "var(--font-plex-kr), 'IBM Plex Sans KR', Pretendard, sans-serif",
                  lineHeight: 1.85,
                }}
              >
                {article.body.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>

              {/* Feedback */}
              <Feedback />
            </div>
          </Reveal>

          {/* Related */}
          <RelatedArticles slug={article.slug} />

          {/* Disclaimer */}
          <Reveal>
            <p
              className="mt-8 text-[12px] text-[#9AA8B8] text-center"
              style={{ fontFamily: "var(--font-plex-kr), serif" }}
            >
              최종 업데이트: {article.lastUpdated}. 문서는 수시로 갱신된다.
            </p>
          </Reveal>
        </article>

        {/* RIGHT: 목차 sidebar (desktop sticky, mobile collapsible) */}
        <aside>
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// BLOCK RENDERER
// ═══════════════════════════════════════
function BlockRenderer({ block }: { block: HelpBlock }) {
  switch (block.type) {
    case "heading": {
      const id = slugifyHeading(block.text);
      if (block.level === 2) {
        return (
          <h2
            id={id}
            className="text-[22px] font-bold text-[#0A1628] pt-6 mt-6 mb-3 border-t border-[#E3E8EF] scroll-mt-24"
            style={{ letterSpacing: "-0.02em" }}
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          id={id}
          className="text-[17px] font-bold text-[#0A1628] mt-4 mb-2 scroll-mt-24"
          style={{ letterSpacing: "-0.015em" }}
        >
          {block.text}
        </h3>
      );
    }
    case "paragraph":
      return <p className="mb-4">{block.text}</p>;
    case "list":
      return (
        <ul className="list-none p-0 my-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15px] md:text-[16px]">
              <span
                className="material-symbols-outlined text-[#002C5F] mt-1 flex-shrink-0"
                style={{ fontSize: 16 }}
                aria-hidden="true"
              >
                check_circle
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre
          className="bg-[#0A1628] text-[#E8F1FB] p-4 rounded-lg text-[13px] overflow-x-auto my-5"
          style={{
            fontFamily: "var(--font-roboto-mono), monospace",
            lineHeight: 1.7,
          }}
        >
          <code>{block.content}</code>
        </pre>
      );
    case "callout":
      return <Callout variant={block.variant} text={block.text} />;
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          src={block.src}
          alt={block.alt}
          className="w-full rounded-lg border border-[#E3E8EF] my-5"
        />
      );
    default:
      return null;
  }
}

// ═══════════════════════════════════════
// CALLOUT
// ═══════════════════════════════════════
function Callout({
  variant,
  text,
}: {
  variant: "info" | "warn" | "success";
  text: string;
}) {
  const styles = {
    info: {
      bg: "#E8F1FB",
      border: "#B4CEEA",
      icon: "info",
      iconColor: "#002C5F",
      textColor: "#002C5F",
    },
    warn: {
      bg: "#FFF7E0",
      border: "#F5D97A",
      icon: "warning",
      iconColor: "#8A6200",
      textColor: "#6B4B00",
    },
    success: {
      bg: "#E4F6EC",
      border: "#A8DEBE",
      icon: "check_circle",
      iconColor: "#00784E",
      textColor: "#00603F",
    },
  }[variant];

  return (
    <div
      className="flex items-start gap-3 my-5 p-4 rounded-lg border"
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
      }}
      role="note"
    >
      <span
        className="material-symbols-outlined flex-shrink-0 mt-0.5"
        style={{
          fontSize: 20,
          color: styles.iconColor,
          fontVariationSettings: "'FILL' 1",
        }}
        aria-hidden="true"
      >
        {styles.icon}
      </span>
      <p
        className="text-[14px] md:text-[15px] leading-[1.7] m-0"
        style={{ color: styles.textColor }}
      >
        {text}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════
// TABLE OF CONTENTS (sticky desktop / collapsible mobile)
// ═══════════════════════════════════════
function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: 2 | 3 }[];
}) {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile: collapsible */}
      <details
        className="lg:hidden bg-white border border-[#E3E8EF] rounded-xl mb-6"
        open={open}
        onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary className="flex items-center justify-between p-4 cursor-pointer select-none list-none">
          <span className="text-[13px] font-bold text-[#0A1628] flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#002C5F]"
              style={{ fontSize: 18 }}
              aria-hidden="true"
            >
              format_list_bulleted
            </span>
            목차
          </span>
          <span
            className="material-symbols-outlined text-[#6B7B8F] transition-transform"
            style={{
              fontSize: 18,
              transform: open ? "rotate(180deg)" : "none",
            }}
            aria-hidden="true"
          >
            expand_more
          </span>
        </summary>
        <TocList headings={headings} className="px-4 pb-4" />
      </details>

      {/* Desktop: sticky */}
      <div className="hidden lg:block sticky top-[80px]">
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.2em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          ON THIS PAGE
        </p>
        <TocList headings={headings} />
      </div>
    </>
  );
}

function TocList({
  headings,
  className = "",
}: {
  headings: { id: string; text: string; level: 2 | 3 }[];
  className?: string;
}) {
  return (
    <ul className={`list-none m-0 p-0 space-y-1.5 ${className}`}>
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className={`block text-[12px] text-[#6B7B8F] hover:text-[#002C5F] transition-colors leading-[1.5] py-1 border-l-2 border-[#E3E8EF] hover:border-[#002C5F] ${
              h.level === 3 ? "pl-5 ml-2" : "pl-3"
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

// ═══════════════════════════════════════
// FEEDBACK (인터랙션 — 존댓말 허용)
// ═══════════════════════════════════════
function Feedback() {
  const [choice, setChoice] = useState<"good" | "bad" | null>(null);

  return (
    <div className="mt-10 pt-8 border-t border-[#E3E8EF]">
      {choice === null ? (
        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-[14px] font-semibold text-[#0A1628]">
            이 문서가 도움이 되었습니까?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setChoice("good")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E3E8EF] hover:border-[#002C5F] hover:bg-[#E8F1FB] text-[#3A4A5F] hover:text-[#002C5F] rounded-lg text-[13px] font-semibold transition-colors min-h-0"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 16 }}
                aria-hidden="true"
              >
                thumb_up
              </span>
              도움이 됨
            </button>
            <button
              type="button"
              onClick={() => setChoice("bad")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E3E8EF] hover:border-[#E5484D] hover:bg-[#FEEBEC] text-[#3A4A5F] hover:text-[#C13438] rounded-lg text-[13px] font-semibold transition-colors min-h-0"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 16 }}
                aria-hidden="true"
              >
                thumb_down
              </span>
              부족함
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 text-[13px]"
          style={{ color: choice === "good" ? "#00784E" : "#6B4B00" }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 18,
              fontVariationSettings: "'FILL' 1",
            }}
            aria-hidden="true"
          >
            {choice === "good" ? "check_circle" : "edit_note"}
          </span>
          {choice === "good"
            ? "피드백이 기록되었습니다. 감사합니다."
            : "피드백이 접수되었습니다. 운영팀이 문서를 보완합니다."}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// RELATED ARTICLES
// ═══════════════════════════════════════
function RelatedArticles({ slug }: { slug: string }) {
  const related = getRelatedArticles(slug);
  if (related.length === 0) return null;

  return (
    <Reveal>
      <section className="mt-10">
        <h2 className="text-[18px] font-bold text-[#0A1628] mb-4">
          관련 아티클
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {related.map((a) => (
            <Link key={a.slug} href={`/help/${a.slug}`} className="block group">
              <MotionCard className="p-5 h-full">
                <span className="inline-block px-2 py-0.5 bg-[#E8F1FB] text-[#002C5F] text-[10px] font-bold rounded-md mb-2.5 tracking-[0.05em]">
                  {a.categoryLabel}
                </span>
                <h3 className="text-[14px] font-bold text-[#0A1628] mb-1 leading-[1.4] group-hover:text-[#002C5F] transition-colors">
                  {a.title}
                </h3>
                <p className="text-[12px] text-[#6B7B8F] leading-[1.6] line-clamp-2">
                  {a.summary}
                </p>
              </MotionCard>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

// ═══════════════════════════════════════
// NOT FOUND
// ═══════════════════════════════════════
function ArticleNotFound({ slug }: { slug: string }) {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628] flex flex-col"
      style={{
        fontFamily:
          "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
      }}
    >
      <ArticleNav />
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-[480px] text-center">
          <span
            className="material-symbols-outlined text-[#9AA8B8] mb-4 inline-block"
            style={{ fontSize: 64 }}
            aria-hidden="true"
          >
            search_off
          </span>
          <h1 className="text-[24px] font-[800] text-[#0A1628] mb-2">
            문서가 존재하지 않는다
          </h1>
          <p className="text-[14px] text-[#6B7B8F] mb-6">
            요청한 문서 식별자{" "}
            <code
              className="px-1.5 py-0.5 bg-white border border-[#E3E8EF] rounded text-[12px]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {slug || "(empty)"}
            </code>
            에 해당하는 아티클이 발견되지 않았다.
          </p>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#002C5F] hover:bg-[#0046A4] text-white text-[14px] font-bold rounded-lg transition-colors min-h-0"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
              aria-hidden="true"
            >
              arrow_back
            </span>
            지원 센터로
          </Link>
        </div>
      </div>
      <ArticleFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function ArticleFooter() {
  return (
    <footer className="border-t border-[#E3E8EF] py-8 bg-[#EEF1F5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[15px] font-black text-[#002C5F] tracking-[-0.03em]">
            {copy.footer.brand.ko}
          </span>
          <span
            className="text-[9px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {copy.footer.brand.en}
          </span>
          <span className="text-[11px] text-[#6B7B8F] ml-2">
            {copy.footer.company}
          </span>
        </div>
        <p className="text-[11px] text-[#9AA8B8]">{copy.footer.copyright}</p>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════
// UTILS
// ═══════════════════════════════════════
function slugifyHeading(text: string): string {
  return (
    "h-" +
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60)
  );
}
