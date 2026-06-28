import Icon from "./Icon";

export default function SummaryCard({
    title,
    value,
    icon,
    color = "amber",
}) {

    const colors = {
        amber: "bg-amber-500/10 text-amber-400",
        emerald: "bg-emerald-500/10 text-emerald-400",
        blue: "bg-blue-500/10 text-blue-400",
        red: "bg-red-500/10 text-red-400",
    };

    return (
        <div className="bg-surface-container mb-4 rounded-2xl border border-white/5 p-6">
            <div className="flex items-center gap-4">

                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${colors[color]}`}>
                    <Icon icon={icon} className="h-5 w-5"/>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold text-white">
                        {value}
                    </h2>
                </div>

            </div>
        </div>
    );
}