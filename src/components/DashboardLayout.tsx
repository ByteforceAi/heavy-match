"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getRoleLabel } from "@/lib/utils";
import type { UserRole } from "@/types/database";

interface NavItem {
  href: string;
  label: string;
  icon: string; // Material Symbols icon name
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  requester: [
    { href: "/requester", label: "홈", icon: "home" },
    { href: "/requester/request", label: "장비 요청", icon: "edit_note" },
    { href: "/requester/history", label: "요청 이력", icon: "history" },
    { href: "/requester/rewards", label: "적립금", icon: "savings" },
  ],
  owner: [
    { href: "/owner", label: "콜 목록", icon: "call" },
    { href: "/owner/prices", label: "단가 설정", icon: "attach_money" },
    { href: "/owner/operators", label: "기사 관리", icon: "engineering" },
    { href: "/owner/history", label: "매칭 이력", icon: "history" },
    { href: "/owner/invite", label: "초대 링크", icon: "share" },
  ],
  operator: [
    { href: "/operator", label: "현재 배차", icon: "local_shipping" },
    { href: "/operator/history", label: "작업 이력", icon: "history" },
  ],
  callcenter: [
    { href: "/callcenter", label: "콜 관리", icon: "support_agent" },
    { href: "/callcenter/owners", label: "사장 관리", icon: "group" },
    { href: "/callcenter/commission", label: "수수료", icon: "savings" },
  ],
  salesperson: [
    { href: "/salesperson", label: "분양 현황", icon: "trending_up" },
    { href: "/salesperson/commission", label: "수수료", icon: "savings" },
  ],
  admin: [
    { href: "/admin", label: "대시보드", icon: "dashboard" },
    { href: "/admin/dispatch", label: "배차 현황", icon: "local_shipping" },
    { href: "/admin/inquiries", label: "문의 관리", icon: "inbox" },
    { href: "/admin/users", label: "사용자", icon: "group" },
    { href: "/admin/commission", label: "수수료", icon: "account_balance" },
    { href: "/admin/settings", label: "설정", icon: "settings" },
  ],
};

const ROLE_COLORS: Record<UserRole, string> = {
  requester: "text-[#002C5F]",
  owner: "text-emerald-600",
  operator: "text-amber-600",
  callcenter: "text-[#ba1a1a]",
  salesperson: "text-pink-600",
  admin: "text-violet-600",
};

interface Props {
  children: React.ReactNode;
  userRole: UserRole;
  userName: string;
  basePath?: string;
}

export default function DashboardLayout({ children, userRole, userName, basePath = "" }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const supabase = createClient();

  const navItems = (NAV_ITEMS[userRole] || []).map((item) => ({
    ...item,
    href: basePath + item.href,
  }));

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const MIcon = ({ name, fill, className = "" }: { name: string; fill?: boolean; className?: string }) => (
    <span className={`material-symbols-outlined ${className}`}
      style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}>{name}</span>
  );

  return (
    <div className="flex h-screen bg-[#F4F6FA]">
      {/* ── 사이드바: 데스크톱 ── */}
      <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-[#E3E8EF]/30">
        <div className="p-5 border-b border-[#E3E8EF]/20">
          <div className="flex items-center gap-2">
            <MIcon name="construction" fill className="text-[#002C5F]" />
            <h1 className="text-xl font-black text-[#0A1628] tracking-tight">철연 CHEOLYEON</h1>
          </div>
          <p className={`text-xs font-bold mt-1 ${ROLE_COLORS[userRole]}`}>{getRoleLabel(userRole)}</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#E8F1FB] text-[#002C5F]"
                    : "text-[#3A4A5F] hover:bg-[#F4F6FA]"
                }`}
              >
                <MIcon name={item.icon} fill={isActive} className={isActive ? "text-[#002C5F]" : "text-[#6B7B8F]"} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#E3E8EF]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E8F1FB] rounded-full flex items-center justify-center text-xs font-bold text-[#002C5F]">
                {userName[0]}
              </div>
              <span className="text-sm font-semibold text-[#0A1628] truncate max-w-[120px]">{userName}</span>
            </div>
            <button onClick={handleLogout} className="text-[#6B7B8F] hover:text-[#ba1a1a] transition-colors">
              <MIcon name="logout" className="text-lg" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── 모바일 오버레이 ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── 사이드바: 모바일 드로어 ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-[#E3E8EF]/20 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MIcon name="construction" fill className="text-[#002C5F]" />
              <h1 className="text-xl font-black tracking-tight">철연 CHEOLYEON</h1>
            </div>
            <p className={`text-xs font-bold mt-1 ${ROLE_COLORS[userRole]}`}>{getRoleLabel(userRole)}</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA]">
            <MIcon name="close" className="text-[#6B7B8F]" />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                  isActive ? "bg-[#E8F1FB] text-[#002C5F]" : "text-[#3A4A5F] hover:bg-[#F4F6FA]"
                }`}
              >
                <MIcon name={item.icon} fill={isActive} className={isActive ? "text-[#002C5F]" : "text-[#6B7B8F]"} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E3E8EF]/20 safe-bottom">
          <button onClick={handleLogout} className="w-full py-3 text-[#ba1a1a] text-sm font-bold flex items-center justify-center gap-2">
            <MIcon name="logout" className="text-lg" /> 로그아웃
          </button>
        </div>
      </aside>

      {/* ── 메인 콘텐츠 ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 모바일 헤더 */}
        <header className="md:hidden bg-white/80 backdrop-blur-xl border-b border-[#E3E8EF]/20 px-4 h-14 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F4F6FA] active:bg-[#E8F1FB] transition">
            <MIcon name="menu" className="text-[#0A1628]" />
          </button>
          <div className="flex items-center gap-1.5">
            <MIcon name="construction" fill className="text-[#002C5F] text-lg" />
            <span className="font-black text-[#0A1628] tracking-tight">철연 CHEOLYEON</span>
          </div>
          <div className="w-10" />
        </header>

        {/* 하단 탭: 모바일 */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-[#E3E8EF]/20 z-30 safe-bottom">
          <nav className="flex justify-around px-1 pt-1 pb-1">
            {navItems.slice(0, 4).map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl min-w-[60px] min-h-[52px] transition-all active:scale-95 ${
                    isActive ? "text-[#002C5F]" : "text-[#6B7B8F]"
                  }`}
                >
                  <MIcon name={item.icon} fill={isActive} className="text-xl" />
                  <span className={`text-[10px] mt-0.5 ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>
                  {isActive && <span className="w-4 h-0.5 bg-[#002C5F] rounded-full mt-0.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 페이지 콘텐츠 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
