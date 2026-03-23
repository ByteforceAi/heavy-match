"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import CountdownTimer from "@/components/CountdownTimer";
import { StatusBadge } from "@/components/ui/Badge";
import { DEMO_DISPATCHES, DEMO_COMMISSIONS, DEMO_OPERATORS, DEMO_CALL_HISTORY, DEMO_ALL_USERS } from "@/lib/demoData";

/* ═══════════════════════════════════════════════
   SHARED UI PRIMITIVES (Premium Design)
   ═══════════════════════════════════════════════ */

function PremiumCard({ children, className = "", glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={`
      bg-white rounded-2xl border border-gray-100 p-5
      shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]
      hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300
      ${glow ? "ring-2 ring-primary/20 border-primary/30" : ""}
      ${className}
    `}>
      {children}
    </div>
  );
}

function GradientStat({ icon, value, label, gradient }: { icon: string; value: string | number; label: string; gradient: string }) {
  return (
    <div className={`${gradient} rounded-2xl p-4 text-white text-center shadow-lg`}>
      <span className="text-2xl block">{icon}</span>
      <p className="text-2xl font-bold tabular-nums mt-1">{value}</p>
      <p className="text-xs opacity-80 mt-0.5">{label}</p>
    </div>
  );
}

function SectionTitle({ icon, title, count, pulse }: { icon?: string; title: string; count?: number; pulse?: string }) {
  return (
    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
      {pulse && <span className={`w-3 h-3 rounded-full ${pulse} animate-pulse`} />}
      {icon && <span>{icon}</span>}
      {title}
      {count !== undefined && <span className="text-sm font-medium text-gray-400 ml-1">({count})</span>}
    </h3>
  );
}

