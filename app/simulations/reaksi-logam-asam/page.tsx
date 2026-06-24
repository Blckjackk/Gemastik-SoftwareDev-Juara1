"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { SimulationShell } from "@/components/simulation/simulation-shell";
import { VariableSlider } from "@/components/simulation/variable-slider";
import { Worksheet } from "@/components/simulation/worksheet";
import {
  METALS,
  ACIDS,
  getMetalReactionState,
  generateReactionTimeline,
  type MetalSubstance,
  type AcidSubstance,
  type ReactionFrameState,
} from "@/lib/simulations/chemistry/metals";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Thermometer, Beaker, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constants ───────────────────────────────────────────────
const CANVAS_W = 560;
const CANVAS_H = 340;
const DURATION_MAX = 60; // s

const WORKSHEET_COLUMNS = [
  { key: "metal", label: "Logam", unit: "" },
  { key: "acid", label: "[HCl]", unit: " M" },
  { key: "area", label: "Bentuk", unit: "" },
  { key: "time", label: "Durasi", unit: " s" },
  { key: "maxTemp", label: "T_maks", unit: " °C" },
  { key: "vH2", label: "Vol H₂", unit: " L" },
];

const ANALYSIS_QUESTIONS = [
  { id: "q1", question: "Urutkan logam-logam dalam percobaan ini berdasarkan laju reaksinya dari yang paling reaktif hingga yang paling lambat/tidak bereaksi!" },
  { id: "q2", question: "Mengapa besi (Fe) menghasilkan warna hijau pucat pada larutan seiring berjalannya reaksi? Jelaskan secara kimiawi!" },
  { id: "q3", question: "Bagaimana pengaruh bentuk logam (serbuk vs lempeng) terhadap laju reaksi dan peningkatan suhu larutan? Jelaskan berdasarkan teori tumbukan!" },
];

