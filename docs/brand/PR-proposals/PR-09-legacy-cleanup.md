# PR-09 · Legacy 정리 (v1 Masterpiece Dark 자산 제거)

**심각도:** 🟢 Refactor (기능 영향 없음)
**범위:** 6개 파일 삭제 + tokens.ts deprecated alias 제거 + IndustrialGlass 제거
**상태:** 구현 완료 (빌드 검증 통과)

---

## 0. 배경

PR-06에서 v1 Masterpiece Dark → v2 HD Navy Light 전환 시, v1 전용 자산을 **일시 보존** 했다. 다크모드 복귀 옵션 확보 목적이었다. 1일 경과 시점에 전면 리브랜드 결정이 확정되었고, 이한결 대표의 요청으로 legacy 자산을 **완전 제거** 한다.

---

## 1. 삭제된 파일 (6개)

### 1.1 `src/app/page.old.tsx`
v1 Masterpiece 랜딩 백업. PR-06 이후 미참조. Git history로 복구 가능.

### 1.2 `src/components/motion/BootSplash.tsx`
v1 부팅 스플래시 (3초 로고 페이드). v2에서는 라이트 테마 즉시 렌더로 불필요.

### 1.3 `src/components/motion/HeroBackground.tsx`
v1 Hero 섹션의 어두운 radial/grid 배경. v2 Hero는 라이트 gradient로 대체됨.

### 1.4 `src/components/landing/LandingSections.tsx`
v1 `LiveDashboardPreview`, `ROICalculator`, `DemoEmbed`, `ArchitectureDiagram` 묶음 컴포넌트. 새 `page.tsx`에서 미사용. `LiveDashboardPreview` 기능은 `src/components/cheolyeon/LivePreviewCard.tsx`가 대체.

### 1.5 `src/components/landing/TrustSections.tsx`
v1 `SocialProof`, `OnboardingTimeline`. 새 `page.tsx`에서 미사용. Stats Strip이 유사 역할 수행.

### 1.6 `src/lib/design-system/theme.ts`
`semanticTokens`, `componentThemes`, `tailwindThemeVars` 정의. **전체 프로젝트에서 import 0건** — 완전한 dead code. 거의 모든 v1 orange/steel 참조가 여기 집중되어 있었음.

---

## 2. 수정된 파일

### 2.1 `src/lib/design-system/index.ts`
- `theme.ts` re-export 제거
- `generateCSSVars` 추가 export (tokens.ts 공개 표면 확장)

### 2.2 `src/lib/design-system/tokens.ts`
**제거된 deprecated alias:**
- `colors.black` → 값 `#0A1628`. 대체: `colors.ink`
- `colors.orange.*` → 전체 navy 리다이렉트. 대체: `colors.navy.*`
- `colors.amber.*` → 전체 cyan 리다이렉트. 대체: `colors.cyan.*`
- `colors.steel.*` → 전체 ink9 리다이렉트. 대체: `colors.ink9.*`

**제거 전 최종 참조 검사:**
```bash
grep -rn "colors\\.orange\\|colors\\.amber\\|colors\\.steel\\|colors\\.black"
# → theme.ts 외 참조 0건 (theme.ts는 함께 삭제)
```

결과: **외부 코드 전혀 영향 없음**. Tailwind arbitrary value 하드코딩 (`text-[#FF6B1A]` 등)은 이미 PR-06에서 Navy로 일괄 치환 완료.

### 2.3 `src/components/motion/MotionPrimitives.tsx`
- `IndustrialGlass` export 제거
  - 정의는 있었으나 **프로젝트 전체 import 0건**
  - v2 노선에서는 Navy 기반 라이트 글래스가 필요할 시 `tokens.blur.usage.*` 를 직접 참조하여 인라인 구성

---

## 3. Before / After 크기 비교

| 항목 | Before | After | 감소 |
|------|--------|-------|------|
| `src/components/motion/*.tsx` | 5 파일 | 3 파일 | -2 |
| `src/components/landing/*.tsx` | 3 파일 | 1 파일 | -2 |
| `src/lib/design-system/*.ts` | 3 파일 | 2 파일 | -1 |
| `src/app/page.old.tsx` | 1 파일 | 0 파일 | -1 |
| **합계** | | | **-6 파일** |

`tokens.ts` color export 그룹:
- Before: 12 그룹 (foundation + surface + navy + cyan + orange + amber + ink9 + ink1~4 + line + steel + semantic + status)
- After: 9 그룹 (foundation + surface + navy + cyan + ink9 + ink1~4 + line + semantic + status)
- 감소: -3 그룹 (orange, amber, steel 제거)

---

## 4. 회귀 테스트

### 빌드
```
npm run build
✓ 40 routes compiled cleanly  (sitemap/robots 2개 추가 + field-manager + executive 2개)
✓ TypeScript: 0 errors
✓ Exit code: 0
```

### 런타임 (수동 확인 권장)
- [ ] `/` 랜딩 — Navy primary 유지, 오렌지 잔재 없음
- [ ] `/demo` — 라이트 카드 + Navy 강조, 다크 배경 잔재 없음
- [ ] `/demo/simulation` — 3시나리오 전부 정상 재생
- [ ] `/demo/[role]` — 6역할 전부 로딩 오류 없음
- [ ] `/(dashboard)/*` — 대시보드 레이아웃 로딩 시 `Heavy Match` 표기 0건

---

## 5. 향후 정리 대상 (별도 PR)

### 5.1 `tokens.ts` — `motion` 토큰 내부 정리
- `motion.duration.splash: 3000ms` — BootSplash 제거로 참조 없어짐. 안전하게 제거 가능.
- `animation.duration.splash: "3000ms"` 동일.

### 5.2 `tokens.ts` — `blur.usage` 활용도
- `blur.usage.overlay` — v2 라이트 테마에서 활용 사례 없음. 모달 백드롭 구현 시 재검토.

### 5.3 CSS 변수 네이밍
- `--color-hm-*` prefix를 legacy alias로 남겨둠 (Tailwind arbitrary value 호환)
- 전부 `--cy-*` 로 통일하는 작업은 대규모 grep-replace 필요 → 별도 PR

### 5.4 `src/components/motion/NativeFeel.tsx`
- 시뮬레이션 전용 프리미티브 8종. v2 라이트 테마로 잘 동작하나 일부 색상 하드코딩 (`#FF6B1A` 흔적 확인 필요 시 별도 스캔)

---

## 6. 변경 이력

| Version | Date | Editor | Change |
|---------|------|--------|--------|
| 1.0 | 2026-04-18 | Claude (C5) + 이한결 | Legacy 6파일 삭제, deprecated alias 제거, IndustrialGlass 제거 |

---

*— 유지되지 않는 것은 기록하지 않는다.*
