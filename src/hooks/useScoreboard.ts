import { useCallback } from 'react';
import { useScoreboardStore } from '../store/scoreboardStore';
import { useBluetooth } from './useBluetooth';
import { COMMANDS } from '../constants/commands';

export function useScoreboard() {
  const { score1, score2, team1, team2, setScore1, setScore2} =
    useScoreboardStore();
  const { send, status } = useBluetooth();

  const isConnected = status === 'connected';

  const increase1 = useCallback(async () => {
    await send(COMMANDS.INCREASE_1);
    setScore1(score1 === 99 ? 0 : score1 + 1);
  }, [score1, send]);

  const decrease1 = useCallback(async () => {
    await send(COMMANDS.DECREASE_1);
    setScore1(score1 === 0 ? 0 : score1 - 1);
  }, [score1, send]);

  const reset1 = useCallback(async () => {
    await send(COMMANDS.RESET_1);
    setScore1(0);
  }, [send]);

  const increase2 = useCallback(async () => {
    await send(COMMANDS.INCREASE_2);
    setScore2(score2 === 99 ? 0 : score2 + 1);
  }, [score2, send]);

  const decrease2 = useCallback(async () => {
    await send(COMMANDS.DECREASE_2);
    setScore2(score2 === 0 ? 0 : score2 - 1);
  }, [score2, send]);

  const reset2 = useCallback(async () => {
    await send(COMMANDS.RESET_2);
    setScore2(0);
  }, [send]);

  const resetBoth = useCallback(async () => {
    await send(COMMANDS.RESET_ALL);
    setScore1(0);
    setScore2(0);
  }, [send]);

  return {
    score1,
    score2,
    team1,
    team2,
    isConnected,
    increase1,
    decrease1,
    reset1,
    increase2,
    decrease2,
    reset2,
    resetBoth,
  };
}
