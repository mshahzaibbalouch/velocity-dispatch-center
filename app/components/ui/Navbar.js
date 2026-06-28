"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Bell,
  Search,
  CircleQuestionMark,
  User,
  Settings,
  LogOutIcon,
} from "lucide-react";
import Icon from "./Icon";

export default function Navbar() {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const profileItems = [
    { label: "View profile", icon: User,      href: "/dashboard/profile"  },
    { label: "Settings",     icon: Settings,  href: "/dashboard/settings" },
    {
      label: "Sign out",
      icon: LogOutIcon,
      action: async () => {
        try {
          const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          if (res.ok) window.location.href = "/auth/login";
        } catch (err) {
          console.error("Logout failed", err);
        }
      },
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/5 bg-surface-container-high px-4 lg:px-6 shadow-2xl backdrop-blur-xl">

        {/* Row 1 — always visible */}
        <div className="flex h-16 items-center justify-between gap-3">

          {/* Spacer for hamburger on mobile */}
          <div className="w-10 shrink-0 lg:hidden" />

          {/* Search — lg+ only, inline */}
          <div className="relative hidden lg:flex flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search dispatches, vehicles, drivers..."
              className="w-full rounded-full border border-white/10 bg-surface py-2.5 pl-10 pr-4 text-sm text-on-surface outline-none transition focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/15"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">

            {/* Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setNotificationOpen(!isNotificationOpen); setProfileOpen(false); }}
                aria-label="Notifications"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-on-surface hover:bg-white/5 transition"
              >
                <Bell className="h-4.5 w-4.5" />
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-white/10 bg-surface-container-high p-4 shadow-2xl z-50">
                  <div className="mb-3 border-b border-white/10 pb-3">
                    <p className="text-xs uppercase tracking-widest text-surface-muted">
                      Notifications
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-on-surface">
                      Recent updates
                    </h3>
                  </div>
                  <div className="space-y-1 max-h-80 overflow-y-auto">
                    <div className="rounded-xl p-3 hover:bg-surface-container cursor-pointer transition">
                      <p className="text-sm font-medium text-on-surface">
                        New driver assignment
                      </p>
                      <p className="mt-0.5 text-xs text-surface-muted">
                        Driver Anya has been assigned to ride #328.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Help */}
            <Link
              href="/support"
              className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/5 transition"
              aria-label="Help"
            >
              <CircleQuestionMark className="h-4.5 w-4.5 text-secondary" />
            </Link>

            {/* Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setProfileOpen(!isProfileOpen); setNotificationOpen(false); }}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 px-2.5 py-1.5 text-sm text-on-surface hover:bg-white/5 transition"
              >
                <span className="hidden sm:block font-medium">Shahzaib</span>
                <Image
                  src="/assets/images/team/admin.png"
                  alt="Admin"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-white/10 bg-surface-container-high p-2 shadow-2xl z-50">
                  <div className="flex items-center gap-3 p-2 mb-1 border-b border-white/5 pb-3">
                    <Image
                      src="/assets/images/team/admin.png"
                      alt="Admin"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-on-surface">Shahzaib Balouch</p>
                      <p className="text-xs text-emerald-500">@admin</p>
                    </div>
                  </div>
                  <div>
                    {profileItems.map((item, index) =>
                      item.href ? (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setProfileOpen(false)}
                          className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium text-on-surface hover:bg-white/5 hover:text-amber-400 transition-all ${
                            index < profileItems.length - 1 ? "border-b border-white/5" : ""
                          }`}
                        >
                          <Icon icon={item.icon} className="h-4 w-4 text-amber-400 shrink-0" />
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          key={item.label}
                          type="button"
                          onClick={item.action}
                          className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium text-on-surface hover:bg-white/5 hover:text-amber-400 transition-all ${
                            index < profileItems.length - 1 ? "border-b border-white/5" : ""
                          }`}
                        >
                          <Icon icon={item.icon} className="h-4 w-4 text-amber-400 shrink-0" />
                          {item.label}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2 — search on mobile/md only */}
        <div className="pb-3 lg:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search dispatches, vehicles, drivers..."
              className="w-full rounded-full border border-white/10 bg-surface py-2.5 pl-10 pr-4 text-sm text-on-surface outline-none transition focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/15"
            />
          </div>
        </div>

      </header>

      {/* Backdrop — closes dropdowns */}
      {(isNotificationOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => { setNotificationOpen(false); setProfileOpen(false); }}
        />
      )}
    </>
  );
}
