"use client";

/**
 * 철연 CHEOLYEON — Landing Page v2 (HD Navy Light)
 *
 * cheolyeon_v2.html 구조를 기준으로 재작성.
 * 섹션 구성 (v1 Masterpiece Dark → v2 Enterprise Light):
 *
 *   1. Nav (sticky) — 철연 + CHEOLYEON 워드마크
 *   2. Hero — 2-column (좌: 카피 / 우: LivePreviewCard)
 *   3. Stats Strip (Navy bg 4분할)
 *   4. Features — 3단계 폴백 · 전자계약 · 자동정산
 *   5. Solution — 3단계 배차 상세
 *   6. Roles — 6역할 카드
 *   7. Commission — 15% 수수료
 *   8. Pricing — 8,000만원
 *   9. Heritage — 부산일보 1998 재현 (L3 노출)
 *  10. FAQ
 *  11. Final CTA + ContactForm
 *  12. Footer
 *
 * heritage-v1.md §5 L3 노출, §3 금지 카피 전면 준수.
 * 관련 문서: docs/brand/PR-proposals/PR-06-rebrand-to-cheolyeon.md
 */

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import * as copy from "@/content/copy";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  MotionButton,
  MotionCard,
} from "@/components/motion/MotionPrimitives";
import HeritageSection from "@/components/cheolyeon/HeritageSection";
import LivePreviewCard from "@/components/cheolyeon/LivePreviewCard";
import ContactForm from "@/components/landing/ContactForm";

const SECTION_BASE =
  "py-16 md:py-20 max-w-[1400px] mx-auto px-6 md:px-12";

export default function LandingPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {/* ═══ 1. NAV ═══ */}
      <Navigation />

      {/* ═══ 2. HERO ═══ */}
      <HeroSection />

      {/* ═══ 3. STATS STRIP ═══ */}
      <StatsStrip />

      {/* ═══ 4. FEATURES ═══ */}
      <FeaturesSection />

      {/* ═══ 5. SOLUTION ═══ */}
      <SolutionSection />

      {/* ═══ 6. ROLES ═══ */}
      <RolesSection />

      {/* ═══ 7. COMMISSION ═══ */}
      <CommissionSection />

      {/* ═══ 8. PRICING ═══ */}
      <PricingSection />

      {/* ═══ 9. HERITAGE — v2 핵심 섹션 ═══ */}
      <HeritageSection />

      {/* ═══ 10. FAQ ═══ */}
      <FaqSection />

      {/* ═══ 11. FINAL CTA ═══ */}
      <FinalCtaSection />

      {/* ═══ 12. FOOTER ═══ */}
      <FooterSection />
    </main>
  );
}

