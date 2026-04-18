import type { Metadata } from "next";

/**
 * /global — English landing layout
 *
 * Foundation for international market entry (SEA · India · Middle East · Japan).
 * Full i18n middleware is planned for Phase 3 — this single English surface
 * enables immediate lead capture from non-Korean markets.
 */

export const metadata: Metadata = {
  title: "CHEOLYEON — Heavy Equipment B2B Platform",
  description:
    "Dispatch · Contract · Settlement unified platform for heavy construction equipment. 3-stage fallback matching · electronic contracts · automated payments. Operated by BYTEFORCE from Busan, Korea.",
  alternates: {
    canonical: "https://cheolyeon.com/global",
    languages: {
      "en-US": "https://cheolyeon.com/global",
      "ko-KR": "https://cheolyeon.com/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cheolyeon.com/global",
    siteName: "CHEOLYEON",
    title: "CHEOLYEON — Heavy Equipment B2B Platform (Korea → Global)",
    description:
      "3-stage fallback dispatch · electronic contracts · automated settlement for heavy construction equipment.",
  },
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
