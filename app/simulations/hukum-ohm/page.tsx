"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { SimulationShell } from "@/components/simulation/simulation-shell";
import { VariableSlider } from "@/components/simulation/variable-slider";
import { Worksheet } from "@/components/simulation/worksheet";
import { computeOhm, generateVIData, type Resistor, type CircuitTopology } from "@/lib/simulations/physics/ohm";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { Plus, Minus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Default resistors ────────────────────────────────────────
const DEFAULT_RESISTORS: Resistor[] = [
  { id: "r1", label: "R₁", resistance: 10 },
  { id: "r2", label: "R₂", resistance: 20 },
  { id: "r3", label: "R₃", resistance: 30 },
];

// ─── Canvas Circuit Diagram ───────────────────────────────────
function CircuitDiagram({
  topology,
  resistors,
  results,
  voltage,
  isPlaying,
}: {
  topology: CircuitTopology;
  resistors: Resistor[];
  results: ReturnType<typeof computeOhm>;
  voltage: number;
  isPlaying: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const draw = useCallback((t: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#1E293B";
    ctx.fillRect(0, 0, W, H);

    const numR = resistors.length;
    const cx = W / 2, cy = H / 2;
    const wireColor = "#334155";
    const activeColor = "#00838F";

    // Simple schematic based on topology
    if (topology === "seri") {
      // Battery on left, resistors in a row
      const startX = 80, endX = W - 80;
      const wireY = cy;
      const spacing = (endX - startX) / (numR + 1);

      // Top wire
      ctx.strokeStyle = isPlaying ? activeColor : wireColor;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(startX, wireY - 40); ctx.lineTo(endX, wireY - 40); ctx.stroke();
      // Bottom wire
      ctx.beginPath(); ctx.moveTo(startX, wireY + 40); ctx.lineTo(endX, wireY + 40); ctx.stroke();

      // Battery
      drawBattery(ctx, startX, wireY, voltage, isPlaying ? activeColor : "#64748B");

      // LED at end
      drawLED(ctx, endX - 30, wireY, results.power, isPlaying);

      // Resistors
      resistors.forEach((r, i) => {
        const rx = startX + spacing * (i + 1);
        drawResistor(ctx, rx, wireY - 40, 50, r.label, r.resistance, results.resistorData[i]?.current ?? 0, isPlaying);
      });

      // Animated electrons
      if (isPlaying) {
        drawElectrons(ctx, t, topology, startX, endX, wireY, numR);
      }

    } else if (topology === "paralel") {
      const leftX = 100, rightX = W - 100;
      const topY = 60, bottomY = H - 60;
      const spacing = (bottomY - topY) / (numR + 1);

      // Vertical rails
      ctx.strokeStyle = isPlaying ? activeColor : wireColor;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(leftX, topY); ctx.lineTo(leftX, bottomY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rightX, topY); ctx.lineTo(rightX, bottomY); ctx.stroke();
      // Top/bottom connectors
      ctx.beginPath(); ctx.moveTo(leftX, topY); ctx.lineTo(rightX, topY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(leftX, bottomY); ctx.lineTo(rightX, bottomY); ctx.stroke();

      // Battery on left side
      drawBattery(ctx, leftX, cy, voltage, isPlaying ? activeColor : "#64748B");
      // LED on right side
      drawLED(ctx, rightX + 30, cy, results.power, isPlaying);

      // Horizontal resistors
      resistors.forEach((r, i) => {
        const ry = topY + spacing * (i + 1);
        const rmx = (leftX + rightX) / 2;
        ctx.strokeStyle = isPlaying ? activeColor : wireColor;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(leftX, ry); ctx.lineTo(leftX + 60, ry); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rightX - 60, ry); ctx.lineTo(rightX, ry); ctx.stroke();
        drawResistor(ctx, rmx, ry, 50, r.label, r.resistance, results.resistorData[i]?.current ?? 0, isPlaying);
      });
    } else {
      // campuran: simplified display
      ctx.fillStyle = "#4DD0E1";
      ctx.font = "bold 14px Inter, system-ui";
      ctx.textAlign = "center";
      ctx.fillText("Rangkaian Campuran", W / 2, H / 2 - 10);
      ctx.fillStyle = "#94A3B8";
      ctx.font = "12px Inter, system-ui";
      ctx.fillText(`R_total = ${results.rTotal.toFixed(2)} Ω`, W / 2, H / 2 + 15);
    }

    // Measurements overlay
    ctx.fillStyle = "#1E293B";
    roundRect(ctx, 8, 8, 130, 90, 8);
    ctx.fillStyle = "#00838F";
    ctx.font = "bold 11px Inter, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("AMPEREMETER", 16, 24);
    ctx.fillStyle = "#4DD0E1";
    ctx.font = "bold 16px Inter, system-ui";
    ctx.fillText(`${results.current.toFixed(3)} A`, 16, 45);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "11px Inter, system-ui";
    ctx.fillText(`R_total: ${results.rTotal.toFixed(1)} Ω`, 16, 62);
    ctx.fillText(`P: ${results.power.toFixed(2)} W`, 16, 78);

  }, [resistors, results, topology, voltage, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const loop = (ts: number) => {
        timeRef.current = ts;
        draw(ts);
        animRef.current = requestAnimationFrame(loop);
      };
      animRef.current = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animRef.current);
      draw(0);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, draw]);

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={340}
      className="rounded-xl max-w-full"
    />
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
  ctx.fill();
}

function drawBattery(ctx: CanvasRenderingContext2D, x: number, y: number, voltage: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  // Battery symbol
  ctx.beginPath(); ctx.moveTo(x - 15, y - 12); ctx.lineTo(x - 15, y + 12); ctx.stroke();
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(x - 8, y - 8); ctx.lineTo(x - 8, y + 8); ctx.stroke();
  ctx.lineWidth = 2;
  ctx.fillStyle = color;
  ctx.font = "10px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.fillText(`${voltage}V`, x - 12, y + 24);
}

function drawResistor(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, height: number,
  label: string, resistance: number, current: number, active: boolean
) {
  const w = 50, h = 18;
  const rectX = x - w / 2, rectY = y - h / 2;

  ctx.fillStyle = active ? "rgba(37,99,235,0.8)" : "#334155";
  roundRect(ctx, rectX, rectY, w, h, 4);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 9px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y + 3);

  ctx.fillStyle = "#94A3B8";
  ctx.font = "9px Inter, system-ui";
  ctx.fillText(`${resistance}Ω`, x, y + 30);
  if (active && current > 0) {
    ctx.fillStyle = "#4DD0E1";
    ctx.fillText(`${current.toFixed(3)}A`, x, y + 43);
  }
}

