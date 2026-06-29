"use client";

import {
  Plus,
  Minus,
  LocateFixed,
  Layers3,
} from "lucide-react";

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onLocate,
  onLayers,
}) {
  const Button = ({ icon: Icon, onClick, label }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/50 bg-[#171D26]/90 text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:bg-slate-800 hover:text-white"
    >
      <Icon size={20} />
    </button>
  );

  return (
    <div className="absolute left-6 top-6 flex flex-col gap-3">
      <Button
        icon={Plus}
        onClick={onZoomIn}
        label="Zoom In"
      />

      <Button
        icon={Minus}
        onClick={onZoomOut}
        label="Zoom Out"
      />

      <Button
        icon={LocateFixed}
        onClick={onLocate}
        label="Current Location"
      />

      <Button
        icon={Layers3}
        onClick={onLayers}
        label="Map Layers"
      />
    </div>
  );
}