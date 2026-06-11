# 전면 리뉴얼 감사 보고서 — 디자인·UI·UX·인터페이스

> 작성: 2026-06-10 · 범위: 전체 표면 (마케팅 + 대시보드 6롤 + 데모 + 온보딩 + 인증)
> 방법: 전 소스 정적 감사 + 로컬 구동 시각 검증 (데스크톱 1440px / 모바일 390px)
> 선행 감사: `docs/brand/AUDIT-2026-04-18.md` (카피·톤 전용 — 본 감사와 중복 없음)

---

## 0. 요약 — 핵심 진단 3줄

1. **디자인 시스템이 "정의만 있고 강제되지 않는다."** `tokens.ts`·`@theme`의 cy-* 토큰을 실제로 참조하는 화면이 없고, 신규 코드조차 `text-[#002C5F]` 하드코딩. 구세대 블루 `#0059b9`가 66곳, 신세대 네이비 `#002C5F`가 608곳 — 두 세대 팔레트가 한 제품에 공존한다.
2. **외부 접점일수록 구세대다.** 로그인, `/call/[id]`(SMS로 발송되는 비로그인 페이지), PDF 출력물, 차트가 전부 구 팔레트 — 첫인상 접점이 가장 낡았다.
3. **실제로 깨져 있는 것들이 있다.** 헤드라인용 Pretendard 800/900 폰트 404, `og-image.png` 부재, 프레스킷 로고 404, 구 브랜드(heavy-match) 잔재, 개발자 패널(DevNotes) 프로덕션 노출.

---

## 1. P0 — 깨진 것 (리뉴얼 이전에 즉시 핫픽스)

| # | 항목 | 위치 | 증상 |
|---|------|------|------|
| 1 | **Pretendard ExtraBold(800)·Black(900) 404** | `globals.css:114-127` (`noonfonts_2205-pro@1.0` 경로 자체가 CDN에 없음) | 토큰 스펙상 모든 디스플레이 헤드라인 = Black/900인데 파일이 없어 **의도한 타이포가 한 번도 렌더된 적 없음**. 브라우저가 700에서 faux-bold 합성 중 |
| 2 | **`/og-image.png` 부재** | `layout.tsx:78` 참조, `public/`에 없음 | 카카오톡·페이스북·트위터 공유 시 이미지 깨짐 |
| 3 | **프레스킷 로고 SVG 전부 404** | `press/page.tsx:370-443` → `/brand-assets/*.svg` 부재 | 보도자료 페이지의 로고 다운로드 4종 모두 동작 안 함 |
| 4 | **구 브랜드 자산·링크 잔재** | `public/logo/hm-*.svg` (hm = heavy-match), `demo/[role]/[...subpage]/page.tsx:409`의 `heavy-match.vercel.app` 링크, `public/next.svg·vercel.svg·globe.svg` 등 템플릿 기본 파일 | 리브랜딩 미완결 — 데모에서 구 도메인으로 회원가입 유도 중 |
| 5 | **DevNotes 개발자 패널 프로덕션 노출** | `demo/[role]/layout.tsx`에 env 분기 없이 마운트 | 내부 컴포넌트 구조, API 경로, DB 테이블명, "RLS bypass는 service_role key 사용" 같은 **보안 메모까지 일반 방문자에게 노출** |
| 6 | **쿠키 동의 배너가 콘텐츠·CTA 가림** | `ConsentBanner` — 요금 페이지 Enterprise 카드, 로그인 페이지 데모 링크를 덮음 | 동의 전까지 모든 페이지에서 우하단 콘텐츠 차단. 모바일에서 플로팅 요소 정체의 주범 |
| 7 | **확대(줌) 차단** | `layout.tsx:103-110` `maximumScale: 1, userScalable: false` | WCAG 1.4.4 위반. **"40~60대 건설 현장 가독성"이 핵심 타깃인 제품이 확대를 막고 있음** — 타깃과 정면 충돌 |

---

## 2. 디자인 시스템 — 토큰 단일화 (리뉴얼 1단계)

