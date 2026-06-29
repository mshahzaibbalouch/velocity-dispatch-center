"use client";

import DriverMarker from "./DriverMarker";
import RouteLines from "./RouteLines";
import ActiveTripsPanel from "./ActiveTripsPanel";
import BottomStatusBar from "./BottomStatusBar";
import MapControls from "./MapControls";

const drivers = [
  {
    id: 1,
    x: 62,
    y: 42,
    color: "amber",
    label: "TRP-204",
    selected: true,
  },
  {
    id: 2,
    x: 34,
    y: 58,
    color: "emerald",
    label: "TRP-187",
  },
  {
    id: 3,
    x: 76,
    y: 26,
    color: "blue",
    label: "TRP-321",
  },
  {
    id: 4,
    x: 22,
    y: 34,
    color: "red",
    label: "TRP-118",
  },
];

export default function LiveTrackingMap() {
  return (
    <div className="relative h-[calc(100vh-100px)] w-full overflow-hidden rounded-3xl border border-slate-700/50 bg-[#0F172A]">
      <div className="absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Fake Roads */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1400 900"
          preserveAspectRatio="none"
        >
          <path
            d="M0 180 C250 260 500 220 800 350 S1200 480 1400 320"
            stroke="#263242"
            strokeWidth="14"
            fill="none"
            opacity=".6"
          />

          <path
            d="M120 820 C380 620 780 680 1280 540"
            stroke="#263242"
            strokeWidth="14"
            fill="none"
            opacity=".6"
          />

          <path
            d="M250 0 C420 180 460 450 380 900"
            stroke="#263242"
            strokeWidth="12"
            fill="none"
            opacity=".5"
          />

          <path
            d="M920 0 C860 240 940 500 1150 900"
            stroke="#263242"
            strokeWidth="12"
            fill="none"
            opacity=".5"
          />
        </svg>
      </div>

      <RouteLines />

      {drivers.map((driver) => (
        <DriverMarker
          key={driver.id}
          x={driver.x}
          y={driver.y}
          color={driver.color}
          label={driver.label}
          selected={driver.selected}
        />
      ))}

      <MapControls
        onZoomIn={() => console.log("Zoom In")}
        onZoomOut={() => console.log("Zoom Out")}
        onLocate={() => console.log("Locate")}
        onLayers={() => console.log("Layers")}
      />

      <ActiveTripsPanel />

      <BottomStatusBar />
    </div>
  );
}
