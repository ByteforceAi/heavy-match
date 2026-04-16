"use client";

import { useState, useEffect } from "react";

type HintType = "mobile-preferred" | "desktop-preferred";

interface Props {
  type: HintType;
  role: string;
}

const ROLE_LABELS: Record<string, string> = {
  requester: "장비요청자", owner: "중장비사장", operator: "기사",
  callcenter: "콜센터", salesperson: "영업사원", admin: "관리자",
};

export default function DeviceHint({ type, role }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [isMismatch, setIsMismatch] = useState(false);

  useEffect(() => {
    const storageKey = `device-hint-${role}`;
    if (sessionStorage.getItem(storageKey)) return;

    const width = window.innerWidth;
    if (type === "mobile-preferred" && width >= 1024) {
      setIsMismatch(true);
    } else if (type === "desktop-preferred" && width < 768) {
      setIsMismatch(true);
    }
  }, [type, role]);

  if (!isMismatch || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(`device-hint-${role}`, "1");
  };

  if (type === "mobile-preferred") {
    // 데스크탑에서 모바일 역할 접근
    return (
      <div className="fixed inset-0 z-[250] flex items-center justify-center bg-[#f8f9ff]/95 backdrop-blur-md animate-fade-in"
        style={{ fontFamily: "'Inter','Pretendard',sans-serif", letterSpacing: "-0.02em" }}>
        <div className="max-w-md w-full mx-4 text-center space-y-6">
          <div className="w-20 h-20 bg-[#e5eeff] rounded-3xl flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-4xl text-[#0059b9]" style={{ fontVariationSettings: "'FILL' 1" }}>smartphone</span>
          </div>
          <div>
            <h2 className="text-2xl font-[800] text-[#111c29]">{ROLE_LABELS[role]} 화면은<br />모바일에 최적화되어 있습니다</h2>
            <p className="text-[#727785] mt-2">현장에서 스마트폰으로 사용하는 화면입니다.</p>
          </div>

          {/* QR Placeholder */}
          <div className="bg-white rounded-2xl border border-[#c1c6d6]/30 p-6 inline-block shadow-lg">
            <div className="w-32 h-32 bg-[#111c29] rounded-xl flex items-center justify-center mx-auto">
              <div className="grid grid-cols-5 gap-0.5">
                {Array.from({length: 25}).map((_, i) => (
                  <div key={i} className={`w-5 h-5 rounded-sm ${[0,1,2,4,5,6,10,14,18,19,20,22,23,24].includes(i) ? "bg-white" : "bg-[#111c29]"}`} />
                ))}
              </div>
            </div>
            <p className="text-xs text-[#727785] mt-3">QR 스캔으로 모바일에서 열기</p>
          </div>

          <button onClick={dismiss}
            className="px-8 py-3 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 transition-all inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">desktop_windows</span>
            그래도 데스크탑에서 보기
          </button>
        </div>
      </div>
    );
  }

  // 모바일에서 데스크탑 역할 접근
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-[#f8f9ff]/95 backdrop-blur-md animate-fade-in p-4"
      style={{ fontFamily: "'Inter','Pretendard',sans-serif", letterSpacing: "-0.02em" }}>
      <div className="max-w-sm w-full text-center space-y-5">
        <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-3xl text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>desktop_windows</span>
        </div>
        <div>
          <h2 className="text-xl font-[800] text-[#111c29]">{ROLE_LABELS[role]} 대시보드는<br />큰 화면에서 더 잘 보입니다</h2>
          <p className="text-sm text-[#727785] mt-2">멀티컬럼 레이아웃과 차트가 포함된 화면입니다.</p>
        </div>
        <button onClick={dismiss}
          className="w-full py-3 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">check</span>
          확인했습니다, 계속 진행
        </button>
      </div>
    </div>
  );
}
