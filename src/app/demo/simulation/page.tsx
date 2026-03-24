"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const STEPS = [
  { id: 0, label: "장비 요청", role: "장비요청자", icon: "edit_note", roleColor: "bg-[#d7e2ff] text-[#004491]", desc: "건설사 김건설이 크레인 50T / 오전(4h)을 요청합니다", detail: "현장: 서울시 강남구 삼성동 코엑스 신축현장" },
  { id: 1, label: "전용콜 발송", role: "시스템", icon: "send", roleColor: "bg-[#e5eeff] text-[#0059b9]", desc: "지정 사장 박중장비에게 SMS 발송", detail: "[Heavy Match] 크레인 50T 요청 / 코엑스 신축현장 / 1,200,000원", timer: 60 },
  { id: 2, label: "사장 수락", role: "중장비사장", icon: "check_circle", roleColor: "bg-[#dde3ef] text-[#595f69]", desc: "박중장비 사장이 전용콜을 수락합니다", detail: "수수료 180,000원 자동 계산 (15%)" },
  { id: 3, label: "기사 배정", role: "중장비사장", icon: "person_add", roleColor: "bg-[#dde3ef] text-[#595f69]", desc: "소속 기사 이기사를 배정합니다", detail: "기사에게 배차 안내 SMS 발송" },
  { id: 4, label: "작업 진행", role: "기사", icon: "rocket_launch", roleColor: "bg-[#d5e4f8] text-[#4f5d6e]", desc: "이기사가 현장에 도착하여 작업을 시작합니다", detail: "현장담당자: 홍현장 010-9876-5432" },
  { id: 5, label: "작업 완료", role: "기사", icon: "task_alt", roleColor: "bg-emerald-100 text-emerald-700", desc: "이기사가 전자서명으로 작업을 완료합니다", detail: "작업확인서 자동 생성, 수수료 정산 완료" },
];

