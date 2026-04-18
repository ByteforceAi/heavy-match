"use client";

/**
 * /demo — 철연 CHEOLYEON 데모 인트로 (v2 HD Navy Light)
 *
 * 리브랜드 전: Dark Masterpiece + Safety Orange
 * 리브랜드 후: HD Navy Light — 랜딩과 일관된 엔터프라이즈 톤
 *
 * §3.2.5 의문형 훅 제거 ("어떤 역할을 체험하시겠어요?" → "체험할 역할 선택")
 * §3.2.1 ~입니다 → 판결문 어미 (~한다/~된다)
 */

import Link from "next/link";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  MotionButton,
  MotionCard,
} from "@/components/motion/MotionPrimitives";
import {
  CraneIcon,
  ExcavatorIcon,
  SkyIcon,
  PumpTruckIcon,
  ForkliftIcon,
  DumpTruckIcon,
  CargoCraneIcon,
  SpiderCraneIcon,
} from "@/components/icons/EquipmentIcons";
import { nav as navCopy } from "@/content/copy";

// ═══════════════════════════════════════
// ROLE DATA — 6개 역할
// ═══════════════════════════════════════
const ROLES = [
  {
    id: "requester",
    label: "장비요청자",
    desc: "건설사 현장소장",
    icon: "person_search",
    navyAccent: true,
    tags: ["장비 요청", "배차 현황", "적립금"],
    device: "모바일 우선",
  },
  {
    id: "owner",
    label: "중장비사장",
    desc: "장비 임대 업체",
    icon: "local_shipping",
    navyAccent: false,
    tags: ["콜 수신", "단가 설정", "기사 관리"],
    device: "모바일 100%",
  },
  {
    id: "operator",
    label: "기사",
    desc: "장비 운전 기사",
    icon: "engineering",
    navyAccent: false,
    tags: ["배차 확인", "전자서명", "작업 이력"],
    device: "모바일 전용",
  },
  {
    id: "callcenter",
    label: "콜센터",
    desc: "상담원",
    icon: "support_agent",
    navyAccent: false,
    tags: ["콜 관리", "사장 관리", "수수료"],
    device: "데스크탑",
  },
  {
    id: "salesperson",
    label: "영업사원",
    desc: "앱 분양 담당",
    icon: "payments",
    navyAccent: false,
    tags: ["분양 현황", "수수료", "월별 실적"],
    device: "데스크탑",
  },
  {
    id: "admin",
    label: "관리자",
    desc: "플랫폼 운영자",
    icon: "admin_panel_settings",
    navyAccent: true,
    tags: ["대시보드", "사용자", "마스터"],
    device: "데스크탑",
  },
];

