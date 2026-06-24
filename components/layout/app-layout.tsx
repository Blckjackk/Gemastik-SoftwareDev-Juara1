"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  userName?: string;
  userRole?: "siswa" | "guru" | "admin";
  notificationCount?: number;
}

export function AppLayout({
  children,
  title,
  userName: propUserName,
  userRole: propUserRole,
  notificationCount = 3,
}: AppLayoutProps) {
  const [userName, setUserName] = useState<string>("Andi Pratama");
  const [userRole, setUserRole] = useState<"siswa" | "guru" | "admin">("siswa");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as any;
    const storedName = localStorage.getItem("userName");

    if (storedRole) {
      setUserRole(storedRole);
    } else if (propUserRole) {
      setUserRole(propUserRole);
    }

    if (storedName) {
      setUserName(storedName);
    } else if (propUserName) {
      setUserName(propUserName);
    }
  }, [propUserRole, propUserName]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar — fixed, 64px offset for main content */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-64 min-w-0">
        <Topbar
          title={title}
          userName={userName}
          userRole={userRole}
          notificationCount={notificationCount}
        />
        <main className="flex-1 px-6 py-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
