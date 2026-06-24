import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SimulationCardProps {
  slug: string;
  title: string;
  subject: "fisika" | "kimia" | "biologi";
  description: string;
  phase?: string;
  difficulty?: "SMP" | "SMA Kelas X" | "SMA Kelas XI" | "SMA Kelas XII";
  duration?: string;
  studentCount?: number;
  isNew?: boolean;
  className?: string;
}

const subjectConfig = {
  fisika: {
    color: "text-blue-600",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    accent: "#2563EB",
    label: "Fisika",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  kimia: {
    color: "text-purple-600",
    bg: "bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
    accent: "#7C3AED",
    label: "Kimia",
    gradient: "from-purple-500/10 to-purple-600/5",
  },
  biologi: {
    color: "text-green-600",
    bg: "bg-green-50",
    badge: "bg-green-100 text-green-700",
    accent: "#16A34A",
    label: "Biologi",
    gradient: "from-green-500/10 to-green-600/5",
  },
};

const subjectIcons = {
  fisika: "⚡",
  kimia: "🧪",
  biologi: "🧬",
};

export function SimulationCard({
  slug,
  title,
  subject,
  description,
  phase,
  difficulty,
  duration = "30–45 menit",
  studentCount,
  isNew = false,
  className,
}: SimulationCardProps) {
  const config = subjectConfig[subject];
  const icon = subjectIcons[subject];

  return (
    <Link
      href={`/simulations/${slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden",
        "hover:border-transparent hover:shadow-lg hover:shadow-black/5",
        "transition-all duration-300 ease-out hover:-translate-y-0.5",
        className
      )}
      style={{
        // Subtle colored top border
        borderTop: `3px solid ${config.accent}`,
      }}
    >
      {/* Gradient header area */}
      <div
        className={cn(
          "px-5 pt-5 pb-4 bg-gradient-to-br",
          config.gradient
        )}
      >
        {/* Top row: icon + badges */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl" role="img" aria-label={subject}>
            {icon}
          </span>
          <div className="flex items-center gap-2">
            {isNew && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00838F] text-white animate-pulse">
                Baru
              </span>
            )}
            <span
              className={cn(
                "text-[11px] font-semibold px-2.5 py-1 rounded-full",
                config.badge
              )}
            >
              {config.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-[#1E252B] leading-snug group-hover:text-[#00838F] transition-colors">
          {title}
        </h3>

        {phase && (
          <p className="text-[11px] text-[#94A3B8] mt-0.5 font-medium uppercase tracking-wider">
            {phase}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 px-5 py-3">
        <p className="text-[13px] text-[#64748B] leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#F1F5F9] flex items-center justify-between">
        <div className="flex items-center gap-3 text-[12px] text-[#94A3B8]">
          {difficulty && (
            <span className="flex items-center gap-1">
              <span>📘</span> {difficulty}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {duration}
          </span>
          {studentCount !== undefined && (
            <span className="flex items-center gap-1">
              <Users size={11} />
              {studentCount.toLocaleString()}
            </span>
          )}
        </div>

        <span
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center",
            "bg-[#F1F5F9] group-hover:text-white transition-all duration-300",
            `group-hover:bg-[${config.accent}]`
          )}
          style={{
            background: undefined,
          }}
        >
          <ArrowRight size={13} className="text-[#94A3B8] group-hover:text-[#00838F] transition-colors" />
        </span>
      </div>
    </Link>
  );
}
