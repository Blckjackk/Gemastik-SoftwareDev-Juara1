import Link from "next/link";
import { ArrowRight, FlaskConical, Zap, Beaker, Dna, Star, CheckCircle2, ChevronRight } from "lucide-react";

/* =====================
   Data
   ===================== */
const features = [
  {
    icon: "⚡",
    title: "Simulasi Fisika Akurat",
    desc: "Gerak Parabola, Hukum Ohm, Gelombang — semua dihitung dengan rumus nyata, bukan animasi pura-pura.",
    color: "blue",
  },
  {
    icon: "🧪",
    title: "Lab Kimia Virtual",
    desc: "Titrasi asam-basa dengan kurva pH real-time. Reaksi logam dengan asam. Aman tanpa risiko kecelakaan lab.",
    color: "purple",
  },
  {
    icon: "🧬",
    title: "Biologi Interaktif",
    desc: "Punnett Square, fotosintesis, genetika Mendel — visualisasi proses biologis yang tidak bisa dilihat mata.",
    color: "green",
  },
  {
    icon: "📄",
    title: "Laporan Otomatis",
    desc: "Data eksperimen, analisis, dan kesimpulan tersusun otomatis jadi laporan praktikum siap download.",
    color: "teal",
  },
  {
    icon: "👩‍🏫",
    title: "Dashboard Guru",
    desc: "Pantau progress kelas, nilai worksheet, dan beri feedback langsung dari satu panel terintegrasi.",
    color: "orange",
  },
  {
    icon: "📱",
    title: "Akses di Mana Saja",
    desc: "Bisa diakses dari HP, tablet, atau laptop. Tidak perlu install aplikasi. Cukup buka browser.",
    color: "teal",
  },
];

