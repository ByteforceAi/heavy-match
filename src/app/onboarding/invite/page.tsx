"use client";

/**
 * 철연 CHEOLYEON — Onboarding Step 3/5 · 팀원 초대
 *
 * 역할(현장소장·중장비사장·기사·콜센터 상담원·영업사원) 다중 선택 가능.
 * 이메일 + 전화번호로 추가. 초대 목록 렌더링 + 제거 허용.
 * 이 단계는 건너뛰기 허용.
 */

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/motion/MotionPrimitives";
import {
  OnboardingShell,
  OnboardingCtaRow,
  patchOnboardingState,
  readOnboardingState,
  type OnboardingInvite,
} from "../_shared";

const ROLES: ReadonlyArray<{ value: string; label: string; icon: string }> = [
  { value: "site-manager", label: "현장소장", icon: "engineering" },
  { value: "equipment-owner", label: "중장비사장", icon: "precision_manufacturing" },
  { value: "operator", label: "기사", icon: "construction" },
  { value: "call-agent", label: "콜센터 상담원", icon: "support_agent" },
  { value: "sales", label: "영업사원", icon: "handshake" },
];

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function roleLabel(value: string): string {
  return ROLES.find((r) => r.value === value)?.label ?? value;
}

export default function InvitePage() {
  const router = useRouter();

  const [selectedRoles, setSelectedRoles] = useState<string[]>(["site-manager"]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [invited, setInvited] = useState<OnboardingInvite[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const s = readOnboardingState();
    if (s.invites) setInvited(s.invites);
  }, []);

  const canAdd = useMemo(
    () => selectedRoles.length > 0 && isValidEmail(email) && phone.replace(/\D/g, "").length >= 9,
    [selectedRoles, email, phone],
  );

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const handleAdd = () => {
    if (!canAdd) {
      setError("역할·이메일·전화번호를 모두 채운다.");
      return;
    }
    setError(null);
    const additions: OnboardingInvite[] = selectedRoles.map((role) => ({
      role,
      email: email.trim(),
      phone,
    }));
    const next = [...invited, ...additions];
    setInvited(next);
    patchOnboardingState({ invites: next });
    setEmail("");
    setPhone("");
  };

  const handleRemove = (idx: number) => {
    const next = invited.filter((_, i) => i !== idx);
    setInvited(next);
    patchOnboardingState({ invites: next });
  };

  const commit = (dest: string) => {
    patchOnboardingState({ invites: invited });
    router.push(dest);
  };

  return (
    <OnboardingShell step={3}>
      <Reveal delay={0.05}>
        <h1 className="text-[28px] md:text-[32px] font-[800] text-[#0A1628] tracking-[-0.02em] mb-2">
          팀원 초대
        </h1>
        <p
          className="text-[14px] md:text-[15px] text-[#3A4A5F] leading-[1.75] mb-8"
          style={{ fontFamily: "'IBM Plex Sans KR', Pretendard, serif" }}
        >
          역할을 선택하고 이메일·전화번호로 초대한다. 한 사람에게 복수 역할을 부여할 수 있다.
          초대 링크는 자정 기준 24시간 동안 유효하다.
        </p>
      </Reveal>

      {/* 역할 선택 */}
      <Reveal delay={0.1}>
        <div className="mb-5">
          <p className="text-[13px] font-bold text-[#0A1628] mb-2">
            역할 <span className="text-[11px] font-normal text-[#6B7B8F]">(중복 가능)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => {
              const active = selectedRoles.includes(r.value);
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => toggleRole(r.value)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[13px] transition-colors ${
                    active
                      ? "bg-[#002C5F] border-[#002C5F] text-white"
                      : "bg-white border-[#E3E8EF] text-[#3A4A5F] hover:border-[#002C5F]/40"
                  }`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 16, fontVariationSettings: active ? "'FILL' 1" : undefined }}
                    aria-hidden="true"
                  >
                    {r.icon}
                  </span>
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* 이메일 / 전화 */}
      <Reveal delay={0.15}>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-[13px] font-bold text-[#0A1628] mb-1.5">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              className="w-full px-4 py-3 bg-white border border-[#E3E8EF] rounded-lg focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/15 text-[14px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-[#0A1628] mb-1.5">전화번호</label>
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="010-0000-0000"
              autoComplete="tel"
              className="w-full px-4 py-3 bg-white border border-[#E3E8EF] rounded-lg focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/15 text-[14px] tabular-nums"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#E8F1FB] text-[#002C5F] hover:bg-[#D4E5F7] disabled:bg-[#F4F6FA] disabled:text-[#9AA8B8] disabled:cursor-not-allowed text-[13px] font-bold transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }} aria-hidden="true">
            person_add
          </span>
          추가
        </button>
        {error && <p className="mt-2 text-[12px] text-[#E5484D]">{error}</p>}
      </Reveal>

      {/* 초대 목록 */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] font-bold text-[#0A1628]">
            초대 목록{" "}
            <span
              className="text-[#6B7B8F] tabular-nums"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              ({invited.length})
            </span>
          </p>
        </div>
        {invited.length === 0 ? (
          <div className="bg-[#F4F6FA] border border-dashed border-[#E3E8EF] rounded-xl p-6 text-center">
            <span
              className="material-symbols-outlined text-[#9AA8B8] mb-1.5 block"
              style={{ fontSize: 28 }}
              aria-hidden="true"
            >
              group_add
            </span>
            <p className="text-[12px] text-[#6B7B8F]">등록된 팀원이 없다. 역할과 연락처를 추가한다.</p>
          </div>
        ) : (
          <ul className="space-y-2 list-none p-0 m-0">
            {invited.map((inv, idx) => (
              <li
                key={`${inv.email}-${inv.role}-${idx}`}
                className="flex items-center gap-3 bg-white border border-[#E3E8EF] rounded-xl px-4 py-3"
              >
                <div className="w-8 h-8 bg-[#E8F1FB] rounded-full flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-[#002C5F]"
                    style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    person
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[12px] font-bold text-[#002C5F] bg-[#E8F1FB] px-1.5 py-0.5 rounded">
                      {roleLabel(inv.role)}
                    </span>
                    <span className="text-[13px] text-[#0A1628] truncate">{inv.email}</span>
                  </div>
                  <p
                    className="text-[11px] text-[#6B7B8F] tabular-nums"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    {inv.phone}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  aria-label="삭제"
                  className="w-8 h-8 rounded-lg text-[#6B7B8F] hover:bg-[#FEEBEC] hover:text-[#E5484D] transition-colors flex items-center justify-center flex-shrink-0"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18 }}
                    aria-hidden="true"
                  >
                    close
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <OnboardingCtaRow
        onBack={() => router.push("/onboarding/company")}
        onNext={() => commit("/onboarding/equipment")}
        nextLabel="다음"
        secondary={
          <button
            type="button"
            onClick={() => commit("/onboarding/equipment")}
            className="text-[13px] text-[#6B7B8F] hover:text-[#002C5F] underline underline-offset-4 transition-colors px-2"
          >
            이 단계는 건너뛰기
          </button>
        }
      />
    </OnboardingShell>
  );
}
