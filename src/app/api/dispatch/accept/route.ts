import { NextResponse } from "next/server";
import { createServiceRoleClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { calculateCommission } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dispatch_id, owner_token } = body;

    const supabase = await createServiceRoleClient();
    const authClient = await createServerSupabaseClient();
    const { data: { user } } = await authClient.auth.getUser();

    // 사장 식별: 토큰 또는 인증된 사용자
    let ownerId: string | null = null;
    if (owner_token) {
      const { data: smsLog } = await supabase
        .from("sms_logs")
        .select("recipient_id")
        .eq("token", owner_token)
        .eq("dispatch_id", dispatch_id)
        .single();
      ownerId = smsLog?.recipient_id ?? null;
    } else if (user) {
      ownerId = user.id;
    }

    if (!ownerId) {
      return NextResponse.json({ error: "사장 식별 불가" }, { status: 401 });
    }

    // 동시성 제어: UPDATE ... WHERE status IN (...)
    const { data: updated, error: updateError } = await supabase
      .from("dispatch_requests")
      .update({
        status: "matched" as const,
        matched_owner_id: ownerId,
        matched_at: new Date().toISOString(),
      })
      .eq("id", dispatch_id)
      .in("status", ["exclusive_call", "callcenter_call", "shared_call"])
      .select()
      .single() as { data: { id: string; price: number; requester_id: string; equipment_type_id: number; spec_id: number; site_address: string; company_name: string; original_callcenter_id: string | null } | null; error: unknown };

    if (updateError || !updated) {
      return NextResponse.json(
        { error: "이미 배정된 건이거나 존재하지 않는 요청입니다" },
        { status: 409 }
      );
    }

    // 수수료 계산 및 기록
    const commission = calculateCommission(updated.price);

    // 콜센터/영업사원 조회
    const { data: owner } = await supabase
      .from("users")
      .select("callcenter_id, parent_id")
      .eq("id", ownerId)
      .single();

    const callcenterId = updated.original_callcenter_id ?? owner?.callcenter_id ?? null;

    // 영업사원 조회 (콜센터 소속)
    let salespersonId: string | null = null;
    if (callcenterId) {
      const { data: salesperson } = await supabase
        .from("users")
        .select("id")
        .eq("parent_id", callcenterId)
        .eq("role", "salesperson")
        .limit(1)
        .single();
      salespersonId = salesperson?.id ?? null;
    }

    await supabase.from("commissions").insert({
      dispatch_id: updated.id,
      total_price: updated.price,
      commission_rate: 15.0,
      total_commission: commission.totalCommission,
      requester_reward: commission.requesterReward,
      company_fee: commission.companyFee,
      callcenter_fee: commission.callcenterFee,
      salesperson_fee: commission.salespersonFee,
      callcenter_id: callcenterId,
      salesperson_id: salespersonId,
    });

    // 재주문 이력 UPSERT
    await supabase.from("call_history").upsert(
      {
        requester_id: updated.requester_id,
        owner_id: ownerId,
        equipment_type_id: updated.equipment_type_id,
        spec_id: updated.spec_id,
        site_address: updated.site_address,
        company_name: updated.company_name,
        use_count: 1,
      },
      { onConflict: "requester_id,owner_id,equipment_type_id,spec_id,site_address" }
    );

    // TODO: 요청자에게 매칭 완료 SMS

    return NextResponse.json({ success: true, dispatch: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "수락 처리 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
