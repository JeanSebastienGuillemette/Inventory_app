import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AppButton from "@/components/AppButton";
import { colors } from "@/constants/colors";
import { Component, NewComponent } from "@/db/database";
import { parseDecimal } from "@/utils/format";

type Props = {
  initial?: Component;
  onSubmit: (data: NewComponent) => void;
};

export default function ComponentForm({ initial, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [purchaseDate, setPurchaseDate] = useState(initial?.purchaseDate ?? "");
  const [price, setPrice] = useState(initial ? initial.price.toString() : "");
  const [quantity, setQuantity] = useState(
    initial ? initial.quantity.toString() : "1",
  );
  const [location, setLocation] = useState(initial?.location ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [error, setError] = useState("");

  function handleSave() {
    const priceNumber = parseDecimal(price);
    const quantityNumber = Number(quantity);

    if (name.trim() === "") {
      setError("Le nom est obligatoire.");
      return;
    }
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(purchaseDate) ||
      isNaN(Date.parse(purchaseDate))
    ) {
      setError(
        "La date d’achat doit être une vraie date au format AAAA-MM-JJ, par exemple 2026-11-12.",
      );
      return;
    }
    if (price.trim() === "" || isNaN(priceNumber) || priceNumber < 0) {
      setError(
        "Le prix unitaire doit être un nombre positif, par exemple 4,50.",
      );
      return;
    }
    if (!Number.isInteger(quantityNumber) || quantityNumber < 1) {
      setError("La quantité doit être un nombre entier d’au moins 1.");
      return;
    }

    setError("");
    onSubmit({
      name: name.trim(),
      purchaseDate,
      price: priceNumber,
      quantity: quantityNumber,
      location: location.trim() || null,
      category: category.trim() || null,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Nom *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="ESP32-WROOM-32"
          placeholderTextColor={colors.placeholder}
          autoCorrect={false}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Date d’achat *</Text>
        <TextInput
          style={styles.input}
          value={purchaseDate}
          onChangeText={setPurchaseDate}
          placeholder="AAAA-MM-JJ"
          placeholderTextColor={colors.placeholder}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
        />
      </View>

      {/* Price and quantity side by side: short numeric fields. */}
      <View style={styles.row}>
        <View style={[styles.field, styles.rowItem]}>
          <Text style={styles.label}>Prix unitaire ($) *</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="4,50"
            placeholderTextColor={colors.placeholder}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={[styles.field, styles.rowItem]}>
          <Text style={styles.label}>Quantité *</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="number-pad"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Emplacement</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Tiroir B3"
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Catégorie</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="MCU, Capteur, Passif, Module, Autre"
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <Text style={styles.hint}>* Obligatoire</Text>

      {error !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <AppButton title="Enregistrer" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  field: { gap: 6 },
  row: { flexDirection: "row", gap: 12 },
  rowItem: { flex: 1 },
  label: { fontSize: 15, fontWeight: "600", color: colors.primaryDark },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    minHeight: 52,
    fontSize: 17,
    color: colors.text,
  },
  hint: { fontSize: 14, color: colors.accent, fontWeight: "600" },
  errorBox: {
    backgroundColor: colors.dangerLight,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: colors.danger,
    padding: 12,
  },
  errorText: { fontSize: 15, fontWeight: "600", color: colors.danger },
});
