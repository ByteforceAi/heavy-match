"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, getStatusLabel } from "@/lib/utils";

interface DispatchDetail {
  id: string;
  status: string;
  price: number;
  company_name: string;
  site_address: string;
  requester_name: string | null;
  requester_phone: string | null;
  site_manager_name: string | null;
  site_manager_phone: string | null;
  equipment_types: { name: string } | null;
  equipment_specs: { spec_name: string } | null;
  time_units: { name: string } | null;
}

export default function CallPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const token = searchParams.get("t");

  const [dispatch, setDispatch] = useState<DispatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [result, setResult] = useState<"accepted" | "rejected" | "already_taken" | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadDispatch = async () => {
    const { data } = await supabase
      .from("dispatch_requests")
      .select("id, status, price, company_name, site_address, requester_name, requester_phone, site_manager_name, site_manager_phone, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .eq("id", id)
      .single();

    setDispatch(data as unknown as DispatchDetail);
    setLoading(false);
  };

  const handleAccept = async () => {
    setAccepting(true);
    const res = await fetch("/api/dispatch/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dispatch_id: id, owner_token: token }),
    });
    const data = await res.json();
    if (data.error) {
      setResult("already_taken");
    } else {
      setResult("accepted");
    }
    setAccepting(false);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-lg text-text-muted">로딩중...</p>
      </main>
    );
  }

  if (!dispatch) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-4">
        <div className="bg-card rounded-xl p-8 text-center shadow-lg">
          <p className="text-lg text-danger font-semibold">요청을 찾을 수 없습니다</p>
        </div>
      </main>
    );
  }

  if (result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-4">
        <div className="bg-card rounded-xl p-8 text-center shadow-lg max-w-sm w-full">
          {result === "accepted" && (
            <>
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-success">수락 완료</h2>
              <p className="text-text-muted mt-2">배차가 확정되었습니다. 기사를 배정해주세요.</p>
            </>
          )}
          {result === "already_taken" && (
            <>
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-accent">이미 배정됨</h2>
              <p className="text-text-muted mt-2">다른 업체가 먼저 수락했습니다.</p>
            </>
          )}
          {result === "rejected" && (
            <>
              <div className="text-5xl mb-4">❌</div>
              <h2 className="text-xl font-bold text-danger">거절됨</h2>
            </>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4 py-8">
      <div className="bg-card rounded-2xl p-6 shadow-lg max-w-sm w-full space-y-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-primary">Heavy Match</h1>
          <p className="text-sm text-text-muted">장비 요청 상세</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-text-muted text-sm">장비</span>
            <span className="font-bold text-lg">
              {dispatch.equipment_types?.name} {dispatch.equipment_specs?.spec_name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted text-sm">시간</span>
            <span className="font-medium">{dispatch.time_units?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted text-sm">금액</span>
            <span className="font-bold text-xl tabular-nums text-primary">{formatPrice(dispatch.price)}원</span>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-xs text-text-muted">건설사</span>
            <p className="font-medium">{dispatch.company_name}</p>
          </div>
          <div>
            <span className="text-xs text-text-muted">현장주소</span>
            <p className="font-medium">{dispatch.site_address}</p>
          </div>
          {dispatch.site_manager_name && (
            <div>
              <span className="text-xs text-text-muted">현장담당</span>
              <p className="font-medium">{dispatch.site_manager_name} {dispatch.site_manager_phone}</p>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-text-muted">
          상태: {getStatusLabel(dispatch.status)}
        </div>

        {["exclusive_call", "callcenter_call", "shared_call"].includes(dispatch.status) && (
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              disabled={accepting}
              className="flex-1 py-4 bg-success text-white text-xl font-bold rounded-xl hover:bg-emerald-600 transition disabled:opacity-50"
            >
              {accepting ? "처리중..." : "수락"}
            </button>
            <button
              onClick={() => setResult("rejected")}
              className="flex-1 py-4 bg-danger text-white text-xl font-bold rounded-xl hover:bg-red-600 transition"
            >
              거절
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
