/**
 * 철연 CHEOLYEON — Landing Page Copy System v2
 *
 * 모든 카피는 docs/brand/heritage-v1.md를 원본(canonical source)으로 참조한다.
 * 수정은 반드시 heritage-v1.md §3(금지) / §4(허용) 규칙을 통과해야 하며,
 * §2 canonical text 블록의 값은 heritage-v1.md 원문과 1:1 대응한다.
 *
 * 본 파일은 PR-01~PR-05의 모든 지적사항을 흡수하여 v2 리브랜드와 함께 정리한다.
 * 감사 기록: docs/brand/AUDIT-2026-04-18.md
 */

// ═══════════════════════════════════════
// HERITAGE — heritage-v1.md §2 직접 매핑 (원본 불변)
// ═══════════════════════════════════════

/**
 * §2.1 전문(全文) — Full Version.
 * 사용처: 랜딩 "철연 이야기" 섹션, 회사 소개서 브랜드 페이지,
 * CPN·투자 IR Origin 슬라이드, 프레스킷.
 */
export const heritageFull = {
  title: "철연의 유래",
  paragraphs: [
    "1998년 2월, 대한건설기계협회 부산지회 기종분과회 위원장 나철연이 부산일보에 실린다. 그가 대표한 의제는 세 가지였다. 장기어음의 장기화, 무허가 중간업자를 통한 하도급, 사업자의 생계 미보장.",
    "같은 해, 그는 사재를 처분하여 업계 동료들의 자금난을 해소하고자 하였다. 회수되지 않았다.",
    "그의 요구는 제도로 응답받지 못한 채 28년이 지났다. 같은 문제가 오늘의 건설 현장에서 동일하게 반복된다.",
    "철연은 그의 이름을 따른다. 업의 구조를 시스템으로 재설계하여, 1998년의 문제를 2026년의 기술 위에서 종결하는 것을 목표로 한다.",
  ],
  attribution: "운영: BYTEFORCE. 창업자 이한결.",
} as const;

/**
 * §2.2 축약본 — Short Version.
 * 사용처: 제안서 요약란, 영업 1-pager, 배너 서브카피, 해외 번역 원본.
 */
export const heritageShort =
  "1998년 2월, 대한건설기계협회 부산지회 기종분과회 위원장 나철연이 부산일보에서 장기어음·하도급·사업자 미수금의 제도 개선을 요구하였다. 같은 해, 그는 사재를 처분하여 업계 동료의 자금난을 해소하고자 하였으나 회수되지 않았다. 28년 후, 그의 이름을 따른 플랫폼 철연이 같은 문제를 기술로 종결한다." as const;

/**
 * §2.3 태그라인 — Tagline.
 * 사용처: 랜딩 히어로 서브 라인, 명함 뒷면, 이메일 서명, SNS 바이오.
 */
export const heritageTagline =
  "철연은 1998년 부산의 요구를 2026년의 시스템으로 이어받는다." as const;

/**
 * §2.4 영문 번역 원본 — Canonical English.
 * 법률·금융 어휘 유지. 감정적 번역 금지.
 */
export const heritageEnglish = {
  title: "The Origin of CHEOLYEON",
  paragraphs: [
    "In February 1998, Busan Ilbo reported on Na Cheol-yeon, chairman of the Busan chapter's sector committee of the Korea Construction Equipment Association. He represented three agendas: the prolongation of long-term promissory notes, subcontracting through unauthorized intermediaries, and the failure to secure operators' livelihoods.",
    "That same year, he liquidated personal assets to relieve the financial distress of his colleagues in the industry. The funds were not recovered.",
    "His demands received no institutional response. Twenty-eight years have passed. The same problems recur on today's construction sites.",
    "CHEOLYEON bears his name. It is designed to restructure the industry's operation into a system, and to conclude the 1998 agenda on the technology of 2026.",
  ],
  attribution: "Operated by BYTEFORCE. Founded by Lee Han-gyeol.",
} as const;

/**
 * §6.1 부산일보 1998년 2월 24일자 기사 원문.
 * 사용 원칙: 원문 15단어 초과 인용 시 출처 명시 필수. 저작권 존중.
 */
