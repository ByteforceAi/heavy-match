import { NextResponse } from "next/server";
import { createServiceRoleClient, createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dispatch_id, operator_signature, work_memo } = body;

    const authClient = await createServerSupabaseClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "인증 필요" }, { status: 401 });
    }

    const supabase = await createServiceRoleClient();

    const { data: updated, error } = await supabase
      .from("dispatch_requests")
      .update({
        status: "completed",
        operator_signature,
        work_memo: work_memo || null,
        completed_at: new Date().toISOString(),
      })
      .eq("id", dispatch_id)
      .eq("assigned_operator_id", user.id)
      .eq("status", "in_progress")
      .select()
      .single();

    if (error || !updated) {
      return NextResponse.json({ error: "작업 완료 처리 실패" }, { status: 409 });
    }

    return NextResponse.json({ success: true, dispatch: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "완료 처리 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
