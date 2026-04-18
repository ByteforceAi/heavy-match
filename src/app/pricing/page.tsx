"use client";

/**
 * 철연 CHEOLYEON — Pricing Page
 *
 * 구조:
 *   1. Nav (랜딩과 동일 패턴)
 *   2. Hero — 통화 토글(KRW/USD), 연 결제 17% 배지
 *   3. 3-Tier 플랜 비교 (Starter · Growth · Enterprise)
 *   4. 지역별 가격 정책 테이블
 *   5. ROI 계산기 (client-side 슬라이더)
 *   6. 전체 기능 매트릭스 비교표
 *   7. 가격 FAQ (5건, 판결문 어미)
 *   8. Contact CTA
 *   9. Footer
 *
 * heritage-v1.md §3 금지 카피 전면 준수:
 *   - 느낌표(!) 금지
 *   - "~입니다" 서술 금지 (인터랙션 문구만 예외)
 *   - 의문형 훅 금지
 *   - 브랜드 1인칭 "우리" 금지
 *   - 판결문 어미 (~한다 / ~된다 / ~였다) 사용
 *
 * 브랜드 카피는 랜딩의 copy.ts를 편집하지 않고 본 파일에 인라인화한다.
 */

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  MotionButton,
  MotionCard,
} from "@/components/motion/MotionPrimitives";
import ContactForm from "@/components/landing/ContactForm";
import * as copy from "@/content/copy";

// ═══════════════════════════════════════════
// 타입 & 데이터
// ═══════════════════════════════════════════

type Currency = "KRW" | "USD";

interface PlanTier {
  id: "starter" | "growth" | "enterprise";
  name: string;
  nameEn: string;
  targetLine: string;
  monthly: { krw: string; usd: string };
  annual: { krw: string; usd: string };
  annualNote: string;
  features: string[];
  recommended?: boolean;
  ctaLabel: string;
  ctaHref: string;
  /** Enterprise는 별도 견적 문구가 추가 */
  enterpriseNote?: string;
}

const TIERS: PlanTier[] = [
  {
    id: "starter",
    name: "Starter",
    nameEn: "중소",
    targetLine: "사장 5명 이하 · 월 배차 200건 이하",
    monthly: { krw: "₩3,900,000", usd: "$2,900" },
    annual: { krw: "₩38,880,000", usd: "$28,900" },
    annualNote: "연 결제 / 월 단가 17% 할인",
    features: [
      "3단계 폴백 배차 (무제한)",
      "전자계약·서명",
      "자동 정산",
      "기본 대시보드",
      "SMS 5,000건/월 포함",
      "이메일 지원 (영업일 24시간)",
    ],
    ctaLabel: "상담 신청",
    ctaHref: "#contact",
  },
  {
    id: "growth",
    name: "Growth",
    nameEn: "성장",
    targetLine: "사장 20명 이하 · 월 배차 1,000건 이하",
    monthly: { krw: "₩7,900,000", usd: "$5,900" },
    annual: { krw: "₩78,800,000", usd: "$58,900" },
    annualNote: "연 결제 / 월 단가 17% 할인",
    features: [
      "Starter의 모든 기능",
      "Advanced 리포트·분석",
      "API 액세스 (REST)",
      "커스텀 단가 매트릭스",
      "SMS 25,000건/월 포함",
      "전담 CSM 배정",
      "전화 지원 (영업일 즉시 응답)",
    ],
    recommended: true,
    ctaLabel: "상담 신청",
    ctaHref: "#contact",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    nameEn: "엔터프라이즈",
    targetLine: "사장 100+ · 월 배차 무제한",
    monthly: { krw: "별도 견적", usd: "Custom" },
    annual: { krw: "₩80,000,000~", usd: "$60,000~" },
    annualNote: "starting at · 공개 기준 가격",
    enterpriseNote: "현재 공개된 기준 가격. 실제 견적은 요구사항에 따른다.",
    features: [
      "Growth의 모든 기능",
      "소스코드 100% 제공 (GitHub 레포 이전)",
      "브랜드 커스터마이징",
      "On-premise 배포 옵션",
      "SLA 보장 (99.9% uptime)",
      "1년 무상 AS + 이후 연간 유지보수",
      "담당 엔지니어 배정 (도입 2주)",
      "SMS 비용 실비 정산 (한도 없음)",
    ],
    ctaLabel: "견적 요청",
    ctaHref: "#contact",
  },
];

