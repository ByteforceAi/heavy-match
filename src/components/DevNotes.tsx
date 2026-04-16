"use client";

import { useState } from "react";

interface DevNote {
  components: string[];
  apis: string[];
  db: string[];
  note?: string;
}

const ROLE_DEV_NOTES: Record<string, DevNote> = {
  requester: {
    components: ["DemoDashboardLayout", "Card", "StatusBadge", "SignatureCanvas", "CountdownTimer"],
    apis: ["POST /api/dispatch/create", "POST /api/dispatch/cancel"],
    db: ["dispatch_requests", "call_history", "users"],
    note: "6단계 위자드 패턴 — 장비→규격→시간→단가→현장→서명. call_history UPSERT로 재주문 지원."
  },
  owner: {
    components: ["DemoDashboardLayout", "Card", "CountdownTimer", "AssignOperatorModal", "StatusBadge"],
    apis: ["POST /api/dispatch/accept", "POST /api/dispatch/reject", "POST /api/dispatch/assign"],
    db: ["dispatch_requests", "owner_prices", "users (operators)", "commissions"],
    note: "Supabase Realtime으로 공유콜 실시간 갱신. UPDATE WHERE status IN (...) 동시성 제어."
  },
  operator: {
    components: ["DemoDashboardLayout", "Card", "SignatureCanvas", "StatusBadge"],
    apis: ["POST /api/dispatch/start", "POST /api/dispatch/complete"],
    db: ["dispatch_requests"],
    note: "operator_assigned→in_progress→completed 상태 전환. 전자서명 base64 PNG 저장."
  },
  callcenter: {
    components: ["DemoDashboardLayout", "Card", "StatusBadge"],
    apis: ["POST /api/dispatch/accept", "POST /api/dispatch/escalate"],
    db: ["dispatch_requests", "users (owners)", "commissions"],
    note: "콜센터 수수료 2.5% 귀속. original_callcenter_id로 공유콜 넘어가도 최초 콜센터 추적."
  },
  salesperson: {
    components: ["DemoDashboardLayout", "Card", "StatCard"],
    apis: ["GET /api/commissions (via Supabase RLS)"],
    db: ["commissions", "users"],
    note: "영업사원 수수료 2.5%. parent_id로 콜센터 소속 관계 관리."
  },
  admin: {
    components: ["DemoDashboardLayout", "Card", "StatCard", "BarChart (SVG)", "DonutChart (SVG)"],
    apis: ["Supabase aggregate queries", "GET /api/cron/timer"],
    db: ["모든 테이블 — users, dispatch_requests, commissions, equipment_*, time_units"],
    note: "Vercel Cron 1분 간격으로 60초 타이머 체크. 전체 RLS bypass는 service_role key 사용."
  },
};

export default function DevNotes({ role }: { role: string }) {
  const [open, setOpen] = useState(false);
  const notes = ROLE_DEV_NOTES[role];
  if (!notes) return null;

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 md:bottom-6 left-6 z-[80] w-10 h-10 bg-[#26313f] text-[#eaf1ff] rounded-xl shadow-lg flex items-center justify-center hover:bg-[#111c29] active:scale-95 transition-all"
        title="Dev Notes"
      >
        <span className="material-symbols-outlined text-lg">code</span>
      </button>

      {/* Panel */}
      {open && (
        <>
          <div className="fixed inset-0 z-[85] bg-black/20" onClick={() => setOpen(false)} />
          <div className="fixed bottom-20 md:bottom-16 left-6 z-[90] w-80 max-h-[60vh] overflow-y-auto bg-[#1a2435] text-[#eaf1ff] rounded-2xl shadow-2xl p-5 animate-fade-in border border-[#26313f]"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "12px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-amber-400">{"<"}/{">"} Dev Notes</span>
              <button onClick={() => setOpen(false)} className="text-[#8899b3] hover:text-white">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[#8899b3] text-[10px] uppercase tracking-wider mb-1">Components</p>
                <div className="flex flex-wrap gap-1">
                  {notes.components.map(c => (
                    <span key={c} className="px-2 py-0.5 bg-[#0059b9]/20 text-[#acc7ff] rounded text-[10px]">{c}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[#8899b3] text-[10px] uppercase tracking-wider mb-1">API Endpoints</p>
                {notes.apis.map(a => (
                  <p key={a} className="text-emerald-400 text-[11px]">{a}</p>
                ))}
              </div>

              <div>
                <p className="text-[#8899b3] text-[10px] uppercase tracking-wider mb-1">DB Tables</p>
                <div className="flex flex-wrap gap-1">
                  {notes.db.map(d => (
                    <span key={d} className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded text-[10px]">{d}</span>
                  ))}
                </div>
              </div>

              {notes.note && (
                <div className="pt-2 border-t border-[#26313f]">
                  <p className="text-[#8899b3] text-[10px] uppercase tracking-wider mb-1">Architecture Note</p>
                  <p className="text-[11px] text-[#c1c6d6] leading-relaxed">{notes.note}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
