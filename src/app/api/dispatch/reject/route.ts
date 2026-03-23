import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

/**
 * 전용콜 거절 API
 * 사장이 전용콜을 거절 → 즉시 콜센터 전달 단계로 에스컬레이션
 */
export async function POST(request: Request) {
  try {
    const { dispatch_id } = await request.json();

    const supabase = await createServiceRoleClient();

    const { data: updated, error } = await supabase
      .from("dispatch_requests")
      .update({
        status: "callcenter_call" as const,
        callcenter_call_at: new Date().toISOString(),
      })
      .eq("id", dispatch_id)
      .eq("status", "exclusive_call")
      .select()
      .single();

    if (error || !updated) {
      return NextResponse.json({ error: "거절 처리 실패" }, { status: 409 });
    }

    // TODO: 콜센터에 SMS 발송

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "거절 처리 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
