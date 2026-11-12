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
  const isEdit = id !== undefined;

  const [component, setComponent] = useState<Component | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Edit mode: load the part to pre-fill the form.
  useEffect(() => {
    if (!isEdit) return;
    getComponentById(Number(id)).then((found) => {
      if (found === null) {
        setNotFound(true);
      } else {
        setComponent(found);
      }
    });
  }, [id, isEdit]);

  async function handleSubmit(data: NewComponent) {
    if (isEdit) {
      await updateComponent({ ...data, id: Number(id) });
    } else {
      await addComponent(data);
    }
    router.back();
  }

  return (
    <Screen>
      <Stack.Screen
        options={{ title: isEdit ? "Modifier la pièce" : "Ajouter une pièce" }}
      />
      {notFound ? (
        <Text style={styles.message}>Cette pièce n’existe plus.</Text>
      ) : isEdit && component === null ? (
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
