"use server";

/**
 * 문의 관리 · 서버 액션
 * heritage-v1.md §3 — 판결문 어미 고정. 인터랙션 라벨은 존대 허용.
 *
 * 주의: inquiries 테이블은 병렬 에이전트가 스키마를 생성 중이다.
 *       타입이 Database에 등록되기 전까지 `any` 우회를 사용한다.
 */

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type InquiryStatus = "new" | "contacted" | "qualified" | "closed";

const VALID_STATUSES: InquiryStatus[] = ["new", "contacted", "qualified", "closed"];

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  if (!VALID_STATUSES.includes(status)) {
    return { ok: false, error: "유효하지 않은 상태이다" };
  }

  const supabase = await createServerSupabaseClient();

  const patch: Record<string, unknown> = { status };
  // new → contacted 최초 전이 시 contacted_at 타임스탬프 기재
  if (status === "contacted") {
    patch.contacted_at = new Date().toISOString();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("inquiries") as any)
    .update(patch)
    .eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
  return { ok: true };
}

export async function updateInquiryNotes(id: string, notes: string) {
  const supabase = await createServerSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("inquiries") as any)
    .update({ notes })
    .eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath(`/admin/inquiries/${id}`);
  return { ok: true };
}
