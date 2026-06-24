"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { SimulationCard, type SimulationCardProps } from "@/components/simulation-card";
import { Search, Filter, Atom, Beaker, Dna, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* =====================
   Data
   ===================== */
const allSimulations: SimulationCardProps[] = [
  {
    slug: "gerak-parabola",
    title: "Gerak Parabola",
    subject: "fisika",
    description:
      "Animasi peluru bergerak dengan jejak lintasan. Hitung H_maks, R_jangkauan, dan t_total secara analitik. Tampilkan vektor kecepatan real-time.",
    phase: "Mekanika — Kelas X Semester 1",
    difficulty: "SMA Kelas X",
    duration: "30–45 menit",
    studentCount: 1240,
    isNew: false,
  },
  {
    slug: "hukum-ohm",
    title: "Hukum Ohm & Rangkaian",
    subject: "fisika",
    description:
      "Rangkai resistor seri dan paralel. Ukur arus dan tegangan dengan amperemeter/voltmeter virtual. Lihat animasi aliran elektron.",
    phase: "Listrik — Kelas XII Semester 1",
    difficulty: "SMA Kelas XII",
    duration: "40 menit",
    studentCount: 890,
    isNew: false,
  },
  {
    slug: "titrasi-asam-basa",
    title: "Titrasi Asam-Basa",
    subject: "kimia",
    description:
      "Simulasi titrasi dengan kurva pH real-time. Auto-deteksi titik ekuivalen. Indikator fenolftalein, metil jingga, dan universal.",
    phase: "Larutan — Kelas XI Semester 2",
    difficulty: "SMA Kelas XI",
    duration: "40–50 menit",
    studentCount: 980,
    isNew: true,
  },
  {
    slug: "reaksi-logam-asam",
    title: "Reaksi Logam + Asam",
    subject: "kimia",
    description:
      "Pilih logam (Fe, Zn, Mg, Cu) dan amati reaksi. Lihat gelembung gas H₂, perubahan warna larutan, dan termometer virtual.",
    phase: "Redoks — Kelas XI Semester 1",
    difficulty: "SMA Kelas XI",
    duration: "30 menit",
    studentCount: 720,
    isNew: false,
  },
  {
    slug: "genetika-mendel",
    title: "Genetika Mendel",
    subject: "biologi",
    description:
      "Punnett Square interaktif untuk monohibrid dan dihibrid. Hitung rasio fenotipe dan genotipe dengan bar chart distribusi.",
    phase: "Genetika — Kelas XII Semester 1",
    difficulty: "SMA Kelas XII",
    duration: "35 menit",
    studentCount: 760,
    isNew: false,
  },
  {
    slug: "fotosintesis",
    title: "Fotosintesis",
    subject: "biologi",
    description:
      "Model Michaelis-Menten laju fotosintesis. Atur intensitas cahaya dan konsentrasi CO₂. Animasi gelembung O₂ dari Hydrilla.",
    phase: "Metabolisme — Kelas XII Semester 1",
    difficulty: "SMA Kelas XII",
    duration: "35–45 menit",
    studentCount: 540,
    isNew: true,
  },
];

type SubjectFilter = "semua" | "fisika" | "kimia" | "biologi";

const filterTabs: { value: SubjectFilter; label: string; icon: React.ElementType | null; color: string }[] = [
  { value: "semua",   label: "Semua",   icon: null,  color: "" },
  { value: "fisika",  label: "Fisika",  icon: Atom,  color: "text-blue-600" },
  { value: "kimia",   label: "Kimia",   icon: Beaker, color: "text-purple-600" },
  { value: "biologi", label: "Biologi", icon: Dna,   color: "text-green-600" },
];

/* =====================
   Page
   ===================== */
export default function SimulationsPage() {
  const [activeFilter, setActiveFilter] = useState<SubjectFilter>("semua");
  const [query, setQuery] = useState("");

  const filtered = allSimulations.filter((s) => {
    const matchSubject = activeFilter === "semua" || s.subject === activeFilter;
    const matchQuery =
      query === "" ||
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase());
    return matchSubject && matchQuery;
  });

  return (
    <AppLayout title="Katalog Simulasi" userName="Andi Pratama" userRole="siswa">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[22px] font-semibold text-[#1E252B]" style={{ letterSpacing: "-0.2px" }}>
          Katalog Simulasi
        </h2>
        <p className="text-[#64748B] text-sm mt-0.5">
          {allSimulations.length} simulasi tersedia — Fisika, Kimia, dan Biologi SMA
        </p>
      </div>

      {/* Filter + Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Subject filter tabs */}
        <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-full p-1 w-fit">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                id={`filter-${tab.value}`}
                onClick={() => setActiveFilter(tab.value)}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#00838F] text-white shadow-sm"
                    : "text-[#64748B] hover:text-[#1E252B] hover:bg-[#F1F5F9]"
                )}
              >
                {Icon && <Icon size={13} className={isActive ? "text-white" : tab.color} />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
          <Input
            placeholder="Cari simulasi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-[38px] text-[13px] bg-white border-[#E2E8F0] rounded-full focus:ring-1 focus:ring-[#00838F] focus:border-[#00838F]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      {query && (
        <p className="text-[13px] text-[#94A3B8] mb-4">
          Menampilkan <span className="font-semibold text-[#1E252B]">{filtered.length}</span> hasil untuk &quot;{query}&quot;
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((sim) => (
            <SimulationCard key={sim.slug} {...sim} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl block mb-4">🔬</span>
          <h3 className="text-[17px] font-semibold text-[#1E252B] mb-2">
            Simulasi tidak ditemukan
          </h3>
          <p className="text-[13px] text-[#94A3B8] max-w-xs mx-auto">
            Coba kata kunci lain atau ubah filter mata pelajaran.
          </p>
          <button
            onClick={() => { setQuery(""); setActiveFilter("semua"); }}
            className="mt-5 text-[13px] text-[#00838F] hover:underline"
          >
            Reset pencarian
          </button>
        </div>
      )}
    </AppLayout>
  );
}
