"use client";

/**
 * /showcase/empty-states — EmptyState 내부 쇼케이스.
 *
 * 6개 역할 빈 상태 컴포넌트와 사이즈 변형(sm/md/lg)을 시각적으로 검증한다.
 * 외부 공개 페이지가 아니며 네비게이션에는 노출되지 않는다.
 * layout.tsx에서 robots noindex/nofollow가 적용된다.
 *
 * 구조:
 *   1. Nav
 *   2. Header
 *   3. Size toggle (sm/md/lg)
 *   4. 6개 역할 카드 + integration snippet
 *   5. Generic illustration matrix
 *   6. Footer
 */

import Link from "next/link";
import { useState } from "react";
import * as copy from "@/content/copy";
import { Reveal, MotionCard } from "@/components/motion/MotionPrimitives";
import { EmptyState, type EmptyStateSize } from "@/components/cheolyeon/EmptyState";
import {
  RequesterEmptyDispatches,
  OwnerEmptyCalls,
  OperatorEmptyJobs,
  CallcenterEmptyQueue,
  SalespersonEmptyPartners,
  AdminEmptyData,
} from "@/components/cheolyeon/empty-states/RoleEmptyStates";

const CARD_SHADOW = "0 4px 12px rgba(0,44,95,0.04)";

// ─── 쇼케이스 엔트리 정의 ────────────────────────────
interface ShowcaseEntry {
  id: string;
  role: string;
  roleEn: string;
  component: React.ComponentType;
  snippet: string;
}

const ENTRIES: ReadonlyArray<ShowcaseEntry> = [
  {
    id: "requester",
    role: "장비요청자",
    roleEn: "Requester",
    component: RequesterEmptyDispatches,
    snippet:
      `import { RequesterEmptyDispatches } from "@/components/cheolyeon/empty-states/RoleEmptyStates";\n\n` +
      `{dispatches.length === 0\n  ? <RequesterEmptyDispatches />\n  : <DispatchList items={dispatches} />}`,
  },
  {
    id: "owner",
    role: "중장비사장",
    roleEn: "Owner",
    component: OwnerEmptyCalls,
    snippet:
      `import { OwnerEmptyCalls } from "@/components/cheolyeon/empty-states/RoleEmptyStates";\n\n` +
      `{calls.length === 0\n  ? <OwnerEmptyCalls />\n  : <CallInbox items={calls} />}`,
  },
  {
    id: "operator",
    role: "기사",
    roleEn: "Operator",
    component: OperatorEmptyJobs,
    snippet:
      `import { OperatorEmptyJobs } from "@/components/cheolyeon/empty-states/RoleEmptyStates";\n\n` +
      `{jobs.length === 0\n  ? <OperatorEmptyJobs />\n  : <JobQueue items={jobs} />}`,
  },
  {
    id: "callcenter",
    role: "콜센터",
    roleEn: "Callcenter",
    component: CallcenterEmptyQueue,
    snippet:
      `import { CallcenterEmptyQueue } from "@/components/cheolyeon/empty-states/RoleEmptyStates";\n\n` +
      `{queue.length === 0\n  ? <CallcenterEmptyQueue />\n  : <CallQueueTable rows={queue} />}`,
  },
  {
    id: "salesperson",
    role: "영업사원",
    roleEn: "Salesperson",
    component: SalespersonEmptyPartners,
    snippet:
      `import { SalespersonEmptyPartners } from "@/components/cheolyeon/empty-states/RoleEmptyStates";\n\n` +
      `{partners.length === 0\n  ? <SalespersonEmptyPartners />\n  : <PartnerGrid items={partners} />}`,
  },
  {
    id: "admin",
    role: "관리자",
    roleEn: "Admin",
    component: AdminEmptyData,
    snippet:
      `import { AdminEmptyData } from "@/components/cheolyeon/empty-states/RoleEmptyStates";\n\n` +
      `{masterData.equipment === 0\n  ? <AdminEmptyData />\n  : <EquipmentMatrix data={masterData} />}`,
  },
];

const SIZE_OPTIONS: ReadonlyArray<{ key: EmptyStateSize; label: string; desc: string }> = [
  { key: "sm", label: "sm", desc: "컴팩트 / 사이드 패널 · 모달 내부" },
  { key: "md", label: "md", desc: "기본값 / 카드·테이블 대체" },
  { key: "lg", label: "lg", desc: "전면 / 대시보드 최초 진입" },
];

