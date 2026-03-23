"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Card, StatCard } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import SignatureCanvas from "@/components/SignatureCanvas";
import { DEMO_DISPATCHES, DEMO_COMMISSIONS, DEMO_OPERATORS, DEMO_OWNERS, DEMO_CALL_HISTORY, DEMO_ALL_USERS } from "@/lib/demoData";

export default function DemoSubPage() {
  const params = useParams<{ role: string; subpage: string[] }>();
  const role = params.role;
  const subpage = params.subpage?.join("/") ?? "";
  const key = `${role}/${subpage}`;

  switch (key) {
    // ── 장비요청자 ──
    case "requester/request":
      return <DemoRequest />;
    case "requester/history":
      return <DemoHistory dispatches={DEMO_DISPATCHES} title="요청 이력" desc="내가 요청한 장비 배차 내역" />;
    case "requester/rewards":
      return <DemoRewards />;

    // ── 중장비사장 ──
    case "owner/prices":
      return <DemoPrices />;
    case "owner/operators":
      return <DemoOperators />;
    case "owner/history":
      return <DemoHistory dispatches={DEMO_DISPATCHES.filter(d => d.status === "matched" || d.status === "completed")} title="매칭 이력" desc="내가 수락한 배차 내역" />;
    case "owner/invite":
      return <DemoInvite />;

    // ── 기사 ──
    case "operator/history":
      return <DemoHistory dispatches={DEMO_DISPATCHES.filter(d => ["completed", "in_progress"].includes(d.status))} title="작업 이력" desc="내가 수행한 작업 내역" />;

    // ── 콜센터 ──
    case "callcenter/owners":
      return <DemoCallcenterOwners />;
    case "callcenter/commission":
      return <DemoCommission type="callcenter" />;

    // ── 영업사원 ──
    case "salesperson/commission":
      return <DemoCommission type="salesperson" />;

    // ── 관리자 ──
    case "admin/dispatch":
      return <DemoAdminDispatch />;
    case "admin/users":
      return <DemoAdminUsers />;
    case "admin/commission":
      return <DemoAdminCommission />;
    case "admin/settings":
      return <DemoSettings />;

    default:
      return (
        <EmptyState icon="🔧" title={`${key} 페이지`} description="데모 서브페이지" />
      );
  }
}

// ── Sub components ──────────────────────────

