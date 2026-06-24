import { AppLayout } from "@/components/layout/app-layout";
import Link from "next/link";
import { Download, Printer, CheckCircle2, Star, Calendar, User, FlaskConical } from "lucide-react";

// Mock report data
const report = {
  studentName: "Andi Pratama",
  className: "XII IPA 1",
  school: "SMAN 1 Jakarta",
  simulationTitle: "Gerak Parabola",
  subject: "Fisika",
  date: "18 Juni 2026",
  teacher: "Bu Sari Dewi, M.Pd.",
  score: 92,
  grade: "A",

  tujuan: "Mempelajari gerak dua dimensi (gerak parabola) melalui simulasi komputer; menganalisis pengaruh sudut peluncuran dan kecepatan awal terhadap jangkauan dan ketinggian maksimum.",

  teori: "Gerak parabola adalah gerak dua dimensi yang merupakan gabungan gerak lurus beraturan (GLB) pada sumbu X dan gerak lurus berubah beraturan (GLBB) pada sumbu Y. Persamaan kinematikanya adalah: x(t) = v₀ cos θ · t dan y(t) = h₀ + v₀ sin θ · t − ½gt².",

  dataTable: [
    { v0: 20, theta: 30, h0: 0, hMax: "5.10", range: "35.35", tTotal: "2.04" },
    { v0: 20, theta: 45, h0: 0, hMax: "10.19", range: "40.77", tTotal: "2.89" },
    { v0: 20, theta: 60, h0: 0, hMax: "15.29", range: "35.35", tTotal: "3.53" },
    { v0: 30, theta: 45, h0: 0, hMax: "22.94", range: "91.74", tTotal: "4.33" },
    { v0: 30, theta: 45, h0: 5, hMax: "27.94", range: "100.40", tTotal: "4.77" },
  ],

  hipotesis: "Saya menduga bahwa sudut 45° akan menghasilkan jangkauan terbesar untuk kecepatan awal yang sama, karena komponen horizontal dan vertikal akan seimbang.",

  analisis: [
    { question: "Bagaimana pengaruh sudut terhadap jangkauan?", answer: "Dari data percobaan 1, 2, dan 3 (v₀ = 20 m/s), sudut 45° menghasilkan jangkauan 40,77 m, lebih besar dari 30° (35,35 m) maupun 60° (35,35 m). Jangkauan maksimum terjadi pada θ = 45°." },
    { question: "Pada sudut berapa jangkauan maksimum?", answer: "Jangkauan maksimum terjadi pada θ = 45°. Hal ini karena pada sudut tersebut sin(2θ) = sin(90°) = 1, dan R = v₀²sin(2θ)/g sehingga R mencapai nilai maksimum." },
    { question: "Pengaruh v₀ terhadap ketinggian maksimum?", answer: "Saat v₀ naik dari 20 ke 30 m/s (percobaan 2 vs 4), H_maks naik dari 10,19 m menjadi 22,94 m — meningkat ~2,25×. Sesuai H = v₀²sin²θ/2g yang proporsional dengan v₀²." },
  ],

  kesimpulan: "Berdasarkan eksperimen simulasi gerak parabola, dapat disimpulkan bahwa: (1) Sudut peluncuran 45° menghasilkan jangkauan horizontal maksimum. (2) Ketinggian maksimum berbanding lurus dengan kuadrat kecepatan awal. (3) Hipotesis terbukti benar — θ = 45° memberikan jangkauan terbesar untuk kecepatan awal yang sama.",
};

