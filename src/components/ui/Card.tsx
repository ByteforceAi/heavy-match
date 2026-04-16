interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = "", onClick, hover }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 md:p-5 border border-[#c1c6d6]/30 shadow-[0_2px_12px_rgba(17,28,41,0.04)] transition-all animate-fade-in ${
        hover ? "hover:border-[#0059b9]/40 hover:shadow-[0_8px_24px_rgba(0,89,185,0.08)] cursor-pointer active:scale-[0.98]" : ""
      } ${onClick ? "cursor-pointer active:scale-[0.98]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center justify-between mb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-[800] text-[#111c29] ${className}`}>{children}</h3>;
}

export function StatCard({ icon, value, label, color = "text-[#0059b9]", gradient }: {
  icon: string; value: string | number; label: string; color?: string; gradient?: string;
}) {
  if (gradient) {
    return (
      <div className={`${gradient} rounded-2xl p-4 text-white text-center shadow-sm`}>
        <span className="material-symbols-outlined text-2xl block mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        <p className="text-xl font-black tabular-nums">{value}</p>
        <p className="text-[10px] font-semibold opacity-70 mt-0.5">{label}</p>
      </div>
    );
  }

  return (
    <Card className="text-center !p-3 md:!p-5">
      {/* Material Symbol icon if it looks like one, otherwise render as-is */}
      {icon.length <= 3 ? (
        <span className="text-2xl md:text-3xl block">{icon}</span>
      ) : (
        <span className="material-symbols-outlined text-2xl md:text-3xl block text-[#0059b9]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      )}
      <p className={`text-xl md:text-2xl font-black tabular-nums mt-1 ${color}`}>{value}</p>
      <p className="text-xs md:text-sm text-[#727785] mt-0.5 font-medium">{label}</p>
    </Card>
  );
}
