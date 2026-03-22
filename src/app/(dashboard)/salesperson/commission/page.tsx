import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, StatCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function SalespersonCommissionPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: commissions } = await supabase
    .from("commissions")
    .select("*")
    .eq("salesperson_id", user!.id)
    .eq("is_cancelled", false)
    .order("created_at", { ascending: false })
    .limit(50) as unknown as { data: Array<{
      id: number; total_price: number; salesperson_fee: number; created_at: string;
    }> | null };

  const totalFee = commissions?.reduce((sum, c) => sum + c.salesperson_fee, 0) ?? 0;
  const thisMonth = commissions?.filter((c) => {
    const d = new Date(c.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }) ?? [];
  const monthlyFee = thisMonth.reduce((sum, c) => sum + c.salesperson_fee, 0);

  return (
    <div>
      <PageHeader title="수수료 상세" description="영업사원 수수료 내역" />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard icon="💰" value={`${formatPrice(totalFee)}원`} label="누적 수수료" color="text-success" />
        <StatCard icon="📅" value={`${formatPrice(monthlyFee)}원`} label="이번 달" color="text-primary" />
      </div>

      <h3 className="text-lg font-semibold mb-3">거래 내역</h3>
      {commissions && commissions.length > 0 ? (
        <div className="space-y-2">
          {commissions.map((c) => (
            <Card key={c.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">이용금액 {formatPrice(c.total_price)}원</p>
                <p className="text-xs text-text-muted">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
              </div>
              <span className="font-bold tabular-nums text-success text-lg">+{formatPrice(c.salesperson_fee)}원</span>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="💰" title="아직 수수료 내역이 없습니다" description="소속 콜센터의 사장 건이 완료되면 수수료가 적립됩니다" />
      )}
    </div>
  );
}
