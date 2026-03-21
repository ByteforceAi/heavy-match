"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, getStatusLabel, getStatusColor } from "@/lib/utils";

interface DispatchRow {
  id: string;
  status: string;
  price: number;
  site_address: string;
  company_name: string;
  created_at: string;
  equipment_types: { name: string } | null;
  equipment_specs: { spec_name: string } | null;
  time_units: { name: string } | null;
}

export default function OwnerHome() {
  const [exclusiveCalls, setExclusiveCalls] = useState<DispatchRow[]>([]);
  const [sharedCalls, setSharedCalls] = useState<DispatchRow[]>([]);
  const supabase = createClient();

  useEffect(() => {
    loadCalls();

    // Supabase Realtime 구독 — 공유콜 실시간 갱신
    const channel = supabase
      .channel("dispatch-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dispatch_requests" },
        () => {
          loadCalls();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCalls = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // 전용콜
    const { data: exclusive } = await supabase
      .from("dispatch_requests")
      .select("id, status, price, site_address, company_name, created_at, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .eq("target_owner_id", user.id)
      .eq("status", "exclusive_call")
      .order("created_at", { ascending: false });

    if (exclusive) setExclusiveCalls(exclusive as unknown as DispatchRow[]);

    // 공유콜 — 같은 지역 사장이 볼 수 있는 콜
    const { data: shared } = await supabase
      .from("dispatch_requests")
      .select("id, status, price, site_address, company_name, created_at, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .eq("status", "shared_call")
      .order("created_at", { ascending: false });

    if (shared) setSharedCalls(shared as unknown as DispatchRow[]);
  };

  const handleAccept = async (dispatchId: string) => {
    const res = await fetch("/api/dispatch/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dispatch_id: dispatchId }),
    });
    const result = await res.json();
    if (result.error) {
      alert(result.error);
    } else {
      alert("수락 완료!");
      loadCalls();
    }
  };

  const CallCard = ({ call, type }: { call: DispatchRow; type: "exclusive" | "shared" }) => (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">
          {call.equipment_types?.name} {call.equipment_specs?.spec_name}
        </span>
        <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(call.status)}`}>
          {getStatusLabel(call.status)}
        </span>
      </div>
      <p className="text-sm text-text-muted">{call.site_address}</p>
      <p className="text-sm text-text-muted">{call.company_name}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-lg font-bold tabular-nums text-primary">{formatPrice(call.price)}원</span>
        <span className="text-sm text-text-muted">{call.time_units?.name}</span>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => handleAccept(call.id)}
          className="flex-1 py-3 bg-success text-white font-semibold rounded-xl text-lg hover:bg-emerald-600 transition"
        >
          수락
        </button>
        {type === "exclusive" && (
          <button className="flex-1 py-3 bg-danger text-white font-semibold rounded-xl text-lg hover:bg-red-600 transition">
            거절
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text">콜 수신 현황</h2>

      {/* 전용콜 */}
      <section>
        <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          전용콜
        </h3>
        {exclusiveCalls.length > 0 ? (
          <div className="space-y-3">
            {exclusiveCalls.map((call) => (
              <CallCard key={call.id} call={call} type="exclusive" />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl p-6 text-center text-text-muted border border-border">
            현재 수신된 전용콜이 없습니다
          </div>
        )}
      </section>

      {/* 공유콜 */}
      <section>
        <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
          공유콜 (선착순)
        </h3>
        {sharedCalls.length > 0 ? (
          <div className="space-y-3">
            {sharedCalls.map((call) => (
              <CallCard key={call.id} call={call} type="shared" />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl p-6 text-center text-text-muted border border-border">
            현재 공유콜이 없습니다
          </div>
        )}
      </section>
    </div>
  );
}