export default function ReaksiLogamAsamPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  // States
  const [selectedMetal, setSelectedMetal] = useState<MetalSubstance>(METALS[0]);
  const [selectedAcid, setSelectedAcid] = useState<AcidSubstance>(ACIDS[1]); // HCl 1.5M
  const [mass, setMass] = useState<number>(3.0); // 3 grams
  const [surfaceArea, setSurfaceArea] = useState<"serbuk" | "lempeng">("lempeng");
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentT, setCurrentT] = useState(0);
  const [dataRows, setDataRows] = useState<any[]>([]);

  // Calculate parameters
  const params = useMemo(() => ({
    metal: selectedMetal,
    acid: selectedAcid,
    mass,
    surfaceArea,
  }), [selectedMetal, selectedAcid, mass, surfaceArea]);

  // Current reaction state
  const currentState = useMemo(() => getMetalReactionState(params, currentT), [params, currentT]);

  // Full timeline for charts
  const timelineData = useMemo(() => {
    return generateReactionTimeline(params, DURATION_MAX, 1).map((s) => ({
      time: s.time,
      temperature: Math.round(s.temperature * 10) / 10,
      h2Volume: Math.round(s.h2Volume * 100) / 100,
    }));
  }, [params]);

  // Bubble array for animation
  const bubblesRef = useRef<{ x: number; y: number; size: number; speed: number }[]>([]);

  // Initialize bubbles
  useEffect(() => {
    bubblesRef.current = Array.from({ length: 30 }, () => ({
      x: 200 + Math.random() * 160,
      y: 100 + Math.random() * 180,
      size: 1.5 + Math.random() * 3,
      speed: 0.5 + Math.random() * 1.5,
    }));
  }, [selectedMetal]);

  // ─── Drawing ────────────────────────────────────────────────
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background
    ctx.fillStyle = "#0F172A"; // Slate-900 (Lab desk look)
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Shelf/Desk line
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(40, 290);
    ctx.lineTo(CANVAS_W - 40, 290);
    ctx.stroke();

    // Test Tube Stand
    ctx.fillStyle = "#1E293B";
    ctx.fillRect(265, 80, 30, 210); // Center pillar
    ctx.fillStyle = "#334155";
    ctx.fillRect(200, 280, 160, 10); // Base
    ctx.fillRect(230, 120, 100, 8);  // Top clamp holding tube

    // Draw Beaker/Test Tube holding the acid
    const tx = CANVAS_W / 2; // Center X
    const ty = 70; // Top Y
    const tw = 60; // Tube Width
    const th = 200; // Tube Height
    const tr = 30; // Bottom radius

    // Solution fluid
    const fillPercent = 0.65;
    const fluidH = th * fillPercent;
    const fluidY = ty + th - fluidH;

    ctx.save();
    // Clip solution area to tube bottom curves
    ctx.beginPath();
    ctx.moveTo(tx - tw / 2, ty);
    ctx.lineTo(tx - tw / 2, ty + th - tr);
    ctx.arc(tx, ty + th - tr, tr, Math.PI, 0, true);
    ctx.lineTo(tx + tw / 2, ty);
    ctx.closePath();
    ctx.clip();

    // Fill solution
    ctx.fillStyle = currentState.solutionColor;
    ctx.fillRect(tx - tw / 2, fluidY, tw, fluidH + 50);

    // Draw reaction bubbles (gas release)
    if (isPlaying && selectedMetal.reactivity > 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      const rateScale = currentState.bubbleRate;
      
      bubblesRef.current.forEach((b) => {
        // Adjust speed based on rate
        b.y -= b.speed * (rateScale / 2);
        if (b.y < fluidY + 5) {
          b.y = ty + th - 20 - Math.random() * 40; // reset to bottom
          b.x = tx - 22 + Math.random() * 44;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * (0.8 + rateScale / 5), 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw dissolving metal pieces at bottom
    if (currentState.metalMassRemaining > 0.01) {
      ctx.fillStyle = selectedMetal.color;
      const sizeRatio = currentState.metalMassRemaining / mass;
      ctx.save();
      ctx.translate(tx, ty + th - 15);
      
      if (surfaceArea === "lempeng") {
        // A single strip/strip chunk
        const lw = 12 * sizeRatio;
        const lh = 45 * sizeRatio;
        ctx.rotate(-Math.PI / 8);
        ctx.fillRect(-lw / 2, -lh, lw, lh);
        // outline
        ctx.strokeStyle = "#374151";
        ctx.lineWidth = 1;
        ctx.strokeRect(-lw / 2, -lh, lw, lh);
      } else {
        // Multiple small particles
        const numParticles = Math.floor(18 * sizeRatio);
        for (let i = 0; i < numParticles; i++) {
          const px = -20 + Math.random() * 40;
          const py = -10 + Math.random() * 10;
          ctx.beginPath();
          ctx.arc(px, py, 2 + Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
    ctx.restore();

    // Draw Test Tube Glass Container (outline + highlights)
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(tx - tw / 2, ty);
    ctx.lineTo(tx - tw / 2, ty + th - tr);
    ctx.arc(tx, ty + th - tr, tr, Math.PI, 0, true);
    ctx.lineTo(tx + tw / 2, ty);
    ctx.stroke();

    // Lip of test tube
    ctx.beginPath();
    ctx.ellipse(tx, ty, tw / 2 + 3, 3, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Light reflection streak on glass
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(tx + tw / 2 - 5, ty + 10);
    ctx.lineTo(tx + tw / 2 - 5, ty + th - 35);
    ctx.stroke();
    ctx.restore();

    // Thermometer Drawing (Overlay on right side)
    const thx = CANVAS_W - 80;
    const thy = 60;
    const thh = 180;
    ctx.save();
    // Stand/Background
    ctx.fillStyle = "#1E293B";
    ctx.fillRect(thx - 12, thy - 10, 24, thh + 40);
    ctx.strokeStyle = "#334155";
    ctx.strokeRect(thx - 12, thy - 10, 24, thh + 40);

    // Stem
    ctx.fillStyle = "#475569";
    ctx.fillRect(thx - 3, thy, 6, thh);

    // Liquid fill based on temperature (range: 20°C - 100°C)
    const maxTemp = 100;
    const minTemp = 20;
    const tempPercent = (currentState.temperature - minTemp) / (maxTemp - minTemp);
    const fillHeight = Math.max(0, Math.min(thh, thh * tempPercent));
    ctx.fillStyle = "#EF4444"; // Red hot
    ctx.fillRect(thx - 3, thy + thh - fillHeight, 6, fillHeight);

    // Bulb
    ctx.beginPath();
    ctx.arc(thx, thy + thh, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#EF4444";
    ctx.fill();

    // Labels/ticks
    ctx.fillStyle = "#94A3B8";
    ctx.font = "9px monospace";
    ctx.textAlign = "left";
    ctx.fillText("100°C", thx + 12, thy + 5);
    ctx.fillText("60°C", thx + 12, thy + thh/2 + 3);
    ctx.fillText("20°C", thx + 12, thy + thh - 5);

    // Thermometer title
    ctx.font = "9px Inter";
    ctx.fillStyle = "#64748B";
    ctx.textAlign = "center";
    ctx.fillText("SUHU", thx, thy - 18);
    ctx.restore();

    // Status overlay (Top left)
    ctx.fillStyle = "rgba(30, 41, 59, 0.75)";
    ctx.fillRect(15, 15, 160, 80);
    ctx.strokeStyle = "#334155";
    ctx.strokeRect(15, 15, 160, 80);

    ctx.fillStyle = "#4DD0E1";
    ctx.font = "bold 11px Inter";
    ctx.fillText("TERMOMETER VIRTUAL", 25, 32);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 15px Inter";
    ctx.fillText(`${currentState.temperature.toFixed(1)} °C`, 25, 52);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "10px Inter";
    ctx.fillText(`Masa Logam: ${currentState.metalMassRemaining.toFixed(2)} g`, 25, 70);
    ctx.fillText(`Volume H₂: ${currentState.h2Volume.toFixed(3)} L`, 25, 84);

    // Formula label at bottom
    ctx.fillStyle = "#94A3B8";
    ctx.font = "italic 13px Inter";
    ctx.textAlign = "center";
    ctx.fillText(selectedMetal.reactionText, CANVAS_W / 2, 325);

  }, [currentState, isPlaying, selectedMetal, mass, surfaceArea]);

  // ─── Animation loop ─────────────────────────────────────────
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current + pausedAtRef.current) / 1000;
    const clampedT = Math.min(elapsed, DURATION_MAX);

    setCurrentT(clampedT);

    drawCanvas();

    if (clampedT < DURATION_MAX && (selectedMetal.reactivity > 0 ? getMetalReactionState(params, clampedT).metalMassRemaining > 0.01 : false)) {
      animFrameRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
    }
  }, [params, selectedMetal, drawCanvas]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    startTimeRef.current = 0;
    animFrameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    cancelAnimationFrame(animFrameRef.current);
    pausedAtRef.current = currentT * 1000;
  }, [currentT]);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    cancelAnimationFrame(animFrameRef.current);
    setCurrentT(0);
    pausedAtRef.current = 0;
    startTimeRef.current = 0;
    
    // reset bubble positions
    bubblesRef.current.forEach((b) => {
      b.y = 100 + Math.random() * 180;
    });

    setTimeout(drawCanvas, 50);
  }, [drawCanvas]);

  const handleRecordData = useCallback(() => {
    const row = {
      id: Date.now().toString(),
      metal: selectedMetal.symbol,
      acid: `${selectedAcid.concentration} M`,
      area: surfaceArea === "serbuk" ? "Serbuk" : "Lempeng",
      time: currentT.toFixed(1),
      maxTemp: currentState.temperature.toFixed(1),
      vH2: currentState.h2Volume.toFixed(3),
    };
    setDataRows((prev) => [...prev, row]);
  }, [selectedMetal, selectedAcid, surfaceArea, currentT, currentState]);

  // Draw on param change
  useEffect(() => {
    if (!isPlaying) drawCanvas();
  }, [params, isPlaying, currentT, drawCanvas]);

  useEffect(() => {
    drawCanvas();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ─── UI Parts ─────────────────────────────────────────────
  const visualArea = (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="rounded-xl max-w-full shadow-inner"
      />
      {/* Time badge */}
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[12px] font-mono text-[#1E252B] shadow-sm">
        t = {currentT.toFixed(1)} s
      </div>
    </div>
  );

  const controlPanel = (
    <div className="space-y-6">
      {/* Metal Select */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">Pilih Logam</label>
        <div className="grid grid-cols-4 gap-2">
          {METALS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                handleReset();
                setSelectedMetal(m);
              }}
              className={cn(
                "py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95",
                selectedMetal.id === m.id
                  ? "bg-[#7C3AED] text-white border-transparent shadow-sm"
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#1E252B] hover:bg-[#F8FAFC]"
              )}
            >
              {m.symbol}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-[#94A3B8]">
          Logam aktif: <span className="font-semibold text-[#4B5563]">{selectedMetal.name} ({selectedMetal.symbol})</span>
        </p>
      </div>

      {/* Acid Select */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">Konsentrasi Asam (HCl)</label>
        <div className="grid grid-cols-3 gap-2">
          {ACIDS.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                handleReset();
                setSelectedAcid(a);
              }}
              className={cn(
                "py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95",
                selectedAcid.id === a.id
                  ? "bg-[#00838F] text-white border-transparent shadow-sm"
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#1E252B] hover:bg-[#F8FAFC]"
              )}
            >
              {a.concentration.toFixed(1)} M
            </button>
          ))}
        </div>
      </div>

      {/* Surface Area Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">Bentuk Logam</label>
        <div className="grid grid-cols-2 gap-2">
          {(["lempeng", "serbuk"] as const).map((a) => (
            <button
              key={a}
              onClick={() => {
                handleReset();
                setSurfaceArea(a);
              }}
              className={cn(
                "py-2 rounded-xl text-xs font-semibold border capitalize transition-all active:scale-95",
                surfaceArea === a
                  ? "bg-[#16A34A] text-white border-transparent shadow-sm"
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#1E252B] hover:bg-[#F8FAFC]"
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Mass Slider */}
      <VariableSlider
        label="Masa Logam"
        symbol="m"
        unit=" g"
        value={mass}
        min={0.5}
        max={5.0}
        step={0.5}
        color="#7C3AED"
        onChange={(v) => {
          handleReset();
          setMass(v);
        }}
        description="Massa padatan logam awal"
      />
    </div>
  );

  const dataPanel = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Kurva Suhu (T vs t)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} label={{ value: "t (s)", position: "insideBottom", offset: -5, fontSize: 11 }} />
              <YAxis domain={[20, 100]} tick={{ fontSize: 10 }} label={{ value: "T (°C)", angle: -90, position: "insideLeft", fontSize: 11 }} />
              <Tooltip formatter={(v: any) => `${v}°C`} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Kurva Gas H₂ Terbentuk (V vs t)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} label={{ value: "t (s)", position: "insideBottom", offset: -5, fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} label={{ value: "V (L)", angle: -90, position: "insideLeft", fontSize: 11 }} />
              <Tooltip formatter={(v: any) => `${v} L`} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="h2Volume" stroke="#2563EB" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const worksheetEl = (
    <Worksheet
      simulationTitle="Reaksi Logam + Asam"
      columns={WORKSHEET_COLUMNS}
      dataRows={dataRows}
      analysisQuestions={ANALYSIS_QUESTIONS}
    />
  );

  return (
    <AppLayout title="Reaksi Logam + Asam" userName="Andi Pratama" userRole="siswa">
      <SimulationShell
        title="Reaksi Logam + Asam"
        subject="kimia"
        visualArea={visualArea}
        controlPanel={controlPanel}
        dataPanel={dataPanel}
        worksheet={worksheetEl}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onRecordData={handleRecordData}
      />
    </AppLayout>
  );
}
