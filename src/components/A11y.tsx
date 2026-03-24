"use client";

/**
 * 접근성(A11y) 유틸리티 컴포넌트
 */

/** 스크린리더 전용 텍스트 (시각적으로 숨김) */
export function SrOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0" style={{ clip: "rect(0,0,0,0)" }}>
      {children}
    </span>
  );
}

/** 상태 변경 알림 (스크린리더가 읽어줌) */
export function LiveRegion({ message }: { message: string }) {
  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0" style={{ clip: "rect(0,0,0,0)" }}>
      {message}
    </div>
  );
}

/** 키보드 네비게이션 스킵 링크 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-[#0059b9] focus:text-white focus:rounded-lg focus:font-bold focus:text-sm"
    >
      본문으로 건너뛰기
    </a>
  );
}
