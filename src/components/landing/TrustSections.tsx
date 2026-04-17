"use client";

/**
 * Trust Sections — Upgrade 4 (Social Proof) + Upgrade 6 (Onboarding)
 */

import { motion } from "framer-motion";
import { motion as tokens } from "@/lib/design-system";
import { CountUp } from "@/components/motion/MotionPrimitives";

// ═══════════════════════════════════════
// SOCIAL PROOF
// ═══════════════════════════════════════

const CASE_STUDIES = [
  {
    name: "부산 건설 컨소시엄 3사",
    segment: "건설사 파일럿",
    logo: "apartment",
    metric: { value: 312, suffix: "건", label: "30일 매칭" },
    quote: "수기 배차 체제에서 온라인 매칭으로 전환 후 배차 지연 시간이 평균 47% 감소했습니다.",
    person: "K 부장 · 현장운영팀",
  },
  {
    name: "경남 중장비 협회",
    segment: "중장비 업체 네트워크",
    logo: "hub",
    metric: { value: 523, suffix: "건", label: "월 공유콜" },
    quote: "협회 소속 사장님들의 공실률이 줄었고, 수수료 분배가 투명해져 분쟁이 사라졌습니다.",
    person: "P 회장 · 경남 지부",
  },
  {
    name: "서울·수도권 렌탈업체",
    segment: "렌탈 전문 운영사",
    logo: "local_shipping",
    metric: { value: 412, suffix: "건", label: "누적 매칭" },
    quote: "전용콜 60초 체계가 사장님들의 반응 속도를 극적으로 끌어올렸습니다.",
    person: "L 대표 · A중장비",
  },
];

