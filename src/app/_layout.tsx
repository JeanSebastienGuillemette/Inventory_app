import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/constants/colors";

export default function RootLayout() {
  return (
    <>
      {/* Light icons on the dark green header. */}
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primaryDark },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Inventaire électronique" }}
        />
        <Stack.Screen name="about" options={{ title: "À propos" }} />
        <Stack.Screen name="inventory" options={{ title: "Inventaire" }} />
        <Stack.Screen name="form" options={{ title: "Ajouter une pièce" }} />
      </Stack>
    </>
  );
}
