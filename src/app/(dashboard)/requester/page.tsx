import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function RequesterHome() {
  let recentHistory: Array<{ id: number; site_address: string | null; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null }> | null = null;
  let activeDispatches: Array<{ id: string; status: string; price: number; site_address: string; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null; time_units: { name: string } | null }> | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: history } = await supabase
      .from("call_history")
      .select("*, equipment_types(name), equipment_specs(spec_name)")
      .eq("requester_id", user!.id)
      .order("last_used_at", { ascending: false })
      .limit(5) as unknown as { data: Array<{ id: number; site_address: string | null; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null }> | null };

    const { data: dispatches } = await supabase
      .from("dispatch_requests")
      .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .eq("requester_id", user!.id)
      .not("status", "in", '("completed","cancelled")')
      .order("created_at", { ascending: false })
      .limit(5) as unknown as { data: Array<{ id: string; status: string; price: number; site_address: string; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null; time_units: { name: string } | null }> | null };

    recentHistory = history;
    activeDispatches = dispatches;
  }

  return (
    <div className="space-y-6">
      {/* CTA 배너 */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-1">장비가 필요하신가요?</h2>
        <p className="text-blue-100 text-sm mb-4">크레인, 굴삭기 등 8종 장비를 즉시 요청하세요</p>
        <Link
          href="/requester/request"
          className="inline-block py-3 px-8 bg-white text-primary text-lg font-bold rounded-xl hover:bg-blue-50 transition shadow"
        >
          + 장비 요청하기
        </Link>
      </div>

      {/* 진행중인 배차 */}
      {activeDispatches && activeDispatches.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
            진행중 ({activeDispatches.length})
          </h3>
          <div className="space-y-3">
            {activeDispatches.map((d) => (
              <Card key={d.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base">
                    {d.equipment_types?.name} {d.equipment_specs?.spec_name}
                  </span>
                  <StatusBadge status={d.status} />
                </div>
                <p className="text-sm text-text-muted">{d.site_address}</p>
                <p className="text-lg font-bold tabular-nums text-primary mt-1">{formatPrice(d.price)}원</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 빠른 재주문 */}
      <section>
        <h3 className="text-lg font-semibold text-text mb-3">빠른 재주문</h3>
        {recentHistory && recentHistory.length > 0 ? (
          <div className="space-y-2">
            {recentHistory.map((h) => (
              <Link key={h.id} href={`/requester/request?reorder=${h.id}`}>
                <Card hover>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">
                        {h.equipment_types?.name} {h.equipment_specs?.spec_name}
                      </span>
                      <p className="text-sm text-text-muted mt-0.5">{h.site_address}</p>
                    </div>
                    <span className="text-primary font-semibold text-sm flex items-center gap-1">
                      재주문 <span className="text-lg">→</span>
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🏗️"
            title="아직 이력이 없습니다"
            description="첫 장비를 요청해보세요!"
            actionLabel="장비 요청하기"
            actionHref="/requester/request"
          />
        )}
      </section>
    </div>
  );
}
