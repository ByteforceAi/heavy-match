/**
 * 철연 CHEOLYEON — Skeleton Primitive Library
 *
 * 대시보드·리스트·카드 로딩 상태 플레이스홀더다.
 * shimmer 애니메이션은 순수 CSS keyframe이며 JS 없이도 작동한다.
 * prefers-reduced-motion 사용자에게는 정적 회색만 노출한다.
 *
 * Palette
 *   base  #E3E8EF  (line)
 *   high  #F4F6FA  (shimmer highlight)
 *   card  #FFFFFF
 *   text  #6B7B8F / #0A1628
 *
 * Usage
 *   import { Skeleton, SkeletonDashboard } from "@/components/cheolyeon/Skeleton";
 *   {isLoading ? <SkeletonDashboard /> : <Dashboard data={data} />}
 */

import type { JSX } from "react";

// ═══════════════════════════════════════
// Types
// ═══════════════════════════════════════
type SkeletonVariant = "rect" | "circle" | "text";

export interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
  style?: React.CSSProperties;
}

// ═══════════════════════════════════════
// CSS — inline keyframe + reduced-motion fallback
// 한번만 렌더되도록 모듈 상위에서 string 상수로 보관한다.
// ═══════════════════════════════════════
const SKELETON_CSS = `
@keyframes skeleton-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.cy-skel {
  background: linear-gradient(
    90deg,
    #E3E8EF 0%,
    #F4F6FA 50%,
    #E3E8EF 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}
.cy-skel--rect   { border-radius: 8px; }
.cy-skel--text   { border-radius: 6px; height: 12px; }
.cy-skel--circle { border-radius: 9999px; }
.cy-skel-card    { border-radius: 12px; }
@media (prefers-reduced-motion: reduce) {
  .cy-skel {
    background: #E3E8EF;
    animation: none;
  }
}
.cy-reduced .cy-skel {
  background: #E3E8EF;
  animation: none;
}
`;

function SkeletonStyles(): JSX.Element {
  // client·server 모두에서 한 번만 주입되는 정적 CSS다.
  return <style dangerouslySetInnerHTML={{ __html: SKELETON_CSS }} />;
}

// ═══════════════════════════════════════
// Core primitive
// ═══════════════════════════════════════
export function Skeleton({
  className = "",
  variant = "rect",
  style,
}: SkeletonProps): JSX.Element {
  const variantCls =
    variant === "circle"
      ? "cy-skel--circle"
      : variant === "text"
        ? "cy-skel--text"
        : "cy-skel--rect";
  return (
    <>
      <SkeletonStyles />
      <span
        aria-hidden="true"
        className={`cy-skel ${variantCls} block ${className}`}
        style={style}
      />
    </>
  );
}

