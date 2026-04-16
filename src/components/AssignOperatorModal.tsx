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
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 shadow-2xl max-h-[80vh] overflow-y-auto safe-bottom animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-[800] text-[#111c29]">기사 배정</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#eef4ff]">
            <span className="material-symbols-outlined text-[#727785]">close</span>
          </button>
        </div>

        {operators.length > 0 ? (
          <div className="space-y-2">
            {operators.map((op) => (
              <button
                key={op.id}
                onClick={() => handleAssign(op.id)}
                disabled={assigning !== null}
                className="w-full flex items-center justify-between p-4 bg-[#f8f9ff] rounded-xl hover:bg-[#eef4ff] border-2 border-transparent hover:border-[#0059b9]/30 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 bg-[#d7e2ff] text-[#0059b9] rounded-full flex items-center justify-center font-bold">
                    {op.name[0]}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#111c29]">{op.name}</p>
                    <p className="text-sm text-[#727785]">{op.phone}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-sm font-bold ${
                  assigning === op.id
                    ? "bg-[#dee9fb] text-[#727785]"
                    : "bg-[#0059b9] text-white"
                }`}>
                  {assigning === op.id ? "배정중..." : "배정"}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-5xl text-[#c1c6d6] block mb-2">engineering</span>
            <p className="text-lg font-bold text-[#111c29] mb-1">등록된 기사가 없습니다</p>
            <p className="text-sm text-[#727785]">기사 관리에서 먼저 기사를 등록해주세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
