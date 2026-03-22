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
      className={`bg-card rounded-2xl p-5 shadow-sm border border-border ${
        hover ? "hover:border-primary hover:shadow-md cursor-pointer transition-all" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center justify-between mb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-bold text-text ${className}`}>{children}</h3>;
}

export function StatCard({ icon, value, label, color = "text-primary" }: { icon: string; value: string | number; label: string; color?: string }) {
  return (
    <Card className="text-center">
      <span className="text-2xl block">{icon}</span>
      <p className={`text-2xl font-bold tabular-nums mt-1 ${color}`}>{value}</p>
      <p className="text-sm text-text-muted mt-0.5">{label}</p>
    </Card>
  );
}
