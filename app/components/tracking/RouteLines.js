"use client";

export default function RouteLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Amber Route */}
        <linearGradient id="amberRoute" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
        </linearGradient>

        {/* Emerald Route */}
        <linearGradient id="greenRoute" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="1" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Amber Route */}
      <path
        d="M170 120
           C320 120, 380 250, 500 320
           S760 430, 900 300
           S1100 180, 1180 250"
        stroke="url(#amberRoute)"
        strokeWidth="3"
        strokeDasharray="10 10"
        fill="none"
        filter="url(#glow)"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-200"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>

      {/* Green Route */}
      <path
        d="M120 650
           C260 560, 430 520, 620 500
           S880 420, 1100 620"
        stroke="url(#greenRoute)"
        strokeWidth="4"
        strokeDasharray="12 8"
        fill="none"
        filter="url(#glow)"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-250"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>

      {/* Gray Background Route */}
      <path
        d="M150 200
           C250 350, 450 400, 650 320
           S920 180, 1080 350"
        stroke="#374151"
        strokeWidth="2"
        strokeDasharray="8 8"
        opacity="0.5"
        fill="none"
      />

      {/* Another Gray Route */}
      <path
        d="M250 750
           C400 620, 600 620, 850 690
           S1080 760, 1180 650"
        stroke="#374151"
        strokeWidth="2"
        strokeDasharray="8 8"
        opacity="0.45"
        fill="none"
      />
    </svg>
  );
}