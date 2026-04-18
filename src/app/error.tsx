"use client";

/**
 * Global Error Boundary — error.tsx
 *
 * Next.js App Router 컨벤션. 런타임 에러 발생 시 렌더.
 * Client-side 렌더 전용 (use client 필수).
 */

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { nav as navCopy } from "@/content/copy";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 프로덕션에서는 Sentry 등으로 전송. 현 시점 console만.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[CHEOLYEON Error]", error);
    }
  }, [error]);

  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628] flex flex-col"
      style={{
        fontFamily: "'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
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

      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-[640px] w-full text-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#E5484D]/10 flex items-center justify-center"
          >
            <span
              className="material-symbols-outlined text-[#E5484D]"
              style={{ fontSize: 44, fontVariationSettings: "'FILL' 1" }}
            >
              error
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[11px] font-bold text-[#E5484D] tracking-[0.25em] mb-4"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            ERROR · 예외 발생
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[28px] md:text-[34px] font-[900] text-[#0A1628] tracking-[-0.02em] mb-3"
          >
            예상하지 못한 오류가 발생했다
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="text-[14px] text-[#6B7B8F] mb-8 leading-[1.75]"
            style={{ fontFamily: "'IBM Plex Sans KR', Pretendard, serif" }}
          >
            자동으로 기록되었다. 담당 엔지니어가 확인한다.
            <br />
            아래 버튼으로 다시 시도하거나 메인으로 복귀한다.
          </motion.p>

          {/* Error digest (prod debugging) */}
          {error.digest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-6 inline-block px-3 py-1.5 bg-[#F4F6FA] border border-[#E3E8EF] rounded-lg"
            >
              <span
                className="text-[11px] text-[#6B7B8F] tracking-[0.1em]"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                Error ID: <span className="text-[#0A1628] font-bold">{error.digest}</span>
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-2.5 mb-8"
          >
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#002C5F] hover:bg-[#0046A4] text-white text-[14px] font-bold rounded-lg transition-colors min-h-0"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                refresh
              </span>
              다시 시도
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#F4F6FA] text-[#0A1628] border border-[#E3E8EF] text-[14px] font-bold rounded-lg transition-colors min-h-0"
            >
              메인으로
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="pt-6 border-t border-[#E3E8EF] text-[11px] text-[#9AA8B8]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            지속 발생 시 {" "}
            <a
              href="mailto:ceo@byteforce.ai.kr"
              className="text-[#002C5F] hover:text-[#0046A4] font-medium"
            >
              ceo@byteforce.ai.kr
            </a>
            {error.digest && ` · Error ID ${error.digest} 포함`}
          </motion.p>
        </div>
      </section>
    </main>
  );
}
