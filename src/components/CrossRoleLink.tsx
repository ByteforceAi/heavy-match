"use client";

import Link from "next/link";

const ROLE_ICONS: Record<string, string> = {
  requester: "person_search",
  owner: "local_shipping",
  operator: "engineering",
  callcenter: "support_agent",
  salesperson: "payments",
  admin: "admin_panel_settings",
};

const ROLE_LABELS: Record<string, string> = {
  requester: "장비요청자",
  owner: "중장비사장",
  operator: "기사",
  callcenter: "콜센터",
  salesperson: "영업사원",
  admin: "관리자",
};

interface Props {
  targetRole: string;
  description: string;
  className?: string;
}

export default function CrossRoleLink({ targetRole, description, className = "" }: Props) {
  return (
    <Link
      href={`/demo/${targetRole}`}
      className={`flex items-center gap-3 p-3 bg-[#eef4ff] hover:bg-[#dee9fb] rounded-xl border border-[#c1c6d6]/30 transition-all active:scale-[0.98] ${className}`}
    >
      <div className="w-9 h-9 bg-[#d7e2ff] rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-lg text-[#0059b9]">{ROLE_ICONS[targetRole]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#727785]">{ROLE_LABELS[targetRole]} 화면에서</p>
        <p className="text-sm font-bold text-[#0059b9] truncate">{description}</p>
      </div>
      <span className="material-symbols-outlined text-[#0059b9] text-lg">arrow_forward</span>
    </Link>
  );
}
