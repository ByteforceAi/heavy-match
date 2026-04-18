"use client";

/**
 * 철연 CHEOLYEON — Onboarding Step 1/5 · Welcome
 *
 * 신규 등록 바이어(회사 대표·실무 담당자)를 위한 도입 온보딩 첫 화면.
 * heritage-v1.md §3 금지 카피 / §4 허용 구조 준수.
 * 7일 여정 요약(계약·설정·학습·운영) 제시 후 설정 시작으로 진행한다.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import {
  OnboardingShell,
  patchOnboardingState,
  readOnboardingState,
} from "../_shared";

const JOURNEY: ReadonlyArray<{
  day: string;
  phase: string;
  detail: string;
}> = [
  { day: "D+0", phase: "계약", detail: "전자계약 체결 · 결제 수단 검증" },
  { day: "D+1", phase: "설정", detail: "회사 정보 · 팀원 · 장비 단가 등록" },
  { day: "D+3", phase: "학습", detail: "역할별 대시보드 투어 · 배차 시뮬레이션" },
  { day: "D+7", phase: "운영", detail: "실제 배차 개시 · 월간 지표 수집 개시" },
];

const READINESS: ReadonlyArray<{
  icon: string;
  label: string;
  detail: string;
}> = [
  { icon: "verified_user", label: "계정 확인 완료", detail: "사업자 단일 식별 OK" },
  { icon: "credit_score", label: "결제 정보 확인 완료", detail: "CMS 등록 유효" },
  { icon: "settings", label: "설정 시작 준비됨", detail: "5단계 약 4분 소요" },
];

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const existing = readOnboardingState();
    if (!existing.startedAt) {
      patchOnboardingState({ startedAt: new Date().toISOString() });
    }
  }, []);

  return (
    <OnboardingShell step={1}>
      <Reveal delay={0.05}>
        <div className="flex items-baseline gap-2.5 mb-4">
          <span
            className="text-[20px] font-black text-[#002C5F] tracking-[-0.03em]"
            style={{ fontFamily: "'Pretendard', sans-serif" }}
          >
            철연
          </span>
          <span
            className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            CHEOLYEON
          </span>
          <span className="text-[11px] text-[#9AA8B8] ml-auto">도입 온보딩</span>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <h1 className="text-[28px] md:text-[32px] font-[800] text-[#0A1628] tracking-[-0.02em] mb-3">
          철연 도입을 시작한다
        </h1>
        <p
          className="text-[14px] md:text-[15px] text-[#3A4A5F] leading-[1.75] mb-8"
          style={{ fontFamily: "'IBM Plex Sans KR', Pretendard, serif" }}
        >
          첫 배차까지 평균{" "}
          <span
            className="font-bold text-[#0A1628]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            7
          </span>
          일이 소요된다. 설정·학습·운영 단계를 거쳐 현장과 콜센터가 동일한 시스템 위에서 움직이게
          된다. 아래 4개 분기점이 여정의 골격을 이룬다.
        </p>
      </Reveal>

      {/* 7일 여정 타임라인 */}
      <Reveal delay={0.2}>
        <div className="relative mb-10">
          <div
            aria-hidden="true"
            className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-[#E3E8EF]"
          />
          <ul className="space-y-4 list-none p-0 m-0">
            {JOURNEY.map((node, i) => (
              <li key={node.day} className="relative flex items-start gap-4">
                <div className="relative z-10 w-[44px] h-[44px] rounded-full bg-white border-2 border-[#002C5F] flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-[10px] font-bold text-[#002C5F] tabular-nums"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    {node.day}
                  </span>
                </div>
                <div className="flex-1 pt-1.5">
                  <p className="text-[14px] font-bold text-[#0A1628] mb-0.5">
                    {i + 1}. {node.phase}
                  </p>
                  <p className="text-[13px] text-[#6B7B8F] leading-[1.6]">{node.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* 체크 3종 */}
      <StaggerContainer className="grid sm:grid-cols-3 gap-3 mb-8">
        {READINESS.map((r) => (
          <StaggerItem key={r.label}>
            <div className="bg-[#F4F6FA] border border-[#E3E8EF] rounded-xl p-4 h-full">
              <span
                className="material-symbols-outlined text-[#00A86B] mb-2 block"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: 22 }}
              >
                {r.icon}
              </span>
              <p className="text-[13px] font-bold text-[#0A1628] mb-0.5">{r.label}</p>
              <p className="text-[11px] text-[#6B7B8F] leading-[1.5]">{r.detail}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Reveal delay={0.3}>
        <div className="flex items-center justify-between gap-3 pt-6 border-t border-[#E3E8EF]">
          <Link
            href="/"
            className="text-[13px] text-[#6B7B8F] hover:text-[#3A4A5F] transition-colors"
          >
            &larr; 홈으로
          </Link>
          <button
            type="button"
            onClick={() => router.push("/onboarding/company")}
            className="bg-[#002C5F] hover:bg-[#0046A4] text-white font-bold px-7 py-3.5 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            설정 시작
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </Reveal>
    </OnboardingShell>
  );
}
