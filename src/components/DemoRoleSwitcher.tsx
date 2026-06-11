"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoContext } from "./DemoProvider";
import type { UserRole } from "@/types/database";

/**
 * 데모 역할 전환기 — 이모지 레인보우 → 네이비 단일 언어로 재설계.
 * 상단 고정 배너는 제거 (DemoDashboardLayout의 인플로우 배너가 단일 소스).
 */

const ROLES: { value: UserRole; label: string; icon: string; desc: string }[] = [
  { value: "requester", label: "장비요청자", icon: "apartment", desc: "건설사 · 현장소장" },
  { value: "owner", label: "중장비사장", icon: "front_loader", desc: "장비 보유 사업자" },
  { value: "operator", label: "기사", icon: "engineering", desc: "현장 운전 기사" },
  { value: "callcenter", label: "콜센터", icon: "support_agent", desc: "배차 중개 지점" },
  { value: "salesperson", label: "영업사원", icon: "trending_up", desc: "지역 분양 영업" },
  { value: "admin", label: "관리자", icon: "admin_panel_settings", desc: "플랫폼 운영" },
];

export default function DemoRoleSwitcher() {
  const { currentRole, setRole } = useDemoContext();
  const [isOpen, setIsOpen] = useState(false);

  const current = ROLES.find((r) => r.value === currentRole)!;

  return (
    <>
      {/* 플로팅 전환 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="데모 역할 전환"
        className="press fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[100] flex items-center gap-2 pl-3 pr-3.5 py-2.5 bg-cy-navy text-white rounded-full shadow-[0_8px_24px_rgba(0,44,95,0.35),0_2px_6px_rgba(0,44,95,0.2)] hover:bg-cy-navy-mid"
      >
        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
          {current.icon}
        </span>
        <span className="font-bold text-sm">{current.label}</span>
        <span
          className={`material-symbols-outlined text-base text-white/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          expand_less
        </span>
      </button>

      {/* 역할 선택 패널 */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[90] bg-cy-ink/35 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed bottom-[152px] right-4 md:bottom-20 md:right-6 z-[100] origin-bottom-right bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,44,95,0.2)] border border-cy-line w-[300px] overflow-hidden"
            >
              <div className="px-4 pt-4 pb-3 border-b border-cy-line-soft">
                <p className="mono-label text-cy-ink-4 mb-0.5">DEMO · ROLE SWITCH</p>
                <h3 className="font-extrabold text-base text-cy-ink tracking-[-0.01em]">역할 전환</h3>
              </div>
              <div className="p-2">
                {ROLES.map((role) => {
                  const active = currentRole === role.value;
                  return (
                    <button
                      key={role.value}
                      onClick={() => {
                        setRole(role.value);
                        setIsOpen(false);
                        window.location.href = `/demo/${role.value}`;
                      }}
                      className={`press w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left ${
                        active ? "bg-cy-navy text-white" : "hover:bg-cy-bg text-cy-ink"
                      }`}
                    >
                      <span
                        className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-lg ${
                          active ? "bg-white/15 text-white" : "bg-cy-navy-pale text-cy-navy"
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {role.icon}
                        </span>
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-bold text-sm leading-tight">{role.label}</span>
                        <span className={`block text-xs mt-0.5 ${active ? "text-white/65" : "text-cy-ink-3"}`}>
                          {role.desc}
                        </span>
                      </span>
                      {active && (
                        <span className="material-symbols-outlined text-lg text-white/80" aria-label="현재 역할">
                          check_circle
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
