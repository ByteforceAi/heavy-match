"use client";

/**
 * EmptyState — 철연 CHEOLYEON 대시보드 공용 빈 상태 컴포넌트
 *
 * 6개 역할(장비요청자 / 사장 / 기사 / 콜센터 / 영업사원 / 관리자)의
 * 대시보드에서 데이터가 없을 때 표출된다. 판결문 어미(~한다/~된다)로
 * 통일한 짧은 내레이션 + 인라인 SVG 일러스트 + CTA 조합으로 구성된다.
 *
 * 디자인 원칙:
 * - Navy (#002C5F) + Cyan (#00AAD2) + White 팔레트
 * - 일러스트 130x130, 모노라인 + 최소한의 Cyan accent
 * - 감탄 부호(!) · 의문형 훅 · "우리" 1인칭 금지 (heritage-v1.md §3)
 *
 * 관련 문서: docs/brand/heritage-v1.md §3 (금지 카피) · §4 (허용 구조)
 */

import Link from "next/link";
import type { JSX, ReactNode } from "react";
import { Reveal, MotionButton } from "@/components/motion/MotionPrimitives";

// ═══════════════════════════════════════
// Types
// ═══════════════════════════════════════

export type EmptyStateIllustration =
  | "dispatch"
  | "call"
  | "work"
  | "partner"
  | "data"
  | "custom";

export type EmptyStateSize = "sm" | "md" | "lg";

export interface EmptyStateCTA {
  label: string;
  href: string;
}

export interface EmptyStateProps {
  // Visual
  icon?: string;
  illustration?: EmptyStateIllustration;
  customIllustration?: ReactNode;

  // Content
  title: string;
  description: string;

  // Action
  primaryCTA?: EmptyStateCTA;
  secondaryCTA?: EmptyStateCTA;

  // Layout
  size?: EmptyStateSize;
  className?: string;
}

// ═══════════════════════════════════════
// Size tokens
// ═══════════════════════════════════════

const SIZE_MAP: Record<
  EmptyStateSize,
  {
    illustration: number;
    padding: string;
    titleClass: string;
    descriptionClass: string;
    gap: string;
  }
> = {
  sm: {
    illustration: 96,
    padding: "py-8 px-5",
    titleClass: "text-[17px]",
    descriptionClass: "text-[13px]",
    gap: "gap-3",
  },
  md: {
    illustration: 130,
    padding: "py-12 px-6",
    titleClass: "text-[20px]",
    descriptionClass: "text-[14px]",
    gap: "gap-4",
  },
  lg: {
    illustration: 160,
    padding: "py-16 px-8",
    titleClass: "text-[24px]",
    descriptionClass: "text-[15px]",
    gap: "gap-5",
  },
};

// ═══════════════════════════════════════
// EmptyState
// ═══════════════════════════════════════

