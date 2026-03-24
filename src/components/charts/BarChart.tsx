"use client";

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

export default function BarChart({ data, height = 160, color = "#0059b9", title }: Props) {
  const max = Math.max(...data.map(d => d.value), 1);
  const barWidth = 100 / data.length;

  return (
    <div className="bg-white rounded-2xl border border-[#c1c6d6]/30 p-4 shadow-[0_2px_12px_rgba(17,28,41,0.04)]">
      {title && <h4 className="text-sm font-bold text-[#111c29] mb-3">{title}</h4>}
      <svg viewBox={`0 0 100 ${height / 3}`} className="w-full" preserveAspectRatio="none">
        {data.map((d, i) => {
          const barH = (d.value / max) * (height / 3 - 10);
          const x = i * barWidth + barWidth * 0.15;
          const w = barWidth * 0.7;
          const y = height / 3 - barH - 5;
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={barH} rx={2} fill={color} opacity={0.85} className="transition-all duration-500" />
              <text x={x + w / 2} y={height / 3 - 1} textAnchor="middle" className="text-[2.5px] fill-[#727785] font-semibold">{d.label}</text>
              {d.value > 0 && (
                <text x={x + w / 2} y={y - 1} textAnchor="middle" className="text-[2.5px] fill-[#111c29] font-bold">{d.value}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
