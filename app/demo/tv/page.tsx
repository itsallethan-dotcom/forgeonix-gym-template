import type { Metadata } from "next";
import { LiveDemoTv } from "@/components/tv/live-demo-tv";
import { clientConfig } from "@/lib/client-config";

export const metadata: Metadata = {
  title: `TV — Classic | ${clientConfig.appName}`,
  description: "Fullscreen TV leaderboard — Classic theme (demo).",
};

export default function DemoClassicTvPage() {
  return <LiveDemoTv variant="classic" />;
}
