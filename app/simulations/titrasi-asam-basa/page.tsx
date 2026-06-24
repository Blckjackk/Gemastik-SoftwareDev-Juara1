"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { SimulationShell } from "@/components/simulation/simulation-shell";
import { VariableSlider } from "@/components/simulation/variable-slider";
import { Worksheet } from "@/components/simulation/worksheet";
import {
  computeTitrationPH, generateTitrationCurve, getIndicatorColor,
  SUBSTANCES, type TitrationSubstance,
} from "@/lib/simulations/chemistry/titration";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceDot,
} from "recharts";
import { Droplet, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type IndicatorType = "fenolftalein" | "metil_jingga" | "universal";

const acids = SUBSTANCES.filter((s) => s.type === "acid");
const bases = SUBSTANCES.filter((s) => s.type === "base");

// Equivalence point volume calculation
function calcEPVolume(analyte: TitrationSubstance, titrant: TitrationSubstance, analyteVol: number) {
  return (analyte.concentration * analyteVol) / titrant.concentration;
}

// ─── Apparatus SVG ─────────────────────────────────────────────
function TitrationApparatus({
  solutionColor,
  titrantVolume,
  maxVolume,
  isAtEP,
}: {
  solutionColor: string;
  titrantVolume: number;
  maxVolume: number;
  isAtEP: boolean;
}) {
  const buretFill = 1 - titrantVolume / maxVolume;
  return (
    <svg viewBox="0 0 300 420" className="w-full max-h-[400px]" style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.08))" }}>
      {/* Buret (tube at top) */}
      <rect x="130" y="20" width="40" height="180" rx="4" fill="rgba(200,230,255,0.3)" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Titrant level */}
      <clipPath id="buretClip">
        <rect x="130" y="20" width="40" height="180" rx="4" />
      </clipPath>
      <rect x="130" y={20 + 180 * (1 - buretFill)} width="40" height={180 * buretFill} clipPath="url(#buretClip)"
        fill="rgba(124,58,237,0.35)" />
      {/* Buret label */}
      <text x="150" y="15" textAnchor="middle" fontSize="10" fill="#94A3B8">Buret</text>
      {/* Graduation lines */}
      {[0.25, 0.5, 0.75].map((f, i) => (
        <g key={i}>
          <line x1="168" y1={20 + f * 180} x2="178" y2={20 + f * 180} stroke="#94A3B8" strokeWidth="1" />
          <text x="182" y={24 + f * 180} fontSize="9" fill="#94A3B8">{(f * maxVolume).toFixed(0)}</text>
        </g>
      ))}
      {/* Stop cock */}
      <rect x="144" y="198" width="12" height="8" rx="2" fill="#64748B" />
      {/* Drip line */}
      <line x1="150" y1="206" x2="150" y2="240" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth="1" />
      {/* Drop */}
      {titrantVolume > 0 && (
        <ellipse cx="150" cy="242" rx="4" ry="5" fill="rgba(124,58,237,0.6)" />
      )}

      {/* Erlenmeyer flask */}
      <path
        d="M110,260 L80,380 L220,380 L190,260 Z"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Flask neck */}
      <rect x="128" y="232" width="44" height="30" rx="3" fill="none" stroke="#94A3B8" strokeWidth="2" />

      {/* Solution in flask */}
      <clipPath id="flaskClip">
        <path d="M110,260 L80,380 L220,380 L190,260 Z" />
      </clipPath>
      <rect x="80" y="310" width="140" height="72" clipPath="url(#flaskClip)"
        fill={solutionColor}
        style={{ transition: "fill 0.8s ease" }}
      />

      {/* EP indicator */}
      {isAtEP && (
        <g>
          <circle cx="150" cy="345" r="20" fill="none" stroke="#22C55E" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="r" values="20;28;20" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <text x="150" y="349" textAnchor="middle" fontSize="9" fill="#22C55E" fontWeight="bold">EP!</text>
        </g>
      )}

      {/* pH display */}
      <rect x="220" y="280" width="68" height="45" rx="8" fill="#1E293B" />
      <text x="254" y="296" textAnchor="middle" fontSize="10" fill="#94A3B8">pH</text>
      <text x="254" y="318" textAnchor="middle" fontSize="20" fill="#4DD0E1" fontWeight="bold">
        {/* pH rendered dynamically via foreignObject trick — skipped, use label outside SVG */}
      </text>
    </svg>
  );
}

