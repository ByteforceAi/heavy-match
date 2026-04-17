"use client";

/**
 * Native OS Feel — 시간을 느끼게 하는 컴포넌트
 *
 * iOS/macOS/Android의 micro-timing을 참고한 UX 프리미티브.
 * 모든 인터랙션이 anticipation → processing → completion 3단계를 거침.
 *
 * 핵심 원칙:
 *   - 실제 네트워크 요청은 50~300ms면 끝나지만, UX 목적으로 500~1500ms 연출
 *   - 각 phase별로 시각적으로 구분 가능한 피드백
 *   - Framer Motion spring physics로 자연스러운 물리감
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as tokens } from "@/lib/design-system";

// ═══════════════════════════════════════
// TYPED LOG — 터미널 타이핑 효과
// ═══════════════════════════════════════

interface TypedLogProps {
  lines: { text: string; color?: string; delay?: number }[];
  speed?: number; // 글자당 ms
  onComplete?: () => void;
}

/** System Log를 터미널처럼 한 글자씩 타이핑하며 출력 */
export function TypedLog({ lines, speed = 18, onComplete }: TypedLogProps) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [displayLines, setDisplayLines] = useState<{ text: string; color?: string }[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  // 커서 깜빡임
  useEffect(() => {
    const iv = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(iv);
  }, []);

  // 타이핑 엔진
  useEffect(() => {
    if (lineIdx >= lines.length) {
      onComplete?.();
      return;
    }
    const line = lines[lineIdx];
    if (charIdx === 0 && line.delay) {
      const t = setTimeout(() => setCharIdx(1), line.delay);
      return () => clearTimeout(t);
    }
    if (charIdx >= line.text.length) {
      // 한 줄 완성 → 다음 줄
      const t = setTimeout(() => {
        setDisplayLines((prev) => [...prev, { text: line.text, color: line.color }]);
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, 150);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCharIdx((i) => i + 1), speed);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, lines, speed, onComplete]);

  const currentLine = lineIdx < lines.length ? lines[lineIdx] : null;
  const currentText = currentLine ? currentLine.text.slice(0, charIdx) : "";

  return (
    <div className="font-mono text-[11px] leading-relaxed space-y-0.5">
      {displayLines.map((l, i) => (
        <div key={i} style={{ color: l.color || "#10B981" }}>
          <span className="text-[#3A3D45] mr-2">$</span>
          {l.text}
        </div>
      ))}
      {currentLine && (
        <div style={{ color: currentLine.color || "#10B981" }}>
          <span className="text-[#3A3D45] mr-2">$</span>
          {currentText}
          {showCursor && <span className="text-[#FF6B1A]">▊</span>}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// NETWORK ACTIVITY BAR — iOS-style top progress
// ═══════════════════════════════════════

interface NetworkBarProps {
  active: boolean;
}

export function NetworkActivityBar({ active }: NetworkBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[9999] pointer-events-none">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full bg-[#FF6B1A]/10 overflow-hidden"
          >
            <motion.div
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#FF6B1A] to-transparent"
              animate={{ left: ["-33%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════
// PHASE STATE — idle → connecting → processing → success
// ═══════════════════════════════════════

export type PhaseState = "idle" | "connecting" | "processing" | "success" | "error";

interface PhaseIndicatorProps {
  state: PhaseState;
  label?: string;
}

export function PhaseIndicator({ state, label }: PhaseIndicatorProps) {
  const configs = {
    idle: { icon: "radio_button_unchecked", color: "#6B7280", text: "대기중" },
    connecting: { icon: "wifi_tethering", color: "#FFA523", text: "연결 중..." },
    processing: { icon: "sync", color: "#FF6B1A", text: "처리 중..." },
    success: { icon: "check_circle", color: "#10B981", text: "완료" },
    error: { icon: "error", color: "#EF4444", text: "실패" },
  };
  const cfg = configs[state];

  return (
    <div className="inline-flex items-center gap-2 text-xs font-semibold">
      <motion.span
        key={state}
        className="material-symbols-outlined text-base"
        style={{ color: cfg.color, fontVariationSettings: "'FILL' 1" }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: state === "processing" ? 360 : 0,
        }}
        transition={
          state === "processing"
            ? { rotate: { duration: 1, repeat: Infinity, ease: "linear" }, scale: tokens.spring.snappy }
            : tokens.spring.bouncy
        }
      >
        {cfg.icon}
      </motion.span>
      <span style={{ color: cfg.color }}>{label || cfg.text}</span>
    </div>
  );
}

// ═══════════════════════════════════════
// LOADING BUTTON — 클릭 시 spinner → success
// ═══════════════════════════════════════

interface LoadingButtonProps {
  onClick: () => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  delay?: number; // 처리 시간 (기본 800ms)
  disabled?: boolean;
}

export function LoadingButton({ onClick, children, className = "", delay = 800, disabled }: LoadingButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const handleClick = async () => {
    if (state !== "idle" || disabled) return;
    setState("loading");
    await new Promise((r) => setTimeout(r, delay));
    await onClick();
    setState("success");
    // 성공 상태는 500ms 후 초기화 (페이지 전환 없을 경우)
    setTimeout(() => setState("idle"), 500);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || state !== "idle"}
      whileHover={state === "idle" ? { scale: tokens.haptic.lift.scale } : {}}
      whileTap={state === "idle" ? { scale: tokens.haptic.press.scale } : {}}
      transition={tokens.spring.snappy}
      className={`relative overflow-hidden ${className} ${state !== "idle" ? "cursor-wait" : ""}`}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-2"
          >
            {children}
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            처리중...
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={tokens.spring.bouncy}
            className="flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            완료
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ═══════════════════════════════════════
// SMS SENDING INDICATOR
// ═══════════════════════════════════════

interface SMSSendingProps {
  recipient: string;
  message: string;
  onSent?: () => void;
  duration?: number;
}

export function SMSSendingIndicator({ recipient, message, onSent, duration = 1800 }: SMSSendingProps) {
  const [phase, setPhase] = useState<"preparing" | "sending" | "sent">("preparing");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("sending"), 400);
    const t2 = setTimeout(() => {
      setPhase("sent");
      onSent?.();
    }, duration);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [duration, onSent]);

  const phaseText = {
    preparing: "Naver Cloud SMS API 준비중...",
    sending: "SMS 발송 중...",
    sent: "발송 완료",
  };

  return (
    <div className="bg-[#0A0A0B] border border-[#3A3D45]/60 rounded-xl p-3 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 text-[10px]">
        <span className="text-[#6B7280]">TO: {recipient}</span>
        <div className="flex items-center gap-1.5">
          <motion.span
            className={`w-1.5 h-1.5 rounded-full ${phase === "sent" ? "bg-[#10B981]" : "bg-[#FFA523]"}`}
            animate={phase !== "sent" ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
            transition={{ duration: 0.8, repeat: phase !== "sent" ? Infinity : 0 }}
          />
          <span className={phase === "sent" ? "text-[#10B981]" : "text-[#FFA523]"}>
            {phaseText[phase]}
          </span>
        </div>
      </div>

      {/* Message body */}
      <div className="text-[11px] text-[#D1D5DB] whitespace-pre-line leading-relaxed">
        {message}
      </div>

      {/* Progress bar */}
      {phase !== "sent" && (
        <div className="mt-2 h-0.5 bg-[#242428] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#FFA523]"
            initial={{ width: "0%" }}
            animate={{ width: phase === "sending" ? "90%" : "30%" }}
            transition={{ duration: phase === "sending" ? 1.4 : 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      {phase === "sent" && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tokens.spring.bouncy}
          className="mt-2 text-[10px] text-[#10B981] flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          INSERT sms_logs · token: {Math.random().toString(36).slice(2, 10)}
        </motion.div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// DB WRITE INDICATOR
// ═══════════════════════════════════════

interface DBWriteProps {
  operation: string;
  table: string;
  fields?: string[];
  duration?: number;
  onDone?: () => void;
}

export function DBWriteIndicator({ operation, table, fields = [], duration = 900, onDone }: DBWriteProps) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setDone(true); onDone?.(); }, duration);
    return () => clearTimeout(t);
  }, [duration, onDone]);

  return (
    <div className="bg-[#0A0A0B] border border-[#3A3D45]/60 rounded-xl p-3 font-mono">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <motion.span
            className="material-symbols-outlined text-xs"
            style={{ color: done ? "#10B981" : "#FFA523", fontVariationSettings: "'FILL' 1" }}
            animate={done ? {} : { rotate: 360 }}
            transition={done ? {} : { duration: 1, repeat: Infinity, ease: "linear" }}
          >
            {done ? "check_circle" : "sync"}
          </motion.span>
          <span className="text-[10px] text-[#9CA3AF]">
            {done ? "Committed" : "Writing to PostgreSQL..."}
          </span>
        </div>
        <span className="text-[9px] text-[#6B7280] font-mono">
          {done ? "47ms" : <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >...ms</motion.span>}
        </span>
      </div>

      <div className="text-[11px] leading-relaxed">
        <span className="text-[#FF6B1A] font-bold">{operation}</span>
        <span className="text-[#6B7280]"> → </span>
        <span className="text-[#10B981]">{table}</span>
        {fields.length > 0 && (
          <div className="mt-1 text-[10px] text-[#6B7280] pl-3 border-l border-[#3A3D45]">
            {fields.map((f) => (
              <div key={f}>· {f}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// REALTIME INDICATOR (iOS-style subtle)
// ═══════════════════════════════════════

export function RealtimeIndicator() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#10B98115] border border-[#10B98140] rounded-full text-[10px] font-bold text-[#10B981]">
      <motion.span
        className="w-1.5 h-1.5 bg-[#10B981] rounded-full"
        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="uppercase tracking-wider">Realtime</span>
    </div>
  );
}

// ═══════════════════════════════════════
// STATUS TRANSITION (DB 상태 변경 시각화)
// ═══════════════════════════════════════

interface StatusTransitionProps {
  from: string;
  to: string;
  fromColor?: string;
  toColor?: string;
  duration?: number;
}

export function StatusTransition({
  from, to, fromColor = "#FF6B1A", toColor = "#10B981", duration = 1200,
}: StatusTransitionProps) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), duration);
    return () => clearTimeout(t);
  }, [duration]);

  return (
    <div className="flex items-center gap-3 font-mono text-[11px]">
      <motion.span
        className="px-2 py-0.5 rounded-md font-bold"
        style={{ background: `${fromColor}20`, color: fromColor, border: `1px solid ${fromColor}40` }}
        animate={done ? { opacity: 0.4 } : { opacity: 1 }}
      >
        {from}
      </motion.span>

      <motion.span
        className="flex items-center"
        animate={done ? {} : { x: [0, 3, 0] }}
        transition={done ? {} : { duration: 0.6, repeat: Infinity }}
      >
        <span className="text-[#6B7280]">→</span>
      </motion.span>

      <motion.span
        className="px-2 py-0.5 rounded-md font-bold"
        style={{
          background: done ? `${toColor}20` : "#24242880",
          color: done ? toColor : "#6B7280",
          border: done ? `1px solid ${toColor}40` : "1px solid #3A3D45",
        }}
        initial={{ scale: 0.8 }}
        animate={done ? { scale: 1 } : { scale: 0.95 }}
        transition={tokens.spring.bouncy}
      >
        {done ? to : "..."}
      </motion.span>

      {done && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="material-symbols-outlined text-sm text-[#10B981]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </motion.span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// SYSTEM CLOCK — 실시간 시계 (iOS 상태바 스타일)
// ═══════════════════════════════════════

export function SystemClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  return (
    <span className="font-mono tabular-nums text-[10px] text-[#9CA3AF]">
      {hh}:{mm}:{ss}
    </span>
  );
}

// ═══════════════════════════════════════
// PROGRESS PULSE — 처리중 다중 반복 펄스
// ═══════════════════════════════════════

export function ProcessingPulse({ label = "처리 중" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[#FFA523]">
      <span>{label}</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 bg-[#FFA523] rounded-full"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// useAutoPhases — 자동 phase 진행 hook
// ═══════════════════════════════════════

export function useAutoPhases(phases: number[], onComplete?: () => void) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (idx >= phases.length) {
      onComplete?.();
      return;
    }
    timer.current = setTimeout(() => setIdx((i) => i + 1), phases[idx]);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [idx, phases, onComplete]);

  return idx;
}
