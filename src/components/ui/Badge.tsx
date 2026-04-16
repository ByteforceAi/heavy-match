import { getStatusLabel } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-[#dee9fb] text-[#414754]",
  exclusive_call: "bg-[#d7e2ff] text-[#004491]",
  callcenter_call: "bg-amber-100 text-amber-800",
  shared_call: "bg-[#dde3ef] text-[#595f69]",
  matched: "bg-emerald-100 text-emerald-700",
  operator_assigned: "bg-[#e5eeff] text-[#0059b9]",
  in_progress: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-[#ffdad6] text-[#ba1a1a]",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${STATUS_COLORS[status] ?? "bg-[#dee9fb] text-[#414754]"}`}>
      {getStatusLabel(status)}
    </span>
  );
}

const ROLE_COLORS: Record<string, string> = {
  requester: "bg-[#d7e2ff] text-[#004491]",
  owner: "bg-emerald-100 text-emerald-700",
  operator: "bg-amber-100 text-amber-700",
  callcenter: "bg-[#ffdad6] text-[#ba1a1a]",
  salesperson: "bg-pink-100 text-pink-700",
  admin: "bg-[#26313f] text-[#eaf1ff]",
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
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${ROLE_COLORS[role] ?? "bg-[#dee9fb] text-[#414754]"}`}>
      {ROLE_LABELS[role] ?? role}
    </span>
  );
}
