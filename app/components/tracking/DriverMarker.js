"use client";

import { Truck } from "lucide-react";

export default function DriverMarker({
  x,
  y,
  color = "emerald",
  label,
  selected = false,
}) {
  const colors = {
    emerald: {
      bg: "bg-emerald-500",
      ring: "ring-emerald-400/40",
      glow: "shadow-emerald-500/60",
    },
    amber: {
      bg: "bg-amber-400",
      ring: "ring-amber-300/40",
      glow: "shadow-amber-400/60",
    },
    blue: {
      bg: "bg-blue-500",
      ring: "ring-blue-400/40",
      glow: "shadow-blue-500/60",
    },
    red: {
      bg: "bg-red-500",
      ring: "ring-red-400/40",
      glow: "shadow-red-500/60",
    },
  };

  const style = colors[color] || colors.emerald;

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Pulse */}
      <span
        className={`absolute inset-0 h-12 w-12 rounded-full ${style.bg} opacity-30 animate-ping`}
      />

      {/* Ring */}
      <div
        className={`relative flex h-12 w-12 items-center justify-center rounded-full ring-4 ${style.ring}`}
      >
        {/* Marker */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${style.bg} shadow-lg ${style.glow}`}
        >
          <Truck size={18} className="text-white" />
        </div>

        {selected && (
          <div className="absolute -inset-2 rounded-full border-2 border-white/70 animate-pulse" />
        )}
      </div>

      {label && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-1 text-xs text-white shadow-lg">
          {label}
        </div>
      )}
    </div>
  );
}