"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { UserRole } from "@/types/database";

interface DemoContextType {
  isDemo: boolean;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
}

const DemoContext = createContext<DemoContextType>({
  isDemo: false,
  currentRole: "requester",
  setRole: () => {},
  userName: "",
});

export function useDemoContext() {
  return useContext(DemoContext);
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>("requester");

  const names: Record<UserRole, string> = {
    requester: "김건설 (한양건설)",
    owner: "박중장비 (대한크레인)",
    operator: "이기사",
    callcenter: "정콜센터 (중부콜센터)",
    salesperson: "최영업",
    admin: "관리자 (BYTEFORCE)",
  };

  const setRole = useCallback((role: UserRole) => {
    setCurrentRole(role);
  }, []);

  return (
    <DemoContext.Provider value={{ isDemo: true, currentRole, setRole, userName: names[currentRole] }}>
      {children}
    </DemoContext.Provider>
  );
}
