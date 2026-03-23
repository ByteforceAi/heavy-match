"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListSkeleton } from "@/components/ui/Skeleton";
import CountdownTimer from "@/components/CountdownTimer";
import AssignOperatorModal from "@/components/AssignOperatorModal";

interface DispatchRow {
  id: string;
  status: string;
  price: number;
  site_address: string;
  company_name: string;
  created_at: string;
  exclusive_call_at: string | null;
  shared_call_at: string | null;
  equipment_types: { name: string } | null;
  equipment_specs: { spec_name: string } | null;
  time_units: { name: string } | null;
}

export default function OwnerHome() {
  const [exclusiveCalls, setExclusiveCalls] = useState<DispatchRow[]>([]);
  const [sharedCalls, setSharedCalls] = useState<DispatchRow[]>([]);
  const [matchedCalls, setMatchedCalls] = useState<DispatchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadCalls();
    const channel = supabase
      .channel("dispatch-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "dispatch_requests" }, () => loadCalls())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCalls = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const fields = "id, status, price, site_address, company_name, created_at, exclusive_call_at, shared_call_at, equipment_types(name), equipment_specs(spec_name), time_units(name)";

    const [excl, shared, matched] = await Promise.all([
      supabase.from("dispatch_requests").select(fields).eq("target_owner_id", user.id).eq("status", "exclusive_call").order("created_at", { ascending: false }),
      supabase.from("dispatch_requests").select(fields).eq("status", "shared_call").order("created_at", { ascending: false }),
      supabase.from("dispatch_requests").select(fields).eq("matched_owner_id", user.id).eq("status", "matched").order("created_at", { ascending: false }),
    ]);

    if (excl.data) setExclusiveCalls(excl.data as unknown as DispatchRow[]);
    if (shared.data) setSharedCalls(shared.data as unknown as DispatchRow[]);
    if (matched.data) setMatchedCalls(matched.data as unknown as DispatchRow[]);
    setLoading(false);
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
      loadCalls();
    }
  };

  const handleReject = async (dispatchId: string) => {
    if (!confirm("이 콜을 거절하시겠습니까?")) return;
    const res = await fetch("/api/dispatch/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dispatch_id: dispatchId }),
    });
    const result = await res.json();
    if (result.error) alert(result.error);
    else loadCalls();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-text">콜 수신 현황</h2>
        <ListSkeleton count={3} />
      </div>
    );
  }

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
              <Card key={call.id}>
                {call.exclusive_call_at && (
                  <div className="mb-3">
                    <CountdownTimer startedAt={call.exclusive_call_at} />
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{call.equipment_types?.name} {call.equipment_specs?.spec_name}</span>
                  <StatusBadge status={call.status} />
                </div>
                <p className="text-sm text-text-muted">{call.site_address}</p>
                <p className="text-sm text-text-muted">{call.company_name}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold tabular-nums text-primary">{formatPrice(call.price)}원</span>
                  <span className="text-sm text-text-muted">{call.time_units?.name}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleAccept(call.id)} className="flex-1 py-3 bg-success text-white font-bold rounded-xl text-lg">수락</button>
                  <button onClick={() => handleReject(call.id)} className="flex-1 py-3 bg-danger text-white font-bold rounded-xl text-lg">거절</button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState icon="📞" title="전용콜 없음" />
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
              <Card key={call.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{call.equipment_types?.name} {call.equipment_specs?.spec_name}</span>
                  <StatusBadge status={call.status} />
                </div>
                <p className="text-sm text-text-muted">{call.site_address}</p>
                <p className="text-sm text-text-muted">{call.company_name}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold tabular-nums text-primary">{formatPrice(call.price)}원</span>
                  <span className="text-sm text-text-muted">{call.time_units?.name}</span>
                </div>
                <button onClick={() => handleAccept(call.id)} className="w-full mt-3 py-3 bg-success text-white font-bold rounded-xl text-lg">수락</button>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState icon="📢" title="공유콜 없음" />
        )}
      </section>

      {/* 매칭 완료 — 기사 배정 대기 */}
      <section>
        <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-success" />
          기사 배정 대기 ({matchedCalls.length})
        </h3>
        {matchedCalls.length > 0 ? (
          <div className="space-y-3">
            {matchedCalls.map((call) => (
              <Card key={call.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{call.equipment_types?.name} {call.equipment_specs?.spec_name}</span>
                  <StatusBadge status={call.status} />
                </div>
                <p className="text-sm text-text-muted">{call.site_address}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl font-bold tabular-nums text-primary">{formatPrice(call.price)}원</span>
                </div>
                <button
                  onClick={() => setAssigningId(call.id)}
                  className="w-full mt-3 py-3 bg-primary text-white font-bold rounded-xl text-lg"
                >
                  👷 기사 배정하기
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl p-4 text-center text-sm text-text-muted border border-border">
            배정 대기 중인 건이 없습니다
          </div>
        )}
      </section>

      {/* 기사 배정 모달 */}
      {assigningId && (
        <AssignOperatorModal
          dispatchId={assigningId}
          onClose={() => setAssigningId(null)}
          onAssigned={() => { setAssigningId(null); loadCalls(); }}
        />
      )}
    </div>
  );
}
