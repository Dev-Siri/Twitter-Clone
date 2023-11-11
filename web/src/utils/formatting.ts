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
