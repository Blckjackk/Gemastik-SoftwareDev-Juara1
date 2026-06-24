"use client";

import { useState, useCallback } from "react";
import { Plus, Trash2, BookOpen, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataRow {
  id: string;
  [key: string]: string | number;
}

interface WorksheetProps {
  /** Column definitions for the data table */
  columns: { key: string; label: string; unit?: string }[];
  /** Current recorded data rows */
  dataRows: DataRow[];
  /** Questions specific to the simulation */
  analysisQuestions: { id: string; question: string }[];
  /** Onsubmit handler */
  onSubmit?: (data: WorksheetData) => void;
  /** Simulation title */
  simulationTitle: string;
}

export interface WorksheetData {
  hypothesis: string;
  dataRows: DataRow[];
  answers: Record<string, string>;
  conclusion: string;
  submittedAt: string;
}

export function Worksheet({
  columns,
  dataRows,
  analysisQuestions,
  onSubmit,
  simulationTitle,
}: WorksheetProps) {
  const [hypothesis, setHypothesis] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [conclusion, setConclusion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState<"hipotesis" | "data" | "analisis" | "kesimpulan">("hipotesis");

  const sections = ["hipotesis", "data", "analisis", "kesimpulan"] as const;
  const sectionLabels = {
    hipotesis: "1. Hipotesis",
    data: "2. Tabel Data",
    analisis: "3. Analisis",
    kesimpulan: "4. Kesimpulan",
  };

  const handleSubmit = () => {
    const data: WorksheetData = {
      hypothesis,
      dataRows,
      answers,
      conclusion,
      submittedAt: new Date().toISOString(),
    };
    onSubmit?.(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 size={48} className="text-green-500 mx-auto mb-3" />
        <h3 className="text-[17px] font-semibold text-[#1E252B] mb-1">Laporan Terkirim!</h3>
        <p className="text-[13px] text-[#64748B]">
          Worksheet eksperimen sudah tersimpan dan dikirim ke guru.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section tabs */}
      <div className="flex gap-1 bg-[#F8FAFC] p-1 rounded-xl">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={cn(
              "flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all",
              activeSection === s
                ? "bg-white text-[#1E252B] shadow-sm"
                : "text-[#94A3B8] hover:text-[#64748B]"
            )}
          >
            {sectionLabels[s]}
          </button>
        ))}
      </div>

      {/* Section content */}
      {activeSection === "hipotesis" && (
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[#1E252B] block">
            Tuliskan hipotesismu sebelum melakukan eksperimen:
          </label>
          <textarea
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
            placeholder={`Menurut saya, dalam simulasi ${simulationTitle}, jika ... maka ...`}
            rows={4}
            className="w-full text-[13px] text-[#1E252B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#00838F] focus:border-[#00838F] transition-shadow placeholder:text-[#94A3B8]"
          />
          <p className="text-[11px] text-[#94A3B8]">
            Hipotesis adalah dugaan sementara yang akan dibuktikan melalui eksperimen.
          </p>
        </div>
      )}

      {activeSection === "data" && (
        <div className="space-y-3">
          <p className="text-[13px] text-[#64748B]">
            Klik <strong>&quot;Catat Data&quot;</strong> pada panel simulasi untuk menambah baris secara otomatis.
          </p>
          {dataRows.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-[#E2E8F0] rounded-xl">
              <p className="text-[13px] text-[#94A3B8]">Belum ada data tercatat.</p>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                Atur variabel lalu klik &quot;Catat Data&quot;.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <th className="px-3 py-2 text-left text-[#94A3B8] font-semibold w-8">#</th>
                    {columns.map((col) => (
                      <th key={col.key} className="px-3 py-2 text-left text-[#94A3B8] font-semibold">
                        {col.label}
                        {col.unit && <span className="font-normal"> ({col.unit})</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, i) => (
                    <tr key={row.id} className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC]">
                      <td className="px-3 py-2 text-[#94A3B8]">{i + 1}</td>
                      {columns.map((col) => (
                        <td key={col.key} className="px-3 py-2 font-mono text-[#1E252B]">
                          {typeof row[col.key] === "number"
                            ? (row[col.key] as number).toFixed(2)
                            : row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeSection === "analisis" && (
        <div className="space-y-4">
          {analysisQuestions.map((q, i) => (
            <div key={q.id} className="space-y-2">
              <label className="text-[13px] font-medium text-[#1E252B] block">
                {i + 1}. {q.question}
              </label>
              <textarea
                value={answers[q.id] ?? ""}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                placeholder="Tuliskan jawabanmu..."
                rows={3}
                className="w-full text-[13px] text-[#1E252B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#00838F] focus:border-[#00838F] transition-shadow placeholder:text-[#94A3B8]"
              />
            </div>
          ))}
        </div>
      )}

      {activeSection === "kesimpulan" && (
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[#1E252B] block">
            Tuliskan kesimpulan dari eksperimenmu:
          </label>
          <textarea
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            placeholder="Berdasarkan eksperimen yang telah dilakukan, dapat disimpulkan bahwa..."
            rows={5}
            className="w-full text-[13px] text-[#1E252B] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 resize-none focus:outline-none focus:ring-1 focus:ring-[#00838F] focus:border-[#00838F] transition-shadow placeholder:text-[#94A3B8]"
          />

          <button
            onClick={handleSubmit}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-medium text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
          >
            <Send size={15} />
            Submit Laporan Praktikum
          </button>
        </div>
      )}
    </div>
  );
}
