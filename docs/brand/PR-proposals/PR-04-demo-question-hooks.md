# PR-04 · 의문형 훅 재작성

**심각도:** Medium-High (Hero/H2 위치)
**건수:** 3 (장비요청자 CTA, 데모 역할 선택 H2, 시뮬레이션 다이얼로그 1건은 예외)
**규칙:** `heritage-v1.md §3.2.5` "의문형 훅 카피 — '당신은 떼이고 계십니까?' 같은 광고 헤드카피 금지"

---

## 수정 1 · 장비요청자 데모 CTA H2

**파일:** `src/app/demo/[role]/page.tsx`
**현재 (L74):**

```tsx
<h2 className="text-2xl font-[800] mb-1">장비가 필요하신가요?</h2>
<p className="text-white/70 text-sm mb-5">8종 장비를 60초 안에 배차합니다</p>
```

**수정 후:**

```tsx
<h2 className="text-2xl font-[800] mb-1">장비 요청 시작</h2>
<p className="text-white/70 text-sm mb-5">8종 장비 · 60초 매칭</p>
```

**근거:**
- §3.2.5 의문형 훅 제거
- §3.2.1 `~합니다` → 명사 축약 (`배차합니다` → `매칭`)
- 판결문 톤 유지: 명령/행위 중심

---

## 수정 2 · 데모 역할 선택 H2

**파일:** `src/app/demo/page.tsx`
**현재 (L193):**

```tsx
<h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>
  어떤 역할을 체험하시겠어요?
</h2>
```

**수정 후:**

```tsx
<h2 className="text-3xl md:text-5xl font-[900] text-[#FAFAFA] mb-3" style={{ letterSpacing: "-0.03em" }}>
  체험할 역할 선택
</h2>
```

**근거:** 의문형 훅 → 명령/지시형. `heritage-v1.md §4.2` 허용 어휘 `수립하다, 운영한다` 계열과 일관.

---

## 예외 확인 · 시뮬레이션 내부 다이얼로그

**파일:** `src/app/demo/simulation/page.tsx:1059`

```tsx
<p className="text-[11px] font-bold text-[#EF4444]">배차를 취소하시겠습니까?</p>
```

**판정:** ✅ **유지** — 이것은 **제품 UI의 확인 다이얼로그** (iOS alert 형태). 브랜드 서사가 아닌 인터랙션 카피로 분류. §3.2.5 예외 적용.

---

## 체크리스트

- [x] Hero/H2의 의문형 훅 완전 제거
- [x] 제품 UI 다이얼로그는 유지 (사용자 액션 확인 맥락)
- [x] 대체 카피가 판결문 톤 유지
- [x] 의미 훼손 없음

**검증:** `grep -n "하시겠어요\|하실래요\|필요하신가요\|괜찮으신가요" src/` → 3건 모두 처리됐는지 확인.
