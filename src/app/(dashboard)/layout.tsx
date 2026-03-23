import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import DashboardLayout from "@/components/DashboardLayout";
import type { UserRole } from "@/types/database";

// 개발 모드에서 미리보기할 역할 (원하는 역할로 변경 가능)
const DEV_PREVIEW_ROLE: UserRole | null =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")
    ? "requester"  // "owner" | "operator" | "callcenter" | "salesperson" | "admin"
    : null;

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 개발 모드: Supabase 없이 대시보드 미리보기
  if (DEV_PREVIEW_ROLE) {
    return (
      <DashboardLayout
        userRole={DEV_PREVIEW_ROLE}
        userName="테스트 사용자"
      >
        {children}
      </DashboardLayout>
    );
  }

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("name, role")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/register");
  }

  return (
    <DashboardLayout
      userRole={(profile as { role: string; name: string }).role as UserRole}
      userName={(profile as { role: string; name: string }).name}
    >
      {children}
    </DashboardLayout>
  );
}
