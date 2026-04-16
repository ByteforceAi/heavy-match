/**
 * 데모 시뮬레이터용 현실적 mock 데이터
 * 30일 운영 시뮬레이션 — 40+ 배차, 25+ 수수료, 20+ 사용자
 */

const DAY = 86400000;
const HOUR = 3600000;
const now = Date.now();

// ═════════════════════════════════════════
// USERS (20명)
// ═════════════════════════════════════════
export const DEMO_USERS = {
  requester: { id: "demo-req-1", name: "김건설", phone: "01012345678", role: "requester" as const, company_name: "한양건설(주)", region_sido: "서울특별시", region_sigungu: "강남구" },
  owner: { id: "demo-own-1", name: "박중장비", phone: "01098765432", role: "owner" as const, company_name: "대한크레인", region_sido: "서울특별시", region_sigungu: "강남구" },
  operator: { id: "demo-op-1", name: "이기사", phone: "01055551234", role: "operator" as const, company_name: null, region_sido: null, region_sigungu: null },
  callcenter: { id: "demo-cc-1", name: "정콜센터", phone: "01033334444", role: "callcenter" as const, company_name: "중부콜센터", region_sido: null, region_sigungu: null },
  salesperson: { id: "demo-sp-1", name: "최영업", phone: "01077778888", role: "salesperson" as const, company_name: null, region_sido: null, region_sigungu: null },
  admin: { id: "demo-admin-1", name: "관리자", phone: "01000000000", role: "admin" as const, company_name: "BYTEFORCE", region_sido: null, region_sigungu: null },
};

// 건설사 이름 풀
const COMPANIES = ["한양건설(주)", "현대엔지니어링", "포스코건설", "대림산업", "GS건설", "삼성물산", "SK에코플랜트", "롯데건설", "HDC현대산업개발", "태영건설"];
const SITES = [
  "서울시 강남구 삼성동 코엑스 신축현장", "경기도 수원시 영통구 광교 택지개발지구 A-3블록",
  "부산시 해운대구 센텀시티 오피스텔 현장", "서울시 마포구 상암동 DMC 리모델링",
  "인천시 연수구 송도 국제도시 B-7구역", "서울시 서초구 반포동 래미안 현장",
  "경기도 화성시 동탄 신도시 C-12블록", "대전시 유성구 대덕연구단지 증축공사",
  "서울시 강동구 고덕동 강일지구 아파트", "경기도 성남시 판교 테크노밸리 2단지",
  "서울시 용산구 한남동 재개발 현장", "경기도 김포시 양촌읍 물류센터 신축",
  "충남 천안시 서북구 불당동 복합문화시설", "경기도 고양시 일산 킨텍스 증축공사",
];
const NAMES = ["김소장","이과장","박부장","정대리","홍차장","오팀장","강실장","윤주임","조과장","한부장","서대리","임차장"];
const EQ_POOL = [
  { type: "크레인", specs: ["25T","50T","70T","100T","200T"] },
  { type: "굴삭기", specs: ["0.6T","1T","3T","6T","8T","20T"] },
  { type: "스카이", specs: ["45m","52m","58m","65m"] },
  { type: "펌프카", specs: ["32m","37m","42m","47m"] },
  { type: "카고크레인", specs: ["5T","8T","11T","15T"] },
  { type: "지게차", specs: ["2.5T","3T","5T","7T"] },
  { type: "덤프", specs: ["15T","25T"] },
  { type: "거미크레인", specs: ["3T","5T","8T"] },
];
const TIME_NAMES = ["1시간","오전(4h)","오후(4h)","하루(8h)"];
const PRICES = [180000, 250000, 350000, 450000, 600000, 800000, 950000, 1200000, 1500000, 1800000, 2200000, 2500000, 3500000];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function genPhone() { return `010${Math.floor(10000000 + Math.random() * 89999999)}`; }

