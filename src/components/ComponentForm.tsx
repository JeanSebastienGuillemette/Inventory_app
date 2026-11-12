import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Component, NewComponent } from "@/db/database";

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
    const priceNumber = Number(price);
    const quantityNumber = Number(quantity);

    if (name.trim() === "") {
      setError("Name is required.");
      return;
    }
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(purchaseDate) ||
      isNaN(Date.parse(purchaseDate))
    ) {
      setError("Purchase date must be a real date in YYYY-MM-DD format.");
      return;
    }
    if (price.trim() === "" || isNaN(priceNumber) || priceNumber < 0) {
      setError("Unit price must be a positive number, e.g. 4.50.");
      return;
    }
    if (!Number.isInteger(quantityNumber) || quantityNumber < 1) {
      setError("Quantity must be a whole number of at least 1.");
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
      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="ESP32-WROOM-32"
      />

      <Text>Purchase date</Text>
      <TextInput
        value={purchaseDate}
        onChangeText={setPurchaseDate}
        placeholder="YYYY-MM-DD"
      />

      <Text>Unit price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="4.50"
        keyboardType="decimal-pad"
      />

      <Text>Quantity</Text>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="number-pad"
      />

      <Text>Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Drawer B3"
      />

      <Text>Category</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="MCU, Sensor, Passive, Module, Other"
      />

      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <Pressable onPress={handleSave}>
        <Text>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 4 },
  error: { color: "red" },
});
