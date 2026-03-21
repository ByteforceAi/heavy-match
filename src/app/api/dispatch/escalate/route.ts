import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

/**
 * 배차 단계 자동 전환
 * exclusive_call → callcenter_call → shared_call
 * 60초 타이머 기반
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dispatch_id, next_status } = body;

    const supabase = await createServiceRoleClient();

    const validTransitions: Record<string, string> = {
      exclusive_call: "callcenter_call",
      callcenter_call: "shared_call",
    };

    // 현재 상태 확인
    const { data: dispatch } = await supabase
      .from("dispatch_requests")
      .select("*")
      .eq("id", dispatch_id)
      .single() as { data: { id: string; status: string } | null };

    if (!dispatch) {
      return NextResponse.json({ error: "요청을 찾을 수 없습니다" }, { status: 404 });
    }

    const expectedNext = validTransitions[dispatch.status];
    if (!expectedNext || (next_status && next_status !== expectedNext)) {
      return NextResponse.json({ error: "유효하지 않은 상태 전환입니다" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
      status: expectedNext,
    };

    if (expectedNext === "callcenter_call") {
      updateData.callcenter_call_at = new Date().toISOString();
      // TODO: 콜센터에 SMS 발송
    } else if (expectedNext === "shared_call") {
      updateData.shared_call_at = new Date().toISOString();
      // TODO: 같은 지역 사장들에게 SMS 발송
    }

    const { data: updated, error } = await supabase
      .from("dispatch_requests")
      .update(updateData)
      .eq("id", dispatch_id)
      .eq("status", dispatch.status as "exclusive_call" | "callcenter_call") // 낙관적 락
      .select()
      .single();

    if (error || !updated) {
      return NextResponse.json({ error: "상태 전환 실패" }, { status: 409 });
    }

    return NextResponse.json({ success: true, dispatch: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "에스컬레이션 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
