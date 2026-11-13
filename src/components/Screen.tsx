import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";

type Props = {
  children: ReactNode;
  scroll?: boolean;
  footer?: ReactNode;
};

export default function Screen({ children, scroll = true, footer }: Props) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 16);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.content,
            !footer && { paddingBottom: bottomPadding },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, styles.content, styles.fixed]}>
          {children}
        </View>
      )}

      {footer && (
        <View style={[styles.footer, { paddingBottom: bottomPadding }]}>
          <View style={styles.footerInner}>{footer}</View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const MAX_WIDTH = 600;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    alignSelf: "center",
    padding: 16,
    gap: 16,
  },
  fixed: { paddingBottom: 0 },
  footer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  footerInner: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    alignSelf: "center",
    gap: 10,
  },
});
