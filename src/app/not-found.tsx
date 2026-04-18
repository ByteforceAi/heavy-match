"use client";

/**
 * Global 404 — not-found.tsx
 *
 * Next.js App Router 컨벤션. 매칭되지 않는 경로 + notFound() 호출 시 렌더.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { nav as navCopy } from "@/content/copy";

export default function NotFound() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628] flex flex-col"
      style={{
        fontFamily: "'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {/* Minimal nav */}
      <nav className="h-[60px] bg-white/95 border-b border-[#E3E8EF] flex items-center px-6 md:px-8">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]">
            {navCopy.brand.ko}
          </span>
          <span
            className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {navCopy.brand.en}
          </span>
        </Link>
      </nav>

      <section
        className="flex-1 flex items-center justify-center px-6"
        style={{
          background: `
            radial-gradient(ellipse at 80% 20%, rgba(0,170,210,0.06) 0%, transparent 55%),
            radial-gradient(ellipse at 0% 80%, rgba(0,44,95,0.04) 0%, transparent 50%),
            linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 100%)
          `,
        }}
      >
        <div className="max-w-[640px] w-full text-center py-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            ERROR 404 · NOT FOUND
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[88px] md:text-[128px] font-black text-[#0A1628] tracking-[-0.04em] leading-[0.9] mb-4"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[18px] md:text-[20px] text-[#0A1628] mb-2 font-bold tracking-[-0.02em]"
          >
            요청한 경로는 기록되지 않았다
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[14px] text-[#6B7B8F] mb-10 leading-[1.75]"
            style={{ fontFamily: "'IBM Plex Sans KR', Pretendard, serif" }}
          >
            주소가 변경되었거나 삭제된 페이지일 수 있다.
            <br />
            아래 경로에서 원하는 것을 확인한다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2.5 mb-10"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#002C5F] hover:bg-[#0046A4] text-white text-[14px] font-bold rounded-lg transition-colors min-h-0"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                home
              </span>
              메인으로
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#F4F6FA] text-[#0A1628] border border-[#E3E8EF] text-[14px] font-bold rounded-lg transition-colors min-h-0"
            >
              데모 체험
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#F4F6FA] text-[#3A4A5F] border border-[#E3E8EF] text-[14px] font-semibold rounded-lg transition-colors min-h-0"
            >
              고객센터
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="pt-6 border-t border-[#E3E8EF]"
          >
            <p
              className="text-[11px] text-[#9AA8B8] tracking-[0.1em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              경로를 찾을 수 없다면 <a href="mailto:ceo@byteforce.ai.kr" className="text-[#002C5F] hover:text-[#0046A4] font-medium">ceo@byteforce.ai.kr</a> 로 문의
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
