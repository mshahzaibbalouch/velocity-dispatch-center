const bars = [
  { value: 40,  label: "Mon" },
  { value: 65,  label: "Tue" },
  { value: 110, label: "Wed" },
  { value: 95,  label: "Thu" },
  { value: 55,  label: "Fri" },
  { value: 30,  label: "Sat" },
  { value: 80,  label: "Sun" },
];

const max = Math.max(...bars.map((b) => b.value));

export default function PeakHoursTraffic() {
  return (
    <div className="bg-surface-container rounded-2xl border border-white/5 p-6 flex flex-col h-80 overflow-hidden">
      {/* Header */}
      <div className="mb-4 shrink-0">
        <h2 className="text-base font-semibold text-white">Peak Hours Traffic</h2>
        <p className="text-xs text-surface-muted mt-0.5">Weekly ride demand overview</p>
      </div>

      {/* Bars */}
      <div className="flex-1 flex items-end gap-2 overflow-hidden">
        {bars.map((bar, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
            <span className="text-xs text-surface-muted shrink-0">{bar.value}</span>
            <div
              className={`w-full rounded-t-md transition-all duration-500 ${
                i === 2 ? "bg-amber-400" : "bg-amber-400/50 hover:bg-amber-400/75"
              }`}
              style={{ height: `${(bar.value / max) * 100}%` }}
            />
            <span className="text-xs text-surface-muted shrink-0">{bar.label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-xs text-surface-muted mt-3 shrink-0">
        Demand peaks on Wednesday — consider dynamic pricing.
      </p>
    </div>
  );
}
