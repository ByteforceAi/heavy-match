"use client";

/**
 * Confetti — 시뮬레이션 완료 시 축하 효과
 * 외부 라이브러리 없이 순수 Framer Motion + SVG로 구현 (번들 경량화)
 */

import { useMemo } from "react";
import { motion } from "framer-motion";

interface ConfettiProps {
  active: boolean;
  /** 색상 팔레트 (기본: 브랜드 오렌지 + 에메랄드 + 앰버) */
  colors?: string[];
  /** 조각 개수 (기본: 50) */
  count?: number;
  /** 지속시간 초 (기본: 3) */
  duration?: number;
}

export default function Confetti({
  active,
  colors = ["#002C5F", "#00AAD2", "#0046A4", "#00A86B", "#FFFFFF"],
  count = 50,
  duration = 3,
}: ConfettiProps) {
  // 각 조각의 랜덤 파라미터 — useMemo로 마운트 시 한 번만 계산
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // 시작 x 위치 (% of viewport)
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: Math.random() * 360,
        rotateSpeed: (Math.random() - 0.5) * 720, // 회전 속도 (deg/s)
        size: 6 + Math.random() * 8, // 6~14px
        drift: (Math.random() - 0.5) * 200, // 좌우 드리프트
        delay: Math.random() * 0.4, // 0~0.4s 지연
        fallDuration: duration * (0.7 + Math.random() * 0.6), // 속도 변화
        shape: Math.random() > 0.5 ? "rect" : "circle",
      })),
    [count, colors, duration]
  );

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: "-10vh",
            x: `${p.x}vw`,
            rotate: p.rotate,
            opacity: 1,
          }}
          animate={{
            y: "110vh",
            x: `calc(${p.x}vw + ${p.drift}px)`,
            rotate: p.rotate + p.rotateSpeed,
            opacity: [1, 1, 0.7, 0],
          }}
          transition={{
            duration: p.fallDuration,
            delay: p.delay,
            ease: [0.2, 0.8, 0.4, 1], // custom ease — "falling leaf"
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size * (p.shape === "rect" ? 0.5 : 1),
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            boxShadow: `0 0 8px ${p.color}40`,
          }}
        />
      ))}
    </div>
  );
}