export const busanIlbo = {
  date: "1998-02-24",
  publisher: "부산일보",
  headline: "불법 하도급 근절 해야",
  subhead: "건설기계업자 보험료·경유가 인하도 촉구",
  body: "IMF 한파로 건설공사 현장에 투입되는 각종 중장비 등 건설 기계 운행이 중단되는 사태가 속출하자 사업자들이 산업용 경유가를 인하하고 불법 하도급을 근절해 줄 것을 요구하는 등 생존권 보장 대책을 촉구하고 나섰다. 대한건설기계협회 부산지회 기종분과회(위원장 나철연)는 25일 부산진구 전포동 적십자회관 대강당에서 '건설기계 사업자 결의대회'를 개최한다.",
  highlightName: "나철연",
  sourceUrl: "https://www.busan.com/view/busan/view.php?code=19980224000512",
} as const;

// ═══════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════

interface NavMenuItem {
  label: string;
  href: string;
  active?: boolean;
}

export const nav: {
  brand: { ko: string; en: string };
  menu: readonly NavMenuItem[];
  cta: { secondary: string; primary: string };
} = {
  brand: {
    ko: "철연",
    en: "CHEOLYEON",
  },
  menu: [
    { label: "플랫폼", href: "#platform", active: true },
    { label: "도입 사례", href: "/cases" },
    { label: "요금", href: "/pricing" },
    { label: "철연 이야기", href: "/story" },
  ],
  cta: {
    secondary: "로그인",
    primary: "데모 체험",
  },
};

// ═══════════════════════════════════════
// HERO — §2.3 tagline + §4 판결문 어미
// ═══════════════════════════════════════

export const hero = {
  badge: "부산·울산·경남 · 현장 183곳이 사용중",
  title: {
    line1: "현장이",
    emphasis: "다시는 떼이지 않게.",
    line2: "그 일을 시스템이 한다.",
  },
  // heritage-v1.md §2.3 tagline 직접 사용
  tagline: heritageTagline,
  description:
    "중장비 배차·계약·정산을 하나로 연결한 통합 플랫폼. 전용콜부터 공유콜까지 3단계 폴백으로 배차 실패를 없애고, 전자계약과 자동정산으로 현장의 대금을 지킨다.",
  cta: {
    primary: "30일 무료 체험",
    secondary: "데모 요청",
  },
  /** Hero 우측 LIVE 미니 대시보드 — v2 HTML과 정합 */
  livePreview: {
    label: "부산권 실시간 현황",
    kpi: [
      { key: "진행", value: "12", delta: "+3" },
      { key: "완료", value: "47", delta: "목표 117%" },
      { key: "SLA", value: "99%", delta: "+0.5%" },
    ],
    chartLabel: "시간별 배차량",
    chartValue: "₩12.4M",
    liveRows: [
      { equipment: "굴삭기 3.5t", route: "해운대→기장", price: "₩450K", status: "navy" as const },
      { equipment: "덤프 15t", route: "강서→사상", price: "₩320K", status: "ok" as const },
      { equipment: "크레인 25t", route: "양산→울산", price: "₩1.2M", status: "warn" as const },
    ],
  },
  /** Hero 하단 trust items */
  trust: [
    { value: "99.3%", label: "배차 성공률" },
    { value: "2분 12초", label: "평균 매칭" },
    { value: "₩8.3억", label: "이번 달 보호액" },
  ],
} as const;

// ═══════════════════════════════════════
// STATS STRIP — Navy 배경 4분할
// ═══════════════════════════════════════

export const strip = {
  items: [
    { key: "LIVE PARTNERS", value: "183", sub: "활성 파트너사" },
    { key: "PROTECTED", value: "₩8.3억", sub: "이번 달 정산 보호액" },
    { key: "SUCCESS RATE", value: "99.3%", sub: "3-Fallback 배차 성공률" },
    { key: "SINCE", value: "1998", sub: "기록된 의제, 28년 후 시스템으로" },
  ],
} as const;

// ═══════════════════════════════════════
// FEATURES — 3카드
// "현장의 세 가지 문제, 하나의 시스템"
// §4.2 허용 어휘 (자금난·해소·처분·회수·제도·종결) 우선 사용
// ═══════════════════════════════════════

