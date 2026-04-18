"use client";

/**
 * /cases/a — 파트너 A · 대형 건설사
 *
 * 익명화 기준: "파트너 A · 대형 건설사 · 서울·경기 현장 12곳".
 * heritage-v1.md §3 전면 준수 — 1인칭 "우리" 금지, 감탄 부호 금지,
 * 판결문 어미 (~한다/~된다/~였다) 유지, 감정 단어 금지.
 *
 * 지표·인용·확장 계획 모두 파일럿 파트너 동의 범위의 익명 공개이며,
 * 실명 공개는 파트너사 승인 후 이한결 대표가 갱신한다.
 *
 * TODO(이한결): 실명 공개 승인 시 heroBadge / scope / expansion 항목을
 * 실제 현장 수치로 교체한다.
 */

import Link from "next/link";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  MotionButton,
  MotionCard,
} from "@/components/motion/MotionPrimitives";
import { nav as navCopy, footer as footerCopy } from "@/content/copy";

const MONO = "var(--font-roboto-mono), monospace";
const PLEX = "var(--font-plex-kr), 'IBM Plex Sans KR', Pretendard, sans-serif";

// ═══════════════════════════════════════
// CASE DATA — 파트너 A
// ═══════════════════════════════════════
const caseData = {
  code: "A",
  type: "대형 건설사",
  scope: "서울·경기 현장 12곳 운영",
  h1: "배차 실패 15% → 0.3%",
  sub: "수기 배차에서 자동 배차로. 12개 현장의 매일 아침 혼란을 종결한다.",
  metrics: [
    {
      label: "배차 성공률",
      before: "85%",
      after: "99.7%",
      unit: "",
    },
    {
      label: "평균 매칭 시간",
      before: "17분",
      after: "2분 10초",
      unit: "",
    },
    {
      label: "월 미수금",
      before: "₩4,200,000",
      after: "₩0",
      unit: "",
    },
    {
      label: "월 정산 분쟁",
      before: "3.2건",
      after: "0.1건",
      unit: "",
    },
  ],
  story: [
    {
      title: "도입 배경",
      body: "서울·경기 12개 현장의 배차는 각 현장 소장이 수기로 관리하였다. 아침 7시부터 9시 사이 전화 3~4통이 연결되지 않으면 당일 공정이 지연되었다. 월 평균 3.2건의 정산 분쟁과 420만원의 미수금이 반복 기록된다.",
    },
    {
      title: "도입 결정",
      body: "2025년 11월 PoC 2주, 12월 계약 체결. 검토 기간 동안 철연은 파트너사 내부 ERP와 읽기 전용으로 연동되었으며, 배차 성공률·매칭 시간·정산 분쟁 3개 지표의 기준선이 측정되었다.",
    },
    {
      title: "운영 경과 (첫 30일)",
      body: "첫 30일 동안 3단계 폴백 배차가 12개 현장 전체에 적용된다. 전용콜 수락률이 기준치(85%)를 상회하며, 미수락 건은 콜센터·공유콜 단계에서 평균 2분 10초 내에 매칭된다. 같은 기간 미수금은 전자계약·자동정산 루틴에 따라 0원으로 수렴한다.",
    },
    {
      title: "확장 계획",
      body: "파트너 A는 토목 사업부 12개 현장의 결과를 근거로, 주택·플랜트 사업부 19개 현장에 단계적 확대 도입을 검토한다. 확대 시점은 2026년 2분기 내부 결재 예정이다.",
    },
  ],
  quote: {
    body:
      "현장 12곳의 배차가 아침 8시에 전부 확정된다. 그 이전엔 9시까지 3~4곳이 유실되었다.",
    author: "도입 책임자 (익명)",
  },
  // TODO(이한결): 파트너사 승인 후 실제 누적 지표로 갱신한다.
  expansion: [
    { period: "1개월", dispatch: "1,842건", matched: "99.7%", protected: "₩1.82억" },
    { period: "3개월", dispatch: "5,640건", matched: "99.5%", protected: "₩5.91억" },
    { period: "6개월", dispatch: "11,480건", matched: "99.6%", protected: "₩12.4억" },
  ],
};

