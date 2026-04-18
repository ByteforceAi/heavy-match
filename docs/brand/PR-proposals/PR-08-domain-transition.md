# PR-08 · 도메인 전환 준비 (cheolyeon.com)

**심각도:** 🟡 Infra (유저 외부 액션 필요)
**범위:** Next.js metadata 파일 컨벤션 + 도메인 구매·연결 체크리스트
**상태:** 코드 준비 완료, 도메인 구매·연결은 이한결 대표 담당

---

## 0. 배경

PR-06 리브랜드로 `metadataBase: https://cheolyeon.com` 이 선언되었으나, 실제 호스팅은 `heavy-match.vercel.app`에 머물러 있다. 본 PR은 **도메인 연결 시 필요한 코드 사전 준비**를 완료한다.

도메인 구매·네임서버 설정은 이한결 대표가 직접 수행한다.

---

## 1. 코드 변경 (완료)

### 1.1 `src/app/sitemap.ts` — 신규

Next.js 16 App Router 파일 컨벤션. 빌드 시 `/sitemap.xml` 자동 생성.

**인덱싱 대상:**
- `/` (priority 1.0)
- `/demo` (0.9)
- `/demo/simulation` (0.85)
- `/demo/field-manager` · `/demo/executive` (0.7)
- `/demo/{6역할}` (0.6)

**인덱싱 제외:** `/login`, `/register`, `/(dashboard)/*`, `/api/*` — 사용자 인증 및 내부 API

### 1.2 `src/app/robots.ts` — 신규

Next.js 16 `MetadataRoute.Robots` 컨벤션. 빌드 시 `/robots.txt` 자동 생성.

- `User-agent: *` — 마케팅 표면 전체 허용, 민감 경로 차단
- `User-agent: Googlebot` — 파라미터 쿼리스트링 차단 (`/*?*`)
- `Sitemap: https://cheolyeon.com/sitemap.xml`
- `Host: https://cheolyeon.com`

### 1.3 `src/app/layout.tsx` — PR-06에서 이미 적용
- `metadataBase: new URL("https://cheolyeon.com")`
- OG `url: "https://cheolyeon.com"`
- `themeColor: "#002C5F"`

---

## 2. 이한결 대표 체크리스트 (외부 액션)

### A. 도메인 구매
- [ ] `cheolyeon.com` 가비아/후이즈/Namecheap 등에서 구매
- [ ] 대체 철자 함께 확보 권장: `cheolyeon.kr`, `철연.kr` (한글 IDN)

### B. Vercel 프로젝트 연결
1. [ ] Vercel 대시보드 → 프로젝트 → **Settings → Domains**
2. [ ] "Add" 클릭 → `cheolyeon.com` + `www.cheolyeon.com` 추가
3. [ ] Vercel이 알려주는 DNS 레코드로 네임서버 설정:
   - Apex (`cheolyeon.com`) → A 레코드 `76.76.21.21`
   - `www` → CNAME `cname.vercel-dns.com`
4. [ ] `www.cheolyeon.com` → `cheolyeon.com` redirect (Vercel UI에서 설정)
5. [ ] SSL 인증서 자동 발급 대기 (Let's Encrypt, 보통 5분 이내)

### C. 기존 도메인 리다이렉트
- [ ] Vercel 프로젝트에 `heavy-match.vercel.app` 유지 (Vercel 무료 subdomain)
- [ ] `heavy-match.vercel.app` → `cheolyeon.com` **301 영구 리다이렉트** 구성
  - Vercel Redirects: `vercel.json` 또는 `next.config.js`의 `async redirects()`
  - 예시:
    ```json
    {
      "redirects": [
        {
          "source": "/:path*",
          "has": [{"type": "host", "value": "heavy-match.vercel.app"}],
          "destination": "https://cheolyeon.com/:path*",
          "permanent": true
        }
      ]
    }
    ```

### D. 검색엔진 갱신
- [ ] Google Search Console → 신규 속성 `cheolyeon.com` 등록
- [ ] 사이트맵 제출: `https://cheolyeon.com/sitemap.xml`
- [ ] 기존 `heavy-match.vercel.app` 속성에서 **주소 변경 도구** 실행 (301 redirect 기반 자동 전이)
- [ ] Naver Search Advisor → `cheolyeon.com` 등록 + 사이트맵 제출

### E. OG 이미지 제작
- [ ] `public/og-image.png` 교체 — 현재는 v1 "Heavy Match" 이미지 가능성
- [ ] 권장 사이즈: 1200 × 630 px
- [ ] 내용: 철연 CHEOLYEON 워드마크 + 태그라인 "1998 → 2026"
- [ ] `apple-touch-icon` (180×180), `favicon.ico` (여러 사이즈)도 브랜드 교체

### F. 외부 표기 업데이트
- [ ] 이메일 서명 (`contact@cheolyeon.com` 발급 + MX 레코드 설정)
- [ ] 회사 소개서 (`.pptx`/`.pdf`)
- [ ] 명함 발주 (heritage-v1.md §5 L0 태그라인)
- [ ] Slack/Discord 워크스페이스 이름
- [ ] GitHub 레포 이름 변경 검토 (`heavy-match` → `cheolyeon`, 단 URL 깨짐 감수 필요)

---

## 3. 검증 방법 (도메인 연결 후)

```bash
# 301 redirect 확인
curl -I https://heavy-match.vercel.app/
# HTTP/2 301
# location: https://cheolyeon.com/

# 사이트맵 접근성 확인
curl https://cheolyeon.com/sitemap.xml
curl https://cheolyeon.com/robots.txt

# OG 카드 렌더링 확인 (수동 brute)
# https://www.opengraph.xyz/url/cheolyeon.com
# https://cards-dev.twitter.com/validator
```

---

## 4. 주의사항

### 🟡 GitHub 레포 이름 변경 고려
- GitHub은 레포 이름 변경 시 **이전 URL이 자동 redirect** 되지만, 일부 CI/CD 토큰·웹훅은 재설정 필요
- Vercel 프로젝트의 "Connected Git Repository" 설정도 재동기화 필요
- 이한결 대표 판단에 따라 이번 리브랜드에 포함하거나 다음 PR로 분리

### 🟡 DNS 전파 지연
- 글로벌 DNS 전파: 보통 5분 ~ 48시간
- 캐시된 브라우저는 구 도메인을 계속 참조 — 하드 리로드(`Ctrl+Shift+R`) 안내 필요

### 🟡 구 URL 외부 공유 자산
- 지금까지 `heavy-match.vercel.app`을 공유한 이메일/문서/SNS 포스트 존재 가능
- 301 redirect가 이들을 모두 잡아주므로 **선제적 찾기·교체는 선택 사항**

---

## 5. 변경 이력

| Version | Date | Editor | Change |
|---------|------|--------|--------|
| 1.0 | 2026-04-18 | Claude (C5) + 이한결 | sitemap + robots 구성 + 도메인 체크리스트 |

---

*— 도메인은 구매되는 순간부터 브랜드가 된다.*
