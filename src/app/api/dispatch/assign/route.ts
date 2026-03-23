import { NextResponse } from "next/server";
import { createServiceRoleClient, createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * 기사 배정 API
 * matched 상태의 배차에 기사를 배정 → operator_assigned로 전환
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dispatch_id, operator_id } = body;

    if (!dispatch_id || !operator_id) {
      return NextResponse.json({ error: "dispatch_id와 operator_id가 필요합니다" }, { status: 400 });
    }

    const authClient = await createServerSupabaseClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "인증 필요" }, { status: 401 });
    }

    const supabase = await createServiceRoleClient();

    // matched 상태이고, 현재 사용자가 매칭된 사장인 경우만 배정 가능
    const { data: updated, error } = await supabase
      .from("dispatch_requests")
      .update({
        status: "operator_assigned" as const,
        assigned_operator_id: operator_id,
      })
      .eq("id", dispatch_id)
      .eq("matched_owner_id", user.id)
      .eq("status", "matched")
      .select()
      .single();

    if (error || !updated) {
      return NextResponse.json(
        { error: "배정 실패 — 매칭된 건이 아니거나 이미 배정되었습니다" },
        { status: 409 }
      );
    }

    // TODO: 기사에게 배차 안내 SMS 발송

    return NextResponse.json({ success: true, dispatch: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "기사 배정 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
