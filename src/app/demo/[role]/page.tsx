"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { formatPrice, getStatusLabel, getStatusColor, getRoleLabel } from "@/lib/utils";
import { Card, StatCard } from "@/components/ui/Card";
import { StatusBadge, RoleBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { DEMO_DISPATCHES, DEMO_COMMISSIONS, DEMO_OPERATORS, DEMO_OWNERS, DEMO_CALL_HISTORY, DEMO_ALL_USERS } from "@/lib/demoData";

function RequesterDemo() {
  const activeDispatches = DEMO_DISPATCHES.filter((d) =>
    !["completed", "cancelled"].includes(d.status)
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-1">장비가 필요하신가요?</h2>
        <p className="text-blue-100 text-sm mb-4">크레인, 굴삭기 등 8종 장비를 즉시 요청하세요</p>
        <button className="py-3 px-8 bg-white text-primary text-lg font-bold rounded-xl shadow">
          + 장비 요청하기
        </button>
      </div>

      <section>
        <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
          진행중 ({activeDispatches.length})
        </h3>
        <div className="space-y-3">
          {activeDispatches.map((d) => (
            <Card key={d.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-base">{d.equipment_types.name} {d.equipment_specs.spec_name}</span>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-sm text-text-muted">{d.site_address}</p>
              <p className="text-lg font-bold tabular-nums text-primary mt-1">{formatPrice(d.price)}원</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-text mb-3">빠른 재주문</h3>
        <div className="space-y-2">
          {DEMO_CALL_HISTORY.map((h) => (
            <Card key={h.id} hover>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">{h.equipment_types.name} {h.equipment_specs.spec_name}</span>
                  <p className="text-sm text-text-muted mt-0.5">{h.site_address}</p>
                </div>
                <span className="text-primary font-semibold text-sm">재주문 →</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function OwnerDemo() {
  const exclusiveCalls = DEMO_DISPATCHES.filter((d) => d.status === "exclusive_call");
  const sharedCalls = DEMO_DISPATCHES.filter((d) => d.status === "shared_call");

  const CallCard = ({ call, type }: { call: typeof DEMO_DISPATCHES[0]; type: string }) => (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">{call.equipment_types.name} {call.equipment_specs.spec_name}</span>
        <StatusBadge status={call.status} />
      </div>
      <p className="text-sm text-text-muted">{call.site_address}</p>
      <p className="text-sm text-text-muted">{call.company_name}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-lg font-bold tabular-nums text-primary">{formatPrice(call.price)}원</span>
        <span className="text-sm text-text-muted">{call.time_units.name}</span>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="flex-1 py-3 bg-success text-white font-semibold rounded-xl text-lg">수락</button>
        {type === "exclusive" && (
          <button className="flex-1 py-3 bg-danger text-white font-semibold rounded-xl text-lg">거절</button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text">콜 수신 현황</h2>
      <section>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse" /> 전용콜
        </h3>
        {exclusiveCalls.length > 0 ? (
          <div className="space-y-3">{exclusiveCalls.map((c) => <CallCard key={c.id} call={c} type="exclusive" />)}</div>
        ) : (
          <EmptyState icon="📞" title="전용콜 없음" />
        )}
      </section>
      <section>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent animate-pulse" /> 공유콜 (선착순)
        </h3>
        {sharedCalls.length > 0 ? (
          <div className="space-y-3">{sharedCalls.map((c) => <CallCard key={c.id} call={c} type="shared" />)}</div>
        ) : (
          <EmptyState icon="📞" title="공유콜 없음" />
        )}
      </section>
    </div>
  );
}

function OperatorDemo() {
  const assigned = DEMO_DISPATCHES.filter((d) => ["operator_assigned", "in_progress"].includes(d.status));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">현재 배차</h2>
      <div className="space-y-3">
        {assigned.map((d) => (
          <Card key={d.id}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg">{d.equipment_types.name} {d.equipment_specs.spec_name}</span>
              <StatusBadge status={d.status} />
            </div>
            <p className="text-sm text-text-muted">{d.site_address}</p>
            <p className="text-sm text-text-muted">{d.company_name}</p>
            <p className="text-lg font-bold tabular-nums text-primary mt-2">{formatPrice(d.price)}원</p>
            {d.site_manager_phone && (
              <p className="text-sm text-primary mt-1">현장담당: {d.site_manager_name} ({d.site_manager_phone})</p>
            )}
            {d.status === "in_progress" && (
              <button className="w-full mt-3 py-3 bg-success text-white font-semibold rounded-xl text-lg">작업 완료 서명</button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function CallcenterDemo() {
  const calls = DEMO_DISPATCHES.filter((d) => !["completed", "cancelled", "pending"].includes(d.status));

  return (
    <div className="space-y-6">
      <PageHeader title="전달된 콜 관리" />
      <div className="space-y-3">
        {calls.map((d) => (
          <Card key={d.id}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">{d.equipment_types.name} {d.equipment_specs.spec_name}</span>
              <StatusBadge status={d.status} />
            </div>
            <p className="text-sm text-text-muted">{d.site_address}</p>
            <p className="text-lg font-bold tabular-nums mt-1">{formatPrice(d.price)}원</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SalespersonDemo() {
  const totalEarnings = DEMO_COMMISSIONS.reduce((s, c) => s + c.salesperson_fee, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">분양 현황</h2>
      <Card className="bg-gradient-to-r from-primary to-blue-600 text-white border-0">
        <p className="text-sm opacity-80">누적 수수료</p>
        <p className="text-3xl font-bold tabular-nums">{formatPrice(totalEarnings)}원</p>
      </Card>
      <div className="space-y-2">
        {DEMO_COMMISSIONS.map((c) => (
          <Card key={c.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{formatPrice(c.total_price)}원 건</p>
              <p className="text-xs text-text-muted">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
            </div>
            <span className="font-bold tabular-nums text-success">+{formatPrice(c.salesperson_fee)}원</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdminDemo() {
  const totalRevenue = DEMO_COMMISSIONS.reduce((s, c) => s + c.company_fee, 0);
  const quickLinks = [
    { label: "배차 현황", icon: "🚧", desc: "전체 배차 관리" },
    { label: "사용자 관리", icon: "👥", desc: "역할별 사용자" },
    { label: "수수료 현황", icon: "💰", desc: "정산·분배 관리" },
    { label: "마스터 설정", icon: "⚙️", desc: "장비·규격·시간" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">관리자 대시보드</h2>
        <p className="text-sm text-text-muted">Heavy Match 플랫폼 현황</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="👥" value={DEMO_ALL_USERS.length} label="총 사용자" />
        <StatCard icon="🚧" value={DEMO_DISPATCHES.filter((d) => !["completed", "cancelled"].includes(d.status)).length} label="진행중 배차" color="text-accent" />
        <StatCard icon="✅" value={DEMO_DISPATCHES.filter((d) => d.status === "completed").length} label="완료 건수" color="text-success" />
        <StatCard icon="💰" value={`${formatPrice(totalRevenue)}원`} label="본사 수익" color="text-success" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickLinks.map((link) => (
          <Card key={link.label} hover className="text-center">
            <span className="text-2xl block mb-1">{link.icon}</span>
            <p className="font-semibold text-sm">{link.label}</p>
            <p className="text-xs text-text-muted">{link.desc}</p>
          </Card>
        ))}
      </div>
      <section>
        <h3 className="text-lg font-semibold mb-3">최근 배차</h3>
        <div className="space-y-2">
          {DEMO_DISPATCHES.slice(0, 5).map((d) => (
            <Card key={d.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">{d.equipment_types.name} {d.equipment_specs.spec_name}</p>
                <p className="text-xs text-text-muted">{d.company_name}</p>
              </div>
              <div className="text-right">
                <StatusBadge status={d.status} />
                <p className="text-xs text-text-muted mt-1 tabular-nums">{formatPrice(d.price)}원</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function DemoRolePage() {
  const { role } = useParams<{ role: string }>();

  switch (role) {
    case "requester": return <RequesterDemo />;
    case "owner": return <OwnerDemo />;
    case "operator": return <OperatorDemo />;
    case "callcenter": return <CallcenterDemo />;
    case "salesperson": return <SalespersonDemo />;
    case "admin": return <AdminDemo />;
    default: return <RequesterDemo />;
  }
}
