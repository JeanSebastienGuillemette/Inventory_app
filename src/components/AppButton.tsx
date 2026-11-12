import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/constants/colors";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "large" | "small";
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  size = "large",
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.text,
          size === "small" && styles.textSmall,
          variant === "primary" && styles.textLight,
          variant === "secondary" && styles.textSecondary,
          variant === "danger" && styles.textDanger,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  // 48 px is the minimum comfortable touch target on Android.
  large: { minHeight: 52, paddingHorizontal: 20 },
  small: { minHeight: 44, paddingHorizontal: 18 },
  primary: {
    backgroundColor: colors.primary,
    // Soft shadow so the main action stands out.
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  secondary: { backgroundColor: colors.secondary },
  danger: { backgroundColor: colors.dangerLight },
  pressed: { opacity: 0.7 },
  text: { fontSize: 17, fontWeight: "600", color: colors.text },
  textSmall: { fontSize: 15 },
  textLight: { color: colors.textOnDark },
  textSecondary: { color: colors.primaryDark },
  textDanger: { color: colors.danger },
});
