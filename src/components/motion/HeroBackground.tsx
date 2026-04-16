"use client";

/**
 * Hero Background — 블루프린트 그리드 + 데이터 플로우 라인
 * CSS-only 구현 (Three.js 대신) — 성능 + 번들 사이즈 최적화
 * 느리게 움직이는 노드와 연결선으로 "실시간 매칭" 분위기 연출
 */

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,26,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,26,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,107,26,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Animated flow nodes */}
      {[
        { x: "15%", y: "20%", delay: 0, size: 6 },
        { x: "75%", y: "30%", delay: 1.5, size: 8 },
        { x: "45%", y: "60%", delay: 3, size: 5 },
        { x: "85%", y: "70%", delay: 0.8, size: 7 },
        { x: "25%", y: "80%", delay: 2.2, size: 4 },
        { x: "60%", y: "15%", delay: 4, size: 6 },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: node.x,
            top: node.y,
            width: node.size,
            height: node.size,
            background: "#FF6B1A",
            boxShadow: "0 0 20px rgba(255,107,26,0.4)",
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="15%" y1="20%" x2="45%" y2="60%"
          stroke="#FF6B1A" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="75%" y1="30%" x2="85%" y2="70%"
          stroke="#FF6B1A" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="45%" y1="60%" x2="85%" y2="70%"
          stroke="#FFA523" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 7, delay: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
    </div>
  );
}
