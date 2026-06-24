import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

export function Logo({ className, showWordmark = true, size = 36 }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <span
          className="font-display font-bold tracking-tight text-text-primary"
          style={{ fontSize: size * 0.62 }}
        >
          Civisync
        </span>
      )}
    </div>
  );
}

export function LogoMark({ size = 36, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cs-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-primary)" />
          <stop offset="1" stopColor="var(--color-info)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#cs-grad)" opacity="0.08" />
      {/* Connecting lines */}
      <g stroke="var(--color-primary)" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
        <line x1="12" y1="14" x2="24" y2="24" />
        <line x1="36" y1="14" x2="24" y2="24" />
        <line x1="12" y1="34" x2="24" y2="24" />
        <line x1="36" y1="34" x2="24" y2="24" />
      </g>
      {/* Outer nodes */}
      <g>
        <circle cx="12" cy="14" r="3" fill="var(--color-primary)" className={animated ? "animate-node-pulse" : ""} style={{ animationDelay: "0ms" }} />
        <circle cx="36" cy="14" r="3" fill="var(--color-secondary)" className={animated ? "animate-node-pulse" : ""} style={{ animationDelay: "300ms" }} />
        <circle cx="12" cy="34" r="3" fill="var(--color-accent)" className={animated ? "animate-node-pulse" : ""} style={{ animationDelay: "600ms" }} />
        <circle cx="36" cy="34" r="3" fill="var(--color-info)" className={animated ? "animate-node-pulse" : ""} style={{ animationDelay: "900ms" }} />
        {/* Center */}
        <circle cx="24" cy="24" r="5" fill="var(--color-primary)" />
        <circle cx="24" cy="24" r="2" fill="white" />
      </g>
    </svg>
  );
}
