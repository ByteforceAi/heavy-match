"use client";

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
    <div className="bg-white rounded-2xl border border-[#c1c6d6]/30 p-4 shadow-[0_2px_12px_rgba(17,28,41,0.04)]">
      {title && <h4 className="text-sm font-bold text-[#111c29] mb-3">{title}</h4>}
      <div className="flex items-center gap-4">
        <svg width={size} height={size} viewBox="0 0 100 100" className="flex-shrink-0">
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
                strokeDasharray={`${dashLen} ${dashGap}`}
                strokeDashoffset={-currentOffset}
                transform="rotate(-90 50 50)"
                className="transition-all duration-700"
              />
            );
          })}
          <text x="50" y="47" textAnchor="middle" className="text-[10px] fill-[#111c29] font-black">{total}</text>
          <text x="50" y="57" textAnchor="middle" className="text-[5px] fill-[#727785] font-medium">건</text>
        </svg>
        <div className="flex-1 space-y-1.5">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                <span className="text-[#414754] font-medium">{seg.label}</span>
              </div>
              <span className="font-bold text-[#111c29] tabular-nums">{seg.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
