"use client";

/**
 * 철연 CHEOLYEON — Blog Post 페이지 (/blog/[category]/[slug])
 *
 * heritage-v1.md §3 금지 / §4 허용 구조 준수.
 * slug가 "category/kebab" 2단 구조이므로 catch-all([...slug])로 라우팅한다.
 * 본문 종결어: 판결문 어미. 직접인용(quote 블록)은 화자 어조 예외.
 *
 * 구조:
 *   1. Nav
 *   2. Breadcrumb (블로그 / 카테고리 / 제목)
 *   3. Article header (배지 · H1 · sub · author · date · reading time · hero 영역)
 *   4. 2-col layout: main(720px) + sidebar(TOC + 공유)
 *   5. Body blocks (heading/paragraph/list/callout/quote/code/divider/stat)
 *   6. Author bio mini-card
 *   7. Related posts (최대 3건)
 *   8. Back to blog CTA
 *   9. Footer
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
  blogCategories,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  type BlogBlock,
  type BlogPost,
} from "@/content/blog-posts";
import {
  BlogPostingSchema,
  BreadcrumbSchema,
} from "@/components/seo/StructuredData";

export default function BlogPostPage() {
  const params = useParams<{ slug: string | string[] }>();
  const slugArr = Array.isArray(params?.slug)
    ? params.slug
    : params?.slug
      ? [params.slug]
      : [];
  const slug = slugArr.join("/");
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <PostNotFound slug={slug} />;
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
      <BlogPostingSchema
        headline={post.title}
        description={post.summary}
        urlPath={`/blog/${post.slug}`}
        datePublished={`${post.publishedAt}T00:00:00+09:00`}
        author={{ name: post.author.name, role: post.author.role }}
        readingTime={post.readingTime}
        keywords={post.seoKeywords}
        articleSection={post.categoryLabel}
        imageUrl={post.heroImage}
      />
      <BreadcrumbSchema
        items={[
          { label: "홈", href: "/" },
          { label: "블로그", href: "/blog" },
          { label: post.categoryLabel, href: `/blog?category=${post.category}` },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <PostNav />
      <Breadcrumb post={post} />
      <ArticleHeader post={post} />
      <ArticleLayout post={post} />
      <RelatedSection post={post} />
      <BackToBlog />
      <PostFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function PostNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6"
      style={{ backdropFilter: "blur(12px) saturate(180%)" }}
    >
      <Link href="/" className="flex items-baseline gap-2.5" aria-label="철연 홈">
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
          href="/blog"
          className="text-[13px] font-medium text-[#3A4A5F] hover:text-[#002C5F] transition-colors px-3 py-2 flex items-center gap-1 min-h-0"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 18 }}
            aria-hidden="true"
          >
            arrow_back
          </span>
          블로그
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// BREADCRUMB
// ═══════════════════════════════════════
function Breadcrumb({ post }: { post: BlogPost }) {
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
          <Link href="/blog" className="hover:text-[#002C5F] transition-colors">
            블로그
          </Link>
          <Separator />
          <span>{post.categoryLabel}</span>
          <Separator />
          <span className="text-[#0A1628] font-semibold truncate max-w-[360px]">
            {post.title}
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
// ARTICLE HEADER (배지·제목·서브·저자·날짜·히어로 영역)
// ═══════════════════════════════════════
function ArticleHeader({ post }: { post: BlogPost }) {
  const meta = blogCategories.find((c) => c.id === post.category);

  return (
    <section className="bg-white border-b border-[#E3E8EF]">
      <div className="max-w-[880px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <Reveal delay={0.05}>
          {meta && (
            <span
              className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-md mb-6 tracking-[0.08em]"
              style={{
                backgroundColor: meta.badgeBg,
                color: meta.badgeText,
              }}
            >
              {meta.label.toUpperCase()}
            </span>
          )}
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            className="font-[900] text-[#0A1628] mb-4"
            style={{
              fontSize: "clamp(1.85rem, 4.4vw, 2.75rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            className="text-[16px] md:text-[18px] text-[#3A4A5F] leading-[1.6] mb-8"
            style={{
              fontFamily:
                "var(--font-plex-kr), 'IBM Plex Sans KR', Pretendard, sans-serif",
            }}
          >
            {post.summary}
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#E3E8EF]">
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[15px] font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #002C5F 0%, #00AAD2 100%)",
                }}
              >
                {post.author.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#0A1628]">
                  {post.author.name}
                </p>
                <p className="text-[12px] text-[#6B7B8F]">{post.author.role}</p>
              </div>
            </div>

            <div
              className="ml-auto flex items-center gap-4 text-[12px] text-[#6B7B8F] tabular-nums"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              <span>{post.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}분 읽기</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Hero 영역 — 이미지 없으면 장식 그라데이션 */}
      <Reveal delay={0.28}>
        <div className="max-w-[1080px] mx-auto px-6 md:px-12 pb-12 md:pb-16">
          {post.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full rounded-2xl border border-[#E3E8EF]"
              style={{ boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)" }}
            />
          ) : (
            <DecorativeHero post={post} />
          )}
        </div>
      </Reveal>
    </section>
  );
}

