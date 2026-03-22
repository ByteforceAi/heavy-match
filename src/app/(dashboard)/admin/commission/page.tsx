import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, StatCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function AdminCommissionPage() {
  const supabase = await createServerSupabaseClient();

  const { data: commissions } = await supabase
    .from("commissions")
    .select("*")
    .eq("is_cancelled", false)
    .order("created_at", { ascending: false })
    .limit(100) as unknown as { data: Array<{
      id: number; total_price: number; total_commission: number;
      requester_reward: number; company_fee: number;
      callcenter_fee: number; salesperson_fee: number;
      created_at: string;
    }> | null };

  const totals = {
    revenue: commissions?.reduce((s, c) => s + c.total_price, 0) ?? 0,
    commission: commissions?.reduce((s, c) => s + c.total_commission, 0) ?? 0,
    company: commissions?.reduce((s, c) => s + c.company_fee, 0) ?? 0,
    callcenter: commissions?.reduce((s, c) => s + c.callcenter_fee, 0) ?? 0,
    salesperson: commissions?.reduce((s, c) => s + c.salesperson_fee, 0) ?? 0,
    requester: commissions?.reduce((s, c) => s + c.requester_reward, 0) ?? 0,
  };

  return (
    <div>
      <PageHeader title="수수료 현황" description="전체 수수료 분배 현황" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard icon="💵" value={`${formatPrice(totals.revenue)}원`} label="총 거래액" />
        <StatCard icon="📊" value={`${formatPrice(totals.commission)}원`} label="총 수수료 (15%)" color="text-accent" />
        <StatCard icon="🏢" value={`${formatPrice(totals.company)}원`} label="본사 수익 (5%)" color="text-success" />
        <StatCard icon="📞" value={`${formatPrice(totals.callcenter)}원`} label="콜센터 (2.5%)" color="text-purple-600" />
        <StatCard icon="👤" value={`${formatPrice(totals.salesperson)}원`} label="영업사원 (2.5%)" color="text-pink-600" />
        <StatCard icon="🎁" value={`${formatPrice(totals.requester)}원`} label="건설사 적립 (5%)" color="text-blue-600" />
      </div>

      <h3 className="text-lg font-semibold mb-3">최근 수수료 내역</h3>
      {commissions && commissions.length > 0 ? (
        <div className="space-y-2">
          {commissions.map((c) => (
            <Card key={c.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">거래 {formatPrice(c.total_price)}원</span>
                <span className="text-xs text-text-muted">{new Date(c.created_at).toLocaleDateString("ko-KR")}</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-xs text-center">
                <div className="bg-green-50 rounded p-1">
                  <p className="text-text-muted">본사</p>
                  <p className="font-bold tabular-nums">{formatPrice(c.company_fee)}</p>
                </div>
                <div className="bg-purple-50 rounded p-1">
                  <p className="text-text-muted">콜센터</p>
                  <p className="font-bold tabular-nums">{formatPrice(c.callcenter_fee)}</p>
                </div>
                <div className="bg-pink-50 rounded p-1">
                  <p className="text-text-muted">영업</p>
                  <p className="font-bold tabular-nums">{formatPrice(c.salesperson_fee)}</p>
                </div>
                <div className="bg-blue-50 rounded p-1">
                  <p className="text-text-muted">적립</p>
                  <p className="font-bold tabular-nums">{formatPrice(c.requester_reward)}</p>
                </div>
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
