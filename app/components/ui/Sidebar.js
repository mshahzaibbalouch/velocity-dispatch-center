"use client";

import Link from "next/link";
import Image from "next/image";
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

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Booking", href: "/dashboard/booking", icon: CalendarRange },
  { label: "Drivers", href: "/dashboard/driver", icon: MapPinHouse },
  { label: "Live Tracking", href: "/dashboard/tracking", icon: Compass },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger — visible only below lg */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed left-4 top-4 z-999 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface-container lg:hidden"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>

      {/* Overlay — mobile/md only */}
      {open && (
        <div
          className="fixed inset-0 z-999 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0
          z-999 flex h-screen w-70 flex-col
          bg-surface-container border-r border-white/5
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo + close */}
        <div className="flex h-18  items-center justify-between px-5 border-b border-white/5">
          <img
            src="/assets/images/logo.svg"
            alt="Velocity"
            className="h-17 w-auto"
          />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 lg:hidden"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-4 px-4 py-3 transition-all duration-300

                ${
                  active
                    ? "bg-gray-500/20 border-r-solid text-amber-400 border-r-4 border-amber-400"
                    : "text-surface-muted hover:bg-surface-container-high hover:text-amber-400"
                }
              `}
              >
                <Icon
                  className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                    active
                      ? "text-amber-400"
                      : "text-white/40 group-hover:text-white"
                  }`}
                />

                <span className="font-medium transition-all group-hover:translate-x-1">
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="border-t border-white/5 p-4">
          <div className="flex items-center gap-3 rounded-xl">
            <Image
              src="/assets/images/team/admin.png"
              alt="Admin"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-amber-400/30"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Shahzaib Balouch
              </p>
              <p className="truncate text-xs text-emerald-400">
                Chief Executive Officer
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
