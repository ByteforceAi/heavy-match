"use client";

/**
 * Motion Primitives — 토큰 기반 재사용 모션 컴포넌트
 *
 * 모든 Framer Motion 사용은 이 파일의 프리미티브를 통해서만.
 * tokens.ts의 motion/blur 값을 직접 참조.
 */

import { useEffect, useRef, useState } from "react";
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
    primary: "bg-[#FF6B1A] hover:bg-[#FF8A4C] text-white",
    secondary: "bg-[#242428] hover:bg-[#3A3D45] text-[#D1D5DB]",
    ghost: "bg-transparent hover:bg-[#242428] text-[#9CA3AF]",
    danger: "bg-[#EF4444] hover:bg-[#DC2626] text-white",
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...tokens.spring.smooth, delay }}
      whileHover={{ y: -2, scale: tokens.haptic.lift.scale }}
      onClick={onClick}
      className={`bg-[#1A1A20] border border-[#3A3D45]/60 rounded-2xl transition-shadow hover:shadow-[0_8px_24px_rgba(10,10,11,0.3),0_0_0_1px_rgba(255,107,26,0.1)] ${onClick ? "cursor-pointer" : ""} ${className}`}
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
  const offsets = {
    up: { y: 40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: tokens.spring.smooth,
  },
};

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
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
            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
            visible: {
              opacity: 1, y: 0, filter: "blur(0px)",
              transition: { ...tokens.spring.gentle, duration: 0.6 },
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

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
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
// INDUSTRIAL GLASS WRAPPER
// ═══════════════════════════════════════

export function IndustrialGlass({ level = "subtle", children, className = "" }: {
  level?: "subtle" | "medium" | "strong";
  children: React.ReactNode;
  className?: string;
}) {
  const styles = {
    subtle: { backdropFilter: "blur(12px) saturate(150%)", background: "rgba(18,18,22,0.75)", border: "1px solid rgba(58,61,69,0.3)" },
    medium: { backdropFilter: "blur(20px) saturate(180%)", background: "rgba(18,18,22,0.82)", border: "1px solid rgba(58,61,69,0.25)" },
    strong: { backdropFilter: "blur(40px) saturate(200%)", background: "rgba(18,18,22,0.9)", border: "1px solid rgba(58,61,69,0.15)" },
  };

  return (
    <div style={styles[level]} className={className}>
      {children}
    </div>
  );
}