// ═══════════════════════════════════════
// SkeletonText — 다중 라인 텍스트 플레이스홀더
// 마지막 줄은 60% 너비로 텍스트 흐름을 모사한다.
// ═══════════════════════════════════════
export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}): JSX.Element {
  return (
    <div
      className={`flex flex-col gap-2 ${className}`}
      role="status"
      aria-label="텍스트 로딩 중"
    >
      <SkeletonStyles />
      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="cy-skel cy-skel--text block"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// SkeletonCard — 헤더·본문·푸터 골격
// ═══════════════════════════════════════
export function SkeletonCard({
  className = "",
}: {
  className?: string;
}): JSX.Element {
  return (
    <div
      className={`bg-white border border-[#E3E8EF] rounded-xl p-5 ${className}`}
      role="status"
      aria-label="카드 로딩 중"
    >
      <SkeletonStyles />
      {/* header: avatar + two lines */}
      <div className="flex items-center gap-3 mb-4">
        <span
          aria-hidden="true"
          className="cy-skel cy-skel--circle block"
          style={{ width: 40, height: 40 }}
        />
        <div className="flex-1 flex flex-col gap-1.5">
          <span
            aria-hidden="true"
            className="cy-skel cy-skel--text block"
            style={{ width: "55%" }}
          />
          <span
            aria-hidden="true"
            className="cy-skel cy-skel--text block"
            style={{ width: "35%", height: 10 }}
          />
        </div>
      </div>
      {/* body */}
      <div className="flex flex-col gap-2 mb-4">
        <span
          aria-hidden="true"
          className="cy-skel cy-skel--text block"
          style={{ width: "100%" }}
        />
        <span
          aria-hidden="true"
          className="cy-skel cy-skel--text block"
          style={{ width: "92%" }}
        />
        <span
          aria-hidden="true"
          className="cy-skel cy-skel--text block"
          style={{ width: "70%" }}
        />
      </div>
      {/* footer: two pill buttons */}
      <div className="flex gap-2 pt-3 border-t border-[#E3E8EF]">
        <span
          aria-hidden="true"
          className="cy-skel cy-skel--rect block"
          style={{ width: 72, height: 28 }}
        />
        <span
          aria-hidden="true"
          className="cy-skel cy-skel--rect block"
          style={{ width: 72, height: 28 }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SkeletonStat — KPI 카드 (label · 큰 숫자 · delta)
// ═══════════════════════════════════════
export function SkeletonStat({
  className = "",
}: {
  className?: string;
}): JSX.Element {
  return (
    <div
      className={`bg-white border border-[#E3E8EF] rounded-xl p-5 ${className}`}
      role="status"
      aria-label="지표 로딩 중"
    >
      <SkeletonStyles />
      <span
        aria-hidden="true"
        className="cy-skel cy-skel--text block mb-3"
        style={{ width: "40%", height: 10 }}
      />
      <span
        aria-hidden="true"
        className="cy-skel cy-skel--rect block mb-3"
        style={{ width: "65%", height: 32 }}
      />
      <span
        aria-hidden="true"
        className="cy-skel cy-skel--text block"
        style={{ width: "30%", height: 10 }}
      />
    </div>
  );
}

// ═══════════════════════════════════════
// SkeletonTable — 헤더 행(짙음) + 본문 행
// ═══════════════════════════════════════
export function SkeletonTable({
  rows = 5,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}): JSX.Element {
  const gridTemplate = `repeat(${cols}, minmax(0, 1fr))`;
  return (
    <div
      className="bg-white border border-[#E3E8EF] rounded-xl overflow-hidden"
      role="status"
      aria-label="표 로딩 중"
    >
      <SkeletonStyles />
      {/* header */}
      <div
        className="grid gap-4 px-5 py-3 bg-[#F4F6FA] border-b border-[#E3E8EF]"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {Array.from({ length: cols }).map((_, c) => (
          <span
            key={`h-${c}`}
            aria-hidden="true"
            className="cy-skel cy-skel--text block"
            style={{ width: "60%", height: 10, background: "#DCE2EB" }}
          />
        ))}
      </div>
      {/* body */}
      <div>
        {Array.from({ length: rows }).map((_, r) => (
          <div
            key={`r-${r}`}
            className="grid gap-4 px-5 py-4 border-b border-[#EEF1F5] last:border-b-0"
            style={{ gridTemplateColumns: gridTemplate }}
          >
            {Array.from({ length: cols }).map((_, c) => (
              <span
                key={`cell-${r}-${c}`}
                aria-hidden="true"
                className="cy-skel cy-skel--text block"
                style={{
                  width: `${55 + ((r + c) * 7) % 40}%`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SkeletonList — 아바타 + 2줄 리스트 아이템
// ═══════════════════════════════════════
export function SkeletonList({
  items = 3,
}: {
  items?: number;
}): JSX.Element {
  return (
    <div
      className="bg-white border border-[#E3E8EF] rounded-xl"
      role="status"
      aria-label="목록 로딩 중"
    >
      <SkeletonStyles />
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-5 py-4 border-b border-[#EEF1F5] last:border-b-0"
        >
          <span
            aria-hidden="true"
            className="cy-skel cy-skel--circle block shrink-0"
            style={{ width: 36, height: 36 }}
          />
          <div className="flex-1 flex flex-col gap-1.5">
            <span
              aria-hidden="true"
              className="cy-skel cy-skel--text block"
              style={{ width: `${55 + (i * 11) % 35}%` }}
            />
            <span
              aria-hidden="true"
              className="cy-skel cy-skel--text block"
              style={{ width: `${25 + (i * 7) % 30}%`, height: 10 }}
            />
          </div>
          <span
            aria-hidden="true"
            className="cy-skel cy-skel--rect block shrink-0"
            style={{ width: 56, height: 22 }}
          />
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// SkeletonArticle — 문서형 콘텐츠 (blog / help)
// 제목 · 메타 · 썸네일 · 본문 다수 단락
// ═══════════════════════════════════════
export function SkeletonArticle(): JSX.Element {
  return (
    <article
      className="max-w-[720px] mx-auto"
      role="status"
      aria-label="문서 로딩 중"
    >
      <SkeletonStyles />
      {/* title */}
      <span
        aria-hidden="true"
        className="cy-skel cy-skel--rect block mb-3"
        style={{ width: "85%", height: 36 }}
      />
      <span
        aria-hidden="true"
        className="cy-skel cy-skel--rect block mb-5"
        style={{ width: "60%", height: 36 }}
      />
      {/* meta row */}
      <div className="flex items-center gap-3 mb-6">
        <span
          aria-hidden="true"
          className="cy-skel cy-skel--circle block"
          style={{ width: 32, height: 32 }}
        />
        <span
          aria-hidden="true"
          className="cy-skel cy-skel--text block"
          style={{ width: 120 }}
        />
        <span
          aria-hidden="true"
          className="cy-skel cy-skel--text block"
          style={{ width: 80 }}
        />
      </div>
      {/* hero image */}
      <span
        aria-hidden="true"
        className="cy-skel cy-skel-card block mb-6"
        style={{ width: "100%", aspectRatio: "16 / 9" }}
      />
      {/* paragraphs */}
      <div className="flex flex-col gap-3">
        <SkeletonText lines={4} />
        <div className="h-4" />
        <SkeletonText lines={3} />
        <div className="h-4" />
        <SkeletonText lines={5} />
      </div>
    </article>
  );
}

// ═══════════════════════════════════════
// SkeletonDashboard — 통합 뷰
// 상단: 4개 KPI
// 좌측(2/3): 표
// 우측(1/3): 활동 피드 리스트
// ═══════════════════════════════════════
export function SkeletonDashboard(): JSX.Element {
  return (
    <div
      className="flex flex-col gap-6"
      role="status"
      aria-label="대시보드 로딩 중"
    >
      <SkeletonStyles />
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
      </div>
      {/* main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* table heading */}
          <div className="flex items-center justify-between">
            <span
              aria-hidden="true"
              className="cy-skel cy-skel--rect block"
              style={{ width: 160, height: 20 }}
            />
            <span
              aria-hidden="true"
              className="cy-skel cy-skel--rect block"
              style={{ width: 96, height: 28 }}
            />
          </div>
          <SkeletonTable rows={6} cols={5} />
        </div>
        <div className="flex flex-col gap-4">
          <span
            aria-hidden="true"
            className="cy-skel cy-skel--rect block"
            style={{ width: 120, height: 20 }}
          />
          <SkeletonList items={5} />
        </div>
      </div>
    </div>
  );
}