export default function ReportPreviewPage() {
  return (
    <AppLayout title="Laporan Praktikum" userName="Andi Pratama" userRole="siswa">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Action bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-semibold text-[#1E252B]">Preview Laporan Praktikum</h2>
            <p className="text-[13px] text-[#94A3B8]">Periksa sebelum mendownload PDF</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] transition-colors">
              <Printer size={14} />
              Print
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all active:scale-95"
              style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
            >
              <Download size={14} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Report document */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
          {/* Report header */}
          <div className="bg-[#1E293B] px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #00838F, #4DD0E1)" }}
                >
                  <FlaskConical size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[15px]">LabSim Merdeka</p>
                  <p className="text-white/50 text-[11px]">Platform Lab Virtual SMA</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <Star size={16} className="text-[#EAB308]" fill="currentColor" />
                  <span className="text-2xl font-bold">{report.score}</span>
                  <span className="text-white/50 text-sm">/ 100</span>
                </div>
                <span className="text-[#4DD0E1] font-semibold text-sm">Nilai {report.grade}</span>
              </div>
            </div>
          </div>

          {/* Identity */}
          <div className="px-8 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
            <h1 className="text-[18px] font-bold text-[#1E252B] text-center mb-4">
              LAPORAN PRAKTIKUM
            </h1>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-lg mx-auto text-[13px]">
              {[
                ["Nama", report.studentName],
                ["Kelas", report.className],
                ["Sekolah", report.school],
                ["Mata Pelajaran", report.subject],
                ["Judul Praktikum", report.simulationTitle],
                ["Tanggal", report.date],
                ["Guru Pembimbing", report.teacher],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-[#94A3B8] w-36 shrink-0">{k}</span>
                  <span className="text-[#1E252B] font-medium">: {v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Report sections */}
          <div className="px-8 py-6 space-y-6 text-[14px] text-[#1E252B]">
            {/* 1. Tujuan */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#00838F] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00838F] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                Tujuan
              </h2>
              <p className="text-[#334155] leading-relaxed">{report.tujuan}</p>
            </section>

            {/* 2. Landasan Teori */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#00838F] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00838F] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                Landasan Teori
              </h2>
              <p className="text-[#334155] leading-relaxed">{report.teori}</p>
            </section>

            {/* 3. Hipotesis */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#00838F] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00838F] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                Hipotesis
              </h2>
              <p className="text-[#334155] leading-relaxed italic bg-blue-50 border-l-4 border-blue-400 px-4 py-3 rounded-r-xl">
                &quot;{report.hipotesis}&quot;
              </p>
            </section>

            {/* 4. Data Eksperimen */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#00838F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00838F] text-white flex items-center justify-center text-[10px] font-bold">4</span>
                Data Hasil Eksperimen
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px] border-collapse">
                  <thead>
                    <tr className="bg-[#1E293B] text-white">
                      {["No", "v₀ (m/s)", "θ (°)", "h₀ (m)", "H_maks (m)", "Jangkauan (m)", "t_total (s)"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {report.dataTable.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
                        <td className="px-3 py-2 text-[#94A3B8]">{i + 1}</td>
                        <td className="px-3 py-2 font-mono">{row.v0}</td>
                        <td className="px-3 py-2 font-mono">{row.theta}</td>
                        <td className="px-3 py-2 font-mono">{row.h0}</td>
                        <td className="px-3 py-2 font-mono font-semibold text-[#EAB308]">{row.hMax}</td>
                        <td className="px-3 py-2 font-mono font-semibold text-[#2563EB]">{row.range}</td>
                        <td className="px-3 py-2 font-mono">{row.tTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 5. Analisis */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#00838F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00838F] text-white flex items-center justify-center text-[10px] font-bold">5</span>
                Analisis &amp; Pembahasan
              </h2>
              <div className="space-y-4">
                {report.analisis.map((item, i) => (
                  <div key={i}>
                    <p className="font-semibold text-[#1E252B] mb-1">{i + 1}. {item.question}</p>
                    <p className="text-[#334155] leading-relaxed pl-4 border-l-2 border-[#E2E8F0]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Kesimpulan */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#00838F] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00838F] text-white flex items-center justify-center text-[10px] font-bold">6</span>
                Kesimpulan
              </h2>
              <p className="text-[#334155] leading-relaxed">{report.kesimpulan}</p>
            </section>

            {/* Signature area */}
            <div className="border-t border-[#E2E8F0] pt-6 grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-[12px] text-[#94A3B8] mb-8">Jakarta, {report.date}</p>
                <p className="text-[12px] text-[#94A3B8]">Siswa,</p>
                <div className="h-12 border-b border-[#E2E8F0] mb-1" />
                <p className="text-[13px] font-semibold text-[#1E252B]">{report.studentName}</p>
              </div>
              <div className="text-center">
                <p className="text-[12px] text-[#94A3B8] mb-8">Jakarta, {report.date}</p>
                <p className="text-[12px] text-[#94A3B8]">Guru Pembimbing,</p>
                <div className="h-12 border-b border-[#E2E8F0] mb-1" />
                <p className="text-[13px] font-semibold text-[#1E252B]">{report.teacher}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
