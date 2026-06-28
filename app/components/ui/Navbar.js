"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Search, CircleQuestionMark } from "lucide-react";
import Icon from "./Icon";

export default function Navbar() {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[9999] mb-6 flex flex-col gap-4 border border-white/5 bg-surface-container-high px-6 py-4 shadow-[0_20px_120px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        <div className="w-full flex flex-row ps-10 lg:ps-0 gap-4 items-center justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
            <input
              type="search"
              placeholder="Search dispatches, vehicles, drivers..."
              className="rounded-4xl  border border-white/10 bg-surface ps-10 px-3 py-3 text-sm text-on-surface outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15 w-[50%]"
            />
          </div>
          <div className="flex items-center justify-end gap-1">
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationOpen(!isNotificationOpen)}
                className="inline-flex h-12 p-0 w-12 items-center justify-center rounded-3xl border border-white/10 text-on-surface transition"
                aria-label="Toggle notifications"
              >
                <Bell className="h-5 w-5" />
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-3 w-96 rounded-4xl border border-white/10 bg-surface-container-high p-4 shadow-2xl">
                  <div className="mb-3 border-b border-white/10 pb-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-surface-muted">
                      Notifications
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-on-surface">
                      Recent updates
                    </h3>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    <div className="rounded-3xl p-4 transition hover:bg-surface-container cursor-pointer">
                      <p className="text-sm font-medium text-on-surface">
                        New driver assignment
                      </p>
                      <p className="mt-1 text-xs text-surface-muted">
                        Driver Anya has been assigned to ride #328.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/support"
              className="inline-flex items-center gap-2 rounded-3xl text-on-surface transition hover:bg-surface-container-high"
            >
              <CircleQuestionMark className="h-5 w-5 text-secondary" />
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="inline-flex items-center gap-2 rounded-3xl border-l-2 border-white px-4 py-3 text-sm text-on-surface transition"
              >
                <div className="text-left hidden lg:block ">
                  <p className="font-sm">Shahzaib</p>
                </div>
                <img
                  src="/assets/images/team/admin.png"
                  alt="Admin profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute z-[999] right-0 top-full mt-3 w-70 rounded-2xl border border-white/10 bg-surface-container-high p-2 shadow-2xl">
                  <div className="border-b border-white/10 pb-3">
                    <div className="flex items-center gap-4 rounded-3xl p-1">
                      <img
                        src="/assets/images/team/admin.png"
                        alt="Admin"
                        className="h-8 w-8 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-on-surface">
                          Shahzaib Balouch
                        </p>
                        <p className="text-xs text-emerald-500">@admin</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        label: "View profile",
                        description: "See account details",
                        icon: "User",
                      },
                      {
                        label: "Settings",
                        icon: "Settings",
                        description: "Update preferences",
                      },
                      {
                        label: "Sign out",
                        description: "Logout from dashboard",
                        icon: "LogOutIcon",
                        action: async () => {
                          try {
                            const res = await fetch("/api/auth/logout", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                            });

                            if (res.ok) {
                              window.location.href = "/auth/login";
                            }
                          } catch (error) {
                            console.error("Logout failed", error);
                          }
                        },
                      },
                    ].map((item, index) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={item.action}
                        className="w-full text-left last:border-b-0 transition hover:bg-surface-container cursor-pointer"
                      >
                        <div
                          className={`flex items-center ${index < 2 ? "border-b border-white/5" : ""} gap-3 py-2 hover:text-amber-400 transition-all font-medium hover:ps-2`}
                        >
                          <Icon
                            icon={item.icon}
                            className={"h-5 w-5 text-amber-400"}
                          />
                          <p className="text-sm">{item.label}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {(isNotificationOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setNotificationOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </>
  );
}
