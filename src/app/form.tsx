import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import ComponentForm from "@/components/ComponentForm";
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
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: isEdit ? "Edit part" : "Add part" }} />
      {notFound ? (
        <Text>This part no longer exists.</Text>
      ) : isEdit && component === null ? (
        <Text>Loading...</Text>
      ) : (
        <ComponentForm
          initial={component ?? undefined}
          onSubmit={handleSubmit}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
});
