import { getStatusLabel } from "@/lib/utils";

/**
 * 상태·역할 배지 — 배차 도메인의 상태 시각 언어.
 *
 * tokens.ts colors.status 체계와 1:1 (globals.css --color-cy-st-*).
 * 전용콜=네이비 · 콜센터=앰버 · 공유콜=시안 · 매칭=그린 · 작업중=네이비미드
 * · 완료=딥그린 · 취소=레드. 도트가 상태색 원색, 배경은 동일색 8% 틴트 —
 * 어느 화면에서든 도트 색만으로 상태를 읽을 수 있다.
 */

const STATUS_STYLES: Record<string, { chip: string; dot: string }> = {
  pending: { chip: "bg-cy-ink-3/10 text-cy-ink-2", dot: "bg-cy-ink-3" },
  exclusive_call: { chip: "bg-cy-navy/8 text-cy-navy", dot: "bg-cy-navy" },
  callcenter_call: { chip: "bg-cy-warning/12 text-cy-warning-deep", dot: "bg-cy-warning" },
  shared_call: { chip: "bg-cy-cyan/10 text-cy-cyan-deep", dot: "bg-cy-cyan" },
  matched: { chip: "bg-cy-success/10 text-cy-success-deep", dot: "bg-cy-success" },
  operator_assigned: { chip: "bg-cy-navy-mid/8 text-cy-navy-mid", dot: "bg-cy-navy-mid" },
  in_progress: { chip: "bg-cy-navy-mid/8 text-cy-navy-mid", dot: "bg-cy-navy-mid" },
  completed: { chip: "bg-cy-success-deep/10 text-cy-success-deep", dot: "bg-cy-success-deep" },
  cancelled: { chip: "bg-cy-danger/8 text-cy-danger-deep", dot: "bg-cy-danger" },
};

const FALLBACK = { chip: "bg-cy-ink-3/10 text-cy-ink-2", dot: "bg-cy-ink-3" };

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? FALLBACK;
  const live = status === "in_progress" || status === "exclusive_call" || status === "shared_call";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-[-0.01em] ${s.chip}`}>
      <span aria-hidden className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot} ${live ? "animate-[pulse_2s_ease-in-out_infinite]" : ""}`} />
      {getStatusLabel(status)}
    </span>
  );
}

const ROLE_STYLES: Record<string, { chip: string; dot: string }> = {
  requester: { chip: "bg-cy-navy/8 text-cy-navy", dot: "bg-cy-navy" },
  owner: { chip: "bg-cy-success/10 text-cy-success-deep", dot: "bg-cy-success" },
  operator: { chip: "bg-cy-warning/12 text-cy-warning-deep", dot: "bg-cy-warning" },
  callcenter: { chip: "bg-cy-cyan/10 text-cy-cyan-deep", dot: "bg-cy-cyan" },
  salesperson: { chip: "bg-cy-navy-mid/8 text-cy-navy-mid", dot: "bg-cy-navy-mid" },
  admin: { chip: "bg-cy-ink text-white", dot: "bg-cy-cyan" },
};

const ROLE_LABELS: Record<string, string> = {
  requester: "장비요청자",
  owner: "중장비사장",
  operator: "기사",
  callcenter: "콜센터",
  salesperson: "영업사원",
  admin: "관리자",
};

export function RoleBadge({ role }: { role: string }) {
  const s = ROLE_STYLES[role] ?? FALLBACK;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-[-0.01em] ${s.chip}`}>
      <span aria-hidden className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {ROLE_LABELS[role] ?? role}
    </span>
  );
}
