"use client";

/**
 * 철연 CHEOLYEON — Skeleton Showcase (내부 개발용)
 *
 * 로딩 스켈레톤 프리미티브 카탈로그다. 링크되지 않은 비공개 라우트로
 * 노출되며 레이아웃에서 robots 색인을 차단한다.
 *
 * 각 컴포넌트는 (1) 이름, (2) 사용 코드, (3) 라이브 렌더 세 블록으로 구성한다.
 * 상단 체크박스로 prefers-reduced-motion을 수동 적용하여 시뮬레이션한다.
 */

import Link from "next/link";
import { useState, type JSX } from "react";
import * as copy from "@/content/copy";
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonStat,
  SkeletonTable,
  SkeletonList,
  SkeletonArticle,
  SkeletonDashboard,
} from "@/components/cheolyeon/Skeleton";

export default function SkeletonShowcasePage(): JSX.Element {
  const [reduced, setReduced] = useState(false);

  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily:
          "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <ShowcaseNav />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-10 pb-6">
        <p
          className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          Internal / Dev
        </p>
        <h1 className="text-[32px] md:text-[44px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2">
          Skeleton Showcase
        </h1>
        <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-6 max-w-[640px]">
          내부 개발용 — 로딩 상태 프리미티브 카탈로그다. 각 컴포넌트의 실제 렌더링과
          호출 방법을 한 화면에서 확인한다.
        </p>

        <label className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-[#E3E8EF] rounded-xl cursor-pointer select-none">
          <input
            type="checkbox"
            checked={reduced}
            onChange={(e) => setReduced(e.target.checked)}
            className="w-4 h-4 accent-[#002C5F]"
          />
          <span className="text-[13px] font-semibold text-[#0A1628]">
            Reduced motion mode
          </span>
          <span className="text-[11px] text-[#6B7B8F]">
            (shimmer 비활성 — 정적 회색)
          </span>
        </label>
      </section>

      {/* Reduced-motion wrapper — 체크시 .cy-reduced 클래스로 수동 적용한다. */}
      <div
        className={reduced ? "cy-reduced" : ""}
        style={{ display: "contents" }}
      >
        <ShowcaseSection
          name="Skeleton"
          description="기본 프리미티브. variant로 rect·circle·text를 고른다."
          code={`<Skeleton variant="rect"   className="h-10 w-40" />
<Skeleton variant="circle" style={{ width: 48, height: 48 }} />
<Skeleton variant="text"   className="w-56" />`}
        >
          <div className="flex flex-wrap items-center gap-5">
            <Skeleton variant="rect" className="h-10 w-40" />
            <Skeleton variant="circle" style={{ width: 48, height: 48 }} />
            <Skeleton variant="text" className="w-56" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          name="SkeletonText"
          description="다중 라인 텍스트 블록. 마지막 줄은 자동으로 짧아진다."
          code={`<SkeletonText lines={4} />`}
        >
          <div className="max-w-[520px]">
            <SkeletonText lines={4} />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          name="SkeletonCard"
          description="아바타·텍스트·푸터 버튼 형태의 일반 카드 골격이다."
          code={`<SkeletonCard className="max-w-[360px]" />`}
        >
          <div className="grid sm:grid-cols-2 gap-4 max-w-[760px]">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          name="SkeletonStat"
          description="KPI 카드 — label · 큰 숫자 · delta 세 줄 구성이다."
          code={`<div className="grid grid-cols-4 gap-4">
  <SkeletonStat />
  <SkeletonStat />
  <SkeletonStat />
  <SkeletonStat />
</div>`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          name="SkeletonTable"
          description="헤더 행은 짙은 배경으로 구분된다. rows·cols로 크기를 조절한다."
          code={`<SkeletonTable rows={5} cols={4} />`}
        >
          <SkeletonTable rows={5} cols={4} />
        </ShowcaseSection>

        <ShowcaseSection
          name="SkeletonList"
          description="아바타 + 2줄 메타 + 우측 배지 구조의 리스트다."
          code={`<SkeletonList items={4} />`}
        >
          <div className="max-w-[520px]">
            <SkeletonList items={4} />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          name="SkeletonArticle"
          description="문서·블로그·도움말 페이지용. 제목 · 메타 · 썸네일 · 본문 단락이다."
          code={`<SkeletonArticle />`}
        >
          <SkeletonArticle />
        </ShowcaseSection>

        <ShowcaseSection
          name="SkeletonDashboard"
          description="4 KPI + 표 + 활동 피드가 결합된 풀 대시보드 골격이다."
          code={`<SkeletonDashboard />`}
        >
          <SkeletonDashboard />
        </ShowcaseSection>
      </div>

      <ShowcaseFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// Section shell — name · code · live preview
// ═══════════════════════════════════════
function ShowcaseSection({
  name,
  description,
  code,
  children,
}: {
  name: string;
  description: string;
  code: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 border-t border-[#E3E8EF]">
      <div className="flex items-baseline gap-3 mb-1.5">
        <h2 className="text-[20px] md:text-[22px] font-[800] tracking-[-0.02em] text-[#0A1628]">
          {name}
        </h2>
        <span
          className="text-[10px] text-[#6B7B8F] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          Component
        </span>
      </div>
      <p className="text-[13px] text-[#6B7B8F] mb-5 max-w-[720px]">
        {description}
      </p>

      <pre
        className="bg-[#0A1628] text-[#E3E8EF] text-[12px] rounded-xl p-4 mb-5 overflow-x-auto"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        <code>{code}</code>
      </pre>

      <div className="bg-white border border-[#E3E8EF] rounded-xl p-6">
        {children}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// Nav — 랜딩과 동일 패턴
// ═══════════════════════════════════════
function ShowcaseNav(): JSX.Element {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6 md:gap-12"
      style={{ backdropFilter: "blur(12px) saturate(180%)" }}
    >
      <Link href="/" className="flex items-baseline gap-2.5" aria-label="철연 홈">
        <span
          className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]"
          style={{
            fontFamily:
              "var(--font-pretendard), 'Pretendard', sans-serif",
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
      <span
        className="hidden md:inline text-[11px] text-[#6B7B8F] tracking-[0.2em] uppercase"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        Internal / Showcase / Skeletons
      </span>
      <div className="ml-auto flex gap-2.5">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-[13px] font-medium text-[#3A4A5F] bg-transparent border border-[#E3E8EF] rounded-lg hover:bg-[#F4F6FA] transition-colors"
        >
          랜딩으로
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// Footer — 최소 블록
// ═══════════════════════════════════════
function ShowcaseFooter(): JSX.Element {
  return (
    <footer className="border-t border-[#E3E8EF] mt-10 pt-8 pb-10 bg-[#EEF1F5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-3">
        <p className="text-[11px] text-[#6B7B8F]">
          내부 개발용 카탈로그다. 외부 공개를 금한다.
        </p>
        <p
          className="text-[10px] text-[#9AA8B8]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          src/components/cheolyeon/Skeleton.tsx
        </p>
      </div>
    </footer>
  );
}
