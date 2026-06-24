"use client";

import { ReactNode, useState, useEffect } from "react";
import { Play, Pause, RotateCcw, BookOpen, Save, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimulationShellProps {
  title: string;
  subject: "fisika" | "kimia" | "biologi";
  /** Canvas / main visual area */
  visualArea: ReactNode;
  /** Slider panel on right */
  controlPanel: ReactNode;
  /** Chart + data table below */
  dataPanel?: ReactNode;
  /** Worksheet component */
  worksheet?: ReactNode;
  /** Whether timer/animation is running */
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onRecordData?: () => void;
  showWorksheet?: boolean;
}

const subjectColors = {
  fisika:  { primary: "#2563EB", light: "bg-blue-50",   badge: "bg-blue-100 text-blue-700",   ring: "ring-blue-200" },
  kimia:   { primary: "#7C3AED", light: "bg-purple-50", badge: "bg-purple-100 text-purple-700", ring: "ring-purple-200" },
  biologi: { primary: "#16A34A", light: "bg-green-50",  badge: "bg-green-100 text-green-700",  ring: "ring-green-200" },
};

const subjectIcons = { fisika: "⚡", kimia: "🧪", biologi: "🧬" };

export function SimulationShell({
  title,
  subject,
  visualArea,
  controlPanel,
  dataPanel,
  worksheet,
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onRecordData,
  showWorksheet = true,
}: SimulationShellProps) {
  const [activeTab, setActiveTab] = useState<"grafik" | "worksheet">("grafik");
  const [dataPanelOpen, setDataPanelOpen] = useState(true);
  const colors = subjectColors[subject];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{subjectIcons[subject]}</span>
          <div>
            <h2 className="text-[17px] font-semibold text-[#1E252B] leading-tight" style={{ letterSpacing: "-0.2px" }}>
              {title}
            </h2>
            <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", colors.badge)}>
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </span>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-2">
          <button
            id="sim-reset"
            onClick={onReset}
            className="w-9 h-9 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#1E252B] transition-all active:scale-95"
            title="Reset"
          >
            <RotateCcw size={15} />
          </button>

          <button
            id={isPlaying ? "sim-pause" : "sim-play"}
            onClick={isPlaying ? onPause : onPlay}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all active:scale-95 hover:opacity-90"
            style={{ background: isPlaying ? "#EF4444" : colors.primary }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? "Pause" : "Mulai"}
          </button>

          {onRecordData && (
            <button
              id="sim-record"
              onClick={onRecordData}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#1E293B] text-white hover:bg-[#334155] transition-all active:scale-95"
            >
              <Save size={14} />
              Catat Data
            </button>
          )}
        </div>
      </div>

      {/* Main area: visual + control */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Visual canvas */}
        <div className={cn(
          "flex-1 rounded-2xl overflow-hidden border border-[#E2E8F0] min-h-[360px]",
          colors.light
        )}>
          {visualArea}
        </div>

        {/* Control panel */}
        <div className="w-72 shrink-0 flex flex-col gap-3">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 overflow-y-auto flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">
              Variabel Kontrol
            </p>
            {controlPanel}
          </div>
        </div>
      </div>

      {/* Bottom data panel */}
      {dataPanel && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center justify-between border-b border-[#F1F5F9] px-4">
            <div className="flex">
              {(["grafik", "worksheet"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-3 text-[13px] font-medium border-b-2 transition-colors",
                    activeTab === tab
                      ? "border-[#00838F] text-[#00838F]"
                      : "border-transparent text-[#94A3B8] hover:text-[#64748B]"
                  )}
                >
                  {tab === "grafik" ? "📊 Grafik & Data" : "📝 Worksheet"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDataPanelOpen(!dataPanelOpen)}
              className="text-[#94A3B8] hover:text-[#64748B] p-1"
            >
              {dataPanelOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
          </div>

          {dataPanelOpen && (
            <div className="p-4">
              {activeTab === "grafik" ? dataPanel : worksheet}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
