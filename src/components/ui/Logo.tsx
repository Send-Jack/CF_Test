export function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`group/logo relative grid h-11 w-11 place-items-center rounded-xl bg-app-surface-2/60 ring-1 ring-app-border-soft transition-all duration-300 hover:ring-app-accent/50 ${className}`}
    >
      {/* ambient glow */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-500 group-hover/logo:opacity-100"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgb(var(--accent) / 0.35), transparent 70%)' }}
      />

      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="relative h-[38px] w-[38px] overflow-visible"
        style={{ willChange: 'transform' }}
      >
        {/* rotating hex ring */}
        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'logo-rotate 10s cubic-bezier(0.45, 0, 0.55, 1) infinite',
          }}
        >
          <path
            d="M16 3L26 9V21L16 27L6 21V9L16 3Z"
            stroke="rgb(var(--accent))"
            strokeWidth="1.5"
            strokeLinejoin="round"
            opacity="0.35"
          />
        </g>

        {/* counter-rotating inner hex */}
        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'logo-rotate 8s cubic-bezier(0.45, 0, 0.55, 1) infinite reverse',
          }}
        >
          <path
            d="M16 8L21 11V19L16 22L11 19V11L16 8Z"
            stroke="rgb(var(--accent))"
            strokeWidth="1.2"
            strokeLinejoin="round"
            opacity="0.55"
          />
        </g>

        {/* code brackets — left */}
        <path
          d="M13 13L10 16L13 19"
          stroke="rgb(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'logo-shear 4s cubic-bezier(0.45, 0, 0.55, 1) infinite',
          }}
        />
        {/* code brackets — right */}
        <path
          d="M19 13L22 16L19 19"
          stroke="rgb(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'logo-shear 4s cubic-bezier(0.45, 0, 0.55, 1) infinite',
          }}
        />

        {/* pulsing core spark */}
        <circle
          cx="16"
          cy="16"
          r="1.5"
          fill="rgb(var(--accent))"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'logo-pulse 2.5s cubic-bezier(0.45, 0, 0.55, 1) infinite',
          }}
        />
      </svg>
    </span>
  );
}
