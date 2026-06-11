"use client";

import { colors } from "@/lib/design-system";

/**
 * 도넛 차트 — 세그먼트 색은 호출부가 tokens.colors.status에서 골라 넘긴다.
 */

interface Segment {
  label: string;
  value: number;
  color: string;
}

interface Props {
  segments: Segment[];
  title?: string;
  size?: number;
}

export default function DonutChart({ segments, title, size = 120 }: Props) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="bg-white rounded-2xl border border-cy-line p-4 shadow-[0_2px_8px_rgba(0,44,95,0.06)]">
      {title && (
        <div className="flex items-baseline justify-between mb-3">
          <h4 className="text-sm font-bold text-cy-ink tracking-[-0.01em]">{title}</h4>
          <span className="mono-label text-cy-ink-4">STATUS</span>
        </div>
      )}
      <div className="flex items-center gap-4">
        <svg width={size} height={size} viewBox="0 0 100 100" className="flex-shrink-0" role="img" aria-label={title || "도넛 차트"}>
          {/* 트랙 — 빈 구간에도 형태가 보이도록 */}
          <circle cx="50" cy="50" r={radius} fill="none" stroke={colors.lineSoft} strokeWidth="12" />
          {segments.map((seg, i) => {
            const pct = seg.value / total;
            const dashLen = pct * circumference;
            const dashGap = circumference - dashLen;
            const currentOffset = offset;
            offset += dashLen;
            return (
              <circle
                key={i}
                cx="50" cy="50" r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="12"
                strokeLinecap="butt"
                strokeDasharray={`${dashLen} ${dashGap}`}
                strokeDashoffset={-currentOffset}
                transform="rotate(-90 50 50)"
                className="transition-all duration-700"
              />
            );
          })}
          <text x="50" y="47" textAnchor="middle" className="text-[10px] font-black" fill={colors.ink} style={{ fontVariantNumeric: "tabular-nums" }}>{total}</text>
          <text x="50" y="57" textAnchor="middle" className="text-[5px] font-medium" fill={colors.ink3}>건</text>
        </svg>
        <div className="flex-1 space-y-1.5">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                <span className="text-cy-ink-2 font-medium">{seg.label}</span>
              </div>
              <span className="font-bold text-cy-ink tabular-nums">{seg.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
