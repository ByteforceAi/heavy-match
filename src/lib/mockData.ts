/**
 * 개발 모드 mock 데이터 — Supabase 미연결 시 UI 미리보기용
 */

export const MOCK_EQUIPMENT_TYPES = [
  { id: 1, name: "크레인", icon: "🏗️", sort_order: 1 },
  { id: 2, name: "스카이", icon: "🔝", sort_order: 2 },
  { id: 3, name: "카고크레인", icon: "🚛", sort_order: 3 },
  { id: 4, name: "거미크레인", icon: "🕷️", sort_order: 4 },
  { id: 5, name: "펌프카", icon: "💧", sort_order: 5 },
  { id: 6, name: "굴삭기", icon: "⛏️", sort_order: 6 },
  { id: 7, name: "지게차", icon: "📦", sort_order: 7 },
  { id: 8, name: "덤프", icon: "🚚", sort_order: 8 },
];

export const MOCK_EQUIPMENT_SPECS: Record<number, Array<{ id: number; spec_name: string; sort_order: number }>> = {
  1: [{ id: 1, spec_name: "25T", sort_order: 1 }, { id: 2, spec_name: "50T", sort_order: 2 }, { id: 3, spec_name: "70T", sort_order: 3 }, { id: 4, spec_name: "100T", sort_order: 4 }, { id: 5, spec_name: "200T", sort_order: 5 }],
  2: [{ id: 6, spec_name: "45m", sort_order: 1 }, { id: 7, spec_name: "52m", sort_order: 2 }, { id: 8, spec_name: "58m", sort_order: 3 }, { id: 9, spec_name: "65m", sort_order: 4 }],
  3: [{ id: 10, spec_name: "5T", sort_order: 1 }, { id: 11, spec_name: "8T", sort_order: 2 }, { id: 12, spec_name: "11T", sort_order: 3 }, { id: 13, spec_name: "15T", sort_order: 4 }, { id: 14, spec_name: "25T", sort_order: 5 }],
  4: [{ id: 15, spec_name: "3T", sort_order: 1 }, { id: 16, spec_name: "5T", sort_order: 2 }, { id: 17, spec_name: "8T", sort_order: 3 }, { id: 18, spec_name: "10T", sort_order: 4 }],
  5: [{ id: 19, spec_name: "32m", sort_order: 1 }, { id: 20, spec_name: "37m", sort_order: 2 }, { id: 21, spec_name: "42m", sort_order: 3 }, { id: 22, spec_name: "47m", sort_order: 4 }, { id: 23, spec_name: "52m", sort_order: 5 }],
  6: [{ id: 24, spec_name: "0.6T", sort_order: 1 }, { id: 25, spec_name: "1T", sort_order: 2 }, { id: 26, spec_name: "3T", sort_order: 3 }, { id: 27, spec_name: "6T", sort_order: 4 }, { id: 28, spec_name: "8T", sort_order: 5 }, { id: 29, spec_name: "20T", sort_order: 6 }, { id: 30, spec_name: "30T", sort_order: 7 }],
  7: [{ id: 31, spec_name: "2.5T", sort_order: 1 }, { id: 32, spec_name: "3T", sort_order: 2 }, { id: 33, spec_name: "5T", sort_order: 3 }, { id: 34, spec_name: "7T", sort_order: 4 }, { id: 35, spec_name: "11T", sort_order: 5 }],
  8: [{ id: 36, spec_name: "15T", sort_order: 1 }, { id: 37, spec_name: "25T", sort_order: 2 }],
};

export const MOCK_TIME_UNITS = [
  { id: 1, name: "1시간", hours: 1.0, sort_order: 1 },
  { id: 2, name: "오전(4h)", hours: 4.0, sort_order: 2 },
  { id: 3, name: "오후(4h)", hours: 4.0, sort_order: 3 },
  { id: 4, name: "하루(8h)", hours: 8.0, sort_order: 4 },
];

export function isClientDevPreview(): boolean {
  const url = typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
    : "";
  return !url || url.includes("placeholder");
}
