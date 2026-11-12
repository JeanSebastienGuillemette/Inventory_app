// Money in Quebec French format, e.g. 1234.5 -> "1 234,50 $".
const moneyFormatter = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
});

export function formatMoney(amount: number): string {
  return moneyFormatter.format(amount);
}

// Accepts both "4.50" and "4,50" (French decimal comma).
export function parseDecimal(text: string): number {
  return Number(text.trim().replace(",", "."));
}