// ═════════════════════════════════════════
// DISPATCHES (42건 — 30일간 분산)
// ═════════════════════════════════════════
function generateDispatches() {
  const statuses = [
    // 오늘 — 진행중 건들
    { status: "exclusive_call", age: 30, hasExclAt: true },
    { status: "exclusive_call", age: 45, hasExclAt: true },
    { status: "callcenter_call", age: 90, hasCcAt: true },
    { status: "callcenter_call", age: 120, hasCcAt: true },
    { status: "shared_call", age: 180, hasShAt: true },
    { status: "shared_call", age: 300, hasShAt: true },
    { status: "matched", age: HOUR / 1000 },
    { status: "matched", age: HOUR * 2 / 1000 },
    { status: "operator_assigned", age: HOUR * 3 / 1000 },
    { status: "in_progress", age: HOUR * 5 / 1000 },
    // 최근 1주 — 완료 건들
    ...Array.from({ length: 8 }, (_, i) => ({ status: "completed", age: (i + 1) * DAY / 1000 })),
    // 2~3주 전
    ...Array.from({ length: 10 }, (_, i) => ({ status: "completed", age: (8 + i) * DAY / 1000 })),
    // 3~4주 전
    ...Array.from({ length: 8 }, (_, i) => ({ status: "completed", age: (18 + i) * DAY / 1000 })),
    // 취소 건
    { status: "cancelled", age: 3 * DAY / 1000 },
    { status: "cancelled", age: 12 * DAY / 1000 },
    { status: "cancelled", age: 22 * DAY / 1000 },
  ];

  return statuses.map((s, i) => {
    const eq = pick(EQ_POOL);
    const spec = pick(eq.specs);
    const created = new Date(now - s.age * 1000).toISOString();
    return {
      id: `demo-d${i + 1}`,
      status: s.status,
      price: pick(PRICES),
      company_name: pick(COMPANIES),
      site_address: pick(SITES),
      requester_name: pick(NAMES),
      requester_phone: genPhone(),
      site_manager_name: Math.random() > 0.3 ? pick(NAMES) : null,
      site_manager_phone: Math.random() > 0.3 ? genPhone() : null,
      created_at: created,
      exclusive_call_at: (s as { hasExclAt?: boolean }).hasExclAt ? created : null,
      callcenter_call_at: (s as { hasCcAt?: boolean }).hasCcAt ? created : null,
      shared_call_at: (s as { hasShAt?: boolean }).hasShAt ? created : null,
      matched_at: ["matched","operator_assigned","in_progress","completed"].includes(s.status) ? new Date(now - s.age * 1000 + 60000).toISOString() : null,
      completed_at: s.status === "completed" ? new Date(now - s.age * 1000 + HOUR * 8).toISOString() : null,
      equipment_types: { name: eq.type },
      equipment_specs: { spec_name: spec },
      time_units: { name: pick(TIME_NAMES) },
    };
  });
}

export const DEMO_DISPATCHES = generateDispatches();

// ═════════════════════════════════════════
// COMMISSIONS (완료+취소 건 기반 — 자동 생성)
// ═════════════════════════════════════════
export const DEMO_COMMISSIONS = DEMO_DISPATCHES
  .filter(d => d.status === "completed" || d.status === "cancelled")
  .map((d, i) => {
    const isCancelled = d.status === "cancelled";
    const totalCommission = isCancelled ? Math.floor(d.price * 0.075) : Math.floor(d.price * 0.15);
    return {
      id: i + 1,
      dispatch_id: d.id,
      total_price: d.price,
      commission_rate: isCancelled ? 7.5 : 15,
      total_commission: totalCommission,
      requester_reward: isCancelled ? 0 : Math.floor(d.price * 0.05),
      company_fee: isCancelled ? totalCommission : Math.floor(d.price * 0.05),
      callcenter_fee: isCancelled ? 0 : Math.floor(d.price * 0.025),
      salesperson_fee: isCancelled ? 0 : Math.floor(d.price * 0.025),
      is_cancelled: isCancelled,
      cancel_fee: isCancelled ? totalCommission : 0,
      created_at: d.completed_at || d.created_at,
    };
  });

// ═════════════════════════════════════════
// OPERATORS (5명)
// ═════════════════════════════════════════
export const DEMO_OPERATORS = [
  { id: "demo-op-1", name: "이기사", phone: "010-5555-1234", created_at: new Date(now - 60 * DAY).toISOString() },
  { id: "demo-op-2", name: "장운전", phone: "010-6666-2345", created_at: new Date(now - 45 * DAY).toISOString() },
  { id: "demo-op-3", name: "손기술", phone: "010-7777-3456", created_at: new Date(now - 30 * DAY).toISOString() },
  { id: "demo-op-4", name: "최현장", phone: "010-8888-4567", created_at: new Date(now - 15 * DAY).toISOString() },
  { id: "demo-op-5", name: "정숙련", phone: "010-9999-5678", created_at: new Date(now - 7 * DAY).toISOString() },
];

