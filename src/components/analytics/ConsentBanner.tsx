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
      className="fixed z-[60] left-3 right-3 bottom-3 md:left-auto md:right-6 md:bottom-6 md:max-w-[360px] animate-[toastIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
    >
      <div className="bg-cy-navy text-white rounded-2xl border border-white/10 p-4 md:p-5 shadow-[0_20px_48px_rgba(0,44,95,0.28)]">
        <p className="mono-label text-white/45 mb-1.5">PRIVACY</p>
        <h2 className="text-sm font-bold tracking-[-0.01em] mb-1.5">쿠키 및 분석 도구 안내</h2>
        <p className="text-xs text-white/75 leading-[1.65] mb-3">
          사이트 개선과 통계 측정을 위해 쿠키와 분석 도구를 사용한다. 거절 시 익명 통계만
          수집되며, 자세한 사항은{" "}
          <Link href="/privacy" className="underline underline-offset-2 text-white/95 hover:text-white">
            개인정보처리방침
          </Link>
          에 기재되어 있다.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={accept}
            className="press flex-1 min-h-11 text-[13px] font-bold rounded-lg bg-white text-cy-navy hover:bg-white/95"
          >
            동의
          </button>
          <button
            type="button"
            onClick={decline}
            className="press flex-1 min-h-11 text-[13px] font-semibold rounded-lg bg-transparent text-white border border-white/30 hover:bg-white/10"
          >
            거절
          </button>
        </div>
      </div>
    </div>
  );
}