function DemoToast({ message, type = "success" }: { message: string; type?: "success" | "error" | "info" }) {
  const styles = {
    success: "bg-emerald-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };
  return (
    <div className={`fixed top-16 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-2xl shadow-2xl text-base font-semibold animate-fade-in ${styles[type]}`}>
      {type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"} {message}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   REQUESTER DEMO
   ═══════════════════════════════════════════════ */
function RequesterDemo() {
  const [toast, setToast] = useState<string | null>(null);
  const activeDispatches = DEMO_DISPATCHES.filter((d) => !["completed", "cancelled"].includes(d.status));

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && <DemoToast message={toast} />}

      {/* CTA 배너 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">장비가 필요하신가요?</h2>
          <p className="text-blue-200 text-sm md:text-base mb-5">크레인, 굴삭기 등 8종 장비를 60초 안에 배차합니다</p>
          <button
            onClick={() => showToast("장비 요청 화면으로 이동합니다")}
            className="py-3.5 px-8 bg-white text-blue-700 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            + 장비 요청하기
          </button>
        </div>
      </div>

      {/* 진행중 */}
      <section>
        <SectionTitle title="진행중" count={activeDispatches.length} pulse="bg-blue-500" />
        <div className="space-y-3">
          {activeDispatches.slice(0, 3).map((d) => (
            <PremiumCard key={d.id} glow={d.status === "exclusive_call"}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{d.equipment_types.name === "크레인" ? "🏗️" : d.equipment_types.name === "굴삭기" ? "⛏️" : "🚧"}</span>
                  <span className="font-bold text-lg text-gray-900">{d.equipment_types.name} {d.equipment_specs.spec_name}</span>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-sm text-gray-500 ml-8">{d.site_address}</p>
              <div className="flex items-center justify-between mt-3 ml-8">
                <span className="text-xl font-bold tabular-nums text-blue-700">{formatPrice(d.price)}원</span>
                <span className="text-sm text-gray-400">{d.time_units.name}</span>
              </div>
            </PremiumCard>
          ))}
        </div>
      </section>

      {/* 빠른 재주문 */}
      <section>
        <SectionTitle icon="⚡" title="빠른 재주문" />
        <div className="space-y-2">
          {DEMO_CALL_HISTORY.map((h) => (
            <button
              key={h.id}
              onClick={() => showToast(`${h.equipment_types.name} ${h.equipment_specs.spec_name} 재주문 시작`)}
              className="w-full text-left bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all active:scale-[0.98] group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-900">{h.equipment_types.name} {h.equipment_specs.spec_name}</span>
                  <p className="text-sm text-gray-500 mt-0.5">{h.site_address}</p>
                </div>
                <span className="text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">재주문 →</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   OWNER DEMO (Interactive)
   ═══════════════════════════════════════════════ */
function OwnerDemo() {
  const [accepted, setAccepted] = useState<Set<string>>(new Set());
  const [rejected, setRejected] = useState<Set<string>>(new Set());
  const [assigned, setAssigned] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const exclusiveCalls = DEMO_DISPATCHES.filter((d) => d.status === "exclusive_call" && !accepted.has(d.id) && !rejected.has(d.id));
  const sharedCalls = DEMO_DISPATCHES.filter((d) => d.status === "shared_call" && !accepted.has(d.id));
  const matchedCalls = [
    ...DEMO_DISPATCHES.filter((d) => d.status === "matched" && !assigned.has(d.id)),
    ...DEMO_DISPATCHES.filter((d) => accepted.has(d.id) && !assigned.has(d.id)),
  ];

  const handleAccept = (id: string, name: string) => {
    setAccepted((prev) => new Set(prev).add(id));
    showToast(`${name} 수락 완료! 기사를 배정해주세요`);
  };

  const handleReject = (id: string) => {
    setRejected((prev) => new Set(prev).add(id));
    showToast("거절됨 — 콜센터로 자동 전달됩니다");
  };

  const handleAssign = (dispatchId: string, operatorName: string) => {
    setAssigned((prev) => new Set(prev).add(dispatchId));
    setShowAssignModal(null);
    showToast(`${operatorName} 기사에게 배정 완료!`);
  };

  const CallCard = ({ call, type }: { call: typeof DEMO_DISPATCHES[0]; type: "exclusive" | "shared" }) => {
    const eqIcon = call.equipment_types.name === "크레인" ? "🏗️" : call.equipment_types.name === "굴삭기" ? "⛏️" : "🚧";
    return (
      <PremiumCard glow={type === "exclusive"}>
        {type === "exclusive" && call.exclusive_call_at && (
          <div className="mb-3"><CountdownTimer startedAt={call.exclusive_call_at} /></div>
        )}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{eqIcon}</span>
            <span className="font-bold text-lg text-gray-900">{call.equipment_types.name} {call.equipment_specs.spec_name}</span>
          </div>
          <StatusBadge status={call.status} />
        </div>
        <p className="text-sm text-gray-500 ml-8">{call.site_address}</p>
        <p className="text-sm text-gray-400 ml-8">{call.company_name}</p>
        <div className="flex items-center justify-between mt-3 ml-8">
          <span className="text-xl font-bold tabular-nums text-blue-700">{formatPrice(call.price)}원</span>
          <span className="text-sm text-gray-400">{call.time_units.name}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleAccept(call.id, `${call.equipment_types.name} ${call.equipment_specs.spec_name}`)}
            className="flex-1 py-3.5 bg-emerald-500 text-white font-bold rounded-xl text-lg hover:bg-emerald-600 active:scale-95 transition-all shadow-sm"
          >
            수락
          </button>
          {type === "exclusive" && (
            <button
              onClick={() => handleReject(call.id)}
              className="flex-1 py-3.5 bg-red-500 text-white font-bold rounded-xl text-lg hover:bg-red-600 active:scale-95 transition-all shadow-sm"
            >
              거절
            </button>
          )}
        </div>
      </PremiumCard>
    );
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && <DemoToast message={toast} />}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">콜 수신 현황</h2>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg font-medium">전용 {exclusiveCalls.length}</span>
          <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-lg font-medium">공유 {sharedCalls.length}</span>
          <span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg font-medium">배정대기 {matchedCalls.length}</span>
        </div>
      </div>

      {/* 전용콜 */}
      {exclusiveCalls.length > 0 && (
        <section>
          <SectionTitle title="전용콜" pulse="bg-blue-500" />
          <div className="space-y-3">{exclusiveCalls.map((c) => <CallCard key={c.id} call={c} type="exclusive" />)}</div>
        </section>
      )}

      {/* 공유콜 */}
      {sharedCalls.length > 0 && (
        <section>
          <SectionTitle title="공유콜 (선착순)" pulse="bg-amber-500" />
          <div className="space-y-3">{sharedCalls.map((c) => <CallCard key={c.id} call={c} type="shared" />)}</div>
        </section>
      )}

      {/* 매칭 완료 — 기사 배정 대기 */}
      {matchedCalls.length > 0 && (
        <section>
          <SectionTitle title="기사 배정 대기" count={matchedCalls.length} pulse="bg-emerald-500" />
          <div className="space-y-3">
            {matchedCalls.map((c) => (
              <PremiumCard key={c.id}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🏗️</span>
                  <span className="font-bold text-lg text-gray-900">{c.equipment_types.name} {c.equipment_specs.spec_name}</span>
                  <StatusBadge status="matched" />
                </div>
                <p className="text-sm text-gray-500 ml-8">{c.site_address}</p>
                <span className="block text-xl font-bold tabular-nums text-blue-700 ml-8 mt-2">{formatPrice(c.price)}원</span>
                <button
                  onClick={() => setShowAssignModal(c.id)}
                  className="w-full mt-3 py-3.5 bg-blue-600 text-white font-bold rounded-xl text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                >
                  👷 기사 배정하기
                </button>
              </PremiumCard>
            ))}
          </div>
        </section>
      )}

      {exclusiveCalls.length === 0 && sharedCalls.length === 0 && matchedCalls.length === 0 && (
        <PremiumCard className="text-center py-12">
          <span className="text-4xl block mb-3">🎉</span>
          <h3 className="text-xl font-bold text-gray-900">모든 콜을 처리했습니다!</h3>
          <p className="text-gray-500 mt-1">새 콜이 오면 알림을 보내드립니다</p>
        </PremiumCard>
      )}

      {/* 기사 배정 모달 */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAssignModal(null)} />
          <div className="relative z-10 bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6 shadow-2xl safe-bottom animate-fade-in">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 md:hidden" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">기사 선택</h3>
            <div className="space-y-2">
              {DEMO_OPERATORS.map((op) => (
                <button
                  key={op.id}
                  onClick={() => handleAssign(showAssignModal, op.name)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 hover:ring-2 hover:ring-blue-200 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">
                      {op.name[0]}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{op.name}</p>
                      <p className="text-sm text-gray-500">{op.phone}</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">배정</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowAssignModal(null)} className="w-full mt-4 py-3 text-gray-500 font-medium">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   OPERATOR DEMO (Interactive)
   ═══════════════════════════════════════════════ */
function OperatorDemo() {
  const [started, setStarted] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const dispatches = DEMO_DISPATCHES.filter((d) => ["operator_assigned", "in_progress"].includes(d.status) && !completed.has(d.id));

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && <DemoToast message={toast} />}
      <h2 className="text-2xl font-bold text-gray-900">현재 배차</h2>
      {dispatches.length > 0 ? (
        <div className="space-y-3">
          {dispatches.map((d) => {
            const isStarted = started.has(d.id) || d.status === "in_progress";
            return (
              <PremiumCard key={d.id} glow={isStarted}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg text-gray-900">{d.equipment_types.name} {d.equipment_specs.spec_name}</span>
                  <StatusBadge status={isStarted ? "in_progress" : "operator_assigned"} />
                </div>
                <p className="text-sm text-gray-500">{d.site_address}</p>
                <p className="text-sm text-gray-400">{d.company_name}</p>
                <p className="text-xl font-bold tabular-nums text-blue-700 mt-2">{formatPrice(d.price)}원</p>
                {d.site_manager_phone && (
                  <div className="mt-2 px-3 py-2 bg-blue-50 rounded-xl inline-flex items-center gap-1 text-sm text-blue-700 font-medium">
                    📞 {d.site_manager_name} ({d.site_manager_phone})
                  </div>
                )}
                {!isStarted ? (
                  <button onClick={() => { setStarted(prev => new Set(prev).add(d.id)); showToast("작업 시작!"); }} className="w-full mt-3 py-3.5 bg-amber-500 text-white font-bold rounded-xl text-lg active:scale-95 transition-all shadow-sm">
                    🚀 작업 시작
                  </button>
                ) : (
                  <button onClick={() => { setCompleted(prev => new Set(prev).add(d.id)); showToast("작업 완료! 서명이 저장되었습니다"); }} className="w-full mt-3 py-3.5 bg-emerald-500 text-white font-bold rounded-xl text-lg active:scale-95 transition-all shadow-sm">
                    ✅ 작업 완료 서명
                  </button>
                )}
              </PremiumCard>
            );
          })}
        </div>
      ) : (
        <PremiumCard className="text-center py-12">
          <span className="text-4xl block mb-3">🎉</span>
          <h3 className="text-xl font-bold text-gray-900">모든 작업을 완료했습니다!</h3>
        </PremiumCard>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CALLCENTER / SALESPERSON / ADMIN DEMOS
   ═══════════════════════════════════════════════ */
function CallcenterDemo() {
  const calls = DEMO_DISPATCHES.filter((d) => !["completed", "cancelled", "pending"].includes(d.status));
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900">전달된 콜 관리</h2>
      <div className="space-y-3">
        {calls.map((d) => (
          <PremiumCard key={d.id}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-900">{d.equipment_types.name} {d.equipment_specs.spec_name}</span>
              <StatusBadge status={d.status} />
            </div>
            <p className="text-sm text-gray-500">{d.site_address}</p>
            <p className="text-lg font-bold tabular-nums text-blue-700 mt-2">{formatPrice(d.price)}원</p>
          </PremiumCard>
        ))}
      </div>
    </div>
  );
}

function SalespersonDemo() {
  const total = DEMO_COMMISSIONS.reduce((s, c) => s + c.salesperson_fee, 0);
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900">분양 현황</h2>
      <div className="grid grid-cols-2 gap-3">
        <GradientStat icon="💰" value={`${formatPrice(total)}원`} label="누적 수수료" gradient="bg-gradient-to-br from-emerald-500 to-teal-600" />
        <GradientStat icon="📊" value={DEMO_COMMISSIONS.length} label="완료 건수" gradient="bg-gradient-to-br from-blue-500 to-indigo-600" />
      </div>
      <div className="space-y-2">
        {DEMO_COMMISSIONS.map((c) => (
          <PremiumCard key={c.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{formatPrice(c.total_price)}원 건</p>
              <p className="text-sm text-gray-400">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
            </div>
            <span className="font-bold tabular-nums text-emerald-600 text-lg">+{formatPrice(c.salesperson_fee)}원</span>
          </PremiumCard>
        ))}
      </div>
    </div>
  );
}

function AdminDemo() {
  const totalRevenue = DEMO_COMMISSIONS.reduce((s, c) => s + c.company_fee, 0);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">관리자 대시보드</h2>
        <p className="text-sm text-gray-500">Heavy Match 플랫폼 현황</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GradientStat icon="👥" value={DEMO_ALL_USERS.length} label="총 사용자" gradient="bg-gradient-to-br from-blue-500 to-blue-700" />
        <GradientStat icon="🚧" value={DEMO_DISPATCHES.filter(d => !["completed","cancelled"].includes(d.status)).length} label="진행중" gradient="bg-gradient-to-br from-amber-500 to-orange-600" />
        <GradientStat icon="✅" value={DEMO_DISPATCHES.filter(d => d.status === "completed").length} label="완료" gradient="bg-gradient-to-br from-emerald-500 to-green-600" />
        <GradientStat icon="💰" value={`${formatPrice(totalRevenue)}원`} label="본사 수익" gradient="bg-gradient-to-br from-violet-500 to-purple-700" />
      </div>
      <section>
        <SectionTitle title="최근 배차" />
        <div className="space-y-2">
          {DEMO_DISPATCHES.map((d) => (
            <PremiumCard key={d.id} className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">{d.equipment_types.name} {d.equipment_specs.spec_name}</p>
                <p className="text-sm text-gray-500">{d.company_name}</p>
              </div>
              <div className="text-right">
                <StatusBadge status={d.status} />
                <p className="text-sm text-gray-400 tabular-nums mt-1">{formatPrice(d.price)}원</p>
              </div>
            </PremiumCard>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ROUTER
   ═══════════════════════════════════════════════ */
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
