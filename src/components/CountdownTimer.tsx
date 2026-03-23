"use client";

import { useState, useEffect } from "react";

interface Props {
  startedAt: string; // ISO timestamp
  durationSeconds?: number; // default 60
}

export default function CountdownTimer({ startedAt, durationSeconds = 60 }: Props) {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    const start = new Date(startedAt).getTime();

    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const left = Math.max(0, durationSeconds - elapsed);
      setRemaining(left);
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
      <div className="flex items-center gap-2 text-danger">
        <span className="text-sm font-bold">⏰ 시간 만료</span>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-bold tabular-nums ${isUrgent ? "text-danger" : "text-accent"}`}>
          ⏱ {remaining}초
        </span>
        <span className="text-xs text-text-muted">남은 시간</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isUrgent ? "bg-danger" : "bg-accent"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
