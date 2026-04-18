/**
 * InquiryNotification — 철연 CHEOLYEON 랜딩 문의 알림 메일
 *
 * 판결문 어미 · HD Navy 헤더 · 테이블 형식 인콰이어리 정보.
 * React Email 패키지 미설치 환경에서도 무해하도록,
 * `renderInquiryHtml()` / `renderInquiryText()` 2개의 순수 문자열 렌더러를 노출한다.
 *
 * Resend 호출부는 `html`/`text` 필드만 사용한다.
 * 차후 @react-email/components 설치 시 동일 데이터로 React 컴포넌트 대체 가능.
 */
import type { ReactElement } from "react";

export interface InquiryEmailProps {
  id: string;
  name: string;
  company: string;
  phone: string;
  email?: string;
  role?: string;
  message?: string;
  source?: string;
  createdAt: string; // ISO
  supabaseEditorUrl?: string;
}

// ---- HTML (string template) ------------------------------------------------

const NAVY = "#002C5F";
const INK = "#0A1628";
const MUTE = "#6B7B8F";
const LINE = "#E3E8EF";
const BG = "#F5F7FA";

function escape(s: string | undefined): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined): string {
  const v = value?.trim() ? escape(value) : "<span style=\"color:#9AA8B8\">— 미기재 —</span>";
  return `
  <tr>
    <td style="padding:10px 16px;border-bottom:1px solid ${LINE};width:140px;color:${MUTE};font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;font-family:'Roboto Mono',monospace;">${escape(label)}</td>
    <td style="padding:10px 16px;border-bottom:1px solid ${LINE};color:${INK};font-size:14px;line-height:1.6;">${v}</td>
  </tr>`;
}

export function renderInquiryHtml(p: InquiryEmailProps): string {
  const editorUrl = p.supabaseEditorUrl ?? "https://supabase.com/dashboard";
  const ts = new Date(p.createdAt).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>철연 문의</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans KR',sans-serif;color:${INK};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid ${LINE};border-radius:12px;overflow:hidden;max-width:620px;">

          <!-- 헤더 -->
          <tr>
            <td style="background:${NAVY};padding:20px 28px;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="color:#FFFFFF;font-size:13px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;font-family:'Roboto Mono',monospace;">
                    CHEOLYEON · 철연
                  </td>
                  <td align="right" style="color:#8FA8C8;font-size:11px;letter-spacing:0.12em;font-family:'Roboto Mono',monospace;">
                    INQUIRY · ${escape(p.id.slice(0, 8))}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 본문 -->
          <tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 4px 0;font-size:20px;font-weight:800;color:${INK};letter-spacing:-0.02em;">
                신규 상담 문의가 접수되었다.
              </h1>
              <p style="margin:0 0 20px 0;font-size:13px;color:${MUTE};line-height:1.6;">
                cheolyeon.com 랜딩 페이지 문의 양식을 통해 ${escape(ts)} (KST)에 수신된 문의의 내역은 아래와 같다.
              </p>

              <!-- 메타 테이블 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${LINE};border-radius:8px;border-collapse:separate;overflow:hidden;">
                ${row("이름", p.name)}
                ${row("회사명", p.company)}
                ${row("연락처", p.phone)}
                ${row("이메일", p.email)}
                ${row("역할", p.role)}
                <tr>
                  <td style="padding:10px 16px;width:140px;color:${MUTE};font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;font-family:'Roboto Mono',monospace;vertical-align:top;">문의 내용</td>
                  <td style="padding:10px 16px;color:${INK};font-size:14px;line-height:1.7;white-space:pre-wrap;">${p.message?.trim() ? escape(p.message) : "<span style=\"color:#9AA8B8\">— 미기재 —</span>"}</td>
                </tr>
              </table>

              <!-- 출처/타임스탬프 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                <tr>
                  <td style="font-size:11px;color:${MUTE};letter-spacing:0.08em;font-family:'Roboto Mono',monospace;">
                    SOURCE · ${escape(p.source ?? "landing")}
                  </td>
                  <td align="right" style="font-size:11px;color:${MUTE};letter-spacing:0.08em;font-family:'Roboto Mono',monospace;">
                    ${escape(p.createdAt)}
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td align="center">
                    <a href="${escape(editorUrl)}"
                       style="display:inline-block;padding:12px 24px;background:${NAVY};color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:700;border-radius:8px;letter-spacing:-0.01em;">
                      Supabase에서 자세히 보기 →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0 0;padding-top:16px;border-top:1px solid ${LINE};font-size:11px;color:${MUTE};line-height:1.7;text-align:center;">
                이 이메일은 cheolyeon.com 문의 양식을 통해 자동 발송되었다.<br/>
                담당: BYTEFORCE 사업개발팀 · ceo@byteforce.ai.kr
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderInquiryText(p: InquiryEmailProps): string {
  const ts = new Date(p.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  const line = (k: string, v?: string) => `${k}: ${v?.trim() ? v : "— 미기재 —"}`;

  return [
    "[철연 CHEOLYEON] 신규 상담 문의가 접수되었다.",
    "",
    `수신 일시: ${ts} (KST)`,
    `문의 ID: ${p.id}`,
    `출처: ${p.source ?? "landing"}`,
    "",
    "─ 문의 내역 ─",
    line("이름", p.name),
    line("회사명", p.company),
    line("연락처", p.phone),
    line("이메일", p.email),
    line("역할", p.role),
    "",
    "─ 문의 내용 ─",
    p.message?.trim() || "— 미기재 —",
    "",
    "─",
    "이 이메일은 cheolyeon.com 문의 양식을 통해 자동 발송되었다.",
    "담당: BYTEFORCE 사업개발팀 · ceo@byteforce.ai.kr",
  ].join("\n");
}

export function buildInquirySubject(p: Pick<InquiryEmailProps, "name" | "company">): string {
  return `[철연 문의] ${p.name} · ${p.company}`;
}

// ---- Optional React Email component (only renders if package installed) ---
//
// 아래는 @react-email/components 설치 시를 위한 자리 마커. 설치 전에는 본 함수
// 자체를 호출하지 않는다. Resend 호출부는 `renderInquiryHtml()`만 사용한다.
//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function InquiryNotification(_props: InquiryEmailProps): ReactElement {
  // React Email 설치 이전에는 HTML 문자열만 쓰이므로 본 컴포넌트는 참조되지 않는다.
  // 의도적으로 최소 JSX만 반환한다 — 타입 시그니처 유지 목적.
  return null as unknown as ReactElement;
}

export default InquiryNotification;
