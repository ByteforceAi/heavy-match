"use client";

/**
 * /demo/field-manager — 모바일 현장소장 배차 화면
 *
 * 브랜드 레퍼런스 HTML `.m1` 블록을 모바일 우선 레이아웃으로 포팅한다.
 * HD Navy Light 팔레트, Pretendard + Roboto Mono.
 *
 * heritage-v1.md §3:
 *  - §3.2.5 의문형 훅 금지: "현장에 뭐가 필요하세요?" → "지금 배차 요청"
 *  - §3.2.1 ~입니다 금지: narrative는 판결문 어미(~한다/~된다)
 *  - §3.2.3 느낌표·1인칭 금지
 */

import { Reveal } from "@/components/motion/MotionPrimitives";
import { nav as navCopy } from "@/content/copy";

// ═══════════════════════════════════════
// 장비 선택 4종
// ═══════════════════════════════════════
const EQUIPMENT_TILES = [
  { label: "굴삭기", icon: "construction" },
  { label: "크레인", icon: "precision_manufacturing" },
  { label: "덤프", icon: "local_shipping" },
  { label: "지게차", icon: "forklift" },
] as const;

// ═══════════════════════════════════════
// 최근 배차 3건
// ═══════════════════════════════════════
type DispatchStatus = "ing" | "ok" | "wait";
interface DispatchRow {
  icon: string;
  name: string;
  spec: string;
  status: DispatchStatus;
  statusLabel: string;
  price: string;
  time: string;
}

const RECENT_DISPATCH: DispatchRow[] = [
  {
    icon: "construction",
    name: "굴삭기 3.5t",
    spec: "현장 투입 · 기사 배정 완료",
    status: "ing",
    statusLabel: "진행중",
    price: "₩450,000",
    time: "14:30",
  },
  {
    icon: "local_shipping",
    name: "덤프 15t",
    spec: "토사 반출 · 3회차 종료",
    status: "ok",
    statusLabel: "완료",
    price: "₩320,000",
    time: "오전 11:20",
  },
  {
    icon: "precision_manufacturing",
    name: "크레인 25t",
    spec: "사장 수락 대기 · 40초 경과",
    status: "wait",
    statusLabel: "승인대기",
    price: "₩1,200,000",
    time: "오전 9:15",
  },
];

// ═══════════════════════════════════════
// 하단 탭
// ═══════════════════════════════════════
interface TabItem {
  label: string;
  icon: string;
  active: boolean;
  isFab?: boolean;
}

const TABS: readonly TabItem[] = [
  { label: "홈", icon: "home", active: true },
  { label: "배차", icon: "receipt_long", active: false },
  { label: "", icon: "", active: false, isFab: true },
  { label: "계약·정산", icon: "account_balance_wallet", active: false },
  { label: "내 정보", icon: "person", active: false },
];

// ═══════════════════════════════════════
// STATUS BADGE HELPER
// ═══════════════════════════════════════
function statusStyles(status: DispatchStatus) {
  switch (status) {
    case "ok":
      return { bg: "rgba(0,168,107,0.12)", fg: "#00774A" };
    case "ing":
      return { bg: "#E8F1FB", fg: "#002C5F" };
    case "wait":
      return { bg: "rgba(255,176,32,0.15)", fg: "#B87400" };
  }
}

