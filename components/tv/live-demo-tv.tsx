"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { DemoWatermark } from "@/components/demo/demo-watermark";
import { clientConfig } from "@/lib/client-config";
import { demoData } from "@/lib/demo-data";

export type DemoTvVariant = "classic" | "impact" | "arena";

const ROTATION_MS = 8000;
const SLIDE_COUNT = 3;

const themeShell: Record<
  DemoTvVariant,
  { bg: string; accent: string; accentSoft: string; border: string; liveBadge: string }
> = {
  classic: {
    bg: "bg-gray-950",
    accent: "text-cyan-300",
    accentSoft: "text-cyan-400/80",
    border: "border-slate-700/80",
    liveBadge: "border-cyan-500/40 bg-cyan-950/60 text-cyan-200",
  },
  impact: {
    bg: "bg-[#0c0a09]",
    accent: "text-orange-300",
    accentSoft: "text-orange-200/90",
    border: "border-orange-900/50",
    liveBadge: "border-orange-500/40 bg-orange-950/50 text-orange-100",
  },
  arena: {
    bg: "bg-[#030712]",
    accent: "text-cyan-200",
    accentSoft: "text-fuchsia-300/90",
    border: "border-cyan-900/40",
    liveBadge: "border-fuchsia-500/40 bg-fuchsia-950/40 text-fuchsia-100",
  },
};

export function LiveDemoTv({ variant }: { variant: DemoTvVariant }) {
  const t = themeShell[variant];
  const [slide, setSlide] = useState(0);
  const sortedTeams = useMemo(
    () => [...demoData.teams].sort((a, b) => b.totalVolume - a.totalVolume),
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % SLIDE_COUNT);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, []);

  const dotActive =
    variant === "classic" ? "bg-cyan-400" : variant === "impact" ? "bg-orange-400" : "bg-fuchsia-400";
  const liveDot =
    variant === "classic" ? "bg-cyan-400" : variant === "impact" ? "bg-orange-500" : "bg-fuchsia-400";

  return (
    <main
      className={`relative flex min-h-[100dvh] flex-col ${t.bg} px-6 py-8 pb-20 text-white sm:px-10 sm:py-10 sm:pb-24 md:px-14 md:py-12`}
    >
      {/* Branding + LIVE + challenge — compact header for TV */}
      <header className={`flex flex-shrink-0 flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between ${t.border}`}>
        <div className="flex items-center gap-5 md:gap-8">
          <div className={`rounded-2xl border p-3 md:p-4 ${t.border} bg-black/30`}>
            <Image
              src={clientConfig.logoPath}
              alt=""
              width={80}
              height={80}
              className="size-16 md:size-20"
              priority
            />
          </div>
          <div>
            <p className={`text-xl font-black uppercase tracking-tight md:text-3xl lg:text-4xl`}>
              {clientConfig.gymName}
            </p>
            <p className={`mt-1 text-lg font-bold md:text-2xl ${t.accentSoft}`}>{clientConfig.appName}</p>
            <p className={`mt-3 text-base font-semibold md:text-xl ${t.accent}`}>
              {demoData.challenge.title}
            </p>
            <p className="mt-1 text-sm text-slate-400 md:text-lg">{demoData.challenge.endsInLabel}</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <div
            className={`inline-flex items-center gap-3 rounded-xl border px-4 py-2 md:px-5 md:py-3 ${t.liveBadge}`}
          >
            <span className={`arena-live-dot size-3 rounded-full md:size-4 ${liveDot}`} aria-hidden />
            <span className="text-lg font-black uppercase tracking-widest md:text-2xl">Live</span>
          </div>
          <p className="text-base text-slate-400 md:text-xl">Last updated just now</p>
        </div>
      </header>

      {/* Main rotating area */}
      <div className="flex flex-1 flex-col py-8 md:py-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className={`text-lg font-black uppercase tracking-[0.2em] md:text-2xl ${t.accent}`}>
            {slide === 0 ? "Leaderboard" : slide === 1 ? "Team standings" : "Recent activity"}
          </h2>
          <div className="flex gap-2" aria-hidden>
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full md:h-4 md:w-4 ${i === slide ? dotActive : "bg-slate-600"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          {slide === 0 ? <TvLeaderboard variant={variant} /> : null}
          {slide === 1 ? <TvTeams variant={variant} sortedTeams={sortedTeams} /> : null}
          {slide === 2 ? <TvActivity variant={variant} /> : null}
        </div>
      </div>

      <footer className={`mt-auto border-t pt-6 text-center text-base text-slate-500 md:text-lg ${t.border}`}>
        <p>{clientConfig.footerText}</p>
      </footer>
      <DemoWatermark />
    </main>
  );
}

