"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  title?: string;
  userName?: string;
  userRole?: "siswa" | "guru" | "admin";
  notificationCount?: number;
}

const roleColors: Record<string, string> = {
  siswa: "bg-blue-100 text-blue-700",
  guru: "bg-purple-100 text-purple-700",
  admin: "bg-teal-100 text-teal-700",
};

const roleLabel: Record<string, string> = {
  siswa: "Siswa",
  guru: "Guru",
  admin: "Admin",
};

export function Topbar({
  title = "Dashboard",
  userName = "Pengguna",
  userRole = "siswa",
  notificationCount = 3,
}: TopbarProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center gap-4 px-6 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[17px] font-semibold text-[#1E252B] truncate leading-tight">
          {title}
        </h1>
        <p className="text-xs text-[#94A3B8] leading-tight">
          Selasa, 24 Juni 2026
        </p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center relative w-56">
        <Search
          size={15}
          className="absolute left-3 text-[#94A3B8] pointer-events-none"
        />
        <Input
          placeholder="Cari simulasi..."
          className="pl-9 h-9 text-sm bg-[#F8FAFC] border-[#E2E8F0] rounded-full focus:ring-1 focus:ring-[#00838F] focus:border-[#00838F] transition-shadow"
        />
      </div>

      {/* Notifications */}
      <button className="relative w-9 h-9 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-[#E2E8F0] transition-colors">
        <Bell size={17} />
        {notificationCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </button>

      {/* User */}
      <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
        <Avatar className="w-9 h-9 ring-2 ring-[#E2E8F0] group-hover:ring-[#00838F] transition-all">
          <AvatarImage src="" alt={userName} />
          <AvatarFallback
            className="text-xs font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-[#1E252B] leading-tight">
            {userName}
          </p>
          <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${roleColors[userRole]}`}
          >
            {roleLabel[userRole]}
          </span>
        </div>
      </div>
    </header>
  );
}
