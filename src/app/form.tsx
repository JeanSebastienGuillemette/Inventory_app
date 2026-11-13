import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import ComponentForm from "@/components/ComponentForm";
import Screen from "@/components/Screen";
import { colors } from "@/constants/colors";
import {
  addComponent,
  Component,
  getComponentById,
  NewComponent,
  updateComponent,
} from "@/db/database";

export default function Form() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [component, setComponent] = useState<Component | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    getComponentById(Number(id)).then((found) => {
      if (found === null) setNotFound(true);
      else setComponent(found);
    });
  }, [id]);

  async function handleSubmit(data: NewComponent) {
    if (id) await updateComponent({ ...data, id: Number(id) });
    else await addComponent(data);
    router.back();
  }

  return (
    <Screen>
      <Stack.Screen
        options={{ title: id ? "Modifier la pièce" : "Ajouter une pièce" }}
      />
      {notFound ? (
        <Text style={styles.message}>Cette pièce n’existe plus.</Text>
      ) : id && !component ? (
        <Text style={styles.message}>Chargement…</Text>
      ) : (
        <ComponentForm
          initial={component ?? undefined}
          onSubmit={handleSubmit}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  message: { fontSize: 16, color: colors.textMuted, textAlign: "center" },
});
