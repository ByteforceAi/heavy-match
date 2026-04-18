"use client";

/**
 * 철연 CHEOLYEON — Onboarding Step 4/5 · 장비·단가 등록
 *
 * 8종 장비 매트릭스(크레인·굴삭기·스카이·펌프카·카고크레인·거미크레인·지게차·덤프).
 * 카드 체크박스 활성화 시 시간당/일당 단가 입력 필드 2개 노출.
 * "일괄 설정 템플릿" 링크: 프리셋 단가 일괄 적용.
 */

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionPrimitives";
import {
  OnboardingShell,
  OnboardingCtaRow,
  patchOnboardingState,
  readOnboardingState,
} from "../_shared";

type EquipmentRate = { hourly: string; daily: string };

type EquipmentDef = {
  id: string;
  label: string;
  icon: string;
  presetHourly: number;
  presetDaily: number;
};

const EQUIPMENT: ReadonlyArray<EquipmentDef> = [
  { id: "crane", label: "크레인", icon: "precision_manufacturing", presetHourly: 180000, presetDaily: 1200000 },
  { id: "excavator", label: "굴삭기", icon: "construction", presetHourly: 90000, presetDaily: 650000 },
  { id: "sky", label: "스카이", icon: "vertical_align_top", presetHourly: 110000, presetDaily: 780000 },
  { id: "pumpcar", label: "펌프카", icon: "water_drop", presetHourly: 200000, presetDaily: 1350000 },
  { id: "cargo-crane", label: "카고크레인", icon: "local_shipping", presetHourly: 150000, presetDaily: 950000 },
  { id: "spider-crane", label: "거미크레인", icon: "hub", presetHourly: 170000, presetDaily: 1100000 },
  { id: "forklift", label: "지게차", icon: "forklift", presetHourly: 70000, presetDaily: 480000 },
  { id: "dump", label: "덤프", icon: "dump_truck", presetHourly: 120000, presetDaily: 820000 },
];

function formatThousands(n: number | string): string {
  const num = typeof n === "string" ? Number(n.replace(/\D/g, "")) : n;
  if (!Number.isFinite(num) || num === 0) return "";
  return num.toLocaleString("ko-KR");
}

function parseNumeric(raw: string): string {
  return raw.replace(/\D/g, "");
}

