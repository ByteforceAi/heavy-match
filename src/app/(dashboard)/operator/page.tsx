import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import OperatorActions from "./OperatorActions";

export default async function OperatorHome() {
  type DispatchItem = {
    id: string; status: string; price: number; site_address: string;
    company_name: string; site_manager_name: string | null; site_manager_phone: string | null;
    equipment_types: { name: string } | null;
    equipment_specs: { spec_name: string } | null;
    time_units: { name: string } | null;
  };
  let dispatches: DispatchItem[] | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("dispatch_requests")
      .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .eq("assigned_operator_id", user!.id)
      .not("status", "in", '("completed","cancelled","pending","exclusive_call","callcenter_call","shared_call","matched")')
      .order("created_at", { ascending: false }) as unknown as { data: DispatchItem[] | null };

    dispatches = data;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text">현재 배차</h2>

      {dispatches && dispatches.length > 0 ? (
        <div className="space-y-3">
          {dispatches.map((d) => (
            <Card key={d.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">
                  {d.equipment_types?.name} {d.equipment_specs?.spec_name}
                </span>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-sm text-text-muted">{d.site_address}</p>
              <p className="text-sm text-text-muted">{d.company_name}</p>
              <p className="text-xl font-bold tabular-nums text-primary mt-2">{formatPrice(d.price)}원</p>

              {d.site_manager_phone && (
                <a href={`tel:${d.site_manager_phone}`} className="inline-flex items-center gap-1 mt-2 px-3 py-2 bg-blue-50 rounded-lg text-sm text-primary font-medium">
                  📞 {d.site_manager_name} ({d.site_manager_phone})
                </a>
              )}

              <OperatorActions dispatchId={d.id} status={d.status} />
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="🚧" title="현재 배정된 작업이 없습니다" description="사장님이 기사를 배정하면 여기에 표시됩니다" />
      )}
    </div>
  );
}