function DecorativeHero({ post }: { post: BlogPost }) {
  return (
    <div
      className="relative h-[180px] md:h-[240px] rounded-2xl border border-[#E3E8EF] overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 85% 20%, rgba(0,170,210,0.35) 0%, transparent 55%),
          radial-gradient(ellipse at 10% 85%, rgba(0,44,95,0.55) 0%, transparent 60%),
          linear-gradient(135deg, #001A3B 0%, #002C5F 60%, #0046A4 100%)
        `,
        boxShadow: "0 10px 30px rgba(0, 44, 95, 0.12)",
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
        <p
          className="text-[11px] font-bold text-white/70 tracking-[0.28em]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {post.categoryLabel.toUpperCase()} · {post.slug.split("/")[0]}
        </p>
        <p
          className="text-[13px] md:text-[15px] text-white/85 tracking-[0.15em]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {post.publishedAt} · CHEOLYEON
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// ARTICLE LAYOUT (2-col: body + sidebar)
// ═══════════════════════════════════════
function ArticleLayout({ post }: { post: BlogPost }) {
  const headings = useMemo(
    () =>
      post.body
        .filter(
          (b): b is Extract<BlogBlock, { type: "heading" }> =>
            b.type === "heading",
        )
        .map((h) => ({
          id: slugifyHeading(h.text),
          text: h.text,
          level: h.level,
        })),
    [post],
  );

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid lg:grid-cols-[minmax(0,720px)_240px] gap-10 lg:justify-center">
        {/* 본문 */}
        <article
          className="max-w-[720px] w-full mx-auto lg:mx-0 text-[15px] md:text-[16px] text-[#0A1628]"
          style={{
            fontFamily:
              "var(--font-plex-kr), 'IBM Plex Sans KR', Pretendard, sans-serif",
            lineHeight: 1.85,
          }}
        >
          {post.body.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}

          <AuthorBio post={post} />
        </article>

        {/* 사이드바 */}
        <aside>
          <ArticleSidebar headings={headings} post={post} />
        </aside>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// BLOCK RENDERER
// ═══════════════════════════════════════
function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading": {
      const id = slugifyHeading(block.text);
      if (block.level === 2) {
        return (
          <h2
            id={id}
            className="text-[24px] md:text-[26px] font-[800] text-[#0A1628] mt-12 mb-4 pt-8 border-t border-[#E3E8EF] scroll-mt-24"
            style={{
              letterSpacing: "-0.025em",
              fontFamily:
                "var(--font-pretendard), 'Pretendard', sans-serif",
            }}
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          id={id}
          className="text-[18px] md:text-[20px] font-[800] text-[#0A1628] mt-8 mb-3 scroll-mt-24"
          style={{
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif",
          }}
        >
          {block.text}
        </h3>
      );
    }

    case "paragraph":
      return <p className="mb-5">{block.text}</p>;

    case "list":
      if (block.ordered) {
        return (
          <ol className="list-none m-0 p-0 my-5 space-y-3 counter-reset-list">
            {block.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[15px] md:text-[16px]"
              >
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 bg-[#002C5F] text-white text-[11px] font-bold rounded-full flex items-center justify-center mt-0.5 tabular-nums"
                  style={{
                    fontFamily: "var(--font-roboto-mono), monospace",
                  }}
                >
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="list-none m-0 p-0 my-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[15px] md:text-[16px]"
            >
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

    case "callout":
      return <Callout variant={block.variant} text={block.text} />;

    case "quote":
      return (
        <blockquote
          className="my-8 pl-6 border-l-4 border-[#002C5F] bg-[#F8FAFD] rounded-r-lg py-5 pr-6"
          style={{ boxShadow: "0 2px 12px rgba(0, 44, 95, 0.04)" }}
        >
          <p
            className="text-[17px] md:text-[19px] text-[#0A1628] italic leading-[1.7] m-0"
            style={{
              fontFamily:
                "var(--font-plex-kr), 'IBM Plex Sans KR', Georgia, serif",
              letterSpacing: "-0.015em",
            }}
          >
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <footer
              className="mt-3 text-[12px] text-[#6B7B8F] tracking-[0.1em] not-italic"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );

    case "code":
      return <CodeBlock content={block.content} language={block.language} />;

    case "divider":
      return (
        <hr
          aria-hidden="true"
          className="my-10 h-[2px] border-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #002C5F 30%, #00AAD2 70%, transparent 100%)",
            opacity: 0.6,
          }}
        />
      );

    case "stat":
      return (
        <div
          className="my-6 p-5 bg-white border border-[#E3E8EF] rounded-xl flex items-center gap-5"
          style={{ boxShadow: "0 4px 14px rgba(0, 44, 95, 0.05)" }}
        >
          <div className="flex-1 min-w-0">
            <p
              className="text-[11px] text-[#6B7B8F] tracking-[0.15em] mb-1.5"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {block.label}
            </p>
            <p
              className="text-[28px] md:text-[34px] font-[900] text-[#002C5F] leading-none tabular-nums"
              style={{
                fontFamily: "var(--font-roboto-mono), monospace",
                letterSpacing: "-0.02em",
              }}
            >
              {block.value}
            </p>
            {block.sub && (
              <p className="text-[12px] text-[#6B7B8F] mt-2">{block.sub}</p>
            )}
          </div>
          <span
            className="material-symbols-outlined text-[#00AAD2]"
            style={{ fontSize: 36, fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            trending_up
          </span>
        </div>
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
      className="flex items-start gap-3 my-6 p-5 rounded-xl border"
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
      }}
      role="note"
    >
      <span
        className="material-symbols-outlined flex-shrink-0 mt-0.5"
        style={{
          fontSize: 22,
          color: styles.iconColor,
          fontVariationSettings: "'FILL' 1",
        }}
        aria-hidden="true"
      >
        {styles.icon}
      </span>
      <p
        className="text-[14px] md:text-[15px] leading-[1.75] m-0"
        style={{ color: styles.textColor }}
      >
        {text}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════
// CODE BLOCK (단순 구문 하이라이트: keyword/comment/string)
// ═══════════════════════════════════════
function CodeBlock({
  content,
  language,
}: {
  content: string;
  language?: string;
}) {
  const lang = (language || "").toLowerCase();
  const lines = content.split("\n");

  return (
    <figure
      className="my-6 rounded-xl overflow-hidden border border-[#0A1628]"
      style={{ boxShadow: "0 8px 24px rgba(0, 44, 95, 0.18)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{
          backgroundColor: "#07101E",
          borderColor: "#1F2B3F",
        }}
      >
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
          <span className="w-[9px] h-[9px] rounded-full bg-[#FEBC2E]" />
          <span className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
        </span>
        <span
          className="text-[10px] font-bold text-[#6B7B8F] tracking-[0.2em]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {(language || "CODE").toUpperCase()}
        </span>
      </div>
      <pre
        className="m-0 p-5 overflow-x-auto text-[13px] text-white"
        style={{
          backgroundColor: "#0A1628",
          fontFamily: "var(--font-roboto-mono), Menlo, monospace",
          lineHeight: 1.75,
        }}
      >
        <code>
          {lines.map((line, i) => (
            <span key={i} className="block">
              <HighlightedLine line={line} lang={lang} />
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

function HighlightedLine({ line, lang }: { line: string; lang: string }) {
  // 최소 하이라이트: 주석 / 문자열 / 키워드
  const keywordsByLang: Record<string, RegExp> = {
    sql: /\b(SELECT|UPDATE|INSERT|DELETE|FROM|WHERE|SET|RETURNING|AND|OR|NOT|NULL|AS|INTO|VALUES|INTERVAL|NOW)\b/g,
    ts: /\b(const|let|var|function|return|if|else|import|from|export|type|interface|async|await|new|class|extends)\b/g,
    typescript:
      /\b(const|let|var|function|return|if|else|import|from|export|type|interface|async|await|new|class|extends)\b/g,
    js: /\b(const|let|var|function|return|if|else|import|from|export|async|await|new|class|extends)\b/g,
  };
  const keywordRe = keywordsByLang[lang];

  // 주석 우선
  const commentMatch = line.match(/^(\s*)(\/\/.*|--.*)$/);
  if (commentMatch) {
    return (
      <>
        <span>{commentMatch[1]}</span>
        <span style={{ color: "#6B7B8F", fontStyle: "italic" }}>
          {commentMatch[2]}
        </span>
      </>
    );
  }

  // 문자열 추출 (' ... ')
  const parts: Array<{ text: string; kind: "str" | "rest" }> = [];
  let cursor = 0;
  const strRe = /'([^'\\]|\\.)*'/g;
  let m: RegExpExecArray | null;
  while ((m = strRe.exec(line)) !== null) {
    if (m.index > cursor) {
      parts.push({ text: line.slice(cursor, m.index), kind: "rest" });
    }
    parts.push({ text: m[0], kind: "str" });
    cursor = m.index + m[0].length;
  }
  if (cursor < line.length) {
    parts.push({ text: line.slice(cursor), kind: "rest" });
  }
  if (parts.length === 0) {
    parts.push({ text: line, kind: "rest" });
  }

  return (
    <>
      {parts.map((p, i) => {
        if (p.kind === "str") {
          return (
            <span key={i} style={{ color: "#A6E3A1" }}>
              {p.text}
            </span>
          );
        }
        if (!keywordRe) return <span key={i}>{p.text}</span>;
        const segs: React.ReactNode[] = [];
        let last = 0;
        p.text.replace(keywordRe, (kw: string, offset: number) => {
          if (offset > last) segs.push(p.text.slice(last, offset));
          segs.push(
            <span
              key={`${i}-${offset}`}
              style={{ color: "#89B4FA", fontWeight: 700 }}
            >
              {kw}
            </span>,
          );
          last = offset + kw.length;
          return kw;
        });
        if (last < p.text.length) segs.push(p.text.slice(last));
        return <span key={i}>{segs.length ? segs : p.text}</span>;
      })}
    </>
  );
}

// ═══════════════════════════════════════
// AUTHOR BIO
// ═══════════════════════════════════════
function AuthorBio({ post }: { post: BlogPost }) {
  return (
    <Reveal>
      <section
        className="mt-16 p-6 md:p-7 bg-white border border-[#E3E8EF] rounded-2xl flex items-start gap-5"
        style={{ boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)" }}
      >
        <div
          aria-hidden="true"
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[22px] font-bold"
          style={{
            background: "linear-gradient(135deg, #002C5F 0%, #00AAD2 100%)",
          }}
        >
          {post.author.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[10px] font-bold text-[#002C5F] tracking-[0.22em] mb-1"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            AUTHOR
          </p>
          <p className="text-[16px] font-[800] text-[#0A1628] mb-1">
            {post.author.name}
          </p>
          <p
            className="text-[13px] text-[#3A4A5F] leading-[1.65]"
            style={{
              fontFamily:
                "var(--font-plex-kr), 'IBM Plex Sans KR', sans-serif",
            }}
          >
            {post.author.role} · 철연 CHEOLYEON 운영사 BYTEFORCE 소속. 현장 데이터와 운영 로그를 기록한다.
          </p>
        </div>
      </section>
    </Reveal>
  );
}

// ═══════════════════════════════════════
// SIDEBAR (TOC + Share)
// ═══════════════════════════════════════
function ArticleSidebar({
  headings,
  post,
}: {
  headings: { id: string; text: string; level: 2 | 3 }[];
  post: BlogPost;
}) {
  return (
    <>
      {/* Mobile: TOC collapsible */}
      <MobileToc headings={headings} />

      {/* Desktop sticky */}
      <div className="hidden lg:block sticky top-[80px] space-y-8">
        {headings.length > 0 && (
          <div>
            <p
              className="text-[11px] font-bold text-[#002C5F] tracking-[0.22em] mb-3"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              ON THIS PAGE
            </p>
            <TocList headings={headings} />
          </div>
        )}
        <ShareButtons post={post} />
      </div>

      {/* Mobile: share */}
      <div className="lg:hidden mt-6">
        <ShareButtons post={post} />
      </div>
    </>
  );
}

function MobileToc({
  headings,
}: {
  headings: { id: string; text: string; level: 2 | 3 }[];
}) {
  const [open, setOpen] = useState(false);
  if (headings.length === 0) return null;

  return (
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
// SHARE BUTTONS
// ═══════════════════════════════════════
function ShareButtons({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window === "undefined") {
      return `https://cheolyeon.com/blog/${post.slug}`;
    }
    return window.location.href;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // noop
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    post.title,
  )}&url=${encodeURIComponent(getUrl())}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    getUrl(),
  )}`;

  return (
    <div>
      <p
        className="text-[11px] font-bold text-[#002C5F] tracking-[0.22em] mb-3"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        SHARE
      </p>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#E3E8EF] hover:border-[#002C5F] hover:bg-[#E8F1FB] text-[#3A4A5F] hover:text-[#002C5F] rounded-lg text-[12px] font-semibold transition-colors min-h-0"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 16 }}
            aria-hidden="true"
          >
            {copied ? "check" : "link"}
          </span>
          {copied ? "링크가 복사되었습니다" : "링크 복사"}
        </button>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#E3E8EF] hover:border-[#002C5F] hover:bg-[#E8F1FB] text-[#3A4A5F] hover:text-[#002C5F] rounded-lg text-[12px] font-semibold transition-colors min-h-0"
        >
          <span aria-hidden="true" className="text-[13px] font-black">X</span>
          Twitter 공유
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#E3E8EF] hover:border-[#002C5F] hover:bg-[#E8F1FB] text-[#3A4A5F] hover:text-[#002C5F] rounded-lg text-[12px] font-semibold transition-colors min-h-0"
        >
          <span aria-hidden="true" className="text-[11px] font-black">in</span>
          LinkedIn 공유
        </a>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// RELATED SECTION
// ═══════════════════════════════════════
function RelatedSection({ post }: { post: BlogPost }) {
  const related = getRelatedBlogPosts(post.slug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white border-t border-[#E3E8EF]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <Reveal>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.22em] mb-2.5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            RELATED · 관련 기록
          </p>
          <h2
            className="text-[22px] md:text-[28px] font-[800] text-[#0A1628] mb-8"
            style={{ letterSpacing: "-0.02em" }}
          >
            함께 읽기
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((r) => (
            <Link key={r.slug} href={`/blog/${r.slug}`} className="block group">
              <MotionCard className="p-5 h-full flex flex-col">
                <span
                  className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-md mb-3 tracking-[0.08em] self-start"
                  style={{
                    backgroundColor:
                      blogCategories.find((c) => c.id === r.category)
                        ?.badgeBg ?? "#E8F1FB",
                    color:
                      blogCategories.find((c) => c.id === r.category)
                        ?.badgeText ?? "#002C5F",
                  }}
                >
                  {r.categoryLabel.toUpperCase()}
                </span>
                <h3 className="text-[15px] font-bold text-[#0A1628] mb-1.5 leading-[1.4] group-hover:text-[#002C5F] transition-colors">
                  {r.title}
                </h3>
                <p
                  className="text-[12px] text-[#6B7B8F] leading-[1.65] line-clamp-2 flex-1"
                  style={{
                    fontFamily:
                      "var(--font-plex-kr), 'IBM Plex Sans KR', sans-serif",
                  }}
                >
                  {r.summary}
                </p>
                <p
                  className="text-[10px] text-[#9AA8B8] tabular-nums mt-3 pt-3 border-t border-[#E3E8EF]"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {r.publishedAt} · {r.readingTime}분
                </p>
              </MotionCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// BACK TO BLOG CTA
// ═══════════════════════════════════════
function BackToBlog() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[720px] mx-auto px-6 md:px-12 text-center">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#002C5F] hover:bg-[#0046A4] text-white text-[14px] font-bold rounded-lg transition-colors min-h-0"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
              aria-hidden="true"
            >
              arrow_back
            </span>
            블로그 목록으로
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// NOT FOUND
// ═══════════════════════════════════════
function PostNotFound({ slug }: { slug: string }) {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628] flex flex-col"
      style={{
        fontFamily:
          "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
      }}
    >
      <PostNav />
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
            포스트가 존재하지 않는다
          </h1>
          <p className="text-[14px] text-[#6B7B8F] mb-6">
            요청한 포스트 식별자{" "}
            <code
              className="px-1.5 py-0.5 bg-white border border-[#E3E8EF] rounded text-[12px]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {slug || "(empty)"}
            </code>
            에 해당하는 기록이 발견되지 않았다.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#002C5F] hover:bg-[#0046A4] text-white text-[14px] font-bold rounded-lg transition-colors min-h-0"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
              aria-hidden="true"
            >
              arrow_back
            </span>
            블로그로
          </Link>
        </div>
      </div>
      <PostFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function PostFooter() {
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