export default function EquipmentPage() {
  const router = useRouter();
  const [rates, setRates] = useState<Record<string, EquipmentRate>>({});

  useEffect(() => {
    const s = readOnboardingState();
    if (s.equipment) setRates(s.equipment);
  }, []);

  const toggle = (id: string) => {
    setRates((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = { hourly: "", daily: "" };
      }
      return next;
    });
  };

  const updateRate = (id: string, key: keyof EquipmentRate, raw: string) => {
    const cleaned = parseNumeric(raw);
    setRates((prev) => ({
      ...prev,
      [id]: {
        hourly: prev[id]?.hourly ?? "",
        daily: prev[id]?.daily ?? "",
        [key]: cleaned,
      },
    }));
  };

  const applyTemplate = () => {
    const next: Record<string, EquipmentRate> = {};
    EQUIPMENT.forEach((eq) => {
      next[eq.id] = {
        hourly: String(eq.presetHourly),
        daily: String(eq.presetDaily),
      };
    });
    setRates(next);
    window.alert(
      "일괄 설정 템플릿을 적용하였다. 업계 표준 중간값 기반 단가가 주입되었다. 각 장비별 세부 수정은 언제든 가능하다.",
    );
  };

  const activeCount = useMemo(() => Object.keys(rates).length, [rates]);

  const handleNext = () => {
    patchOnboardingState({ equipment: rates });
    router.push("/onboarding/complete");
  };

  return (
    <OnboardingShell step={4}>
      <Reveal delay={0.05}>
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-[28px] md:text-[32px] font-[800] text-[#0A1628] tracking-[-0.02em]">
            장비·단가 등록
          </h1>
          <button
            type="button"
            onClick={applyTemplate}
            className="text-[12px] text-[#002C5F] hover:text-[#0046A4] underline underline-offset-4 font-medium flex-shrink-0 mt-2"
          >
            일괄 설정 템플릿
          </button>
        </div>
        <p
          className="text-[14px] md:text-[15px] text-[#3A4A5F] leading-[1.75] mb-8"
          style={{ fontFamily: "'IBM Plex Sans KR', Pretendard, serif" }}
        >
          보유·주력 장비를 체크하고 시간당·일당 단가를 기재한다. 미체크 장비는 배차 매트릭스에
          노출되지 않는다. 단가는 임시값으로 저장되며 운영 개시 전까지 수정 가능하다.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="flex items-center gap-2 mb-4 bg-[#F4F6FA] border border-[#E3E8EF] rounded-lg px-3 py-2">
          <span
            className="material-symbols-outlined text-[#002C5F]"
            style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            inventory_2
          </span>
          <span className="text-[12px] text-[#3A4A5F]">
            활성 장비{" "}
            <span
              className="font-bold text-[#002C5F] tabular-nums"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {activeCount}
            </span>
            {" / "}
            <span
              className="tabular-nums"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              8
            </span>
          </span>
        </div>
      </Reveal>

      <StaggerContainer className="grid sm:grid-cols-2 gap-3">
        {EQUIPMENT.map((eq) => {
          const rate = rates[eq.id];
          const active = Boolean(rate);
          return (
            <StaggerItem key={eq.id}>
              <div
                className={`rounded-xl border p-4 transition-colors ${
                  active
                    ? "bg-white border-[#002C5F] ring-2 ring-[#002C5F]/10"
                    : "bg-white border-[#E3E8EF]"
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggle(eq.id)}
                    className="sr-only peer"
                  />
                  <span
                    aria-hidden="true"
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      active ? "bg-[#002C5F] border-[#002C5F]" : "bg-white border-[#D9E0EA]"
                    }`}
                  >
                    {active && (
                      <span
                        className="material-symbols-outlined text-white"
                        style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}
                      >
                        check
                      </span>
                    )}
                  </span>
                  <span
                    className={`material-symbols-outlined ${
                      active ? "text-[#002C5F]" : "text-[#6B7B8F]"
                    }`}
                    style={{ fontSize: 20, fontVariationSettings: active ? "'FILL' 1" : undefined }}
                    aria-hidden="true"
                  >
                    {eq.icon}
                  </span>
                  <span
                    className={`text-[14px] font-bold ${
                      active ? "text-[#0A1628]" : "text-[#3A4A5F]"
                    }`}
                  >
                    {eq.label}
                  </span>
                </label>

                {active && (
                  <div className="mt-3 pt-3 border-t border-[#E3E8EF] grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#6B7B8F] mb-1">시간당</label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formatThousands(rate?.hourly ?? "")}
                          onChange={(e) => updateRate(eq.id, "hourly", e.target.value)}
                          placeholder={formatThousands(eq.presetHourly)}
                          className="w-full px-3 py-2 pr-8 bg-white border border-[#E3E8EF] rounded-lg focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/15 text-[13px] tabular-nums"
                          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[#6B7B8F] pointer-events-none">
                          원
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#6B7B8F] mb-1">일당</label>
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formatThousands(rate?.daily ?? "")}
                          onChange={(e) => updateRate(eq.id, "daily", e.target.value)}
                          placeholder={formatThousands(eq.presetDaily)}
                          className="w-full px-3 py-2 pr-8 bg-white border border-[#E3E8EF] rounded-lg focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/15 text-[13px] tabular-nums"
                          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[#6B7B8F] pointer-events-none">
                          원
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <OnboardingCtaRow
        onBack={() => router.push("/onboarding/invite")}
        onNext={handleNext}
        nextLabel="다음"
      />
    </OnboardingShell>
  );
}
