import type { Metadata } from "next";
import { PublicDemoPage } from "@/components/public-demo-page";
import { clientConfig } from "@/lib/client-config";

export const metadata: Metadata = {
  title: `Live Leaderboard Demo | ${clientConfig.appName}`,
  description: "Public demo of the workout leaderboard template.",
};

export default function DemoPage() {
  return <PublicDemoPage />;
}
