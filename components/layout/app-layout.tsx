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
  userName = "Andi Pratama",
  userRole = "siswa",
  notificationCount = 3,
}: AppLayoutProps) {
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
