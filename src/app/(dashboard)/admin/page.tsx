import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Card, StatCard } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";

export default async function AdminDashboard() {
  let totalUsers = 0;
  let totalDispatches = 0;
  let completedDispatches = 0;
  let activeDispatches = 0;
  let totalRevenue = 0;
  let recent: Array<{
    id: string; status: string; price: number; company_name: string; created_at: string;
    equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null;
  }> | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();

    const [
      { count: _totalUsers },
      { count: _totalDispatches },
      { count: _completedDispatches },
      { count: _activeDispatches },
      { data: commissions },
      { data: recentDispatches },
    ] = await Promise.all([
      supabase.from("users").select("*", { count: "exact", head: true }),
      supabase.from("dispatch_requests").select("*", { count: "exact", head: true }),
      supabase.from("dispatch_requests").select("*", { count: "exact", head: true }).eq("status", "completed"),
      supabase.from("dispatch_requests").select("*", { count: "exact", head: true }).not("status", "in", '("completed","cancelled")'),
      supabase.from("commissions").select("company_fee").eq("is_cancelled", false),
      supabase.from("dispatch_requests")
        .select("id, status, price, company_name, created_at, equipment_types(name), equipment_specs(spec_name)")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    totalUsers = _totalUsers ?? 0;
    totalDispatches = _totalDispatches ?? 0;
    completedDispatches = _completedDispatches ?? 0;
    activeDispatches = _activeDispatches ?? 0;
    totalRevenue = (commissions as unknown as Array<{ company_fee: number }>)?.reduce((sum, c) => sum + c.company_fee, 0) ?? 0;
    recent = recentDispatches as unknown as Array<{
      id: string; status: string; price: number; company_name: string; created_at: string;
      equipment_types: { name: string } | null; equipment_specs: { spec_name: string } | null;
    }> | null;
  }

  const quickLinks = [
    { href: "/admin/dispatch", label: "배차 현황", icon: "🚧", desc: "전체 배차 관리" },
    { href: "/admin/users", label: "사용자 관리", icon: "👥", desc: "역할별 사용자" },
    { href: "/admin/commission", label: "수수료 현황", icon: "💰", desc: "정산·분배 관리" },
    { href: "/admin/settings", label: "마스터 설정", icon: "⚙️", desc: "장비·규격·시간" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text">관리자 대시보드</h2>
        <p className="text-sm text-text-muted">철연 CHEOLYEON 플랫폼 현황</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="👥" value={totalUsers} label="총 사용자" />
        <StatCard icon="🚧" value={activeDispatches} label="진행중 배차" color="text-accent" />
        <StatCard icon="✅" value={completedDispatches} label="완료 건수" color="text-success" />
        <StatCard icon="💰" value={`${formatPrice(totalRevenue)}원`} label="본사 수익" color="text-success" />
      </div>

      {/* 바로가기 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card hover className="text-center h-full">
              <span className="text-2xl block mb-1">{link.icon}</span>
              <p className="font-semibold text-sm">{link.label}</p>
              <p className="text-xs text-text-muted">{link.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* 최근 배차 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">최근 배차</h3>
          <Link href="/admin/dispatch" className="text-sm text-primary font-medium">전체보기 →</Link>
        </div>
        {recent && recent.length > 0 ? (
          <div className="space-y-2">
            {recent.map((d) => (
              <Card key={d.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">
                    {d.equipment_types?.name} {d.equipment_specs?.spec_name}
                  </p>
                  <p className="text-xs text-text-muted">{d.company_name}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={d.status} />
                  <p className="text-xs text-text-muted mt-1 tabular-nums">{formatPrice(d.price)}원</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center text-text-muted py-6">아직 배차 데이터가 없습니다</Card>
        )}
      </section>
    </div>
  );
}