export default function SimulationPage() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!running || currentStep >= STEPS.length - 1) return;

    const step = STEPS[currentStep + 1];
    const delay = step?.timer ? 3000 : 2000;

    const timeout = setTimeout(() => {
      setCurrentStep(c => c + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [running, currentStep]);

  useEffect(() => {
    if (currentStep === 1 && STEPS[1].timer) {
      setTimer(5); // 시뮬레이션에서는 5초로 축약
      const iv = setInterval(() => setTimer(t => { if (t <= 1) { clearInterval(iv); return 0; } return t - 1; }), 1000);
      return () => clearInterval(iv);
    }
  }, [currentStep]);

  const start = () => { setCurrentStep(0); setRunning(true); };
  const reset = () => { setCurrentStep(-1); setRunning(false); setTimer(0); };
  const stepForward = () => { if (currentStep < STEPS.length - 1) setCurrentStep(c => c + 1); };

  const isComplete = currentStep >= STEPS.length - 1;

  return (
    <main className="min-h-screen bg-[#f8f9ff]" style={{ fontFamily: "'Inter','Pretendard',sans-serif", letterSpacing: "-0.02em" }}>
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center max-w-4xl mx-auto px-6 h-14">
          <Link href="/demo" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0059b9]" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="font-black tracking-tight">Heavy Match</span>
          </Link>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">E2E 시뮬레이션</span>
        </div>
      </nav>

      <div className="pt-20 pb-10 px-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-[800] text-[#111c29] mb-2">배차 플로우 시뮬레이션</h1>
          <p className="text-[#414754]">장비 요청부터 작업 완료까지 전체 과정을 체험합니다</p>

          {/* 시나리오 카드 */}
          <div className="mt-6 bg-white rounded-2xl p-5 border border-[#c1c6d6]/30 shadow-sm text-left">
            <h3 className="text-sm font-bold text-[#727785] mb-2">시나리오</h3>
            <p className="font-[800] text-lg text-[#111c29]">🏗️ 크레인 50T · 오전(4h)</p>
            <p className="text-sm text-[#414754]">서울시 강남구 삼성동 코엑스 신축현장</p>
            <p className="text-xl font-black tabular-nums text-[#0059b9] mt-1">{formatPrice(1200000)}원</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-3 relative mb-8">
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[#d8e3f5]" />

          {STEPS.map((step, i) => {
            const isDone = i <= currentStep;
            const isCurrent = i === currentStep;

            return (
              <div key={step.id} className={`relative flex items-start pl-12 transition-all duration-500 ${isDone ? "opacity-100" : "opacity-30"}`}>
                <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ring-4 ring-[#f8f9ff] transition-all duration-500 ${
                  isDone ? (isCurrent ? "bg-[#0059b9] scale-110 shadow-lg" : "bg-emerald-500") : "bg-[#d8e3f5]"
                }`}>
                  <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: isDone ? "'FILL' 1" : "" }}>
                    {isDone && !isCurrent ? "check" : step.icon}
                  </span>
                </div>

                <div className={`bg-white rounded-2xl p-4 w-full border transition-all duration-500 ${
                  isCurrent ? "border-[#0059b9]/30 shadow-lg ring-2 ring-[#0059b9]/10" : "border-[#c1c6d6]/20 shadow-sm"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-base text-[#111c29]">{step.label}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${step.roleColor}`}>{step.role}</span>
                    {isCurrent && step.timer && timer > 0 && (
                      <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] rounded-full text-[10px] font-bold animate-pulse">⏱ {timer}초</span>
                    )}
                  </div>
                  <p className="text-sm text-[#414754]">{step.desc}</p>
                  {isDone && <p className="text-xs text-[#727785] mt-1 bg-[#eef4ff] rounded-lg px-2 py-1">{step.detail}</p>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex gap-3 max-w-sm mx-auto">
          {currentStep === -1 ? (
            <button onClick={start}
              className="flex-1 py-4 bg-gradient-to-br from-[#0059b9] to-[#1071e5] text-white font-bold text-lg rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">play_arrow</span>시뮬레이션 시작
            </button>
          ) : isComplete ? (
            <>
              <button onClick={reset} className="flex-1 py-4 bg-[#dae0ec] text-[#595f69] font-bold rounded-xl active:scale-95">다시 하기</button>
              <Link href="/demo" className="flex-1 py-4 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 text-center flex items-center justify-center gap-1">
                역할별 체험 <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </>
          ) : (
            <>
              <button onClick={() => setRunning(!running)} className="flex-1 py-3 bg-[#dae0ec] text-[#595f69] font-bold rounded-xl active:scale-95">
                {running ? "일시정지" : "자동 진행"}
              </button>
              <button onClick={stepForward} className="flex-1 py-3 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 flex items-center justify-center gap-1">
                다음 <span className="material-symbols-outlined text-lg">skip_next</span>
              </button>
            </>
          )}
        </div>

        {/* 완료 메시지 */}
        {isComplete && (
          <div className="mt-8 bg-emerald-50 rounded-2xl p-6 text-center animate-fade-in">
            <span className="material-symbols-outlined text-5xl text-emerald-500 block mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
            <h3 className="text-xl font-[800] text-[#111c29]">배차 완료!</h3>
            <p className="text-sm text-[#414754] mt-1">전체 플로우가 성공적으로 시뮬레이션되었습니다</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white rounded-xl p-3"><p className="text-lg font-black text-[#0059b9] tabular-nums">{formatPrice(1200000)}원</p><p className="text-[10px] text-[#727785]">임대비</p></div>
              <div className="bg-white rounded-xl p-3"><p className="text-lg font-black text-emerald-600 tabular-nums">{formatPrice(180000)}원</p><p className="text-[10px] text-[#727785]">수수료</p></div>
              <div className="bg-white rounded-xl p-3"><p className="text-lg font-black text-amber-600 tabular-nums">{formatPrice(60000)}원</p><p className="text-[10px] text-[#727785]">적립금</p></div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
