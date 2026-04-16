/**
 * HEAVY MATCH — Landing Page Copy System
 * 모든 텍스트를 한 파일에서 관리 — i18n 대비 + A/B 테스트 용이
 */

export const hero = {
  badge: "중장비 배차의 새로운 기준",
  title: {
    line1: "매칭되지 않는",
    line2: "배차는 없다.",
  },
  subtitle: "60초 전용콜. 3단계 폴백. 0건의 누락.",
  description: "건설사의 장비 요청부터 기사 배정, 전자서명, 정산까지 — 하나의 플랫폼에서.",
  cta: {
    primary: "데모 체험하기",
    secondary: "도입 문의",
  },
  stats: [
    { value: "60", unit: "초", label: "평균 매칭 시간" },
    { value: "8", unit: "종", label: "지원 장비" },
    { value: "6", unit: "개", label: "역할 시스템" },
    { value: "15", unit: "%", label: "투명한 수수료" },
  ],
};

export const problems = {
  title: "왜 지금 배차 플랫폼인가",
  subtitle: "중장비 업계가 매일 겪는 3가지 문제",
  items: [
    {
      icon: "phone_missed",
      title: "전화 한 통에 달린 배차",
      description: "배차 실장의 전화 연결 실패 한 번이 현장 하루 일정을 무너뜨립니다. 수기 배차의 한계는 곧 매출 손실입니다.",
      stat: "일 평균 3건",
      statLabel: "전화 미연결 건",
    },
    {
      icon: "hourglass_empty",
      title: "대기 시간의 비용",
      description: "장비 대기 1시간은 기사 인건비 + 현장 지연 비용. 빠른 매칭만이 이 비용을 줄일 수 있습니다.",
      stat: "시간당 15만원",
      statLabel: "장비 대기 비용",
    },
    {
      icon: "receipt_long",
      title: "불투명한 정산",
      description: "엑셀과 수기 장부로 관리되는 수수료. 콜센터, 영업사원, 건설사 적립금 분배가 매달 분쟁을 만듭니다.",
      stat: "월 2.3건",
      statLabel: "정산 관련 분쟁",
    },
  ],
};

export const solution = {
  title: "3단계 배차 시스템",
  subtitle: "한 번의 요청으로 시작되는 자동화된 매칭",
  steps: [
    {
      number: "01",
      title: "전용콜",
      duration: "60초",
      description: "요청자가 지정한 사장에게 SMS 발송. 60초 내 수락/거절.",
      detail: "수락 시 즉시 매칭 완료. 거절 시 자동 에스컬레이션.",
    },
    {
      number: "02",
      title: "콜센터 전달",
      duration: "60초",
      description: "미수락 시 해당 사장의 콜센터로 자동 전달.",
      detail: "콜센터가 직접 수락하거나 다른 사장에게 재배정 가능.",
    },
    {
      number: "03",
      title: "공유콜",
      duration: "선착순",
      description: "같은 지역 사장 전체에게 동시 발송. 먼저 수락한 사장이 매칭.",
      detail: "동시 수락 방지: UPDATE WHERE status = 'shared_call' 패턴.",
    },
  ],
};

export const roles = {
  title: "6가지 역할, 하나의 플랫폼",
  subtitle: "건설 현장의 모든 이해관계자를 위한 맞춤 인터페이스",
  items: [
    { id: "requester", title: "장비요청자", subtitle: "건설사 현장소장", features: ["장비 8종 요청", "전자서명", "재주문", "적립금 5%"], device: "모바일 우선" },
    { id: "owner", title: "중장비사장", subtitle: "장비 임대 업체", features: ["전용콜/공유콜 수신", "60초 타이머", "단가 매트릭스", "기사 관리"], device: "모바일 100%" },
    { id: "operator", title: "기사", subtitle: "장비 운전 기사", features: ["배차 확인", "작업 시작/완료", "전자서명", "작업 이력"], device: "모바일 전용" },
    { id: "callcenter", title: "콜센터", subtitle: "상담원", features: ["미수락 콜 관리", "사장 배정", "실시간 현황", "수수료 조회"], device: "데스크탑 멀티컬럼" },
    { id: "salesperson", title: "영업사원", subtitle: "앱 분양 담당", features: ["파트너 확장", "수수료 실적", "기간별 분석", "정산 리포트"], device: "데스크탑 + 모바일" },
    { id: "admin", title: "관리자", subtitle: "플랫폼 운영자", features: ["통합 대시보드", "배차/사용자 관리", "수수료 정산", "마스터 데이터"], device: "데스크탑 Bento Grid" },
  ],
};

export const commission = {
  title: "투명한 15% 수수료 구조",
  subtitle: "모든 파트너가 상생하는 자동 정산",
  example: {
    equipment: "크레인 50T",
    duration: "하루(8h)",
    price: 1000000,
  },
  breakdown: [
    { label: "본사 수익", percent: "5%", amount: 50000, color: "#FF6B1A" },
    { label: "콜센터", percent: "2.5%", amount: 25000, color: "#FFA523" },
    { label: "영업사원", percent: "2.5%", amount: 25000, color: "#8B5CF6" },
    { label: "건설사 적립", percent: "5%", amount: 50000, color: "#10B981" },
  ],
  cancelPenalty: {
    rate: "7.5%",
    description: "매칭 후 취소 시 페널티 수수료 — 무분별한 취소 방지",
  },
};

