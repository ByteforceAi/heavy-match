"use client";

/**
 * 철연 CHEOLYEON — Button v1
 *
 * 프로젝트 전체에서 버튼은 이 컴포넌트만 사용한다.
 * (지금까지 페이지마다 버튼을 재발명해 터치 타깃이 28~56px로 들쑥날쑥했다)
 *
 * - 터치 타깃: sm도 40px, 기본 48px — 현장 장갑 손가락 기준
 * - 프레스 물리: scale 0.98 + 섀도 압축 (globals.css .press)
 * - 로딩: 라벨 유지 + 스피너 — 폭이 출렁이지 않는다
 * - 포커스 링: globals.css :focus-visible 전역 규칙
 */

import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-cy-navy text-white hover:bg-cy-navy-mid shadow-[0_1px_2px_rgba(0,44,95,0.2),0_4px_12px_rgba(0,44,95,0.15)] hover:shadow-[0_2px_4px_rgba(0,44,95,0.2),0_8px_20px_rgba(0,44,95,0.22)] active:shadow-[0_1px_2px_rgba(0,44,95,0.2)]",
  secondary:
    "bg-white text-cy-ink border border-cy-line hover:border-cy-navy/35 hover:bg-cy-navy-pale/40 shadow-[0_1px_2px_rgba(0,44,95,0.05)]",
  ghost:
    "bg-transparent text-cy-ink-2 hover:bg-cy-bg-alt hover:text-cy-ink",
  danger:
    "bg-cy-danger text-white hover:bg-[#C82B30] shadow-[0_1px_2px_rgba(229,72,77,0.25),0_4px_12px_rgba(229,72,77,0.2)]",
  success:
    "bg-cy-success text-white hover:bg-cy-success-deep shadow-[0_1px_2px_rgba(0,168,107,0.25),0_4px_12px_rgba(0,168,107,0.2)]",
};

const SIZE: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm gap-1.5 rounded-lg",
  md: "min-h-12 px-5 text-[15px] gap-2 rounded-xl",
  lg: "min-h-14 px-6 text-lg gap-2 rounded-xl",
};

const ICON_SIZE: Record<Size, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Material Symbols 아이콘 이름 (라벨 앞) */
  icon?: string;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, loading = false, fullWidth = false, disabled, className = "", children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`press inline-flex items-center justify-center font-bold tracking-[-0.01em] select-none disabled:opacity-45 disabled:pointer-events-none ${VARIANT[variant]} ${SIZE[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {loading ? (
        <span aria-hidden className={`material-symbols-outlined animate-spin ${ICON_SIZE[size]}`}>
          progress_activity
        </span>
      ) : icon ? (
        <span aria-hidden className={`material-symbols-outlined ${ICON_SIZE[size]}`}>
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  );
});
