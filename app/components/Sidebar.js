import {
  LayoutDashboard,
  CalendarRange,
  MapPinHouse,
  Compass,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", Icon: LayoutDashboard, active: true },
    { label: "Booking", Icon: CalendarRange, active: false },
    { label: "Drivers", Icon: MapPinHouse, active: false },
    { label: "Live Tracking", Icon: Compass, active: false },
    { label: "Settings", Icon: Settings, active: false },
  ];

  return (
    <aside className="hidden sticky top-0 z-10   w-full max-w-xs shrink-0  border border-white/5 bg-surface-container h-screen p-0 lg:block">
      <div className="space-y-4">
        <div>
          <img
            src="/assets/images/logo.svg"
            alt="Velocity Dispatch Logo"
            className="h-20 w-auto"
          />
        </div>

        <nav className="space-y-0 ">
          {navItems.map((item) => {
            const IconComponent = item.Icon;

            return (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 ps-3 py-3 text-sm transition  hover:text-amber-400 ${item.active ? "bg-surface-container-high text-amber-400 border-amber-400 border-0 border-r-4" : "text-surface-muted"}`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="hover:text-amber-400 w-full hover:ps-2 transition-all">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
      <div className="p-4">
        <p className="text-xs text-surface-muted">
          &copy; 2023 Velocity Dispatch. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
