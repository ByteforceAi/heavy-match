"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SignatureCanvas from "@/components/SignatureCanvas";

export default function OperatorCompletePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [signature, setSignature] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleComplete = async () => {
    if (!signature) { setError("서명을 해주세요"); return; }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dispatch/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dispatch_id: id,
          operator_signature: signature,
          work_memo: memo,
        }),
      });
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      router.push("/operator");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "완료 처리 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-text">작업 완료</h2>

      <div>
        <label className="block text-sm font-medium text-text mb-1">작업 메모 (선택)</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="특이사항 기록"
          className="w-full px-4 py-3 border border-border rounded-xl h-24 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-2">기사 전자서명</label>
        <SignatureCanvas onSave={(dataUrl) => setSignature(dataUrl)} />
      </div>

      {signature && <p className="text-success text-sm text-center">서명 완료 ✓</p>}
      {error && <p className="text-danger text-sm">{error}</p>}

      <button
        onClick={handleComplete}
        disabled={loading || !signature}
        className="w-full py-4 bg-success text-white text-xl font-bold rounded-xl disabled:opacity-50"
      >
        {loading ? "처리중..." : "작업 완료 확인"}
      </button>
    </div>
  );
}
