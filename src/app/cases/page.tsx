"use client";

/**
 * /cases — 도입 사례 인덱스 (Customer Cases Index)
 *
 * B2B 영업 표면. 80M KRW 결정을 앞둔 바이어가 "누가 이미 썼는가"를
 * 확인하는 페이지. 익명화된 파트너 3사(A·B·C)의 핵심 지표를 카드로 나열한다.
 *
 * heritage-v1.md §3 금지 카피 준수:
 *   - 1인칭 "우리" 금지
 *   - 감탄 부호(!) 금지
 *   - 판결문 어미 (~한다/~된다) 유지
 *   - 실명 금지, 파트너 A/B/C + 업종 라벨만 노출
 *
 * 실명 공개는 파트너사 승인 후 이한결 대표가 갱신한다.
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
// CASE INDEX DATA — 파트너 A/B/C 요약
// 실명은 공개되지 않는다. "파트너 {code}" + 업종 라벨만 사용.
// TODO(이한결): 파트너사 승인 후 실명·로고를 교체한다.
// ═══════════════════════════════════════
const cases = [
  {
    code: "A",
    slug: "a",
    type: "대형 건설사",
    scope: "서울·경기 현장 12곳",
    icon: "apartment",
    keyMetric: {
      label: "배차 실패율",
      before: "15%",
      after: "0.3%",
    },
    headline: "수기 배차의 혼란을 종결한다",
    accent: "#002C5F",
  },
  {
    code: "B",
    slug: "b",
    type: "중소 장비임대",
    scope: "경남 · 사장 1인 · 기사 7명",
    icon: "local_shipping",
    keyMetric: {
      label: "전용콜 수락률",
      before: "42%",
      after: "91%",
    },
    headline: "재주문이 3배로 늘어난다",
    accent: "#0046A4",
  },
  {
    code: "C",
    slug: "c",
    type: "콜센터 운영",
    scope: "부산·울산·경남 거점",
    icon: "support_agent",
    keyMetric: {
      label: "상담원 1인당 월 처리",
      before: "230건",
      after: "412건",
    },
    headline: "공유콜 자동화로 생산성이 1.8배 된다",
    accent: "#00AAD2",
  },
];

export default function CasesIndexPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <CasesNav />
      <HeroSection />
      <CaseGrid />
      <BottomCta />
      <CasesFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// NAV — 랜딩과 동일 패턴
// ═══════════════════════════════════════
function CasesNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6 md:gap-12"
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

      <ul className="hidden md:flex gap-7 flex-1 list-none m-0 p-0">
        {navCopy.menu.map((item) => (
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
          href="/"
          className="hidden sm:inline-flex items-center px-4 py-2 text-[13px] font-medium text-[#3A4A5F] bg-transparent border border-[#E3E8EF] rounded-lg hover:bg-[#F4F6FA] transition-colors min-h-0"
        >
          메인으로
        </Link>
        <Link
          href="/demo"
          className="inline-flex items-center px-4 md:px-5 py-2 text-[13px] font-semibold text-white bg-[#002C5F] hover:bg-[#0046A4] rounded-lg transition-colors min-h-0"
        >
          {navCopy.cta.primary}
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// HERO
// ═══════════════════════════════════════
function HeroSection() {
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
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <Reveal delay={0.05}>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-5"
            style={{ fontFamily: MONO }}
          >
            CUSTOMER CASES · 도입 현장 사례
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="font-[900] text-[#0A1628] mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            기록된 변화, <span className="text-[#002C5F]">검증 가능한 수치.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[15px] md:text-[16px] text-[#3A4A5F] leading-[1.75] max-w-[640px]">
            철연 도입 후 실제 현장의 지표 변화가 기록된다. 모든 수치는 30일 집계 기준이다.
            아래 3개 사례는 파일럿 파트너사의 동의 범위 내 익명 공개이며, 실명은 파트너사 승인
            시점에 갱신된다.
          </p>
        </Reveal>

        {/* 메타 라인 */}
        <Reveal delay={0.3}>
          <div
            className="mt-8 flex flex-wrap gap-6 pt-5 border-t border-[#E3E8EF] text-[12px] text-[#6B7B8F]"
            style={{ fontFamily: MONO }}
          >
            <span>
              <span className="text-[#002C5F] font-bold mr-1">3</span>CASES
            </span>
            <span>
              <span className="text-[#002C5F] font-bold mr-1">30</span>DAY METRICS
            </span>
            <span>
              <span className="text-[#002C5F] font-bold mr-1">A · B · C</span>ANONYMIZED
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// CASE GRID
// ═══════════════════════════════════════
function CaseGrid() {
  return (
    <section className="py-16 md:py-20 max-w-[1280px] mx-auto px-6">
      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cases.map((c) => (
          <StaggerItem key={c.code}>
            <Link href={`/cases/${c.slug}`} className="block group">
              <MotionCard className="p-7 h-full">
                {/* Icon + Partner Code */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center"
                    style={{ background: "#E8F1FB" }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 26,
                        color: c.accent,
                        fontVariationSettings: "'FILL' 1",
                      }}
                      aria-hidden="true"
                    >
                      {c.icon}
                    </span>
                  </div>
                  <span
                    className="text-[11px] text-[#6B7B8F] tracking-[0.25em]"
                    style={{ fontFamily: MONO }}
                  >
                    PARTNER · {c.code}
                  </span>
                </div>

                {/* Type + Scope */}
                <p className="text-[12px] font-bold text-[#002C5F] mb-1 tracking-[0.02em]">
                  {c.type}
                </p>
                <p className="text-[12px] text-[#6B7B8F] mb-6">{c.scope}</p>

                {/* Key Metric */}
                <div className="mb-5 pb-5 border-b border-[#E3E8EF]">
                  <p
                    className="text-[10px] text-[#6B7B8F] tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: MONO }}
                  >
                    {c.keyMetric.label}
                  </p>
                  <div
                    className="flex items-baseline gap-2 tabular-nums"
                    style={{ fontFamily: MONO }}
                  >
                    <span className="text-[18px] font-bold text-[#9AA8B8] line-through decoration-[1.5px]">
                      {c.keyMetric.before}
                    </span>
                    <span className="text-[#9AA8B8]" aria-hidden="true">
                      →
                    </span>
                    <span className="text-[28px] md:text-[30px] font-black text-[#002C5F] tracking-[-0.02em]">
                      {c.keyMetric.after}
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <p
                  className="text-[14px] text-[#3A4A5F] leading-[1.65] mb-4"
                  style={{ fontFamily: PLEX }}
                >
                  {c.headline}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#002C5F] group-hover:translate-x-0.5 transition-transform">
                  사례 상세 보기
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 16 }}
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </span>
              </MotionCard>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

// ═══════════════════════════════════════
// BOTTOM CTA
// ═══════════════════════════════════════
function BottomCta() {
  return (
    <section className="border-t border-[#E3E8EF] bg-white">
      <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-20 text-center">
        <Reveal>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
            style={{ fontFamily: MONO }}
          >
            NEXT STEP
          </p>
          <h2 className="text-[26px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-3">
            같은 구조가 같은 결과를 낸다.
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-8 max-w-xl mx-auto">
            파트너 A·B·C가 겪은 30일의 변화는 동일한 시스템이 만든다. 현장 조건을 공유하면
            BYTEFORCE 사업개발팀이 24시간 이내에 연락을 회신한다.
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
            <Link href="/demo">
              <MotionButton variant="secondary" className="px-6 py-3.5 text-[14px]">
                데모 체험
              </MotionButton>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// FOOTER — 랜딩과 동일
// ═══════════════════════════════════════
function CasesFooter() {
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
          <span className="text-[11px] text-[#6B7B8F] ml-3 hidden md:inline">
            {footerCopy.description}
          </span>
        </div>
        <div className="flex gap-5">
          {footerCopy.links.map((link) => (
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
          {footerCopy.address} · {footerCopy.email}
        </p>
      </div>
      <p className="max-w-[1280px] mx-auto px-6 md:px-12 mt-3 text-[10px] text-[#9AA8B8]">
        {footerCopy.copyright}
      </p>
    </footer>
  );
}
