import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { View } from "react-native";
import { COLORS } from '../../constants/colors';

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
    </View>
  );
}