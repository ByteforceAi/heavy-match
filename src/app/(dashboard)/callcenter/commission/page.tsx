import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, StatCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function CallcenterCommissionPage() {
  let commissions: Array<{
    id: number; total_price: number; callcenter_fee: number; salesperson_fee: number; created_at: string;
  }> | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("commissions")
      .select("*")
      .eq("callcenter_id", user!.id)
      .eq("is_cancelled", false)
      .order("created_at", { ascending: false })
      .limit(50) as unknown as { data: Array<{
      id: number; total_price: number; callcenter_fee: number; salesperson_fee: number; created_at: string;
    }> | null };

    commissions = data;
  }

  const totalFee = commissions?.reduce((sum, c) => sum + c.callcenter_fee, 0) ?? 0;
  const totalSalesperson = commissions?.reduce((sum, c) => sum + c.salesperson_fee, 0) ?? 0;

  return (
    <div>
      <PageHeader title="수수료 내역" description="콜센터 수수료 현황" />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard icon="💰" value={`${formatPrice(totalFee)}원`} label="콜센터 수수료" color="text-success" />
        <StatCard icon="👤" value={`${formatPrice(totalSalesperson)}원`} label="영업사원 수수료" color="text-primary" />
      </div>

      {commissions && commissions.length > 0 ? (
        <div className="space-y-2">
          {commissions.map((c) => (
            <Card key={c.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">이용금액 {formatPrice(c.total_price)}원</p>
                <p className="text-xs text-text-muted">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
              </div>
              <div className="text-right">
                <span className="font-bold tabular-nums text-success block">+{formatPrice(c.callcenter_fee)}원</span>
                <span className="text-xs text-text-muted">(영업 {formatPrice(c.salesperson_fee)}원)</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="💰" title="아직 수수료 내역이 없습니다" />
      )}
    </div>
  );
}
