import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import DashboardLayout from "@/components/DashboardLayout";
import type { UserRole } from "@/types/database";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      userRole={profile.role as UserRole}
      userName={profile.name}
    >
      {children}
    </DashboardLayout>
  );
}
