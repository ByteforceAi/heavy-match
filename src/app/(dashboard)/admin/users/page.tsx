import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPhone, getRoleLabel } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { RoleBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function AdminUsersPage() {
  const supabase = await createServerSupabaseClient();

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100) as unknown as { data: Array<{
      id: string; name: string; phone: string; role: string;
      company_name: string | null; region_sido: string | null;
      region_sigungu: string | null; created_at: string;
    }> | null };

  // 역할별 카운트
  const roleCounts: Record<string, number> = {};
  users?.forEach((u) => {
    roleCounts[u.role] = (roleCounts[u.role] || 0) + 1;
  });

  return (
    <div>
      <PageHeader title="사용자 관리" description="전체 사용자 목록" />

      {/* 역할별 필터 카드 */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
        {["requester", "owner", "operator", "callcenter", "salesperson", "admin"].map((role) => (
          <div key={role} className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold tabular-nums">{roleCounts[role] ?? 0}</p>
            <p className="text-xs text-text-muted">{getRoleLabel(role)}</p>
          </div>
        ))}
      </div>

      {users && users.length > 0 ? (
        <div className="space-y-2">
          {users.map((u) => (
            <Card key={u.id} className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{u.name}</span>
                  <RoleBadge role={u.role} />
                </div>
                <p className="text-sm text-text-muted">{formatPhone(u.phone)}</p>
                {u.company_name && <p className="text-xs text-text-muted">{u.company_name}</p>}
                {u.region_sido && <p className="text-xs text-text-muted">{u.region_sido} {u.region_sigungu}</p>}
              </div>
              <span className="text-xs text-text-muted">
                {new Date(u.created_at).toLocaleDateString("ko-KR")}
              </span>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="👥" title="등록된 사용자가 없습니다" />
      )}
    </div>
  );
}
