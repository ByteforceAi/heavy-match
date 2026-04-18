"use client";

/**
 * /cases/b — 파트너 B · 중소 장비임대
 *
 * 익명화 기준: "파트너 B · 장비임대 · 경남 지역 · 사장 1인 · 기사 7명".
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
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";

const MONO = "var(--font-roboto-mono), monospace";
const PLEX = "var(--font-plex-kr), 'IBM Plex Sans KR', Pretendard, sans-serif";

const caseData = {
  code: "B",
  type: "장비임대",
  scope: "경남 지역 · 사장 1인 · 기사 7명",
  h1: "전용콜 수락률 42% → 91%",
  sub: "수기 콜 관리의 혼선이 철연의 전용콜 UI로 대체된다. 60초 안에 수락이 끝난다.",
  metrics: [
    {
      label: "전용콜 수신 → 수락",
      before: "42%",
      after: "91%",
    },
    {
      label: "월 매출",
      before: "₩18,000,000",
      after: "₩27,000,000",
    },
    {
      label: "재주문 비중",
      before: "12%",
      after: "44%",
    },
    {
      label: "월 공콜 (노쇼 운행)",
      before: "8건",
      after: "0건",
    },
  ],
  story: [
    {
      title: "도입 배경",
      body: "경남 지역 장비임대 파트너 B는 사장 1인이 카카오톡·문자·전화를 병행하여 기사 7명의 배차를 관리하였다. 전용콜 수락률은 42%에 머물렀고, 수락한 건 중에서도 월 8건의 공콜(노쇼 운행)이 발생한다. 재주문 비중은 12%였다.",
    },
    {
      title: "도입 결정",
      body: "2025년 10월 시연 후 3주간 단일 기사 대상 PoC가 진행된다. 전용콜 수신부터 수락까지 60초 타이머 UI가 휴대폰 화면에서 끝나는 것이 결정 요인으로 기록된다. 사장이 별도 관리 도구를 학습하지 않는 점도 검토 조서에 명시된다.",
    },
    {
      title: "운영 경과 (첫 30일)",
      body: "전용콜 수신 → 수락 전환이 42%에서 91%로 상승한다. 기사 7명 전원이 동일한 UI로 배차를 수락하며, 수기 관리에서 자주 발생하던 중복 배차와 공콜이 0건으로 수렴한다. 월 매출은 기준치 1,800만원에서 2,700만원으로 증가한다.",
    },
    {
      title: "확장 계획",
      body: "파트너 B는 같은 지역의 동종 임대사 2곳에 철연을 추천한다. BYTEFORCE는 파트너 B의 운영 데이터를 기초선 삼아 경남권 중소 임대사 공동 도입 패키지를 2026년 2분기 출시 목표로 한다.",
    },
  ],
  quote: {
    body: "전용콜은 내 휴대폰에서 60초 안에 수락이 끝난다. 재주문이 3배 늘었다.",
    author: "파트너 B 사장 (익명)",
  },
  // TODO(이한결): 파트너사 승인 후 실제 누적 지표로 갱신한다.
  expansion: [
    { period: "1개월", dispatch: "164건", matched: "91%", protected: "₩27.0M" },
    { period: "3개월", dispatch: "502건", matched: "93%", protected: "₩83.4M" },
    { period: "6개월", dispatch: "1,028건", matched: "94%", protected: "₩171M" },
  ],
};

export default function CaseBPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <ArticleSchema
        headline="파트너 B · 전용콜 수락률 42% → 91%"
        description="중소 장비임대 도입 사례. 수기 콜 관리에서 전용콜 UI로 전환."
        urlPath="/cases/b"
        datePublished="2026-04-18T00:00:00+09:00"
        articleSection="Customer Cases"
      />
      <BreadcrumbSchema
        items={[
          { label: "홈", href: "/" },
          { label: "도입 사례", href: "/cases" },
          { label: "파트너 B", href: "/cases/b" },
        ]}
      />
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
            지표는 기사 7명 체제 기준이다. 3·6개월 수치는 예측 범위이며 실집계 시점에 갱신된다.
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
                    수락률
                  </th>
                  <th
                    className="px-5 py-4 text-[11px] font-bold text-[#6B7B8F] tracking-[0.15em] uppercase text-right"
                    style={{ fontFamily: MONO }}
                  >
                    누적 매출
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
            파트너 B가 30일 동안 기록한 변화는 동일한 시스템이 만든다.
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
