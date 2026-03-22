import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function RequesterRewardsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 요청자의 적립금 (수수료에서 requester_reward)
  const { data: commissions } = await supabase
    .from("commissions")
    .select("requester_reward, total_price, created_at, dispatch_requests(equipment_types(name), equipment_specs(spec_name))")
    .eq("is_cancelled", false)
    .order("created_at", { ascending: false })
    .limit(50) as unknown as { data: Array<{
      requester_reward: number; total_price: number; created_at: string;
      dispatch_requests: { equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null } | null;
    }> | null };

  // 요청자 본인 건만 필터 (RLS가 처리하지만 추가 안전장치)
  const totalRewards = commissions?.reduce((sum, c) => sum + c.requester_reward, 0) ?? 0;

  return (
    <div>
      <PageHeader title="적립금 내역" description="장비 이용 시 적립된 포인트" />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard icon="💰" value={`${formatPrice(totalRewards)}원`} label="총 적립금" color="text-success" />
        <StatCard icon="📊" value={commissions?.length ?? 0} label="적립 건수" />
      </div>

      {commissions && commissions.length > 0 ? (
        <div className="space-y-2">
          {commissions.map((c, i) => (
            <Card key={i} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">
                  {c.dispatch_requests?.equipment_types?.name} {c.dispatch_requests?.equipment_specs?.spec_name}
                </p>
                <p className="text-xs text-text-muted">
                  {new Date(c.created_at).toLocaleDateString("ko-KR")} · 이용금액 {formatPrice(c.total_price)}원
                </p>
              </div>
              <span className="font-bold tabular-nums text-success text-lg">+{formatPrice(c.requester_reward)}원</span>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="💰" title="아직 적립 내역이 없습니다" description="장비를 이용하면 5%가 적립됩니다" />
      )}
    </div>
  );
}
