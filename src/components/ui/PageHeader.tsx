/**
 * 페이지 헤더 — 모든 대시보드 페이지의 표준 도입부.
 * 타이틀 좌측의 네이비 룰(rule)이 철연의 "도면" 시그니처.
 */

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="border-l-[3px] border-cy-navy pl-3.5">
        <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-cy-ink leading-tight">{title}</h2>
        {description && <p className="text-sm text-cy-ink-3 mt-1">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
