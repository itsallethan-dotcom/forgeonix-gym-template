import type { Metadata } from "next";
import { LiveDemoTv } from "@/components/tv/live-demo-tv";
import { clientConfig } from "@/lib/client-config";

export const metadata: Metadata = {
  title: `TV — Impact | ${clientConfig.appName}`,
  description: "Fullscreen TV leaderboard — Impact theme (demo).",
};

export default function DemoImpactTvPage() {
  return <LiveDemoTv variant="impact" />;
}
