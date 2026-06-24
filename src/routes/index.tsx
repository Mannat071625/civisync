import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/civisync/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Civisync — Initializing" },
      { name: "description", content: "Turning Community Reports into Coordinated Action." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 2800) * 100);
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 60);
    const t = setTimeout(() => navigate({ to: "/auth" }), 3200);
    return () => {
      clearInterval(interval);
      clearTimeout(t);
    };
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Soft radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, color-mix(in oklab, var(--color-primary) 10%, transparent), transparent 70%)",
        }}
      />
      <SplashNodes />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-6 animate-float-soft">
          <LogoMark size={88} animated />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Civisync
        </h1>
        <p className="mt-3 max-w-md text-base text-text-secondary sm:text-lg">
          Turning Community Reports into Coordinated Action.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="h-1 w-56 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm font-medium tracking-wide text-text-secondary">
            Initializing Civic Intelligence
            <DotsAnim />
          </p>
        </div>
      </div>
    </div>
  );
}

function DotsAnim() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const i = setInterval(() => setN((v) => (v % 3) + 1), 400);
    return () => clearInterval(i);
  }, []);
  return <span className="inline-block w-6 text-left">{".".repeat(n)}</span>;
}

function SplashNodes() {
  // animated connecting nodes that "form" around the logo
  const nodes = [
    { x: 18, y: 28, c: "primary", d: 0 },
    { x: 82, y: 22, c: "info", d: 200 },
    { x: 14, y: 72, c: "accent", d: 400 },
    { x: 86, y: 76, c: "secondary", d: 600 },
    { x: 50, y: 12, c: "primary", d: 800 },
    { x: 50, y: 90, c: "info", d: 1000 },
  ];
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g stroke="var(--color-primary)" strokeOpacity="0.18" strokeWidth="0.15">
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b, j) => (
            <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
          )),
        )}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="0.6"
          fill={`var(--color-${n.c})`}
          className="animate-node-pulse"
          style={{ animationDelay: `${n.d}ms` }}
        />
      ))}
    </svg>
  );
}
