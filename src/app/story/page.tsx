"use client";

/**
 * /story — 철연 이야기 (Standalone Heritage Page)
 *
 * heritage-v1.md §5 노출 레벨 L3 완전 구현.
 *   - §2.1 전문(全文) 4문단 (판결문 어미)
 *   - §2.3 태그라인
 *   - §2.4 영문 번역
 *   - §6.1 부산일보 1998.02.24 기사 재현
 *   - 1998 → 2026 28년 경과 타임라인
 *
 * 랜딩의 HeritageSection은 "스니펫", 이 페이지는 "전문 열람".
 * 영업 제안 시 단독 링크 공유 · 외부 파트너 심층 공유용.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import {
  heritageFull,
  heritageTagline,
  heritageEnglish,
  busanIlbo,
  nav as navCopy,
  footer as footerCopy,
} from "@/content/copy";

// ═══════════════════════════════════════
// PAGE METADATA — /story 전용 OG
// heritage-v1.md §5 L3 메타 최적화
// ═══════════════════════════════════════
// Note: "use client" 컴포넌트에서는 metadata export 불가. layout 분리 고려했으나
// /story 전용 layout 없이 metadata 생성 함수로 처리.

export default function StoryPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {/* ═══ Sticky Nav ═══ */}
      <StoryNav />

      {/* ═══ 1. Hero — 대형 타이틀 + §2.3 태그라인 ═══ */}
      <HeroSection />

      {/* ═══ 2. §2.1 전문(全文) 4문단 ═══ */}
      <FullTextSection />

      {/* ═══ 3. 부산일보 1998.02.24 기사 재현 ═══ */}
      <BusanIlboSection />

      {/* ═══ 4. 1998 → 2026 28년 시간축 ═══ */}
      <TimelineSection />

      {/* ═══ 5. §2.4 영문 번역 (Canonical English) ═══ */}
      <EnglishSection />

      {/* ═══ 6. Creator Attribution + CTA ═══ */}
      <CreatorSection />

      {/* ═══ Footer ═══ */}
      <StoryFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function StoryNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6"
      style={{ backdropFilter: "blur(12px) saturate(180%)" }}
    >
      <Link href="/" className="flex items-baseline gap-2.5" aria-label="철연 홈">
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

      <div className="ml-auto flex items-center gap-3">
        <Link
          href="/"
          className="text-[13px] font-medium text-[#3A4A5F] hover:text-[#002C5F] transition-colors px-3 py-2 flex items-center gap-1 min-h-0"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            arrow_back
          </span>
          메인으로
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// 1. HERO
// ═══════════════════════════════════════
function HeroSection() {
  return (
    <section
      className="relative border-b border-[#E3E8EF] overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 80% 20%, rgba(0,170,210,0.06) 0%, transparent 55%),
          radial-gradient(ellipse at 0% 80%, rgba(0,44,95,0.05) 0%, transparent 50%),
          linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 100%)
        `,
      }}
    >
      <div className="max-w-[880px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-5"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          CHEOLYEON · 계보(系譜) · L3 DISCLOSURE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-[900] text-[#0A1628] mb-5"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
          }}
        >
          철연의 유래
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[18px] md:text-[22px] text-[#3A4A5F] leading-[1.55]"
          style={{
            fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
            letterSpacing: "-0.02em",
          }}
        >
          {heritageTagline}
        </motion.p>

        {/* 1998 → 2026 마커 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex items-center gap-5 text-[11px]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          <span className="text-[#0A1628] font-bold tracking-[0.2em]">1998</span>
          <span className="flex-1 h-[1px] bg-gradient-to-r from-[#002C5F] via-[#00AAD2] to-[#002C5F] relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F8FAFD] px-2 text-[#6B7B8F] tracking-[0.15em]">
              28년
            </span>
          </span>
          <span className="text-[#002C5F] font-bold tracking-[0.2em]">2026</span>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 2. §2.1 전문(全文)
// ═══════════════════════════════════════
function FullTextSection() {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-[720px] mx-auto px-6 md:px-12">
        <div className="space-y-7">
          {heritageFull.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="text-[16px] md:text-[18px] text-[#0A1628]"
              style={{
                fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
                lineHeight: 1.9,
                letterSpacing: "-0.015em",
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 3. 부산일보 기사 재현 (대형)
// ═══════════════════════════════════════
function BusanIlboSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-[#E3E8EF]">
      <div className="max-w-[880px] mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-6"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          PRIMARY SOURCE · 1차 사료
        </motion.p>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative bg-white border border-[#E3E8EF] rounded-2xl p-8 md:p-10"
          style={{
            boxShadow: "0 20px 50px rgba(0, 44, 95, 0.08)",
            fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
          }}
          aria-label={`${busanIlbo.publisher} ${busanIlbo.date} 기사 재현`}
        >
          <span
            className="absolute top-6 right-8 text-[13px] text-[#9AA8B8]"
            style={{ letterSpacing: "0.3em" }}
            aria-hidden="true"
          >
            釜山日報
          </span>

          <p
            className="text-[12px] text-[#6B7B8F] mb-4 tracking-[0.15em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {busanIlbo.date} · {busanIlbo.publisher}
          </p>

          <h2
            className="inline-block text-[24px] md:text-[28px] font-bold text-[#0A1628] pb-3 mb-3"
            style={{ borderBottom: "3px solid #0A1628" }}
          >
            {busanIlbo.headline}
          </h2>

          <p className="text-[14px] md:text-[15px] text-[#3A4A5F] mb-6 mt-3">
            {busanIlbo.subhead}
          </p>

          <p
            className="text-[15px] md:text-[16px] text-[#3A4A5F]"
            style={{ lineHeight: 2 }}
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

          <div className="mt-8 pt-6 border-t border-[#E3E8EF] flex items-center justify-between">
            <span
              className="text-[11px] text-[#6B7B8F] tracking-[0.15em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              A등급 1차 사료 · 부산일보 저작권
            </span>
            <a
              href={busanIlbo.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-[#002C5F] hover:text-[#0046A4] transition-colors inline-flex items-center gap-1.5"
            >
              원문 보기
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 4. 1998 → 2026 28년 시간축
// ═══════════════════════════════════════
function TimelineSection() {
  const entries = [
    {
      year: "1998",
      date: "02.24",
      title: "부산일보 보도",
      body: "대한건설기계협회 부산지회 기종분과회 위원장 나철연이 업계 3대 의제를 공표한다.",
      emphasis: true,
    },
    {
      year: "1998",
      date: "同年",
      title: "사재 처분",
      body: "업계 동료들의 자금난을 해소하고자 하였으나 회수되지 않았다.",
      emphasis: true,
    },
    {
      year: "1998 ~ 2026",
      date: "28년",
      title: "제도 미응답",
      body: "그의 요구는 제도로 응답받지 못한 채 시간이 경과한다. 같은 문제가 오늘의 건설 현장에서 동일하게 반복된다.",
      emphasis: false,
    },
    {
      year: "2026",
      date: "04.17",
      title: "철연 CHEOLYEON 재설계",
      body: "업의 구조를 시스템으로 재설계하여, 1998년의 문제를 2026년의 기술 위에서 종결하는 것을 목표로 한다.",
      emphasis: true,
    },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-[880px] mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          TIMELINE · 계보 연표
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[24px] md:text-[32px] font-[800] text-[#0A1628] tracking-[-0.02em] mb-12"
        >
          기록된 의제, <span className="text-[#002C5F]">28년 후 시스템으로.</span>
        </motion.h2>

        <div className="relative">
          {/* 세로 연결선 */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#002C5F] via-[#E3E8EF] to-[#002C5F]"
          />

          <div className="space-y-8 md:space-y-10">
            {entries.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative pl-14 md:pl-16"
              >
                {/* 점 */}
                <div
                  className={`absolute left-[11px] md:left-[15px] top-2 w-[18px] h-[18px] rounded-full border-[3px] ${
                    e.emphasis
                      ? "bg-[#002C5F] border-white"
                      : "bg-white border-[#E3E8EF]"
                  }`}
                  style={{
                    boxShadow: e.emphasis
                      ? "0 0 0 4px rgba(0, 44, 95, 0.12)"
                      : "none",
                  }}
                  aria-hidden="true"
                />

                <div className="flex items-baseline gap-3 mb-1.5">
                  <span
                    className="text-[13px] font-bold text-[#002C5F] tracking-[0.1em]"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    {e.year}
                  </span>
                  <span
                    className="text-[11px] text-[#6B7B8F]"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    {e.date}
                  </span>
                </div>
                <h3
                  className="text-[17px] md:text-[19px] font-[800] text-[#0A1628] mb-2"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {e.title}
                </h3>
                <p
                  className="text-[14px] md:text-[15px] text-[#3A4A5F]"
                  style={{
                    fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
                    lineHeight: 1.75,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {e.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 5. §2.4 영문 번역
// ═══════════════════════════════════════
function EnglishSection() {
  return (
    <section className="py-20 md:py-24 bg-[#0A1628] text-white">
      <div className="max-w-[880px] mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[11px] font-bold text-[#00AAD2] tracking-[0.25em] mb-4"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          CANONICAL ENGLISH · §2.4
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-[900] mb-10"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          {heritageEnglish.title}
        </motion.h2>

        <div className="space-y-6">
          {heritageEnglish.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="text-[15px] md:text-[16px] text-[#D1D5DB]"
              style={{
                fontFamily: "'IBM Plex Sans KR', Inter, serif",
                lineHeight: 1.85,
                letterSpacing: "-0.005em",
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-10 pt-6 border-t border-white/15 text-[13px] text-[#9AA8B8] italic"
        >
          {heritageEnglish.attribution}
        </motion.p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 6. Creator Attribution + CTA
// ═══════════════════════════════════════
function CreatorSection() {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-[720px] mx-auto px-6 md:px-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-4"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          CREATOR · §2.1 ATTRIBUTION
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[18px] md:text-[20px] text-[#0A1628] mb-2"
          style={{
            fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
            lineHeight: 1.6,
            letterSpacing: "-0.015em",
          }}
        >
          {heritageFull.attribution}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-[13px] text-[#6B7B8F] mb-10"
        >
          BYTEFORCE는 철연 CHEOLYEON을 운영하는 플랫폼 기업이다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#002C5F] hover:bg-[#0046A4] text-white text-[14px] font-bold rounded-lg transition-colors min-h-0"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              arrow_back
            </span>
            메인으로
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#F4F6FA] text-[#0A1628] text-[14px] font-bold rounded-lg border border-[#E3E8EF] transition-colors min-h-0"
          >
            데모 체험
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              arrow_forward
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function StoryFooter() {
  return (
    <footer className="border-t border-[#E3E8EF] py-8 bg-[#EEF1F5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[15px] font-black text-[#002C5F] tracking-[-0.03em]">
            {footerCopy.brand.ko}
          </span>
          <span
            className="text-[9px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {footerCopy.brand.en}
          </span>
          <span className="text-[11px] text-[#6B7B8F] ml-2">{footerCopy.company}</span>
        </div>
        <p className="text-[11px] text-[#9AA8B8]">{footerCopy.copyright}</p>
      </div>
    </footer>
  );
}

// metadata는 /story/layout.tsx 서버 컴포넌트에서 export된다.
