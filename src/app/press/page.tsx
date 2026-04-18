"use client";

/**
 * /press — 철연 프레스킷 페이지
 *
 * 기자·IR·제휴 담당을 위한 공식 자료실.
 * Quick Facts · Boilerplate (3 buckets) · Logo · Brand Colors · Screenshots · Contact.
 *
 * heritage-v1.md 준수:
 *   §3.2.4 ! 금지 — 버튼 라벨 "복사" 뒤 ! 없음
 *   §3.2.5 의문형 훅 금지
 *   §3.2.1 ~입니다 금지 — 판결문 어미
 *   §2.2 Medium Boilerplate = heritageShort (원본 불변)
 *   §2.1 Long Boilerplate = heritageFull.paragraphs[0] (원본 불변)
 *
 * 실제 로고/스크린샷 자산은 배포 후 교체. 현재는 SVG/placeholder 렌더.
 */

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  nav as navCopy,
  footer as footerCopy,
  heritageShort,
  heritageFull,
} from "@/content/copy";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  MotionCard,
} from "@/components/motion/MotionPrimitives";

const SECTION_BASE =
  "py-16 md:py-20 max-w-[1280px] mx-auto px-6 md:px-12";

const CARD_SHADOW = "0 10px 30px rgba(0, 44, 95, 0.06)";

