"use client";

import { useState, useEffect } from "react";

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
  const isUrgent = remaining <= 15;
  const isExpired = remaining <= 0;

  if (isExpired) {
    return (
      <div className="flex items-center gap-2 text-[#ba1a1a]">
        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>timer_off</span>
        <span className="text-sm font-bold">시간 만료</span>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-bold tabular-nums flex items-center gap-1 ${isUrgent ? "text-[#ba1a1a]" : "text-[#0059b9]"}`}>
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
          {remaining}초
        </span>
        <span className="text-xs text-[#727785]">남은 시간</span>
      </div>
      <div className="w-full h-2 bg-[#d8e3f5] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${isUrgent ? "bg-[#ba1a1a]" : "bg-[#0059b9]"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
