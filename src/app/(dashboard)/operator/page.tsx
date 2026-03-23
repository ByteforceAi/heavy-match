import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { formatPrice, getStatusLabel, getStatusColor } from "@/lib/utils";
import Link from "next/link";

export default async function OperatorHome() {
  let dispatches: Array<{ id: string; status: string; price: number; site_address: string; company_name: string; site_manager_name: string | null; site_manager_phone: string | null; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null; time_units: { name: string } | null }> | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("dispatch_requests")
      .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .eq("assigned_operator_id", user!.id)
      .not("status", "in", '("completed","cancelled","pending","exclusive_call","callcenter_call","shared_call","matched")')
      .order("created_at", { ascending: false }) as unknown as { data: Array<{ id: string; status: string; price: number; site_address: string; company_name: string; site_manager_name: string | null; site_manager_phone: string | null; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null; time_units: { name: string } | null }> | null };

    dispatches = data;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text">현재 배차</h2>

      {dispatches && dispatches.length > 0 ? (
        <div className="space-y-3">
          {dispatches.map((d) => (
            <div key={d.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">
                  {(d.equipment_types as { name: string })?.name}{" "}
                  {(d.equipment_specs as { spec_name: string })?.spec_name}
                </span>
                <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(d.status)}`}>
                  {getStatusLabel(d.status)}
                </span>
              </div>
              <p className="text-sm text-text-muted">{d.site_address}</p>
              <p className="text-sm text-text-muted">{d.company_name}</p>
              <p className="text-lg font-bold tabular-nums text-primary mt-2">{formatPrice(d.price)}원</p>

              {d.site_manager_phone && (
                <a
                  href={`tel:${d.site_manager_phone}`}
                  className="inline-block mt-2 text-sm text-primary font-medium"
                >
                  현장담당: {d.site_manager_name} ({d.site_manager_phone})
                </a>
              )}

              {d.status === "in_progress" && (
                <Link
                  href={`/operator/complete/${d.id}`}
                  className="block mt-3 py-3 bg-success text-white text-center font-semibold rounded-xl text-lg"
                >
                  작업 완료 서명
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl p-8 text-center text-text-muted">
          현재 배정된 작업이 없습니다
        </div>
      )}
    </div>
  );
}
