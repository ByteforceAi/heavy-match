/**
 * 철연 CHEOLYEON — Blog Posts 데이터
 *
 * heritage-v1.md §3 금지 / §4 허용 구조를 준수한다.
 * 본문 종결어: 판결문 어미(~한다 / ~된다 / ~였다 / ~않는다).
 * 미래 서술: "~을 목표로 한다", "~할 것으로 예측된다".
 * 직접인용(quote 블록)은 화자 어조 유지를 예외로 허용한다.
 * 설문형 제목(~인가, ~하는가)은 §3.2.5 예외로 헤드라인 한정 허용된다.
 *
 * 포스트 추가 시:
 *   1. slug는 "category/kebab-case" 형식으로 고정한다.
 *   2. category는 4종 리터럴 중 하나로 제한한다.
 *   3. body 블록은 최소 하나의 H2를 포함한다.
 *   4. publishedAt은 ISO(YYYY-MM-DD) 표기다.
 *   5. relatedSlugs는 순수 slug 조각(category/kebab)으로 기재한다.
 */

export type BlogCategory = "industry" | "guide" | "engineering" | "company";

export type BlogBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; variant: "info" | "warn" | "success"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "code"; language?: string; content: string }
  | { type: "divider" }
  | { type: "stat"; label: string; value: string; sub?: string };

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  heroImage?: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readingTime: number;
  body: BlogBlock[];
  relatedSlugs?: string[];
  seoKeywords?: string[];
}

export interface BlogCategoryMeta {
  id: BlogCategory;
  label: string;
  sub: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
}

// ═══════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════
export const blogCategories: BlogCategoryMeta[] = [
  {
    id: "industry",
    label: "업계 동향",
    sub: "중장비·건설 시장 분석과 거시 지표 기록",
    icon: "insights",
    badgeBg: "#E8F1FB",
    badgeText: "#002C5F",
  },
  {
    id: "guide",
    label: "도입 가이드",
    sub: "현장 실무자를 위한 단계별 사용 플레이북",
    icon: "menu_book",
    badgeBg: "#DFF4FA",
    badgeText: "#006D8A",
  },
  {
    id: "engineering",
    label: "엔지니어링",
    sub: "아키텍처·동시성·성능에 대한 기술 바닥 공개",
    icon: "terminal",
    badgeBg: "#EEF1F5",
    badgeText: "#0A1628",
  },
  {
    id: "company",
    label: "회사 소식",
    sub: "BYTEFORCE의 업데이트·파트너십·채용",
    icon: "domain",
    badgeBg: "#FFF7E0",
    badgeText: "#6B4B00",
  },
];

