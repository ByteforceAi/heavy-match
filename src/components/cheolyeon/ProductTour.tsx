"use client";

/**
 * ProductTour — 랜딩 페이지 Interactive Tour
 *
 * 스포트라이트 오버레이 + 툴팁 기반 가이드 투어.
 * `src/content/product-tour.ts`의 steps 배열을 기반으로 순차 진행.
 *
 * 사용:
 *   const [tourOpen, setTourOpen] = useState(false);
 *   <button onClick={() => setTourOpen(true)}>투어 시작</button>
 *   <ProductTour open={tourOpen} onClose={() => setTourOpen(false)} />
 */

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { TourStep } from "@/content/product-tour";

interface ProductTourProps {
  open: boolean;
  onClose: () => void;
  steps: TourStep[];
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function ProductTour({ open, onClose, steps }: ProductTourProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; placement: string } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;
  const isFirst = stepIndex === 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  // 타겟 요소 위치 측정 + 툴팁 배치 계산
  const measureTarget = useCallback(() => {
    if (!currentStep) return;
    const target = document.querySelector(currentStep.selector);
    if (!target) {
      // 타겟 없음 → 화면 중앙 모달 모드
      setTargetRect(null);
      setTooltipPos({
        top: window.innerHeight / 2 - 120,
        left: window.innerWidth / 2 - 200,
        placement: "center",
      });
      return;
    }

    const rect = target.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const absRect: TargetRect = {
      top: rect.top + scrollY,
      left: rect.left + scrollX,
      width: rect.width,
      height: rect.height,
    };

    setTargetRect(absRect);

    // 뷰포트 밖이면 스크롤
    const viewportBottom = scrollY + window.innerHeight;
    const elementBottom = absRect.top + absRect.height;
    if (elementBottom > viewportBottom - 120 || absRect.top < scrollY + 80) {
      const scrollTarget = absRect.top - 120;
      window.scrollTo({ top: Math.max(0, scrollTarget), behavior: "smooth" });
    }

    // 툴팁 배치
    const tooltipWidth = 360;
    const tooltipHeight = 220; // 추정치
    const margin = 20;

    let placement = currentStep.placement ?? "auto";
    if (placement === "auto") {
      const spaceBelow = window.innerHeight - rect.bottom;
      placement = spaceBelow > tooltipHeight + margin ? "bottom" : "top";
    }

    let top = 0;
    let left = 0;

    switch (placement) {
      case "bottom":
        top = absRect.top + absRect.height + margin;
        left = absRect.left + absRect.width / 2 - tooltipWidth / 2;
        break;
      case "top":
        top = absRect.top - tooltipHeight - margin;
        left = absRect.left + absRect.width / 2 - tooltipWidth / 2;
        break;
      case "left":
        top = absRect.top + absRect.height / 2 - tooltipHeight / 2;
        left = absRect.left - tooltipWidth - margin;
        break;
      case "right":
        top = absRect.top + absRect.height / 2 - tooltipHeight / 2;
        left = absRect.left + absRect.width + margin;
        break;
    }

    // 뷰포트 경계 보정
    const minLeft = 16;
    const maxLeft = window.innerWidth - tooltipWidth - 16;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    setTooltipPos({ top, left, placement });
  }, [currentStep]);

