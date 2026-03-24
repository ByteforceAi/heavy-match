/**
 * CSV 기반 엑셀 다운로드 유틸리티
 * 외부 라이브러리 없이 순수 CSV → BOM 포함 UTF-8 → 엑셀 호환
 */

export function downloadCSV(filename: string, headers: string[], rows: string[][]) {
  const BOM = "\uFEFF"; // Excel에서 한글 깨짐 방지
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
  ].join("\n");

  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportDispatchesToCSV(dispatches: Array<{
  id: string; status: string; price: number; company_name: string;
  site_address: string; created_at: string;
  equipment_types?: { name: string } | null;
  equipment_specs?: { spec_name: string } | null;
}>) {
  const headers = ["ID", "상태", "장비", "규격", "금액", "건설사", "현장주소", "요청일"];
  const rows = dispatches.map(d => [
    d.id.slice(0, 8),
    d.status,
    d.equipment_types?.name ?? "",
    d.equipment_specs?.spec_name ?? "",
    String(d.price),
    d.company_name,
    d.site_address,
    new Date(d.created_at).toLocaleDateString("ko-KR"),
  ]);
  downloadCSV("배차현황", headers, rows);
}

export function exportCommissionsToCSV(commissions: Array<{
  id: number; total_price: number; company_fee: number;
  callcenter_fee: number; salesperson_fee: number;
  requester_reward: number; created_at: string;
}>) {
  const headers = ["ID", "거래금액", "본사수수료", "콜센터", "영업사원", "건설사적립", "일자"];
  const rows = commissions.map(c => [
    String(c.id),
    String(c.total_price),
    String(c.company_fee),
    String(c.callcenter_fee),
    String(c.salesperson_fee),
    String(c.requester_reward),
    new Date(c.created_at).toLocaleDateString("ko-KR"),
  ]);
  downloadCSV("수수료내역", headers, rows);
}

export function exportUsersToCSV(users: Array<{
  id: string; name: string; phone: string; role: string;
  company_name: string | null; created_at: string;
}>) {
  const labels: Record<string, string> = { requester: "장비요청자", owner: "중장비사장", operator: "기사", callcenter: "콜센터", salesperson: "영업사원", admin: "관리자" };
  const headers = ["이름", "역할", "연락처", "회사명", "가입일"];
  const rows = users.map(u => [
    u.name,
    labels[u.role] ?? u.role,
    u.phone,
    u.company_name ?? "",
    new Date(u.created_at).toLocaleDateString("ko-KR"),
  ]);
  downloadCSV("사용자목록", headers, rows);
}
