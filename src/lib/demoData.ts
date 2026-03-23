/**
 * 데모 시뮬레이터용 현실적 mock 데이터
 * 실제 건설 현장 시나리오 기반
 */

export const DEMO_USERS = {
  requester: { id: "demo-req-1", name: "김건설", phone: "01012345678", role: "requester" as const, company_name: "한양건설(주)", region_sido: "서울특별시", region_sigungu: "강남구" },
  owner: { id: "demo-own-1", name: "박중장비", phone: "01098765432", role: "owner" as const, company_name: "대한크레인", region_sido: "서울특별시", region_sigungu: "강남구" },
  operator: { id: "demo-op-1", name: "이기사", phone: "01055551234", role: "operator" as const, company_name: null, region_sido: null, region_sigungu: null },
  callcenter: { id: "demo-cc-1", name: "정콜센터", phone: "01033334444", role: "callcenter" as const, company_name: "중부콜센터", region_sido: null, region_sigungu: null },
  salesperson: { id: "demo-sp-1", name: "최영업", phone: "01077778888", role: "salesperson" as const, company_name: null, region_sido: null, region_sigungu: null },
  admin: { id: "demo-admin-1", name: "관리자", phone: "01000000000", role: "admin" as const, company_name: "BYTEFORCE", region_sido: null, region_sigungu: null },
};

export const DEMO_DISPATCHES = [
  {
    id: "demo-d1",
    status: "exclusive_call",
    price: 1200000,
    company_name: "한양건설(주)",
    site_address: "서울시 강남구 삼성동 코엑스 신축현장",
    requester_name: "김건설",
    requester_phone: "010-1234-5678",
    site_manager_name: "홍현장",
    site_manager_phone: "010-9876-5432",
    created_at: new Date(Date.now() - 30000).toISOString(), // 30초 전
    exclusive_call_at: new Date(Date.now() - 30000).toISOString(),
    equipment_types: { name: "크레인" },
    equipment_specs: { spec_name: "50T" },
    time_units: { name: "오전(4h)" },
  },
  {
    id: "demo-d2",
    status: "shared_call",
    price: 800000,
    company_name: "현대엔지니어링",
    site_address: "경기도 수원시 영통구 광교 택지개발지구 A-3블록",
    requester_name: "이현장",
    requester_phone: "010-2222-3333",
    site_manager_name: null,
    site_manager_phone: null,
    created_at: new Date(Date.now() - 120000).toISOString(), // 2분 전
    shared_call_at: new Date(Date.now() - 60000).toISOString(),
    equipment_types: { name: "굴삭기" },
    equipment_specs: { spec_name: "6T" },
    time_units: { name: "하루(8h)" },
  },
  {
    id: "demo-d3",
    status: "matched",
    price: 2500000,
    company_name: "포스코건설",
    site_address: "부산시 해운대구 센텀시티 신축 오피스텔 현장",
    requester_name: "박소장",
    requester_phone: "010-4444-5555",
    site_manager_name: "강담당",
    site_manager_phone: "010-6666-7777",
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1시간 전
    matched_at: new Date(Date.now() - 3000000).toISOString(),
    equipment_types: { name: "크레인" },
    equipment_specs: { spec_name: "200T" },
    time_units: { name: "하루(8h)" },
  },
  {
    id: "demo-d4",
    status: "operator_assigned",
    price: 450000,
    company_name: "대림산업",
    site_address: "서울시 마포구 상암동 디지털미디어시티 리모델링",
    requester_name: "윤대리",
    requester_phone: "010-8888-9999",
    site_manager_name: "윤대리",
    site_manager_phone: "010-8888-9999",
    created_at: new Date(Date.now() - 7200000).toISOString(),
    equipment_types: { name: "스카이" },
    equipment_specs: { spec_name: "52m" },
    time_units: { name: "오후(4h)" },
  },
  {
    id: "demo-d5",
    status: "in_progress",
    price: 350000,
    company_name: "GS건설",
    site_address: "인천시 연수구 송도 국제도시 B-7구역",
    requester_name: "조과장",
    requester_phone: "010-1111-2222",
    site_manager_name: "조과장",
    site_manager_phone: "010-1111-2222",
    created_at: new Date(Date.now() - 14400000).toISOString(),
    equipment_types: { name: "지게차" },
    equipment_specs: { spec_name: "5T" },
    time_units: { name: "1시간" },
  },
  {
    id: "demo-d6",
    status: "completed",
    price: 1800000,
    company_name: "삼성물산",
    site_address: "서울시 서초구 반포동 래미안 원베일리 현장",
    requester_name: "한부장",
    requester_phone: "010-3333-4444",
    site_manager_name: "한부장",
    site_manager_phone: "010-3333-4444",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 어제
    completed_at: new Date(Date.now() - 72000000).toISOString(),
    equipment_types: { name: "펌프카" },
    equipment_specs: { spec_name: "42m" },
    time_units: { name: "하루(8h)" },
  },
];

