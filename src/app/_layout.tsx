import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Electronics Inventory" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
      <Stack.Screen name="inventory" options={{ title: "Inventory" }} />
      <Stack.Screen name="form" options={{ title: "Add part" }} />
    </Stack>
  );
}
