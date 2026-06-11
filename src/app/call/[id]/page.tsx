"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

/**
 * 콜 상세 — SMS 링크로 도착하는 비로그인 외부 접점.
 * 사장이 처음 만나는 철연의 얼굴이므로 판결문 카드 톤을 그대로 쓴다.
 * 조회·수락 로직은 변경 없음.
 */

interface DispatchDetail {
  id: string; status: string; price: number; company_name: string; site_address: string;
  requester_name: string | null; requester_phone: string | null;
  site_manager_name: string | null; site_manager_phone: string | null;
  equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null; time_units: { name: string } | null;
}

export default function CallPageWrapper() {
  return <Suspense fallback={<Loading />}><CallPage /></Suspense>;
}

function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cy-bg">
      <span className="material-symbols-outlined text-3xl text-cy-navy animate-spin" aria-label="불러오는 중">progress_activity</span>
    </main>
  );
}

/** 정보 행 — 라벨 좌 / 값 우, 헤어라인 구분 */
function InfoRow({ label, children, strong }: { label: string; children: React.ReactNode; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-2.5 border-b border-cy-line-soft last:border-b-0">
      <span className="shrink-0 text-xs font-semibold text-cy-ink-3">{label}</span>
      <span className={`text-right ${strong ? "font-extrabold text-lg text-cy-ink" : "font-semibold text-sm text-cy-ink"}`}>
        {children}
      </span>
    </div>
  );
}

function CallPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const token = searchParams.get("t");
  const [dispatch, setDispatch] = useState<DispatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [result, setResult] = useState<"accepted" | "rejected" | "already_taken" | null>(null);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("dispatch_requests")
        .select("id, status, price, company_name, site_address, requester_name, requester_phone, site_manager_name, site_manager_phone, equipment_types(name), equipment_specs(spec_name), time_units(name)")
        .eq("id", id).single();
      setDispatch(data as unknown as DispatchDetail);
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAccept = async () => {
    setAccepting(true);
    const res = await fetch("/api/dispatch/accept", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ dispatch_id: id, owner_token: token }) });
    const data = await res.json();
    setResult(data.error ? "already_taken" : "accepted");
    setAccepting(false);
  };

  if (loading) return <Loading />;

  if (!dispatch) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cy-bg px-4">
        <div className="bg-white rounded-2xl px-8 py-10 text-center border border-cy-line shadow-[0_20px_50px_rgba(0,44,95,0.12)] max-w-sm w-full">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cy-danger/8 mb-4">
            <span className="material-symbols-outlined text-3xl text-cy-danger" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
          </span>
          <p className="text-lg font-extrabold text-cy-ink">요청을 찾을 수 없습니다</p>
          <p className="text-sm text-cy-ink-3 mt-1">링크가 만료되었거나 잘못된 주소입니다</p>
        </div>
      </main>
    );
  }

  if (result) {
    const cfg = {
      accepted: { icon: "check_circle", text: "text-cy-success-deep", chip: "bg-cy-success/10", mono: "ACCEPTED", title: "수락 완료", desc: "배차가 확정되었습니다. 기사를 배정해주세요." },
      already_taken: { icon: "warning", text: "text-cy-warning-deep", chip: "bg-cy-warning/12", mono: "ALREADY TAKEN", title: "이미 배정됨", desc: "다른 업체가 먼저 수락했습니다." },
      rejected: { icon: "cancel", text: "text-cy-danger-deep", chip: "bg-cy-danger/8", mono: "REJECTED", title: "거절됨", desc: "이 요청을 거절했습니다." },
    }[result];

    return (
      <main className="flex min-h-screen items-center justify-center bg-cy-bg px-4">
        <div className="bg-white rounded-2xl px-8 py-10 text-center border border-cy-line shadow-[0_20px_50px_rgba(0,44,95,0.12)] max-w-sm w-full animate-fade-in">
          <div className={`w-16 h-16 ${cfg.chip} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            <span className={`material-symbols-outlined text-4xl ${cfg.text}`} style={{ fontVariationSettings: "'FILL' 1" }}>{cfg.icon}</span>
          </div>
          <p className={`mono-label ${cfg.text} mb-1`}>{cfg.mono}</p>
          <h2 className="text-xl font-extrabold tracking-[-0.02em] text-cy-ink">{cfg.title}</h2>
          <p className="text-cy-ink-3 mt-2 text-sm leading-relaxed">{cfg.desc}</p>
        </div>
      </main>
    );
  }

  const actionable = ["exclusive_call", "callcenter_call", "shared_call"].includes(dispatch.status);

  return (
    <main className="flex min-h-screen items-center justify-center bg-cy-bg px-4 py-8">
      <div className="bg-white rounded-2xl border border-cy-line shadow-[0_20px_50px_rgba(0,44,95,0.12),0_2px_8px_rgba(0,44,95,0.06)] max-w-sm w-full overflow-hidden animate-fade-in">
        <div className="h-[3px] bg-cy-navy" aria-hidden />

        {/* 헤더 */}
        <div className="px-6 pt-5 pb-4 border-b border-cy-line-soft">
          <div className="flex items-center justify-between mb-2.5">
            <span className="mono-label text-cy-ink-4">DISPATCH REQUEST</span>
            <StatusBadge status={dispatch.status} />
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cy-navy">
              <span className="material-symbols-outlined text-base text-white" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            </span>
            <div>
              <p className="text-base font-black text-cy-ink tracking-[-0.02em] leading-tight">철연 CHEOLYEON</p>
              <p className="text-[11px] text-cy-ink-3">장비 요청 상세</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* 핵심 — 장비 · 금액 */}
          <div className="rounded-xl bg-cy-navy-pale/60 border border-cy-navy/10 px-4 py-1.5">
            <InfoRow label="장비" strong>
              {dispatch.equipment_types?.name} {dispatch.equipment_specs?.spec_name}
            </InfoRow>
            <InfoRow label="시간">{dispatch.time_units?.name}</InfoRow>
            <div className="flex items-baseline justify-between gap-3 py-2.5">
              <span className="shrink-0 text-xs font-semibold text-cy-ink-3">금액</span>
              <span className="font-black text-2xl tabular-nums tracking-[-0.02em] text-cy-navy">
                {formatPrice(dispatch.price)}<span className="text-sm font-bold ml-0.5">원</span>
              </span>
            </div>
          </div>

          {/* 현장 정보 */}
          <div className="px-1">
            <InfoRow label="건설사">{dispatch.company_name}</InfoRow>
            <InfoRow label="현장주소">{dispatch.site_address}</InfoRow>
            {dispatch.site_manager_name && (
              <InfoRow label="현장담당">
                {dispatch.site_manager_name}{" "}
                <span className="tabular-nums">{dispatch.site_manager_phone}</span>
              </InfoRow>
            )}
          </div>

          {/* 수락 / 거절 */}
          {actionable && (
            <div className="flex gap-2.5 pt-1">
              <Button
                variant="success"
                size="lg"
                icon={accepting ? undefined : "check_circle"}
                loading={accepting}
                onClick={handleAccept}
                className="flex-1"
              >
                {accepting ? "처리중..." : "수락"}
              </Button>
              <Button
                variant="danger"
                size="lg"
                icon="cancel"
                onClick={() => setResult("rejected")}
                className="flex-1"
              >
                거절
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
