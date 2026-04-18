"use client";

/**
 * Contact / Inquiry Form — 8천만원 구매 결정 지점의 리드 캡처
 *
 * v2 철연 CHEOLYEON HD Navy 라이트 테마.
 * POST /api/inquiry → Supabase 저장 + Resend 관리자 메일 알림.
 * 네트워크 장애 시 localStorage 임시 저장 폴백 유지.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as tokens } from "@/lib/design-system";
import { Events } from "@/lib/analytics";

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  role: string;
  message: string;
}

const EMPTY: FormData = { name: "", company: "", phone: "", email: "", role: "", message: "" };

export default function ContactForm() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!data.name || !data.company || !data.phone) {
      setError("이름, 회사명, 연락처는 필수 입력 항목이다.");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; id?: string; emailed?: boolean }
        | null;

      if (!res.ok || !payload?.ok) {
        const msg =
          payload?.error ||
          (res.status === 429
            ? "요청이 일시적으로 제한되었다. 잠시 후 다시 시도한다."
            : "전송이 실패했다. 잠시 후 다시 시도한다.");
        setError(msg);
        setSubmitting(false);
        return;
      }

      console.info("[CHEOLYEON Inquiry] 접수 완료:", {
        id: payload.id,
        emailed: payload.emailed,
      });

      // Analytics — 상담 제출 성공 시 3중 스택에 이벤트 전송.
      Events.contactFormSubmitted(data.role || "unspecified");

      setSubmitting(false);
      setDone(true);
      setTimeout(() => {
        setDone(false);
        setData(EMPTY);
      }, 6000);
    } catch (networkErr) {
      // 네트워크 단절: localStorage 폴백 저장
      console.warn("[CHEOLYEON Inquiry] 네트워크 오류, 임시 저장으로 폴백:", networkErr);
      try {
        const inquiries = JSON.parse(localStorage.getItem("cy-inquiries-pending") || "[]");
        inquiries.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem("cy-inquiries-pending", JSON.stringify(inquiries));
        setError("임시 저장되었다. 네트워크 복구 후 자동 재전송한다.");
      } catch {
        setError("전송이 실패했다. 잠시 후 다시 시도한다.");
      }
      setSubmitting(false);
    }
  };

  const field = (
    key: keyof FormData,
    label: string,
    type: string = "text",
    required = false,
    placeholder = ""
  ) => (
    <div>
      <label
        className="block text-[11px] font-semibold text-[#6B7B8F] mb-1.5 uppercase tracking-[0.1em]"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        {label} {required && <span className="text-[#E5484D]">*</span>}
      </label>
      <input
        type={type}
        value={data[key]}
        onChange={(e) => setData({ ...data, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-[#E3E8EF] rounded-lg text-[#0A1628] placeholder:text-[#9AA8B8] focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/15 transition-colors"
      />
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={tokens.spring.bouncy}
          className="bg-white border border-[#00A86B]/30 rounded-2xl p-12 text-center"
          style={{ boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)" }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00A86B]/10 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[#00A86B]"
              style={{ fontSize: 36, fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <h3
            className="text-[22px] font-[800] text-[#0A1628] mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            문의가 접수되었다
          </h3>
          <p className="text-[14px] text-[#3A4A5F]">
            24시간 이내에{" "}
            <span className="text-[#002C5F] font-bold">{data.name}</span>님께 연락을 회신한다.
          </p>
          <p className="text-[12px] text-[#6B7B8F] mt-4">담당자: BYTEFORCE 사업개발팀</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="bg-white border border-[#E3E8EF] rounded-2xl p-6 md:p-8 space-y-4"
          style={{ boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)" }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {field("name", "이름", "text", true, "김구매")}
            {field("company", "회사명", "text", true, "ABC 중장비")}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {field("phone", "연락처", "tel", true, "010-1234-5678")}
            {field("email", "이메일", "email", false, "contact@abc.co.kr")}
          </div>

          <div>
            <label
              className="block text-[11px] font-semibold text-[#6B7B8F] mb-1.5 uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              역할
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["렌탈업체 대표", "건설사 임원", "콜센터 운영", "기타"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setData({ ...data, role: r })}
                  className={`px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all active:scale-[0.98] ${
                    data.role === r
                      ? "bg-[#002C5F] text-white border border-[#002C5F]"
                      : "bg-white text-[#3A4A5F] hover:text-[#002C5F] hover:border-[#002C5F]/40 border border-[#E3E8EF]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              className="block text-[11px] font-semibold text-[#6B7B8F] mb-1.5 uppercase tracking-[0.1em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              문의 내용
            </label>
            <textarea
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              rows={4}
              placeholder="도입 규모, 일정, 커스터마이징 범위 등 자유롭게 작성."
              className="w-full px-4 py-3 bg-white border border-[#E3E8EF] rounded-lg text-[#0A1628] placeholder:text-[#9AA8B8] focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/15 transition-colors resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: submitting ? 1 : 1.01 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
            transition={tokens.spring.snappy}
            className="w-full py-4 bg-[#002C5F] hover:bg-[#0046A4] disabled:bg-[#9AA8B8] text-white font-bold rounded-lg text-[15px] transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  aria-hidden="true"
                />
                전송 중
              </>
            ) : (
              <>
                상담 신청
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  arrow_forward
                </span>
              </>
            )}
          </motion.button>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={tokens.spring.snappy}
              role="alert"
              className="px-4 py-3 bg-[#E5484D]/8 border border-[#E5484D]/30 rounded-lg text-[13px] text-[#E5484D] flex items-start gap-2"
            >
              <span
                className="material-symbols-outlined mt-[1px]"
                style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                error
              </span>
              <span className="leading-relaxed">{error}</span>
            </motion.div>
          )}

          <p className="text-[11px] text-[#6B7B8F] text-center">
            제출된 정보는 상담 목적으로만 사용되며 24시간 이내에 담당자가 연락을 회신한다.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