function drawLED(ctx: CanvasRenderingContext2D, x: number, y: number, power: number, active: boolean) {
  const intensity = Math.min(1, power / 5);
  const color = active
    ? `rgba(234,179,8,${0.3 + intensity * 0.7})`
    : "rgba(100,116,139,0.5)";

  if (active && intensity > 0.1) {
    // Glow
    const g = ctx.createRadialGradient(x, y, 0, x, y, 30 * intensity);
    g.addColorStop(0, `rgba(234,179,8,${intensity * 0.4})`);
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, 30 * intensity, 0, Math.PI * 2); ctx.fill();
  }

  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#1E293B";
  ctx.font = "8px Inter, system-ui";
  ctx.textAlign = "center";
  ctx.fillText("LED", x, y + 22);
  ctx.fillStyle = "#EAB308";
  ctx.fillText(`${power.toFixed(2)}W`, x, y + 33);
}

function drawElectrons(
  ctx: CanvasRenderingContext2D,
  t: number, topology: string,
  startX: number, endX: number, wireY: number, numR: number
) {
  const speed = 0.0002;
  const numParticles = 8;
  for (let i = 0; i < numParticles; i++) {
    const offset = (i / numParticles + t * speed) % 1;
    let ex: number, ey: number;
    if (topology === "seri") {
      ex = startX + offset * (endX - startX);
      ey = wireY - 40;
    } else {
      ex = startX + 50;
      ey = 60 + offset * (340 - 120);
    }
    ctx.fillStyle = "#4DD0E1";
    ctx.beginPath(); ctx.arc(ex, ey, 3, 0, Math.PI * 2); ctx.fill();
  }
}

// ─── Worksheet Config ─────────────────────────────────────────
const WORKSHEET_COLUMNS = [
  { key: "topology", label: "Topologi", unit: "" },
  { key: "voltage", label: "V", unit: "V" },
  { key: "rTotal", label: "R_total", unit: "Ω" },
  { key: "current", label: "I", unit: "A" },
  { key: "power", label: "P", unit: "W" },
];

const ANALYSIS_QUESTIONS = [
  { id: "q1", question: "Bagaimana perbedaan arus total pada rangkaian seri vs paralel dengan resistor yang sama?" },
  { id: "q2", question: "Bagaimana hubungan antara tegangan (V) dan arus (I)? Apakah sesuai dengan Hukum Ohm?" },
  { id: "q3", question: "Pada rangkaian manakah LED menyala paling terang? Mengapa?" },
];

