// App color palette (circuit-board green + gold accents), shared by every screen.
export const colors = {
  primary: "#1f7a4d",
  primaryDark: "#0f3d2e",
  primaryLight: "#dcf2e6",
  accent: "#c9952b", // gold, like the pads on a circuit board
  accentLight: "#fbf0d9",
  background: "#eef5f1",
  surface: "#ffffff",
  border: "#d9e6df",
  text: "#0f172a",
  textMuted: "#4b5b55",
  textOnDark: "#ffffff",
  textOnDarkMuted: "#b7d9c6",
  placeholder: "#94a3b8",
  danger: "#b91c1c",
  dangerLight: "#fde2e2",
  secondary: "#dcf2e6",
};

type CategoryColor = { main: string; light: string };

// One color per category, so parts are easy to spot in the list.
// French and English names both work, case does not matter.
const categoryColors: Record<string, CategoryColor> = {
  mcu: { main: "#2563eb", light: "#dbeafe" },
  capteur: { main: "#7c3aed", light: "#ede9fe" },
  sensor: { main: "#7c3aed", light: "#ede9fe" },
  passif: { main: "#c2410c", light: "#ffedd5" },
  passive: { main: "#c2410c", light: "#ffedd5" },
  module: { main: "#0f766e", light: "#ccfbf1" },
};

const defaultCategoryColor: CategoryColor = {
  main: "#64748b",
  light: "#e2e8f0",
};

export function getCategoryColor(category: string | null): CategoryColor {
  if (!category) return defaultCategoryColor;
  return categoryColors[category.trim().toLowerCase()] ?? defaultCategoryColor;
}
