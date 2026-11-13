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

  useEffect(() => {
    if (id) getComponentById(Number(id)).then(setComponent);
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
      {id && !component ? (
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
