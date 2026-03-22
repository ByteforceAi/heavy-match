"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatPhone } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

interface Operator {
  id: string;
  name: string;
  phone: string;
  created_at: string;
}

export default function OwnerOperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => { loadOperators(); }, []);

  const loadOperators = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("users")
      .select("id, name, phone, created_at")
      .eq("parent_id", user.id)
      .eq("role", "operator")
      .order("created_at", { ascending: false }) as unknown as { data: Operator[] | null };
    if (data) setOperators(data);
  };

  const handleAdd = async () => {
    if (!newName || !newPhone) return;
    setLoading(true);
    // 기사 등록은 사장이 직접 등록 — 실제로는 기사가 회원가입 시 parent_id 설정
    // 여기서는 간단히 안내
    alert("기사에게 회원가입 링크를 보내주세요. 기사가 가입하면 자동으로 소속됩니다.");
    setLoading(false);
    setShowAdd(false);
  };

  return (
    <div>
      <PageHeader
        title="소속 기사 관리"
        description="내 소속 기사 목록"
        action={
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="px-4 py-2 bg-primary text-white font-medium rounded-xl text-sm"
          >
            + 기사 추가
          </button>
        }
      />

      {showAdd && (
        <Card className="mb-4">
          <h4 className="font-semibold mb-3">기사 등록</h4>
          <div className="space-y-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="기사 이름"
              className="w-full px-4 py-3 border border-border rounded-xl"
            />
            <input
              type="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="기사 전화번호"
              className="w-full px-4 py-3 border border-border rounded-xl"
            />
            <button
              onClick={handleAdd}
              disabled={loading}
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl disabled:opacity-50"
            >
              등록
            </button>
          </div>
        </Card>
      )}

      {operators.length > 0 ? (
        <div className="space-y-3">
          {operators.map((op) => (
            <Card key={op.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{op.name}</p>
                <p className="text-sm text-text-muted">{formatPhone(op.phone)}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${op.phone}`}
                  className="px-3 py-2 bg-success text-white rounded-lg text-sm font-medium"
                >
                  전화
                </a>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="👷" title="소속 기사가 없습니다" description="기사 추가 버튼으로 등록하세요" />
      )}
    </div>
  );
}
