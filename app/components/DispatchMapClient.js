"use client";

import dynamic from "next/dynamic";

const DispatchMapClient = dynamic(() => import("./DispatchMapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] rounded-xl bg-zinc-900 animate-pulse" />
  ),
});

export default function DispatchMap() {
  return <DispatchMapClient />;
}
