"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  dispatchId: string;
  status: string;
}

export default function OperatorActions({ dispatchId, status }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStart = async () => {
    setLoading(true);
    const res = await fetch("/api/dispatch/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dispatch_id: dispatchId }),
    });
    const result = await res.json();
    if (result.error) {
      alert(result.error);
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  if (status === "operator_assigned") {
    return (
      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full mt-3 py-4 bg-accent text-white text-center font-bold rounded-xl text-lg disabled:opacity-50"
      >
        {loading ? "처리중..." : "🚀 작업 시작"}
      </button>
    );
  }

  if (status === "in_progress") {
    return (
      <a
        href={`/operator/complete/${dispatchId}`}
        className="block w-full mt-3 py-4 bg-success text-white text-center font-bold rounded-xl text-lg"
      >
        ✅ 작업 완료 서명
      </a>
    );
  }

  return null;
}
