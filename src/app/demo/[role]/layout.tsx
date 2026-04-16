"use client";

import { useParams } from "next/navigation";
import DemoDashboardLayout from "@/components/DemoDashboardLayout";
import { DemoProvider } from "@/components/DemoProvider";
import DemoRoleSwitcher from "@/components/DemoRoleSwitcher";
import GuidedTour, { TourResetButton } from "@/components/GuidedTour";
import DevNotes from "@/components/DevNotes";
import type { UserRole } from "@/types/database";

const NAMES: Record<string, string> = {
  requester: "김건설 (한양건설)",
  owner: "박중장비 (대한크레인)",
  operator: "이기사",
  callcenter: "정콜센터 (중부콜센터)",
  salesperson: "최영업",
  admin: "관리자 (BYTEFORCE)",
};

export default function DemoRoleLayout({ children }: { children: React.ReactNode }) {
  const { role } = useParams<{ role: string }>();
  const validRole = (["requester", "owner", "operator", "callcenter", "salesperson", "admin"].includes(role) ? role : "requester") as UserRole;

  return (
    <DemoProvider>
      <DemoDashboardLayout userRole={validRole} userName={NAMES[validRole] ?? "테스트"}>
        {/* Tour Reset 플로팅 버튼 */}
        <div className="fixed top-16 right-4 z-[80] md:top-4 md:right-72">
          <TourResetButton role={validRole} />
        </div>
        {children}
      </DemoDashboardLayout>
      <DemoRoleSwitcher />
      <GuidedTour role={validRole} />
      <DevNotes role={validRole} />
    </DemoProvider>
  );
}