### 2.1 두 세대 팔레트 공존
- **구세대 (v1 잔재)**: `#0059b9` `#111c29` `#727785` `#c1c6d6` `#dee9fb` `#d7e2ff` `#ba1a1a` 등
  - 집중 지역: `ui/Badge.tsx`(전체), `ui/Card.tsx`, `ui/EmptyState.tsx`, `ui/Skeleton.tsx`, `AssignOperatorModal.tsx`, `CountdownTimer.tsx`, `charts/BarChart.tsx`, `charts/DonutChart.tsx`, `ConfirmationPDF.tsx`, `(auth)/login·register`, `call/[id]` (17곳+)
- **신세대 (v2)**: `#002C5F` 계열 — 단, **전부 `text-[#002C5F]` 식 arbitrary value 하드코딩**. `@theme`에 정의된 `text-cy-navy` 류 유틸리티를 쓰는 곳이 사실상 없음
- **방치 시**: 팔레트 조정이 영원히 불가능 (608곳 일괄 치환 필요)

### 2.2 죽은 코드 정리
- `globals.css:40-79` MD3 레거시 토큰 블록 (`--color-md-*` 40줄)
- `globals.css:133-136` `.dark` 블록 + `DarkModeToggle.tsx` (어디에도 마운트 안 됨) — **다크모드 제거/유지 의사결정 필요**
- `cheolyeon/Skeleton.tsx` 447줄 — 접근성까지 갖춘 상위 버전인데 **사용처 0곳**

### 2.3 Badge 의미체계 붕괴
`ui/Badge.tsx`: 상태 색이 구 hex + Tailwind 기본색(amber/emerald/pink) 혼용. `tokens.ts`의 `colors.status` (전용콜=네이비, 공유콜=시안, 매칭=그린…) 체계가 정의돼 있지만 **Badge가 이를 전혀 참조하지 않음**. 상태 색상은 배차 도메인의 핵심 시각 언어이므로 최우선 정렬 대상.

---

## 3. 컴포넌트 아키텍처 — 중복 제거 (리뉴얼 1단계)

| 문제 | 현황 | 처방 |
|------|------|------|
| **EmptyState 2벌** | `ui/EmptyState.tsx`(빈약) vs `cheolyeon/EmptyState.tsx`(일러스트 6종·롤별 CTA·모션) — 대시보드는 빈약한 쪽 사용 | cheolyeon 버전으로 통일, ui 버전 삭제 |
| **Skeleton 2벌** | `ui/Skeleton.tsx`(기본) vs `cheolyeon/Skeleton.tsx`(쉬머·aria, 미사용) | cheolyeon 버전으로 통일 + 로딩 누락 페이지에 장착 |
| **공용 Button 부재** | 로그인=그라데이션, 대시보드=bg-success/danger, 데모=별도 — 페이지마다 재발명. 터치 타깃도 28px~52px 들쑥날쑥 | Button 컴포넌트 신설 (variant×size, min-h 48px 보장) |
| **마케팅 nav/footer 복붙** | landing·pricing·company·press·story 각자 내장 — 이미 드리프트 발생 (메뉴 구성 미세 차이) | `MarketingLayout` 추출 |
| **대시보드 레이아웃 2벌** | `DashboardLayout` vs `DemoDashboardLayout` — NAV_ITEMS·롤 컬러 중복 정의 | nav 정의를 단일 소스로 추출, 레이아웃은 mode prop 분기 |
| **PageHeader 미정착** | admin 일부만 사용, operator·owner는 수제 `<h2>` | 6롤 전 페이지 의무 적용 |

---

## 4. UX 이슈 (리뉴얼 2단계)

### 4.1 모션 과용 — 시각 검증으로 확인
- 풀페이지 캡처 시 **히어로·통계 밴드·폼·푸터 외 전 섹션이 공백** — 모든 섹션이 `whileInView` 대기 상태(`opacity: 0`)로 시작하기 때문
- 부작용: ① JS 실패 시 콘텐츠 영구 미표시 ② 저사양 기기 스크롤 버벅임 (타깃 연령대 치명적) ③ `prefers-reduced-motion` 미존중 시 접근성 문제
- 처방: 모션은 히어로+핵심 CTA로 제한, 본문·표는 CSS fade 또는 무모션. 초기 `opacity-0` 대신 "JS 없어도 보이는" 점진적 향상 구조로

