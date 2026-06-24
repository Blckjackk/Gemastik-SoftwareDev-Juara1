import { AppLayout } from "@/components/layout/app-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Star, FlaskConical, TrendingUp, BookOpen, Edit, Award, Calendar } from "lucide-react";

const profileData = {
  name: "Andi Pratama",
  email: "andi.pratama@sma1jakarta.sch.id",
  school: "SMAN 1 Jakarta",
  class: "XII IPA 1",
  role: "Siswa",
  joinDate: "Januari 2026",
  avatar: "AP",
};

const stats = [
  { label: "Simulasi Selesai", value: "12", icon: FlaskConical, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Tugas Dikumpulkan", value: "8", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Rata-Rata Nilai", value: "87", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Streak Belajar", value: "7 hari", icon: Award, color: "text-orange-500", bg: "bg-orange-50" },
];

const achievements = [
  { icon: "🏆", title: "Fisikawan Junior", desc: "Selesaikan 5 simulasi Fisika", earned: true },
  { icon: "🧪", title: "Kimiawan Pemula", desc: "Selesaikan simulasi Titrasi", earned: true },
  { icon: "🧬", title: "Geneticist", desc: "Lakukan 5 percobaan Punnett Square", earned: false },
  { icon: "📊", title: "Data Scientist", desc: "Catat 50 baris data eksperimen", earned: false },
  { icon: "⭐", title: "Nilai Sempurna", desc: "Dapatkan nilai 100 di 1 tugas", earned: false },
  { icon: "🔥", title: "Streak Master", desc: "Belajar 30 hari berturut-turut", earned: false },
];

const recentActivity = [
  { icon: "⚡", title: "Gerak Parabola", desc: "Selesai eksperimen variasi sudut", time: "2 jam lalu", score: 92 },
  { icon: "🧪", title: "Titrasi Asam-Basa", desc: "Worksheet dikumpulkan", time: "1 hari lalu", score: null },
  { icon: "🧬", title: "Genetika Mendel", desc: "Mulai simulasi monohibrid", time: "2 hari lalu", score: null },
  { icon: "⚡", title: "Hukum Ohm", desc: "Selesai eksperimen rangkaian paralel", time: "5 hari lalu", score: 85 },
];

export default function ProfilePage() {
  return (
    <AppLayout title="Profil" userName={profileData.name} userRole="siswa">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          {/* Cover */}
          <div
            className="h-28 relative"
            style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #00838F20 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg">
                  <AvatarFallback
                    className="text-xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #00838F, #006064)" }}
                  >
                    {profileData.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] transition-colors">
                <Edit size={13} />
                Edit Profil
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="text-[20px] font-semibold text-[#1E252B]" style={{ letterSpacing: "-0.2px" }}>
                {profileData.name}
              </h2>
              <p className="text-[14px] text-[#64748B]">{profileData.email}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-teal-100 text-teal-700">
                  {profileData.role}
                </span>
                <span className="text-[12px] text-[#94A3B8]">·</span>
                <span className="text-[12px] text-[#64748B]">{profileData.class}</span>
                <span className="text-[12px] text-[#94A3B8]">·</span>
                <span className="text-[12px] text-[#64748B]">{profileData.school}</span>
                <span className="text-[12px] text-[#94A3B8]">·</span>
                <span className="text-[12px] text-[#94A3B8] flex items-center gap-1">
                  <Calendar size={11} />
                  Bergabung {profileData.joinDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
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
          {/* Achievements */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h3 className="text-[15px] font-semibold text-[#1E252B] mb-4">🏅 Pencapaian</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {achievements.map((a, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    a.earned
                      ? "border-[#00838F]/20 bg-[#00838F]/5"
                      : "border-[#E2E8F0] bg-[#F8FAFC] opacity-50 grayscale"
                  }`}
                >
                  <span className="text-2xl block mb-2">{a.icon}</span>
                  <p className="text-[12px] font-semibold text-[#1E252B] leading-tight">{a.title}</p>
                  <p className="text-[10px] text-[#94A3B8] mt-1 leading-tight">{a.desc}</p>
                  {a.earned && (
                    <span className="inline-block mt-2 text-[9px] font-bold text-[#00838F] uppercase tracking-wider">
                      ✓ Diraih
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <h3 className="text-[15px] font-semibold text-[#1E252B] mb-4">📈 Aktivitas Terbaru</h3>
            <div className="space-y-3">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{act.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1E252B] leading-tight truncate">{act.title}</p>
                    <p className="text-[11px] text-[#94A3B8]">{act.desc}</p>
                    <p className="text-[10px] text-[#94A3B8]">{act.time}</p>
                  </div>
                  {act.score !== null && (
                    <div className="flex items-center gap-1 shrink-0">
                      <Star size={11} className="text-[#EAB308]" fill="currentColor" />
                      <span className="text-[13px] font-semibold text-[#1E252B]">{act.score}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
