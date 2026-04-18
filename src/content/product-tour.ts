/**
 * 랜딩 페이지 Interactive Product Tour 스텝 정의.
 *
 * 각 스텝의 `selector`는 랜딩 페이지 DOM 내부의 CSS 셀렉터다.
 * 투어 시작 시 각 요소를 순차 하이라이트한다.
 */

export interface TourStep {
  /** CSS selector — 하이라이트 대상 요소 */
  selector: string;
  /** 툴팁 제목 */
  title: string;
  /** 툴팁 본문 (판결문 어미) */
  description: string;
  /** 툴팁 배치 방향 — top/bottom/left/right/auto */
  placement?: "top" | "bottom" | "left" | "right" | "auto";
  /** 이 스텝의 라벨 (진행 표시용) */
  label: string;
}

export const landingTourSteps: TourStep[] = [
  {
    selector: "h1",
    title: "현장이 다시는 떼이지 않게",
    description:
      "철연의 핵심 약속이 헤드라인에 담긴다. 3단계 폴백 배차 · 전자계약 · 자동정산의 통합 플랫폼.",
    placement: "bottom",
    label: "1. 브랜드 포지션",
  },
  {
    selector: "[aria-label='주요 지표']",
    title: "실시간 지표",
    description:
      "파트너사 183곳 · 이번 달 보호 정산액 ₩8.3억 · 배차 성공률 99.3%. 검증된 운영 데이터가 Navy bar에 배치된다.",
    placement: "bottom",
    label: "2. Stats Strip",
  },
  {
    selector: "#platform",
    title: "3단계 폴백 시스템",
    description:
      "전용콜 60초 → 콜센터 60초 → 공유콜 선착순. 어떤 상황에서도 장비가 도착한다.",
    placement: "top",
    label: "3. 플랫폼 메커니즘",
  },
  {
    selector: "#heritage",
    title: "1998년 부산의 기록",
    description:
      "나철연 위원장이 부산일보에 올린 업계 3대 의제. 28년 후 그의 이름을 따른 시스템으로 응답한다.",
    placement: "top",
    label: "4. 계보(系譜)",
  },
  {
    selector: "#pricing",
    title: "투명한 가격 구조",
    description:
      "8,000만원 베이스 · 3단 플랜 · 지역별 차별 가격. ROI 계산기로 회수 기간 즉시 확인.",
    placement: "top",
    label: "5. 도입 비용",
  },
  {
    selector: "#contact",
    title: "도입 상담 신청",
    description:
      "24시간 이내 BYTEFORCE 사업개발팀이 회신한다. 파트너사 승인 후 실명 케이스도 공유된다.",
    placement: "top",
    label: "6. 문의",
  },
];
