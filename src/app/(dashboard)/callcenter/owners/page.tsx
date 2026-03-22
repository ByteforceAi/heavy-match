import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPhone } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function CallcenterOwnersPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: owners } = await supabase
    .from("users")
    .select("id, name, phone, company_name, region_sido, region_sigungu, created_at")
    .eq("callcenter_id", user!.id)
    .eq("role", "owner")
    .order("created_at", { ascending: false }) as unknown as { data: Array<{
      id: string; name: string; phone: string; company_name: string | null;
      region_sido: string | null; region_sigungu: string | null; created_at: string;
    }> | null };

  return (
    <div>
      <PageHeader title="소속 사장 관리" description="우리 콜센터에 소속된 중장비사장 목록" />

      {owners && owners.length > 0 ? (
        <div className="space-y-3">
          {owners.map((o) => (
            <Card key={o.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-base">{o.name}</p>
                {o.company_name && <p className="text-sm text-text-muted">{o.company_name}</p>}
                <p className="text-sm text-text-muted">{formatPhone(o.phone)}</p>
                {o.region_sido && (
                  <p className="text-xs text-text-muted mt-1">
                    {o.region_sido} {o.region_sigungu}
                  </p>
                )}
              </div>
              <a
                href={`tel:${o.phone}`}
                className="px-4 py-2 bg-success text-white rounded-xl text-sm font-medium"
              >
                전화
              </a>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="👥" title="소속 사장이 없습니다" description="영업사원이 사장을 분양하면 여기에 표시됩니다" />
      )}
    </div>
  );
}
