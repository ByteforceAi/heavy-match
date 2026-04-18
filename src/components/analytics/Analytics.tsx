"use client";

/**
 * 철연 CHEOLYEON — Analytics Loader
 *
 * 3개 플랫폼을 Next.js <Script strategy="afterInteractive">로 로드한다.
 *   - GA4 (Google Analytics 4) — 글로벌
 *   - Naver Analytics (wcslog.js) — 국내
 *   - PostHog — 제품 퍼널
 *
 * 조건부 로드:
 *   1) NEXT_PUBLIC_*_ID 환경 변수가 설정된 플랫폼만 초기화한다.
 *   2) 사용자가 "거절"을 선택(localStorage "cy-consent" === "declined")한 경우 로드하지 않는다.
 *   3) 결정 전("pending") 상태는 기본적으로 로드를 허용한다 (크롤러·미결정 사용자 대응).
 *
 * 이 컴포넌트는 layout.tsx의 </body> 직전에 배치한다.
 */

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_STORAGE_KEY, type ConsentState, getConsent } from "@/lib/analytics";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const naverId = process.env.NEXT_PUBLIC_NAVER_ANALYTICS_ID;
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com";

  const [consent, setConsentState] = useState<ConsentState>("pending");

  useEffect(() => {
    setConsentState(getConsent());

    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) setConsentState(getConsent());
    };
    const onCustom = () => setConsentState(getConsent());

    window.addEventListener("storage", onStorage);
    window.addEventListener("cy-consent-change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cy-consent-change", onCustom);
    };
  }, []);

  // 명시적 거절 시 어떤 스크립트도 로드하지 않는다.
  // pending과 accepted는 모두 로드를 허용한다 (기본 opt-in 모델).
  if (consent === "declined") return null;

  return (
    <>
      {gaId ? <GA4Script id={gaId} /> : null}
      {naverId ? <NaverAnalyticsScript id={naverId} /> : null}
      {posthogKey ? <PostHogScript apiKey={posthogKey} host={posthogHost} /> : null}
    </>
  );
}

// ═══════════════════════════════════════
// GA4 — Google Analytics 4
// ═══════════════════════════════════════
function GA4Script({ id }: { id: string }) {
  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${id}', { anonymize_ip: true, send_page_view: true });
          `,
        }}
      />
    </>
  );
}

// ═══════════════════════════════════════
// Naver Analytics — wcslog.js
// ─── 공식 설치 가이드 (analytics.naver.com):
//     1) //wcs.naver.net/wcslog.js 스크립트 로드
//     2) wcs_add["wa"] = "<계정ID>"
//     3) wcs_do() 호출로 pageview 수집
// ═══════════════════════════════════════
function NaverAnalyticsScript({ id }: { id: string }) {
  return (
    <>
      <Script
        id="naver-wcslog-src"
        strategy="afterInteractive"
        src="//wcs.naver.net/wcslog.js"
      />
      <Script
        id="naver-wcslog-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (!window.wcs_add) window.wcs_add = {};
            window.wcs_add["wa"] = "${id}";
            if (window.wcs) {
              window.wcs_do = window.wcs_do || function(p){ if (window.wcs && window.wcs.inflow) window.wcs.inflow(); };
              window.wcs_do();
            }
          `,
        }}
      />
    </>
  );
}

// ═══════════════════════════════════════
// PostHog — posthog-js via CDN snippet
// (패키지를 import하지 않고 공식 snippet을 인라인으로 주입한다.
//  본 파일은 npm install을 요구하지 않는다.)
// ═══════════════════════════════════════
function PostHogScript({ apiKey, host }: { apiKey: string; host: string }) {
  return (
    <Script
      id="posthog-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('${apiKey}', { api_host: '${host}', person_profiles: 'identified_only', capture_pageview: true });
        `,
      }}
    />
  );
}
