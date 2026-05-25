import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
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
  disabled,
}: ScoreCardProps) {
  const { width } = useWindowDimensions();

  const isSmall = width < 360;

  return (
    <View style={[styles.card, isSmall && styles.cardSmall]}>
      <Text style={[styles.teamName, isSmall && styles.teamNameSmall]}>
        {teamName}
      </Text>

      <Text style={[styles.score, isSmall && styles.scoreSmall]}>
        {score}
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.btn, styles.btnDecrease, disabled && styles.disabled]}
          onPress={onDecrease}
          disabled={disabled}
        >
          <Text style={styles.btnText}>－</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnIncrease, disabled && styles.disabled]}
          onPress={onIncrease}
          disabled={disabled}
        >
          <Text style={styles.btnText}>＋</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.resetBtn, disabled && styles.disabled]}
        onPress={onReset}
        disabled={disabled}
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
    padding: 20,
    width: '100%',
    maxWidth: 220,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
    zIndex: 10,
  },

  cardSmall: {
    padding: 14,
    maxWidth: 180,
  },

  teamName: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },

  teamNameSmall: {
    fontSize: 12,
  },

  score: {
    color: COLORS.score,
    fontSize: 72, // menor que 96
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    lineHeight: 80,
  },

  scoreSmall: {
    fontSize: 56,
    lineHeight: 64,
  },

  controls: {
    flexDirection: 'row',
    gap: 12,
  },

  btn: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnIncrease: {
    backgroundColor: COLORS.primary,
  },

  btnDecrease: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  btnText: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },

  resetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  resetText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  disabled: {
    opacity: 0.35,
  },
});