"use client";

/**
 * /demo/executive — 모바일 대표 경영 대시보드
 *
 * 브랜드 레퍼런스 HTML `.m2` 블록을 모바일 우선 레이아웃으로 포팅한다.
 * HD Navy Light 팔레트, Pretendard + Roboto Mono, tabular-nums.
 *
 * heritage-v1.md §3:
 *  - §3.2.1 ~입니다 금지
 *  - §3.2.3 느낌표·1인칭 금지
 *  - §3.2.5 의문형 훅 금지
 */

import { Reveal } from "@/components/motion/MotionPrimitives";
import { nav as navCopy } from "@/content/copy";

// ═══════════════════════════════════════
// WEEKLY CHART — HTML path 원본 보존
// ═══════════════════════════════════════
const CHART_PATH = "M0,80 L40,60 L80,70 L120,45 L160,50 L200,25 L240,35 L280,18";
const CHART_DAYS = ["월", "화", "수", "목", "금", "토", "일"] as const;
const CHART_POINTS = [
  { x: 0, y: 80 },
  { x: 40, y: 60 },
  { x: 80, y: 70 },
  { x: 120, y: 45 },
  { x: 160, y: 50 },
  { x: 200, y: 25 },
  { x: 240, y: 35 },
  { x: 280, y: 18 },
];

// ═══════════════════════════════════════
// ALERTS
// ═══════════════════════════════════════
interface AlertRow {
  level: "ERR" | "WARN";
  border: string;
  iconBg: string;
  iconFg: string;
  icon: string;
  title: string;
  body: string;
}

const ALERTS: AlertRow[] = [
  {
    level: "ERR",
    border: "#E5484D",
    iconBg: "rgba(229,72,77,0.12)",
    iconFg: "#E5484D",
    icon: "warning",
    title: "정산 지연 1건",
    body: "(주)대한토건 · ₩2,800,000 · 48시간 경과 · 자동 독촉 발송 완료",
  },
  {
    level: "WARN",
    border: "#FFB020",
    iconBg: "rgba(255,176,32,0.15)",
    iconFg: "#B87400",
    icon: "info",
    title: "신규 파트너 가입",
    body: "(주)대한중기 · 장비 3기 등록 · 사업자번호 검증 대기",
  },
];

