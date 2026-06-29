"use client";

import {
  Truck,
  Users,
  Clock3,
  Route,
} from "lucide-react";

const stats = [
  {
    title: "Active Trips",
    value: "128",
    icon: Route,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    title: "Online Drivers",
    value: "86",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Avg ETA",
    value: "6 min",
    icon: Clock3,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Available Vehicles",
    value: "42",
    icon: Truck,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

export default function BottomStatusBar() {
  return (
    <div className="absolute bottom-6 left-6 right-[380px]">
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-700/50 bg-[#171D26]/90 p-5 backdrop-blur-md shadow-2xl md:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border border-slate-700/40 bg-slate-900/50 p-4 transition hover:border-amber-400/30"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon
                  className={`${item.color}`}
                  size={22}
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  {item.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}