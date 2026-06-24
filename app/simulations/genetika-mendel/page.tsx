"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Worksheet } from "@/components/simulation/worksheet";
import {
  computePunnett,
  MONOHYBRID_OPTIONS,
  DIHYBRID_OPTIONS,
  type PunnettResult,
} from "@/lib/simulations/biology/genetics";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Plus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Color map for genotypes ──────────────────────────────────
const dominantBg = "bg-green-100 text-green-800 border-green-200";
const recessiveBg = "bg-gray-100 text-gray-600 border-gray-200";

const PHENOTYPE_ICONS: Record<string, string> = {
  "Sifat Dominan": "🌸",
  "Sifat Resesif": "🤍",
  "Dominan A & B": "🌻",
  "Dominan A, Resesif B": "🌼",
  "Resesif A, Dominan B": "🌿",
  "Resesif A & B": "⬜",
};

// ─── Punnett Grid Component ───────────────────────────────────
function PunnettGrid({ result }: { result: PunnettResult }) {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse mx-auto">
        <thead>
          <tr>
            <th className="w-12 h-12" />
            {result.gametes2.map((g, i) => (
              <th key={i} className="w-16 h-12 text-center">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold text-[13px]">
                  {g}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.cells.map((row, ri) => (
            <tr key={ri}>
              <td className="w-12 h-16 text-center align-middle">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold text-[13px]">
                  {result.gametes1[ri]}
                </span>
              </td>
              {row.map((cell, ci) => (
                <td key={ci} className="w-16 h-16 p-1 border border-[#E2E8F0] align-middle">
                  <div className={cn(
                    "w-full h-full rounded-lg border flex flex-col items-center justify-center text-center transition-all duration-200 hover:scale-105 cursor-default",
                    cell.isDominant ? dominantBg : recessiveBg
                  )}>
                    <span className="text-[11px] font-bold font-mono">{cell.genotype}</span>
                    <span className="text-[8px] opacity-70 leading-tight">{PHENOTYPE_ICONS[cell.phenotype] || "?"}</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Ratio Display ────────────────────────────────────────────
function RatioDisplay({ result }: { result: PunnettResult }) {
  const total = Object.values(result.genotypeRatio).reduce((s, v) => s + v, 0);
  const genoData = Object.entries(result.genotypeRatio).map(([key, val]) => ({
    name: key,
    count: val,
    pct: ((val / total) * 100).toFixed(1),
  }));
  const phenoData = Object.entries(result.phenotypeRatio).map(([key, val]) => ({
    name: PHENOTYPE_ICONS[key] ? `${PHENOTYPE_ICONS[key]} ${key}` : key,
    count: val,
  }));
  const colors = ["#16A34A", "#86EFAC", "#4ADE80", "#BBF7D0", "#064E3B"];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Rasio Genotipe</p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={genoData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: any) => v + " sel"} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {genoData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Rasio Fenotipe</p>
        <div className="space-y-2">
          {phenoData.map((p, i) => {
            const pct = (p.count / total) * 100;
            return (
              <div key={i}>
                <div className="flex justify-between text-[12px] mb-0.5">
                  <span className="text-[#1E252B] truncate max-w-[140px]">{p.name}</span>
                  <span className="font-semibold text-green-600">{p.count}/{total}</span>
                </div>
                <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-green-500 transition-all duration-500"
                    style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 p-3 bg-green-50 rounded-xl">
          <p className="text-[12px] font-semibold text-green-700">
            Dominan: {result.dominantPercent.toFixed(0)}% &nbsp;|&nbsp; Resesif: {result.recessivePercent.toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Worksheet config ──────────────────────────────────────────
const WORKSHEET_COLUMNS = [
  { key: "mode", label: "Mode", unit: "" },
  { key: "parent1", label: "Induk 1", unit: "" },
  { key: "parent2", label: "Induk 2", unit: "" },
  { key: "dominantPct", label: "% Dominan", unit: "%" },
  { key: "recessivePct", label: "% Resesif", unit: "%" },
];
const ANALYSIS_QUESTIONS = [
  { id: "q1", question: "Pada persilangan Aa × Aa, berapakah rasio fenotipe dominan : resesif yang dihasilkan? Apakah sesuai Hukum Mendel?" },
  { id: "q2", question: "Apa perbedaan antara genotipe dan fenotipe? Berikan contoh dari hasil persilangan yang kamu lakukan!" },
  { id: "q3", question: "Mengapa pada persilangan AA × aa semua keturunan F1 bersifat dominan?" },
];

// ─── Experiment History ───────────────────────────────────────
interface ExperimentRecord {
  id: string;
  mode: string;
  parent1: string;
  parent2: string;
  result: PunnettResult;
}

// ─── Main Page ────────────────────────────────────────────────
export default function GenetikaMendelPage() {
  const [mode, setMode] = useState<"monohibrid" | "dihibrid">("monohibrid");
  const [parent1, setParent1] = useState("Aa");
  const [parent2, setParent2] = useState("Aa");
  const [experiments, setExperiments] = useState<ExperimentRecord[]>([]);
  const [dataRows, setDataRows] = useState<any[]>([]);

  const result = useMemo(() => computePunnett(parent1, parent2), [parent1, parent2]);
  const options = mode === "monohibrid" ? MONOHYBRID_OPTIONS : DIHYBRID_OPTIONS;

  const handleAddExperiment = () => {
    setExperiments((prev) => [...prev, {
      id: Date.now().toString(),
      mode,
      parent1,
      parent2,
      result,
    }]);
    setDataRows((prev) => [...prev, {
      id: Date.now().toString(),
      mode,
      parent1,
      parent2,
      dominantPct: result.dominantPercent.toFixed(0),
      recessivePct: result.recessivePercent.toFixed(0),
    }]);
  };

  return (
    <AppLayout title="Genetika Mendel" userName="Andi Pratama" userRole="siswa">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧬</span>
            <div>
              <h2 className="text-[17px] font-semibold text-[#1E252B]" style={{ letterSpacing: "-0.2px" }}>
                Genetika Mendel
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                Biologi
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddExperiment}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#1E293B] text-white hover:bg-[#334155] transition-all active:scale-95"
            >
              <Plus size={14} />
              Catat Percobaan
            </button>
            <button
              onClick={() => { setParent1(options[0]); setParent2(options[0]); }}
              className="w-9 h-9 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center text-[#64748B] transition-all active:scale-95"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-5 gap-5">
          {/* Control panel */}
          <div className="col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-5 space-y-5">
            {/* Mode toggle */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-2">Mode Persilangan</p>
              <div className="flex bg-[#F1F5F9] rounded-xl p-1">
                {(["monohibrid", "dihibrid"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setParent1(m === "monohibrid" ? "Aa" : "AaBb"); setParent2(m === "monohibrid" ? "Aa" : "AaBb"); }}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-[12px] font-medium transition-all",
                      mode === m ? "bg-green-500 text-white shadow-sm" : "text-[#64748B] hover:text-[#1E252B]"
                    )}
                  >
                    {m === "monohibrid" ? "Monohibrid (2×2)" : "Dihibrid (4×4)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Parent 1 */}
            <div>
              <p className="text-[13px] font-medium text-[#1E252B] mb-2">Induk 1 (♀)</p>
              <div className="grid grid-cols-3 gap-1.5">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setParent1(opt)}
                    className={cn(
                      "py-2 rounded-xl text-[13px] font-mono font-bold border-2 transition-all active:scale-95",
                      parent1 === opt
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:border-green-300"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Parent 2 */}
            <div>
              <p className="text-[13px] font-medium text-[#1E252B] mb-2">Induk 2 (♂)</p>
              <div className="grid grid-cols-3 gap-1.5">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setParent2(opt)}
                    className={cn(
                      "py-2 rounded-xl text-[13px] font-mono font-bold border-2 transition-all active:scale-95",
                      parent2 === opt
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:border-green-300"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-[13px] font-semibold text-green-800 mb-1">
                {parent1} × {parent2}
              </p>
              <p className="text-[12px] text-green-700">
                Dominan: <strong>{result.dominantPercent.toFixed(0)}%</strong>
                &nbsp;|&nbsp; Resesif: <strong>{result.recessivePercent.toFixed(0)}%</strong>
              </p>
            </div>

            {/* Genotipe ratio table */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-2">Rasio Genotipe</p>
              <div className="space-y-1">
                {Object.entries(result.genotypeRatio).map(([key, val]) => {
                  const total = Object.values(result.genotypeRatio).reduce((s, v) => s + v, 0);
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <span className="font-mono text-[12px] font-bold text-[#1E252B] w-10">{key}</span>
                      <div className="flex-1 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(val / total) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-[#94A3B8] w-8">{val}/{total}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Punnett square + chart */}
          <div className="col-span-3 space-y-4">
            {/* Punnett */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-4">
                Tabel Punnett — {parent1} × {parent2}
              </p>
              <PunnettGrid result={result} />
            </div>

            {/* Charts */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Distribusi</p>
              <RatioDisplay result={result} />
            </div>
          </div>
        </div>

        {/* Experiment history */}
        {experiments.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <p className="text-[13px] font-semibold text-[#1E252B] mb-3">
              Riwayat Percobaan ({experiments.length})
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    {["#", "Mode", "Induk 1", "Induk 2", "Dominan", "Resesif", "Rasio Genotipe"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-[#94A3B8] font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {experiments.map((exp, i) => (
                    <tr key={exp.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="px-3 py-2 text-[#94A3B8]">{i + 1}</td>
                      <td className="px-3 py-2 capitalize">{exp.mode}</td>
                      <td className="px-3 py-2 font-mono font-bold text-green-700">{exp.parent1}</td>
                      <td className="px-3 py-2 font-mono font-bold text-green-700">{exp.parent2}</td>
                      <td className="px-3 py-2 text-green-600 font-semibold">{exp.result.dominantPercent.toFixed(0)}%</td>
                      <td className="px-3 py-2 text-gray-500 font-semibold">{exp.result.recessivePercent.toFixed(0)}%</td>
                      <td className="px-3 py-2">
                        {Object.entries(exp.result.genotypeRatio)
                          .map(([k, v]) => `${v}${k}`)
                          .join(" : ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Worksheet */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <p className="text-[13px] font-semibold text-[#1E252B] mb-4">📝 Worksheet Praktikum</p>
          <Worksheet
            simulationTitle="Genetika Mendel"
            columns={WORKSHEET_COLUMNS}
            dataRows={dataRows}
            analysisQuestions={ANALYSIS_QUESTIONS}
          />
        </div>
      </div>
    </AppLayout>
  );
}
