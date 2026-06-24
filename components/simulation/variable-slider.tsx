"use client";

import { useState, useRef, useCallback } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface VariableSliderProps {
  label: string;
  symbol?: string;
  unit?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  color?: string;
  description?: string;
  disabled?: boolean;
}

export function VariableSlider({
  label,
  symbol,
  unit,
  value,
  min,
  max,
  step = 1,
  onChange,
  color = "#00838F",
  description,
  disabled = false,
}: VariableSliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  const decrement = () => onChange(Math.max(min, Math.round((value - step) * 1000) / 1000));
  const increment = () => onChange(Math.min(max, Math.round((value + step) * 1000) / 1000));

  return (
    <div className={cn("space-y-2", disabled && "opacity-50 pointer-events-none")}>
      {/* Label row */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[13px] font-medium text-[#1E252B]">{label}</span>
          {symbol && (
            <span className="ml-1 text-[12px] text-[#64748B] font-mono italic">({symbol})</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={decrement}
            className="w-6 h-6 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center text-[#64748B] transition-colors active:scale-90"
          >
            <Minus size={10} />
          </button>
          <div className="min-w-[56px] text-center">
            <span className="text-[13px] font-semibold text-[#1E252B]">{value}</span>
            {unit && <span className="text-[11px] text-[#94A3B8] ml-0.5">{unit}</span>}
          </div>
          <button
            onClick={increment}
            className="w-6 h-6 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center text-[#64748B] transition-colors active:scale-90"
          >
            <Plus size={10} />
          </button>
        </div>
      </div>

      {/* Slider track */}
      <div className="relative h-5 flex items-center">
        <div className="relative w-full h-1.5 rounded-full bg-[#E2E8F0]">
          {/* Fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-75"
            style={{ width: `${percent}%`, background: color }}
          />
          {/* Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
            style={{ zIndex: 2 }}
          />
          {/* Visual thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 transition-all duration-75 pointer-events-none"
            style={{ left: `calc(${percent}% - 8px)`, borderColor: color }}
          />
        </div>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-[10px] text-[#94A3B8]">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>

      {description && (
        <p className="text-[11px] text-[#94A3B8] leading-relaxed">{description}</p>
      )}
    </div>
  );
}
