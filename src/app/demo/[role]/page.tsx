"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import CountdownTimer from "@/components/CountdownTimer";
import BarChart from "@/components/charts/BarChart";
import DonutChart from "@/components/charts/DonutChart";
import { DEMO_DISPATCHES, DEMO_COMMISSIONS, DEMO_OPERATORS, DEMO_CALL_HISTORY, DEMO_ALL_USERS } from "@/lib/demoData";
import CrossRoleLink from "@/components/CrossRoleLink";
import Tooltip from "@/components/Tooltip";
import SignatureCanvas from "@/components/SignatureCanvas";

/* ═════ MD3 Primitives ═════ */

function Md3Card({ children, className = "", glow = false, onClick }: { children: React.ReactNode; className?: string; glow?: boolean; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`bg-white rounded-2xl border p-5 transition-all duration-200 ${glow ? "border-[#0059b9]/30 ring-2 ring-[#0059b9]/10 shadow-lg" : "border-[#c1c6d6]/30 shadow-[0_2px_12px_rgba(17,28,41,0.04)]"} ${onClick ? "cursor-pointer active:scale-[0.98]" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Md3Badge({ label, color = "bg-[#e5eeff] text-[#0059b9]" }: { label: string; color?: string }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${color}`}>{label}</span>;
}

function Md3Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold bg-[#26313f] text-white animate-fade-in">
      ✅ {message}
    </div>
  );
}

function Md3Stat({ icon, value, label, gradient }: { icon: string; value: string | number; label: string; gradient: string }) {
  return (
    <div className={`${gradient} rounded-2xl p-4 text-white text-center`}>
      <span className="material-symbols-outlined text-2xl block mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      <p className="text-xl font-black tabular-nums">{value}</p>
      <p className="text-[10px] font-semibold opacity-70 mt-0.5">{label}</p>
    </div>
  );
}

