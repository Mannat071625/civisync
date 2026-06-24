import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Lock, Users, Sparkles, Mail, KeyRound, ArrowRight, ChevronLeft } from "lucide-react";
import { Logo } from "@/components/civisync/Logo";
import { CommunityIllustration } from "@/components/civisync/CommunityIllustration";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · Civisync" },
      { name: "description", content: "Sign in or create your Civisync account." },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const navigate = useNavigate();

  const titles: Record<Mode, { title: string; sub: string }> = {
    signin: { title: "Welcome back", sub: "Sign in to continue coordinating with your community." },
    signup: { title: "Create your account", sub: "Join citizens building healthier neighbourhoods together." },
    forgot: { title: "Reset your password", sub: "We'll send a recovery link to your email." },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Illustration panel */}
        <aside className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in oklab, var(--color-primary) 10%, var(--color-background)), color-mix(in oklab, var(--color-info) 8%, var(--color-background)))",
          }}
        >
          <Logo size={36} />
          <div className="relative">
            <CommunityIllustration />
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-text-primary">
              Your neighbourhood,<br /> coordinated by community.
            </h2>
            <p className="mt-3 max-w-md text-text-secondary">
              Civisync brings citizens, infrastructure and AI together — so reports turn into real, visible action.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <TrustChip icon={<Shield className="h-4 w-4" />} label="Secure Authentication" />
              <TrustChip icon={<Lock className="h-4 w-4" />} label="Privacy First" />
              <TrustChip icon={<Users className="h-4 w-4" />} label="Community Verified" />
              <TrustChip icon={<Sparkles className="h-4 w-4" />} label="AI Powered" />
            </div>
          </div>
        </aside>

        {/* Form panel */}
        <main className="flex flex-col px-6 py-10 sm:px-12 lg:px-16 lg:py-14">
          <div className="flex items-center justify-between lg:hidden">
            <Logo size={32} />
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-md flex-1 flex-col justify-center lg:mt-0">
            {mode === "forgot" && (
              <button
                onClick={() => setMode("signin")}
                className="mb-4 inline-flex items-center gap-1 self-start text-sm text-text-secondary transition hover:text-text-primary"
              >
                <ChevronLeft className="h-4 w-4" /> Back to sign in
              </button>
            )}
            <h1 className="font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              {titles[mode].title}
            </h1>
            <p className="mt-2 text-text-secondary">{titles[mode].sub}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/home" });
              }}
              className="mt-8 space-y-4"
            >
              {mode === "signup" && (
                <Field label="Full name" type="text" placeholder="Aanya Sharma" />
              )}
              <Field label="Email" type="email" placeholder="you@neighbourhood.com" icon={<Mail className="h-4 w-4" />} />
              {mode !== "forgot" && (
                <Field
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={<KeyRound className="h-4 w-4" />}
                  hint={
                    mode === "signin" ? (
                      <button type="button" onClick={() => setMode("forgot")} className="text-primary hover:underline">
                        Forgot password?
                      </button>
                    ) : undefined
                  }
                />
              )}

              <button
                type="submit"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-[0.97] active:scale-[0.99]"
              >
                {mode === "signin" && "Sign in"}
                {mode === "signup" && "Create account"}
                {mode === "forgot" && "Send recovery link"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </form>

            {mode !== "forgot" && (
              <>
                <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-text-secondary">
                  <div className="h-px flex-1 bg-border" />
                  or continue with
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => navigate({ to: "/home" })}
                    className="inline-flex h-12 items-center justify-center gap-2.5 rounded-2xl border border-border bg-card px-4 font-medium text-text-primary shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                  >
                    <GoogleIcon className="h-4 w-4" /> Google
                  </button>
                  <button
                    onClick={() => navigate({ to: "/home" })}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 font-medium text-text-primary transition hover:bg-surface-muted"
                  >
                    Continue as Guest
                  </button>
                </div>

                <p className="mt-8 text-center text-sm text-text-secondary">
                  {mode === "signin" ? "New to Civisync? " : "Already have an account? "}
                  <button
                    onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                    className="font-medium text-primary hover:underline"
                  >
                    {mode === "signin" ? "Create an account" : "Sign in"}
                  </button>
                </p>
              </>
            )}

            <p className="mt-10 text-center text-xs text-text-secondary">
              By continuing you agree to our <Link to="/auth" className="underline">Terms</Link> and <Link to="/auth" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
  icon,
  hint,
}: {
  label: string;
  type: string;
  placeholder?: string;
  icon?: React.ReactNode;
  hint?: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        {hint && <span className="text-xs">{hint}</span>}
      </div>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`h-12 w-full rounded-2xl border border-border bg-card text-text-primary placeholder:text-text-secondary/70 shadow-[var(--shadow-soft)] outline-none transition focus:border-primary focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-primary)_18%,transparent)] ${icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
    </label>
  );
}

function TrustChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/70 px-3 py-2.5 text-sm text-text-primary shadow-[var(--shadow-soft)] backdrop-blur">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.4 29.4 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.8 6.4 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.3-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.8 6.4 29.2 4.5 24 4.5 16.3 4.5 9.6 8.8 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.4-4.4 2.1-7.1 2.1-5.4 0-9.9-3.1-11.3-7.5l-6.5 5C9.5 38.9 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.7-3.7 4.9l6.1 5c-.4.4 6.8-4.9 6.8-13.9 0-1.2-.1-2.3-.3-3.5z"/>
    </svg>
  );
}