// ─── Worksheet config ─────────────────────────────────────────
const WORKSHEET_COLUMNS = [
  { key: "titrantVol", label: "Vol. Titran", unit: "mL" },
  { key: "pH", label: "pH", unit: "" },
  { key: "note", label: "Catatan", unit: "" },
];
const ANALYSIS_QUESTIONS = [
  { id: "q1", question: "Pada volume berapa titran titik ekuivalen tercapai? Bagaimana cara menentukannya dari grafik?" },
  { id: "q2", question: "Jelaskan perbedaan bentuk kurva titrasi antara asam kuat-basa kuat dan asam lemah-basa kuat!" },
  { id: "q3", question: "Mengapa indikator yang berbeda memberikan perubahan warna pada pH yang berbeda?" },
];

// ─── Main Page ────────────────────────────────────────────────
export default function TitrasiPage() {
  const [selectedAcidId, setSelectedAcidId] = useState("hcl");
  const [selectedBaseId, setSelectedBaseId] = useState("naoh");
  const [analyteVol, setAnalyteVol] = useState(25);
  const [titrantVol, setTitrantVol] = useState(0);
  const [indicator, setIndicator] = useState<IndicatorType>("fenolftalein");
  const [isPlaying, setIsPlaying] = useState(false);
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [showEPNotif, setShowEPNotif] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const analyte = SUBSTANCES.find((s) => s.id === selectedAcidId)!;
  const titrant = SUBSTANCES.find((s) => s.id === selectedBaseId)!;
  const epVolume = calcEPVolume(analyte, titrant, analyteVol);

  const titrationResult = useMemo(
    () => computeTitrationPH({ analyte, titrant, analyteVolume: analyteVol, titrantVolume: titrantVol }),
    [analyte, titrant, analyteVol, titrantVol]
  );

  const pH = titrationResult.pH;
  const solutionColor = getIndicatorColor(pH, indicator);
  const isAtEP = Math.abs(titrantVol - epVolume) < 0.6;

  const curveData = useMemo(
    () => generateTitrationCurve({ analyte, titrant, analyteVolume: analyteVol }, epVolume * 2),
    [analyte, titrant, analyteVol, epVolume]
  );

  // Auto-titration
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTitrantVol((prev) => {
          const next = prev + 0.5;
          if (next >= epVolume * 2) {
            setIsPlaying(false);
            return prev;
          }
          return next;
        });
      }, 150);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isPlaying, epVolume]);

  // EP notification
  useEffect(() => {
    if (isAtEP && titrantVol > 0) {
      setShowEPNotif(true);
      const t = setTimeout(() => setShowEPNotif(false), 3000);
      return () => clearTimeout(t);
    }
  }, [isAtEP, titrantVol]);

  const handleReset = () => {
    setIsPlaying(false);
    setTitrantVol(0);
    setShowEPNotif(false);
  };

  const handleRecordData = () => {
    setDataRows((prev) => [...prev, {
      id: Date.now().toString(),
      titrantVol: titrantVol.toFixed(1),
      pH: pH.toFixed(2),
      note: isAtEP ? "Titik Ekuivalen!" : "",
    }]);
  };

  const visualArea = (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div className="relative flex flex-col items-center">
        <TitrationApparatus
          solutionColor={solutionColor}
          titrantVolume={titrantVol}
          maxVolume={epVolume * 2}
          isAtEP={isAtEP}
        />

        {/* pH display below SVG */}
        <div className="mt-2 flex items-center gap-4">
          <div className="bg-[#1E293B] rounded-xl px-5 py-3 text-center">
            <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest">pH</p>
            <p className="text-3xl font-bold text-[#4DD0E1] font-mono">{pH.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-[#94A3B8]">Titran ditambah</p>
            <p className="text-xl font-semibold text-[#1E252B] font-mono">{titrantVol.toFixed(1)} mL</p>
            <p className="text-[11px] text-[#94A3B8]">EP ≈ {epVolume.toFixed(1)} mL</p>
          </div>
        </div>
      </div>

      {/* EP notification */}
      {showEPNotif && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-2 shadow-lg animate-fade-up">
          ✅ Titik Ekuivalen Tercapai! pH = {pH.toFixed(2)}
        </div>
      )}
    </div>
  );

  const controlPanel = (
    <div className="space-y-4">
      {/* Analyte selector */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-2">Analit (dalam Erlenmeyer)</p>
        <select
          value={selectedAcidId}
          onChange={(e) => { handleReset(); setSelectedAcidId(e.target.value); }}
          className="w-full text-[13px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
        >
          {acids.map((a) => (
            <option key={a.id} value={a.id}>{a.formula} — {a.name} ({a.concentration} M)</option>
          ))}
        </select>
      </div>

      {/* Titrant selector */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-2">Titran (dalam Buret)</p>
        <select
          value={selectedBaseId}
          onChange={(e) => { handleReset(); setSelectedBaseId(e.target.value); }}
          className="w-full text-[13px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
        >
          {bases.map((b) => (
            <option key={b.id} value={b.id}>{b.formula} — {b.name} ({b.concentration} M)</option>
          ))}
        </select>
      </div>

      <VariableSlider
        label="Volume Analit" symbol="V_a" unit=" mL"
        value={analyteVol} min={10} max={50} step={5} color="#7C3AED"
        onChange={(v) => { handleReset(); setAnalyteVol(v); }}
      />

      {/* Manual drop control */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-[13px] font-medium text-[#1E252B]">Kontrol Manual (per tetes)</p>
          <span className="text-[11px] text-[#94A3B8]">{titrantVol.toFixed(1)} mL</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTitrantVol((p) => Math.max(0, +(p - 0.5).toFixed(1)))}
            className="flex-1 py-2 rounded-xl bg-[#F1F5F9] text-[#64748B] text-sm hover:bg-[#E2E8F0] transition-colors"
          >
            − 0.5 mL
          </button>
          <button
            onClick={() => setTitrantVol((p) => Math.min(epVolume * 2, +(p + 0.5).toFixed(1)))}
            className="flex-1 py-2 rounded-xl text-white text-sm transition-colors"
            style={{ background: "#7C3AED" }}
          >
            + 0.5 mL
          </button>
        </div>
      </div>

      {/* Indicator selector */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-2">Indikator</p>
        <div className="space-y-1">
          {(["fenolftalein", "metil_jingga", "universal"] as IndicatorType[]).map((ind) => (
            <label key={ind} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={ind}
                checked={indicator === ind}
                onChange={() => setIndicator(ind)}
                className="accent-[#7C3AED]"
              />
              <span className="text-[12px] text-[#64748B]">
                {ind === "fenolftalein" ? "Fenolftalein (pH 8.2–10)" :
                  ind === "metil_jingga" ? "Metil Jingga (pH 3.1–4.4)" :
                    "Universal"}
              </span>
              <span
                className="w-5 h-5 rounded-full border border-[#E2E8F0] shrink-0"
                style={{ background: getIndicatorColor(pH, ind) }}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const epIndex = curveData.findIndex((p) => Math.abs(p.volume - epVolume) < 0.6);

  const dataPanel = (
    <div>
      <p className="text-[11px] font-semibold text-[#94A3B8] mb-2">Kurva Titrasi (pH vs Volume Titran)</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={curveData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
          <XAxis dataKey="volume" tick={{ fontSize: 10 }}
            label={{ value: "Volume Titran (mL)", position: "insideBottom", offset: -12, fontSize: 11 }} />
          <YAxis domain={[0, 14]} tick={{ fontSize: 10 }}
            label={{ value: "pH", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <Tooltip formatter={(v: any) => Number(v).toFixed(2)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
          <ReferenceLine y={7} stroke="#94A3B8" strokeDasharray="4 4" label={{ value: "pH 7", fontSize: 9, fill: "#94A3B8" }} />
          {epVolume > 0 && (
            <ReferenceLine x={epVolume} stroke="#22C55E" strokeDasharray="4 4"
              label={{ value: "EP", position: "top", fontSize: 9, fill: "#22C55E" }} />
          )}
          <ReferenceDot x={titrantVol} y={pH} r={5} fill="#7C3AED" />
          <Line type="monotone" dataKey="pH" stroke="#7C3AED" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <AppLayout title="Titrasi Asam-Basa" userName="Andi Pratama" userRole="siswa">
      <SimulationShell
        title="Titrasi Asam-Basa"
        subject="kimia"
        visualArea={visualArea}
        controlPanel={controlPanel}
        dataPanel={dataPanel}
        worksheet={<Worksheet simulationTitle="Titrasi Asam-Basa" columns={WORKSHEET_COLUMNS} dataRows={dataRows} analysisQuestions={ANALYSIS_QUESTIONS} />}
        isPlaying={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onReset={handleReset}
        onRecordData={handleRecordData}
      />
    </AppLayout>
  );
}
