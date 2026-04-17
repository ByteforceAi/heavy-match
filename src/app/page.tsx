"use client";

/**
 * HEAVY MATCH — Masterpiece Landing Page v2
 *
 * 12 섹션 구성 (v1 10섹션 + 신규 2섹션):
 * 1. Hero (100vh) — 좌측 카피 + 우측 LiveDashboard
 * 2. Equipment Bar (8종 SVG)
 * 3. Social Proof + Case Study  🆕
 * 4. Problem Statement
 * 5. Solution (3단계 배차)
 * 6. Feature Deep Dive (6역할)
 * 7. Live Demo Embed (iPhone)  🆕
 * 8. ROI Calculator  🆕
 * 9. Commission Structure
 * 10. Tech Architecture (SVG Diagram)  🆕
 * 11. Pricing + Onboarding Timeline  🆕
 * 12. FAQ
 * 13. Final CTA + Contact Form  🆕
 * 14. Footer
 */

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { colors } from "@/lib/design-system/tokens";
import * as copy from "@/content/copy";
import { HeroText, Reveal, StaggerContainer, StaggerItem, MotionButton, MotionCard, IndustrialGlass, CountUp } from "@/components/motion/MotionPrimitives";
import HeroBackground from "@/components/motion/HeroBackground";
import BootSplash from "@/components/motion/BootSplash";
import { CraneIcon, ExcavatorIcon, SkyIcon, PumpTruckIcon, ForkliftIcon, DumpTruckIcon, CargoCraneIcon, SpiderCraneIcon } from "@/components/icons/EquipmentIcons";
import { LiveDashboardPreview, ROICalculator, DemoEmbed, ArchitectureDiagram } from "@/components/landing/LandingSections";
import { SocialProof, OnboardingTimeline } from "@/components/landing/TrustSections";
import ContactForm from "@/components/landing/ContactForm";

const EQUIPMENT_ICONS = [
  { name: "크레인", Icon: CraneIcon },
  { name: "굴삭기", Icon: ExcavatorIcon },
  { name: "스카이", Icon: SkyIcon },
  { name: "펌프카", Icon: PumpTruckIcon },
  { name: "카고크레인", Icon: CargoCraneIcon },
  { name: "거미크레인", Icon: SpiderCraneIcon },
  { name: "지게차", Icon: ForkliftIcon },
  { name: "덤프", Icon: DumpTruckIcon },
];

const TRUST_BADGES = [
  { icon: "workspace_premium", label: "BYTEFORCE", sub: "32년 IT 경력" },
  { icon: "shield", label: "데이터 암호화", sub: "TLS 1.3 · AES-256" },
  { icon: "verified", label: "1년 AS 보증", sub: "무상 유지보수" },
  { icon: "code", label: "소스코드 100%", sub: "GitHub 전체 이전" },
];