  // 스텝 변경 시 재측정
  useEffect(() => {
    if (!open) return;
    // 다음 프레임에 측정 (렌더 + 스크롤 반영 대기)
    const t = setTimeout(measureTarget, 50);
    const onResize = () => measureTarget();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [open, stepIndex, measureTarget]);

  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && !isLast) setStepIndex((i) => i + 1);
      if (e.key === "ArrowLeft" && !isFirst) setStepIndex((i) => i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, isLast, isFirst, onClose]);

  // 열릴 때 첫 스텝으로 초기화
  useEffect(() => {
    if (open) setStepIndex(0);
  }, [open]);

  const handleNext = () => {
    if (isLast) {
      onClose();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) setStepIndex((i) => i - 1);
  };

  // SVG 마스크 — 스포트라이트 홀 뚫기
  const spotlight = useMemo(() => {
    if (!targetRect) return null;
    const padding = 8;
    return {
      x: targetRect.left - padding,
      y: targetRect.top - padding - (typeof window !== "undefined" ? window.scrollY : 0),
      width: targetRect.width + padding * 2,
      height: targetRect.height + padding * 2,
    };
  }, [targetRect]);

  if (!mounted || !open || !currentStep) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="tour-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] pointer-events-auto"
        role="dialog"
        aria-modal="true"
        aria-label={`제품 투어 · ${currentStep.label}`}
      >
        {/* 어두운 백드롭 + 스포트라이트 홀 */}
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              {spotlight && (
                <motion.rect
                  initial={false}
                  animate={{
                    x: spotlight.x,
                    y: spotlight.y,
                    width: spotlight.width,
                    height: spotlight.height,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 28 }}
                  rx={12}
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(10, 22, 40, 0.72)"
            mask="url(#spotlight-mask)"
          />
          {/* 스포트라이트 링 glow */}
          {spotlight && (
            <motion.rect
              initial={false}
              animate={{
                x: spotlight.x,
                y: spotlight.y,
                width: spotlight.width,
                height: spotlight.height,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
              rx={12}
              fill="none"
              stroke="#00AAD2"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
          )}
        </svg>

        {/* 툴팁 */}
        {tooltipPos && (
          <motion.div
            ref={tooltipRef}
            key={`tooltip-${stepIndex}`}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bg-white rounded-2xl p-6 shadow-2xl"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left,
              width: 360,
              boxShadow: "0 24px 60px rgba(0, 44, 95, 0.3), 0 0 0 1px rgba(0, 170, 210, 0.2)",
              fontFamily: "'Pretendard', 'IBM Plex Sans KR', sans-serif",
            }}
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] font-bold text-[#002C5F] tracking-[0.2em]"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                {currentStep.label}
              </span>
              <button
                onClick={onClose}
                className="text-[#6B7B8F] hover:text-[#0A1628] transition-colors min-h-0 p-1"
                aria-label="투어 닫기"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  close
                </span>
              </button>
            </div>

            {/* Title */}
            <h3 className="text-[18px] md:text-[20px] font-[800] text-[#0A1628] tracking-[-0.02em] mb-2">
              {currentStep.title}
            </h3>

            {/* Description */}
            <p
              className="text-[14px] text-[#3A4A5F] leading-[1.7] mb-5"
              style={{ fontFamily: "'IBM Plex Sans KR', Pretendard, serif" }}
            >
              {currentStep.description}
            </p>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5 mb-4">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStepIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === stepIndex
                      ? "bg-[#002C5F] w-6"
                      : i < stepIndex
                        ? "bg-[#00AAD2] w-1.5"
                        : "bg-[#E3E8EF] w-1.5"
                  }`}
                  aria-label={`스텝 ${i + 1}`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <span
                className="text-[11px] text-[#9AA8B8]"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                {stepIndex + 1} / {steps.length}
              </span>
              <div className="flex gap-2">
                {!isFirst && (
                  <button
                    onClick={handlePrev}
                    className="px-3 py-2 text-[13px] font-medium text-[#3A4A5F] hover:bg-[#F4F6FA] rounded-lg transition-colors min-h-0"
                  >
                    ← 뒤로
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-4 py-2 text-[13px] font-bold text-white bg-[#002C5F] hover:bg-[#0046A4] rounded-lg transition-colors min-h-0 inline-flex items-center gap-1"
                >
                  {isLast ? "투어 종료" : "다음 →"}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 스킵 버튼 (하단 중앙) */}
        <button
          onClick={onClose}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 text-[12px] text-white/70 hover:text-white underline underline-offset-4 transition-colors min-h-0"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          투어 건너뛰기 (ESC)
        </button>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
