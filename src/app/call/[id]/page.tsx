"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, getStatusLabel } from "@/lib/utils";

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
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff]">
      <span className="material-symbols-outlined text-3xl text-[#0059b9] animate-spin">progress_activity</span>
    </main>
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

  const S = { fontFamily: "'Inter', 'Pretendard', sans-serif", letterSpacing: "-0.02em" } as const;

  if (loading) return <Loading />;

  if (!dispatch) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-4" style={S}>
        <div className="bg-white rounded-2xl p-8 text-center shadow-[0_20px_40px_rgba(17,28,41,0.06)] border border-[#c1c6d6]/20">
          <span className="material-symbols-outlined text-5xl text-[#ba1a1a] block mb-2">error</span>
          <p className="text-lg text-[#ba1a1a] font-bold">요청을 찾을 수 없습니다</p>
        </div>
      </main>
    );
  }

  if (result) {
    const cfg = {
      accepted: { icon: "check_circle", color: "text-emerald-600", bg: "bg-emerald-50", title: "수락 완료", desc: "배차가 확정되었습니다. 기사를 배정해주세요." },
      already_taken: { icon: "warning", color: "text-amber-600", bg: "bg-amber-50", title: "이미 배정됨", desc: "다른 업체가 먼저 수락했습니다." },
      rejected: { icon: "cancel", color: "text-[#ba1a1a]", bg: "bg-[#ffdad6]", title: "거절됨", desc: "이 요청을 거절했습니다." },
    }[result];

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-4" style={S}>
        <div className="bg-white rounded-2xl p-8 text-center shadow-[0_20px_40px_rgba(17,28,41,0.06)] max-w-sm w-full animate-fade-in">
          <div className={`w-16 h-16 ${cfg.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            <span className={`material-symbols-outlined text-4xl ${cfg.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{cfg.icon}</span>
          </div>
          <h2 className={`text-xl font-[800] ${cfg.color}`}>{cfg.title}</h2>
          <p className="text-[#727785] mt-2 text-sm">{cfg.desc}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-4 py-8" style={S}>
      <div className="bg-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(17,28,41,0.06)] border border-[#c1c6d6]/20 max-w-sm w-full space-y-4 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#0059b9]" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
            <span className="text-lg font-black text-[#111c29]">Heavy Match</span>
          </div>
          <p className="text-xs text-[#727785]">장비 요청 상세</p>
        </div>

        {/* Equipment Info */}
        <div className="bg-[#eef4ff] rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[#727785] text-sm">장비</span>
            <span className="font-[800] text-lg text-[#111c29]">{dispatch.equipment_types?.name} {dispatch.equipment_specs?.spec_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#727785] text-sm">시간</span>
            <span className="font-semibold text-[#111c29]">{dispatch.time_units?.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#727785] text-sm">금액</span>
            <span className="font-black text-2xl tabular-nums text-[#0059b9]">{formatPrice(dispatch.price)}원</span>
          </div>
        </div>

        {/* Site Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2"><span className="material-symbols-outlined text-base text-[#727785] mt-0.5">apartment</span><div><p className="text-[10px] text-[#727785]">건설사</p><p className="font-semibold text-[#111c29]">{dispatch.company_name}</p></div></div>
          <div className="flex items-start gap-2"><span className="material-symbols-outlined text-base text-[#727785] mt-0.5">location_on</span><div><p className="text-[10px] text-[#727785]">현장주소</p><p className="font-semibold text-[#111c29]">{dispatch.site_address}</p></div></div>
          {dispatch.site_manager_name && (
            <div className="flex items-start gap-2"><span className="material-symbols-outlined text-base text-[#727785] mt-0.5">person</span><div><p className="text-[10px] text-[#727785]">현장담당</p><p className="font-semibold text-[#111c29]">{dispatch.site_manager_name} {dispatch.site_manager_phone}</p></div></div>
          )}
        </div>

        {/* Status */}
        <div className="text-center">
          <span className="px-3 py-1 bg-[#e5eeff] text-[#0059b9] text-xs font-bold rounded-lg">{getStatusLabel(dispatch.status)}</span>
        </div>

        {/* Action Buttons */}
        {["exclusive_call", "callcenter_call", "shared_call"].includes(dispatch.status) && (
          <div className="flex gap-3">
            <button onClick={handleAccept} disabled={accepting}
              className="flex-1 py-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-xl font-black rounded-xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              {accepting ? "처리중..." : "수락"}
            </button>
            <button onClick={() => setResult("rejected")}
              className="flex-1 py-4 bg-[#ba1a1a] text-white text-xl font-black rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cancel</span>
              거절
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
