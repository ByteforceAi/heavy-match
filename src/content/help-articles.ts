/**
 * 철연 CHEOLYEON — Help Center 아티클 데이터
 *
 * heritage-v1.md §3 금지 / §4 허용 구조를 준수한다.
 * 종결어: 판결문 어미(~한다 / ~된다 / ~였다 / ~않는다) 고정.
 * 인터랙션 문구(피드백 버튼 등)는 §3.2.1 예외로 존댓말 허용.
 *
 * 아티클 추가 시 규칙:
 *   1. slug는 kebab-case. URL에 그대로 노출된다.
 *   2. category는 6종 리터럴 중 하나로 제한한다.
 *   3. body 블록 최소 1개의 list, 1개의 callout을 권장한다.
 *   4. lastUpdated는 ISO(YYYY-MM-DD) 표기를 사용한다.
 */

export type HelpCategory =
  | "getting-started"
  | "requester"
  | "owner"
  | "operator"
  | "billing"
  | "troubleshooting";

export type HelpBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; content: string }
  | { type: "callout"; variant: "info" | "warn" | "success"; text: string }
  | { type: "image"; src: string; alt: string };

export interface HelpArticle {
  slug: string;
  category: HelpCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  lastUpdated: string;
  body: HelpBlock[];
  related?: string[];
}

export interface HelpCategoryMeta {
  id: HelpCategory;
  label: string;
  sub: string;
  icon: string;
}

export const helpCategories: HelpCategoryMeta[] = [
  {
    id: "getting-started",
    label: "시작하기",
    sub: "5분 만에 첫 배차 · 3단계 배차 시스템 이해",
    icon: "rocket_launch",
  },
  {
    id: "requester",
    label: "장비요청자 가이드",
    sub: "장비 요청 작성 · 전자서명 · 재주문 적립",
    icon: "engineering",
  },
  {
    id: "owner",
    label: "중장비사장 가이드",
    sub: "전용콜 수신 · 수락 타이머 · 단가 매트릭스",
    icon: "local_shipping",
  },
  {
    id: "operator",
    label: "기사 가이드",
    sub: "배차 확인 · 작업 시작/완료 · 전자서명",
    icon: "person",
  },
  {
    id: "billing",
    label: "정산·계약",
    sub: "15% 수수료 분배 · 자동정산 · 취소 페널티",
    icon: "receipt_long",
  },
  {
    id: "troubleshooting",
    label: "문제 해결",
    sub: "타이머 만료 · 에스컬레이션 · 복구 절차",
    icon: "build",
  },
];