// 지역별 가격
const REGIONAL_ROWS = [
  {
    region: "한국",
    code: "KR",
    starter: "₩3.9M/월",
    growth: "₩7.9M/월",
    enterprise: "₩80M~",
  },
  {
    region: "SEA (베트남·인니·필리핀·태국)",
    code: "SEA",
    starter: "$1,900/월",
    growth: "$3,500/월",
    enterprise: "$45K~",
  },
  {
    region: "일본",
    code: "JP",
    starter: "¥420K/월",
    growth: "¥850K/월",
    enterprise: "¥9M~",
  },
  {
    region: "중동 (UAE·사우디)",
    code: "MEA",
    starter: "$4,900/월",
    growth: "$9,900/월",
    enterprise: "$120K~",
  },
  {
    region: "인도",
    code: "IN",
    starter: "₹1.6L/월",
    growth: "₹3.2L/월",
    enterprise: "₹35L~",
  },
];

// 기능 매트릭스 — ✓ / — 구조. 각 행은 [라벨, Starter, Growth, Enterprise]
type Mark = "yes" | "no" | "half";
interface MatrixRow {
  label: string;
  cells: [Mark, Mark, Mark];
}
interface MatrixGroup {
  group: string;
  rows: MatrixRow[];
}

const MATRIX: MatrixGroup[] = [
  {
    group: "배차",
    rows: [
      { label: "3단계 폴백 배차", cells: ["yes", "yes", "yes"] },
      { label: "전용콜 타이머", cells: ["yes", "yes", "yes"] },
      { label: "공유콜 (지역 브로드캐스트)", cells: ["yes", "yes", "yes"] },
      { label: "커스텀 폴백 시간 설정", cells: ["no", "no", "yes"] },
    ],
  },
  {
    group: "계약",
    rows: [
      { label: "전자서명", cells: ["yes", "yes", "yes"] },
      { label: "다중 서명자", cells: ["no", "yes", "yes"] },
      { label: "커스텀 계약 템플릿", cells: ["no", "no", "yes"] },
    ],
  },
  {
    group: "정산",
    rows: [
      { label: "자동 정산", cells: ["yes", "yes", "yes"] },
      { label: "커스텀 분배비", cells: ["no", "yes", "yes"] },
      { label: "수수료 CSV 내보내기", cells: ["no", "yes", "yes"] },
    ],
  },
  {
    group: "리포트",
    rows: [
      { label: "기본 대시보드", cells: ["yes", "yes", "yes"] },
      { label: "Advanced 분석", cells: ["no", "yes", "yes"] },
      { label: "커스텀 리포트", cells: ["no", "no", "yes"] },
    ],
  },
  {
    group: "API",
    rows: [
      { label: "REST API", cells: ["no", "yes", "yes"] },
      { label: "Webhook", cells: ["no", "yes", "yes"] },
      { label: "GraphQL", cells: ["no", "no", "yes"] },
    ],
  },
  {
    group: "지원",
    rows: [
      { label: "이메일 (24h)", cells: ["yes", "yes", "yes"] },
      { label: "전화", cells: ["no", "yes", "yes"] },
      { label: "전담 CSM", cells: ["no", "yes", "yes"] },
      { label: "담당 엔지니어", cells: ["no", "no", "yes"] },
    ],
  },
];

// 가격 FAQ (판결문 어미, 인터랙션 문구 예외 범위 내)
const PRICING_FAQ = [
  {
    q: "SMS 비용은 따로 정산되는가",
    a: "Starter·Growth는 각 월 한도(5,000건·25,000건)가 구독료에 포함된다. Enterprise는 한도 없이 실비 정산으로 처리된다.",
  },
  {
    q: "계약 해지 시 환불 정책은 어떻게 되는가",
    a: "월 결제는 잔여 월을 일할 계산하여 환불한다. 연 결제는 위약금 15%를 공제한 뒤 잔여 금액을 환불한다.",
  },
  {
    q: "견적은 어떻게 요청하는가",
    a: "본 페이지 하단 상담 양식에 기업 정보와 규모를 기입한다. 24시간 이내 BYTEFORCE 사업개발팀이 회신한다.",
  },
  {
    q: "Starter에서 Growth로 업그레이드가 가능한가",
    a: "언제든 가능하다. 차액만 지불하고 즉시 전환된다. 기능 제한 없이 업그레이드가 반영된다.",
  },
  {
    q: "중장비사장 수가 초과되면 어떻게 되는가",
    a: "플랜 한도를 초과한 사장 1명당 월 50,000원이 추가 청구된다. 6개월 이상 초과 상태가 지속되면 상위 플랜 전환이 권고된다.",
  },
];

