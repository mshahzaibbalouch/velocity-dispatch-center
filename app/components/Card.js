import React from "react";
import Icon from "./Icon";

const Card = ({ title, value, icon, badge }) => {
  return (
    <div className="relative mb-4 bg-surface-container p-4 rounded-md shadow-3xl overflow-hidden">
      {/* Background watermark icon */}
      {icon && (
        <Icon
          icon={icon}
          className="absolute bottom-2 right-3 h-16 w-16 text-white/5"
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold tracking-widest text-surface-muted uppercase">
          {title}
        </p>
        {icon && <Icon icon={icon} className="h-5 w-5 text-emerald-400" />}
      </div>

      {/* Value */}
      <p className="text-4xl font-bold text-on-surface">
        {value}
      </p>

      {/* Badge */}
      {badge && (
        <div className="flex items-center gap-1.5 mt-2">
          {badge.type === "trend" && (
            <span className="text-sm font-medium text-emerald-400">
              ↗ {badge.text}
            </span>
          )}
          {badge.type === "status" && (
            <>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-on-surface">
                {badge.text}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
