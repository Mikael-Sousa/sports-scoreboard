import React from 'react';
import { useRouter } from 'expo-router';
import { HomeScreen } from '../../screens/Home';

export default function HomeRoute() {
  const router = useRouter();

  return (
    <HomeScreen/>
  );
}
