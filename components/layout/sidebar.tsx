"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FlaskConical,
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  User,
  ChevronRight,
  Beaker,
  Atom,
  Dna,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";

const subjectItems = [
  { label: "Fisika", icon: Atom, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Kimia", icon: Beaker, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Biologi", icon: Dna, color: "text-green-600", bg: "bg-green-50" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<"siswa" | "guru" | "admin">("siswa");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as any;
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const navItems = [
    {
      href: role === "guru" ? "/dashboard/guru" : "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/simulations",
      label: "Simulasi",
      icon: FlaskConical,
    },
    {
      href: role === "guru" ? "/assignments/new" : "/assignments",
      label: role === "guru" ? "Buat Tugas" : "Tugas",
      icon: ClipboardList,
    },
    {
      href: "/profile",
      label: "Profil",
      icon: User,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col z-30 border-r border-[#E2E8F0] bg-[#F8FAFC]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E2E8F0]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm"
          style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
        >
          L
        </div>
        <div>
          <span className="text-[15px] font-semibold text-[#1E252B] leading-tight block">
            LabSim
          </span>
          <span className="text-[11px] text-[#64748B] tracking-wide uppercase leading-tight block">
            Merdeka
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8]">
          Menu
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-[#00838F] text-white shadow-sm"
                      : "text-[#334155] hover:bg-[#E2E8F0] hover:text-[#1E252B]"
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(
                      "shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-white" : "text-[#64748B]"
                    )}
                  />
                  {item.label}
                  {isActive && (
                    <ChevronRight size={14} className="ml-auto opacity-60" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Subject filters */}
        <p className="px-3 mt-6 mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8]">
          Mata Pelajaran
        </p>
        <ul className="space-y-1">
          {subjectItems.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.label}>
                <Link
                  href={`/simulations?subject=${s.label.toLowerCase()}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#334155] hover:bg-[#E2E8F0] transition-colors duration-150 group"
                >
                  <span
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                      s.bg
                    )}
                  >
                    <Icon size={14} className={s.color} />
                  </span>
                  {s.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: user + logout */}
      <div className="p-3 border-t border-[#E2E8F0] space-y-1">
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#334155] hover:bg-[#E2E8F0] transition-colors"
        >
          <Settings size={17} className="text-[#64748B] shrink-0" />
          Pengaturan
        </Link>
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={17} className="shrink-0" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
