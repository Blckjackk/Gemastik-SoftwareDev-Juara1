import { AppLayout } from "@/components/layout/app-layout";
import Link from "next/link";
import {
  Users, ClipboardList, TrendingUp, BookOpen, CheckCircle2,
  Clock, AlertCircle, Download, Plus, ChevronRight, Star,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────
const classStats = [
  { label: "Total Siswa", value: "32", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Tugas Aktif", value: "5", icon: ClipboardList, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Rata-Rata Kelas", value: "83", icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Submission Diterima", value: "128", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
];

const assignments = [
  {
    id: "a1", title: "Gerak Parabola — Variasi Sudut",
    simulation: "gerak-parabola", class: "XII IPA 1",
    deadline: "26 Jun 2026", total: 32, submitted: 24, graded: 18,
  },
  {
    id: "a2", title: "Hukum Ohm — Seri vs Paralel",
    simulation: "hukum-ohm", class: "XII IPA 1",
    deadline: "28 Jun 2026", total: 32, submitted: 10, graded: 6,
  },
  {
    id: "a3", title: "Titrasi NaOH + HCl",
    simulation: "titrasi-asam-basa", class: "XI IPA 2",
    deadline: "30 Jun 2026", total: 30, submitted: 5, graded: 0,
  },
];

const recentSubmissions = [
  { name: "Andi Pratama", assignment: "Gerak Parabola", score: 92, status: "graded" as const, avatar: "AP" },
  { name: "Sari Dewi", assignment: "Gerak Parabola", score: 88, status: "graded" as const, avatar: "SD" },
  { name: "Budi Santoso", assignment: "Gerak Parabola", score: null, status: "submitted" as const, avatar: "BS" },
  { name: "Rina Wati", assignment: "Hukum Ohm", score: null, status: "submitted" as const, avatar: "RW" },
  { name: "Doni Kusuma", assignment: "Hukum Ohm", score: null, status: "in-progress" as const, avatar: "DK" },
];

const statusConfig = {
  graded: { label: "Dinilai", color: "text-green-600 bg-green-50" },
  submitted: { label: "Dikumpulkan", color: "text-blue-600 bg-blue-50" },
  "in-progress": { label: "Dikerjakan", color: "text-orange-500 bg-orange-50" },
};

// ─── Page ─────────────────────────────────────────────────────
export default function GuruDashboardPage() {
  return (
    <AppLayout title="Dashboard Guru" userName="Bu Sari" userRole="guru">
      {/* Welcome */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h2 className="text-[22px] font-semibold text-[#1E252B]" style={{ letterSpacing: "-0.2px" }}>
            Halo, Bu Sari! 👩‍🏫
          </h2>
          <p className="text-[#64748B] text-sm mt-0.5">
            Kelas XII IPA 1 &amp; XI IPA 2 — Selasa, 24 Juni 2026
          </p>
        </div>
        <Link
          href="/assignments/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
        >
          <Plus size={15} />
          Buat Tugas Baru
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {classStats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={s.color} />
              </div>
              <p className="text-2xl font-semibold text-[#1E252B]">{s.value}</p>
              <p className="text-[12px] text-[#64748B] mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Assignment list */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-semibold text-[#1E252B]">Tugas Aktif</h3>
            <Link href="/assignments" className="text-[12px] text-[#00838F] hover:underline flex items-center gap-1">
              Semua Tugas <ChevronRight size={12} />
            </Link>
          </div>

          <div className="space-y-4">
            {assignments.map((a) => {
              const submittedPct = Math.round((a.submitted / a.total) * 100);
              const gradedPct = Math.round((a.graded / a.total) * 100);
              return (
                <div key={a.id} className="p-4 rounded-xl border border-[#F1F5F9] hover:border-[#E2E8F0] hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[13px] font-semibold text-[#1E252B] group-hover:text-[#00838F] transition-colors">{a.title}</p>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">{a.class} · deadline {a.deadline}</p>
                    </div>
                    <Link
                      href={`/assignments/${a.id}`}
                      className="text-[11px] text-[#00838F] hover:underline shrink-0 ml-2"
                    >
                      Detail →
                    </Link>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-[#94A3B8]">
                      <span>Dikumpulkan: {a.submitted}/{a.total}</span>
                      <span>Dinilai: {a.graded}/{a.total}</span>
                    </div>
                    <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden relative">
                      <div className="h-full bg-blue-200 rounded-full transition-all" style={{ width: `${submittedPct}%` }} />
                      <div className="absolute inset-y-0 left-0 bg-[#00838F] rounded-full transition-all" style={{ width: `${gradedPct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent submissions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-semibold text-[#1E252B]">Submission Terbaru</h3>
          </div>

          <div className="space-y-3">
            {recentSubmissions.map((sub, i) => {
              const s = statusConfig[sub.status];
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer group">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                    style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
                  >
                    {sub.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1E252B] truncate">{sub.name}</p>
                    <p className="text-[11px] text-[#94A3B8] truncate">{sub.assignment}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {sub.score !== null ? (
                      <div className="flex items-center gap-1 text-[13px] font-semibold text-[#1E252B]">
                        <Star size={11} className="text-[#EAB308]" fill="currentColor" />
                        {sub.score}
                      </div>
                    ) : (
                      <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${s.color}`}>
                        {s.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] transition-colors">
              <Download size={14} />
              Export Rekap CSV
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
