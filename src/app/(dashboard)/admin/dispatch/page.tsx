import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function AdminDispatchPage() {
  let dispatches: Array<{
    id: string; status: string; price: number; site_address: string;
    company_name: string; created_at: string; requester_name: string | null;
    equipment_types: { name: string } | null;
    equipment_specs: { spec_name: string } | null;
    time_units: { name: string } | null;
  }> | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();

    const { data } = await supabase
      .from("dispatch_requests")
      .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .order("created_at", { ascending: false })
      .limit(100) as unknown as { data: Array<{
      id: string; status: string; price: number; site_address: string;
      company_name: string; created_at: string; requester_name: string | null;
      equipment_types: { name: string } | null;
      equipment_specs: { spec_name: string } | null;
      time_units: { name: string } | null;
    }> | null };

    dispatches = data;
  }

  const statusCounts: Record<string, number> = {};
  dispatches?.forEach((d) => {
    statusCounts[d.status] = (statusCounts[d.status] || 0) + 1;
  });

  return (
    <div>
      <PageHeader title="전체 배차 현황" description="모든 배차 요청 관리" />

      {/* 상태별 카운트 */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="flex-shrink-0">
            <StatusBadge status={status} />
            <span className="ml-1 text-sm font-bold tabular-nums">{count}</span>
          </div>
        ))}
      </div>

      {dispatches && dispatches.length > 0 ? (
        <div className="space-y-3">
          {dispatches.map((d) => (
            <Card key={d.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold">
                  {d.equipment_types?.name} {d.equipment_specs?.spec_name}
                </span>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-sm text-text-muted">{d.company_name} · {d.site_address}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold tabular-nums text-primary">{formatPrice(d.price)}원</span>
                <span className="text-xs text-text-muted font-mono">{d.id.slice(0, 8)}</span>
              </div>
              <p className="text-xs text-text-muted mt-1">
                {new Date(d.created_at).toLocaleString("ko-KR")}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="🚧" title="배차 요청이 없습니다" />
      )}
    </div>
  );
}
