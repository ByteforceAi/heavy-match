import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { formatPrice, getStatusLabel, getStatusColor } from "@/lib/utils";

export default async function CallcenterHome() {
  let dispatches: Array<{ id: string; status: string; price: number; site_address: string; company_name: string; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null; time_units: { name: string } | null }> | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 콜센터로 전달된 건들
    const { data } = await supabase
      .from("dispatch_requests")
      .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .eq("original_callcenter_id", user!.id)
      .not("status", "in", '("completed","cancelled","pending")')
      .order("created_at", { ascending: false }) as { data: Array<{ id: string; status: string; price: number; site_address: string; company_name: string; equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null; time_units: { name: string } | null }> | null };

    dispatches = data;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text">전달된 콜 관리</h2>

      {dispatches && dispatches.length > 0 ? (
        <div className="space-y-3">
          {dispatches.map((d) => (
            <div key={d.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">
                  {(d.equipment_types as { name: string })?.name}{" "}
                  {(d.equipment_specs as { spec_name: string })?.spec_name}
                </span>
                <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(d.status)}`}>
                  {getStatusLabel(d.status)}
                </span>
              </div>
              <p className="text-sm text-text-muted">{d.site_address}</p>
              <p className="text-lg font-bold tabular-nums mt-1">{formatPrice(d.price)}원</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl p-8 text-center text-text-muted">
          전달된 콜이 없습니다
        </div>
      )}
    </div>
  );
}