// ═══════════════════════════════════════
// PAGE
// ═══════════════════════════════════════
export default function EmptyStateShowcasePage() {
  const [size, setSize] = useState<EmptyStateSize>("md");

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

      {/* HEADER */}
      <section className="border-b border-[#E3E8EF] bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14">
          <Reveal delay={0.05}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FB] text-[#002C5F] rounded-full text-[11px] font-semibold mb-5"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              INTERNAL · NO INDEX
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[32px] md:text-[40px] font-black tracking-[-0.03em] text-[#002C5F] mb-3">
              EmptyState Showcase
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[14px] md:text-[15px] text-[#3A4A5F] leading-[1.75] max-w-[720px]">
              6개 역할 대시보드에서 데이터가 비어 있을 때 표출되는 빈 상태
              컴포넌트를 정리한다. 모든 카피는 판결문 어미로 작성되며, 추후
              각 대시보드 페이지에 통합된다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SIZE TOGGLE */}
      <section className="border-b border-[#E3E8EF] bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-wrap items-center gap-4">
          <span
            className="text-[11px] tracking-[0.2em] text-[#6B7B8F] uppercase"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            SIZE VARIANT
          </span>
          <div
            role="radiogroup"
            aria-label="사이즈 변형"
            className="inline-flex rounded-xl border border-[#E3E8EF] bg-[#F8FAFD] p-1"
          >
            {SIZE_OPTIONS.map((opt) => {
              const active = size === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSize(opt.key)}
                  className={`px-4 py-1.5 text-[12px] font-semibold rounded-lg transition-colors ${
                    active
                      ? "bg-[#002C5F] text-white"
                      : "text-[#3A4A5F] hover:text-[#002C5F]"
                  }`}
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <span className="text-[12px] text-[#6B7B8F]">
            {SIZE_OPTIONS.find((o) => o.key === size)?.desc}
          </span>
        </div>
      </section>

      {/* 6 ROLES GRID */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-14">
        <Reveal delay={0.05}>
          <h2 className="text-[22px] md:text-[24px] font-bold tracking-[-0.02em] text-[#0A1628] mb-2">
            역할별 사전 구성
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-[13px] text-[#6B7B8F] mb-8">
            각 래퍼는 사전 정의된 copy · illustration · CTA로 EmptyState를 감싼다.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ENTRIES.map((entry, i) => {
            const Component = entry.component;
            return (
            <MotionCard
              key={entry.id}
              delay={i * 0.05}
              className="p-0 overflow-hidden"
            >
              <div
                className="border-b border-[#E3E8EF] px-5 py-3 flex items-center justify-between bg-[#F8FAFD]"
                style={{ boxShadow: CARD_SHADOW }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-semibold text-[#002C5F]">
                    {entry.role}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.25em] text-[#6B7B8F] uppercase"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    {entry.roleEn}
                  </span>
                </div>
                <span
                  className="text-[10px] tracking-[0.15em] text-[#9AA8B8] uppercase"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  size={size}
                </span>
              </div>

              {/* Rendered preview — 래퍼는 고정된 기본 사이즈로 표출된다.
                  sizeToggle은 하단 Generic matrix에 반영된다. */}
              <div className="bg-white">
                <Component />
              </div>

              <div className="border-t border-[#E3E8EF] bg-[#0A1628] px-5 py-4">
                <pre
                  className="text-[11px] leading-[1.7] text-white/90 whitespace-pre-wrap break-all"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  <code>{entry.snippet}</code>
                </pre>
              </div>
            </MotionCard>
            );
          })}
        </div>
      </section>

      {/* GENERIC SIZE MATRIX */}
      <section className="bg-white border-t border-[#E3E8EF]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14">
          <Reveal delay={0.05}>
            <h2 className="text-[22px] md:text-[24px] font-bold tracking-[-0.02em] text-[#0A1628] mb-2">
              Generic EmptyState · 사이즈 변형
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-[13px] text-[#6B7B8F] mb-8">
              선택된 사이즈({size})로 일러스트 5종을 일괄 비교한다.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(
              [
                {
                  illustration: "dispatch" as const,
                  title: "dispatch",
                  description: "굴삭기 + 궤적 화살표. 배차 요청 시작 시점에 사용한다.",
                },
                {
                  illustration: "call" as const,
                  title: "call",
                  description: "전화기 + 음파. 콜 수신·전달 큐 빈 상태에 사용한다.",
                },
                {
                  illustration: "work" as const,
                  title: "work",
                  description: "안전모 + 체크. 기사 작업 배정 대기 상태에 사용한다.",
                },
                {
                  illustration: "partner" as const,
                  title: "partner",
                  description: "2노드 연결. 파트너사·협력사 등록 전 상태에 사용한다.",
                },
                {
                  illustration: "data" as const,
                  title: "data",
                  description: "빈 차트 + 대시 축. 마스터 데이터·통계 부재 상태에 사용한다.",
                },
              ]
            ).map((item, i) => (
              <MotionCard
                key={item.illustration}
                delay={i * 0.05}
                className="p-0 overflow-hidden"
              >
                <div
                  className="border-b border-[#E3E8EF] px-5 py-3 bg-[#F8FAFD]"
                  style={{ boxShadow: CARD_SHADOW }}
                >
                  <span
                    className="text-[11px] tracking-[0.25em] text-[#002C5F] uppercase font-semibold"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    {item.title}
                  </span>
                </div>
                <EmptyState
                  illustration={item.illustration}
                  title={item.title}
                  description={item.description}
                  size={size}
                />
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      <ShowcaseFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// Nav (경량) — 랜딩 nav 구조를 차용하되 showcase 문맥에 맞게 축약
// ═══════════════════════════════════════
function ShowcaseNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6"
      style={{ backdropFilter: "blur(12px) saturate(180%)" }}
    >
      <Link href="/" className="flex items-baseline gap-2.5" aria-label="철연 홈">
        <span
          className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif" }}
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
        className="hidden md:inline text-[11px] tracking-[0.2em] text-[#6B7B8F] uppercase ml-2"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        / SHOWCASE / EMPTY-STATES
      </span>
      <div className="ml-auto">
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
// Footer (경량) — copy.footer의 최소 표기
// ═══════════════════════════════════════
function ShowcaseFooter() {
  return (
    <footer className="border-t border-[#E3E8EF] bg-[#EEF1F5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex items-baseline gap-2.5">
          <span
            className="text-[16px] font-black text-[#002C5F] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif" }}
          >
            {copy.footer.brand.ko}
          </span>
          <span
            className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {copy.footer.brand.en}
          </span>
          <span className="text-[11px] text-[#6B7B8F] ml-2">
            내부 쇼케이스 · 외부 색인 제외
          </span>
        </div>
        <p className="text-[10px] text-[#9AA8B8]">{copy.footer.copyright}</p>
      </div>
    </footer>
  );
}
