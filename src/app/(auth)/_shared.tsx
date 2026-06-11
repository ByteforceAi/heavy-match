"use client";

/**
 * 인증 화면 공유 셸 — 로그인·회원가입이 같은 크롬을 쓴다.
 * 도면 그리드 배경 + 네이비 워드마크 칩 + 상단 룰 + 모노 스텝 인디케이터.
 */

export const INPUT_CLS =
  "w-full min-h-14 px-4 text-lg font-medium text-cy-ink bg-white border border-cy-line rounded-xl placeholder:text-cy-ink-4 focus:border-cy-navy-mid focus:ring-4 focus:ring-cy-navy/10 outline-none transition-[border-color,box-shadow] duration-150";

export const LABEL_CLS = "block text-[13px] font-bold text-cy-ink-2 mb-1.5";

export function ErrorAlert({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="animate-fade-in flex items-center gap-2 px-3 py-2.5 rounded-lg bg-cy-danger/8 text-cy-danger-deep text-sm font-semibold">
      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
      {children}
    </p>
  );
}

interface AuthShellProps {
  /** 카드 상단 모노 라벨 (예: "SECURE ACCESS · OTP") */
  badge: string;
  stepIndex: number;
  stepTotal: number;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthShell({ badge, stepIndex, stepTotal, title, children, footer }: AuthShellProps) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-cy-bg px-4 py-10 overflow-hidden">
      {/* 도면 그리드 — 28px 헤어라인, 중앙은 라디얼로 걷어내 카드에 집중 */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-cy-line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--color-cy-line-soft) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 35%, black 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 35%, black 100%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* 워드마크 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cy-navy shadow-[0_4px_12px_rgba(0,44,95,0.25)]">
              <span className="material-symbols-outlined text-xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            </span>
            <span className="text-2xl font-black text-cy-ink tracking-[-0.03em]">철연 CHEOLYEON</span>
          </div>
          <p className="text-sm text-cy-ink-3">중장비 배차·계약·정산 통합 플랫폼</p>
        </div>

        {/* 카드 */}
        <div className="bg-white rounded-2xl border border-cy-line shadow-[0_20px_50px_rgba(0,44,95,0.12),0_2px_8px_rgba(0,44,95,0.06)] overflow-hidden">
          <div className="h-[3px] bg-cy-navy" aria-hidden />
          <div className="px-7 pt-5 flex items-center justify-between">
            <span className="mono-label text-cy-ink-4">{badge}</span>
            <span className="mono-label text-cy-navy tabular-nums">{pad(stepIndex)} / {pad(stepTotal)}</span>
          </div>
          <div className="p-7 pt-4">
            <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-cy-ink mb-6">{title}</h1>
            {children}
          </div>
        </div>

        {footer && <div className="mt-6 text-center space-y-1">{footer}</div>}
      </div>
    </main>
  );
}