### 4.2 모바일 하단 플로팅 정체 (시각 검증)
데모 모바일에서 **쿠키 배너 + DevNotes FAB + 역할 전환 pill + (dev에선 Next 오버레이까지) 4겹 중첩**. 로그인에선 동의 버튼이 가려짐. 플로팅 요소 z-index·위치 전면 재설계 필요.

### 4.3 데모 배너 2중
`DemoRoleSwitcher.tsx:38` + `DemoDashboardLayout.tsx:144` 가 같은 안내 배너를 각각 렌더 — 모바일 세로 ~90px 낭비.

### 4.4 상태별 UX 공백
- **로딩**: requester·admin/dispatch·callcenter·salesperson 홈에 스켈레톤 없음 → 느린 현장 네트워크에서 빈 화면
- **빈 상태**: 롤마다 문구 톤 제각각 ("~없습니다" / "전용콜 없음" / CTA 유무 불일치)
- **폼**: ContactForm 필드 레벨 에러 없음 (어느 필드가 문제인지 모름), 성공 메시지 6초 후 자동 소멸
- **복사 불가**: `globals.css` 전역 `user-select: none` — 배차 ID·전화번호·계좌번호를 길게 눌러 복사할 수 없음 (현장 유저 핵심 동선)

### 4.5 기타
- 요금 페이지 지역 단가표: 모바일 가로 스크롤 시 헤더 비고정 → 열 맥락 상실
- 터치 타깃 미달: operator 콜 액션 `py-2`(~28px) 등 — 44px 미만 다수
- 로그인 태그라인 "실시간 매칭 플랫폼" vs 전사 태그라인 "배차·계약·정산 통합 플랫폼" 불일치

---

## 5. 성능·인프라 (리뉴얼 3단계)

1. **폰트 전략 재구축**: Pretendard를 woff(비서브셋) CDN 6파일로 로드 중 + 2파일 404. → `pretendard` npm 패키지 셀프호스트(가변 폰트 1파일, 서브셋) 권장. 한글 웹폰트는 서브셋 여부가 LCP를 좌우함
2. **Material Symbols 풀 가변폰트를 blocking `<link>`로 전 페이지 로드** (`layout.tsx:126`) — 아이콘 서브셋 또는 SVG 스프라이트로 교체
3. `icon.svg` 가 Next 기본 아이콘 — 브랜드 파비콘/터치아이콘 교체 필요
4. `showcase/*` 페이지가 공개 접근 가능 (사이트맵엔 없음) — dev 전용 가드 또는 삭제

---

## 6. 리뉴얼 로드맵 제안

```
P0 핫픽스 (반나절)          P1 파운데이션 (리뉴얼 코어)        P2 화면 적용                P3 마감
─────────────────          ─────────────────────────        ─────────────────          ─────────────
폰트 404 교체               cy-* 토큰 강제 (lint 규칙 포함)    외부 접점 우선:              접근성 (줌 허용,
og-image 제작               Button 신설                       login → call/[id] → PDF    스킵링크, 모션 감속)
DevNotes env 가드           Badge 상태색 재설계               → 대시보드 6롤              폰트 셀프호스트
heavy-match 링크 제거        EmptyState/Skeleton 통합          → 마케팅 페이지             아이콘 서브셋
쿠키배너 위치 수정           MarketingLayout 추출              데모/실제 레이아웃 통합       showcase 정리
줌 차단 해제                MD3·다크모드 죽은 코드 삭제
```

**순서 근거**: 토큰·공용 컴포넌트(P1)를 먼저 굳히지 않으면 P2에서 화면을 고칠 때마다 하드코딩이 재생산된다. 화면 적용은 "외부에 노출되는 비로그인 접점"부터 — 브랜드 인상이 걸린 곳이 가장 낡아 있기 때문.

---

## 6.5 조치 내역 — 2026-06-10 폴리싱 1차 (P0 + P1 코어 + 마이크로 인터랙션)

같은 날 1차 적용 완료. 증거 스크린샷: `renewal-evidence/after-*.png` (전: `landing-*`, `login-mobile`, `demo-*`).

