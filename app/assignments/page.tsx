import { AppLayout } from "@/components/layout/app-layout";
import { SimulationCard } from "@/components/simulation-card";
import Link from "next/link";
import { Clock, CheckCircle2, AlertCircle, ChevronRight, FileText, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const activeAssignments = [
  {
    id: "a1",
    title: "Gerak Parabola — Variasi Sudut Peluncuran",
    subject: "Fisika",
    deadline: "26 Jun 2026",
    status: "in-progress" as const,
    progress: 60,
    teacher: "Bu Sari",
    simulationSlug: "gerak-parabola",
    isNew: false,
  },
  {
    id: "a2",
    title: "Hukum Ohm — Seri vs Paralel",
    subject: "Fisika",
    deadline: "28 Jun 2026",
    status: "not-started" as const,
    progress: 0,
    teacher: "Bu Sari",
    simulationSlug: "hukum-ohm",
    isNew: true,
  },
  {
    id: "a3",
    title: "Titrasi NaOH + HCl",
    subject: "Kimia",
    deadline: "30 Jun 2026",
    status: "not-started" as const,
    progress: 0,
    teacher: "Pak Rudi",
    simulationSlug: "titrasi-asam-basa",
    isNew: true,
  },
];

const completedAssignments = [
  {
    title: "Gerak Parabola — Dasar",
    subject: "Fisika",
    submittedDate: "18 Jun 2026",
    score: 92,
    grade: "A",
    hasReport: true,
  },
  {
    title: "Genetika Mendel — Monohibrid",
    subject: "Biologi",
    submittedDate: "12 Jun 2026",
    score: 88,
    grade: "B+",
    hasReport: true,
  },
];

const statusConfig = {
  "in-progress": { label: "Dikerjakan", color: "text-blue-600 bg-blue-50", icon: Clock },
  "not-started": { label: "Belum Mulai", color: "text-orange-500 bg-orange-50", icon: AlertCircle },
  "submitted":   { label: "Selesai", color: "text-green-600 bg-green-50", icon: CheckCircle2 },
};

const subjectBadge: Record<string, string> = {
  Fisika: "bg-blue-100 text-blue-700",
  Kimia: "bg-purple-100 text-purple-700",
  Biologi: "bg-green-100 text-green-700",
};

const gradeColor: Record<string, string> = {
  A: "text-green-600", "B+": "text-blue-600", B: "text-blue-500",
  "C+": "text-orange-500", C: "text-orange-400",
};

export default function AssignmentsPage() {
  return (
    <AppLayout title="Tugas" userName="Andi Pratama" userRole="siswa">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-[22px] font-semibold text-[#1E252B]" style={{ letterSpacing: "-0.2px" }}>
            Daftar Tugas
          </h2>
          <p className="text-[#64748B] text-sm mt-0.5">
            {activeAssignments.length} tugas aktif · {completedAssignments.length} selesai
          </p>
        </div>

        {/* Active assignments */}
        <div>
          <h3 className="text-[14px] font-semibold text-[#1E252B] mb-3 flex items-center gap-2">
            <AlertCircle size={15} className="text-orange-500" />
            Tugas Aktif
          </h3>
          <div className="space-y-4">
            {activeAssignments.map((a) => {
              const s = statusConfig[a.status];
              const Icon = s.icon;
              return (
                <div key={a.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", subjectBadge[a.subject] ?? "bg-gray-100 text-gray-600")}>
                          {a.subject}
                        </span>
                        {a.isNew && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00838F] text-white">
                            Baru
                          </span>
                        )}
                        <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1", s.color)}>
                          <Icon size={10} />
                          {s.label}
                        </span>
                      </div>
                      <h4 className="text-[15px] font-semibold text-[#1E252B] leading-snug">{a.title}</h4>
                      <p className="text-[12px] text-[#94A3B8] mt-1">
                        {a.teacher} · Deadline: <span className="font-medium text-[#64748B]">{a.deadline}</span>
                      </p>
                    </div>

                    <Link
                      href={`/simulations/${a.simulationSlug}`}
                      className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all active:scale-95"
                      style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
                    >
                      {a.status === "in-progress" ? "Lanjutkan" : "Mulai"}
                      <ChevronRight size={14} />
                    </Link>
                  </div>

                  {a.status === "in-progress" && (
                    <div className="mt-4">
                      <div className="flex justify-between text-[11px] text-[#94A3B8] mb-1">
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Completed assignments */}
        <div>
          <h3 className="text-[14px] font-semibold text-[#1E252B] mb-3 flex items-center gap-2">
            <CheckCircle2 size={15} className="text-green-500" />
            Tugas Selesai
          </h3>
          <div className="space-y-3">
            {completedAssignments.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0",
                  "bg-gradient-to-br from-green-400 to-green-600 text-white"
                )}>
                  {a.grade}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", subjectBadge[a.subject] ?? "")}>
                      {a.subject}
                    </span>
                  </div>
                  <p className="text-[14px] font-semibold text-[#1E252B] leading-tight">{a.title}</p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">Dikumpulkan {a.submittedDate}</p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <div className="flex items-center gap-1 justify-end">
                    <Star size={13} className="text-[#EAB308]" fill="currentColor" />
                    <span className="text-[15px] font-bold text-[#1E252B]">{a.score}</span>
                  </div>
                  {a.hasReport && (
                    <Link
                      href="/report/preview"
                      className="flex items-center gap-1 text-[11px] text-[#00838F] hover:underline"
                    >
                      <FileText size={11} />
                      Lihat Laporan
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