export function EmptyState({
  icon,
  illustration = "data",
  customIllustration,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  size = "md",
  className = "",
}: EmptyStateProps): JSX.Element {
  const sz = SIZE_MAP[size];

  const illustrationNode =
    illustration === "custom" && customIllustration
      ? customIllustration
      : renderIllustration(illustration, sz.illustration);

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${sz.padding} ${sz.gap} ${className}`}
    >
      <Reveal delay={0.05} direction="up">
        <div
          className="flex items-center justify-center"
          style={{ width: sz.illustration, height: sz.illustration }}
          aria-hidden="true"
        >
          {icon ? (
            <span
              className="material-symbols-outlined text-[#002C5F]"
              style={{ fontSize: sz.illustration * 0.55 }}
            >
              {icon}
            </span>
          ) : (
            illustrationNode
          )}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <h3
          className={`font-bold text-[#0A1628] tracking-[-0.02em] ${sz.titleClass}`}
        >
          {title}
        </h3>
      </Reveal>

      <Reveal delay={0.2}>
        <p
          className={`text-[#3A4A5F] leading-[1.75] max-w-[420px] ${sz.descriptionClass}`}
        >
          {description}
        </p>
      </Reveal>

      {(primaryCTA || secondaryCTA) && (
        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2">
            {primaryCTA && (
              <Link href={primaryCTA.href}>
                <MotionButton
                  variant="primary"
                  className="px-5 py-2.5 text-[13px] inline-flex items-center gap-2"
                >
                  {primaryCTA.label}
                  <span aria-hidden="true">→</span>
                </MotionButton>
              </Link>
            )}
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <MotionButton
                  variant="secondary"
                  className="px-5 py-2.5 text-[13px]"
                >
                  {secondaryCTA.label}
                </MotionButton>
              </Link>
            )}
          </div>
        </Reveal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// Inline SVG illustrations (130x130 base)
// ─ monochrome Navy(#002C5F) + Cyan(#00AAD2) accent ─
// ═══════════════════════════════════════

function renderIllustration(
  key: EmptyStateIllustration,
  size: number,
): ReactNode {
  switch (key) {
    case "dispatch":
      return <DispatchIllustration size={size} />;
    case "call":
      return <CallIllustration size={size} />;
    case "work":
      return <WorkIllustration size={size} />;
    case "partner":
      return <PartnerIllustration size={size} />;
    case "data":
      return <DataIllustration size={size} />;
    default:
      return <DataIllustration size={size} />;
  }
}

interface SvgProps {
  size: number;
}

const NAVY = "#002C5F";
const NAVY_SOFT = "#6B7B8F";
const CYAN = "#00AAD2";
const HAIRLINE = "#E3E8EF";

/**
 * Dispatch — 좌측 하단에서 우측 상단으로 향하는 화살표 궤적 +
 * 굴삭기(excavator) 실루엣 최소선.
 */
function DispatchIllustration({ size }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ground line */}
      <line
        x1="12"
        y1="104"
        x2="118"
        y2="104"
        stroke={HAIRLINE}
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      {/* arrow trajectory */}
      <path
        d="M18 96 Q 55 40 100 28"
        stroke={CYAN}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 5"
      />
      <path
        d="M92 22 L 102 26 L 98 36"
        stroke={CYAN}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* excavator — cab + boom */}
      <rect
        x="26"
        y="82"
        width="28"
        height="18"
        rx="2"
        stroke={NAVY}
        strokeWidth="1.8"
        fill="white"
      />
      <path
        d="M32 82 L 36 72 L 48 72 L 52 82"
        stroke={NAVY}
        strokeWidth="1.8"
        fill="white"
        strokeLinejoin="round"
      />
      {/* boom */}
      <path
        d="M50 78 L 72 58 L 82 66 L 78 74"
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* bucket */}
      <path
        d="M78 74 L 84 82 L 92 80 L 88 72 Z"
        stroke={NAVY}
        strokeWidth="1.6"
        fill="white"
        strokeLinejoin="round"
      />
      {/* tracks */}
      <rect
        x="22"
        y="100"
        width="36"
        height="6"
        rx="3"
        stroke={NAVY}
        strokeWidth="1.6"
        fill="white"
      />
      <circle cx="28" cy="103" r="1.2" fill={NAVY} />
      <circle cx="40" cy="103" r="1.2" fill={NAVY} />
      <circle cx="52" cy="103" r="1.2" fill={NAVY} />
    </svg>
  );
}

/**
 * Call — 전화기 실루엣 + 동심원 음파(ring) 2개.
 */
function CallIllustration({ size }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* outer waves */}
      <circle
        cx="65"
        cy="65"
        r="52"
        stroke={CYAN}
        strokeWidth="1.2"
        strokeDasharray="2 6"
        opacity="0.55"
      />
      <circle
        cx="65"
        cy="65"
        r="38"
        stroke={CYAN}
        strokeWidth="1.5"
        strokeDasharray="2 5"
        opacity="0.8"
      />
      {/* handset */}
      <path
        d="M48 54 Q 50 48 57 50 L 64 57 Q 66 59 64 62 L 61 65 Q 66 74 76 79 L 79 76 Q 81 74 83 76 L 90 83 Q 92 90 86 92 Q 72 95 58 82 Q 45 69 48 54 Z"
        fill="white"
        stroke={NAVY}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* accent dot */}
      <circle cx="88" cy="42" r="4" fill={CYAN} />
      <circle cx="88" cy="42" r="2" fill="white" />
    </svg>
  );
}

/**
 * Work — 안전모 실루엣 + 체크마크.
 */
