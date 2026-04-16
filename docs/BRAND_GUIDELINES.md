# HEAVY MATCH Brand Guidelines

> 중장비 배차 매칭 플랫폼의 시각 아이덴티티 시스템

---

## 1. Brand Essence

**HEAVY MATCH**는 건설 현장의 중장비를 60초 안에 매칭하는 B2B 플랫폼입니다.

### Brand Attributes
- **무게감 (Weight)** — 중장비 산업의 물리적 존재감
- **정밀함 (Precision)** — 60초 타이머, 3단계 폴백의 시스템 정확성
- **신뢰 (Trust)** — 8,000만원 엔터프라이즈 솔루션의 견고함
- **속도 (Speed)** — 실시간 매칭, 선착순 공유콜의 긴급성

### Brand Voice
- **톤**: 전문적이면서 직관적. 건설 현장 사장님(40-60대)도, IT 임원도 이해하는 언어.
- **금지어**: "혁신적인", "최첨단", "원클릭" (과대광고 느낌)
- **권장어**: "실시간", "즉시", "자동", "검증된", "투명한"

---

## 2. Logo

### Monogram (HM)
- `H` = 흰색 (구조, 안정성)
- `M` = Safety Orange (에너지, 매칭)
- 하단 오렌지 바 = 연결, 브릿지

### Usage Rules
- 최소 크기: 32px (디지털), 12mm (인쇄)
- 여백: 로고 높이의 50% 이상
- 배경: 다크 배경 전용 (라이트 배경 시 반전 버전 사용)
- 변형 금지: 회전, 비율 변경, 색상 변경 금지

### Logo Files
- `/public/logo/hm-monogram.svg` — 모노그램 단독
- `/public/logo/hm-wordmark.svg` — 워드마크 단독
- `/public/logo/hm-full.svg` — 모노그램 + 워드마크 조합

---

