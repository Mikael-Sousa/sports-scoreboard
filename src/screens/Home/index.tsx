import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { Button } from '../../components/Button';
import { COLORS } from '../../constants/colors';
import { Footer } from '@/components/Footer';
import { useBluetooth } from '../../hooks/useBluetooth';

export function HomeScreen() {
  const { status, error, scan } = useBluetooth();
  const isConnected = status === 'connected';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sports Scoreboard
      </Text>

      <View style={styles.actions}>
        <Button
          label="Abrir Placar"
          onPress={() => router.push('/scoreboard')}
          variant="ghost"
        />
      </View>

      <Text style={styles.statusText}>
        {error ?? (isConnected ? 'HC-06 conectado' : 'Bluetooth não conectado')}
      </Text>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 32,
  },
  title: { color: COLORS.textPrimary, fontSize: 28, fontWeight: '700' },
  subtitle: { color: COLORS.textSecondary, fontSize: 15, marginBottom: 8 },
  actions: { gap: 12, alignItems: 'center' },
  statusText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
