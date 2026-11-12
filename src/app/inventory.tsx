import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import ComponentCard from "@/components/ComponentCard";
import { Component, deleteComponent, getAllComponents } from "@/db/database";

export default function Inventory() {
  const router = useRouter();
  const [components, setComponents] = useState<Component[]>([]);

  const loadComponents = useCallback(() => {
    getAllComponents().then(setComponents);
  }, []);

  // Reload every time the screen comes back into view (after add/edit).
  useFocusEffect(loadComponents);

  async function removeComponent(id: number) {
    await deleteComponent(id);
    loadComponents();
  }

  function confirmDelete(item: Component) {
    const message = `Delete "${item.name}"? This cannot be undone.`;

    // Alert buttons are not supported on web: use the browser's confirm dialog.
    if (Platform.OS === "web") {
      if (window.confirm(message)) {
        removeComponent(item.id);
      }
      return;
    }

    Alert.alert("Delete part", message, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeComponent(item.id),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={components}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ComponentCard
            component={item}
            onEdit={() =>
              router.push({ pathname: "/form", params: { id: item.id } })
            }
            onDelete={() => confirmDelete(item)}
          />
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
  container: { flex: 1, padding: 16, backgroundColor: "#f1f5f9" },
});
