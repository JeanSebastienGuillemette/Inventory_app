import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Component, deleteComponent, getAllComponents } from "@/db/database";

export default function Inventory() {
  const router = useRouter();
  const [components, setComponents] = useState<Component[]>([]);

  const loadComponents = useCallback(() => {
    getAllComponents().then(setComponents);
  }, []);

  // Reload every time the screen comes back into view (after add/edit).
  useFocusEffect(loadComponents);

  function confirmDelete(item: Component) {
    Alert.alert(
      "Delete part",
      `Delete "${item.name}"? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteComponent(item.id);
            loadComponents();
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={components}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {item.name} ({item.quantity}) - {item.price.toFixed(2)} $
            </Text>
            <Pressable
              onPress={() =>
                router.push({ pathname: "/form", params: { id: item.id } })
              }
            >
              <Text>Edit</Text>
            </Pressable>
            <Pressable onPress={() => confirmDelete(item)}>
              <Text>Delete</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>No parts yet.</Text>}
      />
      <Pressable onPress={() => router.push("/form")}>
        <Text>Add part</Text>
      </Pressable>
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { flex: 1 },
});
