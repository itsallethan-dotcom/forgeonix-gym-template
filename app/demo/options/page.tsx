import type { Metadata } from "next";
import Link from "next/link";
import { clientConfig } from "@/lib/client-config";

export const metadata: Metadata = {
  title: `Demo layouts | ${clientConfig.appName}`,
  description: "Compare Classic, Impact, and Arena leaderboard demos — including TV display modes.",
};

type DemoCard = {
  title: string;
  description: string;
  href: string;
  preview: "classic" | "impact" | "arena" | "tv-classic" | "tv-impact" | "tv-arena";
  cta: string;
};

const demos: DemoCard[] = [
  {
    title: "Classic Demo",
    description: "Clean slate leaderboard with tables, teams snapshot, and recent lifts — ideal for a straightforward gym rollout.",
    href: "/demo",
    preview: "classic",
    cta: "Open Classic",
  },
  {
    title: "Impact Demo",
    description: "High-contrast scoreboard energy with podium hero, team blocks, and bold typography for competitive gyms.",
    href: "/demo/impact",
    preview: "impact",
    cta: "Open Impact",
  },
  {
    title: "Arena Demo",
    description: "Premium full-screen showcase with motion, challenge panel, and esports-style presence for flagship displays.",
    href: "/demo/arena",
    preview: "arena",
    cta: "Open Arena",
  },
  {
    title: "Classic TV Mode",
    description: "Fullscreen rotation: leaderboard, teams, and activity — tuned for readability at a distance.",
    href: "/demo/tv",
    preview: "tv-classic",
    cta: "Open TV",
  },
  {
    title: "Impact TV Mode",
    description: "Same TV rotation with Impact colors and weight — great for orange-branded floors or challenge week.",
    href: "/demo/impact/tv",
    preview: "tv-impact",
    cta: "Open TV",
  },
  {
    title: "Arena TV Mode",
    description: "Arena styling on the big screen: cyan and magenta accents with maximum legibility for lobby walls.",
    href: "/demo/arena/tv",
    preview: "tv-arena",
    cta: "Open TV",
  },
];

function PreviewPanel({ kind }: { kind: DemoCard["preview"] }) {
  const tv = kind.startsWith("tv-");
  const base = "relative h-36 overflow-hidden rounded-xl border sm:h-40";
  const shells: Record<DemoCard["preview"], string> = {
    classic: `${base} border-slate-600 bg-gradient-to-br from-slate-900 to-slate-950`,
    impact: `${base} border-orange-900/60 bg-gradient-to-br from-[#1a1008] to-black`,
    arena: `${base} border-cyan-900/50 bg-gradient-to-br from-[#0a1628] to-[#0c0518]`,
    "tv-classic": `${base} border-slate-600 bg-gradient-to-br from-slate-900 to-slate-950`,
    "tv-impact": `${base} border-orange-900/60 bg-gradient-to-br from-[#1a1008] to-black`,
    "tv-arena": `${base} border-fuchsia-900/40 bg-gradient-to-br from-[#0a1628] to-[#120818]`,
  };

  return (
    <div className={shells[kind]}>
      {tv ? (
        <span className="absolute right-2 top-2 rounded bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
          TV
        </span>
      ) : null}
      {/* Mock UI strips */}
      <div className="absolute inset-x-3 top-4 flex gap-1">
        <div className="h-2 flex-1 rounded bg-white/10" />
        <div className="h-2 w-8 rounded bg-white/15" />
      </div>
      <div className="absolute inset-x-3 top-10 space-y-2">
        <div className="flex gap-2">
          <div
            className={`h-8 w-8 rounded-lg ${
              kind === "impact" || kind === "tv-impact"
                ? "bg-orange-500/40"
                : kind === "arena" || kind === "tv-arena"
                  ? "bg-fuchsia-500/35"
                  : "bg-cyan-500/35"
            }`}
          />
          <div className="flex-1 space-y-1.5 pt-0.5">
            <div className="h-2 w-full max-w-[8rem] rounded bg-white/20" />
            <div className="h-1.5 w-full max-w-[5rem] rounded bg-white/10" />
          </div>
        </div>
        <div className="h-2 w-full rounded bg-white/10" />
        <div className="h-2 w-full max-w-[11rem] rounded bg-white/10" />
        <div className="flex gap-2 pt-1">
          <div
            className={`h-6 flex-1 rounded ${
              kind === "impact" || kind === "tv-impact"
                ? "bg-orange-600/25"
                : kind === "arena" || kind === "tv-arena"
                  ? "bg-cyan-500/20"
                  : "bg-cyan-600/20"
            }`}
          />
          <div className="h-6 flex-1 rounded bg-white/5" />
          <div className="h-6 flex-1 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default function DemoOptionsPage() {
  const mailHref = `mailto:${clientConfig.contactEmail}?subject=${encodeURIComponent("Custom gym leaderboard build")}`;

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2">
          <Link
            href="/demo"
            className="text-sm font-medium text-cyan-400/90 hover:text-cyan-300"
          >
            ← Back to Classic demo
          </Link>
        </div>
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90">Client preview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Choose your leaderboard experience</h1>
          <p className="mt-3 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Every layout uses the same sample data so you can compare look and feel before wiring your gym&apos;s Supabase
            project.
          </p>
        </header>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400/90">TV display modes</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            TV modes are designed for lobby screens, gym TVs, or challenge displays. They rotate between the main
            leaderboard, team standings, and recent activity — large type, minimal chrome, no login prompts.
          </p>
        </section>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {demos.map((d) => (
            <article
              key={d.href}
              className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-lg transition hover:border-zinc-700"
            >
              <PreviewPanel kind={d.preview} />
              <h2 className="mt-4 text-lg font-semibold text-white">{d.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{d.description}</p>
              <Link
                href={d.href}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/15"
              >
                {d.cta}
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
          <h2 className="text-center text-sm font-bold uppercase tracking-wider text-zinc-500">Packages</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-xs text-zinc-500">
            Example tiers — contact us for real pricing and scope.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-500/80">Starter</p>
              <p className="mt-2 text-lg font-semibold text-white">Classic leaderboard</p>
              <p className="mt-2 text-sm text-zinc-400">Member table, teams snapshot, and workout list in the default theme.</p>
            </div>
            <div className="rounded-xl border border-amber-900/40 bg-amber-950/10 p-5 ring-1 ring-amber-500/20">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500/90">Pro</p>
              <p className="mt-2 text-lg font-semibold text-white">Impact + teams</p>
              <p className="mt-2 text-sm text-zinc-400">Bold scoreboard look with stronger team presence for in-gym energy.</p>
            </div>
            <div className="rounded-xl border border-fuchsia-900/40 bg-fuchsia-950/10 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-fuchsia-400/90">Premium</p>
              <p className="mt-2 text-lg font-semibold text-white">Arena + TV + branding</p>
              <p className="mt-2 text-sm text-zinc-400">Showcase theme, rotating TV modes, and custom branding via config.</p>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-950/30 to-zinc-900 p-8 text-center sm:p-10">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Want this branded for your gym?</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-400 sm:text-base">
            We can tailor layouts, copy, logos, and deployment to your brand — without changing your core leaderboard logic.
          </p>
          <a
            href={mailHref}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-cyan-500 px-8 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-cyan-900/30 transition hover:bg-cyan-400"
          >
            Request a Custom Build
          </a>
        </section>

        <footer className="mt-12 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          <p>{clientConfig.footerText}</p>
        </footer>
      </div>
    </main>
  );
}
