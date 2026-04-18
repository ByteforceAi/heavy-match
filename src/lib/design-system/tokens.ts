/**
 * 철연 CHEOLYEON — Design Token System v2
 *
 * 중장비 배차·계약·정산 통합 플랫폼의 시각 언어.
 * 업계 표준 엔터프라이즈 UI (HD현대 블루) + 판결문 톤 타이포그래피.
 *
 * 모든 컴포넌트는 이 토큰만 참조해야 함 — 하드코딩 색상 금지.
 *
 * v1 Masterpiece Dark → v2 HD Navy Light 전환. 변경 이력은
 * docs/brand/PR-proposals/PR-06-rebrand-to-cheolyeon.md 참조.
 */

// ═══════════════════════════════════════
// COLOR TOKENS — HD Navy Light Palette
// ═══════════════════════════════════════

export const colors = {
  // ── Foundation ──
  ink: "#0A1628",           // 본문 최고 명도
  white: "#FFFFFF",         // 순수 화이트 (카드/컨테이너 배경)
  bg: "#F4F6FA",            // 페이지 기본 배경
  bgAlt: "#EEF1F5",         // 얕은 대체 배경 (섹션 구분)

  // ── Surface Layers (밝은 톤, 3단계 깊이) ──
  surface: {
    /** 페이지 기반 배경 */
    base: "#F4F6FA",
    /** 카드·패널 기본 */
    raised: "#FFFFFF",
    /** 호버·활성 상태 카드 (얕은 틴트) */
    elevated: "#F8FAFD",
    /** 모달·오버레이 백드롭 전용 (dark overlay) */
    overlay: "rgba(10, 22, 40, 0.6)",
  },

  // ── Signature Colors — HD Hyundai Navy ──
  /** 브랜드 핵심 네이비 계열 */
  navy: {
    DEFAULT: "#002C5F",     // HD Hyundai primary navy
    dark: "#001A3D",        // 깊이감 섀도·gradient bottom
    mid: "#0046A4",         // gradient mid / link hover
    light: "#4A90E2",       // 강조 텍스트 / 차트 보조선
    pale: "#E8F1FB",        // 틴트 배경 (ink-on-pale 카드)
    subtle: "#002C5F1A",    // 10% 투명도 — 배지 배경
    glow: "#002C5F33",      // 20% 글로우 (섀도 컬러)
  },

  /** 엑센트 시안 — "장비 파트너 계열" 포인트 */
  cyan: {
    DEFAULT: "#00AAD2",
    light: "#33BEDB",
    subtle: "#00AAD21A",
  },

  // ── Neutral / Ink Scale (라이트 테마 기준) ──
  /** 본문·보조 텍스트·보더를 위한 9단계 잉크 스케일 */
  ink9: {
    900: "#0A1628",         // 최고 명도 본문
    800: "#1F2937",         // 강조 본문
    700: "#374151",
    600: "#4B5563",
    500: "#6B7280",         // 캡션·보조
    400: "#9CA3AF",         // 비활성 / 플레이스홀더
    300: "#D1D5DB",         // 기본 보더
    200: "#E3E8EF",         // 구분선 얕음
    100: "#EDF0F5",         // 가장 얕은 보더
    50: "#F9FAFB",
  },

  /** cheolyeon_v2.html의 잉크 별칭 (빠른 교차 참조용) */
  ink1: "#0A1628",          // v2 HTML --ink
  ink2: "#3A4A5F",          // v2 HTML --ink-2 (보조 본문)
  ink3: "#6B7B8F",          // v2 HTML --ink-3 (캡션)
  ink4: "#9AA8B8",          // v2 HTML --ink-4 (비활성)

  // ── Borders ──
  line: "#E3E8EF",          // 기본 보더
  lineSoft: "#EDF0F5",      // 얕은 보더

  // ── Semantic ──
  success: "#00A86B",       // v2 --ok (판결문 톤에 맞춘 딥 그린)
  danger: "#E5484D",        // v2 --err
  warning: "#FFB020",       // v2 --warn
  info: "#0046A4",          // navy-mid 재사용

  // ── Status Colors (배차 상태 — HD Navy 팔레트 재매핑) ──
  status: {
    exclusiveCall: "#002C5F",   // 전용콜 — 브랜드 네이비
    callcenterCall: "#FFB020",  // 콜센터 전달 — 워닝 옐로
    sharedCall: "#00AAD2",      // 공유콜 — 시안 엑센트
    matched: "#00A86B",         // 매칭 완료 — OK 그린
    inProgress: "#0046A4",      // 작업중 — 네이비 미드
    completed: "#006E4D",       // 완료 — 딥 그린
    cancelled: "#E5484D",       // 취소 — 에러 레드
  },
} as const;

// ═══════════════════════════════════════
// TYPOGRAPHY TOKENS
// ═══════════════════════════════════════

export const typography = {
  // ── Font Families (v2: Pretendard + IBM Plex Sans KR + Roboto Mono) ──
  family: {
    /** 디스플레이 (헤드라인) — Pretendard Black/900 */
    display: "'Pretendard', 'IBM Plex Sans KR', -apple-system, sans-serif",
    /** 본문 — Pretendard 일반 */
    body: "'Pretendard', 'IBM Plex Sans KR', -apple-system, sans-serif",
    /** 서사·보고서 톤 — IBM Plex Sans KR (판결문 어미에 부합) */
    serif: "'IBM Plex Sans KR', 'Pretendard', -apple-system, serif",
    /** 숫자·라벨·출처 표기 — Roboto Mono */
    mono: "'Roboto Mono', 'JetBrains Mono', 'Fira Code', monospace",
  },

  // ── Perfect Fourth Scale (1.333 ratio) ──
  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.3125rem",
    xl: "1.75rem",
    "2xl": "2.3125rem",
    "3xl": "3.0625rem",
    "4xl": "4.0625rem",
    "5xl": "5.4375rem",
    hero: "clamp(2.75rem, 6vw, 4.5rem)",
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  tracking: {
    display: "-0.03em",
    heading: "-0.02em",
    body: "-0.01em",
    wide: "0.05em",
    mono: "0.1em",          // Roboto Mono 라벨용 와이드
  },

  leading: {
    none: 1,
    tight: 1.15,
    snug: 1.3,
    normal: 1.6,
    relaxed: 1.75,          // 판결문 본문
  },
} as const;

