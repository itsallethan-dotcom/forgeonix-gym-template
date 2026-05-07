export type DemoLeaderboardEntry = {
  id: string;
  name: string;
  team: string;
  totalVolume: number;
  bestLift: number;
  streakDays: number;
};

export type DemoTeam = {
  id: string;
  name: string;
  members: number;
  totalVolume: number;
};

export type DemoWorkout = {
  id: string;
  athlete: string;
  exercise: string;
  weight: number;
  reps: number;
  sets: number;
  recordedAt: string;
};

export const demoData = {
  users: [
    { id: "u1", name: "Ava Carter" },
    { id: "u2", name: "Maya Brooks" },
    { id: "u3", name: "Sam Nguyen" },
    { id: "u4", name: "Liam Patel" },
  ],
  leaderboard: [
    {
      id: "u1",
      name: "Ava Carter",
      team: "Barbell Crew",
      totalVolume: 52340,
      bestLift: 315,
      streakDays: 12,
    },
    {
      id: "u2",
      name: "Maya Brooks",
      team: "Iron Pulse",
      totalVolume: 49720,
      bestLift: 335,
      streakDays: 9,
    },
    {
      id: "u3",
      name: "Sam Nguyen",
      team: "Barbell Crew",
      totalVolume: 48110,
      bestLift: 295,
      streakDays: 15,
    },
    {
      id: "u4",
      name: "Liam Patel",
      team: "Plate Chasers",
      totalVolume: 46980,
      bestLift: 305,
      streakDays: 7,
    },
  ] as DemoLeaderboardEntry[],
  teams: [
    { id: "t1", name: "Barbell Crew", members: 8, totalVolume: 168440 },
    { id: "t2", name: "Iron Pulse", members: 6, totalVolume: 132900 },
    { id: "t3", name: "Plate Chasers", members: 5, totalVolume: 117380 },
  ] as DemoTeam[],
  recentWorkouts: [
    {
      id: "w1",
      athlete: "Ava Carter",
      exercise: "Back Squat",
      weight: 225,
      reps: 8,
      sets: 4,
      recordedAt: "Today, 7:42 AM",
    },
    {
      id: "w2",
      athlete: "Maya Brooks",
      exercise: "Deadlift",
      weight: 275,
      reps: 5,
      sets: 5,
      recordedAt: "Today, 6:58 AM",
    },
    {
      id: "w3",
      athlete: "Sam Nguyen",
      exercise: "Bench Press",
      weight: 185,
      reps: 6,
      sets: 4,
      recordedAt: "Yesterday, 5:31 PM",
    },
  ] as DemoWorkout[],
} as const;
