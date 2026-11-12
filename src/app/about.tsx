import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import Screen from "@/components/Screen";
import { colors } from "@/constants/colors";

export default function About() {
  const router = useRouter();

  return (
    <Screen
      footer={
        <AppButton
          title="Retour"
          variant="secondary"
          onPress={() => router.back()}
        />
      }
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Inventaire électronique</Text>
        <Text style={styles.heroText}>Version 1.0</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>
          Gère mes pièces de microélectronique : nom, date d’achat, prix
          unitaire, quantité, emplacement et catégorie.
        </Text>
        <Text style={styles.text}>
          Les données sont enregistrées sur l’appareil dans une base SQLite
          locale.
        </Text>
        <Text style={styles.text}>
          Réalisé avec React Native, Expo Router et expo-sqlite pour le cours
          Applications Mobiles, Cégep de Lévis. Codé par Jean-Sébastien
          Guillemette
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  hero: {
    backgroundColor: colors.primaryDark,
    borderRadius: 18,
    padding: 20,
    gap: 4,
    borderBottomWidth: 4,
    borderBottomColor: colors.accent,
  },
  heroTitle: { fontSize: 24, fontWeight: "bold", color: colors.textOnDark },
  heroText: { fontSize: 15, color: colors.accent, fontWeight: "600" },
  text: { fontSize: 16, lineHeight: 24, color: colors.textMuted },
});
