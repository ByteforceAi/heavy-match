"use client";

/**
 * HeritageSection — 철연 이야기 섹션
 *
 * heritage-v1.md §5 노출 레벨 L3 구현:
 *   전문(全文) + 부산일보 1998.02.24 기사 재현 박스
 *
 * 좌측: heritage-v1.md §2.1 전문 4문단 (판결문 톤)
 * 우측: 부산일보 1998년 지면 재현 (釜山日報 워터마크 + 굵은 밑줄 + 형광펜 하이라이트)
 *
 * §6.1 부산일보 저작권 준수: 인용 시 출처 링크 (busan.com 원문) 필수.
 */

import { motion } from "framer-motion";
import { heritageFull, busanIlbo } from "@/content/copy";

export default function HeritageSection() {
  return (
    <section
      id="heritage"
      className="py-20 md:py-24 bg-[#F4F6FA]"
      aria-labelledby="heritage-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
        {/* ═══ LEFT — 계보(系譜) 본문 ═══ */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.2em] mb-3"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            CHEOLYEON · 철연의 유래
          </motion.p>

          <motion.h2
            id="heritage-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[28px] md:text-[32px] font-[800] text-[#0A1628] leading-[1.3] tracking-[-0.02em] mb-5"
          >
            1998년, <span className="text-[#002C5F]">부산 중장비 업계의 기록.</span>
          </motion.h2>

          <div className="space-y-3">
            {heritageFull.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="text-[14px] md:text-[15px] text-[#3A4A5F] leading-[1.75]"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-[12px] text-[#6B7B8F] mt-5 pt-4 border-t border-[#E3E8EF]"
          >
            {heritageFull.attribution}
          </motion.p>

          {/* 전문 읽기 + §6.1 출처 링크 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2"
          >
            <a
              href="/story"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#002C5F] hover:text-[#0046A4] transition-colors"
            >
              철연 이야기 전문 읽기
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={busanIlbo.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6B7B8F] hover:text-[#002C5F] transition-colors"
            >
              부산일보 1998.02.24 원문
              <span aria-hidden="true">↗</span>
            </a>
          </motion.div>
        </div>

        {/* ═══ RIGHT — 부산일보 1998 지면 재현 ═══ */}
        <motion.article
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative bg-white border border-[#E3E8EF] rounded-xl p-7 md:p-8"
          style={{
            boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)",
            fontFamily: "var(--font-plex-kr), serif",
          }}
          aria-label={`${busanIlbo.publisher} ${busanIlbo.date} 기사 재현`}
        >
          {/* 釜山日報 워터마크 */}
          <span
            className="absolute top-4 right-5 text-[11px] text-[#9AA8B8]"
            style={{ letterSpacing: "0.3em" }}
            aria-hidden="true"
          >
            釜山日報
          </span>

          {/* 날짜 캡션 */}
          <p
            className="text-[11px] text-[#6B7B8F] mb-3"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {busanIlbo.date} · {busanIlbo.publisher}
          </p>

          {/* 헤드라인 — 굵은 밑줄 (1990년대 신문 지면 시뮬) */}
          <h3
            className="inline-block text-[18px] md:text-[20px] font-bold text-[#0A1628] pb-2 mb-2"
            style={{ borderBottom: "2px solid #0A1628" }}
          >
            {busanIlbo.headline}
          </h3>

          <p className="text-[12px] md:text-[13px] text-[#3A4A5F] mb-4 mt-2">
            {busanIlbo.subhead}
          </p>

          {/* 본문 — 나철연 이름에 형광펜 하이라이트 */}
          <p
            className="text-[13px] md:text-[14px] text-[#3A4A5F]"
            style={{ lineHeight: 1.85 }}
          >
            {busanIlbo.body.split(busanIlbo.highlightName).map((chunk, i, arr) => (
              <span key={i}>
                {chunk}
                {i < arr.length - 1 && (
                  <span
                    className="font-bold text-[#0A1628]"
                    style={{
                      background: "linear-gradient(transparent 60%, #FFE082 60%)",
                    }}
                  >
                    {busanIlbo.highlightName}
                  </span>
                )}
              </span>
            ))}
          </p>
        </motion.article>
      </div>
    </section>
  );
}