// ═══════════════════════════════════════
// 1. NAVIGATION
// ═══════════════════════════════════════
function Navigation() {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6 md:gap-12"
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

      <ul className="hidden md:flex gap-7 flex-1 list-none m-0 p-0">
        {copy.nav.menu.map((item) => (
          <li key={item.label} className="relative">
            <a
              href={item.href}
              className={`text-[14px] font-medium transition-colors py-1 ${
                item.active ? "text-[#002C5F] font-semibold" : "text-[#3A4A5F] hover:text-[#002C5F]"
              }`}
            >
              {item.label}
              {item.active && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-22px] left-0 right-0 h-[2px] bg-[#002C5F]"
                />
              )}
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
// 2. HERO
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
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        {/* LEFT: 카피 */}
        <div>
          <Reveal delay={0.05}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FB] text-[#002C5F] rounded-full text-[12px] font-semibold mb-5">
              <span className="w-1.5 h-1.5 bg-[#00AAD2] rounded-full" aria-hidden="true" />
              {copy.hero.badge}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="font-[900] text-[#0A1628] mb-4"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
              }}
            >
              {copy.hero.title.line1}{" "}
              <span className="text-[#002C5F]">{copy.hero.title.emphasis}</span>
              <br />
              <span className="text-[#6B7B8F] font-bold">{copy.hero.title.line2}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="text-[15px] md:text-[16px] text-[#3A4A5F] leading-[1.75] mb-6 max-w-[520px]">
              {copy.hero.description}
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="flex flex-wrap gap-2.5 mb-8">
              <a href="#contact">
                <MotionButton variant="primary" className="px-6 py-3.5 text-[14px] inline-flex items-center gap-2">
                  {copy.hero.cta.primary}
                  <span aria-hidden="true">→</span>
                </MotionButton>
              </a>
              <Link href="/demo">
                <MotionButton variant="secondary" className="px-6 py-3.5 text-[14px]">
                  {copy.hero.cta.secondary}
                </MotionButton>
              </Link>
            </div>
          </Reveal>

          {/* Trust 수치 */}
          <Reveal delay={0.5}>
            <div className="flex gap-6 md:gap-8 pt-5 border-t border-[#E3E8EF]">
              {copy.hero.trust.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span
                    className="text-[18px] md:text-[20px] font-[800] text-[#002C5F] tracking-[-0.02em] tabular-nums"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    {item.value}
                  </span>
                  <span className="text-[11px] text-[#6B7B8F]">{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* §2.3 tagline — 작게, 하단 */}
          <Reveal delay={0.7}>
            <p
              className="mt-6 text-[12px] text-[#6B7B8F] italic"
              style={{ fontFamily: "var(--font-plex-kr), serif" }}
            >
              {copy.hero.tagline}
            </p>
          </Reveal>
        </div>

        {/* RIGHT: LIVE PREVIEW 미니 대시보드 */}
        <div>
          <LivePreviewCard />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 3. STATS STRIP — Navy bg
// ═══════════════════════════════════════
function StatsStrip() {
  return (
    <section
      className="relative overflow-hidden text-white px-6 md:px-12 py-8 md:py-10"
      style={{ background: "#002C5F" }}
      aria-label="주요 지표"
    >
      {/* 장식 radial */}
      <div
        aria-hidden="true"
        className="absolute left-[-50px] top-[-50px] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,170,210,0.15) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {copy.strip.items.map((item, i) => (
          <Reveal key={item.key} delay={i * 0.08}>
            <div>
              <p
                className="text-[11px] text-white/65 tracking-[0.15em] uppercase mb-1.5"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                {item.key}
              </p>
              <p className="text-[28px] md:text-[30px] font-[800] tracking-[-0.02em] tabular-nums mb-0.5">
                {item.value}
              </p>
              <p className="text-[11px] text-white/70">{item.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 4. FEATURES
// ═══════════════════════════════════════
function FeaturesSection() {
  return (
    <section id="platform" className={`${SECTION_BASE} border-b border-[#E3E8EF]`}>
      <Reveal>
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="text-[26px] md:text-[32px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2.5"
          >
            {copy.features.sectionLabel}
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#6B7B8F]">
            {copy.features.sectionSub}
          </p>
        </div>
      </Reveal>

      <StaggerContainer className="grid md:grid-cols-3 gap-5">
        {copy.features.items.map((item) => (
          <StaggerItem key={item.id}>
            <MotionCard className="p-7">
              <div className="w-[46px] h-[46px] bg-[#E8F1FB] rounded-[12px] flex items-center justify-center mb-4">
                <span
                  className="material-symbols-outlined text-[#002C5F]"
                  style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
              </div>
              <h3 className="text-[17px] font-bold text-[#0A1628] mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#6B7B8F] leading-[1.7]">{item.description}</p>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

// ═══════════════════════════════════════
// 5. SOLUTION — 3단계 배차 상세
// ═══════════════════════════════════════
function SolutionSection() {
  return (
    <section id="impact" className={`${SECTION_BASE} bg-white border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          Solution
        </p>
        <h2 className="text-[26px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2">
          {copy.solution.title}
        </h2>
        <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-10 md:mb-14 max-w-xl">
          {copy.solution.subtitle}
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-8">
        {copy.solution.steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.12}>
            <div className="relative">
              <span
                className="text-[80px] font-black text-[#E8F1FB] absolute -top-4 -left-1 select-none"
                style={{
                  fontFamily: "var(--font-roboto-mono), monospace",
                  letterSpacing: "-0.05em",
                }}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <div className="relative z-10 pt-10">
                <div className="flex items-center gap-2.5 mb-2">
                  <h3 className="text-[20px] font-bold text-[#0A1628]">{step.title}</h3>
                  <span className="px-2 py-0.5 bg-[#E8F1FB] text-[#002C5F] text-[11px] font-bold rounded-full">
                    {step.duration}
                  </span>
                </div>
                <p className="text-[14px] text-[#3A4A5F] leading-[1.7] mb-2">{step.description}</p>
                <p
                  className="text-[12px] text-[#6B7B8F]"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {step.detail}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 6. ROLES
// ═══════════════════════════════════════
function RolesSection() {
  return (
    <section className={`${SECTION_BASE} border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          Roles
        </p>
        <h2 className="text-[26px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2">
          {copy.roles.title}
        </h2>
        <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-10 max-w-xl">
          {copy.roles.subtitle}
        </p>
      </Reveal>

      <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {copy.roles.items.map((role) => (
          <StaggerItem key={role.id}>
            <Link href={`/demo/${role.id}`} className="block group">
              <MotionCard className="p-5 h-full">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0A1628]">{role.title}</h3>
                    <p className="text-[12px] text-[#6B7B8F]">{role.subtitle}</p>
                  </div>
                  <span
                    className="text-[10px] px-2 py-1 bg-[#F4F6FA] text-[#6B7B8F] rounded-md"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    {role.device}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {role.features.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] px-2 py-0.5 bg-[#F4F6FA] text-[#3A4A5F] rounded-md font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <span className="text-[13px] text-[#002C5F] font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  체험하기{" "}
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
// 7. COMMISSION
// ═══════════════════════════════════════
function CommissionSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#E3E8EF]">
      <div className="max-w-[960px] mx-auto px-6">
        <Reveal>
          <p
            className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            Revenue
          </p>
          <h2 className="text-[26px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2">
            {copy.commission.title}
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-3">
            {copy.commission.subtitle}
          </p>
          <p className="text-[13px] text-[#6B7B8F] mb-10">
            예시: {copy.commission.example.equipment} {copy.commission.example.duration} 임대비{" "}
            <span
              className="text-[#0A1628] font-bold tabular-nums"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {formatPrice(copy.commission.example.price)}원
            </span>{" "}
            기준
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {copy.commission.breakdown.map((item) => (
            <StaggerItem key={item.label}>
              <MotionCard className="p-5 text-center">
                <p
                  className="text-[28px] font-black tabular-nums"
                  style={{
                    color: item.color,
                    fontFamily: "var(--font-roboto-mono), monospace",
                  }}
                >
                  {item.percent}
                </p>
                <p className="text-[13px] font-bold text-[#0A1628] mt-1">{item.label}</p>
                <p
                  className="text-[11px] text-[#6B7B8F] tabular-nums mt-0.5"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {formatPrice(item.amount)}원
                </p>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal>
          <div className="bg-[#FEEBEC] border border-[#E5484D]/30 rounded-xl p-4 flex items-center gap-3">
            <span
              className="material-symbols-outlined text-[#E5484D]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
            <div>
              <p className="text-[13px] font-bold text-[#0A1628]">
                취소 페널티: {copy.commission.cancelPenalty.rate}
              </p>
              <p className="text-[12px] text-[#6B7B8F]">{copy.commission.cancelPenalty.description}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 8. PRICING
// ═══════════════════════════════════════
function PricingSection() {
  return (
    <section id="pricing" className={`${SECTION_BASE} border-b border-[#E3E8EF]`}>
      <Reveal>
        <div className="text-center max-w-[960px] mx-auto">
          <p
            className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            Pricing
          </p>
          <h2 className="text-[26px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-4">
            {copy.pricing.title}
          </h2>
          <p
            className="text-[48px] md:text-[64px] font-black text-[#002C5F] mb-2 tabular-nums"
            style={{
              fontFamily: "var(--font-roboto-mono), monospace",
              letterSpacing: "-0.05em",
            }}
          >
            {copy.pricing.price}
          </p>
          <p className="text-[12px] text-[#6B7B8F] mb-10">{copy.pricing.priceNote}</p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
        <Reveal delay={0.1}>
          <MotionCard className="p-6">
            <h3 className="text-[16px] font-bold text-[#0A1628] mb-4 flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#00A86B]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              포함 사항
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {copy.pricing.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[13px] text-[#3A4A5F]"
                >
                  <span
                    className="material-symbols-outlined text-[#00A86B] mt-0.5"
                    style={{ fontSize: 16 }}
                  >
                    check
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </MotionCard>
        </Reveal>
        <Reveal delay={0.15}>
          <MotionCard className="p-6">
            <h3 className="text-[16px] font-bold text-[#0A1628] mb-4 flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#FFB020]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                schedule
              </span>
              2단계 (별도 견적)
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {copy.pricing.notIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[13px] text-[#6B7B8F]"
                >
                  <span
                    className="material-symbols-outlined text-[#6B7B8F] mt-0.5"
                    style={{ fontSize: 16 }}
                  >
                    arrow_forward
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </MotionCard>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 10. FAQ
// ═══════════════════════════════════════
function FaqSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-[#E3E8EF]">
      <div className="max-w-[960px] mx-auto px-6">
        <Reveal>
          <h2 className="text-[24px] md:text-[32px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-10">
            {copy.faq.title}
          </h2>
        </Reveal>
        <StaggerContainer className="space-y-3">
          {copy.faq.items.map((item) => (
            <StaggerItem key={item.q}>
              <details className="group bg-white border border-[#E3E8EF] rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                  <span className="text-[15px] font-semibold text-[#0A1628] pr-4">
                    {item.q}
                  </span>
                  <span
                    className="material-symbols-outlined text-[#6B7B8F] group-open:rotate-180 transition-transform flex-shrink-0"
                    style={{ fontSize: 20 }}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </summary>
                <div className="px-5 pb-5 text-[13px] text-[#3A4A5F] leading-[1.7] border-t border-[#E3E8EF] pt-4">
                  {item.a}
                </div>
              </details>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 11. FINAL CTA + CONTACT
// ═══════════════════════════════════════
function FinalCtaSection() {
  return (
    <section id="contact" className={SECTION_BASE}>
      <div className="max-w-[960px] mx-auto">
        <Reveal>
          <div className="text-center mb-8 md:mb-10">
            <p
              className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {copy.finalCta.label}
            </p>
            <h2 className="text-[26px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-3">
              {copy.finalCta.title}
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#6B7B8F] max-w-xl mx-auto">
              {copy.finalCta.description}
            </p>
          </div>
        </Reveal>
        <ContactForm />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 12. FOOTER
// ═══════════════════════════════════════
function FooterSection() {
  return (
    <footer className="border-t border-[#E3E8EF] pt-10 pb-8 bg-[#EEF1F5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* 상단: 브랜드 + 링크 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#E3E8EF]">
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-[18px] font-black text-[#002C5F] tracking-[-0.03em]"
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
            <span className="text-[12px] text-[#6B7B8F] ml-2 hidden md:inline">
              {copy.footer.description}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {copy.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] text-[#3A4A5F] hover:text-[#002C5F] font-medium transition-colors min-h-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* 중단: 사업자 정보 (통신판매업 고시 의무 표기) */}
        <div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-[11px] text-[#6B7B8F] leading-[1.8]"
          style={{ fontFamily: "var(--font-roboto-mono), 'Pretendard', sans-serif" }}
        >
          <div className="space-y-0.5">
            <p>
              <span className="text-[#9AA8B8]">대표:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">{copy.footer.business.representative}</span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">사업자등록번호:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">{copy.footer.business.registrationNumber}</span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">통신판매업신고번호:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">{copy.footer.business.eCommerceNumber}</span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">호스팅 제공자:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">{copy.footer.business.hostingProvider}</span>
            </p>
          </div>
          <div className="space-y-0.5">
            <p>
              <span className="text-[#9AA8B8]">주소:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">{copy.footer.business.address}</span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">전화:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">{copy.footer.business.phone}</span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">이메일:</span>{" "}
              <a
                href={`mailto:${copy.footer.business.email}`}
                className="text-[#002C5F] hover:text-[#0046A4] font-medium transition-colors"
              >
                {copy.footer.business.email}
              </a>
            </p>
            <p>
              <span className="text-[#9AA8B8]">개인정보보호책임자:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {copy.footer.dpo.name} {copy.footer.dpo.title} ({copy.footer.dpo.email})
              </span>
            </p>
          </div>
        </div>

        {/* 하단: 저작권 + 면책 */}
        <div className="mt-6 pt-5 border-t border-[#E3E8EF] flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[10px] text-[#9AA8B8]">{copy.footer.copyright}</p>
          <p className="text-[10px] text-[#9AA8B8]">
            철연 · CHEOLYEON은 ㈜바이트포스의 중장비 배차·계약·정산 통합 플랫폼 상표다.
          </p>
        </div>
      </div>
    </footer>
  );
}