export const features = {
  sectionLabel: "현장의 세 가지 문제, 하나의 시스템",
  sectionSub: "배차 실패 · 불법 하도급 · 대금 미수 — 철연이 구조적으로 해결한다.",
  items: [
    {
      id: "fallback",
      icon: "hub",
      title: "3단계 폴백 배차",
      description:
        "전용콜 → 콜센터 → 공유콜. 어떤 상황에서도 장비가 도착한다. 평균 매칭 2분.",
    },
    {
      id: "contract",
      icon: "description",
      title: "전자계약·증빙",
      description:
        "구두 약속 없음. 모든 거래가 문서로 남고, 하도급 구조가 투명하게 기록된다.",
    },
    {
      id: "settlement",
      icon: "payments",
      title: "자동 정산·독촉",
      description:
        "작업 완료 → 정산 예약 → 미지급 시 자동 알림. 48시간 규칙으로 대금이 돌아온다.",
    },
  ],
} as const;

// ═══════════════════════════════════════
// PROBLEMS — v1 카피 계승(감사 결과 반영)
// §3.2.1 ~입니다 → ~이다/된다/한다 전환
// ═══════════════════════════════════════

export const problems = {
  title: "왜 지금 배차 플랫폼인가",
  subtitle: "중장비 업계가 매일 겪는 3가지 문제",
  items: [
    {
      icon: "phone_missed",
      title: "전화 한 통에 달린 배차",
      description:
        "배차 실장의 전화 연결 실패 한 번이 현장 하루 일정을 무너뜨린다. 수기 배차의 한계는 곧 매출 손실이 된다.",
      stat: "일 평균 3건",
      statLabel: "전화 미연결 건",
    },
    {
      icon: "hourglass_empty",
      title: "대기 시간의 비용",
      description:
        "장비 대기 1시간은 기사 인건비 + 현장 지연 비용으로 환산된다. 빠른 매칭만이 이 비용을 줄인다.",
      stat: "시간당 15만원",
      statLabel: "장비 대기 비용",
    },
    {
      icon: "receipt_long",
      title: "불투명한 정산",
      description:
        "엑셀과 수기 장부로 관리되는 수수료. 콜센터, 영업사원, 건설사 적립금 분배가 매달 분쟁을 만든다.",
      stat: "월 2.3건",
      statLabel: "정산 관련 분쟁",
    },
  ],
} as const;

// ═══════════════════════════════════════
// SOLUTION — 3단계 배차 (§4 판결문 어미)
// ═══════════════════════════════════════

export const solution = {
  title: "3단계 배차 시스템",
  subtitle: "한 번의 요청으로 시작되는 자동화된 매칭",
  steps: [
    {
      number: "01",
      title: "전용콜",
      duration: "60초",
      description: "요청자가 지정한 사장에게 SMS를 발송한다. 60초 내 수락 또는 거절.",
      detail: "수락 시 즉시 매칭 완료. 거절 시 자동 에스컬레이션.",
    },
    {
      number: "02",
      title: "콜센터 전달",
      duration: "60초",
      description: "미수락 시 해당 사장의 콜센터로 자동 전달된다.",
      detail: "콜센터가 직접 수락하거나 다른 사장에게 재배정.",
    },
    {
      number: "03",
      title: "공유콜",
      duration: "선착순",
      description: "같은 지역 사장 전체에게 동시 발송. 먼저 수락한 사장이 매칭된다.",
      detail: "동시 수락 방지: UPDATE WHERE status = 'shared_call' 패턴.",
    },
  ],
} as const;

// ═══════════════════════════════════════
// ROLES — 6역할 (평서형 서브카피)
// ═══════════════════════════════════════

