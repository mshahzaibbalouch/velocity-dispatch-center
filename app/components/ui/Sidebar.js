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
  { label: "Dashboard",     href: "/dashboard",               icon: LayoutDashboard },
  { label: "Booking",       href: "/dashboard/booking",       icon: CalendarRange   },
  { label: "Drivers",       href: "/dashboard/driver",        icon: MapPinHouse     },
  { label: "Live Tracking", href: "/dashboard/tracking",      icon: Compass         },
  { label: "Settings",      href: "/dashboard/settings",      icon: Settings        },
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
        <div className="flex h-18 items-center justify-between px-5 border-b border-white/5">
          <Image
            src="/assets/images/logo.svg"
            alt="Velocity"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
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
                className={`
                  group relative flex items-center gap-3.5 px-5 py-3
                  text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-amber-400/10 text-amber-400 before:absolute before:left-0 before:top-0 before:h-full before:w-0.8 before:rounded-r before:bg-amber-400"
                      : "text-surface-muted hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                    active ? "text-amber-400" : "text-white/40 group-hover:text-white"
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
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
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
