"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { SimulationShell } from "@/components/simulation/simulation-shell";
import { VariableSlider } from "@/components/simulation/variable-slider";
import { Worksheet } from "@/components/simulation/worksheet";
import {
  computePhotosynthesis,
  generatePhotosynthesisLightCurve,
  generatePhotosynthesisCO2Curve,
  type PhotosynthesisParams,
} from "@/lib/simulations/biology/photosynthesis";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sun, Thermometer, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constants ───────────────────────────────────────────────
const CANVAS_W = 560;
const CANVAS_H = 340;
const DURATION_MAX = 60; // s

const WORKSHEET_COLUMNS = [
  { key: "light", label: "Cahaya", unit: " Lux" },
  { key: "co2", label: "[CO₂]", unit: " %" },
  { key: "temp", label: "Suhu", unit: " °C" },
  { key: "time", label: "Durasi", unit: " s" },
  { key: "rate", label: "Laju O₂", unit: " mL/h" },
];

const ANALYSIS_QUESTIONS = [
  { id: "q1", question: "Bagaimana pengaruh intensitas cahaya (Lux) terhadap laju pembentukan gelembung oksigen pada Hydrilla?" },
  { id: "q2", question: "Pada konsentrasi CO₂ berapa laju fotosintesis mulai mencapai batas jenuh (saturasi)? Mengapa terjadi demikian?" },
  { id: "q3", question: "Mengapa suhu air yang sangat rendah (10°C) atau sangat tinggi (50°C) menghambat laju fotosintesis meskipun cahaya dan CO₂ cukup? Jelaskan kaitannya dengan kerja enzim!" },
];

