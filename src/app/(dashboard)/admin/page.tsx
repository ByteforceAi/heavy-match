import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  // 통계 쿼리
  const [
    { count: totalUsers },
    { count: totalDispatches },
    { count: completedDispatches },
    { data: commissions },
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("dispatch_requests").select("*", { count: "exact", head: true }),
    supabase.from("dispatch_requests").select("*", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("commissions").select("company_fee").eq("is_cancelled", false),
  ]);

  const totalRevenue = commissions?.reduce((sum, c) => sum + c.company_fee, 0) ?? 0;

  const stats = [
    { label: "총 사용자", value: totalUsers ?? 0, icon: "👥" },
    { label: "총 배차", value: totalDispatches ?? 0, icon: "🚧" },
    { label: "완료 건수", value: completedDispatches ?? 0, icon: "✅" },
    { label: "본사 수익", value: `${formatPrice(totalRevenue)}원`, icon: "💰" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text">관리자 대시보드</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-4 shadow-sm border border-border text-center">
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-2xl font-bold tabular-nums text-text mt-1">{stat.value}</p>
            <p className="text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
