import { Pressable, StyleSheet, Text, View } from "react-native";
import AppButton from "@/components/AppButton";
import { colors, getCategoryColor } from "@/constants/colors";
import { Component } from "@/db/database";
import { formatMoney } from "@/utils/format";

type Props = {
  component: Component;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ComponentCard({ component, onEdit, onDelete }: Props) {
  const total = component.price * component.quantity;
  const categoryColor = getCategoryColor(component.category);

  return (
    <Pressable
      onPress={onEdit}
      style={({ pressed }) => [
        styles.card,
        { borderLeftColor: categoryColor.main },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{component.name}</Text>
        {component.category ? (
          <Text
            style={[
              styles.category,
              {
                color: categoryColor.main,
                backgroundColor: categoryColor.light,
              },
            ]}
          >
            {component.category}
          </Text>
        ) : null}
      </View>

      <View style={styles.numbers}>
        <Text style={styles.detail}>
          {component.quantity} × {formatMoney(component.price)}
        </Text>
        <Text style={styles.total}>{formatMoney(total)}</Text>
      </View>

      <Text style={styles.meta}>
        Acheté le {component.purchaseDate}
        {component.location ? `  ·  ${component.location}` : ""}
      </Text>

      <View style={styles.actions}>
        <AppButton
          title="Modifier"
          variant="secondary"
          size="small"
          onPress={onEdit}
        />
        <AppButton
          title="Supprimer"
          variant="danger"
          size="small"
          onPress={onDelete}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 6,
    gap: 6,
  },
  pressed: { opacity: 0.85 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    flexShrink: 1,
  },
  category: {
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: "hidden",
  },
  numbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  detail: { fontSize: 16, color: colors.textMuted },
  total: { fontSize: 18, fontWeight: "bold", color: colors.primary },
  meta: { fontSize: 14, color: colors.textMuted },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 8,
  },
});
