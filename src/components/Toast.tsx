"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";

/**
 * 토스트 — 라이트 서피스 + 상태 컬러 칩.
 * 원색 블록 대신 백서 위 도장(印) 구도: 흰 카드, 좌측 상태 아이콘 칩,
 * 네이비 섀도. 모바일은 하단 탭 위, 데스크톱은 우상단.
 */

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  show: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType>({ show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const ICON: Record<Toast["type"], string> = {
  success: "check_circle",
  error: "error",
  info: "info",
};

const CHIP: Record<Toast["type"], string> = {
  success: "bg-cy-success/12 text-cy-success-deep",
  error: "bg-cy-danger/10 text-cy-danger-deep",
  info: "bg-cy-navy/8 text-cy-navy",
};

const RULE: Record<Toast["type"], string> = {
  success: "bg-cy-success",
  error: "bg-cy-danger",
  info: "bg-cy-navy",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const show = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = ++nextId.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed z-[200] left-4 right-4 bottom-24 md:left-auto md:right-4 md:bottom-auto md:top-4 md:w-[360px] space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className="relative overflow-hidden flex items-center gap-3 pl-3 pr-4 py-3 bg-white border border-cy-line rounded-xl shadow-[0_10px_30px_rgba(0,44,95,0.16),0_2px_8px_rgba(0,44,95,0.08)] animate-[toastIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
          >
            <span aria-hidden className={`absolute left-0 top-0 bottom-0 w-[3px] ${RULE[toast.type]}`} />
            <span className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg ${CHIP[toast.type]}`}>
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                {ICON[toast.type]}
              </span>
            </span>
            <p className="text-sm font-semibold text-cy-ink leading-snug">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
