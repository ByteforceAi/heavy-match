import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";

export default async function SalespersonHome() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: commissions } = await supabase
    .from("commissions")
    .select("*, dispatch_requests(equipment_types(name), equipment_specs(spec_name), company_name)")
    .eq("salesperson_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(20) as unknown as { data: Array<{ id: number; total_price: number; salesperson_fee: number; created_at: string }> | null };

  const totalEarnings = commissions?.reduce((sum, c) => sum + c.salesperson_fee, 0) ?? 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text">분양 현황</h2>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <p className="text-sm text-text-muted">누적 수수료</p>
        <p className="text-3xl font-bold tabular-nums text-primary">{formatPrice(totalEarnings)}원</p>
      </div>

      <section>
        <h3 className="text-lg font-semibold text-text mb-3">최근 수수료 내역</h3>
        {commissions && commissions.length > 0 ? (
          <div className="space-y-2">
            {commissions.map((c) => (
              <div key={c.id} className="bg-card rounded-xl p-4 shadow-sm border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{formatPrice(c.total_price)}원 건</p>
                  <p className="text-xs text-text-muted">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
                </div>
                <span className="font-bold tabular-nums text-success">+{formatPrice(c.salesperson_fee)}원</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl p-8 text-center text-text-muted">
            아직 수수료 내역이 없습니다
          </div>
        )}
      </section>
    </div>
  );
}
