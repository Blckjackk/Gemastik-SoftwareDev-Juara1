"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { SimulationShell } from "@/components/simulation/simulation-shell";
import { VariableSlider } from "@/components/simulation/variable-slider";
import { Worksheet } from "@/components/simulation/worksheet";
import {
  computeProjectileResults,
  generateTrajectory,
  getPositionAt,
  type ProjectileParams,
} from "@/lib/simulations/physics/projectile";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceDot, Legend,
} from "recharts";

// ─── Constants ───────────────────────────────────────────────
const CANVAS_W = 720;
const CANVAS_H = 380;
const MARGIN = { l: 48, r: 32, t: 32, b: 48 };
const GRAVITY = 9.81;
const TRAIL_MAX = 120;

// ─── Helpers ─────────────────────────────────────────────────
function worldToCanvas(
  x: number, y: number,
  xMax: number, yMax: number
): [number, number] {
  const drawW = CANVAS_W - MARGIN.l - MARGIN.r;
  const drawH = CANVAS_H - MARGIN.t - MARGIN.b;
  const cx = MARGIN.l + (x / xMax) * drawW;
  const cy = CANVAS_H - MARGIN.b - (y / yMax) * drawH;
  return [cx, cy];
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  dx: number, dy: number,
  color: string,
  scale = 1
) {
  const len = Math.sqrt(dx * dx + dy * dy) * scale;
  if (len < 2) return;
  const angle = Math.atan2(dy, dx);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + dx * scale, y + dy * scale);
  ctx.stroke();
  // arrowhead
  ctx.beginPath();
  ctx.translate(x + dx * scale, y + dy * scale);
  ctx.rotate(angle);
  ctx.moveTo(0, 0);
  ctx.lineTo(-8, -4);
  ctx.lineTo(-8, 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ─── Worksheet config ─────────────────────────────────────────
const WORKSHEET_COLUMNS = [
  { key: "v0", label: "v₀", unit: "m/s" },
  { key: "theta", label: "θ", unit: "°" },
  { key: "h0", label: "h₀", unit: "m" },
  { key: "hMax", label: "H_maks", unit: "m" },
  { key: "range", label: "Jangkauan", unit: "m" },
  { key: "tTotal", label: "t_total", unit: "s" },
];

const ANALYSIS_QUESTIONS = [
  { id: "q1", question: "Bagaimana pengaruh sudut peluncuran (θ) terhadap jangkauan (R) bola?" },
  { id: "q2", question: "Pada sudut berapa bola mencapai jangkauan maksimum? Mengapa demikian?" },
  { id: "q3", question: "Apa yang terjadi pada ketinggian maksimum jika kecepatan awal (v₀) dinaikkan 2 kali lipat?" },
];

// ─── Main Component ──────────────────────────────────────────
export default function GerakParabolaPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  const [params, setParams] = useState<ProjectileParams>({
    v0: 20, theta: 45, h0: 0, g: GRAVITY,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentT, setCurrentT] = useState(0);
  const [trail, setTrail] = useState<[number, number][]>([]);
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [showVectors, setShowVectors] = useState(true);

  const results = useMemo(() => computeProjectileResults(params), [params]);
  const trajectory = useMemo(() => generateTrajectory(params, 300), [params]);

  // Chart data
  const chartData = useMemo(() =>
    trajectory.map((p) => ({
      x: Math.round(p.x * 10) / 10,
      y: Math.round(p.y * 10) / 10,
      t: Math.round(p.t * 100) / 100,
      vy: Math.round(p.vy * 10) / 10,
    })), [trajectory]
  );

  const xMax = Math.max(results.range * 1.15, 10);
  const yMax = Math.max(results.hMax * 1.4, 5);

  // ─── Canvas Drawing ───────────────────────────────────────
  const drawCanvas = useCallback((t: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    const drawW = CANVAS_W - MARGIN.l - MARGIN.r;
    const drawH = CANVAS_H - MARGIN.t - MARGIN.b;

    // Background grid
    ctx.save();
    ctx.strokeStyle = "rgba(226,232,240,0.7)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = MARGIN.l + (i / 10) * drawW;
      ctx.beginPath(); ctx.moveTo(x, MARGIN.t); ctx.lineTo(x, CANVAS_H - MARGIN.b); ctx.stroke();
    }
    for (let i = 0; i <= 8; i++) {
      const y = MARGIN.t + (i / 8) * drawH;
      ctx.beginPath(); ctx.moveTo(MARGIN.l, y); ctx.lineTo(CANVAS_W - MARGIN.r, y); ctx.stroke();
    }
    ctx.restore();

    // Axes
    ctx.save();
    ctx.strokeStyle = "#94A3B8";
    ctx.lineWidth = 1.5;
    // X axis (ground)
    ctx.beginPath();
    ctx.moveTo(MARGIN.l, CANVAS_H - MARGIN.b);
    ctx.lineTo(CANVAS_W - MARGIN.r, CANVAS_H - MARGIN.b);
    ctx.stroke();
    // Y axis
    ctx.beginPath();
    ctx.moveTo(MARGIN.l, MARGIN.t);
    ctx.lineTo(MARGIN.l, CANVAS_H - MARGIN.b);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = "#94A3B8";
    ctx.font = "11px Inter, system-ui";
    ctx.textAlign = "right";
    for (let i = 0; i <= 4; i++) {
      const val = (i / 4) * yMax;
      const [, cy] = worldToCanvas(0, val, xMax, yMax);
      ctx.fillText(val.toFixed(0) + " m", MARGIN.l - 6, cy + 4);
    }
    ctx.textAlign = "center";
    for (let i = 0; i <= 5; i++) {
      const val = (i / 5) * xMax;
      const [cx] = worldToCanvas(val, 0, xMax, yMax);
      ctx.fillText(val.toFixed(0), cx, CANVAS_H - MARGIN.b + 16);
    }
    // Axis names
    ctx.fillStyle = "#64748B";
    ctx.font = "12px Inter, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Jarak (m)", MARGIN.l + drawW / 2, CANVAS_H - 8);
    ctx.save();
    ctx.translate(14, MARGIN.t + drawH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Ketinggian (m)", 0, 0);
    ctx.restore();
    ctx.restore();

    // Full trajectory path (ghost)
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(148,163,184,0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    trajectory.forEach((p, i) => {
      const [cx, cy] = worldToCanvas(p.x, p.y, xMax, yMax);
      if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    });
    ctx.stroke();
    ctx.restore();

    // Trail
    if (trail.length > 1) {
      ctx.save();
      ctx.lineWidth = 2.5;
      trail.forEach(([cx, cy], i) => {
        const alpha = (i / trail.length) * 0.8;
        ctx.strokeStyle = `rgba(0,131,143,${alpha})`;
        if (i > 0) {
          ctx.beginPath();
          ctx.moveTo(trail[i - 1][0], trail[i - 1][1]);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        }
      });
      ctx.restore();
    }

    // Current ball position
    const pos = getPositionAt(params, t);
    const [bx, by] = worldToCanvas(pos.x, pos.y, xMax, yMax);

    // Shadow on ground
    const [gx] = worldToCanvas(pos.x, 0, xMax, yMax);
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.beginPath();
    ctx.ellipse(gx, CANVAS_H - MARGIN.b, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Ball glow
    ctx.save();
    const grad = ctx.createRadialGradient(bx, by, 0, bx, by, 18);
    grad.addColorStop(0, "rgba(0,131,143,0.3)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(bx, by, 18, 0, Math.PI * 2); ctx.fill();
    // Ball
    const ballGrad = ctx.createRadialGradient(bx - 4, by - 4, 1, bx, by, 10);
    ballGrad.addColorStop(0, "#4DD0E1");
    ballGrad.addColorStop(1, "#006064");
    ctx.fillStyle = ballGrad;
    ctx.beginPath(); ctx.arc(bx, by, 10, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Velocity vectors
    if (showVectors) {
      const scale = 4;
      drawArrow(ctx, bx, by, pos.vx * scale, -pos.vy * scale, "#EF4444", 0.7); // total
      drawArrow(ctx, bx, by, pos.vx * scale, 0, "#2563EB", 0.7); // vx
      drawArrow(ctx, bx, by, 0, -pos.vy * scale, "#22C55E", 0.7); // vy

      // Legend
      ctx.font = "11px Inter, system-ui";
      [["#2563EB", `vₓ = ${pos.vx.toFixed(1)} m/s`], ["#22C55E", `vᵧ = ${pos.vy.toFixed(1)} m/s`], ["#EF4444", `v = ${Math.sqrt(pos.vx**2+pos.vy**2).toFixed(1)} m/s`]].forEach(([color, text], i) => {
        ctx.fillStyle = color as string;
        ctx.fillRect(CANVAS_W - 148, 10 + i * 18, 10, 10);
        ctx.fillStyle = "#334155";
        ctx.fillText(text as string, CANVAS_W - 134, 19 + i * 18);
      });
    }

    // H_max indicator
    const [hmx, hmy] = worldToCanvas(
      (params.v0 * Math.cos(params.theta * Math.PI / 180)) * (params.v0 * Math.sin(params.theta * Math.PI / 180) / GRAVITY),
      results.hMax, xMax, yMax
    );
    ctx.save();
    ctx.strokeStyle = "#EAB308";
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(MARGIN.l, hmy); ctx.lineTo(hmx, hmy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hmx, hmy); ctx.lineTo(hmx, CANVAS_H - MARGIN.b); ctx.stroke();
    ctx.restore();
  }, [params, trail, results, trajectory, xMax, yMax, showVectors]);

  // ─── Animation Loop ───────────────────────────────────────
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current + pausedAtRef.current) / 1000;
    const clampedT = Math.min(elapsed, results.tTotal);

    setCurrentT(clampedT);

    const pos = getPositionAt(params, clampedT);
    const [cx, cy] = worldToCanvas(pos.x, pos.y, xMax, yMax);
    setTrail((prev) => {
      const next = [...prev, [cx, cy] as [number, number]];
      return next.slice(-TRAIL_MAX);
    });

    drawCanvas(clampedT);

    if (clampedT < results.tTotal) {
      animFrameRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
    }
  }, [params, results, drawCanvas, xMax, yMax]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setTrail([]);
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
    setTrail([]);
    pausedAtRef.current = 0;
    startTimeRef.current = 0;
    drawCanvas(0);
  }, [drawCanvas]);

  const handleRecordData = useCallback(() => {
    const row = {
      id: Date.now().toString(),
      v0: params.v0,
      theta: params.theta,
      h0: params.h0,
      hMax: results.hMax.toFixed(2),
      range: results.range.toFixed(2),
      tTotal: results.tTotal.toFixed(2),
    };
    setDataRows((prev) => [...prev, row]);
  }, [params, results]);

  // Draw on param change
  useEffect(() => {
    if (!isPlaying) drawCanvas(currentT);
  }, [params, isPlaying, currentT, drawCanvas]);

  useEffect(() => {
    drawCanvas(0);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ─── UI Parts ─────────────────────────────────────────────
  const visualArea = (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="rounded-xl max-w-full"
        style={{ background: "linear-gradient(180deg, #EFF6FF 0%, #F8FAFC 60%, #E2E8F0 100%)" }}
      />
      {/* Time badge */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[12px] font-mono text-[#1E252B] shadow-sm">
        t = {currentT.toFixed(2)} s
      </div>
    </div>
  );

  const controlPanel = (
    <div className="space-y-5">
      <VariableSlider label="Kecepatan Awal" symbol="v₀" unit=" m/s" value={params.v0} min={5} max={50} step={1} color="#2563EB"
        onChange={(v) => { handleReset(); setParams((p) => ({ ...p, v0: v })); }}
        description="Besar kecepatan awal peluru" />
      <VariableSlider label="Sudut Peluncuran" symbol="θ" unit="°" value={params.theta} min={1} max={89} step={1} color="#7C3AED"
        onChange={(v) => { handleReset(); setParams((p) => ({ ...p, theta: v })); }}
        description="Sudut terhadap bidang datar" />
      <VariableSlider label="Ketinggian Awal" symbol="h₀" unit=" m" value={params.h0} min={0} max={20} step={0.5} color="#00838F"
        onChange={(v) => { handleReset(); setParams((p) => ({ ...p, h0: v })); }}
        description="Ketinggian titik peluncuran" />

      <div className="border-t border-[#F1F5F9] pt-4 space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8]">Hasil Analitik</p>
        {[
          { label: "H_maks", value: results.hMax.toFixed(2), unit: "m", color: "#EAB308" },
          { label: "R_jangkauan", value: results.range.toFixed(2), unit: "m", color: "#2563EB" },
          { label: "t_total", value: results.tTotal.toFixed(2), unit: "s", color: "#00838F" },
          { label: "v₀ₓ", value: results.v0x.toFixed(2), unit: "m/s", color: "#64748B" },
          { label: "v₀ᵧ", value: results.v0y.toFixed(2), unit: "m/s", color: "#64748B" },
        ].map((r) => (
          <div key={r.label} className="flex justify-between items-center py-1">
            <span className="text-[12px] font-medium text-[#64748B]">{r.label}</span>
            <span className="text-[13px] font-semibold font-mono" style={{ color: r.color }}>
              {r.value} <span className="text-[#94A3B8] font-normal text-[11px]">{r.unit}</span>
            </span>
          </div>
        ))}
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <div
          className={`w-10 h-5 rounded-full transition-colors relative ${showVectors ? "bg-[#00838F]" : "bg-[#E2E8F0]"}`}
          onClick={() => setShowVectors(!showVectors)}
        >
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${showVectors ? "left-5" : "left-0.5"}`} />
        </div>
        <span className="text-[12px] text-[#64748B]">Tampilkan vektor kecepatan</span>
      </label>
    </div>
  );

  const dataPanel = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Kurva Lintasan (y vs x)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
              <XAxis dataKey="x" tick={{ fontSize: 10 }} label={{ value: "x (m)", position: "insideBottom", offset: -5, fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} label={{ value: "y (m)", angle: -90, position: "insideLeft", fontSize: 11 }} />
              <Tooltip formatter={(v: any) => Number(v).toFixed(2)} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="y" stroke="#00838F" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Kecepatan Vertikal (vᵧ vs t)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
              <XAxis dataKey="t" tick={{ fontSize: 10 }} label={{ value: "t (s)", position: "insideBottom", offset: -5, fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: any) => Number(v).toFixed(2)} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="vy" stroke="#22C55E" strokeWidth={2} dot={false} name="vᵧ (m/s)" />
              <ReferenceDot x={chartData.find(d => Math.abs(d.vy) < 0.5)?.t ?? 0} y={0} r={4} fill="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const worksheetEl = (
    <Worksheet
      simulationTitle="Gerak Parabola"
      columns={WORKSHEET_COLUMNS}
      dataRows={dataRows}
      analysisQuestions={ANALYSIS_QUESTIONS}
    />
  );

  return (
    <AppLayout title="Gerak Parabola" userName="Andi Pratama" userRole="siswa">
      <SimulationShell
        title="Gerak Parabola"
        subject="fisika"
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
