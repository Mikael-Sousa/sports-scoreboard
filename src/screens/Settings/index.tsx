import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useScoreboardStore } from '../../store/scoreboardStore';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { COLORS } from '../../constants/colors';
import { useRouter } from 'expo-router';

export function SettingsScreen() {
  const router = useRouter();
  const { team1, team2, setTeam1, setTeam2 } = useScoreboardStore();
  const [t1, setT1] = useState(team1);
  const [t2, setT2] = useState(team2);

  const save = () => {
    if (t1.trim()) setTeam1(t1.trim());
    if (t2.trim()) setTeam2(t2.trim());
    router.push('/scoreboard');
  };

  return (
    <View style={styles.container}>
      <Header title="Configurações" />
      <View style={styles.content}>
        <Text style={styles.label}>Nome do Time 1</Text>
        <TextInput
          style={styles.input}
          value={t1}
          onChangeText={setT1}
          placeholder="Time 1"
          placeholderTextColor={COLORS.textMuted}
          maxLength={20}
        />
        <Text style={styles.label}>Nome do Time 2</Text>
        <TextInput
          style={styles.input}
          value={t2}
          onChangeText={setT2}
          placeholder="Time 2"
          placeholderTextColor={COLORS.textMuted}
          maxLength={20}
        />
        <Button label="Salvar" onPress={save} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, gap: 12 },
  label:  { color: COLORS.textSecondary, fontSize: 13, fontWeight: '500' },
  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 8,
  },
});
