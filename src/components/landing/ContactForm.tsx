"use client";

/**
 * Contact / Inquiry Form — 8천만원 구매 결정 지점의 리드 캡처
 *
 * Supabase 저장 + 관리자 이메일 알림은 2차 구현.
 * 현재는 localStorage + console.log 기반 mock — 구매자에게는 "제출됨" 피드백.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motion as tokens } from "@/lib/design-system";

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

  const submit = async () => {
    if (!data.name || !data.company || !data.phone) {
      alert("이름, 회사명, 연락처는 필수입니다.");
      return;
    }
    setSubmitting(true);

    // Mock API — 실제 배포 시 /api/inquiry 엔드포인트로 POST
    await new Promise((r) => setTimeout(r, 1200));
    try {
      const inquiries = JSON.parse(localStorage.getItem("hm-inquiries") || "[]");
      inquiries.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem("hm-inquiries", JSON.stringify(inquiries));
    } catch {
      // storage fail — 무시
    }
    console.info("[Heavy Match Inquiry]", data);

    setSubmitting(false);
    setDone(true);
    setTimeout(() => { setDone(false); setData(EMPTY); }, 6000);
  };

  const field = (key: keyof FormData, label: string, type: string = "text", required = false, placeholder = "") => (
    <div>
      <label className="block text-xs font-semibold text-[#9CA3AF] mb-1.5 uppercase tracking-wider">
        {label} {required && <span className="text-[#FF6B1A]">*</span>}
      </label>
      <input
        type={type}
        value={data[key]}
        onChange={(e) => setData({ ...data, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-[#121216] border border-[#3A3D45]/60 rounded-xl text-[#FAFAFA] placeholder:text-[#3A3D45] focus:outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/20 transition-colors"
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
          className="bg-[#1A1A20] border border-[#10B98140] rounded-2xl p-12 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#10B98120] flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-[#10B981]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h3 className="text-2xl font-[800] text-[#FAFAFA] mb-2" style={{ letterSpacing: "-0.02em" }}>문의가 접수되었습니다</h3>
          <p className="text-sm text-[#9CA3AF]">24시간 이내에 <span className="text-[#FF6B1A] font-bold">{data.name}</span>님께 연락드리겠습니다.</p>
          <p className="text-xs text-[#6B7280] mt-4">담당자: BYTEFORCE 사업개발팀</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          className="bg-[#1A1A20] border border-[#3A3D45]/40 rounded-2xl p-6 md:p-8 space-y-4"
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
            <label className="block text-xs font-semibold text-[#9CA3AF] mb-1.5 uppercase tracking-wider">역할</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["렌탈업체 대표", "건설사 임원", "콜센터 운영", "기타"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setData({ ...data, role: r })}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                    data.role === r
                      ? "bg-[#FF6B1A] text-white"
                      : "bg-[#242428] text-[#9CA3AF] hover:text-[#FAFAFA] border border-[#3A3D45]/60"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA3AF] mb-1.5 uppercase tracking-wider">문의 내용</label>
            <textarea
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              rows={4}
              placeholder="도입 규모, 일정, 커스터마이징 범위 등 자유롭게 작성해주세요."
              className="w-full px-4 py-3 bg-[#121216] border border-[#3A3D45]/60 rounded-xl text-[#FAFAFA] placeholder:text-[#3A3D45] focus:outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/20 transition-colors resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: submitting ? 1 : 1.01 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
            transition={tokens.spring.snappy}
            className="w-full py-4 bg-[#FF6B1A] hover:bg-[#FF8A4C] disabled:bg-[#3A3D45] text-white font-bold rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                전송 중...
              </>
            ) : (
              <>
                상담 신청하기
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </motion.button>

          <p className="text-[11px] text-[#6B7280] text-center">
            제출된 정보는 상담 목적으로만 사용되며 24시간 이내에 담당자가 연락드립니다.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
