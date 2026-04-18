"use client";

/**
 * 문의 관리 · 클라이언트 파츠
 * heritage-v1.md §3 — 인터랙션 문구는 존대 허용. 서사 본문은 판결문 어미.
 */

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateInquiryStatus, updateInquiryNotes, type InquiryStatus } from "./_actions";

export function CsvExportClientButton() {
  return (
    <button
      type="button"
      onClick={() => {
        // placeholder — 실제 CSV 생성은 후속 릴리스
        alert("CSV 내보내기 · 구현 예정");
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E3E8EF] text-[#3A4A5F] text-sm font-semibold hover:border-[#002C5F]/40 hover:text-[#002C5F] transition-all"
    >
      <span className="material-symbols-outlined text-base">download</span>
      CSV 내보내기
    </button>
  );
}

const STATUS_ORDER: InquiryStatus[] = ["new", "contacted", "qualified", "closed"];
const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "신규",
  contacted: "연락 완료",
  qualified: "검증",
  closed: "종료",
};

export function StatusChanger({ id, current }: { id: string; current: InquiryStatus }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (next: InquiryStatus) => {
    if (next === current) return;
    startTransition(async () => {
      const result = await updateInquiryStatus(id, next);
      if (!result.ok) {
        alert(`상태 변경 실패: ${result.error ?? "알 수 없는 오류"}`);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_ORDER.map((s) => {
        const isActive = s === current;
        return (
          <button
            key={s}
            type="button"
            disabled={pending || isActive}
            onClick={() => handleChange(s)}
            className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
              isActive
                ? "bg-[#002C5F] text-white cursor-default"
                : pending
                ? "bg-[#F4F6FA] text-[#9AA8B8] cursor-wait"
                : "bg-white border border-[#E3E8EF] text-[#3A4A5F] hover:border-[#002C5F] hover:text-[#002C5F]"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        );
      })}
    </div>
  );
}

export function NotesEditor({ id, initial }: { id: string; initial: string }) {
  const [value, setValue] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const router = useRouter();

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateInquiryNotes(id, value);
      if (!result.ok) {
        alert(`노트 저장 실패: ${result.error ?? "알 수 없는 오류"}`);
        return;
      }
      setSavedAt(new Date().toLocaleTimeString("ko-KR"));
      router.refresh();
    });
  };

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        placeholder="관리자 내부 노트. 고객에게 공개되지 않는다."
        className="w-full p-3 rounded-xl border border-[#E3E8EF] bg-white text-sm text-[#0A1628] placeholder-[#9AA8B8] focus:outline-none focus:border-[#002C5F] focus:ring-2 focus:ring-[#002C5F]/10 resize-y"
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-[#6B7B8F]">
          {savedAt ? `저장됨 · ${savedAt}` : "저장 전"}
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={pending}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#002C5F] text-white text-sm font-bold hover:bg-[#001d40] disabled:opacity-50 disabled:cursor-wait transition-all"
        >
          <span className="material-symbols-outlined text-base">save</span>
          {pending ? "저장 중" : "노트 저장"}
        </button>
      </div>
    </div>
  );
}
