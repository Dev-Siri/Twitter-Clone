export function tagFormat(input: string): string {
  const allowedChars = new Set([
    ...Array.from(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_"
    ),
  ]);

  const filteredString = input
    .split("")
    .filter((char) => allowedChars.has(char))
    .join("");

  return filteredString;
}

export function compactify(metric: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(metric);
}
