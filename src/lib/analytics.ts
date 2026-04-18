/**
 * 철연 CHEOLYEON — Analytics Event Helpers
 *
 * 3중 스택 (GA4 · Naver Analytics · PostHog) 공통 이벤트 래퍼.
 *
 * 정책:
 *   - 각 플랫폼이 로드되지 않았으면 조용히 무시한다 (window 가드).
 *   - Naver 기본 wcslog.js는 custom event API를 제공하지 않아 pageview만 중계한다.
 *   - 서버 컴포넌트에서 호출되어도 에러가 나지 않도록 typeof window 체크를 유지한다.
 *   - 개인 식별 정보(PII)는 props에 포함하지 않는다. 역할·제품·화면 이름만 허용.
 */

// ═══════════════════════════════════════
// Core trackers
// ═══════════════════════════════════════

/**
 * 커스텀 이벤트 — GA4 + PostHog 동시 기록.
 * Naver wcslog.js는 커스텀 이벤트를 지원하지 않아 생략한다.
 */
export function trackEvent(name: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  // GA4
  try {
    if (window.gtag) {
      window.gtag("event", name, props ?? {});
    }
  } catch {
    // 광고 차단기·네트워크 오류로 gtag 호출 실패 — 조용히 무시.
  }

  // PostHog
  try {
    if (window.posthog?.capture) {
      window.posthog.capture(name, props ?? {});
    }
  } catch {
    // PostHog 미로드 — 무시.
  }
}

/**
 * 페이지뷰 — 3중 스택에 공통 전송.
 * - GA4: gtag config with page_path.
 * - PostHog: $pageview 이벤트.
 * - Naver: wcs_do()를 재호출하여 수동 페이지뷰 트리거.
 */
export function trackPageview(url: string): void {
  if (typeof window === "undefined") return;

  // GA4 — page_path 갱신
  try {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (window.gtag && gaId) {
      window.gtag("config", gaId, { page_path: url });
    }
  } catch {
    // 무시
  }

  // PostHog
  try {
    if (window.posthog?.capture) {
      window.posthog.capture("$pageview", { $current_url: url });
    }
  } catch {
    // 무시
  }

  // Naver wcslog — 수동 재수집
  try {
    if (typeof window.wcs_do === "function") {
      window.wcs_do();
    }
  } catch {
    // 무시
  }
}

// ═══════════════════════════════════════
// Predefined Events — 랜딩·데모·결제 여정 표준화
// ═══════════════════════════════════════

export const Events = {
  /** 히어로 CTA 클릭 — target에 destination(예: "demo", "contact", "pricing")을 기입한다. */
  heroCtaClicked: (target: string) => trackEvent("hero_cta_clicked", { target }),

  /** 상담 폼 제출 완료 — role은 사용자가 선택한 역할 카테고리 값이다. */
  contactFormSubmitted: (role: string) =>
    trackEvent("contact_form_submitted", { role }),

  /** E2E 데모 재생 시작 — scenario는 "happy" · "escalation" · "cancel" 등. */
  demoPlayStarted: (scenario: string) =>
    trackEvent("demo_play_started", { scenario }),

  /** 가격 플랜 선택 — plan 이름과 통화 단위를 기록한다. */
  pricingPlanSelected: (plan: string, currency: string) =>
    trackEvent("pricing_plan_selected", { plan, currency }),

  /** 온보딩 단계 완료 — step 인덱스와 스텝명을 기록한다. */
  onboardingStepCompleted: (step: number, name: string) =>
    trackEvent("onboarding_step_completed", { step, name }),

  /** 블로그 글 완독 — slug로 글을 식별한다. */
  blogPostRead: (slug: string) => trackEvent("blog_post_read", { slug }),
};

// ═══════════════════════════════════════
// Consent helpers
// ═══════════════════════════════════════

export type ConsentState = "accepted" | "declined" | "pending";

export const CONSENT_STORAGE_KEY = "cy-consent";

/**
 * 현재 동의 상태를 읽는다. 클라이언트가 아닌 환경에서는 "pending"을 반환한다.
 * 기본값은 "pending"이며, 명시적 거절 전까지는 스크립트 로드를 허용한다.
 */
export function getConsent(): ConsentState {
  if (typeof window === "undefined") return "pending";
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "accepted" || value === "declined") return value;
    return "pending";
  } catch {
    return "pending";
  }
}

/** 동의 상태를 기록한다. */
export function setConsent(state: Exclude<ConsentState, "pending">): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
    window.dispatchEvent(new CustomEvent("cy-consent-change", { detail: state }));
  } catch {
    // 무시
  }
}
