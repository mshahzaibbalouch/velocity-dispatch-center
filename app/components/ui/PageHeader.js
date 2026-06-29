import { Download, Plus } from "lucide-react";

export default function PageHeader({
  title,
  description,
  onExport,
  onCreate,
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          {title}
        </h1>

        <p className="text-gray-400 mt-1">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-surface-container border border-white/5 hover:bg-[#232832] text-sm"
        >
          <Download size={16} />
          Export CSV
        </button>

        <button
          onClick={onCreate}
          style={{ backgroundColor: "#FBBF24", color: "#0F172A" }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xs font-semibold hover:bg-amber-300 text-sm"
        >
          <Plus size={16} />
          New Booking
        </button>
      </div>
    </div>
  );
}