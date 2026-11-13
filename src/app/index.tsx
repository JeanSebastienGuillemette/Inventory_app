import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import AppButton from "@/components/AppButton";
import Screen from "@/components/Screen";
import { colors } from "@/constants/colors";
import { getAllComponents } from "@/db/database";
import { formatMoney } from "@/utils/format";

export default function Index() {
  const router = useRouter();
  const [partCount, setPartCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getAllComponents().then((rows) => {
        setPartCount(rows.reduce((sum, c) => sum + c.quantity, 0));
        setTotalValue(rows.reduce((sum, c) => sum + c.price * c.quantity, 0));
      });
    }, []),
  );

  return (
    <Screen
      footer={
        <>
          <AppButton
            title="Voir l’inventaire"
            onPress={() => router.push("/inventory")}
          />
          <View style={styles.footerRow}>
            <View style={styles.footerItem}>
              <AppButton
                title="Ajouter"
                variant="secondary"
                onPress={() => router.push("/form")}
              />
            </View>
            <View style={styles.footerItem}>
              <AppButton
                title="À propos"
                variant="secondary"
                onPress={() => router.push("/about")}
              />
            </View>
          </View>
        </>
      }
    >
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>INVENTAIRE</Text>
        <Text style={styles.title}>Mes pièces de microélectronique</Text>
        <Text style={styles.description}>
          Suivez les composants, cartes et capteurs de vos tiroirs : ce que vous
          avez, où ça se trouve et combien ça vaut.
        </Text>
      </View>

      <View style={styles.summary}>
        <View style={[styles.stat, styles.statGreen]}>
          <Text style={[styles.statValue, styles.statValueGreen]}>
            {partCount}
          </Text>
          <Text style={styles.statLabel}>pièces en stock</Text>
        </View>
        <View style={[styles.stat, styles.statGold]}>
          <Text
            style={[styles.statValue, styles.statValueGold]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatMoney(totalValue)}
          </Text>
          <Text style={styles.statLabel}>valeur totale</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.primaryDark,
    borderRadius: 18,
    padding: 20,
    gap: 8,
    borderBottomWidth: 4,
    borderBottomColor: colors.accent,
  },
  heroLabel: {
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 2,
    color: colors.accent,
  },
  title: { fontSize: 26, fontWeight: "bold", color: colors.textOnDark },
  description: { fontSize: 16, lineHeight: 24, color: colors.textOnDarkMuted },
  summary: { flexDirection: "row", gap: 12 },
  stat: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 4,
  },
  statGreen: {
    backgroundColor: colors.primaryLight,
    borderColor: "#b5e0c8",
  },
  statGold: { backgroundColor: colors.accentLight, borderColor: "#efd9a8" },
  statValue: { fontSize: 26, fontWeight: "bold" },
  statValueGreen: { color: colors.primary },
  statValueGold: { color: "#9a6b12" },
  statLabel: { fontSize: 14, color: colors.textMuted },
  footerRow: { flexDirection: "row", gap: 10 },
  footerItem: { flex: 1 },
});