export const roles = {
  title: "6가지 역할, 하나의 플랫폼",
  subtitle: "건설 현장의 모든 이해관계자를 위한 맞춤 인터페이스",
  items: [
    {
      id: "requester",
      title: "장비요청자",
      subtitle: "건설사 현장소장",
      features: ["장비 8종 요청", "전자서명", "재주문", "적립금 5%"],
      device: "모바일 우선",
    },
    {
      id: "owner",
      title: "중장비사장",
      subtitle: "장비 임대 업체",
      features: ["전용콜/공유콜 수신", "60초 타이머", "단가 매트릭스", "기사 관리"],
      device: "모바일 100%",
    },
    {
      id: "operator",
      title: "기사",
      subtitle: "장비 운전 기사",
      features: ["배차 확인", "작업 시작/완료", "전자서명", "작업 이력"],
      device: "모바일 전용",
    },
    {
      id: "callcenter",
      title: "콜센터",
      subtitle: "상담원",
      features: ["미수락 콜 관리", "사장 배정", "실시간 현황", "수수료 조회"],
      device: "데스크탑 멀티컬럼",
    },
    {
      id: "salesperson",
      title: "영업사원",
      subtitle: "앱 분양 담당",
      features: ["파트너 확장", "수수료 실적", "기간별 분석", "정산 리포트"],
      device: "데스크탑 + 모바일",
    },
    {
      id: "admin",
      title: "관리자",
      subtitle: "플랫폼 운영자",
      features: ["통합 대시보드", "배차/사용자 관리", "수수료 정산", "마스터 데이터"],
      device: "데스크탑 Bento Grid",
    },
  ],
} as const;

// ═══════════════════════════════════════
// COMMISSION — 15% 수수료 (§3.2.1 ~됩니다 제거)
// ═══════════════════════════════════════

export const commission = {
  title: "투명한 15% 수수료 구조",
  subtitle: "모든 파트너가 상생하는 자동 정산",
  example: {
    equipment: "크레인 50T",
    duration: "하루(8h)",
    price: 1000000,
  },
  breakdown: [
    { label: "본사 수익", percent: "5%", amount: 50000, color: "#002C5F" },
    { label: "콜센터", percent: "2.5%", amount: 25000, color: "#0046A4" },
    { label: "영업사원", percent: "2.5%", amount: 25000, color: "#00AAD2" },
    { label: "건설사 적립", percent: "5%", amount: 50000, color: "#00A86B" },
  ],
  cancelPenalty: {
    rate: "7.5%",
    description: "매칭 후 취소 시 페널티 수수료 — 무분별한 취소를 방지한다.",
  },
} as const;

// ═══════════════════════════════════════
// TECH
// ═══════════════════════════════════════

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
    { icon: "draw", title: "전자서명 법적 효력", description: "전자서명법 준거, base64 PNG + 타임스탬프" },
    { icon: "shield", title: "Row Level Security", description: "Supabase RLS로 역할별 데이터 접근 제어" },
  ],
} as const;

// ═══════════════════════════════════════
// PRICING — §3.2.1 준수 (~된다/~한다)
// ═══════════════════════════════════════

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
} as const;

// ═══════════════════════════════════════
// FAQ — 인터랙션 문구로 분류, §3.2.1 예외 적용
// 단, §3.1 "우리" 1인칭 제거 (PR-01 반영)
// ═══════════════════════════════════════

export const faq = {
  title: "자주 묻는 질문",
  items: [
    {
      q: "소스코드 범위가 어디까지인가요?",
      a: "GitHub 레포 전체를 이전합니다. 프론트엔드(Next.js), API 라우트, DB 스키마, 시드 데이터, 디자인 토큰, 테스트 — 모든 것이 포함됩니다.",
    },
    {
      q: "도입 기업 브랜드로 커스터마이징이 가능한가요?",
      a: "네. 디자인 토큰 시스템 기반이라 tokens.ts의 컬러·로고만 변경하면 전체 UI가 일괄 반영됩니다. 대규모 커스터마이징은 별도 견적으로 진행합니다.",
    },
    {
      q: "배포 후 유지보수는 어떻게 되나요?",
      a: "1년 무상 AS 기간 동안 버그 수정과 기능 문의를 지원합니다. 이후 연간 유지보수 계약(별도 견적)이 가능합니다.",
    },
    {
      q: "Supabase를 다른 DB로 교체할 수 있나요?",
      a: "네. API 라우트가 Supabase 클라이언트를 추상화하고 있어, PostgreSQL 호환 DB로 마이그레이션 가능합니다. 단, 별도 작업이 필요합니다.",
    },
    {
      q: "동시 접속자 수 제한이 있나요?",
      a: "Vercel Pro + Supabase Pro 기준으로 동시 500명까지 무리 없이 처리됩니다. 중장비 B2B 특성상 피크 동시접속은 100~200명 수준으로 예상됩니다.",
    },
    {
      q: "SMS 비용은 별도인가요?",
      a: "네. Naver Cloud SMS는 건당 약 20원이며, 월 1,000건 기준 약 2만원 수준입니다. SMS 키는 구매자가 직접 발급합니다.",
    },
    {
      q: "전자서명의 법적 효력이 있나요?",
      a: "전자서명법에 따라 당사자 간 합의된 전자서명은 법적 효력이 있습니다. 타임스탬프와 함께 base64 이미지로 저장되어 분쟁 시 증거로 활용 가능합니다.",
    },
    {
      q: "기존 시스템과 연동이 가능한가요?",
      a: "REST API 기반이므로 ERP, 회계 시스템 등과 연동 가능합니다. 단, 커스텀 API 개발이 필요하며 별도 견적으로 진행합니다.",
    },
  ],
} as const;