| 영역 | 적용 |
|------|------|
| P0 | Pretendard 공식 Variable(동적 서브셋) 교체 — 800/900 첫 정상 렌더 · 줌 차단 해제 · DevNotes 프로덕션 게이트 · heavy-match 링크 → cheolyeon.com · SW 등록 `<script>` → next/script |
| 토큰 | MD3 레거시 블록·`.dark` 블록·DarkModeToggle 삭제 · status/deep 변형 토큰 추가 (`cy-st-*`, `cy-*-deep`) |
| UI 키트 | **Button 신설**(5 variant × 3 size, 프레스 물리, 로딩) · Badge 상태 도트 체계 재작성 · Card/EmptyState/Skeleton(쉬머)/PageHeader(네이비 룰) v2 재작성 — 동일 API라 대시보드 19페이지 즉시 적용 |
| 마이크로 인터랙션 | 전역 `:focus-visible` 링 · `::selection` 네이비 · `prefers-reduced-motion` 킬스위치 · `.press` 물리 · 텍스트 선택 정책 반전(데이터 복사 가능) · 하단 탭 layoutId 슬라이딩 인디케이터 · Toast 라이트 서피스+스프링 · 타이머 3위상 색 전이 |
| 모션 다이어트 | Reveal/Stagger reduced-motion 시 즉시 표시 · 뷰포트 120px 선행 트리거(빈 화면 제거) · HeroText blur 필터 제거 · 오프셋 40→20px |
| 화면 | 로그인 전면 리디자인(도면 그리드 + 모노 라벨 + OTP autocomplete + 엔터 제출) · GuidedTour/ConsentBanner(컴팩트 인셋)/데모 배너 단일화/역할 스위처(이모지 제거, Material 아이콘) |
| 검증 | `tsc --noEmit` ✓ · 변경 파일 ESLint ✓ · `next build` ✓ · 로그인/데모/랜딩 스크린샷 ✓ |

**잔여 (다음 패스)**: register·call/[id]·ConfirmationPDF·차트 팔레트, 마케팅 nav/footer 추출, EmptyState/Skeleton cheolyeon 버전 통합, og-image 제작, 장비 이모지 아이콘 교체, 데모 목데이터 hydration 불일치(상대시간), ConsentBanner setState-in-effect 린트(기존), 쿠키 배너·역할 스위처 일시 겹침(동의 1회 후 소멸).

### 폴리싱 2차 — 같은 날 (외부 접점 + 전면 토큰화)

