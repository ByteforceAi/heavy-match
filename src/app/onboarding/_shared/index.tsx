"use client";

/**
 * 철연 CHEOLYEON — Onboarding Shared Components
 *
 * /onboarding/* 페이지 공통 레이아웃·진행 표시기.
 * Next.js App Router `_` prefix 폴더·파일은 라우팅에서 제외된다.
 */

import type React from "react";

// ═══════════════════════════════════════
// SHARED STATE TYPE + STORAGE KEY
// ═══════════════════════════════════════

export const ONBOARDING_STORAGE_KEY = "cy-onboarding";

export type OnboardingInvite = {
  role: string;
  email: string;
  phone: string;
};

export type OnboardingState = {
  startedAt?: string;
  company?: {
    name: string;
    bizNo: string;
    industry: string;
    size: string;
  };
  invites?: OnboardingInvite[];
  equipment?: Record<string, { hourly: string; daily: string }>;
  role?: "requester" | "admin" | "dispatcher";
};

export function readOnboardingState(): OnboardingState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as OnboardingState;
  } catch {
    return {};
  }
}

export function writeOnboardingState(next: OnboardingState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(next));
}

export function patchOnboardingState(patch: Partial<OnboardingState>): OnboardingState {
  const prev = readOnboardingState();
  const next: OnboardingState = { ...prev, ...patch };
  writeOnboardingState(next);
  return next;
}

// ═══════════════════════════════════════
// ONBOARDING SHELL (layout frame)
// ═══════════════════════════════════════

export function OnboardingShell({
  step,
  children,
}: {
  step: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
}) {
  return (
    <main
      className="relative min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 90% 0%, rgba(0,170,210,0.08) 0%, transparent 45%),
            radial-gradient(ellipse at 10% 20%, rgba(0,44,95,0.05) 0%, transparent 40%)
          `,
        }}
      />
      <div className="relative max-w-[720px] mx-auto px-6 py-12">
        <ProgressIndicator step={step} />
        <section
          className="bg-white rounded-2xl border border-[#E3E8EF] p-6 md:p-8"
          style={{ boxShadow: "0 10px 30px rgba(0,44,95,0.06)" }}
        >
          {children}
        </section>
        <p className="text-[11px] text-[#9AA8B8] text-center mt-6">
          온보딩 진행상태는 자동 저장된다. 동일 계정으로 재접속 시 이어서 진행 가능하다.
        </p>
      </div>
    </main>
  );
}

// ═══════════════════════════════════════
// 5-DOT PROGRESS INDICATOR
// ═══════════════════════════════════════

export function ProgressIndicator({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  const labels = ["환영", "회사", "팀원", "장비", "완료"];
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          Step <span className="tabular-nums">{step}/5</span>
        </span>
        <span className="text-[11px] text-[#6B7B8F]">{labels[step - 1]}</span>
      </div>
      <div className="flex items-center gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={5}>
        {[1, 2, 3, 4, 5].map((n) => {
          const active = n <= step;
          const current = n === step;
          return (
            <div key={n} className="flex-1 flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full flex-shrink-0 ${
                  active ? "bg-[#002C5F]" : "bg-[#D9E0EA]"
                } ${current ? "ring-2 ring-[#002C5F]/20 ring-offset-1 ring-offset-[#F4F6FA]" : ""}`}
                aria-hidden="true"
              />
              {n < 5 && (
                <div
                  className={`h-[2px] flex-1 ${
                    n < step ? "bg-[#002C5F]" : "bg-[#D9E0EA]"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// CTA FOOTER (previous / next)
// ═══════════════════════════════════════

export function OnboardingCtaRow({
  onBack,
  backLabel = "뒤로",
  onNext,
  nextLabel,
  nextDisabled = false,
  secondary,
}: {
  onBack?: () => void;
  backLabel?: string;
  onNext: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
  secondary?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 mt-8 border-t border-[#E3E8EF]">
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="bg-white border border-[#E3E8EF] text-[#3A4A5F] hover:border-[#002C5F]/40 px-6 py-3.5 rounded-lg transition-colors text-[14px] font-medium"
          >
            {backLabel}
          </button>
        )}
        {secondary}
      </div>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="bg-[#002C5F] hover:bg-[#0046A4] disabled:bg-[#9AA8B8] disabled:cursor-not-allowed text-white font-bold px-7 py-3.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-[14px]"
      >
        {nextLabel}
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
