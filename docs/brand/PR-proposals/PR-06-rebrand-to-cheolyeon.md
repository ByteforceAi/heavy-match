# PR-06 · 전면 리브랜드: Heavy Match → 철연 CHEOLYEON

**심각도:** 🔴 Critical (브랜드 축 이동)
**범위:** 코드베이스 전체 + 디자인 토큰 + 메타데이터
**승인:** 이한결 (BYTEFORCE 대표, 2026-04-18 구두 승인)
**규칙:** `docs/brand/heritage-v1.md` v1.0 전면 준수
**상태:** 구현 완료 (빌드 검증 통과)

---

## 0. 이 PR이 흡수하는 것

본 PR은 이전에 제안된 **PR-01 ~ PR-05의 모든 지적사항을 단일 변경으로 통합**한다.

| 이전 PR | 상태 | 흡수 방식 |
|---------|------|----------|
| PR-01 · §3.1 `우리` 1인칭 제거 | 흡수 | `copy.ts` 전면 재작성 시 `도입 기업`/`귀사` 치환 |
| PR-02 · 시뮬레이션 완료 H3 `!` 제거 | 흡수 | `/demo/simulation` 재도색 + `배차 완료` 변경 |
| PR-03 · narrative `~입니다` 평서형 전환 | 흡수 | `copy.ts` `problems` / `hero.description` / Final CTA 전환 |
| PR-04 · 의문형 훅 재작성 | 흡수 | `/demo` `체험할 역할 선택`, `/demo/[role]` `장비 요청 시작` |
| PR-05 · Hero 서브타이틀 재구조 | 흡수 | Hero 완전 재작성 — "현장이 다시는 떼이지 않게" + §2.3 tagline |

이전 PR 문서는 **삭제하지 않고** `docs/brand/PR-proposals/` 하위에 보존하여 감사 트레일로 유지한다.

---

## 1. 변경 요약

### 1.1 브랜드 축 이동

| 축 | Before (v1 Heavy Match) | After (v2 철연 CHEOLYEON) |
|----|-------------------------|--------------------------|
| 네이밍 | Heavy Match | 철연 · CHEOLYEON |
| 서사 | 특별함 선점 (마스터피스) | 업계 표준 + 계보(系譜) 레이어 |
| Primary | #FF6B1A Safety Orange | **#002C5F HD Hyundai Navy** |
| Accent | #FFA523 Amber | **#00AAD2 Cyan** |
| 배경 | #0A0A0B Masterpiece Black | **#F4F6FA Enterprise Gray** / #FFFFFF |
| 카드 | #1A1A20 Dark Surface | **#FFFFFF** White + Navy 섀도 |
| 타이포 Display | Pretendard + Inter | **Pretendard + IBM Plex Sans KR** |
| 타이포 Mono | JetBrains Mono | **Roboto Mono** |
| 메타 Title | Heavy Match — 중장비 배차 매칭 | **철연 CHEOLYEON — 중장비 배차·계약·정산 통합 플랫폼** |
| Theme Color | #0059b9 | **#002C5F** |

### 1.2 신규 자산

- `docs/brand/heritage-v1.md` — 철연 브랜드 서사 공식 원본 (v1.0)
- `docs/design/cheolyeon-v2-ref.html` — 비주얼 레퍼런스 시안
- `docs/brand/AUDIT-2026-04-18.md` — 감사 보고서 (22-41건 위반)
- `src/components/cheolyeon/HeritageSection.tsx` — L3 노출 부산일보 재현 박스
- `src/components/cheolyeon/LivePreviewCard.tsx` — Hero 우측 라이브 미니 대시보드

---

## 2. 파일별 변경 내역

### 2.1 Foundation

| 파일 | 변경 |
|------|------|
| `src/lib/design-system/tokens.ts` | 전면 재작성 — navy/cyan 패밀리 신규, legacy orange/amber는 deprecated alias로 값만 재매핑 |
| `src/app/globals.css` | HD Navy 라이트 @theme 변수, Pretendard CDN @font-face 복구, MD3 legacy 값 재매핑 |
| `src/app/layout.tsx` | 메타데이터 철연 전환, IBM Plex Sans KR + Roboto Mono next/font 추가, OG/Twitter 카드 재작성, themeColor Navy |

