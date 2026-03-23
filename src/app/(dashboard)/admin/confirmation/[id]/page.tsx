import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { formatPrice, formatPhone } from "@/lib/utils";

export default async function WorkConfirmationPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  type DispatchDetail = {
    id: string; price: number; company_name: string; site_address: string;
    requester_name: string | null; requester_phone: string | null; requester_title: string | null;
    requester_signature: string | null; operator_signature: string | null;
    site_manager_name: string | null; site_manager_phone: string | null;
    work_memo: string | null; completed_at: string | null; created_at: string;
    equipment_types: { name: string } | null;
    equipment_specs: { spec_name: string } | null;
    time_units: { name: string } | null;
  };
  let dispatch: DispatchDetail | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from("dispatch_requests")
      .select("*, equipment_types(name), equipment_specs(spec_name), time_units(name)")
      .eq("id", id)
      .single() as unknown as { data: DispatchDetail | null };
    dispatch = data;
  }

  if (!dispatch) {
    return <div className="p-8 text-center text-text-muted">요청을 찾을 수 없습니다</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-border shadow-lg overflow-hidden print:shadow-none">
      {/* 헤더 */}
      <div className="bg-primary text-white p-6 text-center">
        <h1 className="text-2xl font-bold">작업확인서</h1>
        <p className="text-blue-100 text-sm mt-1">Heavy Match</p>
      </div>

      <div className="p-6 space-y-4">
        {/* 장비 정보 */}
        <section className="bg-blue-50 rounded-xl p-4">
          <h3 className="text-sm font-medium text-text-muted mb-2">장비 정보</h3>
          <p className="text-xl font-bold">{dispatch.equipment_types?.name} {dispatch.equipment_specs?.spec_name}</p>
          <p className="text-base text-text-muted">{dispatch.time_units?.name}</p>
          <p className="text-2xl font-bold tabular-nums text-primary mt-1">{formatPrice(dispatch.price)}원</p>
        </section>

        {/* 현장 정보 */}
        <section>
          <h3 className="text-sm font-medium text-text-muted mb-2">현장 정보</h3>
          <div className="space-y-1 text-base">
            <p><b>건설사:</b> {dispatch.company_name}</p>
            <p><b>현장:</b> {dispatch.site_address}</p>
            {dispatch.requester_name && <p><b>요청자:</b> {dispatch.requester_name} {dispatch.requester_title}</p>}
            {dispatch.requester_phone && <p><b>연락처:</b> {formatPhone(dispatch.requester_phone)}</p>}
            {dispatch.site_manager_name && <p><b>현장담당:</b> {dispatch.site_manager_name}</p>}
          </div>
        </section>

        {/* 작업 메모 */}
        {dispatch.work_memo && (
          <section>
            <h3 className="text-sm font-medium text-text-muted mb-1">작업 메모</h3>
            <p className="text-base bg-gray-50 rounded-lg p-3">{dispatch.work_memo}</p>
          </section>
        )}

        {/* 날짜 */}
        <section className="flex justify-between text-sm text-text-muted">
          <span>요청일: {new Date(dispatch.created_at).toLocaleDateString("ko-KR")}</span>
          {dispatch.completed_at && <span>완료일: {new Date(dispatch.completed_at).toLocaleDateString("ko-KR")}</span>}
        </section>

        {/* 서명 */}
        <section className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <h4 className="text-sm font-medium text-text-muted mb-2">요청자 서명</h4>
            {dispatch.requester_signature ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dispatch.requester_signature} alt="요청자 서명" className="h-20 mx-auto border border-border rounded-lg" />
            ) : (
              <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-text-muted">미서명</div>
            )}
            <p className="text-xs text-text-muted mt-1">{dispatch.requester_name ?? "-"}</p>
          </div>
          <div className="text-center">
            <h4 className="text-sm font-medium text-text-muted mb-2">기사 서명</h4>
            {dispatch.operator_signature ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dispatch.operator_signature} alt="기사 서명" className="h-20 mx-auto border border-border rounded-lg" />
            ) : (
              <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-text-muted">미서명</div>
            )}
            <p className="text-xs text-text-muted mt-1">기사</p>
          </div>
        </section>

        {/* 인쇄 버튼 */}
        <button
          onClick={() => window.print()}
          className="w-full py-3 bg-primary text-white font-semibold rounded-xl print:hidden"
        >
          🖨️ 인쇄하기
        </button>
      </div>
    </div>
  );
}
