import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isDevPreview } from "@/lib/dev";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { formatPhone } from "@/lib/utils";
import { CsvExportClientButton } from "./_parts";

/**
 * 문의 관리 리스트
 * heritage-v1.md §3 — 판결문 어미 고정. 느낌표·의문형 훅 금지.
 * CTA/버튼 라벨은 인터랙션 문구로 존대 허용.
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

function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${s.bg} ${s.fg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = Date.now();
  const diff = Math.floor((now - d.getTime()) / 1000);
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}일 전`;
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
}

function isSameDay(iso: string, ref: Date): boolean {
  const d = new Date(iso);
  return d.getFullYear() === ref.getFullYear()
    && d.getMonth() === ref.getMonth()
    && d.getDate() === ref.getDate();
}

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminInquiriesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const statusFilter = (sp?.status ?? "all") as "all" | InquiryStatus;

  let inquiries: Inquiry[] = [];

  if (!isDevPreview()) {
    const supabase = await createServerSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("inquiries") as any)
      .select("id, name, company, phone, email, role, message, source, status, created_at, contacted_at")
      .order("created_at", { ascending: false });
    inquiries = (data as Inquiry[] | null) ?? [];
  }

  const filtered = statusFilter === "all"
    ? inquiries
    : inquiries.filter((i) => i.status === statusFilter);

  // 통계
  const today = new Date();
  const todayCount = inquiries.filter((i) => isSameDay(i.created_at, today)).length;
  const unhandledCount = inquiries.filter((i) => i.status === "new").length;

  const respondedInquiries = inquiries.filter((i) => i.contacted_at);
  const avgHours = respondedInquiries.length > 0
    ? respondedInquiries.reduce((sum, i) => {
        const created = new Date(i.created_at).getTime();
        const contacted = new Date(i.contacted_at!).getTime();
        return sum + (contacted - created) / 1000 / 3600;
      }, 0) / respondedInquiries.length
    : null;

  const filters: Array<{ key: "all" | InquiryStatus; label: string; count: number }> = [
    { key: "all", label: "전체", count: inquiries.length },
    { key: "new", label: "신규", count: inquiries.filter((i) => i.status === "new").length },
    { key: "contacted", label: "연락 완료", count: inquiries.filter((i) => i.status === "contacted").length },
    { key: "qualified", label: "검증", count: inquiries.filter((i) => i.status === "qualified").length },
    { key: "closed", label: "종료", count: inquiries.filter((i) => i.status === "closed").length },
  ];

  return (
    <div>
      <PageHeader
        title="문의 관리"
        description="접수된 문의의 상태와 이력을 일괄 추적한다"
        action={
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8F1FB] text-[#002C5F] text-sm font-bold tabular-nums">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>inbox</span>
              {inquiries.length}건
            </span>
            <CsvExportClientButton />
          </div>
        }
      />

      {/* 통계 바 */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <Card className="!p-4">
          <p className="text-xs text-[#6B7B8F] font-semibold">오늘 접수</p>
          <p className="text-2xl font-black tabular-nums text-[#002C5F] mt-1">{todayCount}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs text-[#6B7B8F] font-semibold">미처리</p>
          <p className="text-2xl font-black tabular-nums text-[#B87400] mt-1">{unhandledCount}</p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs text-[#6B7B8F] font-semibold">평균 응답 시간</p>
          <p className="text-2xl font-black tabular-nums text-[#007792] mt-1">
            {avgHours === null ? "—" : `${avgHours.toFixed(1)}h`}
          </p>
        </Card>
      </div>

      {/* 필터 pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        {filters.map((f) => {
          const isActive = statusFilter === f.key;
          const href = f.key === "all" ? "/admin/inquiries" : `/admin/inquiries?status=${f.key}`;
          return (
            <Link
              key={f.key}
              href={href}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#002C5F] text-white shadow-sm"
                  : "bg-white text-[#3A4A5F] border border-[#E3E8EF] hover:border-[#002C5F]/40"
              }`}
            >
              {f.label}
              <span className={`tabular-nums text-xs ${isActive ? "text-white/80" : "text-[#6B7B8F]"}`}>
                {f.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* 테이블 */}
      {filtered.length > 0 ? (
        <div className="bg-white rounded-2xl border border-[#E3E8EF] overflow-hidden shadow-[0_2px_12px_rgba(17,28,41,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8FAFD] border-b border-[#E3E8EF]">
                <tr className="text-[#6B7B8F] text-xs font-bold">
                  <th className="px-4 py-3 text-left">상태</th>
                  <th className="px-4 py-3 text-left">이름</th>
                  <th className="px-4 py-3 text-left">회사명</th>
                  <th className="px-4 py-3 text-left">연락처</th>
                  <th className="px-4 py-3 text-left">이메일</th>
                  <th className="px-4 py-3 text-left">역할</th>
                  <th className="px-4 py-3 text-left">접수일시</th>
                  <th className="px-4 py-3 text-right">조치</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq, idx) => (
                  <tr
                    key={inq.id}
                    className={`border-b border-[#E3E8EF] last:border-0 ${idx % 2 === 1 ? "bg-[#F8FAFD]" : "bg-white"} hover:bg-[#E8F1FB]/40 transition-colors`}
                  >
                    <td className="px-4 py-3">
                      <InquiryStatusBadge status={inq.status} />
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#0A1628]">{inq.name}</td>
                    <td className="px-4 py-3 text-[#3A4A5F]">{inq.company ?? "—"}</td>
                    <td className="px-4 py-3">
                      {inq.phone ? (
                        <a href={`tel:${inq.phone}`} className="text-[#007792] hover:underline font-medium tabular-nums">
                          {formatPhone(inq.phone)}
                        </a>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {inq.email ? (
                        <a href={`mailto:${inq.email}`} className="text-[#007792] hover:underline truncate block max-w-[200px]">
                          {inq.email}
                        </a>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 text-[#3A4A5F]">{inq.role ?? "—"}</td>
                    <td className="px-4 py-3 text-[#6B7B8F] text-xs tabular-nums">
                      {formatRelative(inq.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E8F1FB] text-[#002C5F] font-bold text-xs hover:bg-[#002C5F] hover:text-white transition-all"
                      >
                        상세 보기
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <InquiriesEmptyState hasAny={inquiries.length > 0} />
      )}
    </div>
  );
}

function InquiriesEmptyState({ hasAny }: { hasAny: boolean }) {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-[#E3E8EF]">
      <span
        className="material-symbols-outlined text-5xl text-[#C1C6D6] block mb-3"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        inbox
      </span>
      <h3 className="text-lg font-bold text-[#0A1628]">
        {hasAny ? "해당 상태의 문의가 없다" : "접수된 문의가 없다"}
      </h3>
      <p className="text-sm text-[#6B7B8F] mt-1">
        {hasAny
          ? "필터 조건을 전체로 변경하면 전 건이 조회된다."
          : "문의가 접수되면 여기에 기록된다."}
      </p>
    </div>
  );
}
