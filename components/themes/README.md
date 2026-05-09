# Theme demos

- **classic** — Default public demo (`/`, `/demo`). Slate/cyan table layout.
- **impact** — Alternate gym scoreboard look (`/demo/impact`). Podium hero, loud stats.
- **arena** — Premium TV / esports showcase (`/demo/arena`). Glowing hero, podium, challenge panel, live feed.

**Demo hub:** `/demo/options` — cards for every layout + TV mode, package teaser, and custom-build CTA.

**TV display (fullscreen demo, no auth UI):** `/demo/tv`, `/demo/impact/tv`, `/demo/arena/tv` — shared `components/tv/live-demo-tv.tsx`, same `demoData`, rotating leaderboard / teams / activity.

Shared data: `lib/demo-data.ts`. App shell layout for logged-in routes stays in `components/app-shell.tsx` and `components/layouts/classic/`.
