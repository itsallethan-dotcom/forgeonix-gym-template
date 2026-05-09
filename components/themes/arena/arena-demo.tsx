"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { DemoWatermark } from "@/components/demo/demo-watermark";
import { clientConfig } from "@/lib/client-config";
import { demoData } from "@/lib/demo-data";
import { useCanViewDashboard } from "@/hooks/use-can-view-dashboard";

/** Premium esports / gym-TV showcase — same demo data, maximum visual drama (CSS-only motion). */
export function ArenaPublicDemoPage() {
  const canViewDashboard = useCanViewDashboard();
  const top3 = useMemo(() => demoData.leaderboard.slice(0, 3), []);
  const [first, second, third] = top3;
  const sortedTeams = useMemo(
    () => [...demoData.teams].sort((a, b) => b.totalVolume - a.totalVolume),
    [],
  );
  const totalVol = useMemo(
    () => demoData.leaderboard.reduce((a, r) => a + r.totalVolume, 0),
    [],
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030712] pb-16 text-slate-100 sm:pb-20">
      {/* Hero */}
      <section className="relative border-b border-cyan-500/20 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="arena-hero-glow absolute -left-1/4 top-0 h-[min(80vw,520px)] w-[min(80vw,520px)] rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="arena-hero-glow absolute -right-1/4 bottom-0 h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-fuchsia-600/20 blur-3xl [animation-delay:-2.5s]" />
          <div
            className="arena-hero-grid absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `linear-gradient(rgba(34,211,238,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
          <div className="arena-hero-spot pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(34,211,238,0.25),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-2 shadow-lg shadow-cyan-500/10">
                  <Image
                    src={clientConfig.logoPath}
                    alt={`${clientConfig.appName} logo`}
                    width={48}
                    height={48}
                    className="size-12"
                  />
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3 py-1.5 backdrop-blur-sm">
                <span className="arena-live-dot size-2 rounded-full bg-cyan-400" aria-hidden />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">
                  Live challenge board
                </span>
                <span className="text-[10px] font-semibold text-slate-500">Demo</span>
              </div>
              <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.25)] sm:text-6xl md:text-7xl">
                {clientConfig.gymName}
              </h1>
              <p className="mt-3 text-xl font-bold text-cyan-200/90 sm:text-2xl">{clientConfig.appName}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                Full-screen competition energy — rankings, teams, and lifts at a glance. Mock data only;
                connect Supabase for real members.
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center gap-2 lg:justify-end">
              <Link
                href="/demo"
                className="rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-200 backdrop-blur sm:px-4 sm:text-sm"
              >
                View Classic Demo
              </Link>
              <Link
                href="/demo/options"
                className="rounded-lg border border-zinc-600 bg-zinc-800/90 px-3 py-2 text-xs font-bold uppercase tracking-wide text-zinc-200 backdrop-blur sm:px-4 sm:text-sm"
              >
                Browse layouts
              </Link>
              <Link
                href="/demo/impact"
                className="rounded-lg border border-orange-500/40 bg-orange-950/40 px-3 py-2 text-xs font-bold uppercase tracking-wide text-orange-200 sm:px-4 sm:text-sm"
              >
                View Impact Demo
              </Link>
              <Link
                href="/demo/arena/tv"
                className="rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-200 sm:px-4 sm:text-sm"
              >
                TV Mode
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-3 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-cyan-900/40 sm:px-4 sm:text-sm"
              >
                {clientConfig.ctaLabels.signUp}
              </Link>
              <Link
                href="/login"
                className="rounded-lg border-2 border-cyan-400/50 bg-slate-950/80 px-3 py-2 text-xs font-bold text-cyan-100 sm:px-4 sm:text-sm"
              >
                {clientConfig.ctaLabels.logIn}
              </Link>
              {canViewDashboard ? (
                <Link
                  href="/dashboard"
                  className="rounded-lg border border-emerald-500/50 bg-emerald-950/50 px-3 py-2 text-xs font-bold text-emerald-300 sm:px-4 sm:text-sm"
                >
                  {clientConfig.ctaLabels.viewDashboard}
                </Link>
              ) : null}
            </div>
          </div>

          {/* Glowing stat cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total volume" value={totalVol.toLocaleString()} suffix="lbs" accent="cyan" />
            <StatCard label="Athletes" value={String(demoData.users.length)} suffix="on board" accent="fuchsia" />
            <StatCard
              label="Leading team"
              value={sortedTeams[0]?.name ?? "—"}
              suffix={sortedTeams[0] ? `${sortedTeams[0].totalVolume.toLocaleString()} vol` : ""}
              accent="amber"
            />
            <StatCard label="PRs today (demo)" value="2" suffix="logged" accent="emerald" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6">
        {/* Challenge panel */}
        <section className="relative overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-gradient-to-br from-slate-900 via-[#1a0a2e] to-slate-950 p-6 shadow-[0_0_60px_rgba(192,38,211,0.15)] sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-300">Active event</p>
              <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">{demoData.challenge.title}</h2>
              <p className="mt-2 text-lg font-bold text-fuchsia-200/90">{demoData.challenge.endsInLabel}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Prize</p>
              <p className="mt-1 text-lg font-black text-amber-200">{demoData.challenge.prize}</p>
            </div>
          </div>
        </section>

        {/* Podium — 1st center largest */}
        {first && second && third ? (
          <section>
            <h2 className="mb-6 text-center text-sm font-black uppercase tracking-[0.2em] text-cyan-400">
              Championship podium
            </h2>
            <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-end sm:justify-center sm:gap-3">
              <PodiumCard entry={second} rank={2} placement="left" />
              <PodiumCard entry={first} rank={1} placement="center" />
              <PodiumCard entry={third} rank={3} placement="right" />
            </div>
          </section>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Full leaderboard */}
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400">Leaderboard</h2>
              <span className="rounded border border-cyan-500/30 bg-cyan-950/50 px-2 py-0.5 text-[10px] font-bold uppercase text-cyan-300">
                Snapshot
              </span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur-sm">
              <div className="hidden md:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/40 text-[10px] font-black uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Athlete</th>
                      <th className="px-4 py-3 text-right">Volume</th>
                      <th className="px-4 py-3 text-right">Best</th>
                      <th className="px-4 py-3 text-right">Streak</th>
                      <th className="px-4 py-3 text-right">Δ (mock)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoData.leaderboard.map((row, i) => (
                      <tr key={row.id} className="border-b border-white/5 transition hover:bg-white/[0.04]">
                        <td className="px-4 py-3 font-black text-cyan-400">{i + 1}</td>
                        <td className="px-4 py-3 font-bold text-white">{row.name}</td>
                        <td className="px-4 py-3 text-right font-mono text-base tabular-nums text-slate-200 sm:text-lg">
                          {row.totalVolume.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-400">{row.bestLift}</td>
                        <td className="px-4 py-3 text-right text-slate-500">{row.streakDays}d</td>
                        <td className="px-4 py-3 text-right">
                          <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-400">
                            {row.volumeDeltaMock}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="divide-y divide-white/5 md:hidden">
                {demoData.leaderboard.map((row, i) => (
                  <li key={row.id} className="px-4 py-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-2xl font-black text-cyan-500">{i + 1}</span>
                      <span className="flex-1 truncate text-lg font-bold text-white">{row.name}</span>
                      <span className="font-mono text-lg font-black tabular-nums text-cyan-200">
                        {row.totalVolume.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                      <span>Best {row.bestLift} lb</span>
                      <span>·</span>
                      <span>{row.streakDays}d streak</span>
                      <span>·</span>
                      <span className="font-semibold text-emerald-400">{row.volumeDeltaMock}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Live activity */}
          <section>
            <h2 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-fuchsia-400">Live feed</h2>
            <ul className="space-y-3">
              {demoData.recentWorkouts.map((w) => (
                <li
                  key={w.id}
                  className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-4"
                >
                  {w.isPR ? (
                    <div className="mb-2 inline-flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-200">
                      <span aria-hidden>⚡</span> New PR
                    </div>
                  ) : null}
                  <p className="font-bold text-white">{w.athlete}</p>
                  <p className="text-sm text-slate-400">
                    {w.exercise} · {w.weight}×{w.reps}×{w.sets}
                  </p>
                  {w.prNote ? <p className="mt-1 text-xs font-semibold text-amber-300/90">{w.prNote}</p> : null}
                  <p className="mt-2 text-[10px] font-semibold uppercase text-slate-600">{w.recordedAt}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Team battle */}
        <section>
          <h2 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-amber-400">Team battle</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {sortedTeams.map((team, i) => (
              <div
                key={team.id}
                className="relative overflow-hidden rounded-2xl border-2 border-amber-500/25 bg-gradient-to-b from-amber-950/40 to-slate-950 p-6 shadow-[0_0_40px_rgba(245,158,11,0.12)]"
              >
                <div className="absolute right-3 top-3 text-5xl font-black text-white/10">#{i + 1}</div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-500/80">{team.name}</p>
                <p className="mt-2 font-mono text-4xl font-black tabular-nums text-white sm:text-5xl">
                  {team.totalVolume.toLocaleString()}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase text-slate-500">Team volume · {team.members} lifters</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-3 border-t border-white/10 py-8 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>{clientConfig.footerText}</p>
          <a href={`mailto:${clientConfig.contactEmail}`} className="font-semibold text-cyan-500 hover:text-cyan-400">
            {clientConfig.contactEmail}
          </a>
        </footer>
      </div>
      <DemoWatermark />
    </main>
  );
}

function StatCard({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: string;
  suffix: string;
  accent: "cyan" | "fuchsia" | "amber" | "emerald";
}) {
  const border =
    accent === "cyan"
      ? "border-cyan-500/40"
      : accent === "fuchsia"
        ? "border-fuchsia-500/40"
        : accent === "amber"
          ? "border-amber-500/40"
          : "border-emerald-500/40";
  const glow =
    accent === "cyan"
      ? "from-cyan-500/30 via-transparent to-fuchsia-600/20"
      : accent === "fuchsia"
        ? "from-fuchsia-500/30 via-transparent to-cyan-600/20"
        : accent === "amber"
          ? "from-amber-500/35 via-transparent to-orange-900/20"
          : "from-emerald-500/30 via-transparent to-cyan-900/20";

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${border} bg-slate-950/80 p-5 shadow-lg`}>
      <div
        className={`arena-stat-glow pointer-events-none absolute inset-0 bg-gradient-to-r ${glow} opacity-40`}
        aria-hidden
      />
      <p className="relative text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="relative mt-2 truncate font-mono text-3xl font-black tabular-nums text-white sm:text-4xl">{value}</p>
      <p className="relative mt-1 text-xs font-semibold text-slate-500">{suffix}</p>
    </div>
  );
}

function PodiumCard({
  entry,
  rank,
  placement,
}: {
  entry: (typeof demoData.leaderboard)[number];
  rank: 1 | 2 | 3;
  placement: "left" | "center" | "right";
}) {
  const isChamp = rank === 1;
  const medal = rank === 1 ? "🏆" : rank === 2 ? "🥈" : "🥉";
  const width = isChamp ? "sm:max-w-[min(34%,280px)] sm:flex-[1.15]" : "sm:max-w-[min(30%,220px)] sm:flex-1";
  const order =
    placement === "left" ? "order-2 sm:order-1" : placement === "center" ? "order-1 sm:order-2" : "order-3";

  return (
    <div
      className={`flex flex-col ${order} ${width} ${isChamp ? "z-10" : "z-0 opacity-95 sm:opacity-100"}`}
    >
      <div
        className={`relative flex flex-col items-center rounded-t-2xl border-x border-t px-4 pb-6 pt-8 text-center ${
          isChamp
            ? "min-h-[280px] border-amber-400/50 bg-gradient-to-b from-amber-500/25 via-slate-900 to-slate-950 shadow-[0_0_50px_rgba(251,191,36,0.2)] sm:min-h-[320px] sm:scale-[1.02] sm:pb-8 sm:pt-10"
            : "min-h-[220px] border-white/15 bg-gradient-to-b from-slate-800/80 to-slate-950 sm:min-h-[260px]"
        }`}
      >
        <span className="text-4xl sm:text-5xl" aria-hidden>
          {medal}
        </span>
        <p className="mt-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">#{rank}</p>
        <p className={`mt-1 font-black text-white ${isChamp ? "text-xl sm:text-2xl" : "text-lg"}`}>{entry.name}</p>
        <p className="mt-1 text-xs text-cyan-400/80">{entry.team}</p>
        <p className={`mt-auto font-mono font-black tabular-nums text-cyan-200 ${isChamp ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {entry.totalVolume.toLocaleString()}
        </p>
        <p className="text-[10px] font-semibold uppercase text-slate-500">vol · PR {entry.bestLift}</p>
      </div>
      <div
        className={`h-4 rounded-b-lg border-x border-b ${
          isChamp ? "border-amber-500/40 bg-gradient-to-r from-amber-600/50 to-amber-800/50" : "border-white/10 bg-slate-800"
        }`}
      />
    </div>
  );
}