export default function FieldManagerPage() {
  return (
    <main
      className="max-w-md mx-auto min-h-screen bg-[#F4F6FA] text-[#0A1628] relative"
      style={{
        fontFamily: "'Pretendard', 'IBM Plex Sans KR', -apple-system, sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {/* ═══ Status Bar ═══ */}
      <div
        className="h-[44px] px-6 flex items-center justify-between bg-[#002C5F] text-white"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        <span className="text-[13px] font-semibold tabular-nums">9:41</span>
        <div className="flex items-center gap-[3px]" aria-hidden="true">
          <span className="w-1 h-1 bg-white rounded-full" />
          <span className="w-1 h-1 bg-white rounded-full" />
          <span className="w-1 h-1 bg-white rounded-full" />
          <span className="w-1 h-1 bg-white rounded-full" />
        </div>
      </div>

      {/* ═══ Navy Top Section ═══ */}
      <section
        className="relative bg-[#002C5F] text-white px-6 pt-5 pb-6"
        style={{ borderRadius: "0 0 24px 24px" }}
      >
        {/* Notification bell */}
        <button
          type="button"
          className="absolute top-5 right-6 w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center"
          aria-label="알림"
        >
          <span
            className="material-symbols-outlined text-white"
            style={{ fontSize: 22 }}
          >
            notifications
          </span>
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E5484D] ring-2 ring-[#002C5F]"
            aria-hidden="true"
          />
        </button>

        <Reveal delay={0.05}>
          <p className="text-[12px] text-white/60 font-medium">안녕하세요</p>
          <h1
            className="text-[20px] font-bold mt-0.5"
            style={{ letterSpacing: "-0.02em" }}
          >
            김민철 소장님
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="mt-4 bg-white/10 rounded-xl p-3 flex items-center justify-between"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.18em] text-white/60 font-medium"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                현재 현장
              </p>
              <p className="text-[14px] font-semibold mt-0.5">해운대 센텀 2공구</p>
            </div>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#00AAD2] text-white rounded-full text-[11px] font-bold"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              <span
                className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                aria-hidden="true"
              />
              가동중
            </span>
          </div>
        </Reveal>
      </section>

      {/* ═══ Body ═══ */}
      <section className="px-6 pt-6 pb-28">
        {/* CTA Gradient Card */}
        <Reveal delay={0.2}>
          <div
            className="relative overflow-hidden rounded-2xl p-5 text-white"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(0,170,210,0.35) 0%, transparent 55%), linear-gradient(135deg, #0046A4 0%, #002C5F 100%)",
              boxShadow: "0 10px 30px rgba(0, 44, 95, 0.18)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] uppercase tracking-[0.22em] text-white/70 font-semibold"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                지금 바로 배차
              </span>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/12 rounded-full text-[10px] font-bold"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                <span className="relative flex w-1.5 h-1.5" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full bg-[#00A86B] animate-ping opacity-60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-[#00A86B]" />
                </span>
                LIVE
              </span>
            </div>

            <h2
              className="text-[22px] font-black"
              style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              지금 배차 요청
            </h2>
            <p className="text-[12px] text-white/75 mt-1.5">
              평균 매칭 2분 · 떼임 방지 보장
            </p>

            <button
              type="button"
              className="mt-4 w-full bg-white text-[#002C5F] rounded-xl py-3 text-[14px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#F4F6FA] transition-colors"
            >
              장비 요청
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 18 }}
              >
                arrow_forward
              </span>
            </button>
          </div>
        </Reveal>

        {/* 장비 선택 */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3
              className="text-[15px] font-bold text-[#0A1628]"
              style={{ letterSpacing: "-0.02em" }}
            >
              장비 선택
            </h3>
            <button
              type="button"
              className="text-[12px] text-[#3A4A5F] font-medium hover:text-[#002C5F] transition-colors flex items-center gap-0.5"
            >
              전체
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 14 }}
              >
                arrow_forward
              </span>
            </button>
          </div>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-4 gap-2.5">
              {EQUIPMENT_TILES.map((tile) => (
                <button
                  key={tile.label}
                  type="button"
                  className="bg-white rounded-xl p-3 flex flex-col items-center gap-2 border border-[#E3E8EF] hover:border-[#002C5F] transition-colors"
                  style={{ boxShadow: "0 4px 12px rgba(0, 44, 95, 0.06)" }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E8F1FB] flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#002C5F]"
                      style={{
                        fontSize: 22,
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      {tile.icon}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0A1628]">
                    {tile.label}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 최근 배차 */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3
              className="text-[15px] font-bold text-[#0A1628]"
              style={{ letterSpacing: "-0.02em" }}
            >
              최근 배차
            </h3>
            <button
              type="button"
              className="text-[12px] text-[#3A4A5F] font-medium hover:text-[#002C5F] transition-colors flex items-center gap-0.5"
            >
              더보기
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 14 }}
              >
                arrow_forward
              </span>
            </button>
          </div>

          <Reveal delay={0.15}>
            <div className="space-y-2.5">
              {RECENT_DISPATCH.map((row, idx) => {
                const st = statusStyles(row.status);
                return (
                  <div
                    key={`${row.name}-${idx}`}
                    className="bg-white rounded-xl p-3.5 flex items-center gap-3 border border-[#E3E8EF]"
                    style={{ boxShadow: "0 4px 12px rgba(0, 44, 95, 0.06)" }}
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#E8F1FB] flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined text-[#002C5F]"
                        style={{
                          fontSize: 22,
                          fontVariationSettings: "'FILL' 1",
                        }}
                      >
                        {row.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-bold text-[#0A1628] truncate">
                          {row.name}
                        </span>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                          style={{ background: st.bg, color: st.fg }}
                        >
                          {row.statusLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7B8F] mt-0.5 truncate">
                        {row.spec}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className="text-[13px] font-bold text-[#0A1628] tabular-nums"
                        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                      >
                        {row.price}
                      </p>
                      <p className="text-[10px] text-[#9AA8B8] mt-0.5">
                        {row.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Brand footer mini */}
        <div className="mt-8 flex items-baseline justify-center gap-2">
          <span className="text-[11px] font-black text-[#002C5F] tracking-[-0.02em]">
            {navCopy.brand.ko}
          </span>
          <span
            className="text-[8px] text-[#9AA8B8] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {navCopy.brand.en}
          </span>
        </div>
      </section>

      {/* ═══ Bottom Tab Bar ═══ */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E3E8EF] h-[72px] z-40"
        style={{ boxShadow: "0 -4px 16px rgba(0, 44, 95, 0.06)" }}
        aria-label="하단 탭"
      >
        <div className="relative h-full grid grid-cols-5">
          {TABS.map((tab, idx) =>
            tab.isFab ? (
              <div
                key={`fab-${idx}`}
                className="flex items-start justify-center"
                aria-hidden="true"
              >
                {/* FAB slot kept empty; actual FAB floats above */}
              </div>
            ) : (
              <button
                key={tab.label}
                type="button"
                className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  tab.active
                    ? "text-[#002C5F]"
                    : "text-[#6B7B8F] hover:text-[#3A4A5F]"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 22,
                    fontVariationSettings: tab.active ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {tab.icon}
                </span>
                <span
                  className={`text-[10px] ${
                    tab.active ? "font-bold" : "font-medium"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          )}

          {/* Center FAB */}
          <button
            type="button"
            className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full bg-[#002C5F] text-white flex items-center justify-center hover:bg-[#0046A4] transition-colors"
            style={{ boxShadow: "0 8px 20px rgba(0, 44, 95, 0.35)" }}
            aria-label="새 배차 요청"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 28, fontVariationSettings: "'FILL' 1" }}
            >
              add
            </span>
          </button>
        </div>
      </nav>
    </main>
  );
}
