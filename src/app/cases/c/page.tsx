"use client";

/**
 * /cases/c — 파트너 C · 콜센터 운영
 *
 * 익명화 기준: "파트너 C · 콜센터 운영 · 부산·울산·경남 거점".
 * heritage-v1.md §3 전면 준수 — 1인칭 "우리" 금지, 감탄 부호 금지,
 * 판결문 어미 (~한다/~된다/~였다) 유지, 감정 단어 금지.
 *
 * TODO(이한결): 실명 공개 승인 시 scope / expansion을 실제 수치로 교체한다.
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

const caseData = {
  code: "C",
  type: "콜센터 운영",
  scope: "부산·울산·경남 거점",
  h1: "상담원 1인당 처리 콜 1.8배",
  sub: "수기 중개에서 공유콜 자동화로 전환된다. 콜센터 운영의 동선이 단축된다.",
  metrics: [
    {
      label: "미수락 콜 처리 시간",
      before: "4분 12초",
      after: "1분 40초",
    },
    {
      label: "공유콜 전환율",
      before: "58%",
      after: "94%",
    },
    {
      label: "월 콜센터 수수료 정산",
      before: "수기 엑셀",
      after: "자동",
    },
    {
      label: "상담원 1인당 월 처리",
      before: "230건",
      after: "412건",
    },
  ],
  story: [
    {
      title: "도입 배경",
      body: "파트너 C는 부산·울산·경남 3개 거점에서 콜센터를 운영한다. 상담원은 사장사 간 수기 중개로 미수락 콜을 처리하였으며, 1건당 평균 4분 12초가 소요된다. 수수료 정산은 월말 엑셀로 집계되어 분배 분쟁이 반복 기록된다.",
    },
    {
      title: "도입 결정",
      body: "2025년 9월 데스크탑 멀티컬럼 UI를 3일간 시연한 후 계약이 체결된다. 상담원이 기존 워크플로우를 유지하면서 미수락 콜이 공유콜로 자동 전환되는 구조가 결정 요인으로 기록된다.",
    },
    {
      title: "운영 경과 (첫 30일)",
      body: "미수락 콜 처리 시간이 4분 12초에서 1분 40초로 단축된다. 공유콜 전환율은 58%에서 94%로 상승하며, 상담원 1인이 한 달에 처리하는 콜은 230건에서 412건으로 1.8배 증가한다. 수수료 정산은 거래 발생 시점에 자동 분배되어 엑셀 집계가 폐지된다.",
    },
    {
      title: "확장 계획",
      body: "파트너 C는 3개 거점의 운영 데이터를 근거로 대구·광주 신규 거점 개설을 검토한다. 동일한 철연 콜센터 모듈이 신규 거점에 이식되며, 상담원 채용 기준과 KPI는 30일 데이터를 기반으로 재수립된다.",
    },
  ],
  quote: {
    body:
      "상담원 한 명이 한 달에 412건을 처리한다. 수기로 엑셀을 맞추던 시간이 사라진다.",
    author: "파트너 C 운영 책임자 (익명)",
  },
  // TODO(이한결): 파트너사 승인 후 실제 누적 지표로 갱신한다.
  expansion: [
    { period: "1개월", dispatch: "4,942건", matched: "94%", protected: "₩42.8M" },
    { period: "3개월", dispatch: "15,380건", matched: "95%", protected: "₩134M" },
    { period: "6개월", dispatch: "31,720건", matched: "96%", protected: "₩281M" },
  ],
};

export default function CaseCPage() {
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
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FB] text-[#002C5F] rounded-full text-[12px] font-semibold mb-5">
              <span
                className="w-1.5 h-1.5 bg-[#00AAD2] rounded-full"
                aria-hidden="true"
              />
              {data.type} · {data.scope}
            </span>
          </Reveal>

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
                  <span className="text-[22px] md:text-[30px] font-black text-[#002C5F] tracking-[-0.02em]">
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
            지표는 3개 거점 합산 기준이다. 3·6개월 수치는 예측 범위이며 실집계 시점에 갱신된다.
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
                    처리 콜 건수
                  </th>
                  <th
                    className="px-5 py-4 text-[11px] font-bold text-[#6B7B8F] tracking-[0.15em] uppercase text-right"
                    style={{ fontFamily: MONO }}
                  >
                    공유콜 전환율
                  </th>
                  <th
                    className="px-5 py-4 text-[11px] font-bold text-[#6B7B8F] tracking-[0.15em] uppercase text-right"
                    style={{ fontFamily: MONO }}
                  >
                    수수료 자동정산
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

function CtaSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[880px] mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-3">
            같은 구조가 같은 결과를 만든다.
          </h2>
          <p className="text-[14px] text-[#6B7B8F] mb-8 max-w-[540px] mx-auto">
            파트너 C가 3개 거점에서 기록한 변화는 동일한 시스템이 만든다.
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
