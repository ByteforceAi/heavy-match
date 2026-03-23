"use client";

import { useState } from "react";
import { useDemoContext } from "./DemoProvider";
import type { UserRole } from "@/types/database";

const ROLES: { value: UserRole; label: string; icon: string; color: string }[] = [
  { value: "requester", label: "장비요청자", icon: "🏗️", color: "bg-blue-500" },
  { value: "owner", label: "중장비사장", icon: "🏭", color: "bg-emerald-500" },
  { value: "operator", label: "기사", icon: "👷", color: "bg-amber-500" },
  { value: "callcenter", label: "콜센터", icon: "📞", color: "bg-purple-500" },
  { value: "salesperson", label: "영업사원", icon: "💼", color: "bg-pink-500" },
  { value: "admin", label: "관리자", icon: "🔧", color: "bg-red-500" },
];

export default function DemoRoleSwitcher() {
  const { currentRole, setRole } = useDemoContext();
  const [isOpen, setIsOpen] = useState(false);

  const current = ROLES.find((r) => r.value === currentRole)!;

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-full shadow-2xl hover:bg-gray-800 transition-all"
      >
        <span className="text-lg">{current.icon}</span>
        <span className="font-semibold text-sm">{current.label}</span>
        <span className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full text-xs">
          {isOpen ? "×" : "↑"}
        </span>
      </button>

      {/* 데모 배너 */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-1.5 text-xs font-semibold tracking-wide">
        🎮 데모 시뮬레이터 — 실제 데이터가 아닌 시연용 화면입니다
      </div>

      {/* 역할 선택 패널 */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-20 right-6 z-[100] bg-white rounded-2xl shadow-2xl border border-border p-4 w-72">
            <h3 className="font-bold text-base mb-1">역할 전환</h3>
            <p className="text-xs text-text-muted mb-3">클릭하면 해당 역할의 화면으로 전환됩니다</p>
            <div className="space-y-1.5">
              {ROLES.map((role) => (
                <button
                  key={role.value}
                  onClick={() => {
                    setRole(role.value);
                    setIsOpen(false);
                    // 역할에 맞는 첫 페이지로 이동
                    window.location.href = `/demo/${role.value}`;
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${
                    currentRole === role.value
                      ? "bg-primary text-white"
                      : "hover:bg-gray-50 text-text"
                  }`}
                >
                  <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-lg ${
                    currentRole === role.value ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    {role.icon}
                  </span>
                  <div>
                    <span className="font-semibold text-sm">{role.label}</span>
                  </div>
                  {currentRole === role.value && (
                    <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">현재</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
