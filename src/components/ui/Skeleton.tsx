/**
 * 스켈레톤 — 정지된 pulse 대신 쉬머(빛이 지나가는 결).
 * 실제 콘텐츠와 같은 골격을 그려 로드 후 레이아웃 점프를 없앤다.
 */

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`skeleton-shimmer rounded-lg ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div role="status" aria-label="불러오는 중" className="bg-white rounded-2xl p-5 border border-cy-line shadow-[0_2px_8px_rgba(0,44,95,0.04)] space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-5 w-24" />
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div role="status" aria-label="불러오는 중" className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-cy-line text-center space-y-2">
          <Skeleton className="h-10 w-10 mx-auto rounded-xl" />
          <Skeleton className="h-7 w-20 mx-auto" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>
      ))}
    </div>
  );
}
