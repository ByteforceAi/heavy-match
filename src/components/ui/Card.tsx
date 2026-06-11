/**
 * 카드 — 모든 대시보드 표면의 기본 컨테이너.
 * 섀도는 tokens.ts shadows.card (네이비 기반) 체계를 따른다.
 */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = "", onClick, hover }: CardProps) {
  const interactive = hover || !!onClick;
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 md:p-5 border border-cy-line shadow-[0_2px_8px_rgba(0,44,95,0.06)] ${
        interactive
          ? "press cursor-pointer hover:border-cy-navy/25 hover:shadow-[0_8px_20px_rgba(0,44,95,0.1),0_0_0_1px_rgba(0,44,95,0.05)] hover:-translate-y-px"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center justify-between mb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-extrabold tracking-[-0.02em] text-cy-ink ${className}`}>{children}</h3>;
}

export function StatCard({ icon, value, label, color = "text-cy-navy", gradient }: {
  icon: string; value: string | number; label: string; color?: string; gradient?: string;
}) {
  if (gradient) {
    return (
      <div className={`${gradient} rounded-2xl p-4 text-white text-center shadow-[0_4px_12px_rgba(0,44,95,0.15)]`}>
        <span className="material-symbols-outlined text-2xl block mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        <p className="text-xl font-black tabular-nums">{value}</p>
        <p className="text-[10px] font-semibold opacity-70 mt-0.5">{label}</p>
      </div>
    );
  }

  return (
    <Card className="text-center !p-3 md:!p-5">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cy-navy-pale">
        {icon.length <= 3 ? (
          <span className="text-xl">{icon}</span>
        ) : (
          <span className={`material-symbols-outlined text-xl ${color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        )}
      </span>
      <p className={`text-xl md:text-2xl font-black tabular-nums tracking-[-0.02em] mt-1.5 ${color}`}>{value}</p>
      <p className="text-xs md:text-sm text-cy-ink-3 mt-0.5 font-medium">{label}</p>
    </Card>
  );
}