function TvLeaderboard({ variant }: { variant: DemoTvVariant }) {
  const topStyle =
    variant === "classic"
      ? "border-l-8 border-cyan-400 bg-cyan-950/25"
      : variant === "impact"
        ? "border-l-8 border-orange-400 bg-orange-950/20"
        : "border-l-8 border-fuchsia-400 bg-fuchsia-950/15";

  return (
    <div className="space-y-3 md:space-y-4">
      {demoData.leaderboard.map((row, i) => {
        const isTop = i < 3;
        return (
          <div
            key={row.id}
            className={`flex flex-wrap items-baseline justify-between gap-4 rounded-2xl border border-white/10 px-5 py-4 md:px-8 md:py-6 ${
              isTop ? topStyle : "bg-black/20"
            }`}
          >
            <div className="flex min-w-0 flex-1 items-baseline gap-4 md:gap-8">
              <span className="text-4xl font-black tabular-nums text-slate-500 md:text-6xl lg:text-7xl">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate text-2xl font-black md:text-4xl lg:text-5xl">{row.name}</p>
                <p className="mt-1 text-lg text-slate-400 md:text-2xl">{row.team}</p>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-end justify-between gap-6 sm:w-auto sm:flex-col sm:items-end">
              <div className="text-right">
                <p className="text-xs font-bold uppercase text-slate-500 md:text-sm">Volume</p>
                <p className="font-mono text-3xl font-black tabular-nums md:text-5xl lg:text-6xl">
                  {row.totalVolume.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase text-slate-500 md:text-sm">Best</p>
                <p className="font-mono text-2xl font-black tabular-nums md:text-4xl">{row.bestLift}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase text-slate-500 md:text-sm">Streak</p>
                <p className="text-2xl font-black md:text-4xl">{row.streakDays}d</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TvTeams({
  variant,
  sortedTeams,
}: {
  variant: DemoTvVariant;
  sortedTeams: { id: string; name: string; members: number; totalVolume: number }[];
}) {
  const bar =
    variant === "classic"
      ? "from-cyan-600 to-cyan-400"
      : variant === "impact"
        ? "from-orange-600 to-amber-400"
        : "from-fuchsia-600 to-cyan-400";
  const maxVol = sortedTeams[0]?.totalVolume ?? 1;

  return (
    <div className="grid gap-6 md:grid-cols-3 md:gap-8">
      {sortedTeams.map((team, i) => {
        const pct = Math.round((team.totalVolume / maxVol) * 100);
        return (
          <div
            key={team.id}
            className="flex flex-col rounded-2xl border border-white/10 bg-black/25 p-6 md:p-8"
          >
            <p className="text-sm font-black uppercase text-slate-500 md:text-lg">#{i + 1}</p>
            <p className="mt-2 text-2xl font-black md:text-4xl lg:text-5xl">{team.name}</p>
            <p className="mt-4 font-mono text-4xl font-black tabular-nums md:text-6xl lg:text-7xl">
              {team.totalVolume.toLocaleString()}
            </p>
            <p className="mt-2 text-lg text-slate-400 md:text-xl">{team.members} lifters</p>
            <div className="mt-6 h-4 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${bar}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TvActivity({ variant }: { variant: DemoTvVariant }) {
  const prBorder =
    variant === "classic"
      ? "border-cyan-500/50"
      : variant === "impact"
        ? "border-orange-500/50"
        : "border-fuchsia-500/50";

  return (
    <div className="space-y-4 md:space-y-6">
      {demoData.recentWorkouts.map((w) => (
        <div
          key={w.id}
          className={`rounded-2xl border bg-black/30 px-6 py-5 md:px-10 md:py-8 ${w.isPR ? `border-2 ${prBorder}` : "border-white/10"}`}
        >
          {w.isPR ? (
            <p className="mb-2 inline-block rounded-lg bg-amber-500/20 px-3 py-1 text-sm font-black uppercase tracking-wider text-amber-200 md:text-lg">
              New PR
            </p>
          ) : null}
          <p className="text-2xl font-black md:text-4xl lg:text-5xl">{w.athlete}</p>
          <p className="mt-2 text-xl text-slate-300 md:text-3xl">
            {w.exercise} · {w.weight} × {w.reps} × {w.sets}
          </p>
          {w.prNote ? <p className="mt-3 text-lg font-bold text-amber-300 md:text-2xl">{w.prNote}</p> : null}
          <p className="mt-4 text-base text-slate-500 md:text-xl">{w.recordedAt}</p>
        </div>
      ))}
    </div>
  );
}
