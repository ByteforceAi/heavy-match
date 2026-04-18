# PR-07 · 모바일 2종 신규 페이지 (/demo/field-manager, /demo/executive)

**심각도:** 🟢 Feature (디자인 자산 완성)
**범위:** 신규 페이지 2개 + `/demo` 인트로 업데이트
**규칙:** `docs/brand/heritage-v1.md` v1.0 준수
**레퍼런스:** `docs/design/cheolyeon-v2-ref.html` (≈ `Downloads/cheolyeon_v2.html`) `.m1`, `.m2` 블록
**상태:** 구현 완료 (빌드 검증 통과)

---

## 0. 배경

PR-06 전면 리브랜드는 **데스크톱 웹 랜딩**만 이식했고, cheolyeon_v2.html이 나란히 제시하는 **모바일 2종** 은 누락되었다. v2 브랜드 쇼케이스는 "3개 디바이스를 한 눈에" 구성으로 설계되어 있으므로, 모바일 2종이 없으면 **디자인 자산의 2/3가 미구현** 상태였다.

본 PR은 해당 갭을 채운다.

---

## 1. 신규 페이지

### 1.1 `/demo/field-manager` · 현장소장 배차 화면

| 요소 | 구현 |
|------|------|
| Status bar | `9:41 · ● ● ● ●` 모바일 상태바 목업 |
| Navy Top Hero | `#002C5F` 배경, 하단 라운드 `0 0 24px 24px`, 알림벨 (white/15 박스, 빨간 도트 badge), "김민철 소장님", 현장 카드 "해운대 센텀 2공구" + "가동중" 시안 배지 |
| CTA Gradient Card | `#0046A4 → #002C5F` 그라디언트, top-right radial 시안 글로우, LIVE 배지 (green pulse dot), H2 **"지금 배차 요청"** (§3.2.5 회피), 서브 "평균 매칭 2분 · 떼임 방지 보장", 흰색 버튼 "장비 요청 →" |
| 장비 4-grid | 굴삭기·크레인·덤프·지게차. `#E8F1FB` 아이콘 배경, `#002C5F` 아이콘 |
| 최근 배차 3-card | 진행중/완료/승인대기 뱃지 (color-coded), 가격 `tabular-nums mono`, 시간 캡션 |
| Bottom tab bar | 5-cell (홈 active, 배차, FAB slot, 계약·정산, 내 정보) + 중앙 네이비 FAB with `+` |

### 1.2 `/demo/executive` · 대표 경영 대시보드

| 요소 | 구현 |
|------|------|
| Status bar | 모바일 상태바 |
| White Header | 로고 `철연 / CHEOLYEON` (Pretendard 900 + mono tracking) + 아바타 `이`, "📊 경영 리포트 · 2026-04" + "4월 3주차" (navy-pale 배경) |
| Big KPI Card | `#004A99 → #002C5F → #001A3D` 3-stop gradient, bottom-right 장식 radial circles, "이번 달 보호 정산액" 라벨 + **₩83,240,000** (32px black), "+23.4%" green badge, 3-metric row (진행 12 / 대기 3 / 완료 47) |
| 2-col mini stats | 배차 성공률 `99.3%` (+0.5% ↑) · 평균 매칭 `2분 12초` (-18초 ↓) |
| Weekly area chart | 7-point SVG area chart, navy line + navy gradient fill, 일요일 시안 강조 |
| Alerts 2종 | 정산 지연 (red left-border, `₩2,800,000 · 48시간 경과`) + 신규 파트너 (yellow left-border) |

### 1.3 `/demo` 인트로 업데이트

역할 6-card 그리드 **상단에 모바일 2종 쇼케이스 배너** 추가 (선택). 모바일 2종은 실제 역할과 독립된 "디자인 미리보기" 성격이므로 명확히 구분.

---

## 2. heritage-v1.md 규칙 준수

### ✅ §3.2.5 의문형 훅 회피
- HTML 원문: `현장에 뭐가 필요하세요?` (H2) → **의문형 훅 위반**
- 구현: `지금 배차 요청` 으로 대체 (평서형 CTA)

### ✅ §3.2.1 `~입니다` 회피
- "평균 매칭 2분 · 떼임 방지 보장" — 체언 종결로 정보성 유지
- Alerts 본문 전부 정보 나열 (동사 종결 최소화)

### ✅ §3.2.4 감탄 부호 0건
### ✅ §3.1 `우리` 1인칭 0건

---

## 3. 디자인 정합성

### 컬러 매핑 (HTML → 구현)
| HTML `var(--*)` | 구현 `#hex` |
|-----------------|-------------|
| `--brand` `#002C5F` | `#002C5F` |
| `--brand-dark` `#001A3D` | `#001A3D` |
| `--brand-mid` `#0046A4` | `#0046A4` |
| `--brand-light` `#4A90E2` | `#4A90E2` |
| `--brand-pale` `#E8F1FB` | `#E8F1FB` |
| `--brand-accent` `#00AAD2` | `#00AAD2` |
| `--ok` `#00A86B` | `#00A86B` |
| `--warn` `#FFB020` | `#FFB020` |
| `--err` `#E5484D` | `#E5484D` |
| `--ink` `#0A1628` | `#0A1628` |
| `--ink-2` `#3A4A5F` | `#3A4A5F` |
| `--ink-3` `#6B7B8F` | `#6B7B8F` |
| `--bg` `#F4F6FA` | `#F4F6FA` |
| `--line` `#E3E8EF` | `#E3E8EF` |

### 폰트
- 본문 · 헤드라인: `var(--font-pretendard)` (globals.css CDN @font-face)
- 숫자·라벨·출처: `var(--font-roboto-mono)` (next/font Google)

### 섀도
- 카드 rest: `0 4px 12px rgba(0, 44, 95, 0.06)`
- 히어로 카드: `0 10px 30px rgba(0, 44, 95, 0.06)`
- CTA 그라디언트: `0 8px 20px rgba(0, 44, 95, 0.25)`

---

## 4. 후속 작업

- **PR-07b (옵션):** `/showcase` 단일 페이지 — 3개 디바이스(모바일1 + 모바일2 + 데스크톱 미니)를 나란히 보여주는 **브랜드 쇼케이스** 페이지. 영업 제안 시 한 링크로 공유.
- **PR-07c (옵션):** 모바일 2종에 실제 터치 인터랙션 추가 — 현재는 정적 UI. 탭/스와이프 제스처 붙이면 "실제 앱처럼" 체감 강화.

---

## 5. 변경 이력

| Version | Date | Editor | Change |
|---------|------|--------|--------|
| 1.0 | 2026-04-18 | Claude (C5) + 이한결 | 모바일 2종 신규 페이지 구현 |

---

*— 3개 디바이스가 나란히 놓여야 v2 브랜드가 완성된다.*
