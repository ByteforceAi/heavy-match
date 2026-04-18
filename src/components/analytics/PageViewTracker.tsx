"use client";

/**
 * 철연 CHEOLYEON — Page View Tracker
 *
 * App Router는 route 변경 시 자동 SPA 네비게이션이라, GA/PostHog가 첫 로드 이후의
 * 페이지뷰를 놓친다. 이 컴포넌트는 usePathname으로 pathname 변경을 감지하여
 * trackPageview를 호출한다. UI는 그리지 않는다.
 *
 * 배치: layout.tsx의 <Analytics /> 옆.
 */

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageview } from "@/lib/analytics";

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageview(url);
  }, [pathname, searchParams]);

  return null;
}