export function SocialProof() {
  return (
    <div>
      {/* 상단 통합 지표 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
        {[
          { value: 1247, suffix: "건", label: "30일 매칭", color: "#FF6B1A" },
          { value: 43, suffix: "초", label: "평균 매칭 시간", color: "#FFA523" },
          { value: 94, suffix: "%", label: "매칭 성공률", color: "#10B981" },
          { value: 8, suffix: "개사", label: "파일럿 참여", color: "#3B82F6" },
        ].map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={tokens.spring.smooth}
            className="bg-[#1A1A20] border border-[#3A3D45]/60 rounded-2xl p-5 text-center"
          >
            <div className="flex items-baseline justify-center gap-0.5">
              <CountUp
                target={s.value}
                className="text-3xl md:text-4xl font-black tabular-nums"
                suffix=""
              />
              <span className="text-lg font-bold" style={{ color: s.color, fontFamily: "var(--font-jetbrains), monospace" }}>
                {s.suffix}
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-1 font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* 각주 */}
      <p className="text-center text-xs text-[#6B7280] mb-10 italic">
        * 파일럿 운영 기간 시뮬레이션 데이터 기준 — 실서비스 배포 전 내부 검증 수치입니다.
      </p>

      {/* 케이스 스터디 카드 */}
      <div className="grid md:grid-cols-3 gap-4">
        {CASE_STUDIES.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...tokens.spring.gentle, delay: i * 0.1 }}
            className="bg-[#1A1A20] border border-[#3A3D45]/60 rounded-2xl p-6 flex flex-col"
          >
            {/* Logo + name */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#3A3D45]/40">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B1A1A] border border-[#FF6B1A40] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#FF6B1A] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{c.logo}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#FAFAFA]">{c.name}</p>
                <p className="text-[11px] text-[#6B7280]">{c.segment}</p>
              </div>
            </div>

            {/* Metric */}
            <div className="mb-4">
              <p className="text-3xl font-black tabular-nums text-[#FF6B1A]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {c.metric.value.toLocaleString()}{c.metric.suffix}
              </p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">{c.metric.label}</p>
            </div>

            {/* Quote */}
            <blockquote className="text-sm text-[#D1D5DB] leading-relaxed italic mb-4 flex-1">
              <span className="text-[#FF6B1A]">&ldquo;</span>
              {c.quote}
              <span className="text-[#FF6B1A]">&rdquo;</span>
            </blockquote>

            {/* Attribution */}
            <p className="text-[11px] text-[#6B7280] pt-3 border-t border-[#3A3D45]/40">
              — {c.person}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// ONBOARDING TIMELINE (4 weeks)
// ═══════════════════════════════════════

const PHASES = [
  {
    week: "Week 1",
    label: "계약 & 설정",
    icon: "handshake",
    items: [
      "계약서 작성 및 예약금 30% 입금",
      "GitHub 레포 권한 이전",
      "Vercel 프로젝트 생성 + 도메인 연결",
      "Supabase 프로젝트 설정 + 초기 마이그레이션",
    ],
    color: "#FF6B1A",
  },
  {
    week: "Week 2",
    label: "커스터마이징 & 배포",
    icon: "build",
    items: [
      "로고·브랜드 컬러 적용 (tokens.ts 1파일)",
      "Naver Cloud SMS API 키 연동",
      "테스트 계정 생성 및 시드 데이터 투입",
      "스테이징 → 프로덕션 배포",
    ],
    color: "#FFA523",
  },
  {
    week: "Week 3",
    label: "교육 & 검증",
    icon: "school",
    items: [
      "관리자 대상 온라인 교육 2시간",
      "콜센터/영업사원 담당자 교육",
      "실제 장비 10건 시범 배차 운영",
      "운영 매뉴얼 및 기술 문서 전달",
    ],
    color: "#3B82F6",
  },
  {
    week: "Week 4",
    label: "정식 운영 & 모니터링",
    icon: "rocket_launch",
    items: [
      "전국 서비스 정식 오픈",
      "실시간 모니터링 체계 구축",
      "1개월 집중 운영 지원 (일일 리포트)",
      "잔금 70% 입금 + AS 계약 개시",
    ],
    color: "#10B981",
  },
];

export function OnboardingTimeline() {
  return (
    <div className="relative">
      {/* 타임라인 라인 (데스크탑) */}
      <div className="hidden md:block absolute left-0 right-0 top-[50px] h-0.5 bg-gradient-to-r from-[#FF6B1A] via-[#FFA523] via-[#3B82F6] to-[#10B981]" />

      <div className="grid md:grid-cols-4 gap-4 md:gap-6">
        {PHASES.map((p, i) => (
          <motion.div
            key={p.week}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...tokens.spring.gentle, delay: i * 0.15 }}
            className="relative"
          >
            {/* Node */}
            <div className="flex items-center mb-4 relative z-10">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{ background: p.color }}
              >
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>{p.icon}</span>
              </div>
              <div className="ml-3 md:hidden">
                <p className="text-xs text-[#6B7280] font-bold uppercase tracking-widest">{p.week}</p>
                <p className="text-base font-bold text-[#FAFAFA]">{p.label}</p>
              </div>
            </div>

            {/* Card */}
            <div className="bg-[#1A1A20] border border-[#3A3D45]/60 rounded-2xl p-5">
              <div className="hidden md:block mb-3">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: p.color }}>{p.week}</p>
                <p className="text-lg font-[800] text-[#FAFAFA] mt-0.5" style={{ letterSpacing: "-0.02em" }}>{p.label}</p>
              </div>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-[#9CA3AF] leading-relaxed">
                    <span className="material-symbols-outlined text-sm mt-0.5 flex-shrink-0" style={{ color: p.color }}>check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 하단 요약 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-10 bg-gradient-to-br from-[#FF6B1A]/10 to-transparent border border-[#FF6B1A]/20 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4"
      >
        <div>
          <p className="text-xs text-[#FF6B1A] font-bold uppercase tracking-widest mb-1">Total Timeline</p>
          <p className="text-2xl font-[800] text-[#FAFAFA]" style={{ letterSpacing: "-0.02em" }}>
            계약부터 정식 운영까지 <span className="text-[#FF6B1A]">4주</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#6B7280] uppercase tracking-wider">Payment Schedule</p>
          <p className="text-sm font-bold text-[#D1D5DB] mt-0.5">
            예약금 <span className="text-[#FF6B1A] font-black">30%</span>
            {" → "}
            정식운영 잔금 <span className="text-[#FF6B1A] font-black">70%</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
