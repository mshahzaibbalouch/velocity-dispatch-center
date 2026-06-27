"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function LiveOperationsMap() {
  return (
    <div className="bg-[#1B1F26] rounded-2xl border border-white/5 overflow-hidden h-full">
      <Map />
    </div>
  );
}
