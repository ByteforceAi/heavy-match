"use client";

/**
 * 철연 CHEOLYEON — Onboarding Step 5/5 · 설정 완료
 *
 * localStorage의 cy-onboarding 상태를 요약 박스로 표시한다.
 * 2개 CTA: 첫 배차 요청(primary → /requester) / 대시보드 둘러보기(secondary → /demo).
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionPrimitives";
import {
  OnboardingShell,
  readOnboardingState,
  type OnboardingState,
} from "../_shared";

export default function CompletePage() {
  const router = useRouter();
  const [state, setState] = useState<OnboardingState>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readOnboardingState());
    setReady(true);
  }, []);

  const companyName = state.company?.name ?? "미등록";
  const inviteCount = state.invites?.length ?? 0;
  const equipmentCount = state.equipment ? Object.keys(state.equipment).length : 0;

  return (
    <OnboardingShell step={5}>
      <Reveal delay={0.05}>
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="w-[80px] h-[80px] rounded-full bg-cy-navy-pale flex items-center justify-center mb-4"
            style={{ boxShadow: "0 0 0 8px rgba(0,44,95,0.06)" }}
          >
            <span
              className="material-symbols-outlined text-cy-navy"
              style={{ fontSize: 64, fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              check_circle
            </span>
          </div>
          <h1 className="text-[28px] md:text-[32px] font-[800] text-cy-ink tracking-[-0.02em] mb-2">
            설정 완료
          </h1>
          <p
            className="text-[14px] md:text-[15px] text-cy-ink-2 leading-[1.75] max-w-[480px]"
            style={{ fontFamily: "'IBM Plex Sans KR', Pretendard, serif" }}
          >
            기본 구성이 확정되었다. 이제 첫 배차 요청으로 실제 운영을 개시한다.
          </p>
        </div>
      </Reveal>

      {/* 요약 박스 */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <StaggerItem>
          <SummaryCard
            icon="business"
            label="등록된 회사"
            value={ready ? companyName : "—"}
            mono={false}
          />
        </StaggerItem>
        <StaggerItem>
          <SummaryCard
            icon="group"
            label="초대된 팀원"
            value={ready ? `${inviteCount}명` : "—"}
            numeric={inviteCount}
          />
        </StaggerItem>
        <StaggerItem>
          <SummaryCard
            icon="inventory_2"
            label="등록된 장비"
            value={ready ? `${equipmentCount}종` : "—"}
            numeric={equipmentCount}
          />
        </StaggerItem>
      </StaggerContainer>

      {/* CTA 2종 */}
      <Reveal delay={0.2}>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <button
            type="button"
            onClick={() => router.push("/requester")}
            className="flex-1 bg-cy-navy hover:bg-cy-navy-mid text-white font-bold px-7 py-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-[14px]"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              send
            </span>
            첫 배차 요청
          </button>
          <button
            type="button"
            onClick={() => router.push("/demo")}
            className="flex-1 bg-white border border-cy-line text-cy-ink-2 hover:border-cy-navy/40 font-bold px-7 py-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-[14px]"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
              aria-hidden="true"
            >
              dashboard
            </span>
            대시보드 둘러보기
          </button>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="flex items-center justify-center gap-1.5 text-center">
          <span
            className="material-symbols-outlined text-cy-ink-4"
            style={{ fontSize: 14 }}
            aria-hidden="true"
          >
            info
          </span>
          <p className="text-[12px] text-cy-ink-3">
            설정은 언제든{" "}
            <Link
              href="/settings"
              className="text-cy-navy hover:text-cy-navy-mid underline underline-offset-2"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              /settings
            </Link>
            에서 수정 가능하다.
          </p>
        </div>
      </Reveal>
    </OnboardingShell>
  );
}

// ═══════════════════════════════════════
// SUMMARY CARD
// ═══════════════════════════════════════

function SummaryCard({
  icon,
  label,
  value,
  mono = true,
  numeric,
}: {
  icon: string;
  label: string;
  value: string;
  mono?: boolean;
  numeric?: number;
}) {
  return (
    <div className="bg-cy-bg border border-cy-line rounded-xl p-4">
      <div className="flex items-center gap-1.5 mb-2">
        <span
          className="material-symbols-outlined text-cy-ink-3"
          style={{ fontSize: 16 }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <p className="text-[11px] text-cy-ink-3">{label}</p>
      </div>
      <p
        className="text-[16px] font-bold text-cy-ink tabular-nums truncate"
        style={mono ? { fontFamily: "var(--font-roboto-mono), monospace" } : undefined}
        title={value}
      >
        {typeof numeric === "number" ? (
          <>
            <span>{numeric.toLocaleString("ko-KR")}</span>
            <span className="text-[12px] text-cy-ink-3 ml-0.5 font-normal">
              {value.replace(/[\d,]/g, "").trim()}
            </span>
          </>
        ) : (
          value
        )}
      </p>
    </div>
  );
}
