import type { Metadata } from "next";
import { ArenaPublicDemoPage } from "@/components/themes/arena/arena-demo";
import { clientConfig } from "@/lib/client-config";

export const metadata: Metadata = {
  title: `Arena Showcase | ${clientConfig.appName}`,
  description: "Premium full-screen gym competition board — Arena theme demo.",
};

export default function DemoArenaPage() {
  return <ArenaPublicDemoPage />;
}
