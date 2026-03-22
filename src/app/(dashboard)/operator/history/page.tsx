import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function OperatorHistoryPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: dispatches } = await supabase
    .from("dispatch_requests")
    .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
    .eq("assigned_operator_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(50) as unknown as { data: Array<{
      id: string; status: string; price: number; site_address: string;
      company_name: string; created_at: string; completed_at: string | null;
      equipment_types: { name: string } | null;
      equipment_specs: { spec_name: string } | null;
      time_units: { name: string } | null;
    }> | null };

  return (
    <div>
      <PageHeader title="작업 이력" description="내가 수행한 작업 내역" />

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
              <p className="text-sm text-text-muted">{d.company_name}</p>
              <p className="text-sm text-text-muted">{d.site_address}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold tabular-nums">{formatPrice(d.price)}원</span>
                <span className="text-xs text-text-muted">
                  {d.completed_at
                    ? new Date(d.completed_at).toLocaleDateString("ko-KR")
                    : new Date(d.created_at).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="🚧" title="아직 작업 이력이 없습니다" />
      )}
    </div>
  );
}
