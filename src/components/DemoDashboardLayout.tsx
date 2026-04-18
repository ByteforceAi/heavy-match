"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@/types/database";

interface NavItem { href: string; label: string; icon: string; }

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  requester: [
    { href: "/demo/requester", label: "홈", icon: "home" },
    { href: "/demo/requester/request", label: "장비 요청", icon: "edit_note" },
    { href: "/demo/requester/history", label: "요청 이력", icon: "history" },
    { href: "/demo/requester/rewards", label: "적립금", icon: "savings" },
  ],
  owner: [
    { href: "/demo/owner", label: "콜 목록", icon: "call" },
    { href: "/demo/owner/prices", label: "단가 설정", icon: "payments" },
    { href: "/demo/owner/operators", label: "기사 관리", icon: "engineering" },
    { href: "/demo/owner/history", label: "매칭 이력", icon: "history" },
    { href: "/demo/owner/invite", label: "초대 링크", icon: "link" },
  ],
  operator: [
    { href: "/demo/operator", label: "현재 배차", icon: "local_shipping" },
    { href: "/demo/operator/history", label: "작업 이력", icon: "history" },
  ],
  callcenter: [
    { href: "/demo/callcenter", label: "콜 관리", icon: "support_agent" },
    { href: "/demo/callcenter/owners", label: "사장 관리", icon: "groups" },
    { href: "/demo/callcenter/commission", label: "수수료", icon: "account_balance" },
  ],
  salesperson: [
    { href: "/demo/salesperson", label: "분양 현황", icon: "trending_up" },
    { href: "/demo/salesperson/commission", label: "수수료", icon: "account_balance" },
  ],
  admin: [
    { href: "/demo/admin", label: "대시보드", icon: "dashboard" },
    { href: "/demo/admin/dispatch", label: "배차 현황", icon: "local_shipping" },
    { href: "/demo/admin/users", label: "사용자", icon: "group" },
    { href: "/demo/admin/commission", label: "수수료", icon: "account_balance" },
    { href: "/demo/admin/settings", label: "설정", icon: "settings" },
  ],
};

const ROLE_LABELS: Record<string, string> = {
  requester: "장비요청자", owner: "중장비사장", operator: "기사",
  callcenter: "콜센터", salesperson: "영업사원", admin: "관리자",
};

interface Props {
  children: React.ReactNode;
  userRole: UserRole;
  userName: string;
}

export default function DemoDashboardLayout({ children, userRole, userName }: Props) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = NAV_ITEMS[userRole] || [];

  const isActive = (href: string) => pathname === href || (href !== `/demo/${userRole}` && pathname.startsWith(href + "/"));

  return (
    <div className="flex h-screen bg-[#F4F6FA]" style={{ fontFamily: "'Inter', 'Pretendard', sans-serif", letterSpacing: "-0.02em" }}>
      {/* ── 사이드바 (데스크톱) ── */}
      <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-[#E3E8EF]/30">
        <div className="p-5 border-b border-[#E3E8EF]/30">
          <Link href="/demo" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#002C5F]" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="text-xl font-black text-[#0A1628] tracking-tighter">철연 CHEOLYEON</span>
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#E8F1FB] text-[#002C5F] text-xs font-bold rounded-full">{ROLE_LABELS[userRole]}</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive(item.href)
                  ? "bg-[#E8F1FB] text-[#002C5F]"
                  : "text-[#3A4A5F] hover:bg-[#F4F6FA]"
              }`}
            >
              <span className="material-symbols-outlined text-xl" style={isActive(item.href) ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#E3E8EF]/30">
          <p className="text-sm font-semibold text-[#0A1628]">{userName}</p>
          <Link href="/demo" className="text-xs text-[#6B7B8F] hover:text-[#002C5F] transition-colors">← 역할 선택으로</Link>
        </div>
      </aside>

      {/* ── 모바일 오버레이 ── */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── 사이드바 (모바일) ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-[#E3E8EF]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#002C5F]" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="text-lg font-black text-[#0A1628]">철연 CHEOLYEON</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F4F6FA]">
            <span className="material-symbols-outlined text-[#3A4A5F]">close</span>
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all ${
                isActive(item.href) ? "bg-[#E8F1FB] text-[#002C5F]" : "text-[#3A4A5F]"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E3E8EF]/30 safe-bottom">
          <Link href="/demo" className="block w-full py-3 text-center text-[#6B7B8F] text-sm font-medium hover:text-[#002C5F]">← 역할 선택으로</Link>
        </div>
      </aside>

      {/* ── 메인 콘텐츠 ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 모바일 헤더 */}
        <header className="md:hidden bg-white/80 backdrop-blur-xl border-b border-[#E3E8EF]/30 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-[#F4F6FA] active:bg-[#dee9fb]">
            <span className="material-symbols-outlined text-[#0A1628]">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#002C5F] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="text-base font-bold text-[#0A1628]">철연 CHEOLYEON</span>
          </div>
          <span className="px-2 py-1 bg-[#E8F1FB] text-[#002C5F] text-xs font-bold rounded-lg">{ROLE_LABELS[userRole]}</span>
        </header>

        {/* 데모 배너 */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-1.5 text-xs font-bold tracking-wide">
          🎮 데모 시뮬레이터 — 시연용 화면입니다
        </div>

        {/* 하단 탭 (모바일) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E8EF]/30 z-30 safe-bottom">
          <nav className="flex justify-around px-1 pt-1 pb-1">
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl min-w-[60px] min-h-[52px] transition-all active:scale-95 ${
                  isActive(item.href) ? "text-[#002C5F] bg-[#E8F1FB]" : "text-[#6B7B8F]"
                }`}
              >
                <span className="material-symbols-outlined text-xl mb-0.5" style={isActive(item.href) ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                <span className="text-[10px] font-semibold">{item.label}</span>
              </Link>
            ))}
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