// ═══════════════════════════════════════
// FOOTER — 철연 브랜드 표기
// ═══════════════════════════════════════

/**
 * Footer 정보.
 *
 * 통신판매업 고시 · 개인정보처리방침 법정 표기 필드를 포함한다.
 * `[TODO]` 마커가 있는 필드는 이한결 대표가 실제 값으로 교체해야 한다.
 */
export const footer = {
  brand: {
    ko: "철연",
    en: "CHEOLYEON",
  },
  company: "BYTEFORCE (바이트포스)",
  description: "철연 CHEOLYEON은 ㈜바이트포스의 중장비 통합 플랫폼이다.",
  /** 통신판매업 고시 · 전자상거래법 제10조 의무 표기 */
  business: {
    representative: "이한결",
    registrationNumber: "[TODO · 사업자등록번호 입력 필요]", // 예: 123-45-67890
    eCommerceNumber: "[TODO · 통신판매업신고번호 입력 필요]", // 예: 2026-부산해운대-0123
    address: "부산 해운대구 오션타워 608호",
    phone: "[TODO · 대표 전화 입력 필요]", // 예: 051-000-0000
    email: "ceo@byteforce.ai.kr",
    hostingProvider: "Vercel Inc.",
  },
  /** 정보통신망법 제27조의2 · 개인정보보호책임자 */
  dpo: {
    name: "이한결",
    title: "대표",
    email: "ceo@byteforce.ai.kr",
    phone: "[TODO · DPO 전화 입력 필요]",
  },
  links: [
    { label: "이용약관", href: "/terms" },
    { label: "개인정보처리방침", href: "/privacy" },
    { label: "고객센터", href: "/help" },
    { label: "도입 사례", href: "/cases" },
    { label: "철연 이야기", href: "/story" },
  ],
  copyright: "© 2026 BYTEFORCE. All rights reserved.",
  /** @deprecated v1 호환용 — 새 코드는 `business.address` 사용 */
  address: "부산 해운대구 오션타워 608호",
  /** @deprecated v1 호환용 — 새 코드는 `business.email` 사용 */
  email: "ceo@byteforce.ai.kr",
} as const;

// ═══════════════════════════════════════
// SEO — heritage-v1.md §2.3 tagline 반영
// ═══════════════════════════════════════

export const seo = {
  title: "철연 CHEOLYEON — 중장비 배차·계약·정산 통합 플랫폼",
  description:
    "1998년 부산의 요구를 2026년의 시스템으로 이어받는다. 3단계 폴백 배차 · 전자계약 · 자동정산. 운영: BYTEFORCE.",
  ogImage: "/og-image.png",
} as const;

// ═══════════════════════════════════════
// FINAL CTA (Contact Section)
// ═══════════════════════════════════════

export const finalCta = {
  label: "Get Started",
  title: "도입 상담 신청",
  // §3.2.1 "~드립니다" → 평서형 전환
  description: "24시간 이내에 BYTEFORCE 사업개발팀에서 연락을 회신한다.",
} as const;