const STATUS_BADGES: Record<string, { label: string; color: string }> = {
  exclusive_call: { label: "전용콜", color: "bg-[#d7e2ff] text-[#004491]" },
  callcenter_call: { label: "콜센터", color: "bg-[#ffdad6] text-[#ba1a1a]" },
  shared_call: { label: "공유콜", color: "bg-[#dde3ef] text-[#595f69]" },
  matched: { label: "매칭완료", color: "bg-[#d5e4f8] text-[#4f5d6e]" },
  operator_assigned: { label: "기사배정", color: "bg-[#e5eeff] text-[#0059b9]" },
  in_progress: { label: "작업중", color: "bg-amber-100 text-amber-700" },
  completed: { label: "완료", color: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-700" },
};

const EQ_ICONS: Record<string, string> = { "크레인": "🏗️", "굴삭기": "⛏️", "스카이": "🔝", "펌프카": "💧", "지게차": "📦", "덤프": "🚚" };

/* ═══════════════════════════════════════
   REQUESTER
   ═══════════════════════════════════════ */
function RequesterDemo() {
  const [toast, setToast] = useState<string | null>(null);
  const active = DEMO_DISPATCHES.filter(d => !["completed", "cancelled"].includes(d.status));
  const show = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && <Md3Toast message={toast} />}

      <div className="relative overflow-hidden bg-gradient-to-br from-[#0059b9] to-[#1071e5] rounded-3xl p-6 text-white">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        <h2 className="text-2xl font-[800] mb-1">장비가 필요하신가요?</h2>
        <p className="text-white/70 text-sm mb-5">8종 장비를 60초 안에 배차합니다</p>
        <a href="/demo/requester/request" className="inline-flex py-3 px-6 bg-white text-[#0059b9] font-bold rounded-xl shadow-lg active:scale-95 transition-all items-center gap-2">
          <span className="material-symbols-outlined text-xl">edit_note</span>장비 요청하기
        </a>
      </div>

      <section>
        <h3 className="text-lg font-bold text-[#111c29] mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0059b9]" style={{ fontVariationSettings: "'FILL' 1" }}>pending</span>
          진행중 ({active.length})
        </h3>
        <div className="space-y-3">
          {active.slice(0, 3).map(d => (
            <Md3Card key={d.id} glow={d.status === "exclusive_call"}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#111c29]">{EQ_ICONS[d.equipment_types.name] || "🚧"} {d.equipment_types.name} {d.equipment_specs.spec_name}</span>
                <Md3Badge label={STATUS_BADGES[d.status]?.label || d.status} color={STATUS_BADGES[d.status]?.color} />
              </div>
              <p className="text-sm text-[#414754]">{d.site_address}</p>
              <p className="text-xl font-black tabular-nums text-[#0059b9] mt-2">{formatPrice(d.price)}원</p>
            </Md3Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-[#111c29] mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0059b9]">bolt</span>빠른 재주문
        </h3>
        <div className="space-y-2">
          {DEMO_CALL_HISTORY.map(h => (
            <button key={h.id} onClick={() => show(`${h.equipment_types.name} ${h.equipment_specs.spec_name} 재주문`)}
              className="w-full text-left bg-white rounded-2xl p-4 border border-[#c1c6d6]/30 shadow-sm hover:border-[#0059b9]/30 transition-all active:scale-[0.98] group">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#111c29]">{h.equipment_types.name} {h.equipment_specs.spec_name}</span>
                  <p className="text-sm text-[#414754] mt-0.5">{h.site_address}</p>
                </div>
                <span className="material-symbols-outlined text-[#0059b9] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 역할간 연결 */}
      <CrossRoleLink targetRole="owner" description="요청한 콜이 사장님 화면에서 어떻게 보이는지 확인" />
    </div>
  );
}

/* ═══════════════════════════════════════
   OWNER (Interactive)
   ═══════════════════════════════════════ */
function OwnerDemo() {
  const [accepted, setAccepted] = useState<Set<string>>(new Set());
  const [rejected, setRejected] = useState<Set<string>>(new Set());
  const [assigned, setAssigned] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [assignModal, setAssignModal] = useState<string | null>(null);
  const show = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const exclusive = DEMO_DISPATCHES.filter(d => d.status === "exclusive_call" && !accepted.has(d.id) && !rejected.has(d.id));
  const shared = DEMO_DISPATCHES.filter(d => d.status === "shared_call" && !accepted.has(d.id));
  const matched = [
    ...DEMO_DISPATCHES.filter(d => d.status === "matched" && !assigned.has(d.id)),
    ...DEMO_DISPATCHES.filter(d => accepted.has(d.id) && !assigned.has(d.id)),
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && <Md3Toast message={toast} />}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-[800] text-[#111c29]">콜 수신 현황</h2>
        <div className="flex gap-1.5 text-xs">
          <span className="px-2 py-1 bg-[#d7e2ff] text-[#004491] rounded-lg font-bold">전용 {exclusive.length}</span>
          <span className="px-2 py-1 bg-[#dde3ef] text-[#595f69] rounded-lg font-bold">공유 {shared.length}</span>
          <span className="px-2 py-1 bg-[#d5e4f8] text-[#4f5d6e] rounded-lg font-bold">배정 {matched.length}</span>
        </div>
      </div>

      {exclusive.length > 0 && (
        <section>
          <h3 className="text-base font-bold text-[#111c29] mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0059b9] animate-pulse" />전용콜
          </h3>
          {exclusive.map(c => (
            <Md3Card key={c.id} glow className="mb-3">
              {c.exclusive_call_at && <div className="mb-3"><CountdownTimer startedAt={c.exclusive_call_at} /></div>}
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-[#111c29]">{EQ_ICONS[c.equipment_types.name]} {c.equipment_types.name} {c.equipment_specs.spec_name}</span>
                <Md3Badge label="전용콜" color="bg-[#d7e2ff] text-[#004491]" />
              </div>
              <p className="text-sm text-[#414754]">{c.site_address}</p>
              <p className="text-sm text-[#727785]">{c.company_name}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xl font-black tabular-nums text-[#0059b9]">{formatPrice(c.price)}원</span>
                <span className="text-sm text-[#727785]">{c.time_units.name}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => { setAccepted(p => new Set(p).add(c.id)); show(`${c.equipment_types.name} 수락! 기사를 배정해주세요`); }}
                  className="flex-1 py-3.5 bg-[#0059b9] text-white font-bold rounded-xl text-base active:scale-95 transition-all flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-lg">check_circle</span>수락
                </button>
                <button onClick={() => { setRejected(p => new Set(p).add(c.id)); show("거절 → 콜센터로 전달"); }}
                  className="flex-1 py-3.5 bg-[#ffdad6] text-[#ba1a1a] font-bold rounded-xl text-base active:scale-95 transition-all flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-lg">cancel</span>거절
                </button>
              </div>
            </Md3Card>
          ))}
        </section>
      )}

      {shared.length > 0 && (
        <section>
          <h3 className="text-base font-bold text-[#111c29] mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />공유콜 (선착순)
          </h3>
          {shared.map(c => (
            <Md3Card key={c.id} className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-[#111c29]">{EQ_ICONS[c.equipment_types.name]} {c.equipment_types.name} {c.equipment_specs.spec_name}</span>
                <Md3Badge label="공유콜" color="bg-[#dde3ef] text-[#595f69]" />
              </div>
              <p className="text-sm text-[#414754]">{c.site_address}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xl font-black tabular-nums text-[#0059b9]">{formatPrice(c.price)}원</span>
              </div>
              <button onClick={() => { setAccepted(p => new Set(p).add(c.id)); show("수락 완료!"); }}
                className="w-full mt-3 py-3.5 bg-[#0059b9] text-white font-bold rounded-xl text-base active:scale-95 transition-all flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-lg">check_circle</span>수락
              </button>
            </Md3Card>
          ))}
        </section>
      )}

      {matched.length > 0 && (
        <section>
          <h3 className="text-base font-bold text-[#111c29] mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />기사 배정 대기 ({matched.length})
          </h3>
          {matched.map(c => (
            <Md3Card key={c.id} className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-[#111c29]">{EQ_ICONS[c.equipment_types.name]} {c.equipment_types.name} {c.equipment_specs.spec_name}</span>
                <Md3Badge label="매칭완료" color="bg-emerald-100 text-emerald-700" />
              </div>
              <p className="text-sm text-[#414754]">{c.site_address}</p>
              <p className="text-xl font-black tabular-nums text-[#0059b9] mt-2">{formatPrice(c.price)}원</p>
              <button onClick={() => setAssignModal(c.id)}
                className="w-full mt-3 py-3.5 bg-[#26313f] text-white font-bold rounded-xl text-base active:scale-95 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">person_add</span>기사 배정하기
              </button>
            </Md3Card>
          ))}
        </section>
      )}

      {exclusive.length === 0 && shared.length === 0 && matched.length === 0 && (
        <Md3Card className="text-center py-12">
          <span className="material-symbols-outlined text-5xl text-[#0059b9] block mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
          <h3 className="text-xl font-[800] text-[#111c29]">모든 콜을 처리했습니다!</h3>
          <p className="text-[#414754] mt-1">새 콜이 오면 알림을 보내드립니다</p>
        </Md3Card>
      )}

      {assignModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setAssignModal(null)} />
          <div className="relative z-10 bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md p-6 shadow-2xl safe-bottom animate-fade-in">
            <div className="w-10 h-1 bg-[#c1c6d6] rounded-full mx-auto mb-4 md:hidden" />
            <h3 className="text-xl font-[800] text-[#111c29] mb-4">기사 선택</h3>
            <div className="space-y-2">
              {DEMO_OPERATORS.map(op => (
                <button key={op.id} onClick={() => { setAssigned(p => new Set(p).add(assignModal)); setAssignModal(null); show(`${op.name} 기사 배정 완료!`); }}
                  className="w-full flex items-center justify-between p-4 bg-[#eef4ff] rounded-2xl hover:bg-[#e5eeff] transition-all active:scale-[0.98]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#d7e2ff] text-[#0059b9] rounded-full flex items-center justify-center font-bold">{op.name[0]}</div>
                    <div className="text-left">
                      <p className="font-bold text-[#111c29]">{op.name}</p>
                      <p className="text-sm text-[#727785]">{op.phone}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-[#0059b9] text-white rounded-xl text-sm font-bold">배정</span>
                </button>
              ))}
            </div>
            <button onClick={() => setAssignModal(null)} className="w-full mt-4 py-3 text-[#727785] font-medium">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   OPERATOR (Interactive)
   ═══════════════════════════════════════ */
function OperatorDemo() {
  const [started, setStarted] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [signing, setSigning] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const show = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const dispatches = DEMO_DISPATCHES.filter(d => ["operator_assigned", "in_progress"].includes(d.status) && !completed.has(d.id));

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && <Md3Toast message={toast} />}
      <h2 className="text-2xl font-[800] text-[#111c29]">현재 배차</h2>
      {dispatches.length > 0 ? dispatches.map(d => {
        const isStarted = started.has(d.id) || d.status === "in_progress";
        return (
          <Md3Card key={d.id} glow={isStarted}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg text-[#111c29]">{EQ_ICONS[d.equipment_types.name]} {d.equipment_types.name} {d.equipment_specs.spec_name}</span>
              <Md3Badge label={isStarted ? "작업중" : "기사배정"} color={isStarted ? "bg-amber-100 text-amber-700" : "bg-[#e5eeff] text-[#0059b9]"} />
            </div>
            <p className="text-sm text-[#414754]">{d.site_address}</p>
            <p className="text-xl font-black tabular-nums text-[#0059b9] mt-2">{formatPrice(d.price)}원</p>
            {d.site_manager_phone && (
              <div className="mt-2 px-3 py-2 bg-[#eef4ff] rounded-xl inline-flex items-center gap-1 text-sm text-[#0059b9] font-medium">
                <span className="material-symbols-outlined text-base">call</span>{d.site_manager_name} ({d.site_manager_phone})
              </div>
            )}
            {!isStarted ? (
              <button onClick={() => { setStarted(p => new Set(p).add(d.id)); show("작업 시작!"); }}
                className="w-full mt-3 py-3.5 bg-amber-500 text-white font-bold rounded-xl text-base active:scale-95 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">rocket_launch</span>작업 시작
              </button>
            ) : signing === d.id ? (
              <div className="mt-3 space-y-3 animate-fade-in">
                <p className="text-sm font-bold text-[#111c29]">기사 전자서명</p>
                <SignatureCanvas onSave={() => { setSigning(null); setCompleted(p => new Set(p).add(d.id)); show("작업 완료! 서명이 저장되었습니다"); }} />
              </div>
            ) : (
              <button onClick={() => setSigning(d.id)}
                className="w-full mt-3 py-3.5 bg-emerald-600 text-white font-bold rounded-xl text-base active:scale-95 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">draw</span>작업 완료 서명
              </button>
            )}
          </Md3Card>
        );
      }) : (
        <Md3Card className="text-center py-12">
          <span className="material-symbols-outlined text-5xl text-emerald-500 block mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
          <h3 className="text-xl font-[800]">모든 작업 완료!</h3>
          <p className="text-sm text-[#727785] mt-1">오늘 배정된 작업을 모두 마쳤습니다</p>
        </Md3Card>
      )}

      <CrossRoleLink targetRole="owner" description="사장님이 나를 어떻게 배정했는지 확인" />
    </div>
  );
}

/* ═══════════════════════════════════════
   CALLCENTER / SALESPERSON / ADMIN
   ═══════════════════════════════════════ */
function CallcenterDemo() {
  const [calls, setCalls] = useState(DEMO_DISPATCHES.filter(d => !["completed","cancelled","pending"].includes(d.status)));
  const [toast, setToast] = useState<string|null>(null);
  const [filter, setFilter] = useState<string>("all");
  const show = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2500); };

  const filtered = filter === "all" ? calls : calls.filter(d => d.status === filter);
  const counts = { all: calls.length, callcenter_call: calls.filter(d => d.status==="callcenter_call").length, shared_call: calls.filter(d => d.status==="shared_call").length, matched: calls.filter(d => d.status==="matched").length };

  return (
    <div className="space-y-5">
      {toast && <Md3Toast message={toast} />}

      {/* 데스크탑: 2컬럼 레이아웃 */}
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-6">

        {/* 좌측 사이드 패널 (데스크탑에서만) */}
        <div className="lg:sticky lg:top-4 lg:self-start space-y-4 mb-5 lg:mb-0">
          <div>
            <h2 className="text-2xl font-[800] text-[#111c29]">콜 관리</h2>
            <p className="text-sm text-[#414754]">미수락 콜 관리 · 사장 배정</p>
          </div>

          {/* 통계 필터 (세로 스택 — 데스크탑) */}
          <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
            {[{k:"all",l:"전체",g:"from-[#0059b9] to-[#1071e5]"},{k:"callcenter_call",l:"대기",g:"from-amber-500 to-orange-600"},{k:"shared_call",l:"공유콜",g:"from-violet-500 to-purple-600"},{k:"matched",l:"매칭완료",g:"from-emerald-500 to-green-600"}].map(f => (
              <button key={f.k} onClick={() => setFilter(f.k)}
                className={`${filter===f.k ? `bg-gradient-to-br ${f.g} text-white` : "bg-white border border-[#c1c6d6]/30 text-[#111c29]"} rounded-xl p-3 text-center transition-all active:scale-95`}>
                <p className="text-lg font-black tabular-nums">{counts[f.k as keyof typeof counts]||0}</p>
                <p className="text-[10px] font-semibold opacity-70">{f.l}</p>
              </button>
            ))}
          </div>

          {/* 역할간 연결 (데스크탑 사이드바 하단) */}
          <div className="hidden lg:block">
            <CrossRoleLink targetRole="owner" description="사장님 콜 수신 화면" />
          </div>
        </div>

        {/* 우측: 콜 리스트 (메인 영역) */}
        <div className="space-y-3">
          <div className="hidden lg:flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-[#111c29]">콜 목록 ({filtered.length}건)</h3>
          </div>
          {filtered.map(d => (
            <Md3Card key={d.id} glow={d.status==="callcenter_call"}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#111c29]">{EQ_ICONS[d.equipment_types.name]} {d.equipment_types.name} {d.equipment_specs.spec_name}</span>
                <Tooltip text={STATUS_BADGES[d.status]?.label === "콜센터" ? "사장 미수락 → 콜센터로 자동 전달된 건" : STATUS_BADGES[d.status]?.label === "공유콜" ? "같은 지역 사장 전체에게 선착순 공개된 건" : "매칭이 완료되어 기사 배정 대기중인 건"}>
                  <Md3Badge label={STATUS_BADGES[d.status]?.label||d.status} color={STATUS_BADGES[d.status]?.color} />
                </Tooltip>
              </div>
              <p className="text-sm text-[#414754]">{d.company_name} · {d.site_address}</p>
              <p className="text-lg font-black tabular-nums text-[#0059b9] mt-1">{formatPrice(d.price)}원</p>
              {d.status === "callcenter_call" && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setCalls(prev => prev.map(c => c.id===d.id ? {...c,status:"matched"} : c)); show("직접 수락 완료!"); }}
                    className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-lg">check_circle</span>직접 수락
                  </button>
                  <button onClick={() => { setCalls(prev => prev.map(c => c.id===d.id ? {...c,status:"shared_call"} : c)); show("공유콜로 전환됨"); }}
                    className="flex-1 py-3 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-lg">campaign</span>공유콜 전환
                  </button>
                </div>
              )}
            </Md3Card>
          ))}
        </div>

      </div> {/* end lg:grid */}

      {/* 모바일용 역할간 연결 */}
      <div className="lg:hidden">
        <CrossRoleLink targetRole="owner" description="사장님 화면에서 콜이 어떻게 보이는지 확인" />
      </div>
    </div>
  );
}

function SalespersonDemo() {
  const total = DEMO_COMMISSIONS.reduce((s, c) => s + c.salesperson_fee, 0);
  const [period, setPeriod] = useState<"all"|"month"|"week">("all");
  const [toast, setToast] = useState<string|null>(null);
  const show = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2500); };

  const now = new Date();
  const filtered = period === "all" ? DEMO_COMMISSIONS
    : period === "month" ? DEMO_COMMISSIONS.filter(c => { const d=new Date(c.created_at); return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear(); })
    : DEMO_COMMISSIONS.filter(c => { const d=new Date(c.created_at); return (now.getTime()-d.getTime()) < 7*86400000; });
  const filteredTotal = filtered.reduce((s,c) => s + c.salesperson_fee, 0);

  return (
    <div className="space-y-5 max-w-2xl">
      {toast && <Md3Toast message={toast} />}
      <div>
        <h2 className="text-2xl font-[800] text-[#111c29]">분양 현황</h2>
        <p className="text-sm text-[#414754]">나의 수수료 및 실적 현황</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Md3Stat icon="savings" value={`${formatPrice(total)}원`} label="누적 수수료" gradient="bg-gradient-to-br from-emerald-600 to-teal-700" />
        <Md3Stat icon="receipt_long" value={DEMO_COMMISSIONS.length} label="완료 건수" gradient="bg-gradient-to-br from-[#0059b9] to-[#1071e5]" />
      </div>

      {/* 기간 필터 */}
      <div className="flex gap-2">
        {([["all","전체"],["month","이번 달"],["week","이번 주"]] as const).map(([k,l]) => (
          <button key={k} onClick={() => setPeriod(k)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${period===k ? "bg-[#0059b9] text-white" : "bg-white border border-[#c1c6d6]/30 text-[#414754]"}`}>
            {l}
          </button>
        ))}
      </div>

      {/* 필터된 합계 */}
      <Md3Card className="text-center">
        <p className="text-sm text-[#727785]">{period==="all"?"전체":"필터된"} 수수료</p>
        <p className="text-3xl font-black tabular-nums text-emerald-600">{formatPrice(filteredTotal)}원</p>
        <p className="text-sm text-[#727785]">{filtered.length}건</p>
      </Md3Card>

      {/* 내역 */}
      <div className="space-y-2">
        {filtered.map(c => (
          <Md3Card key={c.id} className="flex items-center justify-between" onClick={() => show(`거래 상세: ${formatPrice(c.total_price)}원`)}>
            <div>
              <p className="font-semibold text-[#111c29]">{formatPrice(c.total_price)}원 건</p>
              <p className="text-xs text-[#727785]">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
            </div>
            <span className="font-black tabular-nums text-emerald-600 text-lg">+{formatPrice(c.salesperson_fee)}원</span>
          </Md3Card>
        ))}
      </div>

      <CrossRoleLink targetRole="callcenter" description="콜센터에서 콜이 어떻게 처리되는지 확인" />
    </div>
  );
}

function AdminDemo() {
  const rev = DEMO_COMMISSIONS.reduce((s, c) => s + c.company_fee, 0);
  const totalVolume = DEMO_COMMISSIONS.reduce((s, c) => s + c.total_price, 0);
  const completedCount = DEMO_DISPATCHES.filter(d => d.status === "completed").length;
  const activeCount = DEMO_DISPATCHES.filter(d => !["completed","cancelled"].includes(d.status)).length;
  const cancelledCount = DEMO_DISPATCHES.filter(d => d.status === "cancelled").length;

  // 주간 차트 — 실제 데이터에서 파생
  const dayNames = ["일","월","화","수","목","금","토"];
  const weekData = dayNames.map((label, dayIdx) => ({
    label,
    value: DEMO_DISPATCHES.filter(d => {
      const date = new Date(d.created_at);
      return date.getDay() === dayIdx;
    }).length,
  }));

  // 상태별 도넛 — 실제 데이터에서 파생
  const statusGroups = [
    { label: "전용콜", statuses: ["exclusive_call"], color: "#0059b9" },
    { label: "콜센터/공유", statuses: ["callcenter_call","shared_call"], color: "#f59e0b" },
    { label: "매칭/배정", statuses: ["matched","operator_assigned"], color: "#10b981" },
    { label: "작업중", statuses: ["in_progress"], color: "#8b5cf6" },
    { label: "완료", statuses: ["completed"], color: "#06b6d4" },
    { label: "취소", statuses: ["cancelled"], color: "#ef4444" },
  ].map(g => ({ ...g, value: DEMO_DISPATCHES.filter(d => g.statuses.includes(d.status)).length })).filter(g => g.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-[800] text-[#111c29]">관리자 대시보드</h2>
        <p className="text-sm text-[#414754]">Heavy Match 플랫폼 현황 · 최근 30일</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Md3Stat icon="group" value={DEMO_ALL_USERS.length} label="총 사용자" gradient="bg-gradient-to-br from-[#0059b9] to-[#1071e5]" />
        <Md3Stat icon="local_shipping" value={activeCount} label="진행중" gradient="bg-gradient-to-br from-amber-500 to-orange-600" />
        <Md3Stat icon="task_alt" value={completedCount} label="완료" gradient="bg-gradient-to-br from-emerald-600 to-green-700" />
        <Md3Stat icon="account_balance" value={`${formatPrice(rev)}원`} label="본사 수익" gradient="bg-gradient-to-br from-violet-600 to-purple-700" />
      </div>
      {/* 추가 통계 */}
      <div className="grid grid-cols-3 gap-3">
        <Md3Card className="text-center !p-3">
          <p className="text-2xl font-black tabular-nums text-[#111c29]">{DEMO_DISPATCHES.length}</p>
          <p className="text-[10px] text-[#727785] font-semibold">총 배차</p>
        </Md3Card>
        <Md3Card className="text-center !p-3">
          <p className="text-2xl font-black tabular-nums text-[#111c29]">{formatPrice(totalVolume)}원</p>
          <p className="text-[10px] text-[#727785] font-semibold">총 거래액</p>
        </Md3Card>
        <Md3Card className="text-center !p-3">
          <p className="text-2xl font-black tabular-nums text-[#ba1a1a]">{cancelledCount}</p>
          <p className="text-[10px] text-[#727785] font-semibold">취소</p>
        </Md3Card>
      </div>
      {/* 차트 — 실제 데이터 기반 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BarChart title="요일별 배차 현황" data={weekData} />
        <DonutChart title="상태별 배차" segments={statusGroups} />
      </div>

      <section>
        <h3 className="text-lg font-bold text-[#111c29] mb-3">최근 배차 (상위 10건)</h3>
        <div className="space-y-2">
          {DEMO_DISPATCHES.slice(0, 10).map(d => (
            <Md3Card key={d.id} className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#111c29]">{EQ_ICONS[d.equipment_types.name]} {d.equipment_types.name} {d.equipment_specs.spec_name}</p>
                <p className="text-xs text-[#727785]">{d.company_name}</p>
              </div>
              <div className="text-right">
                <Md3Badge label={STATUS_BADGES[d.status]?.label || d.status} color={STATUS_BADGES[d.status]?.color} />
                <p className="text-sm text-[#414754] tabular-nums mt-1">{formatPrice(d.price)}원</p>
              </div>
            </Md3Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <CrossRoleLink targetRole="owner" description="사장님 배차 수신 화면 확인" />
        <CrossRoleLink targetRole="requester" description="요청자 장비 요청 플로우 확인" />
      </div>
    </div>
  );
}

/* ═════ Router ═════ */
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
