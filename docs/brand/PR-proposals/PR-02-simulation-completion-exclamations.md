# PR-02 · 시뮬레이션 완료 H3 감탄 부호 제거

**심각도:** 🔴 High
**건수:** 2 (핵심 narrative H3) + 선택적 8 (device UI 내부)
**규칙:** `heritage-v1.md §3.2.4` "감탄 부호(!) — 철연 공식 서사에서 사용 금지"

---

## 원칙 구분

§3.2.6 **제품 UI는 이모지 예외** 조항이 있지만, 감탄 부호(`!`)는 **예외 조항 없음**. 단, 다음 기준으로 구분:

| 맥락 | 판정 |
|------|------|
| **페이지 레벨 H3 (브랜드 서사)** | 🔴 Strict — 즉시 제거 |
| **Device UI 내부 알림/뱃지** (in-phone notification) | ⚠️ Optional — 제품 UI 관례 허용 |
| **버튼 스테이지 라벨** (`"시작!"`) | ✅ Interaction — 허용 (단, 추가 리뷰) |
| **Toast 메시지** | ✅ Interaction — 허용 |

---

## 필수 수정 · Narrative H3 2건

### 파일: `src/app/demo/simulation/page.tsx`

**현재 (line 1625):**

```tsx
<motion.h3
  …
  className="text-2xl md:text-3xl font-[900] text-white"
  style={{ letterSpacing: "-0.03em" }}
>
  배차 완료!
</motion.h3>
```

**수정 후:**

```tsx
<motion.h3
  …
  className="text-2xl md:text-3xl font-[900] text-white"
  style={{ letterSpacing: "-0.03em" }}
>
  배차 완료
</motion.h3>
```

---

**현재 (line 1682):**

```tsx
<h3>에스컬레이션 후 배차 완료!</h3>
```

**수정 후:**

```tsx
<h3>에스컬레이션 후 배차 완료</h3>
```

**근거:** 이 두 H3는 시나리오 재생 직후 페이지 전면에 노출되는 결과 페이지 상단 헤드라인. 사용자 입장에서 **제품이 "축하해주는" 톤이 아니라 "기록을 종결하는" 톤**이 되어야 철연 서사와 일치.

---

## 선택 수정 · Device UI 내부 (리뷰어 결정)

다음은 in-device notification 카드/뱃지로, 실제 제품 UI 관례상 `!` 허용 가능. 엄격 통일을 원할 경우 함께 제거:

- L263: `📩 배차 매칭 완료!`
- L950: `⚡ 수락!`
- L984: `배차 매칭 완료!` (내부 notification)
- L994: `선착순 수락 성공!`

**권장:** 페이지 레벨 H3 2건만 필수, 나머지는 유지 (Toast/Notification 관례).

---

## 체크리스트

- [x] 감탄 부호 제거
- [x] 의미 훼손 없음 (완료/종결 의미 유지)
- [x] 판결문 어미 일치 (`~완료` = 명사형 종결)

**검증:** 수정 후 시나리오 A 재생 → 결과 H3 "배차 완료" 노출 확인.