// ═════════════════════════════════════════
// OWNERS (5개 업체)
// ═════════════════════════════════════════
export const DEMO_OWNERS = [
  { id: "demo-own-1", name: "박중장비", phone: "010-9876-5432", company_name: "대한크레인", region_sido: "서울특별시", region_sigungu: "강남구", created_at: new Date(now - 90 * DAY).toISOString() },
  { id: "demo-own-2", name: "김임대", phone: "010-8765-4321", company_name: "한국중기", region_sido: "경기도", region_sigungu: "수원시", created_at: new Date(now - 75 * DAY).toISOString() },
  { id: "demo-own-3", name: "이렌탈", phone: "010-7654-3210", company_name: "부산크레인", region_sido: "부산광역시", region_sigungu: "해운대구", created_at: new Date(now - 60 * DAY).toISOString() },
  { id: "demo-own-4", name: "최장비", phone: "010-6543-2109", company_name: "경인중장비", region_sido: "인천광역시", region_sigungu: "남동구", created_at: new Date(now - 45 * DAY).toISOString() },
  { id: "demo-own-5", name: "강중장", phone: "010-5432-1098", company_name: "충청크레인", region_sido: "대전광역시", region_sigungu: "유성구", created_at: new Date(now - 30 * DAY).toISOString() },
];

// ═════════════════════════════════════════
// CALL HISTORY (재주문 이력 — 7건)
// ═════════════════════════════════════════
export const DEMO_CALL_HISTORY = [
  { id: 1, site_address: "서울시 강남구 삼성동 코엑스 신축현장", equipment_types: { name: "크레인" }, equipment_specs: { spec_name: "50T" } },
  { id: 2, site_address: "경기도 수원시 영통구 광교 택지개발지구", equipment_types: { name: "굴삭기" }, equipment_specs: { spec_name: "6T" } },
  { id: 3, site_address: "서울시 서초구 반포동 래미안 현장", equipment_types: { name: "펌프카" }, equipment_specs: { spec_name: "42m" } },
  { id: 4, site_address: "경기도 화성시 동탄 신도시 C-12블록", equipment_types: { name: "스카이" }, equipment_specs: { spec_name: "52m" } },
  { id: 5, site_address: "서울시 용산구 한남동 재개발 현장", equipment_types: { name: "카고크레인" }, equipment_specs: { spec_name: "11T" } },
  { id: 6, site_address: "인천시 연수구 송도 국제도시 B-7구역", equipment_types: { name: "지게차" }, equipment_specs: { spec_name: "5T" } },
  { id: 7, site_address: "경기도 고양시 일산 킨텍스 증축공사", equipment_types: { name: "덤프" }, equipment_specs: { spec_name: "25T" } },
];

// ═════════════════════════════════════════
// ALL USERS (20명)
// ═════════════════════════════════════════
export const DEMO_ALL_USERS = [
  { id: "demo-req-1", name: "김건설", phone: "01012345678", role: "requester", company_name: "한양건설(주)", region_sido: "서울특별시", region_sigungu: "강남구", created_at: new Date(now - 80 * DAY).toISOString() },
  { id: "demo-req-2", name: "이현장", phone: "01022223333", role: "requester", company_name: "현대엔지니어링", region_sido: "경기도", region_sigungu: "수원시", created_at: new Date(now - 70 * DAY).toISOString() },
  { id: "demo-req-3", name: "박소장", phone: "01033334444", role: "requester", company_name: "포스코건설", region_sido: "부산광역시", region_sigungu: "해운대구", created_at: new Date(now - 55 * DAY).toISOString() },
  { id: "demo-req-4", name: "정대리", phone: "01044445555", role: "requester", company_name: "대림산업", region_sido: "서울특별시", region_sigungu: "마포구", created_at: new Date(now - 40 * DAY).toISOString() },
  ...DEMO_OWNERS.map(o => ({ ...o, role: "owner" as const, region_sido: o.region_sido, region_sigungu: o.region_sigungu })),
  ...DEMO_OPERATORS.map(o => ({ ...o, role: "operator" as const, company_name: null, region_sido: null, region_sigungu: null })),
  { id: "demo-cc-1", name: "정콜센터", phone: "01033334444", role: "callcenter", company_name: "중부콜센터", region_sido: null, region_sigungu: null, created_at: new Date(now - 100 * DAY).toISOString() },
  { id: "demo-cc-2", name: "한상담", phone: "01044445555", role: "callcenter", company_name: "남부콜센터", region_sido: null, region_sigungu: null, created_at: new Date(now - 85 * DAY).toISOString() },
  { id: "demo-sp-1", name: "최영업", phone: "01077778888", role: "salesperson", company_name: null, region_sido: null, region_sigungu: null, created_at: new Date(now - 75 * DAY).toISOString() },
  { id: "demo-sp-2", name: "오분양", phone: "01088889999", role: "salesperson", company_name: null, region_sido: null, region_sigungu: null, created_at: new Date(now - 50 * DAY).toISOString() },
  { id: "demo-admin-1", name: "관리자", phone: "01000000000", role: "admin", company_name: "BYTEFORCE", region_sido: null, region_sigungu: null, created_at: new Date(now - 120 * DAY).toISOString() },
];