// ─── Main Page ────────────────────────────────────────────────
export default function HukumOhmPage() {
  const [voltage, setVoltage] = useState(12);
  const [topology, setTopology] = useState<CircuitTopology>("seri");
  const [resistors, setResistors] = useState<Resistor[]>(DEFAULT_RESISTORS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataRows, setDataRows] = useState<any[]>([]);

  const results = useMemo(() => computeOhm({ voltage, resistors, topology }), [voltage, resistors, topology]);
  const viData = useMemo(() => generateVIData(results.rTotal), [results.rTotal]);

  const addResistor = () => {
    if (resistors.length >= 5) return;
    const id = `r${resistors.length + 1}`;
    setResistors([...resistors, { id, label: `R${resistors.length + 1}`, resistance: 15 }]);
  };

  const removeResistor = (id: string) => {
    if (resistors.length <= 1) return;
    setResistors(resistors.filter((r) => r.id !== id));
  };

  const updateResistance = (id: string, val: number) => {
    setResistors(resistors.map((r) => r.id === id ? { ...r, resistance: val } : r));
  };

  const handleRecordData = () => {
    setDataRows((prev) => [...prev, {
      id: Date.now().toString(),
      topology,
      voltage,
      rTotal: results.rTotal.toFixed(2),
      current: results.current.toFixed(3),
      power: results.power.toFixed(2),
    }]);
  };

  const visualArea = (
    <div className="w-full h-full flex items-center justify-center p-3">
      <CircuitDiagram
        topology={topology}
        resistors={resistors}
        results={results}
        voltage={voltage}
        isPlaying={isPlaying}
      />
    </div>
  );

  const controlPanel = (
    <div className="space-y-4">
      {/* Topology selector */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-2">Topologi Rangkaian</p>
        <div className="flex gap-1">
          {(["seri", "paralel", "campuran"] as CircuitTopology[]).map((t) => (
            <button
              key={t}
              onClick={() => setTopology(t)}
              className={cn(
                "flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all",
                topology === t ? "bg-[#2563EB] text-white" : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
              )}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <VariableSlider label="Tegangan" symbol="V" unit=" V" value={voltage} min={1} max={24} step={1} color="#2563EB"
        onChange={setVoltage} description="Sumber tegangan baterai" />

      {/* Resistor list */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8]">Resistor</p>
          <button onClick={addResistor} disabled={resistors.length >= 5}
            className="text-[11px] text-[#00838F] hover:underline disabled:opacity-40 flex items-center gap-1">
            <Plus size={11} /> Tambah
          </button>
        </div>
        <div className="space-y-3">
          {resistors.map((r) => (
            <div key={r.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#1E252B]">{r.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-mono text-[#2563EB]">{r.resistance} Ω</span>
                  <button onClick={() => removeResistor(r.id)}
                    className="text-red-400 hover:text-red-600 transition-colors">
                    <Minus size={11} />
                  </button>
                </div>
              </div>
              <VariableSlider label="" value={r.resistance} min={1} max={100} step={1} color="#2563EB"
                onChange={(v) => updateResistance(r.id, v)} />
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="border-t border-[#F1F5F9] pt-3 space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8]">Hasil</p>
        {[
          { label: "R_total", value: results.rTotal.toFixed(2), unit: "Ω" },
          { label: "I_total", value: results.current.toFixed(3), unit: "A" },
          { label: "P_total", value: results.power.toFixed(2), unit: "W" },
        ].map((r) => (
          <div key={r.label} className="flex justify-between">
            <span className="text-[12px] text-[#64748B]">{r.label}</span>
            <span className="text-[13px] font-semibold font-mono text-[#2563EB]">
              {r.value} <span className="text-[#94A3B8] text-[11px] font-normal">{r.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const dataPanel = (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Grafik V–I (Hukum Ohm)</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={viData} margin={{ top: 5, right: 10, bottom: 15, left: 0 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="v" tick={{ fontSize: 10 }} label={{ value: "V (Volt)", position: "insideBottom", offset: -8, fontSize: 11 }} />
            <YAxis tick={{ fontSize: 10 }} label={{ value: "I (A)", angle: -90, position: "insideLeft", fontSize: 11 }} />
            <Tooltip formatter={(v: any) => Number(v).toFixed(4)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Line type="monotone" dataKey="i" stroke="#2563EB" strokeWidth={2} dot={false} name="I (A)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Daya per Resistor (W)</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={results.resistorData} margin={{ top: 5, right: 10, bottom: 15, left: 0 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: any) => Number(v).toFixed(3) + " W"} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="power" radius={[4, 4, 0, 0]}>
              {results.resistorData.map((_, i) => (
                <Cell key={i} fill={["#2563EB", "#7C3AED", "#00838F", "#EAB308", "#EF4444"][i % 5]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <AppLayout title="Hukum Ohm" userName="Andi Pratama" userRole="siswa">
      <SimulationShell
        title="Hukum Ohm & Rangkaian Listrik"
        subject="fisika"
        visualArea={visualArea}
        controlPanel={controlPanel}
        dataPanel={dataPanel}
        worksheet={<Worksheet simulationTitle="Hukum Ohm" columns={WORKSHEET_COLUMNS} dataRows={dataRows} analysisQuestions={ANALYSIS_QUESTIONS} />}
        isPlaying={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onReset={() => setIsPlaying(false)}
        onRecordData={handleRecordData}
      />
    </AppLayout>
  );
}
