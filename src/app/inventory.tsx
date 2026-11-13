import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import ComponentCard from "@/components/ComponentCard";
import Screen from "@/components/Screen";
import { colors } from "@/constants/colors";
import { Component, deleteComponent, getAllComponents } from "@/db/database";

export default function Inventory() {
  const router = useRouter();
  const [components, setComponents] = useState<Component[]>([]);

  const loadComponents = useCallback(() => {
    getAllComponents().then(setComponents);
  }, []);

  useFocusEffect(loadComponents);

  async function removeComponent(id: number) {
    await deleteComponent(id);
    loadComponents();
  }

  function confirmDelete(item: Component) {
    const message = `Supprimer « ${item.name} » ? Cette action est irréversible.`;

    if (Platform.OS === "web") {
      if (window.confirm(message)) {
        removeComponent(item.id);
      }
      return;
    }

    Alert.alert("Supprimer la pièce", message, [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => removeComponent(item.id),
      },
    ]);
  }

  return (
    <Screen
      scroll={false}
      footer={
        <AppButton
          title="Ajouter une pièce"
          onPress={() => router.push("/form")}
        />
      }
    >
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
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Aucune pièce pour l’instant</Text>
            <Text style={styles.emptyText}>
              Touchez Ajouter une pièce, en bas, pour créer la première.
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 16, flexGrow: 1 },
  empty: { alignItems: "center", marginTop: 48, gap: 6 },
  emptyTitle: { fontSize: 18, fontWeight: "bold", color: colors.primaryDark },
  emptyText: { fontSize: 16, color: colors.textMuted, textAlign: "center" },
});
