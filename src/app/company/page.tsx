"use client";

/**
 * /company — BYTEFORCE 회사 소개 페이지
 *
 * 운영사 소개 · 미션 · 창업자 · 운영 원칙 · 연혁 · 문의.
 *
 * heritage-v1.md 전면 준수:
 *   §3.1 감정 단어 금지 — 꿈·눈물·헌신·유산 없음
 *   §3.2 문체 금지 — ! 없음, 의문형 훅 없음, ~입니다 없음, 우리 없음
 *   §3.3 사주·한자·종교 언급 금지 — 가족 맥락 미기재
 *   §4 판결문 어미 (~한다/~된다/~였다)
 *
 * 랜딩 페이지 네비/푸터 패턴을 그대로 재사용한다.
 */

import Link from "next/link";
import * as copy from "@/content/copy";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  MotionCard,
} from "@/components/motion/MotionPrimitives";
import {
  OrganizationSchema,
  BreadcrumbSchema,
} from "@/components/seo/StructuredData";

const SECTION_BASE =
  "py-16 md:py-20 max-w-[1280px] mx-auto px-6 md:px-12";

const CARD_SHADOW = "0 10px 30px rgba(0, 44, 95, 0.06)";

export default function CompanyPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily:
          "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <OrganizationSchema detailed />
      <BreadcrumbSchema
        items={[
          { label: "홈", href: "/" },
          { label: "회사 소개", href: "/company" },
        ]}
      />
      <CompanyNav />
      <HeroSection />
      <MissionSection />
      <FounderSection />
      <ValuesSection />
      <TimelineSection />
      <ContactSection />
      <CompanyFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function CompanyNav() {
  return (
    <nav
      className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur border-b border-[#E3E8EF] flex items-center px-6 md:px-8 gap-6 md:gap-12"
      style={{ backdropFilter: "blur(12px) saturate(180%)" }}
    >
      <Link href="/" className="flex items-baseline gap-2.5" aria-label="철연 홈">
        <span
          className="text-[22px] font-black text-[#002C5F] tracking-[-0.03em]"
          style={{ fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif" }}
        >
          {copy.nav.brand.ko}
        </span>
        <span
          className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {copy.nav.brand.en}
        </span>
      </Link>

      <ul className="hidden md:flex gap-7 flex-1 list-none m-0 p-0">
        {copy.nav.menu.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[14px] font-medium text-[#3A4A5F] hover:text-[#002C5F] transition-colors py-1"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex gap-2.5 ml-auto">
        <Link
          href="/login"
          className="hidden sm:inline-flex items-center px-4 py-2 text-[13px] font-medium text-[#3A4A5F] bg-transparent border border-[#E3E8EF] rounded-lg hover:bg-[#F4F6FA] transition-colors min-h-0"
        >
          {copy.nav.cta.secondary}
        </Link>
        <Link
          href="/demo"
          className="inline-flex items-center px-4 md:px-5 py-2 text-[13px] font-semibold text-white bg-[#002C5F] hover:bg-[#0046A4] rounded-lg transition-colors min-h-0"
        >
          {copy.nav.cta.primary}
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// 1. HERO
// ═══════════════════════════════════════
function HeroSection() {
  const pills = [
    { label: "설립", value: "2024" },
    { label: "본사", value: "부산" },
    { label: "대표", value: "이한결" },
    { label: "대표제품", value: "철연" },
  ];

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
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <Reveal delay={0.05}>
          <p
            className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            COMPANY · BYTEFORCE
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="font-[900] text-[#0A1628] mb-5 max-w-[900px]"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            바이트포스는 기록된 의제를 시스템으로{" "}
            <span className="text-[#002C5F]">응답하는 회사다</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-[16px] md:text-[18px] text-[#3A4A5F] leading-[1.75] max-w-[720px] mb-10"
            style={{
              fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
              letterSpacing: "-0.015em",
            }}
          >
            2024년 설립. 중장비 배차·계약·정산 통합 플랫폼 철연 CHEOLYEON을 운영한다.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div
            className="flex flex-wrap gap-2.5"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            {pills.map((pill) => (
              <div
                key={pill.label}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E3E8EF] rounded-full"
              >
                <span className="text-[10px] text-[#6B7B8F] tracking-[0.15em] uppercase">
                  {pill.label}
                </span>
                <span className="text-[13px] font-bold text-[#0A1628] tracking-[-0.01em]">
                  {pill.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 2. MISSION
// ═══════════════════════════════════════
function MissionSection() {
  const paragraphs = [
    "1998년 부산에서 대한건설기계협회 부산지회 기종분과회 위원장 나철연이 세 가지 의제를 공표한다. 장기어음의 장기화, 무허가 중간업자를 통한 하도급, 사업자의 생계 미보장. 28년이 지난 지금, 건설 현장에서 동일한 문제가 반복된다.",
    "바이트포스는 파편화된 업계를 시스템으로 재설계한다. 구두 약속은 전자계약으로, 수기 배차는 3단계 폴백 알고리즘으로, 정산 분쟁은 자동 집행 규칙으로 대체한다. 방법론은 추상적 선언에 그치지 않는다. 각 업무 플로우가 데이터와 규칙으로 기재되고, 예외는 코드로 집행된다.",
    "업의 구조가 바뀌면 현장의 결과도 바뀐다. 배차 실패율·대금 미수율·분쟁 발생률이 측정 가능한 수치로 감소한다. 바이트포스의 역할은 그 구조를 설계·운영·유지하는 것에 한정된다.",
  ];

  return (
    <section className={`${SECTION_BASE} border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          MISSION
        </p>
        <h2
          className="text-[28px] md:text-[40px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-12"
          style={{ lineHeight: 1.2 }}
        >
          미션
        </h2>
      </Reveal>

      <div className="max-w-[820px] space-y-6 mb-10">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={0.05 + i * 0.08}>
            <p
              className="text-[16px] md:text-[17px] text-[#0A1628]"
              style={{
                fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
                lineHeight: 1.9,
                letterSpacing: "-0.015em",
              }}
            >
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <Link
          href="/story"
          className="inline-flex items-center gap-3 max-w-[820px] w-full px-6 py-5 bg-white border border-[#E3E8EF] rounded-2xl hover:border-[#002C5F] transition-colors group"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div className="flex-1">
            <p
              className="text-[11px] font-bold text-[#002C5F] tracking-[0.2em] mb-1"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              HERITAGE · L3
            </p>
            <p className="text-[15px] font-bold text-[#0A1628]">
              철연의 기원 전체 읽기
            </p>
            <p className="text-[12px] text-[#6B7B8F] mt-0.5">
              1998년 부산일보 기사 재현 · §2.1 전문
            </p>
          </div>
          <span
            className="text-[#002C5F] text-[20px] group-hover:translate-x-1 transition-transform"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}

// ═══════════════════════════════════════
// 3. FOUNDER
// ═══════════════════════════════════════
function FounderSection() {
  const bio = [
    "소프트웨어 엔지니어로 커리어를 시작하여 프로덕트 리더십으로 직능을 이행한다. 제품 조직의 발의·설계·운영 단계를 모두 거치며, 시스템이 사람의 반복 판단을 대체하는 구간과 대체하지 못하는 구간의 경계를 식별하는 것을 실무 기준으로 수립한다.",
    "중장비 업계와의 접점은 시장 조사 단계에서 확보된다. 업계 관계자 다수와의 인터뷰, 공개된 협회 자료, 운영 데이터 분석을 통해 배차·계약·정산 과정의 구조적 결함을 문제로 정의한다. 수기 운영과 구두 관행이 만드는 거래 비용이 측정 가능한 규모로 누적되는 것이 확인된다.",
    "철연의 설계 철학은 단일 문장으로 요약된다. 시스템이 사람의 반복 노동을 대체한다. 전화 응대·엑셀 집계·미수금 독촉·계약 보관 같은 반복 절차는 규칙으로 기재되어 자동 집행된다. 사업자는 판단이 필요한 일에 시간을 집행한다.",
  ];

  const links = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hangyeol" },
    { label: "Blog", href: "https://blog.byteforce.ai.kr" },
    { label: "Email", href: "mailto:ceo@byteforce.ai.kr", text: "ceo@byteforce.ai.kr" },
  ];

  return (
    <section className={`${SECTION_BASE} bg-white border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          FOUNDER
        </p>
        <h2
          className="text-[28px] md:text-[40px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-12"
          style={{ lineHeight: 1.2 }}
        >
          창업자
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-[400px_1fr] gap-10 md:gap-14 items-start">
        <Reveal delay={0.1}>
          {/* Portrait placeholder — navy gradient 400x500 with initial 이 */}
          <div
            className="w-full max-w-[400px] aspect-[4/5] rounded-2xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, #002C5F 0%, #001A3D 50%, #0046A4 100%)",
              boxShadow: CARD_SHADOW,
            }}
            role="img"
            aria-label="창업자 이한결 초상 자리표시자"
          >
            {/* 방사형 하이라이트 */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(0,170,210,0.18) 0%, transparent 55%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-white font-black select-none"
                style={{
                  fontSize: "clamp(8rem, 18vw, 12rem)",
                  letterSpacing: "-0.05em",
                  fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif",
                  textShadow: "0 4px 30px rgba(0,0,0,0.25)",
                }}
              >
                이
              </span>
            </div>
            <span
              className="absolute bottom-5 left-5 text-[10px] text-white/60 tracking-[0.25em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              PORTRAIT · PLACEHOLDER
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.15}>
            <h3
              className="text-[28px] md:text-[32px] font-[900] text-[#0A1628] tracking-[-0.03em]"
              style={{ lineHeight: 1.2 }}
            >
              이한결
            </h3>
            <p
              className="text-[13px] text-[#6B7B8F] mt-1 mb-6 tracking-[0.05em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              Lee Han-gyeol
            </p>
            <p className="text-[14px] text-[#002C5F] font-semibold mb-8">
              BYTEFORCE 대표 · 철연 CHEOLYEON Founder
            </p>
          </Reveal>

          <div className="space-y-5 mb-8">
            {bio.map((p, i) => (
              <Reveal key={i} delay={0.2 + i * 0.08}>
                <p
                  className="text-[15px] md:text-[16px] text-[#3A4A5F]"
                  style={{
                    fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
                    lineHeight: 1.85,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="flex flex-wrap gap-2.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-[#0A1628] bg-white border border-[#E3E8EF] rounded-lg hover:border-[#002C5F] hover:text-[#002C5F] transition-colors"
                >
                  <span>{link.label}</span>
                  {link.text && (
                    <span
                      className="text-[12px] text-[#6B7B8F] font-medium"
                      style={{
                        fontFamily: "var(--font-roboto-mono), monospace",
                      }}
                    >
                      {link.text}
                    </span>
                  )}
                  <span className="text-[#6B7B8F]" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 4. VALUES
// ═══════════════════════════════════════
function ValuesSection() {
  const values = [
    {
      title: "기록",
      body: "모든 거래는 문서로 남고, 분쟁은 증빙으로 종결된다.",
      accent: "#002C5F",
    },
    {
      title: "투명",
      body: "수수료 구조와 정산 공식은 전체 공개된다.",
      accent: "#0046A4",
    },
    {
      title: "지속",
      body: "48시간 독촉·10년 전자서명 보존으로 관계를 유지한다.",
      accent: "#00AAD2",
    },
  ];

  return (
    <section className={`${SECTION_BASE} border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          OPERATING PRINCIPLES
        </p>
        <h2
          className="text-[28px] md:text-[40px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-12"
          style={{ lineHeight: 1.2 }}
        >
          운영 원칙
        </h2>
      </Reveal>

      <StaggerContainer className="grid md:grid-cols-3 gap-5">
        {values.map((v) => (
          <StaggerItem key={v.title}>
            <MotionCard className="p-8 h-full">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-[6px] h-[28px] rounded-full"
                  style={{ backgroundColor: v.accent }}
                  aria-hidden="true"
                />
                <h3 className="text-[22px] font-[900] text-[#0A1628] tracking-[-0.02em]">
                  {v.title}
                </h3>
              </div>
              <p
                className="text-[15px] text-[#3A4A5F]"
                style={{
                  fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
                  lineHeight: 1.8,
                  letterSpacing: "-0.015em",
                }}
              >
                {v.body}
              </p>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

// ═══════════════════════════════════════
// 5. TIMELINE
// ═══════════════════════════════════════
function TimelineSection() {
  const entries = [
    {
      period: "2024 Q2",
      title: "BYTEFORCE 설립",
      body: "법인 등기. 부산 본사 사무 공간 수립.",
    },
    {
      period: "2024 Q4",
      title: "철연 프로젝트 설계 시작",
      body: "도메인 조사·문제 정의·아키텍처 초안 작성이 진행된다.",
    },
    {
      period: "2025 Q1",
      title: "파일럿 파트너 3사 확보",
      body: "부산권 중장비 사업자 3사와 파일럿 운영 계약이 체결된다.",
    },
    {
      period: "2025 Q3",
      title: "3단계 폴백 배차 알고리즘 검증",
      body: "전용콜·콜센터·공유콜 순차 에스컬레이션 규칙이 현장 데이터로 검증된다.",
    },
    {
      period: "2026 Q1",
      title: "철연 CHEOLYEON v1 출시",
      body: "부산·울산·경남 운영 개시. 전자계약·자동정산 전 기능 공개.",
      emphasis: true,
    },
    {
      period: "2026 Q2",
      title: "해외 시장 검토 개시",
      body: "동남아·중동 중장비 시장의 제도 적합성 조사가 개시된다.",
    },
  ];

  return (
    <section className={`${SECTION_BASE} bg-white border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          TIMELINE · 기록된 여정
        </p>
        <h2
          className="text-[28px] md:text-[40px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-12"
          style={{ lineHeight: 1.2 }}
        >
          기록된 여정
        </h2>
      </Reveal>

      <div className="relative max-w-[960px]">
        <div
          aria-hidden="true"
          className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#002C5F] via-[#E3E8EF] to-[#00AAD2]"
        />

        <div className="space-y-8 md:space-y-10">
          {entries.map((e, i) => (
            <Reveal key={e.period + e.title} delay={i * 0.08}>
              <div className="relative pl-14 md:pl-16">
                <div
                  className={`absolute left-[11px] md:left-[15px] top-1.5 w-[18px] h-[18px] rounded-full border-[3px] ${
                    e.emphasis
                      ? "bg-[#002C5F] border-white"
                      : "bg-white border-[#E3E8EF]"
                  }`}
                  style={{
                    boxShadow: e.emphasis
                      ? "0 0 0 4px rgba(0, 44, 95, 0.12)"
                      : "none",
                  }}
                  aria-hidden="true"
                />
                <p
                  className="text-[13px] font-bold text-[#002C5F] tracking-[0.1em] mb-1.5"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {e.period}
                </p>
                <h3
                  className="text-[18px] md:text-[20px] font-[800] text-[#0A1628] mb-2"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {e.title}
                </h3>
                <p
                  className="text-[14px] md:text-[15px] text-[#3A4A5F] max-w-[720px]"
                  style={{
                    fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
                    lineHeight: 1.75,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {e.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 6. CONTACT
// ═══════════════════════════════════════
function ContactSection() {
  const { business } = copy.footer;
  return (
    <section className={SECTION_BASE}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          CONTACT
        </p>
        <h2
          className="text-[28px] md:text-[40px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-12"
          style={{ lineHeight: 1.2 }}
        >
          문의
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="bg-white border border-[#E3E8EF] rounded-2xl p-8 md:p-10 max-w-[960px]"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div
            className="grid md:grid-cols-2 gap-x-10 gap-y-4 mb-8"
            style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
          >
            <div>
              <p className="text-[10px] text-[#9AA8B8] tracking-[0.2em] uppercase mb-1">
                Address
              </p>
              <p className="text-[14px] text-[#0A1628] font-medium">
                {business.address}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#9AA8B8] tracking-[0.2em] uppercase mb-1">
                Email
              </p>
              <a
                href={`mailto:${business.email}`}
                className="text-[14px] text-[#002C5F] font-medium hover:text-[#0046A4] transition-colors"
              >
                {business.email}
              </a>
            </div>
            <div>
              <p className="text-[10px] text-[#9AA8B8] tracking-[0.2em] uppercase mb-1">
                Phone
              </p>
              <p className="text-[14px] text-[#0A1628] font-medium">
                {business.phone}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#9AA8B8] tracking-[0.2em] uppercase mb-1">
                Representative
              </p>
              <p className="text-[14px] text-[#0A1628] font-medium">
                {business.representative}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E3E8EF] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[13px] text-[#3A4A5F]">문의 및 제휴 접수처</p>
            <a
              href={`mailto:${business.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#002C5F] hover:bg-[#0046A4] text-white text-[14px] font-bold rounded-lg transition-colors min-h-0"
            >
              {business.email}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ═══════════════════════════════════════
// FOOTER — 랜딩 패턴 재사용
// ═══════════════════════════════════════
function CompanyFooter() {
  return (
    <footer className="border-t border-[#E3E8EF] pt-10 pb-8 bg-[#EEF1F5]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#E3E8EF]">
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-[18px] font-black text-[#002C5F] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif" }}
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
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] text-[#3A4A5F] hover:text-[#002C5F] font-medium transition-colors min-h-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-[11px] text-[#6B7B8F] leading-[1.8]"
          style={{ fontFamily: "var(--font-roboto-mono), 'Pretendard', sans-serif" }}
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
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-[#E3E8EF] flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[10px] text-[#9AA8B8]">{copy.footer.copyright}</p>
          <p className="text-[10px] text-[#9AA8B8]">
            철연 · CHEOLYEON은 ㈜바이트포스의 중장비 배차·계약·정산 통합 플랫폼 상표다.
          </p>
        </div>
      </div>
    </footer>
  );
}
