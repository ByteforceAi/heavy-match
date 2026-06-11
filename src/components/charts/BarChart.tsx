"use client";

import { colors } from "@/lib/design-system";

/**
 * 바 차트 — SVG presentation attribute는 CSS var를 못 받으므로
 * tokens.ts의 colors 값을 직접 임포트한다 (하드코딩 금지 원칙 준수).
 */

interface BarData {
  label: string;
  value: number;
}

interface Props {
  data: BarData[];
  height?: number;
  color?: string;
  title?: string;
}

export default function BarChart({ data, height = 160, color = colors.navy.DEFAULT, title }: Props) {
  const max = Math.max(...data.map(d => d.value), 1);
  const barWidth = 100 / data.length;

  return (
    <div className="bg-white rounded-2xl border border-cy-line p-4 shadow-[0_2px_8px_rgba(0,44,95,0.06)]">
      {title && (
        <div className="flex items-baseline justify-between mb-3">
          <h4 className="text-sm font-bold text-cy-ink tracking-[-0.01em]">{title}</h4>
          <span className="mono-label text-cy-ink-4">WEEKLY</span>
        </div>
      )}
      <svg viewBox={`0 0 100 ${height / 3}`} className="w-full" preserveAspectRatio="none" role="img" aria-label={title || "바 차트"}>
        {/* 기준선 — 도면 헤어라인 */}
        <line x1="0" y1={height / 3 - 5} x2="100" y2={height / 3 - 5} stroke={colors.lineSoft} strokeWidth="0.4" />
        {data.map((d, i) => {
          const barH = (d.value / max) * (height / 3 - 10);
          const x = i * barWidth + barWidth * 0.15;
          const w = barWidth * 0.7;
          const y = height / 3 - barH - 5;
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={barH} rx={1.5} fill={color} opacity={0.9} className="transition-all duration-500" />
              <text x={x + w / 2} y={height / 3 - 1} textAnchor="middle" className="text-[2.5px] font-semibold" fill={colors.ink3}>{d.label}</text>
              {d.value > 0 && (
                <text x={x + w / 2} y={y - 1.5} textAnchor="middle" className="text-[2.5px] font-bold" fill={colors.ink}>{d.value}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
