const moneyFormatter = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
});

export function formatMoney(amount: number): string {
  return moneyFormatter.format(amount);
}

export function parseDecimal(text: string): number {
  return Number(text.trim().replace(",", "."));
}
