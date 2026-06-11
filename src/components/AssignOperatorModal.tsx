"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Operator {
  id: string;
  name: string;
  phone: string;
}

interface Props {
  dispatchId: string;
  onClose: () => void;
  onAssigned: () => void;
}

export default function AssignOperatorModal({ dispatchId, onClose, onAssigned }: Props) {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [assigning, setAssigning] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadOperators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOperators = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("users")
      .select("id, name, phone")
      .eq("parent_id", user.id)
      .eq("role", "operator") as unknown as { data: Operator[] | null };
    if (data) setOperators(data);
  };

  const handleAssign = async (operatorId: string) => {
    setAssigning(operatorId);
    const res = await fetch("/api/dispatch/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dispatch_id: dispatchId, operator_id: operatorId }),
    });
    const result = await res.json();
    if (result.error) {
      alert(result.error);
    } else {
      onAssigned();
    }
    setAssigning(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" role="dialog" aria-modal="true" aria-label="기사 배정">
      <div className="fixed inset-0 bg-cy-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md shadow-[0_20px_50px_rgba(0,44,95,0.25)] max-h-[80vh] overflow-y-auto safe-bottom animate-fade-in overflow-hidden">
        <div className="h-[3px] bg-cy-navy" aria-hidden />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="mono-label text-cy-ink-4 mb-0.5">ASSIGN OPERATOR</p>
              <h3 className="text-xl font-extrabold tracking-[-0.02em] text-cy-ink">기사 배정</h3>
            </div>
            <button onClick={onClose} aria-label="닫기" className="press w-10 h-10 flex items-center justify-center rounded-xl hover:bg-cy-bg">
              <span className="material-symbols-outlined text-cy-ink-3">close</span>
            </button>
          </div>

          {operators.length > 0 ? (
            <div className="space-y-2">
              {operators.map((op) => (
                <button
                  key={op.id}
                  onClick={() => handleAssign(op.id)}
                  disabled={assigning !== null}
                  className="press w-full flex items-center justify-between p-4 bg-cy-bg rounded-xl hover:bg-cy-navy-pale/50 border border-transparent hover:border-cy-navy/25 disabled:opacity-50"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 bg-cy-navy-pale text-cy-navy rounded-full flex items-center justify-center font-bold">
                      {op.name[0]}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-cy-ink">{op.name}</p>
                      <p className="text-sm text-cy-ink-3 tabular-nums">{op.phone}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold ${
                    assigning === op.id
                      ? "bg-cy-line-soft text-cy-ink-3"
                      : "bg-cy-navy text-white shadow-[0_2px_6px_rgba(0,44,95,0.2)]"
                  }`}>
                    {assigning === op.id && (
                      <span className="material-symbols-outlined text-base animate-spin" aria-hidden>progress_activity</span>
                    )}
                    {assigning === op.id ? "배정중..." : "배정"}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cy-navy-pale/60 mb-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-[0_1px_3px_rgba(0,44,95,0.1)]">
                  <span className="material-symbols-outlined text-2xl text-cy-navy/70">engineering</span>
                </span>
              </span>
              <p className="text-base font-bold text-cy-ink mb-1">등록된 기사가 없습니다</p>
              <p className="text-sm text-cy-ink-3">기사 관리에서 먼저 기사를 등록해주세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
