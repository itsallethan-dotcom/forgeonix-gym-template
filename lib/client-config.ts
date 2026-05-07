export const clientConfig = {
  gymName: "Demo Gym",
  appName: "Liftboard",
  contactEmail: "owner@example.com",
  logoPath: "/branding/logo-placeholder.svg",
  primaryCtaLabel: "Open Leaderboard",
  demoCtaLabel: "Try Demo",
  ctaLabels: {
    signUp: "Sign Up",
    logIn: "Log In",
    viewDashboard: "View Dashboard",
  },
  footerText: "© 2026 Demo Gym. Powered by Forgeonix.",
  copyrightText: "© 2026 Demo Gym",
} as const;

export type ClientConfig = typeof clientConfig;
