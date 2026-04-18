"use client";

/**
 * 철연 CHEOLYEON — Cookie & Analytics Consent Banner
 *
 * GDPR·PIPA 대응. 첫 방문 시 표시되고, 동의 또는 거절을 누르면 localStorage에
 * "cy-consent" 값이 저장된 후 배너가 숨겨진다. Analytics 컴포넌트는 이 값을
 * 읽어 스크립트 로드 여부를 결정한다.
 *
 * 카피 규칙 (heritage-v1.md §3):
 *   - 판결문 어미 ("~한다", "~된다")
 *   - 느낌표 금지, 의문형 훅 금지, 감정 단어 금지
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, CONSENT_STORAGE_KEY } from "@/lib/analytics";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 첫 방문 (pending)일 때만 표시한다.
    const state = getConsent();
    setVisible(state === "pending");

    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) setVisible(getConsent() === "pending");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!visible) return null;

  const accept = () => {
    setConsent("accepted");
    setVisible(false);
  };
  const decline = () => {
    setConsent("declined");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="쿠키 및 분석 도구 안내"
      className="fixed z-[60] left-0 right-0 bottom-0 md:left-auto md:right-6 md:bottom-6 md:max-w-[380px]"
    >
      <div
        className="bg-[#002C5F] text-white md:rounded-xl border-t border-white/10 md:border md:border-white/10 p-5 md:p-6"
        style={{
          boxShadow: "0 20px 48px rgba(0, 44, 95, 0.28)",
          fontFamily:
            "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        }}
      >
        <h2 className="text-[15px] font-bold tracking-[-0.01em] mb-2">
          쿠키 및 분석 도구 안내
        </h2>
        <p className="text-[13px] text-white/80 leading-[1.65] mb-4">
          사이트 개선과 통계 측정을 위해 쿠키와 분석 도구를 사용한다. 거절 시 익명 통계만
          수집된다.
        </p>
        <p className="text-[12px] text-white/60 leading-[1.6] mb-4">
          자세한 사항은{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 text-white hover:text-white"
          >
            개인정보처리방침
          </Link>
          에 기재되어 있다.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={accept}
            className="flex-1 py-2.5 text-[13px] font-bold rounded-lg bg-white text-[#002C5F] hover:bg-white/95 transition-colors"
          >
            동의
          </button>
          <button
            type="button"
            onClick={decline}
            className="flex-1 py-2.5 text-[13px] font-semibold rounded-lg bg-transparent text-white border border-white/30 hover:bg-white/10 transition-colors"
          >
            거절
          </button>
        </div>
      </div>
    </div>
  );
}