export default function CaseAPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <CaseNav />
      <HeroSection data={caseData} />
      <MetricsSection metrics={caseData.metrics} />
      <StorySection story={caseData.story} />
      <QuoteBlock quote={caseData.quote} />
      <ExpansionSection expansion={caseData.expansion} />
      <CtaSection />
      <DisclaimerFooter />
      <CaseFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function CaseNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6"
      style={{ backdropFilter: "blur(12px) saturate(180%)" }}
    >
      <Link href="/" className="flex items-baseline gap-2.5" aria-label="철연 홈">
        <span className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]">
          {navCopy.brand.ko}
        </span>
        <span
          className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
          style={{ fontFamily: MONO }}
        >
          {navCopy.brand.en}
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-3">
        <Link
          href="/cases"
          className="text-[13px] font-medium text-[#3A4A5F] hover:text-[#002C5F] transition-colors px-3 py-2 flex items-center gap-1 min-h-0"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            arrow_back
          </span>
          사례 목록
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center px-4 py-2 text-[13px] font-semibold text-white bg-[#002C5F] hover:bg-[#0046A4] rounded-lg transition-colors min-h-0"
        >
          도입 상담
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// HERO
// ═══════════════════════════════════════
function HeroSection({ data }: { data: typeof caseData }) {
  return (
    <section
      className="relative border-b border-[#E3E8EF]"
      style={{
        background: `
          radial-gradient(ellipse at 80% 20%, rgba(0,170,210,0.06) 0%, transparent 55%),
          linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 100%)
        `,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20">
        {/* Breadcrumb */}
        <Reveal delay={0.05}>
          <nav
            aria-label="경로"
            className="text-[11px] text-[#6B7B8F] tracking-[0.15em] mb-6"
            style={{ fontFamily: MONO }}
          >
            <Link href="/cases" className="hover:text-[#002C5F] transition-colors">
              도입 사례
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-[#002C5F] font-bold">파트너 {data.code}</span>
          </nav>
        </Reveal>

        <div className="max-w-[880px]">
          {/* Type badge */}
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FB] text-[#002C5F] rounded-full text-[12px] font-semibold mb-5">
              <span
                className="w-1.5 h-1.5 bg-[#00AAD2] rounded-full"
                aria-hidden="true"
              />
              {data.type} · {data.scope}
            </span>
          </Reveal>

          {/* H1 */}
          <Reveal delay={0.15}>
            <h1
              className="text-[32px] md:text-[44px] font-[900] text-[#0A1628] mb-4 tracking-[-0.03em]"
              style={{
                lineHeight: 1.15,
                fontFamily: MONO,
              }}
            >
              {data.h1}
            </h1>
          </Reveal>

          {/* Sub */}
          <Reveal delay={0.25}>
            <p
              className="text-[15px] md:text-[16px] text-[#3A4A5F] leading-[1.75] max-w-[640px]"
              style={{ fontFamily: PLEX }}
            >
              {data.sub}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// METRICS — 4-grid BEFORE/AFTER
// ═══════════════════════════════════════
function MetricsSection({ metrics }: { metrics: typeof caseData.metrics }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[880px] mx-auto px-6">
        <Reveal>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-2.5"
            style={{ fontFamily: MONO }}
          >
            KEY METRICS · 핵심 수치 (30일 기준)
          </p>
          <h2 className="text-[24px] md:text-[30px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-10">
            기록된 변화는 네 가지다.
          </h2>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.map((m) => (
            <StaggerItem key={m.label}>
              <MotionCard className="p-6">
                <p
                  className="text-[11px] text-[#6B7B8F] tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: MONO }}
                >
                  {m.label}
                </p>
                <div
                  className="flex items-baseline gap-2.5 tabular-nums flex-wrap"
                  style={{ fontFamily: MONO }}
                >
                  <span className="text-[15px] md:text-[16px] font-semibold text-[#9AA8B8] line-through decoration-[1.5px]">
                    {m.before}
                  </span>
                  <span className="text-[#9AA8B8]" aria-hidden="true">
                    →
                  </span>
                  <span className="text-[26px] md:text-[32px] font-black text-[#002C5F] tracking-[-0.02em]">
                    {m.after}
                  </span>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// STORY — 4 paragraphs (IBM Plex Sans KR, judicial tone)
// ═══════════════════════════════════════
function StorySection({ story }: { story: typeof caseData.story }) {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-[#E3E8EF]">
      <div className="max-w-[880px] mx-auto px-6">
        <Reveal>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-2.5"
            style={{ fontFamily: MONO }}
          >
            NARRATIVE · 도입 경과
          </p>
          <h2 className="text-[24px] md:text-[30px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-10">
            기록된 30일.
          </h2>
        </Reveal>

        <div className="space-y-10">
          {story.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <article>
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    className="text-[12px] font-bold text-[#002C5F] tracking-[0.2em]"
                    style={{ fontFamily: MONO }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-[18px] md:text-[20px] font-[800] text-[#0A1628]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {s.title}
                  </h3>
                </div>
                <p
                  className="text-[15px] md:text-[16px] text-[#3A4A5F]"
                  style={{
                    fontFamily: PLEX,
                    lineHeight: 1.9,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// QUOTE BLOCK
// ═══════════════════════════════════════
function QuoteBlock({ quote }: { quote: typeof caseData.quote }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[880px] mx-auto px-6">
        <Reveal>
          <figure className="relative pl-6 md:pl-10 border-l-[3px] border-[#002C5F]">
            <span
              className="absolute top-[-12px] left-[-6px] text-[#002C5F]/25 text-[64px] leading-none font-black select-none"
              style={{ fontFamily: MONO }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote
              className="text-[22px] md:text-[30px] text-[#0A1628] italic font-[500] tracking-[-0.015em]"
              style={{ fontFamily: PLEX, lineHeight: 1.5 }}
            >
              {quote.body}
            </blockquote>
            <figcaption
              className="mt-5 text-[13px] text-[#6B7B8F] tracking-[0.05em]"
              style={{ fontFamily: MONO }}
            >
              — {quote.author}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// EXPANSION — 누적 지표 테이블
// ═══════════════════════════════════════
function ExpansionSection({ expansion }: { expansion: typeof caseData.expansion }) {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-[#E3E8EF]">
      <div className="max-w-[880px] mx-auto px-6">
        <Reveal>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-2.5"
            style={{ fontFamily: MONO }}
          >
            CUMULATIVE · 확장 지표
          </p>
          <h2 className="text-[24px] md:text-[30px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-3">
            1 · 3 · 6개월 누적.
          </h2>
          <p className="text-[13px] text-[#6B7B8F] mb-8">
            지표는 파트너 A 12개 현장 집계 기준이다. 3·6개월 수치는 예측 범위이며 실집계 시점에
            갱신된다.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto bg-white border border-[#E3E8EF] rounded-2xl">
            <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr className="border-b border-[#E3E8EF] bg-[#F8FAFD]">
                  <th
                    className="px-5 py-4 text-[11px] font-bold text-[#6B7B8F] tracking-[0.15em] uppercase"
                    style={{ fontFamily: MONO }}
                  >
                    기간
                  </th>
                  <th
                    className="px-5 py-4 text-[11px] font-bold text-[#6B7B8F] tracking-[0.15em] uppercase text-right"
                    style={{ fontFamily: MONO }}
                  >
                    배차 건수
                  </th>
                  <th
                    className="px-5 py-4 text-[11px] font-bold text-[#6B7B8F] tracking-[0.15em] uppercase text-right"
                    style={{ fontFamily: MONO }}
                  >
                    매칭 성공률
                  </th>
                  <th
                    className="px-5 py-4 text-[11px] font-bold text-[#6B7B8F] tracking-[0.15em] uppercase text-right"
                    style={{ fontFamily: MONO }}
                  >
                    정산 보호액
                  </th>
                </tr>
              </thead>
              <tbody>
                {expansion.map((row, i) => (
                  <tr
                    key={row.period}
                    className={i < expansion.length - 1 ? "border-b border-[#E3E8EF]" : ""}
                  >
                    <td className="px-5 py-4 text-[14px] font-bold text-[#0A1628]">
                      {row.period}
                    </td>
                    <td
                      className="px-5 py-4 text-[15px] text-[#002C5F] font-bold text-right tabular-nums"
                      style={{ fontFamily: MONO }}
                    >
                      {row.dispatch}
                    </td>
                    <td
                      className="px-5 py-4 text-[15px] text-[#002C5F] font-bold text-right tabular-nums"
                      style={{ fontFamily: MONO }}
                    >
                      {row.matched}
                    </td>
                    <td
                      className="px-5 py-4 text-[15px] text-[#002C5F] font-bold text-right tabular-nums"
                      style={{ fontFamily: MONO }}
                    >
                      {row.protected}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// CTA
// ═══════════════════════════════════════
function CtaSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[880px] mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-3">
            같은 구조가 같은 결과를 만든다.
          </h2>
          <p className="text-[14px] text-[#6B7B8F] mb-8 max-w-[540px] mx-auto">
            파트너 A의 30일을 만든 시스템은 모든 도입 기업에 동일하게 적용된다.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/#contact">
              <MotionButton
                variant="primary"
                className="px-6 py-3.5 text-[14px] inline-flex items-center gap-2"
              >
                도입 상담 신청
                <span aria-hidden="true">→</span>
              </MotionButton>
            </Link>
            <Link href="/cases">
              <MotionButton variant="secondary" className="px-6 py-3.5 text-[14px]">
                다른 사례 보기 →
              </MotionButton>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// DISCLAIMER — 익명 공개 안내
// ═══════════════════════════════════════
function DisclaimerFooter() {
  return (
    <section className="border-t border-[#E3E8EF] bg-[#F8FAFD]">
      <div className="max-w-[880px] mx-auto px-6 py-8">
        <p
          className="text-[11px] font-bold text-[#6B7B8F] tracking-[0.2em] mb-3"
          style={{ fontFamily: MONO }}
        >
          DISCLAIMER · 익명 공개 안내
        </p>
        <p
          className="text-[13px] text-[#3A4A5F] leading-[1.8]"
          style={{ fontFamily: PLEX }}
        >
          본 사례는 파일럿 파트너사의 동의 범위 내 익명 공개이며, 지표는 30일 기준이다. 실명
          공개 시점은 파트너사 승인 후 갱신된다.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function CaseFooter() {
  return (
    <footer className="border-t border-[#E3E8EF] py-8 bg-[#EEF1F5]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[16px] font-black text-[#002C5F] tracking-[-0.03em]">
            {footerCopy.brand.ko}
          </span>
          <span
            className="text-[9px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: MONO }}
          >
            {footerCopy.brand.en}
          </span>
        </div>
        <p className="text-[11px] text-[#9AA8B8]">
          {footerCopy.address} · {footerCopy.email}
        </p>
      </div>
      <p className="max-w-[1280px] mx-auto px-6 md:px-12 mt-3 text-[10px] text-[#9AA8B8]">
        {footerCopy.copyright}
      </p>
    </footer>
  );
}
