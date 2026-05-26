import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useScoreboard } from '../../hooks/useScoreboard';
import { ScoreCard } from '../../components/ScoreCard';
import { COLORS } from '../../constants/colors';

interface ScoreboardScreenProps {
  onGoHome: () => void;
  onGoSettings: () => void;
}

export function ScoreboardScreen({ onGoHome, onGoSettings }: ScoreboardScreenProps) {
  const {
    score1, score2, team1, team2, isConnected,
    increase1, decrease1, reset1,
    increase2, decrease2, reset2,
    resetBoth,
  } = useScoreboard();

  const handleResetBoth = () => {
    resetBoth();
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onGoHome}
          style={styles.backBtn}
        >
          <Text style={styles.backBtnText}>
            Voltar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onGoSettings}
          style={styles.settingsBtn}
        >
          <Text style={styles.backBtnText}>
            Configurações
          </Text>
        </TouchableOpacity>
      </View>


      <View style={styles.board}>
        <ScoreCard
          teamName={team1}
          score={score1}
          onIncrease={increase1}
          onDecrease={decrease1}
          onReset={reset1}
          disabled={false}
        />

        <View style={styles.center}>
          <Text style={styles.vs}>×</Text>
          <TouchableOpacity
            style={[styles.resetAllBtn, !isConnected && styles.disabled]}
            onPress={handleResetBoth}
            disabled={false}
            activeOpacity={0.7}
          >
            <Text style={styles.resetAllText}>Zerar tudo</Text>
          </TouchableOpacity>
        </View>

        <ScoreCard
          teamName={team2}
          score={score2}
          onIncrease={increase2}
          onDecrease={decrease2}
          onReset={reset2}
          disabled={!isConnected}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceAlt,
  },

  settingsBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceAlt,
  },

  backBtnText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  title: { color: COLORS.textPrimary, fontSize: 20, fontWeight: '700' },
  banner: {
    backgroundColor: '#1a1200',
    borderBottomWidth: 1,
    borderBottomColor: '#92400e',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bannerText: { color: COLORS.warning, fontSize: 13, textAlign: 'center' },
  setIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  setBox: {
    alignItems: 'center',
  },
  setLabel: { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
  setScore: { fontSize: 18, fontWeight: '700', marginTop: 4 },
  board: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    padding: 24,
  },
  center: { alignItems: 'center', gap: 16 },
  vs: { color: COLORS.textMuted, fontSize: 48, fontWeight: '300' },
  resetAllBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resetAllText: { color: COLORS.textSecondary, fontSize: 13 },
  disabled: { opacity: 0.35 },
});