// ═══════════════════════════════════════
// SPACING / LAYOUT TOKENS
// ═══════════════════════════════════════

export const spacing = {
  px: "1px",
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",

  section: {
    desktop: "5rem",         // 80px — v2 더 조밀
    tablet: "4rem",
    mobile: "2.5rem",
  },
} as const;

export const layout = {
  maxWidth: "1440px",
  contentWidth: "1400px",    // v2 HTML 기준
  narrowWidth: "960px",

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  borderRadius: {
    sm: "0.25rem",           // 4px — v2 HTML 쿨톤 라디우스
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.25rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
} as const;

// ═══════════════════════════════════════
// SHADOW TOKENS — Navy 기반 섀도
// ═══════════════════════════════════════

export const shadows = {
  // v2 HTML: 0 20px 50px rgba(0,44,95,0.15) 패턴
  sm: "0 1px 2px rgba(0, 44, 95, 0.05)",
  md: "0 4px 12px rgba(0, 44, 95, 0.08)",
  lg: "0 10px 30px rgba(0, 44, 95, 0.12)",
  xl: "0 20px 50px rgba(0, 44, 95, 0.15)",
  glow: {
    navy: "0 0 30px rgba(0, 44, 95, 0.18)",
    cyan: "0 0 20px rgba(0, 170, 210, 0.25)",
    success: "0 0 20px rgba(0, 168, 107, 0.2)",
  },
  card: {
    rest: "0 2px 8px rgba(0, 44, 95, 0.06)",
    hover: "0 8px 20px rgba(0, 44, 95, 0.1), 0 0 0 1px rgba(0, 44, 95, 0.05)",
    active: "0 1px 4px rgba(0, 44, 95, 0.08)",
  },
} as const;

// ═══════════════════════════════════════
// ANIMATION TOKENS (Legacy 호환 유지)
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
    heavy: "cubic-bezier(0.7, 0, 0.3, 1)",
  },
  stagger: {
    fast: "0.05s",
    normal: "0.08s",
    slow: "0.12s",
  },
} as const;

// ═══════════════════════════════════════
// MOTION TOKENS (Native-Feel Physics — 보존)
// ═══════════════════════════════════════

export const motion = {
  spring: {
    snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
    smooth: { type: "spring" as const, stiffness: 200, damping: 25 },
    gentle: { type: "spring" as const, stiffness: 120, damping: 20 },
    bouncy: { type: "spring" as const, stiffness: 300, damping: 15 },
  },
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    deliberate: 800,
    splash: 3000,
  },
  easing: {
    standard: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    decelerate: "cubic-bezier(0.0, 0.0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0.0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0.0, 0.6, 1)",
    heavy: "cubic-bezier(0.7, 0, 0.3, 1)",
  },
  haptic: {
    press: { scale: 0.97, duration: 100 },
    lift: { scale: 1.02, duration: 200 },
    attention: { scale: [1, 1.05, 1] as readonly number[], duration: 400 },
  },
  stagger: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.12,
  },
} as const;

// ═══════════════════════════════════════
// BLUR TOKENS — v2는 라이트 글래스
// ═══════════════════════════════════════

export const blur = {
  subtle: {
    backdropFilter: "blur(12px) saturate(150%)",
    background: "rgba(255, 255, 255, 0.75)",
    border: "1px solid rgba(227, 232, 239, 0.6)",
  },
  medium: {
    backdropFilter: "blur(20px) saturate(180%)",
    background: "rgba(255, 255, 255, 0.82)",
    border: "1px solid rgba(227, 232, 239, 0.5)",
  },
  strong: {
    backdropFilter: "blur(40px) saturate(200%)",
    background: "rgba(255, 255, 255, 0.9)",
    border: "1px solid rgba(227, 232, 239, 0.3)",
  },

  usage: {
    header: "subtle" as const,
    modal: "medium" as const,
    overlay: "strong" as const,
    sidebar: "subtle" as const,
  },
} as const;

// ═══════════════════════════════════════
// CSS CUSTOM PROPERTIES EXPORT
// ═══════════════════════════════════════

/** Tailwind @theme inline에 주입할 CSS 변수 문자열 생성 */
export function generateCSSVars(): string {
  return `
    --cy-ink: ${colors.ink};
    --cy-bg: ${colors.bg};
    --cy-bg-alt: ${colors.bgAlt};
    --cy-white: ${colors.white};
    --cy-navy: ${colors.navy.DEFAULT};
    --cy-navy-dark: ${colors.navy.dark};
    --cy-navy-mid: ${colors.navy.mid};
    --cy-navy-light: ${colors.navy.light};
    --cy-navy-pale: ${colors.navy.pale};
    --cy-cyan: ${colors.cyan.DEFAULT};
    --cy-ink-500: ${colors.ink9[500]};
    --cy-ink-400: ${colors.ink9[400]};
    --cy-ink-300: ${colors.ink9[300]};
    --cy-line: ${colors.line};
    --cy-line-soft: ${colors.lineSoft};
    --cy-success: ${colors.success};
    --cy-danger: ${colors.danger};
    --cy-warning: ${colors.warning};
  `;
}
