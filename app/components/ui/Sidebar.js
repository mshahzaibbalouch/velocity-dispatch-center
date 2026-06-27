"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarRange,
  MapPinHouse,
  Compass,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Booking",
      href: "/dashboard/booking",
      icon: CalendarRange,
    },
    {
      label: "Drivers",
      href: "/dashboard/driver",
      icon: MapPinHouse,
    },
    {
      label: "Live Tracking",
      href: "/dashboard/tracking",
      icon: Compass,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}

      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-5 z-[10000] flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface-container lg:hidden"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>

      {/* Overlay */}

      {open && (
        <div
          className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed lg:sticky top-0 left-0 z-[99999]
        flex h-screen flex-col
        bg-surface-container
        border-r border-white/5
        transition-all duration-300

        w-72
        lg:w-24
        xl:w-72

        ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0
      `}
      >
        {/* Header */}

        <div className="flex items-center justify-between p-3 xl:justify-start lg:justify-center">
          <img
            src="/assets/images/logo.svg"
            alt="Velocity"
            className="h-15 w-auto"
          />

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-white/5 lg:hidden"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Navigation */}

        <nav className="mt-5 flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-4 px-4 py-3 transition-all duration-300

                ${
                  active
                    ? "bg-gray-500/20 text-amber-400 border-r-4 border-amber-400"
                    : "text-surface-muted hover:bg-surface-container-high hover:text-amber-400"
                }
              `}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    active ? "text-amber-400" : ""
                  }`}
                />

                <span className="hidden xl:block font-medium transition-all group-hover:translate-x-1">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Dispatcher */}

        <div className="hidden xl:block border-t">
          <div className="flex items-center gap-3 rounded-xl p-3">
            <img
              src="/assets/images/team/admin.png"
              className="h-12 w-12 rounded-full object-cover"
              alt=""
            />

            <div>
              <h3 className="text-sm font-semibold text-white">
                Shahzaib Balouch
              </h3>

              <p className="text-xs text-emerald-400">
                Senior Dispatcher
              </p>
            </div>
          </div>
        </div>

        
      </aside>
    </>
  );
}