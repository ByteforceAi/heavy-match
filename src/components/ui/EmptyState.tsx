import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon = "📭", title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="bg-card rounded-2xl p-10 text-center border border-dashed border-border">
      <span className="text-4xl block mb-3">{icon}</span>
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      {description && <p className="text-sm text-text-muted mt-1">{description}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-block mt-4 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-light transition text-sm"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
