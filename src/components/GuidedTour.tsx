"use client";

import { useState, useEffect } from "react";

interface TourStep {
  title: string;
  description: string;
  icon: string;
}

const TOUR_STEPS: Record<string, TourStep[]> = {
  owner: [
    { title: "전용콜 수신", description: "장비요청자가 사장을 지정하면 여기에 전용콜이 표시된다. 60초 안에 수락 또는 거절.", icon: "call" },
    { title: "수락 · 거절", description: "수락 시 매칭 완료. 거절 시 콜센터로 자동 전달된다.", icon: "check_circle" },
    { title: "공유콜 (선착순)", description: "전용콜이 만료되면 같은 지역 사장 전체에게 공유된다. 먼저 수락한 사장이 매칭된다.", icon: "campaign" },
    { title: "기사 배정", description: "매칭 완료 후 소속 기사를 선택하여 배정합니다.", icon: "person_add" },
  ],
  requester: [
    { title: "장비 요청", description: "필요한 장비를 선택하고, 규격/시간/현장정보를 입력하면 즉시 배차가 시작됩니다.", icon: "edit_note" },
    { title: "진행 현황", description: "요청한 배차의 실시간 상태를 확인할 수 있습니다.", icon: "pending" },
    { title: "빠른 재주문", description: "이전에 요청한 건을 한 번에 재주문할 수 있습니다.", icon: "bolt" },
  ],
  operator: [
    { title: "배차 확인", description: "사장님이 배정한 작업 정보를 확인합니다.", icon: "local_shipping" },
    { title: "작업 시작 → 완료", description: "현장 도착 후 '작업 시작', 완료 후 '전자서명'으로 마무리합니다.", icon: "task_alt" },
  ],
  admin: [
    { title: "통합 대시보드", description: "전체 배차 현황, 매출, 사용자 수를 한눈에 파악합니다.", icon: "dashboard" },
    { title: "차트 분석", description: "주간 배차 트렌드와 상태별 분포를 시각적으로 확인합니다.", icon: "bar_chart" },
  ],
  callcenter: [
    { title: "전달된 콜", description: "사장님이 미수락한 콜이 자동으로 전달됩니다. 직접 처리하거나 다른 사장에게 배정할 수 있습니다.", icon: "swap_horiz" },
  ],
  salesperson: [
    { title: "수수료 현황", description: "소속 콜센터를 통해 발생한 수수료를 실시간으로 확인합니다.", icon: "savings" },
  ],
};

export default function GuidedTour({ role }: { role: string }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const storageKey = `tour-done-${role}`;

  useEffect(() => {
    const done = localStorage.getItem(storageKey);
    if (!done) {
      setTimeout(() => setVisible(true), 800);
    }
  }, [storageKey]);

  const steps = TOUR_STEPS[role] || [];
  if (!visible || steps.length === 0) return null;

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const finish = () => {
    setVisible(false);
    localStorage.setItem(storageKey, "1");
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={finish} />

      {/* Tour Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-[90%] mx-4 animate-fade-in">
        {/* Progress */}
        <div className="flex gap-1 mb-4">
          {steps.map((_, i) => (
            <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= step ? "bg-[#0059b9]" : "bg-[#d8e3f5]"}`} />
          ))}
        </div>

        {/* Icon */}
        <div className="w-14 h-14 bg-[#e5eeff] rounded-2xl flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-[#0059b9]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {current.icon}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-[800] text-[#111c29] mb-2">{current.title}</h3>
        <p className="text-sm text-[#414754] leading-relaxed mb-6">{current.description}</p>

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={finish} className="flex-1 py-3 text-[#727785] font-semibold rounded-xl text-sm">
            건너뛰기
          </button>
          <button
            onClick={() => { if (isLast) finish(); else setStep(step + 1); }}
            className="flex-1 py-3 bg-[#0059b9] text-white font-bold rounded-xl text-sm active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            {isLast ? "시작하기" : "다음"}
            <span className="material-symbols-outlined text-base">{isLast ? "check" : "arrow_forward"}</span>
          </button>
        </div>

        {/* Step counter */}
        <p className="text-center text-xs text-[#727785] mt-3">{step + 1} / {steps.length}</p>
      </div>
    </div>
  );
}

/** 투어 다시 보기 버튼 (헤더에 배치) */
export function TourResetButton({ role }: { role: string }) {
  return (
    <button
      onClick={() => { localStorage.removeItem(`tour-done-${role}`); location.reload(); }}
      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#eef4ff] transition"
      title="가이드 다시 보기"
    >
      <span className="material-symbols-outlined text-lg text-[#727785]">help</span>
    </button>
  );
}
