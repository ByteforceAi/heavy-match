"use client";

/**
 * HEAVY MATCH — Masterpiece Landing Page
 *
 * 10 섹션 구성:
 * 1. Hero (100vh)
 * 2. Social Proof Bar
 * 3. Problem Statement
 * 4. Solution (3단계 배차)
 * 5. Feature Deep Dive (6역할)
 * 6. Commission Structure
 * 7. Tech Architecture
 * 8. Pricing
 * 9. FAQ
 * 10. CTA + Footer
 */

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { colors } from "@/lib/design-system/tokens";
import * as copy from "@/content/copy";
import { HeroText, Reveal, StaggerContainer, StaggerItem, MotionButton, MotionCard, IndustrialGlass, CountUp } from "@/components/motion/MotionPrimitives";
import HeroBackground from "@/components/motion/HeroBackground";
import BootSplash from "@/components/motion/BootSplash";
import { CraneIcon, ExcavatorIcon, SkyIcon, PumpTruckIcon, ForkliftIcon, DumpTruckIcon, CargoCraneIcon, SpiderCraneIcon } from "@/components/icons/EquipmentIcons";

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

export default function LandingPage() {
  return (
    <main
      className="min-h-screen text-[#FAFAFA]"
      style={{
        fontFamily: "'Pretendard', 'Inter', -apple-system, sans-serif",
        letterSpacing: "-0.01em",
        background: colors.black,
      }}
    >
      <BootSplash />

      {/* ═══ 1. HERO (100vh) ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroBackground />
        {/* Nav */}
        <IndustrialGlass level="subtle" className="fixed top-0 w-full z-50 rounded-none">
          <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 h-16">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/hm-monogram.svg" alt="HM" className="w-8 h-8" />
              <span className="text-lg font-black tracking-[-0.03em] text-[#FAFAFA]">HEAVY<span className="text-[#FF6B1A]">MATCH</span></span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/demo" className="text-sm font-semibold text-[#9CA3AF] hover:text-[#FF6B1A] transition-colors px-3 py-2">데모</Link>
              <Link href="/login" className="text-sm font-semibold text-[#FAFAFA] bg-[#FF6B1A] hover:bg-[#FF8A4C] px-5 py-2.5 rounded-xl transition-colors">로그인</Link>
            </div>
          </div>
        </IndustrialGlass>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-16 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <Reveal delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF6B1A1A] border border-[#FF6B1A40] rounded-full text-sm font-semibold text-[#FF6B1A] mb-6">
                <span className="w-1.5 h-1.5 bg-[#FF6B1A] rounded-full animate-pulse" />
                {copy.hero.badge}
              </span>
            </Reveal>

            {/* Title */}
            <h1 className="mb-6" style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              <HeroText text={copy.hero.title.line1} className="block text-[#FAFAFA]" />
              <HeroText text={copy.hero.title.line2} className="block text-[#FF6B1A]" />
            </h1>

            {/* Subtitle */}
            <Reveal delay={0.4}>
              <p className="text-xl md:text-2xl font-semibold text-[#D1D5DB] mb-2" style={{ letterSpacing: "-0.02em" }}>
                {copy.hero.subtitle}
              </p>
              <p className="text-base text-[#6B7280] mb-10 max-w-xl">
                {copy.hero.description}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.6}>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/demo">
                  <MotionButton variant="primary" className="px-8 py-4 text-lg">
                    {copy.hero.cta.primary}
                  </MotionButton>
                </Link>
                <MotionButton variant="secondary" className="px-8 py-4 text-lg">
                  {copy.hero.cta.secondary}
                </MotionButton>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.8}>
              <div className="flex flex-wrap gap-8">
                {copy.hero.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-3xl md:text-4xl font-black text-[#FAFAFA] tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <CountUp target={parseInt(stat.value)} />
                      </span>
                      <span className="text-lg font-bold text-[#FF6B1A]">{stat.unit}</span>
                    </div>
                    <span className="text-xs text-[#6B7280] font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] text-[#6B7280] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#6B7280] to-transparent" />
        </div>
      </section>

      {/* ═══ 2. EQUIPMENT BAR ═══ */}
      <section className="py-16 border-t border-b border-[#3A3D45]/30">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-center text-sm text-[#6B7280] font-medium mb-6 uppercase tracking-widest">지원 장비 8종</p>
          </Reveal>
          <StaggerContainer className="flex flex-wrap justify-center gap-6 md:gap-10">
            {EQUIPMENT_ICONS.map(({ name, Icon }) => (
              <StaggerItem key={name} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1A1A20] border border-[#3A3D45]/60 group-hover:border-[#FF6B1A]/40 transition-colors text-[#9CA3AF] group-hover:text-[#FF6B1A]">
                  <Icon size={28} />
                </div>
                <span className="text-xs text-[#6B7280] group-hover:text-[#9CA3AF] transition-colors font-medium">{name}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 3. PROBLEM STATEMENT ═══ */}
      <section className="py-24 md:py-32">
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
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{item.description}</p>
                  <div className="pt-4 border-t border-[#3A3D45]/40">
                    <span className="text-2xl font-black text-[#FF6B1A] tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.stat}</span>
                    <span className="text-xs text-[#6B7280] ml-2">{item.statLabel}</span>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 4. SOLUTION (3단계 배차) ═══ */}
      <section className="py-24 md:py-32 bg-[#121216]">
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
                  {/* Step number */}
                  <span className="text-7xl font-black text-[#242428] absolute -top-6 -left-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{step.number}</span>
                  <div className="relative z-10 pt-8">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-[#FAFAFA]">{step.title}</h3>
                      <span className="px-2 py-0.5 bg-[#FF6B1A1A] text-[#FF6B1A] text-xs font-bold rounded-full">{step.duration}</span>
                    </div>
                    <p className="text-base text-[#9CA3AF] mb-3">{step.description}</p>
                    <p className="text-sm text-[#6B7280] font-mono">{step.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Flow arrow */}
          <Reveal delay={0.5}>
            <div className="flex justify-center mt-12">
              <Link href="/demo/simulation" className="inline-flex items-center gap-2 px-6 py-3 bg-[#242428] hover:bg-[#3A3D45] rounded-xl text-sm font-bold text-[#FAFAFA] transition-colors">
                <span className="material-symbols-outlined text-[#FF6B1A]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                E2E 시뮬레이션으로 전체 플로우 체험
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 5. ROLES ═══ */}
      <section className="py-24 md:py-32">
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
                      <span className="text-xs px-2 py-1 bg-[#242428] text-[#6B7280] rounded-lg font-mono">{role.device}</span>
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

      {/* ═══ 6. COMMISSION ═══ */}
      <section className="py-24 md:py-32 bg-[#121216]">
        <div className="max-w-[960px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Revenue</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>{copy.commission.title}</h2>
            <p className="text-lg text-[#6B7280] mb-4">{copy.commission.subtitle}</p>
            <p className="text-sm text-[#6B7280] mb-12">
              예시: {copy.commission.example.equipment} {copy.commission.example.duration} 임대비{" "}
              <span className="text-[#FAFAFA] font-bold tabular-nums">{formatPrice(copy.commission.example.price)}원</span> 기준
            </p>
          </Reveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {copy.commission.breakdown.map((item) => (
              <StaggerItem key={item.label}>
                <MotionCard className="p-5 text-center">
                  <p className="text-3xl font-black tabular-nums" style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace" }}>
                    {item.percent}
                  </p>
                  <p className="text-sm font-bold text-[#FAFAFA] mt-1">{item.label}</p>
                  <p className="text-xs text-[#6B7280] tabular-nums mt-0.5">{formatPrice(item.amount)}원</p>
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

      {/* ═══ 7. TECH ═══ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Technology</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>{copy.tech.title}</h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-xl">{copy.tech.subtitle}</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Stack */}
            <StaggerContainer className="space-y-3">
              {copy.tech.stack.map((item) => (
                <StaggerItem key={item.name}>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-[#1A1A20] border border-[#3A3D45]/40">
                    <span className="text-xs font-mono text-[#FF6B1A] bg-[#FF6B1A15] px-2 py-1 rounded-md w-20 text-center flex-shrink-0">{item.category}</span>
                    <div>
                      <p className="text-sm font-bold text-[#FAFAFA]">{item.name}</p>
                      <p className="text-xs text-[#6B7280]">{item.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Security */}
            <StaggerContainer className="space-y-3">
              {copy.tech.security.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#1A1A20] border border-[#3A3D45]/40">
                    <span className="material-symbols-outlined text-[#10B981] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-[#FAFAFA]">{item.title}</p>
                      <p className="text-xs text-[#6B7280]">{item.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══ 8. PRICING ═══ */}
      <section className="py-24 md:py-32 bg-[#121216]">
        <div className="max-w-[960px] mx-auto px-6 text-center">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-4" style={{ letterSpacing: "-0.03em" }}>{copy.pricing.title}</h2>
            <p className="text-6xl md:text-7xl font-black text-[#FF6B1A] mb-2 tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {copy.pricing.price}
            </p>
            <p className="text-sm text-[#6B7280] mb-12">{copy.pricing.priceNote}</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 text-left">
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
        </div>
      </section>

      {/* ═══ 9. FAQ ═══ */}
      <section className="py-24 md:py-32">
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

      {/* ═══ 10. FINAL CTA + FOOTER ═══ */}
      <section className="py-24 md:py-32 bg-[#121216]">
        <div className="max-w-[960px] mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-4" style={{ letterSpacing: "-0.03em" }}>
              직접 체험하고 판단하세요
            </h2>
            <p className="text-lg text-[#6B7280] mb-10">
              로그인 없이 6개 역할, 3가지 시나리오를 즉시 확인할 수 있습니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <MotionButton variant="primary" className="px-10 py-5 text-lg">
                  무료 데모 체험
                </MotionButton>
              </Link>
              <Link href="/demo/simulation">
                <MotionButton variant="secondary" className="px-10 py-5 text-lg">
                  E2E 시뮬레이션
                </MotionButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3A3D45]/30 py-12">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/hm-monogram.svg" alt="HM" className="w-7 h-7" />
            <span className="text-sm font-bold text-[#6B7280]">{copy.footer.company}</span>
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
