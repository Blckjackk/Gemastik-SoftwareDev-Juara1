import { AppLayout } from "@/components/layout/app-layout";
import { SimulationCard } from "@/components/simulation-card";
import {
  TrendingUp,
  ClipboardList,
  FlaskConical,
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

/* =====================
   Mock Data
   ===================== */
const stats = [
  {
    label: "Simulasi Selesai",
    value: "12",
    sub: "+3 minggu ini",
    icon: FlaskConical,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    label: "Tugas Aktif",
    value: "4",
    sub: "2 mendekati deadline",
    icon: ClipboardList,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    label: "Rata-Rata Nilai",
    value: "87",
    sub: "dari 5 laporan",
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Materi Dikuasai",
    value: "18",
    sub: "dari 30 topik",
    icon: BookOpen,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const recentAssignments = [
  {
    title: "Gerak Parabola — Eksperimen 2",
    subject: "Fisika",
    dueDate: "26 Jun 2026",
    status: "in-progress" as const,
    progress: 60,
  },
  {
    title: "Titrasi NaOH + HCl",
    subject: "Kimia",
    dueDate: "28 Jun 2026",
    status: "not-started" as const,
    progress: 0,
  },
  {
    title: "Genetika Mendel — Monohibrid",
    subject: "Biologi",
    dueDate: "30 Jun 2026",
    status: "not-started" as const,
    progress: 0,
  },
];

const recommendedSims = [
  {
    slug: "gerak-parabola",
    title: "Gerak Parabola",
    subject: "fisika" as const,
    description: "Pelajari gerak dua dimensi — hitung jarak, ketinggian maksimum, dan waktu terbang dengan animasi real-time.",
    phase: "Semester 1 — Kelas X",
    difficulty: "SMA Kelas X" as const,
    duration: "30 menit",
    studentCount: 1240,
    isNew: false,
  },
  {
    slug: "titrasi-asam-basa",
    title: "Titrasi Asam-Basa",
    subject: "kimia" as const,
    description: "Simulasi titrasi dengan kurva pH real-time. Auto-deteksi titik ekuivalen dan perubahan warna indikator.",
    phase: "Semester 2 — Kelas XI",
    difficulty: "SMA Kelas XI" as const,
    duration: "40 menit",
    studentCount: 980,
    isNew: true,
  },
  {
    slug: "genetika-mendel",
    title: "Genetika Mendel",
    subject: "biologi" as const,
    description: "Buat Punnett Square interaktif untuk monohibrid dan dihibrid. Hitung rasio fenotipe dan genotipe.",
    phase: "Semester 1 — Kelas XII",
    difficulty: "SMA Kelas XII" as const,
    duration: "35 menit",
    studentCount: 760,
    isNew: false,
  },
];

const statusConfig = {
  "in-progress": { label: "Dikerjakan", color: "text-blue-600 bg-blue-50", icon: Clock },
  "not-started": { label: "Belum Mulai", color: "text-orange-500 bg-orange-50", icon: AlertCircle },
  "submitted":   { label: "Selesai", color: "text-green-600 bg-green-50", icon: CheckCircle2 },
};

const subjectColor: Record<string, string> = {
  Fisika: "text-blue-600",
  Kimia: "text-purple-600",
  Biologi: "text-green-600",
};

/* =====================
   Page
   ===================== */
export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard" userName="Andi Pratama" userRole="siswa">
      {/* Welcome */}
      <div className="mb-7">
        <h2 className="text-[22px] font-semibold text-[#1E252B]" style={{ letterSpacing: "-0.2px" }}>
          Halo, Andi! 👋
        </h2>
        <p className="text-[#64748B] text-sm mt-0.5">
          Kamu punya <span className="font-semibold text-orange-500">4 tugas aktif</span>. Yuk lanjutkan eksperimen.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={s.color} />
              </div>
              <p className="text-2xl font-semibold text-[#1E252B]">{s.value}</p>
              <p className="text-[12px] font-medium text-[#334155] mt-0.5">{s.label}</p>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Main grid: assignments + recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Assignments */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-semibold text-[#1E252B]">Tugas Aktif</h3>
            <Link
              href="/assignments"
              className="text-[12px] text-[#00838F] hover:underline flex items-center gap-1"
            >
              Semua <ArrowRight size={11} />
            </Link>
          </div>

          <ul className="space-y-3">
            {recentAssignments.map((a, i) => {
              const s = statusConfig[a.status];
              const StatusIcon = s.icon;
              return (
                <li
                  key={i}
                  className="p-4 rounded-xl border border-[#F1F5F9] hover:border-[#E2E8F0] hover:shadow-sm transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#1E252B] leading-tight group-hover:text-[#00838F] transition-colors truncate">
                        {a.title}
                      </p>
                      <p className={`text-[11px] font-medium mt-0.5 ${subjectColor[a.subject] ?? "text-gray-500"}`}>
                        {a.subject}
                      </p>
                    </div>
                    <span className={`shrink-0 text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1 ${s.color}`}>
                      <StatusIcon size={10} />
                      {s.label}
                    </span>
                  </div>

                  {a.status === "in-progress" && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-[#94A3B8] mb-1">
                        <span>Progress</span>
                        <span>{a.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#00838F] transition-all duration-500"
                          style={{ width: `${a.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] text-[#94A3B8] mt-2 flex items-center gap-1">
                    <Clock size={10} />
                    Deadline: {a.dueDate}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Recommended simulations */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-semibold text-[#1E252B]">Simulasi Rekomendasi</h3>
            <Link
              href="/simulations"
              className="text-[12px] text-[#00838F] hover:underline flex items-center gap-1"
            >
              Lihat Semua <ArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-4">
            {recommendedSims.map((sim) => (
              <SimulationCard key={sim.slug} {...sim} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
