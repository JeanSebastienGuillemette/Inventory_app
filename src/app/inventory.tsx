import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Inventory() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>No parts yet.</Text>
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
