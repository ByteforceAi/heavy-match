import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

/**
 * Vercel Cron: 60초 타이머 체크
 * exclusive_call 상태에서 60초 경과 → callcenter_call
 * callcenter_call 상태에서 60초 경과 → shared_call
 */
export async function GET(request: Request) {
  // Cron 인증
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createServiceRoleClient();
  const now = new Date();
  const sixtySecondsAgo = new Date(now.getTime() - 60 * 1000).toISOString();

  // 1단계: exclusive_call → callcenter_call
  const { data: exclusiveExpired } = await supabase
    .from("dispatch_requests")
    .select("id, original_callcenter_id")
    .eq("status", "exclusive_call")
    .lt("exclusive_call_at", sixtySecondsAgo);

  if (exclusiveExpired) {
    for (const d of exclusiveExpired) {
      await supabase
        .from("dispatch_requests")
        .update({
          status: "callcenter_call",
          callcenter_call_at: now.toISOString(),
        })
        .eq("id", d.id)
        .eq("status", "exclusive_call");

      // TODO: 콜센터에 SMS 발송
    }
  }

  // 2단계: callcenter_call → shared_call
  const { data: callcenterExpired } = await supabase
    .from("dispatch_requests")
    .select("id")
    .eq("status", "callcenter_call")
    .lt("callcenter_call_at", sixtySecondsAgo);

  if (callcenterExpired) {
    for (const d of callcenterExpired) {
      await supabase
        .from("dispatch_requests")
        .update({
          status: "shared_call",
          shared_call_at: now.toISOString(),
        })
        .eq("id", d.id)
        .eq("status", "callcenter_call");

      // TODO: 같은 지역 사장들에게 SMS 발송
    }
  }

  return NextResponse.json({
    escalated: {
      exclusive_to_callcenter: exclusiveExpired?.length ?? 0,
      callcenter_to_shared: callcenterExpired?.length ?? 0,
    },
  });
}
