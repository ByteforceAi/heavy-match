import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { Card } from "@/components/ui/Card";
import { formatPhone } from "@/lib/utils";
import { StatusChanger, NotesEditor } from "../_parts";

/**
 * 문의 상세
 * heritage-v1.md §3 — 판결문 어미 고정. 인터랙션 라벨은 존대 허용.
 */

export const dynamic = "force-dynamic";

type InquiryStatus = "new" | "contacted" | "qualified" | "closed";

interface Inquiry {
  id: string;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  role: string | null;
  message: string;
  source: string | null;
  status: InquiryStatus;
  created_at: string;
  contacted_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
  notes: string | null;
}

const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "신규",
  contacted: "연락 완료",
  qualified: "검증",
  closed: "종료",
};

const STATUS_STYLES: Record<InquiryStatus, { bg: string; fg: string; dot: string }> = {
  new: { bg: "bg-[#FFB02015]", fg: "text-[#B87400]", dot: "bg-[#FFB020]" },
  contacted: { bg: "bg-[#00AAD215]", fg: "text-[#007792]", dot: "bg-[#00AAD2]" },
  qualified: { bg: "bg-[#002C5F15]", fg: "text-[#002C5F]", dot: "bg-[#002C5F]" },
  closed: { bg: "bg-[#9AA8B815]", fg: "text-[#6B7B8F]", dot: "bg-[#9AA8B8]" },
};

function StatusBadge({ status }: { status: InquiryStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold ${s.bg} ${s.fg}`}>
      <span className={`w-2 h-2 rounded-full ${s.dot}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}

function formatFull(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({ params }: PageProps) {
  const { id } = await params;

  let inquiry: Inquiry | null = null;

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("inquiries") as any)
      .select("id, name, company, phone, email, role, message, source, status, created_at, contacted_at, ip_address, user_agent, notes")
      .eq("id", id)
      .maybeSingle();
    inquiry = data as Inquiry | null;
  }

  if (!inquiry) {
    notFound();
  }

  // 타임라인 항목 구성
  const timeline: Array<{ at: string; label: string; dot: string }> = [
    { at: inquiry.created_at, label: "문의 접수", dot: "bg-[#FFB020]" },
  ];
  if (inquiry.contacted_at) {
    timeline.push({ at: inquiry.contacted_at, label: "연락 완료 기록", dot: "bg-[#00AAD2]" });
  }
  timeline.sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime());

  // 회신 이메일 subject
  const mailtoSubject = encodeURIComponent(`[철연 CHEOLYEON] 문의에 대한 회신 · ${inquiry.name}님`);
  const mailtoBody = encodeURIComponent(`${inquiry.name}님,\n\n철연 CHEOLYEON 관리자이다. 접수된 문의를 확인하였다.\n\n— 회신 본문 작성 —\n\n`);

  return (
    <div className="space-y-5">
      {/* 상단: 뒤로 + 상태 */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#3A4A5F] hover:text-[#002C5F]"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          문의 목록
        </Link>
        <StatusBadge status={inquiry.status} />
      </div>

      {/* 헤더: 이름 + 회사 */}
      <div>
        <h2 className="text-2xl font-black text-[#0A1628]">{inquiry.name}</h2>
        <p className="text-sm text-[#6B7B8F] mt-0.5">
          {inquiry.company ?? "소속 미기재"}
          {inquiry.role ? ` · ${inquiry.role}` : ""}
          {inquiry.source ? ` · 유입 ${inquiry.source}` : ""}
        </p>
      </div>

      {/* 액션 바 */}
      <Card className="!p-4">
        <div className="flex flex-wrap items-center gap-2">
          {inquiry.phone && (
            <a
              href={`tel:${inquiry.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#002C5F] text-white text-sm font-bold hover:bg-[#001d40] transition-all"
            >
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              전화 걸기 · {formatPhone(inquiry.phone)}
            </a>
          )}
          {inquiry.email && (
            <a
              href={`mailto:${inquiry.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00AAD2] text-white text-sm font-bold hover:bg-[#007792] transition-all"
            >
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
              이메일 회신
            </a>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 왼쪽: 상세 + 메시지 + 타임라인 */}
        <div className="lg:col-span-2 space-y-5">
          {/* 상세 패널 */}
          <Card>
            <h3 className="text-base font-bold text-[#0A1628] mb-3">문의 상세</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <DetailRow label="이름" value={inquiry.name} />
              <DetailRow label="회사명" value={inquiry.company ?? "—"} />
              <DetailRow
                label="연락처"
                value={
                  inquiry.phone
                    ? <a href={`tel:${inquiry.phone}`} className="text-[#007792] hover:underline">{formatPhone(inquiry.phone)}</a>
                    : "—"
                }
              />
              <DetailRow
                label="이메일"
                value={
                  inquiry.email
                    ? <a href={`mailto:${inquiry.email}`} className="text-[#007792] hover:underline break-all">{inquiry.email}</a>
                    : "—"
                }
              />
              <DetailRow label="역할" value={inquiry.role ?? "—"} />
              <DetailRow label="유입 경로" value={inquiry.source ?? "—"} />
              <DetailRow label="IP 주소" value={inquiry.ip_address ?? "—"} mono />
              <DetailRow label="User Agent" value={inquiry.user_agent ?? "—"} mono small />
            </dl>
          </Card>

          {/* 원본 메시지 */}
          <Card>
            <h3 className="text-base font-bold text-[#0A1628] mb-3">원본 메시지</h3>
            <blockquote className="border-l-4 border-[#002C5F] bg-[#F8FAFD] rounded-r-xl p-4 text-sm text-[#0A1628] whitespace-pre-wrap leading-relaxed">
              {inquiry.message}
            </blockquote>
          </Card>

          {/* 타임라인 */}
          <Card>
            <h3 className="text-base font-bold text-[#0A1628] mb-4">처리 이력</h3>
            <ol className="space-y-3">
              {timeline.map((ev, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`w-2.5 h-2.5 rounded-full ${ev.dot} ring-4 ring-white shadow`} />
                    {idx < timeline.length - 1 && <span className="w-px flex-1 bg-[#E3E8EF] mt-1" style={{ minHeight: 20 }} />}
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <p className="text-sm font-semibold text-[#0A1628]">{ev.label}</p>
                    <p className="text-xs text-[#6B7B8F] tabular-nums">{formatFull(ev.at)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* 오른쪽: 상태 변경 + 노트 */}
        <div className="space-y-5">
          <Card>
            <h3 className="text-base font-bold text-[#0A1628] mb-3">상태 변경</h3>
            <StatusChanger id={inquiry.id} current={inquiry.status} />
            <p className="text-xs text-[#6B7B8F] mt-3 leading-relaxed">
              신규 → 연락 완료 전이 시 응답 시각이 자동 기록된다.
            </p>
          </Card>

          <Card>
            <h3 className="text-base font-bold text-[#0A1628] mb-3">관리자 노트</h3>
            <NotesEditor id={inquiry.id} initial={inquiry.notes ?? ""} />
          </Card>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
  small,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  small?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs text-[#6B7B8F] font-semibold">{label}</dt>
      <dd
        className={`mt-0.5 text-[#0A1628] ${mono ? "font-mono" : ""} ${small ? "text-xs break-all" : "text-sm"}`}
      >
        {value}
      </dd>
    </div>
  );
}
