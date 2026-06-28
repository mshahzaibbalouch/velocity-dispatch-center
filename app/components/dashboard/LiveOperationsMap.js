"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function LiveOperationsMap() {
  return (
    <div className="bg-surface-container rounded-2xl border border-white/5 overflow-hidden h-80 z-10">
      <Map />
    </div>
  );
}