export default function FotosintesisPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  // States
  const [params, setParams] = useState<PhotosynthesisParams>({
    lightIntensity: 400,
    co2Concentration: 0.25,
    temperature: 30,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentT, setCurrentT] = useState(0);
  const [dataRows, setDataRows] = useState<any[]>([]);

  // Calculate current state
  const currentState = useMemo(() => computePhotosynthesis(params), [params]);

  // Curve data for charts
  const lightCurveData = useMemo(() => {
    return generatePhotosynthesisLightCurve(params.co2Concentration, params.temperature);
  }, [params.co2Concentration, params.temperature]);

  const co2CurveData = useMemo(() => {
    return generatePhotosynthesisCO2Curve(params.lightIntensity, params.temperature);
  }, [params.lightIntensity, params.temperature]);

  // Bubble positions
  const bubblesRef = useRef<{ x: number; y: number; size: number; speed: number }[]>([]);

  useEffect(() => {
    // Generate static initial bubbles under the funnel
    bubblesRef.current = Array.from({ length: 25 }, () => ({
      x: 275 + (Math.random() - 0.5) * 15,
      y: 200 + Math.random() * 50,
      size: 1.2 + Math.random() * 2.2,
      speed: 0.4 + Math.random() * 0.8,
    }));
  }, []);

  // ─── Drawing ────────────────────────────────────────────────
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background (Laboratory back-drop)
    ctx.fillStyle = "#0F172A"; // Slate-900
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Benchtop
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(30, 290);
    ctx.lineTo(CANVAS_W - 30, 290);
    ctx.stroke();

    const cx = CANVAS_W / 2; // Center beaker X
    const cy = 190; // Center beaker Y

    // Light Source drawing (Left bulb)
    const lx = 90;
    const ly = 170;
    ctx.save();
    // Stand
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(lx, 290);
    ctx.lineTo(lx, ly + 25);
    ctx.stroke();

    // Bulb glow ring
    if (params.lightIntensity > 0) {
      const glowRadius = 30 + (params.lightIntensity / 1000) * 80;
      const grad = ctx.createRadialGradient(lx, ly, 5, lx, ly, glowRadius);
      grad.addColorStop(0, "rgba(253, 224, 71, 0.4)");
      grad.addColorStop(0.5, "rgba(253, 224, 71, 0.15)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(lx, ly, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Lamp body
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.arc(lx, ly, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = params.lightIntensity > 50 ? "#FDE047" : "#64748B"; // Yellow light
    ctx.beginPath();
    ctx.arc(lx, ly, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Beaker Drawing
    const bw = 150;
    const bh = 180;
    const bx = cx - bw / 2;
    const by = 290 - bh;

    ctx.save();
    // Fluid (Water inside Beaker)
    ctx.fillStyle = "rgba(14, 116, 144, 0.25)"; // Pale cyan
    ctx.fillRect(bx + 3, by + 15, bw - 6, bh - 18);

    // Funnel & Inverted Test Tube setup
    const fx = cx;
    const fy = by + bh - 40; // bottom of funnel base
    
    // Funnel drawing
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(fx - 45, fy);
    ctx.lineTo(fx + 45, fy);
    ctx.lineTo(fx + 8, fy - 50);
    ctx.lineTo(fx + 8, fy - 100);
    ctx.lineTo(fx - 8, fy - 100);
    ctx.lineTo(fx - 8, fy - 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inverted Test Tube
    ctx.beginPath();
    ctx.moveTo(fx - 14, fy - 40);
    ctx.lineTo(fx - 14, fy - 140);
    ctx.arc(fx, fy - 140, 14, Math.PI, 0, false);
    ctx.lineTo(fx + 14, fy - 40);
    ctx.stroke();
    ctx.fill();

    // Gas collection pocket at the top of test tube
    const collectedH = Math.min(25, currentState.o2Rate * (currentT / 10));
    if (collectedH > 1) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"; // clear gas pocket
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(fx - 14, fy - 140);
      ctx.arc(fx, fy - 140, 14, Math.PI, 0, false);
      ctx.lineTo(fx + 14, fy - 140 + collectedH);
      ctx.lineTo(fx - 14, fy - 140 + collectedH);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Gas division line
      ctx.beginPath();
      ctx.moveTo(fx - 14, fy - 140 + collectedH);
      ctx.lineTo(fx + 14, fy - 140 + collectedH);
      ctx.stroke();
    }

    // Hydrilla plant (Leaves + stems)
    const plantX = cx;
    const plantY = by + bh - 20;
    ctx.strokeStyle = currentState.leafColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(plantX, plantY);
    ctx.lineTo(plantX, plantY - 70);
    ctx.stroke();

    // Leaf nodes
    const drawLeaf = (lx: number, ly: number, angle: number) => {
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(angle);
      ctx.fillStyle = currentState.leafColor;
      ctx.beginPath();
      ctx.ellipse(0, 0, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawLeaf(plantX, plantY - 20, -Math.PI / 6);
    drawLeaf(plantX, plantY - 20, Math.PI + Math.PI / 6);
    drawLeaf(plantX, plantY - 45, -Math.PI / 4);
    drawLeaf(plantX, plantY - 45, Math.PI + Math.PI / 4);
    drawLeaf(plantX, plantY - 65, -Math.PI / 3);
    drawLeaf(plantX, plantY - 65, Math.PI + Math.PI / 3);

    // Rising Bubbles
    if (isPlaying && currentState.bubbleRate > 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      const rateScale = currentState.bubbleRate;

      bubblesRef.current.forEach((b) => {
        // Move bubbles up
        b.y -= b.speed * (rateScale / 2.5);
        // Bubble path funnel constraint (goes narrow towards top stem)
        if (b.y < fy - 100) {
          b.y = fy - 10 + Math.random() * 20; // reset to bottom
          b.x = fx + (Math.random() - 0.5) * 12;
        }

        // Funnel constriction
        if (b.y < fy && b.y > fy - 100) {
          const ratio = (b.y - (fy - 100)) / 100; // 0 at top, 1 at bottom
          b.x = fx + (Math.random() - 0.5) * (8 + ratio * 40);
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * (0.8 + rateScale / 6), 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Beaker body outline
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx, by + bh);
    ctx.lineTo(bx + bw, by + bh);
    ctx.lineTo(bx + bw, by);
    ctx.stroke();

    // Spout lip
    ctx.beginPath();
    ctx.moveTo(bx - 3, by);
    ctx.lineTo(bx + 4, by);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx + bw - 4, by);
    ctx.lineTo(bx + bw + 3, by);
    ctx.stroke();
    ctx.restore();

    // Carbon Dioxide status indicators
    ctx.fillStyle = "rgba(30, 41, 59, 0.75)";
    ctx.fillRect(15, 15, 160, 80);
    ctx.strokeStyle = "#334155";
    ctx.strokeRect(15, 15, 160, 80);

    ctx.fillStyle = "#4DD0E1";
    ctx.font = "bold 11px Inter";
    ctx.fillText("PRODUKSI GAS OKSIGEN", 25, 32);
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 15px Inter";
    ctx.fillText(`${currentState.o2Rate.toFixed(2)} mL/h`, 25, 52);

    ctx.fillStyle = "#94A3B8";
    ctx.font = "10px Inter";
    ctx.fillText(`Maks. Laju: 12.0 mL/h`, 25, 70);
    ctx.fillText(`Kadar O₂ Terkumpul: ${(currentState.o2Rate * currentT / 300).toFixed(3)} mL`, 25, 84);

  }, [currentState, isPlaying, params, currentT]);

  // ─── Animation loop ─────────────────────────────────────────
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current + pausedAtRef.current) / 1000;
    const clampedT = Math.min(elapsed, DURATION_MAX);

    setCurrentT(clampedT);
    drawCanvas();

    if (clampedT < DURATION_MAX) {
      animFrameRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
    }
  }, [drawCanvas]);

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

    // reset bubbles
    bubblesRef.current.forEach((b) => {
      b.y = 200 + Math.random() * 50;
    });

    setTimeout(drawCanvas, 50);
  }, [drawCanvas]);

  const handleRecordData = useCallback(() => {
    const row = {
      id: Date.now().toString(),
      light: `${params.lightIntensity} Lux`,
      co2: `${params.co2Concentration.toFixed(2)} %`,
      temp: `${params.temperature} °C`,
      time: currentT.toFixed(1),
      rate: currentState.o2Rate.toFixed(2),
    };
    setDataRows((prev) => [...prev, row]);
  }, [params, currentT, currentState]);

  // Draw on param change
  useEffect(() => {
    if (!isPlaying) drawCanvas();
  }, [params, isPlaying, drawCanvas]);

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
      {/* Light Intensity Slider */}
      <VariableSlider
        label="Intensitas Cahaya"
        symbol="I"
        unit=" Lux"
        value={params.lightIntensity}
        min={0}
        max={1000}
        step={50}
        color="#FDE047"
        onChange={(v) => {
          handleReset();
          setParams((p) => ({ ...p, lightIntensity: v }));
        }}
        description="Jarak lampu/kecerahan cahaya ke Hydrilla"
      />

      {/* CO2 Concentration Slider */}
      <VariableSlider
        label="Konsentrasi CO₂"
        symbol="CO₂"
        unit="%"
        value={params.co2Concentration}
        min={0.01}
        max={1.00}
        step={0.05}
        color="#00838F"
        onChange={(v) => {
          handleReset();
          setParams((p) => ({ ...p, co2Concentration: v }));
        }}
        description="Kadar CO₂ terlarut (NaHC0₃)"
      />

      {/* Temperature Slider */}
      <VariableSlider
        label="Suhu Air"
        symbol="T"
        unit=" °C"
        value={params.temperature}
        min={10}
        max={50}
        step={1}
        color="#EF4444"
        onChange={(v) => {
          handleReset();
          setParams((p) => ({ ...p, temperature: v }));
        }}
        description="Suhu media air di dalam beaker"
      />
    </div>
  );

  const dataPanel = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Kurva Laju vs Cahaya (O₂ vs I)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lightCurveData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
              <XAxis dataKey="light" tick={{ fontSize: 10 }} label={{ value: "Cahaya (Lux)", position: "insideBottom", offset: -5, fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} label={{ value: "Rate (mL/h)", angle: -90, position: "insideLeft", fontSize: 11 }} />
              <Tooltip formatter={(v: any) => `${v} mL/h`} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="o2Rate" stroke="#16A34A" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Kurva Laju vs CO₂ (O₂ vs CO₂)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={co2CurveData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
              <XAxis dataKey="co2" tick={{ fontSize: 10 }} label={{ value: "CO2 (%)", position: "insideBottom", offset: -5, fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: any) => `${v} mL/h`} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="o2Rate" stroke="#00838F" strokeWidth={2} dot={false} name="mL/h" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const worksheetEl = (
    <Worksheet
      simulationTitle="Fotosintesis"
      columns={WORKSHEET_COLUMNS}
      dataRows={dataRows}
      analysisQuestions={ANALYSIS_QUESTIONS}
    />
  );

  return (
    <AppLayout title="Fotosintesis" userName="Andi Pratama" userRole="siswa">
      <SimulationShell
        title="Fotosintesis"
        subject="biologi"
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
