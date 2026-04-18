"use client";

/**
 * LivePreviewCard — Hero 우측 "LIVE PREVIEW" 미니 대시보드
 *
 * cheolyeon_v2.html .d1-hero-r 정합 구현.
 * - 상단 LIVE 뱃지 (cyan pulse dot)
 * - 3-KPI 그리드 (진행/완료/SLA)
 * - 시간별 배차량 영역 차트 (cyan gradient)
 * - 실시간 배차 row 3개 (status dot)
 */

import { motion } from "framer-motion";
import { hero } from "@/content/copy";

export default function LivePreviewCard() {
  const { livePreview } = hero;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative bg-white border border-[#E3E8EF] rounded-2xl p-5"
      style={{ boxShadow: "0 20px 50px rgba(0, 44, 95, 0.08)" }}
    >
      {/* LIVE PREVIEW 뱃지 — 카드 우상단 밖으로 돌출 */}
      <span
        className="absolute -top-2.5 right-4 bg-[#00AAD2] text-white text-[10px] font-bold px-2.5 py-[3px] rounded tracking-[0.1em]"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        LIVE PREVIEW
      </span>

      {/* 헤더 */}
      <div className="flex justify-between items-center mb-3.5">
        <span className="text-[13px] font-bold text-[#0A1628]">{livePreview.label}</span>
        <span
          className="text-[10px] text-[#00A86B] flex items-center gap-1"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          <motion.span
            className="w-1.5 h-1.5 bg-[#00A86B] rounded-full"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-hidden="true"
          />
          LIVE
        </span>
      </div>

      {/* 3-KPI 그리드 */}
      <div className="grid grid-cols-3 gap-2 mb-3.5">
        {livePreview.kpi.map((k, i) => (
          <motion.div
            key={k.key}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
            className="bg-[#F4F6FA] rounded-[10px] p-2.5"
          >
            <p className="text-[10px] text-[#6B7B8F] mb-0.5">{k.key}</p>
            <p className="text-[17px] font-black text-[#0A1628] tracking-[-0.02em]">
              {k.value}
            </p>
            <p className="text-[10px] text-[#00A86B] font-medium">{k.delta}</p>
          </motion.div>
        ))}
      </div>

      {/* 시간별 배차량 영역 차트 */}
      <div className="bg-[#F4F6FA] rounded-[10px] p-3.5 mb-2.5">
        <div className="flex justify-between mb-2">
          <span className="text-[11px] text-[#6B7B8F]">{livePreview.chartLabel}</span>
          <span
            className="text-[11px] font-bold text-[#002C5F]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {livePreview.chartValue}
          </span>
        </div>
        <svg
          viewBox="0 0 260 80"
          preserveAspectRatio="none"
          className="w-full h-[70px]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroChartGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#00AAD2" stopOpacity="0.4" />
              <stop offset="1" stopColor="#00AAD2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,55 L30,45 L60,50 L90,35 L120,40 L150,20 L180,28 L210,15 L240,22 L260,10 L260,80 L0,80 Z"
            fill="url(#heroChartGrad)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.path
            d="M0,55 L30,45 L60,50 L90,35 L120,40 L150,20 L180,28 L210,15 L240,22 L260,10"
            fill="none"
            stroke="#00AAD2"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* 실시간 배차 rows */}
      <div className="flex flex-col gap-1.5">
        {livePreview.liveRows.map((row, i) => {
          const dotColor =
            row.status === "navy" ? "#002C5F" : row.status === "ok" ? "#00A86B" : "#FFB020";
          return (
            <motion.div
              key={row.equipment}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
              className="flex justify-between items-center px-2.5 py-2 bg-[#F4F6FA] rounded-lg text-[11px]"
            >
              <span className="flex gap-2 items-center text-[#0A1628] font-medium">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: dotColor }}
                  aria-hidden="true"
                />
                {row.equipment} · {row.route}
              </span>
              <span
                className="font-bold text-[#0A1628]"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                {row.price}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
