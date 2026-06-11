"use client";

/**
 * Motion Primitives — 토큰 기반 재사용 모션 컴포넌트
 *
 * 모든 Framer Motion 사용은 이 파일의 프리미티브를 통해서만.
 * tokens.ts의 motion/blur 값을 직접 참조.
 */

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, animate, useInView, useMotionValue, useTransform, type Variants } from "framer-motion";
import { motion as tokens } from "@/lib/design-system";

// ═══════════════════════════════════════
// ANIMATED BUTTON
// ═══════════════════════════════════════

interface MotionButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function MotionButton({ children, className = "", variant = "primary", onClick, disabled }: MotionButtonProps) {
  const variantStyles = {
    primary: "bg-cy-navy hover:bg-cy-navy-mid text-white",
    secondary: "bg-white hover:bg-cy-bg text-cy-ink border border-cy-line",
    ghost: "bg-transparent hover:bg-cy-bg-alt text-cy-ink-2",
    danger: "bg-cy-danger hover:bg-[#C82B30] text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: tokens.haptic.lift.scale }}
      whileTap={{ scale: tokens.haptic.press.scale }}
      transition={tokens.spring.snappy}
      className={`font-bold rounded-xl transition-colors ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// ═══════════════════════════════════════
// ANIMATED CARD
// ═══════════════════════════════════════

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function MotionCard({ children, className = "", delay = 0, onClick }: MotionCardProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 120px 0px" }}
      transition={{ ...tokens.spring.smooth, delay }}
      whileHover={reduced ? undefined : { y: -2 }}
      onClick={onClick}
      className={`bg-white border border-cy-line rounded-2xl transition-shadow hover:shadow-[0_8px_20px_rgba(0,44,95,0.08),0_0_0_1px_rgba(0,44,95,0.05)] ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════
// SCROLL REVEAL (섹션 등장)
// ═══════════════════════════════════════

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  once?: boolean;
}

export function Reveal({ children, className = "", direction = "up", delay = 0, once = true }: RevealProps) {
  const reduced = useReducedMotion();
  const offsets = {
    up: { y: 20, x: 0 },
    left: { x: -20, y: 0 },
    right: { x: 20, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      // reduced-motion: 숨김 상태 없이 즉시 표시 (JS 실패·감속 선호 모두 콘텐츠 우선)
      initial={reduced ? false : { opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      // 뷰포트 진입 120px 전에 미리 시작 — 사용자는 빈 화면을 보지 않는다
      viewport={{ once, margin: "0px 0px 120px 0px" }}
      transition={{ ...tokens.spring.gentle, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════
// STAGGER CONTAINER + CHILD
// ═══════════════════════════════════════

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: tokens.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tokens.spring.smooth,
  },
};

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={staggerContainer}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px 120px 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════
// HERO TEXT STAGGER (단어별 등장)
// ═══════════════════════════════════════

export function HeroText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: tokens.stagger.slow } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            // blur 필터 제거 — 단어 수만큼 GPU 레이어가 생겨 저사양 기기에서 프레임 드랍
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1, y: 0,
              transition: { ...tokens.spring.gentle, duration: 0.5 },
            },
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ═══════════════════════════════════════
// COUNTER — 실제 숫자 증가 애니메이션
// useMotionValue + animate() + useTransform 패턴
// ═══════════════════════════════════════

interface CountUpProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
  /** 소수점 자리수 */
  decimals?: number;
}

export function CountUp({ target, duration = 1.6, suffix = "", className = "", decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => {
    const rounded = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    const [intPart, decPart] = rounded.split(".");
    const formatted = Number(intPart).toLocaleString("ko-KR") + (decPart ? `.${decPart}` : "");
    return formatted + suffix;
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, target, {
      duration,
      ease: [0.16, 1, 0.3, 1], // expo-out — 빠르게 시작해서 부드럽게 안착
    });
    return () => controls.stop();
  }, [inView, target, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

// ═══════════════════════════════════════
// REDUCED MOTION HOOK
// ═══════════════════════════════════════

const REDUCED_MQ = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MQ);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function useReducedMotion() {
  // SSR에서는 false(모션 허용)로 렌더 — 클라이언트 스냅숏과 자연 동기화
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MQ).matches,
    () => false,
  );
}

// ═══════════════════════════════════════
// MODAL ENTRANCE (bouncy spring)
// ═══════════════════════════════════════

export function ModalEntrance({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={tokens.spring.bouncy}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════
// IndustrialGlass (v1 Masterpiece Dark 잔재) — 제거됨
// v2 철연 CHEOLYEON 노선에서는 라이트 글래스가 필요하면
// blur.usage.header/modal/overlay를 tokens에서 직접 참조.
// ═══════════════════════════════════════
