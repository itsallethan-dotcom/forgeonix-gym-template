import type { Metadata } from "next";
import { LiveDemoTv } from "@/components/tv/live-demo-tv";
import { clientConfig } from "@/lib/client-config";

export const metadata: Metadata = {
  title: `TV — Arena | ${clientConfig.appName}`,
  description: "Fullscreen TV leaderboard — Arena theme (demo).",
};

export default function DemoArenaTvPage() {
  return <LiveDemoTv variant="arena" />;
}
