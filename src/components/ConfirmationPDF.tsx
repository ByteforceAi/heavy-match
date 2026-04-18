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

      <div id="confirmation-content" className="max-w-md mx-auto bg-white rounded-2xl border border-[#c1c6d6]/30 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#0059b9] text-white p-6 text-center">
          <span className="material-symbols-outlined text-3xl block mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <h1 className="text-2xl font-[800]">작업확인서</h1>
          <p className="text-white/60 text-sm mt-1">철연 CHEOLYEON</p>
        </div>

        <div className="p-6 space-y-4">
          {/* 장비 정보 */}
          <div className="bg-[#eef4ff] rounded-xl p-4">
            <h3 className="text-xs font-bold text-[#727785] mb-2">장비 정보</h3>
            <p className="text-xl font-[800] text-[#111c29]">{data.equipmentName} {data.specName}</p>
            <p className="text-sm text-[#414754]">{data.timeName}</p>
            <p className="text-2xl font-black tabular-nums text-[#0059b9] mt-1">{formatPrice(data.price)}원</p>
          </div>

          {/* 현장 정보 */}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-[#727785]">건설사</span><span className="font-semibold">{data.companyName}</span></div>
            <div className="flex justify-between"><span className="text-[#727785]">현장</span><span className="font-semibold text-right max-w-[60%]">{data.siteAddress}</span></div>
            <div className="flex justify-between"><span className="text-[#727785]">요청자</span><span className="font-semibold">{data.requesterName} {data.requesterPhone}</span></div>
            {data.siteManagerName && (
              <div className="flex justify-between"><span className="text-[#727785]">현장담당</span><span className="font-semibold">{data.siteManagerName} {data.siteManagerPhone}</span></div>
            )}
          </div>

          {/* 작업 메모 */}
          {data.workMemo && (
            <div>
              <h3 className="text-xs font-bold text-[#727785] mb-1">작업 메모</h3>
              <p className="text-sm bg-[#eef4ff] rounded-lg p-3">{data.workMemo}</p>
            </div>
          )}

          {/* 날짜 */}
          <div className="flex justify-between text-xs text-[#727785] pt-2 border-t border-[#c1c6d6]/20">
            <span>요청일: {new Date(data.createdAt).toLocaleDateString("ko-KR")}</span>
            {data.completedAt && <span>완료일: {new Date(data.completedAt).toLocaleDateString("ko-KR")}</span>}
          </div>

          {/* 서명 영역 */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#c1c6d6]/20">
            <div className="text-center">
              <h4 className="text-xs font-bold text-[#727785] mb-2">요청자 서명</h4>
              <div className="h-16 bg-[#eef4ff] rounded-xl flex items-center justify-center text-xs text-[#727785]">서명란</div>
              <p className="text-xs text-[#727785] mt-1">{data.requesterName}</p>
            </div>
            <div className="text-center">
              <h4 className="text-xs font-bold text-[#727785] mb-2">기사 서명</h4>
              <div className="h-16 bg-[#eef4ff] rounded-xl flex items-center justify-center text-xs text-[#727785]">서명란</div>
              <p className="text-xs text-[#727785] mt-1">기사</p>
            </div>
          </div>
        </div>
      </div>

      {/* 다운로드 버튼 */}
      <div className="no-print max-w-md mx-auto mt-4 flex gap-2">
        <button onClick={handlePrint}
          className="flex-1 py-3 bg-[#0059b9] text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">print</span>인쇄 / PDF 저장
        </button>
        <button onClick={handleDownload}
          className="flex-1 py-3 bg-[#26313f] text-white font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">download</span>다운로드
        </button>
      </div>
    </>
  );
}