export default function ExecutivePage() {
  return (
    <main
      className="max-w-md mx-auto min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "'Pretendard', 'IBM Plex Sans KR', -apple-system, sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {/* ═══ Status Bar ═══ */}
      <div
        className="h-[44px] px-6 flex items-center justify-between bg-white text-[#0A1628] border-b border-[#EDF0F5]"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        <span className="text-[13px] font-semibold tabular-nums">9:41</span>
        <div className="flex items-center gap-[3px]" aria-hidden="true">
          <span className="w-1 h-1 bg-[#0A1628] rounded-full" />
          <span className="w-1 h-1 bg-[#0A1628] rounded-full" />
          <span className="w-1 h-1 bg-[#0A1628] rounded-full" />
          <span className="w-1 h-1 bg-[#0A1628] rounded-full" />
        </div>
      </div>

      {/* ═══ Header ═══ */}
      <header className="bg-white border-b border-[#E3E8EF] px-6 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[20px] font-black text-[#002C5F] tracking-[-0.03em]">
              {navCopy.brand.ko}
            </span>
            <span
              className="text-[9px] text-[#6B7B8F] tracking-[0.3em] font-light"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              / {navCopy.brand.en}
            </span>
          </div>
          <div
            className="w-9 h-9 rounded-full bg-[#002C5F] text-white flex items-center justify-center text-[14px] font-bold"
            aria-label="이 대표"
          >
            이
          </div>
        </div>

        {/* Report row */}
        <div className="mt-3 flex items-center justify-between bg-[#E8F1FB] rounded-xl px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[#002C5F]"
              style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}
            >
              monitoring
            </span>
            <span className="text-[12px] font-semibold text-[#002C5F]">
              경영 리포트 · 2026-04
            </span>
          </div>
          <span
            className="text-[11px] font-bold text-[#002C5F] tabular-nums"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            4월 3주차
          </span>
        </div>
      </header>

      {/* ═══ Body ═══ */}
      <section className="px-6 pt-5 pb-10 space-y-4">
        {/* Big KPI Card */}
        <Reveal delay={0.05}>
          <div
            className="relative overflow-hidden rounded-2xl p-5 text-white"
            style={{
              background:
                "linear-gradient(145deg, #004A99 0%, #002C5F 55%, #001A3D 100%)",
              boxShadow: "0 10px 30px rgba(0, 44, 95, 0.18)",
            }}
          >
            {/* Decorative circles */}
            <div
              className="absolute -bottom-16 -right-12 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,170,210,0.22) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-8 right-10 w-24 h-24 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative">
              <p
                className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-semibold"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                이번 달 보호 정산액
              </p>
              <p
                className="text-[32px] font-black tabular-nums mt-1.5"
                style={{
                  fontFamily: "var(--font-roboto-mono), monospace",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                ₩83,240,000
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#00A86B]/25 text-[#6FE3AF]"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}
                  >
                    arrow_upward
                  </span>
                  +23.4%
                </span>
                <span className="text-[11px] text-white/70">
                  전월 동기 대비
                </span>
              </div>

              {/* Divider */}
              <div className="my-4 h-px bg-white/15" aria-hidden="true" />

              {/* 3-col stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "진행 배차", value: "12" },
                  { label: "대기", value: "3" },
                  { label: "완료 (오늘)", value: "47" },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-[20px] font-black text-white tabular-nums"
                      style={{
                        fontFamily: "var(--font-roboto-mono), monospace",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.value}
                    </p>
                    <p className="text-[10px] text-white/60 mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2-col mini stats */}
        <Reveal delay={0.12}>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="bg-white rounded-2xl p-3.5 border border-[#E3E8EF]"
              style={{ boxShadow: "0 4px 12px rgba(0, 44, 95, 0.06)" }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-[#E8F1FB] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#002C5F]"
                    style={{
                      fontSize: 14,
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    check_circle
                  </span>
                </div>
                <span className="text-[11px] text-[#6B7B8F] font-medium">
                  배차 성공률
                </span>
              </div>
              <p
                className="text-[20px] font-black text-[#0A1628] tabular-nums"
                style={{
                  fontFamily: "var(--font-roboto-mono), monospace",
                  letterSpacing: "-0.02em",
                }}
              >
                99.3%
              </p>
              <div className="flex items-center gap-0.5 mt-1">
                <span
                  className="material-symbols-outlined text-[#00A86B]"
                  style={{ fontSize: 12 }}
                >
                  arrow_upward
                </span>
                <span
                  className="text-[11px] font-bold text-[#00A86B] tabular-nums"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  +0.5%
                </span>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-3.5 border border-[#E3E8EF]"
              style={{ boxShadow: "0 4px 12px rgba(0, 44, 95, 0.06)" }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-[#E8F1FB] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#002C5F]"
                    style={{
                      fontSize: 14,
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    schedule
                  </span>
                </div>
                <span className="text-[11px] text-[#6B7B8F] font-medium">
                  평균 매칭
                </span>
              </div>
              <p
                className="text-[20px] font-black text-[#0A1628] tabular-nums"
                style={{
                  fontFamily: "var(--font-roboto-mono), monospace",
                  letterSpacing: "-0.02em",
                }}
              >
                2분 12초
              </p>
              <div className="flex items-center gap-0.5 mt-1">
                <span
                  className="material-symbols-outlined text-[#00A86B]"
                  style={{ fontSize: 12 }}
                >
                  arrow_downward
                </span>
                <span
                  className="text-[11px] font-bold text-[#00A86B] tabular-nums"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  -18초
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Weekly Chart */}
        <Reveal delay={0.18}>
          <div
            className="bg-white rounded-2xl p-4 border border-[#E3E8EF]"
            style={{ boxShadow: "0 4px 12px rgba(0, 44, 95, 0.06)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-[14px] font-bold text-[#0A1628]"
                style={{ letterSpacing: "-0.02em" }}
              >
                주간 배차 추이
              </h3>
              <div className="flex bg-[#F4F6FA] rounded-lg p-0.5">
                {["일", "주", "월"].map((t) => {
                  const active = t === "주";
                  return (
                    <button
                      key={t}
                      type="button"
                      className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        active
                          ? "bg-white text-[#002C5F] shadow-sm"
                          : "text-[#6B7B8F]"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SVG chart */}
            <div className="relative">
              <svg
                viewBox="0 0 280 100"
                width="100%"
                height="120"
                preserveAspectRatio="none"
                aria-label="주간 배차 추이 차트"
              >
                <defs>
                  <linearGradient id="execAreaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#002C5F" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#002C5F" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Weekend highlight — Saturday(x=200) & Sunday(x=240..280) */}
                <rect
                  x="200"
                  y="0"
                  width="80"
                  height="100"
                  fill="#00AAD2"
                  fillOpacity="0.05"
                />

                {/* Area fill */}
                <path
                  d={`${CHART_PATH} L280,100 L0,100 Z`}
                  fill="url(#execAreaFill)"
                />
                {/* Line */}
                <path
                  d={CHART_PATH}
                  fill="none"
                  stroke="#002C5F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Points */}
                {CHART_POINTS.map((p, i) => {
                  const isSunday = i === CHART_POINTS.length - 1;
                  return (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={isSunday ? 4.5 : 3}
                      fill={isSunday ? "#00AAD2" : "#FFFFFF"}
                      stroke={isSunday ? "#FFFFFF" : "#002C5F"}
                      strokeWidth={isSunday ? 2 : 2}
                    />
                  );
                })}
              </svg>

              {/* Day labels */}
              <div
                className="grid grid-cols-7 mt-2"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                {CHART_DAYS.map((d) => {
                  const weekend = d === "토" || d === "일";
                  return (
                    <span
                      key={d}
                      className={`text-[10px] text-center ${
                        weekend ? "text-[#00AAD2] font-bold" : "text-[#9AA8B8]"
                      }`}
                    >
                      {d}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Alerts */}
        <Reveal delay={0.24}>
          <div className="space-y-2.5">
            {ALERTS.map((a) => (
              <div
                key={a.title}
                className="bg-white rounded-xl p-3.5 border border-[#E3E8EF] flex items-start gap-3"
                style={{
                  borderLeft: `4px solid ${a.border}`,
                  boxShadow: "0 4px 12px rgba(0, 44, 95, 0.06)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: a.iconBg }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: 18,
                      color: a.iconFg,
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    {a.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded font-bold tracking-[0.1em]"
                      style={{
                        background: a.iconBg,
                        color: a.iconFg,
                        fontFamily: "var(--font-roboto-mono), monospace",
                      }}
                    >
                      {a.level}
                    </span>
                    <span className="text-[13px] font-bold text-[#0A1628]">
                      {a.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B7B8F] mt-1 leading-[1.5]">
                    {a.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