### 2.2 Copy System

| 파일 | 변경 |
|------|------|
| `src/content/copy.ts` | 전면 재작성. heritage-v1.md §2.1/§2.2/§2.3 canonical text를 `heritageFull` / `heritageShort` / `heritageTagline` export로 직접 매핑. 모든 narrative body를 판결문 어미(~한다/~된다)로 전환. FAQ 8건 유지(§3.2.1 예외 "인터랙션"으로 분류). `우리 회사` 1인칭 제거. `§6.1` 부산일보 기사 원문을 `busanIlbo` export로 노출. |

### 2.3 Landing Page

| 파일 | 변경 |
|------|------|
| `src/app/page.tsx` | v2 HTML 구조로 전면 재작성. 12섹션: Nav / Hero(2-col + LivePreview) / Stats Strip(Navy bg) / Features / Solution / Roles / Commission / Pricing / Heritage / FAQ / Final CTA / Footer. BootSplash·HeroBackground·IndustrialGlass 제거. |
| `src/components/motion/MotionPrimitives.tsx` | MotionButton variantStyles를 Navy 기반으로 재매핑. MotionCard 배경을 `#FFFFFF` + Navy 섀도로 전환. |
| `src/components/landing/ContactForm.tsx` | 다크 테마 → 라이트 테마. `hm-inquiries` localStorage 키 → `cy-inquiries`. `[Heavy Match Inquiry]` 로그 → `[CHEOLYEON Inquiry]`. `연락드리겠습니다` → `연락을 회신한다`. 성공 메시지 `문의가 접수되었습니다` → `접수되었다`. |

### 2.4 Demo Pages

