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
  icon: string;
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  requester: [
    { href: "/requester", label: "홈", icon: "🏠" },
    { href: "/requester/request", label: "장비 요청", icon: "📋" },
    { href: "/requester/history", label: "요청 이력", icon: "📜" },
    { href: "/requester/rewards", label: "적립금", icon: "💰" },
  ],
  owner: [
    { href: "/owner", label: "콜 목록", icon: "📞" },
    { href: "/owner/prices", label: "단가 설정", icon: "💲" },
    { href: "/owner/operators", label: "기사 관리", icon: "👷" },
    { href: "/owner/history", label: "매칭 이력", icon: "📜" },
    { href: "/owner/invite", label: "초대 링크", icon: "🔗" },
  ],
  operator: [
    { href: "/operator", label: "현재 배차", icon: "🚧" },
    { href: "/operator/history", label: "작업 이력", icon: "📜" },
  ],
  callcenter: [
    { href: "/callcenter", label: "콜 관리", icon: "📞" },
    { href: "/callcenter/owners", label: "사장 관리", icon: "👥" },
    { href: "/callcenter/commission", label: "수수료", icon: "💰" },
  ],
  salesperson: [
    { href: "/salesperson", label: "분양 현황", icon: "📊" },
    { href: "/salesperson/commission", label: "수수료", icon: "💰" },
  ],
  admin: [
    { href: "/admin", label: "대시보드", icon: "📊" },
    { href: "/admin/dispatch", label: "배차 현황", icon: "🚧" },
    { href: "/admin/users", label: "사용자", icon: "👥" },
    { href: "/admin/commission", label: "수수료", icon: "💰" },
    { href: "/admin/settings", label: "설정", icon: "⚙️" },
  ],
};

interface Props {
  children: React.ReactNode;
  userRole: UserRole;
  userName: string;
  basePath?: string; // "/demo" for demo mode — prefixed to all nav links
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

  return (
    <div className="flex h-screen bg-bg">
      {/* 사이드바 - 데스크톱 */}
      <aside className="hidden md:flex md:w-64 flex-col bg-card border-r border-border">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">Heavy Match</h1>
          <p className="text-sm text-text-muted mt-1">{getRoleLabel(userRole)}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition ${
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-text hover:bg-blue-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text">{userName}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-text-muted hover:text-danger"
            >
              로그아웃
            </button>
          </div>
        </div>
      </aside>

      {/* 모바일 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 - 모바일 */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-card transform transition-transform md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">Heavy Match</h1>
            <p className="text-sm text-text-muted">{getRoleLabel(userRole)}</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-2xl text-text-muted">✕</button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition ${
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-text hover:bg-blue-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button onClick={handleLogout} className="w-full py-3 text-danger text-sm font-medium">
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 모바일 헤더 */}
        <header className="md:hidden bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-2xl text-text">☰</button>
          <h1 className="text-lg font-bold text-primary">Heavy Match</h1>
          <div className="w-8" />
        </header>

        {/* 하단 탭 - 모바일 */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30">
          <nav className="flex justify-around py-2">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-1 px-2 text-xs ${
                  pathname === item.href ? "text-primary font-semibold" : "text-text-muted"
                }`}
              >
                <span className="text-xl mb-0.5">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 페이지 콘텐츠 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
