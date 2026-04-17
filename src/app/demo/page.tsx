"use client";

/**
 * Demo Intro — Dark Masterpiece Theme (Hybrid Option C)
 *
 * /와 동일한 Safety Orange + Dark Industrial 팔레트.
 * 역할 카드 클릭 시 → 라이트 MD3 대시보드로 전환 (실제 앱 미리보기 느낌).
 */

import Link from "next/link";
import { colors } from "@/lib/design-system/tokens";
import {
  HeroText, Reveal, StaggerContainer, StaggerItem,
  MotionButton, MotionCard, IndustrialGlass,
} from "@/components/motion/MotionPrimitives";
import HeroBackground from "@/components/motion/HeroBackground";
import {
  CraneIcon, ExcavatorIcon, SkyIcon, PumpTruckIcon,
  ForkliftIcon, DumpTruckIcon, CargoCraneIcon, SpiderCraneIcon,
} from "@/components/icons/EquipmentIcons";

// ═══════════════════════════════════════
// ROLE DATA — 6개 역할
// ═══════════════════════════════════════
const ROLES = [
  {
    id: "requester", label: "장비요청자", desc: "건설사 현장소장",
    icon: "person_search", orangeAccent: true,
    tags: ["장비 요청", "배차 현황", "적립금"],
    device: "모바일 우선",
  },
  {
    id: "owner", label: "중장비사장", desc: "장비 임대 업체",
    icon: "local_shipping", orangeAccent: false,
    tags: ["콜 수신", "단가 설정", "기사 관리"],
    device: "모바일 100%",
  },
  {
    id: "operator", label: "기사", desc: "장비 운전 기사",
    icon: "engineering", orangeAccent: false,
    tags: ["배차 확인", "전자서명", "작업 이력"],
    device: "모바일 전용",
  },
  {
    id: "callcenter", label: "콜센터", desc: "상담원",
    icon: "support_agent", orangeAccent: false,
    tags: ["콜 관리", "사장 관리", "수수료"],
    device: "데스크탑",
  },
  {
    id: "salesperson", label: "영업사원", desc: "앱 분양 담당",
    icon: "payments", orangeAccent: false,
    tags: ["분양 현황", "수수료", "월별 실적"],
    device: "데스크탑",
  },
  {
    id: "admin", label: "관리자", desc: "플랫폼 운영자",
    icon: "admin_panel_settings", orangeAccent: true,
    tags: ["대시보드", "사용자", "마스터"],
    device: "데스크탑",
  },
];

// ═══════════════════════════════════════
// 배차 6단계
// ═══════════════════════════════════════
const FLOW_STEPS = [
  { num: "01", title: "장비 요청", desc: "건설사가 장비·규격·시간 선택 후 전자서명으로 요청", actor: "장비요청자", accent: "#FF6B1A" },
  { num: "02", title: "전용콜", desc: "지정 사장에게 SMS 발송 — 60초 타이머 시작", actor: "중장비사장", accent: "#FFA523", highlight: "60초" },
  { num: "03", title: "콜센터 전달", desc: "60초 미수락 시 해당 사장의 콜센터로 자동 전달", actor: "콜센터", accent: "#FF6B1A" },
  { num: "04", title: "공유콜", desc: "같은 지역 사장 전체에게 동시 발송 — 선착순 매칭", actor: "중장비사장", accent: "#FFA523" },
  { num: "05", title: "기사 배정", desc: "매칭된 사장이 소속 기사를 선택하여 배정", actor: "중장비사장", accent: "#FF6B1A" },
  { num: "06", title: "작업 완료", desc: "기사 전자서명 → 작업확인서 자동 생성, 수수료 정산", actor: "기사", accent: "#10B981" },
];

// ═══════════════════════════════════════
// 장비 8종
// ═══════════════════════════════════════
const EQUIPMENT = [
  { name: "크레인", Icon: CraneIcon },
  { name: "굴삭기", Icon: ExcavatorIcon },
  { name: "스카이", Icon: SkyIcon },
  { name: "펌프카", Icon: PumpTruckIcon },
  { name: "카고크레인", Icon: CargoCraneIcon },
  { name: "거미크레인", Icon: SpiderCraneIcon },
  { name: "지게차", Icon: ForkliftIcon },
  { name: "덤프", Icon: DumpTruckIcon },
];