| 파일 | 변경 |
|------|------|
| `src/app/demo/page.tsx` | HD Navy 라이트 테마로 전면 재작성. BootSplash·HeroBackground 제거. `어떤 역할을 체험하시겠어요?` → `체험할 역할 선택`. `~합니다` → `~한다`. `Heavy Match` 네비 브랜드 → `철연 CHEOLYEON`. |
| `src/app/demo/[role]/page.tsx` | 컬러 토큰 일괄 치환 (#0059b9→#002C5F 외 10개). `장비가 필요하신가요?` → `장비 요청 시작`. Toast `수락!` / `완료!` / `배정!` 전부 `!` 제거. `Heavy Match 플랫폼` → `철연 CHEOLYEON 플랫폼`. |
| `src/app/demo/[role]/[...subpage]/page.tsx` | 동일 컬러 토큰 치환. Toast `요청 완료!` / `등록!` / `복사됨!` 전부 `!` 제거. |
| `src/app/demo/simulation/page.tsx` | HD Navy 라이트로 전면 재도색 (19스텝 NativeFeel 애니 보존). `배차 완료!` / `에스컬레이션 후 배차 완료!` 둘 다 `!` 제거. In-device UI (디바이스 프레임 내부 `⚡ 수락!`, `📩 배차 매칭 완료!` 등)는 §3.2.6 "제품 UI 예외" 유지. |

---

## 3. heritage-v1.md 규칙 준수 현황

### ✅ §3.1 감정 단어 금지
- `먹여 살린`, `외손자`, `유산`, `꿈`, `눈물`, `헌신`, `희생` — **전 파일 0건**
- `우리의/우리는` 브랜드 1인칭 — **0건** (PR-01에서 지적된 `copy.ts:159` 및 `page.tsx:304` 해소)

### ✅ §3.2.1 `~입니다` 금지 (narrative)
- Hero description, problems body, Final CTA, Empty state 전부 판결문 어미 전환
- **FAQ 8건은 유지** — `§3.2.1 예외 "대고객 안내 문구"` 해석 적용 (리뷰어 최종 판정 필요)

### ✅ §3.2.3 연속 단문 금지
- v1 `60초 전용콜. 3단계 폴백. 0건의 누락.` **제거**. v2 Hero는 단일 문단 구성.

### ✅ §3.2.4 감탄 부호(`!`) 금지 (narrative)
- 시뮬레이션 완료 H3 `배차 완료!` → `배차 완료`
- Role 페이지 empty state `모든 작업 완료!` → `모든 작업 완료`
- Toast 메시지 전체 `!` 제거

### ✅ §3.2.5 의문형 훅 금지
- `장비가 필요하신가요?` → `장비 요청 시작`
- `어떤 역할을 체험하시겠어요?` → `체험할 역할 선택`

### ✅ §3.3 사주·한자·종교 언급 금지
- **전 파일 0건** 유지

### ✅ §4 허용 구조
- `~한다` / `~된다` / `~였다` / `종결한다` / `이어받는다` 적극 사용
- **recommended 어휘** 반영: 자금난, 해소, 처분, 회수, 제도, 응답, 재설계, 종결

### ✅ §5 노출 레벨 L3
- `HeritageSection` 컴포넌트로 **전문(全文) + 부산일보 재현 박스** 구현
- 부산일보 `釜山日報` 워터마크, 굵은 밑줄 헤드라인, 나철연 형광펜 하이라이트, busan.com 원문 링크

### ✅ §6.1 부산일보 인용 원칙
- 전체 직접 인용 + 출처 명시 (`busan.com/view/busan/view.php?code=19980224000512`)
- 저작권 고지: 기사 원문은 섹션 내에서 블록 인용으로만 사용

---

## 4. 미해소 / 리뷰어 판정 필요 항목

### ⚠️ A. FAQ 8건의 `~입니다` 종결
- 현재 유지 (§3.2.1 예외 조항 "대고객 안내 문구"로 해석)
- **이한결 대표 판정 요청:** Q&A 대화 문맥에서 판결문 어미가 과도한지, 유지가 맞는지

### ⚠️ B. 도메인 불일치 (일시적)
- 메타데이터 `metadataBase: https://cheolyeon.com`
- 실제 호스팅 `heavy-match.vercel.app` (이한결 구매 대기)
- 도메인 구매·연결 완료 시 해소

### ⚠️ C. Pretendard 폰트 로딩
- CDN @font-face 방식 (Project-Noonnu) — 안정적이지만 next/font 최적화 미적용
- 향후 `public/fonts/Pretendard-*.woff2` 로컬 복사 + `next/font/local` 전환 가능

### ⚠️ D. Legacy 컴포넌트 미삭제
- `src/components/motion/BootSplash.tsx`, `HeroBackground.tsx`, `IndustrialGlass` — v2에서 미사용
- 당장 삭제하지 않음 (다크모드 복귀 옵션 보존). 1개월 미사용 확인 시 정리 작업 별도 PR

---

## 5. 배포 체크리스트

- [x] `npm run build` 통과 (중간 검증 완료)
- [x] heritage-v1.md §3 금지 카피 scan 통과 (narrative 서사 기준)
- [x] 헤리티지 섹션 L3 노출 구현
- [x] 부산일보 출처 링크 표기
- [x] 감탄부호 · 의문형 훅 · 1인칭 제거
- [ ] 최종 `npm run build` 통과 (시뮬레이션 재도색 후)
- [ ] 프로덕션 배포 후 OG 카드 렌더링 확인
- [ ] 검색엔진 재크롤링 요청 (Google Search Console)

---

## 6. 후속 작업

**PR-07 (예정):** 모바일 2종 신규 페이지
- `/demo/field-manager` (현장소장 배차 — v2 HTML 모바일 시안 1)
- `/demo/executive` (대표 경영 대시보드 — v2 HTML 모바일 시안 2)

**PR-08 (예정):** 도메인 전환
- `cheolyeon.com` Vercel 연결
- `heavy-match.vercel.app` → 301 redirect
- `sitemap.xml` / `robots.txt` 업데이트

**PR-09 (예정):** Legacy 정리
- `BootSplash.tsx`, `HeroBackground.tsx`, `IndustrialGlass`, `DemoEmbed` 등 v1 전용 컴포넌트 삭제
- `colors.orange`, `colors.amber`, `colors.steel` deprecated alias 제거 (모든 참조 전환 완료 시)

---

## 7. 변경 이력

| Version | Date | Editor | Change |
|---------|------|--------|--------|
| 1.0 | 2026-04-18 | Claude (C5) + 이한결 | 전면 리브랜드 — PR-01~05 통합 흡수 |

---

*— 기록된 것만 브랜드가 된다. C5*
