/**
 * 중장비 8종 커스텀 SVG 아이콘
 * 이모지(🏗️⛏️🔝💧📦🚚🚛🕷️) 완전 대체
 *
 * 스타일: 단색 라인 + Safety Orange 액센트
 * 크기: 기본 24px, className으로 조절
 */

interface IconProps {
  className?: string;
  size?: number;
  accent?: string;
}

const D = ({ className = "", size = 24, accent = "#002C5F" }: IconProps) => ({ className, size, accent });

// 1. 크레인
export function CraneIcon(props: IconProps) {
  const { className, size, accent } = D(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22V6L12 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 6L20 6" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 6V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 12V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      <rect x="17" y="18" width="6" height="4" rx="1" stroke={accent} strokeWidth="1.5"/>
      <line x1="2" y1="22" x2="6" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// 2. 스카이 (고소작업차)
export function SkyIcon(props: IconProps) {
  const { className, size, accent } = D(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="18" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 18V12L16 4" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 6H20V8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  );
}

// 3. 카고크레인
export function CargoCraneIcon(props: IconProps) {
  const { className, size, accent } = D(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="16" width="14" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 16V8L20 4" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      <rect x="18" y="10" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="5" cy="22" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="13" cy="22" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// 4. 거미크레인
export function SpiderCraneIcon(props: IconProps) {
  const { className, size, accent } = D(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4V14" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 4L18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      <path d="M4 20L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 20L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 22L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 22L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="8" y="14" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// 5. 펌프카
export function PumpTruckIcon(props: IconProps) {
  const { className, size, accent } = D(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="14" width="20" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 14V8C6 8 8 4 14 4L20 8" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 8L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="20" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="20" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// 6. 굴삭기
export function ExcavatorIcon(props: IconProps) {
  const { className, size, accent } = D(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 20H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="3" y="14" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 14V10L16 6" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6L20 4L22 8L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 10L16 14" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="1" y="20" width="14" height="2" rx="0.5" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

// 7. 지게차
export function ForkliftIcon(props: IconProps) {
  const { className, size, accent } = D(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 18V4" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 4H22V10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 10V18" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="7" cy="20" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="13" cy="20" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// 8. 덤프트럭
export function DumpTruckIcon(props: IconProps) {
  const { className, size, accent } = D(props);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 16L2 10L14 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 10H18L22 14V16H14" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="2" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="6" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// ═══════════════════════════════════════
// ICON MAP (장비명 → 컴포넌트)
// ═══════════════════════════════════════

export const EQUIPMENT_ICON_MAP: Record<string, React.FC<IconProps>> = {
  "크레인": CraneIcon,
  "스카이": SkyIcon,
  "카고크레인": CargoCraneIcon,
  "거미크레인": SpiderCraneIcon,
  "펌프카": PumpTruckIcon,
  "굴삭기": ExcavatorIcon,
  "지게차": ForkliftIcon,
  "덤프": DumpTruckIcon,
};

/** 장비명으로 아이콘 가져오기 (fallback: CraneIcon) */
export function getEquipmentIcon(name: string): React.FC<IconProps> {
  return EQUIPMENT_ICON_MAP[name] || CraneIcon;
}
