import { getStatusLabel, getStatusColor } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-semibold ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
}

export function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    requester: "bg-blue-100 text-blue-700",
    owner: "bg-emerald-100 text-emerald-700",
    operator: "bg-amber-100 text-amber-700",
    callcenter: "bg-purple-100 text-purple-700",
    salesperson: "bg-pink-100 text-pink-700",
    admin: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    requester: "장비요청자",
    owner: "중장비사장",
    operator: "기사",
    callcenter: "콜센터",
    salesperson: "영업사원",
    admin: "관리자",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-semibold ${colors[role] ?? "bg-gray-100 text-gray-700"}`}>
      {labels[role] ?? role}
    </span>
  );
}
