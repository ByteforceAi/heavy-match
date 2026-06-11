import Link from "next/link";

/**
 * 빈 상태 — "아무것도 없음"도 설계된 화면이다.
 * 아이콘은 이중 링(페일 → 화이트) 안에 앉혀 휑함 대신 의도를 만든다.
 */

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon = "inbox", title, description, actionLabel, actionHref }: EmptyStateProps) {
  const isEmoji = icon.length <= 3;

  return (
    <div className="bg-white rounded-2xl px-6 py-12 text-center border border-cy-line shadow-[0_2px_8px_rgba(0,44,95,0.04)]">
      <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cy-navy-pale/60 mb-4">
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-[0_1px_3px_rgba(0,44,95,0.1)]">
          {isEmoji ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <span className="material-symbols-outlined text-2xl text-cy-navy/70">{icon}</span>
          )}
        </span>
      </span>
      <h3 className="text-base font-bold text-cy-ink tracking-[-0.01em]">{title}</h3>
      {description && <p className="text-sm text-cy-ink-3 mt-1 leading-relaxed">{description}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="press inline-flex items-center justify-center gap-1.5 mt-5 min-h-12 px-5 bg-cy-navy text-white font-bold rounded-xl text-[15px] hover:bg-cy-navy-mid shadow-[0_1px_2px_rgba(0,44,95,0.2),0_4px_12px_rgba(0,44,95,0.15)]"
        >
          {actionLabel}
          <span aria-hidden className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      )}
    </div>
  );
}
