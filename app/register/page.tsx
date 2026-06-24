"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, FlaskConical, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"siswa" | "guru">("siswa");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — decorative */}
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0F172A 0%, #1E293B 60%, #00838F20 100%)" }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #00838F, transparent)" }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #00838F, #4DD0E1)" }}
          >
            <FlaskConical size={20} className="text-white" />
          </div>
          <div>
            <span className="text-white font-semibold text-[17px] leading-tight block">
              LabSim Merdeka
            </span>
            <span className="text-white/40 text-[11px] uppercase tracking-widest">
              Lab Virtual SMA
            </span>
          </div>
        </div>

        {/* Middle quote */}
        <div className="relative z-10">
          <blockquote className="text-white/80 text-[22px] font-light leading-relaxed mb-6"
            style={{ letterSpacing: "-0.2px" }}>
            "Mulai eksperimen mandiri dan&nbsp;
            <span className="text-[#4DD0E1] font-semibold">temukan hukum-hukum alam di sekitarmu."</span>
          </blockquote>

          {/* Feature list */}
          <div className="space-y-3">
            {[
              { icon: "⚡", label: "Simulasi Interaktif", desc: "Ubah variabel sesuka hati" },
              { icon: "📝", label: "Laporan Praktikum Otomatis", desc: "Ekspor PDF instan" },
              { icon: "📊", label: "Dashboard Guru", desc: "Pantau progress kelas terintegrasi" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/3"
              >
                <span className="text-lg">{f.icon}</span>
                <div>
                  <p className="text-white text-[13px] font-medium leading-tight">{f.label}</p>
                  <p className="text-white/40 text-[11px]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/25 text-[12px]">
          © 2026 LabSim Merdeka — GEMASTIK 2026
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#F8FAFC]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
            >
              <FlaskConical size={16} className="text-white" />
            </div>
            <span className="font-semibold text-[#1E252B]">LabSim Merdeka</span>
          </div>

          <h1 className="text-[28px] font-semibold text-[#1E252B] mb-1" style={{ letterSpacing: "-0.3px" }}>
            Buat akun baru
          </h1>
          <p className="text-[#64748B] text-[15px] mb-8">
            Daftar untuk mengakses semua modul simulasi sains.
          </p>

          {/* Role toggle */}
          <div className="flex bg-[#E2E8F0] rounded-xl p-1 mb-6">
            {(["siswa", "guru"] as const).map((r) => (
              <button
                key={r}
                id={`role-${r}`}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  role === r
                    ? "bg-white text-[#1E252B] shadow-sm"
                    : "text-[#64748B] hover:text-[#1E252B]"
                }`}
              >
                {r === "siswa" ? "👨‍🎓 Siswa" : "👩‍🏫 Guru"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullname" className="text-[13px] font-medium text-[#334155]">
                  Nama Lengkap
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Andi Pratama"
                  required
                  className="h-11 text-[14px] bg-white border-[#E2E8F0] focus:border-[#00838F] focus:ring-1 focus:ring-[#00838F] transition-shadow rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="school" className="text-[13px] font-medium text-[#334155]">
                  Asal Sekolah
                </Label>
                <Input
                  id="school"
                  type="text"
                  placeholder="SMAN 1 Jakarta"
                  required
                  className="h-11 text-[14px] bg-white border-[#E2E8F0] focus:border-[#00838F] focus:ring-1 focus:ring-[#00838F] transition-shadow rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[13px] font-medium text-[#334155]">
                Email Sekolah
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={role === "siswa" ? "siswa@sekolah.sch.id" : "guru@sekolah.sch.id"}
                required
                className="h-11 text-[14px] bg-white border-[#E2E8F0] focus:border-[#00838F] focus:ring-1 focus:ring-[#00838F] transition-shadow rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[13px] font-medium text-[#334155]">
                Kata Sandi
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="h-11 text-[14px] bg-white border-[#E2E8F0] focus:border-[#00838F] focus:ring-1 focus:ring-[#00838F] transition-shadow rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl text-[15px] font-medium text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Pendaftaran...
                </>
              ) : (
                <>
                  Daftar Akun Baru
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[13px] text-[#94A3B8]">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-[#00838F] font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
