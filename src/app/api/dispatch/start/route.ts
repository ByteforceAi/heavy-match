import { NextResponse } from "next/server";
import { createServiceRoleClient, createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * 작업 시작 API
 * operator_assigned → in_progress 전환
 * 기사가 현장 도착 후 "작업 시작" 버튼 누를 때
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

    const { data: updated, error } = await supabase
      .from("dispatch_requests")
      .update({ status: "in_progress" as const })
      .eq("id", dispatch_id)
      .eq("assigned_operator_id", user.id)
      .eq("status", "operator_assigned")
      .select()
      .single();

    if (error || !updated) {
      return NextResponse.json({ error: "작업 시작 실패" }, { status: 409 });
    }

    return NextResponse.json({ success: true, dispatch: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "작업 시작 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
