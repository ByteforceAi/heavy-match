/**
 * HEAVY MATCH — Design Token System
 *
 * 중장비 배차 B2B 플랫폼의 시각 언어를 정의하는 핵심 토큰.
 * 산업/중장비의 무게감 + 디지털 플랫폼의 세련됨.
 *
 * 모든 컴포넌트는 이 토큰만 참조해야 함 — 하드코딩 색상 금지.
 */

// ═══════════════════════════════════════
// COLOR TOKENS
// ═══════════════════════════════════════

export const colors = {
  // ── Foundation ──
  black: "#0A0A0B",        // Pure black 금지 — 이 값만 사용
  white: "#FAFAFA",        // Pure white 대신 약간의 따뜻함

  // ── Surface Layers (3단계 깊이) ──
  surface: {
    base: "#121216",       // 가장 깊은 배경
    raised: "#1A1A20",     // 카드, 패널
    elevated: "#242428",   // 호버, 활성 상태
    overlay: "#2E2E34",    // 모달 배경
  },

  // ── Signature Colors ──
  orange: {
    DEFAULT: "#FF6B1A",    // Safety Orange — 브랜드 핵심
    muted: "#E55D15",      // 버튼 active
    light: "#FF8A4C",      // 호버
    subtle: "#FF6B1A1A",   // 10% opacity 배경
    glow: "#FF6B1A33",     // 20% 글로우 효과
  },
  amber: {
    DEFAULT: "#FFA523",    // 하이라이트, 배지
    light: "#FFB84D",
    subtle: "#FFA52315",
  },

  // ── Neutral / Steel ──
  steel: {
    900: "#1A1A20",
    800: "#2E2E34",
    700: "#3A3D45",
    600: "#4B4F58",
    500: "#6B7280",        // 본문 텍스트
    400: "#9CA3AF",        // 보조 텍스트
    300: "#D1D5DB",        // 구분선
    200: "#E5E7EB",
    100: "#F3F4F6",
    50: "#F9FAFB",
  },

  // ── Semantic ──
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",

  // ── Status Colors (배차 상태) ──
  status: {
    exclusiveCall: "#FF6B1A",   // 전용콜 — 브랜드 오렌지
    callcenterCall: "#FFA523",  // 콜센터 전달 — 앰버
    sharedCall: "#3B82F6",      // 공유콜 — 블루
    matched: "#10B981",         // 매칭 완료 — 그린
    inProgress: "#8B5CF6",      // 작업중 — 퍼플
    completed: "#059669",       // 완료 — 딥 그린
    cancelled: "#EF4444",       // 취소 — 레드
  },
} as const;

// ═══════════════════════════════════════
// TYPOGRAPHY TOKENS
// ═══════════════════════════════════════

export const typography = {
  // ── Font Families ──
  family: {
    display: "'Pretendard', 'Inter Tight', -apple-system, sans-serif",
    body: "'Pretendard', 'Inter', -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  // ── Perfect Fourth Scale (1.333 ratio) ──
  // 12 → 16 → 21 → 28 → 37 → 49 → 65 → 87
  size: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.3125rem",  // 21px
    xl: "1.75rem",    // 28px
    "2xl": "2.3125rem", // 37px
    "3xl": "3.0625rem", // 49px
    "4xl": "4.0625rem", // 65px
    "5xl": "5.4375rem", // 87px
    hero: "clamp(3rem, 8vw, 7.5rem)", // 반응형 Hero
  },

  // ── Weights ──
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // ── Letter Spacing ──
  tracking: {
    display: "-0.03em",   // 조밀한 무게감
    heading: "-0.02em",
    body: "-0.01em",
    wide: "0.05em",       // 라벨, 뱃지
  },

  // ── Line Height ──
  leading: {
    none: 1,
    tight: 1.15,         // Display
    snug: 1.3,           // Heading
    normal: 1.6,         // Body
    relaxed: 1.8,        // Long-form
  },
} as const;