export const helpArticles: HelpArticle[] = [
  // ─────────────────────────────────────────
  // 1. quick-start (getting-started)
  // ─────────────────────────────────────────
  {
    slug: "quick-start",
    category: "getting-started",
    categoryLabel: "시작하기",
    title: "철연 시작하기: 5분 만에 첫 배차",
    summary:
      "가입부터 첫 장비 요청, 배차 완료까지의 전체 흐름을 한 페이지로 정리한다.",
    lastUpdated: "2026-04-18",
    body: [
      {
        type: "paragraph",
        text: "철연은 중장비 배차·계약·정산을 하나의 시스템으로 연결한다. 이 문서는 첫 사용자가 5분 안에 첫 배차를 완료할 수 있도록 필수 단계를 순서대로 기술한다.",
      },
      {
        type: "heading",
        level: 2,
        text: "1단계 · 계정 생성과 역할 선택",
      },
      {
        type: "paragraph",
        text: "회원가입 화면에서 6가지 역할 중 하나를 선택한다. 장비요청자, 중장비사장, 기사, 콜센터, 영업사원, 관리자 권한이 각각 별도의 인터페이스로 분기된다. SMS 본인인증이 완료된 시점에 계정이 활성화된다.",
      },
      {
        type: "callout",
        variant: "info",
        text: "역할은 가입 후에도 운영자 승인 절차를 거쳐 변경된다. 동일 전화번호로 복수 역할은 허용되지 않는다.",
      },
      {
        type: "heading",
        level: 2,
        text: "2단계 · 기본 정보 등록",
      },
      {
        type: "list",
        items: [
          "장비요청자: 소속 건설사, 현장 주소, 담당자 연락처",
          "중장비사장: 보유 장비 목록, 기사 배정, 단가 매트릭스",
          "기사: 보유 면허, 장비 숙련도, 활동 권역",
          "콜센터·영업사원: 관할 지역과 담당 파트너사",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "3단계 · 첫 배차 요청",
      },
      {
        type: "paragraph",
        text: "대시보드 우측 상단의 '장비 요청' 버튼을 눌러 폼을 연다. 장비 종류, 규격, 투입 시간, 현장 위치, 예상 작업 시간을 입력한 뒤 전자서명을 완료하면 3단계 폴백 로직이 자동으로 시작된다.",
      },
      {
        type: "callout",
        variant: "success",
        text: "요청이 제출되면 전용콜(60초) → 콜센터(60초) → 공유콜(선착순) 순서로 자동 매칭이 진행된다. 평균 매칭 시간은 2분 12초로 집계된다.",
      },
      {
        type: "heading",
        level: 2,
        text: "4단계 · 배차 결과 확인",
      },
      {
        type: "paragraph",
        text: "매칭이 확정되면 요청자·중장비사장·기사 3자에게 동시에 알림이 전송된다. 대시보드의 '진행중' 탭에서 실시간 상태, 기사 위치, 예상 도착 시각이 확인된다. 작업 완료 후 전자서명과 함께 자동정산이 실행된다.",
      },
    ],
    related: ["3-stage-dispatch", "how-to-request"],
  },

  // ─────────────────────────────────────────
  // 2. 3-stage-dispatch (getting-started)
  // ─────────────────────────────────────────
  {
    slug: "3-stage-dispatch",
    category: "getting-started",
    categoryLabel: "시작하기",
    title: "3단계 배차 시스템 이해",
    summary:
      "전용콜·콜센터·공유콜로 구성된 3단계 폴백의 동작 원리와 단계별 타이머를 설명한다.",
    lastUpdated: "2026-04-18",
    body: [
      {
        type: "paragraph",
        text: "철연의 3단계 배차는 단일 실패점을 제거하기 위한 구조다. 전화 한 통에 의존하는 수기 배차와 달리, 각 단계가 독립적으로 동작하여 배차 실패율을 구조적으로 낮춘다.",
      },
      {
        type: "heading",
        level: 2,
        text: "1단계 · 전용콜 (Exclusive Call)",
      },
      {
        type: "paragraph",
        text: "요청자가 지정한 단골 중장비사장에게 SMS가 1:1로 발송된다. 사장은 60초 이내에 수락 또는 거절을 선택한다. 수락 시 즉시 매칭이 확정되며, 미응답은 자동 거절로 처리된다.",
      },
      {
        type: "list",
        items: [
          "발송 대상: 요청자가 단골로 지정한 1인",
          "응답 시간: 60초 (타이머 UI로 노출)",
          "결과: 수락 → 매칭 확정 / 거절·미응답 → 2단계 이관",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "2단계 · 콜센터 전달 (Callcenter Relay)",
      },
      {
        type: "paragraph",
        text: "1단계가 실패하면 해당 사장의 콜센터로 요청이 자동 이관된다. 콜센터 상담원은 동일한 사장에게 직접 연락하거나, 소속 기사 풀에서 대체 인력을 배정한다. 이 단계의 응답 시간도 60초로 제한된다.",
      },
      {
        type: "callout",
        variant: "info",
        text: "콜센터 단계는 오프라인 운영의 대체 경로로 설계되었다. SMS 미확인·차량 이동 중 등으로 1단계가 실패하는 케이스를 흡수한다.",
      },
      {
        type: "heading",
        level: 2,
        text: "3단계 · 공유콜 (Shared Call)",
      },
      {
        type: "paragraph",
        text: "2단계까지 실패한 요청은 같은 지역의 모든 등록 사장에게 동시에 발송된다. 먼저 수락 버튼을 누른 사장이 단독 매칭되며, 이후의 수락은 자동으로 차단된다.",
      },
      {
        type: "code",
        content:
          "UPDATE dispatch_request\n  SET owner_id = $1, status = 'matched'\n  WHERE id = $2 AND status = 'shared_call';",
      },
      {
        type: "callout",
        variant: "success",
        text: "공유콜 단계에서도 배차가 확정되지 않는 비율은 0.7% 미만이다. 이 경우 관리자 수동 배정으로 전환된다.",
      },
    ],
    related: ["quick-start", "exclusive-call", "timer-expired"],
  },

  // ─────────────────────────────────────────
  // 3. how-to-request (requester)
  // ─────────────────────────────────────────
  {
    slug: "how-to-request",
    category: "requester",
    categoryLabel: "장비요청자 가이드",
    title: "장비 요청 작성법",
    summary:
      "장비 종류·규격·투입 시간·현장 정보·전자서명까지 단계별 입력 항목을 상세히 안내한다.",
    lastUpdated: "2026-04-18",
    body: [
      {
        type: "paragraph",
        text: "장비 요청 폼은 5개 섹션으로 구성된다. 각 섹션의 필수 항목이 모두 채워져야 제출이 활성화된다. 잘못된 규격 입력은 매칭 실패의 가장 흔한 원인이므로 본 문서를 기준으로 확인한다.",
      },
      {
        type: "heading",
        level: 2,
        text: "섹션 1 · 장비 종류",
      },
      {
        type: "list",
        items: [
          "굴삭기(0.8t / 1.5t / 3.5t / 6t / 20t)",
          "덤프트럭(5t / 15t / 25t)",
          "크레인(5t / 25t / 50t / 100t)",
          "지게차(2t / 3t / 5t)",
          "로더·롤러·펌프카·고소작업차",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "섹션 2 · 규격 선택",
      },
      {
        type: "paragraph",
        text: "장비 종류를 선택하면 규격 드롭다운이 동적으로 갱신된다. 톤수·붐 길이·버킷 용량 등 세부 규격이 현장 조건에 맞아야 기사의 재방문 없이 작업이 완결된다.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "규격 오기재는 현장 도착 후 반송 사유가 된다. 반송 시 요청자에게 이동비가 청구된다.",
      },
      {
        type: "heading",
        level: 2,
        text: "섹션 3 · 투입 시간",
      },
      {
        type: "paragraph",
        text: "투입 일자와 시작 시각을 분 단위로 지정한다. 당일 긴급 요청(4시간 이내)은 '긴급' 플래그가 자동 부여되어 전용콜 단계가 생략되고 즉시 공유콜로 전환된다.",
      },
      {
        type: "heading",
        level: 2,
        text: "섹션 4 · 현장 정보",
      },
      {
        type: "list",
        items: [
          "현장 주소(지번 또는 도로명)와 정확한 진입 지점",
          "현장 소장 연락처(기사 도착 직전 자동 발송)",
          "접근 제한 사항(저상차 불가·폭 제한·지중 매설물 등)",
          "작업 종료 예정 시각",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "섹션 5 · 전자서명",
      },
      {
        type: "paragraph",
        text: "서명 패드에 손가락 또는 마우스로 서명한다. 서명은 base64 PNG와 타임스탬프로 저장되어 전자서명법에 근거한 법적 효력을 가진다. 서명 완료 후 제출 버튼이 활성화된다.",
      },
      {
        type: "callout",
        variant: "info",
        text: "동일 현장·동일 장비 재주문 시 이전 입력 내용이 자동 복원된다. 재주문 1건당 5% 적립금이 부여된다.",
      },
    ],
    related: ["quick-start", "3-stage-dispatch", "commission-structure"],
  },

  // ─────────────────────────────────────────
  // 4. exclusive-call (owner)
  // ─────────────────────────────────────────
  {
    slug: "exclusive-call",
    category: "owner",
    categoryLabel: "중장비사장 가이드",
    title: "전용콜 수신과 수락 타이머",
    summary:
      "60초 전용콜 타이머의 동작과 수락·거절 판단 기준, 미응답 시 페널티 규정을 정리한다.",
    lastUpdated: "2026-04-18",
    body: [
      {
        type: "paragraph",
        text: "전용콜은 단골 관계가 형성된 요청자로부터만 수신된다. 콜 수신율과 수락률은 파트너 등급에 반영되며, 높은 등급은 우선 노출과 수수료 인센티브로 연결된다.",
      },
      {
        type: "heading",
        level: 2,
        text: "타이머 구성",
      },
      {
        type: "paragraph",
        text: "SMS 수신 시점부터 60초 카운트다운이 시작된다. 모바일 앱을 열면 풀스크린 타이머 UI가 자동 표시되며, 수락·거절 버튼 외의 화면 조작은 차단된다.",
      },
      {
        type: "list",
        items: [
          "수락: 즉시 매칭 확정. 요청자·기사에게 동시 알림 발송.",
          "거절: 사유 드롭다운 선택 필수(단가 불일치·장비 점검 등).",
          "미응답: 자동 거절 처리. 3회 누적 시 파트너 등급 1단계 하락.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "수락 판단 기준",
      },
      {
        type: "heading",
        level: 3,
        text: "단가 매트릭스 대조",
      },
      {
        type: "paragraph",
        text: "타이머 화면 하단에 요청자가 제시한 단가와 자체 등록 단가 매트릭스의 차이가 색상으로 표시된다. 녹색은 일치·상회, 황색은 5% 이내 할인, 적색은 그 이하다. 적색 수신은 즉시 거절이 원칙이다.",
      },
      {
        type: "heading",
        level: 3,
        text: "기사 가용성 확인",
      },
      {
        type: "paragraph",
        text: "수락 전 기사 배정 화면이 자동 호출된다. 현재 가용한 기사와 장비 조합이 없으면 수락 버튼이 비활성화된다. 미배정 수락은 시스템 차원에서 차단된다.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "수락 후 취소 시 7.5% 페널티 수수료가 부과된다. 타이머 소진 전 신중히 결정한다.",
      },
      {
        type: "heading",
        level: 2,
        text: "수신 실패 복구",
      },
      {
        type: "paragraph",
        text: "SMS 지연·단말 오프라인으로 타이머가 소진되면 2단계 콜센터로 자동 이관된다. 사장은 콜센터를 통해 간접 수락이 가능하지만, 전용콜 수락률 집계에는 반영되지 않는다.",
      },
    ],
    related: ["3-stage-dispatch", "timer-expired", "commission-structure"],
  },

  // ─────────────────────────────────────────
  // 5. commission-structure (billing)
  // ─────────────────────────────────────────
  {
    slug: "commission-structure",
    category: "billing",
    categoryLabel: "정산·계약",
    title: "15% 수수료 분배 구조",
    summary:
      "본사 5% · 콜센터 2.5% · 영업 2.5% · 건설사 적립 5%로 구성된 수수료 구조와 계산식을 설명한다.",
    lastUpdated: "2026-04-18",
    body: [
      {
        type: "paragraph",
        text: "철연은 장비 임대 거래 금액의 15%를 플랫폼 수수료로 집행한다. 이 15%는 네 주체에게 투명하게 분배되며, 모든 건별 내역이 대시보드에 기록된다.",
      },
      {
        type: "heading",
        level: 2,
        text: "분배 비율",
      },
      {
        type: "list",
        items: [
          "본사 수익 5% — 플랫폼 운영·인프라·지속 개발",
          "콜센터 2.5% — 2단계 이관 상담·오프라인 운영",
          "영업사원 2.5% — 해당 파트너의 담당 영업사원",
          "건설사 적립 5% — 요청자 소속 건설사 재주문 적립",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "계산 공식",
      },
      {
        type: "paragraph",
        text: "각 건의 분배액은 임대 확정 금액에 정수 비율을 곱하여 산출된다. 원 단위 이하는 절사된다.",
      },
      {
        type: "code",
        content:
          "// 크레인 50T · 하루(8h) 임대비 ₩1,000,000 기준\nconst base = 1_000_000;\n\nconst hqFee         = base * 0.05;   // 50,000\nconst callcenterFee = base * 0.025;  // 25,000\nconst salesFee      = base * 0.025;  // 25,000\nconst builderCredit = base * 0.05;   // 50,000\n\nconst totalCommission = hqFee + callcenterFee + salesFee + builderCredit;\n// 150,000 (전체 15%)\n\nconst ownerReceive  = base - totalCommission;\n// 850,000 (중장비사장 수령액)",
      },
      {
        type: "heading",
        level: 2,
        text: "정산 사이클",
      },
      {
        type: "paragraph",
        text: "작업 완료 서명이 수신된 시점에 정산 레코드가 생성된다. 매주 수요일 오전 9시에 전 주의 정산이 일괄 집행되며, 건설사 적립금은 다음 주문 시 자동 차감된다.",
      },
      {
        type: "callout",
        variant: "success",
        text: "모든 분배 내역은 대시보드의 '정산' 탭에서 건별·주별·월별로 필터링된다. CSV 내보내기가 지원된다.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "매칭 후 요청자·사장 측의 일방 취소 시 7.5% 페널티 수수료가 부과된다. 불가항력(천재지변·현장 폐쇄)은 관리자 승인으로 면제된다.",
      },
    ],
    related: ["how-to-request", "exclusive-call", "timer-expired"],
  },

  // ─────────────────────────────────────────
  // 6. timer-expired (troubleshooting)
  // ─────────────────────────────────────────
  {
    slug: "timer-expired",
    category: "troubleshooting",
    categoryLabel: "문제 해결",
    title: "타이머 만료 시 대응",
    summary:
      "각 단계의 타이머가 만료되었을 때의 자동 에스컬레이션 경로와 수동 복구 절차를 기술한다.",
    lastUpdated: "2026-04-18",
    body: [
      {
        type: "paragraph",
        text: "타이머 만료는 매칭 실패가 아니라 다음 단계로의 이관 신호다. 본 문서는 단계별 만료 시 시스템이 취하는 자동 조치와 사용자가 취할 수 있는 수동 조치를 구분하여 기록한다.",
      },
      {
        type: "heading",
        level: 2,
        text: "1단계 전용콜 만료",
      },
      {
        type: "paragraph",
        text: "60초 내 응답이 수신되지 않으면 요청 상태가 'relay_pending'으로 전환된다. 요청자 화면에는 '콜센터 전달 중' 메시지가 표시되며, 사장 측에는 미응답 기록이 남는다.",
      },
      {
        type: "list",
        items: [
          "자동 조치: 동일 사장의 콜센터로 SMS + 푸시 이관",
          "요청자 조치: 불필요. 대기 상태 유지",
          "사장 조치: 2단계에서 직접 수락 가능",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "2단계 콜센터 만료",
      },
      {
        type: "paragraph",
        text: "콜센터가 60초 내 배정에 실패하면 요청은 'shared_call' 상태로 전환되어 같은 지역의 모든 등록 사장에게 동시 발송된다.",
      },
      {
        type: "callout",
        variant: "info",
        text: "콜센터 측 사유(휴무·통화 폭주)가 기록된 경우 관리자 대시보드에 표시되어 다음 배정 정책에 반영된다.",
      },
      {
        type: "heading",
        level: 2,
        text: "3단계 공유콜 만료",
      },
      {
        type: "paragraph",
        text: "공유콜 송신 후 5분 내 누구도 수락하지 않으면 요청이 'manual_review' 상태로 전환된다. 이 시점에서 관리자 수동 개입이 시작된다.",
      },
      {
        type: "heading",
        level: 3,
        text: "관리자 복구 절차",
      },
      {
        type: "list",
        items: [
          "인근 지역 확장 검색 — 반경 30km까지 자동 확대",
          "단가 재협상 제안 — 요청자에게 5% 상향 제안",
          "대체 장비 제안 — 유사 규격 장비로 치환 제안",
          "예비 기사 풀 호출 — 철연 직영 예비 기사에게 호출",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "요청자 직접 복구",
      },
      {
        type: "paragraph",
        text: "요청자는 'manual_review' 상태에서 '재시도' 버튼으로 1·2·3단계를 처음부터 재실행할 수 있다. 입력 내용은 자동 보존되며, 재시도 시 배차 우선순위 플래그가 부여된다.",
      },
      {
        type: "callout",
        variant: "success",
        text: "지난 3개월 기준 manual_review 단계까지 도달한 요청은 전체의 0.4%였다. 이 중 97%가 30분 내에 관리자 복구로 매칭 완료된다.",
      },
    ],
    related: ["3-stage-dispatch", "exclusive-call", "commission-structure"],
  },
];

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════

export function getArticleBySlug(slug: string): HelpArticle | undefined {
  return helpArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: HelpCategory): HelpArticle[] {
  return helpArticles.filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string): HelpArticle[] {
  const article = getArticleBySlug(slug);
  if (!article?.related) return [];
  return article.related
    .map((s) => getArticleBySlug(s))
    .filter((a): a is HelpArticle => Boolean(a));
}
