import { AppLayout } from "@/components/layout/app-layout";
import { SimulationCard } from "@/components/simulation-card";
import Link from "next/link";
import {
  ChevronRight, FlaskConical, ClipboardList, BookOpen,
  AlertCircle, Star, Plus, Calendar, User, FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Mock Data ────────────────────────────────────────────────
const SIMULATIONS_CATALOG = [
  { slug: "gerak-parabola", title: "Gerak Parabola", subject: "fisika" as const, description: "Animasi peluru bergerak — hitung H_maks, jangkauan, waktu terbang.", difficulty: "SMA Kelas X" as const, duration: "30 menit", studentCount: 1240 },
  { slug: "hukum-ohm", title: "Hukum Ohm", subject: "fisika" as const, description: "Rangkai resistor seri/paralel, animasi aliran elektron, LED menyala.", difficulty: "SMA Kelas XII" as const, duration: "40 menit", studentCount: 890 },
  { slug: "titrasi-asam-basa", title: "Titrasi Asam-Basa", subject: "kimia" as const, description: "Buret + Erlenmeyer, kurva pH real-time, auto-deteksi titik ekuivalen.", difficulty: "SMA Kelas XI" as const, duration: "40 menit", studentCount: 980, isNew: true },
  { slug: "genetika-mendel", title: "Genetika Mendel", subject: "biologi" as const, description: "Punnett Square interaktif monohibrid & dihibrid, rasio fenotipe.", difficulty: "SMA Kelas XII" as const, duration: "35 menit", studentCount: 760 },
];

const assignmentTargets = [
  { id: "cls1", name: "XII IPA 1", count: 32 },
  { id: "cls2", name: "XII IPA 2", count: 30 },
  { id: "cls3", name: "XI IPA 1", count: 28 },
  { id: "cls4", name: "XI IPA 2", count: 30 },
];

export default function NewAssignmentPage() {
  return (
    <AppLayout title="Buat Tugas Baru" userName="Bu Sari" userRole="guru">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-[#94A3B8]">
          <Link href="/assignments" className="hover:text-[#00838F] transition-colors">Tugas</Link>
          <ChevronRight size={13} />
          <span className="text-[#1E252B]">Buat Tugas Baru</span>
        </nav>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-[#F1F5F9]">
            <h2 className="text-[17px] font-semibold text-[#1E252B]">Detail Tugas</h2>
            <p className="text-[13px] text-[#94A3B8] mt-0.5">Isi informasi tugas yang akan diberikan ke siswa</p>
          </div>

          <div className="p-6 space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#334155] block">
                Judul Tugas <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Gerak Parabola — Variasi Sudut Peluncuran"
                defaultValue=""
                className="w-full text-[14px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#00838F] focus:border-[#00838F] transition-shadow"
              />
            </div>

            {/* Instruction */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#334155] block">Instruksi untuk Siswa</label>
              <textarea
                rows={3}
                placeholder="Tuliskan instruksi, tujuan pembelajaran, atau hal yang perlu diperhatikan siswa..."
                className="w-full text-[14px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#00838F] focus:border-[#00838F] transition-shadow resize-none"
              />
            </div>

            {/* Deadline */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#334155] flex items-center gap-1.5">
                <Calendar size={13} />
                Batas Waktu <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                defaultValue="2026-06-30T23:59"
                className="text-[14px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#00838F] transition-shadow"
              />
            </div>
          </div>
        </div>

        {/* Choose simulation */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="p-6 border-b border-[#F1F5F9]">
            <h2 className="text-[17px] font-semibold text-[#1E252B]">Pilih Simulasi</h2>
            <p className="text-[13px] text-[#94A3B8] mt-0.5">Satu tugas = satu simulasi</p>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SIMULATIONS_CATALOG.map((sim) => (
              <SimulationCard key={sim.slug} {...sim} />
            ))}
          </div>
        </div>

        {/* Choose class */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="p-6 border-b border-[#F1F5F9]">
            <h2 className="text-[17px] font-semibold text-[#1E252B]">Pilih Kelas</h2>
            <p className="text-[13px] text-[#94A3B8] mt-0.5">Pilih satu atau lebih kelas yang mendapat tugas ini</p>
          </div>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {assignmentTargets.map((cls) => (
              <label key={cls.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#E2E8F0] cursor-pointer hover:border-[#00838F] transition-colors">
                <input type="checkbox" className="accent-[#00838F]" defaultChecked={cls.id === "cls1"} />
                <div>
                  <p className="text-[13px] font-semibold text-[#1E252B]">{cls.name}</p>
                  <p className="text-[11px] text-[#94A3B8]">{cls.count} siswa</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <Link href="/assignments" className="text-[14px] text-[#64748B] hover:text-[#1E252B] transition-colors">
            ← Batal
          </Link>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-xl text-[14px] font-medium bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] transition-colors">
              Simpan Draft
            </button>
            <button className="px-5 py-2.5 rounded-xl text-[14px] font-medium text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}>
              Buat Tugas
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