// ═══════════════════════════════════════
// SPACING / LAYOUT TOKENS
// ═══════════════════════════════════════

export const spacing = {
  // ── 8pt Grid ──
  px: "1px",
  0: "0",
  1: "0.25rem",   // 4px
  2: "0.5rem",    // 8px
  3: "0.75rem",   // 12px
  4: "1rem",      // 16px
  5: "1.25rem",   // 20px
  6: "1.5rem",    // 24px
  8: "2rem",      // 32px
  10: "2.5rem",   // 40px
  12: "3rem",     // 48px
  16: "4rem",     // 64px
  20: "5rem",     // 80px
  24: "6rem",     // 96px
  32: "8rem",     // 128px

  // ── Section Padding ──
  section: {
    desktop: "7.5rem",   // 120px
    tablet: "5rem",      // 80px
    mobile: "3rem",      // 48px
  },
} as const;

export const layout = {
  maxWidth: "1440px",
  contentWidth: "1280px",
  narrowWidth: "960px",

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  borderRadius: {
    sm: "0.375rem",   // 6px
    md: "0.5rem",     // 8px
    lg: "0.75rem",    // 12px
    xl: "1rem",       // 16px
    "2xl": "1.25rem", // 20px
    "3xl": "1.5rem",  // 24px
    full: "9999px",
  },
} as const;

// ═══════════════════════════════════════
// SHADOW TOKENS
// ═══════════════════════════════════════

export const shadows = {
  sm: "0 1px 2px rgba(10, 10, 11, 0.3)",
  md: "0 4px 12px rgba(10, 10, 11, 0.25)",
  lg: "0 12px 32px rgba(10, 10, 11, 0.3)",
  xl: "0 24px 48px rgba(10, 10, 11, 0.35)",
  glow: {
    orange: "0 0 30px rgba(255, 107, 26, 0.3)",
    amber: "0 0 20px rgba(255, 165, 35, 0.2)",
    success: "0 0 20px rgba(16, 185, 129, 0.2)",
  },
  // 카드 호버 시 상승 효과
  card: {
    rest: "0 2px 8px rgba(10, 10, 11, 0.2)",
    hover: "0 8px 24px rgba(10, 10, 11, 0.3), 0 0 0 1px rgba(255, 107, 26, 0.1)",
    active: "0 4px 12px rgba(10, 10, 11, 0.25)",
  },
} as const;

// ═══════════════════════════════════════
// ANIMATION TOKENS (Legacy — motion으로 마이그레이션)
// ═══════════════════════════════════════

export const animation = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    splash: "3000ms",
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    heavy: "cubic-bezier(0.7, 0, 0.3, 1)",  // 중장비 무게감
  },
  stagger: {
    fast: "0.05s",
    normal: "0.08s",
    slow: "0.12s",
  },
} as const;

// ═══════════════════════════════════════
// MOTION TOKENS (Native-Feel Physics)
// Framer Motion variants에서 직접 참조
// ═══════════════════════════════════════

