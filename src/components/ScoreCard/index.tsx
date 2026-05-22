import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface ScoreCardProps {
  teamName: string;
  score: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onReset: () => void;
  disabled?: boolean;
}

export function ScoreCard({
  teamName,
  score,
  onIncrease,
  onDecrease,
  onReset,
  disabled = false,
}: ScoreCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.teamName}>{teamName}</Text>
      <Text style={styles.score}>{score}</Text>
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.btn, styles.btnDecrease, disabled && styles.disabled]}
          onPress={onDecrease}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text style={styles.btnText}>－</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnIncrease, disabled && styles.disabled]}
          onPress={onIncrease}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text style={styles.btnText}>＋</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.resetBtn, disabled && styles.disabled]}
        onPress={onReset}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    minWidth: 180,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  teamName: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  score: {
    color: COLORS.score,
    fontSize: 96,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    lineHeight: 112,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    width: 52,
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIncrease: { backgroundColor: COLORS.primary },
  btnDecrease: { backgroundColor: COLORS.surfaceAlt, borderWidth: 1, borderColor: COLORS.border },
  btnText: { color: COLORS.textPrimary, fontSize: 22, fontWeight: '600' },
  resetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resetText: { color: COLORS.textSecondary, fontSize: 13 },
  disabled: { opacity: 0.35 },
});
