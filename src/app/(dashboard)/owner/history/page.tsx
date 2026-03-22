import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function OwnerHistoryPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: dispatches } = await supabase
    .from("dispatch_requests")
    .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
    .eq("matched_owner_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(50) as unknown as { data: Array<{
      id: string; status: string; price: number; site_address: string;
      company_name: string; created_at: string; matched_at: string | null;
      equipment_types: { name: string } | null;
      equipment_specs: { spec_name: string } | null;
      time_units: { name: string } | null;
    }> | null };

  const totalRevenue = dispatches?.reduce((sum, d) => sum + d.price, 0) ?? 0;

  return (
    <div>
      <PageHeader title="매칭 이력" description="내가 수락한 배차 내역" />

      <Card className="mb-6 bg-gradient-to-r from-primary to-primary-light text-white border-0">
        <p className="text-sm opacity-80">총 매출</p>
        <p className="text-3xl font-bold tabular-nums">{formatPrice(totalRevenue)}원</p>
        <p className="text-sm opacity-80 mt-1">총 {dispatches?.length ?? 0}건</p>
      </Card>

      {dispatches && dispatches.length > 0 ? (
        <div className="space-y-3">
          {dispatches.map((d) => (
            <Card key={d.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">
                  {d.equipment_types?.name} {d.equipment_specs?.spec_name}
                </span>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-sm text-text-muted">{d.company_name} · {d.site_address}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold tabular-nums text-primary">{formatPrice(d.price)}원</span>
                <span className="text-xs text-text-muted">
                  {d.matched_at ? new Date(d.matched_at).toLocaleDateString("ko-KR") : new Date(d.created_at).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="📜" title="아직 매칭 이력이 없습니다" description="콜을 수락하면 여기에 표시됩니다" />
      )}
    </div>
  );
}
