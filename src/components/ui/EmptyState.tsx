import Link from "next/link";

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
    <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-[#c1c6d6]/50">
      {isEmoji ? (
        <span className="text-4xl block mb-3">{icon}</span>
      ) : (
        <span className="material-symbols-outlined text-5xl text-[#c1c6d6] block mb-3">{icon}</span>
      )}
      <h3 className="text-lg font-bold text-[#111c29]">{title}</h3>
      {description && <p className="text-sm text-[#727785] mt-1">{description}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1 mt-4 px-5 py-2.5 bg-[#0059b9] text-white font-bold rounded-xl hover:bg-[#1071e5] active:scale-95 transition-all text-sm"
        >
          {actionLabel}
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      )}
    </div>
  );
}
