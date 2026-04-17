"use client";

/**
 * Landing Sections — Upgrade 1/2/3/5 통합 컴포넌트
 *
 * - LiveDashboard: Hero 우측에 실시간 매칭 미리보기
 * - ROICalculator: 슬라이더 기반 절감액 계산
 * - DemoEmbed: iframe 없이 축소 렌더링 (성능 고려)
 * - ArchDiagram: SVG 기반 시스템 아키텍처
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as tokens } from "@/lib/design-system";
import { formatPrice } from "@/lib/utils";

// ═══════════════════════════════════════
// 1. LIVE DASHBOARD PREVIEW (Hero 우측)
// ═══════════════════════════════════════

interface LiveDispatch {
  id: string;
  equipment: string;
  spec: string;
  site: string;
  price: number;
  status: "exclusive" | "shared" | "matched";
  timer?: number;
}

const INITIAL_DISPATCHES: LiveDispatch[] = [
  { id: "1", equipment: "크레인", spec: "50T", site: "강남 코엑스", price: 1200000, status: "exclusive", timer: 42 },
  { id: "2", equipment: "굴삭기", spec: "6T", site: "수원 광교", price: 800000, status: "shared" },
  { id: "3", equipment: "펌프카", spec: "42m", site: "부산 해운대", price: 1800000, status: "matched" },
];

export function LiveDashboardPreview() {
  const [dispatches, setDispatches] = useState(INITIAL_DISPATCHES);
  const [now] = useState(new Date());

  // 타이머 카운트다운 시뮬레이션
  useEffect(() => {
    const iv = setInterval(() => {
      setDispatches((prev) =>
        prev.map((d) => {
          if (d.status === "exclusive" && typeof d.timer === "number") {
            const next = d.timer - 1;
            if (next <= 0) return { ...d, status: "shared", timer: undefined };
            return { ...d, timer: next };
          }
          return d;
        })
      );
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  // 주기적으로 새 dispatch 추가 (시뮬레이션 활기)
  useEffect(() => {
    const samples: Omit<LiveDispatch, "id">[] = [
      { equipment: "스카이", spec: "52m", site: "대전 유성", price: 650000, status: "exclusive", timer: 60 },
      { equipment: "지게차", spec: "5T", site: "인천 송도", price: 350000, status: "shared" },
      { equipment: "덤프", spec: "25T", site: "고양 일산", price: 450000, status: "matched" },
      { equipment: "카고크레인", spec: "11T", site: "성남 판교", price: 900000, status: "exclusive", timer: 55 },
    ];
    let sampleIdx = 0;
    const iv = setInterval(() => {
      setDispatches((prev) => {
        const newDispatch: LiveDispatch = { ...samples[sampleIdx % samples.length], id: `s-${Date.now()}` };
        sampleIdx++;
        // 최대 4개만 유지
        return [newDispatch, ...prev.slice(0, 3)];
      });
    }, 6000);
    return () => clearInterval(iv);
  }, []);

  const statusStyle = {
    exclusive: { label: "전용콜", bg: "bg-[#FF6B1A1A]", border: "border-[#FF6B1A]/40", text: "text-[#FF6B1A]", dot: "bg-[#FF6B1A]" },
    shared: { label: "공유콜", bg: "bg-[#FFA52315]", border: "border-[#FFA523]/30", text: "text-[#FFA523]", dot: "bg-[#FFA523]" },
    matched: { label: "매칭 완료", bg: "bg-[#10B98115]", border: "border-[#10B981]/30", text: "text-[#10B981]", dot: "bg-[#10B981]" },
  } as const;

  return (
    <div className="relative">
      {/* Glow bg */}
      <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6B1A]/5 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Device Frame */}
      <div className="relative bg-[#121216] border border-[#3A3D45]/60 rounded-3xl p-5 shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#3A3D45]/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#3A3D45]" />
              <div className="w-2 h-2 rounded-full bg-[#3A3D45]" />
              <div className="w-2 h-2 rounded-full bg-[#3A3D45]" />
            </div>
            <span className="text-[10px] text-[#6B7280] font-mono ml-2">LIVE · Owner Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
            <span className="text-[10px] text-[#10B981] font-bold uppercase tracking-wider">Online</span>
          </div>
        </div>

        {/* Timestamp */}
        <div className="text-[10px] text-[#6B7280] mb-3 font-mono">
          {now.toLocaleString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} · 실시간 배차 스트림
        </div>

        {/* Dispatch Cards */}
        <div className="space-y-2 min-h-[280px]">
          <AnimatePresence mode="popLayout">
            {dispatches.map((d) => {
              const s = statusStyle[d.status];
              return (
                <motion.div
                  key={d.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: 30 }}
                  transition={tokens.spring.smooth}
                  className={`${s.bg} border ${s.border} rounded-xl p-3`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${d.status === "exclusive" ? "animate-pulse" : ""}`} />
                      <span className={`text-[10px] font-bold ${s.text} uppercase tracking-wider`}>{s.label}</span>
                    </div>
                    {d.timer && (
                      <span className="text-[10px] font-mono tabular-nums text-[#FF6B1A] font-bold">
                        ⏱ {d.timer}s
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-sm font-bold text-[#FAFAFA]">{d.equipment} {d.spec}</span>
                      <span className="text-xs text-[#6B7280] ml-1.5">· {d.site}</span>
                    </div>
                    <span className="text-sm font-black tabular-nums text-[#FAFAFA]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                      {formatPrice(d.price)}원
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer stat bar */}
        <div className="mt-4 pt-3 border-t border-[#3A3D45]/40 grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="text-xs font-black tabular-nums text-[#FF6B1A]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>1,247</span>
            <p className="text-[9px] text-[#6B7280] uppercase tracking-wider mt-0.5">30일 매칭</p>
          </div>
          <div>
            <span className="text-xs font-black tabular-nums text-[#10B981]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>94.2%</span>
            <p className="text-[9px] text-[#6B7280] uppercase tracking-wider mt-0.5">성공률</p>
          </div>
          <div>
            <span className="text-xs font-black tabular-nums text-[#FFA523]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>43s</span>
            <p className="text-[9px] text-[#6B7280] uppercase tracking-wider mt-0.5">평균 매칭</p>
          </div>
        </div>

        {/* Data notice */}
        <p className="text-[8px] text-[#3A3D45] text-center mt-2 italic">* 시뮬레이션 데이터 · 실서비스 체감을 위한 데모 스트림</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// 2. ROI CALCULATOR
// ═══════════════════════════════════════

export function ROICalculator() {
  const [volume, setVolume] = useState(300); // 월 배차량
  const [avgPrice, setAvgPrice] = useState(120); // 평균 임대비 (만원)

  // 계산 로직
  const monthlyRevenue = volume * avgPrice * 10000; // 월 거래액
  const platformRevenue = Math.floor(monthlyRevenue * 0.05); // 본사 수수료 5%

  // "수기 배차 대비 절감" 모델 — 보수적 가정
  // 1. 미연결 손실률 기존 15% → 플랫폼 2% (13%p 감소)
  // 2. 배차 지연 비용 건당 5만원 절감 가정
  const lostRateReduction = 0.13;
  const lostLossSaved = monthlyRevenue * lostRateReduction; // 미연결 손실 방지
  const delaySaved = volume * 50000; // 지연 비용 절감
  const monthlySaved = lostLossSaved + delaySaved;
  const annualSaved = monthlySaved * 12;

  const paybackMonths = annualSaved > 0 ? Math.max(1, Math.ceil(80000000 / (annualSaved / 12))) : 999;

  const slider = (label: string, value: number, setter: (v: number) => void, min: number, max: number, step: number, unit: string) => (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-semibold text-[#D1D5DB]">{label}</label>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black tabular-nums text-[#FF6B1A]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            {value.toLocaleString()}
          </span>
          <span className="text-xs font-bold text-[#6B7280]">{unit}</span>
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setter(Number(e.target.value))}
          className="w-full h-2 bg-[#242428] rounded-full appearance-none cursor-pointer accent-[#FF6B1A]"
          style={{
            background: `linear-gradient(to right, #FF6B1A 0%, #FF6B1A ${((value - min) / (max - min)) * 100}%, #242428 ${((value - min) / (max - min)) * 100}%, #242428 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-[#6B7280] font-mono">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-[#1A1A20] border border-[#3A3D45]/60 rounded-3xl p-6 md:p-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* 입력 */}
        <div className="space-y-6">
          <div>
            <span className="text-xs text-[#6B7280] font-semibold uppercase tracking-widest">입력값</span>
            <h3 className="text-xl font-[800] text-[#FAFAFA] mt-1" style={{ letterSpacing: "-0.02em" }}>
              우리 회사 현황 입력
            </h3>
          </div>
          {slider("월 배차량", volume, setVolume, 50, 2000, 10, "건")}
          {slider("평균 임대비", avgPrice, setAvgPrice, 30, 500, 10, "만원")}

          <div className="pt-4 border-t border-[#3A3D45]/40 text-xs text-[#6B7280] leading-relaxed">
            <p className="font-bold text-[#9CA3AF] mb-1">계산 모델</p>
            <p>• 수기 배차 미연결 손실률 15% → Heavy Match 2% (감소분 13%p)</p>
            <p>• 배차 지연 비용 건당 5만원 절감 (보수적 가정)</p>
            <p>• 본사 수수료 5% 기준 플랫폼 순수익</p>
          </div>
        </div>

        {/* 출력 */}
        <div className="space-y-4">
          <div>
            <span className="text-xs text-[#6B7280] font-semibold uppercase tracking-widest">예상 절감액</span>
            <h3 className="text-xl font-[800] text-[#FAFAFA] mt-1" style={{ letterSpacing: "-0.02em" }}>
              절감 효과
            </h3>
          </div>

          <div className="bg-[#121216] rounded-2xl p-5 space-y-3">
            <div>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">월 거래액</p>
              <p className="text-2xl font-black tabular-nums text-[#D1D5DB]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {formatPrice(monthlyRevenue)}원
              </p>
            </div>
            <div className="border-t border-[#3A3D45]/30 pt-3">
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">월 절감액 (손실 방지 + 지연 절감)</p>
              <p className="text-3xl md:text-4xl font-black tabular-nums text-[#FF6B1A]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {formatPrice(monthlySaved)}원
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FF6B1A] to-[#E55D15] rounded-2xl p-5 text-white">
            <p className="text-[10px] uppercase tracking-wider opacity-80 mb-1">연간 누적 절감</p>
            <p className="text-4xl md:text-5xl font-black tabular-nums mb-3" style={{ fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "-0.03em" }}>
              {formatPrice(annualSaved)}원
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <span className="text-xs opacity-80">8,000만원 투자 회수 기간</span>
              <span className="text-lg font-black tabular-nums" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {paybackMonths}개월
              </span>
            </div>
          </div>

          <p className="text-[10px] text-[#6B7280] italic text-center">
            * 업계 평균 가정 기반 추정치 — 실제 효과는 운영 방식에 따라 달라집니다
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// 3. DEMO EMBED — iPhone Frame + miniature UI
// ═══════════════════════════════════════

export function DemoEmbed() {
  return (
    <div className="bg-[#121216] border border-[#3A3D45]/40 rounded-3xl p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* iPhone Frame */}
        <div className="flex justify-center">
          <div className="relative w-[280px] h-[570px] bg-[#0A0A0B] rounded-[50px] p-3 border border-[#3A3D45]/60 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0A0A0B] rounded-b-2xl z-20" />

            {/* Screen */}
            <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#f8f9ff]">
              {/* Status bar mock */}
              <div className="bg-[#f8f9ff] pt-3 pb-1 flex justify-between items-center px-6 text-[#111c29] text-xs font-bold">
                <span className="tabular-nums">9:41</span>
                <span className="flex gap-1 items-center">
                  <span className="text-[8px]">●●●</span>
                </span>
              </div>

              {/* App miniature */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#0059b9] rounded-lg flex items-center justify-center text-white text-xs font-black">HM</div>
                  <div>
                    <p className="text-sm font-bold text-[#111c29]">박중장비 사장</p>
                    <p className="text-[9px] text-[#727785]">대한크레인</p>
                  </div>
                </div>

                {/* Active call card (animated) */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255,107,26,0.3)",
                      "0 0 0 8px rgba(255,107,26,0)",
                      "0 0 0 0 rgba(255,107,26,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-white border border-[#FF6B1A]/30 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-bold text-[#FF6B1A] uppercase tracking-wider">● 전용콜</span>
                    <motion.span
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                      className="text-[10px] font-mono tabular-nums text-[#FF6B1A] font-bold"
                    >
                      ⏱ 42초
                    </motion.span>
                  </div>
                  <p className="text-sm font-bold text-[#111c29]">크레인 50T</p>
                  <p className="text-[10px] text-[#727785] mb-2">서울 강남 코엑스 신축현장</p>
                  <p className="text-base font-black text-[#0059b9] tabular-nums">1,200,000원</p>
                  <div className="flex gap-1.5 mt-2">
                    <div className="flex-1 py-1.5 bg-[#10B981] text-white text-center rounded-lg text-xs font-bold">수락</div>
                    <div className="flex-1 py-1.5 bg-[#ba1a1a] text-white text-center rounded-lg text-xs font-bold">거절</div>
                  </div>
                </motion.div>

                {/* Secondary cards */}
                <div className="bg-white border border-[#dee9fb] rounded-xl p-2.5 opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold text-[#FFA523] uppercase">공유콜</span>
                    <span className="text-[9px] font-bold text-[#0059b9] tabular-nums">800,000원</span>
                  </div>
                  <p className="text-xs font-semibold text-[#414754] mt-0.5">굴삭기 6T · 수원</p>
                </div>

                <div className="bg-white border border-[#dee9fb] rounded-xl p-2.5 opacity-40">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold text-[#10B981] uppercase">매칭완료</span>
                    <span className="text-[9px] font-bold text-[#0059b9] tabular-nums">1,800,000원</span>
                  </div>
                  <p className="text-xs font-semibold text-[#414754] mt-0.5">펌프카 42m · 부산</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario explanation */}
        <div className="space-y-4">
          <span className="text-xs text-[#FF6B1A] font-semibold uppercase tracking-widest">Live Demo</span>
          <h3 className="text-3xl font-[800] text-[#FAFAFA]" style={{ letterSpacing: "-0.03em" }}>
            실제 사장님이 보는<br /><span className="text-[#FF6B1A]">콜 수신 화면</span>
          </h3>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            전용콜이 도착하면 60초 타이머가 시작되고, 수락/거절 버튼이 활성화됩니다.
            미수락 시 자동으로 콜센터로 전달되며, 60초가 추가로 지나면 같은 지역 사장 전체에게 공유콜로 확산됩니다.
          </p>

          <div className="space-y-2 pt-2">
            {[
              { label: "시나리오 A", sub: "정상 수락", color: "#10B981" },
              { label: "시나리오 B", sub: "에스컬레이션 (콜센터 → 공유콜)", color: "#FFA523" },
              { label: "시나리오 C", sub: "취소 페널티 (7.5%)", color: "#EF4444" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 bg-[#242428] rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                <div className="flex-1">
                  <span className="text-sm font-bold text-[#FAFAFA]">{s.label}</span>
                  <span className="text-xs text-[#6B7280] ml-2">{s.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/demo/simulation"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#FF6B1A] hover:bg-[#FF8A4C] text-white font-bold rounded-xl text-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
            전체 시뮬레이션 보기
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// 4. ARCHITECTURE DIAGRAM (SVG-based)
// ═══════════════════════════════════════

export function ArchitectureDiagram() {
  return (
    <div className="bg-[#121216] border border-[#3A3D45]/40 rounded-3xl p-8 md:p-12 overflow-x-auto">
      <div className="min-w-[700px]">
        <svg viewBox="0 0 900 440" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FF6B1A" strokeOpacity="0.05" />
            </pattern>
            <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF6B1A" />
              <stop offset="100%" stopColor="#E55D15" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            {/* Arrow markers */}
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B7280" />
            </marker>
            <marker id="arrowOrange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#FF6B1A" />
            </marker>
          </defs>
          <rect width="900" height="440" fill="url(#grid)" />

          {/* Client Tier */}
          <text x="40" y="30" fill="#6B7280" fontSize="11" fontWeight="700" letterSpacing="2">CLIENT TIER</text>
          <g>
            {[
              { x: 40, label: "모바일", sub: "요청자·사장·기사", x1: 40 },
              { x: 200, label: "데스크탑", sub: "콜센터·관리자", x1: 200 },
              { x: 360, label: "SMS 링크", sub: "/call/[token]", x1: 360 },
            ].map((c) => (
              <g key={c.label}>
                <rect x={c.x} y="45" width="140" height="60" rx="12" fill="#1A1A20" stroke="#3A3D45" strokeWidth="1.5" />
                <text x={c.x + 70} y="72" fill="#FAFAFA" fontSize="13" fontWeight="700" textAnchor="middle">{c.label}</text>
                <text x={c.x + 70} y="90" fill="#9CA3AF" fontSize="10" textAnchor="middle">{c.sub}</text>
              </g>
            ))}
          </g>

          {/* Arrows to Frontend */}
          <line x1="110" y1="105" x2="220" y2="155" stroke="#6B7280" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="270" y1="105" x2="270" y2="155" stroke="#6B7280" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="430" y1="105" x2="330" y2="155" stroke="#6B7280" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Frontend Tier */}
          <text x="40" y="135" fill="#6B7280" fontSize="11" fontWeight="700" letterSpacing="2">FRONTEND (Vercel Edge Network)</text>
          <rect x="40" y="150" width="460" height="70" rx="14" fill="url(#orangeGrad)" opacity="0.12" stroke="#FF6B1A" strokeWidth="1.5" />
          <g>
            <text x="60" y="180" fill="#FF6B1A" fontSize="13" fontWeight="800">Next.js 16 App Router</text>
            <text x="60" y="198" fill="#D1D5DB" fontSize="10">Server Components · Turbopack · Edge Runtime</text>
            <text x="60" y="212" fill="#9CA3AF" fontSize="10">TypeScript · Tailwind CSS · Framer Motion · PWA</text>
          </g>

          {/* Arrow down */}
          <line x1="270" y1="225" x2="270" y2="260" stroke="#FF6B1A" strokeWidth="2" markerEnd="url(#arrowOrange)" />
          <text x="290" y="250" fill="#FF6B1A" fontSize="10" fontFamily="monospace">POST /api/dispatch/*</text>

          {/* API Tier */}
          <text x="40" y="275" fill="#6B7280" fontSize="11" fontWeight="700" letterSpacing="2">API LAYER (Vercel Serverless)</text>
          <rect x="40" y="290" width="220" height="70" rx="14" fill="#1A1A20" stroke="#3A3D45" strokeWidth="1.5" />
          <text x="60" y="318" fill="#FAFAFA" fontSize="13" fontWeight="800">8 REST Endpoints</text>
          <text x="60" y="336" fill="#9CA3AF" fontSize="10">create · accept · reject · assign</text>
          <text x="60" y="350" fill="#9CA3AF" fontSize="10">start · complete · cancel · escalate</text>

          <rect x="280" y="290" width="220" height="70" rx="14" fill="#1A1A20" stroke="#3A3D45" strokeWidth="1.5" />
          <text x="300" y="318" fill="#FAFAFA" fontSize="13" fontWeight="800">Vercel Cron</text>
          <text x="300" y="336" fill="#9CA3AF" fontSize="10">1-min interval</text>
          <text x="300" y="350" fill="#9CA3AF" fontSize="10">60s timer escalation check</text>

          {/* Arrows to DB */}
          <line x1="150" y1="360" x2="400" y2="395" stroke="#6B7280" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="390" y1="360" x2="460" y2="395" stroke="#6B7280" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <line x1="270" y1="225" x2="680" y2="150" stroke="#6B7280" strokeWidth="1" strokeDasharray="3,3" />

          {/* Backend Tier */}
          <text x="520" y="135" fill="#6B7280" fontSize="11" fontWeight="700" letterSpacing="2">BACKEND</text>
          <rect x="520" y="150" width="340" height="240" rx="14" fill="url(#greenGrad)" opacity="0.1" stroke="#10B981" strokeWidth="1.5" />
          <text x="540" y="180" fill="#10B981" fontSize="13" fontWeight="800">Supabase (PostgreSQL)</text>
          <text x="540" y="197" fill="#D1D5DB" fontSize="10">Row Level Security · Realtime Subscriptions</text>

          {/* DB Tables */}
          <g transform="translate(540, 215)">
            {[
              ["users", "사용자·역할·관계"],
              ["dispatch_requests", "배차 요청 상태머신"],
              ["commissions", "수수료 정산"],
              ["equipment_*", "장비·규격·시간"],
              ["sms_logs", "SMS 발송 기록"],
            ].map(([name, desc], i) => (
              <g key={name} transform={`translate(0, ${i * 28})`}>
                <rect width="300" height="24" rx="6" fill="#0A0A0B" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" />
                <text x="10" y="16" fill="#10B981" fontSize="10" fontWeight="700" fontFamily="monospace">{name}</text>
                <text x="140" y="16" fill="#9CA3AF" fontSize="10">{desc}</text>
              </g>
            ))}
          </g>

          {/* External Services */}
          <text x="40" y="400" fill="#6B7280" fontSize="11" fontWeight="700" letterSpacing="2">EXTERNAL</text>
          <g>
            <rect x="40" y="410" width="220" height="24" rx="6" fill="#1A1A20" stroke="#3A3D45" strokeWidth="1" />
            <text x="50" y="427" fill="#FFA523" fontSize="10" fontWeight="700">Naver Cloud SMS API</text>
            <text x="180" y="427" fill="#9CA3AF" fontSize="9">SMS/LMS 발송</text>
          </g>
          <g>
            <rect x="280" y="410" width="220" height="24" rx="6" fill="#1A1A20" stroke="#3A3D45" strokeWidth="1" />
            <text x="290" y="427" fill="#FFA523" fontSize="10" fontWeight="700">Supabase Auth</text>
            <text x="390" y="427" fill="#9CA3AF" fontSize="9">전화번호 OTP 인증</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
