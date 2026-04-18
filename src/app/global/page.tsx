"use client";

/**
 * /global — English Foundation Landing
 *
 * Single-page English surface for international lead capture.
 * Full i18n (SEA · Japanese · Arabic) planned in Phase 3 with next-intl.
 *
 * Content strategy:
 *   - Product-market fit signal (not a sales pitch)
 *   - Links to Korean /story for provenance
 *   - Contact path routed to ceo@byteforce.ai.kr
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { heritageEnglish } from "@/content/copy";

export default function GlobalLandingPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily: "'Inter', 'IBM Plex Sans KR', 'Pretendard', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {/* ═══ NAV ═══ */}
      <nav
        className="sticky top-0 z-50 h-[60px] bg-white/95 border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6"
        style={{ backdropFilter: "blur(12px) saturate(180%)" }}
      >
        <Link href="/global" className="flex items-baseline gap-2.5">
          <span className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]">
            CHEOLYEON
          </span>
          <span
            className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            철연
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/"
            className="text-[13px] font-medium text-[#3A4A5F] hover:text-[#002C5F] transition-colors px-3 py-2 min-h-0"
          >
            한국어
          </Link>
          <a
            href="#contact"
            className="text-[13px] font-semibold text-white bg-[#002C5F] hover:bg-[#0046A4] px-4 py-2 rounded-lg transition-colors min-h-0"
          >
            Contact Sales
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        className="relative border-b border-[#E3E8EF]"
        style={{
          background: `
            radial-gradient(ellipse at 80% 20%, rgba(0,170,210,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 80%, rgba(0,44,95,0.04) 0%, transparent 50%),
            linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 100%)
          `,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            CHEOLYEON · INTERNATIONAL
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-[900] text-[#0A1628] mb-5"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
            }}
          >
            Heavy equipment dispatch,
            <br />
            <span className="text-[#002C5F]">contract, and settlement —</span>
            <br />
            as a single system.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[18px] md:text-[20px] text-[#3A4A5F] leading-[1.6] max-w-[680px] mb-8"
            style={{ fontFamily: "'Inter', 'IBM Plex Sans KR', serif" }}
          >
            CHEOLYEON operates the unified B2B platform for construction
            equipment matching. 3-stage fallback dispatch eliminates missed
            calls. Electronic contracts and automated settlement protect the
            site&apos;s cash flow. Built in Busan, deploying globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#002C5F] hover:bg-[#0046A4] text-white text-[15px] font-bold rounded-lg transition-colors min-h-0"
            >
              Request a demo
              <span aria-hidden="true">→</span>
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-[#F4F6FA] text-[#0A1628] border border-[#E3E8EF] text-[15px] font-semibold rounded-lg transition-colors min-h-0"
            >
              See live product tour
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex gap-10 md:gap-14 pt-6 border-t border-[#E3E8EF]"
          >
            {[
              { value: "99.3%", label: "Match success rate" },
              { value: "2m 12s", label: "Avg match time" },
              { value: "183", label: "Active partners" },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className="text-[20px] md:text-[22px] font-[800] text-[#002C5F] tracking-[-0.02em] tabular-nums"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {item.value}
                </p>
                <p className="text-[11px] text-[#6B7B8F]">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ MARKET FIT ═══ */}
      <section className="py-20 md:py-24 bg-white border-b border-[#E3E8EF]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            MARKET FIT
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[28px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-10"
          >
            Where fragmented equipment rental meets construction demand
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                region: "Southeast Asia",
                countries: "Vietnam · Indonesia · Philippines · Thailand",
                fit: "High",
                fitColor: "#00A86B",
                note: "Construction boom · fragmented rental market · trust in Korean tech stack",
              },
              {
                region: "India",
                countries: "National rollout",
                fit: "High",
                fitColor: "#00A86B",
                note: "1.4B market · rapid digital adoption · English-operable",
              },
              {
                region: "Middle East",
                countries: "UAE · Saudi Arabia · Qatar",
                fit: "High",
                fitColor: "#00A86B",
                note: "NEOM · Vision 2030 infrastructure · high willingness to pay",
              },
              {
                region: "Japan",
                countries: "Greater Tokyo · Osaka",
                fit: "Medium",
                fitColor: "#FFB020",
                note: "Cultural alignment with Korea · conservative SaaS adoption curve",
              },
              {
                region: "Latin America",
                countries: "Brazil · Mexico",
                fit: "Medium",
                fitColor: "#FFB020",
                note: "Large market · slower enterprise SaaS penetration",
              },
              {
                region: "Western markets",
                countries: "US · EU",
                fit: "Deferred",
                fitColor: "#9AA8B8",
                note: "Saturated (Trimble · HCSS) — not a primary focus",
              },
            ].map((m, i) => (
              <motion.div
                key={m.region}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-6 bg-white rounded-2xl border border-[#E3E8EF]"
                style={{ boxShadow: "0 4px 12px rgba(0, 44, 95, 0.04)" }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-[17px] font-bold text-[#0A1628]">{m.region}</h3>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${m.fitColor}15`,
                      color: m.fitColor,
                      fontFamily: "var(--font-roboto-mono), monospace",
                    }}
                  >
                    {m.fit}
                  </span>
                </div>
                <p
                  className="text-[11px] text-[#6B7B8F] mb-3 tracking-[0.05em]"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {m.countries}
                </p>
                <p className="text-[13px] text-[#3A4A5F] leading-[1.6]">{m.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HERITAGE BRIDGE ═══ */}
      <section className="py-20 md:py-24 bg-[#0A1628] text-white">
        <div className="max-w-[820px] mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-[#00AAD2] tracking-[0.25em] mb-4"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            HERITAGE · CANONICAL TEXT
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-[900] mb-8"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.25,
            }}
          >
            {heritageEnglish.title}
          </motion.h2>

          <div className="space-y-5">
            {heritageEnglish.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-[15px] md:text-[16px] text-[#D1D5DB]"
                style={{
                  fontFamily: "'Inter', 'IBM Plex Sans KR', serif",
                  lineHeight: 1.85,
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-6 border-t border-white/15"
          >
            <p className="text-[13px] text-[#9AA8B8] italic mb-3">
              {heritageEnglish.attribution}
            </p>
            <Link
              href="/story"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#00AAD2] hover:text-[#33BEDB] transition-colors"
            >
              Read full heritage (Korean + English)
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ WHAT WE OFFER ═══ */}
      <section className="py-20 md:py-24 border-b border-[#E3E8EF]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            PLATFORM
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[28px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-10"
          >
            Three structural fixes for one broken workflow
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "hub",
                title: "3-Stage Fallback Dispatch",
                body: "Exclusive call → callcenter relay → shared call. The equipment arrives regardless of the first reply. Average match: 2 minutes.",
              },
              {
                icon: "description",
                title: "Electronic Contracts",
                body: "No more verbal commitments. Every transaction is documented and the subcontracting structure is transparent.",
              },
              {
                icon: "payments",
                title: "Automated Settlement",
                body: "Work completion → scheduled payout → auto-reminder on default. A 48-hour rule returns the funds.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 bg-white rounded-2xl border border-[#E3E8EF]"
                style={{ boxShadow: "0 4px 12px rgba(0, 44, 95, 0.04)" }}
              >
                <div className="w-11 h-11 bg-[#E8F1FB] rounded-xl flex items-center justify-center mb-4">
                  <span
                    className="material-symbols-outlined text-[#002C5F]"
                    style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
                  >
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-[17px] font-bold text-[#0A1628] mb-2">{f.title}</h3>
                <p className="text-[13px] text-[#3A4A5F] leading-[1.7]">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-20 md:py-24 bg-[#F4F6FA]">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            CONTACT SALES
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[28px] md:text-[34px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-4"
          >
            Let&apos;s discuss your market
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[15px] text-[#3A4A5F] mb-8 leading-[1.75]"
            style={{ fontFamily: "'Inter', 'IBM Plex Sans KR', serif" }}
          >
            Pricing is calibrated per region — SEA partnership tier, MENA
            infrastructure tier, Japan enterprise tier. Reach out to request a
            tailored quote and technical overview deck.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-2xl border border-[#E3E8EF]"
            style={{ boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)" }}
          >
            <p className="text-[13px] text-[#6B7B8F] mb-3">Primary contact</p>
            <a
              href="mailto:ceo@byteforce.ai.kr"
              className="text-[20px] md:text-[22px] font-bold text-[#002C5F] hover:text-[#0046A4] transition-colors block mb-4"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              ceo@byteforce.ai.kr
            </a>
            <div
              className="text-[12px] text-[#6B7B8F] leading-[1.8]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              <p>Lee Han-gyeol · CEO, BYTEFORCE</p>
              <p>Response SLA: 24 hours (business days)</p>
              <p>HQ: Busan, Republic of Korea</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[#E3E8EF] py-8 bg-[#EEF1F5]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[16px] font-black text-[#002C5F] tracking-[-0.03em]">
              CHEOLYEON
            </span>
            <span
              className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              철연
            </span>
            <span className="text-[11px] text-[#6B7B8F] ml-2">
              A BYTEFORCE product · Operated from Busan, Korea
            </span>
          </div>
          <p className="text-[11px] text-[#9AA8B8]">© 2026 BYTEFORCE. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