// ═══════════════════════════════════════════
// 페이지
// ═══════════════════════════════════════════
export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>("KRW");
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily:
          "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <Navigation />
      <Hero
        currency={currency}
        setCurrency={setCurrency}
        billing={billing}
        setBilling={setBilling}
      />
      <Tiers currency={currency} billing={billing} />
      <RegionalPricing />
      <RoiCalculator />
      <FeatureMatrix />
      <PricingFaq />
      <ContactCta />
      <FooterSection />
    </main>
  );
}

// ═══════════════════════════════════════════
// 1. NAV — 랜딩 패턴 (pricing 활성)
// ═══════════════════════════════════════════
function Navigation() {
  const menu = [
    { label: "플랫폼", href: "/#platform" },
    { label: "도입 효과", href: "/#impact" },
    { label: "요금", href: "/pricing", active: true },
    { label: "철연 이야기", href: "/story" },
  ];
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6 md:gap-12"
      style={{ backdropFilter: "blur(12px) saturate(180%)" }}
    >
      <Link href="/" className="flex items-baseline gap-2.5" aria-label="철연 홈">
        <span
          className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif",
          }}
        >
          철연
        </span>
        <span
          className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          CHEOLYEON
        </span>
      </Link>

      <ul className="hidden md:flex gap-7 flex-1 list-none m-0 p-0">
        {menu.map((item) => (
          <li key={item.label} className="relative">
            <Link
              href={item.href}
              className={`text-[14px] font-medium transition-colors py-1 ${
                item.active
                  ? "text-[#002C5F] font-semibold"
                  : "text-[#3A4A5F] hover:text-[#002C5F]"
              }`}
            >
              {item.label}
              {item.active && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-22px] left-0 right-0 h-[2px] bg-[#002C5F]"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-2.5 ml-auto">
        <Link
          href="/login"
          className="hidden sm:inline-flex items-center px-4 py-2 text-[13px] font-medium text-[#3A4A5F] bg-transparent border border-[#E3E8EF] rounded-lg hover:bg-[#F4F6FA] transition-colors min-h-0"
        >
          로그인
        </Link>
        <Link
          href="/demo"
          className="inline-flex items-center px-4 md:px-5 py-2 text-[13px] font-semibold text-white bg-[#002C5F] hover:bg-[#0046A4] rounded-lg transition-colors min-h-0"
        >
          데모 체험
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════
// 2. HERO
// ═══════════════════════════════════════════
function Hero({
  currency,
  setCurrency,
  billing,
  setBilling,
}: {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  billing: "monthly" | "annual";
  setBilling: (b: "monthly" | "annual") => void;
}) {
  return (
    <section
      className="relative border-b border-[#E3E8EF]"
      style={{
        background: `
          radial-gradient(ellipse at 80% 20%, rgba(0,170,210,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 0% 80%, rgba(0,44,95,0.04) 0%, transparent 50%),
          linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 100%)
        `,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <Reveal>
          <p
            className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            PRICING · 도입 요금
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1
            className="font-[900] text-[#0A1628] mb-4 max-w-[880px]"
            style={{
              fontSize: "clamp(2rem, 4.8vw, 3.25rem)",
              lineHeight: 1.18,
              letterSpacing: "-0.03em",
            }}
          >
            투명한 구조,{" "}
            <span className="text-[#002C5F]">협상 없는 가격</span>
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="text-[15px] md:text-[17px] text-[#3A4A5F] leading-[1.75] max-w-[620px] mb-8">
            중장비 배차 플랫폼의 실제 도입 비용을 공개한다.
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="flex flex-wrap items-center gap-3">
            {/* 통화 토글 */}
            <div
              className="inline-flex items-center bg-white border border-[#E3E8EF] rounded-xl p-1"
              role="tablist"
              aria-label="통화 선택"
            >
              <ToggleBtn
                active={currency === "KRW"}
                onClick={() => setCurrency("KRW")}
              >
                국내 (원)
              </ToggleBtn>
              <ToggleBtn
                active={currency === "USD"}
                onClick={() => setCurrency("USD")}
              >
                해외 (USD)
              </ToggleBtn>
            </div>

            {/* 월/연 토글 */}
            <div
              className="inline-flex items-center bg-white border border-[#E3E8EF] rounded-xl p-1"
              role="tablist"
              aria-label="결제 주기"
            >
              <ToggleBtn
                active={billing === "monthly"}
                onClick={() => setBilling("monthly")}
              >
                월 결제
              </ToggleBtn>
              <ToggleBtn
                active={billing === "annual"}
                onClick={() => setBilling("annual")}
              >
                연 결제
              </ToggleBtn>
            </div>

            {/* 할인 배지 */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F1FB] text-[#002C5F] rounded-full text-[12px] font-semibold">
              <span
                className="w-1.5 h-1.5 bg-[#00AAD2] rounded-full"
                aria-hidden="true"
              />
              연 결제 시 17% 할인
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      role="tab"
      aria-selected={active}
      className={`px-3.5 py-1.5 text-[13px] font-semibold rounded-lg transition-all min-h-0 ${
        active
          ? "bg-[#002C5F] text-white"
          : "bg-transparent text-[#3A4A5F] hover:text-[#002C5F]"
      }`}
    >
      {children}
    </button>
  );
}

// ═══════════════════════════════════════════
// 3. 3-TIER PLAN COMPARISON
// ═══════════════════════════════════════════
function Tiers({
  currency,
  billing,
}: {
  currency: Currency;
  billing: "monthly" | "annual";
}) {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20">
      <StaggerContainer className="grid md:grid-cols-3 gap-5 md:gap-6">
        {TIERS.map((tier) => (
          <StaggerItem key={tier.id}>
            <TierCard tier={tier} currency={currency} billing={billing} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

function TierCard({
  tier,
  currency,
  billing,
}: {
  tier: PlanTier;
  currency: Currency;
  billing: "monthly" | "annual";
}) {
  const isRec = !!tier.recommended;
  const priceGroup = billing === "monthly" ? tier.monthly : tier.annual;
  const priceDisplay = currency === "KRW" ? priceGroup.krw : priceGroup.usd;
  const periodSuffix = billing === "monthly" ? "/월" : "/년";
  const isEnterprise = tier.id === "enterprise";

  return (
    <div
      className={`relative h-full flex flex-col rounded-2xl p-6 md:p-7 transition-shadow ${
        isRec
          ? "bg-[#EEF4FB] ring-2 ring-[#002C5F]"
          : "bg-white border border-[#E3E8EF]"
      }`}
      style={{
        boxShadow: isRec
          ? "0 18px 40px rgba(0, 44, 95, 0.12)"
          : "0 10px 30px rgba(0, 44, 95, 0.06)",
      }}
    >
      {isRec && (
        <span
          className="absolute top-4 right-4 px-2.5 py-1 bg-[#002C5F] text-white text-[10px] font-bold tracking-[0.1em] uppercase rounded-full"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          가장 많이 선택
        </span>
      )}

      <div className="mb-5">
        <div className="flex items-baseline gap-2 mb-1.5">
          <h3 className="text-[22px] font-[800] text-[#0A1628] tracking-[-0.02em]">
            {tier.name}
          </h3>
          <span className="text-[12px] text-[#6B7B8F] font-medium">
            {tier.nameEn}
          </span>
        </div>
        <p className="text-[12px] text-[#6B7B8F] leading-[1.5]">
          {tier.targetLine}
        </p>
      </div>

      <div className="mb-6">
        <p
          className="text-[40px] md:text-[48px] font-black text-[#002C5F] tabular-nums leading-none"
          style={{
            fontFamily: "var(--font-roboto-mono), monospace",
            letterSpacing: "-0.04em",
          }}
        >
          {priceDisplay}
          {!isEnterprise && (
            <span className="text-[14px] font-medium text-[#6B7B8F] ml-1 tracking-normal">
              {periodSuffix}
            </span>
          )}
        </p>
        {billing === "annual" && !isEnterprise && (
          <p
            className="mt-2 text-[11px] text-[#6B7B8F]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {tier.annualNote}
          </p>
        )}
        {billing === "monthly" && !isEnterprise && (
          <p
            className="mt-2 text-[11px] text-[#6B7B8F]"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            연 결제:{" "}
            {currency === "KRW" ? tier.annual.krw : tier.annual.usd}
            /년
          </p>
        )}
        {isEnterprise && tier.enterpriseNote && (
          <p className="mt-2 text-[11px] text-[#6B7B8F]">
            {tier.enterpriseNote}
          </p>
        )}
      </div>

      <a href={tier.ctaHref} className="block mb-6">
        <MotionButton
          variant={isRec ? "primary" : "secondary"}
          className="w-full px-5 py-3 text-[14px] inline-flex items-center justify-center gap-2"
        >
          {tier.ctaLabel}
          <span aria-hidden="true">→</span>
        </MotionButton>
      </a>

      <ul className="space-y-2.5 list-none p-0 m-0 flex-1">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-[13px] text-[#3A4A5F] leading-[1.55]"
          >
            <span
              className="material-symbols-outlined text-[#00A86B] mt-0.5 flex-shrink-0"
              style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              check
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ═══════════════════════════════════════════
// 4. 지역별 가격 정책
// ═══════════════════════════════════════════
function RegionalPricing() {
  return (
    <section className="bg-white border-y border-[#E3E8EF]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <Reveal>
          <p
            className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            Regional Pricing
          </p>
          <h2 className="text-[26px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2">
            지역별 가격 정책
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#6B7B8F] max-w-[680px] mb-8 leading-[1.7]">
            구매력·시장 규모를 반영한 차별 가격이다. 아래 수치는 기준선이며 실제
            견적은 국가별 맥락에 따라 조정된다.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="overflow-x-auto rounded-2xl border border-[#E3E8EF] bg-white"
            style={{ boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)" }}
          >
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr
                  className="bg-[#F4F6FA] text-[#002C5F]"
                  style={{
                    fontFamily: "var(--font-roboto-mono), monospace",
                  }}
                >
                  <th className="px-5 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase">
                    지역
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase">
                    Starter
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase">
                    Growth
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {REGIONAL_ROWS.map((row, i) => (
                  <tr
                    key={row.code}
                    className={`border-t border-[#E3E8EF] ${
                      i % 2 === 1 ? "bg-[#FAFBFD]" : "bg-white"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-[10px] px-1.5 py-0.5 bg-[#E8F1FB] text-[#002C5F] rounded font-bold tracking-[0.1em]"
                          style={{
                            fontFamily:
                              "var(--font-roboto-mono), monospace",
                          }}
                        >
                          {row.code}
                        </span>
                        <span className="text-[13px] font-semibold text-[#0A1628]">
                          {row.region}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-5 py-4 text-[13px] text-[#3A4A5F] tabular-nums"
                      style={{
                        fontFamily: "var(--font-roboto-mono), monospace",
                      }}
                    >
                      {row.starter}
                    </td>
                    <td
                      className="px-5 py-4 text-[13px] text-[#002C5F] font-bold tabular-nums"
                      style={{
                        fontFamily: "var(--font-roboto-mono), monospace",
                      }}
                    >
                      {row.growth}
                    </td>
                    <td
                      className="px-5 py-4 text-[13px] text-[#3A4A5F] tabular-nums"
                      style={{
                        fontFamily: "var(--font-roboto-mono), monospace",
                      }}
                    >
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-5 flex items-start gap-3 bg-[#EEF4FB] border border-[#002C5F]/15 rounded-xl p-4">
            <span
              className="material-symbols-outlined text-[#002C5F] flex-shrink-0"
              style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              info
            </span>
            <p className="text-[13px] text-[#3A4A5F] leading-[1.7]">
              SEA·인도는 성장기 파트너십 가격이다. 중동은 NEOM·Vision 2030
              인프라 프로젝트 기준이다.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// 5. ROI 계산기 — client-side
// ═══════════════════════════════════════════
function RoiCalculator() {
  const [dispatch, setDispatch] = useState(500); // 월 배차 건수
  const [avgRent, setAvgRent] = useState(800_000); // 평균 임대비 (원)
  const [failRate, setFailRate] = useState(12); // 현재 배차 실패율 %

  const result = useMemo(() => {
    // 월 절감액 = 월 배차 × 평균 임대비 × (현재 실패율 - 0.3%) + 미수금 절감 (월 평균 500K)
    const failDelta = Math.max(failRate - 0.3, 0) / 100;
    const monthlySavings = Math.round(
      dispatch * avgRent * failDelta + 500_000,
    );
    // Growth 연 결제 기준 7.88M / 월
    const growthAnnual = 78_800_000;
    const growthMonthly = growthAnnual / 12;
    // 회수 기간 (월)
    const paybackMonths =
      monthlySavings > 0 ? growthAnnual / monthlySavings : Infinity;
    // 연간 ROI
    const annualSavings = monthlySavings * 12;
    const annualCost = growthAnnual;
    const roiPct =
      annualCost > 0
        ? ((annualSavings - annualCost) / annualCost) * 100
        : 0;
    return {
      monthlySavings,
      paybackMonths,
      roiPct,
      growthMonthly,
      annualSavings,
    };
  }, [dispatch, avgRent, failRate]);

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20">
      <Reveal>
        <p
          className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          ROI Calculator
        </p>
        <h2 className="text-[26px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2">
          도입 효과 계산기
        </h2>
        <p className="text-[14px] md:text-[15px] text-[#6B7B8F] max-w-[620px] mb-10 leading-[1.7]">
          Growth 연 결제 기준으로 월 절감액·회수 기간·연간 ROI를 산출한다. 값은
          모두 추정치이며 실측 계약에 우선한다.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 md:gap-8">
        {/* 슬라이더 */}
        <Reveal delay={0.1}>
          <div
            className="bg-white border border-[#E3E8EF] rounded-2xl p-6 md:p-7"
            style={{ boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)" }}
          >
            <Slider
              label="월 배차 건수"
              value={dispatch}
              onChange={setDispatch}
              min={0}
              max={2000}
              step={10}
              format={(v) => `${v.toLocaleString("ko-KR")} 건`}
            />
            <Slider
              label="평균 임대비"
              value={avgRent}
              onChange={setAvgRent}
              min={100_000}
              max={5_000_000}
              step={50_000}
              format={(v) => `₩${v.toLocaleString("ko-KR")}`}
            />
            <Slider
              label="현재 배차 실패율"
              value={failRate}
              onChange={setFailRate}
              min={5}
              max={25}
              step={0.5}
              format={(v) => `${v.toFixed(1)}%`}
              last
            />
          </div>
        </Reveal>

        {/* 결과 */}
        <Reveal delay={0.2}>
          <div
            className="bg-[#002C5F] text-white rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between"
            style={{
              boxShadow: "0 18px 40px rgba(0, 44, 95, 0.2)",
              background:
                "linear-gradient(135deg, #002C5F 0%, #0046A4 100%)",
            }}
          >
            <div>
              <p
                className="text-[11px] text-white/65 tracking-[0.2em] uppercase mb-5"
                style={{
                  fontFamily: "var(--font-roboto-mono), monospace",
                }}
              >
                Output
              </p>

              <RoiMetric
                label="예상 월 절감액"
                value={`₩${result.monthlySavings.toLocaleString("ko-KR")}`}
                sub="미수금 월 평균 500,000원 절감 포함"
                large
              />
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/15">
                <RoiMetric
                  label="도입 원가 회수 기간"
                  value={
                    Number.isFinite(result.paybackMonths)
                      ? `${result.paybackMonths.toFixed(1)} 개월`
                      : "—"
                  }
                  sub={null}
                />
                <RoiMetric
                  label="연간 ROI"
                  value={`${result.roiPct.toFixed(0)}%`}
                  sub={null}
                />
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/15">
              <p
                className="text-[11px] text-white/60 leading-[1.6]"
                style={{
                  fontFamily: "var(--font-roboto-mono), monospace",
                }}
              >
                base · Growth 연 결제 ₩78,800,000 / 12 = ₩
                {Math.round(result.growthMonthly).toLocaleString("ko-KR")} /월
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  last,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  last?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={last ? "" : "mb-6"}>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-[13px] font-semibold text-[#0A1628]">
          {label}
        </label>
        <span
          className="text-[14px] font-bold text-[#002C5F] tabular-nums"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full h-2 rounded-full appearance-none cursor-pointer slider-input"
        style={{
          background: `linear-gradient(to right, #002C5F 0%, #00AAD2 ${pct}%, #E3E8EF ${pct}%, #E3E8EF 100%)`,
        }}
      />
      <style jsx>{`
        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #002c5f;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 44, 95, 0.25);
        }
        .slider-input::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #002c5f;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 44, 95, 0.25);
        }
      `}</style>
      <div
        className="flex justify-between mt-1 text-[10px] text-[#9AA8B8]"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function RoiMetric({
  label,
  value,
  sub,
  large,
}: {
  label: string;
  value: string;
  sub: string | null;
  large?: boolean;
}) {
  return (
    <div>
      <p
        className="text-[11px] text-white/70 tracking-[0.15em] uppercase mb-1.5"
        style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
      >
        {label}
      </p>
      <p
        className={`font-black text-white tabular-nums ${
          large ? "text-[44px] md:text-[52px]" : "text-[24px] md:text-[28px]"
        }`}
        style={{
          fontFamily: "var(--font-roboto-mono), monospace",
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
        }}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-[11px] text-white/70">{sub}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════
// 6. 기능 매트릭스 비교 표
// ═══════════════════════════════════════════
function FeatureMatrix() {
  return (
    <section className="bg-white border-y border-[#E3E8EF]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <Reveal>
          <p
            className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            Feature Matrix
          </p>
          <h2 className="text-[26px] md:text-[36px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-2">
            전체 기능 비교
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#6B7B8F] mb-8 leading-[1.7]">
            3개 플랜이 포함하는 기능을 단일 표로 정리한다.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="overflow-x-auto rounded-2xl border border-[#E3E8EF] bg-white"
            style={{ boxShadow: "0 10px 30px rgba(0, 44, 95, 0.06)" }}
          >
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr
                  className="bg-[#F4F6FA] text-[#002C5F]"
                  style={{
                    fontFamily: "var(--font-roboto-mono), monospace",
                  }}
                >
                  <th className="px-5 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase">
                    기능
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase text-center">
                    Starter
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase text-center bg-[#EEF4FB]">
                    Growth
                  </th>
                  <th className="px-5 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase text-center">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((group) => (
                  <Fragment key={group.group}>
                    <tr
                      className="bg-[#FAFBFD] border-t border-[#E3E8EF]"
                    >
                      <td
                        colSpan={4}
                        className="px-5 py-2.5 text-[11px] font-bold text-[#6B7B8F] tracking-[0.15em] uppercase"
                        style={{
                          fontFamily:
                            "var(--font-roboto-mono), monospace",
                        }}
                      >
                        {group.group}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={`${group.group}-${row.label}`}
                        className="border-t border-[#E3E8EF]"
                      >
                        <td className="px-5 py-3 text-[13px] text-[#3A4A5F]">
                          {row.label}
                        </td>
                        <td className="px-5 py-3 text-center">
                          <MarkIcon mark={row.cells[0]} />
                        </td>
                        <td className="px-5 py-3 text-center bg-[#EEF4FB]/40">
                          <MarkIcon mark={row.cells[1]} />
                        </td>
                        <td className="px-5 py-3 text-center">
                          <MarkIcon mark={row.cells[2]} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes") {
    return (
      <span
        className="material-symbols-outlined text-[#00A86B]"
        style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}
        aria-label="포함"
      >
        check
      </span>
    );
  }
  if (mark === "half") {
    return (
      <span
        className="material-symbols-outlined text-[#6B7B8F]"
        style={{ fontSize: 20 }}
        aria-label="부분 포함"
      >
        horizontal_rule
      </span>
    );
  }
  return (
    <span
      className="material-symbols-outlined text-[#9AA8B8]"
      style={{ fontSize: 20 }}
      aria-label="미포함"
    >
      close_small
    </span>
  );
}

// ═══════════════════════════════════════════
// 7. 가격 FAQ
// ═══════════════════════════════════════════
function PricingFaq() {
  return (
    <section className="max-w-[960px] mx-auto px-6 md:px-12 py-16 md:py-20">
      <Reveal>
        <p
          className="text-[11px] text-[#002C5F] font-bold tracking-[0.2em] uppercase mb-2.5"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          FAQ
        </p>
        <h2 className="text-[24px] md:text-[32px] font-[800] tracking-[-0.02em] text-[#0A1628] mb-8">
          자주 묻는 가격 관련 질문
        </h2>
      </Reveal>
      <StaggerContainer className="space-y-3">
        {PRICING_FAQ.map((item) => (
          <StaggerItem key={item.q}>
            <details className="group bg-white border border-[#E3E8EF] rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                <span className="text-[15px] font-semibold text-[#0A1628] pr-4">
                  Q. {item.q}
                </span>
                <span
                  className="material-symbols-outlined text-[#6B7B8F] group-open:rotate-180 transition-transform flex-shrink-0"
                  style={{ fontSize: 20 }}
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </summary>
              <div className="px-5 pb-5 text-[13px] text-[#3A4A5F] leading-[1.75] border-t border-[#E3E8EF] pt-4">
                <span
                  className="font-bold text-[#002C5F] mr-1.5"
                  style={{
                    fontFamily: "var(--font-roboto-mono), monospace",
                  }}
                >
                  A.
                </span>
                {item.a}
              </div>
            </details>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

// ═══════════════════════════════════════════
// 8. CONTACT CTA — Navy full-width
// ═══════════════════════════════════════════
function ContactCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(180deg, #002C5F 0%, #001B3D 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute right-[-120px] top-[-120px] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,170,210,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[960px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <Reveal>
          <p
            className="text-[11px] text-white/65 font-bold tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            Get Quote
          </p>
          <h2
            className="text-[28px] md:text-[40px] font-[900] tracking-[-0.03em] text-white mb-3"
            style={{ lineHeight: 1.2 }}
          >
            지금 견적 받기
          </h2>
          <p className="text-[14px] md:text-[16px] text-white/75 max-w-[580px] mb-10 leading-[1.75]">
            플랜·지역·도입 시점을 기재하여 전송한다. 24시간 이내 BYTEFORCE
            사업개발팀이 회신한다.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="bg-white text-[#0A1628] rounded-2xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p
            className="mt-6 text-[12px] text-white/55"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            또는 랜딩 페이지의 통합 상담 양식 이용 —{" "}
            <Link
              href="/#contact"
              className="underline underline-offset-4 text-white hover:text-[#00AAD2] transition-colors"
            >
              /#contact
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// 9. FOOTER — 랜딩과 동일 구조 (copy.ts 참조만)
// ═══════════════════════════════════════════
function FooterSection() {
  return (
    <footer className="border-t border-[#E3E8EF] pt-10 pb-8 bg-[#EEF1F5]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#E3E8EF]">
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-[18px] font-black text-[#002C5F] tracking-[-0.03em]"
              style={{
                fontFamily:
                  "var(--font-pretendard), 'Pretendard', sans-serif",
              }}
            >
              {copy.footer.brand.ko}
            </span>
            <span
              className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {copy.footer.brand.en}
            </span>
            <span className="text-[12px] text-[#6B7B8F] ml-2 hidden md:inline">
              {copy.footer.description}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {copy.footer.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] text-[#3A4A5F] hover:text-[#002C5F] font-medium transition-colors min-h-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-[11px] text-[#6B7B8F] leading-[1.8]"
          style={{
            fontFamily:
              "var(--font-roboto-mono), 'Pretendard', sans-serif",
          }}
        >
          <div className="space-y-0.5">
            <p>
              <span className="text-[#9AA8B8]">대표:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {copy.footer.business.representative}
              </span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">사업자등록번호:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {copy.footer.business.registrationNumber}
              </span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">통신판매업신고번호:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {copy.footer.business.eCommerceNumber}
              </span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">호스팅 제공자:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {copy.footer.business.hostingProvider}
              </span>
            </p>
          </div>
          <div className="space-y-0.5">
            <p>
              <span className="text-[#9AA8B8]">주소:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {copy.footer.business.address}
              </span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">전화:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {copy.footer.business.phone}
              </span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">이메일:</span>{" "}
              <a
                href={`mailto:${copy.footer.business.email}`}
                className="text-[#002C5F] hover:text-[#0046A4] font-medium transition-colors"
              >
                {copy.footer.business.email}
              </a>
            </p>
            <p>
              <span className="text-[#9AA8B8]">개인정보보호책임자:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {copy.footer.dpo.name} {copy.footer.dpo.title} (
                {copy.footer.dpo.email})
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-[#E3E8EF] flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[10px] text-[#9AA8B8]">
            {copy.footer.copyright}
          </p>
          <p className="text-[10px] text-[#9AA8B8]">
            철연 · CHEOLYEON은 ㈜바이트포스의 중장비 배차·계약·정산 통합
            플랫폼 상표다.
          </p>
        </div>
      </div>
    </footer>
  );
}
