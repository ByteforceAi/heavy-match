"use client";

/**
 * 철연 CHEOLYEON — Onboarding Step 2/5 · 회사 정보
 *
 * 상호 / 사업자등록번호 (000-00-00000 포맷) / 업종 / 직원 규모.
 * heritage-v1.md §3 금지 카피 / §4 허용 구조 준수.
 */

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/motion/MotionPrimitives";
import {
  OnboardingShell,
  OnboardingCtaRow,
  patchOnboardingState,
  readOnboardingState,
} from "../_shared";

const INDUSTRIES: ReadonlyArray<{ value: string; label: string }> = [
  { value: "construction", label: "건설" },
  { value: "equipment-rental", label: "장비임대" },
  { value: "etc", label: "기타" },
];

const SIZES: ReadonlyArray<{ value: string; label: string; sub: string }> = [
  { value: "1-9", label: "1–9", sub: "소기업" },
  { value: "10-49", label: "10–49", sub: "중소기업" },
  { value: "50-199", label: "50–199", sub: "중견기업" },
  { value: "200+", label: "200+", sub: "대기업" },
];

function formatBizNo(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

export default function CompanyPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [bizNo, setBizNo] = useState("");
  const [industry, setIndustry] = useState("construction");
  const [size, setSize] = useState("10-49");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const s = readOnboardingState();
    if (s.company) {
      setName(s.company.name ?? "");
      setBizNo(s.company.bizNo ?? "");
      setIndustry(s.company.industry ?? "construction");
      setSize(s.company.size ?? "10-49");
    }
  }, []);

  const bizNoValid = useMemo(
    () => /^\d{3}-\d{2}-\d{5}$/.test(bizNo),
    [bizNo],
  );
  const nameValid = name.trim().length >= 2;
  const formValid = nameValid && bizNoValid;

  const handleNext = () => {
    setSubmitted(true);
    if (!formValid) return;
    patchOnboardingState({
      company: { name: name.trim(), bizNo, industry, size },
    });
    router.push("/onboarding/invite");
  };

  return (
    <OnboardingShell step={2}>
      <Reveal delay={0.05}>
        <h1 className="text-[28px] md:text-[32px] font-[800] text-[#0A1628] tracking-[-0.02em] mb-2">
          회사 정보
        </h1>
        <p
          className="text-[14px] md:text-[15px] text-[#3A4A5F] leading-[1.75] mb-8"
          style={{ fontFamily: "'IBM Plex Sans KR', Pretendard, serif" }}
        >
          사업자 단위로 계정이 고정된다. 이후 단계의 팀원·장비·단가는 이 법인에 귀속된다.
        </p>
      </Reveal>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
        noValidate
      >
        {/* 상호 */}
        <Reveal delay={0.1}>
          <div>
            <label className="block text-[13px] font-bold text-[#0A1628] mb-1.5">
              상호 <span className="text-[#E5484D]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 부산중기 주식회사"
              autoComplete="organization"
              className="w-full px-4 py-3 bg-white border border-[#E3E8EF] rounded-lg focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/15 text-[14px]"
              aria-invalid={submitted && !nameValid}
            />
            {submitted && !nameValid && (
              <p className="mt-1.5 text-[12px] text-[#E5484D]">상호는 2자 이상으로 기재한다.</p>
            )}
          </div>
        </Reveal>

        {/* 사업자등록번호 */}
        <Reveal delay={0.15}>
          <div>
            <label className="block text-[13px] font-bold text-[#0A1628] mb-1.5">
              사업자등록번호 <span className="text-[#E5484D]">*</span>
              <span className="ml-2 font-normal text-[11px] text-[#6B7B8F]">000-00-00000</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={bizNo}
              onChange={(e) => setBizNo(formatBizNo(e.target.value))}
              placeholder="000-00-00000"
              autoComplete="off"
              className="w-full px-4 py-3 bg-white border border-[#E3E8EF] rounded-lg focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/15 text-[14px] tabular-nums"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              aria-invalid={submitted && !bizNoValid}
            />
            {submitted && !bizNoValid && (
              <p className="mt-1.5 text-[12px] text-[#E5484D]">
                10자리 사업자등록번호를 정확히 기재한다.
              </p>
            )}
          </div>
        </Reveal>

        {/* 업종 */}
        <Reveal delay={0.2}>
          <div>
            <label className="block text-[13px] font-bold text-[#0A1628] mb-1.5">업종</label>
            <div className="relative">
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full appearance-none px-4 py-3 pr-10 bg-white border border-[#E3E8EF] rounded-lg focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/15 text-[14px] text-[#0A1628]"
              >
                {INDUSTRIES.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7B8F]"
                style={{ fontSize: 20 }}
              >
                expand_more
              </span>
            </div>
          </div>
        </Reveal>

        {/* 직원 규모 */}
        <Reveal delay={0.25}>
          <div>
            <label className="block text-[13px] font-bold text-[#0A1628] mb-2">직원 규모</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SIZES.map((opt) => {
                const active = size === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSize(opt.value)}
                    aria-pressed={active}
                    className={`px-3 py-3 rounded-lg border text-left transition-colors ${
                      active
                        ? "bg-[#E8F1FB] border-[#002C5F] text-[#002C5F]"
                        : "bg-white border-[#E3E8EF] text-[#3A4A5F] hover:border-[#002C5F]/40"
                    }`}
                  >
                    <p
                      className="text-[14px] font-bold tabular-nums"
                      style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                    >
                      {opt.label}
                    </p>
                    <p className="text-[11px] opacity-80 mt-0.5">{opt.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <OnboardingCtaRow
            onBack={() => router.push("/onboarding/welcome")}
            onNext={handleNext}
            nextLabel="다음"
          />
        </Reveal>
      </form>
    </OnboardingShell>
  );
}