// ═══════════════════════════════════════
// 배차 6단계
// ═══════════════════════════════════════
const FLOW_STEPS = [
  {
    num: "01",
    title: "장비 요청",
    desc: "건설사가 장비·규격·시간 선택 후 전자서명으로 요청한다.",
    actor: "장비요청자",
    accent: "#002C5F",
  },
  {
    num: "02",
    title: "전용콜",
    desc: "지정 사장에게 SMS 발송 — 60초 타이머 시작.",
    actor: "중장비사장",
    accent: "#0046A4",
    highlight: "60초",
  },
  {
    num: "03",
    title: "콜센터 전달",
    desc: "60초 미수락 시 해당 사장의 콜센터로 자동 전달된다.",
    actor: "콜센터",
    accent: "#002C5F",
  },
  {
    num: "04",
    title: "공유콜",
    desc: "같은 지역 사장 전체에게 동시 발송 — 선착순 매칭.",
    actor: "중장비사장",
    accent: "#00AAD2",
  },
  {
    num: "05",
    title: "기사 배정",
    desc: "매칭된 사장이 소속 기사를 선택하여 배정한다.",
    actor: "중장비사장",
    accent: "#0046A4",
  },
  {
    num: "06",
    title: "작업 완료",
    desc: "기사 전자서명 → 작업확인서 자동 생성, 수수료 정산.",
    actor: "기사",
    accent: "#00A86B",
  },
];

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
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "'Pretendard', 'IBM Plex Sans KR', -apple-system, sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {/* ═══ Navigation ═══ */}
      <nav
        className="sticky top-0 z-50 h-[60px] bg-white/95 border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-4"
        style={{ backdropFilter: "blur(12px) saturate(180%)" }}
      >
        <Link href="/" className="flex items-baseline gap-2.5" aria-label="철연 홈">
          <span className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]">
            {navCopy.brand.ko}
          </span>
          <span
            className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {navCopy.brand.en}
          </span>
        </Link>
        <div className="flex items-center gap-3 ml-auto">
          <Link
            href="/"
            className="text-[13px] font-medium text-[#3A4A5F] hover:text-[#002C5F] transition-colors px-3 py-2 flex items-center gap-1 min-h-0"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              arrow_back
            </span>
            메인으로
          </Link>
          <Link
            href="/demo/simulation"
            className="text-[13px] font-semibold text-white bg-[#002C5F] hover:bg-[#0046A4] px-4 py-2 rounded-lg transition-colors min-h-0"
          >
            E2E 시뮬레이션
          </Link>
        </div>
      </nav>

      {/* ═══ Hero ═══ */}
      <section
        className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-20 border-b border-[#E3E8EF]"
        style={{
          background: `
            radial-gradient(ellipse at 80% 20%, rgba(0,170,210,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 80%, rgba(0,44,95,0.04) 0%, transparent 50%),
            linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 100%)
          `,
        }}
      >
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <Reveal delay={0.05}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FB] text-[#002C5F] rounded-full text-[12px] font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-[#00AAD2] rounded-full" aria-hidden="true" />
              Demo Environment · 로그인 없이 바로 체험
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="mb-4 max-w-4xl mx-auto"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
              }}
            >
              <span className="block text-[#0A1628]">6개 역할을</span>
              <span className="block text-[#002C5F]">직접 조작해 본다</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p
              className="text-[16px] md:text-[18px] font-semibold text-[#3A4A5F] mb-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              전용콜 → 콜센터 → 공유콜. 3단계 폴백 자동화.
            </p>
            <p className="text-[14px] text-[#6B7B8F] max-w-2xl mx-auto mb-10">
              각 역할별 대시보드가 실제로 어떻게 작동하는지 확인한다. 시뮬레이션 데이터로 안전하게 체험 가능하다.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/demo/simulation">
                <MotionButton variant="primary" className="px-7 py-3.5 text-[15px] flex items-center gap-2">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1", fontSize: 20 }}
                  >
                    play_circle
                  </span>
                  E2E 시뮬레이션 실행
                </MotionButton>
              </Link>
              <Link href="#roles">
                <MotionButton variant="secondary" className="px-7 py-3.5 text-[15px]">
                  역할 선택 ↓
                </MotionButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Equipment 8종 ═══ */}
      <section className="py-12 border-b border-[#E3E8EF] bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p
              className="text-center text-[11px] text-[#6B7B8F] font-medium mb-5 tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              지원 장비 · 8 Equipment Types
            </p>
          </Reveal>
          <StaggerContainer className="flex flex-wrap justify-center gap-5 md:gap-8">
            {EQUIPMENT.map(({ name, Icon }) => (
              <StaggerItem key={name} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E8F1FB] text-[#002C5F] group-hover:bg-[#002C5F] group-hover:text-white transition-colors">
                  <Icon size={26} />
                </div>
                <span className="text-[11px] text-[#6B7B8F] group-hover:text-[#002C5F] transition-colors font-medium">
                  {name}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ Role Selection (핵심) ═══ */}
      <section id="roles" className="py-16 md:py-20 bg-[#F4F6FA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p
              className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              Select a Role
            </p>
            <h2 className="text-[26px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.02em] mb-2">
              체험할 역할 선택
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-10 max-w-xl">
              각 역할별 실제 앱 화면으로 이동한다. 모든 데이터는 시뮬레이션이다.
            </p>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map((role) => (
              <StaggerItem key={role.id}>
                <Link href={`/demo/${role.id}`} className="block group">
                  <MotionCard className="p-6 h-full relative overflow-hidden">
                    {role.navyAccent && (
                      <div
                        className="absolute top-0 right-0 w-32 h-32 bg-[#002C5F] opacity-[0.04] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}

                    <div className="flex items-start justify-between mb-4 relative">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          role.navyAccent
                            ? "bg-[#E8F1FB] text-[#002C5F]"
                            : "bg-[#F4F6FA] text-[#3A4A5F]"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
                        >
                          {role.icon}
                        </span>
                      </div>
                      <span
                        className="text-[10px] px-2 py-1 bg-[#F4F6FA] text-[#6B7B8F] rounded-md"
                        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                      >
                        {role.device}
                      </span>
                    </div>

                    <h3
                      className="text-[18px] font-[800] text-[#0A1628] mb-1"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {role.label}
                    </h3>
                    <p className="text-[13px] text-[#6B7B8F] mb-4">{role.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 bg-[#F4F6FA] text-[#3A4A5F] rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E3E8EF]">
                      <span className="text-[13px] text-[#002C5F] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        체험하기
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                          arrow_forward
                        </span>
                      </span>
                      <span
                        className="text-[10px] text-[#9AA8B8]"
                        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                      >
                        /{role.id}
                      </span>
                    </div>
                  </MotionCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ Mobile Showcase 2종 (v2 HTML .m1/.m2 구현) ═══ */}
      <section className="py-16 md:py-20 bg-white border-y border-[#E3E8EF]">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p
              className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              Mobile Showcase
            </p>
            <h2 className="text-[26px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.02em] mb-2">
              모바일 화면 2종 미리보기
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-10 max-w-xl">
              현장 작업자와 경영진의 관점으로 본 실제 앱 화면. 역할별 데모와 달리 쇼케이스 성격의 고정 UI.
            </p>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-5">
            <StaggerItem>
              <Link href="/demo/field-manager" className="block group">
                <MotionCard className="p-6 relative overflow-hidden h-full">
                  <div
                    aria-hidden="true"
                    className="absolute top-0 right-0 w-40 h-40 bg-[#002C5F] opacity-[0.04] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
                  />
                  <div className="flex items-center gap-3 mb-4 relative">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F1FB] text-[#002C5F] flex items-center justify-center">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
                      >
                        engineering
                      </span>
                    </div>
                    <div>
                      <span
                        className="text-[10px] px-2 py-0.5 bg-[#F4F6FA] text-[#6B7B8F] rounded-md inline-block mb-0.5"
                        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                      >
                        Mobile 1 · Phone
                      </span>
                      <h3
                        className="text-[18px] font-[800] text-[#0A1628]"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        현장소장 배차 화면
                      </h3>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#3A4A5F] leading-[1.7] mb-4">
                    김민철 소장 · 해운대 센텀 2공구. 지금 배차 CTA, 8종 장비 그리드, 최근 배차 리스트, 하단 탭바·FAB.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["CTA 그라디언트", "장비 4-grid", "배차 리스트", "Tab + FAB"].map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 bg-[#F4F6FA] text-[#3A4A5F] rounded-md font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E3E8EF]">
                    <span className="text-[13px] text-[#002C5F] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      미리보기 열기
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 16 }}
                        aria-hidden="true"
                      >
                        arrow_forward
                      </span>
                    </span>
                    <span
                      className="text-[10px] text-[#9AA8B8]"
                      style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                    >
                      /demo/field-manager
                    </span>
                  </div>
                </MotionCard>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link href="/demo/executive" className="block group">
                <MotionCard className="p-6 relative overflow-hidden h-full">
                  <div
                    aria-hidden="true"
                    className="absolute top-0 right-0 w-40 h-40 bg-[#00AAD2] opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
                  />
                  <div className="flex items-center gap-3 mb-4 relative">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F1FB] text-[#002C5F] flex items-center justify-center">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
                      >
                        monitoring
                      </span>
                    </div>
                    <div>
                      <span
                        className="text-[10px] px-2 py-0.5 bg-[#F4F6FA] text-[#6B7B8F] rounded-md inline-block mb-0.5"
                        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                      >
                        Mobile 2 · Phone
                      </span>
                      <h3
                        className="text-[18px] font-[800] text-[#0A1628]"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        대표 경영 대시보드
                      </h3>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#3A4A5F] leading-[1.7] mb-4">
                    이번 달 보호 정산액 ₩83,240,000 · 주간 배차 추이 차트 · 정산 지연·파트너 알림.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["KPI 그라디언트", "Mini Stats", "Area Chart", "Alert 뱃지"].map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 bg-[#F4F6FA] text-[#3A4A5F] rounded-md font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E3E8EF]">
                    <span className="text-[13px] text-[#002C5F] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      미리보기 열기
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 16 }}
                        aria-hidden="true"
                      >
                        arrow_forward
                      </span>
                    </span>
                    <span
                      className="text-[10px] text-[#9AA8B8]"
                      style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                    >
                      /demo/executive
                    </span>
                  </div>
                </MotionCard>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ 6-Step Flow ═══ */}
      <section className="py-16 md:py-20 bg-[#F4F6FA] border-y border-[#E3E8EF]">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal>
            <p
              className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              Dispatch Flow
            </p>
            <h2 className="text-[26px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.02em] mb-2">
              한 번에 이해하는 배차 흐름
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-10 max-w-xl">
              장비 요청부터 작업 완료까지 6단계. 각 단계마다 서로 다른 역할이 관여한다.
            </p>
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FLOW_STEPS.map((step) => (
              <StaggerItem key={step.num}>
                <MotionCard className="p-6 h-full relative">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[44px] font-black tabular-nums"
                      style={{
                        color: step.accent,
                        fontFamily: "var(--font-roboto-mono), monospace",
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {step.num}
                    </span>
                    {step.highlight && (
                      <span
                        className="px-2 py-1 bg-[#FFB020]/15 border border-[#FFB020]/40 rounded-full text-[11px] font-bold text-[#B87400] animate-pulse"
                        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                      >
                        ⏱ {step.highlight}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-[18px] font-bold text-[#0A1628] mb-2"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[#3A4A5F] leading-[1.7] mb-4">{step.desc}</p>

                  <div className="pt-4 border-t border-[#E3E8EF]">
                    <span
                      className="text-[10px] uppercase tracking-[0.15em] text-[#6B7B8F] block mb-1"
                      style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                    >
                      Actor
                    </span>
                    <span className="text-[13px] font-bold text-[#0A1628]">{step.actor}</span>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.2}>
            <div className="flex justify-center mt-10">
              <Link href="/demo/simulation">
                <MotionButton variant="primary" className="px-7 py-3.5 text-[15px] flex items-center gap-2">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1", fontSize: 20 }}
                  >
                    play_circle
                  </span>
                  전체 6단계 시뮬레이션 실행
                </MotionButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-16 md:py-20 bg-[#F4F6FA]">
        <div className="max-w-[960px] mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-[26px] md:text-[32px] font-[800] text-[#0A1628] tracking-[-0.02em] mb-3">
              이제 직접 체험해 본다
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-8">
              6개 역할, 3가지 시나리오. 로그인 없이 모든 기능을 확인한다.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/demo/simulation">
                <MotionButton variant="primary" className="px-7 py-3.5 text-[15px] flex items-center gap-2">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1", fontSize: 20 }}
                  >
                    movie
                  </span>
                  E2E 시뮬레이션
                </MotionButton>
              </Link>
              <Link href="/demo/owner">
                <MotionButton variant="secondary" className="px-7 py-3.5 text-[15px]">
                  사장님 화면 체험
                </MotionButton>
              </Link>
              <Link href="/demo/requester">
                <MotionButton variant="secondary" className="px-7 py-3.5 text-[15px]">
                  요청자 화면 체험
                </MotionButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-[#E3E8EF] py-8 bg-[#EEF1F5]">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[15px] font-black text-[#002C5F] tracking-[-0.03em]">
              {navCopy.brand.ko}
            </span>
            <span
              className="text-[9px] text-[#6B7B8F] tracking-[0.3em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {navCopy.brand.en}
            </span>
            <span className="text-[11px] text-[#6B7B8F] ml-2">BYTEFORCE (바이트포스)</span>
          </div>
          <p className="text-[11px] text-[#9AA8B8]">© 2026 BYTEFORCE. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
