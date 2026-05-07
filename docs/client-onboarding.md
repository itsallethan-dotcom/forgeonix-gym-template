# Client Onboarding

## 1) Branding

Edit `lib/client-config.ts`:
- gymName
- appName
- contactEmail
- footerText
- logoPath
- primaryCtaLabel
- demoCtaLabel
- copyrightText

## 2) Environment Setup

Copy `.env.example` to `.env.local` and provide:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3) Supabase Expectations

This template expects these tables/buckets to exist and align with app logic:
- profiles
- workouts
- teams
- team_members
- gyms
- avatars storage bucket

## 4) Verification

Validate key journeys:
- sign up -> log in -> complete profile
- log workouts, then edit and delete a workout
- create/join teams and gyms
- view leaderboard tabs (individual, teams, gyms)