const simulations = [
  { icon: "🎯", label: "Gerak Parabola", subject: "Fisika", color: "#2563EB" },
  { icon: "⚡", label: "Hukum Ohm", subject: "Fisika", color: "#2563EB" },
  { icon: "🧪", label: "Titrasi Asam-Basa", subject: "Kimia", color: "#7C3AED" },
  { icon: "🔬", label: "Reaksi Logam + Asam", subject: "Kimia", color: "#7C3AED" },
  { icon: "🧬", label: "Genetika Mendel", subject: "Biologi", color: "#16A34A" },
  { icon: "🌿", label: "Fotosintesis", subject: "Biologi", color: "#16A34A" },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue:   { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-100" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  green:  { bg: "bg-green-50",  text: "text-green-600",  border: "border-green-100" },
  teal:   { bg: "bg-teal-50",   text: "text-teal-600",   border: "border-teal-100" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
};

/* =====================
   Components
   ===================== */
function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-12 bg-[#020617]/95 backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
          style={{ background: "linear-gradient(135deg, #00838F, #4DD0E1)" }}
        >
          L
        </div>
        <span className="text-white font-semibold text-[15px] tracking-tight">
          LabSim <span className="text-[#4DD0E1]">Merdeka</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-7 text-[13px] text-white/70">
        <a href="#fitur" className="hover:text-white transition-colors">Fitur</a>
        <a href="#simulasi" className="hover:text-white transition-colors">Simulasi</a>
        <a href="#cara-kerja" className="hover:text-white transition-colors">Cara Kerja</a>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-[13px] text-white/80 hover:text-white transition-colors hidden sm:block"
        >
          Masuk
        </Link>
        <Link
          href="/login"
          className="text-[13px] font-medium text-[#020617] bg-[#4DD0E1] hover:bg-[#00838F] hover:text-white px-4 py-1.5 rounded-full transition-all duration-200 active:scale-95"
        >
          Mulai Gratis
        </Link>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden bg-[#020617]">
      {/* Radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,131,143,0.2) 0%, transparent 70%)",
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00838F]/30 bg-[#00838F]/10 text-[#4DD0E1] text-[13px] font-medium mb-6 animate-fade-up">
        <Star size={12} className="text-[#4DD0E1]" fill="currentColor" />
        Platform Lab Virtual untuk SMA Indonesia
      </div>

      {/* Hero headline */}
      <h1
        className="relative z-10 text-white font-semibold leading-tight mb-6 animate-fade-up delay-100"
        style={{ fontSize: "clamp(36px, 6vw, 64px)", letterSpacing: "-0.5px" }}
      >
        Eksperimen Sains
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #4DD0E1, #00838F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Tanpa Batas Lab
        </span>
      </h1>

      <p className="relative z-10 text-white/60 text-[17px] leading-relaxed max-w-xl mb-10 animate-fade-up delay-200">
        Simulasi interaktif Fisika, Kimia, dan Biologi SMA yang dihitung dengan
        rumus nyata. Catat data, buat laporan, dan belajar kapan saja.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-300">
        <Link
          href="/login"
          id="hero-cta-primary"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[15px] text-white transition-all duration-200 active:scale-95 hover:shadow-lg hover:shadow-[#00838F]/30"
          style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
        >
          Mulai Eksperimen
          <ArrowRight size={16} />
        </Link>
        <a
          href="#simulasi"
          id="hero-cta-secondary"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-medium text-white/80 border border-white/20 hover:bg-white/5 hover:text-white transition-all duration-200"
        >
          Lihat Simulasi
        </a>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 mt-16 flex flex-wrap justify-center gap-8 text-white/50 text-[13px] animate-fade-up delay-400">
        {[["6+", "Simulasi"], ["3", "Mapel"], ["100%", "Gratis"], ["SMA", "Kurikulum"]].map(
          ([num, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="text-xl font-bold text-white/90">{num}</div>
              <div>{lbl}</div>
            </div>
          )
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #F8FAFC, transparent)" }} />
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="fitur" className="bg-[#F8FAFC] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[13px] font-semibold text-[#00838F] uppercase tracking-widest">
            Kenapa LabSim?
          </span>
          <h2
            className="mt-3 text-[#1E252B] font-semibold leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.3px" }}
          >
            Lab lengkap, tanpa risiko,
            <br />
            selalu tersedia.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const c = colorMap[f.color] ?? colorMap["teal"];
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-white border ${c.border} hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-[15px] font-semibold text-[#1E252B] mb-2">{f.title}</h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SimulationPreview() {
  return (
    <section id="simulasi" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[13px] font-semibold text-[#00838F] uppercase tracking-widest">
            Katalog
          </span>
          <h2
            className="mt-3 text-[#1E252B] font-semibold leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.3px" }}
          >
            6 Simulasi, 3 Mapel,
            <br />
            1 Platform
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {simulations.map((sim, i) => (
            <div
              key={i}
              className="group p-5 rounded-2xl border border-[#E2E8F0] hover:border-transparent hover:shadow-lg hover:shadow-black/5 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              style={{ borderLeft: `3px solid ${sim.color}` }}
            >
              <span className="text-2xl mb-3 block">{sim.icon}</span>
              <p className="text-[14px] font-semibold text-[#1E252B] leading-tight group-hover:text-[#00838F] transition-colors">
                {sim.label}
              </p>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">{sim.subject}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/simulations"
            className="inline-flex items-center gap-2 text-[#00838F] font-medium text-[15px] hover:gap-3 transition-all duration-200"
          >
            Lihat semua simulasi <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Pilih Simulasi", desc: "Pilih dari katalog simulasi sesuai materi pelajaran yang sedang dipelajari." },
    { num: "02", title: "Atur Variabel", desc: "Ubah parameter eksperimen dengan slider dan tombol. Lihat hasilnya langsung real-time." },
    { num: "03", title: "Catat & Analisis", desc: "Catat data ke worksheet digital. Buat hipotesis dan analisis hasil." },
    { num: "04", title: "Download Laporan", desc: "Sistem generate laporan praktikum otomatis. Download PDF siap dikumpulkan." },
  ];

  return (
    <section id="cara-kerja" className="bg-[#1E293B] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[13px] font-semibold text-[#4DD0E1] uppercase tracking-widest">
            Cara Kerja
          </span>
          <h2
            className="mt-3 text-white font-semibold leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.3px" }}
          >
            Dari eksperimen ke laporan
            <br />
            dalam satu sesi.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px border-t border-dashed border-[#334155] z-0" />
              )}
              <div className="relative z-10 p-5 rounded-2xl bg-[#334155]/50 border border-[#334155] hover:border-[#00838F]/50 transition-colors duration-300">
                <span className="text-[11px] font-bold text-[#00838F] tracking-wider block mb-3">
                  {step.num}
                </span>
                <h3 className="text-[15px] font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="bg-[#F8FAFC] py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-[#1E252B] font-semibold leading-tight mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.3px" }}
        >
          Siap mulai eksperimen?
        </h2>
        <p className="text-[#64748B] text-[17px] mb-8 leading-relaxed">
          Gratis untuk siswa dan guru. Tidak butuh kartu kredit.
          Mulai simulasi pertamamu sekarang.
        </p>
        <Link
          href="/login"
          id="cta-banner-btn"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-medium text-white transition-all duration-200 active:scale-95 hover:shadow-xl hover:shadow-[#00838F]/20"
          style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
        >
          Daftar Sekarang — Gratis
          <ArrowRight size={16} />
        </Link>
        <div className="mt-6 flex flex-wrap justify-center gap-5 text-[13px] text-[#64748B]">
          {["Tanpa install", "Data aman", "Kurikulum SMA", "Laporan otomatis"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[#22C55E]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E2E8F0] py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
          >
            L
          </div>
          <span className="text-[14px] font-semibold text-[#1E252B]">LabSim Merdeka</span>
        </div>
        <p className="text-[12px] text-[#94A3B8]">
          © 2026 LabSim Merdeka — GEMASTIK 2026 Pengembangan Perangkat Lunak
        </p>
      </div>
    </footer>
  );
}

/* =====================
   Page
   ===================== */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <SimulationPreview />
      <HowItWorksSection />
      <CtaBanner />
      <Footer />
    </div>
  );
}