// ═══════════════════════════════════════
// POSTS
// ═══════════════════════════════════════
export const blogPosts: BlogPost[] = [
  // ──────────────────────────────────────
  // 1. industry/2026-korean-construction-equipment-outlook
  // ──────────────────────────────────────
  {
    slug: "industry/2026-korean-construction-equipment-outlook",
    category: "industry",
    categoryLabel: "업계 동향",
    title: "2026 한국 중장비 임대 시장 전망",
    summary: "건설 불황 속에서도 성장하는 배차 자동화 수요",
    author: {
      name: "BYTEFORCE 리서치팀",
      role: "리서치 리드",
    },
    publishedAt: "2026-04-10",
    readingTime: 6,
    seoKeywords: ["중장비 임대", "건설 경기", "2026 전망"],
    body: [
      { type: "heading", level: 2, text: "시장 개관" },
      {
        type: "paragraph",
        text: "2026년 한국 중장비 임대 시장은 건설 투자 위축 국면에서 이중 구조로 재편된다. 신규 주택 착공은 전년 대비 축소되었으나, 도시정비·SOC 유지보수·데이터센터 부지 조성 수요가 장비 가동률을 지탱한다. 거시 경기 둔화가 시장 전체의 규모를 제약하는 반면, 가동 회전율과 정산 자동화에 대한 수요는 반대 방향으로 확장된다.",
      },
      {
        type: "paragraph",
        text: "임대료 단가는 2024년을 저점으로 회복세로 전환되었다. 다만 회복의 성격은 과거와 다르다. 수요 초과에 의한 단가 상승이 아니라, 유류비·정비비·기사 인건비 상승이 원가 측면에서 단가를 밀어 올린 구조적 상승에 가깝다. 이 격차는 전통적 수기 배차 방식에서는 흡수되지 않고 사장의 마진을 잠식한다.",
      },
      {
        type: "paragraph",
        text: "디지털 배차 플랫폼 도입은 2025년을 기점으로 임계점을 넘어선다. 본 리서치는 부산·울산·경남 권역 표본 183개 파트너사를 대상으로 수집한 2025.10~2026.03의 운영 지표와 통계청·대한건설기계협회 공개 자료를 교차 분석한 결과를 기록한다.",
      },
      {
        type: "stat",
        label: "2026 한국 중장비 임대 시장 규모",
        value: "₩4.2조",
        sub: "전년 대비 +3.1% / 대한건설기계협회 추정",
      },
      {
        type: "stat",
        label: "2025 대비 성장률 (배차 자동화 세그먼트)",
        value: "+18.4%",
        sub: "디지털 배차 건수 기준 / BYTEFORCE 리서치",
      },
      {
        type: "stat",
        label: "디지털화 비중",
        value: "27.6%",
        sub: "전체 임대 거래 중 플랫폼 경유 비율 추정",
      },
      { type: "heading", level: 2, text: "세 가지 구조 변화" },
      {
        type: "paragraph",
        text: "시장 규모가 아니라 시장의 내부 구조가 변한다. 2026년을 관통하는 변화는 세 가지로 정리된다.",
      },
      {
        type: "list",
        items: [
          "세대 교체 — 1세대 중장비사장의 은퇴와 2세대 승계가 동시에 진행된다.",
          "임대료 투명화 요구 — 건설사 측에서 단가 매트릭스를 문서로 요구하는 빈도가 늘어난다.",
          "미수금 보호 제도화 — 사업자 간 거래에서도 자동 정산·독촉이 표준으로 이동한다.",
        ],
      },
      { type: "heading", level: 3, text: "1. 세대 교체" },
      {
        type: "paragraph",
        text: "협회 자료에 따르면 2026년 현재 중장비사장 평균 연령은 58.3세로 집계된다. 향후 5년 내 30% 이상이 승계·매각·폐업 선택지에 직면한다. 2세대 승계자는 모바일 기반 운영을 전제로 사업을 검토하는 경향이 관찰된다. 수기 장부로 운영되는 사업은 승계 대상에서 배제된다.",
      },
      { type: "heading", level: 3, text: "2. 임대료 투명화 요구" },
      {
        type: "paragraph",
        text: "대형 건설사는 2025년 하반기부터 하도급 입찰 요건에 단가 매트릭스 제출을 삽입한다. 장비·규격·지역별 단가를 문서로 고정하지 못하는 사업자는 입찰 명단에서 제외된다. 구두 단가의 시대가 공식적으로 종결된다.",
      },
      { type: "heading", level: 3, text: "3. 미수금 보호 제도화" },
      {
        type: "paragraph",
        text: "48시간 내 자동 정산 개시와 미지급 알림 자동 발송이 현장 표준으로 확산된다. 이는 1998년 대한건설기계협회 부산지회가 공표한 3대 의제 중 '사업자의 생계 미보장'이 28년 만에 시스템 차원에서 응답받기 시작하는 신호로 해석된다.",
      },
      {
        type: "callout",
        variant: "info",
        text: "48시간 규칙: 작업 완료 서명 수신 후 48시간 이내 1차 정산 개시. 미지급 시 48시간 단위로 자동 독촉이 집행된다. 2026년 상반기 기준 부산·울산권 도입 파트너사의 82.4%가 이 규칙을 실장치(default)로 운영한다.",
      },
      { type: "heading", level: 2, text: "지역별 온도차" },
      {
        type: "list",
        items: [
          "부산·울산·경남 — 조선·석유화학 유지보수 수요가 장비 가동률을 지탱한다. 플랫폼 침투율이 가장 높다.",
          "수도권 — 데이터센터 부지 조성과 재건축이 수요를 창출한다. 단, 전통 중개 구조의 저항이 남아 침투 속도는 완만하다.",
          "충청권 — 반도체 클러스터 인프라 공사가 2026 하반기부터 본격화된다. 크레인·고소작업차 수요가 집중된다.",
          "호남·강원 — SOC 유지보수 중심 수요. 단가 회복은 타 권역보다 늦게 반영된다.",
        ],
      },
      { type: "heading", level: 2, text: "전망 요약" },
      {
        type: "paragraph",
        text: "2026년 한국 중장비 임대 시장은 거시 규모의 둔화와 내부 구조의 고도화가 동시에 진행되는 시기로 기록된다. 전통 수기 배차와 디지털 자동화의 격차는 2027년까지 더 벌어질 것으로 예측된다. BYTEFORCE 리서치는 2026년 말 기준 디지털화 비중이 33~35% 구간에 진입할 것을 목표로 한다. 해당 구간은 산업 내 구조 전환의 관행 임계점으로 간주된다.",
      },
      {
        type: "quote",
        text: "장부와 전화로 운영하던 시절은 끝났다고 봐야 한다. 승계받은 아들 세대는 그 방식으로 굴릴 생각 자체가 없다. 시스템 없이 버티는 건 3년이 한계다.",
        attribution: "부산권 중장비 임대 사업자 · 2세대 승계자 (익명)",
      },
    ],
    relatedSlugs: [
      "guide/60-second-dispatch-playbook",
      "engineering/why-postgres-fallback-architecture",
    ],
  },

  // ──────────────────────────────────────
  // 2. guide/60-second-dispatch-playbook
  // ──────────────────────────────────────
  {
    slug: "guide/60-second-dispatch-playbook",
    category: "guide",
    categoryLabel: "도입 가이드",
    title: "60초 배차 플레이북: 전용콜에서 기사 배정까지",
    summary: "도입 첫 주에 바로 적용 가능한 실무 가이드",
    author: {
      name: "BYTEFORCE 운영팀",
      role: "필드 리드",
    },
    publishedAt: "2026-04-12",
    readingTime: 8,
    seoKeywords: ["배차 플레이북", "전용콜", "60초 타이머"],
    body: [
      {
        type: "paragraph",
        text: "본 문서는 철연 도입 첫 주에 즉시 적용되는 현장 플레이북이다. 현장 실장·콜센터·중장비사장이 공통으로 숙지한다. 불필요한 이론은 배제하고, 1회의 배차 요청이 기사 배정까지 도달하는 60초 구간의 실행 순서만 기록한다.",
      },
      { type: "heading", level: 2, text: "배차 1회의 6단계" },
      { type: "heading", level: 3, text: "1단계 · 요청 접수 (0~5초)" },
      {
        type: "paragraph",
        text: "현장 실장이 모바일 앱에서 '장비 요청' 버튼을 누른다. 장비 종류·규격·투입 시각·현장 주소의 4개 필드가 필수로 채워진다. 재주문인 경우 이전 값이 자동 복원되어 입력 시간이 1초 이내로 단축된다.",
      },
      {
        type: "callout",
        variant: "info",
        text: "필수 필드 외 '현장 소장 연락처'와 '접근 제한 사항'은 선택 입력이지만, 미입력 시 기사 도착 후 재확인 전화 1건이 추가로 발생한다. 첫 주에는 모두 입력하도록 표준화한다.",
      },
      { type: "heading", level: 3, text: "2단계 · 단골 전용콜 발송 (5~10초)" },
      {
        type: "paragraph",
        text: "시스템이 해당 요청자의 단골 지정 사장 1인에게 SMS와 푸시 알림을 1:1로 발송한다. 이 시점부터 60초 타이머가 시작된다. 요청자 화면에는 '전용콜 발송 · 00:59 대기 중'으로 표시된다.",
      },
      { type: "heading", level: 3, text: "3단계 · 사장 수락 판단 (10~60초)" },
      {
        type: "paragraph",
        text: "사장은 60초 내에 수락·거절을 결정한다. 타이머 UI 하단에 단가 매트릭스 대조 결과와 기사 가용성이 자동으로 표시된다. 이 두 정보가 적색으로 표시되면 즉시 거절, 녹색이면 즉시 수락이 원칙이다.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "타이머 35초 이하에서 '고민 중' 상태가 5초 이상 지속되면 앱이 진동 알림으로 재촉한다. 50초 이하에서는 자동 거절 경고가 풀스크린으로 표시된다.",
      },
      { type: "heading", level: 3, text: "4단계 · 수락 후 기사 지정 (5초)" },
      {
        type: "paragraph",
        text: "사장이 수락 버튼을 누르면 기사 선택 드로어가 자동 호출된다. 가용 기사와 장비 조합이 이미 필터링된 상태로 노출된다. 최상위 추천 기사를 탭하면 배정이 확정된다. 이 단계는 평균 3.8초 내에 종결된다.",
      },
      { type: "heading", level: 3, text: "5단계 · 3자 동시 알림 (1초)" },
      {
        type: "paragraph",
        text: "요청자·사장·기사 3자에게 SMS·푸시가 동시 발송된다. 요청자 화면은 '매칭 완료 · 기사 도착 예정 14:32'로 전환된다. 기사 앱은 경로 안내가 자동 활성화된다.",
      },
      { type: "heading", level: 3, text: "6단계 · 도착·작업 시작 서명" },
      {
        type: "paragraph",
        text: "기사 도착 시각에 현장 실장의 전자서명이 수신되면 '작업 시작' 상태로 이관된다. 작업 완료 시점의 종료 서명 수신으로 정산 트리거가 가동된다. 본 단계까지가 플레이북의 단일 배차 사이클이다.",
      },
      { type: "heading", level: 2, text: "60초 타이머가 중요한 이유" },
      {
        type: "paragraph",
        text: "60초는 사장의 응답 시간을 심리적 한계 안에 고정하기 위한 값이다. 30초는 운전·작업 중 반응이 물리적으로 어렵고, 120초는 요청자가 대체 경로를 모색하기 시작하는 임계다. 60초 구간에서 수락률이 최대화된다는 관찰 결과에 의한다.",
      },
      {
        type: "paragraph",
        text: "타이머는 단순한 UI 요소가 아니라 2단계 콜센터 이관과 3단계 공유콜 전환의 트리거다. 만료가 실패가 아니라 자동 에스컬레이션 신호로 설계된 이유가 여기에 있다.",
      },
      { type: "heading", level: 2, text: "수락률을 높이는 3가지 전술" },
      {
        type: "list",
        ordered: true,
        items: [
          "단골 지정 매트릭스를 분기 1회 갱신한다. 휴업·장비 매각으로 응답 불가 사장이 명단에 남으면 전용콜 1단계의 미응답률이 상승한다.",
          "단가 매트릭스를 장비·규격·지역 3차원으로 고정한다. 녹색 표시가 사장의 즉시 수락을 유도한다.",
          "기사 가용성 화면을 사전 갱신한다. 출근·휴무·정비 상태가 실시간이 아닌 경우 수락 후 기사 미배정으로 재거절이 발생한다.",
        ],
      },
      { type: "heading", level: 2, text: "함정과 대응" },
      {
        type: "paragraph",
        text: "플레이북 운영에서 반복적으로 관찰되는 함정은 두 가지다. 첫째, 타이머 만료를 시스템의 장애로 오해하는 경우. 이는 자동 에스컬레이션 단계로 설계된 정상 동작이다. 둘째, 동일 요청자의 연속 타이머 만료가 3회 이상 누적되는 경우.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "동일 요청자의 전용콜 연속 만료가 주 3회를 초과하면 단골 매트릭스 재점검이 필요하다. 대체 단골 1인을 추가하거나 해당 사장과의 관계를 오프라인에서 재조율한다. 만료의 반복은 시스템 문제가 아니라 관계의 신호다.",
      },
      { type: "heading", level: 2, text: "첫 주 체크리스트" },
      {
        type: "list",
        ordered: true,
        items: [
          "현장 실장 계정에 재주문 자동 복원을 활성화한다.",
          "사장 계정의 단가 매트릭스를 장비·규격·지역별로 100% 입력한다.",
          "기사 가용성 화면을 매일 08:00에 수동 갱신한다 (2주 후 자동화 전환).",
          "도입 3일차에 전용콜 수락률·콜센터 이관률·공유콜 도달률을 대시보드에서 확인한다.",
          "도입 5일차에 타이머 만료 상위 3인의 사장과 10분 오프라인 미팅을 진행한다.",
          "도입 7일차에 플레이북 검증 회의를 개최하여 다음 주 표준 운영 절차를 확정한다.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "첫 주의 목표는 '완벽한 수치'가 아니라 '6단계의 반복 안정화'다. 수락률은 2주차부터 자연스럽게 85% 이상으로 수렴한다.",
      },
    ],
    relatedSlugs: [
      "industry/2026-korean-construction-equipment-outlook",
      "engineering/why-postgres-fallback-architecture",
    ],
  },

  // ──────────────────────────────────────
  // 3. engineering/why-postgres-fallback-architecture
  // ──────────────────────────────────────
  {
    slug: "engineering/why-postgres-fallback-architecture",
    category: "engineering",
    categoryLabel: "엔지니어링",
    title: "왜 철연은 3단계 폴백을 PostgreSQL에 구현했는가",
    summary: "UPDATE WHERE status 패턴과 동시성 제어",
    author: {
      name: "BYTEFORCE 엔지니어링팀",
      role: "CTO 리드",
    },
    publishedAt: "2026-04-15",
    readingTime: 10,
    seoKeywords: ["PostgreSQL", "동시성", "배차 알고리즘"],
    body: [
      { type: "heading", level: 2, text: "요구사항" },
      {
        type: "paragraph",
        text: "철연의 3단계 폴백은 단일 배차 요청에 대해 전용콜·콜센터·공유콜을 순차적으로 트리거한다. 각 단계는 독립적 타이머를 갖는다. 공유콜 단계에서는 같은 지역의 모든 등록 사장이 동일 알림을 수신하며, 그 중 먼저 수락 버튼을 누른 1인이 단독으로 매칭을 확정한다. 나머지 수락 요청은 시스템 레벨에서 차단된다.",
      },
      {
        type: "paragraph",
        text: "이 요구사항은 세 가지 제약을 동시에 충족해야 한다. 첫째, 초당 수십 건의 동시 수락 시도에서도 이중 매칭이 발생하지 않는다. 둘째, 타이머 만료는 실시간에 가까운 지연 내에 다음 단계로 자동 전환된다. 셋째, 시스템의 재시작·네트워크 단절 후에도 진행 중인 요청의 상태가 정합성을 유지한다.",
      },
      { type: "heading", level: 2, text: "대안 비교" },
      {
        type: "list",
        items: [
          "Redis Queue — 빠르고 가볍지만 장애 복구 시 상태 정합성을 별도 스토리지에 의존한다. 금전 거래 트랜잭션과 상태 분리는 운영 리스크다.",
          "Dedicated queue (RabbitMQ·Kafka) — 정교한 큐 제어가 가능하나 배차 1건의 상태 전이가 여러 서비스에 분산되어 디버깅·감사 로그가 복잡해진다.",
          "DB 트랜잭션 (PostgreSQL) — UPDATE WHERE 조건절로 동시성 경쟁을 한 줄에 표현한다. 상태·감사 로그·정산이 동일 트랜잭션에 포함된다.",
        ],
      },
      { type: "heading", level: 2, text: "선택 근거" },
      {
        type: "paragraph",
        text: "철연은 금전 거래와 상태 전이가 분리되지 않는 도메인이다. 배차 확정은 15% 수수료 분배의 기점이며, 분배 내역은 법적 증빙의 대상이 된다. 상태 전이를 PostgreSQL 트랜잭션에 두고, 동시성 제어를 UPDATE WHERE 패턴으로 구현하는 쪽이 시스템의 신뢰 경계를 단순화한다. 성능 한계가 관찰되기 전까지는 추가 인프라 구성 요소를 도입하지 않는다.",
      },
      { type: "heading", level: 2, text: "핵심 쿼리" },
      {
        type: "paragraph",
        text: "공유콜 단계에서 사장이 수락 버튼을 누르면 다음 쿼리가 단일 트랜잭션으로 실행된다. 조건절의 status = 'shared_call'이 동시성 제어의 핵심이다.",
      },
      {
        type: "code",
        language: "sql",
        content: `UPDATE dispatch_requests
SET status = 'matched',
    matched_owner_id = $1,
    matched_at = NOW()
WHERE id = $2
  AND status = 'shared_call'
RETURNING *;`,
      },
      { type: "heading", level: 3, text: "동시성 제어" },
      {
        type: "paragraph",
        text: "PostgreSQL의 UPDATE는 타깃 행에 대해 row-level exclusive lock을 획득한다. 두 트랜잭션이 동일 행에 동시에 진입하면, 후행 트랜잭션은 선행 트랜잭션의 커밋·롤백을 기다린다. 선행이 커밋되면 status는 이미 'matched'로 전환되어 있고, 후행의 WHERE status = 'shared_call' 조건이 거짓이 되어 UPDATE 행 수가 0으로 반환된다. 애플리케이션은 이 반환값으로 수락 실패를 감지한다. 명시적 SELECT FOR UPDATE 없이도 단일 UPDATE 문이 경쟁을 종결한다.",
      },
      {
        type: "callout",
        variant: "info",
        text: "RETURNING * 절은 커밋된 행을 즉시 반환하여 후속 이벤트(SMS 3자 발송·수수료 집행) 트리거에 사용된다. 별도의 SELECT 왕복이 제거되어 응답 시간이 단축된다.",
      },
      { type: "heading", level: 2, text: "타이머 배치 작업" },
      {
        type: "paragraph",
        text: "1단계 전용콜의 60초 타이머 만료는 cron 기반 배치로 처리된다. 매 30초마다 한 번, 다음 쿼리가 실행된다. 단일 UPDATE로 경계 조건을 한 번에 처리하여 이벤트 중복을 방지한다.",
      },
      {
        type: "code",
        language: "ts",
        content: `// cron: 매 30초
UPDATE dispatch_requests
SET status = 'callcenter_call',
    callcenter_call_at = NOW()
WHERE status = 'exclusive_call'
  AND exclusive_call_at < NOW() - INTERVAL '60 seconds';`,
      },
      {
        type: "paragraph",
        text: "배치 주기(30초)와 타이머(60초)는 의도적으로 어긋나게 설계되었다. 주기와 타이머가 같으면 경계 직전에 들어온 요청이 한 사이클을 더 대기하는 왜곡이 발생한다. 30초 주기는 최대 지연을 30초로 제한하는 동시에, 트래픽 피크 시 배치 동시 실행으로 인한 경합을 완화한다.",
      },
      { type: "divider" },
      { type: "heading", level: 2, text: "학습 · 트레이드오프" },
      {
        type: "paragraph",
        text: "PostgreSQL 기반 구현은 장점과 한계를 동시에 갖는다. 운영 12개월 차에 관찰된 학습은 다음과 같이 정리된다.",
      },
      {
        type: "list",
        items: [
          "장점 — 상태·감사 로그·정산이 단일 DB 트랜잭션에 묶여 디버깅이 선형화된다.",
          "장점 — 인프라 구성 요소가 줄어 장애 원인 분석 시간이 단축된다.",
          "한계 — 초당 수천 건 규모에서는 UPDATE 락 경합이 병목으로 드러날 것으로 예측된다.",
          "한계 — 배치 cron은 타이머 정밀도의 상한이 30초로 고정된다. 초 단위 정밀도가 필요한 기능은 별도 구성이 요구된다.",
          "대응 — 수평 확장 시점에 공유콜 단계만 Redis Streams로 분리하는 2단계 이행 경로를 사전 설계한다.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "2026년 상반기 기준 평균 매칭 시간 2분 12초, 배차 성공률 99.3%는 이 구조에서 달성되었다. 단일 UPDATE 문이 단일 실패점을 제거하는 방식으로 복잡도를 축소한다.",
      },
      {
        type: "quote",
        text: "처음에는 다들 Redis로 가야 한다고 했다. 한 달 운영해보고 나니 분산을 먼저 도입했으면 디버깅에 더 많은 시간을 썼을 것이다. 단순함이 신뢰성이었다.",
        attribution: "BYTEFORCE 엔지니어링팀 · 아키텍처 회고록 내부판",
      },
    ],
    relatedSlugs: [
      "guide/60-second-dispatch-playbook",
      "industry/2026-korean-construction-equipment-outlook",
    ],
  },
];

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

export function getRelatedBlogPosts(slug: string): BlogPost[] {
  const post = getBlogPostBySlug(slug);
  if (!post?.relatedSlugs) return [];
  return post.relatedSlugs
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is BlogPost => Boolean(p));
}

export function getBlogCategoryMeta(id: BlogCategory): BlogCategoryMeta {
  const meta = blogCategories.find((c) => c.id === id);
  if (!meta) {
    throw new Error(`Unknown blog category: ${id}`);
  }
  return meta;
}

export function getSortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}
