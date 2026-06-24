export function NodesBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="var(--color-primary)" strokeOpacity="0.12" strokeWidth="1">
        <line x1="80" y1="120" x2="240" y2="200" />
        <line x1="240" y1="200" x2="420" y2="140" />
        <line x1="420" y1="140" x2="620" y2="220" />
        <line x1="240" y1="200" x2="320" y2="380" />
        <line x1="320" y1="380" x2="540" y2="420" />
        <line x1="540" y1="420" x2="700" y2="320" />
        <line x1="620" y1="220" x2="540" y2="420" />
        <line x1="80" y1="480" x2="320" y2="380" />
      </g>
      {[
        [80, 120, "primary"], [240, 200, "info"], [420, 140, "accent"],
        [620, 220, "secondary"], [320, 380, "primary"], [540, 420, "info"],
        [700, 320, "accent"], [80, 480, "secondary"],
      ].map(([x, y, c], i) => (
        <circle key={i} cx={x as number} cy={y as number} r="3.5" fill={`var(--color-${c})`} opacity="0.35" />
      ))}
    </svg>
  );
}