export default function LandingPage() {
  return (
    <main
      className="min-h-screen text-[#FAFAFA]"
      style={{
        fontFamily: "var(--font-inter), 'Pretendard', -apple-system, sans-serif",
        letterSpacing: "-0.01em",
        background: colors.black,
      }}
    >
      <BootSplash />

      {/* ═══ 1. HERO (2-COLUMN) ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroBackground />

        {/* Sticky Glass Nav */}
        <IndustrialGlass level="subtle" className="fixed top-0 w-full z-50 rounded-none">
          <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 h-16">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/hm-monogram.svg" alt="HM" className="w-8 h-8" />
              <span className="text-lg font-black tracking-[-0.03em] text-[#FAFAFA]">HEAVY<span className="text-[#FF6B1A]">MATCH</span></span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/demo" className="text-sm font-semibold text-[#9CA3AF] hover:text-[#FF6B1A] transition-colors px-3 py-2">데모</Link>
              <a href="#contact" className="text-sm font-semibold text-[#FAFAFA] bg-[#FF6B1A] hover:bg-[#FF8A4C] px-4 md:px-5 py-2.5 rounded-xl transition-colors">도입 문의</a>
            </div>
          </div>
        </IndustrialGlass>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-16 w-full grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-center">
          {/* LEFT: Copy */}
          <div>
            <Reveal delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF6B1A1A] border border-[#FF6B1A40] rounded-full text-sm font-semibold text-[#FF6B1A] mb-6">
                <span className="w-1.5 h-1.5 bg-[#FF6B1A] rounded-full animate-pulse" />
                중장비 배차 B2B 플랫폼 · 실서비스 운영 중
              </span>
            </Reveal>

            <h1 className="mb-6" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.035em" }}>
              <HeroText text="매칭되지 않는" className="block text-[#FAFAFA]" />
              <HeroText text="배차는 없다." className="block text-[#FF6B1A]" />
            </h1>

            <Reveal delay={0.4}>
              <p className="text-xl md:text-2xl font-semibold text-[#D1D5DB] mb-2" style={{ letterSpacing: "-0.02em" }}>
                60초 전용콜. 3단계 폴백. 0건의 누락.
              </p>
              <p className="text-base text-[#6B7280] mb-8 max-w-xl leading-relaxed">
                건설사의 장비 요청부터 기사 배정, 전자서명, 정산까지 — 하나의 플랫폼에서.
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/demo">
                  <MotionButton variant="primary" className="px-7 py-4 text-base md:text-lg">
                    데모 체험하기
                  </MotionButton>
                </Link>
                <a href="#contact">
                  <MotionButton variant="secondary" className="px-7 py-4 text-base md:text-lg">
                    도입 문의
                  </MotionButton>
                </a>
              </div>
            </Reveal>

            {/* Trust badges */}
            <Reveal delay={0.8}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TRUST_BADGES.map((b) => (
                  <div key={b.label} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#FF6B1A] text-lg flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-[#D1D5DB]">{b.label}</p>
                      <p className="text-[10px] text-[#6B7280]">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Live Dashboard Preview */}
          <Reveal delay={0.5} direction="right">
            <LiveDashboardPreview />
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] text-[#6B7280] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#6B7280] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══ 2. EQUIPMENT BAR ═══ */}
      <section className="py-14 border-t border-b border-[#3A3D45]/30">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-center text-xs text-[#6B7280] font-semibold mb-6 uppercase tracking-widest">지원 장비 · 8 Equipment Types</p>
          </Reveal>
          <StaggerContainer className="flex flex-wrap justify-center gap-5 md:gap-10">
            {EQUIPMENT_ICONS.map(({ name, Icon }) => (
              <StaggerItem key={name} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1A1A20] border border-[#3A3D45]/60 group-hover:border-[#FF6B1A]/40 transition-colors text-[#9CA3AF] group-hover:text-[#FF6B1A]">
                  <Icon size={28} />
                </div>
                <span className="text-[11px] text-[#6B7280] group-hover:text-[#9CA3AF] transition-colors font-medium">{name}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 3. SOCIAL PROOF (NEW) ═══ */}
      <section className="py-24 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Proof of Concept</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>
              파일럿 운영 실적
            </h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-xl">
              3개 파일럿 파트너사와 함께 30일간 실서비스 검증을 거쳤습니다.
            </p>
          </Reveal>
          <SocialProof />
        </div>
      </section>

      {/* ═══ 4. PROBLEMS ═══ */}
      <section className="py-24 md:py-28 bg-[#121216] border-y border-[#3A3D45]/30">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Problem</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>{copy.problems.title}</h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-xl">{copy.problems.subtitle}</p>
          </Reveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {copy.problems.items.map((item) => (
              <StaggerItem key={item.title}>
                <MotionCard className="p-6 h-full">
                  <div className="w-10 h-10 bg-[#FF6B1A1A] rounded-xl flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[#FF6B1A]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#FAFAFA] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">{item.description}</p>
                  <div className="pt-4 border-t border-[#3A3D45]/40">
                    <span className="text-2xl font-black text-[#FF6B1A] tabular-nums" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{item.stat}</span>
                    <span className="text-xs text-[#6B7280] ml-2">{item.statLabel}</span>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 5. SOLUTION ═══ */}
      <section className="py-24 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Solution</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>{copy.solution.title}</h2>
            <p className="text-lg text-[#6B7280] mb-16 max-w-xl">{copy.solution.subtitle}</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {copy.solution.steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.15}>
                <div className="relative">
                  <span className="text-7xl font-black text-[#242428] absolute -top-6 -left-1 select-none" style={{ fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "-0.05em" }}>{step.number}</span>
                  <div className="relative z-10 pt-8">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-[#FAFAFA]">{step.title}</h3>
                      <span className="px-2 py-0.5 bg-[#FF6B1A1A] text-[#FF6B1A] text-xs font-bold rounded-full">{step.duration}</span>
                    </div>
                    <p className="text-base text-[#9CA3AF] mb-3">{step.description}</p>
                    <p className="text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{step.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. ROLES ═══ */}
      <section className="py-24 md:py-28 bg-[#121216] border-y border-[#3A3D45]/30">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Roles</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>{copy.roles.title}</h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-xl">{copy.roles.subtitle}</p>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {copy.roles.items.map((role) => (
              <StaggerItem key={role.id}>
                <Link href={`/demo/${role.id}`}>
                  <MotionCard className="p-5 h-full group">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#FAFAFA]">{role.title}</h3>
                        <p className="text-sm text-[#6B7280]">{role.subtitle}</p>
                      </div>
                      <span className="text-[10px] px-2 py-1 bg-[#242428] text-[#6B7280] rounded-md font-mono">{role.device}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {role.features.map((f) => (
                        <span key={f} className="text-[11px] px-2 py-0.5 bg-[#242428] text-[#9CA3AF] rounded-md font-medium">{f}</span>
                      ))}
                    </div>
                    <span className="text-sm text-[#FF6B1A] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      체험하기 <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </MotionCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 7. DEMO EMBED (NEW) ═══ */}
      <section className="py-24 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Live Demo</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>
              지금 바로 확인
            </h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-xl">
              랜딩 페이지에서 바로 확인하는 실제 앱 UI. 60초 타이머도 실제로 카운트됩니다.
            </p>
          </Reveal>
          <DemoEmbed />
        </div>
      </section>

      {/* ═══ 8. ROI CALCULATOR (NEW) ═══ */}
      <section className="py-24 md:py-28 bg-[#121216] border-y border-[#3A3D45]/30">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">ROI Calculator</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>
              우리 회사 기준 절감액
            </h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-xl">
              슬라이더를 움직여 월 배차량과 평균 임대비를 입력하면 연간 절감액과 투자 회수 기간이 계산됩니다.
            </p>
          </Reveal>
          <ROICalculator />
        </div>
      </section>

      {/* ═══ 9. COMMISSION ═══ */}
      <section className="py-24 md:py-28">
        <div className="max-w-[960px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Revenue</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>{copy.commission.title}</h2>
            <p className="text-lg text-[#6B7280] mb-4">{copy.commission.subtitle}</p>
            <p className="text-sm text-[#6B7280] mb-12">
              예시: {copy.commission.example.equipment} {copy.commission.example.duration} 임대비{" "}
              <span className="text-[#FAFAFA] font-bold tabular-nums" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{formatPrice(copy.commission.example.price)}원</span> 기준
            </p>
          </Reveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {copy.commission.breakdown.map((item) => (
              <StaggerItem key={item.label}>
                <MotionCard className="p-5 text-center">
                  <p className="text-3xl font-black tabular-nums" style={{ color: item.color, fontFamily: "var(--font-jetbrains), monospace" }}>
                    {item.percent}
                  </p>
                  <p className="text-sm font-bold text-[#FAFAFA] mt-1">{item.label}</p>
                  <p className="text-xs text-[#6B7280] tabular-nums mt-0.5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{formatPrice(item.amount)}원</p>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal>
            <div className="bg-[#EF44441A] border border-[#EF444440] rounded-xl p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#EF4444]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <div>
                <p className="text-sm font-bold text-[#FAFAFA]">취소 페널티: {copy.commission.cancelPenalty.rate}</p>
                <p className="text-xs text-[#6B7280]">{copy.commission.cancelPenalty.description}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 10. TECH ARCHITECTURE (NEW — with SVG diagram) ═══ */}
      <section className="py-24 md:py-28 bg-[#121216] border-y border-[#3A3D45]/30">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Technology</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>시스템 아키텍처</h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-xl">
              Next.js 16 + Supabase + Vercel 기반 엔터프라이즈 스택. 확장 가능하고 안전합니다.
            </p>
          </Reveal>

          <div className="mb-10">
            <ArchitectureDiagram />
          </div>

          {/* Security highlights */}
          <div className="grid md:grid-cols-4 gap-4">
            {copy.tech.security.map((item) => (
              <Reveal key={item.title} delay={0.1}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#1A1A20] border border-[#3A3D45]/40">
                  <span className="material-symbols-outlined text-[#10B981] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-[#FAFAFA]">{item.title}</p>
                    <p className="text-xs text-[#6B7280]">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 11. PRICING + ONBOARDING (NEW) ═══ */}
      <section className="py-24 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-[960px] mx-auto">
              <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Pricing</p>
              <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-4" style={{ letterSpacing: "-0.03em" }}>{copy.pricing.title}</h2>
              <p className="text-6xl md:text-7xl font-black text-[#FF6B1A] mb-2 tabular-nums" style={{ fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "-0.05em" }}>
                {copy.pricing.price}
              </p>
              <p className="text-sm text-[#6B7280] mb-12">{copy.pricing.priceNote}</p>
            </div>
          </Reveal>

          {/* Includes/Excludes */}
          <div className="grid md:grid-cols-2 gap-8 max-w-[960px] mx-auto mb-16">
            <Reveal delay={0.1}>
              <MotionCard className="p-6">
                <h3 className="text-lg font-bold text-[#FAFAFA] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10B981]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  포함 사항
                </h3>
                <ul className="space-y-2.5">
                  {copy.pricing.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#9CA3AF]">
                      <span className="material-symbols-outlined text-sm text-[#10B981] mt-0.5">check</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </MotionCard>
            </Reveal>
            <Reveal delay={0.2}>
              <MotionCard className="p-6">
                <h3 className="text-lg font-bold text-[#FAFAFA] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#FFA523]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                  2단계 (별도 견적)
                </h3>
                <ul className="space-y-2.5">
                  {copy.pricing.notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#6B7280]">
                      <span className="material-symbols-outlined text-sm text-[#6B7280] mt-0.5">arrow_forward</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </MotionCard>
            </Reveal>
          </div>

          {/* Onboarding Timeline */}
          <Reveal>
            <div className="mb-8">
              <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Onboarding Timeline</p>
              <h3 className="text-2xl md:text-3xl font-[900] text-[#FAFAFA] mb-2" style={{ letterSpacing: "-0.03em" }}>4주 안에 정식 운영</h3>
              <p className="text-sm text-[#6B7280]">계약 → 배포 → 학습 → 운영</p>
            </div>
          </Reveal>
          <OnboardingTimeline />
        </div>
      </section>

      {/* ═══ 12. FAQ ═══ */}
      <section className="py-24 md:py-28 bg-[#121216] border-y border-[#3A3D45]/30">
        <div className="max-w-[960px] mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-[900] text-[#FAFAFA] mb-12" style={{ letterSpacing: "-0.03em" }}>{copy.faq.title}</h2>
          </Reveal>
          <StaggerContainer className="space-y-3">
            {copy.faq.items.map((item) => (
              <StaggerItem key={item.q}>
                <details className="group bg-[#1A1A20] border border-[#3A3D45]/40 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                    <span className="text-base font-semibold text-[#FAFAFA] pr-4">{item.q}</span>
                    <span className="material-symbols-outlined text-[#6B7280] group-open:rotate-180 transition-transform flex-shrink-0">expand_more</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-[#9CA3AF] leading-relaxed border-t border-[#3A3D45]/30 pt-4">
                    {item.a}
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 13. FINAL CTA + CONTACT (NEW) ═══ */}
      <section id="contact" className="py-24 md:py-28">
        <div className="max-w-[960px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Get Started</p>
              <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-4" style={{ letterSpacing: "-0.03em" }}>
                도입 상담 신청
              </h2>
              <p className="text-lg text-[#6B7280] max-w-xl mx-auto">
                24시간 이내에 BYTEFORCE 사업개발팀에서 연락드립니다.
              </p>
            </div>
          </Reveal>
          <ContactForm />
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[#3A3D45]/30 py-10 bg-[#0A0A0B]">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/hm-monogram.svg" alt="HM" className="w-7 h-7" />
            <div>
              <span className="text-sm font-bold text-[#D1D5DB] block">{copy.footer.company}</span>
              <span className="text-xs text-[#6B7280]">중장비 배차 매칭 솔루션</span>
            </div>
          </div>
          <div className="flex gap-6">
            {copy.footer.links.map((link) => (
              <a key={link.label} href={link.href} className="text-xs text-[#6B7280] hover:text-[#9CA3AF] transition-colors">{link.label}</a>
            ))}
          </div>
          <p className="text-xs text-[#3A3D45]">{copy.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
