"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clientConfig } from "@/lib/client-config";
import { demoData } from "@/lib/demo-data";

export function PublicDemoPage() {
  const [canViewDashboard, setCanViewDashboard] = useState(false);

  useEffect(() => {
    const checkSessionSafely = async () => {
      try {
        const supabaseClientModule = await import("@/lib/supabase/client");
        const { data } = await supabaseClientModule.supabase.auth.getSession();
        setCanViewDashboard(Boolean(data.session?.user));
      } catch {
        setCanViewDashboard(false);
      }
    };

    void checkSessionSafely();
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8 text-slate-100 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src={clientConfig.logoPath} alt={`${clientConfig.appName} logo`} width={40} height={40} />
              <div>
                <p className="text-xs uppercase tracking-wider text-cyan-300">Public Demo</p>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {clientConfig.appName} - {clientConfig.gymName}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/signup"
                className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300"
              >
                {clientConfig.ctaLabels.signUp}
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-cyan-400/40 bg-slate-950 px-3 py-2 text-sm font-semibold text-cyan-300"
              >
                {clientConfig.ctaLabels.logIn}
              </Link>
              {canViewDashboard ? (
                <Link
                  href="/dashboard"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-semibold text-slate-200"
                >
                  {clientConfig.ctaLabels.viewDashboard}
                </Link>
              ) : null}
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Explore leaderboard rankings, teams, and recent workout activity with sample data.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Demo Leaderboard</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-2 py-2">Rank</th>
                  <th className="px-2 py-2">Athlete</th>
                  <th className="px-2 py-2">Team</th>
                  <th className="px-2 py-2">Total Volume</th>
                  <th className="px-2 py-2">Best Lift</th>
                  <th className="px-2 py-2">Streak</th>
                </tr>
              </thead>
              <tbody>
                {demoData.leaderboard.map((entry, index) => (
                  <tr key={entry.id} className="border-b border-slate-800">
                    <td className="px-2 py-2">#{index + 1}</td>
                    <td className="px-2 py-2">{entry.name}</td>
                    <td className="px-2 py-2">{entry.team}</td>
                    <td className="px-2 py-2">{entry.totalVolume.toLocaleString()}</td>
                    <td className="px-2 py-2">{entry.bestLift}</td>
                    <td className="px-2 py-2">{entry.streakDays} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold">Sample Teams</h2>
            <div className="mt-3 space-y-2">
              {demoData.teams.map((team) => (
                <div key={team.id} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <p className="font-semibold">{team.name}</p>
                  <p className="text-sm text-slate-300">Members: {team.members}</p>
                  <p className="text-sm text-slate-300">
                    Team Volume: {team.totalVolume.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold">Recent Sample Workouts</h2>
            <div className="mt-3 space-y-2">
              {demoData.recentWorkouts.map((entry) => (
                <div key={entry.id} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <p className="font-semibold">{entry.athlete}</p>
                  <p className="text-sm text-slate-300">
                    {entry.exercise} - {entry.weight} x {entry.reps} x {entry.sets}
                  </p>
                  <p className="text-xs text-slate-400">{entry.recordedAt}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
