import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '../../components/Button';
import { COLORS } from '../../constants/colors';
import { Footer } from '@/components/Footer';
import { useBluetooth } from '../../hooks/useBluetooth';

export function HomeScreen() {
  const { status, error, scan, disconnect } = useBluetooth();
  const isConnected = status === 'connected';
  const isBusy = status === 'connecting' || status === 'scanning';

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Ionicons name="trophy-outline" size={36} color={COLORS.primary} />
        <Text style={styles.title}>Sports Scoreboard</Text>
        <Ionicons name="trophy-outline" size={36} color={COLORS.primary} />
      </View>

      <Text style={styles.subtitle}>
        Conecte ao HC-06 e controle seu placar em tempo real.
      </Text>

      <View style={styles.actions}>
        <Button
          label={isConnected ? 'Desconectar' : isBusy ? 'Conectando...' : 'Conectar'}
          onPress={isConnected ? disconnect : scan}
          variant={isConnected ? 'danger' : 'primary'}
          disabled={isBusy}
        />

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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    textShadowColor: 'rgba(59, 130, 246, 0.35)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  actions: { gap: 12, alignItems: 'center' },
  statusText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
