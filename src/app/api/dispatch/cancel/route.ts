import { NextResponse } from "next/server";
import { createServiceRoleClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { calculateCancelFee } from "@/lib/utils";

/**
 * 배차 취소 API
 * 배정 후 취소 시 7.5% 페널티 수수료 발생
 */
export async function POST(request: Request) {
  try {
    const { dispatch_id } = await request.json();

    const authClient = await createServerSupabaseClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "인증 필요" }, { status: 401 });
    }

    const supabase = await createServiceRoleClient();

    // 현재 상태 확인
    const { data: dispatch } = await supabase
      .from("dispatch_requests")
      .select("*")
      .eq("id", dispatch_id)
      .single() as { data: { id: string; status: string; price: number; requester_id: string } | null };

    if (!dispatch) {
      return NextResponse.json({ error: "요청을 찾을 수 없습니다" }, { status: 404 });
    }

    // 완료/이미 취소된 건은 취소 불가
    if (["completed", "cancelled"].includes(dispatch.status)) {
      return NextResponse.json({ error: "이미 완료/취소된 건입니다" }, { status: 400 });
    }

    // 취소 처리
    const { error } = await supabase
      .from("dispatch_requests")
      .update({ status: "cancelled" as const })
      .eq("id", dispatch_id);

    if (error) throw error;

    // 매칭 이후 취소면 7.5% 페널티 수수료 기록
    if (["matched", "operator_assigned", "in_progress"].includes(dispatch.status)) {
      const cancelFee = calculateCancelFee(dispatch.price);
      await supabase.from("commissions").insert({
        dispatch_id: dispatch.id,
        total_price: dispatch.price,
        commission_rate: 7.5,
        total_commission: cancelFee,
        requester_reward: 0,
        company_fee: cancelFee,
        callcenter_fee: 0,
        salesperson_fee: 0,
        is_cancelled: true,
        cancel_fee: cancelFee,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "취소 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
