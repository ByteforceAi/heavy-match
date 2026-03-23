/**
 * 개발 모드 판별 — Supabase placeholder 환경에서 대시보드 미리보기용
 * Supabase 연결 후에는 자동으로 false 반환
 */
export function isDevPreview(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return !url || url.includes("placeholder");
}