export default function PressPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F6FA] text-[#0A1628]"
      style={{
        fontFamily:
          "var(--font-pretendard), 'Pretendard', 'IBM Plex Sans KR', sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      <PressNav />
      <HeroSection />
      <QuickFactsSection />
      <BoilerplateSection />
      <LogoSection />
      <BrandColorsSection />
      <ScreenshotsSection />
      <MediaContactSection />
      <PressMentionsSection />
      <HeritageCallout />
      <PressFooter />
    </main>
  );
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function PressNav() {
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
          {navCopy.brand.ko}
        </span>
        <span
          className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {navCopy.brand.en}
        </span>
      </Link>

      <ul className="hidden md:flex gap-7 flex-1 list-none m-0 p-0">
        {navCopy.menu.map((item) => (
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
          {navCopy.cta.secondary}
        </Link>
        <Link
          href="/demo"
          className="inline-flex items-center px-4 md:px-5 py-2 text-[13px] font-semibold text-white bg-[#002C5F] hover:bg-[#0046A4] rounded-lg transition-colors min-h-0"
        >
          {navCopy.cta.primary}
        </Link>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════
// 1. HERO
// ═══════════════════════════════════════
function HeroSection() {
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
            PRESS KIT · 언론 자료
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="font-[900] text-[#0A1628] mb-5"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
            }}
          >
            철연 <span className="text-[#002C5F]">보도 자료실</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-[16px] md:text-[18px] text-[#3A4A5F] leading-[1.75] max-w-[720px]"
            style={{
              fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
              letterSpacing: "-0.015em",
            }}
          >
            기사 작성·IR·제휴 검토용 공식 자료. 사용 전 BYTEFORCE 담당자 사전 통지를 권고한다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 2. QUICK FACTS
// ═══════════════════════════════════════
function QuickFactsSection() {
  const facts = [
    { label: "브랜드", value: "철연 · CHEOLYEON" },
    { label: "운영사", value: "㈜바이트포스" },
    { label: "설립", value: "2024" },
    { label: "창업자", value: "이한결" },
    { label: "본사", value: "부산 해운대" },
    { label: "도메인", value: "cheolyeon.com" },
    { label: "시장", value: "중장비 배차·계약·정산" },
    { label: "주요 지역", value: "부산·울산·경남" },
    { label: "언어", value: "한국어 (영문 준비 중)" },
  ];

  return (
    <section className={`${SECTION_BASE} border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          QUICK FACTS
        </p>
        <h2
          className="text-[28px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-10"
          style={{ lineHeight: 1.2 }}
        >
          핵심 정보
        </h2>
      </Reveal>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {facts.map((f) => (
          <StaggerItem key={f.label}>
            <div
              className="bg-white border border-[#E3E8EF] rounded-xl p-5 h-full"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <p
                className="text-[10px] text-[#9AA8B8] tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                {f.label}
              </p>
              <p
                className="text-[15px] md:text-[16px] text-[#0A1628] font-bold"
                style={{
                  fontFamily: "var(--font-roboto-mono), monospace",
                  letterSpacing: "-0.01em",
                }}
              >
                {f.value}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

// ═══════════════════════════════════════
// 3. BOILERPLATE — 3 versions with copy-to-clipboard
// ═══════════════════════════════════════
function BoilerplateSection() {
  const versions = [
    {
      id: "short",
      label: "Short · 1문장",
      body:
        "철연(CHEOLYEON)은 ㈜바이트포스가 운영하는 중장비 배차·계약·정산 통합 플랫폼이다.",
    },
    {
      id: "medium",
      label: "Medium · 3문장",
      body: heritageShort,
    },
    {
      id: "long",
      label: "Long · 단락",
      body: heritageFull.paragraphs[0],
    },
  ];

  return (
    <section className={`${SECTION_BASE} bg-white border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          BOILERPLATE
        </p>
        <h2
          className="text-[28px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-4"
          style={{ lineHeight: 1.2 }}
        >
          공식 보도문 (Boilerplate)
        </h2>
        <p className="text-[14px] text-[#6B7B8F] mb-10 max-w-[720px]">
          원문을 줄일 수는 있다. 바꿀 수는 없다. 3가지 길이 버전 중 맥락에 맞게 인용 가능하다.
        </p>
      </Reveal>

      <div className="space-y-4 max-w-[960px]">
        {versions.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.08}>
            <CopyBlock id={v.id} label={v.label} body={v.body} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CopyBlock({
  id,
  label,
  body,
}: {
  id: string;
  label: string;
  body: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [body]);

  return (
    <div
      className="bg-white border border-[#E3E8EF] rounded-2xl p-6 md:p-7"
      style={{ boxShadow: CARD_SHADOW }}
      id={`boilerplate-${id}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          {label}
        </p>
        <button
          type="button"
          onClick={onCopy}
          aria-live="polite"
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-bold rounded-lg transition-colors min-h-0 ${
            copied
              ? "bg-[#00A86B] text-white"
              : "bg-[#002C5F] text-white hover:bg-[#0046A4]"
          }`}
        >
          {copied ? (
            <>
              <span aria-hidden="true">✓</span>
              <span>복사됨</span>
            </>
          ) : (
            <>
              <span aria-hidden="true">⧉</span>
              <span>복사</span>
            </>
          )}
        </button>
      </div>
      <p
        className="text-[15px] md:text-[16px] text-[#0A1628]"
        style={{
          fontFamily: "'IBM Plex Sans KR', Pretendard, serif",
          lineHeight: 1.85,
          letterSpacing: "-0.015em",
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════
// 4. LOGO DOWNLOADS
// ═══════════════════════════════════════
function LogoSection() {
  const logos = [
    {
      id: "wordmark-navy",
      title: "철연 워드마크",
      variant: "Navy",
      href: "/brand-assets/cheolyeon-wordmark-navy.svg",
      render: () => (
        <LogoTile bg="#F8FAFD">
          <span
            className="text-[48px] font-black text-[#002C5F] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif" }}
          >
            철연
          </span>
        </LogoTile>
      ),
    },
    {
      id: "wordmark-light",
      title: "철연 워드마크",
      variant: "White BG",
      href: "/brand-assets/cheolyeon-wordmark-light.svg",
      render: () => (
        <LogoTile bg="#FFFFFF">
          <span
            className="text-[48px] font-black text-[#0A1628] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif" }}
          >
            철연
          </span>
        </LogoTile>
      ),
    },
    {
      id: "composite",
      title: "철연 + CHEOLYEON",
      variant: "복합",
      href: "/brand-assets/cheolyeon-composite.svg",
      render: () => (
        <LogoTile bg="#F8FAFD">
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-[40px] font-black text-[#002C5F] tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif",
              }}
            >
              철연
            </span>
            <span
              className="text-[11px] text-[#6B7B8F] tracking-[0.3em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              CHEOLYEON
            </span>
          </div>
        </LogoTile>
      ),
    },
    {
      id: "favicon",
      title: "Favicon",
      variant: "Square",
      href: "/brand-assets/cheolyeon-favicon.svg",
      render: () => (
        <LogoTile bg="#002C5F">
          <div className="w-[72px] h-[72px] rounded-xl bg-[#002C5F] flex items-center justify-center border-[2px] border-white/20">
            <span
              className="text-[36px] font-black text-white tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif",
              }}
            >
              철
            </span>
          </div>
        </LogoTile>
      ),
    },
  ];

  return (
    <section className={`${SECTION_BASE} border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          LOGO
        </p>
        <h2
          className="text-[28px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-4"
          style={{ lineHeight: 1.2 }}
        >
          로고 다운로드
        </h2>
        <p className="text-[14px] text-[#6B7B8F] mb-10 max-w-[720px]">
          실제 자산은 배포 후 교체된다. 현재는 SVG 렌더 미리보기가 제공된다.
        </p>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {logos.map((logo) => (
          <StaggerItem key={logo.id}>
            <MotionCard className="p-0 overflow-hidden flex flex-col">
              {logo.render()}
              <div className="p-5 border-t border-[#E3E8EF]">
                <p className="text-[14px] font-bold text-[#0A1628] mb-0.5">
                  {logo.title}
                </p>
                <p
                  className="text-[11px] text-[#6B7B8F] mb-3 tracking-[0.15em] uppercase"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {logo.variant}
                </p>
                <a
                  href={logo.href}
                  download
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#002C5F] hover:text-[#0046A4] transition-colors"
                >
                  <span aria-hidden="true">↓</span>
                  <span>다운로드 (SVG)</span>
                </a>
              </div>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Reveal delay={0.3}>
        <p className="mt-6 text-[11px] text-[#9AA8B8] italic">
          실제 자산은 배포 후 교체.
        </p>
      </Reveal>
    </section>
  );
}

function LogoTile({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg: string;
}) {
  return (
    <div
      className="aspect-[4/3] flex items-center justify-center border-b border-[#E3E8EF]"
      style={{ background: bg }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════
// 5. BRAND COLORS
// ═══════════════════════════════════════
function BrandColorsSection() {
  const colors = [
    { name: "Navy Primary", hex: "#002C5F", text: "#FFFFFF" },
    { name: "Navy Dark", hex: "#001A3D", text: "#FFFFFF" },
    { name: "Navy Mid", hex: "#0046A4", text: "#FFFFFF" },
    { name: "Cyan Accent", hex: "#00AAD2", text: "#FFFFFF" },
    { name: "Ink 900", hex: "#0A1628", text: "#FFFFFF" },
    { name: "BG", hex: "#F4F6FA", text: "#0A1628" },
  ];

  return (
    <section className={`${SECTION_BASE} bg-white border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          COLORS
        </p>
        <h2
          className="text-[28px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-10"
          style={{ lineHeight: 1.2 }}
        >
          브랜드 컬러
        </h2>
      </Reveal>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {colors.map((c) => (
          <StaggerItem key={c.hex}>
            <div
              className="rounded-xl overflow-hidden border border-[#E3E8EF]"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <div
                className="aspect-square flex items-end p-4"
                style={{ background: c.hex }}
              >
                <span
                  className="text-[11px] font-bold tracking-[0.15em] uppercase"
                  style={{
                    color: c.text,
                    fontFamily: "var(--font-roboto-mono), monospace",
                  }}
                >
                  {c.hex}
                </span>
              </div>
              <div className="p-3 bg-white">
                <p className="text-[13px] font-bold text-[#0A1628]">{c.name}</p>
                <p
                  className="text-[11px] text-[#6B7B8F] tracking-[0.1em]"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {c.hex}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

// ═══════════════════════════════════════
// 6. SCREENSHOTS
// ═══════════════════════════════════════
function ScreenshotsSection() {
  const shots = [
    { id: 1, title: "랜딩 페이지", sub: "웹", device: "Desktop" },
    { id: 2, title: "현장소장 모바일", sub: "Request UI", device: "Mobile" },
    { id: 3, title: "대표 경영 대시보드", sub: "Admin", device: "Desktop" },
    { id: 4, title: "E2E 시뮬레이션", sub: "Walkthrough", device: "Split" },
  ];

  return (
    <section className={`${SECTION_BASE} border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          SCREENSHOTS
        </p>
        <h2
          className="text-[28px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-4"
          style={{ lineHeight: 1.2 }}
        >
          스크린샷
        </h2>
        <p className="text-[14px] text-[#6B7B8F] mb-10 max-w-[720px]">
          실제 스크린샷 captured 후 교체된다.
        </p>
      </Reveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {shots.map((s) => (
          <StaggerItem key={s.id}>
            <MotionCard className="p-0 overflow-hidden">
              <div
                className="aspect-[4/3] relative flex items-center justify-center border-b border-[#E3E8EF]"
                style={{
                  background:
                    "linear-gradient(145deg, #001A3D 0%, #002C5F 50%, #0046A4 100%)",
                }}
                role="img"
                aria-label={`${s.title} 자리표시자`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 25% 25%, rgba(0,170,210,0.15) 0%, transparent 60%)",
                  }}
                />
                <div className="relative text-center">
                  <p
                    className="text-[48px] md:text-[64px] font-black text-white/25 tabular-nums mb-2"
                    style={{
                      fontFamily: "var(--font-roboto-mono), monospace",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    0{s.id}
                  </p>
                  <p
                    className="text-[11px] text-white/70 tracking-[0.25em]"
                    style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                  >
                    SCREENSHOT · PLACEHOLDER
                  </p>
                </div>
                <span
                  className="absolute top-4 right-4 text-[10px] text-white/60 tracking-[0.2em] uppercase px-2 py-1 bg-white/10 rounded"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {s.device}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[15px] font-bold text-[#0A1628] mb-0.5">
                  {s.id}. {s.title}
                </p>
                <p className="text-[12px] text-[#6B7B8F]">{s.sub}</p>
              </div>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

// ═══════════════════════════════════════
// 7. MEDIA CONTACT
// ═══════════════════════════════════════
function MediaContactSection() {
  const contacts = [
    {
      label: "언론 문의",
      value: "media@cheolyeon.com",
      href: "mailto:media@cheolyeon.com",
      note: "1차 접수",
    },
    {
      label: "회신",
      value: footerCopy.business.email,
      href: `mailto:${footerCopy.business.email}`,
      note: "2차 회신",
    },
    {
      label: "응답 시간",
      value: "영업일 24시간 이내",
      note: "평균",
    },
  ];

  return (
    <section className={`${SECTION_BASE} bg-white border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          MEDIA CONTACT
        </p>
        <h2
          className="text-[28px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-10"
          style={{ lineHeight: 1.2 }}
        >
          미디어 연락처
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="bg-white border border-[#E3E8EF] rounded-2xl p-8 md:p-10 max-w-[960px]"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {contacts.map((c) => (
              <div key={c.label}>
                <p
                  className="text-[10px] text-[#9AA8B8] tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
                >
                  {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    className="text-[15px] font-bold text-[#002C5F] hover:text-[#0046A4] transition-colors block"
                    style={{
                      fontFamily: "var(--font-roboto-mono), monospace",
                    }}
                  >
                    {c.value}
                  </a>
                ) : (
                  <p
                    className="text-[15px] font-bold text-[#0A1628]"
                    style={{
                      fontFamily: "var(--font-roboto-mono), monospace",
                    }}
                  >
                    {c.value}
                  </p>
                )}
                <p className="text-[11px] text-[#6B7B8F] mt-1">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ═══════════════════════════════════════
// 8. PRESS MENTIONS
// ═══════════════════════════════════════
function PressMentionsSection() {
  const mentions = [
    {
      date: "2026-04-XX",
      title: "첫 공식 출시 보도 (예정)",
      outlet: "TBD",
      status: "pending",
    },
  ];

  return (
    <section className={`${SECTION_BASE} border-b border-[#E3E8EF]`}>
      <Reveal>
        <p
          className="text-[11px] font-bold text-[#002C5F] tracking-[0.25em] mb-3"
          style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
        >
          PRESS MENTIONS
        </p>
        <h2
          className="text-[28px] md:text-[36px] font-[800] text-[#0A1628] tracking-[-0.025em] mb-10"
          style={{ lineHeight: 1.2 }}
        >
          보도 이력
        </h2>
      </Reveal>

      <div className="max-w-[960px] space-y-3">
        {mentions.map((m, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div
              className="bg-white border border-dashed border-[#E3E8EF] rounded-xl p-5 flex items-center gap-5"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <span
                className="text-[12px] font-bold text-[#6B7B8F] tracking-[0.1em] tabular-nums flex-shrink-0"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                {m.date}
              </span>
              <div className="flex-1">
                <p className="text-[14px] font-bold text-[#0A1628]">{m.title}</p>
                <p className="text-[11px] text-[#6B7B8F] mt-0.5">{m.outlet}</p>
              </div>
              <span
                className="text-[10px] px-2.5 py-1 bg-[#F4F6FA] text-[#6B7B8F] rounded-md tracking-[0.15em] uppercase font-bold"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                {m.status}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════
// 9. HERITAGE CALLOUT
// ═══════════════════════════════════════
function HeritageCallout() {
  return (
    <section className={SECTION_BASE}>
      <Reveal>
        <Link
          href="/story"
          className="block max-w-[960px] bg-white border border-[#E3E8EF] rounded-2xl p-6 md:p-8 hover:border-[#002C5F] transition-colors group"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div className="flex items-center gap-5">
            <div
              className="w-[56px] h-[56px] rounded-xl bg-[#002C5F] flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <span
                className="text-white text-[11px] font-bold tracking-[0.1em]"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                1998
              </span>
            </div>
            <div className="flex-1">
              <p
                className="text-[11px] font-bold text-[#002C5F] tracking-[0.2em] mb-1.5"
                style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
              >
                HERITAGE · 브랜드 기원
              </p>
              <p className="text-[15px] md:text-[16px] font-bold text-[#0A1628] mb-1">
                1998 부산일보 기사 원문 전체 열람
              </p>
              <p className="text-[12px] text-[#6B7B8F]">
                §2.1 전문 · 1차 사료 재현 · 영문 번역 · 28년 경과 연표
              </p>
            </div>
            <span
              className="text-[#002C5F] text-[20px] group-hover:translate-x-1 transition-transform flex-shrink-0"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}

// ═══════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════
function PressFooter() {
  return (
    <footer className="border-t border-[#E3E8EF] pt-10 pb-8 bg-[#EEF1F5]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#E3E8EF]">
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-[18px] font-black text-[#002C5F] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-pretendard), 'Pretendard', sans-serif" }}
            >
              {footerCopy.brand.ko}
            </span>
            <span
              className="text-[10px] text-[#6B7B8F] tracking-[0.3em]"
              style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
            >
              {footerCopy.brand.en}
            </span>
            <span className="text-[12px] text-[#6B7B8F] ml-2 hidden md:inline">
              {footerCopy.description}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footerCopy.links.map((link) => (
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
                {footerCopy.business.representative}
              </span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">사업자등록번호:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {footerCopy.business.registrationNumber}
              </span>
            </p>
          </div>
          <div className="space-y-0.5">
            <p>
              <span className="text-[#9AA8B8]">주소:</span>{" "}
              <span className="text-[#3A4A5F] font-medium">
                {footerCopy.business.address}
              </span>
            </p>
            <p>
              <span className="text-[#9AA8B8]">이메일:</span>{" "}
              <a
                href={`mailto:${footerCopy.business.email}`}
                className="text-[#002C5F] hover:text-[#0046A4] font-medium transition-colors"
              >
                {footerCopy.business.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-[#E3E8EF] flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[10px] text-[#9AA8B8]">{footerCopy.copyright}</p>
          <p className="text-[10px] text-[#9AA8B8]">
            철연 · CHEOLYEON은 ㈜바이트포스의 중장비 배차·계약·정산 통합 플랫폼 상표다.
          </p>
        </div>
      </div>
    </footer>
  );
}
