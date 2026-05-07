# Client Build Checklist

- Update `lib/client-config.ts` with client brand values.
- Add client assets under `public/branding/`.
- Confirm Supabase URL and anon key are set in runtime environment.
- Run `npm run lint`.
- Run `npm run build`.
- Smoke-test auth, profile completion, workouts, teams/gyms, and leaderboard tabs.
