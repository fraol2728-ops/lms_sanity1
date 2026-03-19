import {
  leaderboardEventName,
  leaderboardPointsKey,
  leaderboardSeedUsers,
  leaderboardUserKey,
  pointsRules,
} from "@/components/leaderboard/leaderboard-data";

interface StoredLeaderboardState {
  userId: string;
  userName: string;
  lessonCount: number;
  courseCount: number;
  achievementCount: number;
  bonusPoints: number;
}

const defaultState: StoredLeaderboardState = {
  userId: "current-user",
  userName: "You",
  lessonCount: 6,
  courseCount: 2,
  achievementCount: 4,
  bonusPoints: 0,
};

function isStoredState(value: unknown): value is StoredLeaderboardState {
  return !!value && typeof value === "object";
}

export function getStoredLeaderboardState(): StoredLeaderboardState {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const raw = window.localStorage.getItem(leaderboardPointsKey);
  if (!raw) {
    window.localStorage.setItem(
      leaderboardPointsKey,
      JSON.stringify(defaultState),
    );
    return defaultState;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isStoredState(parsed)) {
      return defaultState;
    }

    return {
      userId:
        typeof parsed.userId === "string" ? parsed.userId : defaultState.userId,
      userName:
        typeof parsed.userName === "string"
          ? parsed.userName
          : defaultState.userName,
      lessonCount:
        typeof parsed.lessonCount === "number"
          ? parsed.lessonCount
          : defaultState.lessonCount,
      courseCount:
        typeof parsed.courseCount === "number"
          ? parsed.courseCount
          : defaultState.courseCount,
      achievementCount:
        typeof parsed.achievementCount === "number"
          ? parsed.achievementCount
          : defaultState.achievementCount,
      bonusPoints:
        typeof parsed.bonusPoints === "number" ? parsed.bonusPoints : 0,
    };
  } catch {
    return defaultState;
  }
}

export function computePoints(state: StoredLeaderboardState) {
  return (
    state.lessonCount * pointsRules.lesson +
    state.courseCount * pointsRules.course +
    state.achievementCount * pointsRules.achievement +
    state.bonusPoints
  );
}

function persistStoredLeaderboardState(nextState: StoredLeaderboardState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(leaderboardPointsKey, JSON.stringify(nextState));
  window.localStorage.setItem(
    leaderboardUserKey,
    JSON.stringify({ id: nextState.userId, name: nextState.userName }),
  );
}

export function saveStoredLeaderboardState(nextState: StoredLeaderboardState) {
  persistStoredLeaderboardState(nextState);

  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(leaderboardEventName, { detail: nextState }),
  );
}

export function buildLeaderboard(currentUser?: {
  id?: string | null;
  name?: string | null;
}) {
  const state = getStoredLeaderboardState();
  const userId = currentUser?.id ?? state.userId;
  const userName = currentUser?.name ?? state.userName;
  const currentUserPoints = computePoints({ ...state, userId, userName });

  const users = leaderboardSeedUsers
    .filter((user) => user.id !== state.userId && user.id !== userId)
    .concat({
      id: userId,
      name: userName,
      points: currentUserPoints,
    })
    .sort((left, right) => right.points - left.points)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
      isCurrentUser: user.id === userId,
    }));

  persistStoredLeaderboardState({ ...state, userId, userName });

  return {
    users,
    state: {
      ...state,
      userId,
      userName,
      totalPoints: currentUserPoints,
    },
  };
}
