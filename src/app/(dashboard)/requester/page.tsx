import { createServerSupabaseClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default async function RequesterHome() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 최근 이력 조회
  const { data: recentHistory } = await supabase
    .from("call_history")
    .select("*, equipment_types(name), equipment_specs(spec_name)")
    .eq("requester_id", user!.id)
    .order("last_used_at", { ascending: false })
    .limit(5) as unknown as { data: Array<{ id: number; site_address: string | null; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null }> | null };

  // 진행중인 배차
  const { data: activeDispatches } = await supabase
    .from("dispatch_requests")
    .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
    .eq("requester_id", user!.id)
    .not("status", "in", '("completed","cancelled")')
    .order("created_at", { ascending: false })
    .limit(5) as unknown as { data: Array<{ id: string; status: string; price: number; site_address: string; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null; time_units: { name: string } | null }> | null };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text">장비 요청</h2>
        <Link
          href="/requester/request"
          className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-amber-400 transition text-lg"
        >
          + 새 요청
        </Link>
      </div>

      {/* 진행중인 배차 */}
      {activeDispatches && activeDispatches.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-text mb-3">진행중인 배차</h3>
          <div className="space-y-3">
            {activeDispatches.map((d) => (
              <div key={d.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">
                    {(d.equipment_types as { name: string })?.name} {(d.equipment_specs as { spec_name: string })?.spec_name}
                  </span>
                  <span className="text-sm px-2 py-1 rounded-lg bg-blue-100 text-blue-700">
                    {d.status}
                  </span>
                </div>
                <p className="text-sm text-text-muted">{d.site_address}</p>
                <p className="text-sm font-medium tabular-nums mt-1">{formatPrice(d.price)}원</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 빠른 재주문 */}
      <section>
        <h3 className="text-lg font-semibold text-text mb-3">최근 이력 (빠른 재주문)</h3>
        {recentHistory && recentHistory.length > 0 ? (
          <div className="space-y-2">
            {recentHistory.map((h) => (
              <Link
                key={h.id}
                href={`/requester/request?reorder=${h.id}`}
                className="block bg-card rounded-xl p-4 shadow-sm border border-border hover:border-primary transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">
                      {(h.equipment_types as { name: string })?.name} {(h.equipment_specs as { spec_name: string })?.spec_name}
                    </span>
                    <p className="text-sm text-text-muted mt-1">{h.site_address}</p>
                  </div>
                  <span className="text-primary text-sm font-medium">재주문 →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl p-8 text-center text-text-muted">
            <p>아직 이력이 없습니다</p>
            <Link
              href="/requester/request"
              className="inline-block mt-3 text-primary font-medium"
            >
              첫 장비 요청하기 →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
