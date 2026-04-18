"use client";

/**
 * PhoneFrame — 반응형 iPhone 베젤 래퍼
 *
 * 모바일(<md): 프레임 없이 children 전폭 렌더 (실제 앱 UX 보존)
 * 데스크톱(>=md): 375×812 iPhone-style 베젤 안에 children 렌더
 *
 * 원칙 (heritage-v1.md §3.2):
 *  - 판결문 어미(~한다/~된다), 느낌표·1인칭 금지, 의문형 훅 금지
 *  - Navy + Cyan + White 팔레트 고정
 *  - CSS-only 뷰포트 감지 (useMedia 훅 없음) — `hidden md:block` 이중 렌더
 *
 * 레퍼런스: docs/design/cheolyeon-v2-ref.html `.phone` selector (line 76-87)
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// ═══════════════════════════════════════
// TOKENS
// ═══════════════════════════════════════

const BEZEL = "#1A1A1A";
const NAVY = "#002C5F";
const INK_3 = "#6B7B8F";

const FRAME_SHADOW =
  "0 40px 80px rgba(0, 44, 95, 0.18), 0 0 0 1px rgba(0,0,0,0.05)";

// 좌측 엣지의 미세한 반사 하이라이트
const REFLECTION_GRADIENT =
  "linear-gradient(100deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.0) 18%, rgba(255,255,255,0.0) 82%, rgba(255,255,255,0.04) 100%)";

// ═══════════════════════════════════════
// TYPES
// ═══════════════════════════════════════

interface PhoneFrameProps {
  children: ReactNode;
  /** 데스크톱에서 폰 아래에 표시되는 라벨 (예: "모바일 · 현장소장") */
  caption?: string;
  /** true면 데스크톱에서도 베젤 없이 전폭 렌더 */
  disableFrame?: boolean;
}

// ═══════════════════════════════════════
// BEZEL BLOCK (데스크톱 전용 내부 컴포넌트)
// ═══════════════════════════════════════

function Bezel({
  children,
  caption,
  delay = 0,
}: {
  children: ReactNode;
  caption?: string;
  delay?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-5">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
          mass: 1,
          delay,
        }}
        className="relative"
        style={{
          width: 375,
          height: 812,
          padding: "1.8rem",
          background: BEZEL,
          borderRadius: "3rem",
          boxShadow: FRAME_SHADOW,
        }}
      >
        {/* Notch */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 24,
            width: 90,
            height: 28,
            background: "#000",
            borderRadius: 999,
            zIndex: 10,
          }}
        />

        {/* Reflection highlight (pointer-events:none) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "3rem",
            background: REFLECTION_GRADIENT,
            mixBlendMode: "screen",
          }}
        />

        {/* Inner screen */}
        <div
          className="relative w-full h-full overflow-hidden overflow-y-auto"
          style={{ borderRadius: "2.5rem" }}
        >
          {children}
        </div>
      </motion.div>

      {caption ? (
        <p
          className="text-[11px] font-semibold tracking-[0.22em] uppercase"
          style={{
            color: INK_3,
            fontFamily: "var(--font-roboto-mono), monospace",
          }}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}

// ═══════════════════════════════════════
// PUBLIC — PhoneFrame
// ═══════════════════════════════════════

/**
 * children은 모바일 기준 레이아웃을 그대로 받는다.
 * 뷰포트 분기는 Tailwind의 `hidden`/`md:hidden`/`md:flex`로 처리되며
 * 두 블록이 동시에 DOM에 존재한다 (CSS-only).
 *
 * `disableFrame`이 true면 모든 뷰포트에서 children만 그대로 렌더한다.
 */
export function PhoneFrame({
  children,
  caption,
  disableFrame = false,
}: PhoneFrameProps) {
  if (disableFrame) {
    return <>{children}</>;
  }

  return (
    <>
      {/* ═══ Mobile (<md): 프레임 없이 그대로 ═══ */}
      <div className="md:hidden">{children}</div>

      {/* ═══ Desktop (>=md): 베젤 안에 렌더 ═══ */}
      <div
        className="hidden md:flex md:items-center md:justify-center"
        style={{
          background: "#EEF1F5",
          padding: "80px 32px",
          minHeight: "100vh",
        }}
      >
        <Bezel caption={caption}>{children}</Bezel>
      </div>
    </>
  );
}

// ═══════════════════════════════════════
// PUBLIC — PhoneFramePair (선택적: 2폰 나란히)
// ═══════════════════════════════════════

interface PhoneFramePairProps {
  primary: ReactNode;
  primaryCaption?: string;
  secondary: ReactNode;
  secondaryCaption?: string;
  /** 모바일에서 어느 쪽을 노출할지 (기본 primary) */
  mobileSlot?: "primary" | "secondary";
}

/**
 * 데스크톱에서 두 대의 폰을 가로 배치하여 비교 쇼케이스를 한다.
 * 모바일에서는 `mobileSlot`으로 지정된 하나만 전폭 렌더된다.
 */
export function PhoneFramePair({
  primary,
  primaryCaption,
  secondary,
  secondaryCaption,
  mobileSlot = "primary",
}: PhoneFramePairProps) {
  return (
    <>
      {/* ═══ Mobile ═══ */}
      <div className="md:hidden">
        {mobileSlot === "primary" ? primary : secondary}
      </div>

      {/* ═══ Desktop: 두 폰 나란히 ═══ */}
      <div
        className="hidden md:flex md:items-center md:justify-center md:gap-16"
        style={{
          background: "#EEF1F5",
          padding: "80px 32px",
          minHeight: "100vh",
        }}
      >
        <Bezel caption={primaryCaption} delay={0}>
          {primary}
        </Bezel>
        <Bezel caption={secondaryCaption} delay={0.08}>
          {secondary}
        </Bezel>
      </div>
    </>
  );
}

export default PhoneFrame;