export const tech = {
  title: "검증된 기술 아키텍처",
  subtitle: "확장 가능하고 안전한 엔터프라이즈 스택",
  stack: [
    { name: "Next.js 16", category: "Frontend", description: "App Router, Server Components, TypeScript" },
    { name: "Supabase", category: "Backend", description: "PostgreSQL, Auth, Realtime Subscriptions" },
    { name: "Tailwind CSS", category: "Styling", description: "Utility-first, 디자인 토큰 시스템" },
    { name: "Vercel", category: "Infrastructure", description: "Edge Network, Serverless, Auto-scaling" },
    { name: "Naver Cloud SMS", category: "Messaging", description: "LMS/SMS, 본인인증 OTP" },
    { name: "Framer Motion", category: "Animation", description: "Spring physics, GPU 가속" },
  ],
  security: [
    { icon: "lock", title: "데이터 암호화", description: "전송 중(TLS 1.3) + 저장 시(AES-256)" },
    { icon: "verified_user", title: "SMS 본인인증", description: "Supabase Auth + OTP 기반 전화번호 인증" },
    { icon: "draw", title: "전자서명 법적 효력", description: "전자서명법 준거, base64 PNG + 타임스탬프 저장" },
    { icon: "shield", title: "Row Level Security", description: "Supabase RLS로 역할별 데이터 접근 제어" },
  ],
};

export const pricing = {
  title: "도입 비용",
  price: "8,000만원",
  priceNote: "(VAT 별도, 예약금 30% 선입금)",
  includes: [
    "소스코드 100% 제공 (GitHub 레포 이전)",
    "Supabase 프로젝트 설정 + DB 마이그레이션",
    "Vercel 배포 + 도메인 연결",
    "Naver Cloud SMS API 연동",
    "1년 무상 AS (버그 수정 + 기능 문의)",
    "운영 매뉴얼 + 기술 문서",
    "관리자 교육 (온라인 2시간)",
  ],
  notIncluded: [
    "커스터마이징 (별도 견적)",
    "PG 결제 연동 (2단계)",
    "네이티브 앱 래핑 (2단계)",
    "GPS 기반 자동배차 (2단계)",
  ],
};

export const faq = {
  title: "자주 묻는 질문",
  items: [
    { q: "소스코드 범위가 어디까지인가요?", a: "GitHub 레포 전체를 이전합니다. 프론트엔드(Next.js), API 라우트, DB 스키마, 시드 데이터, 디자인 토큰, 테스트 — 모든 것이 포함됩니다." },
    { q: "우리 회사 브랜드로 커스터마이징이 가능한가요?", a: "네. 디자인 토큰 시스템 기반이라 tokens.ts의 컬러/로고만 변경하면 전체 UI가 일괄 반영됩니다. 대규모 커스터마이징은 별도 견적으로 진행합니다." },
    { q: "배포 후 유지보수는 어떻게 되나요?", a: "1년 무상 AS 기간 동안 버그 수정과 기능 문의를 지원합니다. 이후 연간 유지보수 계약(별도 견적)이 가능합니다." },
    { q: "Supabase를 다른 DB로 교체할 수 있나요?", a: "네. API 라우트가 Supabase 클라이언트를 추상화하고 있어, PostgreSQL 호환 DB로 마이그레이션 가능합니다. 단, 별도 작업이 필요합니다." },
    { q: "동시 접속자 수 제한이 있나요?", a: "Vercel Pro + Supabase Pro 기준으로 동시 500명까지 무리 없이 처리됩니다. 중장비 B2B 특성상 피크 동시접속은 100~200명 수준으로 예상됩니다." },
    { q: "SMS 비용은 별도인가요?", a: "네. Naver Cloud SMS는 건당 약 20원이며, 월 1,000건 기준 약 2만원 수준입니다. SMS 키는 구매자가 직접 발급합니다." },
    { q: "전자서명의 법적 효력이 있나요?", a: "전자서명법에 따라 당사자 간 합의된 전자서명은 법적 효력이 있습니다. 타임스탬프와 함께 base64 이미지로 저장되어 분쟁 시 증거로 활용 가능합니다." },
    { q: "기존 시스템과 연동이 가능한가요?", a: "REST API 기반이므로 ERP, 회계 시스템 등과 연동 가능합니다. 단, 커스텀 API 개발이 필요하며 별도 견적으로 진행합니다." },
  ],
};

export const footer = {
  company: "BYTEFORCE (바이트포스)",
  copyright: "© 2026 BYTEFORCE. All rights reserved.",
  links: [
    { label: "이용약관", href: "#" },
    { label: "개인정보처리방침", href: "#" },
    { label: "고객센터", href: "#" },
  ],
};

export const seo = {
  title: "HEAVY MATCH — 중장비 배차 실시간 매칭 플랫폼",
  description: "건설사와 중장비 업체를 60초 안에 연결하는 B2B 배차 플랫폼. 3단계 배차 로직, 6개 역할 시스템, 15% 투명 수수료. BYTEFORCE 제작.",
  ogImage: "/og-image.png",
};
