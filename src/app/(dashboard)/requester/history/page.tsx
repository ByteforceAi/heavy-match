import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function RequesterHistoryPage() {
  let dispatches: Array<{
    id: string; status: string; price: number; site_address: string;
    company_name: string; created_at: string;
    equipment_types: { name: string } | null;
    equipment_specs: { spec_name: string } | null;
    time_units: { name: string } | null;
  }> | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("dispatch_requests")
      .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .eq("requester_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(50) as unknown as { data: Array<{
      id: string; status: string; price: number; site_address: string;
      company_name: string; created_at: string;
      equipment_types: { name: string } | null;
      equipment_specs: { spec_name: string } | null;
      time_units: { name: string } | null;
    }> | null };

    dispatches = data;
  }

  return (
    <div>
      <PageHeader title="요청 이력" description="내가 요청한 장비 배차 내역" />

      {dispatches && dispatches.length > 0 ? (
        <div className="space-y-3">
          {dispatches.map((d) => (
            <Card key={d.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-base">
                  {d.equipment_types?.name} {d.equipment_specs?.spec_name}
                </span>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-sm text-text-muted">{d.site_address}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold tabular-nums text-primary">{formatPrice(d.price)}원</span>
                <span className="text-xs text-text-muted">
                  {new Date(d.created_at).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📋"
          title="아직 요청 이력이 없습니다"
          actionLabel="장비 요청하기"
          actionHref="/requester/request"
        />
      )}
    </div>
  );
}
