/** 전화번호 포맷: 01012345678 → 010-1234-5678 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

/** 전화번호에서 숫자만 추출 */
export function parsePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** 사업자번호 포맷: 1234567890 → 123-45-67890 */
export function formatBusinessNumber(bn: string): string {
  const digits = bn.replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  }
  return bn;
}

/** 금액 포맷: 1000000 → 1,000,000 */
export function formatPrice(price: number): string {
  return price.toLocaleString("ko-KR");
}

/** 수수료 계산 (15% 고정, 정수 연산) */
export function calculateCommission(totalPrice: number) {
  const totalCommission = Math.floor(totalPrice * 15 / 100);
  const requesterReward = Math.floor(totalPrice * 5 / 100);
  const companyFee = Math.floor(totalPrice * 5 / 100);
  const callcenterFee = Math.floor(totalPrice * 25 / 1000);
  const salespersonFee = Math.floor(totalPrice * 25 / 1000);

  // 합계 검증
  const sum = requesterReward + companyFee + callcenterFee + salespersonFee;
  if (sum !== totalCommission) {
    // 반올림 오차 보정 — 본사 몫에서 조정
    const adjusted = {
      totalCommission,
      requesterReward,
      companyFee: companyFee + (totalCommission - sum),
      callcenterFee,
      salespersonFee,
    };
    return adjusted;
  }

  return {
    totalCommission,
    requesterReward,
    companyFee,
    callcenterFee,
    salespersonFee,
  };
}

/** 취소 수수료 계산 (7.5%) */
export function calculateCancelFee(totalPrice: number): number {
  return Math.floor(totalPrice * 75 / 1000);
}

/** 역할 한글명 */
export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    requester: "장비요청자",
    owner: "중장비사장",
    operator: "기사",
    callcenter: "콜센터",
    salesperson: "영업사원",
    admin: "관리자",
  };
  return labels[role] ?? role;
}

/** 배차 상태 한글명 */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "대기중",
    exclusive_call: "전용콜 진행",
    callcenter_call: "콜센터 전달",
    shared_call: "공유콜 진행",
    matched: "매칭 완료",
    operator_assigned: "기사 배정",
    in_progress: "작업중",
    completed: "완료",
    cancelled: "취소",
  };
  return labels[status] ?? status;
}

/** 배차 상태 색상 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "bg-gray-100 text-gray-700",
    exclusive_call: "bg-blue-100 text-blue-700",
    callcenter_call: "bg-amber-100 text-amber-700",
    shared_call: "bg-purple-100 text-purple-700",
    matched: "bg-green-100 text-green-700",
    operator_assigned: "bg-teal-100 text-teal-700",
    in_progress: "bg-indigo-100 text-indigo-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colors[status] ?? "bg-gray-100 text-gray-700";
}

/** 고유 토큰 생성 */
export function generateToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
