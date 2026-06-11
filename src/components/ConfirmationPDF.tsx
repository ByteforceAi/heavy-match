"use client";

import { formatPrice } from "@/lib/utils";

interface ConfirmationData {
  equipmentName: string;
  specName: string;
  timeName: string;
  price: number;
  companyName: string;
  siteAddress: string;
  requesterName: string;
  requesterPhone: string;
  siteManagerName?: string;
  siteManagerPhone?: string;
  workMemo?: string;
  createdAt: string;
  completedAt?: string;
}

export default function ConfirmationPDF({ data }: { data: ConfirmationData }) {
  const handlePrint = () => window.print();

  const handleDownload = () => {
    // Canvas 기반 이미지 다운로드 (PDF 대안)
    const el = document.getElementById("confirmation-content");
    if (!el) return;
    // 프린트 다이얼로그로 PDF 저장 유도
    window.print();
  };

  return (
    <>
      {/* 프린트 전용 스타일 */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #confirmation-content, #confirmation-content * { visibility: visible; }
          #confirmation-content { position: absolute; top: 0; left: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div id="confirmation-content" className="max-w-md mx-auto bg-white rounded-2xl border border-cy-line shadow-[0_10px_30px_rgba(0,44,95,0.12)] overflow-hidden">
        {/* Header — 공문서 도장 구도 */}
        <div className="bg-cy-navy text-white p-6 text-center">
          <p className="mono-label text-white/50 mb-1.5">WORK CONFIRMATION</p>
          <h1 className="text-2xl font-extrabold tracking-[-0.02em]">작업확인서</h1>
          <p className="text-white/65 text-sm mt-1">철연 CHEOLYEON</p>
        </div>

        <div className="p-6 space-y-4">
          {/* 장비 정보 */}
          <div className="bg-cy-navy-pale/60 border border-cy-navy/10 rounded-xl p-4">
            <h3 className="mono-label text-cy-ink-3 mb-2">EQUIPMENT</h3>
            <p className="text-xl font-extrabold tracking-[-0.01em] text-cy-ink">{data.equipmentName} {data.specName}</p>
            <p className="text-sm text-cy-ink-2">{data.timeName}</p>
            <p className="text-2xl font-black tabular-nums tracking-[-0.02em] text-cy-navy mt-1">{formatPrice(data.price)}원</p>
          </div>

          {/* 현장 정보 */}
          <div className="text-sm">
            <div className="flex justify-between py-2 border-b border-cy-line-soft"><span className="text-cy-ink-3">건설사</span><span className="font-semibold text-cy-ink">{data.companyName}</span></div>
            <div className="flex justify-between py-2 border-b border-cy-line-soft"><span className="text-cy-ink-3">현장</span><span className="font-semibold text-cy-ink text-right max-w-[60%]">{data.siteAddress}</span></div>
            <div className="flex justify-between py-2 border-b border-cy-line-soft"><span className="text-cy-ink-3">요청자</span><span className="font-semibold text-cy-ink">{data.requesterName} <span className="tabular-nums">{data.requesterPhone}</span></span></div>
            {data.siteManagerName && (
              <div className="flex justify-between py-2"><span className="text-cy-ink-3">현장담당</span><span className="font-semibold text-cy-ink">{data.siteManagerName} <span className="tabular-nums">{data.siteManagerPhone}</span></span></div>
            )}
          </div>

          {/* 작업 메모 */}
          {data.workMemo && (
            <div>
              <h3 className="mono-label text-cy-ink-3 mb-1.5">MEMO</h3>
              <p className="text-sm text-cy-ink bg-cy-bg rounded-lg p-3 leading-relaxed">{data.workMemo}</p>
            </div>
          )}

          {/* 날짜 */}
          <div className="flex justify-between text-xs text-cy-ink-3 tabular-nums pt-2 border-t border-cy-line-soft">
            <span>요청일: {new Date(data.createdAt).toLocaleDateString("ko-KR")}</span>
            {data.completedAt && <span>완료일: {new Date(data.completedAt).toLocaleDateString("ko-KR")}</span>}
          </div>

          {/* 서명 영역 */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cy-line-soft">
            <div className="text-center">
              <h4 className="mono-label text-cy-ink-3 mb-2">요청자 서명</h4>
              <div className="h-16 bg-white border border-dashed border-cy-line rounded-xl flex items-center justify-center text-xs text-cy-ink-4">서명란</div>
              <p className="text-xs text-cy-ink-3 mt-1">{data.requesterName}</p>
            </div>
            <div className="text-center">
              <h4 className="mono-label text-cy-ink-3 mb-2">기사 서명</h4>
              <div className="h-16 bg-white border border-dashed border-cy-line rounded-xl flex items-center justify-center text-xs text-cy-ink-4">서명란</div>
              <p className="text-xs text-cy-ink-3 mt-1">기사</p>
            </div>
          </div>
        </div>
      </div>

      {/* 다운로드 버튼 */}
      <div className="no-print max-w-md mx-auto mt-4 flex gap-2">
        <button onClick={handlePrint}
          className="press flex-1 min-h-12 bg-cy-navy hover:bg-cy-navy-mid text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,44,95,0.2)]">
          <span className="material-symbols-outlined text-lg">print</span>인쇄 / PDF 저장
        </button>
        <button onClick={handleDownload}
          className="press flex-1 min-h-12 bg-white text-cy-ink border border-cy-line hover:border-cy-navy/35 font-bold rounded-xl flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">download</span>다운로드
        </button>
      </div>
    </>
  );
}
