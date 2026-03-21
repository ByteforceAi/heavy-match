import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { generateToken } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createServiceRoleClient();

    const {
      requester_id,
      equipment_type_id,
      spec_id,
      time_unit_id,
      price,
      company_name,
      site_address,
      payment_date,
      requester_name,
      requester_title,
      requester_phone,
      site_manager_name,
      site_manager_title,
      site_manager_phone,
      requester_signature,
    } = body;

    // 요청자의 referred_owner_id 조회 (전용콜 대상)
    const { data: requester } = await supabase
      .from("users")
      .select("referred_owner_id")
      .eq("id", requester_id)
      .single();

    const targetOwnerId = requester?.referred_owner_id;

    // 대상 사장의 콜센터 조회 (수수료 귀속)
    let originalCallcenterId: string | null = null;
    if (targetOwnerId) {
      const { data: owner } = await supabase
        .from("users")
        .select("callcenter_id")
        .eq("id", targetOwnerId)
        .single();
      originalCallcenterId = owner?.callcenter_id ?? null;
    }

    // 배차 요청 INSERT
    const { data: dispatch, error: insertError } = await supabase
      .from("dispatch_requests")
      .insert({
        requester_id,
        equipment_type_id,
        spec_id,
        time_unit_id,
        price,
        company_name,
        site_address,
        payment_date: payment_date || null,
        requester_name,
        requester_title,
        requester_phone,
        site_manager_name,
        site_manager_title,
        site_manager_phone,
        requester_signature,
        status: (targetOwnerId ? "exclusive_call" : "shared_call") as "exclusive_call" | "shared_call",
        target_owner_id: targetOwnerId,
        original_callcenter_id: originalCallcenterId,
        exclusive_call_at: targetOwnerId ? new Date().toISOString() : null,
        shared_call_at: targetOwnerId ? null : new Date().toISOString(),
      })
      .select()
      .single() as { data: { id: string } | null; error: unknown };

    if (insertError) throw insertError;

    // SMS 토큰 생성 및 발송 (전용콜인 경우)
    if (targetOwnerId && dispatch) {
      const token = generateToken();

      await supabase.from("sms_logs").insert({
        dispatch_id: dispatch.id,
        recipient_id: targetOwnerId,
        recipient_phone: "", // 실제로는 사장 전화번호 조회 필요
        message_type: "exclusive",
        token,
        status: "pending",
      });

      // TODO: Naver Cloud SMS 발송 API 호출
      // await sendSMS(ownerPhone, message);
    }

    return NextResponse.json({ success: true, dispatch });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "배차 요청 실패";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
