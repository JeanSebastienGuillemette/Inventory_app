import { Pressable, StyleSheet, Text, View } from "react-native";
import { Component } from "@/db/database";

type Props = {
  component: Component;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ComponentCard({ component, onEdit, onDelete }: Props) {
  const total = component.price * component.quantity;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{component.name}</Text>
        {component.category ? (
          <Text style={styles.category}>{component.category}</Text>
        ) : null}
      </View>

      <Text style={styles.detail}>
        {component.quantity} × {component.price.toFixed(2)} $ ={" "}
        <Text style={styles.total}>{total.toFixed(2)} $</Text>
      </Text>
      <Text style={styles.detail}>
        Bought {component.purchaseDate}
        {component.location ? ` · ${component.location}` : ""}
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  name: { fontSize: 16, fontWeight: "bold", flexShrink: 1 },
  category: {
    fontSize: 12,
    color: "#1d4ed8",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
  },
  detail: { color: "#475569" },
  total: { fontWeight: "bold", color: "#0f172a" },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 6,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#e2e8f0",
  },
  buttonText: { fontWeight: "600", color: "#0f172a" },
  deleteButton: { backgroundColor: "#fee2e2" },
  deleteText: { color: "#b91c1c" },
});
