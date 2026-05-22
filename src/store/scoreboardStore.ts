import { create } from 'zustand';

interface ScoreboardStore {
  score1: number;
  score2: number;
  team1: string;
  team2: string;
  setScore1: (score: number) => void;
  setScore2: (score: number) => void;
  setTeam1: (name: string) => void;
  setTeam2: (name: string) => void;
}

export const useScoreboardStore = create<ScoreboardStore>((set) => ({
  score1: 0,
  score2: 0,
  team1: 'Time 1',
  team2: 'Time 2',
  setScore1: (score1) => set({ score1 }),
  setScore2: (score2) => set({ score2 }),
  setTeam1: (team1) => set({ team1 }),
  setTeam2: (team2) => set({ team2 }),
}));
