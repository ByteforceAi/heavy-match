/**
 * Global typings for the analytics stack — GA4, PostHog, Naver wcslog.
 *
 * 각 스크립트는 NEXT_PUBLIC_*_ID 환경 변수가 설정된 경우에만 로드된다.
 * 본 파일은 window 전역에 주입되는 객체를 TypeScript가 인식하도록 한다.
 */

export {};

type GtagCommand = "config" | "event" | "set" | "consent" | "js" | "get";

interface GtagFn {
  (command: "js", date: Date): void;
  (command: "config", targetId: string, config?: Record<string, unknown>): void;
  (command: "event", eventName: string, params?: Record<string, unknown>): void;
  (command: "set", params: Record<string, unknown>): void;
  (command: "consent", action: "default" | "update", params: Record<string, unknown>): void;
  (command: GtagCommand, ...args: unknown[]): void;
}

interface PostHogLib {
  capture: (eventName: string, props?: Record<string, unknown>) => void;
  identify: (id: string, props?: Record<string, unknown>) => void;
  reset: () => void;
  init: (apiKey: string, config?: Record<string, unknown>) => void;
  opt_in_capturing: () => void;
  opt_out_capturing: () => void;
  has_opted_out_capturing: () => boolean;
  register: (props: Record<string, unknown>) => void;
  [key: string]: unknown;
}

// Naver wcslog — "wcs_do" 호출로 페이지뷰를 수집한다.
// wcs_add에는 wa 계정(ID)을 기재한다.
interface WcsLib {
  inflow?: (host?: string) => void;
  do?: (params?: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
    posthog?: PostHogLib;
    wcs?: WcsLib;
    wcs_add?: Record<string, string>;
    wcs_do?: (params?: Record<string, unknown>) => void;
    _nasa?: Record<string, unknown>;
  }
}