| 영역 | 적용 |
|------|------|
| 인증 | **AuthShell 공유 셸 신설** (`(auth)/_shared.tsx` — 도면 그리드·워드마크·스텝 인디케이터·INPUT/LABEL/ErrorAlert) → login 정리 + **register 전면 리디자인** (역할 선택 = Material 아이콘 라디오 카드, 3스텝 01/03) |
| call/[id] | SMS 외부 접점 전면 재작성 — 판결문 카드(네이비 룰 + `DISPATCH REQUEST` 모노 라벨 + 헤어라인 InfoRow), StatusBadge·Button 재사용, 결과 화면 3종(수락/선점/거절) v2 틴트 |
| 컴포넌트 | AssignOperatorModal(네이비 룰 + 스피너 배정 칩), BarChart·DonutChart(tokens.colors 임포트 — SVG attr은 CSS var 불가, 기준선·트랙 추가), ConfirmationPDF(공문서 구도 + 모노 라벨 + 점선 서명란), SignatureCanvas(캔버스 색 토큰화) |
| **전면 토큰화 스윕** | bracket-hex 일괄 치환 **2,341건 / 66파일** — 구세대(#0059b9 계열 20종)·신세대(#002C5F 계열 18종) → cy-* 유틸리티. Tailwind 기본색 JS 리터럴(#10B981 등)도 v2 값으로 정렬. `cy-elevated` 토큰 추가. 잔여 8건은 의도된 색(맥OS 신호등 목업·다크 목업 크롬·호버 다크) |
| 검증 | `tsc` ✓ · `next build` ✓ (63페이지) · register/call/pricing 스크린샷 ✓ (`renewal-evidence/after2-*`) |

이로써 **§2.1 "두 세대 팔레트 공존" 항목 해소** — 소스 내 색상은 cy-* 토큰 단일 체계. 남은 잔여: 마케팅 nav/footer 추출, og-image, 장비 이모지 아이콘, EmptyState/Skeleton cheolyeon 통합, 데모 hydration.

---

## 7. 의사결정 필요 항목 (오너 판단)

1. **다크모드**: 완전 삭제 vs 보존? → 1차 패스에서 죽은 코드(토글·CSS)는 삭제됨. 추후 다크모드 재도입 여부만 결정하면 됨
2. **상태 색상 의미체계**: Badge 재설계 시 `tokens.ts`의 status 팔레트(전용콜=네이비/공유콜=시안/완료=딥그린)를 그대로 채택할지, 현장 직관(예: 긴급=빨강) 기준으로 재정의할지 → 1·2차 패스는 tokens.ts 체계 채택. 현장 피드백 후 재검토
3. **데모 전략**: 데모/실제 대시보드 마크업 통합(단일 소스 + 목데이터 주입) vs 현행 이원화 유지
4. **showcase 페이지**: 내부 QA용으로 유지(가드 추가) vs 삭제

---

## 8. 향후 작업 로드맵 (2026-06-11 기준)

> 1·2차 폴리싱 패스 배포 후 남은 작업. 위에서부터 권장 순서.

### 8.1 디자인 마감 (P2 잔여)

- [ ] **마케팅 nav/footer 공용화** — landing·pricing·company·press·story 5페이지의 복붙 헤더/푸터를 `MarketingLayout`으로 추출 (드리프트 이미 발생 중)
- [ ] **og-image.png 제작** (1200×630) + `/brand-assets/` 프레스킷 SVG 4종 실물 — 현재 참조만 있고 파일 없음 (SNS 공유·프레스킷 404)
- [ ] **장비 이모지 → 아이콘 통일** — 데모 카드의 🚛📦 등을 `EquipmentIcons.tsx` SVG 체계로 교체
- [ ] **EmptyState/Skeleton 이중화 해소** — `cheolyeon/` 풀버전(일러스트·롤별 CTA·447줄)으로 통합, `ui/`는 얇은 재수출로 전환
- [ ] **브랜드 파비콘** — `public/icon.svg`가 아직 범용 아이콘. 철연 모노그램으로 교체 + apple-touch-icon 180px PNG

### 8.2 성능

- [ ] **Material Symbols 다이어트** — 전 페이지 blocking `<link>`로 풀 가변폰트 로드 중. 사용 아이콘 서브셋 or SVG 스프라이트로 교체
- [ ] **Pretendard self-host** — 현재 jsdelivr CDN(동적 서브셋). 장기적으로 `pretendard` npm 패키지로 자체 호스팅 (외부 의존 제거)
- [ ] 랜딩 LCP 측정 후 히어로 이미지/모션 추가 튜닝

### 8.3 품질 / 버그

- [ ] **데모 hydration 불일치** — 목데이터 상대시간(`Date.now()`)이 SSR/클라 불일치 유발. 데모 진입 시각 기준 고정값으로 전환
- [ ] **ConsentBanner 린트** — setState-in-effect (기존 코드). `useSyncExternalStore` 패턴 전환
- [ ] **쿠키 배너 ↔ 데모 역할 스위처 첫 방문 겹침** — 동의 전 스위처 위치 조정 or 동의 시까지 스위처 숨김
- [ ] **하드코딩 재유입 방어** — ESLint `no-restricted-syntax`로 className 내 `[#hex]` 패턴 금지 규칙 추가 (2,341건 토큰화의 방어선)

### 8.4 다음 마일스톤 후보

- [ ] 대시보드 로딩 스켈레톤 전 페이지 장착 (requester·callcenter·salesperson 홈 등 누락분)
- [ ] 빈 상태 문구 6롤 통일 (보이스 가이드 기준)
- [ ] 요금 페이지 지역 단가표 모바일 카드 레이아웃 전환
- [ ] showcase 라우트 가드 (§7-4 결정 후)
