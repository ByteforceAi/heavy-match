/**
 * HEAVY MATCH — Theme System
 *
 * 다크 테마 기본 + 라이트 테마 옵셔널.
 * 중장비 B2B 플랫폼은 다크가 기본 — 현장 밝은 환경에서도 가독성,
 * 프리미엄 소프트웨어 느낌, 데이터 시각화 대비.
 */

import { colors, typography, shadows, animation } from "./tokens";

// ═══════════════════════════════════════
// SEMANTIC TOKEN MAPPING
// ═══════════════════════════════════════

export const semanticTokens = {
  // ── Text ──
  text: {
    primary: colors.white,
    secondary: colors.steel[400],
    tertiary: colors.steel[500],
    inverse: colors.black,
    accent: colors.orange.DEFAULT,
    success: colors.success,
    danger: colors.danger,
    link: colors.orange.light,
  },

  // ── Background ──
  bg: {
    page: colors.black,
    card: colors.surface.raised,
    cardHover: colors.surface.elevated,
    input: colors.surface.base,
    overlay: `${colors.black}CC`, // 80% opacity
    accent: colors.orange.subtle,
    success: `${colors.success}15`,
    danger: `${colors.danger}15`,
  },

  // ── Border ──
  border: {
    default: `${colors.steel[700]}80`,  // 50% opacity
    hover: colors.steel[600],
    focus: colors.orange.DEFAULT,
    accent: `${colors.orange.DEFAULT}40`,
  },

  // ── Interactive ──
  button: {
    primary: {
      bg: colors.orange.DEFAULT,
      bgHover: colors.orange.light,
      bgActive: colors.orange.muted,
      text: colors.white,
    },
    secondary: {
      bg: colors.surface.elevated,
      bgHover: colors.steel[700],
      bgActive: colors.surface.raised,
      text: colors.steel[300],
    },
    ghost: {
      bg: "transparent",
      bgHover: colors.surface.elevated,
      text: colors.steel[400],
    },
    danger: {
      bg: colors.danger,
      bgHover: "#DC2626",
      text: colors.white,
    },
  },
} as const;

// ═══════════════════════════════════════
// COMPONENT THEMES
// ═══════════════════════════════════════

export const componentThemes = {
  // ── Navigation ──
  nav: {
    bg: `${colors.surface.base}E6`, // 90% opacity for glass
    border: `${colors.steel[700]}40`,
    backdropBlur: "20px",
  },

  // ── Card ──
  card: {
    bg: colors.surface.raised,
    border: `${colors.steel[700]}60`,
    borderHover: `${colors.orange.DEFAULT}30`,
    shadow: shadows.card.rest,
    shadowHover: shadows.card.hover,
    radius: "1rem",
  },

  // ── Hero ──
  hero: {
    bg: colors.black,
    titleColor: colors.white,
    subtitleColor: colors.steel[400],
    gradientOverlay: `linear-gradient(135deg, ${colors.black} 0%, ${colors.surface.base} 50%, ${colors.black} 100%)`,
  },

  // ── Section ──
  section: {
    divider: `${colors.steel[700]}30`,
  },
} as const;

// ═══════════════════════════════════════
// TAILWIND CONFIG EXTENSION
// ═══════════════════════════════════════

/** Tailwind CSS @theme inline에 넣을 토큰 */
export const tailwindThemeVars = `
  /* ── Heavy Match Brand Colors ── */
  --color-hm-black: ${colors.black};
  --color-hm-white: ${colors.white};
  --color-hm-surface: ${colors.surface.base};
  --color-hm-surface-raised: ${colors.surface.raised};
  --color-hm-surface-elevated: ${colors.surface.elevated};
  --color-hm-orange: ${colors.orange.DEFAULT};
  --color-hm-orange-muted: ${colors.orange.muted};
  --color-hm-orange-light: ${colors.orange.light};
  --color-hm-amber: ${colors.amber.DEFAULT};
  --color-hm-steel-700: ${colors.steel[700]};
  --color-hm-steel-500: ${colors.steel[500]};
  --color-hm-steel-400: ${colors.steel[400]};
  --color-hm-steel-300: ${colors.steel[300]};
  --color-hm-success: ${colors.success};
  --color-hm-danger: ${colors.danger};

  /* ── Typography ── */
  --font-display: ${typography.family.display};
  --font-body: ${typography.family.body};
  --font-mono: ${typography.family.mono};

  /* ── Animation ── */
  --ease-heavy: ${animation.easing.heavy};
  --ease-spring: ${animation.easing.spring};
`;
