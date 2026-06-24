"use client";

import Link from "next/link";
import { FlaskConical, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 text-center">
      {/* Decorative */}
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8 shadow-xl animate-float"
        style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
      >
        <FlaskConical size={40} className="text-white" />
      </div>

      {/* 404 */}
      <p
        className="font-semibold text-[#00838F] mb-2"
        style={{ fontSize: "80px", lineHeight: "1", letterSpacing: "-4px" }}
      >
        404
      </p>

      <h1 className="text-[24px] font-semibold text-[#1E252B] mb-3" style={{ letterSpacing: "-0.2px" }}>
        Halaman tidak ditemukan
      </h1>
      <p className="text-[#64748B] text-[15px] max-w-sm mb-10 leading-relaxed">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        Kembali ke dashboard dan lanjutkan eksperime nmu.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/dashboard"
          id="not-found-dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[15px] text-white transition-all duration-200 active:scale-95"
          style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
        >
          <Home size={16} />
          Kembali ke Dashboard
        </Link>
        <button
          onClick={() => window.history.back()}
          id="not-found-back"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-medium text-[#64748B] border border-[#E2E8F0] hover:bg-white hover:text-[#1E252B] transition-all duration-200"
        >
          <ArrowLeft size={16} />
          Halaman sebelumnya
        </button>
      </div>

      {/* Quick links */}
      <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-[#94A3B8]">
        {[
          ["Dashboard", "/dashboard"],
          ["Simulasi", "/simulations"],
          ["Tugas", "/assignments"],
          ["Profil", "/profile"],
        ].map(([label, href]) => (
          <Link key={href} href={href} className="hover:text-[#00838F] transition-colors">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