function DemoRequest() {
  const EQUIPMENT = [
    { id: 1, name: "크레인", icon: "🏗️" },
    { id: 2, name: "스카이", icon: "🔝" },
    { id: 3, name: "카고크레인", icon: "🚛" },
    { id: 4, name: "거미크레인", icon: "🕷️" },
    { id: 5, name: "펌프카", icon: "💧" },
    { id: 6, name: "굴삭기", icon: "⛏️" },
    { id: 7, name: "지게차", icon: "📦" },
    { id: 8, name: "덤프", icon: "🚚" },
  ];

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex gap-1">
        {[1,2,3,4,5,6].map(s => (
          <div key={s} className={`flex-1 h-2 rounded-full ${s <= 1 ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>
      <h3 className="text-xl font-bold">장비 선택</h3>
      <div className="grid grid-cols-2 gap-3">
        {EQUIPMENT.map(eq => (
          <button key={eq.id} className="bg-card rounded-xl p-4 text-center border-2 border-border hover:border-primary transition shadow-sm">
            <span className="text-3xl block mb-1">{eq.icon}</span>
            <span className="text-base font-semibold">{eq.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DemoHistory({ dispatches, title, desc }: { dispatches: typeof DEMO_DISPATCHES; title: string; desc: string }) {
  return (
    <div>
      <PageHeader title={title} description={desc} />
      <div className="space-y-3">
        {dispatches.map(d => (
          <Card key={d.id}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-base">{d.equipment_types.name} {d.equipment_specs.spec_name}</span>
              <StatusBadge status={d.status} />
            </div>
            <p className="text-sm text-text-muted">{d.site_address}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold tabular-nums text-primary">{formatPrice(d.price)}원</span>
              <span className="text-xs text-text-muted">{new Date(d.created_at).toLocaleDateString("ko-KR")}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemoRewards() {
  const totalRewards = DEMO_COMMISSIONS.reduce((s, c) => s + c.requester_reward, 0);
  return (
    <div>
      <PageHeader title="적립금 내역" description="장비 이용 시 적립된 포인트" />
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard icon="💰" value={`${formatPrice(totalRewards)}원`} label="총 적립금" color="text-success" />
        <StatCard icon="📊" value={DEMO_COMMISSIONS.length} label="적립 건수" />
      </div>
      <div className="space-y-2">
        {DEMO_COMMISSIONS.map(c => (
          <Card key={c.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{formatPrice(c.total_price)}원 건</p>
              <p className="text-xs text-text-muted">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
            </div>
            <span className="font-bold tabular-nums text-success text-lg">+{formatPrice(c.requester_reward)}원</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemoPrices() {
  const TYPES = ["크레인","스카이","카고크레인","거미크레인","펌프카","굴삭기","지게차","덤프"];
  const SPECS: Record<string, string[]> = { "크레인": ["25T","50T","70T","100T","200T"], "굴삭기": ["0.6T","1T","3T","6T","8T","20T","30T"] };
  const TIMES = ["1시간","오전(4h)","오후(4h)","하루(8h)"];

  return (
    <div className="space-y-4">
      <PageHeader title="단가 설정" description="장비×규격×시간 매트릭스" action={<button className="px-6 py-2 bg-primary text-white font-semibold rounded-xl">저장</button>} />
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TYPES.map((t, i) => (
          <button key={t} className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium ${i === 0 ? "bg-primary text-white" : "bg-card border border-border"}`}>{t}</button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border">
            <th className="text-left p-2 font-medium text-text-muted">규격</th>
            {TIMES.map(t => <th key={t} className="text-center p-2 font-medium text-text-muted">{t}</th>)}
          </tr></thead>
          <tbody>
            {(SPECS["크레인"] || []).map(spec => (
              <tr key={spec} className="border-b border-border">
                <td className="p-2 font-semibold">{spec}</td>
                {TIMES.map(t => (
                  <td key={t} className="p-1">
                    <input type="number" placeholder="0" defaultValue={spec === "50T" ? "300000" : ""} className="w-full px-2 py-2 text-sm text-right border border-border rounded-lg tabular-nums" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DemoOperators() {
  return (
    <div>
      <PageHeader title="소속 기사 관리" action={<button className="px-4 py-2 bg-primary text-white font-medium rounded-xl text-sm">+ 기사 추가</button>} />
      <div className="space-y-3">
        {DEMO_OPERATORS.map(op => (
          <Card key={op.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-base">{op.name}</p>
              <p className="text-sm text-text-muted">{op.phone}</p>
            </div>
            <button className="px-4 py-2 bg-success text-white rounded-xl text-sm font-medium">전화</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemoInvite() {
  return (
    <div>
      <PageHeader title="장비요청자 초대" description="건설사 현장소장에게 링크를 보내세요" />
      <Card className="space-y-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm font-medium text-primary mb-2">초대 링크</p>
          <p className="text-xs text-text-muted break-all font-mono bg-white rounded-lg p-3 border border-border">
            https://heavy-match.vercel.app/register?ref=demo-own-1
          </p>
        </div>
        <button className="w-full py-4 text-lg font-bold rounded-xl bg-primary text-white">링크 복사</button>
      </Card>
    </div>
  );
}

function DemoCallcenterOwners() {
  return (
    <div>
      <PageHeader title="소속 사장 관리" />
      <div className="space-y-3">
        {DEMO_OWNERS.map(o => (
          <Card key={o.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-base">{o.name}</p>
              <p className="text-sm text-text-muted">{o.company_name}</p>
              <p className="text-xs text-text-muted">{o.region_sido} {o.region_sigungu}</p>
            </div>
            <button className="px-4 py-2 bg-success text-white rounded-xl text-sm font-medium">전화</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemoCommission({ type }: { type: "callcenter" | "salesperson" }) {
  const feeKey = type === "callcenter" ? "callcenter_fee" : "salesperson_fee";
  const total = DEMO_COMMISSIONS.reduce((s, c) => s + c[feeKey], 0);

  return (
    <div>
      <PageHeader title="수수료 내역" />
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard icon="💰" value={`${formatPrice(total)}원`} label="누적 수수료" color="text-success" />
        <StatCard icon="📊" value={DEMO_COMMISSIONS.length} label="건수" />
      </div>
      <div className="space-y-2">
        {DEMO_COMMISSIONS.map(c => (
          <Card key={c.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">거래 {formatPrice(c.total_price)}원</p>
              <p className="text-xs text-text-muted">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
            </div>
            <span className="font-bold tabular-nums text-success">+{formatPrice(c[feeKey])}원</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemoAdminDispatch() {
  return (
    <div>
      <PageHeader title="전체 배차 현황" />
      <div className="space-y-3">
        {DEMO_DISPATCHES.map(d => (
          <Card key={d.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">{d.equipment_types.name} {d.equipment_specs.spec_name}</span>
              <StatusBadge status={d.status} />
            </div>
            <p className="text-sm text-text-muted">{d.company_name} · {d.site_address}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold tabular-nums text-primary">{formatPrice(d.price)}원</span>
              <span className="text-xs text-text-muted">{new Date(d.created_at).toLocaleString("ko-KR")}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemoAdminUsers() {
  return (
    <div>
      <PageHeader title="사용자 관리" />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
        {(["requester","owner","operator","callcenter","salesperson","admin"] as const).map(role => {
          const labels: Record<string, string> = { requester:"장비요청자", owner:"중장비사장", operator:"기사", callcenter:"콜센터", salesperson:"영업사원", admin:"관리자" };
          const count = DEMO_ALL_USERS.filter(u => u.role === role).length;
          return (
            <div key={role} className="bg-card rounded-xl p-3 text-center border border-border">
              <p className="text-xl font-bold tabular-nums">{count}</p>
              <p className="text-xs text-text-muted">{labels[role]}</p>
            </div>
          );
        })}
      </div>
      <div className="space-y-2">
        {DEMO_ALL_USERS.map(u => (
          <Card key={u.id} className="flex items-center justify-between">
            <div>
              <span className="font-semibold">{u.name}</span>
              {u.company_name && <span className="text-sm text-text-muted ml-2">{u.company_name}</span>}
            </div>
            <StatusBadge status={u.role} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemoAdminCommission() {
  const totals = {
    company: DEMO_COMMISSIONS.reduce((s, c) => s + c.company_fee, 0),
    callcenter: DEMO_COMMISSIONS.reduce((s, c) => s + c.callcenter_fee, 0),
    salesperson: DEMO_COMMISSIONS.reduce((s, c) => s + c.salesperson_fee, 0),
    requester: DEMO_COMMISSIONS.reduce((s, c) => s + c.requester_reward, 0),
  };
  return (
    <div>
      <PageHeader title="수수료 현황" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard icon="🏢" value={`${formatPrice(totals.company)}원`} label="본사 수익" color="text-success" />
        <StatCard icon="📞" value={`${formatPrice(totals.callcenter)}원`} label="콜센터" color="text-purple-600" />
        <StatCard icon="👤" value={`${formatPrice(totals.salesperson)}원`} label="영업사원" color="text-pink-600" />
        <StatCard icon="🎁" value={`${formatPrice(totals.requester)}원`} label="건설사 적립" color="text-blue-600" />
      </div>
      <div className="space-y-2">
        {DEMO_COMMISSIONS.map(c => (
          <Card key={c.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm">거래 {formatPrice(c.total_price)}원</span>
              <span className="text-xs text-text-muted">{new Date(c.created_at).toLocaleDateString("ko-KR")}</span>
            </div>
            <div className="grid grid-cols-4 gap-1 text-xs text-center">
              <div className="bg-green-50 rounded p-1"><p className="text-text-muted">본사</p><p className="font-bold tabular-nums">{formatPrice(c.company_fee)}</p></div>
              <div className="bg-purple-50 rounded p-1"><p className="text-text-muted">콜센터</p><p className="font-bold tabular-nums">{formatPrice(c.callcenter_fee)}</p></div>
              <div className="bg-pink-50 rounded p-1"><p className="text-text-muted">영업</p><p className="font-bold tabular-nums">{formatPrice(c.salesperson_fee)}</p></div>
              <div className="bg-blue-50 rounded p-1"><p className="text-text-muted">적립</p><p className="font-bold tabular-nums">{formatPrice(c.requester_reward)}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemoSettings() {
  const TYPES = [
    { name: "크레인", icon: "🏗️", specs: ["25T","50T","70T","100T","200T"] },
    { name: "굴삭기", icon: "⛏️", specs: ["0.6T","1T","3T","6T","8T","20T","30T"] },
    { name: "스카이", icon: "🔝", specs: ["45m","52m","58m","65m"] },
  ];
  return (
    <div>
      <PageHeader title="마스터 데이터 설정" description="장비 종류, 규격, 시간 단위 관리" />
      <Card className="mb-4">
        <h3 className="font-bold text-lg mb-3">장비 종류</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TYPES.map(t => (
            <div key={t.name} className="p-3 rounded-xl border-2 border-border text-center">
              <span className="text-2xl block">{t.icon}</span>
              <span className="text-sm font-semibold">{t.name}</span>
              <p className="text-xs text-text-muted mt-1">{t.specs.join(", ")}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