## 3. Color System

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Black | `#0A0A0B` | 페이지 배경 (Pure #000 금지) |
| Surface Base | `#121216` | 가장 깊은 배경 |
| Surface Raised | `#1A1A20` | 카드, 패널 |
| Surface Elevated | `#242428` | 호버, 활성 상태 |

### Signature Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Safety Orange | `#FF6B1A` | CTA, 브랜드 액센트, 전용콜 상태 |
| Amber | `#FFA523` | 하이라이트, 배지, 경고 |

### Steel (Neutral)

| Token | Hex | Usage |
|-------|-----|-------|
| Steel 700 | `#3A3D45` | 구분선, 비활성 보더 |
| Steel 500 | `#6B7280` | 본문 텍스트 |
| Steel 400 | `#9CA3AF` | 보조 텍스트 |
| Steel 300 | `#D1D5DB` | 활성 텍스트 |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| Success | `#10B981` | 매칭 완료, 수락 |
| Danger | `#EF4444` | 취소, 거절, 에러 |
| Warning | `#F59E0B` | 타이머, 주의 |
| Info | `#3B82F6` | 공유콜, 정보 |

---

## 4. Typography

### Font Stack
- **Display/Heading**: Pretendard Black + Inter Tight
- **Body**: Pretendard Regular/Medium
- **Data/Code**: JetBrains Mono

### Type Scale (Perfect Fourth, 1.333 ratio)

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| Hero | clamp(48px, 8vw, 120px) | 900 | 랜딩 메인 타이틀 |
| 5xl | 87px | 900 | 섹션 키 넘버 |
| 4xl | 65px | 800 | 섹션 타이틀 |
| 3xl | 49px | 800 | 서브 타이틀 |
| 2xl | 37px | 700 | 카드 헤딩 |
| xl | 28px | 700 | 소제목 |
| lg | 21px | 600 | 리드 텍스트 |
| base | 16px | 400 | 본문 |
| sm | 14px | 400 | 캡션, 라벨 |
| xs | 12px | 500 | 배지, 메타 |

### Letter Spacing
- Display: `-0.03em` (조밀한 무게감)
- Heading: `-0.02em`
- Body: `-0.01em`
- Badge/Label: `0.05em` (대문자 조합 시)

---

## 5. Layout

### Grid System
- **8pt grid** 전체 적용
- Max container: 1440px
- Content width: 1280px
- Narrow content: 960px

### Section Spacing
- Desktop (1024px+): 120px 상하
- Tablet (768-1023px): 80px
- Mobile (-768px): 48px

### Golden Ratio (1.618)
- Hero 높이 비율, 카드 가로:세로, 텍스트 블록 간격에 적용

---

## 6. Equipment Icons

8종 장비 아이콘은 커스텀 SVG로 제작.
이모지(🏗️⛏️🔝💧📦🚚🚛🕷️) 사용 금지.

| 장비 | 컴포넌트 | 특징 |
|------|---------|------|
| 크레인 | `CraneIcon` | 붐 라인 + 와이어 |
| 스카이 | `SkyIcon` | 고소 붐 + 바스켓 |
| 카고크레인 | `CargoCraneIcon` | 트럭 + 붐 |
| 거미크레인 | `SpiderCraneIcon` | 4다리 + 붐 |
| 펌프카 | `PumpTruckIcon` | 배관 라인 |
| 굴삭기 | `ExcavatorIcon` | 암 + 버킷 |
| 지게차 | `ForkliftIcon` | 포크 + 마스트 |
| 덤프 | `DumpTruckIcon` | 적재함 + 캡 |

스타일: `currentColor` (라인) + `#FF6B1A` (액센트 포인트)

---

## 7. Motion System (Native-Feel Physics)

### Spring Physics
모든 UI 전환은 CSS `transition`이 아닌 **Framer Motion spring**을 기본으로 사용.
자연스러운 관성과 탄성이 "네이티브 앱" 느낌의 핵심.

| Spring Preset | Stiffness | Damping | 용도 |
|---------------|-----------|---------|------|
| `snappy` | 400 | 30 | 버튼 press, 탭 피드백 |
| `smooth` | 200 | 25 | 카드 호버, 일반 전환 |
| `gentle` | 120 | 20 | 페이지 전환, 큰 UI 이동 |
| `bouncy` | 300 | 15 | 모달 등장, 알림 팝업 |

### Duration (Apple HIG 기반)

| Name | Ms | 인간 인지 |
|------|----|-----------|
| `instant` | 100ms | 즉각 반응 임계값 (버튼 press) |
| `fast` | 200ms | hover 자연스러움 |
| `normal` | 300ms | 기본 전환 |
| `slow` | 500ms | 큰 UI 변화 (패널 열기) |
| `deliberate` | 800ms | 의도적 attention grabbing |

### 시각적 햅틱 (Visual Haptic)
물리적 진동 없이 시각적으로 "눌림"을 전달하는 패턴:

- **Press**: `scale: 0.97` / 100ms — 버튼 누를 때 3% 축소
- **Lift**: `scale: 1.02` / 200ms — 카드 호버 시 2% 확대
- **Attention**: `scale: [1, 1.05, 1]` / 400ms — 알림 배지 펄스

### 인터랙션 규칙 (엄격 준수)

| 요소 | Hover | Press | 전환 |
|------|-------|-------|------|
| 모든 버튼 | `spring.snappy` + `haptic.lift` | `haptic.press` (scale 0.97) | - |
| 모든 카드 | `spring.smooth` + y축 -2px | `haptic.press` | - |
| 페이지 전환 | - | - | `spring.gentle` + fade |
| 모달 등장 | - | - | `spring.bouncy` + scale 0.95→1 |
| 리스트 아이템 | `stagger: 0.08s` 순차 등장 | - | - |
| 스크롤 | momentum (iOS overscroll-behavior) | - | - |

### Easing Functions

| Name | Curve | 용도 |
|------|-------|------|
| `standard` | `(0.4, 0, 0.2, 1)` | 기본 등가감속 |
| `decelerate` | `(0, 0, 0.2, 1)` | 등장 (빠르게 나타나서 안착) |
| `accelerate` | `(0.4, 0, 1, 1)` | 퇴장 (천천히 떠남) |
| `sharp` | `(0.4, 0, 0.6, 1)` | 임시 상태 (스낵바 등) |
| `heavy` | `(0.7, 0, 0.3, 1)` | 중장비 무게감 (커스텀) |

---

## 8. Industrial Glass

### 원칙
Apple Liquid Glass와 **명확히 차별화** — 완전 투명 유리는 사용하지 않음.
대신 **"frosted metal"**: 서리 낀 금속판 느낌.

### 구현
```
backdrop-filter: blur(Xpx) saturate(Y%);
background: rgba(18, 18, 22, 0.8);
border: 1px solid rgba(58, 61, 69, 0.3);
```

### 강도 단계

| 레벨 | Blur | Saturate | BG Opacity | 적용 대상 |
|------|------|----------|-----------|-----------|
| `subtle` | 12px | 150% | 75% | 헤더, 사이드바 |
| `medium` | 20px | 180% | 82% | 모달 백드롭 |
| `strong` | 40px | 200% | 90% | 풀스크린 오버레이 |

### 적용 제한 (과용 금지)
- ✅ 헤더 (고정 네비게이션) — `subtle`
- ✅ 모달 (다이얼로그) — `medium`
- ✅ 오버레이 (스플래시, 가이드 투어) — `strong`
- ✅ 모바일 드로어 사이드바 — `subtle`
- ❌ 일반 카드 — 카드는 불투명 `surface.raised` 사용
- ❌ 버튼 — 버튼은 솔리드 컬러만
- ❌ 인풋 필드 — 가독성 저하

---

## 9. Do's and Don'ts

### Do
- Dark background 기본 사용
- Safety Orange를 CTA와 핵심 액센트에 집중
- 커스텀 SVG 아이콘 사용
- JetBrains Mono로 숫자/데이터 표시
- 8pt 그리드 준수

### Don't
- Pure black (#000000) 사용
- 이모지를 UI 구성 요소로 사용
- 과도한 그래디언트 (오렌지 한정 OK)
- 스톡 사진 사용
- Material Symbols를 그대로 사용 (커스텀 SVG 우선)
- "Powered by Vercel" 등 무료 티어 흔적 노출

---

*HEAVY MATCH Brand Guidelines v1.0 — BYTEFORCE*
