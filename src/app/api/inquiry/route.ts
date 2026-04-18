/**
 * POST /api/inquiry
 *
 * 랜딩 페이지 문의 폼의 서버 엔드포인트.
 *
 * 책임
 *  1. 입력 검증 (name · company · phone 필수, email 포맷 검사)
 *  2. IP 기반 레이트 리밋 (in-memory · 5req/min)
 *  3. Supabase `public.inquiries` 테이블에 INSERT (source of truth)
 *  4. RESEND_API_KEY 존재 시 Resend 경유로 ceo@byteforce.ai.kr 에 알림 발송 (best-effort)
 *
 * 실패 정책
 *  - Supabase 실패 + production → 500
 *  - Supabase 실패 + development → console.warn 후 2xx 반환 (로컬 개발 편의)
 *  - Resend 실패 → 무시하고 emailed:false 반환
 */

import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import {
  buildInquirySubject,
  renderInquiryHtml,
  renderInquiryText,
  type InquiryEmailProps,
} from "@/emails/InquiryNotification";

export const runtime = "nodejs";

// ---- 입력 스키마 -----------------------------------------------------------

interface InquiryBody {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  email?: unknown;
  role?: unknown;
  message?: unknown;
}

interface NormalizedInquiry {
  name: string;
  company: string;
  phone: string;
  email: string | null;
  role: string | null;
  message: string | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT = 2000;

function asTrimmedString(v: unknown, max = 200): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

function validate(body: InquiryBody): { ok: true; data: NormalizedInquiry } | { ok: false; error: string } {
  const name = asTrimmedString(body.name, 100);
  const company = asTrimmedString(body.company, 200);
  const phone = asTrimmedString(body.phone, 40);
  const email = asTrimmedString(body.email, 200);
  const role = asTrimmedString(body.role, 80);
  const message = asTrimmedString(body.message, MAX_TEXT);

  if (!name) return { ok: false, error: "이름은 필수 입력 항목이다." };
  if (!company) return { ok: false, error: "회사명은 필수 입력 항목이다." };
  if (!phone) return { ok: false, error: "연락처는 필수 입력 항목이다." };
  if (email && !EMAIL_RE.test(email)) return { ok: false, error: "이메일 형식이 올바르지 않다." };

  return {
    ok: true,
    data: { name, company, phone, email, role, message },
  };
}

// ---- Rate Limit (in-memory, 단일 인스턴스 MVP) -----------------------------

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const rateBuckets: Map<string, number[]> = new Map();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const prev = rateBuckets.get(ip) ?? [];
  const recent = prev.filter((t) => t > windowStart);
  if (recent.length >= RATE_MAX) {
    rateBuckets.set(ip, recent);
    return false;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return true;
}

function resolveIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

// ---- Resend (옵셔널) -------------------------------------------------------

async function sendNotificationEmail(record: InquiryEmailProps): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.NOTIFICATION_EMAIL || "ceo@byteforce.ai.kr";
  const replyTo = process.env.REPLY_TO_EMAIL || to;
  const from = process.env.RESEND_FROM || "철연 알림 <noreply@cheolyeon.com>";

  try {
    // 동적 로드 — 패키지 미설치 환경에서도 이 파일 전체가 무너지지 않도록.
    const mod = (await import("resend").catch(() => null)) as
      | { Resend: new (key: string) => { emails: { send: (opts: Record<string, unknown>) => Promise<unknown> } } }
      | null;
    if (!mod?.Resend) {
      console.warn("[CHEOLYEON Inquiry] resend 패키지가 설치되지 않아 이메일 발송을 생략한다.");
      return false;
    }

    const resend = new mod.Resend(apiKey);
    await resend.emails.send({
      from,
      to: [to],
      replyTo: record.email || replyTo,
      subject: buildInquirySubject(record),
      html: renderInquiryHtml(record),
      text: renderInquiryText(record),
    });
    return true;
  } catch (err) {
    console.error("[CHEOLYEON Inquiry] Resend 발송 실패:", err);
    return false;
  }
}

// ---- POST 핸들러 -----------------------------------------------------------

export async function POST(req: NextRequest): Promise<Response> {
  const ip = resolveIp(req);

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "요청이 일시적으로 제한되었다. 잠시 후 다시 시도한다." },
      { status: 429 }
    );
  }

  let body: InquiryBody;
  try {
    body = (await req.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ ok: false, error: "요청 본문을 해석할 수 없다." }, { status: 400 });
  }

  const parsed = validate(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  const data = parsed.data;

  const userAgent = req.headers.get("user-agent") ?? null;
  const isProd = process.env.NODE_ENV === "production";

  // ---- Supabase INSERT -----------------------------------------------------
  let insertedId: string | null = null;
  let supabaseFailed = false;
  let createdAt = new Date().toISOString();

  try {
    const supabase = await createServiceRoleClient();
    // `inquiries` 테이블은 Database 타입에 아직 포함되지 않음 — 타입 캐스팅으로 우회
    // 마이그레이션 적용 후 types/database.ts 재생성 시 제거 가능
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseAny = supabase as any;
    const { data: inserted, error } = (await supabaseAny
      .from("inquiries")
      .insert({
        name: data.name,
        company: data.company,
        phone: data.phone,
        email: data.email,
        role: data.role,
        message: data.message,
        source: "landing",
        ip_address: ip !== "unknown" ? ip : null,
        user_agent: userAgent,
      })
      .select("id, created_at")
      .single()) as { data: { id: string; created_at: string } | null; error: unknown };

    if (error) throw error;
    if (inserted) {
      insertedId = inserted.id;
      createdAt = inserted.created_at;
    }
  } catch (err) {
    supabaseFailed = true;
    console.error("[CHEOLYEON Inquiry] Supabase INSERT 실패:", err);
    if (isProd) {
      return NextResponse.json(
        { ok: false, error: "문의 저장이 실패했다. 잠시 후 다시 시도한다." },
        { status: 500 }
      );
    }
    // 개발 환경: 콘솔 저장으로 폴백
    insertedId = `dev_${Math.random().toString(36).slice(2, 10)}`;
    console.info("[CHEOLYEON Inquiry] (dev fallback) 저장된 문의:", { id: insertedId, ...data });
  }

  // ---- Resend (best-effort) -------------------------------------------------
  const emailed = insertedId
    ? await sendNotificationEmail({
        id: insertedId,
        name: data.name,
        company: data.company,
        phone: data.phone,
        email: data.email ?? undefined,
        role: data.role ?? undefined,
        message: data.message ?? undefined,
        source: "landing",
        createdAt,
        supabaseEditorUrl: process.env.SUPABASE_EDITOR_URL,
      })
    : false;

  return NextResponse.json({
    ok: true,
    id: insertedId,
    emailed,
    stored: !supabaseFailed,
  });
}
