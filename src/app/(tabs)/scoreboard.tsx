import React from 'react';
import { ScoreboardScreen } from '../../screens/Scoreboard';
import { useRouter } from 'expo-router';

export default function ScoreboardRoute() {
  const router = useRouter();

  return (
    <ScoreboardScreen
      onGoHome={() => router.push('/')}
      onGoSettings={() => router.push('/settings')}
    />
  );
}