import type { Metadata } from "next";
import { ImpactPublicDemoPage } from "@/components/themes/impact/demo-page";
import { clientConfig } from "@/lib/client-config";

export const metadata: Metadata = {
  title: `Impact Demo | ${clientConfig.appName}`,
  description: "High-energy gym leaderboard preview — Impact theme.",
};

export default function DemoImpactPage() {
  return <ImpactPublicDemoPage />;
}