export const motion = {
  // ── 물리 기반 Spring (네이티브 필수) ──
  spring: {
    /** 버튼 press, 탭 피드백 — 빠르고 단단한 스냅 */
    snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
    /** 카드 호버, 일반 전환 — 자연스러운 중간값 */
    smooth: { type: "spring" as const, stiffness: 200, damping: 25 },
    /** 페이지 전환, 큰 UI 이동 — 부드럽고 여유로운 */
    gentle: { type: "spring" as const, stiffness: 120, damping: 20 },
    /** 모달 등장, 알림 팝업 — 살짝 튀는 느낌 */
    bouncy: { type: "spring" as const, stiffness: 300, damping: 15 },
  },

  // ── Apple HIG 기반 Duration (ms) ──
  duration: {
    instant: 100,     // 버튼 press feedback — 즉각 반응 인지 임계값
    fast: 200,        // hover, small transitions
    normal: 300,      // 기본 transition
    slow: 500,        // 큰 UI 변화 (패널 열기 등)
    deliberate: 800,  // 의도적 attention grabbing
    splash: 3000,     // 부팅 스플래시
  },

  // ── 이징 함수 (iOS Material 기본값) ──
  easing: {
    /** 기본 — 등가감속 */
    standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    /** 등장 — 빠르게 나타나서 천천히 안착 */
    decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)",
    /** 퇴장 — 천천히 시작해서 빠르게 사라짐 */
    accelerate: "cubic-bezier(0.4, 0.0, 1, 1)",
    /** 임시 상태 — 날카롭고 의도적인 전환 */
    sharp: "cubic-bezier(0.4, 0.0, 0.6, 1)",
    /** 중장비 무게감 — 무거운 가감속 (커스텀) */
    heavy: "cubic-bezier(0.7, 0, 0.3, 1)",
  },

  // ── 시각적 햅틱 (네이티브 느낌의 핵심) ──
  haptic: {
    /** 버튼 눌림 — 3% 축소 (0.95는 과도, 0.99는 인지 불가) */
    press: { scale: 0.97, duration: 100 },
    /** 카드/요소 호버 리프트 — 2% 확대 */
    lift: { scale: 1.02, duration: 200 },
    /** 주의 환기 — 펄스 (알림 배지 등) */
    attention: { scale: [1, 1.05, 1] as readonly number[], duration: 400 },
  },

  // ── Stagger 값 ──
  stagger: {
    fast: 0.05,    // 빠른 리스트 순차 등장
    normal: 0.08,  // 기본 stagger 간격
    slow: 0.12,    // 느긋한 등장 (Hero 텍스트)
  },
} as const;

// ═══════════════════════════════════════
// BLUR TOKENS (Industrial Glass)
// Apple Liquid Glass와 차별화 —
// "frosted metal" = blur + 불투명 어두운 배경 + subtle border
// ═══════════════════════════════════════

export const blur = {
  // ── Blur 강도 단계 ──
  subtle: {
    backdropFilter: "blur(12px) saturate(150%)",
    background: "rgba(18, 18, 22, 0.75)",
    border: "1px solid rgba(58, 61, 69, 0.3)",
  },
  medium: {
    backdropFilter: "blur(20px) saturate(180%)",
    background: "rgba(18, 18, 22, 0.82)",
    border: "1px solid rgba(58, 61, 69, 0.25)",
  },
  strong: {
    backdropFilter: "blur(40px) saturate(200%)",
    background: "rgba(18, 18, 22, 0.9)",
    border: "1px solid rgba(58, 61, 69, 0.15)",
  },

  // ── 용도 매핑 ──
  usage: {
    header: "subtle" as const,    // 상단 고정 네비게이션
    modal: "medium" as const,     // 다이얼로그 백드롭
    overlay: "strong" as const,   // 풀스크린 오버레이 (스플래시 등)
    sidebar: "subtle" as const,   // 사이드바 (모바일 드로어)
  },
} as const;

// ═══════════════════════════════════════
// CSS CUSTOM PROPERTIES EXPORT
// ═══════════════════════════════════════

/** Tailwind @theme inline에 주입할 CSS 변수 문자열 생성 */
export function generateCSSVars(): string {
  return `
    --hm-black: ${colors.black};
    --hm-white: ${colors.white};
    --hm-surface-base: ${colors.surface.base};
    --hm-surface-raised: ${colors.surface.raised};
    --hm-surface-elevated: ${colors.surface.elevated};
    --hm-orange: ${colors.orange.DEFAULT};
    --hm-orange-muted: ${colors.orange.muted};
    --hm-orange-light: ${colors.orange.light};
    --hm-amber: ${colors.amber.DEFAULT};
    --hm-steel-500: ${colors.steel[500]};
    --hm-steel-400: ${colors.steel[400]};
    --hm-steel-300: ${colors.steel[300]};
    --hm-success: ${colors.success};
    --hm-danger: ${colors.danger};
  `;
}
