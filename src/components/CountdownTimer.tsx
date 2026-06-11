"use client";

import { useState, useEffect } from "react";

/**
 * 배차 카운트다운 — 60초가 이 제품의 심장 박동이다.
 * 3단계 위상: 안정(네이비) → 주의(앰버, 50%) → 긴급(레드, 15초).
 * 진행 바는 linear(시간은 일정하게 흐른다), 색 전환만 ease.
 */

interface Props {
  startedAt: string;
  durationSeconds?: number;
}

export default function CountdownTimer({ startedAt, durationSeconds = 60 }: Props) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    const start = new Date(startedAt).getTime();
    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setRemaining(Math.max(0, durationSeconds - elapsed));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startedAt, durationSeconds]);

  const percentage = (remaining / durationSeconds) * 100;
  const phase = remaining <= 15 ? "urgent" : percentage <= 50 ? "caution" : "stable";
  const isExpired = remaining <= 0;

  if (isExpired) {
    return (
      <div role="status" className="flex items-center gap-2 text-cy-danger-deep">
        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>timer_off</span>
        <span className="text-sm font-bold">시간 만료</span>
      </div>
    );
  }

  const numColor =
    phase === "urgent" ? "text-cy-danger" : phase === "caution" ? "text-cy-warning-deep" : "text-cy-navy-mid";
  const barColor =
    phase === "urgent" ? "bg-cy-danger" : phase === "caution" ? "bg-cy-warning" : "bg-cy-navy-mid";

  return (
    <div className="space-y-1.5" role="timer" aria-label={`남은 시간 ${remaining}초`}>
      <div className="flex items-baseline justify-between">
        <span className={`flex items-center gap-1 font-mono font-bold tabular-nums text-[15px] transition-colors duration-500 ${numColor}`}>
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
          {remaining}
          <span className="text-xs font-semibold">초</span>
        </span>
        <span className="mono-label text-cy-ink-4">REMAINING</span>
      </div>
      <div
        className={`w-full h-1.5 bg-cy-line-soft rounded-full overflow-hidden ${
          phase === "urgent" ? "animate-[urgentPulse_1s_ease-in-out_infinite]" : ""
        }`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${barColor} transition-colors`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