function WorkIllustration({ size }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* base line */}
      <line
        x1="20"
        y1="100"
        x2="110"
        y2="100"
        stroke={HAIRLINE}
        strokeWidth="1.5"
      />
      {/* hard hat dome */}
      <path
        d="M36 82 Q 36 52 65 50 Q 94 52 94 82 Z"
        fill="white"
        stroke={NAVY}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* brim */}
      <rect
        x="28"
        y="80"
        width="74"
        height="6"
        rx="2"
        fill="white"
        stroke={NAVY}
        strokeWidth="2"
      />
      {/* ridge */}
      <path
        d="M50 52 L 50 80"
        stroke={NAVY}
        strokeWidth="1.6"
        opacity="0.6"
      />
      <path
        d="M80 52 L 80 80"
        stroke={NAVY}
        strokeWidth="1.6"
        opacity="0.6"
      />
      <path
        d="M65 50 L 65 80"
        stroke={NAVY}
        strokeWidth="1.6"
        opacity="0.45"
      />
      {/* check badge bottom-right */}
      <circle cx="96" cy="96" r="14" fill={CYAN} />
      <path
        d="M90 96 L 94 100 L 102 92"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Partner — 두 노드(파트너사)가 핸드셰이크 라인으로 연결된 최소 구성.
 */
function PartnerIllustration({ size }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* horizon */}
      <line
        x1="18"
        y1="98"
        x2="112"
        y2="98"
        stroke={HAIRLINE}
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      {/* left node */}
      <circle
        cx="38"
        cy="60"
        r="18"
        fill="white"
        stroke={NAVY}
        strokeWidth="2"
      />
      {/* right node */}
      <circle
        cx="92"
        cy="60"
        r="18"
        fill="white"
        stroke={NAVY}
        strokeWidth="2"
      />
      {/* link */}
      <line
        x1="56"
        y1="60"
        x2="74"
        y2="60"
        stroke={CYAN}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* figure silhouettes — simple head */}
      <circle cx="38" cy="54" r="5" fill={NAVY} />
      <path
        d="M28 72 Q 38 64 48 72"
        stroke={NAVY}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="92" cy="54" r="5" fill={NAVY} />
      <path
        d="M82 72 Q 92 64 102 72"
        stroke={NAVY}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* accent */}
      <circle cx="65" cy="60" r="3" fill={CYAN} />
    </svg>
  );
}

/**
 * Data — 빈 차트 · 대시드 축.
 */
function DataIllustration({ size }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* y axis */}
      <line
        x1="26"
        y1="20"
        x2="26"
        y2="104"
        stroke={NAVY_SOFT}
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      {/* x axis */}
      <line
        x1="26"
        y1="104"
        x2="114"
        y2="104"
        stroke={NAVY_SOFT}
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      {/* gridlines */}
      <line x1="26" y1="80" x2="114" y2="80" stroke={HAIRLINE} strokeWidth="1" />
      <line x1="26" y1="56" x2="114" y2="56" stroke={HAIRLINE} strokeWidth="1" />
      <line x1="26" y1="32" x2="114" y2="32" stroke={HAIRLINE} strokeWidth="1" />
      {/* bar ghosts */}
      <rect
        x="38"
        y="76"
        width="12"
        height="28"
        rx="1.5"
        fill="white"
        stroke={NAVY}
        strokeWidth="1.6"
        strokeDasharray="2 3"
      />
      <rect
        x="58"
        y="60"
        width="12"
        height="44"
        rx="1.5"
        fill="white"
        stroke={NAVY}
        strokeWidth="1.6"
        strokeDasharray="2 3"
      />
      <rect
        x="78"
        y="68"
        width="12"
        height="36"
        rx="1.5"
        fill="white"
        stroke={NAVY}
        strokeWidth="1.6"
        strokeDasharray="2 3"
      />
      {/* cyan accent bar */}
      <rect
        x="98"
        y="50"
        width="12"
        height="54"
        rx="1.5"
        fill="white"
        stroke={CYAN}
        strokeWidth="1.8"
      />
      <rect x="98" y="96" width="12" height="8" rx="1.5" fill={CYAN} />
    </svg>
  );
}

export default EmptyState;
