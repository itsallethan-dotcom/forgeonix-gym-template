"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { clientConfig } from "@/lib/client-config";
import { demoData } from "@/lib/demo-data";
import { useCanViewDashboard } from "@/hooks/use-can-view-dashboard";

/** Bold gym scoreboard aesthetic — podium, hero stats, activity + team preview. */
export function ImpactPublicDemoPage() {
  const canViewDashboard = useCanViewDashboard();

  const top3 = useMemo(() => demoData.leaderboard.slice(0, 3), []);
  /** Podium: desktop L–R is 2nd | 1st | 3rd; mobile stacks 1st → 2nd → 3rd */
  const podium = useMemo(() => {
    const [first, second, third] = top3;
    if (!first || !second || !third) return [];
    return [
      { entry: second, rank: 2 as const, medal: "2", orderMobile: "order-2", orderDesktop: "sm:order-1" },
      { entry: first, rank: 1 as const, medal: "1", orderMobile: "order-1", orderDesktop: "sm:order-2" },
      { entry: third, rank: 3 as const, medal: "3", orderMobile: "order-3", orderDesktop: "sm:order-3" },
    ];
  }, [top3]);

  const totals = useMemo(() => {
    const combinedVolume = demoData.leaderboard.reduce((acc, row) => acc + row.totalVolume, 0);
    const sortedTeams = [...demoData.teams].sort((a, b) => b.totalVolume - a.totalVolume);
    return {
      combinedVolume,
      athleteCount: demoData.users.length,
      leadingTeam: sortedTeams[0],
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0c0a09] px-4 py-6 pb-10 text-stone-100 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Hero — scoreboard header */}
        <section className="relative overflow-hidden rounded-2xl border border-orange-500/25 bg-gradient-to-br from-zinc-950 via-[#1a1008] to-zinc-950 p-6 shadow-[0_0_40px_rgba(249,115,22,0.12)] sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(251,146,60,0.06)_50%,transparent_60%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-orange-500/30 bg-black/40 p-2 shadow-inner">
                <Image
                  src={clientConfig.logoPath}
                  alt={`${clientConfig.appName} logo`}
                  width={56}
                  height={56}
                  className="size-14"
                />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">
                  Live challenge board
                </p>
                <h1 className="mt-1 font-black uppercase tracking-tight text-3xl text-white drop-shadow-sm sm:text-4xl md:text-5xl">
                  {clientConfig.gymName}
                </h1>
                <p className="mt-2 text-lg font-semibold text-orange-200/90">{clientConfig.appName}</p>
                <p className="mt-3 max-w-xl text-sm text-stone-400">
                  Demo mode — rankings update from real workouts once members log in.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/demo"
                className="rounded-lg border border-stone-600 bg-stone-900 px-4 py-2.5 text-sm font-bold text-stone-200"
              >
                View Classic Demo
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-orange-900/40"
              >
                {clientConfig.ctaLabels.signUp}
              </Link>
              <Link
                href="/login"
                className="rounded-lg border-2 border-orange-400/60 bg-black/50 px-4 py-2.5 text-sm font-bold text-orange-100"
              >
                {clientConfig.ctaLabels.logIn}
              </Link>
              {canViewDashboard ? (
                <Link
                  href="/dashboard"
                  className="rounded-lg border border-emerald-500/50 bg-emerald-950/50 px-4 py-2.5 text-sm font-bold text-emerald-300"
                >
                  {clientConfig.ctaLabels.viewDashboard}
                </Link>
              ) : null}
            </div>
          </div>

          {/* Big stats */}
          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-5 text-center backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Athletes</p>
              <p className="mt-2 text-4xl font-black tabular-nums text-white sm:text-5xl">
                {totals.athleteCount}
              </p>
            </div>
            <div className="rounded-xl border border-orange-500/35 bg-orange-950/30 px-4 py-5 text-center shadow-inner">
              <p className="text-[10px] font-bold uppercase tracking-widest text-orange-300/80">
                Combined volume (lbs)
              </p>
              <p className="mt-2 text-4xl font-black tabular-nums text-orange-100 sm:text-5xl">
                {totals.combinedVolume.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-5 text-center backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Top team</p>
              <p className="mt-2 truncate text-xl font-black text-amber-200 sm:text-2xl">
                {totals.leadingTeam?.name ?? "—"}
              </p>
              <p className="mt-1 text-xs text-stone-400">
                {totals.leadingTeam ? `${totals.leadingTeam.totalVolume.toLocaleString()} vol` : ""}
              </p>
            </div>
          </div>
        </section>

        {/* Podium */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-orange-400">
            <span className="h-1 w-6 rounded-full bg-orange-500" />
            Podium
          </h2>
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-end sm:gap-3">
            {podium.map(({ entry, rank, medal, orderMobile, orderDesktop }) => {
              const heightClass =
                rank === 1
                  ? `min-h-[220px] sm:min-h-[280px] ${orderMobile} ${orderDesktop}`
                  : `min-h-[160px] sm:min-h-[200px] ${orderMobile} ${orderDesktop}`;
              const rankStyle =
                rank === 1
                  ? "border-amber-400/50 bg-gradient-to-b from-amber-900/40 to-zinc-950 ring-2 ring-amber-500/30"
                  : rank === 2
                    ? "border-stone-500/40 bg-zinc-900/80"
                    : "border-amber-900/40 bg-zinc-900/60";
              return (
                <div
                  key={entry.id}
                  className={`flex flex-1 flex-col rounded-2xl border p-4 shadow-xl ${heightClass} ${rankStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-black text-white/20">{medal}</span>
                    <span className="rounded-full bg-black/50 px-2 py-0.5 text-xs font-bold text-orange-300">
                      #{rank}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-black text-white">{entry.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{entry.team}</p>
                  <div className="mt-auto pt-4">
                    <p className="text-2xl font-black tabular-nums text-orange-200">
                      {entry.totalVolume.toLocaleString()}
                    </p>
                    <p className="text-xs text-stone-400">volume · best {entry.bestLift} lb</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Recent activity — TV-friendly feed */}
          <section className="lg:col-span-2">
            <h2 className="mb-3 text-sm font-black uppercase tracking-[0.15em] text-orange-400">
              Recent lifts
            </h2>
            <ul className="space-y-2">
              {demoData.recentWorkouts.map((w) => (
                <li
                  key={w.id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-3"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-600/20 text-lg">
                    🔥
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-white">{w.athlete}</p>
                    <p className="truncate text-sm text-stone-400">
                      {w.exercise} · {w.weight}×{w.reps}×{w.sets}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-semibold uppercase text-stone-500">{w.recordedAt}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Full table + team preview */}
          <section className="space-y-6 lg:col-span-3">
            <div>
              <h2 className="mb-3 text-sm font-black uppercase tracking-[0.15em] text-orange-400">
                Full standings
              </h2>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/50">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/30 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      <th className="px-3 py-3">#</th>
                      <th className="px-3 py-3">Athlete</th>
                      <th className="px-3 py-3">Vol</th>
                      <th className="hidden px-3 py-3 sm:table-cell">PR</th>
                      <th className="hidden px-3 py-3 md:table-cell">Streak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoData.leaderboard.map((row, i) => (
                      <tr key={row.id} className="border-b border-white/5 last:border-0">
                        <td className="px-3 py-3 font-black text-orange-400/90">{i + 1}</td>
                        <td className="px-3 py-3 font-semibold text-white">{row.name}</td>
                        <td className="px-3 py-3 tabular-nums text-stone-300">{row.totalVolume.toLocaleString()}</td>
                        <td className="hidden px-3 py-3 tabular-nums text-stone-400 sm:table-cell">{row.bestLift}</td>
                        <td className="hidden px-3 py-3 text-stone-500 md:table-cell">{row.streakDays}d</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-black uppercase tracking-[0.15em] text-orange-400">Team board</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {[...demoData.teams]
                  .sort((a, b) => b.totalVolume - a.totalVolume)
                  .map((team, i) => (
                    <div
                      key={team.id}
                      className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-zinc-900 to-black px-4 py-4"
                    >
                      <p className="text-[10px] font-bold uppercase text-stone-500">Rank {i + 1}</p>
                      <p className="mt-1 font-black text-white">{team.name}</p>
                      <p className="mt-2 text-2xl font-black tabular-nums text-orange-200">
                        {team.totalVolume.toLocaleString()}
                      </p>
                      <p className="text-xs text-stone-500">{team.members} members</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>

        <footer className="flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center">
          <p>{clientConfig.footerText}</p>
          <a href={`mailto:${clientConfig.contactEmail}`} className="font-semibold text-orange-400 hover:text-orange-300">
            {clientConfig.contactEmail}
          </a>
        </footer>
      </div>
    </main>
  );
}
