"use client";

/**
 * RoleEmptyStates — 6개 역할별 사전 구성 EmptyState 래퍼
 *
 * 각 역할의 대시보드 리스트·큐·테이블이 비어 있을 때 import하여 사용한다.
 * 내부적으로 <EmptyState />에 사전 정의된 copy·illustration·CTA를 주입한다.
 *
 * 사용 예:
 *   import { RequesterEmptyDispatches } from "@/components/cheolyeon/empty-states/RoleEmptyStates";
 *   // ...
 *   {dispatches.length === 0 ? <RequesterEmptyDispatches /> : <DispatchList ... />}
 *
 * heritage-v1.md §3/§4 준수 — 판결문 어미 고정, "!" "~입니다" 의문형 훅 금지.
 */

import type { JSX } from "react";
import { EmptyState } from "@/components/cheolyeon/EmptyState";

// ─── 1. 장비요청자 — 요청 이력 없음 ───────────────────────
export function RequesterEmptyDispatches(): JSX.Element {
  return (
    <EmptyState
      illustration="dispatch"
      title="첫 배차 요청을 기다린다"
      description="장비 요청을 시작하면 진행 현황이 여기에 기록된다."
      primaryCTA={{ label: "장비 요청 작성", href: "/requester/request" }}
    />
  );
}

// ─── 2. 중장비사장 — 수신 콜 없음 ────────────────────────
export function OwnerEmptyCalls(): JSX.Element {
  return (
    <EmptyState
      illustration="call"
      title="수신된 콜이 없다"
      description="지역 설정과 단가가 등록되면 전용콜·공유콜이 이곳에 도달한다."
      primaryCTA={{ label: "설정 확인", href: "/owner/prices" }}
    />
  );
}

// ─── 3. 기사 — 배정 작업 없음 (수동 대기 상태, CTA 없음) ─
export function OperatorEmptyJobs(): JSX.Element {
  return (
    <EmptyState
      illustration="work"
      title="배정된 작업이 없다"
      description="사장의 기사 배정이 완료되면 여기에서 작업 시작 버튼이 활성화된다."
    />
  );
}

// ─── 4. 콜센터 — 대기 큐 없음 ────────────────────────────
export function CallcenterEmptyQueue(): JSX.Element {
  return (
    <EmptyState
      illustration="call"
      title="대기 중인 콜이 없다"
      description="60초 전용콜이 만료된 요청만 콜센터로 전달된다. 현재는 전부 직접 수락으로 종결되었다."
    />
  );
}

// ─── 5. 영업사원 — 파트너사 미등록 ───────────────────────
export function SalespersonEmptyPartners(): JSX.Element {
  return (
    <EmptyState
      illustration="partner"
      title="파트너사 등록을 시작한다"
      description="초대 링크를 발송하고 수락된 파트너부터 수수료 실적이 집계된다."
      primaryCTA={{ label: "초대 링크 생성", href: "/salesperson/invite" }}
    />
  );
}

// ─── 6. 관리자 — 마스터 데이터 미설정 ────────────────────
export function AdminEmptyData(): JSX.Element {
  return (
    <EmptyState
      illustration="data"
      title="마스터 데이터가 비어 있다"
      description="장비 · 지역 · 단가 매트릭스가 설정되면 배차 엔진이 작동한다."
      primaryCTA={{ label: "장비 매트릭스 설정", href: "/admin/settings" }}
      secondaryCTA={{ label: "CSV 가져오기", href: "/admin/import" }}
    />
  );
}
