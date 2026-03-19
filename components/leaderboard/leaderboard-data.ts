export const leaderboardPointsKey = "next-cyber-camp-points";
export const leaderboardUserKey = "next-cyber-camp-current-user";
export const leaderboardEventName = "leaderboard-points-updated";

export const pointsRules = {
  lesson: 10,
  course: 100,
  achievement: 50,
} as const;

export interface LeaderboardUserSeed {
  id: string;
  name: string;
  points: number;
}

export interface LeaderboardUser extends LeaderboardUserSeed {
  rank: number;
  isCurrentUser: boolean;
}

export const leaderboardSeedUsers: LeaderboardUserSeed[] = [
  { id: "shadow-byte", name: "ShadowByte", points: 1820 },
  { id: "cipher-ops", name: "CipherOps", points: 1710 },
  { id: "zero-day", name: "ZeroDayFox", points: 1590 },
  { id: "packet-ninja", name: "PacketNinja", points: 1440 },
  { id: "root-trace", name: "RootTrace", points: 1320 },
  { id: "current-user", name: "You", points: 980 },
  { id: "kernel-ghost", name: "KernelGhost", points: 910 },
  { id: "phish-hunter", name: "PhishHunter", points: 840 },
];