export default function DemoPage() {
  return (
    <main
      className="min-h-screen text-[#FAFAFA] relative"
      style={{
        fontFamily: "'Pretendard', 'Inter', -apple-system, sans-serif",
        letterSpacing: "-0.01em",
        background: colors.black,
      }}
    >
      {/* ═══ Navigation ═══ */}
      <IndustrialGlass level="subtle" className="fixed top-0 w-full z-50 rounded-none">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 h-16">
          <Link href="/" className="flex items-center gap-2 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/hm-monogram.svg" alt="HM" className="w-8 h-8" />
            <span className="text-lg font-black tracking-[-0.03em] text-[#FAFAFA]">
              HEAVY<span className="text-[#FF6B1A]">MATCH</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold text-[#9CA3AF] hover:text-[#FF6B1A] transition-colors px-3 py-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              메인으로
            </Link>
            <Link href="/demo/simulation" className="text-sm font-semibold text-[#FAFAFA] bg-[#FF6B1A] hover:bg-[#FF8A4C] px-5 py-2.5 rounded-xl transition-colors">
              E2E 시뮬레이션
            </Link>
          </div>
        </div>
      </IndustrialGlass>

      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <HeroBackground />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF6B1A1A] border border-[#FF6B1A40] rounded-full text-sm font-semibold text-[#FF6B1A] mb-8">
              <span className="w-1.5 h-1.5 bg-[#FF6B1A] rounded-full animate-pulse" />
              Demo Environment · 로그인 없이 바로 체험
            </span>
          </Reveal>

          <h1 className="mb-6 max-w-4xl mx-auto" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            <HeroText text="6개 역할을" className="block text-[#FAFAFA]" />
            <HeroText text="직접 조작해보세요" className="block text-[#FF6B1A]" />
          </h1>

          <Reveal delay={0.4}>
            <p className="text-xl md:text-2xl font-semibold text-[#D1D5DB] mb-3" style={{ letterSpacing: "-0.02em" }}>
              전용콜 → 콜센터 → 공유콜. 3단계 폴백 자동화.
            </p>
            <p className="text-base text-[#6B7280] max-w-2xl mx-auto mb-12">
              각 역할별 대시보드가 실제로 어떻게 작동하는지 확인하세요. 시뮬레이션 데이터로 안전하게 체험 가능합니다.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/demo/simulation">
                <MotionButton variant="primary" className="px-8 py-4 text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  E2E 시뮬레이션 실행
                </MotionButton>
              </Link>
              <Link href="#roles">
                <MotionButton variant="secondary" className="px-8 py-4 text-lg">
                  역할 선택하기 ↓
                </MotionButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Equipment 8종 ═══ */}
      <section className="py-16 border-t border-b border-[#3A3D45]/30">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-center text-sm text-[#6B7280] font-medium mb-6 uppercase tracking-widest">
              지원 장비 · 8 Equipment Types
            </p>
          </Reveal>
          <StaggerContainer className="flex flex-wrap justify-center gap-6 md:gap-10">
            {EQUIPMENT.map(({ name, Icon }) => (
              <StaggerItem key={name} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#1A1A20] border border-[#3A3D45]/60 group-hover:border-[#FF6B1A]/40 transition-colors text-[#9CA3AF] group-hover:text-[#FF6B1A]">
                  <Icon size={32} />
                </div>
                <span className="text-xs text-[#6B7280] group-hover:text-[#9CA3AF] transition-colors font-medium">{name}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ Role Selection (핵심) ═══ */}
      <section id="roles" className="py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Select a Role</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>
              어떤 역할을 체험하시겠어요?
            </h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-xl">
              각 역할별 실제 앱 화면으로 이동합니다. 모든 데이터는 시뮬레이션입니다.
            </p>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map((role) => (
              <StaggerItem key={role.id}>
                <Link href={`/demo/${role.id}`}>
                  <MotionCard className="p-6 h-full group relative overflow-hidden">
                    {role.orangeAccent && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B1A] opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    )}

                    <div className="flex items-start justify-between mb-4 relative">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role.orangeAccent ? "bg-[#FF6B1A1A] text-[#FF6B1A]" : "bg-[#242428] text-[#9CA3AF]"}`}>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{role.icon}</span>
                      </div>
                      <span className="text-[10px] px-2 py-1 bg-[#242428] text-[#6B7280] rounded-md font-mono">{role.device}</span>
                    </div>

                    <h3 className="text-xl font-[800] text-[#FAFAFA] mb-1" style={{ letterSpacing: "-0.02em" }}>{role.label}</h3>
                    <p className="text-sm text-[#6B7280] mb-4">{role.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {role.tags.map((tag) => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 bg-[#242428] text-[#9CA3AF] rounded-md font-medium">{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#3A3D45]/40">
                      <span className="text-sm text-[#FF6B1A] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        체험하기
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </span>
                      <span className="text-[10px] text-[#3A3D45] font-mono">/{role.id}</span>
                    </div>
                  </MotionCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 6-Step Flow ═══ */}
      <section className="py-24 bg-[#121216] border-y border-[#3A3D45]/30">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Dispatch Flow</p>
            <h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>
              한 번에 이해하는 배차 흐름
            </h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-xl">
              장비 요청부터 작업 완료까지 6단계. 각 단계마다 서로 다른 역할이 관여합니다.
            </p>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FLOW_STEPS.map((step) => (
              <StaggerItem key={step.num}>
                <MotionCard className="p-6 h-full relative">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-5xl font-black tabular-nums"
                      style={{ color: step.accent, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.05em" }}
                    >
                      {step.num}
                    </span>
                    {step.highlight && (
                      <span className="px-2 py-1 bg-[#FFA52315] border border-[#FFA52340] rounded-full text-xs font-bold text-[#FFA523] animate-pulse">
                        ⏱ {step.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#FAFAFA] mb-2" style={{ letterSpacing: "-0.02em" }}>{step.title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">{step.desc}</p>

                  <div className="pt-4 border-t border-[#3A3D45]/40">
                    <span className="text-[10px] uppercase tracking-widest text-[#6B7280] block mb-1">Actor</span>
                    <span className="text-sm font-bold text-[#D1D5DB]">{step.actor}</span>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.3}>
            <div className="flex justify-center mt-12">
              <Link href="/demo/simulation">
                <MotionButton variant="primary" className="px-8 py-4 text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  전체 6단계 시뮬레이션 실행
                </MotionButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Commission ═══ */}
      <section className="py-24">
        <div className="max-w-[960px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-[#FF6B1A] font-semibold uppercase tracking-widest mb-3">Revenue Model</p>
            <h2 className="text-3xl md:text-4xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>
              투명한 15% 수수료 분배
            </h2>
            <p className="text-sm text-[#6B7280] mb-10">
              예시: 크레인 50T 1일 임대비{" "}
              <span className="text-[#FAFAFA] font-bold tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace" }}>1,000,000원</span> 기준
            </p>
          </Reveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "본사 수익", percent: "5%", amount: "50,000", color: "#FF6B1A" },
              { label: "콜센터", percent: "2.5%", amount: "25,000", color: "#FFA523" },
              { label: "영업사원", percent: "2.5%", amount: "25,000", color: "#8B5CF6" },
              { label: "건설사 적립", percent: "5%", amount: "50,000", color: "#10B981" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <MotionCard className="p-5 text-center">
                  <p className="text-3xl font-black tabular-nums" style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace" }}>
                    {item.percent}
                  </p>
                  <p className="text-sm font-bold text-[#FAFAFA] mt-1">{item.label}</p>
                  <p className="text-xs text-[#6B7280] tabular-nums mt-0.5">{item.amount}원</p>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-24 bg-[#121216] border-t border-[#3A3D45]/30">
        <div className="max-w-[960px] mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-[900] text-[#FAFAFA] mb-4" style={{ letterSpacing: "-0.03em" }}>
              이제 직접 체험해보세요
            </h2>
            <p className="text-lg text-[#6B7280] mb-10">
              6개 역할, 3가지 시나리오. 로그인 없이 모든 기능을 확인할 수 있습니다.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/demo/simulation">
                <MotionButton variant="primary" className="px-8 py-4 text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>movie</span>
                  E2E 시뮬레이션
                </MotionButton>
              </Link>
              <Link href="/demo/owner">
                <MotionButton variant="secondary" className="px-8 py-4 text-lg">
                  사장님 화면 체험
                </MotionButton>
              </Link>
              <Link href="/demo/requester">
                <MotionButton variant="secondary" className="px-8 py-4 text-lg">
                  요청자 화면 체험
                </MotionButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-[#3A3D45]/30 py-10">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/hm-monogram.svg" alt="HM" className="w-6 h-6 opacity-60" />
            <span className="text-xs font-bold text-[#6B7280]">BYTEFORCE (바이트포스)</span>
          </div>
          <p className="text-xs text-[#3A3D45]">© 2026 BYTEFORCE. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
