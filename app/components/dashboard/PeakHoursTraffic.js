const bars = [40, 65, 110, 95, 55, 30, 80];

export default function PeakHoursTraffic() {
  return (
    <div className="bg-[#1B1F26] rounded-2xl border border-white/5 p-6 h-full">
      <h2 className="text-xl font-semibold text-amber-400">
        Peak Hours Traffic
      </h2>

      <div className="flex items-end justify-between h-48 mt-8">
        {bars.map((height, index) => (
          <div
            key={index}
            style={{ height }}
            className={`w-8 rounded-t-md ${
              index === 2
                ? "bg-amber-400"
                : "bg-amber-400/60"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-6">
        Demand is spiking in Midtown. Consider dynamic pricing adjustments.
      </p>
    </div>
  );
}