export const DEMO_COMMISSIONS = [
  { id: 1, dispatch_id: "demo-d6", total_price: 1800000, commission_rate: 15, total_commission: 270000, requester_reward: 90000, company_fee: 90000, callcenter_fee: 45000, salesperson_fee: 45000, is_cancelled: false, cancel_fee: 0, created_at: new Date(Date.now() - 72000000).toISOString() },
  { id: 2, dispatch_id: "demo-d7", total_price: 950000, commission_rate: 15, total_commission: 142500, requester_reward: 47500, company_fee: 47500, callcenter_fee: 23750, salesperson_fee: 23750, is_cancelled: false, cancel_fee: 0, created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 3, dispatch_id: "demo-d8", total_price: 2200000, commission_rate: 15, total_commission: 330000, requester_reward: 110000, company_fee: 110000, callcenter_fee: 55000, salesperson_fee: 55000, is_cancelled: false, cancel_fee: 0, created_at: new Date(Date.now() - 259200000).toISOString() },
  { id: 4, dispatch_id: "demo-d9", total_price: 600000, commission_rate: 15, total_commission: 90000, requester_reward: 30000, company_fee: 30000, callcenter_fee: 15000, salesperson_fee: 15000, is_cancelled: false, cancel_fee: 0, created_at: new Date(Date.now() - 345600000).toISOString() },
  { id: 5, dispatch_id: "demo-d10", total_price: 3500000, commission_rate: 15, total_commission: 525000, requester_reward: 175000, company_fee: 175000, callcenter_fee: 87500, salesperson_fee: 87500, is_cancelled: false, cancel_fee: 0, created_at: new Date(Date.now() - 432000000).toISOString() },
];

export const DEMO_OPERATORS = [
  { id: "demo-op-1", name: "이기사", phone: "01055551234", created_at: new Date(Date.now() - 2592000000).toISOString() },
  { id: "demo-op-2", name: "장운전", phone: "01066662345", created_at: new Date(Date.now() - 1728000000).toISOString() },
  { id: "demo-op-3", name: "손기술", phone: "01077773456", created_at: new Date(Date.now() - 864000000).toISOString() },
];

export const DEMO_OWNERS = [
  { id: "demo-own-1", name: "박중장비", phone: "01098765432", company_name: "대한크레인", region_sido: "서울특별시", region_sigungu: "강남구", created_at: new Date(Date.now() - 5184000000).toISOString() },
  { id: "demo-own-2", name: "김임대", phone: "01087654321", company_name: "한국중기", region_sido: "경기도", region_sigungu: "수원시", created_at: new Date(Date.now() - 3456000000).toISOString() },
  { id: "demo-own-3", name: "이렌탈", phone: "01076543210", company_name: "부산크레인", region_sido: "부산광역시", region_sigungu: "해운대구", created_at: new Date(Date.now() - 1728000000).toISOString() },
];

export const DEMO_CALL_HISTORY = [
  { id: 1, site_address: "서울시 강남구 삼성동 코엑스 신축현장", equipment_types: { name: "크레인" }, equipment_specs: { spec_name: "50T" } },
  { id: 2, site_address: "경기도 수원시 영통구 광교 택지개발지구", equipment_types: { name: "굴삭기" }, equipment_specs: { spec_name: "6T" } },
  { id: 3, site_address: "서울시 서초구 반포동 래미안 현장", equipment_types: { name: "펌프카" }, equipment_specs: { spec_name: "42m" } },
];

export const DEMO_ALL_USERS = [
  { id: "demo-req-1", name: "김건설", phone: "01012345678", role: "requester", company_name: "한양건설(주)", region_sido: "서울특별시", region_sigungu: "강남구", created_at: new Date(Date.now() - 5184000000).toISOString() },
  { id: "demo-req-2", name: "이현장", phone: "01022223333", role: "requester", company_name: "현대엔지니어링", region_sido: "경기도", region_sigungu: "수원시", created_at: new Date(Date.now() - 4320000000).toISOString() },
  { id: "demo-own-1", name: "박중장비", phone: "01098765432", role: "owner", company_name: "대한크레인", region_sido: "서울특별시", region_sigungu: "강남구", created_at: new Date(Date.now() - 5184000000).toISOString() },
  { id: "demo-own-2", name: "김임대", phone: "01087654321", role: "owner", company_name: "한국중기", region_sido: "경기도", region_sigungu: "수원시", created_at: new Date(Date.now() - 3456000000).toISOString() },
  { id: "demo-op-1", name: "이기사", phone: "01055551234", role: "operator", company_name: null, region_sido: null, region_sigungu: null, created_at: new Date(Date.now() - 2592000000).toISOString() },
  { id: "demo-op-2", name: "장운전", phone: "01066662345", role: "operator", company_name: null, region_sido: null, region_sigungu: null, created_at: new Date(Date.now() - 1728000000).toISOString() },
  { id: "demo-cc-1", name: "정콜센터", phone: "01033334444", role: "callcenter", company_name: "중부콜센터", region_sido: null, region_sigungu: null, created_at: new Date(Date.now() - 6048000000).toISOString() },
  { id: "demo-sp-1", name: "최영업", phone: "01077778888", role: "salesperson", company_name: null, region_sido: null, region_sigungu: null, created_at: new Date(Date.now() - 4320000000).toISOString() },
  { id: "demo-admin-1", name: "관리자", phone: "01000000000", role: "admin", company_name: "BYTEFORCE", region_sido: null, region_sigungu: null, created_at: new Date(Date.now() - 8640000000).toISOString() },
];
