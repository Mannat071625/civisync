import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles, MapPin, Camera, MessagesSquare, Bot, ArrowRight, ArrowUpRight,
  Home as HomeIcon, Compass, Bell, User, Plus, ShieldCheck, Clock, Droplet,
  Lightbulb, Trash2, TreePine, TrafficCone, CheckCircle2, TrendingUp, TrendingDown, Users2,
} from "lucide-react";
import { Logo } from "@/components/civisync/Logo";
import { NodesBackdrop } from "@/components/civisync/NodesBackdrop";
import { UserAvatar } from "@/components/civisync/UserAvatar";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/firebase/auth";
import { useNavigate } from "@tanstack/react-router";
import { getReports } from "@/lib/report";
import { deleteReport } from "@/lib/report";
import { toast } from "sonner";
export const Route = createFileRoute("/home")({

  head: () => ({
    meta: [
      { title: "Community Pulse · Civisync" },
      { name: "description", content: "AI-powered insights for your neighbourhood." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const { user ,loading} = useAuth();
  console.log({
  loading,
  user,
});
  const [reports, setReports] = useState<any[]>([]);
  useEffect(() => {
  console.log("Reports state:", reports);
}, [reports]);
  const insights = [
  {
    icon: <MessagesSquare className="h-4 w-4" />,
    text: `Total reports submitted: ${reports.length}`,
    tone: "primary" as const,
  },
  {
    icon: <TrafficCone className="h-4 w-4" />,
    text: `High severity reports: ${
      reports.filter((r) => r.severity === "High").length
    }`,
    tone: "info" as const,
  },
  {
    icon: <Clock className="h-4 w-4" />,
    text: `Pending reports: ${
      reports.filter((r) => r.status === "Pending").length
    }`,
    tone: "success" as const,
  },
];

const totalReports = reports.length;

const highSeverity = reports.filter(
  (r) => r.severity === "High"
).length;

const pendingReports = reports.filter(
  (r) => r.status === "Pending"
).length;

const resolvedReports = reports.filter(
  (r) => r.status === "Resolved"
).length;

const [loadingReports, setLoadingReports] = useState(true);

useEffect(() => {
  async function loadReports() {
    try {
      const data = await getReports();
      console.log("Loaded reports:", data);
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  }

  loadReports();
}, []);


if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}
const handleDelete = async (id: string) => {
  try {
    await deleteReport(id);

    toast.success("Report deleted successfully.");

    const data = await getReports();
    setReports(data);

  } catch (error) {
    toast.error("Failed to delete report.");
  }
};
  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo size={32} />
          <div className="flex items-center gap-2">
  <button className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-text-secondary transition hover:text-text-primary">
    <Bell className="h-[18px] w-[18px]" />
  </button>

  <button
    onClick={async () => {
      await logout();
      navigate({ to: "/auth" });
    }}
    className="rounded-xl border border-border px-3 py-2 text-sm hover:bg-card"
  >
    Logout
  </button>

  <UserAvatar />
</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-5 pt-8">
        {/* Title */}
       <section>
  <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
    Welcome,
  </p>

  <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
    {user?.isAnonymous
      ? "Guest User"
      : user?.displayName || "Citizen"}
  </h1>

  <p className="mt-2 text-text-secondary">
    AI-powered insights for your neighbourhood.
  </p>
</section>



        {/* AI insight card */}
       <AIInsightHero reports={reports} onViewAnalysis={() => navigate({ to: "/map" })}/>

       <section className="grid grid-cols-2 gap-4 md:grid-cols-4">

  <StatCard
    title="Total Reports"
    value={totalReports}
    icon={<MessagesSquare className="h-5 w-5" />}
    color="primary"
  />

  <StatCard
    title="High Severity"
    value={highSeverity}
    icon={<TrafficCone className="h-5 w-5" />}
    color="danger"
  />

  <StatCard
    title="Pending"
    value={pendingReports}
    icon={<Clock className="h-5 w-5" />}
    color="warning"
  />

  <StatCard
    title="Resolved"
    value={resolvedReports}
    icon={<CheckCircle2 className="h-5 w-5" />}
    color="success"
  />

</section>

        {/* Quick actions */}
        <section>
          <SectionTitle title="Quick Actions" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <QuickAction icon={<Camera />} label="Observe & Report" tone="primary"  onClick={() => navigate({ to: "/report" })}/>
            <QuickAction icon={<MapPin />} label="Live Map" tone="info" onClick={() => navigate({ to: "/map" })}/>
            <QuickAction
  icon={<MessagesSquare />}
  label="Community Feed"
  tone="accent"
  onClick={() => {
    document
      .getElementById("community-feed")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
/>
            <QuickAction icon={<Bot />} label="Ask Civisync AI" tone="secondary"  onClick={() => navigate({ to: "/assistant" })}/>
          </div>
        </section>

        {/* Nearby issues */}
        <section>
          <SectionTitle title="Nearby Issues" action="See all" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report: any) => (
  <IssueCard
  key={report.id}
  id={report.id}
  title={report.description}
  category={report.category}
  distance="Nearby"
  severity={report.severity}
  verifications={1}
  status={report.status}
  location={report.location}
  userId={report.userId}
  currentUserId={user?.uid}
  onDelete={handleDelete}
  
/>
))}
          </div>
        </section>

        {/* Community feed + AI insights */}
        <section
  id="community-feed"
  className="grid grid-cols-1 gap-6 lg:grid-cols-5"
>
          <div className="lg:col-span-3">
            <SectionTitle title="Community Feed" />
            <div className="rounded-3xl border border-border bg-card p-2 shadow-[var(--shadow-soft)]">
              {reports.map((report: any, index: number) => (
  <FeedRow
    key={report.id}
    name={report.userName || "Citizen"}
    initials={(report.userName || "C").charAt(0).toUpperCase()}
    text={report.description}
    status={report.status}
    time="Just now"
    color="var(--color-primary)"
    divider={index < reports.length - 1}
  />
))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <SectionTitle title="AI Insights" />
            <div className="space-y-3">
              {insights.map((s, i) => (
  <InsightRow key={i} {...s} />
))}
            </div>
          </div>
        </section>
      </main>

      {/* FAB */}
      <button onClick={() => navigate({ to: "/report" })} className="fixed bottom-24 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-primary pl-5 pr-6 font-medium text-primary-foreground shadow-[var(--shadow-fab)] transition hover:-translate-y-0.5 active:scale-95 sm:bottom-8">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
          <Plus className="h-5 w-5" />
        </span>
        Observe & Report
      </button>

      {/* Bottom nav (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/90 backdrop-blur sm:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4">
          <NavItem icon={<HomeIcon />} label="Home" active />
          <NavItem icon={<Compass />} label="Explore" />
          <NavItem icon={<Bell />} label="Alerts" />
          <NavItem icon={<User />} label="Profile" />
        </div>
      </nav>
    </div>
  );
}

/* ────────── Sections ────────── */

function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="font-display text-xl font-semibold text-text-primary">{title}</h2>
        {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
      </div>
      {action && (
        <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          {action} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function AIInsightHero({
  reports,
  onViewAnalysis,
}: {
  reports: any[];
  onViewAnalysis: () => void;
}) {
  const totalReports = reports.length;

const highPriority = reports.filter(
  (r) => r.severity === "High"
).length;

const pendingReports = reports.filter(
  (r) => r.status === "Pending"
).length;

const categoryCount: Record<string, number> = {};

reports.forEach((r) => {
  categoryCount[r.category] = (categoryCount[r.category] || 0) + 1;
});

const topCategory =
  Object.entries(categoryCount).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "No issues";
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
      <NodesBackdrop className="opacity-60" />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 70%)" }}
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Insight · Just now
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-text-primary sm:text-[26px]">
            {highPriority} high-priority civic issue{highPriority !== 1 ? "s" : ""} detected within your area.
          </h3>
          <p className="mt-2 text-text-secondary">
            Civisync has analyzed {totalReports} report{totalReports !== 1 ? "s" : ""}.
          The most frequently reported issue is <strong>{topCategory}</strong>. Currently, {pendingReports} report{pendingReports !== 1 ? "s are" : " is"} awaiting action.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-[0.97] active:scale-[0.99]" onClick={onViewAnalysis}>
            View Analysis <ArrowRight className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-success" />
            Updated continuously
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  tone,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "primary" | "info" | "accent" | "secondary";
  onClick?: () => void;
}) {
  const toneBg: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    info: "bg-info/10 text-info",
    accent: "bg-accent/15 text-[color:var(--color-secondary)]",
    secondary: "bg-secondary/10 text-secondary",
  };
  return (
    <button onClick={onClick} className="card-lift group flex flex-col items-start gap-4 rounded-3xl border border-border bg-card p-5 text-left shadow-[var(--shadow-soft)]">
      <span className={`grid h-11 w-11 place-items-center rounded-2xl ${toneBg[tone]}`}>
        <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      </span>
      <div className="flex w-full items-center justify-between">
        <span className="font-medium text-text-primary">{label}</span>
        <ArrowUpRight className="h-4 w-4 text-text-secondary transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </button>
  );
}

type Issue = {
  id: string;
  title: string;
  category: "Water" | "Lighting" | "Waste" | "Greenery" | "Traffic";
  distance: string;
  severity: "Low" | "Medium" | "High";
  verifications: number;
  status: "Open" | "In progress" | "Verified" | "Resolved" | "Pending";
  location: string;
  userId: string;
  currentUserId?: string;
  onDelete?: (id: string) => void;
};



function categoryMeta(category: string) {
  const c = category.toLowerCase();

  if (c.includes("road") || c.includes("traffic") || c.includes("pothole")) {
    return {
      icon: <TrafficCone className="h-4 w-4" />,
      color: "var(--color-danger)",
    };
  }

  if (c.includes("water") || c.includes("leak")) {
    return {
      icon: <Droplet className="h-4 w-4" />,
      color: "var(--color-info)",
    };
  }

  if (c.includes("light")) {
    return {
      icon: <Lightbulb className="h-4 w-4" />,
      color: "var(--color-accent)",
    };
  }

  if (c.includes("waste") || c.includes("garbage")) {
    return {
      icon: <Trash2 className="h-4 w-4" />,
      color: "var(--color-secondary)",
    };
  }

  if (c.includes("tree") || c.includes("green")) {
    return {
      icon: <TreePine className="h-4 w-4" />,
      color: "var(--color-success)",
    };
  }

  return {
    icon: <ShieldCheck className="h-4 w-4" />,
    color: "var(--color-primary)",
  };
}

function IssueCard({
  id,
  userId,
  currentUserId,
  onDelete,
  ...i
}: Issue) {
  const meta = categoryMeta(i.category);
  const sevTone = i.severity === "High" ? "danger" : i.severity === "Medium" ? "warning" : "success";
  const statusTone = i.status === "Resolved" ? "success" : i.status === "In progress" ? "warning" : i.status === "Verified" ? "info" : "primary";
  return (
    <article className="card-lift group overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <div
        className="relative h-36 w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, color-mix(in oklab, ${meta.color} 35%, var(--color-card)), color-mix(in oklab, var(--color-primary) 18%, var(--color-card)))`,
        }}
      >
        <NodesBackdrop className="opacity-50" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-xs font-medium text-text-primary shadow-[var(--shadow-soft)]">
          <MapPin className="h-3 w-3" /> {i.location}
        </div>
        <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-2xl bg-card/90 text-text-primary shadow-[var(--shadow-soft)]" style={{ color: meta.color }}>
          {meta.icon}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="font-medium uppercase tracking-wider" style={{ color: meta.color }}>{i.category}</span>
          <span>{i.distance} away</span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug text-text-primary">{i.title}</h3>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Pill tone={sevTone}>{i.severity} severity</Pill>
          <Pill tone={statusTone}>{i.status}</Pill>
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-text-secondary">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> {i.verifications} verified
          </span>
          {userId === currentUserId && (
  <button
    onClick={() => {
      toast("Delete this report?", {
        description: "This action cannot be undone.",
        action: {
          label: "Delete",
          onClick: () => onDelete?.(id),
        },
        cancel: {
          label: "Cancel",
          onClick: () => {},
        },
      });
    }}
    className="ml-auto rounded-lg p-2 text-red-500 hover:bg-red-100"
    title="Delete report"
  >
    <Trash2 className="h-4 w-4" />
  </button>
)}
        </div>
      </div>
    </article>
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone: string }) {
  const toneMap: Record<string, string> = {
    success: "bg-success/12 text-success",
    warning: "bg-warning/15 text-[color:var(--color-secondary)]",
    danger: "bg-danger/12 text-danger",
    info: "bg-info/12 text-info",
    primary: "bg-primary/10 text-primary",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneMap[tone] ?? toneMap.primary}`}>
      {children}
    </span>
  );
}

/* Feed */
const FEED = [
  { name: "Meera K.", initials: "MK", text: "Reported a pothole near the school crossing on Elm Street.", status: "Open", time: "12m ago", color: "var(--color-secondary)" },
  { name: "Rahul P.", initials: "RP", text: "Verified streetlight outage on 4th Street — confirmed dark zone.", status: "Verified", time: "38m ago", color: "var(--color-info)" },
  { name: "Aanya S.", initials: "AS", text: "Park bench repaired at Hillside — thanks to the maintenance team!", status: "Resolved", time: "2h ago", color: "var(--color-primary)" },
  { name: "Devon L.", initials: "DL", text: "Submitted a waste overflow report near Park Plaza, photos attached.", status: "Open", time: "3h ago", color: "var(--color-accent)" },
];

function FeedRow({ name, initials, text, status, time, color, divider }: typeof FEED[number] & { divider: boolean }) {
  const statusTone = status === "Resolved" ? "success" : status === "Verified" ? "info" : "primary";
  return (
    <div className={`flex items-start gap-3 rounded-2xl p-3 transition hover:bg-surface-muted ${divider ? "" : ""}`}>
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white" style={{ background: color }}>
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-text-primary">{name}</span>
          <span className="text-xs text-text-secondary">· {time}</span>
        </div>
        <p className="mt-0.5 text-sm text-text-secondary">{text}</p>
      </div>
      <Pill tone={statusTone}>{status}</Pill>
    </div>
  );
}


function InsightRow({ icon, text, tone, trend }: { icon: React.ReactNode; text: string; tone: "info"|"success"|"primary"; trend?: "up"|"down" }) {
  const toneCls: Record<string, string> = {
    info: "bg-info/10 text-info",
    success: "bg-success/12 text-success",
    primary: "bg-primary/10 text-primary",
  };
  return (
    <div className="card-lift flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${toneCls[tone]}`}>{icon}</span>
      <p className="min-w-0 flex-1 text-sm font-medium text-text-primary">{text}</p>
      {trend === "up" && <TrendingUp className="h-4 w-4 text-danger" />}
      {trend === "down" && <TrendingDown className="h-4 w-4 text-success" />}
    </div>
  );
}

/* Impact */
function ImpactCard({ icon, label, value, suffix = "", trend, tone, trendDown }: { icon: React.ReactNode; label: string; value: number; suffix?: string; trend: string; tone: "success"|"primary"|"info"|"accent"; trendDown?: boolean }) {
  const n = useCountUp(value);
  const toneCls: Record<string, string> = {
    success: "bg-success/12 text-success",
    primary: "bg-primary/10 text-primary",
    info: "bg-info/10 text-info",
    accent: "bg-accent/15 text-[color:var(--color-secondary)]",
  };
  return (
    <div className="card-lift rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-2xl ${toneCls[tone]}`}>
          <span className="[&>svg]:h-4.5 [&>svg]:w-4.5">{icon}</span>
        </span>
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${trendDown ? "text-success" : "text-success"}`}>
          {trendDown ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
          {trend}
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-text-primary tabular-nums">
        {Number.isInteger(value) ? n.toLocaleString() : n.toFixed(1)}{suffix}
      </p>
      <p className="mt-1 text-sm text-text-secondary">{label}</p>
    </div>
  );
}

function useCountUp(target: number, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition ${active ? "text-primary" : "text-text-secondary"}`}>
      <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      {label}
    </button>
  );

  
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "primary" | "danger" | "warning" | "success";
}) {
  const colors = {
    primary: "text-primary bg-primary/10",
    danger: "text-danger bg-danger/10",
    warning: "text-yellow-600 bg-yellow-100",
    success: "text-success bg-success/10",
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className={`mb-4 inline-flex rounded-xl p-3 ${colors[color]}`}>
        {icon}
      </div>

      <p className="text-sm text-text-secondary">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );}

